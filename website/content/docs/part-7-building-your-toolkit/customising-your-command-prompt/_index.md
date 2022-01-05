---
title: "Customising Your Command Prompt"
weight: 25
---

# Chapter 25 - Customising Your Command Prompt

The shell has a large number of options available that you can use to customise the _command prompt_ - the text shown in front of your cursor as you type commands. In this chapter we will look at how you can change the command prompt to show the information that you would like to see.

We will also create a script that allows us to set our own command prompt 'theme' from a list that we can extend over time. This script will also handle the differences between Bash-like shells and Z-Shell for us, allowing us to have a consistent command prompt across different types of shells!

# The Command Prompt<!--index-->

The _command prompt_ is the text that is shown to the left of your cursor to show that the shell is waiting for you to type a command. Each distribution comes with its own configuration for the command prompt, but the default is often similar to the one shown below:

```
dwmkerr@effective-shell-ubuntu-20:~$
```

This is the prompt on an Ubuntu virtual machine I have set up. If you want to set up a free virtual machine yourself, you can follow the guide at [Appendix - Setting Up a Linux Virtual Machine]({{< relref "/docs/work-in-progress" >}}).

Let's take a look at each of the components that make up the prompt:

- `dwmkerr` - The first thing that is shown is the name of the current user
- `@` - Next we have an "at" character that is used as a separator between the username field and the following field
- `effective-shell-ubuntu`: This is the _hostname_ of the machine
- `:` - A colon separates the hostname from the next field
- `~` - Next we have the current working directory
- `$` - Finally we have the prompt itself, the `$` symbol shows we are a normal user, rather than a 'root' user

If we change directory, our prompt will be updated:

```
dwmkerr@effective-shell-ubuntu-20:~$ cd effective-shell
dwmkerr@effective-shell-ubuntu-20:~/effective-shell$
```

If we change to the 'super' user we can see that the username changes to `root` and the `$` dollar symbol changes to a `#` hash symbol:

```
dwmkerr@effective-shell-ununtu-20:~/effective-shell$ sudo su
root@effective-shell-ununtu-20:/home/dwmkerr/effective-shell#
```

The `#` symbol is a useful reminder that we are the root user. It is important to be careful when running commands as the root user as we could easily break things by changing system files.

So out-of-the box on most systems our command prompt shows a number of useful fields. But we can actually customise this prompt to include almost any kind of information we would like to see. Let's take a look!

# Customising the Command Prompt

The structure of the command prompt is specified in the `PS1`<!--index--> shell variable. This stands for 'Prompt String 1'. The shell uses this variable to write out the command prompt.

We can see the contents of this variable by using `echo` or `printf` to write it to the screen:

```
dwmkerr@effective-shell-ubuntu-20:~/effective-shell$ echo $PS1
\[\e]0;\u@\h: \w\a\]${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$
```

This looks extremely complicated - but don't worry, by the time we've finished this chapter you'll be able to understand what this mess of special characters means!

The easiest way to see how these special prompt strings work is to start using them, so let's get started and customise our prompt.

## The Prompt String

You can set your own prompt string by setting the `PS1` variable:

```
dwmkerr@effective-shell-ubuntu-20:~/effective-shell$ PS1="---> "
--->
```

The shell will use the contents of the `PS1` variable to display the prompt. We can use plan text as shown above, but there's also a lot more that we can do to customise this prompt!

## Special Characters

When the shell reads the `PS1` variable, it allows certain special characters to be specified. These characters can be used to customise how the prompt string looks.

The special characters that the shell uses are listed below:

