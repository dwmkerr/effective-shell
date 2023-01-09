---
title: 'Mastering Conditional Logic'
slug: '/part-4-shell-scripting/mastering-conditional-logic'
---

In this chapter we'll introduce 'conditional logic', a set of powerful features that allow us to run operations only when certain conditions are met. We'll look at the _if statement_ and the different ways we can evaluate conditions. We'll also look at more sophisticated conditional constructs such as the _case statement_ and the _select statement_, and how to 'chain' commands based on conditions.

Let's get right into it!

## The If Statement<!-- index -->

We can use the _if statement_ to perform operations in shell scripts only when certain conditions are met.

The _if statement_ has the following structure:

```
if <test-commands>
then
    <conditional-command 1>
    <conditional-command 2>
    <conditional-command n>
fi
```

The _if_ statement will run the 'test commands'. If the result of the commands are all zero (which means 'success'), then each of the 'conditional' commands will be run. We 'close' the if statement with the `fi` keyword, which is `if` written backwards.

Let's see how the if statement is used with a simple example. We will try and create a folder using `mkdir`. The `mkdir` command will return zero if the folder is created successfully:

```bash
if mkdir ~/backups
then
    echo "Successfully created the 'backups' folder"
fi
```

If you don't have a folder called _backups_ in your home directory then the command will run successfully. The `mkdir` command will return zero and the conditional statements will be run and you will see the output below:

```
Successfully created the 'backups' folder
```

If you then run the script again, the `mkdir` command will fail. In this case it does _not_ return zero and the conditional commands are not executed. We will see an error message from the `mkdir` command:

```
mkdir: /home/dwmkerr/backups: File exists
```

This is the basics of how the if statement works. We provide test commands, if the test commands succeed, a set of conditional commands are then executed.

You might be surprised to hear that the result of the test commands has to be zero for the conditional commands to run. This is the opposite of how most programming languages work - normally zero would be considered 'false'.

The reason for this - is that for computer programs that run, 'zero' generally means success. Any non-zero value is typically used to indicate an error code. So whilst inside a programming language, an if statement will check for a value to be 'true', just remember that in the shell an if statement will check for a _command to be successful_.

## The Test Command

The `test` (_evaluate expression_)<!--index--> command is used to check whether a certain condition is true or not. If the condition is true then the test command returns zero to indicate success.

We could improve our earlier if statement example by only creating the 'backups' folder if it doesn't already exist, using the test command:

```bash
if ! test -d ~/backups
then
    echo "Creating backups folder"
    mkdir ~/backups
fi
```

The `test` command evaluates an expression. In this case the expression is:

```
-d ~/backups
```

This expression uses the `-d` (_file exists and is a directory_) operator to check to see if the provided path is a directory. We to want to create the directory only if it _doesn't_ exist, so we use the 'not' operator to 'invert' the result of `test`. The 'not' operator is written with the `!` exclamation point symbol.

You can surround an expression with square bracket and the shell will evaluate the expression with the `test` command. This can make your scripts far more compact:

```bash
if ! [ -d ~/backups]
then
    echo "Creating backups folder"
    mkdir ~/backups
fi
```

This square bracket syntax is very commonly used - but just remember it is shorthand for the `test` command.

One of the most useful manual pages is the page for the `test` command as it shows all of the available operators. Open the page with `man test`.

## Using Multiple Statements in a Single Line

You will often see 'if' and 'then' statements on the same line as below:

```bash
if ! [ -d ~/backups ]; then
    mkdir ~/backups
fi
```

The shell assumes that each individual line is a single statement. If you want to put more than one statement on a line then you need to let the shell know when one statement ends and another starts. We can use a semi-colon for this. The shell uses the semi-colon as a 'command separator' symbol.

If you don't include a semi-colon at the end of a command then the shell assumes that the entire line is a single statement. If you try and run the script without the semi-colon you will get an error:

