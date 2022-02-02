---
title: 'Functions, Parameters and Error Handling'
slug: '/part-4-shell-scripting/functions-parameters-and-error-handling'
---

The shell allows you to create _functions_ - a set of commands that you can call at any time. In this chapter we'll see how to create functions and how function parameters and script parameters are handled. We will also look at status codes for commands and scripts and error handling.

## Creating a Function <!-- index -->

A _function_ has the following structure:

```
<function-name> {
    <function-command 1>
    <function-command 2>
    <function-command n>
}
```

First we specify the name of the function. Then between a set of opening and closing curly braces, we list the commands that should be executed when we call the function.

Let's take a look at a very simple function in action:

```bash
title() {
    echo "My Script version 1.0"
}
```

This script defines a very simple function called _title_ that prints out a message. We call the function in the same way we would call any command in the shell, by simply writing the name of the command and hitting enter. Here's how we would call the function:

```
$ title
My Script version 1.0"
```

Easy! Functions let you structure commands into logical blocks and can help make your scripts easier to read and manage.

## Variables in Functions

A function can read and write to any variables in the current shell session. Here's an example:

```bash
# Set some variables.
title="My Cool Script"
version="1.2"
succeeded=0

# Create a function that writes a message and changes a variable.
title() {
    # Note that we can read variables...
    title_message="${title} - version ${version}"
    echo "${title_message}"

    # ...and set them as well.
    succeeded=1
}

# Show the value of 'succeeded' before and after the function call.
echo "Succeeded: ${succeeded}"
title
echo "Succeeded: ${succeeded}"
echo "Title Message: ${title_message}"
```

The output of this script will be:

```
Succeeded: 0
My Cool Script - version 1.2
Succeeded: 1
Title Message: My Cool Script - version 1.2
```

This demonstrates that functions can use the variables that are available in the shell. They can also set variables. We can also create new variables in functions.

### Variable Scoping <!--index-->

If you come from a programming background you might find it odd that you can create a variable in a function and use it outside of the function. This is a feature known as _dynamic scoping_. Many common programming languages like Python, JavaScript, C, Java and others use an alternative mechanism called _lexical scoping_.

Lexical scoping is a feature that ensures that you can only use a variable from within the 'scope' that it is defined. This can reduce errors - because it means that if you define a variable in a function you don't accidentally 'overwrite' the value of another variable that is used elsewhere.

You can use the 'local' keyword to define a variable that is only available in the 'local' scope, i.e. the function that it is defined in. This allows you to use lexical scoping and can reduce the risk of errors. Here's an example:

```bash
run_loop() {
    local count=0
    for i in {1..10}; do
        # Update our counter.
        count=$((count + 1))
    done
    echo "Count is: ${count}"
}
```

Let's see what happens if we run function:

```
$ run_loop
Count is: 10
$ echo "Count: ${count}"
Count:
```

Notice that because we declared the _count_ variable using the 'local' keyword, it is only available inside the _run_loop_ function. If we try and access it outside of the function it is undefined.

In general, you should use 'local' variables inside functions. This can help to avoid problems where calling a function can have an unintended side effects:

```bash
# Set a count variable somewhere in our script...
count=3

# Call our 'run_loop' function.
run_loop

# Write out the value of 'count'.
echo "The 'count' variable is: ${count}"
```

The output of this script is:

```
Count is: 10
The 'count' variable is: 3
```

Notice that even though we used a variable named _count_ in the _run_loop_ function, we did not overwrite the value that was set outside of the function. If we were to run the same script but not use the 'local' keyword for he count variable, we would get the following output:

```
Count is: 10
The 'count' variable is: 10
```

In this case calling the function changes the 'count' variable that is outside of the function. In most cases this is not going to be what you want and will just lead to unexpected behaviour later on.

## Passing Parameters to Functions

You can pass any number of parameters to a shell function. To get the value of a parameter, we can use special built-in variables that represent each parameter. Let's take a look at an example:

```bash
sum() {
    local value1=$1
    local value2=$2
    local result=$((value1 + value2))
    echo "The sum of ${value1} and ${value2} is ${result}"
}
```

Let's see how we can pass parameters to this function:

```
$ sum 3 6
The sum of 3 and 6 is 9
$ sum 10 33
The sum of 10 and 33 is 43
```

