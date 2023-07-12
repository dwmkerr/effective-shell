---
title: 'Useful Patterns for Shell Scripts'
slug: '/part-4-shell-scripting/useful-patterns-for-shell-scripts'
---

To close this the section on shell scripting we're going to look at some common patterns you will see in shell scripts. These are an assortment of techniques you may find useful when building your scripts - you may come across them in scripts others have written as well.

Remember that although this chapter focuses on patterns that are useful in scripts, you can apply these patterns in any shell session. This means you might find this chapter useful even if you are not expecting to write scripts, just as a way to understand some more advanced shell techniques.

## Ensuring Exit on Failure

By default, shell scripts will continue to execute if a command fails. This behaviour makes sense when running an interactive shell - we don't want the shell to close if a command fails. For a shell script however, continuing after an error has occurred is most likely going to lead to unexpected behaviour.

There are two options that you will often see set at the top of a script:

```bash
set -e
set -o pipefail
```

The first option ensures that the shell script will abort if a command fails.

The second option ensures that if a command that is part of a pipeline fails, then the shell script fails. Even when the `set -e` option is set, only the final command in a pipeline will cause the script to exit if it fails.

Here's an example showing why these options are useful:

```bash
# Create the effective shell folder.
mkdir -p ~/effective-shell

# Download and untar the effective shell samples.
samples_uri='https://https://effective-shell.com/downloads/effective-shell-samples.tar.gz'
$ sudo wget -c "${samples_uri}" -O - | tar -xz -C ~/effective-shell
```

If we don't include the `set -e` option, then if the `mkdir -p` command fails, the script will continue to run. We will then attempt to download and untar a file into a folder that does not exist. Why would `mkdir -p` fail? Although `mkdir -p` succeeds even if the folder exists, it will still fail if there is a file in the location specified, or there are not permissions to create the folder and so on. So even commands that you assume should run successfully you have to be careful with.

In the second part of this snippet, we use the `wget` (_web get_) command to download the samples and pipe the results to `tar` to extract them. If we have _only_ set `set -e`, then if `wget` fails (for example if the address is wrong or we are offline) then the shell will not abort the script and continue trying to run the subsequent commands, which are not going to work as expected.

If you have a command that you expect may fail, but want to continue execution even if it does fail, then use the `||` operator:

```bash
# Remove the shell configuration.
rm "$HOME/.shell.sh" || true
```

In this case I have used a conditional operator, as described in [Chapter 20 - Mastering Conditional Logic](../../04-shell-scripting/20-mastering-conditional-logic/index.md), to ensure that even if the `rm` command fails for some reason, the overall result of the statement will be true and the script will not exit.

Check Chapter [Chapter 22 - Functions, Parameters and Error Handling](../../04-shell-scripting/22-functions-parameters-and-error-handling/index.md) if you need a refresher on the `set -e` or `set -o pipefail` commands.

## Debugging Shell Scripts

You can use the `set` (_set option_) command to set the _trace option_.<!--index--> This option is incredibly useful for debugging shell scripts. When the trace option is set, the shell will write out each statement before it is evaluated.

Let's see just how useful this is with an example!

```bash
# today.sh - creates a 'today' symlink in the home directory folder to a fresh
# temporary folder each day.

# Enable tracing in the script.
set -x

# Get today's date in the format YYYY-MM-DD.
today=$(date +"%Y-%m-%d")

# Create the path to today's temp folder and then make sure the folder exists.
temp_path="/tmp/${today}"
mkdir -p "${temp_path}"

# Now that we've created the folder, make a symlink to it in our homedir.
ln -sf "${temp_path}" "${HOME}/today"

# Disable tracing now that we are done with the work.
set +x

# Write out the path we created.
echo "${temp_path}"
```

Notice that we use `set -x` to enable tracing early on in the script, and `set +x` to disable tracing towards the end. If we run this script, we'll see the following output:

```
$ ~/effective-shell/scripts/today.sh
++ date +%Y-%m-%d
+ today=2021-05-29
+ temp_path=/tmp/2021-05-29
+ mkdir -p /tmp/2021-05-29
+ ln -sf /tmp/2021-05-29 /home/dwmkerr/today
+ set +x
/tmp/2021-05-29
```

