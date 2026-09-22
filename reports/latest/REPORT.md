# validate-sdkgen run report

- Started: `2026-09-22T13:43:19Z`
- Finished: `2026-09-22T14:50:57Z` (elapsed 4056s)

## Configuration
- `defs` = `.../apidef-validate/def`
- `out` = `.../sv/fullout`
- `specs` = `specs/default.txt`
- `targets` = `ts,js,go,py,php,rb,lua`
- `gen_timeout` = `1800`
- `scaffold_timeout` = `900`
- `target_timeout` = `600`
- `build_timeout` = `900`
- `test_timeout` = `900`
- `keep` = `0`
- `clean_after` = `1`
- `run_tests` = `1`
- `no_docs` = `0`

Tools:
- `node` = `v24.21.0`
- `npm` = `11.19.0`
- `python3` = `Python 3.11.15`
- `go` = `go1.24.7`
- `pip` = `24.0`
- `php` = `8.4.19`
- `composer` = `2.8.12`
- `ruby` = `3.3.6`
- `bundle` = `unknown`
- `lua` = `5.4.6`
- `busted` = `2.3.0`
- `make` = `4.3`

## Packages validated

| Package | Version |
|---|---|
| `@tabnas/jsonic` | `0.6.7` |
| `@tabnas/parser` | `0.11.1` |
| `@tabnas/yaml` | `0.5.7` |
| `@voxgig/apidef` | `8.15.0` |
| `@voxgig/create-sdkgen` | `0.26.0` |
| `@voxgig/docgen` | `0.26.0` |
| `@voxgig/model` | `11.1.1` |
| `@voxgig/sdkgen` | `4.23.0, 4.24.0` |
| `@voxgig/struct` | `0.3.6` |
| `aontu` | `0.72.0` |
| `jostraca` | `0.38.1` |

`@voxgig/sdkgen` changed during the run: `4.23.0` for petstore, solar, taxonomy, foo, pokeapi, dingconnect, codatplatform, contentfulcma, learnworldsnew, statuspage, shortcut, cloudsmith, gitlab; `4.24.0` for github.

## Scoreboard

| # | Name | Spec | Scaffold | Build | Warmup | Generate | TestModel | Targets | Outputs | Duration |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | petstore | petstore-1.0.7-swagger-2.0.json | OK | OK | OK | OK | OK | 7/7 | 7/7 | 123s |
| 2 | solar | solar-1.0.0-openapi-3.0.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 101s |
| 3 | taxonomy | taxonomy-1.0.0-openapi-3.1.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 119s |
| 4 | foo | foo-1.0.0-openapi-3.1.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 118s |
| 5 | pokeapi | pokeapi-20220523-openapi-3.0.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 141s |
| 6 | dingconnect | dingconnect-v1-swagger-2.0.json | OK | OK | OK | OK | OK | 7/7 | 7/7 | 102s |
| 7 | codatplatform | codatplatform-3.0.0-openapi-3.1.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 139s |
| 8 | contentfulcma | contentfulcma-1.0.0-openapi-3.0.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 150s |
| 9 | learnworldsnew | learnworlds-2-openapi-3.1.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 140s |
| 10 | statuspage | statuspage-1.0.0-openapi-3.0.0.json | OK | OK | OK | OK | OK | 7/7 | 7/7 | 126s |
| 11 | shortcut | shortcut-v3-openapi-3.0.0.json | OK | OK | OK | OK | OK | 7/7 | 7/7 | 149s |
| 12 | cloudsmith | cloudsmith-v1-swagger-2.0.json | OK | OK | OK | OK | OK | 7/7 | 7/7 | 335s |
| 13 | gitlab | gitlab-v4-swagger-2.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 1104s |
| 14 | github | github-1.1.4-openapi-3.0.3.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 1209s |

**Totals:** 14/14 specs produced output for every target.

Warmup is the first generate pass, which the totals do not score.

## Per-target target-add results

