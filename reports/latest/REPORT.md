# validate-sdkgen run report

- Started: `2026-05-05T16:46:53Z`
- Finished: `2026-05-05T17:34:33Z` (elapsed 2854s)

## Configuration
- `defs` = `/Users/richard/Projects/voxgig/apidef-validate/def`
- `out` = `/Users/richard/Projects/voxgig-sdk`
- `specs` = `/Users/richard/Projects/metsitaba/sdk-validate/specs/default.txt`
- `targets` = `ts,js,go,py,php,rb,lua`
- `gen_timeout` = `600`
- `scaffold_timeout` = `600`
- `target_timeout` = `180`
- `build_timeout` = `180`
- `keep` = `0`

Tools:
- `node` = `v24.11.1`
- `npm` = `11.6.2`
- `python3` = `Python 3.12.4`
- `go` = `go1.26.1`
- `pip` = `24.0`
- `php` = `8.5.5`
- `composer` = `2.9.7`
- `ruby` = `3.2.2`
- `bundle` = `2.4.10`
- `lua` = `5.5.0`
- `busted` = `2.3.0`
- `make` = `3.81`

## Scoreboard

| # | Name | Spec | Scaffold | Build | Generate | Targets | Outputs | Duration |
|---|---|---|---|---|---|---|---|---|
| 1 | petstore | petstore-1.0.7-swagger-2.0.json | OK | OK | OK | 7/7 | 7/7 | 105s |
| 2 | solar | solar-1.0.0-openapi-3.0.0.yaml | OK | OK | OK | 7/7 | 7/7 | 85s |
| 3 | taxonomy | taxonomy-1.0.0-openapi-3.1.0.yaml | OK | OK | OK | 7/7 | 7/7 | 68s |
| 4 | foo | foo-1.0.0-openapi-3.1.0.yaml | OK | OK | OK | 7/7 | 7/7 | 99s |
| 5 | pokeapi | pokeapi-20220523-openapi-3.0.0.yaml | OK | OK | OK | 7/7 | 7/7 | 138s |
| 6 | dingconnect | dingconnect-v1-swagger-2.0.json | OK | OK | OK | 7/7 | 7/7 | 115s |
| 7 | codatplatform | codatplatform-3.0.0-openapi-3.1.0.yaml | OK | OK | OK | 7/7 | 7/7 | 118s |
| 8 | contentfulcma | contentfulcma-1.0.0-openapi-3.0.0.yaml | OK | OK | OK | 7/7 | 7/7 | 132s |
| 9 | learnworldsnew | learnworlds-2-openapi-3.1.0.yaml | OK | OK | OK | 7/7 | 7/7 | 68s |
| 10 | statuspage | statuspage-1.0.0-openapi-3.0.0.json | OK | OK | OK | 7/7 | 7/7 | 76s |
| 11 | shortcut | shortcut-v3-openapi-3.0.0.json | OK | OK | OK | 7/7 | 7/7 | 92s |
| 12 | cloudsmith | cloudsmith-v1-swagger-2.0.json | OK | OK | OK | 7/7 | 7/7 | 249s |
| 13 | gitlab | gitlab-v4-swagger-2.0.yaml | OK | OK | OK | 7/7 | 7/7 | 764s |
| 14 | github | github-1.1.4-openapi-3.0.3.yaml | OK | OK | OK | 7/7 | 7/7 | 745s |

**Totals:** 14/14 specs produced output for every target.

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
