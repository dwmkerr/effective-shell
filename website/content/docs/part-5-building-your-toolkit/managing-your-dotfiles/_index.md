---
title: "Managing your Dotfiles"
weight: 27
---

# Chapter 27 - Managing Your Dotfiles

As you build up more and more customisations for your shell and environment, it becomes important to find a way to manage these changes and files effectively.

Configuration files are often called 'dotfiles'. In this chapter we'll see how to manage your configuration - and 'dotfiles' - in a way that allows you to easily manage changes over time and build up a library of scripts and features for your preferred shell. We'll also look at how we can use your 'dotfiles' across different shells.

{{< hint info >}}
**Z-Shell**

We will start by discussing Bash configuration in this chapter. However, we'll quickly switch to creating configuration that works across many shells - including Z-Shell! So if you are a Z-Shell user don't worry, all of this material will be applicable to your environment as well.
{{< /hint >}}

In this chapter we will be creating some files and folders, if you just want to see the results, install the samples. You can then find them in the _~/effective-shell/dotfiles_ folder.

{{< hint info >}}
**Downloading the Samples**

Run the following command in your shell to download the samples:

```sh
curl effective.sh | sh
```
{{< /hint >}}

# Dotfiles

Any file or folder on your system that starts with a `.` dot symbol is a 'dotfile'. On many systems dotfiles are hidden by default. This means that they will not show up if you run commands like `ls`, unless you provide flags such as `-a` (_show all files and folders_) flag. In desktop environments such as Gnome, KDE and MacOS X dotfiles are also hidden by default.

Dotfiles are often used 'behind the scenes' as configuration files or system files. This is why they are hidden by default - 'normal' users shouldn't have to worry about them or their contents.

You will mostly see dotfiles in your `HOME` directory. They have a dot to mark them as hidden to distinguish them from your personal files and folders. When there are configuration files that are _outside_ your home directory, the dot is normally not used, because it is clear from the folder that the file is in that the file is in that it is a configuration file.

As an example, a user's personal Bash configuration is stored in _~/.bashrc_, but the global Bash configuration applied to _all_ users is stored in _/etc/bash.bashrc_. The second configuration file does not need a dot in front of it - the _/etc_ folder is where configuration is kept so there is no need to differentiate it from other files like a user's personal files.

Nowadays, when a user say "my dotfiles", they typically mean their _configuration_ files that are kept in their home directory. In a sense, your dotfiles are a bit like your personal settings for your computer. On a desktop environment your settings might be things like your theme or wallpaper. For a shell user, you settings will be files like _~/.bashrc_ for your shell configuration, _~/.ssh/config_ for your SSH configuration and so on.

You will likely change the dotfiles over time to suit your preferences. Let's take a look at some sensible ways to organise and structure your dotfiles so that you can easily see what is your personal configuration, rather than what is the default configuration provided by the system, and easily manage these configurations.

# The Default Shell Dotfile

On many platforms the default _~/.bashrc_ file will contain a number of customisations out-of-the-box.

Let's take a look at the _~/.bashrc_ file that comes with Ubuntu 20 as an example. We'll take a look at a few snippets. If you look at your own machine's _~/.bashrc_ file the contents may be different as it will vary from distribution to distribution:

```sh
# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000
HISTFILESIZE=2000
```

Here we have a number of options that relate to the shell history - making it slightly larger than the default, appending to the history file rather than over-writing it and so on.

```sh
# If set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
#shopt -s globstar
```

The `shopt -s globstar` command has been commented out, so that users can quickly remove the comment symbol to enable pathname expansion across subdirectories.

```sh
# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color|*-256color) color_prompt=yes;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
#force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	# We have color support; assume it's compliant with Ecma-48
	# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
	# a case would tend to support setf rather than setaf.)
	color_prompt=yes
    else
	color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt
```

This rather complex looking code determines whether the shell supports colour, and if so, updates the command prompt appropriately[^1].

```sh
# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi
```

If the shell supports colour, then _aliases_ are used so that common commands like `ls` will show their output in colour.

```sh
# some more ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi
```

More aliases are added as shortcuts for useful commands. We also are sourcing the _~/.bash_aliases_ file if it exists.

There will likely be a number of other configuration commands that are set in the file, such as setting up the 'auto-completion' feature of Bash.

