# Book Structure

This document contains the proposed structure of the book. It is still work in progress.

<!-- vim-markdown-toc GFM -->

    * [Potential Titles](#potential-titles)
    * [Foreword by Steve Bourne](#foreword-by-steve-bourne)
    * [Introduction](#introduction)
    * [Chapter 1 - Getting Started](#chapter-1---getting-started)
    * [Part 1 - Transitioning from The Graphical User Interface to the Shell](#part-1---transitioning-from-the-graphical-user-interface-to-the-shell)
        * [Chapter 2 - Navigating your System](#chapter-2---navigating-your-system)
        * [Chapter 3 - Managing Your Files](#chapter-3---managing-your-files)
        * [Chapter 4 - Becoming a Clipboard Gymnast](#chapter-4---becoming-a-clipboard-gymnast)
        * [Chapter 5 - Getting Help](#chapter-5---getting-help)
    * [Interlude - The Renaissance of the Shell](#interlude---the-renaissance-of-the-shell)
    * [Part 2 - Core Skills](#part-2---core-skills)
        * [Chapter 6 - Thinking in Pipelines](#chapter-6---thinking-in-pipelines)
        * [Chapter 7 - Fly on the Command-line](#chapter-7---fly-on-the-command-line)
        * [Chapter 8 - Understanding Job Control](#chapter-8---understanding-job-control)
        * [Chapter 9 - Understanding the Subtleties of Shell Commands](#chapter-9---understanding-the-subtleties-of-shell-commands)
        * [Chapter 10 - Talking to other machines with the Secure Shell](#chapter-10---talking-to-other-machines-with-the-secure-shell)
    * [Interlude - The Unix Philosophy](#interlude---the-unix-philosophy)
    * [Part 3 - Manipulating Text & Streams](#part-3---manipulating-text--streams)
        * [Chapter 11 - Get to Grips with Grep](#chapter-11---get-to-grips-with-grep)
        * [Chapter 12 - Slice and Dice Text](#chapter-12---slice-and-dice-text)
        * [Chapter 13 - Master Advanced Text Manipulation with Sed and Awk](#chapter-13---master-advanced-text-manipulation-with-sed-and-awk)
        * [Chapter 14 - Build Commands on the Fly](#chapter-14---build-commands-on-the-fly)
        * [Chapter 15 - The Missing Tools: jq, yq and xq](#chapter-15---the-missing-tools-jq-yq-and-xq)
        * [Chapter 16 - Bash Text Tricks - Regexes and String Manipulation](#chapter-16---bash-text-tricks---regexes-and-string-manipulation)
    * [Part 4 - Building Your Toolkit](#part-4---building-your-toolkit)
        * [Chapter 17 - Configuring the Shell](#chapter-17---configuring-the-shell)
        * [Chapter 18 - Customising your Command Prompt](#chapter-18---customising-your-command-prompt)
        * [Chapter 19 - Managing Your Dotfiles](#chapter-19---managing-your-dotfiles)
        * [Chapter 20 - Creating Shell Scripts and Understanding Shebangs](#chapter-20---creating-shell-scripts-and-understanding-shebangs)
        * [Chapter 21 - Getting to Grips with Git](#chapter-21---getting-to-grips-with-git)
    * [Interlude - The Linux and Shell Family Tree](#interlude---the-linux-and-shell-family-tree)
    * [Part 5 - Shell Scripting](#part-5---shell-scripting)
        * [Chapter 22 - Operating on Files and Folders](#chapter-22---operating-on-files-and-folders)
        * [Chapter 23 - Logic and Mathematics](#chapter-23---logic-and-mathematics)
        * [Chapter 24 - Common Shell Scripts](#chapter-24---common-shell-scripts)
        * [Chapter 25 - How to avoid scripting!](#chapter-25---how-to-avoid-scripting)
    * [Interlude - TBC](#interlude---tbc)
    * [Part 6 - Advanced Techniques](#part-6---advanced-techniques)
        * [Chapter 26 - Managing Multiple Programming Languages with Make](#chapter-26---managing-multiple-programming-languages-with-make)
        * [Chapter 27 - The Power of Terminal Editors](#chapter-27---the-power-of-terminal-editors)
        * [Chapter 28 - The Multiplexer](#chapter-28---the-multiplexer)
        * [Chapter 29 - Writing Tools that Follow The Unix Philosophy](#chapter-29---writing-tools-that-follow-the-unix-philosophy)
    * [Interlude - The Future](#interlude---the-future)
        * [Introduction](#introduction-1)
        * [Missing Pieces](#missing-pieces)
* [Does it make sense to have 'golden rules'?](#does-it-make-sense-to-have-golden-rules)
* [Posters!](#posters)

<!-- vim-markdown-toc -->

### Potential Titles

- Effective Shell
- Darkscreen: Specific techniques to be more effective in the shell

### Foreword by Steve Bourne

For some, the text based interface to a computer might seem archaic in this day and age. However, the skills required to work with a computer shell might have never been in such high demand, or so relevant. In the introduction we cover just why the shell is more and more relevant for professionals and hobbyists, and why investing in your time learning about this topic could be a really smart move.

### Introduction

The contents of this book can be useful for a surprisingly wide group of people. First of all, we'll cover who might find this book useful, and whether it will be useful for you.

We'll look at what a shell is, and why it can be so useful to learn about.

We'll also talk about why we are emphasising how things work on Linux, rather than MacOS or Windows, and explain how for Windows and Mac users you will still be able to use the material.

### Chapter 1 - Getting Started

Here we'll look at setting up your shell, how to open it, and how to configure your computer to follow along with the examples.

We'll look at the same sort of operations you might use when operating a computer from a graphical interface; how to move around the file system, copy and paste files, rename and move files and open files up. Once you've completed this chapter you'll know the absolute basics of how to use your shell and will be ready to get your teeth into the meat of the various topics in this book.

If you are already comfortable with running a shell, know what `bash` is, and know how to run basic commands like `ls` and `cd`, are familiar with terms like _command_ and _parameter_ then you can completely skip this section and move onto Section One.

### Part 1 - Transitioning from The Graphical User Interface to the Shell

These are the key skills which everyone should know. Without them, you might struggle to perform certain tasks at all. Experienced users can probably skip this section, or just review the summary. But if you are new to the shell, this is the best place to start! This section focuses on helping you quickly get up to speed with how to perform the same kind of tasks you might have performed in a GUI (Graphical User Interface) with the shell.

#### Chapter 2 - Navigating your System

Switching from a graphical user interface to the shell can take some getting used to. First we'll take a look at how to navigate your system using the shell, and get information on files and folders in the system.

This chapter will introduce the `wget`, `unzip`, `cp`, `mv`, `rm`, `mkdir`, and `rmdir` commands. We'll also briefly look at `cat`, _wildcards_ and _redirection_.

#### Chapter 3 - Managing Your Files

Copying, moving, renaming and deleting files in a graphical user interface is normally fairly intuitive. Now we'll learn how to perform the same operations in a shell. Once you can organise your files, you are well on your way to being able to use the shell more effectively for day to day tasks.

Now that we know how to organise the files in our computer, we'll take a look at how to create new files, preview the contents of files, open files, download files and particularly importantly, how to search for files.

This chapter will introduce the `file`, `cat`, `less`, `touch`, `zip`, `unzip`, `find`, `cp`, `mv`, `rm`, `rmdir`, `mkdir`, `curl` and `wget` commands. It will also introduce 'wildcards' and 'globs'.

#### Chapter 4 - Becoming a Clipboard Gymnast

As you spend more time in the shell, you'll find the clipboard particularly useful. In this chapter we'll see how to access and manipulate the clipboard, as well as starting to see the basics of how 'pipelines' work, which is fundamental to using the shell.

This chapter will introduce the `alias`, `pbcopy`, `pbpaste`, `xcopy`, `xpaste` commands, as well as showing the basics of piping commands.

#### Chapter 5 - Getting Help

If you are new to the shell, then we've already covered a lot and you might be worrying about how to remember so many commands! For beginner and advanced users alike it's critical to know how to look up commands and how they are used without interrupting your flow of work in the Shell. In this chapter we'll see how to get help on commands, as well as some particularly useful tricks to get the *right* information quickly, rather than a dense and complicated manual page.

This chapter will introduce the `man`, `curl` and `help` commands. We'll also learn about the `tldr`, `cht.sh` and how manual pages are structured in Linux.

### Interlude - The Renaissance of the Shell

The "interludes" which end each section are completely optional. They don't teach any specific skills, but instead give a little more flavour and background about the world of the shell, Linux and modern computing. In this first interlude we'll look at just why the shell is experiencing something of a renaissance in the modern age of IT.

### Part 2 - Core Skills

There are a few techniques and skills which you'll touch on time and time again. This section introduces some of the core skills and concepts which it is useful to understand when working with the shell.

#### Chapter 6 - Thinking in Pipelines

The shell allows us to chain sets of commands together. These 'pipeline' features allow us to take basic commands and perform increasingly complex and sophisticated operations.

In this chapter we'll see how pipelines work, introduce the `tee` command, and learn about basic redirection.

#### Chapter 7 - Fly on the Command-line

If there's one set of skills which will save you an enormous amount of time, it's the skills needed to quickly navigate the command line. These skills are also immediately transferable to a whole set of other common tools. In this section we'll see how to very quickly navigate the command-line with the keyboard, and where we can also use these techniques.

This chapter introduces the most commonly used keyboard shortcuts used in 'readline' based tools, like the shell and many programming tools.

#### Chapter 8 - Understanding Job Control

The shell contains a whole set of features for working with long running tasks. These features are called "Job Control". Knowing how to move a task into the background, work on something else, move it back into the foreground, and generally control these jobs can be a real time-saver. Even if you don't use these features regularly, understanding how job control works (and how to recover work you might have accidentally paused or put into the background) can be very helpful.

In this chapter we'll introduce job control, and the `bg`, `fg`, and `jobs` commands.

#### Chapter 9 - Understanding the Subtleties of Shell Commands

Not everything we run in a shell works in the same way. Some commands run external programs, whearas some commands are 'built in' and implemented by the shell itself. Understanding the different types of shell commands that exist can be very important when problem-solving or trying to work out why or how something works. In this chapter we'll look at the subtle differences between different types of commands.

In this chapter we'll see the `which`, `whereis` and related commands. We'll also look at the differences between builtins, executables, aliases and functions.

#### Chapter 10 - Talking to other machines with the Secure Shell

One of the main reasons you might use a shell is to operate a machine remotely. In these cases it's often the case that the *only* way to interact with these machines is via the shell, as they don't have a graphical user interface installed. In this chapter we'll look at how the secure shell, `ssh` works, and how to configure it for maximum convenience and efficiency.

### Interlude - The Unix Philosophy

We've already introduced a lot of commands. It turns out that the idea of small, focused commands which do one thing and one thing only is very fundamental to how Linux and Unix systems are designed. The idea of having a large number of simple tools, which can be composed together to perform complex operations is called "The Unix Philosophy". Understanding this philosophy can help you understand why certain choices have been made with the shell and Linux tooling, and help you understand your system better.

### Part 3 - Manipulating Text & Streams

A key part of how Linux and Unix systems work is that almost everything is represented as a text file in the system, and almost everything can be *configured* with a text file. This means that you may find yourself regularly manipulating text. There are so many options for how to do this! In this section we'll look at some of the key techniques which can be used to work with text, and demonstrate this with practical examples.

#### Chapter 11 - Get to Grips with Grep

The `grep` tool is a real workhorse for shell users - once you've learned how to use it you will find yourself using it again and again. In this chapter we'll see how you can use `grep` for common tasks, and how to use it in combination with other tools.

#### Chapter 12 - Slice and Dice Text

One of the most simple and useful tools for working with text is the `cut` tool. In this chapter we'll see how we can use it, in combination with `rev` to rapidly slice and dice text.

We'll also look at some useful ways to sort, filter, remove duplicates, and more.

#### Chapter 13 - Master Advanced Text Manipulation with Sed and Awk

Sed - the 'stream editor' tool can be used to perform sophisticated manipulation of text. In many cases a small command involving `sed` can quickly solve problems. In this chapter we'll look at some common ways to use `sed`, and when you might want to consider the `awk` tool.

#### Chapter 14 - Build Commands on the Fly

With your `grep`, `sed` and `cut` skills ready to rock, you might find scenarios where you want to dynamically build new commands. In this chapter we'll see how `xargs` can be used to build commands. We'll also see some tricks for building commands dynamically, and writing them to a script file. We'll also see a few useful commands like `wc` to get information about text.

#### Chapter 15 - The Missing Tools: jq, yq and xq

Sometimes you might find yourself battling with the shell text manipulation tools to manipulate JSON, YAML or XML. The `jq`, `yq` and `xq` tools can save you a lot of time, and might just be the missing tools you need to add to your toolkit.

In this chapter we'll see how to install these tools and perform common tasks with them.

#### Chapter 16 - Bash Text Tricks - Regexes and String Manipulation

Bash has some built-in capabilities which can be very difficult to handle when you are working with text. In this chapter we'll take a look at the built-in regular expression support in Bash, and also take a look at some nifty tricks for manipulating text in the shell.

### Part 4 - Building Your Toolkit

As you work more with the shell, you will want to customise it and build tools and commands of your own. Before we look at shell scripting, we'll take a look at how the shell is configured, different ways a shell can run, and effective ways to manage your shell configuration.

#### Chapter 17 - Configuring the Shell

There are a number of different ways to configure your shell, and some options which can change how it operates. In this chapter we'll take a look at the different configuration files for the shell and how they work, and how you can change your shell configuration. We'll also see some of the shell options available which can change how the shell works.

In this chapter we'll see the various different configuration files used, introduce the `chsh` command, the `SHELL` environment variable, and see how to manage configuration using `set`.

#### Chapter 18 - Customising your Command Prompt

The shell command prompt can be configured to show you what you find most important. In this section we'll see how the command prompt can be configured, and take a look at some of the advanced options available.

#### Chapter 19 - Managing Your Dotfiles

As you customise your shell and environment, it becomes more and more important to manage this customisation effectively and track changes to it. In this chapter we'll see how to manage your configuration - and 'dotfiles' - as a GitHub repository. We'll also see how this can be used to share ideas and look at some great examples.

#### Chapter 20 - Creating Shell Scripts and Understanding Shebangs

As you get more comfortable with the shell, you can bundle common commands into scripts. These scripts can use Bash features, or can be written with other languages. In this chapter we'll see how to create simple shell scripts, scripts which use different languages, and see how 'sourcing' works.

#### Chapter 21 - Getting to Grips with Git

If you are working with text, code, or other types of content, Git can be a powerful tool to manage changes and collaboration. People have sometimes found it hard to get to grips with in the shell.In this chapter we'll look at the most common operations for git, and how to use things like interactive commands to allow us to quickly and easily work with git repositories.

### Interlude - The Linux and Shell Family Tree

There are lots of different flavours of Linux and Unix, and lots of different shells. This interlude takes a quick look at the Linux and Unix family tree, and the different shells which have evolved over time.

### Part 5 - Shell Scripting

As we've seen, there's a lot we can do with the shell. Creating shell scripts allows us to further automate and extend what we can do with these skills. In this section we'll look at some of the key concepts which will help you write practical shell scripts for day to day use.

#### Chapter 22 - Operating on Files and Folders

One of the most common tasks we will do when scripting is operating functions over a set of files or folders. In this chapter we'll look at basic loops, tests and how to operate on many files. We'll also see how we can integrate commands like `find` into shell scripts.

#### Chapter 23 - Logic and Mathematics

Bash allows you to write programs with complex logic. We'll look at how to do this. You can use the shell to perform arithmetic. Knowing how to do this can be quite convenient! In this chapter we'll look at how basic arithmetic works in the shell and how to use it in scripts.

#### Chapter 24 - Common Shell Scripts 

We'll now introduce a few practical real-world scripts. These will demonstrate more advanced techniques, in the context of real world use cases. In this chapter we'll also look at 'Heredocs' and how they can help us manage files and more complex text content.

#### Chapter 25 - How to avoid scripting!

The shell is powerful, but can be complex. There are times when jumping into a shell script can make a task more complex than it needs to be. In this chapter we'll briefly look at some alternatives to shell scripting, from simple python and ruby scripts, to basic C programming. We'll also get an understanding of how to compile programs we've downloaded, which can be a common requirement on Linux systems.

### Interlude - TBC

To be confirmed.

### Part 6 - Advanced Techniques

The more time you spend in the shell, the more effective you may well find yourself. If you are benefiting from your shell chops, this section contains suggestions for deeper topics to look into, which can take you even further.

#### Chapter 26 - Managing Multiple Programming Languages with Make

GNU Make can be a powerful tool for anyone who uses multiple programming languages, or wants to make it easier to allow people to use their projects. In this chapter we'll look at some common patterns which we can use `make` for to make our lives easier when working with different programming languages and platforms.

#### Chapter 27 - The Power of Terminal Editors

If you are already in the shell, then you might find it convenient to edit code and files directly from the shell. Getting familiar with some of the capabilities of Vim or Emacs can open up a whole new world for how you work with text in the shell.

#### Chapter 28 - The Multiplexer

If you are regularly using a shell, then learning how to use a terminal multiplexer like `screen` or `tmux` can greatly improve your productivity. In this chapter we'll see how terminal multiplexers work and brush the surface of what they can do.

#### Chapter 29 - Writing Tools that Follow The Unix Philosophy

To finish the book, we'll look at how you can write tools which integrate seamlessly into the shell. We'll see how tooling and patterns have evolved, and some suggestions for how to write tools which others can use easily. We'll look at some of the similarities and patterns in very popular tools like `aws`, `kubectl` and `gcp`.

We'll look at how to appropriate use `stdin`, `stdout` and `stderr` to build programs which are 'pipeline friendly'.

### Interlude - The Future

The shell, in particular the Bourne-Again Shell has been popular for many years. But what does the future hold? With the advent of the Linux Subsystem for Windows, new shells like Nushell, and the latest version of MacOS switching from Bash to Z-Shell, we finish off by looking at some of the trends which might shape how we use shells in the future.

#### Introduction

This is not a book about Bash. It's not a book about shell programming. It's a book about how to use a keyboard as the main way to work with a computer, and become incredibly efficient doing so. That means we'll cover a lot of Bash and shell topics, but we'll also look at how linux works. But this is not a book about systems adminstration. We won't see how to set up a mailserver, but we will understand _why_ linux systems work as they do, in a more fundamental way, which will help us save time and optimise our work, whether we're programming, administering systems, exploring or hobbying, working with data science or even just doing general purpose computing.

#### Missing Pieces

This section contains the things which have been pulled out of chapters as they made them too big, or don't fit in a chapter yet:

- `find` was in 'managing files
- `globs` was in 'managing files
- `curl` was in managing files
- `df` to find out free space, or also how to find out how much space a folder takes up
- `$IFS` to avoid easily avoidable errors
- **Error Codes** and **set -e** are tacitly referred to in the `stderr` sections of the 'thinking in pipelines' chapter, we will need to have a reference

- streams: Introduce the concept of streams
- streams: when I pipe from dev/random how do I not run out of memory?
- streams: why are some things linewise (compare `cat` to `sort` to `uniq`)
- streams: lines vs EOF (compare sort with uniq)
- control characters: we touch on these in the 'clipboard gymnastics' chapter (`^V`) and also in the pipelines chapter. Is it worth a chapter of its own? I used it recently to add a windows line ending in a file in vim (to support a test), I added `^M` by striking `^V[enter]` to enter the `^M` character
- chapter 22: writing linux programs: use `wc` as an example of a bad program - it outputs silly whitespace.
- chapter 22: writing linux programs: use `sort` and `uniq` as inconsistent examples of how input is read (linewise vs til `EOT`)
- summary: should we also have a manpages section for each summary (e.g. bash redirection manpage, stdin manpage, etc?, might be good for pros)
- input: there is a convention for `-f -` (or just `-` in some programs) to mean `stdin`, this could go in pipelines, or advanced pipelines - another example (`curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | apt-key add -`) - note that `apt-key add -` uses stdin.
- input: use `grep` to search a dictionary (e.g. https://github.com/dwyl/english-words and also add this to the samples).
- heredocs: here docs vs herestrings (`<<<`), see https://askubuntu.com/questions/678915/whats-the-difference-between-and-in-bash there's a good example of it in use here https://unix.stackexchange.com/questions/572424/retrieve-both-http-status-code-and-content-from-curl-in-a-shell-script
- bug: in chapter 9 (job control) we mention signals are in a later chapter, but not sure where this should be yet.
- programs: note that `readline` should be used when building prompts
- tmux: hit `<leader>+s` to list all sessions (with cool window previews). `x` deletes a session. Look up how to rename, new, etc.
- managing resources: `htop` as a good cross-platform process manager
- weird stuff: things which _don't_ work consistently across systems and are just plain weird and good to know about: `sed`, Regexs, Non posix, Posix, Different systems, Different shells
- [ ] Add `tree` to the Chapter 'Moving Around'.
- [ ] Getting Help: `help`
- [ ] `man test` is an excellent way to quickly check common tests (existence of a file etc)
- [ ] `man set` is super useful when checking options like `set -ex` in scripts
- [ ] For the 'Getting Help' page, include `whatis` and `whereis`.
- [ ] A good example of commands/binaries challenges with dotfiles is shown when trying to use `nvm` in a makefile (`nvm` is a sourced command, so not present in non-interactive shells)

Section: building good command line tools

This is really nice:

> Black is a well-behaved Unix-style command-line tool:
> it does nothing if no sources are passed to it;
> it will read from standard input and write to standard output if - is used as the filename;
> it only outputs messages to users on standard error;
> exits with code 0 unless an internal error occurred (or --check was used).

https://github.com/psf/black#command-line-options


There is a section on this (see `section1`)
Also we can do more on tty:

```
$ tty
/dev/ttys031
echo "Groovy" > /dev/ttys031
```

## Does it make sense to have 'golden rules'?

Such as:

- Everything is a file

## Posters!

Could some of these things be posters? The shell navigation poster, the pipelines poster? Show input, output, err and maybe 30 commands?

Could these posters be sold online?
