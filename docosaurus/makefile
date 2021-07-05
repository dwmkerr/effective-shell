.PHONY: init
init:
	npm install

.PHONY: dev
dev:
	npm start

.PHONY: build
build:
	npm run build

.PHONY: deploy
deploy: build
	GIT_USER=dwmkerr USE_SSH=true npm run deploy
