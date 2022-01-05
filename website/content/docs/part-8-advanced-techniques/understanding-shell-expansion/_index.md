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

If you want to see each of these operations in the manual, you can run `man bash` and search for the text `^EXPANSION`. Now let's see how each operation works in more detail.

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

A lot of these expansions are covered in detail in [Chapter 19 - Variables, Reading Input, and Mathematics]({{< relref "/docs/part-7-shell-scripting/variables-reading-input-and-mathematics" >}}) but I have included each of the available expansions here for reference.

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

For suggestions on alternative ways to manipulate text check [Chapter 15 - Slice and Dice Text]({{< relref "/docs/part-6-manipulating-text/slice-and-dice-text" >}}) or [Chapter 16 - Advanced Text Manipulation with Sed]({{< relref "/docs/part-6-manipulating-text/advanced-text-manipulation" >}})

**Lowercase or Uppercase**

You can use the `${parameter^^}` expression to return the value of `parameter` converted to uppercase. You can also use the `${parameter,,}` expression to return the value of `parameter` converted to lowercase. An example is below:

```sh
message="Hello Reader"
echo ${message^^}
echo ${message,,}
```

The output of this script is:

```
HELLO READER
hello reader
```

**Parameter Indirection**

If you want to get the value of a parameter that has an arbitrary name you can use the `${!parameter_name}` expression. This will return the value of the parameter that has the name of the value of `parameter_name` - you can see this in action like so:

```sh
parameter_name="HOME"
echo "${!parameter_name}"
```

The output of this script is:

```
/home/dwmkerr
```

This can be very useful if you are writing scripts that will work with arbitrary of variable parameter names.

You can see more examples of how parameter expansion works, and in particular how to use parameter expansion with the parameters to functions or scripts in [Chapter 19 - Variables, Reading Input, and Mathematics]({{< relref "/docs/part-7-shell-scripting/variables-reading-input-and-mathematics" >}}).

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

Arithmetic expansion is covered in detail in [Chapter 19 - Variables, Reading Input, and Mathematics]({{< relref "/docs/part-7-shell-scripting/variables-reading-input-and-mathematics" >}}).

## Word Splitting

Word splitting is a complex topic that can often cause confusion. Word splitting is the process that the shell goes through when it takes the results of parameter expansion, command substitution and arithmetic expansion and then attempts to split the result into 'words'. The easiest way to remember which expansions have word splitting applied are that it is applied to _any_ expansion that starts with a dollar symbol `$` and that does _not_ occur within double quotes.

The fact that word splitting only occurs if a substitution does _not_ use double quotes can also cause confusion. Let's take a look into word splitting in detail and see when it is useful and when it can be problematic.

To see word splitting in action, we'll run a command that returns a set of words. In the example note that there are different numbers of space characters between some of the days:

```sh
days="Monday Tuesday Wednesday      Thursday Friday   Saturday Sunday"
for day in "$days"
do
    echo "${day}"
done
```

The output of this script is:

```
Monday Tuesday Wednesday      Thursday Friday   Saturday Sunday
```

In the expression `for day in "$day"` we are using _shell parameter expansion_ to expand the `days` parameter. We have surrounded `$day` in quotes - this means that we are telling the shell _not_ to apply any word splitting. This means the shell preserves the spaces in the parameter. When we loop through the parameter we have one value only - the original set of days, including the spaces, that we set in the parameter.

Now let's run the same script but this time we will _not_ surround `$days` in quotes, meaning that the shell _will_ perform word splitting:

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

In this case we can see that word splitting has occurred. The shell has performed the following operations:

1. First, it searches through each character in the input
2. Every time it finds a character in the `IFS` (_Input Field Separator_) special variable, it splits the word
3. If there are multiple instances of a separator character, they are removed, and replaced with a single instance only

By default, the `IFS` variable is set to `<space><tab><newline>`. This means that any spaces, tabs or newline characters in the input are considered as characters that the shell will use to split words. As you can see from the example above, when we have multiple instances of these characters sequentially (such as the five space characters after the `Wednesday` value), they are replaced with a single instance of the first character (a space in this case) and then the splitting occurs.

The fact that the shell uses spaces, tabs and newlines as input field separators can sometimes cause confusion - in particular if you have a list of files:

```sh
programs="/usr/bin/bash /usr/bin/zshell /usr/bin/new shell"
for program in $programs
do
    echo "${program}"
done
```

The output of this script is:

```
/usr/bin/bash
/usr/bin/zshell
/usr/bin/new
shell
```

The final command, which has a space in the name, has been split into two words. You could avoid this issue by temporarily _changing_ the value of `IFS` to use a different separator for words:

```sh
programs="/usr/bin/bash;/usr/bin/zshell;/usr/bin/new shell"
OLDIFS=$IFS
IFS=';'
for program in $programs
do
    echo "${program}"
done
IFS=$OLDIFS
```

The output of this script is:

