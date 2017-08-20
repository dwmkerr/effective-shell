# Effective Shell Part 2 - Manipulating the Clipboard

This is the second part of my [Effective Shell](https://github.com/dwmkerr/effective-shell) series, which contains practical tips for using the shell more effectively.

In this article I'll show you how you can use the shell as an efficient tool to compliment how you use the clipboard.

## Removing Formatting

Don't you hate it when you have to copy formatted text and don't have an easy way to paste it as *unformatted* text? Here's an example, I want to copy this Wikipedia page on 'bash', and paste it into a Word document:

![Copying and pasting with formatting](./images/strip-formatting-before.png)

Many programs have a shortcut to paste the contents of the clipboard  (such as 'command + shift + v') but if you are like me you might find yourself pasting *into* a plain text editor just to copy *out* the plain text.

If you just run the command `pbpaste | pbcopy`, you can easily strip the formatting:

![Stripping formatting from the clipboard](./images/strip-formatting-after.png)

This little trick can be very useful. We can use this pattern to quickly manipulate the contents of the clipboard.

## Manipulating Text

Let's say someone has emailed me a list of people I need to invite to an event:

```
Artie Ziff
Kirk Van Houten
Timothy Lovejoy
Artie Ziff
Nick Riviera
Seymore Skinner
Hank Scorpio
Timothy Lovejoy
John Frink
Cletus Spuckler
Ruth Powers
Artie Ziff
Agnes Skinner
Helen Lovejoy
```

The problem is:

1. The list has duplicates
2. I need to turn each name into an email address like 'Artie_Ziff@simpsons.com'

We can quickly clean this list up with the shell. First, we copy the text to the clipboard. Then we can sort it:

```bash
$ pbpaste | sort
Agnes Skinner
Artie Ziff
Artie Ziff
Artie Ziff
Cletus Spuckler
Hank Scorpio
Helen Lovejoy
John Frink
Kirk Van Houten
Nick Riviera
Ruth Powers
Seymore Skinner
Timothy Lovejoy
Timothy Lovejoy
```

Then remove the duplicates:

```bash
$ pbpaste | sort | uniq
Agnes Skinner
Artie Ziff
Cletus Spuckler
Hank Scorpio
Helen Lovejoy
John Frink
Kirk Van Houten
Nick Riviera
Ruth Powers
Seymore Skinner
Timothy Lovejoy
```

Replace the underscore with an ampersand:

```bash
$ pbpaste | sort | uniq | tr " " "_"
Agnes_Skinner
Artie_Ziff
Cletus_Spuckler
Hank_Scorpio
Helen_Lovejoy
John_Frink
Kirk_Van_Houten
Nick_Riviera
Ruth_Powers
Seymore_Skinner
Timothy_Lovejoy
```

Then add the final part of the email address:

```bash
$ pbpaste | sort | uniq | tr " " "_" | sed 's/$/@simpsons.com/'
Agnes_Skinner@simpsons.com
Artie_Ziff@simpsons.com
Cletus_Spuckler@simpsons.com
Hank_Scorpio@simpsons.com
Helen_Lovejoy@simpsons.com
John_Frink@simpsons.com
Kirk_Van_Houten@simpsons.com
Nick_Riviera@simpsons.com
Ruth_Powers@simpsons.com
Seymore_Skinner@simpsons.com
Timothy_Lovejoy@simpsons.com
```

This looks perfect! We can now put the transformed text back onto the clipboard:

```bash
$ pbpaste | sort | uniq | tr ' ' '_' | sed 's/$/@simpsons.com' | pbcopy
```

## Thinking in Pipelines

Some of these commands might be unfamiliar, some might not make sense, and you might be thinking 'how would I remember that'. Actually, there are many ways to solve the problem above, this is the one I came up with by iteratively changing my input text.

Here's what I mean - you'll see that I actually build a pipeline like this step-by-step:

![Animation of the process of building a pipeline](./images/pipeline.gif)

(P.S - if you are wondering how I am jumping backwards and forwards a word at a time, check the last chapter '[Navigating the Command Line](www.dwmkerr.com/effective-shell-part-1-navigating-the-command-line/)').

What we're doing here is only possible because these simple commands all follow 'the Unix Philosophy'. They do one thing well, and each command expects it's input to become the input of *another* command later on. Specifically:

1. The commands are primitive and simple - `sort` is sorting a list, `uniq` is making elements unique.
2. The commands don't produce unnecessary output - `sort` doesn't add a header such as `Sorted Items`, which is great because otherwise it would clutter our pipeline.
3. We are chaining commands together, the output of one becomes the input of another.

We don't need a command such as 'Take a muddy list, sort and clean it, then turn pairs of words into an email address' - with a few simple 'workhorse' commands we can easily build this functionality ourselves.

These workhorse commands will be introduced and detailed as we go through the series.

# TODO

- [ ] Come up with a better title!
- [ ] Give examples for linux
