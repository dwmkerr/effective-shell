# effective-shell 

Text, samples and references for my 'Effective Shell' series. This website is hosted at [effective-shell.com](https://effective-shell.com).

<!-- vim-markdown-toc GFM -->

* [Chapters](#chapters)
* [Coming Soon!](#coming-soon)
* [Improvements](#improvements)
* [Sharing](#sharing)
* [The Pitch](#the-pitch)
    * [Publishers](#publishers)
* [The Website](#the-website)
    * [Building the Website](#building-the-website)
    * [Updating the Theme](#updating-the-theme)

<!-- vim-markdown-toc -->

## Chapters

Note that the structure below is still something of a work-in-progress while I think about what would be the best structure for the book.

- Part 0: For The Newcomer
    - What is a shell
    - Opening a shell
    - Moving around
    - Showing files
    - Copy, move, delete, new directory, open zip, open photo
    - Standardising the shell (GNU tools, GNU sed, posix)
    - Basic commands (whoami, ps)
- Part 1: Core Skills
    - [Navigating the Command Line](http://www.dwmkerr.com/effective-shell-part-1-navigating-the-command-line/)
    - [Become a Clipboard Gymnast](http://www.dwmkerr.com/effective-shell-part-2-become-a-clipboard-gymnast/)
    - [Getting Help](http://www.dwmkerr.com/effective-shell-part-3-getting-hepl)
    - [Moving Around](https://dwmkerr.com/effective-shell-4-moving-around/)
    - [Interlude: Understanding the Shell](https://dwmkerr.com/effective-shell-part-5-understanding-the-shell/)
- Part 2: Beyond the Basics
    - [Job Control](https://dwmkerr.com/effective-shell-6-job-control/)
    - [The Subtleties of Shell Commands](https://dwmkerr.com/effective-shell-7-shell-commands/)
    - WIP: Thinking in Pipelines
    - WIP: Scripts & Shebangs
    - WIP: Interlude: The Shell Family Tree
- Part 3: Building Your Toolkit
    - WIP: Shell Customisation
    - WIP: Dotfile Management and Configuration Management
    - WIP: Aliases
    - WIP: Functions
    - WIP: Interlude: Future Shells
    - WIP: Who am I, What am I running? uname, whoami, $SHELL etc
- Part 3: 
    - WIP: Managing Performance: top, kill, signals and disk usage

Note: Chapters can be read in any order. But all of the chapters in Part 3 assume you have read the first two chapters of Part 3, which teach you how to manage your own customisations.

## Coming Soon!

If you have arrived on this link, it will be for a link to a section which has not been completed yet. Other chapters I am working on, or planning are:

- Shebangs: How to use, when to use `env`, how shebangs work with multiple shells (e.g. if I source a bash shebang in a zsh, what will happen?)
- Aliases. When to use (and more importantly, when not to use).
- Dotfile management (profile, private, etc)
- Sourcing (bashrc, profile, interactive, noninteractive, etc)
- Understanding Pipelines
- Understand logging (syslog, `logger` etc)
- Terminal Multiplexing: `screen` and `tmux`
- ANSI C Escaping (see https://www.dwmkerr.com/quick-tip-sending-newlines-with-curl/#comment-4375113010)
- Moving Files - `scp`, `aws s3`, `xcopy` etc
- Know Your Arrows! Pipe stdin <, >>, >, 2&>1 etc
- Understanding Commands (`command -v` to see functions, aliases, builtins etc)
- Customising the command prompt
- Basic Shell Scripting
- Internal Variables (https://www.tldp.org/LDP/abs/html/internalvariables.html#PROCCID)
- Heredocs
- `screen` and `tmux`
- ANSI C Escaping (see https://www.dwmkerr.com/quick-tip-sending-newlines-with-curl/#comment-4375113010)
- See if I can get an interview with shell creators?
- The history of shells, a shell family tree
- The rising popularity of commandline interfaces (Borland, VC++ vs Code, Vim etc)
- Globing (e.g. `cat file{1,2,3}`)
- Quick aliases (e.g. `D` for ISO8601 date)
- Watching (e.g. `watch k get pods`)
- Supercharging autocomplete

## Improvements

- [ ] Add `tree` to the Chapter 'Moving Around'.
- [ ] Getting Help: `help`
- [ ] `man test` is an excellent way to quickly check common tests (existence of a file etc)
- [ ] `man set` is super useful when checking options like `set -ex` in scripts
- [ ] For the 'Getting Help' page, include `whatis` and `whereis`.

## Sharing

I tend to use the following hashtags when sharing:

```
#effective-shell #shell #linux #bash #devops #hacking #coding #programming
```

## The Pitch

This is _not_ a book about Shell Programming. There are many excellent Shell Programming books (see below). This is about general terminal and shell skills which will make you effective with many day to day tasks. Some shell programming is covered, but this is primary a book about how to work more effectively with command line interfaces and shells in general.

Possible titles:

**Darkscreen**: 30 ways to use shells and terminals to be more effective developer or operator.
**Effective Shell**: 30 ways to use shells and terminals to be more effective.

### Publishers

Books which I've found exciting, which I think could be examples of how this book might be developed:

- [Effective C++: 55 Specific Ways to Improve Your Programs and Designs](https://www.amazon.com/Effective-Specific-Improve-Programs-Designs/dp/0321334876)
- [Effective Modern C++: 42 Specific Ways to Improve Your Use of C++11 and C++14](https://www.amazon.com/Effective-Modern-Specific-Ways-Improve/dp/1491903996)
- [3D Graphics Programming: Games & Beyond](https://www.amazon.com/3D-Graphics-Programming-Games-Beyond/dp/0672319292/)
- [How Linux Works, 2nd Edition](https://nostarch.com/howlinuxworks2)

## The Website

The content in this repo is build into a static site available at [effective-shell.com](https://effective-shell). This is done using [Hugo](https://gohugo.io/).

This section contains information on how to built, use and edit the site.

### Building the Website

This website is built with 

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

The built site is generated at `./public`.

### Updating the Theme

The site uses the [github.com/dwmkerr/hugo-book](https://github.com/dwmkerr/hugo-book) theme, which is a fork of [alex-shpak](https://github.com/alex-shpak/hugo-book).
