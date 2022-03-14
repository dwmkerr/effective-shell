---
title: 'How to Avoid Scripting - A Dictionary Lookup in Python'
slug: '/part-6-advanced-techniques/how-to-avoid-scripting/'
chapterNumber: 30
---

This book is about being an _effective_ shell user. This is not a book about shell scripting. And sometimes being an effective shell user means knowing when to _not_ use a shell script to solve a problem, but to use an alternative tool such as a programming language.

In this chapter, we'll look at when you might want to _avoid_ shell scripting, what the alternatives might be, the pros and cons of each, and then create a real-world useful tool using Python, that would otherwise be very difficult to create with a shell script. We'll also look at what characterises a 'good' shell tool and how to follow the patterns and conventions set by common tools installed on your system.

## When should you avoid shell scripting?

Shell scripts can be very powerful. As a quick and dirty way to solve a simple problem, they often cannot be beat. When you combine bring in powerful tools that are built in on most systems such as `awk` (which can perform advanced text manipulation) they can be even more powerful. But there are reasons you might want to avoid using a shell script:

1. If the problem you are solving is quite complex, the script will be large and hard to manage
2. Shell scripts become hard for others to reason about when they become complex
3. Shell scripts are limited to the features of the shell and the tools on your system - but not every system has the same tools, so complex scripts may not be portable

Shell scripts are sometimes the _only_ sensible tool to use, for example if we wanted to write a script that showed the shell's options and let the user toggle them on and off, a script would be ideal. This is because another technology, such as a Python script, would not know what shell you are using. This would make the Python script needlessly complex.

But in general, as soon as a script gets to more than about a page of code, I tend to think that this a good point at which to consider using an alternative tool.

## What are the alternatives?

There are hundreds of programming languages that exist to help you solve technical problems. But not all of them are ideal as an alternative to a shell script. Some of the questions you might ask are:

1. **Is the programming language going to be available on almost any machine?** Simple shell scripts run almost anywhere without having to install other tools - will the language give me this functionality?
2. **Is the language designed for handling the kind of problem I want to solve?** Does it support console based input and output? Is it easy to write shell-style tools in this language?
3. **Is the language simple and popular?** Can others understand or adapt the script without too much intervention?

Some languages jump to mind as good options for shell scripts:

1. **Python** - it is installed by default on almost every system, highly popular, simple to use and read and works well to write input-processing-output programs.
2. **Ruby** - again, installed on many systems by default. This is a simple language and also highly popular, but perhaps less well-known than Python.
3. **C** - most platforms have a C compiler installed, and C is great for working with low-level system libraries. But it requires compilation, may behave quite differently on different systems, and is fairly complex for others to use.
4. **NodeJS** - Node.js uses Javascript as its language, which is highly popular. It is event-driven, meaning it can be very fast. But the version installed across systems varies considerably, and this can cause headaches when sharing scripts.
5. **Perl** - installed almost universally on any system, very powerful, but possibly less well known nowadays and therefore perhaps less likely to be understood by others.

Now when you are writing _complex_ tools or programs, the criteria will change, you want to use a language and platform that really suits the problem you are solving, or is used already by the team you are working with. But in this chapter we're looking at alternatives to shell scripts to write tool that work well when used in the shell.

Given it's almost universal presence on systems, its huge (and increasing) popularity, and robust standard library (which allows you to use many features without having to have users download additional packages), Python is an excellent choice for writing shell friendly tools.

## What makes a shell-friendly tool?

When we are writing a tool that is aimed at shell users, it makes sense to follow the conventions set by _other_ shell tools. This means that users will be able to use the tool in a familiar way, and complement it by combining it with existing tools on their system. So what makes a shell-friendly tool?

