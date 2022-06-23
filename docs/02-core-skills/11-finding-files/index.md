---
title: 'Finding Files'
slug: '/part-2-core-skills/finding-files'
---

Searching through a system to find files or folders can be complex and time consuming, even with a graphical user interface. In this chapter we'll look at how to use the shell to search for files and folders and some quick ways to accomplish common tasks.

## Introducing the Find Command

The `find` (search for files) command is used to search for files and folders and to perform operations on the results. Let's see it in action by running it in the `~/effective-shell` folder.

:::tip Downloading the Samples


Run the following command in your shell to download the samples:

```bash
curl effective.sh | sh
```

:::

Let's set the current working directory to the `effective-shell` folder and run the `find` command:

```
$ cd ~/effective-shell
$ find
.
./text
./text/simpsons-characters.txt
./scripts
./scripts/show-info.sh
./websites
./websites/simple
./websites/simple/index.html
./websites/simple/styles.css
./websites/simple/code.js
...
```

By default, `find` will list all of the files and folders which are present in the current working directory. It will also show the _children_ of any folders it finds, meaning that it shows the full hierarchy of files and folders.

:::tip Find not working on MacOS


If you are running these samples on MacOS, you will probably see the following output:

```
$ find
usage: find [-H | -L | -P] [-EXdsx] [-f path] path ... [expression]
```

This is the `find` command telling you what parameters can be used. On MacOS the default `find` command does _not_ assume the current working directory.

This is because there is a difference between the MacOS and GNU versions of `find` and in this book I will use GNU wherever possible as it will be more compatible (MacOS is based on the BSD operating system, most Linux distributions use a set of tools which are part of the GNU project - there are sometimes differences).

To run the equivalent command on MacOS, just provide the current directory as a parameter:

```
$ find .
```

A better solution is to install the `findtools` package, which will install the GNU versions of the tools we'll be using:

```
$ brew install findtools
$ gfind
```

If you do install `findtools`, remember that all of the GNU versions of the tools start with `g` - so when reading this chapter substitute `find` with `gfind`.

For more details on what BSD and GNU are, you can check [Chapter - Unix, Linux, GNU and POSIX](../../work-in-progress), which covers these concepts in detail.

:::

So this is the `find` command - you can provide it a directory (or let it use the current directory) and the command will list all of files and folders in the given directory, including all children.

You can also provide multiple directories:

```
$ find /usr/bin /usr/sbin
/usr/bin
/usr/bin/fwupdtool
/usr/bin/gnome-keyring
...
/usr/sbin
/usr/sbin/cupsd
/usr/sbin/pppdump
...
```

This is the most basic use of `find` - showing a file and folder hierarchy. Now let's look at how to search using this command.

# Searching with Find

Perhaps the most common use for `find` is to search for files. There are a number of options which can be used to filter the results shown, which allow us to search for files. Let's look at some common ways to refine our searches, using the `~/effective-shell` folder as a playground to search in.

## Searching for Files or Folders only

The `-type` parameter can be used to search either for files or folders. Let's see both in action. First, we'll search for files only, using `-type f`:

```
$ find . -type f
./text/simpsons-characters.txt
./scripts/show-info.sh
./websites/simple/index.html
./websites/simple/styles.css
./websites/simple/code.js
...
```

And for folders, using `-type d` (remember, `d` is for directory!):

```
$ find . -type d
.
./text
./scripts
./websites
./websites/simple
...
```

It's important to note that when searching for folders, the `find` command shows folders which are normally hidden, such as the special 'dot' folder[^1].

In both commands, I specified the 'dot' folder as the place to search. I could omit this parameter; I just think it makes it a little more readable.

## Searching by Name

We can use the `-name` parameter to search for files and folders by name. For example, this is how we would search for anything with the letters `log` in the name:

```
$ find . -name "*log*"
./logs
./logs/web-server-logs.txt
./logs/apm-logs
./logs/apm-logs/apm05.logs
./logs/apm-logs/apm02.logs
./logs/apm-logs/apm03.logs
./logs/apm-logs/apm00.logs
./logs/apm-logs/apm01.logs
./logs/apm-logs/apm04.logs
```

You can see I've used a `*` wildcard before and after the letters `log` - this means that I have actually supplied a _pattern_, which could be read as 'any characters (including nothing), followed by the characters `log`, followed by any other characters (including no characters)'.

If I don't use a wildcard, the `logs` folder will not be found - because it doesn't match the _pattern_ `log` - without using a wildcard, the pattern is explicitly looking for an _exact_ match:

```
$ find . -name "log"
```

Note the output - no files or folders were found, as none have the _exact_ name `log`. The `-name` parameter is very specific - it will only match files or folders with the _name_ provided. Here's an example:

```
$ find . -name "apm00.logs"
./logs/apm-logs/apm00.logs
```