Each command that the shell executes is written to _stdout_ before it is executed. The parameters are expanded, which can make it far easier to see what is going on and troubleshoot issues.

The `+` symbol is written at the start of each trace line, so that you can differentiate it from normal output that you write in your script[^1]. The final line of output in the example above does not have a `+` in front of it - because it is actual output from an `echo` command, rather than a trace line.

The number of `+` symbols indicates the 'level of indirection' - this is how many sub-shells you are in. Each subshell is traced on its own line. This makes tracing complex commands far easier:

```bash
set -x
echo "Name of home folder is $(basename $(echo ~) )"
```

The output of this command is:

```bash
+++ echo /home/dwmkerr
++ basename /home/dwmkerr
+ echo 'Name of home folder is dwmkerr'
Name of home folder is dwmkerr
```

Notice that each subshell command is shown with an additional plus as it gets more nested. The nested commands are shown in the order that they are evaluated.

I often start my shell scripts with a snippet like this:

```bash
# Fail on errors in commands or in pipelines.
set -e
set -o pipefail

# Uncomment the below if you want to enable tracing to debug the script.
# set -x
```

This combines the first two patterns we've seen - failing on errors and having the option to trace a script.

## Checking for Existing Variables or Functions

The `declare` (_set variable values and attributes_)<!--index--> command can be used to explicitly declare that we are creating a variable. We saw in [Chapter 19 - Variables, Reading Input, and Mathematics](../../04-shell-scripting/19-variables-reading-input-and-mathematics/index.md) that sometimes this command is required - if we want to create an associative array for example.

There are a number of options for the 'declare' command, but one that is particularly useful is the `-p` (_display attributes and value_) option. This can be used to show all of the variables of a certain type.

Here's an example to show all associative arrays that have been created:

```
$ declare -p -A
declare -A BASH_ALIASES=()
declare -A BASH_CMDS=()
```

You can also use this command to validate whether a variable has been set or not:

```bash
if declare -p -A my_options 2>1 /dev/null; then
    echo "'my_options' exists"
else
    echo "'my_options' does not exist"
fi
```

We have to silence the error output of the `declare` command unless we want it to print an message if the variable doesn't exist. This technique can be useful to use before setting variables to ensure that they are not already in use, or check that the variable exists.

Functions are also variables - so we can use this trick to show all functions that are declared, the value of a function, or check if a function exists.

## Unsetting Values

If you are writing a script that should clean up after itself, you might want to use the `unset` (_unset values and attributes_) command. This can be useful if you want to create a script that leaves behind no variables or functions that could cause issues for later users:

```bash
# Remove the 'is_even' function from the shell session.
unset -f is_even
```

## Traps

You can use the `trap` (_trap signals and events_) command to specify a set of commands to run when the shell receives signals, or at certain points such as when the script exits or a function returns.

A very common use for traps is to create a 'cleanup' function that is executed when the script exits or if the user aborts execution by pressing `Ctrl+C` (which sends the `SIGINT` signal).

Here's an example of how a `trap` can be set to cleanup a temporary folder when a script exits or is interrupted:

```bash
# Create a temporary folder for the effective shell download.
source="https://effective-shell.com/downloads/effective-shell-samples.tar.gz"
tmp_dir=$(mktemp -d 2>/dev/null || mktemp -d -t 'effective-shell')
tmp_tar="${tmp_dir}/effective-shell.tar.gz"

# Define a cleanup function that we will call when the script exits or if
# it is aborted.
cleanup () {
    if [ -e "${tmp_tar}" ]; then rm "$tmp_tar}"; fi
    if [ -d "${tmp_dir}" ]; then rm -rf "${tmp_dir}"; fi
}

# Cleanup on interrupt or terminate signals and on exit.
trap "cleanup" INT TERM EXIT

# Download the samples.
curl --fail --compressed -q -s "${source}" -o "${tmp_tar}"

# Extract the samples.
tar -xzf "${tmp_tar}" -C "${tmp_dir}"
```

In this script we have defined a function called 'cleanup'. We then use the `trap` command to ensure that we call the function if `INT` is sent, `TERM` is sent or when the script exits. This is very useful in scripts that can take a while. This script downloads the effective shell samples from the internet. If the user is having connectivity issues then this might take a while and they may end up aborting the script. If they do so in this case we will still clean up the temporary folder we created.

