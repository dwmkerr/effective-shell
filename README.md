# effective-shell 

[![Creative Commons BY-NC-SA](https://i.creativecommons.org/l/by-nc-sa/3.0/80x15.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

Text, samples and references for my 'Effective Shell' series. This website is hosted at [effective-shell.com](https://effective-shell.com).

<!-- vim-markdown-toc GFM -->

* [Introduction](#introduction)
* [Sharing](#sharing)
* [The Pitch](#the-pitch)
    * [Publishers](#publishers)
* [The Website](#the-website)
    * [Building the Website](#building-the-website)
    * [Updating the Theme](#updating-the-theme)
* [Versioning](#versioning)
* [Copyright & Licensing](#copyright--licensing)
* [Thanks!](#thanks)

<!-- vim-markdown-toc -->

## Introduction

This repository contains all of the content for the [Effective Shell](https://effective-shell.com/) online book.

The `effective-shell-playground` folder which has all of the samples can be downloaded from [https://effective-shell.com/downloads/effective-shell-playground.zip](https://effective-shell.com/downloads/effective-shell-playground.zip)

## Sharing

I tend to use the following hashtags when sharing:

```
#effectiveshell #shell #linux #bash #devops #hacking #coding #programming
```

## The Pitch

This is _not_ a book about Shell Programming. There are many excellent Shell Programming books (see below). This is about general terminal and shell skills which will make you effective with many day to day tasks. Some shell programming is covered, but this is primarily a book about how to work more effectively with command line interfaces and shells in general.

Possible titles:

**Darkscreen**: 30 ways to use shells and terminals to be more effective developer or operator.\
**Effective Shell**: 30 ways to use shells and terminals to be more effective.\
**Command the Shell**: 30 ways to be more effective with software.

### Publishers

Books which I've found exciting, which I think could be examples of how this book might be developed:

- [Effective C++: 55 Specific Ways to Improve Your Programs and Designs](https://www.amazon.com/Effective-Specific-Improve-Programs-Designs/dp/0321334876)
- [Effective Modern C++: 42 Specific Ways to Improve Your Use of C++11 and C++14](https://www.amazon.com/Effective-Modern-Specific-Ways-Improve/dp/1491903996)
- [3D Graphics Programming: Games & Beyond](https://www.amazon.com/3D-Graphics-Programming-Games-Beyond/dp/0672319292/)
- [How Linux Works, 2nd Edition](https://nostarch.com/howlinuxworks2)

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

Note that the [`effective-shell-playground`](./effective-shell-playground) folder is automatically zipped up and added to the website, meaning it can be downloaded directly from:

```
https://effective-shell.com/downloads/effective-shell-playground.zip
```

### Updating the Theme

The site uses the [github.com/dwmkerr/hugo-book](https://github.com/dwmkerr/hugo-book) theme, which is a fork of [alex-shpak](https://github.com/alex-shpak/hugo-book).

## Versioning

The version of the site and the code is defined in the [`version.txt`](./version.txt) file. This makes it reasonably straightforward to script actions which require the version.

Releasing in managed via [Release Please](https://github.com/googleapis/release-please) in the [`release-please.yaml`](./.github/workflows/release-please.yaml] workflow file.

## Copyright & Licensing

All content is Copyright (©) Dave Kerr. Please get in touch by opening an issue if you have questions on copyright or licensing.

[![Creative Commons BY-NC-SA](https://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-nc-sa/3.0/).

## Thanks!

Thanks to the following people who have helped with reviews, comments, suggestions.

Andrew Bestbier, Thomas Neumann, Tam Nguyen, Rahul Maliakkal, Peter Mondlock, Samantha Baldwin
