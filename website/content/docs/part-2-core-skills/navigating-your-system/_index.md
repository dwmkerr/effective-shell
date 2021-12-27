---
title: "Navigating Your System"
slug: "navigating-your-system"
weight: 2
---

# Chapter 5 - Navigating Your System

Perhaps the easiest way to start to understand how to use the shell is to learn how actions within it might correspond to those done with a graphical interface. 

## The Working Directory

When we open a folder in a graphical user interface, we are always viewing the contents of a folder, or *directory.* 
In the shell, the same applies - we are always sitting in a specific directory.
We can tell the shell to print the current working directory with the `pwd` command.

You should see something like this:

<a href="images/pwd.png"><img alt="Screenshot: pwd" src="images/pwd.png" width="800px" /></a>

## Listing the Contents of the Working Directory

In the graphical user interface, we can see all files and folders in the current directory. 
In the shell, we don't see this content, but we can tell the shell to print it with the `ls` command.  

It'll look something like this:

<a href="images/ls.png"><img alt="Screenshot: ls" src="images/ls.png" width="800px" /></a>


The `ls` command _lists_ the contents of a given directory.  By default, it prints the files and directories of the shell's current directory.

## Changing the Directory

In a graphical user interface, you move to a different directory by clicking on it.
In the shell, we run the `cd` command:

```sh
cd Pictures
ls 
```

On my system, we'll see the following output:

<a href="images/cd-pictures.png"><img alt="Screenshot: cd-pictures" src="images/cd-pictures.png" width="800px" /></a>

_cd_ stands for _Change Directory._ You might see a pattern here - shell commands often are very short (to make it easier to type them quickly) and are often made up of the first letters of the description of the command (`pwd` for _Print Working Directory_, `cd` for _Change Directory_, etc).

Now that you know what the `cd` command does, you should be able to move around to different folders. 



# Understanding Paths

In Linux, Windows and MacOS (and most other operating systems), _paths_ are the "addresses" of files or folders.
There are two types of paths, _absolute_ and _relative_. 
An absolute path is one which gives the exact location of a file. 
On Windows, absolute paths start with a drive letter.
On Linux-like operating systems, absolute paths start with a slash, `/`. 

For example, on my computer, the absolute path to the folder I am writing this book in is:

```
/Users/dwmkerr/repos/github/dwmkerr/effective-shell
```

The `/` is the _root_ of the file system&mdash; basically, it's the folder which _everything_ else lives in.

If I have an absolute path, I know _exactly_ where the file or folder is. Let's compare this to a _relative path_. Below is the _relative path_ in my shell for the file I'm writing right now:

```
website/content/docs/part-1-getting-started
```

Since this path does not begin with a slash, it is taken
relative to the shell's current working directory. 
This means that this path only makes sense if you use it from a specific directory. 

If I am in my `Pictures` folder, and I want to move to the `2020-photos` folder, I could do it in two ways. 
The first is with an absolute path:

```sh
cd /Users/dwmkerr/Pictures/2020-photos
```

The second is with a relative path:

```sh
cd 2020-photos
```

When navigating the filesystem, you will typically use relative paths.

# The Special Dot and Dot Dot Folders

As you experiment with these commands, you might have noticed that  every folder contains two other folders, one with the name `.` and one with the name `..`. Run `ls -al` on the `pictures` folder to see an example:

```sh
ls -a 
```

You should see something like this:

<a href="images/ls-a.png"><img alt="Screenshot: ls-a" src="images/ls-a.png" width="800px" /></a>

This picture highlights two special folders - `.` and `..`. These special folders exist in _every_ folder in the system.

The first folder, `.`, represents the folder it is in. Why would this be useful? Well, sometimes we just want a quick way to say the equivalent of "right here" in a command. For example, if I wanted to copy the current folder to a backup folder, I could do this:

```sh
cp . /backup
```

The `cp` command is the _Copy_ command, and we'll see it in a later chapter. But the key thing to note is that we can use `.` to tell the command to copy the folder we are in right now.

The `..` folder means _the parent folder_. You can use this to "go up" the directory tree. For example:

```sh
cd ..
ls 
```

Would give:

<a href="images/cd-dot-dot.png"><img alt="Screenshot: cd dot dot" src="images/cd-dot-dot.png" width="800px" /></a>

Here we've used `cd ..` to _change directory to the parent folder_ then `ls` to _list the contents of the current folder_. We could also have used `ls .` to specify the current directory.

The `..` folder can also be helpful if you want to navigate to a location which is outside of your current folder. For example, if I am in the `playground/pictures` folder and I want to move to the `playground/scripts` folder, I can just use:

```sh
cd ../scripts
```

And we'll see this:

<a href="images/cd-scripts.png"><img alt="Screenshot: cd dot dot scripts" src="images/cd-scripts.png" width="800px" /></a>

# The Home Directory

There is one more special part of the file system we have to know about. That is the _Home Directory_. In Linux-like systems every user has their own personal directory where they can keep their files and folders.

This directory can always be accessed through the `~` character.
Technically, the shell expands (replaces) the tilde character with 
the value of `HOME` environment variable, but that isn't important now.
For example, no matter where I am in the system, I can run the following command to move to my home directory:

```sh
cd ~
```

This would show something like this:

<a href="images/cd-home.png"><img alt="Screenshot: cd home" src="images/cd-home.png" width="800px" /></a>

This makes moving around your home directory very easy. 
For example, to go to your `Pictures` folder from anywhere, you can always just run:

```sh
cd ~/Pictures
```

Your home directory on most computers will be where you keep your documents, pictures, videos and so on. 
This directory is _not accessible_ to other users of the system: Each user in a system gets their own home directory.

One useful trick: Running `cd` without any parameters will always take you home! So to go home, just run:

```sh
cd
```

<a href="images/cd-no-args.png"><img alt="Screenshot: cd no-args" src="images/cd-no-args.png" width="800px" /></a>

# Summary

In this chapter we introduced the following:

- The `pwd` (_print working directory_) command shows the current working directory
- The `ls` (_list_) command shows the contents of the current directory or a given directory
- The `cd` (_change directory_) changes the current working directory
- Absolute paths specify the exact location of a file or folder
- ...Relative paths are relative to the current working directory
- The `.` special folder means "this folder"
- The `..` special folder means "the parent folder"
- The shell expands `~` to the current user's home directory
- You can run `cd` at any time to quickly go to your home directory