```
/usr/bin/bash
/usr/bin/zshell
/usr/bin/new shell
````

In this script we saved the original value of `IFS` into a parameter called `OLDIFS`, changed `IFS` to use a semi-colon as a separator, ran the loop (which correctly split the programs and preserved the space in the last program name) then change `IFS` back to its original value.

You should be careful when changing `IFS` to make sure that you change it back to its original value straight afterwards - other programs or commands might expect `IFS` to be set to the default value so it should only be changed with caution.

If you were to look at the contents of the `PATH` variable, which specifies the locations the shell should search for commands, you will see that they are actually separated by colons:

```
$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
```

The results you see will vary depending on your operating system. But the fact that they are separated by colons means that you can easily change `IFS` to a colon character to get each of the paths - even if they contain spaces:

```sh
OLDIFS=$IFS
IFS=":"
for path in $PATH
do
    echo "${path}"
done
IFS=$OLDIFS
```

The output of this script will look something like this:

```
/usr/local/sbin
/usr/local/bin
/usr/sbin
/usr/bin
/sbin
/bin
/usr/games
/usr/local/games
```

We will see a little more about how the shell can sometimes split up a filename with spaces (or even newlines) in the path when we look at the final shell expansion - pathname expansion.

## Pathname Expansion

When the shell encounters the asterisk `*`, question mark `?` or open square brackets `[` characters, it marks the beginning of an expression that will have _pathname expansion_ applied to it. We have actually seen pathname expansion a number of times in this book - it is the expansion that occurs when we use wildcards or patterns in shell scripts to expand a list of paths:

```sh
$ ls ~/downloads/*.tar.gz
/home/dwmkerr/downloads/aspnetcore-runtime-3.1.18-osx-x64 (1).tar.gz
/home/dwmkerr/downloads/aspnetcore-runtime-3.1.18-osx-x64.tar.gz
/home/dwmkerr/downloads/dotnet-sdk-3.1.412-osx-x64.tar.gz
/home/dwmkerr/downloads/effective-shell-playground.tar.gz
/home/dwmkerr/downloads/effective-shell-samples (1).tar.gz
/home/dwmkerr/downloads/effective-shell-samples (2).tar.gz
/home/dwmkerr/downloads/effective-shell-samples.tar.gz
```

This script shows all of the files in the _~/downloads_ folder that match the pattern `*.tar.gz`. The results you see will depend on what you have in your own _~/downloads_ folder!

It is important to remember that the shell performs all of the types of expansion that we have described _in order_. This means that word expansion is performed _before_ pathname expansion. So if you loop through the results of an expanded path, word splitting will not be performed on those results. We can see that with the script below:

```sh
for $path in ~/downloads/*.tar.gz
do
    echo "${path}"
done
```

The result of this script is:

```
/home/dwmkerr/downloads/aspnetcore-runtime-3.1.18-osx-x64 (1).tar.gz
/home/dwmkerr/downloads/aspnetcore-runtime-3.1.18-osx-x64.tar.gz
/home/dwmkerr/downloads/dotnet-sdk-3.1.412-osx-x64.tar.gz
/home/dwmkerr/downloads/effective-shell-playground.tar.gz
/home/dwmkerr/downloads/effective-shell-samples (1).tar.gz
/home/dwmkerr/downloads/effective-shell-samples (2).tar.gz
/home/dwmkerr/downloads/effective-shell-samples.tar.gz
```

Note that the spaces in the path names have been preserved - pathname expansion happens _after_ word splitting - so the paths themselves are left as-is.

As well as the asterisk `*` character, which can be used as a wildcard character in pathname expansion, there is also the question mark `?` character which means 'any single character'. You can also use expressions such as `[abc]` to match on a range of characters. The exact details of how these special characters are used can be found in `man bash`.

One feature of pathname expansion that people can sometimes be surprised by is what happens if the shell finds _no files_ that match the pattern. You can see this in action below:

```
$ echo ~/effective-shell/*.txt
/home/dwmkerr/effective-shell/*.txt
```

There are no files in the _~/effective-shell_ folder that match the pattern `*.txt` and in this case the shell has left the text as-is. This means that you should always check the results of the expansion before assuming that the shell has found a file!

For example, if I wanted to run the `touch` command on a set of files, I would do the following:

```sh
for file in ~/effective-shell/*.txt
    # If the file / folder doesn't exist, skip it.
    if ! [ -e "$file" ]; then continue; fi
    touch "$file"
do
```

In this script we first check to see whether the file or folder exists by using the `-e` test. If the file or folder doesn't exist then we skip through the loop. You can see more examples of this pattern in [Chapter 21 - Loops and working with Files and Folders]({{< relref "/docs/part-7-shell-scripting/loops-and-working-with-files-and-folders" >}}).

Pathname expansion has limitations - if you need a more sophisticated way to search for a set of files, check [Chapter 11 - Finding Files]({{< relref "/docs/part-5-getting-faster/finding-files" >}}).

# Summary

In this chapter we went into the lower level details of how _shell expansion_ works and looked at the seven types of expansion the shell will perform on the input it is provided. Whilst we have seen many of these expansions already throughout the book, I think it is useful to see all of them together in one place to really understand _what_ the shell does with the input you provide it in your commands.

Hopefully with this additional knowledge on shell expansion, you will be less likely to make mistakes around things like word splitting, or how empty results from filename expansion are treated, which often cause people confusion.

In the next chapter we will examine some of the limitations of shell scripting and alternatives to shell scripts that can be useful to become familiar with.
