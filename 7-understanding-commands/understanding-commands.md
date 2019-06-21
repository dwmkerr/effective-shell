# The Subtleties of Shell Commands

In this short chapter we'll take a look at the concept of commands, and the subtleties you might need to know about when working with shells.

By the end of this chapter, you might even be able to make sense of the horrifying, and perfectly syntactically valid code below:

```sh
which $(where $(what $(whence $(whereis who))))
```

- [Part 1: Navigating the Command Line](https://www.dwmkerr.com/effective-shell-part-1-navigating-the-command-line/)
- [Part 2: Become a Clipboard Gymnast](https://www.dwmkerr.com/effective-shell-part-2-become-a-clipboard-gymnast/)
- [Part 3: Getting Help](https://www.dwmkerr.com/effective-shell-part-3-getting-hepl/)
- [Part 4: Moving Around](https://dwmkerr.com/effective-shell-4-moving-around/)
- [Part 5: Interlude - Understanding the Shell](https://dwmkerr.com/effective-shell-part-5-understanding-the-shell/)
- [Part 6: Everything You Don't Need to Know About Job Control](https://dwmkerr.com/dwmkerr.com/effective-shell-6-job-control/)
- **[Part 7: The Subtleties of Shell Commands]()**

## What Are Commands?

This is _really_ important to understand! A _command_ in a shell is something you execute. It might take parameters. Generally it'
ll have a form like this:

```sh
command param1 param2
```

Easy. We've already seen many commands during this series:

```sh
ls              # Show the contents of the current directory
cd ~            # Move to the user's home
cat file.txt    # Output the contents of 'file.txt' to stdout
```

But to be an effective shell user, you must understand that not all commands are the same under the hood. And the differences between commands will affect how you use them.

There are four types of commands in most shells:

1. Executable Files
2. Builtins
3. Functions
4. Aliases

Let's quickly dig in and see a bit more.

## Executable Files - Programs

Executable files are just files with the 'executable' bit set. If I execute the `cat` command, under the hood the shell will search for an executable named `cat` in my `$PATH` and if it finds it, will start the process, running the program.

```
$ cat file.txt
This is a simple text file
```

What is `$PATH`? `$PATH` is the standard environment variable used to define _where_ the shell should search for programs. If we temporarily empty out the variable, we'll fail to run the command:

```sh
$ PATH="" cat file.txt
bash: cat: No such file or directory
```

Normally your `$PATH` variable will include the standard locations for Linux programs - folders such as `/bin`, `/sbin`, `/usr/bin` and so on. If you were to print the variable, you'd see a bunch of paths like this (they are separated by colons, I've put them on separate lines for readability):

```
/usr/local/bin
/usr/bin
/bin
/usr/sbin
/sbin
```

The shell will start with the _earlier_ locations and move to the later ones. This allows _local_ flavours of tools to be installed for users, which the shell will find first.

## Executable Files - Shebangs

Imagine we create a file called `dog` in the local folder:

```sh
#!/bin/sh
echo "woof"
```

If we make the file _executable_, by running `chmod +x dog`, then we can run this just like any other program:

```sh
$ PATH="." dog
woof
```

The current folder is not in `$PATH`, so we add it. More common would be to simply tell the shell where the command is:

```sh
$ ./dog
woof
```

Or just move it to a standard location:

```sh
$ mv dog /usr/local/bin
$ dog
woof
```

The point is that executables don't have to be compiled program code. If a file starts with `#!` (the 'shebang'), then the system will try to run the contents of the file with the program specified in the shebang. We will actually look at shebangs in more detail in a later chapter.

## Builtins

OK so we've seen executables. What about a command like this?

```sh
local V="hello" echo $V
```

You will not find the `local` executable anywhere on your system. It is a _builtin_ - a special command built directly into the shell program. Builtins are often highly specific to your shell, the might be used for programming (`local` for example is used to declare a locally scoped variable), or they might be for very shell specific features.

This is where we need to take note. As soon as you are running a builtin, you are potentially using a feature which is specific to _your_ shell, rather than a program which is shared across the system and can be run by _any_ shell (or even directly).

Trying to programmatically execute `local` as a process will fail - there is no executable with that name, it is purely a shell construct.

So how do we know if command is a builtin? The preferred method is to use the `type` command:

```sh
$ type local
local is a shell builtin
```

The `type` command (which is itself a builtin!) can tell you what type a certain command is.

Interestingly, you might be using more builtins than you think:

```sh
$ type -a echo
echo is a shell builtin
echo is /bin/echo
```

By using the `-a` flag on `type` to show _all_ commands which match the name, we see that `echo` is actually a builtin in our shell, as well as a program. Many simple programs are _also_ builtins - this is because if they are simply code in the shell, the shell can execute them much faster.

Another reason a command might be a builtin is that it cannot sensibly function otherwise. The `cd` command changes the current directory - if we executed it as a process, it would only change the directly for the `cd` process itself, not the shell, making it much less useful!

Builtins will vary from shell to shell, but many shells are 'bash-like' meaning they will have a set very similar to the bash builtins, which you can see here:

https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html

As should be familiar from [Chapter 3: Getting Help](https://www.dwmkerr.com/effective-shell-part-3-getting-hepl/) you can get help for builtins:

```sh
$ man source     # source is a builtin
BUILTIN(1)                BSD General Commands Manual               BUILTIN(1)

NAME
     builtin, !, %, # ...snip...

SYNOPSIS
     builtin [-options] [args ...]
```

However, the manual will _not_ show information on specific builtins, which is a pain.

## Functions

You can define your own shell functions. We will see a lot more of this later, but let's show a quick example for now:

```sh
$ restart-shell () { exec -l $SHELL }
```

This snippet creates a function which restarts the shell (quite useful if you are messing with shell configuration files or think you might have irreversibly goofed up your current session).

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

Functions are one of the most powerful shell constructs we will see, they are extremely useful for building sophisticated logic. We're going to see them in a lot more detail later, but for now it is enough to know that they exist, and can run logic, and can be run as commands.

## Aliases

Aliases are really just a shortcut. Type in a certain set of characters, and the shell will replace them with the value defined in the alias. Some commands are actually already aliases, for example, in my `zsh` shell the `ls` command is actually an alias:

```sh
% type -a ls
ls is an alias for ls -G
ls is /bin/ls
```

I make sure that when I use the `ls` command, the shell always expands it to `ls -G`, which colours the output.

We can quickly define aliases to save on keystrokes. For example:

```sh
$ alias k='kubectl'
```

From this point on, I can use the `k` alias as a shorthand for the `kubectl` command.

Aliases are far less sophisticated than functions, think of them as keystroke savers and nothing more and you won't go far wrong.

## So What?

So we now hopefully have a greater understanding of the variety of shell commands. Not all commands are executables, not all of the commands we _think_ are executables necessarily are, and some commands might be more sophisticated.

As a shell user, the key things to remember are:

1. Executables are 'safe' - they are programs your system can use, your shell just calls out to them
2. Builtins are _very_ shell specific, and usually control the shell itself
3. Aliases are conveniences for human operators, but only in the context of an interactive shell
4. Functions are powerful ways to write logic, but should be used with caution

If you are ever uncertain about what a command is, just use the `type -a` command:

```sh
$ type -a cat
cat is /bin/cat
```

## More Than You Need To Know

OK, for the masochistic few, you might be wondering about all of the other commands and utilities you may have seen which can tell you about programs and commands:

- `what`
- `whatis`
- `which`
- `whence`
- `where`
- `whereis`
- `command`
- `type`

A _lot_ of these are legacy and should be avoided, but for completenesses sake we'll run down them.

**`what`**

`what` reads out special metadata embedded in a program, generally used to identify the version of source code it was built from:

```sh
$ what /bin/ls
/bin/ls
         Copyright (c) 1989, 1993, 1994
        PROGRAM:ls  PROJECT:file_cmds-272.220.1
```

There should be almost no circumstance you need to use it in day to day use. But you might come across it if your _meant_ to type `whatis`.

**`whatis`**

`whatis` searches the local 'whatis' database for text. This can be useful in tracking down manual pages:

```sh
$ whatis bash
bash(1)                  - GNU Bourne-Again SHell
bashbug(1)               - report a bug in bash
```

But I can't imagine it will be a regularly used tool my most users.

**`which`**

`which` will search your `$PATH` to see whether an executable would be found. With the `-a` flag it will show all results.

```sh
$ which -a vi
/usr/local/bin/vi
/usr/bin/vi
```

`which` originated in `csh`. It remains on many systems for compatibility, but in general should be avoided due to potentially odd behaviour[^1].

**`whence`**

`whence` was added to the Korn shell, you are unlikely to use it unless you are on systems using `ksh`. `zsh` has this command but it should be avoided and considered non-standard.

```sh
% whence brew
/usr/local/bin/brew
```

**`where`**

This is a shell builtin which can provide information on commands, similar to `type`:

```sh
% where ls
ls: aliased to ls -G
/bin/ls
```

However, `type` should be preferred.

**`whereis`**

`whereis` is available on some systems and generally operates the same as `which`, searching paths for an executable:

```sh
% whereis ls
/bin/ls
```

Again, `type` should be preferred.

**`command`**

`command` is defined in the POSIX standard, so should be considered to be present on most modern systems. Without arguments it simply executes a command. With the `-v` argument you get a fairly machine-readable or processable response, with the `-V` argument you get a more human readable response:

```sh
% command -v ls
alias ls='ls -G'
% command -V ls
ls is an alias for ls -G
```

**`type`**

`type` is part of the Unix standard, and will be present in most modern systems. As we've already seen it will identify the type of a command, as well as the location for an executable:

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

**Summary**

In summary, avoid anything that starts with `w`! These are legacy commands, generally only needed when working on older Unix machines. Prefer `type` or `command`.

---

**Footnotes**

[^1]: [Stack Exchange: Why not use “which”? What to use then?](https://unix.stackexchange.com/questions/85249/why-not-use-which-what-to-use-then)
