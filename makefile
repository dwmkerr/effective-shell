SHELL:=/bin/bash

# Setup tools required for local development.
setup:
	brew install hugo
	hugo vesion

# Serve the site locally for testing.
serve:
	cd website && hugo server --baseURL "http://localhost/" --buildDrafts -v --debug

# Build the site.
build:
	# Zip up the playground and add to the 'static/downloads' folder.
	mkdir -p website/static/downloads
	zip -r website/static/downloads/effective-shell-playground.zip effective-shell-playground
	cd website && hugo --minify

# Create the summary structure in word format, easier to share.
structure:
	pandoc -o structure.docx -f markdown -t docx structure.md

# Create the statistics document.
statistics:
	./scripts/wordcount.sh ./website/content/docs/*/**/_index.md > statistics.csv



.PHONY: setup serve build
