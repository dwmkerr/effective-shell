---
title: "Managing Remote Git Repositories and Sharing Your Dotfiles"
weight: 29
---

# Chapter 29 - Managing Remote Git Repositories and Sharing Your Dotfiles

In this chapter we'll take a look at how to take a local Git repository, like the one created in the previous chapter, and upload it to a remote repository.

We'll use the popular "GitHub" site to host our repository. We'll see how we can manage remote changes and use GitHub to share our dotfiles, so that we can quickly setup any machine with our personal configuration.

If you want to follow along with the code, install the samples and copy the 

# Git Remotes

So far all of the changes we have made are stored in a _local_ Git repository. The repository's files are stored on your local machine (in a folder named _.git_ in the location where you initialised the repository). A _remote_ is a repository that is on another machine.

The ability to move your changes to and from a remote is critical to make sure that your work is safe (you can retrieve it from the remote if your machine is lost) and to allow collaboration.

There are a number of services you can use that allow you to host both public repositories (which can be seen by anyone) and private repositories (which have more restricted access). Many organisations run their own Git hosting services or subscribe to enterprise providers.

To see how remotes work I will show how to create a repository using the popular _GitHub_ service. GitHub is free for individuals and is an extremely popular Git provider and online collaboration platform.

To create a remote, you will first need to sign-up for a GitHub account. When you have done that you will be offered the option to create a repository:

![Screenshot of the GitHub "What do you want to do first" page showing the "Create a repository" option](./images/github-what-do-you-want-to-do-first.png)

Choose the 'Create a repository' option. You will then be asked to provide a name for your repository. I'm going to use this repository to host my dotfiles, so I have chosen "dotfiles":

![Screenshot of the GitHub Create Repository page](./images/github-create-new-repository.png)

If you don't want members of the public to be able to see your repository, choose the 'private' option. If you already have a local repository then _don't_ check any of the boxes under "Initialise this repository with" - we want to create an empty repository which we will then 'push' our changes to.

Once you have chosen the "Create Repository" option you will be shown some commands that you can use to configure your local repository to point to this newly created remote repository:

[!Screenshot of the repository setup page](./images/github-repository-setup.png)

We already have a repository, so we will follow the instructions in the section "...or push an existing repository from the command line". Copy the commands (there is a button that copies the command text to the clipboard) and run them in your shell, from the _~/dotfiles_ folder:

```
$ git remote add origin https://github.com/dwmkerr-effective-shell/dotfiles.git
$ git branch -M main
$ git push -u origin main

Username for 'https://github.com': dwmkerr+effective-shell@gmail.com
Password for 'https://dwmkerr+effective-shell@gmail.com@github.com':
Enumerating objects: 39, done.
Counting objects: 100% (39/39), done.
Delta compression using up to 16 threads
Compressing objects: 100% (36/36), done.
Writing objects: 100% (39/39), 12.83 KiB | 1.83 MiB/s, done.
Total 39 (delta 7), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (7/7), done.
To https://github.com/dwmkerr-effective-shell/dotfiles.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

When you run the third command (the one that starts with `git push`) you will be asked for your username and password. Once you enter them your local changes will be 'pushed' to the remote repository.

{{< hint warning >}}
**Avoid Using Passwords**

To keep this example simple I have authenticated with a username and password. However, I would strongly recommend that as soon as possible you set up an SSH key to authenticate with GitHub. SSH keys are far more secure than usernames and passwords.

GitHub have an excellent guide on how to setup SSH keys at:

https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh

I also describe how to setup SSH keys in the chapter [The Secure Shell]({{< relref "/docs/work-in-progress" >}}).
{{< /hint >}}

Let's look at each command in detail.

- `git remote add origin https://github.com/dwmkerr-effective-shell/dotfiles.git` first we tell Git that we would like to add a new 'remote' called _origin_ and we provide its address. The remote in this case is the repository we created in GitHub.
- `git branch -M main` now we rename our current branch to _main_ - because our current branch is already called _main_ this shows no output as nothing has changed.
- `git push -u origin main` finally, we 'push' our _main_ branch to the _remote_ named _origin_. The `-u` flag is used to track changes - we'll see what this means shortly.