Traps provide a very convenient way to handle things like cleanup, provide more diagnostic information or even disable a user from interrupting your script. In the example below we force the user to press Ctrl+C twice if they want to interrupt the script:

```bash
interrupt_count=0
on_interrupt() {
    if [ $interrupt_count -lt 1 ]; then
        echo "Aborting this operation can cause errors."
        echo "Press Ctrl+C again if you are sure you want to cancel."
        interrupt_count=$((interrupt_count + 1))
    else
        # Convention is to use the status code 130 for interrupted scripts.
        echo "Aborting long operation"
        exit 130
    fi
}

trap on_interrupt INT

total_time=0
while true; do
    echo "Long operation: ${total_time} seconds elapsed"
    sleep 3
    total_time=$((total_time + 3))
done
```

If we run this script we can see that the user must press Ctrl+C twice to abort the operation:

```
$ ~/effective-shell/scripts/long-operation.sh
Long operation: 0 seconds elapsed
Long operation: 3 seconds elapsed
Long operation: 6 seconds elapsed
^CAborting this operation can cause errors.
Press Ctrl+C again if you are sure you want to cancel.
Long operation: 9 seconds elapsed
Long operation: 12 seconds elapsed
^CAborting long operation
```

Some other things that you might want to be aware of for the trap command are:

- The `SIG` at the beginning of the name of a signal is optional but not supported in all shells, and a signal number can also be used - this means that `SIGINT`, `INT` and `2` are all equivalent options for `trap`, but `INT` is the most portable and easiest to read!
- You can list the signals available with `trap -l` or `kill -l` - but remember that special conditions such as `EXIT` and `RETURN` are not listed, you can find these with `help trap`
- You can stop a signal from being processed with `trap "" INT` - this means that no command will be executed when we receive a `INT`
- You can reset a trap by running `trap - INT`, this will remove any trap handler
- You can test your traps by sending a signal explicitly to your script with `kill -s INT`, providing the name of the signal

## Handling Options

You can use the `getopts` (_parse option arguments_) command to process the arguments for a script or function 

Let's imagine we wanted to update our 'common' command to support the following options:

- `-h` for 'help', which shows command help
- `-e` for 'execute', which takes the number of a command from the list which will be executed

The 'getopts' command takes two parameters. The first is an 'option string', which is a list of the parameter letters that are allowed. The option string for 'getopts' expects that each letter followed by a colon represents an option that requires a value. The second parameter specifies the name of the variable that will be set to the currently processed option. If the option string starts with a colon, it affects how 'getopts' assigns values to the shell variables specified by 'name' and 'OPTARG'. For more detailed information, please refer to the 'man getopts' manual.

Typically this command is used in a while loop, as it will return 'success' until the final option has been processed. A case statement is typically used to process the option:


```bash
# Helper function to show how the command should be invoked.
show_help() {
    echo "usage:"
    echo "  common [-h] [-e <command_number>] count"
}

# Process the options.
while getopts ":he:" option; do
    case ${option} in

        # Handle the 'help' option.
        h )
            show_help
            exit 0
            ;;

        # Handle the 'execute command' option by storing the value provided
        # for the option.
        e )
            execute_command=${OPTARG}
            ;;

        # If we have an invalid argument, warn and fail.
        \? )
            echo "The value '${OPTARG}' is not a valid option"
            exit 1
            ;;

        # If we are missing a required argument, warn and exit.
        : )
            echo "The option '${OPTARG}' requires an argument"
            ;;
    esac
done
```

There are a few things to point out from this script:

- The option string starts with a colon - any option letter that is followed by a colon expects an argument
- If an invalid option letter is set, the value of the option variable is set to `\?` - we can then handle this in our case statement
- If a letter is provided without an argument that is required, the value of the option variable is set to `:` - we can then handle this in our case statement

For complex option processing you might see scripts where multiple loops are used to process sets of options. It is common to end option processing with the following line:

```bash
shift $((OPTIND - 1))
```

The `${OPTIND}` variable stores the index of the last option processed. By shifting by this value minus one, we remove the processed options from the `$@` (all parameters) array. This means we don't try to process the same options again.