- **Being able to read from standard input** - this allows us to pipe inputs from _other_ tools into our programs (see [Thinking in Pipelines](../../02-core-skills/07-thinking-in-pipelines/index.md) for more on this), we also want to read and process line-by-line, in case the input is very large
- **Being able to write to standard output** - this sounds obvious, but it means making sure that our output can be read by a human operator, but also ideally be processed by other tools such as `cut`, `sed`, `rev` and so on, it also means thinking about how colour will or will not be used in output, and avoiding superfluous output that might make it harder to process the output (such as titles, version numbers and so on)
- **Being able to specify options using sensibly defined flags** - there are many common conventions for how flags or parameters work in tools, using these patterns (rather than inventing our own) will make our tool easier to use. For example, having an `-h` flag to show help is a very common convention[^1]
- **Being able to run on different systems** - shell users are used to being able to use tools like `grep`, `sed` and so on in a similar way across platforms, a well-written tool will do the same
- **Handling errors using shell idioms** - shell-friendly tools use `0` as a status code to indicate success, and define error codes in their documentation, so that people using the tools know how to handle exceptional circumstances

There are many other conventions and ideas that could be added, but these are some of the fundamentals.

## Writing a Dictionary Lookup Tool in Python

As an example of how to write a shell-friendly tool, we're going to create a simple program that takes a list of words and provides a definition loaded from the free and fantastic [Free Dictionary API](https://dictionaryapi.dev).

This is a good example of a tool that would be overly complex to write with a shell script. We need to handle input, parse and process it, make HTTP requests to download pages from the internet, parse and process those requests, format the output, and provide some options for the user on how the output looks. A highly experienced shell programmer would likely be able to create this tool with a shell script without breaking a sweat, but it would likely be quite hard for a less experienced user to follow. Python is easy to write and read, has a wealth of online learning resources, and is available on almost any platform.

Our requirements for the tool will be quite simple:

1. Allow the user to provide a set of words to be looked up as a text file or from standard input
2. Download the definition of the words
3. Write the words to standard output, with the option to format how this output looks
4. Offer help to the user on how to use the tool

We'll also limit ourselves to 'raw' Python using only the standard library - meaning users will not have to install any packages to make this tool work.

:::info Help! I don't know Python!

That's OK! All of the chapters in the section 'Advanced Techniques' will likely stretch you and require some additional learning and experimentation. Don't worry if you don't know Python - I'll explain as much as I can as I go through the chapter. You should be able to take away the key lessons to be learnt without a particular familiarity with the language.

:::

Each of the files you'll see in this section are in the `~/effective-shell/programs/lookup` folder.

:::tip Downloading the Samples

Run the following command in your shell to download the samples:

```bash
curl effective.sh | sh
```

:::

OK - let's get started. 

### Version 1 - Basic Structure

First, let's check if Python is installed. There are two versions of Python that are commonly used. Python 3 is the current latest version and should be preferred. This is what we will use. Python 2 is still used by many people, and a lot of existing code is written in Python 2, but where possible Python 2 code should be upgraded to Python 3. Python 2 official went out of support in January 2020.

Check Python 3 is installed by running:

```
% python3 --version
Python 3.9.10
```

In general I would recommend that you explicitly make it clear you are using Python 3 by using the `python3` tool. On many systems the `python` tool points to `python3`, but it is safer to by explicit and use `python3`.

:::tip If Python is not installed

If you see a message such as `command not found: python3`, then you will need to install Python.

:::

Shell tools take input, process it and produce output. So let's take our structure and create a first cut. This first cut will not perform any processing - it'll just take the input and produce simple output. But it will give us a working starting point to incrementally add more features to.

At this stage I'll share the code in the form of snippets - you can see the code as it evolves by looking in the `~/effective-shell/programs/lookup/` folder.

```python title="lookup-v1.py"
import sys

# Read standard input until there is nothing left to read.
while True:
    # Read a line of input.
    word = sys.stdin.readline()

    # If the user hits 'Ctrl+D' to end transmission, readline returns an
    # empty string and we can stop reading.
    if not word:
        break

    # If the input is an empty line or whitespace, skip it.
    if word.isspace():
        continue

    # Add the word to our list of lookups, and strip any whitespace from the
    # beginning and end of it. For now, we don't have a definition.
    word = word.strip()
    definition = ''

    # Write the result.
    print("{} - {}".format(word, definition))
```