| Characters   | Usage                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------|
| `\a`         | The special 'beep' character, that tells the shell to play a beep sound through the speakers. |
| `\d`         | The date in "Weekday Month Date" format, for example: 'Tue May 26')                           |
| `\D{format}` | The date in a format specified by the `format` value.                                         |
| `\e`         | An ASCII escape character (033). This is used to print special characters.                    |
| `\h`         | The hostname up to the first `.` dot.                                                         |
| `\H`         | The hostname.                                                                                 |
| `\j`         | The number of jobs currently managed by the shell.                                            |
| `\l`         | The basename of the shell's terminal device.                                                  |
| `\n`         | A newline character.                                                                          |
| `\r`         | A carriage return character.                                                                  |
| `\s`         | The name of the shell, the basename of `$0`, for example: `-bash`.                            |
| `\t`         | The current time in 24-hour HH:MM:SS format.                                                  |
| `\T`         | The current time in 12-hour HH:MM:SS format.                                                  |
| `\@`         | The current time in 12-hour am/pm format.                                                     |
| `\A`         | The current time in 24-hour HH:MM format.                                                     |
| `\u`         | The username of the current user.                                                             |
| `\v`         | The version of bash, for example: '5.0'.                                                      |
| `\V`         | The release of bash, with the patch level, for example: '5.0.17'.                             |
| `\w`         | The current working directory, with `$HOME` abbreviated with a `~` tilde symbol.              |
| `\W`         | The current working directory name (rather than the entire path as is used for `\w`).         |
| `\!`         | The history number of this command.                                                           |
| `\#`         | The command number of this command                                                            |
| `\$`         | The `$` dollar symbol, unless we are a super-user, in which case the `#` hash symbol is used. |
| `\nnn`       | The character corresponding to the octal number `nnn`, used to show special characters.       |
| `\\`         | A `\` backslash character.                                                                    |
| `\[`         | The 'start of non-printing characters' sequence.                                              |
| `\[`         | The 'end of non-printing characters' sequence.                                                |

Some of these sequences are reasonably self-explanatory, some are a little more complex. Let's use some of them now to see how we can customise the prompt.

{{< hint info >}}
**Z-Shell**
The `zsh` shell uses different sequences. However, I suggest that you follow this chapter through to understand how Bash-like shells work and then you can apply the same techniques using Z-Shell. The Z-Shell documentation links are at the end of the chapter.

Later on in this chapter we will introduce a function to help set the prompt, this function automatically converts to the prompt into Z-Shell format if needed. So the techniques you learn here should still be able to be used in Z-Shell.
{{< /hint >}}

To change the prompt, all we need to do is set the `PS1` variable. Let's start by changing the prompt so that it shows the date, time and the `$` or `#` prompt symbol:

```
dwmkerr@effective-shell-ubuntu-20:~$ PS1='\d \@ \$ '
Sun Jun 06 12:43 PM $
```

In this example we've used the `\d` (current date), `\@` (current time in am/pm format) and `\$` (prompt) and a space for our prompt. Notice that once we set `PS1` in the shell, the prompt immediately changed.

How about if we want to show the number of jobs, then the command number, then the prompt? Easy!

```
Sun Jun 06 04:43 AM $ PS1='[\j] (\#) \$ '
[0] (4) $ sleep 10 &
[1] 27598
[1] (5) $ sleep 10 &
[2] 27600
[2] (6) $ sleep 10 &
[3] 27601
[3] (7) $
```

In this example we've used the `\j` (current job) sequence, and surrounded it with square brackets. Then we used `#` (command number), surrounded by parentheses, then the `\$` shell prompt. I also started some background jobs, that just run the `sleep` (_wait for a number of seconds_) command, so that we can see that the number of jobs is changing. If you need a refresher on jobs, check [Chapter 9 -Job Control]({{< relref "/docs/part-5-getting-faster/job-control" >}}).

Note that we are using single quotes when specifying the value of the `PS1`. If we didn't use single quotes, then the shell would see the dollar symbol and think that we were trying to use a variable. For a reminder on how quoting works, check [Chapter 19 - Variables, Reading Input, and Mathematics]({{< relref "/docs/part-7-shell-scripting/variables-reading-input-and-mathematics" >}}).

If you are following along or trying this out in your own shell, you might have noticed that we don't have any colours for the new prompts we have set, everything is shown in white. To set the colour of the prompt we need to use some special characters.

## Changing the Colour and Text Formatting

In the earlier part of this chapter we saw that the default prompt on systems like Ubuntu contains lots of special characters. For reference, here is the value of the `PS1` variable on a clean Ubuntu 20 installations: 

```
dwmkerr@effective-shell-ubuntu-20:~/effective-shell$ echo $PS1
\[\e]0;\u@\h: \w\a\]${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$
```

Some of these characters we might now be able to recognise, such as `\u` for the username and `\h` for the host. The characters that start with the sequence `\033` are _ANSI color codes_. ANSI stands for _American National Standards Institute_, an organisation that was set up to attempt to set common standards for computing platforms.

In the early days of Unix, each vendor developed their own special characters that could be used to control the visual formatting of output. These characters would vary from platform to platform, which made trying to create scripts or functionality that worked across multiple platforms complex. To deal with this, the ANSI organisation defined a common set of codes that could be printed to a terminal to control the visual style of the output.

To tell a terminal that we want to use a special sequence to control the formatting or output of text, we can use these _ANSI Escape Sequences_. First we write out the characters `\033` or `\e`. This is the sequence that represents the 'escape' key. The first version is the 'escape' key code written in 'octal' format (octal is a format where numbers are written in base eight, rather than base ten). The second sequence is an alternative way of writing the 'escape' key.

When a terminal sees the escape sequence, it knows that the _following_ sequence is used to define the formatting. The table below shows some of the different formats that can be used:

| Sequence                    | Meaning                                                |
|-----------------------------|--------------------------------------------------------|
| **Foreground Color**        |                                                        |
| `\033[30m`                | Set foreground to 'black'.                             |
| `\033[31m`                | Set foreground to 'red'.                               |
| `\033[32m`                | Set foreground to 'green'.                             |
| `\033[33m`                | Set foreground to 'yellow'.                            |
| `\033[34m`                | Set foreground to 'blue'.                              |
| `\033[35m`                | Set foreground to 'magenta'.                           |
| `\033[36m`                | Set foreground to 'cyan'.                              |
| `\033[37m`                | Set foreground to 'white' (normally light grey)        |
| **Foreground Color (Bold)** |                                                        |
| `\033[1;30m`                | Set foreground to 'bright black' (grey, or bold black) |
| `\033[1;31m`                | Set foreground to 'bright red' (or bold red).          |
| `\033[1;32m`                | Set foreground to 'bright green' (or bold green).      |
| `\033[1;33m`                | Set foreground to 'bright yellow' (or bold yellow).    |
| `\033[1;34m`                | Set foreground to 'bright blue' (or bold blue).        |
| `\033[1;35m`                | Set foreground to 'bright purple' (or bold purple).    |
| `\033[1;36m`                | Set foreground to 'bright cyan' (or bold cyan).        |
| `\033[1;37m`                | Set foreground to 'bright white' (or bold white).      |
| **Background Color**        |                                                        |
| `\033[0;40m`                | Set background to 'black'.                             |
| `\033[0;41m`                | Set background to 'red'.                               |
| `\033[0;42m`                | Set background to 'green'.                             |
| `\033[0;43m`                | Set background to 'brown'.                             |
| `\033[0;44m`                | Set background to 'blue'.                              |
| `\033[0;45m`                | Set background to 'purple'.                            |
| `\033[0;46m`                | Set background to 'cyan'.                              |
| `\033[0;47m`                | Set background to 'white' (normally light grey).       |
| **Reset Colors**            |                                                        |
| `\033[0m`                   | Reset the text colors.                                 |

Notice that each sequence starts with the 'escape' character, followed by `[` or `[1;`. `[` will use the 'normal' colour, `[1;` will use the 'bright' colour (how this is shown depends on your terminal emulator, in many modern emulators the text is shown in the same colour but is bold). You can also use `[0;` to clear any changes to the foreground or background before you set the new one. After this there are one of eight colours that can be used, specified by the characters in the range from `30m` to `37m`. The sequences in the range `40m` to `47m` set the background color. The sequence `0m` resets the colors.

With these codes we can print coloured text. When we write text that uses escape sequences, we need to tell the shell that our text needs to have these escape sequences processed properly. We can use the `printf` command or `echo -e` to do this. `printf` should be preferred as not all systems support the `-e` parameter for `echo`:

```sh
printf "\033[31mRED\033[0m\n"
printf "\033[1;31mLIGHT RED\033[0m\n"
printf "\033[0;30m\033[42mBLACK ON GREEN\033[0m\n"
```

The output of these commands will be the text below:

```
RED
LIGHT RED
BLACK ON GREEN
```

However, the colour of the foreground and background should change on each line. The exact formatting will change depending on the terminal emulator you use. Some terminal emulators use bold text for the 'bright' colours. 

With our new knowledge of how to use ANSI Escape Sequences to set the format of text, we can update our `PS1` variable to show a prompt in colour. As an example, the code below sets the prompt to show the username in blue and the name of the current working directory in green, followed by a white `$` prompt symbol, followed by the 'reset' sequence so that the text we type afterwords does not have its colour changed:

```
dwmkerr@effective-shell-ubuntu-20:~/effective-shell$ PS1='\033[34m\u \033[32m\W \033[37m\$ '
dwmkerr effective-shell $
```

The prompt above will be shown in color on modern terminals.

There is one snag to this. If you set your prompt in this way and press the 'up' and 'down' keys to cycle through previously entered commands, you might see that your shell prompt gets overwritten. The reason for this is that we need to tell the shell that colour and formatting sequences are 'non-printing' characters - the sequences don't actually produce written text in the terminal.

To deal with this we need to surround each colour sequence with the special characters `\[` and `\]`. This tells the shell when a 'non-printing' sequence starts and when it ends. To fix our `PS1` variable, we can use the value below:

```sh
PS1='\[\033[34m\]\u \[\033[32m\]\W \[\033[37m\]\$ \[\033[0m\]'
```

Phew! This is a lot of work to go to just to format the colour of the prompt. Later in this chapter we'll build a script that will make it far easier to work with colours and text formatting!

## Adding Data to the Command Prompt

When we set the `PS1` variable, we are simply setting it to a string. This string could be anything, for example:

```
dwmkerr@effective-shell-ubuntu-20:~$ PS1='-Ready?---> '
-Ready?---> 
```

We don't need to limit ourselves to the special sequences we've seen so far in this chapter - we can run any commands we like to build a command prompt. For example, we could use the use the `ls` (_list directory contents_) and `wc` (_count lines and works_) commands to count the number of files and folders in the current directory and show that in the prompt:

```sh
PS1="$(ls -al | wc -l | tr -d '[:space:]') \\$ "
```

When I run this command, my prompt will look something like this:

```
32 $
```

We have used the `$()` notation to run a sub-shell that lists the contents of the current directory and then pipes them to `wc -l`, which counts the number of lines. Finally we pipe the result into `tr -d '[:space:]` to remove the whitespace around the line count.

To use the `$()` notation, or any shell variable, we have to use double quotes in the string, otherwise the shell will write out those characters literally. And because we are using double quotes, we need an extra backslash before last `\$` character to escape it, so that the shell doesn't try to treat it as a variable.

However - there's a subtle bug in this `PS1` configuration! Let's see what happens when we change directories:

```
32 $ cd effective-shell/
32 $ touch newfile-{1..10}
32 $ 
```

In the session above I changed to the _effective-shell_ directory. But the count is still showing as `32`. This is suspicious. After creating ten new files with `touch newfile-{1..10}` the count still shows `32`.

The reason for this is that `32` was the number of files and folders in the current directory _at the time the `PS1` variable was set_. We changed the `PS1` variable once - what we really need to do is have the prompt count the files each time the prompt is shown.

Fortunately, there is a special syntax for this! We just put a `\` backslash character in front of the `$` dollar symbol for the sub-shell:

```sh
PS1="\$(ls -al | wc -l | tr -d '[:space:]') \\$ "
```

The backslash before the sub-shell tells the shell that it should evaluate the sub-shell _each time_ the prompt is shown:

```
32 $ touch newfile-{1..10}
42 $
```

This is where the real power of the `PS1` variable comes into play. Because we set it using the shell itself, we can run _any_ commands that we find useful and integrate their output into our command prompt.

Let's see this in action by creating a script to make customising our prompt far easier and more intuitive!

# A Shell Script to Customise the Prompt

We can write a script to make it much easier to customise our shell prompt. Rather than having to remember each of the colour sequences, we can store them in variables to make them easier to refer to. We can also run any commands that we'd like to run to allow us to show extra information.

There is a script in the Effective Shell samples at _~/effective-shell/scripts/set_ps1.sh_ that we can use to set our `PS1` variable in a much more user-friendly way.

{{< hint info >}}
**Downloading the Samples**

Run the following commands in your shell to download the samples:

```sh
curl effective.sh | sh
```
{{< /hint >}}

The _set_ps1.sh_ script is quite long, so let's go through it bit-by-bit.

```sh
# Keep track of the original PS1 value.
_original_ps1="${PS1}"

set_ps1() {
    # Foreground colours.
    local fg_black=$(tput setaf 0)     # \033[30m
    local fg_red=$(tput setaf 1)       # \033[31m
    local fg_green=$(tput setaf 2)     # \033[32m
    local fg_yellow=$(tput setaf 3)    # \033[33m
    local fg_blue=$(tput setaf 4)      # \033[34m
    local fg_magenta=$(tput setaf 5)   # \033[35m
    local fg_cyan=$(tput setaf 6)      # \033[36m
    local fg_white=$(tput setaf 7)     # \033[37m

    # Background colours.
    local bg_black=$(tput setab 0)     # \033[40m
    local bg_red=$(tput setab 1)       # \033[41m
    local bg_green=$(tput setab 2)     # \033[42m
    local bg_yellow=$(tput setab 3)    # \033[43m
    local bg_blue=$(tput setab 4)      # \033[44m
    local bg_magenta=$(tput setab 5)   # \033[45m
    local bg_cyan=$(tput setab 6)      # \033[46m
    local bg_white=$(tput setab 7)     # \033[47m
```

First, we store the current value of `PS1` in a variable named `_original_ps1`. This is so that later on if we have changed the `PS1` variable, we can change it back to what it was set to originally. The `_` underscore in the variable name is a convention that indicates that this variable is used internally in the script.

Next, we define a function called `set_ps1`. Then we use the `tput` command (_query terminfo database_) to get the exact escape sequences for the foreground and background colours. For easy reference the escape sequences are shown to the right of each command as a comment.

Next, we get the escape sequences for some of the other formatting options, such as 'bold' (which will be 'bright' on some terminals):

```sh
    # Text styles and reset. Note that on some terminals 'bold' will produce
    # light colours for bright colours, on others it will actually show the text
    # in bold.
    local bold=$(tput bold)            # \033[1m
    local dim=$(tput dim)              # \033[2m
    local start_underline=$(tput smul) # \033[4m
    local stop_underline=$(tput mmul)  # \033[24m
    local reset=$(tput sgr0)           # \033[0m
```

You might recall the `tput` command from the section 'colourising output' in [Chapter 23 - Useful Patterns for Shell Scripts]({{< relref "/docs/part-7-shell-scripting/useful-patterns-for-shell-scripts" >}}).

After this we use a `case` statement to set the `PS1` variable based on the value of the first parameter that was provided to the function:

```sh
    # Depending on the name of the theme provided, set the prompt.
    case $1 in
        debian)
            # Debian/Ubuntu style:
            #   \u@\h - username@host (bold/green)
            #   \w - working directory (bold/blue)
            #   \$ - prompt (# if root, otherwise $) (bold/white)
            PS1="\[${bold}${fg_green}\]\u@\h:\[${fg_blue}\]\w\[${fg_white}\]\\$\[${reset}\] "
        ;;

        datetime)
            # A style that shows the date and time:
            #   \D{%Y-%m-%d} - the year/month/date (in white)
            #   \@ - the time (in green)
            #   \$ - prompt (# if root, otherwise $) (bold/white)
            PS1="\[${fg_white}\]\D{%Y-%m-%d} \[${bold}${fg_green}\]\@\[${fg_white}\] \\$\[${reset}\] "
        ;;

        # Add your own themes here!

        *)
            # Restore PS1 to its original value.
            PS1="${_original_ps1}"
        ;; 
    esac

    # If we are in Z-Shell convert the PS1 to use Z-Shell format.
    [ -n "$ZSH_VERSION" ] && PS1=$(_to_zsh "$PS1")
}
```

In this code we check the first parameter of the function `$1`. If it matches the string `debian` we set the `PS1` variable to a format that is similar to what is used by Debian Linux distributions. If it matches the string `datetime` we set `PS1` to a prompt that shows the current date and time. If any other value is used, we reset the `PS1` variable back to its original value.

Before we complete the function, we check to see if `ZSH_VERSION` is set - this is to check whether we are in a `zsh` shell. If we are, then we use the `_to_zsh` function to convert the `PS1` string into the format used by Z-Shell.

Finally, we use the `}` to complete the definition of the function.

{{< hint info >}}
**Z-Shell**

The `zsh` shell differs considerably from Bash and Bash-like shells in how it handles the `PS1` variable. There is no need for the `\[` or `\]` sequences, there are built in color variables such as `$fg[red]` for 'red' and the special sequences are different (for example, rather than `\u` for username, Z-Shell uses `%n`).

The `set_ps1` function in the samples converts the `PS1` string to Z-Shell format if it is running in Z-Shell. However, this conversion is not perfect as some of the sequences shown in this chapter do not have an equivalent in Z-Shell. If you want to customise a Z-Shell prompt you can check the manual page `man zshmisc` and search for `PROMPT\ SEQUENCES`.
{{< /hint >}}

Notice how much easier it is to specify the values for the `PS1` string when we have the colours and formatting defined in variables! We still need to wrap the formatting characters with `\[` and `\]` to make sure that the shell knows how long the command prompt is, but this is _far_ easier to read than the samples we saw before where we provide the ANSI Escape Sequences.

To use this script, we can simply `source` it into our current session and then change the prompt by calling the `set_ps1` function:

```
$ 
dwmkerr@effective-shell-ubuntu-20:~$ source ~/effective-shell/scripts/set_ps1.sh
dwmkerr@effective-shell-ubuntu-20:~$ set_ps1 datetime
2021-06-06 04:10 PM $ set_ps1 debian
dwmkerr@effective-shell-ubuntu-20:~$ 
```

This script has a placeholder in the `case` statement for you to add your own 'themes' that you want to be able to use in your shell.

For example, one 'theme' I often use is below:

```sh
git)
    # A style that shows some git information.

    # Build a string that shows:
    # - The branch (underlined if 'main') in green
    # - A red exclamation if there are any local changes not committed
    # - An indicator of the number of stashed items, if any.
    _git_info() {
        # Git details.
        local git_branch_name="$(git branch --show-current)"
        local git_any_local_changes="$(git status --porcelain=v1 2>/dev/null)"
        local git_stash_count="$(git rev-list --walk-reflogs --count \
            refs/stash -- 2>/dev/null)" # Ignore error when no stashes
        local git_info=""
        if [ "${git_branch_name}" = "main" ]; then
            git_info="${bold}${fg_green}${start_underline}${git_branch_name}${reset}"
        else
            git_info="${bold}${fg_green}${git_branch_name}${reset}"
        fi
        if ! [ -z "${git_any_local_changes}" ]; then
            # Note that we have to be careful to put the exclamation mark
            # in single quotes so that it is not expanded to the last command!
            git_info="${git_info} ${bold}${fg_red}"'!'"${reset}"
        fi
        if [ "${git_stash_count:-0}" -gt 0 ]; then
            git_info="${git_info} ${bold}${fg_yellow}${git_stash_count} in stash${reset}"
        fi
        printf "${git_info}"
    }

    # Now show a Debian style prompt with the git info above it.
    PS1="\$(_git_info)\n\\[${bold}${fg_green}\]\u@\h:\[${fg_blue}\]\w\[${fg_white}\]\\$\[${reset}\] "
