# validate-sdkgen run report

- Started: `2026-09-24T14:05:04Z`
- Finished: `2026-09-24T14:30:38Z` (elapsed 1532s)

## Configuration
- `defs` = `.../apidef-validate/def`
- `out` = `.../svlua/out`
- `specs` = `.../specs/default.txt`
- `targets` = `lua`
- `gen_timeout` = `1800`
- `scaffold_timeout` = `900`
- `target_timeout` = `600`
- `build_timeout` = `900`
- `test_timeout` = `900`
- `keep` = `0`
- `clean_after` = `1`
- `run_tests` = `1`
- `no_docs` = `0`
- `only` = `gitlab,github`

Tools:
- `node` = `24.21.0`
- `npm` = `11.19.0`
- `python3` = `3.11.15`
- `go` = `1.24.7`
- `pip` = `24.0`
- `php` = `8.4.19`
- `composer` = `2.8.12`
- `ruby` = `3.3.6`
- `bundle` = `4.0.9`
- `lua` = `5.4.6`
- `busted` = `2.2.0`
- `make` = `4.3`

## Packages validated

| Package | Version |
|---|---|
| `@tabnas/jsonic` | `0.7.1` |
| `@tabnas/parser` | `0.12.2` |
| `@tabnas/yaml` | `0.5.8` |
| `@voxgig/apidef` | `8.17.0` |
| `@voxgig/create-sdkgen` | `0.28.0` |
| `@voxgig/docgen` | `0.27.0` |
| `@voxgig/model` | `12.0.0` |
| `@voxgig/sdkgen` | `4.25.0` |
| `@voxgig/struct` | `0.3.6` |
| `aontu` | `0.75.0` |
| `jostraca` | `0.39.0` |

## Scoreboard

| # | Name | Spec | Scaffold | Build | Warmup | Generate | TestModel | Targets | Outputs | Duration |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | gitlab | gitlab-v4-swagger-2.0.yaml | OK | OK | OK | OK | OK | 1/1 | 1/1 | 716s |
| 2 | github | github-1.1.4-openapi-3.0.3.yaml | OK | OK | OK | OK | OK | 1/1 | 1/1 | 816s |

**Totals:** 2/2 specs produced output for every target.

Warmup is the first generate pass, which the totals do not score.

## Per-target target-add results

| Name | lua |
|---|---|
| gitlab | OK |
| github | OK |

## Per-target output presence

| Name | lua |
|---|---|
| gitlab | ✓ |
| github | ✓ |

## Per-target deps (install) results

| Name | lua |
|---|---|
| gitlab | OK |
| github | OK |

## Per-target test results

| Name | lua |
|---|---|
| gitlab | OK |
| github | OK |

**Test totals:** 2/2 target test suites passed.