Here I have used `-name` to search for an _exact_ name. What about if I search for `apm-logs`?

```
$ find . -name "apm-logs"
./logs/apm-logs
```

The _folder_ named `apm-logs` is found, but not the _files_ in the folder - the names of those files don't match the pattern `apm-logs`. What if we make it a wildcard pattern?

```
$ find . -name "*apm-logs*"
./logs/apm-logs
```

The same results! This is because for the _files_ in the `apm-logs` folder they don't have `apm-logs` in their name anywhere - that is in their _path_, i.e. the full address of the file including its folder. So let's look at how to search by path next!

:::tip An Important Note on Quotes


Make sure you use quotes when building your patterns. This command:

```
$ find . -name "*log*"
```

Will give different output to this command:

```
$ find . -name *log*
```

Why is this? In the first case, we explicitly pass the text `*log*` to the `find` command and let it deal with it. It uses the wildcards to build a pattern. Because we've surrounded the parameter with quotes, the shell itself doesn't try to do anything clever with the wildcard.

In the second case, _the shell itself_ tries to deal with the wildcards, then passes the results to `find`. And the shell deals with them differently. You can see exactly what the shell expands them to with this snippet:

```
$ parameter=(*log*)
$ echo $parameter
logs
```

In the second case the shell is performing its own expansion of the wildcard and not searching through all of the child directories. We need to wrap the parameter with quotes so that the shell knows _not_ to interfere with the text and instead pass it to `find`, so that find can deal with the wildcard.

The shell is using _globbing_ in the second case, which is covered in a later chapter.

:::

## Searching by Path

The `-path` parameter can be used to filter the results based on a pattern in the _path_ of the file:

```
$ find . -path "*apm-logs*"
./logs/apm-logs
./logs/apm-logs/apm05.logs
./logs/apm-logs/apm02.logs
./logs/apm-logs/apm03.logs
./logs/apm-logs/apm00.logs
./logs/apm-logs/apm01.logs
./logs/apm-logs/apm04.logs
```

Again, note that this is very specific, we've added wildcards to the pattern, making it `*apm-logs*`. Without the wildcards we would find nothing, because none of the results have the _exact_ path `apm-logs`.

## Combining Searches - the AND and OR operators

We can provide multiple search options. For example, if we want to search _only_ for files which end in `.logs`, we can do this:

```
$ find . -type f -name "*.logs"
./logs/apm-logs/apm05.logs
./logs/apm-logs/apm02.logs
./logs/apm-logs/apm03.logs
./logs/apm-logs/apm00.logs
./logs/apm-logs/apm01.logs
./logs/apm-logs/apm04.logs
```

By using both the `-type` and `-name` parameters, we've created an 'AND' style search - i.e. we're looking for items which match _both_ of the given criteria.

What if we want to perform a search which returns items which match _either_ of the patterns (i.e an 'OR' search)? For that we can use the `-or` parameter:

```
$ find . -name "*.js" -or -name "*.html"
./websites/simple/index.html
./websites/simple/code.js
./programs/web-server/web-server.js
```

In this case we show results which match either of the expressions.

## Case Insensitive Searches

Any one of the search parameters you've seen so far can be made case-insensitive by putting the letter `i` before the parameter name.

This means that the following commands are identical:

```
$ find . -name "*.js" -or -name "*.Js" -or -name "*.jS" -or name "*.JS"
```

And:

```
$ find . -iname "*.js"
```

I know which one I'd rather type! You can use `-iname` for case-insensitive name searches, or `-ipath` for case-insensitive path searches.

## Grouping and the NOT operator

We can build more complex expressions by grouping together patterns using brackets, or by using the `-not` pattern. Here's an example:

```
$ find . \( -name "*.js" -or -name "*.html" \) -and -not -path "*programs*"
./websites/simple/index.html
./websites/simple/code.js
```

The first section groups together two expressions, meaning "files with names which match `*.js` or `*.html`, the second section then says "and also the text `programs` must not be in the path".

