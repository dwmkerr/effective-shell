SHELL:=/bin/bash

# Setup tools required for local development.
.PHONY: setup
setup:
	brew install hugo
	hugo version

# Serve the site locally for testing.
.PHONY: serve
serve:
	cd website && hugo server --baseURL "http://localhost/" --buildDrafts -v --debug

# Build the site, including the downloads directory. This requires that we also
# run the 'build-samples.sh' script to zip and tar the effective shell samples.
# The build recipe also tests that the samples files are created in the downloads
# folder as if we don't have them we should definitely not deploy.
.PHONY: build
build:
	./scripts/build-playground.sh
	cp ./artifacts/playground.zip  ./website/playground.zip
	cd website && hugo --minify
	test -e ./website/playground.zip

# Create the summary structure in word format, easier to share.
.PHONY: structure
structure:
	pandoc -o structure.docx -f markdown -t docx structure.md

# Create the statistics document.
.PHONY: statistics
statistics:
	./scripts/wordcount.sh ./website/content/docs/*/**/_index.md > statistics.csv
