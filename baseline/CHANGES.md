# Local sdkgen patches behind this baseline

The 69/98 baseline depends on these in-tree fixes layered on top of
`@voxgig/sdkgen` v0.40.1 (HEAD `ec505e2`). They are **uncommitted** in the
sdkgen working tree at `~/Projects/voxgig/sdkgen/` as of the run. If they get
committed (or upstream releases incorporate them), update the version pointer
in `BASELINE.md` and re-run.

## Manifests / scaffolding

- **py** `Package_py.ts` — `build-backend` switched from the non-existent
  `setuptools.backends._legacy:_Backend` to `setuptools.build_meta`; added
  `[tool.setuptools.packages.find]` so the multi-top-level-dir layout is
  discoverable by setuptools.
- **py** `Main_py.ts` — stopped emitting `py/__init__.py` at the language root
  (collided with PyPI's third-party `py` module → pytest constructed test
  module paths as `py.test.X` and crashed).
- **php / py / lua** `model/target/<lang>.jsonic` — removed the
  `voxgig/struct` / `voxgig-struct` runtime deps (struct is vendored under
  `tm/<lang>/utility/struct/` so the manifest dep was unresolvable).
- **php** `tm/php/Makefile` — `phpunit` invocation given an explicit `test`
  path (was previously printing help with no config + no path).
- **lua** `tm/lua/Makefile` — `busted -p _test test/` (default pattern is
  `_spec`, but generated tests are `*_test.lua`).

## Go template fixes

- **go** `Entity_go.ts` — emit a stub method `func (e *X) Op(_, _) (any, error) { return core.UnsupportedOp("op", e.name) }` for each missing CRUD op (Load/List/Create/Update/Remove). Without this, partial-CRUD entities don't satisfy the static `<Project>Entity` interface.
- **go** `tm/go/core/helpers.go` — added `core.UnsupportedOp(opname, entityname)` companion helper used by the stubs.
- **go** `TestEntity_go.ts`:
  - `vs.GetProp(setup.data, "existing.<entity>")` → `vs.GetPath("existing.<entity>", setup.data)` (`GetProp` doesn't split on `.`).
  - `fmt` import made conditional on whether any flow step actually uses it.
  - LIST step's `${listvar}, ok := ...` uses `_` when no validator consumes the var.
  - Bootstrap block ends with `_ = <var>Data` discard so list-only flows compile.
  - `client := setup.client` only emitted when the flow has at least one op step.
- **go** `TestDirect_go.ts` — second `if url, ok := …; ok` block uses `_` instead of `url` when `loadParams.length == 0`.
- **go** `TestDirect_go.ts` — non-live LIST params get distinct placeholders (`direct01, direct02, …`) instead of all being `direct01`.

## Cross-language `TestEntity_*.ts` fixes

- `vs.getprop(setup.data, "existing.<entity>")` → `vs.getpath(...)` in 5 templates (py/lua/rb/php — go above) so the bootstrap block actually finds the existing test data.
- idmap construction additionally walks every `step.match` value across the flow — apidef does not populate `entity.relations.ancestors` for path-parameter parents (e.g. the `year` in `/{year}/domain`), so without this `setup.idmap["year01"]` is missing.

## Refactor — shared helpers

- New `src/helpers/{buildIdNames,getMatchEntries,collectDeps}.ts` published via `@voxgig/sdkgen`'s public API.
- Eliminates ~190 lines of duplicated control-logic across the per-language `TestEntity_*.ts` and `Package_*.ts` files (~45 lines net after the helper module is counted, but cuts maintenance fan-out from 5 files to 1 for these helpers).

## What's NOT done

The baseline freezes here precisely because the next 29 failing test suites
need substantially deeper work. See `PLAN.md` for the path forward.
