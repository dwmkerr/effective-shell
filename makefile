SHELL:=/bin/bash

# Setup tools required for local development.
.PHONY: setup
setup:
	npm install

# Serve the site locally for testing.
.PHONY: serve
serve:
	npm start

# Check typescript types.
typescript-check:
	npm install
	npm run ts:check

# Build the site, including the downloads directory. This requires that we also
# run the 'build-samples.sh' script to zip and tar the effective shell samples.
# The build recipe also tests that the samples files are created in the downloads
# folder as if we don't have them we should definitely not deploy.
.PHONY: build
build:
	npx tsc # test for typescript types...
	mkdir -p ./static/downloads
	./scripts/build-samples.sh
	cp ./artifacts/samples.zip  ./static/downloads/effective-shell-samples.zip
	cp ./artifacts/samples.tar.gz ./static/downloads/effective-shell-samples.tar.gz
	test -e ./static/downloads/effective-shell-samples.zip
	test -e ./static/downloads/effective-shell-samples.tar.gz
	npm ci && npm run build

# Create the summary structure in word format, easier to share.
.PHONY: structure
structure:
	pandoc -o structure.docx -f markdown -t docx structure.md

# Create the statistics document.
.PHONY: statistics
statistics:
	./scripts/wordcount.sh ./docs/*/**/index.md > statistics.csv
