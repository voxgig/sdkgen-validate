# Apidef schema migration validation

Local validation on 2026-09-21. Changes are on `migrate-apidef-schema` in
separate worktrees; existing working copies were preserved. No release was made.

## Source revisions

The migration started from freshly fetched main revisions:

| Repository | Main revision |
| --- | --- |
| sdkgen | f115c05c |
| sdkgen-langpack | 75ca7e3 |
| sdkgen-infrapack | 515cc21 |
| sdkgen-validate | 8656bce |
| create-sdkgen | 997937c |

The linked schema producer is local apidef 8.13.0 at `f7a10582`, with local
Aontu 0.71.0 at `7b22a277`. Project dependencies use ignored symlinks, including
the generated Seneca provider's TypeScript SDK dependency. The scaffold's
`BuildSDK.ts` also needed compact field, argument and provenance reads.

## Package and source checks

- sdkgen full suite: 1,396 passed, seven skipped, zero failed.
- Final Python data-wrapper regression: passed. The subsequent generation suite
  passed all 97 tests; the changed scaffold manifest was regenerated and both
  characterization tests then passed.
- sdkgen-langpack: 32 passed.
- sdkgen-infrapack: 41 passed.
- create-sdkgen: 56 passed.
- Local dependency linker: passed, including paths containing spaces, repeated
  overrides, CLI resolution, and unchanged manifests and lockfiles.
- Model checks, applicable comment gates, prose gate with pinned Vale, and
  whitespace checks passed.

## Corpus generation

All 14 default specifications passed scaffold, build, test-model and generation:
98/98 outputs across TS, JS, Go, Python, PHP, Ruby and Lua. This covers Petstore,
Solar, Taxonomy, Foo, PokeAPI, DingConnect, Codat Platform, Contentful CMA,
LearnWorlds, Statuspage, Shortcut, Cloudsmith, GitLab and GitHub.

## Generated native suites

| Spec | Passed | Known baseline failures |
| --- | --- | --- |
| Solar | 11/11 | None |
| Taxonomy | 9/11 | Haskell pagination; Lean endpoint selection |
| Petstore | 1/7 | Auth tests in JS, Go, Python, PHP, Ruby and Lua |

Solar and Taxonomy cover TS, JS, Go, Python, PHP, Ruby, Lua, Dart, Haskell,
Lean and Seneca provider. Petstore covers the first seven targets.

All listed failures were reproduced with unchanged latest-main sdkgen;
Taxonomy also used unchanged latest-main sdkgen-langpack. Haskell fails four
assertions for `paginated_observation.stream`, its signal variant,
`paginated_taxa.stream`, and its signal variant. Lean cannot select a list
endpoint for `paginated_taxa`.

The combined native and corpus runs completed all phase checks, but editing the
running validator's help text interrupted their final reporting steps. Their
reports were rebuilt from the completed phase logs. Shell syntax checks pass.
A subsequent fresh Solar run with TS and Seneca provider passed all phases,
including reporting and a zero exit status, with automatic local Git setup.

Documentation editions were disabled with `--no-docs`: Docgen still reads the
previous field-list schema and is outside this migration. SDK README templates
were generated and checked. No live API credentials or live API calls were used.

## Reproduction

Build each local checkout, link its dependencies to the intended local package
roots, and use the local-path command in the repository README. Python tests need
a virtual environment; the native target toolchains must be on PATH. Generated
Seneca provider maintenance tests require Git metadata; the validator now creates
a local main branch when the output has no Git repository.
