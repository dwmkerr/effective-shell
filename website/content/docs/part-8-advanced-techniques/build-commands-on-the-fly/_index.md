---
title: "Build Commands on the Fly"
slug: "build-commands-on-the-fly"
weight: 17
---

# Chapter 17 - Build Commands on the Fly with Xargs

In the earlier chapters of this part of the book we've seen a number of ways to manipulate text. Now we're going to introduce the `xargs` command and show how to use our text manipulation skills to dynamically build complex commands on the fly.

# Introducing Xargs

The `xargs` [_build and execute commands_] command takes input, uses the input to create commands, then executes the commands. I tend to remember it as "Execute with Arguments" as the name `xargs` sounds a little odd!

How `xargs` is used is probably easiest to see with an example. Let's use it to build a set of commands which will remove any empty files from a folder.

Before we show `xargs` let's create some empty files which we'll later clean up:

```
$ mkdir -p ~/effective-shell/tmp
$ cd ~/effective-shell/tmp
$ touch file{1..100}.txt
```

We're using a nice shell trick here called _Brace Expansion_ - the shell will expand `file{1..100}.txt` into `file1.txt`, `file2.txt` and so on, all the way to `file100.txt`.

We could just look for empty files in our `/tmp` folder for this example, but a file in that folder might be in use, so a safer way to demonstrate `xargs` is to use some temporary files which we create ourselves.

We could search for empty files with the command below:

```
$ find . -empty
file1.txt
file2.txt
file3.txt
file4.txt
file5.txt
...
```

{{< hint info >}}
**A refresher on Finding Files**

In this chapter we'll be using the `find` (_find files and folders_) command a lot - if you need a refresher, check [Chapter 11 - Finding Files]({{< relref "/docs/part-5-getting-faster/finding-files" >}}).

{{< /hint >}}

The `find` command has outputted a list of files, now we want to use the `rm` (_remove file_) command to delete each one. Let's just _pipe_ the list of files to the `rm` command; check [Chapter 13 - Pipelines in Action]({{< relref "/docs/part-4-redirection-and-pipes/pipelines-in-action/" >}}) if you need a reminder of how piping works:

```
$ find . -empty | rm
rm: missing operand
Try 'rm --help' for more information.
```

What's going on here? Well basically the issue is that the `rm` command doesn't actually read the list of files from _stdin_, the list of files has to be passed as a parameter to the command. How can we take this list of files and pass it to `rm` as a set of parameters?

This is what `xargs` is for! Before we delete the files, let's just see what happens when we pass the list to `xargs`:

```
$ find . -empty | xargs
./file40.txt ./file8.txt ./file35.txt ./file81.txt ...
```

By default `xargs` take the input, joins each line together with a space and then passes it to the `echo` command. The `echo` command writes it out to the screen.

We can change the command `xargs` passes the arguments to:

```
$ find . -empty | xargs echo rm
rm ./file40.txt ./file8.txt ./file35.txt ./file81.txt ...
```

Very interesting! Now we've told `xargs` to pass the output to the `echo rm` command - this just writes out `rm` followed by the list of files. Putting `echo` before whatever command you want to run is a useful way to _check_ the command before we commit to running it.

Let's finish the job and delete each file:

```
$ find . -empty | xargs rm
```

Done! You can run `ls` to confirm that the file has been deleted.

This is `xargs` - it _constructs and executes_ a command using _arguments_ from _standard input_. Now let's see how we can take this further.

# Handling Whitespace, Special Characters and Tracing

One common challenge with `xargs` is how to deal with spaces. To see what I mean, let's create three files with spaces in the names:

```
$ touch "chapter "{1,2,3}.md
$ find . -type f
./chapter 1.md
./chapter 2.md
./chapter 3.md
```

What if we wanted to delete these files? Let's try that with `rm`:

```
$ find . -type f | xargs rm
rm: cannot remove './chapter': No such file or directory
rm: cannot remove '1.md': No such file or directory
...
```

The file name has a space in it, which is confusing `rm` as it thinks we're providing six paths rather than three.

We can use the `-t` (_trace_) option to see what `xargs` actually tried to do:

```
$ find . -type f | xargs -t rm
rm ./chapter 1.md ./chapter 2.md ./chapter 3.md
...
```

Hopefully you can spot the error - the `rm` command thinks it needs to remove six files, because there are spaces in the filenames and there are not quotes around the filenames to let `rm` know this!