The _~/effective-shell/scripts/common.sh_ script processes parameters using the `getopts` command. You can use this as an example to help you with your own scripts.

## Colouring Output

There are special escape sequences that can be used in the shell to colour the output of the text shown. For example, in many terminals the following text will be shown in green:

```bash
green='\e[0;32m'
reset='\e[0m'
echo -e "Do you like ${green}apples${reset}?"
```

On most terminals you will see the text below, with the word 'apples' rendered in green:

```
Do you like apples?
```

Note that it is important to provide the `-e` flag to the 'echo' command so that it correctly processes the colour codes. In fact, a better option is to use the `printf` (_format and print arguments_)<!--index--> command, as it is more portable and behaves more consistently across different versions of Unix and Linux.

The colour codes are ANSI escape sequences that have been defined to control the formatting of content in a terminal. There are number of formatting options - such as foreground and background colours, bold, underline and so on. These codes can be quickly found online if you search for "ANSI color codes".

It is important to be careful when using colour codes - you don't want them in all circumstances. Let' see an example. The 'rainbow' function below writes out a message in a number of colours:

```bash
rainbow () {
    local message="$1"
    local reset='\e[0m'
    for ((colour=31; colour<=37; colour++))
    do
        colour_code="\\e[0;${colour}m"
        printf "${colour} - ${colour_code}${message}${reset}\n"
    done
}
```

If we run this function in most terminals, we'll see the provided message with the colour number in seven different colours:

```bash
$ rainbow hello
31 - test
32 - test
33 - test
34 - test
35 - test
36 - test
37 - test
```

We have to be careful when formatting output. It can be helpful for a user in an interactive shell (on many systems for example even the `ls` command is actually an alias for `ls --color=auto` meaning that the `ls` command uses colours in its output). But there are circumstance when we don't want to use colour codes. Let's see what we get when we write the `rainbow` output to a file:


```
$ rainbow hello >> text.txt
$ cat -v text.txt
31 - ^[[0;31mhello^[[0m
32 - ^[[0;32mhello^[[0m
33 - ^[[0;33mhello^[[0m
34 - ^[[0;34mhello^[[0m
35 - ^[[0;35mhello^[[0m
36 - ^[[0;36mhello^[[0m
37 - ^[[0;37mhello^[[0m
```

The '-v' parameter tells `cat` to make escape characters visible. If you open the in a text editor you will see the same escape characters written in the file.

This shows the problem with the `rainbow` function - it adds the colour escape sequences even when we are writing the results to a file. In most cases this is _not_ going to be what we want. Commands like `ls` do not include colour codes when writing to a file.

There is not an entirely fool-proof way to avoid this issue, but the most common pattern I have seen is to check whether the standard output file descriptor is associated with a terminal. We can do this using the `-t` expression of the `test` command:

```bash
if [ -t 1 ]; then
    echo "We are writing to a terminal"
else
    echo "We are not writing to a terminal"
fi
```

You will see `-t 1` in a number of scripts as a way to check whether the output is going to a terminal device. The `-t` test returns success if the provided file descriptor is associated with a terminal device. The file descriptor '1' is the descriptor for the _stdout_ stream (if this is unfamiliar, check [Chapter 7 - Thinking in Pipelines](../../02-core-skills/07-thinking-in-pipelines/index.md)).

Here's how we could use the test in our rainbow function:

```bash
rainbow () {
    local message="$1"
    local reset='\e[0m'
    for ((colour=31; colour<=37; colour++))
    do
        colour_code="\\e[0;${colour}m"
        if [ -t 1 ]; then
            printf "${colour} - ${colour_code}${message}${reset}\n"
        else
            printf "${colour} - ${message}\n"
        fi
    done
}
```

This version of the function will not write the ANSI escape sequences if the output device is not a terminal, meaning that if we run:

```
$ rainbow test > text.txt
```

Then the output file will not contain escape sequences. You can find out more about the `-t` test by running `man test`.

As a final tip - if you are formatting output you should consider using the `tput` (_query terminfo database_) command<!--index--> to make your code more readable and portable:

```bash
green=$(tput setaf 2) # set ansi foreground to '2' (green)
reset=$(tput sgr0)    # reset the colours
echo -e "Do you like ${green}apples${reset}?"
```

