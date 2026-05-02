# Path from baseline (69/98) to full coverage (98/98)

This is a phased plan. Each phase has a hypothesis, the experiment that
validates it, the expected impact on the scoreboard, and the risk. Phases
are ordered by leverage — the earlier phases unblock the most failing test
suites for the least work. A failing test suite that passes after a phase
moves from `✗` to `✓` in the scoreboard; the **Test totals** line in
`REPORT.md` is the leading indicator.

## Failing-suite anatomy at baseline

29 failing test suites group cleanly into four classes:

| Class | Failing suites | Specs affected | Symptom signature |
|---|---:|---|---|
| 2 — rename/id semantics | 12 (definitive) + 8 (likely) | codatplatform, contentfulcma, statuspage, shortcut, cloudsmith, gitlab, github | go/py/lua/(php) UPDATE returns `404: Not found` from the in-memory test mock. TS/JS pass coincidentally because `setup.idmap[<param>]` is `undefined` and JS drops it. |
| 3 — large-spec build/test scale | 4 | gitlab, github | ts/js test phase exits non-zero. Likely OOM, file-count, or timeout issues with a generator emitting hundreds of `*.test.ts` files. |
| 4 — learnworlds-specific | 2 | learnworldsnew | go and php fail uniquely (the rest pass). Different cause from class 2. |
| 5 — cloudsmith php / unaccounted | 1–3 | cloudsmith, scattered | residual failures that won't be explained by classes 2/3/4 and need spec-by-spec triage. |

The 12+8 split for class 2: **definite** = whole-spec failures of go/py/lua
on small-medium specs that only fail on these three targets (all attributable
to the same rename-map mismatch). **Likely** = the same symptom shows up in
gitlab/github/cloudsmith for go/py/lua/(php); they probably resolve under
the same fix but the larger surface area may expose additional bugs.

## Phase 1 — Class 2: rename-map / id semantics  (highest leverage)

**Hypothesis.** The five medium-spec failures (codatplatform, contentfulcma,
statuspage, shortcut, plus the corresponding go/py/lua slice of cloudsmith
& gitlab/github) all stem from the same root cause: when an OpenAPI path
parameter has the same identity as the entity itself (e.g. `companyId` in
`/companies/{companyId}` is renamed to `id` in the model — see `point.rename.param: {companyId: 'id'}`), apidef puts that param into the flow's `step.data`,
the test-generator emits an alias in `setup`, the test sends it as a
separate field on the update body, and the in-memory test mock's
`buildArgs` requires that field to exist on the stored entity — but the
entity stored its identity under `id`, not under the renamed-from key.

**Fix candidates** (pick one — full debate in §1.1 below):

- **A — Test-generator filter**: in `TestEntity_*.ts`, when iterating
  `step.data` and the alias list, skip keys whose camelCase form is in any of
  the entity's op-point `rename.param` map mapping to `'id'`. Per-language
  template change.
- **B — Test-mock alias**: in each language's `TestFeature.<lang>` /
  `build_args`, consult the chosen point's rename map and treat
  rename-to-`id` keys as `id` when constructing the qand. Per-language
  runtime change.
- **C — Apidef change**: stop emitting the renamed-to-id key in `step.data`
  at all. Single change in apidef's flow generation, no per-language work.

**Recommendation: A then C.** A is contained to the templates we already
patched, lands quickly, and unblocks 12+ suites; C is the deeper correctness
fix and removes the test-generator's need to even know about the rename
map, but lives in apidef — schedule it for after we've validated A works.
B is rejected because it makes the test mock asymmetric to the real SDK
(which doesn't need to know about rename maps at runtime — that's apidef
post-processing).

**Concrete A steps:**

1. In `buildIdNames` (the shared helper) or alongside it, add a new helper
   `flowIdMap(entity, flow) → { aliases: [[k, v], ...] }` that returns the
   alias list with rename-to-id keys filtered out. Each `TestEntity_*.ts`
   call site (5 langs) replaces its hand-rolled `aliases` derivation.
2. In each `TestEntity_*.ts` UPDATE generator, when emitting the body fields
   from `step.data`, skip keys whose camelCase form is renamed to `id` in
   any active point. Same shared helper can produce that filtered list.
3. Rebuild sdkgen, regenerate, run smoke (must stay 21/21), then run full.

**Acceptance:** test totals ≥ 81/98 (12 medium-spec suites unblocked).
Stretch: 84-86/98 if cloudsmith's go/py/lua also resolve.

**Risk.** The "rename to `id`" detection has to handle multiple points per
op (codatplatform's connection update has 1 point, but other ops have
2–3). Filter needs to be conservative: skip a key only when ALL active
points' rename map agree it's renamed to id. False positives would drop
legitimate path params.

### 1.1 Why not just remove the aliases entirely?

