---
title: Moving Around
slug: moving-around
weight: 4
---

# Moving Around

You might already spend a lot of time in the shell, running various command line programs or using tooling for development projects or operational tasks. But you might also still switch back to a more visual paradigm for working with files, directories and resources.

Being able to perform everyday file and folder manipulation tasks directly from the shell can really speed up your workflow. Let's look at some common tasks and see how we can work with them in the shell. Along the way we'll also introduce some of the most frequently used tools and commands to work with the filesystem.

## Where Am I?

The first command to become familiar with is `pwd` ('print working directory'). This command will echo the current absolute path. You can also use the `$PWD` environment variable:

```sh
$ pwd
/Users/dave/repos/github/dwmkerr/effective-shell

$ echo $PWD
/Users/dave/repos/github/dwmkerr/effective-shell
```

Depending on your shell, or your command-line setup (which we will discuss in a later chapter), you might also see your working directly on the command-line.

## Changing Directory

Most likely one of the most familiar commands out there, the `cd` or `chdir` function changes the current directory:

```sh
$ pwd
/Users/dave/repos/github/dwmkerr/effective-shell

$ cd

$ pwd
/users/dave

$ cd -
~/repos/github/dwmkerr/effective-shell

$ pwd
/Users/dave/repos/github/dwmkerr/effective-shell

$ cd ~

$ pwd
/users/dave

```

Here we can see that running `cd` with no parameters moves to the users 'home' directory. This directory is always available in the `$HOME` environment variable.

Running `cd -` will switch _back_ to the previous directory — this is very useful if you want to quickly jump somewhere and then back again.

You can use `~` as an alias for the home directory, allowing you to quickly move to personal folders, with commands such as `cd ~/Downloads`.

Most commonly, you will specify a path when changing directory. This can be a fully qualified path, or it can be a relative path:

```sh
$ cd /dev

$ cd ~/repos

$ cd ./github
```

You can use the special link `..`, which is a folder that points to the _parent_ directory to move 'upwards':

```sh
$ pwd
/Users/dave/repos/github/dwmkerr/effective-shell

$ cd ../../

$ pwd
/Users/dave/repos/github
```

## Exploring a Directory

Once we are in a directory, we will often want to see the contents. The `ls` ("list directory contents") command is useful here:

```sh
$ pwd
/Users/dave/repos/github/dwmkerr/effective-shell

$ ls
1-navigating-the-command-line LICENSE
2-clipboard-gymnastics        README.md
3-getting-help                sed.1
4-moving-around
```

By default, the `ls` command will list the files and directories. We can show more information with the `-l` ("long format") flag:

```sh
$ ls -l
total 48
drwxr-xr-x  6 dave  staff    192 Mar  5 16:01 1-navigating-the-command-line
drwxr-xr-x  5 dave  staff    160 Oct 10  2017 2-clipboard-gymnastics
drwxr-xr-x  4 dave  staff    128 Dec 19  2017 3-getting-help
drwxr-xr-x  3 dave  staff     96 Mar  7 15:39 4-moving-around
-rw-r--r--  1 dave  staff   1066 Jun 10  2017 LICENSE
-rw-r--r--  1 dave  staff    561 Mar  7 15:30 README.md
-rw-r--r--  1 dave  staff  15707 Mar  5 16:01 sed.1
```

Now we can see the permissions, the link count (which is rarely particularly useful and varies from platform to platform), the owner, the group, the size and the modification date (as well as the name).

We can make the sizes more human readable, and sort by size with a few more flags `-h` ("human readable") and `-s` ("sort by size"):

```sh
$ ls -lhS
total 48
-rw-r--r--  1 dave  staff    15K Mar  5 16:01 sed.1
-rw-r--r--  1 dave  staff   1.0K Jun 10  2017 LICENSE
-rw-r--r--  1 dave  staff   561B Mar  7 15:30 README.md
drwxr-xr-x  6 dave  staff   192B Mar  5 16:01 1-navigating-the-command-line
drwxr-xr-x  5 dave  staff   160B Oct 10  2017 2-clipboard-gymnastics
drwxr-xr-x  4 dave  staff   128B Dec 19  2017 3-getting-help
drwxr-xr-x  3 dave  staff    96B Mar  7 15:39 4-moving-around
```

There are *lot* of options for `ls`. Check the chapter [Getting Help](https://www.dwmkerr.com/effective-shell-part-3-getting-hepl/) for some tips on how to get more information on a command!

## Managing the Directory Stack

You might find that you want to move to a number of directories, then return to where you started. This can be particularly useful when scripting. You can use the `pushd` ("push onto directory stack") and `popd` ("pop from directory stack") commands to add or remove directories from the stack:

```sh
$ pwd
/Users/dave/repos/github/dwmkerr/effective-shell

# OK - I'm writing my article at the moment, but want to check my downloads, and come back shortly...
# Move to the downloads folder...

$ ls
aws-nuke-v2.8.0-darwin-amd64

# OK cool - the tool I was downloading has arrived, let's use it...
cd aws-nuke-v2.8.0-darwin-amd64
./aws-nuke

# Now I want to go back to my article...
$ popd
~/Downloads ~/repos/github/dwmkerr/effective-shell

~/Downloads
$ popd
~/repos/github/dwmkerr/effective-shell
```

In this case, using `cd -` would not be sufficient — that would just switch us from the `aws-nuke` folder to `Downloads` and back again. But by using the _directory stack_ we can save where we are, move, and then 'pop' our way back to where we started.

## Auto-Completion

Pressing `tab` when using commands like `cd` will generally show an auto-completion menu:

```sh
$ cd ~/repos/       # press 'tab' now...
github/   gitlab/   local/    scratch/
```

Pressing tab again will cycle through options, and shift-tab will cycle backwards. Enter will select an option, escape (or Ctrl-C) will cancel.

Some shells, such as `zsh`, support even more advanced auto-completion. For example, we can auto-complete to fill in partially specified directory names:

```sh
% cd ~/r/g/d/e    # press tab now...

% cd ~/repos/github/dwmkerr/effective-
effective-container-engineering/  effective-shell/
```

Auto-completion is generally _very_ shell specific. We'll look more into the different shells that are available in later chapters. But in general, if you are uncertain, pressing tab will often show a sensible set of options.


## That's It!

This is a small chapter, but an important one. Later on, as we start to do more file and system manipulation from the shell, moving and copying files and so on, we will build on these concepts. But it is critical to first know the basics of how to move around the filesystem with the shell.
