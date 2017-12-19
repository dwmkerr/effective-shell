# Effective Shell Part 3 - Getting Help

This is the third part of my [Effective Shell](https://github.com/dwmkerr/effective-shell) series, which is a set of practical examples of ways to be more efficient when working with a shell!

- [Part 1: Navigating the Command Line](https://www.dwmkerr.com/effective-shell-part-1-navigating-the-command-line/)
- [Part 2: Become a Clipboard Gymnast](http://www.dwmkerr.com/effective-shell-part-2-become-a-clipboard-gymnast/)

In this article I'll show you how to quickly get help when working with tools in the shell.

## Getting Help is Important!

If you are trying to be more effective when using the shell, it is crucial to know how to quickly look things up, check parameters for commands and so on. There'll be many circumstances where you'll need to open a browser to get the kind of information you need, but there's also a wealth of information only a few keystrokes away.

Before we look at the standard way of accessing documentation on \*nix systes, which is the `man` command, I'm going to introduce `tldr`. I'll introduce it first because nine times out of ten nowaways it's the first thing I jump to to get help!

## tl;dr

Let's say I need to find and replace some text in a file. Now I know I can do this with the `sed` command, but have forgotten the syntax. I *could* use the manual (and we'll see a lot of this later) to try and work out the syntax, but the manual for `sed` is very detailed:

![sed manpage](./images/man-sed.png)

You can install the [`tldr`](https://github.com/tldr-pages/tldr) tool with `npm install -g tldr`. Now let's try using `tldr sed`:

![sed tldr](./images/tldr-sed.png)

Much easier!

A lot of the time, if you just quickly need a reminder of how a program works, try `tldr`. It lists the most common commands for a program, keeping the output as lean as possible. This has been a **huge** time saver for me and I always recommend it!

`tldr` is a nice tool and will help you a lot of the time, but it's really important as you use the shell more to understand how the manual pages work for your system, this is what we'll look at for the rest of the article.

## Understanding 'man'

Most tools you encounter in the shell have manual pages available. Many people will be familar with the `man` command to get help on a tool, but let's take a look in a bit more detail.

### Getting help on a command

The most basic way to get help on a command is with `man`. Here's an example:

```sh
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

The `man` command opens the manual for the given tool. These manuals shuold contain all command line options and details of how to use the command. This information is running in your shell *pager*, which gives you some help for quickly looking through larger documents. We'll look at this next.

### Using the pager

The first thing you might notice is that you can move through the manual pages with the arrow keys. The manpages are just text files, but they are being opened in the shell's pager. A pager is a program which lets you easily look through large files. 

On most systems, the pager will be the `less` program. There are lots of commands you can use to navigate through files with `less`, but the bare essentials are:

| Command | Usage |
|---------|-------|
| `d`     | Scroll down half a page. |
| `u`     | Scroll up half a page. |
| `j` / `k` | Scroll down or up a line. You can also use the arrow keys for this. |
| `q`     | Quit. |
| `/<search>` | Search for text. |
| `n`     | When searching, find the next occurence. |
| `N`     | When searching, find the previous occurence. |

There are lots of other commands, but the set above is normally what I find myself using the most.

If you are interested, you can actually see what your pager is with the command below:

```sh
echo $PAGER
```

There are alternative pagers available (on many Unix-y systems you'll have `less`, `more` and `most`) but in general you'll normally get what you need with `less`.

### What's with the numbers?

You'll often see tools referred to in manpages with numbers after them:

![Screenshot of numbers](./images/numbers.png)

This is the manual 'Section Number'. The different sections of the manual can be found on most \*nix distributions with `man man` (this is the example from Ubuntu 16):

| Section | Description |
|---------|-------------|
| 1   | Executable programs or shell commands |
| 2   | System calls (functions provided by the kernel) |
| 3   | Library calls (functions within program libraries) |
| 4   | Special files (usually found in /dev) |
| 5   | File formats and conventions eg /etc/passwd |
| 6   | Games |
| 7   | Miscellaneous (including macro packages and conventions), e.g. man(7), groff(7) |
| 8   | System administration commands (usually only for root) |
| 9   | Kernel routines [Non standard] |

You can specifically choose which section of the manual you are looking in, using `man <section> <search`. You can also get more information about the sections themselves by opening up the `intro` page. For example:

```
$ man 1 intro

INTRO(1)                  BSD General Commands Manual                 INTRO(1)

NAME
     intro -- introduction to general commands (tools and utilities)

DESCRIPTION
     Section one of the manual contains most of the commands which comprise
...
```

This might be clearer with a few examples.

#### Programs and Shell Commands

These are programs, probably what you are going to be looking up most regularly! For example, `man 1 time` shows:

```
TIME(1)                   BSD General Commands Manual                  TIME(1)

NAME
     time -- time command execution

SYNOPSIS
     time [-lp] utility

DESCRIPTION
     The time utility executes and times utility.  After the utility finishes, time writes the total time
     elapsed, the time consumed by system overhead, and the time used to execute utility to the standard
     error stream.  Times are reported in seconds.

...
```

#### System Calls

You'll probably not use this section unless you are doing systems programming. This section contains info on the avaiable Linux Kernel system calls. For example, running `man 2 chown` gives:

```
CHOWN(2)                    BSD System Calls Manual                   CHOWN(2)

NAME
     chown, fchown, lchown, fchownat -- change owner and group of a file

SYNOPSIS
     #include <unistd.h>

     int
     chown(const char *path, uid_t owner, gid_t group);
...
```

#### Library Calls

These are the manpages for the C library calls. For example, `man 3 time`:

```
TIME(3)                  BSD Library Functions Manual                  TIME(3)

NAME
     time -- get time of day

LIBRARY
     Standard C Library (libc, -lc)

SYNOPSIS
     #include <time.h>

     time_t
     time(time_t *tloc);
...
```

Here we can see why the sections are important to know about - running `man time` does not open the page above, because `man` searches the library in order of sections ascending, meaning that it actually finds `time(1)` and shows the pages for the `time` program, not the `time` C library call. Because of the ambiguity of the names (without the section number) in most Linux documentation you'll see the man section number written next to library calls, system calls, programs and so on.

#### Devices

This section deals with the special devices which live in the `/dev/*` folder. For example, running `man 4 random` shows:

```
RANDOM(4)                BSD Kernel Interfaces Manual                RANDOM(4)

NAME
     random , urandom -- random data source devices.

SYNOPSIS
     pseudo-device random

DESCRIPTION
     The random device produces uniformly distributed random byte values of
     potentially high quality.
...
``` 

Again, we see that section numbers can be important. If you just run `man random`, you'll see:

```
RANDOM(3)                BSD Library Functions Manual                RANDOM(3)

NAME
     initstate, random, setstate, srandom, srandomdev -- better random num-
     ber generator; routines for changing generators

LIBRARY
     Standard C Library (libc, -lc)

SYNOPSIS
     #include <stdlib.h>

     char *
     initstate(unsigned seed, char *state, size_t size);

     long
     random(void);
...
```

Which is the manpage for `random(3)`, which is C library function, not the `/dev/random` file!

#### File Formats

This section details special files in the system. For example, `man 5 crontab` shows:

```
CRONTAB(5)                  BSD File Formats Manual                 CRONTAB(5)

NAME
     crontab -- tables for driving cron

DESCRIPTION
     A crontab file contains instructions to the cron(8) daemon of the gen-
     eral form: ``run this command at this time on this date''.  Each user
     has their own crontab, and commands in any given crontab will be exe-
     cuted as the user who owns the crontab.  Uucp and News will usually
     have their own crontabs, eliminating the need for explicitly running
     su(1) as part of a cron command.
...
```

Which describes the crontab file used to define scheduled tasks. Again, this is different to `man crontab` which would document `crontab(1)`. Similarly, `man 5 passwd` is going to show something quite different to `man passwd`.

#### Games

Nothing says it better than `man 6 intro` itself (this'll not work on a Mac, if you want to see the section, try `docker run alpine man 6 intro`):

```
...
DESCRIPTION
       Section 6 of the manual describes all the games and funny little programs available on the system.
...

```

There are probably a few silly programs available on your system, here you'll find their manuals. For example, `man 6 banner` on a Mac shows:

```
BANNER(6)                      BSD Games Manual                      BANNER(6)

NAME
     banner -- print large banner on printer

SYNOPSIS
     banner [-d] [-t] [-w width] message ...

DESCRIPTION
     Banner prints a large, high quality banner on the standard output.  If
     the message is omitted, it prompts for and reads one line of its stan-
     dard input.
...
```

This section is going to be highly dependent on your OS!

#### Miscellaneous

This is where you'll find additional assorted documentation. For example, `man 7 ascii` shows:

```
ASCII(7)             BSD Miscellaneous Information Manual             ASCII(7)

NAME
     ascii -- octal, hexadecimal and decimal ASCII character sets

DESCRIPTION
     The octal set:

     000 nul  001 soh  002 stx  003 etx  004 eot  005 enq  006 ack  007 bel
...
```

Nowadays given how easy it is generally to just look something up on the internet, I'm not sure how much you'll use this section!

#### Getting the Index of Manual Section

Manpages are just files on the filesystem, so you can get the index of a section just by looking in the appropriate folder. For example, to index the available system calls, try `ls /usr/share/man/man2`:

```
EV_SET.2             fsync.2              mlock.2              setegid.2
FD_CLR.2             ftruncate.2          mmap.2               seteuid.2
FD_COPY.2            futimes.2            mount.2              setgid.2
...
```

This is quick and easy way to see what sort of entries you have on your system.

### Searching the Manual

You can search the manpage titles and summaries with `man -k`. For example, `man -k cpu` shows:

```
cpuwalk.d(1m)            - Measure which CPUs a process runs on. Uses DTrace
dispqlen.d(1m)           - dispatcher queue length by CPU. Uses DTrace
gasm(n), grammar::me::cpu::gasm(n) - ME assembler
```

## That's Enough!

Like many tools which have been around for a long time, there's a lot you can do with `man`. Much of it you'll likely never need, so I've tried to keep this article to the basics, as well as giving a bit of information about the sections and structure, which can be useful to know about. I hope this helps you save some time when you are working, and please let me know in the comments if you have any questions or thoughts. You can also check out the [rest of the effective shell series](https://github.com/dwmkerr/effective-shell).