| Name | ts | js | go | py | php | rb | lua |
|---|---|---|---|---|---|---|---|
| petstore | OK | OK | OK | OK | OK | OK | OK |
| solar | OK | OK | OK | OK | OK | OK | OK |
| taxonomy | OK | OK | OK | OK | OK | OK | OK |
| foo | OK | OK | OK | OK | OK | OK | OK |
| pokeapi | OK | OK | OK | OK | OK | OK | OK |
| dingconnect | OK | OK | OK | OK | OK | OK | OK |
| codatplatform | OK | OK | OK | OK | OK | OK | OK |
| contentfulcma | OK | OK | OK | OK | OK | OK | OK |
| learnworldsnew | OK | OK | OK | OK | OK | OK | OK |
| statuspage | OK | OK | OK | OK | OK | OK | OK |
| shortcut | OK | OK | OK | OK | OK | OK | OK |
| cloudsmith | OK | OK | OK | OK | OK | OK | OK |
| gitlab | OK | OK | OK | OK | OK | OK | OK |
| github | OK | OK | OK | OK | OK | OK | OK |

## Per-target output presence

| Name | ts | js | go | py | php | rb | lua |
|---|---|---|---|---|---|---|---|
| petstore | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| solar | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| taxonomy | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| foo | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| pokeapi | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| dingconnect | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| codatplatform | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| contentfulcma | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| learnworldsnew | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| statuspage | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| shortcut | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| cloudsmith | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| gitlab | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| github | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## Per-target deps (install) results

| Name | ts | js | go | py | php | rb | lua |
|---|---|---|---|---|---|---|---|
| petstore | OK | OK | OK | OK | OK | OK | OK |
| solar | OK | OK | OK | OK | OK | OK | OK |
| taxonomy | OK | OK | OK | OK | OK | OK | OK |
| foo | OK | OK | OK | OK | OK | OK | OK |
| pokeapi | OK | OK | OK | OK | OK | OK | OK |
| dingconnect | OK | OK | OK | OK | OK | OK | OK |
| codatplatform | OK | OK | OK | OK | OK | OK | OK |
| contentfulcma | OK | OK | OK | OK | OK | OK | OK |
| learnworldsnew | OK | OK | OK | OK | OK | OK | OK |
| statuspage | OK | OK | OK | OK | OK | OK | OK |
| shortcut | OK | OK | OK | OK | OK | OK | OK |
| cloudsmith | OK | OK | OK | OK | OK | OK | OK |
| gitlab | OK | OK | OK | OK | OK | OK | OK |
| github | OK | OK | OK | OK | OK | OK | OK |

## Per-target test results

| Name | ts | js | go | py | php | rb | lua |
|---|---|---|---|---|---|---|---|
| petstore | OK | FAIL(1) | FAIL(2) | FAIL(2) | FAIL(2) | FAIL(2) | FAIL(2) |
| solar | OK | OK | OK | OK | OK | OK | OK |
| taxonomy | OK | OK | OK | OK | OK | OK | OK |
| foo | OK | OK | OK | OK | OK | OK | OK |
| pokeapi | OK | OK | OK | OK | OK | OK | OK |
| dingconnect | OK | FAIL(1) | FAIL(2) | FAIL(2) | FAIL(2) | FAIL(2) | FAIL(2) |
| codatplatform | OK | OK | OK | OK | OK | OK | OK |
| contentfulcma | OK | OK | OK | OK | OK | OK | OK |
| learnworldsnew | OK | OK | OK | OK | OK | OK | OK |
| statuspage | OK | OK | OK | OK | OK | OK | OK |
| shortcut | OK | FAIL(1) | FAIL(2) | FAIL(2) | FAIL(2) | FAIL(2) | FAIL(2) |
| cloudsmith | OK | FAIL(1) | FAIL(2) | FAIL(2) | FAIL(2) | FAIL(2) | FAIL(2) |
| gitlab | OK | FAIL(1) | FAIL(2) | FAIL(2) | FAIL(2) | FAIL(2) | FAIL(2) |
| github | OK | OK | OK | OK | OK | OK | OK |

**Test totals:** 68/98 target test suites passed.
