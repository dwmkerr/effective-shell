---
title: 'Variables, Reading Input, and Mathematics'
slug: '/part-3-manipulating-text/variables-reading-input-and-mathematics/'
---

We've seen variables a few times in our journey so far. In this chapter we'll look at variables in a bit more detail. We'll then see how to read input from the user and also look at how to perform basic mathematical operations in the shell. 

## Variables

_Variables_ are places where the system, the shell, or shell users like ourselves can store data.

We've already seen variables a few times in this book. For example in [Chapter 5 - Getting Help](../../01-transitioning-to-the-shell/05-getting-help/index.md) we saw the `$PAGER` variable that is used to specify what pager program should be used in the shell.

When we want to use a variable in the shell, we use the `$` dollar symbol to specify the variable name:

```bash
echo "Your pager is: $PAGER"
```

If you run this command you will see something like this:

```
Your pager is: less
```

By convention, if a variable is in uppercase then it is an _environment variable_<!--index--> or a built in variable that comes from the shell. An environment variable is a variable that is set by the system. They often contain useful values and are used to help configure your system.

Here's a few common environment variables we might use:

```bash
echo "Your shell is: $SHELL"
echo "Your user is: $USER"
echo "Your user's home directory is: $HOME"
```

Your output will look similar to the below:

```
Your shell is: /bin/bash
Your user is: dwmkerr
Your user's home directory is: /home/dwmkerr
```

### Setting Variables

You can create or set your own variables by simply entering the name you would like to use and putting an `=` equals symbol after the variable, followed by the value you would like to use.

This is the one of the few times that you will use a variable name without putting a dollar symbol before it!

```bash
name="Dave"
location="Singapore"
echo "Hello $name in $location"
```

This will produce the output:

```
Hello Dave in Singapore
```

By convention, variables that you define yourself should be lowercase. This helps to distinguish between environment variables and your own variables.

It is a good habit to use lowercase for variable names. Using uppercase will work, but when you use uppercase you run the risk of 'overwriting' the value of an environment variable and causing unexpected results later.

For example, in this snippet I accidentally overwrite the `USER` variable. If a later part of the script expects the `USER` variable to contain the Linux username of the user then there will likely be an error because I have set it to something else!

```bash
# Don't do this!
USER="Dave Kerr"

# If I wanted to go to my home directory, this command would fail. That's
# because USER should be 'dwmkerr' but I've set it to something else!
cd "/home/$USER"
```

If you set a system variable to something incorrect, the impact will be limited to only the script you are running or the shell session you are in, or any commands you run from the script or session - other running programs will _not_ have their copy of the variable changed. You can read more about this in the [Processes](../../work-in-progress) chapter of the [Linux Fundamentals](../../work-in-progress) section.

### Shell Variables and Environment Variables

The variables we create in the Shell are called _Shell Variables_. They are accessible in the current shell session that we are running.

Shell variables are isolated to the current process. If we run another process from our shell, such as another shell script or program, our shell variables are not inherited by this process. This is by design - these shell variables are expected to be used for our local session only.

If you want to ensure that a variable is available to all child processes, you can use the `export` (_set export attribute_) builtin to tell the shell to export the variable as an _Environment Variable_.

Environment Variables are always inherited by child processes - so if you need to provide some kind of configuration or context to a child process, you will likely want to export your variable.

As an example, let's set a variable to indicate whether we want to show some kind of extra diagnostic information to the user when running scripts:

```sh
export DEBUG_MODE=1
sh -c 'echo "Debug Mode is: ${DEBUG_MODE}"'
```

Note that we are _not_ using the `DEBUG_MODE` variable in the current script, we have provided a _literal command_ to the `sh` program which will run in its own process. This process will inherit the shells environment and therefore can use the value of the `DEBUG_MODE` variable. If we did _not_ use the `export` keyword then the value would be undefined in the child process.

We also see another convention here - environment variables are generally capitalized. This can make them a bit more noticeable. These variables should be used with care, you could potentially overwrite a variable in your environment (and therefore the child environments) that another program has set.