In this script we have used the special `$1` and `$2` built-in variables to get the value of the first and second parameters. At the beginning of the function I have put these variables into local variables that have more descriptive names. This is purely to make the script more readable, I could also have written the function like this:

```bash
# Create a function that calculates the sum of two numbers.
sum() {
    echo "The sum of $1 and $2 is $(($1 + $2))"
}
```

For a short and simple function you might just use the special parameter variables directly like above. However for anything more complex than a one-line script I think that it is generally more readable to create a local variable with a more descriptive name.

### Parameter Variables

There are a number of special parameter variables that the shell provides. Let's see a few in action:

```bash
# Create a function that sums a set of numbers.
sum() {
    local total=0
    for value in $@; do
        total=$((total + value))
    done

    # Write out the result.
    echo "Summed $# values for a total of: ${total}"
}
```

We can call this function with any number of parameters:

```
$ sum 1 2 3 4 5
Summed 5 values for a total of: 15
```

In this script we've used two special variables. The `$@` variable is expanded into a list of all of the function parameters. The `$#` variable contains the number of parameters provided to the function.

You might recognise that these variables look quite similar to the syntax that is used to get the members of an array or the length of an array as described in [Chapter 19 - Variables, Reading Input, and Mathematics](../../part-4-shell-scripting/variables-reading-input-and-mathematics). You can actually use some of the array-style operators with the special parameters variable:

```bash
# Show the top 'n' values of a set.
show_top() {
    local n=$1
    local values=${@:2:n}
    echo "Top ${n} values: ${values}"
}
```

We can call this function with any number of parameters. The first parameter specifies how many of the subsequent parameters we will show:

```
$ show_top 3 10 20 30 40 50
Top 3 values: 10 20 30
```

We have used the 'range' operator on the `$@` variable to get a subset of the parameters. This script is a little odd to read because when we set the 'values' parameter we need to 'skip' past the first positional parameter, because the first positional parameter is the number of values to show.

The table below shows some of the common variables you can use when working with function parameters:

| Variable           | Description                                                                                   |
|--------------------|-----------------------------------------------------------------------------------------------|
| `$1`               | The first parameter                                                                           |
| `$2`               | The second parameter                                                                          |
| `${11}`            | The 11th parameter - if the parameter is more than one digit you must surround it with braces |
| `$#`               | The number of parameters                                                                      |
| `$@`               | The full set of parameters as an array                                                        |
| `$*`               | The full set of parameters as a string separated by the first value in the `$IFS` variable    |
| `${@:start:count}` | A subset of 'count' parameters starting at parameter number 'start'                           |

The `$@` and `@*` parameters look quite similar. The first one is an array, just like we saw in [Chapter 19 - Variables, Reading Input, and Mathematics](../../part-4-shell-scripting/variables-reading-input-and-mathematics). The second version is the parameters collected together into a single string separated by spaces (actually, separated by the first character in the `$IFS` variable).

### Parameter Shifting

We can use the `shift` (_shift positional parameters_)<!--index--> to remove a number of parameters from the beginning of the position parameters list and 'shift' the remaining parameters to take their place.

This is a little hard to describe so let's see how we can use it to simplify our _show_top_ function:

```bash
# Show the top 'n' values of a set.
show_top() {
    # Grab the number of values to show, then shift.
    local n=$1
    shift

    # Get the set of values to show. Notice that we start in position 1 now.
    local values=${@:1:n}
    echo "Top ${n} values: ${values}"
}
```

After we get the value of the first parameter, we 'shift', removing it from the list of positional parameters so that we can deal with the remaining parameters. I would avoid using 'shift' too much - if you find that you are having to write complex code to shift parameters around you might be better using a programming language rather than the shell for the task you are performing!

## Return Values

You can return a value from a shell function in two ways. The first is to simply set the value of a variable, like so:

```bash
is_even() {
    local number=$1

    # A number is even if when we divide it by 2 there is no remainder.
    # Set 'result' to 1 if the parameter is even and 0 otherwise.
    if [ $((number % 2)) -eq 0 ]; then
        result=1
    else
        result=0
    fi
}
```

A function could set any number of variables to provide output. Here's how we could use the _is_even_ function:

