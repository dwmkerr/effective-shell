---
title: "Understanding Shell Expansion"
weight: 29
---

# Chapter 29 - Understanding Shell Expansion

When you are working with the shell there are a number of techniques that you can use to take simple commands and make more useful. For example, if we wanted to create three files, we could run `touch file1 file2 file3`, or we could use 'brace expansion' and just run `touch file{1..3}`. Another example would be to delete all files that have names that start with `file` - like this `rm file*`, this is wildcard expansion.

Collectively, these features are called 'Shell Expansion'. I think that introducing the entire set of features that make up shell expansion in one go can be a bit overwhelming, but now that we are in the advanced chapters it makes sense to understand exactly what shell expansion is, when it occurs, when it doesn't and how understanding it can make you a more effective user.

There are seven types of expansion that occur in the shell - in this chapter we'll look at each in detail and then see how they work together.

# What is Shell Expansion?

When the shell receives a command, either from the user typing at the keyboard, or from a shell script, it breaks it up into words. After this happens, the shell performs seven operations on the words, which can change how they are interpreted. These seven operations are collectively known as 'shell expansion'. You are probably familiar with most of them as we have used them throughout this book.

The seven operations that the shell performs are:

1. Brace Expansion - expanding values between braces, such as `file{1..3}` into `file1 file2 file3`
2. Tilde Expansion - expanding the `~` tilde symbol for the home directory into the path to the home directory, such as `~/effective-shell` into `/home/dwmkerr/effective-shell`
3. Parameter Expansion - expanding terms that start with a `$` symbol into parameter values, such as `$HOME` into the value of the variable named `HOME`
4. Command Substitution - evaluation of the contents of `$(command)` sequences, which are used to run commands and return the results to the shell command line
5. Arithmetic Expansion - evaluation of the contents of `$((expression))` sequences, which are used to perform basic mathematical operations
6. Word Splitting - once all of the previous operations are run, the shell splits the command up into 'words', which are the units of text that you can run loops over
7. Pathname Expansion - the shell expands wildcards and special characters in pathnames, such as `file*.txt` into the set of files that are matched by the sequence

If you want to see each of these operations in the manual, you can run `man bash` and search for the text `^EXPANSION`. Now let's see how each operation works in more detail. Once we've done this, we'll take a look at some gotchas for how they work together.

# Shell Expansion

Let's take a look through each of the forms of shell expansion that are available to use.

## Brace Expansion

Brace expansion<!-- index --> is the first shell expansion operation that occurs, it expands a simple expression that represents a sequence or range of characters.

In the examples below I'll show the expression on the first line and then what it expands to on the second line. The first example expands a set words or characters:

```sh
mkdir /tmp/{one,two,three}

# The line above is expanded to:
mdkir /tmp/one /tmp/two /tmp/three
```

Expansions of sets like this are a great way to perform operations that work on multiple files or folders at once.

We can also create sequences of numbers or characters:

```sh
touch file{1..5}.txt

# The line above is expanded to:
touch file1.txt file2.txt file3.txt file4.txt file5.txt
```

You as well as specifying the start and end of a sequence, you can specify the increment, you might see this in for loops like this:

```sh
for x in {0..10..2}; do print $x; done

# The line above is expanded to:
for x in 0 2 4 6 8 10; do print $x; done
```

## Tilde Expansion

If a word starts with a `~` tilde character, then the shell will expand the tilde into the value of the `$HOME` variable:

```sh
cd ~/effective-shell

# The line above is expanded to:
cd $HOME/effective-shell
```

If we were to unset the `$HOME` variable, then the expansion would use the current user's home directory:

```sh
unset HOME
cd ~/effective-shell

# The line above is expanded to:
cd /home/dwmkerr/effective-shell
```

Tilde expansion is very simple!

## Parameter Expansion

When the dollar symbol `$` is used, this indicates that the shell is going to perform _parameter expansion_, which expands variables or the parameters of a script. It can also be used to indicate _command substitution_ or _arithmetic expansion_ - which we will see once we've looked at parameter expansion.

A lot of these expansions are covered in detail in [Chapter 19 - Variables, Reading Input, and Mathematics]({{< relref "/docs/part-4-shell-scripting/variables-reading-input-and-mathematics" >}}) but I have included each of the available expansions here for reference.

In it's most simple form, parameter expansion simple replaces the name of a variable or parameter with its value:

```sh
fruit=apples
echo "I like $fruit"

# The line above is expanded to:
echo "I like apples"
```

When using parameter expansion it is generally preferable to surround the name of the parameter with braces - this allows you to tell the shell unambiguously what the name of the parameter is. For example:

```sh
echo "My backup folder is: ${HOME}backup"

# The line above is expanded to:
echo "My backup folder is: /home/dwmkerrbackup"
```

If we had _not_ used braces, then the shell would expand the expression like so:

```sh
echo "My backup folder is: $HOMEbackup"

# The line above is expanded to:
echo "My backup folder is: "
```

The reason that the expansion doesn't work as expected in this case is that the shell is trying to expand a parameter with the name `HOMEbackup` - the braces used in the first example make it clear to the shell that the parameter name is `HOME` and that the text `backup` should be added at the end of the expanded value.

There are a number of additional features available for parameter expansion that can make it more convenient. Let's look at each of them now.

**Default Values**

The expression `${parameter:-default}` will expand to the value of the parameter named `parameter` - but if that value is not set, then the value `default` is used. This can be convenient if you want to provide a value for the shell to use when a parameter is not set.

**Assign Default Values**

The expression `${parameter:=default}` will expand to the value of the parameter named `parameter` - but if that value is not set, then the value `default` is used. In this case, `parameter` is also set to `default`. This means that this expression works just like the 'default values' expression above, but also sets the parameter at the same time.

**Display Error if Null or Unset**

The expression `${parameter:?message}` tells the shell to expand to the value of `parameter`, and if that value is null or unset, to instead write the message `message` to standard error and exit (unless the shell is interactive, in which case the shell is not closed).

This can be a convenient way to put a 'guard' in place to ensure that a script aborts if a value is not set. Here's an example of how this can be used:

```sh
backup_location=${BACKUP_DIR:?Please set BACKUP_DIR to use this script}
cp -r ~/effective-shell ${BACKUP_DIR}
```

In this script we copy the _~/effective-shell_ folder to the folder set in the `BACKUP_DIR` parameter. However, if that parameter has not been set then the script will abort and show an error message telling the operator that the `BACKUP_DIR` parameter must be set.

**Use Alternate Value**

The expression `${parameter:+alternate}` expands to an empty string if `parameter` is null or unset. However, if `parameter` _has_ a value, then the value of `alternate` is used instead.

**Offset and Length**

You can tell the shell to expand only a subset of the value of a parameter by using the `${parameter:offset}` expression. In this case, the shell will expand the value of `parameter`, but skip `offset` number of characters from the beginning:

```sh
echo "My home folder name is: ${HOME:6}"

# The line above is expanded to:
echo "My home folder name is: dwmkerr"
```

You can also specify how many characters should be used by providing a `length` value after the offset with the expression `${parameter:offset:length}`:

```sh
echo "The error message is: ${error_message:0:64}"
```

In the expression above, only up to the first 64 characters of the parameter `error_message` will be shown.

The offset and length values can also be used with arrays:

```sh
days=("Monday" "Tuesday" "Wednesday" "Thursday" "Friday" "Saturday" "Sunday")
echo "${days[@]:2:3}"

# The line above is expanded to:
echo "Tuesday Wednesday Thursday"
```

It is important to note that when using this technique with arrays, you must specify the array name and then `[@]` after the array name, to indicate that you want to work with all of the members of the array. If you _don't_ do this, the entire array is converted into a single string and the resulting string has the offset and length applied.

**Expand Variable Names**

The `${!name*}` expression evaluates to the _name_ of every parameter that starts with the text `name`. You can use this expression to find the full set of parameters that match a certain pattern.

How might this be useful? One nice trick is to use it to tidy up scripts. For example, if you are writing a script and create a set of variables for internal use, you could use this expression to find the names of all of the variables you have created and clean them up:

```sh
_es_download_folder=~/downloads
_es_backup_folder=~/backups
_es_download_address=https://effective-shell.com/downloads/effective-shell-samples.tar.gz

# At this point we might have a script that uses the variables above...

# Now clean up any variables we created.
for var_name in ${!_es_*}
do
    echo "Cleaning up: ${var_name}..."
    unset ${var_name}
done
```

This is rather an advanced technique but it does show how the 'expand variable names' expansion can be useful.

**Array Expansion**

This topic is covered in detail in Chapter 19. The expression `${!array[@}` expands to the indices (or 'keys') for each item in an array:

```sh
days=("Monday" "Tuesday" "Wednesday" "Thursday" "Friday" "Saturday" "Sunday")
echo "${!days[@]}"

# The line above is expanded to:
echo "0 1 2 3 4 5 6"
```

This expansion is convenient if you do not know the keys that make up an array and want to loop through them.

**Parameter Length**

The `${#parameter}` expression expands to the length of the value in the parameter named `parameter`.

You can also use this expression to find the length of an array - just add the `[@]` subscript like so `${#array[@]}`:

```sh
days=("Monday" "Tuesday" "Wednesday" "Thursday" "Friday" "Saturday" "Sunday")
echo "There are ${#days[@]} days in the array"

# The line above is expanded to:
echo "There are 7 days in the array"
```

You may have noticed at pattern by this point - many of the expansions that can be performed on a parameter can _also_ be performed on an array, just by adding the `[@]` subscript to the parameter name. Think of this subscript as saying 'all of the array members' - without it the shell combines all of the array members into a single string and performs the substitution on the result.

**Remove Pattern from Front**

You can use the `${parameter#pattern}` expression to expand the value of `parameter`, removing `pattern` from the front of the value:

```sh
address=https://effective-shell.com
echo "Address: ${address#https://}"

# The line above is expanded to:
echo "Address: effective-shell.com"
```

You can also tell the shell to remove as many sequential matches of `pattern` as possible, by using the `${parameter##pattern}` expression. This can be useful to strip out all of the characters up to a certain point in a parameter:

```sh
folder=/home/dwmkerr/backups/2021-10-19
echo "Today's backup folder is: ${folder##*/}"

# The line above is expanded to:
echo "Today's backup folder is: 2021-10-19"
```

Notice that in this example we are using an asterisk `*` symbol in the pattern, telling the shell to strip as many possible characters from the beginning of the parameter up until the final forward-slash `/` is found.

**Remove Pattern from Back**

The `${parameter%pattern}` expression works exactly like the expression above, but removes text from the _end_ of a parameter:

```sh
echo "My working directory is: ${PWD}"
echo "My parent folder is: ${PWD%/*}"

# The lines above are expanded to:
echo "My working directory is: /home/dwmkerr/repos/github/dwmkerr/effective-shell"
echo "My parent folder is: /home/dwmkerr/repos/github/dwmkerr"
```

In this example we used an asterisk `*` wildcard in the pattern to remove all of the text from the back of the parameter, up to and including the first forward-slash `/` symbol found.

We can also remove as many matches as possible, by using the expression `${parameter%%pattern}`:

```sh
archive=effective-shell.tar.gz
echo "Name of archive is: ${archive%%.*}"

# The line above is expanded to:
echo "Name of archive is: effective-shell"
```

Notice that in this case the removal of the characters did not stop at the first period `.` symbol, it removed as many characters as possible until the _last_ period `.` symbol was found.

**Pattern Replacement**

You can also replace a pattern in a parameter by using the expression `${parameter/pattern/string}`. This can be used to perform substitutions:

```sh
message="Hello Dave"
echo "${message/Hello/Goodbye}"

# The line above is expanded to:
echo "Goodbye Dave"
```

There are actually a number of options available for Pattern Replacement that can control things like the number of replacements that are performed and how arrays are treated. I would recommend not using overly complex replacements using these types of expressions though - instead use a command like `tr` or `sed` to make it very explicit what is going on - the built-in shell parameter replacement can be quite complex for the reader to parse and can also vary from shell to shell.

