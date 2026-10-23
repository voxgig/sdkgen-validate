# validate-sdkgen run report

- Started: `2026-10-23T13:30:23Z`
- Finished: `2026-10-23T13:59:24Z` (elapsed 1739s)

## Configuration
- `defs` = `.../apidef-validate/def`
- `out` = `.../scratchpad/svout2`
- `specs` = `.../specs/default.txt`
- `targets` = `ts,js,go,py,php,rb,lua`
- `gen_timeout` = `1800`
- `scaffold_timeout` = `600`
- `target_timeout` = `180`
- `build_timeout` = `180`
- `test_timeout` = `900`
- `keep` = `0`
- `clean_after` = `1`
- `run_tests` = `1`
- `no_docs` = `0`

Tools:
- `node` = `24.16.0`
- `npm` = `12.0.1`
- `python3` = `3.14.6`
- `go` = `1.26.3`
- `pip` = `missing`
- `php` = `8.5.7`
- `composer` = `2.10.1`
- `ruby` = `4.0.5`
- `bundle` = `4.0.11`
- `lua` = `5.5.0`
- `busted` = `2.3.0`
- `make` = `3.81`

## Packages validated

| Package | Version |
|---|---|
| `@tabnas/jsonic` | `0.7.10` |
| `@tabnas/parser` | `0.12.15` |
| `@tabnas/yaml` | `0.5.26` |
| `@voxgig/apidef` | `8.25.5` |
| `@voxgig/create-sdkgen` | `0.30.8` |
| `@voxgig/docgen` | `0.30.7` |
| `@voxgig/model` | `12.0.1` |
| `@voxgig/sdkgen` | `4.35.3` |
| `@voxgig/struct` | `0.3.7` |
| `aontu` | `0.76.1` |
| `jostraca` | `0.40.0` |

## Scoreboard

| # | Name | Spec | Scaffold | Build | Warmup | Generate | TestModel | Targets | Outputs | Duration |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | petstore | petstore-1.0.7-swagger-2.0.json | OK | OK | OK | OK | OK | 7/7 | 7/7 | 62s |
| 2 | solar | solar-1.0.0-openapi-3.0.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 52s |
| 3 | taxonomy | taxonomy-1.0.0-openapi-3.1.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 56s |
| 4 | foo | foo-1.0.0-openapi-3.1.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 57s |
| 5 | pokeapi | pokeapi-20220523-openapi-3.0.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 85s |
| 6 | dingconnect | dingconnect-v1-swagger-2.0.json | OK | OK | OK | OK | OK | 7/7 | 7/7 | 75s |
| 7 | codatplatform | codatplatform-3.0.0-openapi-3.1.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 67s |
| 8 | contentfulcma | contentfulcma-1.0.0-openapi-3.0.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 81s |
| 9 | learnworldsnew | learnworlds-2-openapi-3.1.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 74s |
| 10 | statuspage | statuspage-1.0.0-openapi-3.0.0.json | OK | OK | OK | OK | OK | 7/7 | 7/7 | 65s |
| 11 | shortcut | shortcut-v3-openapi-3.0.0.json | OK | OK | OK | OK | OK | 7/7 | 7/7 | 97s |
| 12 | cloudsmith | cloudsmith-v1-swagger-2.0.json | OK | OK | OK | OK | OK | 7/7 | 7/7 | 130s |
| 13 | gitlab | gitlab-v4-swagger-2.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 398s |
| 14 | github | github-1.1.4-openapi-3.0.3.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 440s |

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
| petstore | OK | OK | OK | OK | OK | OK | OK |
| solar | OK | OK | OK | OK | OK | OK | OK |
| taxonomy | FAIL(1) | FAIL(1) | FAIL(2) | FAIL(2) | FAIL(2) | FAIL(2) | FAIL(2) |
| foo | OK | OK | OK | OK | OK | OK | OK |
| pokeapi | OK | OK | OK | OK | OK | OK | OK |
| dingconnect | OK | OK | OK | OK | OK | OK | OK |
| codatplatform | FAIL(1) | OK | OK | FAIL(2) | OK | OK | OK |
| contentfulcma | OK | OK | OK | OK | OK | OK | OK |
| learnworldsnew | OK | OK | OK | OK | OK | OK | OK |
| statuspage | OK | OK | OK | OK | OK | OK | OK |
| shortcut | OK | OK | OK | OK | OK | OK | OK |
| cloudsmith | OK | OK | OK | OK | OK | OK | OK |
| gitlab | FAIL(1) | OK | FAIL(2) | FAIL(2) | FAIL(2) | FAIL(2) | FAIL(2) |
| github | FAIL(1) | OK | OK | FAIL(2) | OK | OK | OK |

**Test totals:** 81/98 target test suites passed.
