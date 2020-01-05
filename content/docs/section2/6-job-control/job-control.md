_Job control_ is a feature of most shells, which is generally not particularly intuitive to work with. However, knowing the basics can help prevent you from getting yourself into a tangle, and can from time to time make certain tasks a little easier.

In this chapter, we'll look at the main features of job control, why it can be a problematic, and some alternatives.

- [Part 1: Navigating the Command Line](https://www.dwmkerr.com/effective-shell-part-1-navigating-the-command-line/)
- [Part 2: Become a Clipboard Gymnast](https://www.dwmkerr.com/effective-shell-part-2-become-a-clipboard-gymnast/)
- [Part 3: Getting Help](https://www.dwmkerr.com/effective-shell-part-3-getting-hepl/)
- [Part 4: Moving Around](https://dwmkerr.com/effective-shell-4-moving-around/)
- [Part 5: Interlude - Understanding the Shell](https://dwmkerr.com/effective-shell-part-5-understanding-the-shell/)
- **[Part 6: Everything You Don't Need to Know About Job Control](https://dwmkerr.com/dwmkerr.com/effective-shell-6-job-control/)**

## What Is Job Control?

Let's start with an example. I am building a simple web page. It has one `index.html` file, one `styles.css` file, and one `code.js` file. The `index.html` file looks like this:

```html
<html>
  <head>
    <title>My New Project</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <script src="code.js"></script>
  </head>
  <body>
    <!-- Snip... -->
  </body>
</html>
```

Opening the file in a browser doesn't quite work, as it won't load the code or the styles. We need a web server to serve styles and code.

A super-useful one-liner to run a web server on any machine with Python installed is:

```sh
python -m SimpleHTTPServer 3000
```

In fact, this is so useful that I normally _alias_ this command, so that I can just type `serve`. We'll see aliases in a later chapter.

For now, if we run this command (you can get the three sample files here if you want to try this yourself), then we can open the webpage in a browser, with the styles and code loaded:

<img alt="Screenshot: Website" src="/content/images/2019/06/website-screenshot.png" width="600" />

We can also see that the server has served the HTML, JavaScript, and CSS files:

<img alt="Screenshot: Server" src="/content/images/2019/06/server-screenshot.png" width="600" />

All well and good so far.

## The Problem

Let's say we want to now continue using our shell, maybe to edit the website with a terminal editor like Vim or Emacs, or we want to zip up the site, or just run any shell command[^1].

We have a problem. The `python` process is still running - it's serving the website. Our shell is essentially useless, until we stop the server. See what happens when I try to edit a file:

<img alt="Demo: Blocked Shell" src="/content/images/2019/06/blocked-shell.gif" width="600" />

In the example above, I try to run `vi`, but nothing is happening. Standard input is not being read by the server and not being interpreted by the shell.

I have to kill the server by hitting `Ctrl+C` (which sends a `SIGINT`[^2] - we'll see more about signals later), clear my screen to get rid of all of the error messages, then start again.

This is obviously not optimal. Let's look at some solutions.

## Solution 1: Start the Server in the Background

In most shells, you can run a command and instruct the shell to run it in the _background_. To do this, you end the line with an ampersand. Here's how the example would look in this case:

<img alt="Demo: Starting a Background Job" src="/content/images/2019/06/start-in-background.gif" width="600" />

By ending the command with an `&` ampersand symbol, we instruct the shell to run the command as a _background job_. This means that our shell is still functional. The shell has also notified us that this command is running as a background job with a specific _job number_:

```sh
% python -m SimpleHTTPServer 3000 &
[1] 19372
```

In slightly obtuse language, the shell has informed us that it has started a job in the background, with job number `1` and that this job is currently handling the process with ID `19372`.

The ampersand solution is a fairly common pattern used in day-to-day work.

## Solution 2: Move the Server to the Background

Let's say you forgot to start the command in the background. Most likely in this case you'd kill the server with `Ctrl+C` and then start it again with the `&` option. However, what if this was a large file download or a task you didn't want to abort?

In the example below, we'll move the job to the background:

<img alt="Demo: Moving a Job to the Background" src="/content/images/2019/06/move-to-background.gif" width="600" />

The process is currently in the foreground, so my shell is inactive. Hitting `Ctrl+Z` sends a 'suspend' signal to the process[^3], pausing it and moving it to the background.

Let's dissect this:

```sh
% python -m SimpleHTTPServer 3000
Serving HTTP on 0.0.0.0 port 3000 ...
127.0.0.1 - - [03/Jun/2019 13:38:45] "GET / HTTP/1.1" 200 -
^Z
[1]  + 21268 suspended  python -m SimpleHTTPServer 3000
```

The shell echos as I type, so we see `^Z` (i.e., the `Ctrl+Z` chord I entered). The shell responds by moving the process into a background job and suspending it.

The key here is that it is _suspended_. The process is paused. So the web server is no longer serving. If you are following with the sample, reload your browser. The webpage fails to load, as the server process is not able to respond to requests.

To _continue_ the job, in the background, we use the `bg` ('background') command, with a _job identifier_ (which always starts with a `%` symbol - we'll see why soon) to tell the shell to continue the job:

```sh
% bg %1
[1]  + 21268 continued  python -m SimpleHTTPServer 3000
```

The shell lets us know the job is being continued, and if we load the webpage again, the content is shown as expected.

As a final check, we run the `jobs` command to see what jobs the shell is running:

```sh
% jobs
[1]  + running    python -m SimpleHTTPServer 3000
```

And there you have it - our server is running as a background job. This is exactly what we would see if we run `jobs` after starting the server with an `&` at the end. In fact, using an `&` is perhaps an easier way to remember how to continue a suspended job:

```sh
% %1 &
[1]  + 21268 continued  python -m SimpleHTTPServer 3000
```

In the same way ending a command with `&` runs it in the background, ending a job identifier with `&` _continues_ it in the background.

There is at least one more way to move a job to the background[^4], but I have not yet found it useful in any scenarios, and it is overly complex to explain. See the footnote for details if you are interested.

## Moving Background Jobs to the Foreground

If you have a job in the background, you can bring it back to the foreground with the `fg` ('foreground') command. Let's show the jobs, with the `jobs` command:

```sh
% jobs
[1]  + running    python -m SimpleHTTPServer 3000
```

Here I have a background job running a server. Any one of the following commands will bring it back to the foreground:

```sh
fg %1   # Explicitly bring Job 1 into the foreground

%1      # ...or in shorthand, just enter the job id...

fg      # ...if not given an id, fg and bg assume the most recent job.
```

Now the job is in the foreground, and you can interact with the process again however you like.

## Cleaning Up Jobs

You might realise you cannot continue what you are doing because an old job is _still running_. Here's an example:

<img alt="Demo: Cleaning Up Jobs" src="/content/images/2019/06/kill-job.gif" width="600" />

I tried to run my web server, but there was still one running as a background job. The server failed to start because the port is in use.

To clean it up, I run the `jobs` command to list the jobs:

```sh
% jobs
[1]  + suspended  python -m SimpleHTTPServer 3000
```

There's my old web server. Note that even though it is suspended, it'll still be blocking the port it is serving on[^5]. The process is paused, but it is still holding onto all of the resources it is using.

Now that I know the job identifier (`%1` in this case), I can kill the job:

```sh
% kill %1
[1]  + 22843 terminated  python -m SimpleHTTPServer 3000
```

*This is why job identifiers start with a percentage sign!* The `kill` command I have used is not a special job control command (like `bg` or `fg`). It is the normal `kill` command, which terminates a process. But shells that support job control can normally use a job identifier in place of a _process identifier_. So rather than working out what the process identifier is that I need to kill, I can just use the job identifier[^6].

## Why You Shouldn't Use Jobs

Avoid jobs. They are not intuitive to interface with, and they suffer from some serious problems. 

The most obvious one is that all jobs write to the same output, meaning you can quickly get garbled output like this:

<img alt="Screenshot: Garbled Output" src="/content/images/2019/06/output.png" width="600" />

This is what happens when I run a job, which just outputs text every second. It's in the background, but it's printing all over my commands. Even running the `jobs` command to try and find the job to stop it is difficult.

Input is even more complex. If a job is _running_ in the background, but requires input, it will be _silently suspended_. This can cause confusion.

Jobs _can_ be used in scripts but must be done so with caution and could easily confuse a consumer of the script if they leave background jobs hanging around, which cannot be easily cleaned up[^7].

Handling errors and exit codes for jobs can be problematic, causing confusion, poor error handling, or overly complex code.

## How to Escape Jobs

If there are two things to take away, it would be this:

> If you have started running a command in the foreground, and you don't want to stop it and would rather move it to the background, hit `Ctrl+Z`. Then Google "job control".

And:

> If you think there is a job running in the background, and it is messing with your screen, type `fg` to bring it to the front and kill it with `Ctrl+C`. Repeat as needed!

In either case, if you need to do something more subtle, you can return to this reference. But the first command should allow you to get your shell back while you work out how to continue the job, and the second should kill a background job that is messing with your screen.

## Alternatives to Jobs

If you are using any kind of modern terminal such as iTerm, Terminal or the GNOME Terminal, just open a new tab or split! Much easier.

The benefit to this is that each tab gets its own standard input and output, so there's no risk of overwriting. And of course you can hide/reveal/rearrange the tabs however you like.

The traditional alternative to a job for an operator who simply wants more than one thing going on at once would be a _terminal multiplexer_, such as `screen` or `tmux`:

![terminal-multiplexer](/content/images/2019/06/terminal-multiplexer.gif)

Multiplexers work in a very similar way to a modern graphical terminal - they manage many shell instances. The benefits to a modern terminal, such as iTerm, is that you have a very intuitive GUI and lots of features.

The benefits to a multiplexer are that you can run them over SSH sessions to manage complex operations on remote machines and that they run a client-server model, meaning many people can work with many multiplexed processes (and they can persist beyond sessions).

My personal preference is both - I use a modern terminal _and_ run everything inside it in `tmux`. We'll look at both of these options in later chapters.

## Quick Reference

You might find that jobs are useful, or you might find that they are not. Either way, here's a quick reference of some common commands:

| Command     | Usage                                                      |
|-------------|------------------------------------------------------------|
| `command &` | Run the command as a background job.                       |
| `<Ctrl+Z>`  | Move the current process into a background job, suspended. |
| `jobs`      | List all jobs.                                             |
| `fg %1`     | Move background job number 1 into the foreground.          |
| `bg %1`     | Continue background job number 1.                          |
| `kill %1`   | Terminate job number 1.                                    |
| `wait %1`   | Block until job number 1 exits.                            |


If you want to find out more about the gory details of jobs, the best place to start is the [Bash Manual - Job Control Section]( https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Job-Control), or the 'Job Control' section of your preferred shell's manual.

I hope you found this useful, and, as always, please leave comments, questions or suggestions below!

---

## Footnotes

[^1]: If you are not a heavy shell user, this might seem unlikely. But if you do a lot of work in shells, such as sysadmin, devops, or do your coding from a terminal, this happens all the time!

[^2]: Signals like `SIGINT`, `SIGKILL`, `SIGTERM` and so on will be covered in a later chapter.

[^3]: Technically, `SIGTSTP` - which is 'TTY stop'. If you have always wondered about the 'TTY' acroynm, check the previous chatper, [Interlude: Understanding the Shell](https://dwmkerr.com/effective-shell-part-5-understanding-the-shell/).

[^4]: The alternative method is to use `Ctrl+Y`, which will send a _delayed interrupt_, which will continue to run the process until it tries to read from `stdin`. At this point, the job is suspended and the control given to the shell. The operator can then use `bg` or `kill` or `fg` to either move to the background, stop the process, or keep in the foreground as preferred. See: https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Job-Control

[^5]: Another super-useful snippet: `lsof -i -P -n | grep 8000` to find any process that has a given port open. Another one for the aliases chapter!

[^6]: There are times this is needed. If a job runs _many processes_ - for example, by running a pipeline - the process identifier will change as the command moves from one stage of the pipeline to the next. The job identifier will remain constant. Remember, a job is a shell _command_, so could run many processes.

[^7]: To see how bad this can be, create a script that starts jobs, then run it. Then run the `jobs` command to see what is running. The output might surprise you!