The only annoying thing about grouping is that you must _escape_ the brackets, by putting a `\` backslash before them, as brackets have a special meaning in the shell and we're telling the shell not to do anything smart with them but instead pass them to the `find` command.

# Why the Weird Parameters?

The `find` command bothered me for years. The parameters looked odd - for example why is it `-name` instead of `-n` or `--name`, which would be more standard[^2]?

Also, why is it that I cannot type this:

```
find -name "something.txt" /home/
```

But instead have to put the folder name _before_ the parameters, which again is non-standard?

The reason is actually quite simple - most of what we've seen so far are not parameters in the normal sense, they're just elements of a _search expression_.

The structure of the `find` command is as follows:

```
find <options> [starting point...] [expression]
```

The options (or parameters) for the `find` command _are_ short, one-letter options which go before the file name. The `-L` (_follow links_) option is an example - it goes before the starting point of the search:

```
find -L /usr/bin -name "*sh"
```

All of the other things we've seen so far which we've described as parameters are actually used to build the _expression_ - the actual search pattern.

The `-name`, `-and`, `-or`, `-ipath` and similar constructs we've looked at are actually part of a mini 'search language', they're not parameters to the command.

This might seem obvious, or it might seem silly, but either way, remembering that the structure of the `find` command is `find <options> [starting points...] [expression]` may help you remember what order to write each part of the command in.

It certainly took a few years for me to realise this was the reason, and until that point I used to get frustrated with `find` as I could never seem to remember how to use it properly! Once the structure of the command clicked it became far easier to quickly use the command in day-to-day work.

You can find details on this in the manpage for find, open it with `man find`.

# Performing Actions on Search Results

A lot of the time you are not just going to be searching for a file or folder - you'll be searching so that you can do something with what you find. It might be to delete, copy, edit, move or whatever.

The `find` command can perform operations on the files which are found.

Now before we continue, I'll warn that I'm _not_ going to go into much detail here. The reason is that I actually recommend not using these operations. Instead, use the `xargs` command which is covered in [Chapter 14 - Build Commands on the Fly with Xargs](../../work-in-progress). The Xargs command lets you take the list of files from `find` and create any command you can think of. I think this is far more sensible than trying to learn all of the options for `find` - and it is closer to the Unix Philosophy of having the `find` command 'do one thing and do it well'.

However, you'll see these operations in other books and articles, or perhaps in scripts you have to work with, so let's take a quick look at some of the common operations and how they are used. Just remember that later on we'll see a more flexible (and easier to remember!) way of operating on the files we've found!

## Printing Paths

The `-print` action is the default action and doesn't need to be explicitly specified. But if you feel it makes your scripts or code more readable, you can always include it, and it gives us a way to show the syntax for actions.

Here's how we'd find all files in the user's home directory with the ending `.tmp` and show their path:

```
$ find ~ -name "*.tmp" -print
/home/dwmkerr/commands1.tmp
/home/dwmkerr/commands2.tmp
/home/dwmkerr/commands3.tmp
```

You are unlikely to need to use `-print` - but it will come in handy to know it exists later on when we look at the `-print0` option (we'll see this in Chapter 14). Let's look at the other actions we can perform.

## Deleting Files

We can delete the files and folders found by using the `-delete` action:

```
$ find ~ -name "*.tmp" -delete
```

This _can_ be a convenient way to delete files, but I would recommend _extreme caution_. This command does not show what has been deleted and does not ask for confirmation. It also slightly changes the order of results processed so that the _children_ of folders are deleted where necessary before the folders themselves. This might not be what you expect because that's not what the `-print` output would show (although you can force this behaviour with the `-depth` option).

Check Chapter 14 for a better solution - in short we can use `find ~ -name "*.tmp" -print0 | xargs -p -0 rm` to instead pass the files to `rm` and ask the user to confirm before the deletion happens. This will be explained in a lot more detail in Chapter 14.

## Execute a Command

You can use the `-exec` action to execute an arbitrary command. Use the special characters `{}` as a placeholder for the filename.

Here's an example - we'll find all text files and count the number of words in each one:

```
$ find ~/effective-shell -name "*.txt" -exec wc -w {} \;
29 /home/parallels/effective-shell/text/simpsons-characters.txt
20 /home/parallels/effective-shell/quotes/iain-banks.txt
16 /home/parallels/effective-shell/quotes/ursula-le-guin.txt
10373 /home/parallels/effective-shell/logs/web-server-logs.txt
```

We use `-exec` to tell `find` we want to execute a command. Then we use `wc -w {}` to say "call the `wc` (word count) command with the `-w` (words) flag. The `{}` text is expanded to the list of files. Finally, we need a semi-colon to tell `find` where the _end_ of the `exec` command is. And because the semi-colon has a special meaning in the shell, we have to _escape_ this semi-colon by putting a `\` backslash before it.

The `-exec` action is very powerful - we can construct almost any arbitrary command with it, which can be really useful. But remember we'll see what I think is a more flexible way to build commands a little later.

## Execute a Command with a Confirmation

Now if there is one action to learn, it is the `-ok` action, which works just like `-exec`, but asks the user for a confirmation first. Here's how it might look if I use it to try and delete all files which end in `*.txt`:

```
$ find ~/effective-shell -name "*.txt" -ok rm {} \;
< rm ... /home/parallels/effective-shell/text/simpsons-characters.txt > ? n
< rm ... /home/parallels/effective-shell/quotes/iain-banks.txt > ? n
< rm ... /home/parallels/effective-shell/quotes/ursula-le-guin.txt > ? n
< rm ... /home/parallels/effective-shell/logs/web-server-logs.txt > ? n
```

Note that each operation which will be performed is first printed, then I am asked for confirmation before the operation runs. In each case I've typed `n` (for 'no'). Type `y` (for 'yes') if you want to run the command.

# Handling Symlinks

It is worth briefly mentioning symlinks - because if you don't understand how `find` handles symlinks then you might be surprised.

As an example of how this might surprise you, compare the output of the two commands below:

```
$ find /usr/bin
/usr/bin
/usr/bin/uux
/usr/bin/cpan
/usr/bin/BuildStrings
/usr/bin/loads.d
/usr/bin/write
...
$ find /bin
/bin
```

It seems that `/bin` doesn't contain any files - but is that the case? Running `ls /bin` will probably show that you have quite a few files. If you are on MacOS instead try running `find /tmp` to show the same oddity - the `find` program doesn't seem to show the contents of the files.

So why did `find /bin` not show the files in the `/bin` folder?

The answer is that `/bin` is a symlink (or if you are on MacOS and want to test the same behaviour and are using `/tmp`, `/tmp` is a symlink). You can see this by running the command below:

```
$ ls -l / /usr | grep bin
lrwxrwxrwx   1 root root          7 Aug  7 18:06 bin -> usr/bin
lrwxrwxrwx   1 root root          8 Aug  7 18:06 sbin -> usr/sbin
drwxr-xr-x   2 root root 40960 Jan 25 17:17 bin
drwxr-xr-x   2 root root 20480 Jan 25 16:42 sbin
```

Note how the root `bin` and `sbin` folders are actually just symlinks to `usr/bin` and `usr/sbin` respectively.

When using the `find` command just remember that it won't follow symlinks by default - provide the `-L` option to follow symlinks:

```
$ find -L /bin
/bin
/bin/fwupdtool
/bin/gnome-keyring
/bin/dpkg-gencontrol
/bin/prltoolsd
...
```

There are more options which control how `find` works with links, check `man find` for the details.

# Scratching the Surface

The `find` command is _incredibly_ powerful. To go into detail on all of the options or potential ways these options can be combined to create operations could fill an entire book!

My recommendation is to ensure that you know at least the basics we've shown so far. But just as a hint of what can be done with `find`, which might make you want to learn more, here are a few commands which show just how versatile it can be!

**Find large files**

The `-size` test can be used to search by file size - note how with a `+` and `-` we can set the minimum and maximum sizes:

```
find / -size +1G -500G
```

**Find recently edited files**

The `-mtime` test can be used to find files which were recently modified:

```
find . -not -path "*/\.*" -mtime -2
```

Note how a `-not -path` test is used to skip anything which starts with a `.` dot (i.e files and folders which are normally considered hidden).

**Find files which have had permissions changed**

The `-ctime` test can be used to find files which have had their attributes (such as permissions) changed:

```
find ~/.ssh -ctime -30
```

**Find any executable scripts and make them non-executable**

We can search by permissions, as shown below:

```
find ~ -perm /a=x -exec chmod -x {} +
```

This example uses the `-perm` test, checking if 'all' (users, the owner and group) have the `x` (executable) bit set, then executes the `chmod -x` command to remove the executable bit. We also end the command with `+` rather than `;`, which means we will execute `chmod` once with each file passed to the command (rather than running `chmod` for _each_ file). Note that the `+` operator can cause an error if the list of files is too big for the command you pass it to to handle!

**Find empty folders and remove them with a confirmation**

We can use the `-empty` test to find empty folders:

```
find ~ -type d -maxdepth 3 -empty -ok rmdir {} \;
```

This example uses the `-empty` test, as well as the `-maxdepth` parameter to limit the search to only three folders deep.

These examples just scratch the surface of what `find` can do. The goal of this chapter is not to have an exhaustive description of the `find` command, but equip you with the essentials. When you feel comfortable with the essentials you can then build on your knowledge of `find`.

# Summary

In this chapter we introduced the `find` command, an incredibly powerful tool that lets us search for files and folders using simple or complex expressions. It also allows us to perform actions on the search results.

In the next chapter we'll take a look in a bit more detail into what a shell actually is!

---

Share - with "why the hell are the parameters so stupid"
Blog post on linux essentials, refer to alpine for an example of why find is important
Test work in progress page

**Footnotes**

[^1]: If you are not sure what the 'dot' folder is, check [Chapter 2 - Navigating Your System](https://effective-shell.com/docs/part-1-transitioning-to-the-shell/2-navigating-your-system/)

[^2]: This is not just a personal preference thing; this is based on the POSIX standard: https://www.gnu.org/software/libc/manual/html_node/Argument-Syntax.html which recommends a specific set of patterns to make commands consistent and intuitive for user.
