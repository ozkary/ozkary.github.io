# ==============================================================================
# Makefile - Ozkary.dev Markdown Export & Site Build Tool
# ==============================================================================
# Usage:
#   make export FILE=_events/somepage.md
#   make _events/somepage.md
#   make /_events/somepage.md
#   make events
#   make posts
#   make help
# ==============================================================================

PYTHON        ?= python3
EXPORT_SCRIPT := scripts/export.py
BASE_URL      ?= https://www.ozkary.dev
OUTPUT_DIR    ?= export

# Support variable in uppercase, lowercase, or fallback
FILE ?= $(file)

.PHONY: default export help clean FORCE events posts all serve build event post html

# Default target runs export if FILE is specified, otherwise shows help
default: export

# Main export target
export:
	@if [ -n "$(FILE)" ]; then \
		$(PYTHON) $(EXPORT_SCRIPT) "$(FILE)" --output-dir "$(OUTPUT_DIR)" --base-url "$(BASE_URL)"; \
	else \
		$(MAKE) help; \
	fi

# Aliases for export
event: export
post: export
html: export

# Pattern rule: Allows running `make _events/somepage.md` or `make path/to/file.md`
%.md: FORCE
	@$(PYTHON) $(EXPORT_SCRIPT) "$@" --output-dir "$(OUTPUT_DIR)" --base-url "$(BASE_URL)"

# Pattern rule: Allows running with leading slash `make /_events/somepage.md`
/%.md: FORCE
	@$(PYTHON) $(EXPORT_SCRIPT) "/$*.md" --output-dir "$(OUTPUT_DIR)" --base-url "$(BASE_URL)"

# Pattern rule: Allows requesting the exported target HTML file directly
export/%.html: FORCE
	@$(PYTHON) $(EXPORT_SCRIPT) "$*" --output-dir "$(OUTPUT_DIR)" --base-url "$(BASE_URL)"

# Batch export all events
events:
	@echo "Exporting all events in _events/..."
	@find _events -name "*.md" -type f | while read -r f; do \
		$(PYTHON) $(EXPORT_SCRIPT) "$$f" --output-dir "$(OUTPUT_DIR)" --base-url "$(BASE_URL)"; \
	done

# Batch export all posts
posts:
	@echo "Exporting all posts in _posts/2026/..."
	@find _posts/2026 -name "*.md" -type f | while read -r f; do \
		$(PYTHON) $(EXPORT_SCRIPT) "$$f" --output-dir "$(OUTPUT_DIR)" --base-url "$(BASE_URL)"; \
	done

# Batch export both events and posts
all: events posts

# Jekyll convenience targets
serve:
	bundle exec jekyll serve --livereload

build:
	bundle exec jekyll build

# Clean exported HTML and MD files
clean:
	@echo "Cleaning $(OUTPUT_DIR)..."
	@rm -f $(OUTPUT_DIR)/*.html $(OUTPUT_DIR)/*.md
	@echo "Done."

# Help documentation
help:
	@echo "=========================================================================="
	@echo "  Markdown to HTML / Syndication Export Tool"
	@echo "=========================================================================="
	@echo "  Commands:"
	@echo "    make export FILE=<path>     Export markdown to HTML & clean MD"
	@echo "    make <path/to/file.md>      Direct export by target file path"
	@echo "    make /_events/somepage.md   Direct export with leading slash"
	@echo "    make events                 Export all events in _events/"
	@echo "    make posts                  Export all posts in _posts/2026/"
	@echo "    make all                    Export all events and posts"
	@echo "    make serve                  Run local Jekyll dev server with livereload"
	@echo "    make build                  Build Jekyll site"
	@echo "    make clean                  Remove generated files from $(OUTPUT_DIR)/"
	@echo "    make help                   Show this help message"
	@echo ""
	@echo "  Examples:"
	@echo "    make export FILE=_events/somepage.md"
	@echo "    make _events/2026/2026-09-30-event-beyond-the-persona-master-skills-and-commands.md"
	@echo "    make /_events/somepage.md"
	@echo ""
	@echo "  Options:"
	@echo "    FILE=<path>                 Markdown file to convert (also accepts 'file=')"
	@echo "    OUTPUT_DIR=<dir>            Destination directory (default: $(OUTPUT_DIR))"
	@echo "    BASE_URL=<url>              Site base URL for assets (default: $(BASE_URL))"
	@echo "=========================================================================="

FORCE:
