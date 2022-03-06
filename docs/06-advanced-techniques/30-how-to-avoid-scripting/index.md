---
title: 'How to Avoid Scripting - Writing a Dictionary Lookup in Python'
slug: '/part-6-advanced-techniques/how-to-avoid-scripting/'
chapterNumber: 30
---

This book is about being an _effective_ shell user. This is not a book about shell scripting. And sometimes being an effective shell user means knowing when to _not_ use a shell script to solve a problem, but to use an alternative tool such as a programming language.

In this chapter, we'll look at when you might want to _avoid_ shell scripting, what the alternatives might be, the pros and cons of each, and then create a real-world useful tool using Python, that would otherwise be very difficult to create with a shell script. We'll also look at what characterises a 'good' shell tool and how to follow the patterns and conventions set by common tools installed on your system.

## When should you avoid shell scripting?

Shell scripts can be very powerful. As a quick and dirty way to solve a simple problem, they often cannot be beat. But there are reasons you might want to avoid using a shell script:

1. If the problem you are solving is quite complex, the script will be large and hard to manage
2. Shell scripts become hard for others to reason about when they become complex
3. Shell scripts are limited to the features of the shell and the tools on your system - but not every system has the same tools, so complex scripts may not be portable

Shell scripts are sometimes the _only_ sensible tool to use, for example if we wanted to write a script that showed the shell's options and let the user toggle them on and off, a script would be ideal. This is because another technology, such as a Python script, would not know what shell you are using. This would make the Python script needlessly complex.

But in general, as soon as a script gets to more than about a page of code, I tend to think that this a good point at which to consider using an alternative tool.

## What are the alternatives?

There are hundreds of programming languages that exist to help you solve technical problems. But not all of them are ideal as an alternative to a shell script. Some of the questions you might ask of a programming language which you are considering to use to solve a problem that you had previously considered a shell script would be:

1. **Is the programming language going to be available on almost any machine?** Simple shell scripts run almost anywhere without having to install other tools - will the language give me this functionality?
2. **Is the language designed for handling the kind of problem I want to solve?** Does it support console based input and output? Is it easy to write shell-style tools in this language?
3. **Is the language simple and popular** So that others should be able to understand or adapt the script without too much intervention?

Some languages jump to mind as good options for shell scripts:

1. **Python** - it is installed by default on almost every system, highly popular, simple to use and read and works well to write input-processing-output programs.
2. **Ruby** - again, installed on many systems by default. This is a simple language and also highly popular, but perhaps less well-known than Python.
3. **C** - most platforms have a C compiler installed, and C is great for working with low-level system libraries. But it requires compilation, may behave quite differently on different systems, and is fairly complex for others to use.
4. **NodeJS** - Node.js uses Javascript as its language, which is highly popular. It is event-driven, meaning it can be very fast. But the version installed across systems varies considerably, and this can cause headaches when sharing scripts.
5. **Perl** - installed almost universally on any system, very powerful, but possibly less well known nowadays and therefore perhaps less likely to be understood by others.

Now when you are writing _complex_ tools or programs, the criteria will change, you want to use a language and platform that really suits the problem you are solving, or is used already by the team you are working with. But in this chapter we're looking at alternatives to shell scripts to write shell like tools.

Given it's almost universal presence on systems, its huge (and increasing) popularity, and robust standard library (which allows you to use many features without having to have users download additional packages), Python is an excellent choice for writing shell friendly tools.

## What makes a shell-friendly tool?

When we are writing a tool that is aimed at shell users, it makes sense to follow the conventions set by _other_ shell tools. This means that users will be able to use the tool in a familiar way, and complement it by combining it with existing tools on their system. So what makes a shell-friendly tool?

- **Being able to read from standard input** - this allows us to pipe inputs from _other_ tools into our programs (see [Thinking in Pipelines](../../02-core-skills/07-thinking-in-pipelines/index.md) for more on this), we also want to read and process line-by-line, in case the input is very large
- **Being able to write to standard output** - this sounds obvious, but it means making sure that our output can be read by a human operator, but also ideally be processed by other tools such as `cut`, `sed`, `rev` and so on, it also means thinking about how colour will or will not be used in output, and avoiding superfluous output that might make it harder to process the output (such as titles, version numbers and so on)
- **Being able to specify options using sensibly defined flags** - there are many common conventions for how flags or parameters work in tools, using these patterns (rather than inventing our own) will make our tool easier to use. For example, having an `-h` flag to show help is a very common convetion
- **Being able to run on different systems** - shell users are used to being able to use tools like `grep`, `sed` and so on in a similar way across platforms, a well-written tool will do the same
- **Handling errors using shell idioms** - shell-friendly tools use `0` as a status code to indicate success, and define error codes in their documentation, so that people using the tools know how to handle exceptional circumstances