You can see a list of the current environment variables that are set with the `env` (_set or print environment_) command:

```sh
env
SHELL=/bin/zsh
LSCOLORS=ExFxBxDxCxegedabagacad
COLORTERM=truecolor
PYENV_SHELL=bash
# etc
```

### Storing the Output of a Command into a Variable

We can use a _subshell_<!--index--> to run a command and store the result in a variable.

For example, if we had a variable which held a user's password and wanted to show it on the screen in a 'masked' form, where all of the characters are replaced with an asterisks symbol, we could write the password variable into the `sed` command and replace every character with an asterisks symbol like so:

```bash
password="somethingsecret"
masked_password=$(echo "$password" | sed 's/./*/g')
echo "Setting password '${masked_password}'..."
```

The output of this script will look like this:

```
Setting password '***************'...
```

To execute a set of commands in a 'sub shell', we can use the `$()` sequence. Everything inside the brackets will be executed in a new shell. We can then store the output of the commands in a variable by using the `=` equals symbol.

### Being Explicit with Variable Names

You can use curly braces around the name of a variable to be more explicit about what the variable name is. Let's take a look at why you might need to do this:

```bash
echo "Creating backup folder at: '$USER_backup'"
mkdir $USER_backup
```

This script shows the output:

```
Creating backup folder at: ''
usage: mkdir [-pv] [-m mode] directory ...
```

Rather than creating a folder called `dwmkerr_backup` (which is my `$USER` variable followed by the text `_backup`), the script has actually failed. That is because it is looking for a variable called `USER_backup` - which has does not exist!

To get around this we would surround the variable name with curly braces like so:

```bash
echo "Creating backup folder at: '${USER}_backup'"
mkdir "${USER}_backup"
```

This script will show the correct output:

```
Creating backup folder at: 'dwmkerr_backup'
```

If there is ever any potential ambiguity with a variable name you should enclose it with curly braces to be on the safe side. Some people will use curly braces in all circumstances to be as explicit as possible about what the variable name is and reduce the risk of mistakes if someone later comes along to edit or change the code.

This script would be improved with the use of a variable of our own to avoid us having to repeat the `${USER}_backup` text:

```bash
backupdir="${USER}_backup"
echo "Creating backup folder at: '${backupdir}'"
mkdir "${backupdir}"
```

In this case creating a variable to save us from creating the backup directory folder name each time we want to use it.

We've looked at environment variables and our own _local_ variables. Now let's look at how we can read input from the user and store it in a variable for later usage.

## Arrays

Arrays are variables that can store multiple values. An array is created by using the equals symbol and putting the array values in parenthesis, like so:

```bash
days=("Monday" "Tuesday" "Wednesday" "Thursday" "Friday" "Saturday" "Sunday")
```

Once you have defined your array you can retrieve an element at a given index by using the square bracket notation shown below:

```bash
echo "The first day is: ${days[0]}"
echo "The last day is: ${days[6]}"
```

Arrays in Bash start at index zero. Arrays in the Z-Shell start at index one - this can cause confusion and mistakes in scripts so it is something you might have to consider if you are writing scripts that can be used by either shell.

There are a number of useful operations you can perform on arrays. An example of each is shown below:

| Operation                | Syntax                     | Example                                                                                                       |
|--------------------------|----------------------------|---------------------------------------------------------------------------------------------------------------|
| Create Array             | `array=()`                 | `days=("Monday" "Tuesday" "Wednesday" "Thursday" "Friday" "Saturday" "Sunday")`                               |
| Get Array Element        | `${array[index]}`          | `echo ${days[2]} # prints 'Wednesday'`                                                                        |
| Get All Elements         | `${array[@]}`              | `echo ${days[@]} # prints 'Monday Tuesday Wednesday Thursday Friday Saturday Sunday'`                         |
| Set Array Element        | `${array[index]}=value`    | `days[0]="Mon"`                                                                                               |
| Get Array Indexes        | `${!array[@]}`             | `arr=(); arr[3]="apple"; arr[5]="pear"; echo ${!arr[@]} # prints 3 5`                                         |
| Get Array Length         | `${#array[@]}`             | `echo ${#days[@]} # Prints 7`                                                                                 |
| Append to Array          | `array+=(val1 val2 valN)`  | `fruits=(); fruits+=("Apples"); fruits+=("Pears" "Grapes"); echo ${fruits[@]} # prints 'Apples Pears Grapes'` |
| Get a subset of elements | `${array[@]:start:number}` | `echo ${days[@]:5:2} # prints 'Saturday Sunday'`                                                              |