Fortunately, `find` loves `xargs` - they are part of the same package of tools (which is called 'findutils'). And there's a special pair of options that can deal with this.

For find, we are going to use the `-print0` action and for `xargs` we'll use the `-0` option. Let's see how it looks now, then describe what's going on under the hood:

```
$ find . -type f -print0 | xargs -0 -t rm
rm './chapter 1.md' './chapter 2.md' './chapter 3.md' 
```

In [Chapter 11 - Finding Files]({{< relref "/docs/part-5-getting-faster/finding-files" >}}) we saw that the _default_ action of the `find` command is `-print`, which writes out the path of each item found. The `-print0` action is very similar - but it instead it writes out each item followed by a special 'null' character[^1].

Now that we've told `find` to end each result with a special 'null' character, we just tell `xargs` that the 'null' character is what separates each line of input. We do this with the `-0` (_use NUL as separators_) option.

You don't need to really understand the internals - if you are a computer programmer it might make sense, this is how strings in things like the C Programming language work. All you need to know is that it means the `xargs` program won't get confused when it sees spaces, tabs, quotes, newlines, or anything else which might be goofy in a file name.

My recommendation would be to _always_ pair up the `-print0` action with the `-0` option - it means you won't get caught out by odd file names. And definitely make use of the `-t` (_trace_) option to see what `xargs` is actually doing!

# One Command or Many Commands?

By default `xargs` takes all of the input and passes it as a _set_ of arguments to the provided command. We can see this below:

```
$ touch file{1..5}
$ find . -type f | xargs echo
./file1 ./file2 ./file3 ./file4 ./file5
```

We don't need to provide `echo` to `xargs`, it is the default, but I have added it for clarity. But what is really important is that we have called `echo` once and once only.

`xargs` has passed _all_ of the arguments it has been given to the command.

We can tell `xargs` how many lines of input it should use for the command with the `-L` (_max lines_) parameter:

```
$ find . -type f | xargs -L 1 echo
./file1
./file2
./file3
./file4
./file5
```

We've now called the `echo` command once for each line of input, meaning that `echo` has been called five times.

In general if you can provide all of the arguments to a single command the system may be able to process the command slightly faster. However, if there are lots of arguments, the command itself might not be able to handle all of the arguments you give it.

You can set `-L` to other values too - `xargs` will use up to the number of lines provided:

```
$ find . -type f | xargs -L 3 echo
./file1 ./file2 ./file3
./file4 ./file5
```

Here we've allowed up to three input lines per command.

You will probably _not_ use the `-L` parameter very often, but it is really important that you understand what it does. And that is because many of the other options we'll use _imply_ `-L 1` - we'll see why in the next example.


```
find . -name "chapter*" | xargs rm
rm: cannot remove './chapter': No such file or directory
rm: cannot remove '1.txt': No such file or directory
```

# Constructing more complex commands with the 'I' Parameter

You have probably noticed by now that the `xargs` command puts the arguments it is given at the end of the command you write.

What if you need the arguments to go somewhere else? For example, what if I wanted to copy every text file in a folder to another location?

Here's how we might start - and what'll go wrong!

```
$ find . -name "*.txt" -print0 | xargs -0 -t cp ~/backups
cp /home/dwmkerr/backups ./file2.txt ./file3.txt ./file1.txt
cp: target './file1.txt' is not a directory
```

The problem is that the destination location for where we copy the files has to be the _last_ parameter - but `xargs` puts the list of files at the end of the command.

And by the way - we've used the `-0` parameter to make sure that funny filenames are handled properly (a good habit to get into) and the `-t` parameter to trace - which means we see the command which will be run.

So we need to tell `xargs` where to put the list of arguments. We can do that with the `-I` (_replace string_) parameter. This parameter lets us tell `xargs` exactly where we want to put the arguments:

```
$ find . -name "*.txt" -print0 | xargs -0 -t -I {} cp {} ~/backups
cp ./file2.txt /home/dwmkerr/backups
cp ./file3.txt /home/dwmkerr/backups
cp ./file1.txt /home/dwmkerr/backups
```

Here we have set the 'replacement string' to be `{}`. This means when `xargs` sees `{}` in the command it will replace it with the arguments we provide as its input.

The first observation you might make is that as soon as we use the `-I` parameter it _automatically_ implies that we use the `-L 1` parameter, i.e. we run the command once for each individual input line.