```
bash: syntax error near unexpected token `fi'
```

I would suggest you start by writing your if statements with the if and the then on separate lines. Once you are more familiar with the syntax, you can start to combine the lines if you prefer.

You can put as many statements on a single line as you like - you could even write the script like so:

```bash
if ! test -d ~/backups; then mkdir ~/backups; fi
```

The `then` doesn't require a semi-colon as it is a _keyword_ rather than a command. I think that in general keeping things on separate lines will be a bit more readable for other users, but sometimes you may prefer a more compact form.

## The Else Statement<!-- index -->

You can use the _else statement_ to define a series of statements that should be executed if the condition in the _if_ statement is _not_ true.

Here's how we can write a script that informs the user of whether they have installed the 'common' command or not:

```bash
if [ -e /usr/local/bin/common ]
then
    echo "The 'common' command has been installed in the local bin folder."
else
    echo "The 'common' command has not been installed in the local bin folder."
fi
```

In this case we used the `-e` (_file or folder exists_) operator to check whether a file or folder exists in the location _/usr/local/bin/common_. The 'common' command is the command we created in [Chapter 18 - Shell Script Essentials](../../04-shell-scripting/20-mastering-conditional-logic/index.md).

Now if you run the script and you don't have the 'common' command installed you will see the following output:

```
The 'common' command has not been installed in the local bin folder.
```

Note that we still need to use the 'fi' keyword to close the 'if' statement.

## The Elif Statement<!-- index -->

The _elif statement_ (which is short for 'else if') can be used to create additional checks and define statements that should run if _other_ conditions are true.

Let's see this in action by updating our script to check to see whether the 'common' command is executable, using the `-x` (_is executable_) operator<!-- index -->:

```bash
if [ -x /usr/local/bin/common ]; then
    echo "The 'common' command has been installed and is executable."
elif [ -e /usr/local/bin/common ]; then
    echo "The 'common' command has been installed and is not executable."
else
    echo "The 'common' command has not been installed."
fi
```

The message you see will depend on whether you have installed the 'common' command in your local binaries folder and whether the script is executable. If you want to see each of the different messages, you might find the following snippets useful to add or remove the command or change its executable permissions:

- `ln -s $HOME/effective-shell/scripts/common.v1.sh /usr/local/bin/common` - Create a link to the 'common' command in the local binaries folder
- `chmod -x $HOME/effective-shell/scripts/common.v1.sh` remove the 'executable' flag from the 'common' command, making it not executable
- `chmod +x $HOME/effective-shell/scripts/common.v1.sh` add the 'executable' flag from the 'common' command, making it executable
- `rm /usr/local/bin/common` remove the link to the 'common' command from the local binaries folder

The _elif_ statement looks very similar to the _if_ statement. The statement takes a set of commands. These commands could be normal shell commands, `test` commands, or `test` commands written with the square brackets short-hand notation.

It is very important to think about the order in which the _if_ and _elif_ statement are executed. If we had written the script like this, it would not work:

```bash
if [ -e /usr/local/bin/common ]; then
    echo "The 'common' command has been installed and is executable."
elif [ -x /usr/local/bin/common ]; then
    echo "The 'common' command has been installed and is not executable."
else
    echo "The 'common' command has not been installed."