;;
```

Don't worry if you are not familiar with 'git', we will see it in a couple of chapters. The important thing is that this snippet shows that you can add almost any kind of information that you might find useful to your command prompt. When I run `set_ps1 git`, my prompt looks like this:

```
feat/chapter-26-customise-your-command-prompt ! 3 in stash
dwmkerr@effective-shell-ubuntu-20:~/repos/github/dwmkerr/effective-shell$
```

My prompt is now spread across two lines - the first shows me the branch I am on, a red exclamation point if I have made changes but not saved them, and the number of items I have in my 'stash'. The second line shows the standard Debian prompt.

The code shown above has been slightly simplified to make it more readable, you can see the exact version in the samples.

You can use the _~/effective-shell/scripts/set_ps1.sh_ file to build your own 'themes' and easily change between them in the shell.

If you want to always `source` this file into your shell on startup, just add the following like to _~/.bashrc_:

```sh
source "~/effective-shell/scripts/set_ps1.sh"
```

You could also set the default `PS1` variable immediately after sourcing the script if you like:

```sh
# Source the set_ps1 function and set our 'theme' to Debian.
source "~/effective-shell/scripts/set_ps1.sh"
set_ps1 "debian"
```

In the next chapter we will look at some sensible ways we can organise files like the _set_ps1.sh_ script and the _~/.bashrc_ file so that we can easily manage our customisations and share them across different machines.

# Additional Prompt Configuration

There are some other variables that you might want to use to configure your prompt:

| Variable         | Description                                                                                           |
|------------------|-------------------------------------------------------------------------------------------------------|
| `PS2`            | This is shown when performing 'continuation' and is normally set to `>`.                              |
| `PS3`            | This is shown when the `select` command is used and is normally not set, so the default `#?` is used. |
| `PS4`            | This is shown when tracing with `set -x` and is normally set to `+`.                                  |
| `PROMPT_DIRTRIM` | This can be set to limit the number of directories shown with using `\w` or `\W` in your prompt.      |
| `PROMPT_COMMAND` | This can be set to limit the number of directories shown with using `\w` or `\W` in your prompt.      |

