---
title: "Getting Started"
slug: "getting-started"
weight: 1
---

# Chapter 3 - Getting Bash on Windows 

Shells can vary enormously between different systems.
In general, Linux systems tend to use the `bash` shell and require little configuration. 
Apple's MacOS operating system is actually based on BSD Unix, and under the hood is somewhat different to Linux. 
These days, MacOS ships with `zsh`, a shell largely backwards-compatible with Bash.
Microsoft Windows is a completely unrelated operating system and operates in a fundamentally different way to both of them.

In this book, we assume that you are using a "Linux-like" system, something which operates like a modern Linux distribution. 
This is a deliberate choice:
If you become comfortable using a Linux-like shell, you can generally apply the techniques we'll show to other shells with no difficulties. 

Windows is actually being updated at the time of writing to provide a Linux-like shell interface as part of the core operating system. This is known as the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl). 
As time progresses it will be easier to run commands using the techniques in this book natively, but for now we'll have to tweak a few things.

So, to get Bash working on Windows, we have three options:

1. Use a tool which provides common Linux tools which have been written to work with Windows
2. Use a "virtual machine" running Linux
3. Use the Windows Subsystem for Linux

The first option is the best if you want to actually be able to work with the files on your computer quickly and easily day to day.

The second option is best if you want to be able to experiment with the shell, but keep it completely separate from your main computer and its files.

The final option is best if you are a power user or expert who wants to use the latest WSL features and build the skills with the platform as soon as possible.

We'll go through all options here.

## Option 1: Install Linux Tools

This is probably the easiest option and the one I would recommend for most user. It will let you run something like a Linux shell when you choose to, but not get in your way during day-to-day usage of your computer.

To get a Linux-like experience on a Windows machine, we'll install [Cygwin](https://www.cygwin.com/). Cygwin provides a large set of programs which are generally available on Linux systems, which are designed to work on Windows.

Download the Cygwin installer and start the installation process. You should see something like this:

<img alt="Screenshot: Cygwin Setup" src="images/cygwin-1.png" width="400px" />

Start the installation and tell it to install from the internet (the default option):

<img alt="Screenshot: Cygwin Setup" src="images/cygwin-2.png" width="400px" />

Install for all users in the default location. It is also fine to change the options if you prefer:

<img alt="Screenshot: Cygwin Setup" src="images/cygwin-3.png" width="400px" />

Cygwin will ask you where to install downloaded packages, whether a proxy is needed, and what download sites to use. Leave these options at their default unless you know what you are doing and why you'd need to change them. It will then start downloading. Once it has downloaded the list of available packages to install, it will ask which packages you want. Choose the default option "All":

<img alt="Screenshot: Cygwin Setup" src="images/cygwin-6.png" width="400px" />

The installer will now start downloading and installing the programs:

<img alt="Screenshot: Cygwin Setup" src="images/cygwin-7.png" width="400px" />

Once Cygwin has finished installing, you will have a link to open Cygwin available on the desktop and start menu.

You can use this link to start using the "Bash" shell, or if you prefer you can open the "Command Prompt" as described in [Opening the Shell](../3-opening-the-shell/_index.md) and run the `bash` program:

<img alt="Screenshot: Cygwin Setup" src="images/cygwin-8.png" width="400px" />

Note that you shouldn't use the `--norc` option. I have used it in the screenshot above just so that my Bash looks like it would after a clean install, without my own customisations added.

At this point you have a ready-to-go bash environment and can continue on to the [Summary](../5-summary/_index.md) and [Next Section](../../section1/1-navigating-the-command-line/_index).

## Option 2: Use a Virtual Machine

We can run a virtual machine on Windows which will give us a complete Linux environment. This is an ideal way to create a safe sandbox for experimentation, without changing how the rest of the system is setup.

There are many ways to run a virtual machine on Windows. For this example we'll use the free 'Oracle VirtualBox' tool. VirtualBox will run a virtual machine, and on that virtual machine we will install the popular [Ubuntu](https://ubuntu.com/) distribution of Linux.

First, start downloading Ubuntu, which might take some time as the download is quite large. You will want to install the latest Desktop Edition (which at the time of writing is version 18):

<img alt="Screenshot: Ubuntu Download" src="images/ubuntu-1.png" width="400px" />

