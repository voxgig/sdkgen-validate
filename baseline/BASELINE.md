# sdk-validate baseline — 2026-05-01

This directory pins the **current** end-to-end result of running
`bin/validate-sdkgen` against the canonical 14-spec list with the local
`@voxgig/sdkgen` working copy patched up to commit `ec505e2` (v0.40.1) plus
the in-tree changes documented in `CHANGES.md`. Future runs are graded
relative to this snapshot.

- **Run dir** (full artifacts, kept until garbage-collected by the user):
  `~/Projects/voxgig-sdk/_runs/20260501T174858Z/`
- **Snapshot in this repo**: `REPORT.md`, `report.json`, `summary.log`.
- **sdkgen revision**: `ec505e29e5dd10323e00a513434c7b77aea993c8` (v0.40.1) +
  uncommitted in-tree fixes (see `CHANGES.md`).

## Scope

| | |
|---|---|
| Specs | 14 (the full `specs/default.txt` list) |
| Targets per spec | 7 (ts, js, go, py, php, rb, lua) |
| Test phase | enabled (`--test`) |
| Generate timeout | 1800 s |
| Test timeout | 600 s |
| Total potential test suites | 14 × 7 = 98 |

## Scoreboard

**69/98 (70.4%) target test suites passed.**

All 14 specs reached the test phase (zero scaffold/build/generate failures,
zero generate timeouts even on cloudsmith / gitlab / github — first time
those three have completed generation in this validation harness).

| Spec | ts | js | go | py | php | rb | lua | duration |
|---|---|---|---|---|---|---|---|---:|
| petstore | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 69s |
| solar | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 63s |
| taxonomy | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 61s |
| foo | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 65s |
| pokeapi | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 99s |
| dingconnect | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 80s |
| codatplatform | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ | 78s |
| contentfulcma | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ | 96s |
| learnworldsnew | ✓ | ✓ | ✗ | ✓ | ✗ | ✓ | ✓ | 56s |
| statuspage | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ | 86s |
| shortcut | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ | 93s |
| cloudsmith | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | 201s |
| gitlab | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | 537s |
| github | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | 675s |

**Totals:** 6 specs all-7-pass · 5 specs go/py/lua-only fail · 1 spec
go/php-only fail (learnworlds) · 2 huge specs ts/js fail (gitlab/github).
Total elapsed wall clock: 2,259 s (≈38 min).

## Environment

- node `v24.11.1`, npm `11.6.2`
- python `3.12.4`, pip `24.0`
- go `1.26.1`, make `3.81`
- php `8.5.5`, composer `2.9.7`
- ruby `3.2.2`, bundle `2.4.10`
- lua `5.5.0`, busted `2.3.0` (via `~/.luarocks/bin`)

## Reproducer

```sh
cd /Users/richard/Projects/voxgig/sdkgen && npm run build
PATH="$HOME/.luarocks/bin:$PATH" \
  /Users/richard/Projects/metsitaba/sdk-validate/bin/validate-sdkgen \
    --specs /Users/richard/Projects/metsitaba/sdk-validate/specs/default.txt \
    --test \
    --sdkgen-path /Users/richard/Projects/voxgig/sdkgen \
    --gen-timeout 1800 \
    --test-timeout 600
```

## Comparing future runs

```sh
./bin/summarize --run-dir ~/Projects/voxgig-sdk/_runs/<NEW> \
  | diff baseline/REPORT.md - | less
```

Or just compare the **Test totals** line — that's the leading indicator.
