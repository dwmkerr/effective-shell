---
title: 'Shell Snippets'
slug: '/shell-snippets/'
---

After finishing the [Effective Shell Book](https://amzn.to/4ho0F91) I still find myself regularly discovering techniques that are huge time-savers. I've called these **Effective Shell Snippets** and will update this page with them from time to time, so check back regularly!

### Git + AI: Interactively Staging Changes, Summarising with AI

A fun snippet I built is the function `aigac` - this is short for "AI Git Add & Commit". It performs an interactive patch add of changes to the working tree, commits the changes, then uses the [Terminal AI](https://github.com/dwmkerr/terminal-ai) tool to create a commit message with a title and description that follows [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) syntax:

![Demo](./recording/cast)

The function looks like this:

```bash
here's the function
```

And it works by:

1. Interactively staging all of the working changes with the `--patch` option, which lets you visually inspect and edit each change before you stage it
2. Creating a diff of the staged changes
3. Piping that diff to `ai` and asking for a message
4. Piping the message to `git commit` and opening the message in the editor
