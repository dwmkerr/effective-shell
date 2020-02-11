# Setup tools required for local development.
setup:
	brew install hugo
	hugo vesion

# Serve the site locally for testing.
serve:
	cd website && hugo server --baseURL "http://localhost/" --buildDrafts -v --debug

# Build the site.
build:
	cd website && hugo --minify

# Create the summary document in word format.
summary:
	pandoc -o structure.docx -f markdown -t docx structure.md


.PHONY: setup serve build