```
$ number=33
$ is_even $number
$ echo "Result is: $0"
Result is: 0
```

In general, this method of returning values from a function should be avoided, for the reasons we've discussed already in this chapter. It overwrites the value of a global variable and that can be confusing for the operator.

A more common way to return a value from a function is to write its result to _stdout_ - let's look at this in detail.

## Writing Results to Stdout

If we write our result to _stdout_, then we can capture the result of a function in a far more readable way:

```bash
lowercase() {
    local params="$@"
    # Translate all uppercase characters to lowercase characters.
    echo "$params" | tr '[:upper:]' '[:lower:]' 
}
```

In this example we write the result of the function to _stdout_. This means that we can capture the result and put it in another variable by simply executing the command in a subshell:

```
$ result=$(lowercase "Don't SHOUT!")
$ echo "$result"
don't shout!
```

If you have a programming background it might seem very strange that you write results in a function by writing to _stdout_. Remember - the shell is a text based interface to the computer system. The majority of commands that we have seen so far that provide output write their output to the screen. This is what `ls` does, what `find` does, what `cat` does and so on. When we `echo` a result from a function, we are really just following the Unix standard of writing the results of a program to the screen.

This is important - if we run our function directly in a shell, we can see the result written to the screen:

```
$ lowercase "PLEASE don't SHOUT!"
please don't shout!
```

Remember - shell functions are designed to behave in a similar way to shell commands. They write their output to _stdout_.

### Dealing with Output in Commands

Although it might feel a bit clunky, writing the results of a command to _stdout_ is a tried and tested method of returning results. However, we need to be careful. Let's take a look at an example to see why!

```bash
# This function creates a temporary folder for today and returns its path.
temp_today() {
    # Get today's date in the format YYYY-MM-DD.
    local today=$(date +"%Y-%m-%d")

    # Create a temporary directory for today and return it.
    tmpdir_today="/tmp/${today}"
    echo "Creating folder '${tmpdir_today}'..."
    mkdir -p "${tmpdir_today}"
    echo "${tmpdir_today}"
}
```

This function creates a temporary folder that is based on the current date. If we try and grab the result of the function and change to that folder then the script will fail:

```bash
# Go to today's temporary folder.
folder=$(temp_today)
cd "${folder}"
```

This script fails, with the output:

```
'Creating folder \'/tmp/2021-05-28\'...\n/tmp/2021-05-28': No such file or directory
```

What's going on here?

Well in the _temp_today_ function we wrote a message halfway through the function, showing the name of the folder that would be created. This message is part of the output of the function. Even though in the last line we echo the path to the folder, the output of the command is _all_ of the text we have written.

It is important to remember that any command you call in a function that might write to _stdout_ could cause problems as it could write text to your output:

```bash
command_exists() {
    if type "$1"; then
        echo "1"
    else
        echo "0"
    fi
}
```

What happens when we try and store the result of the function in a variable?

```
$ result=$(command_exists "touch")
$ echo "Result is: ${result}"
Result is: touch is hashed (/usr/bin/touch)
1
```

This is not a well written function, we'll look at a better way to write it next. But it shows an important challenge to be aware of - when `type` is used to find out whether a command exists it returns success if the command exists but also writes to _stdout_.


In [Chapter 7 - Thinking in Pipelines](../../part-2-core-skills/thinking-in-pipelines) we saw that we can send the output of a command to the 'null' device to silence its output. We can use this trick in our functions to stop commands from 'polluting' our result:
T

```bash
command_exists() {
    if type "$1" >> /dev/null; then
        echo "1"
    else
        echo "0"
    fi
}
```

Now if we run this command we will not get the output from the `type` command in our result - the output was redirected to the null device.

### Returning Status Codes

The `return` (_return from shell function_)<!--index--> command causes a function to exit with a given status code.

This is something that often causes confusion in shell scripts. The reason is that in most programming languages, you would use a 'return' statement to return the result of a function. But in the shell, when we return, we set the _status code_ of the function.

What is a status code? We actually touched on this in [Chapter 20 - Mastering the If Statement](../../part-4-shell-scripting/mastering-conditional-logic). When a command runs, we expect it to return a _status code_ of 'zero' to indicate success. Any non-zero status code is used to specify an _error code_.

