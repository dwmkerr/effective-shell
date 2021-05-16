---
title: "Shell Script Essentials"
slug: "shell-script-essentials"
weight: 18
---

# Chapter 18 - Shell Script Essentials

First we're going to look at how to write shell scripts as well as the different ways to execute them. We'll look at how shell script files should be structured and how to use 'shebangs' to define how a shell script will run.

These will be essential techniques to have as a foundation for building your own scripts. Even if you are familiar with shell scripts I would suggest skimming this chapter to make sure you understand each of the concepts, particularly the later section where we talk about using the `env` command in shebangs.

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

1. Read a large number of commands from the history
2. Sort the commands, then count the number of duplicates
3. Sort the commands, by the number of duplicates (i.e. ordering by 'most commonly used')
4. Print the results to the screen.

Let's get started!

### Creating a Simple Script

It's going to take some trial and error to get our commands right. So let's start by creating a shell script, which we'll run again and again.

In your favourite editor, create a file called `common.v1.sh` and put it somewhere on your system. As an example, I'm going to create a folder called `scripts` in my home directory and create the `common.v1.sh` file there:

```sh
# Create a directory called 'scripts'.
# Using the '-p' flag means we won't get an error if the folder exists.
mkdir -p ~/scripts 

# Create the script file.
touch ~/scripts/common.v1.sh

# Open the script file in my favourite editor.
vi ~/scripts.sh
```
I have called the script `common.v1.sh` rather than `common.sh` because in each chapter of this section we are going to improve upon the script and change the version number. So in later chapters we will create `common.v2.sh`, `common.v3.sh` and so on.

These commands should be familiar. The `mkdir` command creates a directory. The `-p` (create parent directories if needed) flag stops the command from returning an error if the directory already exist.

The `touch` command creates an empty file with the given name. Finally, I open the file in an editor. I am using Vim, but you can open this file in any editor you like.

Before we build the script, let's quickly talk about _comments_.

## Comments<!--index..>

The shell ignores any text which follows a `#` hash symbol. Whether this is text you type into a shell, or text in a shell script, the shell will ignore the content.

This is extremely useful - it means we can use the hash symbol to add _comments_ to our scripts and commands. These comments are not interpreted by the shell, they are added just to make it easier for us to describe what is going on. If you come from a programming background you will likely be familiar with comments.

Here are a few examples:

```sh
# This is a comment - we can use this to describe what we're trying to do.

echo "Hello Shell" # Comments can go at the end of a line...

# You can also use a comment symbol to 'comment out' a line:
# echo "Goodbye Shell"
```

From this point on we'll use comments a lot to explain what we are trying to accomplish with each section of a script. It is generally good practice to use comments to describe your _intent_ - why you are doing something. This is far more useful for the reader than _what_ you are doing. The 'what' should be clear from the commands - the 'why' is the thing readers will likely want to understand.

Here's an example of a bad comment:

```sh
# Write the CSV file, reverse it, cut it, reverse it.
cat ~/effective-shell/data/top100.csv | rev | cut -d',' -f1 | rev
```

The comment just describes what the script is doing. But it doesn't explain _why_. A better comment would be:

```sh
# We want to extract the last field (the number of reviews) for each film.
# Because we don't know how many fields there are we can reverse the text before
# we cut it - then the last field becomes the first, which we extract and then
# put back into the correct order by reversing it again.
cat ~/effective-shell/data/top100.csv | rev | cut -d',' -f1 | rev
```

If you _don't_ come from a programming background you might think that many of these comments are a little obvious. But as you write more and more code you'll realise that something that seemed obvious when you wrote it a while ago can look surprisingly baffling even just a few days later!

Now that we've discussed comments, we'll build our `common.v1.sh` shell script.

## Building and Testing the Script

Add the following commands to the `common.v1.sh` file:

```
# Write the title of our command.
echo "common commands:"

# Show the most commonly used commands.
tail ~/.bash_history -n 1000 | sort | uniq -c | sed 's/^ *//' | sort -n | tail -n 10
```

This is a short script, but there is quite a lot going on. Let's look at it blow-by-blow:

1. First we take the last 1000 lines of the `~/.bash_history` file using the `tail` command[^1]
2. Then we sort the commands. This will put all of the duplicates next to each other
3. Then we remove all duplicates and use the `-c` (_show count_) flag to count the duplicates
4. Then we remove the leading spaces from the output (which we need to do so that we can sort properly)
5. Then we sort _numerically_
6. Finally, we limit the results to the last ten items

If you need a refresher on the shell history, `sort` or `uniq` the check the [Slice and Dice Text]({{< relref "/docs/part-3-manipulating-text/slice-and-dice-text" >}}) chapter. If the `sed` command doesn't look familiar then check the [Advanced Text Manipulation with Sed]({{< relref "/docs/part-3-manipulating-text/advanced-text-manipulation" >}}) chapter.

