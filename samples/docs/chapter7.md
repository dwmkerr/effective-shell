---
title: "Advanced Text Manipulation"
slug: "advanced-text-manipulation"
weight: 14
---

# Chapter 7 - Advanced Text Manipulation

Chapter 6 introduced some simple commands to work with text - specifically `head`, `tail`, `tr` and `cut`. Now we are going to take a look at how we can perform more sophisticated tasks with text.

First we'll look at `sed` - the 'stream editor' tool, which can be used to perform sophisticated manipulation of text. In many cases a small command involving `sed` can quickly solve problems. We'll look at some of the common ways to use `sed`, and when you might want to consider the `awk` tool.

# Introducing the Stream Editor

Let's look at the _stream editor_ or `sed` command. This command takes input from a file or from `stdin`, transforms it, and writes the output to a given file or to `stdout`. This command is _extremely_ powerful - there are many sophisticated transformations which can be applied.

The challenge, as always, is that more complex tools are harder to learn how to use. Also, even if _you_ understand how you are using the command, others (who might need to use your work) may not. There was a time that whenever I saw `sed` as the suggested solution for a problem I shuddered, I just knew it would seem opaque complex. But over the years I've realised that as long as you understand some fundamentals about `sed` it is nothing to be intimidated by!

# Transformations with Sed

Rather than dissecting each and every option or flag and every nuance of the program, I'm going to try and show some real world examples of how you can use `sed` for common transformations. This will allow us to see the functionality in easier to digest chunks. I'm also going to show these commands in what I think is the order of 'usefulness'. This is obviously subjective, your results may vary!

## Replacing Text

Let's say we have a script which is used to backup some local files to an Amazon S3 bucket. We can see a script like this here:

```
$ cat ~/effective-shell/scripts
$ cat backup-config.sh

#!/usr/bin/env bash

# Copy over alicloud, aws, azure, gcp and ssh config and credentials.
cp ~/.aliyun/config.json /backup/settings/aliyun/
cp ~/.aws/config /backup/settings/aws/
cp ~/.aws/credentials /backup/settings/aws/
cp ~/.azure/config /backup/settings/azure/
cp ~/.config/gcloud/credentials.db /backup/settings/gcloud/
cp ~/.ssh/config /backup/settings/ssh/
cp ~/.ssh/id_rsa /backup/settings/ssh/ # is this safe?
cp ~/.ssh/id_rsa.pub /backup/settings/ssh/
```

We could use the `sed` command to change the S3 bucket. For example, if we wanted to change the `settings` text to `dotfiles` we could run the command below:

```
$ sed 's/config-backup/new-backup/' backup-config.sh
#!/usr/bin/env bash

# Copy over alicloud, aws, azure, gcp and ssh config and credentials.
cp ~/.aliyun/config.json /backup/dotfiles/aliyun/
cp ~/.aws/config /backup/dotfiles/aws/
cp ~/.aws/credentials /backup/dotfiles/aws/
cp ~/.azure/config /backup/dotfiles/azure/
cp ~/.config/gcloud/credentials.db /backup/dotfiles/gcloud/
cp ~/.ssh/config /backup/dotfiles/ssh/
cp ~/.ssh/id_rsa /backup/dotfiles/ssh/ # is this safe?
cp ~/.ssh/id_rsa.pub /backup/dotfiles/ssh/
```