fi
```

In this script we check to see if the file exists first. If the file exists then the condition `-e` operator will return true, and we will _not_ run the check in the _elif_ statement. This means we'll _never_ successfully evaluate the statements in the _elif_ block (because for the file to be executable it must exist, so the first condition in the _if_ statement will always take precedence. So it is important to think about the order of the statements!

## Common Test Operators

There are many operators that can be used in a `test` expression. You can find the full list by running `man test`.

Here are the most common operators you should know about!

| Operator    | Usage                                                     |
|-------------|-----------------------------------------------------------|
| `-n`        | True if the length of a string is non-zero.               |
| `-z`        | True if the length of a string is zero.                   |
| `var`       | True if the variable `var` is set and is not empty.       |
| `s1 = s2`   | True if the strings `s1` and `s2` are identical.          |
| `s1 != s2`  | True if the strings `s1` and `s2` are not identical.      |
| `n1 -eq n2` | True if the numbers `n1` and `n2` are equal.              |
| `n1 -ne n2` | True if the numbers `n1` and `n2` are not equal.          |
| `n1 -lt n2` | True if the number `n1` is less than `n2`.                |
| `n1 -le n2` | True if the number `n1` is less than or equal to `n2`.    |
| `n1 -gt n2` | True if the number `n1` is greater than `n2`.             |
| `n1 -ge n2` | True if the number `n1` is greater than or equal to `n2`. |

## Common Test Operators for Files

One of the great things about the `test` command is the presence of a number of operators that are specifically used to work with the filesystem. These operators are very handy when you are building shell scripts!

Here are some of the most useful ones:

| Operator          | Usage                                                                                               |
|-------------------|-----------------------------------------------------------------------------------------------------|
| `-d`              | True if the file exists and is a folder.                                                            |
| `-e`              | True if the file exists, regardless of the file type.                                               |
| `-f`              | True if the file exists and is a regular file.                                                      |
| `-L`              | True if the file exists and is a symbolic link.                                                     |
| `-r`              | True if the file exists and is readable.                                                            |
| `-s`              | True if the file exists and has a size greater than zero.                                           |
| `-w`              | True if the file exists is writable.                                                                |
| `-x`              | True if the file exists and is executable - if it is a directory this checks if it can be searched. |
| `file1 -nt file2` | True if file1 is exists and is newer than file2.                                                    |
| `file1 -ot file2` | True if file1 is exists and is older than file2.                                                    |
| `file1 -ef file2` | True if file1 and file2 exist and are the same file.                                                |

There are plenty of other operators that you can use when working with files, you can see them all by running `man test`.

## Combining Tests

Often you will want to check multiple conditions. You can use the `&&` 'and' operator and the `||` 'or' operator to check for multiple conditions:

```bash
if [ $year -ge 1980 ] && [ $year -lt 1990 ]; then
    echo "$year is in the 1980s"
fi
```

This script checks to see whether the variable 'year' is greater than or equal to 1980 and less than 1990.

You can use 'and' or 'or' in a single test statement by using the special `-a` (and) and `-o` (or) operators. This is how the script would look using the `-a` operator:

```bash
if [ $year -ge 1980 -a $year -lt 1990 ]; then
    echo "$year is in the 1980s"
fi
```

These operators can lead to some subtle problems so I would not recommend that you use them. A better option is 'Conditional Expressions' which are described in the next section. However, it is important to be able to recognise these operators so that they don't surprise you if you see them in someone else's script.

## Conditional Expressions

'Conditional Expressions' are a feature of Bash, and bash-like shells, that offer a more sophisticated option to perform conditional checks. Conditional expressions use two square brackets rather than one:

```bash
if [[ $year -ge 1980 && $year -lt 1990 ]]; then
    echo "$year is in the 1980s"
