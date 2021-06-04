---
title: "Configuring the Shell"
weight: 24
---

There are a number of different ways to configure your shell, and some options which can change how it operates. In this chapter we'll take a look at the different configuration files for the shell and how they work, and how you can change your shell configuration. We'll also see some of the shell options available which can change how the shell works.

# The Shell Configuration File

There are a number of different files that the shell uses for configuration, and we're going to see all of them in this chapter. However, the file we will use most often is the _~/.bashrc_ file.

When you log into a machine using the shell, or start a shell program in a terminal emulator like the Gnome Terminal or Konsole, you are running an _interactive shell_. An interactive shell is one that is connected to your keyboard and screen. We're going to see interactive shells in detail as we go through this chapter.

When an interactive shell starts, one of the operations it performs is to run all of the commands in the file _~/.bashrc_. This is one of the 'shell startup' files.

The 'RC' in the file name stands for 'run commands' (sometimes people will also use 'run configuration'). This is a convention from the early days of Unix. Many tools on Unix and Linux have files that end in 'rc' which are loaded when a program starts up. For example, the _~/.vimrc_ run commands file is loaded by the `vim` program when it starts.

The _~/.bashrc_ file is in your home directory - this means that it is your personal Bash configuration file. There is also a file that is normally at _/etc/bash.bashrc_ that is used to configure Bash for all users.

Again - this is a common convention for Unix and Linux systems - there is a 'global' configuration file that is used for all users, as well as a 'user' configuration file in the user's home directory that the user can edit to personalise things for themselves.

{{< hint info >}}
**Z-Shell**
The `zsh` shell uses a _~/.zshrc_ file for per-user configuration and _/etc/zsh/zshrc_ for global configuration. The paths are different but the concepts are the same. Other shells may use different paths as well - you should be able to find the paths in their documentation.
{{< /hint >}}

## The Default Configuration File

Different operating systems have different commands set by default in their shell configuration files, but there will be a lot of similarities.

Let's take a look at some of the commands that are in the _~/.bashrc_ on a clean Ubuntu 20 installation (if you want to know how to set up a free Ubuntu 20 machine check [Appendix - Setting Up a Linux Virtual Machine]({{< relref "/docs/work-in-progress" >}}).

I've omitted parts of the file in the snippet below, we'll focus on some of the most interesting areas.

```sh
# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000
HISTFILESIZE=2000

# ...

# some more ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

# ...
```

The first section of the script checks the current shell parameters (which are stored in the special `$-` variable) to see whether the `i` (_interactive_) parameter is present. If it is not present, the `return` command runs.

It's very important to understand that this file is _sourced_ by the shell - so we have to use `return` if we want to stop processing it. If we used `exit` instead then the shell would close, which is definitely not what we want!

The next section of the file sets up some of the configuration for the history features of the shell. Some variables are set, such as `HISTSIZE` (the number of commands to store in the history), we also set some options using the `shopt` (_set shell option_ flag).

Later on, we can see that some aliases are defined, for user convenience. For example, the `la` alias is a shorthand for `ls -A`, which can save a few keystrokes.

This exactly the sort of configuration that makes sense to keep in the _~/.bashrc_ file. Users can modify this to suit their preferences.

Now let's look at some of the common features you might configure in the _~/.bashrc_ file.

## Common Shell Configurations

You can add any commands you like to the _~/.bashrc_ file, these commands will be run when the shell starts up.

Let's see a few examples of what you might add to your _~/.bashrc_.

### Aliases

If you find yourself typing the same series of keystrokes again and again, you might want to add some aliases to your configuration file:

```sh
# Start a web server
alias serve="python3 -m SimpleHTTPServer 3000"

# Open vim without loading the vimrc.
alias vimnilla='vi -u NONE'

# Shortcut for 'kubectl', saves a lot of time!
alias k='kubectl'

# Quickly go to my GitHub repositories.
alias gocode='cd ~/repos/github/dwmkerr'
```

