# Effective Shell Part 1 - Navigating the Command Line

This is the first part of a series I writing which contains practical tips for using the shell more effectively.

I can't think of a better place to start than *navigating the command line*. As you start to do more and more in the shell, text in the command line can quickly get unweildy. There are some simple tricks you can use to navigate in the command line.

## Basic Navigation

Let's assume we have a very simple command we are writing, which is going to write a quote to a text file:

```bash
echo "The trouble with writing fiction is that it has to make sense, whereas real life doesn't. -- Iain M. Banks" >> quote.txt
```

Navigating around long lines of text is a slow process if you are only relying on the arrow keys, so take the time to learn the following shortcuts:

| Action | Shortcut | Example |
|--------|----------|---------|
| Go to beginning / end | `Ctrl + a` / `Ctrl + b` | ![begin / end](begin-end.gif) |
| Go backwards / forwards one word | `Alt + b` / `Alt + f` | ![backward / forward](forward-backwards.gif) |
| Delete a word / undo | `Ctrl + w` / `Ctrl + -` | ![delete / undo](delete-undo.gif) |
| Delete next word | `Alt + d` | ![delete next word](delete-next-word.gif) |
| Delete all the way to the beginning[^1] | `Ctrl + u` | ![delete to beginning](delete-to-beginning.gif) |
| Delete all the way to the end | `Ctrl + k` | ![delete to end](delete-to-end.gif) |

## Searching for Commands

Another indespensible command is the 'Search History' command, invoked with `Ctrl + R`:

![Search History](search-history.gif)

As you type, your command history is searched, the most recent commands coming first. Use the following shortcuts to complete the operation:

| Action | Shortcut | Example |
|--------|----------|---------|
| Find the next occurence | `Ctrl + r` | ![find next occurence](search-history-next.gif) |
| Run the command | `Enter` | ![execute](search-history-execute.gif) |
| Edit the command | `Right Arrow` | ![edit command](search-history-edit.gif) |
| Stop searching | `Ctrl + g` | ![cancel search](search-history-cancel.gif) |

## Pro Tip: Transposing!

If you've mastered all of the commands here and feel like adding something else to your repetoire, try this:

![transpose-word](transpose-word.gif)

The `Alt + t` shortcut will transpose the last two words. Use `Ctrl + t` to transpose the last two letters:

![transpose-letters](transpose-letters.gif)

These were new to me when I was researching for this article. I can't see myself ever being able to remember the commands more quickly than just deleting the last two words or characters and re-typing them, but there you go!

## Closing Thoughts

If you are ever looking to go deeper, then search the web for *GNU Readline*, which is the library used under the hood to handle the command line in many shells.

All of these shortcuts should be familar to Emacs users. There is in fact a 'Vi Mode' option for readline, which allows you to use vi commands to work with text. You can enter this mode with `set -o vi`, I'll likely come back to this in detail in a later article.

Hope that was useful! GIFs were made with [LICEcap](http://www.cockos.com/licecap/).

#### Footnotes

[^1]: If you are using zsh, then this will clear the entire line.