The 'tput' command is quite advanced, but you can search online for more details (the manual pages for the command are hard to decipher as it can be used for many operations and is complex).

The _~/effective-shell/scripts/common.sh_ script includes colourised output and also checks to see whether colour codes should be printed based - you can use this as a reference for your own scripts.

## Checking the Operating System

Different flavours of Unix and Linux can behave quite differently. A common requirement is to write scripts that are portable and can be used across systems. However, this is not always possible. There are times when we need to check to see whether we are on a specific operating system and take a specific action.

You will often see the `uname` (_show operating system name_) command used to check the operating system:

```bash
case "$(uname)" in
    Darwin)
        os="OSX"
        ;;

    Linux)
        os="Linux"
        ;;

    CYGWIN*|MINGW32*|MSYS*|MINGW*)
        os="Windows"
        ;;

    SunOS)
        os="Solaris"
        ;;

    *)
        echo "Unsupported operating system"
        exit 1
        ;;
esac
echo "Your OS is: ${os}"
```

The _~/effective-shell/scripts/common.sh_ script checks to see whether the operating system is OSX and if so, temporarily aliases the text commands such as `sed` to their GNU equivalent, as the OSX versions of the commands are based on BSD so have slightly different parameters. You can use this script as an example of how to deal with OSX in shell scripts that are designed to be used on Linux as well as OSX.

## Checking for Installed Programs

As we saw in [Chapter 10 - Understanding Commands](../../02-core-skills/10-understanding-commands/index.md) there are many different ways to determine whether a command is available. The most correct and portable way to test to see whether a command is available is to use the `command -v` command as shown below:

```bash
if ! command -v "curl" >/dev/null 2>&1; then
    echo "'curl' is not installed, please install and try again"
fi
```

Note that when we're using the `command` command, we silence error output and standard output. This is required because otherwise we would see an error message written to the screen if the command doesn't exit or would see the details of the command if it does exist.

The _~/effective-shell/scripts/common.sh_ script checks to see whether certain GNU versions of tools are installed when running on OSX. You can refer to this script for an example of checking for the presence of commands.

## Using 'Select' to Show a Menu

The `select` compound command<!--index--> prints a menu and allows the user to make a selection. It is not part of the Posix standard, but is available in Bash and most Bash-like shells.

Here's how we could ask a user to select their favourite fruit from a list:

```bash
select fruit in Apple Banana Cherry Durian
do
    echo "You chose: $fruit"
    echo "This is item number: $REPLY"
done
```

If we run these commands we will see output like the below:

```
1) Apple
2) Banana
3) Cherry
4) Durian
#? 1
You chose: Apple
This is item number: 1
#? 3
You chose: Cherry
This is item number: 3
#? 4
You chose: Durian
This is item number: 4
#? ^D
```

Notice that `select` will run just like an infinite loop - after the statements in the select body are run, the selection is offered again. The user can either end transmission with the `^D` character or press `^C` to quit.

You will normally see the `select` used with a `case` statement to process the selection. This is something you may come across in scripts so is useful to be aware of.

## Running Commands in Subshells

You will often see a nice little trick that allows you to change the current directory for a specific command, without affecting the current directory for the shell.

Here's how this trick will look:

```bash
(mkdir -p ~/new-project; cd ~/new-project; touch README.md)
```

The brackets around the statements mean that these commands are run in a sub-shell. Because they run in a sub-shell, they change the directory in the sub-shell only, not the current shell. This means we don't need to change _back_ to the previous directory after the commands have completed.

This sequence of commands would create a new folder (we use `mkdir -p` so that if the folder exists the command does not fail), then change to the folder, then create a new file called _README.md_.

## Anti-Patterns

Anti-patterns are techniques that you may see but should be avoided. I have noted a few here as you will likely see them in your travels and should know why they are problematic.

### Configuring Options in Shebangs

You will sometimes see shebangs in shell scripts that contain options, like so:

```bash
#!/usr/bin/bash -ex

# Script contents below...
```

It is possible to specify the arguments to the program that is used to execute the script in the shebang. In the case above, the `-ex` flags are passed to the `bash` program, enabling the 'exit on error' and 'trace' options.

