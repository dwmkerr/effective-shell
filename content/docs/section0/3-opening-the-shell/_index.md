---
title: "Opening the Shell"
slug: "opening-the-shell"
date: "2020-01-16"
description: "Now that you know what the shell is, let's open it and see it in action!"
weight: 2
---
# Opening the Shell

Now let's actually learn how to open the shell on your computer.

Once we've done this, we might need to make some configuration changes so that we get it to behave in a way which as consistent with _other_ shells as possible - we'll get to that in the next chapter.

## Microsoft Windows

There are a number of shell programs on Microsoft Windows. We'll be using the basic shell which is pre-installed, which is called the "Command Prompt".

To open the command prompt, start by clicking the start button on the bottom left hand side of the screen, and type `command prompt`. Open the Command Prompt program:

<img alt="Screenshot: Search for Command Prompt" src="images/windows-search-command-prompt.png" width="800px" />

Once the program has opened, type `whoami` then hit the Return key. The `whoami` program will show the username of the logged in user:

<img alt="Screenshot: whoami on Windows" src="images/windows-shell-whoami.png" width="800px" />

That's it! We've still got some configuration to do to make this shell behave more like a Linux shell, which this book uses as the standard, but we'll come to that in the next section.

## MacOS

If you are using a Mac, then you just need to run the "Terminal" program to open your shell. Hold down the Command Key and press Space, then type `terminal`. Open the terminal program which is shown:

<img alt="Screenshot: Search for Terminal" src="images/osx-search-terminal.png" width="800px" />

Once the program has opened, type `whoami` then hit the Return key. The `whoami` program will show the username of the logged in user:

<img alt="Screenshot: whoami on OSX" src="images/osx-shell-whoami.png" width="800px" />

That's it! In the next section we'll make some minor configuration changes to keep things consistent with the samples in the book.

## Linux / Unix

If you are using a Linux or Unix system, I'll assume that you are familiar enough with it to open a shell. Which terminal you use should not affect how you use this book, but for consistencies sake be aware that most of the examples are assuming that the user is using Bash version 5.