**TODO more chapter links above?**

There are many other conventions and ideas that could be added, but these are some of the fundamentals.

## Writing a Dictionary Lookup Tool in Python

As an example of how to write a shell-friendly tool, we're going to create a simple program that takes a list of words and provides a definition loaded from the online dictionary [Wiktionary](https://wiktionary.org/).

This is a good example of a tool that would be overly complex to write with a shell script. We need to handle input, parse and process it, make HTTP requests to download pages from the internet, parse and process those requests, format the output, and provide some options for the user on how the output looks. A highly experienced shell scripter would likely be able to create this tool with a shell script without breaking a sweat, but it would likely be quite hard for a less experienced user to follow. Python is easy to write and read, has a wealth of online learning resources, and is available on almost any platform.

Our requirements for the tool will be quite simple:

1. Provide a set of words to be looked up
2. Download the definition of the words
3. Write the words to standard output, with the option to format how this output looks
4. Offer help to the user on how to use the tool

We'll also limit ourselves to 'raw' Python using only the standard library - meaning users will not have to install any packages to make this tool work.

:::info Help! I don't know Python!

That's OK! All of the chapters in the section 'Advanced Techniques' will likely stretch you and require some additional learning and experimentation. Don't worry if you don't know Python - I'll explain as much as I can as I go through the chapter. You should be able to take away the key lessons to be learnt without a particular familiarity with the language.

:::

OK - let's get started.

### The Structure of the Program

Normally when I am writing a simple program, I start by creating a structure, just using code comments, which let's me plan how the program will work and then acts as a template for me to develop against.

So let's start by creating a new Python file in our `scripts` folder and open it in our favourite code editor.

```bash
touch ~/effective-shell/scripts/lookup.py
```

Now we'll open the file and create the initial structure, using comments:

```python title="lookup.py"
# First, load the input from the user.

# Now read any parameters or options the user has set.

# Split the input up into individual words.

# Go through every word in our list...

# ...download its definition...

# ...if the definition doesn't exist, track this fact so that we can report
# on it later...

# ...if the definition does exist, parse it from the downloaded data to put it
# into a more readable format.

# Go through each word and its definition and output it to the user, given the
# formatting options specified.
```

Once I have written the basic structure of the program, I tend to write enough code to have very simple working version, so that I can then quickly test it, add additional functionality, and incrementally improve the program.

### Version 1 - Input, Processing, Output

Shell tools take input, process it and produce output. So let's take our structure and create a first cut. This first cut will not perform any processing - it'll just take the input and produce simple output. But it will give us a working starting point to incrementally add more features to.

At this stage I'll share the code in the form of snippets - you can see the code as it evolves by looking in the `~/effective-shell/programs/lookup/` folder.

```python title="lookup-part1.py"
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
    # beginning and end of it. For now, we don't have a defintition.
    word = word.strip()
    found = False
    definition = ''

    # Write the result.
    if found:
        print("{} - {}".format(word, definition))
    else:
        print("Failed to find a defintition for '{}'".format(word))

# Because we didn't actually define the words, exit with an error code.
sys.exit(1)
```

Let's test this out and then we'll dissect the code. First, we'll just run the program, type some words, then press `Ctrl D` to signal end-of-transmission (check [Thinking In Pipelines](../../02-core-skills/07-thinking-in-pipelines/index.md) if you need a reminder on what 'end-of-transmission' means). You can also press `Ctrl C` to close the program.

```
$ python3 ~/effective-shell/programs/lookup/lookup-part1.py
one
Failed to find a defintition for 'one'
two
Failed to find a defintition for 'two'
three
Failed to find a defintition for 'three'
```

The program successfully reads our input, and writes out a result for each word.

We can also test that the program can receive input piped from a file:

```
$ cat ~/effective-shell/data/words.txt | python3 ~/effective-shell/programs/lookup/lookup-part1.py
Failed to find a defintition for 'louche'
Failed to find a defintition for 'liana'
Failed to find a defintition for 'lieder'
Failed to find a defintition for 'Manchu'
Failed to find a defintition for 'Nankeen'
Failed to find a defintition for 'naevi'
Failed to find a defintition for 'Ness'
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
    found = False
    definition = ''
```

If we found it then we write the word and its definition, if we didn't find it we show an error message.

```python
    if found:
        print("{} - {}".format(word, definition))
    else:
        print("Failed to find a definition for '{}'".format(word))
```

Finally, we exit with a non-zero status code, meaning the program has failed. This is correct because we haven't actually successfully looked up any words!

```python
sys.exit(1)
```

Now let's look at actually downloading the definition.

