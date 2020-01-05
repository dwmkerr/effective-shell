# Setup tools required for local development.
setup:
	brew install hugo
	hugo vesion

# Serve the site locally for testing.
serve:
	hugo server --baseURL "http://localhost/" --buildDrafts -v --debug

# Build the site.
build:
	hugo --minify

.PHONY: setup serve