It's important to use curly braces around your array expressions. Note that in the examples above when we _set_ an array value we don't use braces or the dollar symbol - this is consistent with what we've seen so far - variable names do not have a dollar symbol when we are setting a value.

You might have noticed from the examples that arrays in Bash can be _sparse_ - that means that you can have 'gaps' in your array. Arrays can also have a mixture of strings or numbers - not every element in an array has to be of the same type.

We'll see arrays in more detail in the chapter on Loops.

### Associative Arrays

More recent versions of Bash support the concept of _Associative Arrays_. These are arrays where rather than having a numeric index associated with each value, you can have a string. This allows you to create a 'map' or 'hash table' structure.

An associative array is created using the `declare` (_set variable_) command<!--index-->:

```bash
# Create an associative array called 'user'.
declare -A book

# Set some values on the array.
book[title]="Effective Shell"
book[author]="Dave Kerr"

# Show one of the values.
echo "Book details: ${book[title]} - ${book[author]}"
```

Running this command will show the output:

```
Book details: Effective Shell - Dave Kerr
```

If you find yourself using associative arrays, I expect that there is a good chance you are trying to do something that is more complex than is suitable for a shell script. In this circumstance I'd suggest you read [Chapter 30 - How to Avoid Scripting](../../06-advanced-techniques/30-how-to-avoid-scripting/index.md) to see how I'd look at alternative options!

## Quoting Variables and Values

There is often a lot of confusion about a specific topic in the shell - when should you surround a variable in quotes? This might sound like it is a purely stylistic question, but surrounding a variable in quotes can dramatically change how your script works.

We're going to look at each type of quoting and when it should be used in the examples below. But if you ever need a reminder, run `man bash` and search for the text `QUOTING`.

### Single Quotes - Literal Values

Use single quotes when declaring a variable or using a value if you want to use literal text. The shell will _not_ expand special characters or variables:

```bash
message='   ~~ Save $$$ on with ** "this deal" ** ! ~~   '
echo "$message"
```

This script will show:

```
   ~~ Save $$$ on with ** "this deal" ** ! ~~
```

Note that the shell has _not_ tried to expand the `~` tilde into `/home/dwmkerr`. It has not expanded the `*` asterisks into a wildcard pattern and it has not tried to use the `$` dollar symbol to reference an array.

Single quotes should be used when you want to put special characters into a variable, or call a command that includes whitespace or special characters.

### Single Quotes - ANSI C Quoting

There is a special form of single quotes called 'ANSI C Quoting' that allows you to use escape sequences from the C language. ANSI C quoting is single quoting that starts with a dollar symbol. You can use it to use special characters like newlines in a variable:

```bash
message1='Hello\nWorld'
message2=$'Hello\nWorld'
echo "Message 1: $message1"
echo "Message 2: $message2"
```

This snippet will show the following results:

```
Message 1: Hello\nWorld
Message 2: Hello
World
```

### Double Quotes - Parameter Expansion

