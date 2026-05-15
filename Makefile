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