I include this pattern because it is possible you will see it in other scripts, but please do not do this. There are two particular reasons that it is risky.

The first is that pattern requires that you know the path to the shell. As we saw in [Chapter 18 - Shell Script Essentials](../../04-shell-scripting/18-shell-script-essentials/index.md), we should use the `#!/usr/bin/env` program so that we search the `$PATH` for the shell rather than assuming that we know the location of the shell program.

The second reason is that multiple parameters are not handled consistently across operating systems. For example, on some Unix systems the following shebang will run `bash` with the `-e` parameter:

```
#!/usr/bin/env bash -e
```

However, on many Unix distributions only one parameter is passed. This would mean that the `-e` parameter would be silently ignored, which would be very confusing for the reader.

### Complex Logic in Shell Scripts

The shell is amazing. Considering how long it has been around, it has in many ways changed remarkably little in the last few decades. This is a testament to the genius of the design of Unix systems and the shell in general.

However, the shell is _not_ generally going to be the best choice for any kind of complex logic or work. Shell scripts are great for automating simple tasks, creating utilities to help you out, but come with many challenges. The syntax can be confusing, making scripts work across multiple systems can be challenging, and there are not many features to help you write robust code.

Perhaps the biggest anti-pattern in shell scripts is to simply let them get too large and do too much with them. There comes a certain point where you will almost certainly create a more portable, performant and maintainable solution to your problem using a dedicated programming language like Python (which is available on almost all systems) or one of the many other languages available.

This is a topic we discuss in detail in the [Chapter 30 - How to Avoid Scripting](../../06-advanced-techniques/30-how-to-avoid-scripting/index.md), but for now I would just say that as soon as your script starts to get longer than a page, or takes more than a few minutes to reason about, then you might be reaching the point that a programming language could be a better option.

### Scripts without Shebangs

You might find shell scripts that do not have a shebang at the top. This is something that you should avoid. The shebang gives you a way to be very explicit about _what_ shell is required to run your script.

For example, if I see a shebang like this:

```bash
#!/usr/bin/env sh
```

Then my assumption would be that this script can run on _any_ Posix compliant shell, i.e. it is as compatible as possible. However, if I see this:

```bash
#!/usr/bin/env bash
```

Then the assumption would be that this script is Bash-specific and uses "Bash-isms", such as the `if [[ conditional ]]` construct. Finally, if I was to see a shebang like this:

```bash
#!/usr/bin/env zsh
```

Then I would expect that this script has been explicitly written to be used with Z-Shell.

If you do not include a shebang in a script, then the behaviour can be ambiguous. For example, at the time of writing, if you run a shell script without a shebang from a Bash shell, then the script will be run using a new instance of Bash. However, if you run a shell script without a shebang from Z-Shell then Z-Shell will use `sh` from your path. But depending on your system, `sh` may be a symlink to `dash`, or `bash`, or another shell.

Scripts that do not have shebangs are inherently ambiguous and will run using different shells depending on the shell used to execute the script as well as the operating system.

If you want to experiment and see what shell runs a script, create a script such as the _~/effective-shell/scripts/nobang.sh_ script that looks like this:

```bash
# nobang: This script shows an anti-pattern - not using a shebang in a shell
# script. It shows the process tree to for the shell that runs the script:
pstree $$
```

If I run this script from MacOS, the output below is shown:

```
-+= 00001 root /sbin/launchd
 \-+= 07995 dwmkerr tmux
   \-+= 31195 dwmkerr /bin/zsh
     \-+= 49833 dwmkerr sh ./samples/script/nobang.sh
       \-+- 49834 dwmkerr pstree -p 49833
         \--- 49835 root ps -axwwo user,pid,ppid,pgid,command
```

Although I ran the script from a Z-Shell session, it was executed with `sh`, which is the Bourne Shell (version 3 on my system).

The only time you should omit the shebang is if you expect the script to be _sourced_ - we will see sourcing in the next part of the book.

## Summary

In this chapter we saw an assortment of common patterns that can be useful when building shell scripts. In the next part of the book we're going to look at how you can customise your shell and environment to build your own toolkit!

[^1]: The value shown before each trace line can be configured by setting the `$PS4` variable.