At this stage if you refresh your browser you'll see your _dotfiles_ repository, with all of our changes we've made so far!

![Screenshot showing the initial view of the Dotfiles repository](./images/github-dotfiles-initial-view.png)

Each of the files and folders we have created is shown, we can view any of the files, look at the commit history, see the log messages and more.

Before you make too many changes, we'll cover three important commands you need to be aware of when working with remotes - `git push`, `git fetch` and `git pull`.

## The Git Push Command and Remotes

We've already used the `git push` command once. This command pushes the changes we have made locally to a remote. It is a common convention to call the primary remote that you work with _origin_ - but you can use any name you want. You can also have multiple remotes. For example, you could sign up with _GitLab_, another Git services provider, create a repository with their service and add that as a remote and call it _gitlab_.

You can show your remotes with the `git remote` (_managed remote repositories_) command<!--index-->. If we run the command with the `-v` (_verbose_) parameter each remote will be shown, along with the address used when we push changes, as well as the address used when we 'fetch' changes (which we'll look at next):

```
$ git remote -v
origin  https://github.com/dwmkerr-effective-shell/dotfiles.git (fetch)
origin  https://github.com/dwmkerr-effective-shell/dotfiles.git (push)
```

The command we used to push our changes was:

```
$ git push -u origin main
```

The `-u` (_set upstream_) option tells Git that we want to associate our local _main_ branch with the remote _main_ branch. This means that we don't need to specify the remote name for each subsequent `git push` command - Git knows that our 'upstream' branch that we push to is called _main_ and is in the _origin_ remote.

## The Git Fetch Command

The `git fetch` (_get remote changes_) command<!--index--> downloads all of the information about the changes that have been made to the remote.

This command does _not_ download the actual changes to your working tree! All it does is download the information about the changes. To see what I mean, let's run the fetch command:

```
$ git fetch
```

There will be no output - the remote has not changed. Let's make a change to the remote so we can see how fetch works. Open the repository in the GitHub website. There's a message saying that we should add a 'README' file:

![Screenshot showing the 'create readme' file instructions](./images/github-dotfiles-initial-view.png)

Press the "Add a README" button and add a description of your project. By convention, the file named `README.md` in a repository is shown on the home page of the project online and typically should include instructions on how to use the repository. This is a plain text file, you can use a plain text styling language called "Markdown" to show headings, bullets, code samples and so on (search for "GitHub Flavored Markdown" to find out about the syntax):

![Screenshot of the README.md file content](./images/github-add-readme-contents.png)

Once you are happy with the content (you can choose 'Preview' to see how it will look) scroll down to the "Commit" button. Provide a commit message:

![Screenshot of the GitHub README commit page](./images/github-readme-commit.png)

Once you have pressed "Commit New File" you will be taken back to the repository page. The contents of the _README.md_ file will be shown:

![Screenshot of the dotfiles repository homepage](./images/github-dotfiles-repository-with-readme.png)

We have now created a commit on the _origin_ remote. Now when we run `git fetch` we will see that the remote has changed:

```
$ git fetch
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), 962 bytes | 240.00 KiB/s, done.
From https://github.com/dwmkerr-effective-shell/dotfiles
   2532277..4a28994  main       -> origin/main
```

When we run `git fetch`, Git looks at the _upstream_ associated with the current branch and checks to see if there are any changes. The information about any changes is downloaded - but the changes themselves are not yet downloaded. If you run `git log` you will _not_ see the new commit that includes the _README.md_ file - we have not moved to this commit.

At the moment, our repository looks like this:

![Diagram of our local main and upstream main branch](./images/git-local-and-upstream-main-branch.png)

- The local branch HEAD is exactly where it was before we ran `git fetch`
- Because we have run `git fetch`, Git knows that our _upstream_ has changed - in fact it even told us what the changes are, the message includes the text `2532277..4a28994  main       -> origin/main` which means 'new commits from `2532277` to `4a28994` have been fetched for `main` which tracks `origin/main`

To actually download this (and any other) new commit we will need to run the `git pull` command.

## The Git Pull Command

The `git pull` (_download from remote_) command<!--index--> integrates the changes from a remote into the current branch. Because we've already told Git what the 'upstream' for the _main_ branch is, we can just run the `git pull` command to move to the latest commit:

```
$ git pull
Updating 2532277..4a28994
Fast-forward
 README.md | 13 +++++++++++++
 1 file changed, 13 insertions(+)
 create mode 100644 README.md
```

The `git pull` command tells us what commit we have moved from and to, and gives a summary of the files that have changed. We can see that a file named `README` has been created - if you look at your local files you'll see _README.md_ is now present:

```
$ ls
README.md  install.sh  shell.d  shell.sh
```

Finally, if we run `git log --graph --oneline` we can see that our _HEAD_ is at the tip of the `main` branch, and that this is also the tip of the `origin` remote's _main_ branch:

```
$ git log --graph --oneline
* 4a28994 (HEAD -> main, origin/main) add a simple 'README' file
*   2532277 Merge branch 'glog_alias'
|\
| * a8cbb15 (glog_alias) add the 'glog' alias
* | 31548e4 add the 'glog' alias
|/
*   138b404 Merge branch 'more_aliases'
|\
| * a51ae1a (more_aliases) add a file to store 'zsh' aliases
| * 63ea74f add a file to store 'bash' aliases
* | a95bd90 add the 'gm' alias for 'git merge'
|/
* b9ae0ad (aliases) add alias 'gcm' for 'git checkout main'
* f61369d (more_changes) add alias 'gs' for 'git status'
* d7e1bb9 add the 'shell.d' folder
* 01e7a10 add the 'install' and 'shell' scripts
```

Congratulations - you have now created a local repository, staged and unstaged changes to and from the index, created commits, created branches, handled merging and merge conflicts and even learnt how to setup a remote and push and pull changes from it!

# Scratching the Surface

We have only seen the absolute basics of Git in this chapter. Git is an amazingly powerful tool, I cannot recommend enough that you take the time to really learn how the commands work.

Many users will use a graphical tool to work with Git - this is perfectly fine if it works for you. But to be an _effective shell_ user you should really spend the time getting familiar with the core Git commands using the command-line.

Git can sometimes seem overwhelming to people and has a reputation for being complex. This is a somewhat unfair reputation - version control of files is itself an inherently complex topic. No matter what tool you use, there will always be the challenges of managing changes across environments, dealing with conflicts, integrating work and so on. The basic Git functionality is _incredibly_ good at making 99% of this work simple and straightforward, and Git gives you the tools to make the other 1% at least manageable.

Spend some time getting familiar with the core Git commands that we have introduced in this chapter. As you find yourself becoming more familiar, here are the next set of topics I would recommend learning about:

- TODO

# Tips for working with Git and GitHub

# The git branch in the PS1

# An Overview of the Git Commands

TODO

- Git clean -df 
- Avoid long lived branches
- Pull the main branch into your branch regularly
- Remember that squashing causes history issues
- Use Checkout to explore
- Don't forget to fetch
- Submodules

TODO: decide how/where to share the repo version of the code

# Advanced

Merge strategies
Diffs
Logs
Head (`git checkout HEAD~1` twice - see what happens)
- Consider a topic on 'advanced' git that goes into interactive patch, aliases, etc
- Consider splitting this topic into two
- Add 'the secure shell' to the 'advanced' part, note that the skills are not advanced but the virtual machine setup can be

todo: we are already using _getting to grips_ for the `grep` chapter, so we need a better name
todo: gitignore

# Summary

Manual pages:

- `man git-init`
- `man git-status`
- `man git-add`
- `man git-reset`
- `man git-commit`