We could add our own customisations to this file, and many people will do so. However it might be better to keep our changes in our own configuration file. This allows us to differentiate between the 'out-of-the-box' configuration and our own personal changes. Let's see how to do that.

# Creating a Dotfiles Folder

If we keep our shell customisations in our own dotfile, then it is much easier for us to see what are our personal configuration settings rather than the system-provided configuration settings. Also, if we keep these settings in a separate file, it becomes easier to then share this file across different machines. All we need to do is copy it to each machine where we want it, and `source` it from the _~/.bashrc_ file.

The other great thing about keeping your shell configuration in its own file is that you can then use it for _different_ shells if you want to. Or you can check in the file to see what the type of shell is and then load a configuration specifically for that shell.

It is entirely possible (and quite likely) that you will over time build up a collection of many dotfiles - some might be used for the shell, such as a file to set your favourite aliases or functions and some may be for other tools.

To keep things organised I'm going to show a technique to manage your dotfiles that I have found useful. You will see this technique, and many similar techniques, used by many people and demonstrated in blogs and so on. As I walk through the process feel free to customise or adapt it to suit your preferences!

First, let's start by creating a sensible location for all of our per-user personal configuration files, a folder called _~/dotfiles_:

```sh
mkdir ~/dotfiles
```

Keeping our dotfiles in a single folder will make it easier for us to later on package them up and share them, track changes to them, update them, and so on.

# Creating a Shell Dotfile

Rather than changing the system-provided _~/.bashrc_ file to contain all of our customisations, let's create our own shell configuration file in the dotfiles folder:

```sh
touch ~/dotfiles/shell.sh
```

You can call this file whatever you like, it really comes down to preferences. But here are a few points about the name I have suggested:

- I have not put a dot in front of the name! This is because _within_ the _~/dotfiles_ folder I don't actually want this file to be hidden - if I am looking in the _~/dotfiles_ folder I want to see this file
- I have not used the _name_ of a shell program in this file - this is because I will make this file work with _any_ shell that I regularly use - so whether I am using `zsh`, `bash` or `sh`, this file should still be able to be loaded
- I have put _.sh_ at the end of the file name - this is not really needed or even common in the world of Linux or Unix, but does make it immediately clear to the reader (or any program that opens the file) that it is a shell script

Now let's edit the _~/dotfiles/shell.sh_ file to add some configuration that might be useful for our shell:

```sh
# Note: there is no shebang in this script. This script sets my preferred shell
# configuration and should be able to be sourced from any Bash-like shell or
# from Z shell.

# If we are not running interactively do not continue loading this file.
case $- in
    *i*) ;;
      *) return;;
esac
```

We'll start the file with a comment that clearly explains why this file does not have a _shebang_ and that it should be able to be sourced from any Bash-like shell or Z-Shell. Then we perform a quick check on the parameters that the shell was started with (which are available in the special `$-` parameter) to see if the `i` (_interactive_) parameter is set. If the interactive parameter is _not_ set then we call `return` to stop loading the script.

This is standard for shell configuration files - we only change shell configuration when running interactively (otherwise things like aliases that we add could cause shell scripts and other processes that run non-interactively to have unexpected behaviour).

Next, let's set our preferred editor:

```sh
# Set our editor. Some tools use 'VISUAL', some use 'EDITOR'.
VISUAL=nano
EDITOR=nano
```

There are two variables are are used by the shell and command line programs to run an editor. The first, and original, variable was `EDITOR`. This was originally often a _line mode_ editor - i.e. a text editor that doesn't take up the whole screen. This was useful in the days of printed output, before screens were used. The `VISUAL` variable was used to specify the editor that could be used for 'full screen' terminal editing. Some programs use `EDITOR` and some use `VISUAL` so it is best to set both.

I have used the `nano` editor in this example as it available on many distributions and is a little easier than `vi` or `emacs`, but you can use whatever you like. For my personal dotfiles I use `vi`.

At this stage you can start to go a bit over the top - for example here's an alternative way to set the editor:

```sh
# Set our preferred editor to the first available editor in the array below.
preferred_editors=(nano vi)
for editor in ${preferred_editors[@]}; do
    if command -v "${editor}" >/dev/null 2>&1; then
        # Note that 'VISUAL' can be a full screen terminal editor. On legacy
        # systems 'EDITOR' was normally a line mode editor but there is
        # generally no need to differentiate any more.
        VISUAL="$(command -v ${editor})"
        EDITOR="${VISUAL}"
        break
    fi
done
unset editor preferred_editors
```

In this method we specify an array of editors, go through each one, check to see if it exists[^2], and if it does set it, otherwise we look for the next in the list. This is completely over the top and unnecessary! But the great thing about your dotfiles is - they're yours! If you want to do this, that's absolutely fine. If you want to check to see if Sublime Text is installed and use that, or Visual Studio Code, then that's not a problem - it's your personal configuration so do what works for you!

You'll notice that in the _~/effective-shell/dotfiles/shell.sh_ folder I `unset` every shell variable after I use it. This is just to clean up after myself and try to leave the environment as pristine as possible after sourcing the file.

Now let's set some sensible settings for working with folders:

```sh
# Set a shell option but don't fail if it doesn't exist!
safe_set() { shopt -s "$1" >/dev/null 2>&1 || true; }

# Set some options to make working with folders a little easier. Note that we
# send all output to '/dev/null' as startup files should not write to the
# terminal and older shells might not have these options.
safe_set autocd         # Enter a folder name to 'cd' to it.
safe_set cdspell        # Fix minor spelling issues with 'cd'.
safe_set dirspell       # Fix minor spelling issues for commands.
safe_set cdable_vars    # Allow 'cd varname' to switch directory.

# Uncomment the below if you want to be able to 'cd' into directories that are
# not just relative to the current location. For example, if the below was
# uncommented we could 'cd my_project' from anywhere if 'my_project' is in
# the 'repos' folder.
# CDPATH="~:~/repos"
```

If we run this script on an older shell, some of these options might not be present. This is why we have created a `safe_set` function that won't fail if the `shopt` function fails and will pipe any output to _/dev/null_. You can use these settings or remove them, it's really up to you. Each one is described below:

| Setting       | Description                                                                       |
|---------------|-----------------------------------------------------------------------------------|
| `autocd`      | Allows you to simply type a directory name or path and press enter to `cd` to it. |
| `cdspell`     | When running commands like `cd dirname`, have the shell fix minor typos.          |
| `dirspell`    | When running commands like `cat dirname/test`, have the shell fix minor typos.    |
| `cdable_vars` | If you create a var like `repos="$HOME/repos`, then `cd repos` to move into it.   |

I have also left a comment on how you can use the `CDPATH` shell variable to allow you to `cd` into relative folders outside of your current path. This option you should be a little careful with as it can be a bit misleading - but you might find it useful.

Finally, let's set some common shell history options:

```sh
# Configure the history to make it large and support multi-line commands.
safe_set histappend                  # Don't overwrite the history file, append.
safe_set cmdhist                     # Multi-line commands are one entry only.
PROMPT_COMMAND='history -a'          # Before we prompt, save the history.
HISTSIZE=10000                       # A large number of commands per session.
HISTFILESIZE=100000                  # A huge number of commands in the file.
# HISTCONTROL="ignorespace:ignoredup" # Ignore starting with space or duplicates?
# export HISTIGNORE="ls:history"     # Any commands we want to not record?
# HISTTIMEFORMAT='%F %T '            # Do we want a timestamp for commands?
```

These shell options and variables can be used to fine-tune how the history works. Here's a description of each one:

| Setting               | Description                                                                          |
|-----------------------|--------------------------------------------------------------------------------------|
| `shopt -s histappend` | When we write to the history file, append entries, don't overwrite the old file.     |
| `shopt -s cmdhist`    | If we have a multi-line command, record it as one entry, not one per line.           |
| `PROMPT_COMMAND`      | Before we show the `PS1` prompt, update the history file.                            |
| `HISTSIZE`            | Store up to 10000 items in the history for the current session.                      |
| `HISTFILESIZE`        | Store up to 100000 items in the history file for all sessions.                       |
| `HISTCONTROL`         | Uncomment to ignore commands that start with a space, or ignore duplicated commands. |
| `HISTIGNORE`          | Uncomment to not record certain commands in the history.                             |
| `HISTTIMEFORMAT`      | Uncomment to keep a date and time next to each command in the history file.          |

