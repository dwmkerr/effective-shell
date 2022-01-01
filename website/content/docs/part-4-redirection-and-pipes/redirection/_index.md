---
title: "Redirection"
slug: "redirection"
weight: 7
---

# Chapter XX - Redirection 

Just like we can send the output of a program to another program, we can also send output to a file, in effect saving it for later.

```sh
$ cat ~/playground/text/simpsons-characters.txt | sort | uniq > sorted.txt
```

This time, instead of printing text to screen, it is sent to the file `sorted.txt`.  

# Summary

We'll see pipelines again and again. The standard streams, redirection, pipelines and all of the tricks we've introduced in this chapter are fundamental not only to using the shell effectively, but really understanding how computer programs work.

Don't be worried if this feels like a lot to take in - we'll see more and more examples in later chapters which will help reinforce these concepts. If you find yourself struggling later you might want to quickly review this chapter, because we introduced a lot!

In this chapter we looked at:

- We can _pipe_ the output of one program to the input of another with the pipe `|` symbol 

We also briefly saw some commands:

- `sort` sorts text
- `uniq` removes duplicated lines



- We can _redirect_ a file to the standard input of a program with the `<` operator
- We can _redirect_ the standard output of a program to create or overwrite a file with the `>` operator
- We can _redirect_ the standard output of a program to create or append to a file with the `>>` operator
- We can redirect the standard error of a program to its standard output with `2>&1`
- We can redirect the standard error of a program to another file (such as the 'null' file) with `2>/dev/null`
- We can redirect the standard error of a program to create or append to a file, just like with standard output, using the `>>` operator

- `sed` can replace content in text
- `tr` can replace parts of text
- `wc` can count words or lines of text
- `tee` takes the input stream and sends it straight to the output, but also to a file (like a T-pipe in plumbing)
- `grep` can filter lines


These programs can do a lot more and are workhorses we'll see in more detail through the book.

There are a few chapters which are planned to come later which go into detail on some of the concepts we only briefly touched on:

- Writing Good Programs - How to write programs which use `stdin`, `stdout` and `stderr` sensibly
- The Unix Philosophy - Why we have so many small simple programs which we can pipe together
- Streams in Detail - How streams like `stdin` actually work, especially with things like line endings, command sequences like `^D` and so on
- Signals - A little more on Signals (such as `^C` and `^D`)

When these chapters are published I'll update the links here. If you want to be updated when new chapters are published, you can [Join the Mailing Lits on the Homepage](https://effective-shell.com).

**Footnotes**

[^1]: Technically there is another layer here, which is the `tty`. You can see this by running `tty` in the shell. We'll more about this in the [Interlude - What is a Shell](#TODO) section.
[^2]: Check [Chapter 4 - Becoming a Clipboard Gymnast]({{< relref "/docs/part-5-getting-faster/clipboard-gymnastics" >}}) for how to do this on a Linux or Windows machine.
[^3]: Although always use tricks like this with caution! If we had a _different_ error, perhaps one we really do want to know about, we would lose the message in this case.
[^4]: There is a very detailed explanation of this behaviour at https://linuxnewbieguide.org/21-and-understanding-other-shell-scripts-idioms/.
[^5]: With the correct options, `sed` could likely do this in a single operation, but I'd probably spend a lot longer Googling the right options for it!