If you are not familiar with aliases, check [Chapter 10 - Understanding Commands]({{< relref "/docs/part-2-core-skills/understanding-commands" >}}).

### Functions

If you have more complex operations that you regularly perform, you could add them to your _~/.bashrc_ as a function:

```sh
# Restart the shell.
restart-shell() {
  exec -l $SHELL
}

# Make a directory (don't fail if it exists) and move into it in one line.
function mkd {
  mkdir -p -- "$1" && cd -P -- "$1";
}

# Cut, but in reverse, e.g:
# $ echo "One;Two;Three;Four;Five" | revcut -d';' -f2
# -> Four
function revcut {
  rev | cut "$@" | rev
}
```

You can find out more about functions in [Chapter 22 - Functions, Parameters and Error Handling]({{< relref "/docs/part-4-shell-scripting/functions-parameters-and-error-handling" >}}).

### Shell Options

The _~/.bashrc_ file is the ideal place to configure shell options to suit your preferences:

```sh
# If we enter a directory name on its own, assume we want to 'cd' into it.
shopt -s autocd
```

In this example we use the `shopt` (_set shell option_) command to set the `autocd` option. This option allows you to enter the name of a directory as if it was a command, when you press 'enter' the shell will `cd` into the directory.

You can list the options available to set by running `shopt -p`, or searching the `man bash` page for `shopt`. Some of the most useful options are:

| Option        | Description                                                                                     |
|---------------|-------------------------------------------------------------------------------------------------|
| `autocd`      | Enter a directory name as a command and the shell will `cd` to it.                              |
| `cdable_vars` | Allows you to `cd` into a variable, such as `repos=~/repos; cd repos`                           |
| `cdspell`     | The shell will try to fix typos to the `cd` command.                                            |
| `checkjobs`   | Show the status of stopped and running jobs before exiting the shell.                           |
| `cmdhist`     | Save multi-line commands in the shell history as single entries, rather than an entry per line. |
| `dirspell`    | Try to correct typos when auto-completing directory names.                                      |
| `globstar`    | Support recurive globbing such as `**/*.py` to find files in subdirectories.                    |
| `histappend`  | Append to the history file when the shell exists, rather than overwriting it.                   |

As well as the options that can be set using the `shopt` command, there are also many variables that are used to configure the shell. We've seen some of these variables already, such as the `EDITOR` variable that defines what text editor to use and the `PAGER` variable that defines what pager program to use.

### Changing the Command Prompt

The command prompt is the information that is shown to the left of the caret in the shell where you enter commands. It will often look something like this:

```
dwmkerr@ip-172-31-28-144:~/effective-shell$
```

This command prompt is made up of the following parts:

- `ubuntu` - the name of the current user
- `ip-172-31-28-144` - the hostname of the machine
- `~/effective-shell` - the current directory
- `$` - an indicator showing that we are using Bash (this will be `#` if we are a super user)

The structure and format of the command prompt can be configured using the `PS1` variable, this is a large enough topic that the whole of the next chapter is dedicated to customising the command prompt.

### Source Files

Another common pattern for the _~/.bashrc_ file is to simply source another file.

For example, you might want to create a set of common functions that you keep in a file called _shell-functions.sh_. You could source this file as part of your shell configuration:

```sh
# Load my common shell functions.
source ~/shell-functions.sh
```

In fact, a lot of the shell startup files do exactly this. For example, in the default _~/.bashrc_ file on Ubuntu 20, you will see these lines:

```sh
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi
```

This line uses the `-f` test to see whether a file named _~/.bash_aliases_ exists. If it does, it is loaded (using _dot sourcing_ as the notation).

There are lots of different ways to manage your shell configuration. This can range from the simple, such as adding an alias to the _~/.bashrc_ file, to the complex, such as sourcing the contents of an entire directory, or configuring a shell dynamically based on what tools are installed on a system.