fi
```

Conditional expressions have a number of benefits over plain `test` commands. Some of the most important ones are:

- You can use the `&&` and `||` operators directly in the expression
- If you use an `||` expression and the left hand side of the expression is true, the right hand side will not be evaluated - this is _not_ always the case with older versions of Bash when using the `-o` operator (this is a subtle difference but can help avoid potentially incorrect behaviour)
- Numbers are correctly compared even if they are in different formats (for example, you can compare hexadecimal and octal numbers, this does not work in the standard `test` expression)
- You can use the incredibly useful `=~` operator to use a regular expression in your condition (we'll look at this next)

You can find more details on conditional expressions by using `man bash` and searching for `\[\[` (this is the double square brackets with each one escaped with a backslash).

Some people prefer to use single brackets so that their script is more portable, as the double brackets are specific to Bash and Bash-like shells. Others prefer to use the double brackets so that they can use the additional featured offered.

Whether you use single or double brackets will partly be down to preference and whether it is more important in your use case to have portability or whether it is more important to have the more 'correct' behaviour.

### Using Regexes in a Conditional Expression

When you use the double square brackets conditional expression syntax you can use the `=~` operator to test for a regular expression. This can be extremely useful. If you need a reminder on how regular expressions work check [Chapter 13 - Regex Essentials](../../03-manipulating-text/13-regex-essentials/index.md).

In the example below we check to see if the user's shell is 'zsh' by seeing whether the path of the shell ends with the text `zsh`:

```bash
zsh_regex="zsh$"
if [[ $SHELL =~ $zsh_regex ]]; then
    echo "It looks like your shell '$SHELL' is Z-Shell"
fi
```

If you are running Z-Shell you will see the output below:

```
It looks like your shell '/bin/zsh' is Z-Shell
```

It is best to declare the regular expression in a variable rather than including it directly in the expression, this makes it easier to handle special characters such as the dollar symbol.

You can use capture groups in your regular expression to help you extract text. For example, we could get the name of the current shell binary with the code below:

```bash
shell_regex="([^/]+)$"
if [[ $SHELL =~ $shell_regex ]]; then
    echo "Your shell binary is: ${BASH_REMATCH[1]}"
else
    echo "Unable to extract your shell binary"
fi
```

On my machine this script shows the following output:

```
Your shell binary is: bash
```

The `$BASH_REMATCH` variable is an array - the first result value in the array is the entire match, each subsequent value in the array is the result of each capture group in the expression. Double check [Chapter 19 - Variables, Reading Input, and Mathematics](../../04-shell-scripting/19-variables-reading-input-and-mathematics/index.md) if you need a reminder on how arrays work in Bash.

## Chaining Commands

You can 'chain' commands together in the shell, this allows you to run a command based on the result of a previous command.

Let's take a look at how this would work:

```bash
mkdir -p ~/backups && cd ~/backups
```

In this case we have chained two commands together using the `&&` operator. The shell will only run the second command if the first command succeeds. It _evaluates_ the result of the first command - if it is successful, then it evaluates the second command. It does this because we are trying to evaluate the combination of both commands. Or, if we were to write this in pseudo-code:

```
does (command1 and command2) succeed?
```

If `command` fails, the shell doesn't need to evaluate the second command - the overall result _must_ be false, as the first command has already failed.

Contrast this to the `||` operator:

```bash
[ -d ~/backups ] || mkdir ~/backups
```

In this case we evaluate the second command _only_ if the first command fails. Let's look at the pseudo code:

```
does (command1 or command2) succeed?
```

If the first command succeeds, the shell doesn't need to evaluate the second command. However, if the first command fails, the shell does have to evaluate the second command, to see if either of them succeed.

In summary, here's how command chaining works:

```bash
# Run command1, if it succeeds run command2.
command1 && command2

# Run command1, if it does not succeed run command2.
command1 || command2
```

You will see this syntax a lot in shell scrips as it is very succinct. It can also be very useful when using the shell interactively. For example, it is almost second nature for me to write the following commands:

```bash
make build && make deploy
```

Here I am using the `make` (_build programs_) command. If the 'build' step for a project fails, I want to run the 'deploy' step. But I _don't_ want to run the 'deploy' step if the 'build' step fails!

## Case Statements

If you find yourself writing overly complex 'if statements', you might use a _case statement_<!--index--> to simplify your code.

A case statement is a bit like an 'if statement'. The structure is as follows:

```
case <expression> in
    pattern1)
        <pattern1-commands>
        ;;
    pattern2 | pattern3)
        <pattern2and3-commands>
        ;;
    *)
        <default-commands>
        ;;
esac
```

Typically you will provide the 'case' statement a variable and use it to check against a number of values. Here's a common example you'll see - checking to see whether a response is 'yes' or 'no':

```bash
read -p "Yes or no: " response
case "${response}" in
    y | Y | yes | ok)
        echo "You have confirmed"
        ;;
    n | N | no)
        echo "You have denied"
        ;;
    *)
        echo "'${response}' is not a valid response"
        ;;
esac
```

The example above shows very simple text patterns, but any text pattern can be used:

```bash
read -p "Yes or no: " response
case "${response}" in
    [yY]*)
        echo "You have (probably) confirmed"
        ;;
    [nN]*)
        echo "You have (probably) denied"
        ;;
    *)
        echo "'${response}' is not a valid response"
    ;;
