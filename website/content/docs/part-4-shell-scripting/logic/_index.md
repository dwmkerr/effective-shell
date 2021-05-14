---
title: "Logic, Loops and working with Files and Folders"
slug: "logic-loops-and-working-with-files-and-folders"
weight: 20
---

# Chapter 20 - Logic, Loops and working with Files and Folders

In this chapter we are going to look at how to perform logic in shell scripts. Logic allows us to perform operations only when certain conditions are met. We'll also look at loops, which let us perform a series of operations. To demonstrate the techniques used with logic and loops we'll look at some common use cases when dealing with files and folders, introducing a number of useful patterns that you can use in your own shell scripts.

## The If Statement<!-- index -->

We can use the _if statement_ to perform operations in shell scripts only when certain conditions are met. Let's take a look at a simple example:

```sh
if [ -e /usr/local/bin/common ]; then
    echo "The 'common' command has been installed in the local bin folder."
fi
```

This script checks to see whether a file or folder exists in the location _/usr/local/bin/common_ (the 'common' command is the command we created in [Chapter 18 - Shell Script Essentials]({{< relref "/docs/part-4-shell-scripting/shell-script-essentials" >}}).

The _if_ statement is used to check whether a certain condition is true or not. When we write an _if_ statement we start with the word _if_, then place an _expression_ in square brackets, then we use a semi-colon to indicate that we have finished the statement. Finally we use the _then_ command to indicate that the commands that follow should be executed if the test evaluates to true.

Shell commands _can_ end with a semi-colon - but they don't have to. If you don't include a semi-colon at the end of a command then the shell assumes that the entire line is a command. So if you try and run the script without the semi-colon you will get an error:

```
bash: syntax error near unexpected token `fi'
```

This is because _if_ is a statement and _then_ is a statement - together they are two statements. So we can either write them on one line, separated with a semi-colon, or just split them into two lines like this:

```sh
if [ -e /usr/local/bin/common ]
then
    echo "The 'common' command has been installed in the local bin folder."
fi
```

Some people will use the first form, which is shorter, some people prefer the second form. This is really just a matter of personal preference.

Let's look at the _expression_ we have in the _if_ statement:

```sh
-e /usr/local/bin/common
```

This expression uses the `-e` (_file exists_) operator<!-- index -->. This operator takes a single parameter - a path. If a file or folder _exists_ in the path, the expression evaluates to true.

Finally, we use the _fi statement_ to 'close' the _if_ statement. This indicates to the shell that we have finished providing statements that run if the test is true.

If you have the script installed then you will see the following output:

```
The 'common' command has been installed in the local bin folder.
```

If you don't have the script installed then you will see no output.

## The Else Statement<!-- index -->

You can use the _else statement_ to define a series of statements that should be executed if the condition in the _if_ statement is _not_ true.

Here's how we could update our script to show a message if the command does not exist in the specified location:

```sh
if [ -e /usr/local/bin/common ]; then
    echo "The 'common' command has been installed in the local bin folder."
else
    echo "The 'common' command has not been installed in the local bin folder."
fi
```

Now if you run the script and you don't have the 'common' command installed you will see the following output:

```
The 'common' command has not been installed in the local bin folder.
```

Note that we still need to use the _fi statement_ to close the _if_ statement.

## The Elif Statement<!-- index -->

The _elif statement_ (which is short for 'else if') can be used to create additional checks and define statements that should run if _other_ conditions are true.

Let's see this in action by updating our script to check to see whether the 'common' command is executable. We can do this using the `-x` (_is executable_) operator<!-- index -->.

```sh
if [ -x /usr/local/bin/common ]; then
    echo "The 'common' command has been installed in the local bin folder and is executable."
elif [ -e /usr/local/bin/common ]; then
    echo "The 'common' command has been installed in the local bin folder but is not executable."
else
    echo "The 'common' command has not been installed in the local bin folder."
fi
```

The message you see will depend on whether you have installed the 'common' command in your local binaries folder and whether the 'common' script is executable. If you want to see each of the different messages, you might find the following snippets useful:

- `ln -s $HOME/effective-shell/scripts/common.v1.sh /usr/local/bin/common` - Create a link to the 'common' command in the local binaries folder
- `chmod -x $HOME/effective-shell/scripts/common.v1.sh` remove the 'executable' flag from the 'common' command, meaning it is not executable
- `chmod +x $HOME/effective-shell/scripts/common.v1.sh` add the 'executable' flag from the 'common' command, meaning it is executable
- `rm /usr/local/bin/common` remove the link to the 'common' command from the local binaries folder

The _elif_ statement looks very similar to the _if_ statement. It takes an _expression_ in the square brackets and must be followed by a _then_ statement.

It is very important to think about the order in which the _if_ and _elif_ statement are executed. If we had written the script like this, it would not work:

```sh
if [ -e /usr/local/bin/common ]; then
    echo "The 'common' command has been installed in the local bin folder and is executable."
elif [ -x /usr/local/bin/common ]; then
    echo "The 'common' command has been installed in the local bin folder but is not executable."
else
    echo "The 'common' command has not been installed in the local bin folder."
fi
```

In this script we check to see if the file exists first. If the file exists then the condition `-e` operator will return true, and we will _not_ run the check in the _elif_ statement. This means we'll _never_ successfully evaluate the statements in the _elif_ block (because for the file to be executable it must exist, so the first condition in the _if_ statement will always take precedence. So it is important to think about the order of the statements!

## Common Unary File Operators

_Unary Operators_<!-- index --> are operators that take a single argument.  We've seen the `-e` and `-x` unary operators. Let's take a look at some of the other operators you might use when working with files:

| Operator | Tests                                                                                       |
|----------|---------------------------------------------------------------------------------------------|
| `-d`     | The file exists and is a folder.                                                            |
| `-e`     | The file exists, regardless of the file type.                                               |
| `-f`     | The file exists and is a regular file.                                                      |
| `-L`     | The file exists and is a symbolic link.                                                     |
| `-r`     | The file exists and is readable.                                                            |
| `-s`     | The file exists and has a size greater than zero.                                           |
| `-w`     | The file exists is writable.                                                                |
| `-x`     | The file exists and is executable - if it is a directory this checks if it can be searched. |

There are plenty of other operators that you can use when working with files, you can see them all by running `man test`.

## Common Binary File Operators

## Common Unary Operators

## Common Binary Operators



---

- updating our 'common' script
- conditionals
- difference between `if [` and `if [[`.
- `man test`
- test a regex, e.g. check $SHELL and see if it is zsh, check output of uname -u to check linux version
- chainde commands: ```git pull && git checkout```, chained OR, OR true

#### Chapter 19 - Operating on Files and Folders

One of the most common tasks we will do when scripting is operating functions over a set of files or folders. In this chapter we'll look at basic loops, tests and how to operate on many files. We'll also see how we can integrate commands like `find` into shell scripts.
