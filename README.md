# effective-shell 
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Release Please](https://github.com/dwmkerr/effective-shell/actions/workflows/release-please.yaml/badge.svg)](https://github.com/dwmkerr/effective-shell/actions/workflows/release-please.yaml) ![Version Badge](https://img.shields.io/github/v/tag/dwmkerr/effective-shell?label=version) [![Creative Commons BY-NC-SA](https://i.creativecommons.org/l/by-nc-sa/3.0/80x15.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

Text, samples and references for my 'Effective Shell' series. This website is hosted at [effective-shell.com](https://effective-shell.com).

If you find this book useful, please do consider [sponsoring me](https://github.com/sponsors/dwmkerr) to help support my open-source work!

<!-- vim-markdown-toc GFM -->

* [Introduction](#introduction)
* [Installing the Samples](#installing-the-samples)
* [The Website](#the-website)
    * [Building the Website](#building-the-website)
* [Versioning](#versioning)
* [Contributing](#contributing)
* [Copyright & Licensing](#copyright--licensing)
* [Thanks!](#thanks)

<!-- vim-markdown-toc -->

## Introduction

This repository contains all of the content for the [Effective Shell](https://effective-shell.com/) online book.

## Installing the Samples

You can install the samples into your `~/effective-shell` folder with this command:

```sh
curl effective.sh | sh
```

Or can also manually download them using from any of these locations:

- [https://effective-shell.com/downloads/effective-shell-samples.zip](https://effective-shell.com/downloads/effective-shell-samples.zip)
- [https://effective-shell.com/downloads/effective-shell-samples.tar.gz](https://effective-shell.com/downloads/effective-shell-samples.tar.gz)

The one-line shell installer is hosted at [github.com/dwmkerr/effective-shell-installer](https://github.com/dwmkerr/effective-shell-installer)

## The Website

The content in this repository is built into a static site available at [effective-shell.com](https://effective-shell.com). This site is generated using [Docusaurus](https://docusaurus.io).

This section contains information on how to built, use and edit the site. To help you quickly edit the site, some tips are below:

- The book content is at [./docs/](./docs/)
- The menu structure is defined at [sidebars.js](sidebars.js).

### Building the Website

To setup dependencies, run:

```sh
make setup
```

To serve the site locally, run:

```sh
make serve
```

To build the site, run:

```sh
make build
```

The built site is generated at `./build`.

Note that the [`samples`](./samples) folder is automatically zipped up and added to the website, meaning it can be downloaded directly from:

```
https://effective-shell.com/downloads/effective-shell-samples.zip
https://effective-shell.com/downloads/effective-shell-samples.tar.gz
```

## Versioning

The version of the site and the code is defined in the [`package.json`](./package.json) file.

Releasing in managed via [Release Please](https://github.com/googleapis/release-please) in the [`release-please.yaml`](./.github/workflows/release-please.yaml) workflow file.

## Contributing

Please carefully read the [Contributing Guide](./.github/contributing.md) before working on changes.

## Copyright & Licensing

All content is Copyright (©) Dave Kerr. Please get in touch by opening an issue if you have questions on copyright or licensing.

[![Creative Commons BY-NC-SA](https://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-nc-sa/3.0/).

## Thanks!

Thanks to the following people who have helped with reviews, comments, suggestions.

- Andrew Bestbier, Thomas Neumann, Tam Nguyen, Rahul Maliakkal, Peter Mondlock, Samantha Baldwin, Niklas Schmuecker for the proofing, comments and suggestions
- [Ogus Ismail](https://stackoverflow.com/users/10248678/oguz-ismail) for helping me understand some of the [nuances of word splitting and filename expansion](https://stackoverflow.com/questions/67648392/how-can-i-confirm-whether-whitespace-or-special-characters-are-escaped-in-a-wild)
- [Josh Timmons](https://github.com/josh-59) for proof-reading and suggesting structural improvements as well as grammar and spelling fixes
- [Joel Schwarzmann](https://github.com/datajoely) for proofing and adding content on the Python code in the 'How to avoid shell scripting' chapter
- [Xiaoyou "Elsie" Jiang](https://github.com/xiaoyou-elsie-jiang) for proof-reading and improvements to Chapter 30

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/xiaoyou-elsie-jiang"><img src="https://avatars.githubusercontent.com/u/101381124?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Xiaoyou "Elsie" Jiang</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/commits?author=xiaoyou-elsie-jiang" title="Documentation">📖</a> <a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3Axiaoyou-elsie-jiang" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
