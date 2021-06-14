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

```sh
git init
git checkout -b main
```

You can also upgrade the version of Git installed on your machine to a more recent version. The meanings of these commands will be explained throughout the chapter.
{{< /hint >}}

# Adding and Resetting Changes to the Index

We now have an empty Git repository. We can use the `git status` (_show the working tree status_) command<!--index--> to show some information on the files in the folder:

```
$ git status
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        install.sh
        shell.d/
        shell.sh

nothing added to commit but untracked files present (use "git add" to track)
```

The first thing that `git status` tells us is the name of the _branch_ we are on. We'll look at branches in detail shortly. The next thing we see is that there are no _commits_ - we'll see these next. Finally, git is telling us that there are three files that are 'untracked'. These are the _install.sh_ and _shell.sh_ files as well as the _shell.d_ folder.

If we are going to use Git to track changes to these file, we need to add them to the repository. We can do that with the _git add_ (_add file contents to index_) command<!--index-->:

```
$ git add .
```

The `git add` command takes a list of file paths. We have used the special _dot_ folder to represent the entire current directory. Let's take a look at the status again:

```
$ git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   install.sh
        new file:   shell.d/set_ps1.sh
        new file:   shell.sh
```

Git is now telling us that we have three new files which are ready to be _committed_. At the moment these files are 'staged' in the 'index'. The index, or staging area, is the set of changes that we are preparing to commit. We could add more files to the index before we actually save them to the repository in a commit.

If we were to visualise what we've done so far, it would look like this:

![Diagram: A diagram showing how the 'git add' command tells Git to track changes to items in the working tree and adds them to the index](./images/git-add.png)

Our _working tree_ is the folder associated with our Git repository, this is the _~/dotfiles_ folder. Our _index_ is initially empty. When we run the `git add` command, we have told Git we want to add three files to the repository. Our 'staging area' has three files in it.

What if we realised that we don't want to add one of these files just yet? To remove a file from the index we can use the `git reset` (_reset changes_) command. Let's reset the _~/dotfiles/shell.d/set_ps1.sh_ file and check the status:

```
$ git reset shell.d/set_ps1.sh
$ git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   install.sh
        new file:   shell.sh

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        shell.d/
```

The `git reset` command has reset the change we made to the index - telling Git that we don't want to 'stage' one of the files. Git now tells us there are two files in the index and one that is not tracked.

Here's how we can visualise the changes we've made:

![Diagram: The 'git reset' command removes items from the index](./images/git-reset.png)

You can also reset changes by using the `git rm --cached` (_remove changes from index_) command. However, I think this is a little harder to work with as you have to remember to use the `--cached` flag to tell Git that you are removing from the index and not the repository. We'll see the `git rm` command a little later in the chapter.

Remember - at this stage we have not changed a single file! Nothing we have done has changed the content of any of the files in the working tree, and the only thing that has changed in the Git repository is the 'index' - the current set of files that we are 'staging'.

Now let's look at how we can commit our changes with the `git commit` command.

# Committing Changes

Once we are happy with the set of changes in the index, we can use the `git commit` (_record changes to the repository_) command<!--index-->.

When you run the `git commit` command, your shell editor will open up:

```
$ git commit 


  GNU nano 2.0.6 File: ...tfiles/.git/COMMIT_EDITMSG
add the 'install' and shell' scripts

# Please enter the commit message for your changes. Lines star$
# with '#' will be ignored, and an empty message aborts the co$
#
# On branch main
#
# Initial commit
#
# Changes to be committed:
#       new file:   install.sh
#       new file:   shell.sh
#
# Untracked files:
#       shell.d/
#
                       [ Read 15 lines ]
^G Get Hel^O WriteOu^R Read Fi^Y Prev Pa^K Cut Tex^C Cur Pos
^X Exit   ^J Justify^W Where I^V Next Pa^U UnCut T^T To Spell
```

The reason you shell editor opens is that the `git commit` command would like you to provide a message describing your changes. Type a short description - in the example above I have used the text _add the 'install' and 'shell' scripts_.

Note that below the cursor there is some information that starts with the `#` hash symbol. This is provided as a convenience - Git is telling you the status of the index.

Save the file by pressing Ctrl+W and close the editor with Ctrl+X (these are the commands for the `nano` editor, if you are using a different editor use whatever commands are needed to save and close).

When the editor closes you'll see a confirmation below the `git commit` command:

```
$ git commit
[main (root-commit) 01e7a10] add the 'install' and 'shell' scripts
 2 files changed, 90 insertions(+)
 create mode 100755 install.sh
 create mode 100644 shell.sh
```

This message tells us that two files have changed and 90 lines have been added. It also lists the files we have added. At this point we have created our first commit. We can visualise the process we have gone through like this:

![Diagram showing how 'git commit' commits changes to the repository](./images/git-commit.png)

