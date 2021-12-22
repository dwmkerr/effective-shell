---
title: "Understanding Commands"
slug: "understanding-commands"
weight: 10
---

<!--

EXAMPLE FOR OPTIONS:

There are a lot of options for the `ls` command. In [Part 3](../../part-3-getting-help) we'll see how to find out the options for commands. For now, let's look at one of the most common options `-l`. This tells `ls` to show the _long_:

```sh
ls -l
```

<img alt="Screenshot: ls -l" src="images/ls-l.png" width="800px" />

A little like the 'details' view in a graphical user interface, this list view shows us more details, such as who owns the file or folder, when it was modified, and more. Again, we'll see more details on this later.


In summary, avoid anything that starts with '`w`'! These are legacy commands, generally needed only when working on older Unix machines. `type` or `command`  should be used instead.

-->

# Chapter 8 - Understanding Commands

In this chapter, we'll take a look at the various different types of shell commands that exist and how their differences can affect your work. 
Commands are far more subtle than you might think and in this chapter we'll look at some of their nuances.

# What Are Commands?

This is _really_ important to understand! A _command_ in a shell is something you execute. It might take parameters. Generally it'll have a form like this:

```sh
command [param1 param2 ...]
```

We've already seen many commands during this series:

- `ls` - Show the contents of a directory
- `cd` - Change directories
- `pwd` - Print the current directory
- `wget` - Download a file from the web
- `less` - View the contents of a file

But to be an effective shell user, you must understand that not all commands are created equal. 
The differences between the types of commands will affect how you use them.

# The Different Types of Commands

There are *four* types of commands in most shells:

1. Executables
2. Shell Builtins 
3. Functions
4. Aliases

Each is different and has its own quirks. Let's quickly dig in and see a bit more.

## Executables 

Executables are simply programs that are external to the shell,
stored on the system as separate files.
These files have their _executable_ bit set, which explains the name.

Most commands fall into this category&mdash;
The `less` command, for example, is an executable.  

We can check with the `type` command, which prints the kind of command:

```sh
$ type less
less is /usr/bin/less

$ file /usr/bin/less
/usr/bin/less: ELF 64-bit LSB pie executable, 
x86-64, version 1 (SYSV), dynamically linked, 
[...]
```

When called, the shell must look up the appropriate file,
then execute it.
Some standard locations of executables are:

```
/bin
/usr/bin
/sbin
/usr/sbin
/usr/local/bin
```

Executables don't _have_ to be compiled program code, they can be scripts. 
However, both binary executables and interpretted scripts
behave exactly the same when called as a command.

## Builtins

