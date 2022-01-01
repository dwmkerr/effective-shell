---
title: "Editing Text with Vim"
slug: "editing-text"
weight: 15
---

# Chapter 15 - Editing Text with Vim

A key part of how Linux and Unix systems work is that almost everything is represented as a text file in the system, and almost everything can be *configured* with simple text file.
In this chapter, we'll bring you up to speed on editing text files through the command-line alone.

There are several terminal-based text editors available, including `ed`, `vi`, `vim`, `neovim` and `emacs`. 
The most popular of these are descendants of `vi`, and among them, Vi IMproved (`vim`) is perhaps the most ubiquitous.

## Starting and Quitting

Without any arguments, entering the command `vim` will launch the program with a new, blank text file:

<img alt="Screenshot: Vim Splash Screen" src="images/vim-splash.png" width="800px"/>

To quit, type `:quit` or just `:q`.
Your terminal should be restored to its previous state.

## Entering Text
Vim is a modal text editor: Within the `vim` program, there are multiple modes, each interpreting keypresses differently.
The default mode is *Normal* mode; this is the mode that allows one to move the cursor around the file, and to quit the `vim` program.
You can always get to Normal mode by pressing the escape key.

Let's try writing.
From normal mode, press `i` to enter *insert* mode. 
You should see the text `--INSERT--` in the lower left of `vim`:

<img alt="Screenshot: Vim insert" src="images/vim-insert.png" width="800px"/>

Now our keypresses will be written to the buffer (`vim`'s internal representation of the file).
Try typing *Hello world*:

<img alt="Screenshot: Vim Hello world" src="images/vim-hello-world.png" width="800px"/>

To save the file, we press Escape to return to Normal mode, then type
`:write hello`.  This tells `vim` to write the buffer to the file `hello`:

<img alt="Screenshot: Vim Write Hello" src="images/vim-write-hello.png" width="800px"/>

And that's that: The file is saved as `hello` (in the current directory).

# Moving around

Typically, we want to edit preexisting files.

```
$ vim simpsons-characters.txt
```
