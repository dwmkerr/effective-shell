SHELL:=/bin/bash

default: help

.PHONY: help
help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

.PHONY: setup
setup: # Setup tools required for local development.
	npm install

.PHONY: serve
serve: # Serve the site locally for testing.
	npm start

.PHONY: typescript-check
typescript-check: # Check typescript types.
	npm install
	npm run ts:check

# Build the site, including the downloads directory. This requires that we also
# run the 'build-samples.sh' script to zip and tar the effective shell samples.
# The build recipe also tests that the samples files are created in the downloads
# folder as if we don't have them we should definitely not deploy.
.PHONY: build
build: # Build the site and artifacts.
	mkdir -p ./static/downloads
	./scripts/build-samples.sh
	cp ./artifacts/samples.zip  ./static/downloads/effective-shell-samples.zip
	cp ./artifacts/samples.tar.gz ./static/downloads/effective-shell-samples.tar.gz
	test -e ./static/downloads/effective-shell-samples.zip
	test -e ./static/downloads/effective-shell-samples.tar.gz
	npm ci && npm run build

# Create the summary structure in word format, easier to share.
.PHONY: structure
structure: # Create the structure work doc.
	pandoc -o structure.docx -f markdown -t docx structure.md

# Create the statistics document.
.PHONY: statistics
statistics: # Create wordcount statistics.
	./scripts/wordcount.sh ./docs/*/**/index.md > statistics.csv
