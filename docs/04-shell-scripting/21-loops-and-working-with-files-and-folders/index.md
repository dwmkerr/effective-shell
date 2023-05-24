---
title: 'Loops and working with Files and Folders'
slug: '/part-4-shell-scripting/loops-and-working-with-files-and-folders'
---

Loops allow us to perform a set of operations over multiple items, such as a set of files or folders or the results of a command. In this chapter we'll look at loops and how to operate on many files and folders.

## The For Loop<!-- index -->

We can use the _for loop_ to run a set of commands for each item in a list.

The _for loop_ has the following structure:

```
for <name> in <words>
do
    <conditional-command 1>
    <conditional-command 2>
    <conditional-command n>
done
```

The _for loop_ executes a sequence of commands for every item in a list. In the documentation you will see that this list is called 'words'. There's a technical (and complex) reason for this that we'll discuss in the end of the chapter.

Let's see how the _for loop_ works by showing a simple example. We will loop through every item in a folder and print its name to the screen:

```bash
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

Notice how the shell is smart enough to _expand_ the wildcard expression that we have included in the _for loop_. In just the same way we can use wildcards in commands such as `ls` or `cp` or `mv`, we can also use them in for loops - or in fact any statement[^1]!

You will also see that when we specify the name of the variable to use in the loop (which in this example was _item_) we don't need to use a dollar symbol. Remember - when we are _setting_ a variable, we don't use a dollar symbol, we only use the dollar symbol when we want to get the value of the variable.

The _for loop_ is closed with the `done` keyword. Here we can also see an inconsistency with the shell syntax - for the `if` statement, the statement is closed with `if` backwards (`fi`). But the `for` loop is closed with `done`. The shell is an old platform and there are some oddities like that that you might not see in more modern programming languages.

### For Loops - Arrays

In [Chapter 19 - Variables, Reading Input, and Mathematics](../../04-shell-scripting/19-variables-reading-input-and-mathematics/index.md) we saw how to create arrays. We can easily loop through the items in an array with a for loop. Here's an example:

```bash
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

It's important to remember that we want to go through every item in the array, so we have to use the `${days[@]}` syntax. This is the syntax for 'all of the members of the array'.