esac
```

In this example the first pattern is `[yY]*` which means either the 'y' or 'Y' character followed by zero or more characters, this will match things like 'yes' 'YES' or 'yay'. We have a similar pattern for the negative response.

The case statement can look quite complex, I often think that even if it takes more lines to write the logic using 'if statements' it will be more readable, but this is common pattern nonetheless and good to know about!

## Updating the 'Common' Command

Now that we know how to use if statements, we can update the 'common' command that we have been improving as part of each chapter.

We will update it to check to see whether the user is using Bash or Z-Shell and search through the history for common commands appropriately.

As a reference, let's look at the `common.v2.sh` command we created in the previous chapter:

```bash
# Write the title of our command.
echo "common commands:"

# The following variables control how the command runs.
history_lines=1000 # The number of lines of history to search through
command_count=10   # The number of common commands to show

# Show the most commonly used commands.
tail ~/.bash_history -n ${history_lines} \
    | sort \
    | uniq -c \
    | sed 's/^ *//' \
    | sort -n \
    | tail -n ${command_count}
```

We'll create a new version of this script called `common.v3.sh` that checks the user's shell to work out what file to use to find the history of commands:

```bash
# The following variables control how the command runs.
shell_binary=""    # We will work out what shell we are in later.
history_file=""    # We will work out the history file later.
history_lines=1000 # The number of lines of history to search through
command_count=10   # The number of common commands to show

# Check to see if we can work out the name of the shell binary.
shell_regex="([^/]+$)"
if [[ $SHELL =~ $shell_regex ]]; then
    # Depending on the name of the shell binary, set the history file path.
    shell_binary=${BASH_REMATCH[1]}
    if [[ $shell_binary == "bash" ]]; then
        history_file=~/.bash_history
    elif [[ $shell_binary == "zsh" ]]; then
        history_file=~/.zsh_history
    fi
fi

# If we are searching through the bash history, we can look at the history file
# to get the most common commands.
if [[ $shell_binary == "bash" ]]; then
    # Show the most commonly used commands.
    tail "${history_file}" -n ${history_lines} \
        | sort \
        | uniq -c \
        | sed 's/^ *//' \
        | sort -n -r \
        | head -n ${command_count}
elif [[ $shell_binary == "zsh" ]]; then
    # Z-Shell history lines look like this:
    # : 1621135004:0;uname -a
    # So we run the same command as above, but use the 'rev | cut | rev' trick
    # to extract everything _after_ the semi-colon, which is the command text.
    tail "${history_file}" -n ${history_lines} \
        | rev \
        | cut -d';' -f1 \
        | rev \
        | sort \
        | uniq -c \
        | sed 's/^ *//' \
        | sort -n -r \
        | head -n ${command_count}
else
    # Show a warning to the user that we don't know where the history file is
    # for their shell.
    echo "Sorry, I don't know where to find the history for '${SHELL}'"
fi
```

In this script we now first check to see if we can extract the name of the shell binary from the shell path. If we can, we store the name of the shell binary and its associated history in a pair of variables.

Then when we come to actually search through the history, we check the shell binary. If it is `bash`, we run the same command as before. If it is `zsh` we run a similar command, but account for the fact that the Z-Shell history file has some extra content which needs to be removed.

Note that as well as showing how to use more variables and if statements, as well as _nested_ if statements (when one if statement is inside another) we can also see that we have very descriptive comments. Each comment is giving clear information on what we are trying to accomplish, which should make the script easier to maintain.

If you want to replace the installed `common` command with this new one, update the symlink in your _/usr/local/bin_ folder:

```bash
ln -sf $HOME/effective-shell/scripts/common.v3.sh /usr/local/bin/common
```

Note that in this command we use the `-f` flag to force the creation of the symlink even if one already exists in the given location.

## Summary

In this chapter we looked at the If statement - an extremely important statement that allows us to perform conditional logic. In the next chapter we will look at another crucial logical feature of the shell - loops.

You can find most of the documentation for conditional logic in the manual, just run `man bash` and search for `GRAMMAR`.
