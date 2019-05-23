# effective-shell

Text, samples and references for my 'Effective Shell' series.

## Chapters

1. [Navigating the Command Line](http://www.dwmkerr.com/effective-shell-part-1-navigating-the-command-line/)
2. [Become a Clipboard Gymnast](http://www.dwmkerr.com/effective-shell-part-2-become-a-clipboard-gymnast/)
3. [Getting Help](http://www.dwmkerr.com/effective-shell-part-3-getting-hepl)
4. [Moving Around](https://dwmkerr.com/effective-shell-4-moving-around/)
5. [Interlude: Understanding the Shell](https://dwmkerr.com/effective-shell-part-5-understanding-the-shell/)

## Quick References

[![Navigating the Command Line](1-navigating-the-command-line/images/command-line.png)](1-navigating-the-command-line/navigating-the-command-line.md)

## Coming Soon!

If you have arrived on this link, it will be for a link to a section which has not been completed yet. Other chapters I am working on, or planning are:

- Shebangs: How to use, when to use `env`, how shebangs work with multiple shells (e.g. if I source a bash shebang in a zsh, what will happen?)
- Aliases. When to use (and more importantly, when not to use).
- Dotfile management (profile, private, etc)
- Sourcing (bashrc, profile, interactive, noninteractive, etc)
- Background/Foreground Processes
- Understanding Pipelines
- Understand logging (syslog, `logger` etc)
- Terminal Multiplexing: `screen` and `tmux`
- ANSI C Escaping (see https://www.dwmkerr.com/quick-tip-sending-newlines-with-curl/#comment-4375113010)
- Moving Files - `scp`, `aws s3`, `xcopy` etc
- Know Your Arrows! Pipe stdin <, >>, >, 2&>1 etc
- Understanding Commands (`command -v` to see functions, aliases, builtins etc)
- Customising the command prompt
- Basic Shell Scripting
- Internal Variables (https://www.tldp.org/LDP/abs/html/internalvariables.html#PROCCID)

## Proofing Notes

When proofreading, consider:

1. `which` vs `that` - a common error
2. `—` vs `-`

## The Pitch

This is _not_ a book about Shell Programming. There are many excellent Shell Programming books (see below). This is about general terminal and shell skills which will make you effective with many day to day tasks. Some shell programming is covered, but this is primary a book about how to work more effectively with command line interfaces and shells in general.

Possible titles:

**Darkscreen**: 30 ways to use shells and terminals to be more effective developer or operator.

## Shell Programming Books

This is list of useful books which are about Shell Programming, Terminal usage, Vim usage etc.

- [Practical Vim: Edit Text at the Speed of Thought, Drew Niel](https://www.amazon.com/Practical-Vim-Thought-Pragmatic-Programmers/dp/1934356980): Absolutely the best book I've read on Vim, perfect for users of all levels. Written by Drew Niel, who is the author of the amazing [Vimcasts](http://vimcasts.org/) series.
- [Modern Vim: Craft Your Development Environment with Vim 8 and Neovim, Drew Niel](https://pragprog.com/book/modvim/modern-vim) - I've not read it yet but will do so ASAP.

## Improvements

- [ ] Add `tree` to the Chapter 'Moving Around'.
- [ ] `man test` is an excellent way to quickly check common tests (existence of a file etc)

## Ideas

- [ ] Background/Foreground Processes
- [ ] `screen` and `tmux`
- [ ] ANSI C Escaping (see https://www.dwmkerr.com/quick-tip-sending-newlines-with-curl/#comment-4375113010)
- [ ] See if I can get an interview with a shell creator?
- [ ] The history of shells, a shell family tree
- [ ] The rising popularity of commandline interfaces (Borland, VC++ vs Code, Vim etc)
- [ ] Globing (e.g. `cat file{1,2,3}`)
- [ ] Quick aliases (e.g. `D` for ISO8601 date)
- [ ] Watching (e.g. `watch k get pods`)
- [ ] Supercharging autocomplete

## Research

(Note: once this research starts getting used, must create a proper citations/references section)

Great source of shell tricks and tips:

- https://twitter.com/krisnova/status/1109618657305333761?s=11

## Reading List

### Beginners

[Shell Scripting by Jason Cannon](TODO) - For absolute beginners this book might be useful. However, it is _very_ short and really only covers a few topics. I suggest that for a beginners book, something with a bit more content may be better.

Great books!

Shell Scripting: How to Automate Command Line Tasks Using Bash Scripting and Shell Programming - Jason Cannon
How Linux Works, 2nd Edition: What Every Superuser Should Know - Brian Ward
Wicked Cool Shell Scripts, 2nd Edition: 101 Scripts for Linux, OS X, and UNIX Systems - Dave Taylor
The Linux Command Line: A Complete Introduction - William E. Shotts Jr.