Let's see how we could re-write the _command_exists_ function to set a status code:

```bash
command_exists() {
    if type "$1" >> /dev/null; then
        return 0
    else
        return 1
    fi
}
```

Now that our command sets a status code properly, we can use it in an 'if statement' like so:

```bash
if command_exists "common"; then
    echo "The 'common' command is installed on your system"
else
    echo "The 'common' command is not installed on your system"
fi
```

Remember - only use the 'return' command to set a status code. Many shells will only allow values from 0-255 to be set, and most users will expect that a command should return zero for success and that any non-zero value is an error code. If you need to provide output for a command that is not just a status code, you should write it to _stdout_ or if you must, set the value of a global variable.

The result of the last executed command is always available in the special variable `$?`. Here's how you could use it:

```
$ type "test"
test is a shell builtin
$ echo "Result: $?"
Result: 0
```

## Error Handling

When you run a shell script, if a command in the script fails, the script will continue to run. Like many other points in this chapter this might seem unintuitive if you come from a programming background, but this makes sense in the shell - if the shell was to terminate whenever a command fails it would be very difficult to use interactively.

Let's create a script called 'today' that makes a new temporary folder each day, then puts a link to that folder in our home directory:

```bash
#!/usr/bin/env sh

# Get today's date in the format YYYY-MM-DD.
today=$(date +"%Y-%m-%d")

# Create the path to today's temp folder and then make sure the folder exists.
temp_path="/tmp/${today}"
mkdir -p "${temp_path}"

# Now that we've created the folder, make a symlink to it in our homedir.
ln -sf "${temp_path}" "${HOME}/today" 

# Write out the path we created.
echo "${temp_path}"
```

Now we can run the script to create temporary folder for the current day and a link to it in our home directory:

```
$ chmod +x ./today.sh
$ ./today.sh
/tmp/2021-05-28
$ cd ~/today
```

In this example we created a new directory in the _tmp_ folder and created a link to it in our home directory. But what happens if we cause one of the commands to fail?

First, let's clean up the folder we created:

```
$ rm -rf $(./today.sh)
$ rm ~/today
```

Now we'll create a file where we want to put our 'today' folder:

```
$ touch "/tmp/$(date +"%Y-%m-%d")"
```

If we run our script now, we can see a problem:

```
$ ./today.sh
mkdir: /tmp/2021-05-28: Not a directory
/tmp/2021-05-28
$ cd ~/today
bash: cd: /home/dwmkerr/today: Not a directory
```

The `mkdir` command failed - because there was a _file_ in the location where we wanted to create the folder. But the script kept on running - meaning that it created a symlink to this file. Now when we try to move to the `today` folder we get another error - it is a link to a file not a folder.

In general in your shell scripts if a command fails you probably want the entire script to stop executing. Otherwise you can get this cascading effect as commands continue to return even after there was a failure, which can lead to all sorts of unexpected behaviour.

You can use the `set` (_set option_) command to set an option in the shell. There is an option that tells the shell to exit when a command fails. Here's how we would use it:

```
#!/usr/bin/env sh

# Exit if any command fails.
set -e

# ...
```

The 'set' command allows you to turn on and turn off shell options. The 'e' option means 'exit if any command exits with a non-zero status'.

Now let's clean up again:

```
$ rm -rf $(./today.sh)
$ rm ~/today
```

And finally, we'll run the same script after creating the file that will cause a failure:

```
$ touch "/tmp/$(date +"%Y-%m-%d")"
$ ./today.sh
mkdir: /tmp/2021-05-28: Not a directory
```

In this case the script stopped running as soon as there was a failure - after the `mkdir` command failed.

One thing to be aware of is that the `set -e` option only affects the _final_ command of a pipeline. This means that if you have a pipeline such as the below:

```
grep '[:space:]*#' ~/effective-shell/scripts/common.sh | tr 'a-z' 'A-Z'
```

Then the script will still run if the `grep` command fails. To ensure that the shell terminates if a command in a pipeline fails we must set the `pipefail` option:

```bash
set -o pipefail
```

If you set your scripts up so that they fail on errors (and this is probably something you should always do), then remember to make sure that commands that you expect _might_ fail are properly handled.