The `-n` (_don't output a trailing newline_) flag of the `echo` command is used inside the for loop so that we don't write each day on its own line.

### For Loops - Words

The _for loop_ documentation names the input to the loop as 'words'. We can see this by running `help for`:

```
$ help for
for: for NAME [in WORDS ... ] ; do COMMANDS; done
    Execute commands for each member in a list.
...
```

The reason that the items are called 'words' is that the shell splits up the input into a set of words and loops though each - this can be a real surprise if you come from a programming background.

Let's see what this means with an example:

```bash
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

**Z-Shell** - if you are using Z-Shell then the sentence will _not_ be split up into words. There is an appendix at the end of the chapter that describes the differences between Z-Shell and Bash-like shells (which tend to be closer to the Posix standard).

The _for loop_ has split up the sentence variable into a set of words. This might seem illogical, as the shell is making quite a big assumption (that the operator _wants_ their input split up), but we'll see with a few examples how this is often what is needed.

This is not how most programming languages would work, so why does the shell do this?

The reason is that the shell is a _text based environment_ and the designers have taken this into account. Most of the time when we are running shell commands in a terminal we are running commands that _simply output text_. If we want to be able to use the output of these commands in constructs like loops, the shell has to decide how to split the output up.

For example, let's see how the `ls` command would write its output:

```
$ ls ~/effective-shell
data  docs  logs  pictures  programs  quotes  scripts  templates  text  websites
```

The output of the `ls` program is plain text. It is not an array, it is just a set of files separated by spaces. What would we expect the shell to do if we ran the following command?

```bash
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

We go into detail in word splitting nearer the end of this chapter.

### For Loops - Files with Wildcards

One of the most common scenarios for using a _for loop_ is to loop through a set of files or folders.

The most simple way to do this is to use a simple wildcard pattern in the _for loop_ statement, like so:

```bash
for script in ~/effective-shell/scripts/*.sh
do
    echo "Found script: $script"
done
```

We will see output that looks like this:

```
Found script: /home/dwmkerr/effective-shell/scripts/common.mac.sh
Found script: /home/dwmkerr/effective-shell/scripts/common.sh
Found script: /home/dwmkerr/effective-shell/scripts/common.v1.sh
Found script: /home/dwmkerr/effective-shell/scripts/common.v2.sh
Found script: /home/dwmkerr/effective-shell/scripts/common.v3.sh
Found script: /home/dwmkerr/effective-shell/scripts/show-info.sh
```

We have to be careful with scripts like this - there is a bug.

By default, if the shell doesn't find anything with a wildcard pattern _it does not expand it_. This is very confusing - so let's see an example.

Take a look at the sample below - what would you expect it to show?

```bash
for script in ~/bad-shell/scripts/*.sh
do
    echo "Found: $script"
done
```

You might think the logical result is that nothing is printed - there is not a _bad shell_ folder, so the pattern should not find any files. But instead, we see the following output:

```
Found: ~/bad-shell/scripts/*.sh
```

By default, if a shell 'glob' (a pattern that includes a wildcard) does not match any files, the shell simply leaves the pattern as-is.

There are two ways we can deal with this problem. The first way is to enable the 'nullglob' (_return null for unmatched globs_)<!--index--> option:

```bash
shopt -s nullglob
for script in ~/bad-shell/scripts/*.sh
do
    echo "Found: $script"
done
```

The `shopt` (_set and unset shell option_)<!--index--> command is used to configure shell options. We will be looking at shell options in detail in Part 5. The 'nullglob' option changes the shell behaviour so that if a wildcard pattern does not match any results, it is set to null string[^2].

The second way we can deal with this problem is to just use a `test` command. I think that this is actually far more readable than the `shopt` solution. Here's how it would look:

```bash
for script in ~/bad-shell/scripts/*.sh
do
    # If the file / folder doesn't exist, skip it.
    if ! [ -e "$script" ]; then continue; fi
    echo "Found: $script"
done
```

Here we use the `-e` (_exists_) operator in a `test` command to check whether the file exists. If it does _not_ exist, we run the `continue` statement.

The `continue` statement 'skips' the current item in the loop and moves to the next one. We will see it a little more later on.

### For Loops - Files with Find

If the files that you are trying to loop through are too complex to match with a shell pattern, you can use the `find` command to search for files, then loop through the results.

If you are not familiar with the `find` command, check [Chapter 11 - Finding Files](../../02-core-skills/11-finding-files/index.md).

Let's use the `find` command to run a loop that prints every symlink in the user's home directory. But before we run the loop we'll create a symlink with a space - this will cause some interesting output in our script:

```bash
# Create a symlink to 'effective-shell' that has a space in it...
ln -s ~/effective shell ~/effective\ shell

# Find all symlinks and print each one.
links=$(find ~ -type l)
for link in $links
do
    echo "Found Link: $link"
done
```

You will see a few different links shown when you run this script, depending on how your system is set up. But you will also certainly see the results below:

```
...
Found Link: /home/dwmkerr/effective-shell/effective
Found Link: shell
...
```

This is clearly a problem - the shell has taken the path that has a space - _/home/dwmkerr/effective-shell/effective shell_ and performed _word splitting_ and turned it into two separate items.

This is a persistent headache for anyone who needs to build shell scripts. There are a large number of ways to solve this problem, and none of them are particularly intuitive. I am going to demonstrate one common solution, which is not perfect but should cover most cases. I'll then suggest a better work-around.

The solution that we will use is to temporarily change the values that the shell uses to split text into words. We will set it to _only_ split on newlines. The `find` command puts each file it finds on its own line. This means we will _not_ split up files with spaces or other whitespace in the name:

```bash
# Save the current value of IFS - so we can restore it later. Split on newlines.
old_ifs=$IFS
IFS=$'\n'

# Find all symlinks and print each one.
links=$(find ~ -type l)
for link in $links
do
    echo "Found Link: $link"
done

# Restore the original value of IFS.
IFS=$old_ifs
```

If you run this command now you will see the correct output:

```
...
Found Link: /home/dwmkerr/effective-shell/effective shell
...
```

This will cover you in most cases. However, this method is not ideal for a number of reasons:

1. It is quite verbose - we have to store the current value of `$IFS` and then reset it later
2. It is not quite foolproof - filenames on some systems can have a newline character and this script would fail for those files
3. We have to use the complex looking 'ANSI C Quoting' syntax to set `$IFS` to a newline[^3]
4. If the reader doesn't know what `$IFS` is then the entire script will be difficult to follow

The `$IFS` variable can be complex to work with and discussed at the end of the chapter.

I believe that in this case it is probably best to not use a shell script. There is _no_ solution that is particularly clean or simple. In this case I think you might be better off using a programming language. Check [Chapter 30 - How to Avoid Scripting](../../06-advanced-techniques/30-how-to-avoid-scripting/index.md) for more details on this.

### For Loops - C Style Loops

If you have used programming languages like C, C++, Python, Java and others, you may well be familiar with the 'C style loop' structure that is shown below:

```
for (( expression1 ; expression2 ; expression3 ))
do
    <command 1>
    <command 2>
    <command n>
done
```

This loop structure uses three arithmetic expressions to run the loop. The first is in 'initialise' expression, this is typically used to setup the initial state of the loop. The second is the 'conditional' expression, this is used to check whether the loop is complete. The third is the 'iterate' expression, this is evaluated after the loop commands are completed.

Here's how we can use a C style for loop to iterate through five numbers:

```bash
for (( i = 1; i <= 5; i++ ))
do
    echo "Loop ${i}"
done
```

The output of this script is:

```
Loop 1
Loop 2
Loop 3
Loop 4
Loop 5
```

### For Loops - Looping over Sequences

Another common way to use a for loop is with _brace expansion_. Brace expansion we have already seen a number of times so far - we can use it to generate a sequence of values. Here is how we might create three files using brace expansion:

```bash
touch {coffee,tea,milkshake}-menu.txt
```

This will create three files:

```
$ ls -1 *-menu.txt
coffee-menu.txt
milkshake-menu.txt
tea-menu.txt
```

Brace expansion can be used in for loops, and brace expansion can be used to create sequences. For example, the loop below could be used as a way to loop through the numbers from one to ten:

```bash
for i in {1..10}
do
    echo "Loop ${i}"
done
```

Brace expansion can be used to loop through a sequence of values or a range of numbers. You can even specify the 'increment' used in a sequence. For example, this loop iterates through a sequence of numbers adding five each time:

```bash
for i in {0..25..5}
do
    echo "Loop ${i}"
done
```

The output of this loop would be:

```
Loop 0
Loop 5
Loop 10
Loop 15
Loop 20
Loop 25
```

## The While Loop

The _while loop_ is a loop that executes commands until a certain condition is met.

The _while loop_ has the following structure:

```
while <test-commands>
do
    <conditional-command 1>
    <conditional-command 2>
    <conditional-command n>
done
```

As long as the _test commands_ return success, the loop will run the _conditional commands_. After the _conditional commands_ have been run, the loop goes 'back to the start' and evaluates the test commands again.

Here's an example of how a while loop can be used to generate a list of random numbers:

```bash
# Create an empty array of random numbers.
random_numbers=()

# As long as the length of the array is less than five, continue to loop.
while [ ${#random_numbers[@]} -lt 5 ]
do
    # Get a random number, ask the user if they want to add it to the array.
    random_number=$RANDOM
    read -p "Add $random_number to the list? (y/n): " choice

    # If the user chose 'y' add the random number to the array.
    if [ "$choice" = "y" ]; then random_numbers+=($random_number); fi
done

# Show the contents of the array.
echo "Random Numbers: ${random_numbers[@]}"
```

When you run this script, you can choose to add a number to the list by typing 'y' - once there are five items in the list the while loop condition fails and the loop ends:

```
Add 14718 to the list? (y/n): y
Add 2646 to the list? (y/n): n
Add 11898 to the list? (y/n): y
Add 31506 to the list? (y/n): y
Add 32436 to the list? (y/n): y
Add 6803 to the list? (y/n): n
Add 25811 to the list? (y/n): y
Random Numbers: 14718 11898 31506 32436 25811
```

The `$RANDOM`<!--index--> variable is a built-in variable in the shell that returns a random number.

You would typically use a while loop when you don't know how many iterations you will perform and you need to re-evaluate at each iteration whether you should continue to loop.

### While Loops - Looping through the lines in a file

You can use a while loop to iterate through each line in a file, without having to load the entire file into memory.

Here's an example of how to iterate through the lines of a file:

```bash
while read line; do
    echo "Read: $line"
done < ~/effective-shell/data/top100.csv
```

The output will look like this:

```
Read: "Rank","Rating","Title","Reviews"
Read: "1","97","Black Panther (2018)","515"
Read: "2","94","Avengers: Endgame (2019)","531"
...
```

This uses shell redirection to redirect the contents of the _~/effective-shell/data/top100.csv_ file into the `read` command in the while loop. The `read` command will read the file, line by line, until it finds the final line.

This script has some issues:

- If the last line is does not end with a newline, then it is not read
- Backlashes will be treated as escape sequences and lead to broken output
- Leading whitespace will be removed

It is possible to avoid these issues, but the resulting script is a lot harder to read:

```bash
while IFS="" read -r line || [ -n "$line" ]; do
    echo "Read: $line"
done < ~/effective-shell/data/top100.csv
```

In this case we've had to use some complex tricks to avoid each issue:

- The `|| [ -n "$line"]` test ensures that the loop iterates as long as the line read is not zero-length, ensuring we read the last line even if it doesn't have a newline
- The `-r` (_do not escape_) option for `read` ensures that backlashes are not interpreted as escape sequences
- The `IFS=""` temporarily disables _any_ word splitting in the loop, meaning that we do not lose leading whitespace

However this _still_ has issues - if commands in the loop read from standard input then the loop will still have errors. For this reason, I would again suggest you follow the advice in the [How to avoid scripting!](../../work-in-progress) Chapter to see better ways to read files!

Even though I would recommend using a programming language to read the lines of a file, I have kept this example here because it is something you are likely to come across if you see scripts written by others. And for simple scenarios, where you are fairly sure of structure of a file, it might be useful. But this is definitely a case where you should consider using a programming language if you want to create more maintainable solutions to problems!

### While Loops - The Infinite Loop

There are times that you may want to loop forever. For example you might be writing a script that reads an option from the user, processes it, and then starts again.

Here's an example of an infinite loop - we use the `true` command, which always returns success:

```bash
while true
do
    echo "1) Move forwards"
    echo "2) Move backwards"
    echo "3) Turn Left"
    echo "4) Turn Right"
    echo "5) Explore"
    echo "0) Quit"

    read -p "What will you do: " choice
    if [ $choice -eq 0 ]; then
        exit
    fi
    # The rest of the game logic would go here!
    # ...
done
```

This example shows a common pattern for an infinite loop - offering a menu of options which the user can call repeatedly until they decide to quit.

## The Until Loop

The _until loop_ operates just like the while loop, except that it runs _until_ the test commands return success.

The structure of the _until loop_ is just like the while loop:

```
until <test-commands>
do
    <conditional-command 1>
    <conditional-command 2>
    <conditional-command n>
done
```

As long as the _test commands_ do not return success, the loop will run the _conditional commands_. After the _conditional commands_ have been run, the loop goes 'back to the start' and evaluates the test commands again.

Here's an example of an _until_ loop that builds a random number that is at least 15 characters long:

```bash
# Create an empty random number string - we're going to build it up in the loop.
random_number=""

# Keep on looping until the random number is at least 15 characters long.
until [ "${#random_number}" -ge 15 ]
do
    random_number+=$RANDOM
done
echo "Random Number: ${random_number}"
```

When you run this script you will see something like this:

```
Random Number: 364272371462227929
```

Note that we've used the string-length parameter expansion function to get the length of the `random_number_` variable here. If this is not familiar, check [Chapter 19 - Variables, Reading Input, and Mathematics](../../04-shell-scripting/19-variables-reading-input-and-mathematics/index.md).

In general I would recommend using while loops rather than until loops. While loops are going to be more familiar to readers as they exist in many programming languages - until loops are a little more rare. And you can easily turn any until loop into a while loop by simply inverting the test commands you are running.

For example, we could re-write the loop created before like so:

```bash
random_number=""
while [ "${#random_number}" -lt 15 ]
do
    random_number+=$RANDOM
done
echo "Random Number: ${random_number}"
```

In this case we've changed the condition from `-ge 15` (greater than or equal to fifteen) to `-lt 15` (less than fifteen). The while loop version of the script will probably be a little easier for most readers to parse.

## Continue and Break

We briefly saw that the `continue` (_resume loop_) statement<!--index--> can be used to 'skip' an iteration in a loop. `break` (_exit loop_) statement that can be used to stop running the loop.

When we use the `continue` statement, we are telling the shell that we want to _stop_ processing the current 'iteration' of the loop and move onto the next item. You can use as many `continue` statements as you like in a loop.

Here's an example of a script that let's the users show the contents of a directory. If the directory is empty it uses the `continue` statement to skip to the next directory. If the users chooses to cancel the operation, it uses the `break` statement to stop iterating:

```bash
echo "For each folder, choose y/n to show contents, or c to cancel."
for file in ~/*
do
    # If the file is not a directory, or it cannot be searched, skip it.
    if ! [ -d "$file" ] || ! [ -x "$file" ]; then continue; fi

    # Ask the user if they want to see the contents.
    read -p "Show: $file? [y/n/c]: " choice

    # If the user chose 'c' for cancel, break.
    if [ "$choice" = "c" ]; then break; fi

    # If the user choice 'y' to show contents, list them.
    if [ "$choice" = "y" ]; then ls "$file"; fi
done
```

Using `break` and `continue` can simplify our loops - otherwise it would be much harder to write the loop above.

## Creating Compact Loops

In each example in this chapter we have split the loop constructs so that there is one statement per line. But just as with the `if` statement, we can combine any of these lines, as long as we use a semi-colon to let the shell know where each statement ends.

A common pattern you will see is the `do` keyword on the same line as the `for` or `while` statement:

```bash
numbers=(0 1 1 2 3 5)
for num in ${numbers[@]}; do
    echo "$num"
done
```

If you are simply typing in the shell in a terminal, rather than writing a script, you might write the loop on a single line:

```bash
for script in *.sh; do touch "$script"; done
```

This one-liner updates the last access and modified of all files that end with _*.sh_ in the current folder.

Just like with the _if statement_ I would recommend that you keep each statement on its own line until you are 100% familiar with the syntax. Then when it is second-nature to be able to write a loop, you can use the more compact syntax if it is appropriate.

When you are running the shell _interactively_, i.e. actually typing in the shell rather than writing a shell script, you can still use multiple lines. If you type `for script in *.sh` and press enter, the shell will let you type the next line. You can keep on adding lines until you type `done` and press enter.

If you want to make a _really_ compact for loop, you can actually skip the `in <words>` part. If `in <words>` is omitted then the special 'all parameters' variable `$@` is used. We will look at this special parameter in the next chapter. But this will be confusing to readers so I would recommend that you are always explicit with the `in <words` part of a for loop.

## Word Splitting and IFS<!--index-->

At a number of points in this chapter we have touched on the concept of 'word-splitting'<!--index--> and the `$IFS` variable. Before we close out the chapter with an update to the `common` script, let's talk about these concepts in more detail.

If you are not expecting to use shell scripts as a regular part of your work you can safely skip this section. If you think that you are likely to come across shell scripts, loops and similar constructs, it might be worth reading this section.

### Word Splitting

Word splitting is the process by which the shell splits text up into a set of words.

We saw that the shell will split the words in a loop, which we can see with the example below:

```
$ sentence="Here are some words"
for word in $sentence; do echo "$word"; done
Here
are
some
words
```

But why is it that wrapping the `$sentence` variable in quotes stops the word splitting from happening?

```
$ sentence="Here are some words"
for word in "$sentence"; do echo "$word"; done
Here are some words
```

The reason for this has been touched on in [Chapter 19 - Variables, Reading Input, and Mathematics](../../04-shell-scripting/19-variables-reading-input-and-mathematics/index.md) and also partly in this chapter.

In the first example the loop iterates over the `$sentence` variable. Note that this variable is _not_ quoted. This means that it follows the standard rules for 'expansion' in the shell. This means that as well as all of the usual features such as wildcard expansion, _word expansion_ will occur.

In the second example, the loop iterates over the `"$sentence"` variable. Note that this variable _is_ quoted. As we saw in [Chapter 19](../../04-shell-scripting/19-variables-reading-input-and-mathematics/index.md) quoting a variable means that it is treated literally, expect for parameter expansion.

This means that in most circumstances you probably want to quote your variables - otherwise the shell is going to perform word splitting on them. But if you _do_ want expansion and splitting to occur, then you should _not_ quote text. For example, if we run the following we see invalid output:

```
$ for file in "*"; do echo "Found: $file"; done
Found: *
```

Because we have quoted the asterisks, the shell does not treat it as a special character which expands into a list of files.

What about this example, when we use wildcard expansion to list files, but the results do _not_ have word splitting applied?

```
$ touch file\ with\ spaces.test
$ for file in *.test; do echo "Found: $file"; done
Found: file with spaces.test
```

The `*.test` is not surrounded in quotes, so it is expanded. But why does word splitting not happen?

The reason is that the shell applies these 'expansions' in a certain order, which is as follows:

- Brace expansion
- Tilde expansion
- Parameter and variable expansion
- Command substitution
- Arithmetic expansion
- Word splitting
- Pathname expansion

Word splitting happens _before_ pathname expansion, and it is pathname expansion that turns the asterisks wildcard into the list of files. At the point that this happens, word splitting has already been applied and won't be applied again.

Each of these types of expansion we have actually already seen in the book, but we're going to review them in detail in the final section on advanced techniques. You can find the appropriate section of the Bash manual for this topic by searching for `EXPANSION`.

### The IFS Variable

The `$IFS` variable is the 'internal field separator' variable. It is what the shell uses to decide what characters should be used to split up text into words. By default, this variable includes the space character, the tab character and the newline character.

Whenever you see a script or a command that _changes_ the value of the `$IFS` variable, the operator is modifying the behaviour of subsequent commands so that they do not split words in the same way.

Here's an example of how we could change the IFS variable to split text using commas:

```bash
text="mother,danzig,1988"
IFS=","
for word in $text
do
    echo "Word: $word"
done
```

This script will split text using the comma symbol and output:

```
Word: mother
Word: danzig
Word: 1988
```

Be careful when changing the `IFS` variable - it could cause subsequent commands to behave in unexpected ways. You should normally first copy current value into a variable, then change it, then set it back, like so:

```bash
old_ifs="$IFS"
IFS=":"
# Do some stuff
IFS="$IFS"
```

In general if you are changing `IFS` you might be doing something that would be better done with a programming language.

## Updating the 'common' Command

In the previous chapter we created the `common.v3.sh` command, that shows common commands from the users shell history.

If you need a refresher on what is in the script, you can view it in your pager with:

```bash
less ~/effective-shell/scripts/common.v3.sh
```

Let's add a loop to our common to show a number next to each command so that we can see the order of the commands.

As the file is a little larger now, I am not going to show the entire file, only the key changes we will make.

First, in each of the sections that performs the command to get the common commands we will use Shell Parameter Expansion to run a sub-shell and store the results in a variable:

```bash
# Store the most recently used commands in the 'commands' variable.
commands=$(tail ~/.bash_history -n ${history_lines} \
    | sort \
    | uniq -c \
    | sed 's/^ *//' \
    | sort -n -r \
    | head -n ${command_count})
```

There are two places we have to make this change - the first is for the Bash Shell and the second is for the Z-Shell. Now that we have stored our commands in a variable, we can loop through it at the end of the script and show a number that gives the order of each command:

```bash
# Print each command, showing what its order is in the list.
# Commands are separated by newlines, so temporarily change IFS to loop over
# each line of the commands.
counter=1
old_ifs=$IFS
IFS=$'\n'
for command in $commands
do
    echo "$counter: $comand"
    counter=$((counter + 1))
done
IFS=$old_ifs
```

The updated script is in the samples folder at _~/effective-shell/scripts/common.v4.sh_, you can update your link to point to this version by running the `ln` command:

```bash
ln -s ~/effective-shell/scripts/common.v4.sh /usr/local/bin/common
```

Now when we run this command, each of our common commands is printed with its order shown:

```
$ common
1: 135 gst
2: 73 vi
3: 47 gc
4: 40 ls
5: 37 ga .
6: 27 gpo
7: 25 gl
8: 24 gpr
9: 21 gcm
10: 17 make dev
```

## Summary

In this chapter we looked at how to use different types of loops in the shell, to iterate over values in an array, words in a sentence, files and folders or even the results of commands.

We also looked in detail at how 'word-splitting' works, as well as the `$IFS` variables. In the next chapter we'll look at functions and parameters.

### Appendix - Loops and the Z-Shell

The Z-Shell does _not_ perform word-splitting on unquoted variables. This is a deliberate choice by the designers, to avoid what can often be confusing behaviour.

We can see this behaviour below:

```
% sentence="one two three"
% for word in $sentence; do echo "Word: $word"; done
Word: one two three
```

If you want to use more Posix-like functionality then you can set the `SH_WORD_SPLIT` parameter. You can find out more about this parameter by running `man zsh` and searching for `SH_WORD_SPLIT`.

[^1]: If we had put quotes around the wildcard text it would _not_ be expanded - check the section on 'Quoting' in [Chapter 19 - Variables, Reading Input, and Mathematics](../../04-shell-scripting/19-variables-reading-input-and-mathematics/index.md) if you need a refresher on this.
[^2]: There is a good reason for this. Would you prefer `ls *.nothing-here` to show a warning that _*.nothing-here_ doesn't exist or show the result of `ls` - which lists the current directory! This is discussed in more detail on this Stack Overflow thread: https://unix.stackexchange.com/questions/204803/why-is-nullglob-not-default
[^3]: ANSI C Quoting is described in the 'Quoting' section in [Chapter 19 - Variables, Reading Input, and Mathematics](../../04-shell-scripting/19-variables-reading-input-and-mathematics/index.md)