Let's test this out and then we'll dissect the code. First, we'll just run the program, type some words, then press `Ctrl D` to signal end-of-transmission (check [Thinking In Pipelines](../../02-core-skills/07-thinking-in-pipelines/index.md) if you need a reminder on what 'end-of-transmission' means). You can also press `Ctrl C` to close the program.

```
$ python3 ~/effective-shell/programs/lookup/lookup-v1.py
one
one -
two
two -
three
three -
```

The program successfully reads our input, and writes out a result for each word.

We can also test that the program can receive input piped from a file:

```
$ cat ~/effective-shell/data/words.txt | python3 ~/effective-shell/programs/lookup/lookup-v1.py
louche -
liana -
lieder -
Manchu -
Nankeen -
naevi -
Ness -
```

So we have a program that can read from standard input, either interactively or from a file. Let's break down the code section by section.

First we create a loop that will run continuously, reading lines from standard input:

```python
lookups = []
while True:
    # Read a line of input.
    word = sys.stdin.readline()
```

If the input is completely empty, then that means we've reached the end of the file or the user has signaled 'end-of-transmission' by pressing `Ctrl+D`:

```python
    if not word:
        break
    if word.isspace():
        continue
```

If the input is just whitespace, such as a newline or tab, we skip it.

Now we record the value of the word with the whitespace that might surround it stripped, note that has _not_ been found and set the definition of the word to an empty string:

```python
    word = word.strip()
    definition = ''
```

Now we write out the word and its definition:

```python
    print("{} - {}".format(word, definition))
```

Now let's look at actually downloading the definition.

### Version 2 - Downloading the Definition

Now that we've got the list of words, we can try and download a definition of each one by using the excellent https://dictionaryapi.dev/ website. This site searches a number of online dictionaries, including Wiktionary.

We will add a new function to the script. You can see the complete script in the file `~/effective-shell/programs/lookup/lookup-v2.py`.

The new function downloads the definition of a word from the dictionaryapi.dev site:

```python title="lookup-v2.py"
def search_for_word(word):
    # Encode the word for HTML.
    encoded_word = urllib.parse.quote(word.encode('utf8'))

    # Try and download the definition using the amazing dictionaryapi.dev site.
    try:
        url = "https://api.dictionaryapi.dev/api/v2/entries/en/{}".format(encoded_word)
        response = urllib.request.urlopen(url)
        if response.status == 404:
            print("NOT FOUND")
            sys.exit(1)
        with urllib.request.urlopen(url) as response:
            raw_json_data = response.read().decode('utf-8')
    # If the word is not found, return an empty definition.
    except urllib.error.HTTPError as http_error:
        if http_error.code == 404:
            return ''
        raise
        
    # Now try and parse the data.
    data = json.loads(raw_json_data)
    first_definition = data[0]['meanings'][0]['definitions'][0]['definition']

    # Return the result.
    return first_definition
```

I'm not going to go through this blow-by-blow, it's a fairly rough and ready way to try and get the definition of a word from an online resource. In a nutshell it does the follow:

1. Make sure that have the right address to search for the word
2. Search for the word and download the result
3. If the word is not found, return an empty result
4. If the word is found, try and decode the definition and return it

With this new function, we can update the main loop of our program to look like this:

```python title="lookup-v2.py"
    # Strip whitespace from the word and find the definition.
    word = word.strip()
    stripped_word = word.strip()
    definition = search_for_word(stripped_word)

    # Write the result.
    print("{} - {}".format(word, definition))
```

If we pass some test words into the program our output looks like this:

