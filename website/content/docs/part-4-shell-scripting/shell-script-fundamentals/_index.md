---
title: "Shell Script Fundamentals"
slug: "shell-script-fundamentals"
weight: 18
---

# Chapter 18 - Shell Script Fundamentals

First we're going to look at how to write shell scripts as well as the different ways to execute them. We'll look at how shell script files should be structured and how to use 'shebangs' to define how a shell script will run. These will be essential techniques to have as a foundation for building your own scripts.

## What is a Shell Script?

A shell script is just a text file which contains a set of commands. As soon as you find yourself repeating the same sequence of commands in a shell, it might be worth saving these commands to a file and running the file instead.

Saving your commands to a file has a number of benefits. It saves time - you don't need to type the commands out each time you want to run them! You can use your favourite editor to build the script file, and you can add 'comments' to describe what you are trying to achieve (which will make it far easier to update the script over time). Files can also easily be shared - meaning you can copy these scripts to other machines or share them with others who might find them useful.

## Creating a Basic Shell Script

Let's create a simple shell script that shows us our most commonly used shell commands.

Almost every command that is needed to build the script has been discussed in the book already, so it shouldn't be too unfamiliar. But I'll still break it down blow-by-blow to help us understand it.

As we go through this section of the book we're going to extend this script and make it more useful!

### The 'common' Command

We're going to create a new command, called 'common', that shows the most commonly used shell commands.

We should be able to do this using techniques we've seen so far. We'll do it like this:

1. Open up the shell history, shown in the [Slice and Dice Text]({{< relref "/docs/part-3-manipulating-text/slide-and-dice-text" >}}) chapter.
2. Read a large number of commands from the history
3. Sort the commands, then count the number of duplicates
4. Sort the commands, by the number of duplicates (i.e. ordering by 'most commonly used')
5. Print the results to the screen.

Let's get started!

### Creating a Simple Script

It's going to take some trial and error to get our commands right. So let's start by creating a shell script, which we'll run again and again.

In your favourite editor, create a file called 'common.sh' and put it somewhere on your system. As an example, I'm going to create a folder called `scripts` in my home directory and create the `common.sh` file there:

```sh
# Create a directory called 'scripts'.
# Using the '-p' flag means we won't get an error if the folder exists.
mkdir -p ~/scripts 

# Create the script file.
touch ~/scripts/common.sh

# Open the script file in my favourite editor.
vi ~/scripts.sh
```

These commands should be familiar. The `mkdir` command creates a directory. The `-p` (create parent directories if needed) flag stops the command from returning an error if the directory already exist. The `touch` command creates an empty file with the given name. Finally, I open the file in an editor. I am using Vim, but you can open this file in any editor you like.

Inside the `common.sh` file let's start building our script.

### Building and Testing the Script

Add the following commands to the `common.sh` file:

```
echo "common commands:"
tail ~/.bash_history -n 1000 | sort | uniq -c | sed 's/^ *//' | sort -n | tail -n 10
```

This is a short script, but there is quite a lot going on. Let's look at it blow-by-blow:

1. First we take the last 1000 lines of the `~/.bash_history` file using the `tail` command[^1]
2. Then we sort the commands. This will put all of the duplicates next to each other
3. Then we remove all duplicates and use the `-c` (_show count_) flag to count the duplicates
4. Then we remove the leading spaces from the output (which we need to do so that we can sort properly)
5. Then we sort _numerically_
6. Finally, we limit the results to the last ten items