For suggestions on alternative ways to manipulate text check [Chapter 15 - Slice and Dice Text]({{< relref "/docs/part-3-manipulating-text/slice-and-dice-text" >}}) or [Chapter 16 - Advanced Text Manipulation with Sed]({{< relref "/docs/part-3-manipulating-text/advanced-text-manipulation" >}})

## Command Substitution

The second form of expansion that starts with a dollar `$` symbol is _command substitution_. This form of expansion instructs the shell to run a specific command. The syntax is simply `$(comand)`.

We have seen command substitution throughout the book - in the example below we expand the `date` command to print the current date:

```sh
echo "The date is: $(date)"

# The line above is expanded to:
echo "The date is: Tue Oct 19 16:49:07 +08 2021"
```

You may find that your scripts or commands are easier to manage if you store the results of a command in a variable like so:

```sh
archives=$(find ~/downloads -type f -name "*.tar.gz")
```

In this command we store the results of the `find` operation in the parameter named `archives`.

There is an alternative syntax for command substitution that you might see. In this alternative syntax the command is surrounded by backtick symbol. The command above could be written like so:

```sh
archives=`find ~/downloads -type f -name "*.tar.gz"`
```

You may see this syntax from time to time, however I would suggest that you avoid it. The reason is that you cannot _nest_ commands using this syntax. If you want to run a command that itself performs command substitution it is not possible to do so with this backtick syntax. Instead, prefer the form that uses parentheses - such as `result=$(command1 $(command2))`.

## Arithmetic Expansion

The final form of shell expansion that starts with a dollar symbol `$` is _arithmetic expansion_. This expansion can be used to perform simple arithmetic expressions:

```sh
echo "The result of 23*4 is: $((23*4))"
echo "The result of 23*4 is: 92"
```

Arithmetic expansion is covered in detail in [Chapter 19 - Variables, Reading Input, and Mathematics]({{< relref "/docs/part-4-shell-scripting/variables-reading-input-and-mathematics" >}}).

## Word Splitting

Word splitting is a complex topic that can often cause confusion. Word splitting is the process that the shell goes through when it takes the results of parameter expansion, command substitution and arithmetic expansion and then attempts to split the result into 'words'. The easiest way to remember which expansions have word splitting applied are that it is applied to _any_ expansion that starts with a dollar symbol `$` and that does _not_ occur within double quotes.

The fact that word splitting only occurs if a substitution does _not_ use double quotes can also cause confusion. Let's take a look into word splitting in detail and see when it is useful and when it can be problematic.

To see word splitting in action, we'll run a command that returns a set of words. In the example note that there are different numbers of space characters between some of the days:

```sh
days="Monday Tuesday Wednesday      Thursday Friday   Saturday Sunday"
for day in $days
do
    echo "${day}"
done
```

The output of this script is:

```
Monday
Tuesday
Wednesday
Thursday
Friday
Saturday
Sunday
```

In the expression `for day in $day` we are using _shell parameter expansion_ to expand the `days` parameter. And because we have _not_ surrounded this part of the expression with quotes, the shell has performed word splitting. 

TODO show and describe with quotes

TODO show with file names with spaces

TODO show changing IFS

TODO note that names can contain newlines

TODO note that this should all be commented heavily



## Filename Expansion


# TODO quotes, in particular with respect to Word Splitting

# TODO

https://www.gnu.org/software/bash/manual/html_node/Shell-Expansions.html#Shell-Expansions
- todo: wildcards is not sufficiently covered in chapter 2 or chapter 3, perhaps we need a short dedicated chapter on it? Also, what is the manpage for wildcards (e.g. what is the equivalent of `man re_pattern` (bash and zsh)
- todo: Shell Brace Expansion (e.g. `touch file{1..100}.txt`, see `man bash /Brace`
- we should be able to just hit Esc Ctrl+E to expand https://unix.stackexchange.com/questions/584370/how-can-i-expand-and-edit-the-result-of-a-command-substitution-in-bash#:~:text=shell%2Dexpand%2Dline%20(M%2DC%2De,%3A%20Ctrl%20%2B%20Esc%20%2B%20e%20 but this is not working on my mac
