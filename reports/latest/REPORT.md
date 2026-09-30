# validate-sdkgen run report

- Started: `2026-09-30T09:16:51Z`
- Finished: `2026-09-30T10:48:32Z` (elapsed 5501s)

## Configuration
- `defs` = `.../apidef-validate/def`
- `out` = `.../scratchpad/sv-out-full3`
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
| `@tabnas/jsonic` | `0.7.2` |
| `@tabnas/parser` | `0.12.7` |
| `@tabnas/yaml` | `0.5.15` |
| `@voxgig/apidef` | `8.22.1` |
| `@voxgig/create-sdkgen` | `0.30.4` |
| `@voxgig/docgen` | `0.30.0` |
| `@voxgig/model` | `12.0.0` |
| `@voxgig/sdkgen` | `4.32.1` |
| `@voxgig/struct` | `0.3.6` |
| `aontu` | `0.76.0` |
| `jostraca` | `0.39.0` |

## Scoreboard

| # | Name | Spec | Scaffold | Build | Warmup | Generate | TestModel | Targets | Outputs | Duration |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | petstore | petstore-1.0.7-swagger-2.0.json | OK | OK | OK | OK | OK | 7/7 | 7/7 | 474s |
| 2 | solar | solar-1.0.0-openapi-3.0.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 163s |
| 3 | taxonomy | taxonomy-1.0.0-openapi-3.1.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 163s |
| 4 | foo | foo-1.0.0-openapi-3.1.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 159s |
| 5 | pokeapi | pokeapi-20220523-openapi-3.0.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 245s |
| 6 | dingconnect | dingconnect-v1-swagger-2.0.json | OK | OK | OK | OK | OK | 7/7 | 7/7 | 169s |
| 7 | codatplatform | codatplatform-3.0.0-openapi-3.1.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 192s |
| 8 | contentfulcma | contentfulcma-1.0.0-openapi-3.0.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 215s |
| 9 | learnworldsnew | learnworlds-2-openapi-3.1.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 197s |
| 10 | statuspage | statuspage-1.0.0-openapi-3.0.0.json | OK | OK | OK | OK | OK | 7/7 | 7/7 | 190s |
| 11 | shortcut | shortcut-v3-openapi-3.0.0.json | OK | OK | OK | OK | OK | 7/7 | 7/7 | 231s |
| 12 | cloudsmith | cloudsmith-v1-swagger-2.0.json | OK | OK | OK | OK | OK | 7/7 | 7/7 | 346s |
| 13 | gitlab | gitlab-v4-swagger-2.0.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 1264s |
| 14 | github | github-1.1.4-openapi-3.0.3.yaml | OK | OK | OK | OK | OK | 7/7 | 7/7 | 1322s |

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

**Test totals:** 98/98 target test suites passed.
