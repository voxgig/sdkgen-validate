# sdkgen-validate — agent guide

## The environment is not a property of this repository

This repository is worked on from more than one machine, and from ephemeral
containers whose installed software differs from each other and from any
developer's workstation. A toolchain, a path, or a version present in one is
routinely absent in the next.

So never record an inventory of what is installed as though the repository
owned it, and never conclude that something cannot be built, run or verified
without checking the current environment first (`command -v <tool>`). A note
anywhere in this repository saying a tool was unavailable is a fact about the
environment that note was written in, and never about yours. The driver's own
`--test` precheck is the pattern to copy: it resolves each required binary at
startup and fails loudly on a miss rather than trusting a list. Where you
genuinely cannot verify something, say so rather than letting a partial check
stand in for the real one.

Read every toolchain list, version and absolute path here in that light. The
required-binary list in `README.md` states what a run demands, not what is
installed; the versions recorded under `baseline/` and the `Tools:` block of a
report under `reports/` are measurements of the machine that produced them;
and the `--defs` and `--out` defaults in `bin/validate-sdkgen`, along with
`LUAROCKS_BIN` in the `Makefile`, describe one checkout layout, so check them
against yours and override them rather than assume they resolve.

## Temporary local tool development

Prefer local symlinks to sibling tool checkouts when developing or testing
unreleased Voxgig tools together. Link to the actual package root (for example,
`apidef/ts` or `sdkgen/ts`), build that checkout, and verify that the consumer
resolves the linked code. Use existing validator local-path options where
available.

Do not create or copy `.zip`, `.tgz`, or `npm pack` snapshots into SDK projects
or ad hoc `vendor/` folders just to use local changes. Keep temporary links in
ignored dependency directories; keep machine-specific paths and temporary
`file:` dependencies out of committed manifests and lockfiles. Shared builds
and CI should use published versions or explicitly check out and build the
required source revisions.

Archives are appropriate when testing package contents or installation from a
packed release. Put those artifacts in a temporary test directory and clean
up artifacts created by the test afterward; do not scatter them across repos.


## Source code comments

Follow [COMMENT-POLICY.md](COMMENT-POLICY.md): comments are sparse and terse,
only for intricate or surprising code. Names carry intent; documents carry
requirements. Run `make comments comments-test` after editing source.
