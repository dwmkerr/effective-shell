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

# Build the site.
# We also create a zip and tar.gz of the playground/samples folder for quick
# downloads for the user. We put the current version in the playground folder
# as well for reference.
.PHONY: build
build:
	mkdir -p website/static/downloads
	cp version.txt ./effective-shell-playground/.version.txt
	zip -r website/static/downloads/effective-shell-playground.zip ./effective-shell-playground
	tar czf website/static/downloads/effective-shell-playground.tar.gz -C ./effective-shell-playground .
	cd website && hugo --minify

# Create the summary structure in word format, easier to share.
.PHONY: structure
structure:
	pandoc -o structure.docx -f markdown -t docx structure.md

# Create the statistics document.
.PHONY: statistics
statistics:
	./scripts/wordcount.sh ./website/content/docs/*/**/_index.md > statistics.csv