Let's take a look at how each one can be used.

**PS2**<!--index-->

If we have a long line of text in the shell, we can start a 'continuation'<!--index--> by entering the backlash symbol:

```
$ echo "This is a really really \
> long \
> long line of text"
This is a really really long long line of text
```

The `>` symbol is shown when we press 'enter' after entering a `\` backslash symbol. This symbol is used to remind us that we are not entering a new command, we are just continuing the current command on a new line. You can change the text shown by setting `PS2`.

**PS3**<!--index-->

`PS3` allows you to specify the prompt used by the `select` command:

```
$ PS3="Your choice? : "
$ select fruit in Apples Pears; do echo "$fruit"; done
1) Apples
2) Pears
Your choice? :
```

The `PS3` variable is not set by default. If it is not set, then the `select` statement uses `#?` for the prompt.

**PS4**<!--index-->

When you enable 'tracing' by setting the `-x` option, each traced line starts with a `+` symbol:

```
$ set -x
$ echo "The date is $(date)"
++ date
+ echo 'The date is Sun 06 Jun 2021 08:49:07 AM UTC'
The date is Sun 06 Jun 2021 08:49:07 AM UTC
```

You can change this symbol by setting the `PS4` option.

**PROMPT_DIRTRIM**<!--index-->

If you set a value in the `PROMPT_DIRTRIM` variable, the shell will not show the entire contents of the working directory when you use the special `\w` sequence in a prompt variable. Instead, it will limit the number of directories shown to the value in `PROPMT_DIRTRIM` and use an 'ellipses' for the rest (and ellipses is written as three dots).

