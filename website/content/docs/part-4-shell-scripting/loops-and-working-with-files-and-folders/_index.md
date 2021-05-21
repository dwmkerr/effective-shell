---
title: "Loops and working with Files and Folders"
slug: "loops-and-working-with-files-and-folders"
weight: 21
---

# Chapter 21 - Loops and working with Files and Folders

One of the most common tasks we will do when scripting is operating functions over a set of files or folders. In this chapter we'll look at loops and how to operate on many files and folders. We'll also see how we can integrate commands like `find` into shell scripts.

# The For Loop<!-- index -->

We can use the _for loop_ to run commands for each item in a list.

The _for loop_ has the following structure:

```
for <name> in <words>
do
    <conditional-command 1>
    <conditional-command 2>
    <conditional-command n>
done
```

The _for loop_ executes a sequence of commands for every item in a list. In the documentation you will see that this list is called 'words'. This might sound odd - and it is a bit, we're going to see why the documentation says 'words' rather than 'items' or 'array' shortly.

Let's see how the _for loop_ works by showing a simple example. We will loop through every item in a folder and print its name to the screen:

```sh
for item in ~/effective-shell/*
do
    echo "Found: $item"
done
```

As long as you have the _effective-shell_ folder in your home directory, you will see output that looks like this:

```
Found: /home/dwmkerr/effective-shell/data
Found: /home/dwmkerr/effective-shell/docs
Found: /home/dwmkerr/effective-shell/logs
Found: /home/dwmkerr/effective-shell/pictures
Found: /home/dwmkerr/effective-shell/programs
Found: /home/dwmkerr/effective-shell/quotes
Found: /home/dwmkerr/effective-shell/scripts
Found: /home/dwmkerr/effective-shell/templates
Found: /home/dwmkerr/effective-shell/text
Found: /home/dwmkerr/effective-shell/websites
```

Notice how the shell is smart enough to _expand_ the wildcard expression that we have included in the _for loop_. Remember that a shell script is going to run every statement in the shell, so in just the same way we can use wildcards in commands such as `ls` or `cp` or `mv`, we can use them in for loops!

You will also see that when we specify the name of the variable to use in the loop (which this example was `item`) we don't need to use a dollar symbol. Remember - when we are _setting_ a variable, we don't use a dollar symbol before the variable name, we only use the dollar symbol when we want to get the value of the variable.

We can also see a bit of an inconsistency with the shell syntax here - for the `if` statement, the statement is closed with `if` backwards (`fi`). But the `for` loop is closed with `done`. The shell is an old platform and there are some oddities like that that you might not see in more modern programming languages.

## For Loop Items - Arrays

In [Chapter 19 - Variables, Reading Input, and Mathematics]({{< relref "/docs/part-4-shell-scripting/variables-reading-input-and-mathematics" >}}) we saw how to create arrays. We can use an array as the set of items to use in a for loop, here's an example:

```sh
days=("Monday" "Tuesday" "Wednesday" "Thursday" "Friday" "Saturday" "Sunday")
for day in ${days[@]}
do
    echo -n "$day, "
done
echo "happy days!"
```

If we run this script we'll see the following output:

```
Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, happy days!
```

It's important to remember that we want to go through every item in the array, so we have to use the `${days[@]}` syntax. This is the syntax that means 'all of the members of the array'. Again, this might seem odd if you are used to modern programming languages, where it would be clear that `days` is an array and there would be no need to specify that you want to use all of the members.

Why does the shell have this odd requirement around arrays? The answer is in the syntax for the command, that specifies we loop through _words_. This is a subtlety that can cause a lot of confusion, so let's take a look in a bit more detail.

The `-n` (_don't output a trailing newline_) flag of the `echo` command is used inside the for loop so that we don't write each day on its own line.

## For Loop Items - Words

If we run `help for` then we'll see that the help says that we loop through _words_. This means that actually the for loop splits up the input into a set of words and loops though each - this can be a real surprise if you come from a programming background.

Let's see what this means with an example:

```sh
sentence="What can the harvest hope for, if not for the care of the Reaper Man?"
for word in $sentence
do
    echo "$word"
done
```

The output of this will be:

```
What
can
the
harvest
hope
for,
if
not
for
the
care
of
the
reaper
man?
```

This is because the for loop has separated the contents of the variable `sentence` into _words_. This is not how most programming languages would work, so why does the shell do this?

It's important to remember that the shell is a _text based_ environment. Most of the time when we are running shell commands in a terminal we are running commands that _simply output text_.

For example, let's see how the `ls` command would write its output:

```
$ ls ~/effective-shell
data  docs  logs  pictures  programs  quotes  scripts  templates  text  websites
```

The output that the `ls` program has written is plain text. It is not an array, it is just a set of files separated by spaces. What would we expect the shell to do if we ran the following command?

```sh
files=$(ls ~/effective-shell)
for file in $files
do
    echo "Found: $file"
done
```

The output is:

```
Found: data
Found: docs
Found: logs
Found: pictures
Found: programs
Found: quotes
Found: scripts
Found: templates
Found: text
Found: websites
```

Here we see why the shell splits up words in a sentence. It is making a best effort with plain text - trying to split plain text up into sensible 'chunks'.

When we operate in a shell for day to day work we don't have to use the more specific syntax that would be used in a programming language - the shell has more of an emphasis on terseness of statements and the ability to quickly work with files. It is not designed as a general purpose programming tool, so it makes assumptions like this.

However, this assumption can cause problems - what if we had spaces in our file names? Let's test this out:

***WORK IN PROGRESS***

DK: Note that the below works, because the shell escapes whitespace when it performs glob expansion.
DK: Note that if instead we simply wrote out the output, e.g `items=$(ls ~/*.txt)` it would *not* work as we have plain text that is not escaped.

```sh
touch "~/file with spaces.txt"
for item in ~/*.txt
do
    echo "Found: $item"
done
```

**Z-Shell** - if you are using Z-Shell you will see the text printed on a single line. The reason will be explained shortly.



 Strictly, the `in <words>` is not required, if it is omitted then then `in "$@"` is assumed. I do _not_ recommend omitting the `in <words>` - it will be confusing to readers!
