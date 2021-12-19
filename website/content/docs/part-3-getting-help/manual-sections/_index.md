---
title: "Man Pages"
slug: "man-pages"
weight: 5
---

# Chapter 12 - Manual Sections

You'll often see tools referred to in manpages with numbers after them. Take a look at `man less`:

![Screenshot of numbers](./images/numbers.png)

The number is the manual **Section Number**. The different sections of the manual are documented and can be found on most Unix-like systems in `man`'s documentation, which you can check by running `man man`[^1]. Here's what you'd get on Ubuntu 16:

- **Section 1** - Executable programs or shell commands
- **Section 2** - System calls (functions provided by the kernel)
- **Section 3** - Library calls (functions within program libraries)
- **Section 4** - Special files (usually found in `/dev`)
- **Section 5** - File formats and conventions (e.g. `/etc/passwd`)
- **Section 6** - Games
- **Section 7** - Miscellaneous (including macro packages and conventions), e.g. `man(7)`, `groff(7)`
- **Section 8** - System administration commands (usually only for root)
- **Section 9** - Kernel routines (Non standard)

Not all of these explanations will be entirely clear to everyone, so we'll go through the sections in detail shortly.

If you want to, you can specifically choose *which* section of the manual you are looking in by using:

```
man <section> <search>
```

You can also get more information about the sections themselves by opening up the `intro` page. For example:

```
$ man 1 intro

INTRO(1)                  BSD General Commands Manual                 INTRO(1)

NAME
     intro -- introduction to general commands (tools and utilities)

DESCRIPTION
     Section one of the manual contains most of the commands which comprise...
```

Why would you do this, and why would you care? In general you won't need to worry about the sections unless you are looking for something which has an entry in _multiple_ sections and you want to specify which one you use.

Another reason it is useful to know about the sections is that a _lot_ of documentation (online and offline) includes a section number _after_ the name of a command or file. Knowing what the section is can be useful in this case.

Here are a few examples of entries from each section, which illustrate what each section is for.

## Section 1: Programs and Shell Commands

These are programs - probably what you are going to be looking up most regularly! For example, `man 1 time` shows:

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

## Section 2: System Calls

You'll probably not use this section unless you are doing systems programming[^2]. This section contains info on the available Linux Kernel system calls. For example, running `man 2 chown` gives:

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

This entry shows you how you would call the function if you were programming for the Kernel.

## Section 3: Library Calls

These are the manpages for the C standard library functions. For example, `man 3 time`:

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

You would use this information if you were writing programs to run on the system.

Here we can see why the sections are important to know about. There are _multiple_ entries for `time`. We need to use the sections to differentiate between them.

Running `man time` would *not* open the page above, because `man` searches the library in ascending section order, meaning that it actually finds `time(1)` and shows the pages for the `time` program, not the `time` C library call.

Because of the potential ambiguity of names if no section number is included, in lots of Linux documentation you'll see the man section number written next to library calls, system calls, programs and so on (things will refer to `sed(1)` or `time(3)` for example.

## Section 4: Devices

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

We'll see more of these special files later in the book.

## Section 5: File Formats

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

You'll potentially use this section if you are performing system administration.

## Section 6: Games

Nothing says it better than `man 6 intro` itself (this'll not work on a Mac sadly, but try it on another Linux system):

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

This section is going to be highly dependent on your operating system!

## Section 7: Miscellaneous

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

## Section 8: System Commands

We've actually already seen one of these commands mentioned, in the manpage for `crontab(5)` it mentions `cron(8)`. Let's see, with `man 8 cron`:

```
CRON(8)                   BSD System Manager's Manual                  CRON(8)

NAME
     cron -- daemon to execute scheduled commands (Vixie Cron)

SYNOPSIS
     cron [-s] [-o] [-x debugflag[,...]]
```

These are commands which system administrators would normally run. You might open section eight unexpectedly, for example `man chmod` will open `chmod(1)`, but `man chown` will open `chown(8)`, as it is a system command.

Some distributions might vary for section nine. On my Mac it contains information about the kernel interfaces, a C style guide and some more.

# Summary

In this chapter we looked at some of the ways we can get help. To quickly summarise:

- The `man` pages are grouped into sections, we can see them with `man man`

# Footnotes

[^1]: Weirdly satisfying to run.
[^2]: Which it is always fun to try if you get the chance, and a great way to learn more about the fundamentals of the operating system.

