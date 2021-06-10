# Style Guide

This style guide may be useful when proofing, writing or reviewing changes.

<!-- vim-markdown-toc GFM -->

* [Person](#person)
* [Common Mistakes](#common-mistakes)
* [Hyphenations](#hyphenations)
* [Info](#info)
* [Downloading the Samples](#downloading-the-samples)
* [Z-Shell Hint](#z-shell-hint)

<!-- vim-markdown-toc -->

## Person

I tend to use the first-person plural for this book, so "we" should be preferred to "you" or "one". Examples:

Prefer:

> We are going to learn how to use the shell.

To:

> You are going to learn how to use the shell.

Prefer:

> We will run the `wc` command to count the words in the document.

To:

> You should run the `wc` command to count the words in the document.

This is stylistically a little more informal than "you" and much more so than "one", but the overall tone of the writing is supposed to be somewhat informal and friendly.

## Common Mistakes

Very common mistakes I make:

`which` vs `that` - a common error, good guide here: https://www.quickanddirtytips.com/education/grammar/which-versus-that-0?page=1

I still don't understand intuitively how this works.

I also mix persons from time to time - so reviewing the [Person](#person) notes is useful.

## Hyphenations

Editors have returned copy with different unicode characters for hyphens, which don't render consistently in markdown.

**Avoid**

`—`,`–` 

**Prefer**

`-`

The preferred hyphen is the one which will be written on a standard keyboard.

## Info

If there is content which is more informational, it will in printed form be pulled into a box. You can use the 'info' panel of the provided theme:

```
{{< hint [info|warning|danger] >}}
**Markdown content**  
Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
{{< /hint >}}
```

This is documented at:

https://themes.gohugo.io//theme/hugo-book/docs/shortcodes/hints/

## Downloading the Samples

As a quick reference, the snippet below can be used to show the 'downloading the samples' instructions:

{{< hint info >}}
**Downloading the Samples**

Run the following command in your shell to download the samples:

```sh
curl effective.sh | sh
```
{{< /hint >}}

## Z-Shell Hint

{{< hint info >}}
**Z-Shell**

The `zsh` shell differs considerably from Bash and Bash-like shells in how it handles the `PS1` variable. There is no need for the `\[` or `\]` sequences, there are built in color variables such as `$fg[red]` for 'red' and the special sequences are different (for example, rather than `\u` for username, Z-Shell uses `%n`).

The `set_ps1` function in the samples converts the `PS1` string to Z-Shell format if it is running in Z-Shell. However, this conversion is not perfect as some of the sequences shown in this chapter do not have an equivalent in Z-Shell. If you want to customise a Z-Shell prompt you can check the manual page `man zshmisc` and search for `PROMPT\ SEQUENCES`.
{{< /hint >}}