### Configure Your System

You might have particular commands you want to ensure are run when you start a shell. For example, let's say that you want to always have a folder named _~/today_ that links to a temporary folder which is updated daily.

To do this, you could add the following commands to the _~/.bashrc_ file:

```sh
# Get today's date in the format YYYY-MM-DD.
today=$(date +"%Y-%m-%d")

# Create the path to today's temp folder and then make sure the folder exists.
temp_path="/tmp/${today}"
mkdir -p "${temp_path}"

# Now that we've created the folder, make a symlink to it in our homedir.
ln -sf "${temp_path}" "${HOME}/today" 
```

### Configuration Tips

There are a few things that you should pay attention to when working with startup files.

**Do not print output**

It is considered bad practice to print output during startup of the shell. Avoid running commands like `echo` or `printf`. If you call commands that write to _stdout_ then silence the output by piping it to _/dev/null_.

**Do not run long operations**

You might have written a cool scripts that pulls down information on stocks or weather from a website, ready to show in your shell. But avoid running anything in a startup file that can take a lot of time. Every time you start your shell you'll have a delay while the command runs and this can really slow you down!

**Be careful not to break things**

Don't run so many commands that you might cause errors or failures on startup. This can make your shell difficult to use or slow to start up. If your startup logic is failing it can be hard to debug, so try not to make it too complex!

**Clean up after yourself!**

Remember, any variables you set will be set for all shells that read the startup file. If there are variables that you only need during the processing of the file, consider using the `unset` command to unset the variable at the end of startup.

**Expect commands to be run multiple times**

Write your startup files with the assumption that they will be run multiple times. If you start a new shell from your current shell, your configuration file will be loaded again. Your configuration should not cause errors if it is run multiple times!

# Shell Startup

In most cases you will only need to work with the _~/.bashrc_ file to configure your shell. However, the shell actually uses a number of different configuration files (which are called 'startup files') depending on how the shell is being used.

You may have seen references to files such as _/etc/profile_, _~/.bash_profile_, _~/.bash_logout_ and more. The different files that are used can be quite confusing. For the rest of this chapter we're going to go into the details of exactly how the shell uses these different files.

# Different Types of Shells

For us to be able to understand how shells are configured, we need to understand the different types of shells that can run. This does not mean different shell programs, such as `bash`, `zsh` or `dash`, but instead the differences between _interactive_ and _non-interactive_ shells, as well a _login_ shells.

A lot of people get confused by how the shell is configured because they don't fully understand what these different types of shells are. So let's introduce each one, what it is and how it is used.

## Interactive Shells

An _interactive shell_<!--index--> is any shell that has its input, output and error standard streams connected to a terminal. This sounds complicated, but it really just means that an interactive shell is one that you interact with via the keyboard and display!

When we type commands into our shell, we're using an interactive shell.

## Non-Interactive Shells

Any shell that does not have its standard input, output and error streams attached to a terminal is generally called a _non-interactive shell_<!--index-->. You might wonder why you would ever have a shell that isn't connected to the keyboard and display, given that the shell is a tool for interfacing with your computer, so let's see some examples.

The most common example we've seen so far for non interactive shells are the shells that run shell scripts! Let's run the _showpstree.sh_ script to show the process tree for the current process:

```
~$ ./effective-shell/scripts/showpstree.sh
systemd
  └─sshd
      └─sshd
          └─sshd
              └─bash
                  └─sh ./effective-shell/scripts/showpstree.sh
                      └─pstree -a -s 1675
```

The output will look different depending on what system you are using, but the key section to focus on are the final three processes:

- `pstree -a -s 1675` - this is just the `pstree` (_show process tree_) command that is run in the _showpstree.sh_ script
- `sh ./effective-shell/scripts/showpstree.sh` - this is a _non-interactive shell_ that is running our shell script
- `bash` - this is the _interactive shell_ that we used to invoke our shell script