At this stage we got a sensible set of basic options for our shell, that should work in Bash, or Bash-like shells, as well as Z-Shell.

Now let's look at how we could test this file, before we actually source it.

# Testing the Shell Dotfile

Before we `source` the shell dotfile during shell startup, we should test that it runs without errors. Fortunately, there's a really easy way to do this!

From your shell, just run the command below:

```
$ sh -iex ~/dotfiles/shell.sh
+ case $- in
+ EDITOR=vi
+ VISUAL=vi
+ safe_set autocd
+ shopt -s autocd
...
```

What we have done is run a shell program, in this case the `sh` program, and passed the following flags:

- `i` - this makes the shell interactive - our script only runs in interactive shells so we need this to test it!
- `e` - this causes the shell to exit if a command fails
- `x` - this sets the tracing output

By running this script in a shell this way we can see _exactly_ what is being run, and if there is an error we will see the tracing stop at the point that the error occurs. You could perform exactly the same test with other shells, such as `bash` or `zsh`.

This is a great way to verify that the script works as expected, before we actually commit to sourcing it as part of our shell start up.

# Sourcing the Shell Dotfile

Now that we have a working shell dotfile, we can source it as part of our shell startup.

Rather than having our shell startup file know about our _~/dotfiles_ folder, we will create a symlink to th shell script from our home directory:

Finally, we can create a symlink in our home directory that points to our _~/dotfiles/shell.sh_ file and we are good to go!

```
$ ln -sf "$HOME/dotfiles/shell.sh" "$HOME/.shell.sh"
```

Note that in this example we used the `ln -sf` command to create a symlink, the `-s` flag ensures we create a normal symlink (rather than a 'hard' link) and the `-f` flag forces the creation of the link by overwriting any link that already exists.

Now all we need to do is add the following lines to our _~/.bashrc_ (or for Z-Shell, _~/.zshrc_ file):

```sh
# Source our shell configuration if it exists.
[ -r ~/.shell.sh ] && source ~/.shell.sh
```

This command uses the `-r` (_does file exist and is it readable_) test to check whether we have a _~/.shell.sh_ file and if it exists, sources it.

We're going to make a couple more changes and then bring this all together by creating one final script that sets performs the steps above for us. If this is enough dotfile configuration for you, then feel free to stop now, if you'd like to go deeper we'll look at loading additional files.

# Sourcing Files from a Folder

A common pattern with Linux and Unix systems is to allow _multiple_ configuration files to be stored in a folder. A convention is to have a folder with the letters `.d` at the end, to differentiate between a single configuration file and a configuration folder.

This pattern became popular over the years as individual configuration files became larger and more complex, and operators wanted to be able to spread their configuration across multiple files.

Here are some common examples:

| Configuration File     | Configuration Directory  | Notes                                 |
|------------------------|--------------------------|---------------------------------------|
| `/etc/crontab`         | `/etc/cron.d`            | Configuration for scheduled tasks.    |
| `/etc/bash_completion` | `/etc/bash_completion.d` | Configuration for Bash auto-complete. |
| `/etc/sudoers`         | `/etc/sudoers.d`         | Configuration for super-users.        |

We can follow exactly the same pattern for our shell configuration. Let's say for example that we want to customise our command prompt when we start the shell, we could put the file that contains the definition of the `set_ps1` function from the last chapter in our configuration folder. The file will be loaded and then we can use it to set the `PS1` variable in our shell configuration.

First, let's make a directory to hold our shell configuration files:

```
$ mkdir ~/dotfiles/shell.d
```

Now let's copy over our _~/effective-shell/scripts/set_ps1.sh_ file:

```
$ cp ~/effective-shell/scripts/set_ps1.sh ~/dotfiles/shell.d
```

Now let's update our `shell.sh` file to source all of the files in the _~/.shell.d_ folder:

```sh
# If we are not running interactively do not continue loading this file.
case $- in
    *i*) ;;
      *) return;;
esac

# Source any files in our ~/.shell.d folder.
if [ -x ~/.shell.d ]; then
    for shellfile in ~/.shell.d/*; do
        [ -r "$shellfile" ] && source "$shellfile"
    done
    unset shellfile
fi
```