For example, if I was in the folder _~/effective-shell/logs/apm-logs_ and had `PROMPT_DIRTRIM` set to `2`, then on Debian my command prompt would look like this:

```
dwmkerr@effective-shell-ubuntu-20:~/.../logs/apm-logs$
```

Note that only the last two parts of the path to the folder are shown.

**PROMPT_COMMAND**<!--index-->

The `PROMPT_COMMAND` variable can be used to specify a command or set of commands to run before the prompt is shown.

A common use for the `PROMPT_COMMAND` is to save and reload the shell command history before each command is run:

```
PROMPT_COMMAND="history -a; history -c; history -r; $PROMPT_COMMAND"
```

In this example, we used the `history` (_display or manipulate history list_) command three times. First with `-a` to append the lines from the current session to the history file, then `-c` to clear the shell history in the session, then `-r` to reload it.

For many shells the history of commands is only updated when the shell is closed, this change means that even if the shell is terminated unexpectedly, each command we have executed will still have been written to the history.

# Z-Shell and Oh-My-Zsh

Z-Shell does not use the same sequences to format the prompt-string variables. However, the _set_ps1.sh_ script included in the Effective Shell samples will convert the Bash-style `PS1` variable into Z-Shell formatted prompt strings automatically.

For Z-Shell users, you might also consider the very popular "Oh-My-Zsh" project. This is a collection of themes and plugins that add many more aliases, functions, autocompletions and more to the shell. One of the most popular features of "Oh-My-Zsh" is its large collection of themes that customise how the prompt looks.

However, just like with most things in computing, I would strongly recommend that you learn how the fundamentals work as they are described in this chapter before using "Oh-My-Zsh" themes. This will help you understand how things like "Oh-My-Zsh" actually work under the hood.

You might also realise that you don't need to install an additional package to get the styling you want. For example, my own shell prompt includes information on Git, the working directory (trimmed to only show up to three entries), but only requires a few lines of of setup and works consistently in Bash-like shells _and_ Z-Shell.

Enjoy playing around with the prompt customisation! It can be a lot of fun and the options are almost limitless!

# Summary

In this chapter we looked at how you can customise the command prompt with the `PS1` variable, the shell's special sequences for useful information like `\u` for the current user, and how to configure the visual formatting of the prompt. We also looked at a script that makes configuring the command prompt a little easier to manage.

We've now seen quite a few ways to configure the shell, in the next chapter we'll look at some sensible practices that you can use to organise your shell configuration files.

To find all of the information on how to control the command prompt in the manual, run `man bash` and search for `^PROMPTING`. For Z-Shell, run `man zshmisc` and search for `PROMPT\ SEQUENCES`.
