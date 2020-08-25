---
title: The Renaissance of the Shell
slug: the-renaissance-of-the-shell
title: "Chapter 6 - Interlude - The Renaissance of the Shell"
slug: "chapter-6-the-renaissance-of-the-shell"
weight: 6
---

# Chapter 6 - Interlude - The Renaissance of the Shell

This is the first of the "interludes" which end each section of the book. They don't teach any specific skills but instead give a little flavour and background about the world of the shell, Linux and modern computing.

In this first interlude we'll look at just why the shell is experiencing something of a renaissance in the modern age of IT.

# Is there a Renaissance of the Shell?

To be honest, it is hard to know whether there is an increase in popularity of the use of the shell and command-line tooling in general. There are data sources which indicate there is more widespread usage amongst the technical community - Stack Overflow tag popularity is one. LinkedIn data on desired skillsets is another. However, disassociating whether there is a general increase in the need for diverse technical skillsets and whether there is a _specific_ increase in the popularity of keyboard and script operated systems is a challenge.

For the purposes of this chapter, we'll instead examine changes in the technology landscape over the last few decades and consider what those changes might mean for the shell, the command-line and similar tools.

We'll look at three specific developments in technology:

- Diversity of programming languages
- Convergence of operating platforms
- DevOps

Each of these developments has a potentially profound impact on how we work with computers, and might hint at the long term need for shell skills.

# The Changing Technology Landscape

So let's look at some of the key changes in the technology landscape over recent years and consider how they might affect the popularity and importance of the shell.

## The Diversity of Programming Languages

There have been many programming languages and platforms over the years. But in recent years it is possible that the diversity has increased at a greater rate than ever before.

With the advent of the internet and the increase in the size of the online technical community, programming has in a sense become more democratised (which we will discuss a little more in the 'citizen coder' section). When in the past it was necessary to find physical books or teachers and tutors to learn a programming language, students can now find a wealth of resources online.

It is perhaps this democratisation which has led to a startlingly diverse world of programming languages. For many years, there were a small number of 'general purpose' languages, and a larger number of highly specialised languages (and associated platforms).


"C", and later, "C++" were the go-to languages for systems programming (sometimes backed up by assembly language). This was the language which kernels and compilers were written in.

"Java" become the 'general purpose' language of choice for applications which had to run on many systems. "Basic" and later "C#" were the standards for Windows platform development. PHP was a staple for web development.

Alongside these giants were the workhorses for specific use cases. Erlang was (and is) a language which is highly popular in the telecommunications industry, where high availability and reliability were paramount. COBOL was the language for the financial industry, where mission critical systems ran on mainframes (and many still do).

Of course there were many other languages, but many of these other languages were highly specific, in a sense C, Java, PHP and later C# dominated the landscape.

Transition to the time of writing. In the Stack Overflow 2020 Technology Survey[^1], the top ten languages most wanted by employers are:

- Python
- JavaScript
- Go
- TypeScript
- Rust
- Kotlin
- Java
- C++
- SQL
- C#

Some of our old friends are there, but there are many new languages, languages which are evolving quickly. Later on in the list we will see Swift, Dart, Ruby, Haskell, Scala. There are many programming languages which are extremely popular today.

Why does this matter for the shell? The answer is that for _many_ new languages, developer tooling is not as mature (some might say bloated) as it is for the 'Workhorse' languages. Java developers are likely very familiar with the Eclipse IDE, Microsoft shops will be familiar with Visual Studio. These are products which have been evolving for years (or decades) to support developers with rich integrated development environments.

For server-side JavaScript, Golang, Rust, Python and other languages, the development environment really is the shell. Modern editors like Visual Studio Code, Atom and so on provide a vast amount of support and tooling, encompassing the features of a full fledged IDE if the user wants. But for modern programming languages, users often have _had_ to rely on the shell to compile, transpile, manage packages, bundle and so on. The average developer today is perhaps much more likely to have to use the shell - to manage Python virtual environments one day, to run Node.js another, to install packages for Golang another.

In time tooling will likely catch up and provide a 'friendly' interface on top of these operations, but many engineers have realised (or always known) that direct access to simple command line tools can be _extremely efficient_ when working, and that overly featured IDEs can get in the way and hide complexity.

The modern programming is often polyglot - having to be at least familiar in a number of languages. The shell provides a common environment and interface for tooling, which is accessible by all, without installing many complex components, for both development and runtime environments.

## Convergence of Operating Platforms