### Part 2 - Downloading the Definition

Now that we've got the list of words, we can try and download a definition of each one by using the excellent https://dictionaryapi.dev/ website. This site searches a number of online dictionaries, including Wiktionary.

We will add a new function to the script. You can see the complete script in the file `~/effective-shell/programs/lookup/lookup-part2.py`.

The new function downloads the definition of a word from the dictionaryapi.dev site:

```python title="looup-part2.py"
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
    except Exception as e:
        sys.stderr.write("An error occurred trying to download the definition of '{}'".format(word))
        sys.exit(ERROR_HTTP)
        
    # Now try and parse the data.
    try:
        data = json.loads(raw_json_data)
        first_definition = data[0]['meanings'][0]['definitions'][0]['definition']
    except Exception as e:
        sys.stderr.write("An error occurred trying to parse the definition of '{}'".format(word))
        sys.exit(ERROR_PARSE)

    # Return the result.
    return first_definition
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
    except Exception as e:
        sys.stderr.write("An error occurred trying to download the definition of '{}'".format(word))
        sys.exit(ERROR_HTTP)
        
    # Now try and parse the data.
    try:
        data = json.loads(raw_json_data)
        first_definition = data[0]['meanings'][0]['definitions'][0]['definition']
    except Exception as e:
        sys.stderr.write("An error occurred trying to parse the definition of '{}'".format(word))
        sys.exit(ERROR_PARSE)

    # Return the result.
    return first_definition
```

I'm not going to go through this blow-by-blow, it's a fairly rough and ready way to try and get the definition of a word from an online resource. In a nutshell it does the follow:

1. Make sure that have the right address to search for the word
2. Search for the word and download the result
3. If the word is not found, return an empty result
4. If the word is found, try and decode the definition and return it
5. Close the program if there are errors we cannot recover from

With this new function, we can update the main loop of our program to look like this:

```python title="lookup-part2.py"
    # Strip whitespace from the word and find the definition.
    word = word.strip()
    stripped_word = word.strip()
    definition = search_for_word(stripped_word)
    found = bool(definition),

    # Write the result.
    if found:
        print("{} - {}".format(word, definition))
    else:
        print("Failed to find a definition for '{}'".format(word))
```

If we pass some test words into the program our output looks like this:

```
$ cat ~/effective-shell/data/words.txt | python3 ~/effective-shell/programs/lookup/lookup-part2.py
louche - To make (an alcoholic beverage, e.g. absinthe or ouzo) cloudy by mixing it with water, due to the presence of anethole. This is known as the ouzo effect.
liana - A climbing woody vine, usually tropical.
lieder - An art song, sung in German and accompanied on the piano.
Manchu -
Nankeen - A type of cotton cloth originally from Nanking in China.
naevi - A pigmented, raised or otherwise abnormal area on the skin. Naevi may be congenital or acquired, and are always benign.
Ness - A promontory; a cape or headland. (Frequently used as a suffix in placenames.)
```

Pretty cool - our program can find a reasonable definition for most of the words in the test data set we have. Now let's look at cleaning up the output.


TODO: add partial versions to samples

NOTE: linting, testing, etc


Note: When to use the shell:
- Universal compatibility such as for installing ruby, node, nvm etc (the set_ps1 script is an example)
- When we need a shell function, e.g show options
- When we want to execute programs (this is often not safe in code)

Old notes:
- When to *not* script: diving into C, Python, Ruby, Node
- How to write shell programs: Recognising `stdin` as input, silencing output, writing to stdout/stderr, modern syntax (`command verb` such as `k8s` and `s3`).

---

Ideas

rcut - too simple
Folder Sizes - `du -hs your_directory`
Largest files - `du -a /dir/ | sort -n -r | head -n 20`
Find duplicate files - `find . ! -empty -type f -exec md5sum {} + | sort | uniq -w32 -dD`
```

```
from lxml import html

xm = html.fromstring(h)
div = xm.xpath("//div[@class='main-content']")[0]
print(div.text  + "".join(map(html.tostring, div.xpath("./*"))))
```

```
# check if color
if sys.stdout.isatty():
    # You're running in a real terminal
else:
    # You're being piped or redirected
```

- HTML encode word
- Error codes
- Pipe in
- Short flag
- Link Flag
- Open definition flag (i.e. in browser)
- stdin include EOL EOT and cue
- stdout
- colorise output
- manpage
- shebang / store
- dictionary (prog name)
- short
- fuzzy
- shebang as a comment
- when interative, use an empty line to end transmission
- don't error if words are not found, just don't print them
- debug flag to show error details
- ctrl+C for line read and html

TODO move everything except basic foratting to the final version which is not shown but included in the samples for reference