For example, if we want to delete a file in script but don't want to stop if the deletion fails for some reason, we could use an `if` block to 'catch' the error and show a warning:

```bash
if ! [ rm ~/my-file.text ]; then
    echo "warning: unable to delete file"
fi
```

Another option would be to use a conditional expression:

```bash
rm ~/my-file.txt || true
```

This expression always evaluates to 'true' so will not stop the script if an error occurs when running the `rm` command.

## The Function Keyword

In some scripts you might see functions defined using the `function` keyword, as below:

```bash
function title() {
    echo "My Script version 1.0"
}
```

The 'function' keyword is not required. The keyword is available in Bash and similar shells. Using the function keyword has a minor benefit that it does not lead to an error if you have already defined an _alias_ with the same name as the function you are declaring. However, the drawback is that it is less standard and therefore less portable.

I would recommend that you do not use the 'function' keyword. Firstly, this will make your scripts more portable. Secondly, if your function is going to clash with the name of an alias that has already been defined, I would actually think that it is better that the script fails. Better to fail early and realise there is clash than to silently overwrite the alias which may cause unexpected errors later on when something else tries to call the alias and calls your function instead!

## Parameters and Status Codes for Scripts

Everything we have learned about parameters applies to scripts themselves. We can pass parameters to scripts and read them with the special variables such as `$1`, `$2` and so on.

The only difference is that instead of using the `return` command when we want to exit a script with a status code, we use the `exit` (_exit the shell_)<!--index--> command. The exit command exits the current shell with the provided status code.

Be careful when using the `exit` command - if you are running a script then it is fine to use `exit`, it will simply close the subshell that the script is running in. But if you type `exit` in your shell that you are using interactively, it will close it.

## Updating the 'common' Command

In the previous chapter we created the `common.v4.sh` command, that shows common commands from the users shell history.

If you need a refresher on what is in the script, you can view it in your pager with:

```bash
less ~/effective-shell/scripts/common.v4.sh
```

The output of the command will look something like:

```
1: 280 gst
2: 144 vi
3: 84 gc
4: 72 ga .
5: 62 gl
6: 54 ls
7: 50 gpo
8: 48 gcm
9: 45 make dev
10: 44 gpr
```

Let's make a couple of changes.

First, let's make sure we exit the script if one of the commands fails:

```bash
# Exit if any command fails.
set -e
```

Next, we will update the script on line 7 so that we use the first parameter as the command count. If the first parameter is not set, we default to ten:

```
# ...
command_count=${1:-10} # The number of common commands to show
# ...
```

Here we are using the `$1` variable. But we are also using _Shell Parameter Expansion_ as described in [Chapter 19 - Variables, Reading Input, and Mathematics](../../part-4-shell-scripting/variables-reading-input-and-mathematics) to provide a default value to use if the parameter is not set.

Next, let's change the line that writes out the count and the name of the command. At the moment, the count is shown and then the command name. Let's write a function that takes a number and line of text and writes it as a line of text with the number _after_ the text and in brackets:

```bash
write_command_then_count() {
    # Get the command and count, this will be text that looks like:
    #   '43 git commit'
    # Then write the command and the count afterwards.
    local line="$1"
    local count=$(echo "${line}" | cut -d' ' -f1)
    local command=$(echo "${line}" | cut -d' ' -f2-)
    echo "${command} (${count})"
}
```

We can now re-write our loop to make it a little cleaner:

```bash
for command in $commands
do
    echo "$counter: $(write_command_then_count "$command")"
    counter=$((counter + 1))
done
```

The updated script is in the samples folder at _~/effective-shell/scripts/common.v5.sh_, you can update your link to point to this version by running the `ln` command:

```bash
ln -s ~/effective-shell/scripts/common.v5.sh /usr/local/bin/common
```

Now when we run this command we can optionally provide the number of commands to show as a parameter. The output also is shown with the number of times the command has been called _after_ the command text itself:

```
$ common 5
common commands:
1: gst (139)
2: vi (74)
3: gc (42)
4: ga . (36)
5: gl (31)
```

## Summary

In this chapter we looked at how to use functions to provide more structure to our shell scripts, and also how to use parameters, return values and status codes.

In the next and final chapter of this section, we'll look at some more advanced techniques that can be useful when writing shell scripts.
