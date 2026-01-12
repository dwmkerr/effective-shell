# effective-shell 

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-23-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Release Please](https://github.com/dwmkerr/effective-shell/actions/workflows/release-please.yaml/badge.svg)](https://github.com/dwmkerr/effective-shell/actions/workflows/release-please.yaml) ![Version Badge](https://img.shields.io/github/v/tag/dwmkerr/effective-shell?label=version) [![Creative Commons BY-NC-SA](https://i.creativecommons.org/l/by-nc-sa/3.0/80x15.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

Text, samples and references for my 'Effective Shell' series. This website is hosted at [effective-shell.com](https://effective-shell.com).

If you find this book useful, please do consider [sponsoring me](https://github.com/sponsors/dwmkerr) to help support my open-source work!

<!-- vim-markdown-toc GFM -->

* [Introduction](#introduction)
* [Installing the Samples](#installing-the-samples)
* [The Website](#the-website)
    * [Building the Website](#building-the-website)
* [Custom Components](#custom-components)
* [Versioning](#versioning)
* [Contributing](#contributing)
* [Copyright & Licensing](#copyright--licensing)
* [ASCII Terminal Recordings](#ascii-terminal-recordings)
* [Thanks!](#thanks)
* [Contributors ✨](#contributors-)

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

```bash
make setup
```

To test that TypeScript types compile, run:

```bash
make typescript-check
```

To serve the site locally, run:

```bash
make serve
```

To build the site, run:

```bash
make build
```

The built site is generated at `./build`.

Note that the [`samples`](./samples) folder is automatically zipped up and added to the website, meaning it can be downloaded directly from:

```
https://effective-shell.com/downloads/effective-shell-samples.zip
https://effective-shell.com/downloads/effective-shell-samples.tar.gz
```

## Custom Components

Custom Components to support styling are available at:

```
src/components
```

There is a live view that can be used to preview each component:

http://localhost:3745/zz-developer-guide/components

(Port 3745 = "ESHL" on a phone dialpad)

Components can be added to global scope, i.e. available in call pages, by adding to the `MDXComponents.js` swizzled file:

```
src/theme/MDXComponents.js
```

## Versioning

The version of the site and the code is defined in the [`package.json`](./package.json) file.

Releasing in managed via [Release Please](https://github.com/googleapis/release-please) in the [`release-please.yaml`](./.github/workflows/release-please.yaml) workflow file.

If you need to manually trigger a release, run:

```bash
git commit --allow-empty -m "chore: release 2.0.0" -m "Release-As: 2.0.0"
```

## Contributing

Please carefully read the [Contributing Guide](./.github/contributing.md) before working on changes.

## Copyright & Licensing

All content is Copyright (©) Dave Kerr. Please get in touch by opening an issue if you have questions on copyright or licensing.

[![Creative Commons BY-NC-SA](https://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-nc-sa/3.0/).

## ASCII Terminal Recordings

All terminal recordings used in this project are built using the superb '[asciinema](https://asciinema.org/)' tool. Many thanks to Marcin Kulik for building such an excellent piece of software.

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
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/xiaoyou-elsie-jiang"><img src="https://avatars.githubusercontent.com/u/101381124?v=4?s=100" width="100px;" alt="Xiaoyou "Elsie" Jiang"/><br /><sub><b>Xiaoyou "Elsie" Jiang</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/commits?author=xiaoyou-elsie-jiang" title="Documentation">📖</a> <a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3Axiaoyou-elsie-jiang" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://linkedin.com/in/tbueschel"><img src="https://avatars.githubusercontent.com/u/13087421?v=4?s=100" width="100px;" alt="Tobias Büschel"/><br /><sub><b>Tobias Büschel</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3Atobiasbueschel" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://foostack.ai"><img src="https://avatars.githubusercontent.com/u/15166953?v=4?s=100" width="100px;" alt="Doug Foo"/><br /><sub><b>Doug Foo</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/commits?author=dougfoo" title="Documentation">📖</a> <a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3Adougfoo" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/skokaina"><img src="https://avatars.githubusercontent.com/u/2756985?v=4?s=100" width="100px;" alt="Sallah Kokaina"/><br /><sub><b>Sallah Kokaina</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/commits?author=skokaina" title="Documentation">📖</a> <a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3Askokaina" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.fetch-template.com"><img src="https://avatars.githubusercontent.com/u/26925206?v=4?s=100" width="100px;" alt="samhinton88"/><br /><sub><b>samhinton88</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/commits?author=samhinton88" title="Documentation">📖</a> <a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3Asamhinton88" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.alexvinall.com"><img src="https://avatars.githubusercontent.com/u/5629393?v=4?s=100" width="100px;" alt="Alex Vinall"/><br /><sub><b>Alex Vinall</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/commits?author=alexvinall" title="Documentation">📖</a> <a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3Aalexvinall" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/JosephFKnight"><img src="https://avatars.githubusercontent.com/u/45918817?v=4?s=100" width="100px;" alt="Joseph Knight"/><br /><sub><b>Joseph Knight</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/commits?author=JosephFKnight" title="Documentation">📖</a> <a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3AJosephFKnight" title="Reviewed Pull Requests">👀</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://bit.ly/doug-todd"><img src="https://avatars.githubusercontent.com/u/53582591?v=4?s=100" width="100px;" alt="Doug Todd"/><br /><sub><b>Doug Todd</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/commits?author=Zambrella" title="Documentation">📖</a> <a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3AZambrella" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jdhzzz"><img src="https://avatars.githubusercontent.com/u/1476690?v=4?s=100" width="100px;" alt="jdhzzz"/><br /><sub><b>jdhzzz</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/commits?author=jdhzzz" title="Documentation">📖</a> <a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3Ajdhzzz" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/valankar"><img src="https://avatars.githubusercontent.com/u/31250800?v=4?s=100" width="100px;" alt="valankar"/><br /><sub><b>valankar</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/commits?author=valankar" title="Documentation">📖</a> <a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3Avalankar" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Denpeer"><img src="https://avatars.githubusercontent.com/u/5969147?v=4?s=100" width="100px;" alt="Denpeer"/><br /><sub><b>Denpeer</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3ADenpeer" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/dwmkerr/effective-shell/commits?author=Denpeer" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mbogatzki"><img src="https://avatars.githubusercontent.com/u/39946827?v=4?s=100" width="100px;" alt="Marek Bogatzki"/><br /><sub><b>Marek Bogatzki</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/commits?author=mbogatzki" title="Documentation">📖</a> <a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3Ambogatzki" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/MichaelWarnecke"><img src="https://avatars.githubusercontent.com/u/7615963?v=4?s=100" width="100px;" alt="MWarnecke"/><br /><sub><b>MWarnecke</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/commits?author=MichaelWarnecke" title="Documentation">📖</a> <a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3AMichaelWarnecke" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/dwmkerr/effective-shell/issues?q=author%3AMichaelWarnecke" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://taxodium.ink/"><img src="https://avatars.githubusercontent.com/u/30440218?v=4?s=100" width="100px;" alt="Spike"/><br /><sub><b>Spike</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3ASpike-Leung" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/dwmkerr/effective-shell/issues?q=author%3ASpike-Leung" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://nosarthur.github.io/"><img src="https://avatars.githubusercontent.com/u/1400272?v=4?s=100" width="100px;" alt="Dong Zhou"/><br /><sub><b>Dong Zhou</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3Anosarthur" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/dwmkerr/effective-shell/issues?q=author%3Anosarthur" title="Bug reports">🐛</a> <a href="https://github.com/dwmkerr/effective-shell/commits?author=nosarthur" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/drormaman"><img src="https://avatars.githubusercontent.com/u/7041612?v=4?s=100" width="100px;" alt="Dror Maman"/><br /><sub><b>Dror Maman</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/issues?q=author%3Adrormaman" title="Bug reports">🐛</a> <a href="https://github.com/dwmkerr/effective-shell/commits?author=drormaman" title="Documentation">📖</a> <a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3Adrormaman" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/saraid"><img src="https://avatars.githubusercontent.com/u/40923?v=4?s=100" width="100px;" alt="Michael Chui"/><br /><sub><b>Michael Chui</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3Asaraid" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nimid"><img src="https://avatars.githubusercontent.com/u/4145121?v=4?s=100" width="100px;" alt="Saroj Sangphongamphai"/><br /><sub><b>Saroj Sangphongamphai</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3Animid" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/linjielig"><img src="https://avatars.githubusercontent.com/u/11633940?v=4?s=100" width="100px;" alt="Lee Li"/><br /><sub><b>Lee Li</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3Alinjielig" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/dwmkerr/effective-shell/issues?q=author%3Alinjielig" title="Bug reports">🐛</a> <a href="https://github.com/dwmkerr/effective-shell/commits?author=linjielig" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/leeli0"><img src="https://avatars.githubusercontent.com/u/11633940?v=4?s=100" width="100px;" alt="Lee Li"/><br /><sub><b>Lee Li</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/issues?q=author%3Aleeli0" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://stratus3d.com"><img src="https://avatars.githubusercontent.com/u/1520926?v=4?s=100" width="100px;" alt="Trevor Brown"/><br /><sub><b>Trevor Brown</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/issues?q=author%3AStratus3D" title="Bug reports">🐛</a> <a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3AStratus3D" title="Reviewed Pull Requests">👀</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/pfrischmuth"><img src="https://avatars.githubusercontent.com/u/351542?v=4?s=100" width="100px;" alt="Philipp Frischmuth"/><br /><sub><b>Philipp Frischmuth</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/pulls?q=is%3Apr+reviewed-by%3Apfrischmuth" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/illicitonion"><img src="https://avatars.githubusercontent.com/u/1131704?v=4?s=100" width="100px;" alt="Daniel Wagner-Hall"/><br /><sub><b>Daniel Wagner-Hall</b></sub></a><br /><a href="https://github.com/dwmkerr/effective-shell/commits?author=illicitonion" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