Tempting (it would mirror TS exactly), but taxonomy needs at least some
aliases to work — `idmap["year"]` is referenced by the update body and is
not a renamed-to-id key. Without the alias the test references an
undefined value, and python's `dict.get` returns `None`, and `param()`
falls through to `None`, and the test mock's qand contains a `None` match
which doesn't match the stored value. **The minimal fix is "filter the
alias list, don't drop it wholesale."**

## Phase 2 — Class 3: gitlab / github ts/js scale

**Hypothesis.** Both specs declare 270+ entities and 1100+ methods. The
generator emits one `*.test.ts` per entity per op-style, plus
`*Direct.test.ts`. That's 600+ test files compiled by `tsc` then run by
`node --test`. Failure modes to discriminate:

1. **`tsc` OOM during build.** Symptom: `npm run build` exits non-zero.
   Solution: bump `NODE_OPTIONS=--max-old-space-size=8192`, or split into
   subprojects, or switch to `tsc --build` incremental mode.
2. **`node --test` glob timeout.** Symptom: build OK, but `npm test` hangs
   or exits with no useful output. Solution: shard the test runner, or
   widen `--test-timeout`.
3. **A real bug exposed by scale.** Symptom: test failures with stack
   traces. Solution: triage as if it were a class 2 or 4 issue.

**Concrete steps:**

1. Re-run `--only gitlab,github --targets ts,js` with `--gen-timeout 1800
   --test-timeout 1800` to give breathing room.
2. Inspect the generate.log and the per-target test logs for what actually
   killed it.
3. If OOM, set `NODE_OPTIONS` in the validate script's per-target deps
   step. If glob/timeout, shard.
4. If a real bug, defer to phase 4.

**Acceptance:** gitlab and github ts/js move to ✓.
**Likely net:** +4 suites → 73-86/98 depending on phase 1 outcome.

## Phase 3 — Class 4: learnworlds go / php

**Hypothesis.** Different from class 2 because (a) py is passing and
(b) php is failing — the opposite slice from the codatplatform group. Likely
spec-specific: learnworlds has unusual auth, multipart uploads, or a
schema component that the go/php emitters mishandle.

**Concrete steps:**

1. Read `learnworldsnew.test.go.log` and `learnworldsnew.test.php.log`,
   identify the failing entity / op.
2. Inspect the generator output for that op compared to a passing entity
   in the same spec.
3. Decide if it's a template bug (go/php specific) or an apidef issue.

**Acceptance:** learnworldsnew goes 7/7. **Net: +2 suites.**

## Phase 4 — Class 5: residual cloudsmith/gitlab/github

**Hypothesis.** Whatever's left after phases 1–3 is a long tail of
spec-specific quirks. Each one needs targeted investigation; no shared
root cause.

**Concrete steps:** spec-by-spec triage, same loop as phase 3.

**Acceptance:** test totals = 98/98.

## Phase 5 — Hardening (no scoreboard change but worth doing)

After 98/98 is hit, lock it in:

1. **Commit the sdkgen patches** — `~/Projects/voxgig/sdkgen` currently has
   23 modified files + 6 untracked (the `helpers/` directory). Either
   merge upstream or pin `--sdkgen-path` to a fork. `BASELINE.md` /
   `CHANGES.md` documents what's needed.
2. **Settle the warmup-generate hack.** `validate-sdkgen` currently runs
   `npm run generate` twice because the first one silently skips Entity
   for every target. Find the root cause in
   `@voxgig/sdkgen` / `@voxgig/model` / `jostraca` and fix it; remove the
   workaround.
3. **CI**: run validate-sdkgen on every sdkgen merge against the smoke
   list; nightly against the full default list. Fail the build if test
   totals regress.
4. **Refactor pass 2.** With 98/98 stable, finish the per-language
   `TestFeature.<lang>` consolidation that was deferred from the earlier
   refactor — same `buildArgs` logic in 5 languages.

## Estimates

Wall-clock guess (for a focused operator working from this plan):

| Phase | Effort | Expected suites unblocked |
|---|---|---:|
| 1 | 0.5 day | +12-16 |
| 2 | 0.5–1 day | +4 |
| 3 | 0.25 day | +2 |
| 4 | 1–2 days | +5-11 |
| 5 | 1 day | 0 (quality) |

Total: 3–5 days of focused work to drive to 98/98.

## Decision points the user should weigh in on

- **Phase 1: A (template) vs C (apidef).** A first is the recommendation,
  but if the user is willing to also touch apidef they could do C as the
  permanent fix and skip A. A is reversible; C is structural.
- **Phase 5 commit posture.** The sdkgen patches need a home — upstream
  PR, fork, or vendored under `sdk-validate/sdkgen-overlay/` and applied
  at validation time? My recommendation: upstream PR organized by class
  (manifests, go-templates, helpers, refactor) so each lands on its own
  merits.
- **gitlab/github scope.** If those two specs are out-of-scope for this
  validator (because their scale dwarfs everything else), drop them from
  `default.txt` rather than spending phase 2/4 effort. Decision the user
  should make.
