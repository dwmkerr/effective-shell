# Book Structure

This document contains the proposed structure of the book. It is still work in progress.

<!-- vim-markdown-toc GFM -->

* [The Pitch](#the-pitch)
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
    * [Chapter 10 - Finding Files](#chapter-10---finding-files)
* [Interlude - What is a Shell?](#interlude---what-is-a-shell)
* [Part 3 - Manipulating Text & Streams](#part-3---manipulating-text--streams)
    * [Chapter 13 - Regex Essentials](#chapter-13---regex-essentials)
    * [Chapter 14 - Get to Grips with Grep](#chapter-14---get-to-grips-with-grep)
    * [Chapter 15 - Slice and Dice Text](#chapter-15---slice-and-dice-text)
    * [Chapter 16 - Advanced Text Manipulation](#chapter-16---advanced-text-manipulation)
    * [Chapter 17 - Build Commands on the Fly](#chapter-17---build-commands-on-the-fly)
* [Interlude - The Unix Philosophy](#interlude---the-unix-philosophy)
* [Part 4 - Shell Scripting](#part-4---shell-scripting)
    * [Chapter 18 - Shell Script Fundamentals](#chapter-18---shell-script-fundamentals)
    * [Chapter 19 - Variables, Reading Input, and Mathematics](#chapter-19---variables-reading-input-and-mathematics)
    * [Chapter 20 - Mastering Conditional Logic](#chapter-20---mastering-conditional-logic)
    * [Chapter 21 - Loops and working with Files and Folders](#chapter-21---loops-and-working-with-files-and-folders)
    * [Chapter 22 - Functions, Parameters and Error Handling](#chapter-22---functions-parameters-and-error-handling)
    * [Chapter 23 - Useful Patterns for Shell Scripts](#chapter-23---useful-patterns-for-shell-scripts)
* [Interlude - The Shell Family Tree](#interlude---the-shell-family-tree)
* [Part 4 - Building Your Toolkit](#part-4---building-your-toolkit)
    * [Chapter 25 - Configuring the Shell](#chapter-25---configuring-the-shell)
    * [Chapter 26 - Customising your Command Prompt](#chapter-26---customising-your-command-prompt)
    * [Chapter 27 - Managing Your Dotfiles](#chapter-27---managing-your-dotfiles)
    * [Chapter 21 - Getting to Grips with Git](#chapter-21---getting-to-grips-with-git)
    * [Chapter 24 - How to avoid scripting!](#chapter-24---how-to-avoid-scripting)
    * [Chapter X - Testing Shell Scripts with Docker](#chapter-x---testing-shell-scripts-with-docker)
* [Part 6 - Advanced Techniques](#part-6---advanced-techniques)
    * [Understanding Shell Expansions](#understanding-shell-expansions)
    * [Chapter 26 - Managing Multiple Programming Languages with Make](#chapter-26---managing-multiple-programming-languages-with-make)
    * [Chapter 27 - The Power of Terminal Editors](#chapter-27---the-power-of-terminal-editors)
    * [Chapter 28 - The Multiplexer](#chapter-28---the-multiplexer)
    * [Chapter 29 - Writing Tools that Follow The Unix Philosophy](#chapter-29---writing-tools-that-follow-the-unix-philosophy)
* [Interlude - The Future](#interlude---the-future)
* [Part 7 - The Missing Chapters](#part-7---the-missing-chapters)
    * [Chapter X - Talking to other machines with the Secure Shell](#chapter-x---talking-to-other-machines-with-the-secure-shell)
    * [Chapter X - The Missing Tools: jq, yq and xq](#chapter-x---the-missing-tools-jq-yq-and-xq)
    * [Chapter X - Build Text Manipulation Programs?](#chapter-x---build-text-manipulation-programs)
* [Part X - Linux Essentials](#part-x---linux-essentials)
    * [What is Linux?](#what-is-linux)
    * [Environment Variables](#environment-variables)
    * [Processes](#processes)
    * [Users, Groups and Permissions](#users-groups-and-permissions)
    * [The Linux Filesystem Hierarchy Standard](#the-linux-filesystem-hierarchy-standard)
    * [Everything is a File](#everything-is-a-file)
    * [Git](#git)
* [Appendixes](#appendixes)
    * [Appendix 1: Shell Shortcuts](#appendix-1-shell-shortcuts)
    * [Appendix 2: Shell Parameter Expansion](#appendix-2-shell-parameter-expansion)
    * [Appendix 3: Find Cheat Sheet](#appendix-3-find-cheat-sheet)
    * [Appendix 4: Essential Manpages](#appendix-4-essential-manpages)
* [Bugs, Ideas, Gaps](#bugs-ideas-gaps)
* [More Useful Reading](#more-useful-reading)
* [Good Scripts to write as exercises](#good-scripts-to-write-as-exercises)
* [Does it make sense to have 'golden rules'?](#does-it-make-sense-to-have-golden-rules)
* [Posters!](#posters)

<!-- vim-markdown-toc -->

There are a number of different ways to configure your shell, and some options which can change how it operates. In this chapter we'll take a look at the different configuration files for the shell and how they work, and how you can change your shell configuration. We'll also see some of the shell options available which can change how the shell works.
# The Pitch

This is _not_ a book about Shell Programming. There are many excellent Shell Programming books (see below). This is about general terminal and shell skills which will make you effective with many day to day tasks. Some shell programming is covered, but this is primarily a book about how to work more effectively with command line interfaces and shells in general.

# Potential Titles

- **Effective Shell**
- **Effective Shell** - Essential techniques for the modern technologist
- **Effective Shell** - Essential techniques for software engineers, data scientists, DevSecOps experts and all modern technologist
- **Darkscreen**: Specific techniques to be more effective in the shell
- **Darkscreen**: 30 ways to use shells and terminals to be more effective developer or operator.
- **Effective Shell**: 30 ways to use shells and terminals to be more effective.
- **Command the Shell**: 30 ways to be more effective with software.


# Foreword by Steve Bourne

For some, the text based interface to a computer might seem archaic in this day and age. However, the skills required to work with a computer shell might have never been in such high demand, or so relevant. In the introduction we cover just why the shell is more and more relevant for professionals and hobbyists, and why investing in your time learning about this topic could be a really smart move.

# Introduction

The contents of this book can be useful for a surprisingly wide group of people. First of all, we'll cover who might find this book useful, and whether it will be useful for you.

We'll look at what a shell is, and why it can be so useful to learn about.

We'll also talk about why we are emphasising how things work on Linux, rather than MacOS or Windows, and explain how for Windows and Mac users you will still be able to use the material.

This is not a book about Bash. It's not a book about shell programming. It's a book about how to use a keyboard as the main way to work with a computer, and become incredibly efficient doing so. That means we'll cover a lot of Bash and shell topics, but we'll also look at how linux works. But this is not a book about systems adminstration. We won't see how to set up a mailserver, but we will understand _why_ linux systems work as they do, in a more fundamental way, which will help us save time and optimise our work, whether we're programming, administering systems, exploring or hobbying, working with data science or even just doing general purpose computing.


# Chapter 1 - Getting Started

Here we'll look at setting up your shell, how to open it, and how to configure your computer to follow along with the examples.

We'll look at the same sort of operations you might use when operating a computer from a graphical interface; how to move around the file system, copy and paste files, rename and move files and open files up. Once you've completed this chapter you'll know the absolute basics of how to use your shell and will be ready to get your teeth into the meat of the various topics in this book.

If you are already comfortable with running a shell, know what `bash` is, and know how to run basic commands like `ls` and `cd`, are familiar with terms like _command_ and _parameter_ then you can completely skip this section and move onto Section One.

## Part 1 - Transitioning from The Graphical User Interface to the Shell

These are the key skills which everyone should know. Without them, you might struggle to perform certain tasks at all. Experienced users can probably skip this section, or just review the summary. But if you are new to the shell, this is the best place to start! This section focuses on helping you quickly get up to speed with how to perform the same kind of tasks you might have performed in a GUI (Graphical User Interface) with the shell.

## Chapter 2 - Navigating your System

Switching from a graphical user interface to the shell can take some getting used to. First we'll take a look at how to navigate your system using the shell, and get information on files and folders in the system.

This chapter will introduce the `wget`, `unzip`, `cp`, `mv`, `rm`, `mkdir`, and `rmdir` commands. We'll also briefly look at `cat`, _wildcards_ and _redirection_.

## Chapter 3 - Managing Your Files

Copying, moving, renaming and deleting files in a graphical user interface is normally fairly intuitive. Now we'll learn how to perform the same operations in a shell. Once you can organise your files, you are well on your way to being able to use the shell more effectively for day to day tasks.

Now that we know how to organise the files in our computer, we'll take a look at how to create new files, preview the contents of files, open files, download files and particularly importantly, how to search for files.

This chapter will introduce the `file`, `cat`, `less`, `touch`, `zip`, `unzip`, `find`, `cp`, `mv`, `rm`, `rmdir`, `mkdir`, `curl` and `wget` commands. It will also introduce 'wildcards' and 'globs'.

## Chapter 4 - Becoming a Clipboard Gymnast

As you spend more time in the shell, you'll find the clipboard particularly useful. In this chapter we'll see how to access and manipulate the clipboard, as well as starting to see the basics of how 'pipelines' work, which is fundamental to using the shell.

This chapter will introduce the `alias`, `pbcopy`, `pbpaste`, `xcopy`, `xpaste` commands, as well as showing the basics of piping commands.

## Chapter 5 - Getting Help

If you are new to the shell, then we've already covered a lot and you might be worrying about how to remember so many commands! For beginner and advanced users alike it's critical to know how to look up commands and how they are used without interrupting your flow of work in the Shell. In this chapter we'll see how to get help on commands, as well as some particularly useful tricks to get the *right* information quickly, rather than a dense and complicated manual page.

This chapter will introduce the `man`, `curl` and `help` commands. We'll also learn about the `tldr`, `cht.sh` and how manual pages are structured in Linux.

# Interlude - The Renaissance of the Shell

The "interludes" which end each section are completely optional. They don't teach any specific skills, but instead give a little more flavour and background about the world of the shell, Linux and modern computing. In this first interlude we'll look at just why the shell is experiencing something of a renaissance in the modern age of IT.

# Part 2 - Core Skills

There are a few techniques and skills which you'll touch on time and time again. This section introduces some of the core skills and concepts which it is useful to understand when working with the shell.

## Chapter 6 - Thinking in Pipelines

The shell allows us to chain sets of commands together. These 'pipeline' features allow us to take basic commands and perform increasingly complex and sophisticated operations.

In this chapter we'll see how pipelines work, introduce the `tee` command, and learn about basic redirection.

## Chapter 7 - Fly on the Command-line

If there's one set of skills which will save you an enormous amount of time, it's the skills needed to quickly navigate the command line. These skills are also immediately transferable to a whole set of other common tools. In this section we'll see how to very quickly navigate the command-line with the keyboard, and where we can also use these techniques.

This chapter introduces the most commonly used keyboard shortcuts used in 'readline' based tools, like the shell and many programming tools.

## Chapter 8 - Understanding Job Control

The shell contains a whole set of features for working with long running tasks. These features are called "Job Control". Knowing how to move a task into the background, work on something else, move it back into the foreground, and generally control these jobs can be a real time-saver. Even if you don't use these features regularly, understanding how job control works (and how to recover work you might have accidentally paused or put into the background) can be very helpful.

In this chapter we'll introduce job control, and the `bg`, `fg`, and `jobs` commands.

## Chapter 9 - Understanding the Subtleties of Shell Commands

Not everything we run in a shell works in the same way. Some commands run external programs, whearas some commands are 'built in' and implemented by the shell itself. Understanding the different types of shell commands that exist can be very important when problem-solving or trying to work out why or how something works. In this chapter we'll look at the subtle differences between different types of commands.

In this chapter we'll see the `which`, `whereis` and related commands. We'll also look at the differences between builtins, executables, aliases and functions.

## Chapter 10 - Finding Files

Searching through a system to find files or folders can be complex and time consuming, even with a graphical user interface. In this chapter we'll look at how to use the shell to search for files and folders, some quick ways to accomplish common tasks and also look at some faster and more user-friendly alternatives to the built in `find` command.

# Interlude - What is a Shell?

We're working with a lot of different technologies and sometimes it can be good to take a step back and look at each of them in detail. What exactly _is_ a shell? What about a command line, or a prompt? Or a terminal? Or even a 'TTY' device? In this interlude we'll look at what exactly a shell is and how it has evolved over time.

# Part 3 - Manipulating Text & Streams

A key part of how Linux and Unix systems work is that almost everything is represented as a text file in the system, and almost everything can be *configured* with a text file. This means that you may find yourself regularly manipulating text. There are so many options for how to do this! In this section we'll look at some of the key techniques which can be used to work with text, and demonstrate this with practical examples.

## Chapter 13 - Regex Essentials

Many of the tools we're working with support _regular expressions_ or regexes - a sophisticated language which allows us to describe different patterns of text. In this chapter we'll cover the core features of regexes. If you are already familiar with regular expressions you can skip this chapter as we introduce the concepts and syntax only - the application in the shell comes in the following chapter.

## Chapter 14 - Get to Grips with Grep

The `grep` tool is a real workhorse for shell users - once you've learned how to use it you will find yourself using it again and again. In this chapter we'll see how you can use `grep` for common tasks, and how to use it in combination with other tools.

## Chapter 15 - Slice and Dice Text

One of the most simple and useful tools for working with text is the `cut` tool. In this chapter we'll see how we can use it, in combination with `rev` to rapidly slice and dice text.

We'll also look at some useful ways to sort, filter, remove duplicates, and more.

## Chapter 16 - Advanced Text Manipulation

Sed - the 'stream editor' tool can be used to perform sophisticated manipulation of text. In many cases a small command involving `sed` can quickly solve problems. In this chapter we'll look at some common ways to use `sed`, and when you might want to consider the `awk` tool.

## Chapter 17 - Build Commands on the Fly

With your `grep`, `sed` and `cut` skills ready to rock, you might find scenarios where you want to dynamically build new commands. In this chapter we'll see how `xargs` can be used to build commands. We'll also see some tricks for building commands dynamically, and writing them to a script file.

# Interlude - The Unix Philosophy

We've already introduced a lot of commands. It turns out that the idea of small, focused commands which do one thing and one thing only is very fundamental to how Linux and Unix systems are designed. The idea of having a large number of simple tools, which can be composed together to perform complex operations is called "The Unix Philosophy". Understanding this philosophy can help you understand why certain choices have been made with the shell and Linux tooling, and help you understand your system better.

# Part 4 - Shell Scripting

As we've seen, there's a lot we can do with the shell. Creating shell scripts allows us to further automate and extend what we can do with these skills. In this section we'll look at some of the key concepts which will help you write practical shell scripts for day to day use.

## Chapter 18 - Shell Script Fundamentals

First we're going to look at how to write shell scripts as well as the different ways to execute them. We'll look at how shell script files should be structured and how to use 'shebangs' to define how a shell script will run. These will be essential techniques to have as a foundation for building your own scripts.

## Chapter 19 - Variables, Reading Input, and Mathematics

We've seen variables a few times in our journey so far. In this chapter we'll look at variables in a bit more detail. We'll then see how to read input from the user and also look at how to perform basic mathematical operations in the shell. 

## Chapter 20 - Mastering Conditional Logic

In this chapter we'll introduce the 'conditional logic', a set of powerful features that allow us to run operations only when certain conditions are met. We'll look at the _if statement_ and the different ways we can evaluate conditions. We'll also look at more sophisticated conditional constructs such as the _case statement_ and the _select statement_, and how to 'chain' commands based on conditions.

## Chapter 21 - Loops and working with Files and Folders

One of the most common tasks we will do when scripting is operating functions over a set of files or folders. In this chapter we'll look at basic loops, tests and how to operate on many files. We'll also see how we can integrate commands like `find` into shell scripts.

## Chapter 22 - Functions, Parameters and Error Handling

The shell allows you to create _functions_ - a set of commands that you can call at any time. In this chapter we'll see how to create functions and how function parameters and script parameters are handled. We will also look at status codes for commands and scripts and error handling.

## Chapter 23 - Useful Patterns for Shell Scripts

To close this the section on shell script we're going to look at some common patterns you will see in shell scripts. These are an assortment of techniques you may find useful when building your scripts or when working with other peoples scripts.

# Interlude - The Shell Family Tree

There are lots of different flavours of Linux and Unix, and lots of different shells. This interlude takes a quick look at the Linux and Unix family tree, and the different shells which have evolved over time.

# Part 4 - Building Your Toolkit

We've now seen many of the core features and some of the more advanced capabilities of the shell. In this part of the book are are going to look at how the shell is configured, different ways a shell can run, and effective ways to manage your shell configuration.

The goal of this part of the book is to equip you with the knowledge and techniques you need to build your own toolkit that you can grow over time, enabling you to manage your shell configuration across many machines, keep track of scripts and functions, and know how to customise the shell to suit the work you are doing.

## Chapter 25 - Configuring the Shell

There are a number of different ways to configure your shell, and some options which can change how it operates. In this chapter we'll take a look at the different configuration files for the shell and how they work, and how you can change your shell configuration. We'll also see some of the shell options available which can change how the shell works.

## Chapter 26 - Customising your Command Prompt

The shell command prompt can be configured to show you what you find most important. In this section we'll see how the command prompt can be configured, and take a look at some of the advanced options available.

- configuring things like the default editor

## Chapter 27 - Managing Your Dotfiles

As you customise your shell and environment, it becomes more and more important to manage this customisation effectively and track changes to it. In this chapter we'll see how to manage your configuration - and 'dotfiles' - as a GitHub repository. We'll also see how this can be used to share ideas and look at some great examples.

## Chapter 21 - Getting to Grips with Git

If you are working with text, code, or other types of content, Git can be a powerful tool to manage changes and collaboration. People have sometimes found it hard to get to grips with in the shell.In this chapter we'll look at the most common operations for git, and how to use things like interactive commands to allow us to quickly and easily work with git repositories.

## Chapter 24 - How to avoid scripting!

The shell is powerful, but can be complex. There are times when jumping into a shell script can make a task more complex than it needs to be. In this chapter we'll briefly look at some alternatives to shell scripting, from simple python and ruby scripts, to basic C programming. We'll also get an understanding of how to compile programs we've downloaded, which can be a common requirement on Linux systems.

Note: When to use the shell:
- Universal compatability such as for installing ruby, node, nvm etc
- When we need a shell function, e.g show options
- When we want to execute programs (this is often not safe in code)

## Chapter X - Testing Shell Scripts with Docker

TODO

# Part 6 - Advanced Techniques

The more time you spend in the shell, the more effective you may well find yourself. If you are benefiting from your shell chops, this section contains suggestions for deeper topics to look into, which can take you even further.

## Understanding Shell Expansions

https://www.gnu.org/software/bash/manual/html_node/Shell-Expansions.html#Shell-Expansions

## Chapter 26 - Managing Multiple Programming Languages with Make

GNU Make can be a powerful tool for anyone who uses multiple programming languages, or wants to make it easier to allow people to use their projects. In this chapter we'll look at some common patterns which we can use `make` for to make our lives easier when working with different programming languages and platforms.

## Chapter 27 - The Power of Terminal Editors

If you are already in the shell, then you might find it convenient to edit code and files directly from the shell. Getting familiar with some of the capabilities of Vim or Emacs can open up a whole new world for how you work with text in the shell.

## Chapter 28 - The Multiplexer

If you are regularly using a shell, then learning how to use a terminal multiplexer like `screen` or `tmux` can greatly improve your productivity. In this chapter we'll see how terminal multiplexers work and brush the surface of what they can do.

## Chapter 29 - Writing Tools that Follow The Unix Philosophy

To finish the book, we'll look at how you can write tools which integrate seamlessly into the shell. We'll see how tooling and patterns have evolved, and some suggestions for how to write tools which others can use easily. We'll look at some of the similarities and patterns in very popular tools like `aws`, `kubectl` and `gcp`.

We'll look at how to appropriate use `stdin`, `stdout` and `stderr` to build programs which are 'pipeline friendly'.

# Interlude - The Future

The shell, in particular the Bourne-Again Shell has been popular for many years. But what does the future hold? With the advent of the Linux Subsystem for Windows, new shells like Nushell, and the latest version of MacOS switching from Bash to Z-Shell, we finish off by looking at some of the trends which might shape how we use shells in the future.

Notes:

- Future terminal: https://github.com/wez/wezterm

# Part 7 - The Missing Chapters

## Chapter X - Talking to other machines with the Secure Shell

One of the main reasons you might use a shell is to operate a machine remotely. In these cases it's often the case that the *only* way to interact with these machines is via the shell, as they don't have a graphical user interface installed. In this chapter we'll look at how the secure shell, `ssh` works, and how to configure it for maximum convenience and efficiency.

## Chapter X - The Missing Tools: jq, yq and xq

Sometimes you might find yourself battling with the shell text manipulation tools to manipulate JSON, YAML or XML. The `jq`, `yq` and `xq` tools can save you a lot of time, and might just be the missing tools you need to add to your toolkit.

In this chapter we'll see how to install these tools and perform common tasks with them.

## Chapter X - Build Text Manipulation Programs?

Could do a small chapter on how to build a text manipulation program which simply edits a line of `stdin`, then pipe it into other commands?

# Part X - Linux Essentials

## What is Linux?

Unix, Linux, BSD,

Great read: http://www.linfo.org/linuxdef.html

## Environment Variables

How environment variables work, how they are accessed in a shell.

## Processes

Signals, process tree, permissions, process id.

- bug: in chapter 9 (job control) we mention signals are in a later chapter, but not sure where this should be yet.
- todo: signals - we definitely need to discuss them and also talk about how shells capture them, scripts handle them and how we must write programs which handle them.
  1. Ctrl Z - Chapter 8
  2. Ctrl C - TODO
  3. Ctrl D - Chapter X

## Users, Groups and Permissions

Users, whoami, chmod, etc

## The Linux Filesystem Hierarchy Standard

The standard files / folders.

 - everything in `$PATH`, such as `/usr/local/bin/` vs `/usr/bin`

Good resources:

- https://unix.stackexchange.com/questions/8656/usr-bin-vs-usr-local-bin-on-linux

## Everything is a File

You may have heard this Unix concept, but what does it mean and why does it matter?

Note: This should cover things like:

- testing if we have a connection, by using:
    ```
    echo "Checking to see if EventstoreDB is ready to accept request..."
    timeout 5m bash -c 'until printf "" 2>>/dev/null >>/dev/tcp/$0/$1; do sleep 1; done' ${EVENTSTORE_HOST} ${EVENTSTORE_HTTP_MANAGEMENT_PORT}
    echo "EventstoreDB is ready to accept requests"
    /dev/null
    /dev/random
    ```

- Stdin, tcpip ports, os, processes, cpu info, sockets

Link to this from clipboard chapter, pipelines chapter, others which use special files

## Git

This may as well be an entire part, with 5 chapters, why not.

# Appendixes

## Appendix 1: Shell Shortcuts

(This is the cheat sheet from 'fly on the command line'.)

## Appendix 2: Shell Parameter Expansion

Show the order of shell parameter expansion and an example of each one. This would actually be good as a pull-out reference.

## Appendix 3: Find Cheat Sheet

A cheat sheet for the `find` command

## Appendix 4: Essential Manpages

There are a few manual pages that can be really useful to know about, this guide has a quick reference to them.

# Bugs, Ideas, Gaps

This section contains the things which have been pulled out of chapters as they made them too big, or don't fit in a chapter yet:

- introduction: Note that we are going to use `#` to indicate comments
- introduction: Note that we are going to use `...` to indicate cropped output
- chapter: useful tools: fzf, ag, ack, ripgrep?

- structure: the `sed` chapter is too big, let's extract all of the regular expressions descriptions to its own chapter
- todo: wildcards is not sufficiently covered in chapter 2 or chapter 3, perhaps we need a short dedicated chapter on it? Also, what is the manpage for wildcards (e.g. what is the equivalent of `man re_pattern` (bash and zsh)
- todo: getting help - what is the `zsh` equivalent of `help`?
- `find` was in 'managing files
- `globs` was in 'managing files
- `curl` was in managing files
- todo: tab complete `man`
- todo: coding - how to handle autocomplete for commands
- `df` to find out free space, or also how to find out how much space a folder takes up
- `open` and similar commands which are used to interface with the host _graphical_ shell
- **Error Codes** and **set -e** are tacitly referred to in the `stderr` sections of the 'thinking in pipelines' chapter, we will need to have a reference
- chapter 4: instead of creating the aliases directly, we should have a `setup-copy-and-paste.sh` script in the playground which sets up these commands as a one liner, then the user can just call the script.
- streams: Introduce the concept of streams
- streams: when I pipe from dev/random how do I not run out of memory?
- streams: why are some things linewise (compare `cat` to `sort` to `uniq`)
- streams: lines vs EOF (compare sort with uniq)
- control characters: we touch on these in the 'clipboard gymnastics' chapter (`^V`) and also in the pipelines chapter. Is it worth a chapter of its own? I used it recently to add a windows line ending in a file in vim (to support a test), I added `^M` by striking `^V[enter]` to enter the `^M` character
- chapter 22: writing linux programs: use `wc` as an example of a bad program - it outputs silly whitespace.
- chapter 22: writing linux programs: use `sort` and `uniq` as inconsistent examples of how input is read (linewise vs til `EOT`)
- summary: should we also have a manpages section for each summary (e.g. bash redirection manpage, stdin manpage, etc?, might be good for pros)
- input: there is a convention for `-f -` (or just `-` in some programs) to mean `stdin`, this could go in pipelines, or advanced pipelines - another example (`curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | apt-key add -`) - note that `apt-key add -` uses stdin.
- heredocs: here docs vs herestrings (`<<<`), see https://askubuntu.com/questions/678915/whats-the-difference-between-and-in-bash there's a good example of it in use here https://unix.stackexchange.com/questions/572424/retrieve-both-http-status-code-and-content-from-curl-in-a-shell-script
- programs: note that `readline` should be used when building prompts
- tmux: hit `<leader>+s` to list all sessions (with cool window previews). `x` deletes a session. Look up how to rename, new, etc.
- managing resources: `htop` as a good cross-platform process manager
- commands: we reference the 'executable bit' in a footnote, but where will we put this?
- tmux: getting help, <leader>?
- weird stuff: things which _don't_ work consistently across systems and are just plain weird and good to know about: `sed`, Regexs, Non posix, Posix, Different systems, Different shells
- Where do we describe `POSIX`? It is referenced directly in Chapter 4, as there is a standard for keyboard shortcuts in the shell.
- [ ] Add `tree` to the Chapter 'Moving Around'.
- [ ] A good example of commands/binaries challenges with dotfiles is shown when trying to use `nvm` in a makefile (`nvm` is a sourced command, so not present in non-interactive shells)
- manipulating text: a good example might be 'build a table of all executables': http://localhost:1313/docs/part-2-core-skills/10-understanding-commands/#executables---programs
- question: should we have a chapter on regular expressions
- idea: installing GNU utils on a Mac - https://unix.stackexchange.com/questions/284162/install-gnu-command
  Note that this allows us to use _standard_ command line sequences like:
  ```
  gsplit -C 5m --numeric-suffixes apm.logs apm
  ```
  note: it's really important to understand that GNU have *tried* to make tools mac compatable, see for example the manpage for `find`, in particular the `-d` option, which explicitly states that they've added it for OSX etc.
- note: POSIX: we should talk about options/flags/arguments/structure
- todo: Shell Brace Expansion (e.g. `touch file{1..100}.txt`, see `man bash /Brace`
- todo: We have not yet introduced the `touch` command
- note: We need a chapter on GNU, POSIX, BSD, Unix and Linux
- note: writing good programs - always provide an option for `stdin`, even if it something explicit like `-f -`. Note that `aws s3` uses `-` to indicate `stdin`
- todo: we really should look at symlinks, e.g. `ln -s $(pwd) ~/effective-shell` 
- todo: a good example of what we can use text transformation for - add 'comments' to a CSV file which start with `#` and then strip them with `grep`.
- note: it would be really good to have a 'stream-wise' understanding of how text processing works. For example, if `cat` a file into a tool which I have built, do I get the input linewise or filewise?
- idea: `getopt` as a potential trick for command line programs, just like `readline`.
- todo: using `history` shows starts next to some commands - why?
- todo: aliases - a good example is `alias sed='sed -E`
- heredocs: really good example here:
  https://linuxize.com/post/bash-heredoc/
  refer to chapter 14 - we might want a heredoc with dollar signs, e.g. when building templates. This would require us to use the `<<-` form.
- best practices: refer to files with `./` when they are relative. It makes it explicit that we are using a path, not a function, alias or anything else. It can also make it easier to grep paths.
- maybe: `ls -1` is kind of cool - one file per line
- showing aliases `alias | grep git push`
- todo: part 2 now has one extra chapter (finding files), maybe we should move 'job control' further back?
- todo: ssh tunnels? https://robotmoon.com/ssh-tunnels/
- idea: cli for regex testing, produces output as shown in regex101
- todo: chapter 7 talks about control characters (specifically, ^D), maybe we put this in the 'processes' section?
- todo: slice and dice: add count option (-c) for `uniq` and numeric (-n) for `sort` as we use these commands in the shell script essentials chapter
- todo: we need to show the `ln` command. It is used in the shell script essentials chapter.
- todo: more portable sed:
      -	sed -i '' 's/%%ES_SCRIPT_VERSION%%/$(shell cat version.txt)/' build/index.html
    +	perl -i -pe's/%%ES_SCRIPT_VERSION%%/$(shell cat version.txt)/' build/index.html
- todo: Ctrl+Alt+R for `recent`, i.e. demoing key combinations? - how this is done for scripts
- todo: Nice `tr` trick: `tr a-z A-Z` for uppercase
- todo: Nice date tricks: https://linux.101hacks.com/date-manipulation/past-date-and-time/
- todo: `lsof` for open ports https://linux.101hacks.com/monitoring-performance/lsof-command-examples/
- todo: excellent reference for common shell operations: https://devhints.io/bash

# More Useful Reading

http://samrowe.com/wordpress/advancing-in-the-bash-shell/
http://www.linfo.org/shell.html
http://www.linfo.org/bell_labs.html
http://www.linfo.org/index.html

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

# Good Scripts to write as exercises

- `recent` - a better version of `history`, which deduplicates and sorts based on the most commonly used items
- `quickman` - a quick link to the most common man pages
- `options` - show and interactively toggle options

# Does it make sense to have 'golden rules'?

Such as:

- Everything is a file

# Posters!

Could some of these things be posters? The shell navigation poster, the pipelines poster? Show input, output, err and maybe 30 commands?

Could these posters be sold online?
