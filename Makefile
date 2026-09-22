VALIDATE := ./bin/validate-sdkgen
SUMMARIZE := ./bin/summarize
SPECS_DEFAULT := specs/default.txt
SPECS_SMOKE := specs/smoke.txt
LUAROCKS_BIN := $(HOME)/.luarocks/bin
TEST_PATH := PATH="$(LUAROCKS_BIN):$$PATH"

.PHONY: help validate smoke full test smoke-test full-test summarize clean-runs

help:
	@echo "Targets:"
	@echo "  smoke         - validate 3 small specs across all 7 targets"
	@echo "  full          - validate the full 14-spec canonical list"
	@echo "  smoke-test    - smoke + run each generated SDK's own test suite"
	@echo "  full-test     - full + run each generated SDK's own test suite"
	@echo "  validate      - alias for 'full'"
	@echo "  summarize RUN=<dir> - regenerate REPORT.md / report.json for a run"
	@echo "  test          - this repository's own gates (no SDK generation)"
	@echo ""
	@echo "Pass extra flags via ARGS, e.g.:"
	@echo "  make smoke ARGS='--only petstore --targets ts,go'"
	@echo "  make full ARGS='--gen-timeout 1800'"

smoke:
	$(VALIDATE) --specs $(SPECS_SMOKE) $(ARGS)

full:
	$(VALIDATE) --specs $(SPECS_DEFAULT) $(ARGS)

validate: full

smoke-test:
	$(TEST_PATH) $(VALIDATE) --specs $(SPECS_SMOKE) --test $(ARGS)

full-test:
	$(TEST_PATH) $(VALIDATE) --specs $(SPECS_DEFAULT) --test $(ARGS)

summarize:
	@test -n "$(RUN)" || { echo "usage: make summarize RUN=<run-dir>"; exit 2; }
	$(SUMMARIZE) --run-dir $(RUN)

# The repository's own gates. These check the harness, not @voxgig/sdkgen:
# a validation run is `make smoke` / `make full`.
test: comments comments-test test-local-links test-summarize

.PHONY: comments comments-test hooks
comments:
	node tools/comment-gate.cjs

comments-test:
	node --test tools/comment-gate.test.cjs

hooks:
	git config core.hooksPath .githooks

.PHONY: test-local-links test-summarize
test-local-links:
	node --test test-link-local.cjs

test-summarize:
	node --test tools/summarize.test.cjs