For the example we have shown above, this isn't really necessary, `xargs` could just write all of the arguments. The reason `xargs` does this is that we are not actually limited to using the replacement once only - we can use it multiple times.

Here's a similar example, but in this one we put `.bak` at the end of each filename as we copy it:

```
$ find . -name "*.txt" -print0 | xargs -0 -t -I {} cp {} ~/backups/{}.bak
cp ./file2.txt /home/dwmkerr/backups/./file2.txt.bak
cp ./file3.txt /home/dwmkerr/backups/./file3.txt.bak
cp ./file1.txt /home/dwmkerr/backups/./file1.txt.bak
```

Because we can use the replacement string multiple times, `xargs` splits up the commands so it is one command per input argument. If it didn't do this and we tried the command above it would not work properly.

The `-I` parameter is incredibly powerful, it lets us construct complex commands.

You don't need to use the `{}` letters as the replacement string, any sequence of characters will work. For example:

```
$ env | xargs -I % echo "You have env var: % set!"
You have env var: SHELL=/bin/bash set!
You have env var: COLORTERM=truecolor set!
You have env var: EDITOR=vi set!
```

In this example we used `%` as the replacement string.

You might wonder why is `{}` so commonly used in examples or the manpages. The reason is that this is the default replacement string used by `find` if we perform an action like `-exec`:

```
$ find . -type f -empty -exec stat {} \;
```

The `{}` characters are used as the placeholder for files found with the `find` command, so people often use the same placeholder for `xargs`, but you are not required to use these characters.

# Requesting Confirmation with the Prompt Option

The `-p` (_prompt_) option tells `xargs` to ask the user to confirm each command before it is run.

Let's test this out by deleting a set of 'pods' from a Kubernetes cluster. You don't have to worry about what a Kubernetes cluster is, I'm just using this as an example to highlight that you don't have to be limited to using `find` as the input for `xargs`!

On my machine I can show the pods available to me in my cluster with this command:

```
$ kubectl get pods -o name
pod/my-app
pod/nginx
pod/postgres
```

Three pods are shown. I could use this command to build input to `xargs` to let me to chose which pods to delete, interactively:

```
$ kubectl get pods -o name | xargs -L 1 -p kubectl delete
kubectl --context minikube delete pod/my-app?...n
kubectl --context minikube delete pod/nginx?...y
pod "nginx" deleted
kubectl --context minikube delete pod/postgres?...n
```

This is fantastic! We've used `-L 1` to make sure that we only deal with one pod at a time (rather than trying to delete all three at once) and the `-p` flag to ask the user to press 'y' or 'n' in each case. The `xargs` command helpfully shows us what it is going to do and asks for confirmation first.

I think this really hints at the true power of `xargs` - yes it can be combined with `find` to perform operations on files, but it can also be used with other tools to build more complex operations.

# Splitting up Input with a Delimiter

We can ask the user whether they want to see files in _all_ of their 'path' locations with the command below:

```
$ echo $PATH | xargs -d ':' -p -L 1 ls
ls /home/dwmkerr/.pyenv/shims ?...n
ls /home/dwmkerr/.nvm/versions/node/v14.15.1/bin ?...n
```

The `$PATH` environment variable holds all of the folders the shell will search in for binaries - and each folder is separated by a `:` colon character (you can read more about `$PATH` in [Chapter 10 - Understanding Commands]({{< relref "/docs/part-5-getting-faster/finding-files" >}}).

We use the `-d` (_delimiter_) parameter to tell `xargs` that each argument in the input is separated with a colon. We also use the `-L 1` and `-p` parameters to process this input one folder at a time and ask the user if they want to see the contents of the folder.

# Summary

In this chapter we introduced `xargs`, a powerful command which allows us to build other commands on the fly. We can trace, showing how the resulting command will look, ask the user for confirmation, control how many commands we run and more.

There are more options for the `xargs` command, you can read all about them with `man xargs`. But I think if you learn the key parameters we've shown in this chapter you'll be well equipped to use `xargs` in your day to day wok.

In the next chapter we'll look at some of the advanced features which are built into most shells which allow us to manipulate text.

---

**Footnotes**

[^1]: The character is ASCII NUL, which is the number zero. This is often used in programming to represent 'null' or 'nothing at all', not the _digit_ zero as is used when printing to the screen, which is actually represented by number 30. You can see the actual ASCII table with `man ascii`.