If you want to see the details of how the script works, check [Appendix - How the Script Works](#appendix-how-the-script-works).

Now save the file. In your shell, run the following command to execute the file:

```
sh ~/scripts/common.sh
```

The `sh` (shell) command starts a new shell. When we pass the path of a shell script, the shell command will run the script and then exit. The output you see will look something like this:

```
common commands:
96 gpr
97 gcm
112 gl
122 make dev
169 gpo
212 ls
238 ga .
267 gc
463 vi
843 gst
```

You can see my most common commands are short aliases for Git commands (the ones that start with 'g'), opening Vim, running a makefile command and a few others.

We now have a basic shell script. Let's look at a few different ways we can run the script.

## Running a Shell Script

There are a few different ways we can run shell scripts.

The first is to run a shell program and pass the script as a parameter. This is what we did in the earlier example. Here's another example of how we could run the script we created:

```
bash ~/scripts/common.sh
```

This is a perfectly valid technique. Now let's see the other ways we can run a script.

The next way we can run a script it is make it 'executable'. This means we change the file permissions of the script file, adding the 'executable bit'. This tells the systems we can run the file. We use the `chmod` (_change file mode_) command to do this:

```
chmod +x ~/scripts/common.sh
```

This should be familiar if you have read the [Understanding Commands]({{< relref "/docs/part-2-core-skills/understanding-commands" >}}) chapter. Now that the file has been made executable, we can simply enter the path to the file and run it, as if it was any other command:

```
~/scripts/common.sh
```

There is a problem with this approach though. How this file is executed is going to vary depending on how your system is set up. For example, if you are using Bash, then the script will run in a new instance of the Bash shell. However, if you are using the Z shell, then the script will most likely run in the `sh` program[^3] (and depending on your system, this program might just be a link to _another_ type of shell).

What we really want to do is be explicit about _what_ program should run our script. We can do this using a special construct called a _shebang_

## Using Shebangs

A _shebang_ is a special set of symbols at the beginning of a file that tells the system what program should be used to run the file.

If we were to add a shebang to our `common.sh` file, it would look like this:

```sh
#!/usr/bin/sh

echo "common commands:"
tail ~/.bash_history -n 1000 | sort | uniq -c | sed 's/^ *//' | sort -n
```

The shebang is the two characters - `#!`. The name 'shebang' comes from the names of the symbols. The first symbol is a 'sharp' symbol (sometimes it is called a hash, it depends a little on context). The second symbol is an exclamation point. In programming the exclamation point is sometimes called the 'bang' symbol. When we put the two together, we get 'sharp bang', which is shortened to 'shebang'.

Immediately after the shebang you write the full path to the program which should be used to open the file.

For example, if you wanted to write a script that is run in Python, you could do this:

```
#!/usr/bin/python3

print('Hello from Python')
```

If we wanted to explicitly use the Bash shell to run a script, we might use a shebang like this:

```
#!/usr/bin/bash

echo "Hello from Bash"
```

What about Node.js? Easy!

```
#!/usr/bin/node

console.log("Hello from Node.js");
```

### Shebangs - Dealing with Paths

There is a bit of a challenge with shebangs. What if the program we want to use is not where we expect it to be?

For example, what if we want to use Ruby to run a script, and we write the script like this:

```
#!/usr/bin/ruby

puts 'Hello from Ruby'
```

This will only work if you have the Ruby program installed in the location specified after the shebang (i.e. `/usr/bin/ruby`). If you do not have the Ruby program in this location the script will fail to run.

How can we know where the user will have a specific program installed?

It turns out that this is actually a difficult problem to solve. Different people install programs in different locations and different distributions of Linux, Unix or Unix-like systems vary in where they keep even basic programs like the shell.

Rather than try and work out where a program is, we can side step this entire problem. There is a common trick for dealing with this issue, which is to use the `env` (_set environment and execute command_) command. This command is often used to show environment variables, but you can also use it to execute an arbitrary command (often with a modified environment). One handy feature of the `env` command is that it looks through the `$PATH` variable to find the path of the command to execute.

You can see this by running a command like the below:

```
$ env python3
Python 3.8.5 (default, Jan 27 2021, 15:41:15)
[GCC 9.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

We've used the `env` command to run the `python3` command - and it worked out the correct path for us.

To use `env` in a shebang, specify the full path to `env` (which should be the same on all Unix-like systems) and then provide the name of the command to run:

```
#!/usr/bin/env bash

echo "Hello from Bash"
```

Or another example:

```
#!/usr/bin/env ruby

puts 'Hello from Ruby'
```

Using a shebang to specify the exact command to run, and then using the `env` command to allow the `$PATH` to be searched is generally the safest and most portable way to specify how a shell script should run.

## Installing Your Script

Before we finish with our shell script fundamentals, we'll take a look at one final commonly used pattern to run shell scripts - installing them as a local binary.

Our `common.sh` script (with the added shebang) looks like this:

```
#!/usr/bin/env sh

echo "common commands:"
tail ~/.bash_history -n 1000 | sort | uniq -c | sed 's/^ *//' | sort -n | tail -n 10
```

If we have made the script executable with the `chmod` command, then we can run the script by simply typing the location of the script in the shell:

```
$ ~/scripts/common.sh
common commands:
96 gpr
97 gcm
...
```

If we want to 'install' this script as a local command which we can run easily, we can create a _symbolic link_ to the shell script in our `/usr/local/bin` folder:

```
ln -s ~/scripts/common.sh /usr/local/bin/common
```

The `ln` (_create link_) command creates a link (which is like a shortcut in Windows and other desktop systems) in our `/usr/local/bin` folder, with the name `common`, which points to the script we have written. We can now run the `common` command without specifying its path:

```sh
$ common
common commands:
96 gpr
97 gcm
...
```

This works because when the shell sees a command, it searches through the folders in the $PATH environment variable to find out where the command is. And the `/usr/bin/local` folder is in this list of paths.

Why do we use the `/usr/bin/local` folder rather than the `/usr/bin` folder? This is just a convention. In general, the `/usr/bin` folder is for commands which are installed with package manager tools like `apt` or Homebrew (on MacOS). The `/usr/local/bin` folder is used for commands which you create for yourself on your local machine and manage yourself[^4].

## Summary

In this chapter we've covered quite a few of the fundamentals of shell scripts:

- How to create a shell script
- How to run a shell script
- How to make a shell script executable
- How shebangs work
- How to use the `env` command to make our shebangs more portable
- How to 'install' scripts for the current user

In the next chapter we'll look at how to add logic to our shell scripts.

---

## Appendix - How the Script Works

```
vi README.md
git status
git checkout main
git status
restart-shell
git status
open .
vi README.md
open .
```

First we sort:

```
git checkout main
git status
git status
git status
open .
open .
restart-shell
vi README.md
vi README.md
```

Then we use `uniq` to remove duplicate adjacent lines, passing the `-c` flag to include a count:

```
     1 git checkout main
     3 git status
     2 open .
     1 restart-shell
     2 vi README.md
```

Now we remove the leading whitespace:

```
1 git checkout main
3 git status
2 open .
1 restart-shell
2 vi README.md
```

Finally we sort numerically (by using the `-n` flag):

```
1 git checkout main
1 restart-shell
2 open .
2 vi README.md
3 git status
```

Why the numeric sort? If we didn't sort numerically and instead performed the default lexographic sort and have more than single digit results, the output would look like this:

```
1 git checkout main
1 restart-shell
13 git status
2 open .
2 vi README.md
```

This is a lexographic sort - the line starting with 13 comes after the line starting with 2. We want to sort by the value of the number.

---

[^1]: The path to the shell history file is normally available in the `$HISTFILE` environment variable. However, in a non-interactive shell this variable is not set (and when we run a shell script, it is run in a non-interactive shell). We'll see more about interactive and non-interactive shells later, this is just a note in case you are wondering why we don't use the `$HISTFILE` variable or `history` command!
[^3]: Try putting the command `pstree -p $$` in a shell script and running the script - you'll see exactly what process is run.
[^4]: If you want to know more about these folders and the conventions behind them then check back soon, I am going to be adding an entire section on Linux Fundamentals, and one of the chapters will specifically be on the Linux Filesystem. This will cover 'The Linux Filesystem Hierarchy Standard' which defines how folders like this should be used.
