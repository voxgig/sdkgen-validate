# sdk-validate

Scripts to validate [`@voxgig/sdkgen`](https://www.npmjs.com/package/@voxgig/sdkgen)
end-to-end across multiple OpenAPI specs and every supported language target.

**Current state: 98/98 test suites pass** across 14 specs × 7 targets against
the upstream `@voxgig/sdkgen`, `@voxgig/apidef`, and `@voxgig/create-sdkgen`
HEADs. The latest run lives in [`reports/latest/`](reports/latest/).

[`baseline/`](baseline/) preserves the original 69/98 scoreboard
([`BASELINE.md`](baseline/BASELINE.md)) for historical reference, the in-tree
patches it depended on ([`CHANGES.md`](baseline/CHANGES.md)), and the original
plan to reach 98/98 ([`PLAN.md`](baseline/PLAN.md)).

For each spec the runner executes the canonical bootstrap path:

1. **scaffold** — `npm create @voxgig/sdkgen@latest <name> -- --def <spec> --folder <out>`
2. **target add ×N** — `npx voxgig-sdkgen target add <lang>` for each of `ts, js, go, py, php, rb, lua` (the seven targets bundled in `@voxgig/sdkgen/project/.sdk/model/target/`).
3. **build** — `npm run build` inside `<out>/.sdk` (compiles the per-spec generator project).
4. **generate** — `npm run generate` (runs `voxgig-model model/sdk.aontu`, which iterates every registered target in a single pass).

After every spec it inspects the result folder and records (a) the per-phase
exit code, (b) the per-target `target add` exit code, and (c) whether the
top-level `<out>/<name>-sdk/<lang>/` output folder for each target now exists.

With `--test`, two additional phases run per generated target language:

6. **deps** — language-native dependency install (see table below).
7. **test** — language-native test runner (`npm test` or `make test`).

| Lang | deps | test |
| --- | --- | --- |
| ts  | `npm install && npm run build` | `npm test` |
| js  | `npm install`                  | `npm test` |
| go  | (none)                         | `make test` (`go test ./... -v`) |
| py  | `pip install -e . pytest`      | `make test` (`python -m pytest test/`) |
| php | `composer install`             | `make test` (`./vendor/bin/phpunit`) |
| rb  | `bundle install`               | `make test` (`ruby -Ilib test/exists_test.rb`) |
| lua | (none)                         | `make test` (`busted test/`) |

Toolchain availability is **prechecked** at startup when `--test` is set —
any missing binary is a hard error. Required binaries: `node npm` (ts/js),
`go make` (go), `python3 pip make` (py), `php composer make` (php),
`ruby bundle make` (rb), `lua busted make` (lua). On a Mac with Homebrew
Lua, `busted` is typically at `~/.luarocks/bin/busted`; prepend that to
`PATH` before invoking the script.

## Layout

```
bin/
  validate-sdkgen   # main driver (bash)
  summarize         # turns summary.log into REPORT.md + report.json
  run-to.py         # process-group timeout wrapper (macOS lacks timeout(1))
specs/
  default.txt       # 14 canonical specs (smallest first)
  smoke.txt         # 3 small specs for a quick sanity check
```

## Prerequisites

- Node.js + npm on `$PATH` (the runner uses `npm create` and `npx`)
- Python 3 (for the timeout wrapper + summariser)
- A directory of OpenAPI spec files. The default location is
  `~/Projects/voxgig/apidef-validate/def/` — override with `--defs`.

## Usage

Quick smoke run (3 small specs, all 7 targets):

```sh
./bin/validate-sdkgen --specs specs/smoke.txt
```

Full canonical run (14 specs, all 7 targets — ~38 minutes wall clock against
local sdkgen + apidef HEADs; large specs may hit the generate timeout):

```sh
./bin/validate-sdkgen
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

All options:

```sh
./bin/validate-sdkgen --help
```

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

- `summary.log` — line-oriented `key=value` stream consumed by `summarize`
- `<name>.scaffold.log`, `<name>.target.<lang>.log`,
  `<name>.build.log`, `<name>.generate.log` — raw stdout+stderr per phase
- `REPORT.md` — human-readable scoreboard (per-spec, per-target)
- `report.json` — machine-readable equivalent

The validate driver invokes `summarize` automatically at the end. Re-run it
manually any time:

```sh
./bin/summarize --run-dir ~/Projects/voxgig-sdk/_runs/<timestamp>
```

## Timeouts

`@voxgig/sdkgen`'s generate phase is the only one that routinely needs a long
budget on large specs (gitlab/github/cloudsmith all topped 600 s in the prior
run). Override per-phase budgets:

```sh
./bin/validate-sdkgen --gen-timeout 1800
```

Exit codes from the timeout wrapper:

- `124` — graceful kill on timeout (SIGTERM honoured)
- `137` — hard kill on timeout (SIGKILL required)
- otherwise the child's own exit code

## Supported targets

The seven languages are taken straight from `@voxgig/sdkgen`'s bundled
project skeleton (`node_modules/@voxgig/sdkgen/project/.sdk/model/target/`):
`ts, js, go, py, php, rb, lua`. If `@voxgig/sdkgen` adds a target, add it to
the `--targets` argument; the driver iterates whatever you pass.
