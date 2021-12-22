---
title: "Man Pages"
slug: "man-pages"
weight: 5
---

# Chapter 11 - The `help` Command 


As should be familiar from [Part 3 - Getting Help]({{< relref "/docs/part-3-getting-help" >}}), you can get help for builtins:

```sh
$ man source     # source is a builtin
BUILTIN(1)                BSD General Commands Manual               BUILTIN(1)

NAME
     builtin, !, %, # ...snip...

SYNOPSIS
     builtin [-options] [args ...]
```

However, the manual will _not_ show information on specific builtins, which is a pain. Your shell _might_ have an option to show more details - for example, in Bash you can use `help`:

```sh
$ help source
source: source filename [arguments]
    Read and execute commands from FILENAME and return.  The pathnames
    in $PATH are used to find the directory containing FILENAME.  If any
    ARGUMENTS are supplied, they become the positional parameters when
    FILENAME is executed.
```

But remember: `help` is a builtin; you might not find it in all shells (you won't find it in `zsh`, for example). This highlights again the challenges of builtins.


There'll be many circumstances where you'll need to open a browser to search for help. 
But there's also a wealth of information available within the command line itself.
Looking up parameters, checking how to run commands, C library documentation, or even useful information like ASCII charts are all available directly in the shell, through the online manual pages.

## Getting help on a command

The most basic way to get help on a command is with `man`. Here's an example:

```
$ man cp


CP(1)                     BSD General Commands Manual                    CP(1)

NAME
     cp -- copy files

SYNOPSIS
     cp [-R [-H | -L | -P]] [-fi | -n] [-apvX] source_file target_file
     cp [-R [-H | -L | -P]] [-fi | -n] [-apvX] source_file ...
        target_directory

DESCRIPTION
     In the first synopsis form, the cp utility copies the contents of the
     source_file to the target_file.  In the second synopsis form, the con-
     tents of each named source_file is copied to the destination
     target_directory.  The names of the files themselves are not changed.  If
     cp detects an attempt to copy a file to itself, the copy will fail.

...
```

The `man` command opens the manual for the given tool. 
These manuals should contain all command line options and details of how to use the tool.

You can scroll up and down through the content with the arrow keys. 
This scrolling capability actually is not part of `man` - 
it is available because the information is presented in the [shell pager]({{< relref "/docs/part-2-core-skills/viewing-a-file" >}}). A pager is a tool for looking through content which might not easily fit on a screen.

There are alternative pagers available (on many Unix-y systems you'll have `less`, `more` and `most`) but in general you'll normally get what you need with `less`.

# The Alternative - Help

Sometimes you'll look something up in the manual and get the 'builtins' page. For example:

```sh
$ man cd
BUILTIN(1)                BSD General Commands Manual               BUILTIN(1)

NAME
     builtin, !, %, ., :, @, {, }, alias, alloc, bg, bind, bindkey, break,
     breaksw, builtins, case, cd, chdir, command, complete, continue,

# (I've skipped the bulk of the output to save space!)
```

This happens when the command you are looking up is not actually a program with a manual page, but a built-in shell command. Most shells have a way get help on such commands - `bash` for example has `help`:

```sh
$ help cd
cd: cd [-L|[-P [-e]] [-@]] [dir]
    Change the shell working directory.

    Change the current directory to DIR.  The default DIR is the value of the
    HOME shell variable.

# (I've skipped the bulk of the output to save space!)
```

This is all I'll say about `help` for now. We visit it again in [Chapter 10 - Understanding Commands]({{< relref "/docs/part-2-core-skills/understanding-commands" >}}), 
where we talk more about built-in commands. For now we'll go back to the `man` command, which works across all shells as it is a Linux feature rather than a shell specific feature!

## Getting the Index of Manual Section

Manpages are just files on the filesystem, so you can get the index of a section just by looking in the appropriate folder.

For example, to index the available system calls, try `ls /usr/share/man/man2`:

```
EV_SET.2
FD_CLR.2
FD_COPY.2
FD_ISSET.2
FD_SET.2
FD_ZERO.2
_exit.2
accept.2
access.2
acct.2
...
```

This is quick and easy way to see what sort of entries you have on your system. If you want to work out where an entry lives, use the `-w` flag:

```
$ man -w printf
/usr/share/man/man1/printf.1
```

There are other ways to show the index of each section, but they vary a lot from system to system so showing the actual files is probably easier.

## Searching the Manual

You can search the manpage titles and summaries with `man -k`. For example, `man -k cpu` shows:

```
cpuwalk.d(1m)            - Measure which CPUs a process runs on. Uses DTrace
dispqlen.d(1m)           - dispatcher queue length by CPU. Uses DTrace
gasm(n), grammar::me::cpu::gasm(n) - ME assembler
```

You can find more advanced options for searching by using your newfound `man` skills on `man` itself.

You can also use the `apropos` or `whatis` commands to search through the manuals. However, for simplicity I suggest just remember `man -k`!

# Summary

In this chapter we looked at some of the ways we can get help. To quickly summarise:

- The `man` tool can be used to look at the manual page for a topic

# Footnotes

[^1]: Dash is a paid product. Full disclosure - I don't get any money from them or anyone else to write about anything, all content is 100% based on my experiences. I don't run ads on my site either.
