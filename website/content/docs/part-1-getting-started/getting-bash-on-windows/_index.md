---
title: "Getting Bash on Windows"
slug: "getting-bash-on-windows"
weight: 1
---

# Chapter 3 - Getting Bash on Windows 

Shells can vary enormously between different systems.
In general, Linux systems tend to use the `bash` shell and require little configuration. 
Apple's MacOS operating system is actually based on BSD Unix, and under the hood is somewhat different to Linux. 
Microsoft Windows is a completely unrelated operating system and operates in a fundamentally different way to both of them.

In this book, we assume that you are using a "Linux-like" system, something which operates like a modern Linux distribution. 
This is a deliberate choice:
If you become comfortable using a Linux-like shell, you can generally apply the techniques we'll show to other shells with no difficulties. 

Windows is actually being updated at the time of writing to provide a Linux-like shell interface as part of the core operating system. This is known as the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl). 
The Windows Subsystem for Linux allows users to install a Linux distribution on their Windows machine. This is a great way for us to be able to use the "Bash" shell without having to set up a virtual machine.

To enable it, first open up the "Turn Windows Features on or off" option from the control panel:

<a href="images/setup-wsl-1.png"><img alt="Screenshot: Turn Windows Features on or off" src="images/setup-wsl-1.png" width="800px" /></a>

Then enable the "Windows Subsystem for Linux" feature:

<a href="images/setup-wsl-2.png"><img alt="Screenshot: Enable Windows Subsystem for Linux" src="images/setup-wsl-2.png" width="800px" /></a>

After your computer has restarted, open up the Windows App Store and search for "Ubuntu":

<a href="images/setup-wsl-3.png"><img alt="Screenshot: Ubuntu on App Store" src="images/setup-wsl-3.png" width="800px" /></a>

Once Ubuntu has installed, open up the app. It will then initialise (which can take a little while):

<a href="images/setup-wsl-4.png"><img alt="Screenshot: Initialise Ubuntu" src="images/setup-wsl-4.png" width="800px" /></a>

Choose a username and password to complete the setup:

<a href="images/setup-wsl-5.png"><img alt="Screenshot: Choose Username and Password" src="images/setup-wsl-5.png" width="800px" /></a>

And that's it! You can now open the Ubuntu app at any time to use Ubuntu on Windows, interfacing using the Bash shell.