Double quotes work in a very similar way to single quotes except that they allow you to use _parameter expansion_ with the `$` dollar symbol and escaping with the `\` symbol. The ```` backtick symbol is also treated differently. Let's see some examples:

```bash
deal="Buy one get one free"
message="Deal is '$deal' - save \$"
echo "$message"
```

The output of this snippet is:

```
Deal is 'Buy one get one free' - save $
```

Notice that the `$deal` value has been expanded into the contents of the `$deal` variable. The last dollar symbol has been escaped with a `\` backslash - the shell knows that this means we want to use the _literal_ value of the dollar symbol at the end of the message. The backslash has been removed.

The backtick character is also treated differently, as the backtick can be used to run a sub-shell:

```
$ echo "The date is `date`"
The date is Sun 23 May 2021 11:36:54 AM +08
```

However, you should _not_ use the backtick character to run a sub-shell, it is harder to read than using the dollar and parenthesis syntax we've already seen:

```
$ echo "The date is $(date)`"
The date is Sun 23 May 2021 11:36:54 AM +08
```

### No Quotes - Shell Expansion

If you don't include quotes around a variable or value, then the shell will perform a series of operations called _Shell Expansion_. This includes many options we've seen so far, let's take a look at some examples:

```bash
home=~
tilde="~"
echo "My home is: $home"
echo "A tilde is: $tilde"
```

This snippet shows the results:

```
My home is: /home/dwmkerr
A tilde is: ~
```

In the first case the shell has expanded the `~` tilde to the home directory.

We do not use quotes around a variable or a value if we want the shell to shell expansion. The following expansions will be performed:

- Brace expansion: `touch file{1,2,3}` is expanded to `touch file1 file2 file3`
- Tilde expansion: `cd ~` is expanded to `cd /home/dwmkerr`
- Parameter and variable expansion `echo $SHELL` is expanded to `echo /usr/bin/sh` (note that this expansion also occurs with double quotes)
- Command substitution: `echo $(date)` is expanded to echo the results of the `date` command (this also occurs with double quotes)
- Arithmetic expansion: `square=$((4 * 4))` has the value `4 * 4` evaluated mathematically (we see this at the end of this chapter)
- Word splitting: this is a more complex topic discussed in [Chapter 21 - Loops and working with Files and Folders](../../04-shell-scripting/21-loops-and-working-with-files-and-folders/index.md)
- Pathname expansion: `ls *.txt` is expanded to all filename that match the wildcard pattern `*.txt`

We are going to see more detail on Shell Expansion as we continue through this part of the book. There is also a detailed explanation in [Chapter 29 - Understanding Shell Expansion](../../06-advanced-techniques/29-understanding-shell-expansion/index.md) final section of the book and an appendix with a quick reference.

### Quoting Tips

Quoting can seem confusing - but remember these tips and you will generally be on the right path:

- Use double quotes most of the time - they will handle variables and sub-shells for you and not do weird things like word splitting
- Use single quotes for literal values
- Use no quotes if you want to expand wildcards

## Shell Parameter Expansion

Shell Parameter Expansion is the process by which the shell evaluates a variable that follows the `$` dollar symbol. In most of our examples we've seen simple expansion where we just expand the variable into its value, like so:

```
$ echo "My shell is $SHELL"
My shell is: /usr/bin/sh
```

But there are a number of special features we can use when expanding parameters. There are many options available and you can find them all by running `man bash` and searching for the text `EXPANSION`. Let's take a look at some of the most common ones.

**Length**

The `${#var}` operator returns the length of the variable `var`:

```bash
var="The quick brown fox jumps over the lazy dog"
length=${#var}
echo "Length: $length"
# Prints: 43
```

**Set Default Value**

The `${var:-default}` operator returns the value of the variable `var` or the text `default` if it is not found:

```bash
read -p "Enter your username: " user
username=${user:-$USER}
echo "Username: $username"
# Prints what you typed or the value of $USER otherwise
```

**Substring**

The `${var:start:count}` operator returns a subset of the `var` variable, starting at position `start` and extracting up to `count` characters. If `count` is omitted everything from `start` to the end of the string is returned.

```bash
path="~/effective-shell"
echo "${path:0:2}"
# Prints ~/
echo "${path:2}"
# Prints effective-shell
```

**Make Uppercase**

The `${var^^}` operator returns the value of `var` with the text transformed to uppercase:

```bash
message="don't shout"
echo ${message^^}
# Prints: DON'T SHOUT
```

**Make Lowercase**

The `${var,,}` operator returns the value of `var` with the text transformed to lowercase:

```bash
message="DON'T SHOUT"
echo ${message,,}
# Prints: don't shout
```

**Variable Indirection**

The `${!var_name}` operator returns the value of the variable with the name in specified in the `var_name` variable. This is useful if you want to get the value of a variable but don't know the name of the variable:

```bash
read -p "Enter a variable name: " var_name
echo "The value of '${var_name}' is: ${!var_name}"
```

The output of this snippet would look like this:

```
$ Enter a variable name: SHELL
The value of 'SHELL' is: /bin/bash
```

Notice the similarity to the Array operators such as `${#array[@]}` to get the length of an array.

There are a number of other operators that exist. They allow you to extract parts of a string, apply regular expressions, manipulate the case and perform a number of complex operations. I would avoid these techniques if possible as they are fairly specific to Bash and likely will be confusing to readers. Some of these substitutions are not available in older versions of Bash.

If you need to manipulate text I would recommend that you use the techniques described in [**Part 3 - Manipulating Text**](../../03-manipulating-text/index.md).

It is generally enough to know that if you see special symbols inside a `${variable}` expression then the writer is performing some kind of string manipulation. Hopefully they have included a comment that describes what they are doing to make it easier to follow!

You can find out more about these features in the manual under the `EXPANSION` section[^1].

## The Read Command

The `read` (_read from standard input_)<!--index--> command can be used to read a line of text from standard input. When the text is read it is put into a variable, allowing it to be used in our scripts.

Let's see how this look in action!

```bash
echo "What is your name?"
read
echo "Hello, $REPLY"
```

Run the script - when you have finished writing your name, press 'enter'. This is needed because `read` will keep on reading until it reaches the end of a line, so we need to press 'enter' to complete the input.

```
What is your name?
Dave
Hello, Dave
```

The `read` command reads a line of text from standard input and stores the result in a variable called `REPLY`. We can then use this variable to use the text that was read.

Why is the variable in uppercase? That's because even though we are setting the variable itself, it is still a 'special' variable defined by the shell. It is the variable that `read` puts its input into if we don't explicitly tell `read` what the variable name should be.

#### Reading into a Variable

We can tell the `read` command to put the input it reads into a variable with a name of our choice by specifying the variable name after the command, like so:

```bash
echo "What is your name?"
read name
echo "Hello, ${name}"
```

In general you should provide a variable name for `read` - it will make your script a little easier to understand. Not every user will know that the `$REPLY` variable is the default location, so they might find it confusing if you don't provide a variable name. By specifying a variable name explicitly we make our script easier to follow.

This also shows good coding practices - your variable names should be _descriptive_, and inform the reader of what they are likely to be used for. This makes the script easier to follow and maintain over time.

This is another time that we use a variable name without putting a dollar before it. It might be helpful to remember that the dollar is used when we want to _use_ the variable and the dollar is omitted when we want to _set_ the variable.

#### Prompting for Input

Before you run the `read` command you are probably going to write a message to the user letting them know they need to enter some input. We can either write out a message first to prompt the user, using the `echo` command as shown above, or we can use the special `-p` (_prompt_) parameter:

```bash
read -p "Please enter your name: " name
echo "Hello, $name"
```

Now the output will look like this:

```
Please enter your name: Dave
Hello, Dave
```

**Z-Shell Note**

If you are using the Z-Shell, then this command will fail as `zsh` does not use the `-p` parameter for at prompt. To prompt a user for input with the `read` command in `zsh`, just put a line of text after the command that starts with a question mark:

```bash
read "?Please enter your name: "
echo "Hello, $REPLY"
```

#### Reading Secrets

The `-s` (_silent_) flag can be used to hide the input as it is being written. This is useful if you want to read a secret such as a password:

```bash
read -s -p "Enter a new password: " password
masked_password=$(echo "$password" | sed 's/./*/g') 
echo ""
echo "Your password is: $masked_password"
```

The output of this script will be something like the below:

```
Enter a new password:
Your password is: ********
```

This uses the same trick as before to mask the characters. Note that when we use the `-s` flag, the read command does not print what we've typed - meaning we don't print the 'enter' symbol that the user presses to finish entering text. This means we don't see a new line after the `read` command. So we use `echo ""` to write a newline before we show the output.

#### Limiting the Input

There may be times where you don't want to have the user press 'enter' to indicate that they have finished writing input.

There are a couple of ways we can limit the input. The first is to use the `-n` (_number of characters_) parameter to limit the number of characters that are read:

```bash
read -n 1 -p "Continue? (y/n): " yesorno
echo ""
echo "You typed: ${yesorno}"
```

This script will only wait for the user to type a single character as we used the `-n` flag with the value `1` to specify that we want to read a single character only.

Because the user doesn't press 'enter' at the end of their input, we need to add a blank newline before we show the output - otherwise it would look like this:

```
Continue? (y/n): nYou typed: n
```

It's only when we read a full line of text that we don't need to write an empty line. That's because when we read a full line of text we finish by pressing 'enter', which moves the cursor down to the next line for us.

The other way to limit the input is to specify a character that is to use a _delimiter_ to indicate when `read` should stop reading input:

```bash
read -d ' ' -p "Enter your favourite word (then a space): " word
echo ""
echo "Your favourite word is: ${word}"
```

Because we used the `-d ' '` parameter, the read command will read up until it finds a 'space' symbol. This can be confusing for users however - if they press enter then `read` will read it as a newline and continue waiting for a space. So you should let the user know to finish input with the delimiter you have chosen!

In general using another anything than a newline as the delimiter may be confusing to the user, and also causes some problems when the user wants to type special characters such as backspace, so I would suggest that you avoid this trick. Instead, let the user type their input and then use something like `sed` to extract everything up to the point that you want.

There are a number of other options for the `read` command that you can read about by typing `help read`. But these are the ones that I think you will see most commonly used.

## Mathematics

The shell has some built in features that let you perform mathematical operations. You will commonly perform these operations on variables.

You might assume that you can use symbols like `+` directly in the your scripts to perform mathematical operations - but they may not perform as expected. For example, here's what happens if you try to add two numbers together with the `+` plus symbol:

```bash
read -p "Enter a number: " number1
read -p "Enter another number: " number2
sum=$number1+$number2
echo "The sum of $number1 and $number2 is $sum"
```

If you run this script you'll see something like this:

```
Enter a number: 23
Enter another number: 34
The sum of 23 and 34 is 23+34
```

The result we see is not the sum of the two numbers - it is the two numbers with the literal `+` plus symbol between them.

To tell the shell that we want to perform an arithmetic operation, rather than just write out a mathematical operator, we use the 'double parenthesis' syntax shown below:

```bash
read -p "Enter a number: " number1
read -p "Enter another number: " number2
sum=$(($number1 + $number2))
echo "The sum of $number1 and $number2 is $sum"
```

The output of this script will be something like the below:

```
Enter a number: 23
Enter another number: 34
The sum of 23 and 34 is 57
```

There is an alternative syntax - we can use the `let` keyword to indicate to the shell that we want to perform an arithmetic operation. This would look like this:

```bash
let sum=$number1 + $number2
```

I've included the `let` keyword here for completeness, but I would recommend that you use the double-parenthesis where possible as I think that it is probably the more commonly used construct.

There are many arithmetic operators available. Here's a table showing a few common ones and how they are used:

| Operator | Meaning           | Example                                         |
|----------|-------------------|-------------------------------------------------|
| `+`      | Addition          | `echo $((3+4)) # prints 7`                      |
| `-`      | Subtraction       | `echo $((4-2)) # prints 2`                      |
| `*`      | Multiplication    | `echo $((4*2)) # prints 8`                      |
| `/`      | Division          | `echo $((4/2)) # prints 2`                      |
| `**`     | Exponent          | `echo $((4**3)) # prints 64`                    |
| `%`      | Modulus           | `echo $((7%3)) # prints 1`                      |
| `++i`    | Prefix Increment  | `i=1; echo $((++i)) # prints 1, i is set to 2`  |
| `i++`    | Postfix Increment | `i=1; echo $((i++)) # prints 2, i is set to 2`  |
| `--i`    | Prefix Decrement  | `i=3; echo $((--i)) # prints 3, i is set to 2`  |
| `i--`    | Postfix Decrement | `i=3; echo $((i--)) # prints 2, i is set to 2`  |
| `i+=n`   | Increment         | `i=3; echo $((i+=3)) # prints 6, i is set to 6` |
| `i-=n`   | Decrement         | `i=3; echo $((i-=2)) # prints 1, i is set to 1` |

If you want to find the complete set of arithmetic operators available or find more details on how arithmetic works in the shell, use `man bash` and search for the text `ARITHMETIC\ EVALUATION` (the backslash is needed to escape the space between the words when searching in the manual).

The script below shows how you can use a combination of operators to convert a value in degrees Celsius to Fahrenheit:

```bash
read -p "Enter a value in Celsius: " celcius
fahrenheit=$(( (celcius * 9/5) + 32 ))
echo "${celcius} degrees Celsius is ${fahrenheit} degrees Fahrenheit"
```

Note that you can use brackets in your arithmetic expressions to be explicit about the order in which the calculations should be performed. The order that is used if you don't use brackets is detailed in the manual page, but in general using brackets will make things clearer to the reader.

## Updating the 'Common' Command

With our new understanding of variables, we can improve the 'common' command we created in the previous chapter by extracting certain values into variables so that they can be more easily changed.

Let's look at our original 'common' command:

```bash
# Write the title of our command.
echo "common commands:"

# Show the most commonly used commands.
tail ~/.bash_history -n 1000 | sort | uniq -c | sed 's/^ *//' | sort -n | tail -n 10
```

We could improve on this by making the number of lines of text in the history we search through and the number of commands to show variables, so that they can be more easily changed.

Create a copy of the `common.v1.sh` script and call it `common.v2.sh` and update it like so:

```bash
# Write the title of our command.
echo "common commands:"

# The following variables control how the command runs.
history_lines=1000 # The number of lines of history to search through
command_count=10   # The number of common commands to show.

# Show the most commonly used commands.
tail ~/.bash_history -n ${history_lines} \
    | sort \
    | uniq -c \
    | sed 's/^ *//' \
    | sort -n -r \
    | head -n ${command_count}
```

We have replaced two 'hard-coded' values (the number of lines of history to search and the number of common commands to show) with variables, which are now easier to find and change. We have also split the command into multiple lines so that it is easier to read (as the line is quite long otherwise).

If you want to replace the installed `common` command with this new one, update the symlink in your _/usr/local/bin_ folder:

```bash
ln -sf $HOME/effective-shell/scripts/common.v2.sh /usr/local/bin/common
```

Note that in this command we use the `-f` flag to force the creation of the symlink even if one already exists in the given location.

# Summary

In this chapter we looked at how environment variables work and how we can use our own variables. We saw how to read input from the user and how to perform arithmetic operations.

We've seen a few new constructs in this chapter that will appear again and again, these are summarised below so that you can recognise them!

- `${variable}` gets the value of `variable` - the braces surround the variable name
- `$(echo "$PAGER")` runs the `echo` command in a subshell - the single parenthesis indicates we are running a subshell
- `$(($left + $right))` adds the values in the variables `left` and `right` - the double parenthesis indicate that we are performing arithmetic

In the next chapter we are going to see how to perform _logic_ in scripts - running commands only when certain conditions are met. This is an incredibly powerful technique and will let you create much more sophisticated scripts!

[^1]: There is also a very good discussion on the differences in quoting options in the following Stack Overflow thread: https://stackoverflow.com/questions/10067266/when-to-wrap-quotes-around-a-shell-variable