The new code goes after the test to see whether the shell is interactive. We check to see whether there is a directory that can be searched (using the `-x` test), and then we loop through each file in the directory. If the file can be read (using the `-r` test) then we source it.

At the end of the _shell.sh_ file we can now call the `set_ps1` function to set our theme:

```sh
# Set the theme. Do not fail if the function doesn't exist.
set_ps1 "debian" || true
```

Finally, let's create a symlink in our home directory for the shell configuration files:

```
$ ln -sf "$HOME/dotfiles/shell.d" "$HOME/.shell.d"
```

At this stage we've now successfully created a _dotfiles_ folder to store our configuration, symlinks in our `$HOME` directory that point to our dotfiles and we have also updated our _~/.bashrc_ or _~/.zshrc_ to load our shell configuration.

If you want to see the new links you've created you can run the `ls` command just like so (I've abbreviated the output to make it more readable):

```
$ ls -al ~ | grep shell
lrwxr-xr-x    dwmkerr  .shell.d -> /home/dwmkerr/dotfiles/shell.d
lrwxr-xr-x    dwmkerr  .shell.sh -> /home/dwmkerr/dotfiles/shell.sh
```

# A Dotfile Install Script

The manual steps we performed to setup the links for our dotfiles can be easily run using a shell script. 

The script below shows how we can easily setup the links to the dotfiles, and source the appropriate files from our shell configuration:

```sh
#!/usr/bin/env sh

# This script installs the dotfiles locally. Note that it should be run from the
# dotfiles folder so that the links are set properly!

# Create links for the shell configuration.
ln -sf "$PWD/shell.sh" "$HOME/.shell.sh"
ln -sf "$PWD/shell.d" "$HOME/.shell.d"

# Source our shell configuration in any local shell config files.
config_files=(~/.bashrc ~/.zshrc)
for config_file in ${config_files[@]}; do
    # Skip config files that don't exist.
    [ -r "${config_file}" ] || continue

    # If we don't have the 'source ~/.shell.d' line in our config, add it.
    source_command="[ -r ~/.shell.sh ] && source ~/.shell.sh"
    if ! grep -q "${source_command}" "${config_file}"; then
        echo ".shell.sh is not sourced in '${config_file}' adding this now..."
        echo "${source_command}" >> "${config_file}"
    fi
done
```

This script creates the symlinks to our dotfiles and loops through a set of shell configuration files, adding a line to source the _~/.shell.sh_ in the configuration file if it doesn't exist.

Note how we use the `grep -q` command to search through the shell configuration file to see if the line that sources our dotfile exists. The `grep` command returns `0` if it finds a result and `1` otherwise, meaning we can easily use it in an 'if' statement

This script can be run from the dotfiles folder like so:

```
$ cd ~/dotfiles
$ ./install.sh
.shell.sh is not sourced in '/home/dwmkerr/.bashrc' adding this now...
```

And that is it - we now have a _~/dotfiles_ folder with our configuration, a sensible set of options for the shell, and the ability to quickly configure our dotfiles for different shells.

The dotfiles that we have a created are available in the _~/effective-shell/dotfiles_ folder from the samples. The install script shown above is also in that folder.

# Summary

In this chapter we looked at some sensible configuration settings for shells. We also looked at how to keep our settings separated from the system provided configuration file. We also saw how to manage our configuration files and folders in a 'dotfiles' folder. Finally, we created a simple script to 'install' our dotfiles for the local user.

In the next chapter we'll introduce Git - a version control tool we can use to manage changes to files like the 'dotfiles' easily over time. We can also use this tool to share our dotfiles across many machines.

[^1]: If you are curious, the `debian_chroot` variable is set when you are running as a user that has run the `chroot` (_change root_) command. The `chroot` command allows you to create an isolated file system tree. This lets you run programs in what is sometimes called a 'jail', which is a little like a container. `chroot` is an advanced topic and out of the scope of this book, but the `debian_chroot` command in the `PS1` variable is used to help make it clear when running a shell if you are in a 'changed root' environment.
[^2]: For a reminder on how to check whether a command is available, see _Checking for Installed Programs_ in [Chapter 23 - Useful Patterns for Shell Scripts]({{< relref "/docs/part-4-shell-scripting/useful-patterns-for-shell-scripts" >}}).