We 'staged' a set of changes and then 'committed' these changes. We now have a single commit in our repository. Our files are _still_ unchanged, but our Git repository now has a single commit in it that tracks the two files we added.

Let's run `git status` again:

```
$ git status
On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        shell.d/

nothing added to commit but untracked files present (use "git add" to track)
```

The `git status` command tells us we're still on the 'main' branch, and that there is one file which is not tracked. Let's create a second commit by adding this file. When you run the `git commit` command below, enter a message to describe the commit:

```
$ git add .
$ git commit
[main d7e1bb9] add the 'shell.d' folder
 1 file changed, 228 insertions(+)
 create mode 100644 shell.d/set_ps1.sh
```

We have now created a second commit - our timeline will look like this:

![Diagram showing our second git commit](./images/git-commit-number-2.png)

If we run the `git status` command one last time we will see that everything in the working tree is tracked in Git:

```
$ git status
On branch main
nothing to commit, working tree clean
```

The concepts of the 'index', the 'working tree' and the Git repository itself can take a bit of getting used to! If you have not used Git before and this seems like a lot to take on board, don't worry, people often find Git quite hard at first. As you use it more this will all become familiar and make more sense.

Now let's take a look at how we can work on changes to our files with _branches_.

# Creating Branches

The commits that we have made so far have been on a 'branch' named 'main'. We can create new 'branches' and put commits on them to allow us to make a series of changes that are isolated from each other.

We can create branches using the `git branch` (_list, create or delete branches_) or `git checkout` (_switch branches or restore working tree_) command<!--index-->. To show these features in action, we'll create a new branch called _aliases_ and add some files to it:

```
$ git checkout -b aliases
Switched to a new branch 'aliases'
$ git status
On branch aliases
nothing to commit, working tree clean
```

We have used the `git checkout` command to 'switch' to another branch. The `-b` (_new branch_) option tells Git that we want to create a new branch. The `git status` command now shows the new branch name when we run it.

Let's create a new file which includes an alias for the `git status` command, then let's see what `git status` tells us about the status of the working tree:

```
$ echo 'alias gs="git status"' >> ./shell.d/git_aliases.sh
$ git status
On branch aliases
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        shell.d/git_aliases.sh

nothing added to commit but untracked files present (use "git add" to track)
```

Excellent - we have a new file and Git knows that it is not currently tracked. Let's stage this file and then commit it:

```
$ git add .
$ git commit -m "add alias 'gs' for 'git status'"

[aliases f61369d] add alias 'gs' for 'git status'
 1 file changed, 1 insertion(+)
 create mode 100644 shell.d/git_aliases.sh
```

In the example above I used the `-m` (_commit message_) parameter for the `git commit` command.

We now have a series of commits that looks like this:

![Diagram showing how 'git checkout -b' creates a new branch](./images/git-checkout-b.png)

Our new _~/dotfiles/shell.d/git_aliases.sh_ file has been committed to the _aliases_ branch.

We can switch back to the _main_ branch at any time with `git checkout`:

```
$ git checkout main
Switched to branch 'main'
$ tree
.
├── install.sh
├── shell.d
│   └── set_ps1.sh
└── shell.sh
```

This is very cool - by passing the name of the branch we want to switch to as the parameter to the `git checkout` command we can switch branches. If we are on the _main_ branch we don't see the _git_aliases.sh_ file, because the commit that added is was not on the _main_ branch. To go back to the _aliases_ branch we can just checkout again:

```
$ git checkout aliases
Switched to branch 'aliases'
$ tree
.
├── install.sh
├── shell.d
│   ├── git_aliases.sh
│   └── set_ps1.sh
└── shell.sh
```

As a nice little tip, you can always go back to the _last_ branch you were on by running `git checkout -` - this is just like using `cd -` to change to the last directory you visited!

Let's add another alias to the file and create another commit:

```
$ echo 'alias gcm="git checkout main"' >> ./shell.d/git_aliases.sh
$ git add .
$ git commit -m "add alias 'gcm' for 'git checkout main'"
[aliases b9ae0ad] add alias 'gcm' for 'git checkout main'
 1 file changed, 1 insertion(+)
```

Our branches will now look like this:

![Diagram showing two commits on the 'aliases' branch](./images/git-commit-on-aliases.png)

You can create as many branches as you like - just remember that when you run `git checkout -b`, you branch from the _current_ branch (and in fact, the current _HEAD_, which we will see a little later).

If you want to create a branch, but don't want to switch to it, you can run `git branch <new_branch_name>`. This command will create a branch from your current position, but will not move to it.

# Merging

# Checkout Tricks

# Handling Deletes and Renames

# Resetting

# Checkout

# Pushing to a Remote

# Fetching

# Pulling

# Advanced

Merge strategies
Diffs
Logs
Head (`git checkout HEAD~1` twice - see what happens)






# Summary

Manual pages:

- `man git-init`
- `man git-status`
- `man git-add`
- `man git-reset`
- `man git-commit`

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