```
$ cat ~/effective-shell/data/words.txt | python3 ~/effective-shell/programs/lookup/lookup-v2.py
louche - To make (an alcoholic beverage, e.g. absinthe or ouzo) cloudy by mixing it with water, due to the presence of anethole. This is known as the ouzo effect.
liana - A climbing woody vine, usually tropical.
lieder - An art song, sung in German and accompanied on the piano.
Manchu -
Nankeen - A type of cotton cloth originally from Nanking in China.
naevi - A pigmented, raised or otherwise abnormal area on the skin. Naevi may be congenital or acquired, and are always benign.
Ness - A promontory; a cape or headland. (Frequently used as a suffix in placenames.)
```

Pretty cool - our program can find a reasonable definition for most of the words in the test data set we have. Now let's look at cleaning up the output.

### Version 3 - Formatting the Output

Our program is working quite well, but we can improve on it by making the output a little friendlier to read. We can show the word in a different colour to the definition, separate the definition with a colon which will make it easier for us to process it with other tools, or even limit the length of the definition so that it fits on the screen.

We're also going to let the user provide a 'crop' value if they want to. This is a number that limits the length of the output each line, which could be useful if the user wants to fit the definitions on the screen without them spilling over to the next line.

There is a special module in Python called `argparse` that helps you parse the arguments for a program, we'll use this to specify and parse the 'crop' argument.

You can see the complete script in the file `~/effective-shell/programs/lookup/lookup-v3.py`.

```python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument(
    '-c', '--crop',
    help='crop the output line length',
    type=int,
    nargs='?',
    const=80,         # Default value if -c is supplied
    default=None)     # Default value if -c is not supplied
args = parser.parse_args()
```

The `argparse` module is very sophisticated, you can read more about it online if you'd like to discover more. But for now its enough to know that this code defines an optional argument named `crop`, that can be provided with a number, or without a number. We'll see it in action shortly.

Next we'll add a function that writes a word and its definition in a nicer way:

```python
def write_definition(word, definition):
    # Check if stdout is a terminal - if it is we'll colour the output.
    is_terminal = sys.stdout.isatty()

    # We will separate the word and the definition with a colon and space.
    separator = ": "

    # If the 'crop' argument is set, use it.
    if args.crop:
        output_length = len(word) + len(separator) + len(definition)
        if output_length > args.crop:
            # We need to chop some letters off the end of the definition, but
            # leave space for '...' to indicate the output is cropped.
            new_length = len(definition) - 3 - (output_length - args.crop)
            definition = definition[:new_length] + '...'

    # If we are in a terminal make the word green and the separator white.
    if is_terminal:
        word = "\033[92m" + word + "\033[0m"
        separator = "\033[37m" + separator  + "\033[0m"

    # Write out the word, separator and definition.
    print(word + separator + definition)
```

This code first checks to see whether `stdout` is a terminal. This is useful because if we are in a terminal, we can show colour codes, but if the output is something like a file, we can skip the colour codes (which would look messy in the resulting file). Then we do some arithmetic if the `crop` argument is provided, shortening the definition if needed.

The weird looking characters such as `/033[92m` are ANSI control codes to set the colour of the output - you can read all about them in [Useful Patterns for Shell Scripts](../../04-shell-scripting/23-useful-patterns-for-shell-scripts/index.md) in the section 'Colouring Output'.

With this function added, and called in the right place in our program, we can now lookup definitions, have the output printed in colour, and specify a 'crop' value:

```
$ cat ./effective-shell/data/words.txt | python3 ./effective-shell/programs/lookup/lookup-v3.py -c 60
louche: To make (an alcoholic beverage, e.g. absinthe or ...
liana: A climbing woody vine, usually tropical.
lieder: An art song, sung in German and accompanied on th...
Manchu:
Nankeen: A type of cotton cloth originally from Nanking i...
naevi: A pigmented, raised or otherwise abnormal area on ...
Ness: A promontory; a cape or headland. (Frequently used ...
```

The nice thing about using the `argparse` module is that our program _automatically_ gets a `--help` or `-h` option that can be used to provide instructions:

```
$ python3 ./samples/programs/lookup/lookup-v3.py -h
usage: lookup-v3.py [-h] [-c [CROP]]

optional arguments:
  -h, --help            show this help message and exit
  -c [CROP], --crop [CROP]
                        crop the output line length
```