When you run a shell script, it runs in a _non-interactive_ shell. This is really important to remember! The same applies if we use a shell script in a _cronjob_, or as a part of system startup. Shell scripts are run in non-interactive shells. This means that anything you define in _~/.bashrc_ will not be loaded, so don't try and use aliases or other customisations that you have made.

Another way to show a non-interactive shell in action is to simply invoke the shell program with a specified command from the command like:

```
$ sh -c "echo $((5 + 5))"
10
```

In this example we started the `sh` (_shell_) program and provided a command via the `-c` (_command_) flag. This starts a non-interactive shell.

Why do non-interactive shells not load the configuration file? There are two reasons. The first is that it doesn't make sense for scripts to rely on user-level customisations, if one user has an alias and refers to it in a script, then the script will not run for another user unless they have the same alias. The second reason is for performance - when using a shell to run a script the shell can start much more quickly if it doesn't need to load configuration or customisations.

## Login Shells

When you login to a computer with a shell, entering credentials such as a username and password, then you are using a _login shell_<!--index-->. A login shell will normally run some initial setup of your environment and provide the bare minimum configuration required to work with the system. For example, most shells set up the `$PATH` variable as part of the initialisation of the login shell.

For systems that don't have a graphical interface, any shell you create will be a child of the login shell, so will inherit the login shell's configuration. For graphical interfaces to systems, such as KDE or Gnome, when you log in with the graphical interface, the desktop manager normally configures the environment using the same configuration as is used for a login shell. The desktop manager process will therefore have variables like the `$PATH` set up just as if you had logged in at the command line.

When you `ssh` onto a remote machine, you will be running a login shell. In most cases, when you switch users with commands like `su` (_set user_), you will start a login shell as well[^1].

The key thing to remember about login shells is that they are normally run once, when you start working with a computer, and all of the other shells you then run will be children of the login shell.

You can see whether your shell is a login shell by examining the `$0` variable. This variable holds the parameters that were provided to start the shell. By convention, if the parameter starts with a `-` dash symbol, you can assume that you are in a login shell.

Let's see an example of this in action by logging into a virtual machine (if you would like to set up your own Linux virtual machine you can follow the guide in [Appendix - Setting Up a Linux Virtual Machine]({{< relref "/docs/work-in-progress" >}}):

```
$ ssh effective-shell-ubuntu-20
Welcome to Ubuntu 20.04.2 LTS (GNU/Linux 5.4.0-1045-aws x86_64)
...
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

~$ echo "$0"
-bash
```

Here we can see that the parameter that the shell was started with was `-bash`. This starts with a `-` dash symbol, indicating that it is a login shell.