Whilst the variety in programming languages and developer tooling may have increased, in many ways the _operating platforms_ engineers use have become more homogeneous.

In the early days of computing, each operating environment was highly diverse. There were many systems which were used for production and many of them were highly proprietary. Even popular application servers were often closed source and highly specialised.

The modern execution environment however is often fairly uniform. A Linux-like system, with few customisations, which the developer or operator can tweak to suit their needs.

More and more enterprise users have moved away from proprietary Unix platforms to Linux platforms (whether commercial or non-commercial). The earliest cloud environments were using open-source Linux distributions as the available operating systems.

Even Windows has increasing support for Linux-like operation, in the form of the Windows Subsystem for Linux.

Perhaps the greatest movement in this area has been the rapid adoption of Docker as a common container technology. Containers, or container-like systems have been around for a long time, but Docker brought containers to the masses. With Docker, engineers expect operating environments to be even more uniform and Linux-like.

This has made knowledge of the shell extremely valuable. For any containerised workloads, Linux and shell skills are crucial. Kubernetes (as an execution environment) has standardised things even more.

Whilst there are still many workloads which run on proprietary systems, modern solutions are often built to run in containers on Linux. The shell has historically been the most common way to manage Linux systems, and the standardisation of operating environments around Linux, or Linux-like systems has made shell skills even more critical.

## DevOps

Love it or hate it, DevOps has exploded in popularity. DevOps engineers, site-reliability engineers, these kinds of roles may have been unheard of in companies not that long ago and are now becoming ubiquitous.

At its heart, DevOps represents an organisational and cultural change, one that tries to unify the goals of development and operation of software. Rather than having one group focus on feature development and another group focus on reliable software operations, a single group is responsible for both. The theory is that this encourages software engineers to also consider security, reliability, maintainability etc, and operators to also consider speed of delivery.

In practice, regardless of whether teams are genuinely combined, or specialised roles are added to teams, or even if teams are still separated, the lines between development and operations blur somewhat. Software developers are expected to build and plan with knowledge of the execution environment, operators are expected to work with developers to build features which support reliability.

The intersection of these two roles often is in the realm of automation. Automated deployments after testing, automated failover in case of errors, automated alerting when potential issues are discovered, automated provisioning of environments, automated scaling of systems when load increases.

The world of automation is intimately linked to the world of the shell and in particular shell scripting. Many tasks which require automation can be easily achieved using shell scripts. Many aspects of modern environments (such as cloud environments) support provisioning and management of services via scripting. In fact, services which _cannot_ be managed via shell scripts or simple interfaces are increasingly becoming obsolete. If it cannot be scripted, it cannot be automated, and the increasingly complex systems we build _require_ automation.

In practice, this means software engineers are far more likely to have to build shell scripts (or at least understand how to interface with systems via the shell) than they perhaps might have been. Similarly, operators are far more likely to have to _program_ automated routines to manage high availability and so on. Again, the shell and shell scripts are a common way to manage this (even if they are simply entrypoints to more complex systems, such as scripts which execute programs).

The rise in encourages software engineers to also consider security, reliability, maintainability etc, and operators to also consider speed of delivery.

In practice, regardless of whether teams are genuinely combined, or specialised roles are added to teams, or even if teams are still separated, the lines between development and operations blur somewhat. Software developers are expected to build and plan with knowledge of the execution environment, operators are expected to work with developers to build features which support reliability.

The intersection of these two roles often is in the realm of automation. Automated deployments after testing, automated failover in case of errors, automated alerting when potential issues are discovered, automated provisioning of environments, automated scaling of systems when load increases.

The world of automation is intimately linked to the world of the shell and in particular shell scripting. Many tasks which require automation can be easily achieved using shell scripts. Many aspects of modern environments (such as cloud environments) support provisioning and management of services via scripting. In fact, services which _cannot_ be managed via shell scripts or simple interfaces are increasingly becoming obsolete. If it cannot be scripted, it cannot be automated, and the increasingly complex systems we build _require_ automation.

In practice, this means software engineers are far more likely to have to build shell scripts (or at least understand how to interface with systems via the shell) than they perhaps might have been. Similarly, operators are far more likely to have to _program_ automated routines to manage high availability and so on. Again, the shell and shell scripts are a common way to manage this (even if they are simply entrypoints to more complex systems, such as scripts which execute programs).

The rise in popularity of DevOps as a set of practices and beliefs has perhaps made the shell more popular, and more important, than any other recent developments in software engineering.

And for these reasons and many more, learning how to use the shell effectively has never been more relevant or practical.