If you want to see a more detailed breakdown of how the script works, check [Appendix - How the Script Works](#appendix-how-the-script-works). But this is not necessary for you to follow the content in this chapter.

Now save the file. In your shell, run the following command to execute the file:

```
sh ~/scripts/common.v1.sh
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

## Multi-line Commands

You can use the `\` backslash character to create a 'continuation' that tells the shell it needs to join lines up. This allows you to break long commands into multiple lines.

As an example, we could re-write our pipeline command to look like this:

```sh
# Show the most commonly used commands.
tail ~/.bash_history -n 1000 \
    | sort \
    | uniq -c \
    | sed 's/^ *//' \
    | sort -n \
    | tail -n 10
```

This will probably look very familiar to anyone with a background in functional programming!

Be careful when you split lines up - the continuation character _must_ be the last character on the line. If you add something after it (such as a comment) then the command will fail.

## Running a Shell Script

There are a few different ways we can run shell scripts.

The first is to run a shell program and pass the script as a parameter. This is what we did in the earlier example. Here's another example of how we could run the script we created:

```
bash ~/scripts/common.v1.sh
```

This is a perfectly valid technique. Now let's see the other ways we can run a script.

The next way we can run a script it is make it 'executable'. This means we change the file permissions of the script file, adding the 'executable bit'. This tells the systems we can run the file. We use the `chmod` (_change file mode_) command to do this:

```
chmod +x ~/scripts/common.v1.sh
```

If the `chmod` command looks unfamiliar then check the [Understanding Commands]({{< relref "/docs/part-2-core-skills/understanding-commands" >}}) chapter. Now that the file has been made executable, we can simply enter the path to the file and run it, as if it was any other command:

```
~/scripts/common.v1.sh
```

There is a problem with this approach though. How this file is executed is going to vary depending on how your system is set up[^3]. For example, if you are using Bash, then the script will run in a new instance of the Bash shell. However, if you are using the Z shell, then the script will most likely run in the `sh` program (and depending on your system, this program might just be a link to _another_ type of shell).

We want to avoid any ambiguity and be explicit about _what_ program should run our script. We can do this using a special construct called a _shebang_.

## Using Shebangs

A _shebang_ is a special set of symbols at the beginning of a file that tells the system what program should be used to run the file.

If we were to add a shebang to our `common.v1.sh` file, it would look like this:

```sh
#!/usr/bin/sh

# Write the title of our command.
echo "common commands:"

# Show the most commonly used commands.
tail ~/.bash_history -n 1000 | sort | uniq -c | sed 's/^ *//' | sort -n | tail -n 10
```

The shebang is the two characters - `#!`. The name 'shebang' comes from the names of the symbols. The first symbol is a 'sharp' symbol (sometimes it is called a hash, it depends a little on context). The second symbol is an exclamation point. In programming the exclamation point is sometimes called the 'bang' symbol. When we put the two together, we get 'sharp bang', which is shortened to 'shebang'.

Immediately after the shebang you write the full path to the program which should be used to open the file.

For example, if you wanted to write a script that is run in Python, you could do this:

```python
#!/usr/bin/python3

print('Hello from Python')
```

If we wanted to explicitly use the Bash shell to run a script, we might use a shebang like this:

```sh
#!/usr/bin/bash

echo "Hello from Bash"
```

What about Node.js? Easy!

```js
#!/usr/bin/node

console.log("Hello from Node.js");
```

### Shebangs - Dealing with Paths

When we use a shebang we need to provide the full path the executable that will be used to run the script.

For example, what if we want to use Ruby to run a script we could write a script like this:

```ruby
#!/usr/bin/ruby

puts 'Hello from Ruby'
```

But there is a problem here. This will only work if you have the Ruby program installed in the location specified after the shebang (i.e. `/usr/bin/ruby`). If you do not have the Ruby program in this location the script will fail to run.

How can we know where the user will have a specific program installed?

There is a common trick for dealing with this issue. We can use the `env` (_set environment and execute command_) command to run a command and it will work out the path for us.
 
The `env` command is often used to show environment variables, but you can also use it to execute an arbitrary command (often with a modified environment). One handy feature of the `env` command is that it looks through the `$PATH` variable to find the path of the command to execute.

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

Our `common.v1.sh` script (with the added shebang) looks like this:

```sh
#!/usr/bin/env sh

# Write the title of our command.
echo "common commands:"

# Show the most commonly used commands.
tail ~/.bash_history -n 1000 | sort | uniq -c | sed 's/^ *//' | sort -n | tail -n 10
```

If we have made the script executable with the `chmod` command, then we can run the script by simply typing the location of the script in the shell:

```
$ ~/scripts/common.v1.sh
common commands:
96 gpr
97 gcm
...
```

If we want to 'install' this script as a local command which we can run easily, we can create a _symbolic link_ to the shell script in our `/usr/local/bin` folder:

```
ln -s ~/scripts/common.v1.sh /usr/local/bin/common
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
- How comments work in shell scripts
- How to handle long lines with continuations
- How to run a shell script
- How to make a shell script executable
- How shebangs work
- How to use the `env` command to make our shebangs more portable
- How to 'install' scripts for the current user

In the next chapter we'll look at how to add logic to our shell scripts.

---

## Appendix - How the Script Works

This section briefly covers how the `common.v1.sh` script works. Assuming we have a history that looks like this:

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

First we sort, putting duplicate lines next to each other:

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

[^1]: The path to the shell history file is normally available in the `$HISTFILE` environment variable. However, in a non-interactive shell this variable is not set (and when we run a shell script, it is run in a non-interactive shell). We'll see more about interactive and non-interactive shells later, this is just a note in case you are wondering why we don't use the `$HISTFILE` variable or `history` command!
[^3]: Try putting the command `pstree -p $$` in a shell script and running the script - you'll see exactly what process is run.
[^4]: If you want to know more about these folders and the conventions behind them then check back soon, I am going to be adding an entire section on Linux Fundamentals, and one of the chapters will specifically be on the Linux Filesystem. This will cover 'The Linux Filesystem Hierarchy Standard' which defines how folders like this should be used.
