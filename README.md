# effective-shell 

[![Release Please](https://github.com/dwmkerr/effective-shell/actions/workflows/release-please.yaml/badge.svg)](https://github.com/dwmkerr/effective-shell/actions/workflows/release-please.yaml) ![Version Badge](https://img.shields.io/github/v/tag/dwmkerr/effective-shell?label=version) [![Creative Commons BY-NC-SA](https://i.creativecommons.org/l/by-nc-sa/3.0/80x15.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

Text, samples and references for my 'Effective Shell' series. This website is hosted at [effective-shell.com](https://effective-shell.com).

If you find this book useful, please do consider sponsoring me to help support my open-source work!

<iframe src="https://github.com/sponsors/dwmkerr/button" title="Sponsor dwmkerr" height="35" width="116" style="border: 0;"></iframe>

<!-- vim-markdown-toc GFM -->

* [Introduction](#introduction)
* [Installing the Samples](#installing-the-samples)
* [The Website](#the-website)
    * [Building the Website](#building-the-website)
    * [Updating the Theme](#updating-the-theme)
* [Versioning](#versioning)
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

The content in this repository is built into a static site available at [effective-shell.com](https://effective-shell.com). This is done using [Hugo](https://gohugo.io/).

This section contains information on how to built, use and edit the site. To help you quickly edit the site, some tips are below:

- The main _content_ is at [website/content/docs/](website/content/docs/)
- The menu structure is defined at [website/content/menu/index.md](website/content/menu/index.md).

### Building the Website

This website is built with [Hugo](https://gohugo.io/). It is very easy to setup and run locally.

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

The built site is generated at `./website/public`.

Note that the [`samples`](./samples) folder is automatically zipped up and added to the website, meaning it can be downloaded directly from:

```
https://effective-shell.com/downloads/effective-shell-samples.zip
https://effective-shell.com/downloads/effective-shell-samples.tar.gz
```

### Updating the Theme

The site uses the [github.com/dwmkerr/hugo-book](https://github.com/dwmkerr/hugo-book) theme, which is a fork of [alex-shpak](https://github.com/alex-shpak/hugo-book).

## Versioning

The version of the site and the code is defined in the [`version.txt`](./version.txt) file. This makes it reasonably straightforward to script actions which require the version.

Releasing in managed via [Release Please](https://github.com/googleapis/release-please) in the [`release-please.yaml`](./.github/workflows/release-please.yaml) workflow file.

## Copyright & Licensing

All content is Copyright (©) Dave Kerr. Please get in touch by opening an issue if you have questions on copyright or licensing.

[![Creative Commons BY-NC-SA](https://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-nc-sa/3.0/).

## Thanks!

Thanks to the following people who have helped with reviews, comments, suggestions.

- Andrew Bestbier, Thomas Neumann, Tam Nguyen, Rahul Maliakkal, Peter Mondlock, Samantha Baldwin, Niklas Schmuecker for the useful comments and suggestions
- [Ogus Ismail](https://stackoverflow.com/users/10248678/oguz-ismail) for helping me understand some of the [nuances of word splitting and filename expansion](https://stackoverflow.com/questions/67648392/how-can-i-confirm-whether-whitespace-or-special-characters-are-escaped-in-a-wild)