This shows the basics of how `sed` works. We give `sed` an _expression_, which it applies to a file. It can also (as with most commands we've seen) simply apply the expression to `stdin`.

Let's look at the expression in detail:

```
s/settings/dotfiles/
```

- The `s` indicates that we are going to run the _substitute_ function, which is used to replace text
- The `/` indicates the start of the _expression_ we are searching for...
- ...and the `settings` is the expression itself (which is just the literal text `settings`, nothing fancy)
- The second `/` indicates the start of the _replacement_ we will make when the _expression_ is found
- The final `/` indicates the end of the replacement - we can also optionally put _flags_ after this slash

Just as we saw in [Chapter 12 - Get to Grips with Grep]({{< relref "/docs/part-3-manipulating-text/12-get-to-grips-with-grep" >}}), we can provide a _regular expression_ as the pattern to search for. By default, `sed` will use _basic_ regular expressions. We can use _extended regular expressions_ by providing the `-E` flag.

{{< hint info >}}
**Basic and Extended Regular Expressions**
If you are not sure about the difference between Basic and Extended Regular Expressions, you can use the:

```
man re_pattern
```

Command to get detailed documentation.
{{< /hint >}}

## Applying Multiple Expressions

We can use the `-e <expression>` flag to supply multiple expressions to `sed`. For example, if we wanted to change our script to _delete_ our backup files, we could run the below:

```
$ sed -E -e 's/cp/rmdir/' -e 's/~[^ ]+ //' backup-config.sh
#!/usr/bin/env bash

# Copy over alicloud, aws, azure, grmdir and ssh config and credentials.
rmdir /backup/settings/aliyun/
rmdir /backup/settings/aws/
rmdir /backup/settings/aws/
rmdir /backup/settings/azure/
rmdir /backup/settings/gcloud/
rmdir /backup/settings/ssh/
rmdir /backup/settings/ssh/ # is this safe?
rmdir /backup/settings/ssh/
```

This command has _mostly_ worked - although it has garbled part of the comment text above the first `rmdir` command. Here's the command blow-by-blow:

- `sed -E` run `sed` using _extended regular expressions_
- `-e 's/cp/rmdir/` replace the literal text `cp` with the text `rmdir`
- `-e 's/~[^ ]+ //` replace the expression `~[^ ]+ ` with nothing

Note that we haven't provided a _replacement_ expression, meaning the second part of the `sed` command is simply removing the text. The expression we are searching for is `~[^ ] `, which can be read as:

- Anything starting with the literal character `~`...
- Which is in the class of characters `[^ ]` (this means anything which is _not_ a space
- All the way up to the first space character

What about if we only want the expression to be run on the `cp` lines, so that we don't garble the comment text? To do this, we can specify a _line pattern_:

```
$ sed -E -e '/^cp/s/cp/rmdir/' -e 's/~[^ ]+ //' backup-config.sh

#!/usr/bin/env bash

# Copy over alicloud, aws, azure, gcp and ssh config and credentials.
rmdir /backup/settings/aliyun/
rmdir /backup/settings/aws/
rmdir /backup/settings/aws/
rmdir /backup/settings/azure/
rmdir /backup/settings/gcloud/
rmdir /backup/settings/ssh/
rmdir /backup/settings/ssh/ # is this safe?
rmdir /backup/settings/ssh/
```

Before the `s` symbol, which indicates the substitution, we now include a _line pattern_, which is just `^cp`, which is the regular expression meaning "any line which starts with `cp`".


Let's look at a few other ways to use `sed` for some real-world tasks.

## Stripping Comments

In the script we've used above, there are some comments. Let's use `sed` to remove them:

```
$ sed -E 's/#.*$//' backup-config.sh



cp ~/.aliyun/config.json /backup/settings/aliyun/
cp ~/.aws/config /backup/settings/aws/
cp ~/.aws/credentials /backup/settings/aws/
cp ~/.azure/config /backup/settings/azure/
cp ~/.config/gcloud/credentials.db /backup/settings/gcloud/
cp ~/.ssh/config /backup/settings/ssh/
cp ~/.ssh/id_rsa /backup/settings/ssh/
cp ~/.ssh/id_rsa.pub /backup/settings/ssh/
```

Notice how we have removed the comments which started at the beginning of the file, as well as the comment after the `cp ~/.ssh/id_rsa` line. This is because the regular expression matches any hash symbol `#` and strips everything which follows it.

What about if we want to get rid of those empty lines? We can use the `d` or _delete_ function:

```
$ sed -E -e 's/#.*$//' -e '/^ *$/d' backup-config.sh

cp ~/.aliyun/config.json /backup/settings/aliyun/
cp ~/.aws/config /backup/settings/aws/
cp ~/.aws/credentials /backup/settings/aws/
cp ~/.azure/config /backup/settings/azure/
cp ~/.config/gcloud/credentials.db /backup/settings/gcloud/
cp ~/.ssh/config /backup/settings/ssh/
cp ~/.ssh/id_rsa /backup/settings/ssh/
cp ~/.ssh/id_rsa.pub /backup/settings/ssh/
```

The delete command is applied to all lines which match the _line pattern_. In this case, the line pattern is a regular expression, `^ *$`, which matches any line made up only of space characters (including zero space characters, i.e. empty lines).

{{< hint info >}}
**Line Patterns**
Line patterns, which can be used on many `sed` functions, are actually quite sophisticated. Here are a few examples:

- `/test/` - any line matching the pattern `test`
- `/test/!` - any line *not* matching `test`
- `6` - line six
- `$` - the last line
- `1-10` - lines one to ten
- `1-10!` - lines _except _one_ to ten

Check `man sed` to see more about line patterns.
{{< /hint >}}

## Appending Information

The regular expression `$` represents the end of a line. This makes it really easy to add content to the end of lines matching a pattern. Here's how we can make sure that the `cp` command in the script doesn't fail:


```
$ sed -E -e 's/#.*$//' -e '/^ *$/d' -e 's/$/ || true/' backup-config.sh

cp ~/.aliyun/config.json /backup/settings/aliyun/ || true
cp ~/.aws/config /backup/settings/aws/ || true
cp ~/.aws/credentials /backup/settings/aws/ || true
cp ~/.azure/config /backup/settings/azure/ || true
cp ~/.config/gcloud/credentials.db /backup/settings/gcloud/ || true
cp ~/.ssh/config /backup/settings/ssh/ || true
cp ~/.ssh/id_rsa /backup/settings/ssh/  || true
cp ~/.ssh/id_rsa.pub /backup/settings/ssh/ || true
```

Now we have a command which strips comments, deletes empty lines and then adds the text ` || true` to the end of the line. This little trick ensures that the script won't fail if one of the individual `cp` commands fails. We'll see more about shell scripts later.

What if we want to add a semicolon to the end of all lines?

```
sed s/$/;/
```

Easy!

## Extracting Information

What about if we want to _extract_ some information from lines in a file?

Let's take a quick look at our movies file again for reference:

```
$ head -n 3 data/top100.csv

"Rank","Rating","Title","Reviews"
"1","97","Black Panther (2018)","515"
"2","94","Avengers: Endgame (2019)","531"
```

It should be easy to create a regular expression to find the year for each movie - it would just have to match all numeric values between brackets. Let's try it out!

```
$ head -n 3 data/top100.csv | sed -E 's/.*\(([0-9]+)\).*/\1/' 

"Rank","Rating","Title","Reviews"
2018
2019
```

This works because we match any text, then capture any digits enclosed in brackets, then replace with the `\1` text, which means 'the first match'.

Given what we know about _line patterns_, we can also easily exclude the first line:

```
$ sed -E -e '1d' -e 's/.*\(([0-9]+)\).*/\1/' data/top100.csv 

2018
2019
...
```

Here we have just added the `1d` expression - delete the first line.