While the Ubuntu software downloads, we can install VirtualBox. Go to the [VirtualBox Website](https://www.virtualbox.org) and download the VirtualBox installer. You will need the installer for 'Windows Hosts'.

Once the installer has downloaded, run it to start the installation:

<img alt="Screenshot: VirtualBox Setup" src="images/virtualbox-1.png" width="400px" />

Next you will be asked to configure the installation options. The defaults will be fine for most users:

<img alt="Screenshot: VirtualBox Setup" src="images/virtualbox-2.png" width="400px" />

<img alt="Screenshot: VirtualBox Setup" src="images/virtualbox-3.png" width="400px" />

Then the installation will start:

<img alt="Screenshot: VirtualBox Setup" src="images/virtualbox-4.png" width="400px" />

Once the installation is complete and the Ubuntu installer has downloaded we can move onto the next step.

Open VirtualBox and choose 'New' to create a new Virtual Machine. Ensure "Expert Mode" is selected. Provide a name for the machine and choose "Linux" as the type and "Ubuntu_64" as the version type. Everything else can be left as the default, unless you want to tweak the machine settings:

<img alt="Screenshot: Ubuntu Installation" src="images/setup-ubuntu-1.png" width="800px" />

You will be asked to setup a virtual hard disk. I would recommend the default options for most users:

<img alt="Screenshot: Ubuntu Installation" src="images/setup-ubuntu-2.png" width="800px" />

Once the machine has been created it will be shown in the main VirtualBox window. Select the machine and choose "Start":

<img alt="Screenshot: Ubuntu Installation" src="images/setup-ubuntu-3.png" width="800px" />

When the machine starts up it will ask you for a "Startup Disk". This is the disk which will be used to setup the operating system. Press the "browse" icon, then choose "open" and select the Ubuntu file which you downloaded, which should end in `.iso`:

<img alt="Screenshot: Ubuntu Installation" src="images/setup-ubuntu-4.png" width="800px" />

If this step fails, you may need to disable "Hyper-V" and "Windows Sandbox" by going to "Add or Remove Windows features":

<img alt="Screenshot: Ubuntu Installation" src="images/setup-ubuntu-5.png" width="400px" />

After a short while you will see the Ubuntu installer start up. Choose the "Install Ubuntu" option:

<img alt="Screenshot: Ubuntu Installation" src="images/setup-ubuntu-6.png" width="800px" />

You can specify language settings, what components are installed and more. These options can be left at the default. On the final page, choose the "Erase disk and install Ubuntu" option:

<img alt="Screenshot: Ubuntu Installation" src="images/setup-ubuntu-7.png" width="800px" />

The final step will be to choose a name for the computer, and a username and password to log in with. You can use any values you like here, just don't forget them!

<img alt="Screenshot: Ubuntu Installation" src="images/setup-ubuntu-8.png" width="800px" />

After this the installation will proceed. It might take a little while. After the installation is complete, you will need to restart. If you get an error saying "Please remove installation medium" just power off the machine and restart it. After restarting you can log into the machine with the credentials you specified earlier.

When you have logged in, press the applications icon on the bottom-left of the screen and search for the "Terminal" application:

<img alt="Screenshot: Ubuntu Installation" src="images/setup-ubuntu-9.png" width="800px" />

You are now running the "Bash" shell in the terminal. You can run the `whoami` command to show the current user, or `bash --version` to see the version of Bash which is installed:

<img alt="Screenshot: Ubuntu Installation" src="images/setup-ubuntu-11.png" width="800px" />

That's it! You now have a virtual machine running Ubuntu and Bash which you can use to learn about the shell.

## Option 3: Setup the Windows Subsystem for Linux

The Windows Subsystem for Linux is a relatively new set of features for Microsoft Windows. It allows users to install a Linux distribution on their Windows machine. This is a great way for us to be able to use the "Bash" shell without having to set up a virtual machine.

First, open up the "Turn Windows Features on or off" option from the control panel:

<img alt="Screenshot: Turn Windows Features on or off" src="images/setup-wsl-1.png" width="800px" />

Then enable the "Windows Subsystem for Linux" feature:

<img alt="Screenshot: Enable Windows Subsystem for Linux" src="images/setup-wsl-2.png" width="800px" />

After your computer has restarted, open up the Windows App Store and search for "Ubuntu":

<img alt="Screenshot: Ubuntu on App Store" src="images/setup-wsl-3.png" width="800px" />

Once Ubuntu has installed, open up the app. It will then initialise (which can take a little while):

<img alt="Screenshot: Initialise Ubuntu" src="images/setup-wsl-4.png" width="800px" />

Choose a username and password to complete the setup:

<img alt="Screenshot: Choose Username and Password" src="images/setup-wsl-5.png" width="800px" />

And that's it! You can now open the Ubuntu app at any time to use Ubuntu on Windows, interfacing using the Bash shell.

# Summary

In this section we learnt:

- That this book is for IT professionals, hobbyists or anyone who wants to learn more about how to work with computers
- How to configure the shells for Windows or Mac to behave in a Linux-like way to allow us to follow on with the rest of the book