We've really just scratched the surface of what can be done here. You can find this version of the program in `~/effective-shell/programs/lookup/lookup-v3.py`

## Installing the Lookup Tool

The great thing about a Python script like the one we have built is that it is standalone, and anyone can install it as tool on their system with very little effort.

All we need to do is first tell the shell that if it encounters this script and is asked to execute it, it needs to use the `python3` program. We can do this by putting a shebang at the top of the file:

```python title="lookup.py"
#!/usr/bin/env python3

# ...the rest of the code goes here, it's been omitted for brevity!
```

This shebang uses the `env` program to locate the `python3` program. This is important as `python3` might be installed in different locations on different systems. You can read more about how to use `env` in shebangs in the chapter [Shell Script Essentials](../../04-shell-scripting/18-shell-script-essentials/index.md) under 'Using Shebangs'.

Now that we have a shebang, we can make the file executable using the `chmod` program and link to it from our personal `bin` folder:

```bash
chmod +x ~/effective-shell/programs/lookup/lookup.py
ln -s ~/effective-shell/programs/lookup/lookup.py /usr/local/bin/lookup
```

If you need a reminder how to use the `chmod` tool and `ln` tool to install scripts, check the chapter [Shell Script Essentials](../../04-shell-scripting/18-shell-script-essentials/index.md) under the section 'Installing Your Script'.

Now that we have the tool in our local binaries folder, we can call it like so:

```
$ lookup -c -- effective shell
effective: A soldier fit for duty
shell: A hard external covering of an animal.
```

Note that the `lookup.py` script, which is the final version of the script, has some additional features which are described at the end of the chapter. One of these features is that we can just provide a word or list of words as positional arguments to the command.

Note that the `--` in the command shown above is the 'end of options marker' - this is the standard Linux pattern to indicate that the list of _flags_ is complete, and that what follows is the list of _positional parameters_. If we didn't have this, the tool would think that we are providing `effective` as the value of the `-c` flag. The `--` removes this ambiguity. Many Linux tools support this separator, you can check `man bash` to find out more.

## Improving the Lookup Program

One of the fun things about coding is thinking about all of the exciting additional features you can add!

The final version of the script, which is in the `~/effective-shell/programs/lookup/lookup.py` folder has a set of additional features that you might find useful to explore when building your own programs. These features are:

| Feature                     | Description                                                                                                    |
|-----------------------------|----------------------------------------------------------------------------------------------------------------|
| More robust error handling  | There are exception handlers in the key places the program may fail.                                           |
| Graceful handling of Ctrl+C | Ensure we close cleanly on Ctrl+C without a noisy error message. See `KeyboardInterrupt` in the code for this. |
| More detailed help          | The help text has examples, see `argparse` in the code.                                                        |

There are all sorts of other features you could add as a coding and learning exercise! Here are a few that I considered:

- **A 'browse' flag** - this could open the user's browser to the full definition online
- **Manpages** - an option to install a manpage for the tool, meaning that we can run `man lookup`
- **Clearer interactive mode** - when stdin is a terminal, meaning the user is interactive, show a prompt and instructions
- **A verbose flag** - a `--verbose` flag to show detailed error messages if they are encountered

If you find yourself writing more complex command-line tools in Python, you might also explore the excellent [Click](https://click.palletsprojects.com/en/8.0.x/) Python package. This is a very popular package among Python developers and is used by a number of large and well-established projects. The [Typer](https://typer.tiangolo.com/) package is also worth exploring. The `urllib` package I have used works, but it can be quite unweildy when dealing with more complex options - many developers will prefer alternative packages.

## Summary

In this chapter we looked at alternatives to shell scripts and when we might consider them. We looked at what makes a tool 'shell-friendly'. We also looked at how we can use the highly popular Python language to write a simple but useful shell-friendly tool.

[^1]: There is a detailed description of how options should be specified for GNU tools at http://www.gnu.org/prep/standards/html_node/Option-Table.html#Option-Table
