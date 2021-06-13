---
title: "Getting to Grips with Git and Sharing Your Dotfiles"
weight: 28
---

# Chapter 28 - Getting to Grips with Git and Sharing Your Dotfiles

Git is an extremely popular and very powerful version control tool. You can use Git to track changes to text, code, or any type of files you might be working with. Many popular projects use Git as a tool to manage changes to their projects over time, allow others to contribute and collaborate, and to publish their projects.

In this chapter we'll look at the most common operations for Git, and how to use things like interactive commands to allow us to quickly and easily work with Git repositories. We'll learn Git on the command line by taking our 'dotfiles' folder and showing how we can track and manage changes.

Being able to use Git from the command line can be a hugely powerful technique to help you be an effective shell user.

# What is Git

Any files or folders that we work with over time, such as our 'dotfiles' (i.e. our personal configuration files) will change. Sometimes new files get added, old files get deleted, files get changed, things get moved around and so on.

Git is a _version control system_ that allows you to track changes to files and folders. This means that you can maintain a history of all of the changes that have been made, when they were made, who made them and why. You can also maintain multiple 'branches' of your files and folders - these branches can be used as working environments where you can make changes, without affecting the current 'main' set of files.

Git was written by Linus Torvalds (the creator of Linux) in 2006. "Git" is slang for an annoying person - Linus joked that he always names projects after himself, first Linux and now Git. There were many version control systems around before Git, such as _CVS_ (Concurrent Version System) and _SVN_ (Subversion, an system similar to CVS but with some improvements). There were also a number of proprietary and commercial solutions. However, in recent years Git has become without a doubt the most popular version control system globally, and many highly popular software collaboration systems such as GitHub, GitLab and BitBucket use Git as their underlying version control system, adding additional features on top.

# Creating a Git Repository

All of the information about a set of files or folders that you are tracking the changes for is stored in a _Git repository_. We can create a Git repository by running the _git init_ (_initialise Git repository_)<!--index--> command.

Let's see this in action be creating a Git repository to track changes to our 'dotfiles' folder. To get this folder first make sure you have installed the samples.

{{< hint info >}}
**Downloading the Samples**

Run the following command in your shell to download the samples:

```sh
curl effective.sh | sh
```
{{< /hint >}}

If you have installed the samples, you can copy the _~/effective-shell/dotfiles_ folder to your home directory - this is where we will create our Git repository and start using the Git commands:

```
$ cp -r ~/effective-shell/dotfiles ~/dotfiles
$ cd ~/dotfiles
```

We have created the _~/dotfiles_ folder in our home directory from the samples and moved into it.

We're now going to use the `git init` (_initialise a Git repository_) command<!--index--> with the `-b` (_branch name_) flag to initialise a new Git repository:

```sh
$ git init -b main
Initialized empty Git repository in /home/dwmkerr/dotfiles/.git/
```

If you get an error check the box below.

{{< hint danger >}}
**Error 'unknown switch 'b'**

If you see the error message _error: unknown switch 'b'_ then this means that you are using a version of Git that does not have the `-b` (_initial branch name_) flag (any version of Git lower than 2.2).

We can get around this by initialising the repository and then setting the branch name afterwards with the `git checkout -b` command:

```
git init
git checkout -b main
```

You can also upgrade the version of Git installed on your machine to a more recent version. The meanings of these commands will be explained throughout the chapter.
{{< /hint >}}

# Summary

Manual pages:

- `man git-init`

## Structure

- Initialising a repository in the `dotfiles` folder
- The main branch
- Creating a commit
- Creating a branch
- Merging a branch
- Uploading to GitHub
- Creating a Pull Request
- Fetching changes
- Showing the log
