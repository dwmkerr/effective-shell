---
title: 'Shell Snippets'
slug: '/shell-snippets/'
---

After finishing the [Effective Shell Book](https://amzn.to/4ho0F91) I still find myself regularly discovering techniques that are huge time-savers. I've called these **Effective Shell Snippets** and will update this page with them from time to time, so check back regularly!

### Git + AI: Interactively Staging Changes, Summarising with AI

A fun snippet I built is the function `aigac` - this is short for "AI Git Add & Commit". It performs an interactive patch add of changes to the working tree, commits the changes, then uses the [Terminal AI](https://github.com/dwmkerr/terminal-ai) tool to create a commit message with a title and description that follows [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) syntax:

![Demo](./casts/aigac.svg)

The function looks like this:

```bash title="https://github.com/dwmkerr/dotfiles/blob/main/shell.functions.d/aigac.sh"
aigac() {
  # Add untracked files but none of their content - so that 'git add --patch'
  # lets us interactively stage new files as well as existing file changes.
  git add -N .
  git add --patch

  # If there's no changes, bail.
  if git diff --cached --quiet; then
    echo "No changes staged for commit."
    return 1
  fi

  # Generate the commit message using terminal-ai. Pipe it into 'git commit'
  # by using the '-F -' (i.e. read from the stdin file). Make sure we edit it
  # in the editor first with '-e'.
  git diff --cached |\
    ai -- 'summarise this git diff into a conventional commit, e.g. feat(feature): short description\n\nlong description' |\
    git commit -e -F - 
}
```

This snippet may change over time - you should be able to find the latest version in my [`dotfiles`](https://github.com/dwmkerr/dotfiles).

### Open GitHub for Current Directory

When I'm working on some code I often want to open its GitHub home page, to check for issues, see the status of pipelines and so on. You can use the [`gh`](https://github.com/cli/cli) CLI for many of these operations, but if I just want to open the webpage, I like use the `ghopen` function:

![Demo](./casts/ghopen.svg)

This command will open the URL shown in your browser.

Here's the code:

```bash title="https://github.com/dwmkerr/dotfiles/blob/main/shell.functions.d/ghopen.sh"
ghopen() {
    # Get the origin for the current repo.
    local origin=$(git remote get-url origin 2> /dev/null)

    # Bail if we're not in a github repo.
    if [[ ($? -ne 0) || ("${origin}" != *github*) ]]; then
        echo "current dir '$(basename "${PWD}")' is not in a github repo..."
        return
    fi

    # The origin probably looks like this:
    # git@github.com:dwmkerr/effective-shell.git
    # The org/repo is everything after the colon and before '.git'.
    local org_repo=$(echo "${origin%.git}" | cut -f2 -d:)
    local url="http://github.com/${org_repo}"

    # Let the user know what we're opening, formatting org/repo in green, open.
    echo -e "opening github.com/\e[32m${org_repo}\e[0m"
    python3 -c "import webbrowser; webbrowser.open_new_tab('${url}')"
}
```

Some useful techniques - all of which are covered in various chapters across the book!

- Stream Redirection: We pipe errors from `git` to `/dev/null` so that we don't spam the user's screen, and check the result of the command with `$?`
- Conditionals: The Bash 'if statement' lets us check whether the origin contains the text 'github'
- Manipulating Text: The `cut` command can quickly cut out everything after the `:` in the origin
- Shell Expansion: We can use the `${origin%.git}` brace expansion to remove `.git` from the end of a variable
- Opening a browser with `python3` is more portable than using `open` or similar

:::tip

A super useful comment on [Reddit](https://www.reddit.com/r/commandline/comments/1jeqznz/comment/miswst8/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
) on an alternative way to do this!

:::

### Makefile Help

This is a snippet I include in every Makefile that I use. It simply adds a default recipe called `help` that shows each recipe in the Makefile along with a description:

![Makefile Help Demo](./casts/make-help/make-help.svg)

All you need to add to your Makefile is the recipe `help` shown below. To add a description to any other recipe just add a comment that follows its name!

:::warning

Makefiles must be indented with tabs, not spaces, copy the source-code from [`makefile-help`](https://github.com/dwmkerr/makefile-help) if the code below doesn't work, it seems that docusaurus might transform tabs to spaces.

:::

```makefile title="https://github.com/dwmkerr/makefile-help"
default: help

.PHONY: help
help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

.PHONY: example
example: # Here's an example of how to add a description!
	@echo "Hello!"
```

This is also documented in a little repo at [github.com/dwmkerr/makefile-help](https://github.com/dwmkerr/makefile-help).
