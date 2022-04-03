---
title: 'Master the Multiplexer'
slug: '/part-6-advanced-techniques/master-the-multiplexer/'
chapterNumber: 31
---

If you are regularly using a shell, then learning how to use a terminal multiplexer like `screen` or `tmux` can greatly improve your productivity. In this chapter we'll see how what a terminal multiplexer is, what it is used for, learn how to perform some common tasks and configure a multiplexer to make it even more useful.

## What is a Terminal Multiplexer?

A terminal multiplexer is a program that that allows a user, or many users, to run many programs at once. The multiplexer manages 'sessions' - these sessions run the programs, independently of your shell or terminal. Users can switch between sessions, save them, resume them, or even invite others to join the same session to allow collaboration. Multiplexers also normally offer 'window management' capabilities, allowing you to break your terminal into separate panes, tabs or windows.

The visual below shows a multiplexer in action - the one I am using while I write this chapter:

<img alt="Screenshot: A Terminal Multiplexer" src={require('./images/multiplexer-screenshot.png').default} width="800px" />

In this image I am running the _Tmux_ multiplexer in my terminal. I have split the window into three panes - a large one on the left that contains the text for the chapter, and two smaller ones on the right. The upper right pane builds the effective shell website locally while I write, to check for errors, and the lower right contains a script I was working on.

When I want to switch between the tasks I'm working on, I don't need to start or stop any of the program, I can just switch between the 'panes' in my multiplexer.

At the bottom of the screen there are also two tabs - one that contains the website and the windows I'm currently working in, and another that has some windows for the manuscript for the book.

If I close my shell, the Tmux server is still running the sessions and I can re-open my terminal and resume. If I was to close my computer, when I restart my multiplexer will restart these programs for me, allowing me to pick up where I left off.

## Why use a Multiplexer?

It is not essential to know how to use a multiplexer. But knowing how to use one can certainly help you become a more effective shell user. Some of the key benefits to using a multiplexer are:

**Persistence of Sessions**

Your programs are run independently from your terminal. If your terminal crashes, or freezes, your programs still run. If you are working with a remote machine, then you can run a multiplexer on it to manage your programs. This means that if your connection to the machine is reset, the programs will not stop running. You can re-attach to the session at later point and pick up where you left off. Session management is incredibly useful - you'll wonder how you lived without it if you use the shell a lot.

**Window Management**

Much like modern 'tabbed interfaces', multiplexers can support multiple windows, tabs and panes within a window. This means you can arrange your workspace exactly how you want it. You can save the configuration of your windows and use it later. You can organise different windows into different sessions, allowing you to have many projects running at once, that you can quickly switch between, each one with a layout configured to suit your needs.

**Collaboration**

A multiplexer is a 'client-server' program. This means you as a user are a client and connect to a server that runs the multiplexer. But other users can connect as well - this means you can easily collaborate with other users, sharing your own work, connecting to theirs, or both working on a shared remote machine.

**Configuration**

Multiplexers offer many configuration options to allow you to customise how programs are run and interfaced with, allowing you to set up the ideal environment for you to be effective.

We'll look at a few of the most immediately useful features of multiplexers in this chapter - this will only really be scratching the surface but should be enough to help you decide whether it is a topic you'll investigate further on your own and add to your toolkit.

## Introducing Screen and Tmux

The two most popular multiplexers are probably _GNU screen_ and _Tmux_. GNU screen was created in the late 80s and has been used widely ever since. It is pre-installed on many Linux systems.

Tmux is a more modern multiplexer, created in 2007. It has most of the features of GNU screen, is also open source, and adds some very useful features to make it a little more user friendly.

For the rest of this chapter we are going to look at Tmux in detail. I've chosen Tmux rather than screen because I think its user-friendliness makes it a little better for people who are new to multiplexers. Once you are familiar with Tmux you might decide to switch to GNU screen - if so it will seem very familiar.

## Installing Tmux

Tmux may already be installed on your system. You can check by trying the `tmux -V` command, which shows the current version:

```bash
$ tmux -V
tmux 3.2a
```

If it is not installed, or you do not have version 3 or higher, you should install the latest version of Tmux.  Install Tmux with the package manager for your system. The package name on most distributions is just `tmux`. As an example, on a Debian-based distribution we would install Tmux with:

```bash
apt install -y tmux
```

## Tmux Techniques

Now that Tmux is installed let's see what we can do with it.

### Splitting Windows

Run the `tmux` program by entering the command below:

```bash
tmux
```

We are now going to create some 'splits' - these will split our current window into separate panes. Each pane can run its own program. Let's take a look at a few commands for managing splits and panes.

We can create a _vertical split_ by pressing `Ctrl+B` followed by the `%` percent symbol. We can create a _horizontal split_ by pressing `Ctrl+B` followed by the `"` quotes symbol. Finally, to move between splits, press `Ctrl+B` followed by an arrow key.

The short video demonstrates both types of split and moving between panes:

import AsciinemaPlayer from '../../../src/components/AsciinemaPlayer/AsciinemaPlayer.tsx';

<AsciinemaPlayer style={{'width': '800px'}} src="/casts/483782.cast" poster="npt:0:23" autoPlay={true} preload={true} />

---


---

4. Splits
5. Tabs
6. Sessions
7. Configuration
8. Summary

## Summary

In this chapter we looked at alternatives to shell scripts and when we might consider them. We looked at what makes a tool 'shell-friendly'. We also looked at how we can use the highly popular Python language to write a simple but useful shell-friendly tool.

[^1]: There is a detailed description of how options should be specified for GNU tools at http://www.gnu.org/prep/standards/html_node/Option-Table.html#Option-Table

TODO


TODO diagram

Examples:

- Busting into git