A _builtin_ is a command within the shell itself, and are therefore shell-specific.
[Nushell](https://www.nushell.sh/), for example, defines `ls` to be a builtin, 
whereas on Bash and Z-shell (and most other shells), `ls` is an external command.

This is where we need to take note. As soon as you are running a builtin, you are potentially using a feature that is specific to _your_ shell, rather than a program that is shared across the system and can be run by _any_ shell.

So how do we know if a command is a builtin? The preferred method is to use the `type` command:

```sh
$ type cd
cd is a shell builtin
```

The `type` command (which is _itself_ a builtin!) tells you the exact type of shell command.
Interestingly, you might be using more builtins than you think. `echo` is a program, but most of the time you are not executing it when you are in a shell:

```sh
$ type -a echo
echo is a shell builtin
echo is /bin/echo
```

Unless you specify the command `/bin/echo`, you are using Bash's 
builtin `echo`.
Many simple programs have builtin versions. 
Echo is builtin because the shell can run much more quickly by not actually running a different program.
Other commands are shell builtins because they have to be, like `cd`.

Many shells are 'Bash-like', meaning their builtins will be very similar to the Bash builtins, which you can see here:

https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html

Incidentally, `type` is part of the Unix standard, and will be present (as a builtin) within most shells. 
As we've already seen, it will identify the type of command as well as the location of an executable.

## Functions

Most shells permit the user to define commands of their own.
Technically, they are just a way to group commands together; however,
they may also contain quite sophisticated logic.
We will see a lot more of this later, but let's show a quick example for now:

```sh
$ restart-shell() { 
> exec -l $SHELL 
> }
```

This snippet creates a function that restarts the shell (quite useful if you are messing with shell configuration files or think you might have irreversibly goofed up your current session).

We can execute this function just like any command:

```sh
$ restart-shell
```

And running `type` will show us that this is a function:

```sh
$ type restart-shell
restart-shell is a function
restart-shell ()
{
    exec -l $SHELL
}
```

Functions are one of the most powerful constructs shells offer: They are extremely useful for building sophisticated logic. We're going to see them in a lot more detail later, but for now it is enough to know that they are user-defined, and are ran as commands.

## Aliases

An alias is just a shortcut. Type in a certain set of characters, and the shell will replace them with the value defined in the alias.

Some common commands are actually already aliases - for example, in my `zsh` shell, the `ls` command is an alias:

```sh
% type -a ls
ls is an alias for ls -G
ls is /bin/ls
```

Whenever I use the `ls` command, the shell expands it to `ls -G`, which colours the output.

We can quickly define aliases to save on keystrokes. For example:

```sh
$ alias k='kubectl'
```

From this point on, I can use the `k` alias as shorthand for the `kubectl` command.

Aliases are far less sophisticated than functions. Think of them as keystroke savers and nothing more.

# The Key Takeaways

So we now hopefully have a greater understanding of the variety of shell commands. Not all commands are executables, not all of the commands we _think_ are executables necessarily are, and some commands might be more sophisticated.


As a shell user, the key things to remember are:

1. Executables are programs your system can use; your shell just calls out to them.
2. Builtins are _very_ shell-specific and can manipulate the shell itself
3. Functions are powerful ways to write logic but will normally be shell-specific.
4. Aliases are conveniences for human operators, but only in the context of an interactive shell.
5. Use the `type` command to assert a command's type.

# More than You Need to Know

OK, for the masochistic few, you might be wondering about all of the other commands and utilities you may have seen that can tell you about programs and commands:

- `what`
- `whatis`
- `which`
- `whence`
- `where`
- `whereis`
- `command`
- `type`

A _lot_ of these are legacy and should be avoided, but for completeness sake, we'll go through them.

## `what`

`what` reads out special metadata embedded in a program, generally used to identify the version of source code it was built from:

```sh
$ what /bin/ls
/bin/ls
         Copyright (c) 1989, 1993, 1994
        PROGRAM:ls  PROJECT:file_cmds-272.220.1
```

There should be almost no circumstance in which you need to use it in your day-to-day work, but you might come across it if you _meant_ to type `whatis`.

## `whatis`

`whatis` searches a local help database for text. This can be useful in tracking down manual pages:

```sh
$ whatis bash
bash(1)                  - GNU Bourne-Again SHell
bashbug(1)               - report a bug in bash
```

But I can't imagine it will be a regularly used tool by most users.

## `which`

`which` will search your `$PATH` to see whether an executable can be found. With the `-a` flag, it will show all results.

```sh
$ which -a vi
/usr/local/bin/vi
/usr/bin/vi
```

`which` originated in `csh`. It remains on many systems for compatibility but in general should be avoided due to potentially odd behaviour[^1].

## `whence`

`whence` was added to the Korn shell. You are unlikely to use it unless you are on systems using `ksh`. `zsh` also has this command, but it should be avoided and considered non-standard.

```sh
% whence brew
/usr/local/bin/brew
```

## `where`

This is a shell builtin that can provide information on commands, similar to `type`:

```sh
% where ls
ls: aliased to ls -G
/bin/ls
```

However, `type` should be preferred, as it is more standard.

## `whereis`

`whereis` is available in the `util-linux` package, and prints the man-page location of the command, in addition to the binary's location:

```sh
% whereis ls
ls: /usr/bin/ls /usr/share/man/man1/ls.1.gz /usr/share/man/man1p/ls.1p.gz
```

Again, `type` should be preferred for compatibility.

## `command`

`command` is defined in the POSIX standard, so should be expected to be present on most modern systems. Without arguments, it simply executes a command. With the `-v` argument, you get a fairly machine-readable or processable response; with the `-V` argument, you get a more human readable response:

```sh
% command -v ls
alias ls='ls -G'
% command -V ls
ls is an alias for ls -G
```

`command` can be useful in scripts, as we will see in later chapters.

## `type`

`type` is part of the Unix standard and will be present in most modern systems. As we've already seen, it will identify the type of command as well as the location for an executable:

```sh
% type -a ls
ls is an alias for ls -G
ls is /bin/ls
```

This command can also be used to only search for paths:

```sh
% type -p ls
ls is /bin/ls
```

---

**Footnotes**

[^1]: [Stack Exchange: Why not use “which”? What to use then?](https://unix.stackexchange.com/questions/85249/why-not-use-which-what-to-use-then)