Login shells are _normally_ interactive shells, but it is possible to run a non-interactive login shell (it's just quite an unusual thing to do).

Why is there a difference between login shells and non-login shells? The reasons are nowadays essentially historic. In the early days of Unix, executing any commands could be time consuming. The login shell would perform the most essential configuration only once when a user logs in and all subsequent shell processes could start more quickly as they would inherit the login configuration and then load the user specific configuration.

# Shell Startup Files

When the shell starts, it reads a set of _startup files_. These files are shell scripts that are _sourced_ by the shell. A script that is sourced is loaded into the _current_ shell process, rather than running in a new shell process. If you need a reminder on sourcing, check [Chapter 18 - Shell Script Essentials]({{< relref "/docs/part-4-shell-scripting/shell-script-essentials" >}}).

For many people, the various different files that are loaded can cause confusion. But as long as you understand the different types of shells that exist, it is actually quite straightforward to understand the process.

When a _login_ shell starts, the following steps are taken:

- The shell attempts to load the _profile file_
- The _profile file_ will normally load the _run commands_

When an _interactive_ shell starts, the following steps are taken:

- The shell attempts to load the _run commands_ file

When a _non-interactive_ shell starts, it doesn't load any configuration files, unless one has been specified in the `BASH_ENV` variable.

Let's take a look at these files in detail.

## The Shell Profile File<!--index-->

When a login shell is started, the shell loads and executes commands from the _/etc/profile_<!--index--> file.

The profile file contains the most essential configuration that is required. It is often used to set things like the `$PATH` environment variable, which will sometimes have different values depending on the operating system you are using.

The shell will then attempt to read each of the following files. If the shell finds one that is readable, it reads it and executes its commands, and then does not attempt to read the others:

- _~/.bash_profile_<!--index-->
- _~/.bash_login_<!--index-->
- _~/.profile_<!--index-->

There are very few circumstances in which you should change any of theses files. It is based to think of the profile files as essential operating system specific configuration that is needed to have a functional login shell.

When a login shell closes, it will run any commands in the _~/.bash_logout_ file. However, users might terminate the shell process forcibly, which means that you cannot be sure this file will always be sourced as the shell exits.

The configuration that the startup files perform varies from distribution to distribution, but in general they will do at least the following:

- Set the `$PATH` variable to include the appropriate folders for tools for your distribution
- Set the shell prompt, the characters that are shown to the user to show they need to enter input (such as `~$` when we are in the home folder, or `~#` if we are in the home folder as a super user)
- Set up auto-completion (the feature that allows you to press 'tab' to see suggestions when entering commands)
- Load the _run commands_ file - we'll look at this file next

The key thing to remember about the profile files is that you normally don't need to change them and they normally load the _run command_ file for you.

## The Shell Run Commands File<!--index-->

When an interactive non-login shell is started, the shell loads and executes the commands from the _/etc/bash.bashrc_ file and then the _~/.bashrc_ file (if they exist).

It is also convention that you can have two `rc` files - one that is for _all_ users (in this case, _/etc/bash.bashrc_) and one that is user specific (in this case, _~/.bashrc_).

The _~/.bashrc_ file is where you can put your own commands to configure the shell to suit how you want to use it. This is the file we spent the first half of the chapter looking at in detail.

## Startup Files for Non-Interactive Shells

If you need to load a startup file for a non-interactive shell, you can set the `BASH_ENV` variable to the path of the file that you want to load. In general you should be very careful when doing this, as shell commands or shell scripts should be written so that they can operate without a startup file being loaded.

## Login Shells and Desktop Managers

Before the advent of the graphical user interface, almost all shell processes would be children of a login shell, as you had to use a login shell to access the system.

For modern systems that use a desktop environment such as Gnome or KDE, the desktop manager process normally loads the `/etc/profile` file. This means that when you open a terminal program use as the Gnome Terminal or Konsole, the shell is a child of a process which has loaded the profile. This means that even if you don't use a login shell to access a system, you can normally be sure that the profile will have been loaded.

Different distributions and operating systems may handle this in slightly different ways, for example on MacOS when you run the Terminal program it actually starts a login shell[^2]. Again, this means that you can be sure that the profile has been loaded (which in turn will load the RC files).

# Summary

In this chapter we saw how to customise shell configuration with the _~/.bashrc_ file. We also looked in detail at the differences between login and non-login shells, interactive and non-interactive shells, and how these different shells load startup files.

You can find all of the detail on how the shell starts up in the `man bash` page, just search for `^INVOCATION`.

In the next chapter we will look at how you can set up your command prompt to suit your preferences.

[^1]: There are three excellent discussions on login and non-login shells and interactive shells [here](https://askubuntu.com/questions/247738/why-is-etc-profile-not-invoked-for-non-login-shells), [here](https://askubuntu.com/questions/155865/what-are-login-and-non-login-shells) and [here](https://unix.stackexchange.com/questions/38175/difference-between-login-shell-and-non-login-shell).
[^2]: There is a very good discussion on this topic at https://unix.stackexchange.com/questions/119627/why-are-interactive-shells-on-osx-login-shells-by-default.
