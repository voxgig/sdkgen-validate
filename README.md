# sdk-validate

Scripts to validate [`@voxgig/sdkgen`](https://www.npmjs.com/package/@voxgig/sdkgen)
end-to-end across multiple OpenAPI specs and every supported language target.

**Current state** is whatever the last run measured:
[`reports/latest/REPORT.md`](reports/latest/REPORT.md) carries the package
versions validated, the per-spec phase results, the per-target scoreboard, and
the two totals lines (`Totals:` for generated output, `Test totals:` for the
generated SDKs' own suites). Read the counts there. They are deliberately not
repeated here, because a number in prose outlives the run that produced it.

[`baseline/`](baseline/) preserves the original 69/98 scoreboard
([`BASELINE.md`](baseline/BASELINE.md)) for historical reference, the in-tree
patches it depended on ([`CHANGES.md`](baseline/CHANGES.md)), and the original
plan to reach 98/98 ([`PLAN.md`](baseline/PLAN.md)).

For each spec the runner executes the canonical bootstrap path:

1. **scaffold** — `npm create @voxgig/sdkgen@latest <name> -- --def <spec> --folder <out>`
2. **target add ×N** — `npx voxgig-sdkgen target add <lang>` for each target in `--targets` (default `ts, js, go, py, php, rb, lua`).
3. **build** — `npm run build` inside `<out>/.sdk` (compiles the per-spec generator project).
4. **generate** — `npm run generate` (docgen's project prepare, `tsc --build src`, then `voxgig-model` over `model/sdk.aon` and `test/test.aon`, which iterates every registered target in a single pass).

Generate runs twice per spec. The first pass is a warmup, logged to
`<name>.generate.0.log` and reported only as `generate_warmup_rc`; between the
two the driver rebuilds the test fixtures (`npm run test-model`), so the
fixtures the generated suites run against come from the sdkgen under test
rather than from the scaffold snapshot. The second pass is the one the report
scores.

After every spec it inspects the result folder and records (a) the per-phase
exit code, (b) the per-target `target add` exit code, and (c) whether the
top-level `<out>/<name>-sdk/<lang>/` output folder for each target now exists.

With `--test`, two additional phases run per generated target language:

5. **deps** — language-native dependency install (see table below).
6. **test** — language-native test runner (`npm test` or `make test`).

| Lang | deps | test |
| --- | --- | --- |
| ts  | `npm install && npm run build` | `npm test` |
| js  | `npm install`                  | `npm test` |
| go  | (none)                         | `make test` (`go test ./... -v`) |
| py  | `python3 -m pip install -e . pytest` | `make test` (`python -m pytest test/`) |
| php | `composer install`             | `make test` (`./vendor/bin/phpunit`) |
| rb  | `bundle install`               | `make test` (`ruby -Ilib test/exists_test.rb`) |
| lua | (none)                         | `make test` (`busted test/`) |

Toolchain availability is **prechecked** at startup when `--test` is set —
any missing binary is a hard error. The list below is what a run *requires*,
not a claim about what any machine has: the precheck resolves each binary on
the machine in use, which is the only place the answer is knowable. Required
binaries: `node npm npx python3 git` for every run whatever `--targets` says,
because scaffolding and building go through npm and python3 runs both the
per-phase timeout wrapper and the summarizer; then per target, `node npm`
(ts/js), `go make` (go), `python3 make` (py), `php composer make` (php),
`ruby bundle make` (rb), `lua busted make` (lua).
Install `busted` with `luarocks install busted`; where LuaRocks installs into
a home prefix (a Mac with Homebrew Lua puts it in `~/.luarocks/bin`), prepend
that to `PATH` before invoking the script.

## When a published dependency breaks the run

`--scaffold-install <pkg@ver>` (repeatable) scaffolds with `--no-install` and
then installs the throwaway `<out>/<name>-sdk/.sdk` with
`npm install --no-save <pkg@ver>`. It exists for one situation: a *published*
transitive dependency that throws at require time, which would otherwise end a
run before `@voxgig/sdkgen` and `@voxgig/apidef` are exercised at all. The
scaffold's own `npm install` runs a `postinstall` that loads `@voxgig/apidef`,
so the override has to be part of that install rather than applied after it.

It is ephemeral, by design: the scaffold is a throwaway directory, `--no-save`
leaves its manifest untouched, and **nothing in this repository is pinned**. Do
not translate a working `--scaffold-install` into a pin, an `overrides` block or
a `file:` dependency in a committed manifest or lockfile — this repository
tracks none and validates what the registry actually serves. The run records
the flag in `summary.log`, and `summarize` prints it in the report's
Configuration block, so a report always states that an override was in play.

Check the failure before reaching for it. A require-time throw from a
third-party package is one thing; a failure in generation, in a generated SDK,
or in a generated test suite belongs to `@voxgig/sdkgen` or `@voxgig/apidef` and
must be reported as such.

## Layout

```
bin/
  validate-sdkgen   # main driver (bash)
  summarize         # turns summary.log into REPORT.md + report.json
  run-to.py         # process-group timeout wrapper (macOS lacks timeout(1))
  link-local.cjs    # symlinks a local checkout into a scaffold's node_modules
specs/
  default.txt       # 14 canonical specs (smallest first)
  smoke.txt         # 3 small specs for a quick sanity check
tools/
  comment-gate.cjs  # source comment policy, with its tests
  dep-gate.cjs      # dependency-source policy, with its tests
  summarize.test.cjs # the summarizer's tests
  driver.test.cjs   # the driver's usage/argument tests
reports/
  latest/           # the last run's REPORT.md + report.json, committed
```

## Prerequisites

- Node.js + npm on `$PATH` (the runner uses `npm create` and `npx`)
- Python 3 (for the timeout wrapper + summariser)
- A directory of OpenAPI spec files. The built-in default,
  `~/Projects/voxgig/apidef-validate/def/`, describes one checkout layout
  rather than a required one — on any other, pass `--defs` (likewise `--out`,
  whose default is `~/Projects/voxgig-sdk`). `apidef-validate` owns those
  files; this repository keeps no copies.

## This repository's own gates

```sh
make test
```

runs the comment-policy gate and its tests, the dependency-source gate and
its tests, the local-link test, and the summarizer and driver tests. It
generates nothing — a validation run is `make smoke` or `make full`.

`make deps` on its own is the dependency-source gate: a committed dependency
names a published npm package or a GitHub reference, and anything else —
`file:`, `link:`, a bare path, a packed archive, a Go `replace` reaching
outside the repository, a committed `go.work`, a Cargo `path` leaving it, an escaping
symlink, an `.npmrc` naming another registry — is local development wiring
that has to be undone before the commit. It judges only what git TRACKS, so
that wiring stays legal until it is staged. `make deps-test` is the gate's own
suite, and `tools/dep-gate.json` is the allowlist: an entry needs a reason,
and the gate reports one that has stopped matching anything.

CI runs the comment gate on every push, and `.githooks/pre-push`
(`make hooks`) runs both gates before anything leaves the machine.

## Usage

Quick smoke run (3 small specs, all 7 targets):

```sh
./bin/validate-sdkgen --specs specs/smoke.txt
```

Full canonical run (14 specs, all 7 targets). The largest specs dominate the
wall clock and can exceed the default generate budget, so raise it:

```sh
./bin/validate-sdkgen --gen-timeout 1800
```

Every generated tree is kept, which the full list cannot always afford: one
spec's tree runs to a few GB once each language has installed its own
dependencies. `--clean-after` deletes each `<out>/<name>-sdk` as soon as its
phases are done, so the peak is one spec rather than all fourteen. The phase
logs are unaffected — they live in the run dir — and a single spec can be
re-run without the flag to inspect a tree:

```sh
./bin/validate-sdkgen --gen-timeout 1800 --clean-after
```

Run only specific specs from the list:

```sh
./bin/validate-sdkgen --only petstore,solar
```

Restrict to a subset of targets:

```sh
./bin/validate-sdkgen --targets ts,go --specs specs/smoke.txt
```

Reuse an already-scaffolded project (skip clean + scaffold; useful when you
want to re-run target-add/generate after upgrading `@voxgig/sdkgen`):

```sh
./bin/validate-sdkgen --keep --only petstore
```

Smoke run with the generated SDKs' own test suites:

```sh
PATH="$HOME/.luarocks/bin:$PATH" \
  ./bin/validate-sdkgen --specs specs/smoke.txt --test
```

Working around a published dependency that throws at require time (see above —
ephemeral, and never a pin in this repository):

```sh
./bin/validate-sdkgen --specs specs/smoke.txt --test \
  --scaffold-install <package>@<version>
```

A named package and version in that example would read as an instruction long
after the release it worked around was superseded, so the flag is documented
without one.

All options:

```sh
./bin/validate-sdkgen --help
```

## Local schema migrations

Start with built local checkouts. `--sdkgen-path`, `--apidef-path`,
`--aontu-path`, `--model-path`, `--docgen-path`, `--langpack-path`, and
`--infrapack-path`
create symlinks in the generated project's `node_modules`, including CLI
links. They leave manifests and lockfiles unchanged. Dependencies of each
linked checkout must also resolve the intended local versions.

`--create-sdkgen-path` uses the local scaffold CLI and refreshes its build
components when combined with `--keep`. `--no-docs` disables documentation
editions so SDK checks can run independently of Docgen. To validate documentation
as well, omit `--no-docs` and pass `--docgen-path ../docgen/ts`. Use a fresh output
directory if an earlier run disabled editions in its generated config.

```sh
./bin/validate-sdkgen --specs specs/smoke.txt --no-docs --test \
  --sdkgen-path ../sdkgen/ts --apidef-path ../apidef/ts \
  --aontu-path ../../aontu-lang/aontu/ts \
  --create-sdkgen-path ../create-sdkgen \
  --langpack-path ../sdkgen-langpack --infrapack-path ../sdkgen-infrapack \
  --targets ts,js,go,py,php,rb,lua,dart,haskell,lean,seneca-provider
```

Dart, Haskell, and Lean run their generated `make build test` targets.
Seneca provider validation requires the `ts` target; its SDK dependency is
symlinked to that generated TypeScript package before installing other test
dependencies. A fresh provider output gets a local Git repository on `main`
for its maintenance checks; existing Git metadata is preserved. Use a Python
virtual environment for Python dependency installs.

The command exits unsuccessfully if a requested phase fails or output is
missing. Reports retain the individual results, including failures on an
unchanged baseline.

## Spec list format

`<name>:<filename-relative-to-defs-dir>` per line, `#` for comments. Example:

```
petstore:petstore-1.0.7-swagger-2.0.json
solar:solar-1.0.0-openapi-3.0.0.yaml
```

`<name>` is the directory name suffix (the SDK is written to
`<out>/<name>-sdk/`) and the value passed to `npm create @voxgig/sdkgen`.

## Output

Each invocation writes to `<out>/_runs/<UTC-timestamp>/`:

- `summary.log` — line-oriented `key=value` stream consumed by `summarize`,
  including the package versions the scaffold resolved and the unabridged
  paths the run used
- `<name>.scaffold.log`, `<name>.scaffold-install.log`,
  `<name>.target.<lang>.log`, `<name>.build.log`, `<name>.generate.log`,
  `<name>.deps.<lang>.log`, `<name>.test.<lang>.log` — raw stdout+stderr per
  phase
- `REPORT.md` — human-readable scoreboard (per-spec, per-target)
- `report.json` — machine-readable equivalent

The scoreboard carries a column per phase, `Warmup` being the first generate
pass. A phase with no column of its own — an override, an overlay — still
appears under *Other non-zero phase results* when it failed, because the
driver's exit status counts every phase it records and a report that omitted
one would disagree with it.

`REPORT.md` and `report.json` are the shareable pair, so they are written to be
machine-independent: every filesystem path is shortened to its last two
segments. A report copied into [`reports/latest/`](reports/latest/) therefore
carries no absolute path from the machine that produced it. The unabridged
paths stay in `summary.log`, which is not committed.

A report also names what was validated: `summarize` reads the
`version <package>=<v>` lines the driver records from the scaffold's
`node_modules` and prints them as a *Packages validated* table.

The validate driver invokes `summarize` automatically at the end. Re-run it
manually any time:

```sh
./bin/summarize --run-dir <out>/_runs/<timestamp>
```

## Timeouts

The generate phase is the one that routinely needs a long budget on large
specs, and the driver runs it twice per spec (a warmup pass, then the pass it
reports). The per-language deps phase can need one too, where a package
manager falls back to fetching from source. Override the budgets:

```sh
./bin/validate-sdkgen --gen-timeout 1800 --test-timeout 900
```

Exit codes from the timeout wrapper:

- `124` — graceful kill on timeout (SIGTERM honoured)
- `137` — hard kill on timeout (SIGKILL required)
- otherwise the child's own exit code

## Supported targets

The default target list is `ts, js, go, py, php, rb, lua`. `@voxgig/sdkgen`
bundles more targets than that (see its own project skeleton,
`node_modules/@voxgig/sdkgen/project/.sdk/model/target/`), and the packaged
targets live in `@voxgig/sdkgen-langpack` and `@voxgig/sdkgen-infrapack`. The
driver iterates whatever `--targets` names; with `--test` each named target
also needs a toolchain entry in the driver's `toolchain_for`, or the run stops
at the precheck.
