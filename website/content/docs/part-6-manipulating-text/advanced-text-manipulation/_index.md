---
title: "Advanced Text Manipulation"
slug: "advanced-text-manipulation"
weight: 16
---
<!--
Replace with `awk`?

The AWK Programming Language:
https://archive.org/details/pdfy-MgN0H1joIoDVoIC7


-->

# Chapter 16 - Advanced Text Manipulation with Sed

In [Chapter 15]({{< relref "/docs/part-6-manipulating-text/slice-and-dice-text" >}}) we introduced some simple commands to work with text - specifically `head`, `tail`, `tr` and `cut`. Now we are going to introduce `sed` the _Stream Editor_ command. 

`sed` can be used to perform a variety of tasks with text. In many cases a small command involving `sed` can quickly solve problems. We'll look at some of the common ways to use `sed`, some more sophisticated examples and discuss when you might want to consider using alternative tools like `awk` or a programming language.

# Introducing the Stream Editor

The stream editor command takes input from a _stream_ - which in many cases will simply be a file. It then performs operations on the text as it is read, and writes the output to `stdout`. This command is _extremely_ powerful - there are many sophisticated transformations which can be applied.

Seeing `sed` commands can be a little intimidating - they can look complex! But we'll start with the basics and hopefully you'll see just how effective this tool can make you!

# Transformations with Sed

Rather than dissecting each and every option or flag and every nuance of the program, I'm going to try and show some real world examples of how you can use `sed`. This will allow us to see the functionality in easier to digest chunks. It also keeps things practical! Let's dive in and look at some common tasks and how we can solve them with `sed`.

{{< hint info >}}
**Downloading the Samples**

Run the following command in your shell to download the samples:

```sh
curl effective.sh | sh
```
{{< /hint >}}

## Replacing Text

The samples folder has a script which copies some configuration files to a backup folder. Let's take a quick look at it:

```
$ cd scripts
$ cat backup-config.sh

#!/usr/bin/env bash

# Make sure we have a backup directory.
mkdir ~/backup

# Copy over alicloud, aws, azure, gcp and ssh config and credentials.
cp ~/.aliyun/config.json ~/backup/settings/aliyun/
cp ~/.aws/config ~/backup/settings/aws/
cp ~/.aws/credentials ~/backup/settings/aws/
cp ~/.azure/config ~/backup/settings/azure/
cp ~/.config/gcloud/credentials.db ~/backup/settings/gcloud/
cp ~/.ssh/config ~/backup/settings/ssh/
cp ~/.ssh/id_rsa ~/backup/settings/ssh/ # is this safe?
cp ~/.ssh/id_rsa.pub ~/backup/settings/ssh/
```

We could use the `sed` command to change the name of the folder we backup to. If we wanted to change the `settings` folder to `configuration` we could run the command below:

```
$ sed 's/settings/configuration/' backup-config.sh
#!/usr/bin/env bash

# Copy over alicloud, aws, azure, gcp and ssh config and credentials.
cp ~/.aliyun/config.json ~/backup/configuration/aliyun/
cp ~/.aws/config ~/backup/configuration/aws/
cp ~/.aws/credentials ~/backup/configuration/aws/
cp ~/.azure/config ~/backup/configuration/azure/
cp ~/.config/gcloud/credentials.db ~/backup/configuration/gcloud/
cp ~/.ssh/config ~/backup/configuration/ssh/
cp ~/.ssh/id_rsa ~/backup/configuration/ssh/ # is this safe?
cp ~/.ssh/id_rsa.pub ~/backup/configuration/ssh/
```

This shows the basics of how `sed` works. We give `sed` an _expression_, which describes a set of operations we want to perform and it then applies that expression to the file we specify. As with most commands we've seen it can apply the expression to `stdin`.

Let's look at the expression in detail:

```
s/settings/dotfiles/
```

- The `s` indicates that we are going to run the _substitute_ function, which is used to replace text
- The `/` indicates the start of the _pattern_ we are searching for...
- ...`settings` is the pattern - which is just the literal text 'settings'
- The second `/` indicates the start of the _replacement_ we will make when the _pattern_ is found
- The final `/` indicates the end of the replacement - we can also optionally put _flags_ after this slash

Just as we saw in [Chapter 13 - Get to Grips with Grep]({{< relref "/docs/part-6-manipulating-text/get-to-grips-with-grep" >}}), we can provide a _regular expression_ as the pattern to search for. By default, `sed` will use _basic_ regular expressions. We can use _extended regular expressions_ by providing the `-E` flag.

{{< hint info >}}
**Basic and Extended Regular Expressions**

If you are not sure about the difference between Basic and Extended Regular Expressions, you can use the:

```
man re_pattern
```

Command to get detailed documentation.
{{< /hint >}}

## Applying Multiple Expressions

We can use the `-e <expression>` flag to supply multiple expressions to `sed`.

If we wanted to delete our backup folders, we could run two substitutions - one which changes the `cp` command to `rmdir` command and one which deletes the first parameter, which was the source directory for `cp` but is not needed for `rmdir`[^1].

### Replacing Text on Specific Lines

Let's start with the first expression, which should change `cp` to `rmdir`:


```
$ sed -e 's/cp/rmdir/' backup-config.sh
#!/usr/bin/env bash

# Make sure we have a backup directory.
mkdir ~/backup

# Copy over alicloud, aws, azure, grmdir and ssh config and credentials.
rmdir ~/.aliyun/config.json ~/backup/settings/aliyun/
rmdir ~/.aws/config ~/backup/settings/aws/
rmdir ~/.aws/credentials ~/backup/settings/aws/
rmdir ~/.azure/config ~/backup/settings/azure/
rmdir ~/.config/gcloud/credentials.db ~/backup/settings/gcloud/
rmdir ~/.ssh/config ~/backup/settings/ssh/
rmdir ~/.ssh/id_rsa ~/backup/settings/ssh/ # is this safe?
rmdir ~/.ssh/id_rsa.pub ~/backup/settings/ssh/
```

We have provided a single expression with the `-e` parameter. If you are providing a single expression only then this parameter is superfluous, but we will shortly add another expression.

This has changed all of the `cp` commands to `rmdir`. But did you notice the bug? It has also changed the letters `cp` in the comment which mentions `gcp` to `rmdir`, meaning our comment line has changed. I've made the changes bold to make this easier to see below:Before, it was:

<pre>
# Copy over alicloud, aws, azure, g<strong>cp</strong> and ssh config and credentials.
</pre>

Now it is:

<pre>
# Copy over alicloud, aws, azure, g<strong>rmdir</strong> and ssh config and credentials.
</pre>

This isn't the worst bug in the world, but we can do better. Let's change the expression to only run on lines which start with the letters `cp`:

```
$ sed -e '/^cp/s/cp/rmdir/' backup-config.sh
#!/usr/bin/env bash

# Make sure we have a backup directory.
mkdir ~/backup

# Copy over alicloud, aws, azure, gcp and ssh config and credentials.
rmdir ~/.aliyun/config.json ~/backup/settings/aliyun/
rmdir ~/.aws/config ~/backup/settings/aws/
rmdir ~/.aws/credentials ~/backup/settings/aws/
rmdir ~/.azure/config ~/backup/settings/azure/
rmdir ~/.config/gcloud/credentials.db ~/backup/settings/gcloud/
rmdir ~/.ssh/config ~/backup/settings/ssh/
rmdir ~/.ssh/id_rsa ~/backup/settings/ssh/ # is this safe?
rmdir ~/.ssh/id_rsa.pub ~/backup/settings/ssh/
```

Let's look at the expression in detail. Before the `s` symbol, which indicates that we are performing a _substitution_, we now include a _line pattern_. A line pattern tells `sed` which lines it should apply the expression to. Our line pattern is just `^cp`, which is the regular expression meaning "any line which starts with `cp`".

Line patterns can be quite sophisticated and are covered in the box later on in this chapter!

So all in all:

- `^cp`- use the line pattern `^cp` (lines which start with `cp`) for the expression
- `s` - use the substitution function (which replaces text)
- `cp` - find the pattern `cp`
- `rmdir` - replace each occurrence with `rmdir`
on lines which start with the text `cp`, replace any occurrences of the text text `cp` with the text `rmdir`

We combine these parts together using a `/` symbol, this is needed so that `sed` knows where the line pattern starts and end, the function starts and end and so on[^2].

### Removing Parts of a Line

Now we need to remove the first parameter for the `rmdir` command, it was used when we had `cp` as the command but doesn't make sense any more.

Let's apply a new expression:

```
$ sed -E -e '/^cp/s/cp/rmdir/' -e '/^rmdir/s/~[^ ]+ //' backup-config.sh
#!/usr/bin/env bash

# Make sure we have a backup directory.
mkdir ~/backup

# Copy over alicloud, aws, azure, gcp and ssh config and credentials.
rmdir ~/backup/settings/aliyun/
rmdir ~/backup/settings/aws/
rmdir ~/backup/settings/aws/
rmdir ~/backup/settings/azure/
rmdir ~/backup/settings/gcloud/
rmdir ~/backup/settings/ssh/
rmdir ~/backup/settings/ssh/ # is this safe?
rmdir ~/backup/settings/ssh/
```

Let's take a look at the second expression, component by component:

- `^rmdir` - use a line pattern which matches lines which start with `rmdir`
- `s` - use the _substitution_ function to replace text
- `~[^ ]+ ` - search for the tilde `~` symbol and any non-space characters, up until the first space character

We actually don't even include a replacement - which is why the expression ends with `//` - the inside of the replacement part of the expression is empty. This means we search for a tilde `~`, match everything up until the next space ` ` and then replace it with nothing - meaning we remove it!

Note as well that we've used the `-E` flag to tell `sed` to use _extended regular expressions_. This allows us to use the `+` symbol without escaping it with a `\` first. In general I would recommend always using extended regular expressions as they are more commonly used and if you work with programming languages as well as the shell, those languages will likely use something closer to extended regular expressions rather than basic ones.

Let's look at a few other ways to use `sed` for some real-world tasks.

## Stripping Comments

In the script we've used above, there are some comments. Let's use `sed` to remove them:

```
$ sed -E 's/#.*$//' backup-config.sh




mkdir ~/backup


cp ~/.aliyun/config.json ~/backup/settings/aliyun/
cp ~/.aws/config ~/backup/settings/aws/
cp ~/.aws/credentials ~/backup/settings/aws/
cp ~/.azure/config ~/backup/settings/azure/
cp ~/.config/gcloud/credentials.db ~/backup/settings/gcloud/
cp ~/.ssh/config ~/backup/settings/ssh/
cp ~/.ssh/id_rsa ~/backup/settings/ssh/
cp ~/.ssh/id_rsa.pub ~/backup/settings/ssh/
```

Notice how we have removed the comments which started at the beginning of the file, as well as the comment after the `cp ~/.ssh/id_rsa` line. This is because the regular expression matches any hash symbol `#` and strips everything which follows it.

What about if we want to get rid of those empty lines? We can use the `d` or _delete_ function:

```
$ sed -E -e 's/#.*$//' -e '/^ *$/d' backup-config.sh
mkdir ~/backup
cp ~/.aliyun/config.json ~/backup/settings/aliyun/
cp ~/.aws/config ~/backup/settings/aws/
cp ~/.aws/credentials ~/backup/settings/aws/
cp ~/.azure/config ~/backup/settings/azure/
cp ~/.config/gcloud/credentials.db ~/backup/settings/gcloud/
cp ~/.ssh/config ~/backup/settings/ssh/
cp ~/.ssh/id_rsa ~/backup/settings/ssh/
cp ~/.ssh/id_rsa.pub ~/backup/settings/ssh/
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

## Appending Text

In a regular expression the `$` symbol represents the end of a line.

We can use this symbol to add content to the end of lines - we just search for `$` and replace it with whatever we want to end the line with! And if we want to only do this on certain lines, we can use a line pattern to limit where we apply the expression.

Here's how we can make sure that the `cp` command in the script doesn't fail:


```
$ sed -E -e '/^cp/s/$/ || true/' backup-config.sh

#!/usr/bin/env bash

# Make sure we have a backup directory.
mkdir ~/backup

# Copy over alicloud, aws, azure, gcp and ssh config and credentials.
cp ~/.aliyun/config.json ~/backup/settings/aliyun/ || true
cp ~/.aws/config ~/backup/settings/aws/ || true
cp ~/.aws/credentials ~/backup/settings/aws/ || true
cp ~/.azure/config ~/backup/settings/azure/ || true
cp ~/.config/gcloud/credentials.db ~/backup/settings/gcloud/ || true
cp ~/.ssh/config ~/backup/settings/ssh/ || true
cp ~/.ssh/id_rsa ~/backup/settings/ssh/ # is this safe? || true
cp ~/.ssh/id_rsa.pub ~/backup/settings/ssh/ || true
```

Now we have a command which strips comments, deletes empty lines and then adds the text ` || true` to the end of the line. This little trick ensures that the script won't fail if one of the individual `cp` commands fails. We'll see more about shell scripts later.

What if we want to add a semicolon to the end of all lines?

```
sed s/$/;/
```

Easy!

## Prepending Text

In a regular expression the caret `^` symbol represents the start of a line.

We can apply the same trick as with the `$` symbol to add text to the start of a line - we just replace `^` with whatever we want the line to start with.

Here's how we can use this trick!

```
$ sed -E -e '/^cp/s/$/"/' -e '/"$/s/^/echo "/' backup-config.sh
#!/usr/bin/env bash

# Make sure we have a backup directory.
mkdir ~/backup

# Copy over alicloud, aws, azure, gcp and ssh config and credentials.
echo "cp ~/.aliyun/config.json ~/backup/settings/aliyun/"
echo "cp ~/.aws/config ~/backup/settings/aws/"
echo "cp ~/.aws/credentials ~/backup/settings/aws/"
echo "cp ~/.azure/config ~/backup/settings/azure/"
echo "cp ~/.config/gcloud/credentials.db ~/backup/settings/gcloud/"
echo "cp ~/.ssh/config ~/backup/settings/ssh/"
echo "cp ~/.ssh/id_rsa ~/backup/settings/ssh/ # is this safe?"
echo "cp ~/.ssh/id_rsa.pub ~/backup/settings/ssh/"
```

We first put at quote at the end of each line which starts with `cp`, then put `echo "` at the beginning of each line which ends with a quote!

This has now tweaked our script so that it doesn't actually copy the files, it just prints out the commands to the screen. It also demonstrates how the order of the expressions is important, the second expression is applied after the first. If you are using multiple expressions be careful that an earlier expression doesn't alter the line in a way which breaks the next expression!

## Extracting Information

What about if we want to _extract_ some information from lines in a file?

Let's take a quick look at our movies file in our data folder for reference:

```
$ cd ~/effective-shell/data
$ head -n 3 top100.csv

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

## Advanced - Surrounding Parts of Text with Quotes

Let's look at another example. Here we have some `yaml` content, a set of keys and values. Note that some of the values are quoted, and some are not:

```
title: "Advanced Text Manipulation"
slug: advanced-text-manipulation
weight: 14
```

In fact this is the text content at the top of the file I am working on now. But this file is not a YAML file, it is a Markdown file (which is fairly close to plain text), so also has a lot of other content in it.

First, let's see if we can extract the keys:

<pre>
$ grep -E '[^:]+:' ~/effective-shell/docs/chapter12.md
<strong>title</strong>: "Advanced Text Manipulation"
<strong>slug</strong>: advanced-text-manipulation
<strong>weight</strong>: 14
<strong>Let's say we have a script which is used to backup some local files to an Amazon S3 bucket. We can see a script like this here:
We could use the `sed` command to change the S3 bucket. For example, if we wanted to change the `settings` text to `dotfiles` we could run the command below:
Let's look at the expression in detail:</strong>

...snip...
</pre>

Well this kind of worked. The first three matches were correct, but we then found lots of other text. It looks like our pattern is not correct.

The pattern is `[^:]+:`, which means 'at least one character which is _not_ the `:` character, followed by `:`.

We can improve on it by telling it to not include spaces before the colon, and be explicit that this pattern we are searching for must be at the start of the line:

<pre>
% grep -E '^[^: ]+:' ~/effective-shell/docs/chapter12.md
<strong>title</strong>: "Advanced Text Manipulation"
<strong>slug</strong>: advanced-text-manipulation
<strong>weight</strong>: 14
<strong>"2","94","Avengers</strong>: Endgame (2019)","531"
</pre>

Much better. The pattern now starts with `^` meaning 'start of line', and the type of characters we search for `[^: ]` is not 'anything which is not a colon or space. But we've also found a film title from the text - we can improve our pattern further by eliminating quotes, which are not valid for YAML keys anyway:

<pre>
$ grep -E '^[^: "]+:' ~/effective-shell/docs/chapter12.md
<strong>title</strong>: "Advanced Text Manipulation"
<strong>slug</strong>: advanced-text-manipulation
<strong>weight</strong>: 14
</pre>

Awesome!

{{< hint info >}}
**Building Regular Expressions**

I was a hold out for years, but regular expressions are _incredibly useful_ if you take the time to learn them. Exercises like this are a great way to do it. Start simple, add the elements you need bit by bit. It's a great way to learn exactly what each element does.

Avoid just searching online for the perfect expression - they'll often be very long (because they are bullet-proof and cover every possible edge case hopefully). If you are building an expression which is critical to get right, then do search online for help if you need it, but for day to day tasks, practicing like this will really help.
{{< /hint >}}

Now let's start using this pattern in `sed`. Let's print all lines which match the pattern:

```
$ sed -E -n '/^[^: "]+:/p' ~/effective-shell/docs/chapter12.md
title: "Advanced Text Manipulation"
slug: advanced-text-manipulation
weight: 14
```

Now there are two critical things we've added to `sed` here while we're working. The first is the `-n` flag, which means _no automatic printing_ - meaning it will show no output unless told. Then in the pattern, we finish the command with `p`, meaning 'print lines which match the pattern'.

These options make `sed` behave like `grep`, which is useful because we are still building the command.

Now let's actually quote the result. To do that, we need to find lines where the _value_ is not already quoted - so let's add that to our pattern:

```
$ sed -E -n '/^[^: "]+: +[^"]+$/p' ~/effective-shell/docs/chapter12.md
slug: advanced-text-manipulation
weight: 14
```

Our pattern now reads like this:

- `^[^ :"]+:` - match the start of a line, any characters which are not space, colon or quote, which then finish with a colon and a space.
- ` +[^"]+$` - match at least one space, then any set of characters which don't have a quote in them all the way to the end of the line.

The pattern is working - its found our two unquoted keys. Now let's get it to print the substitution.

First, we're going to surround the key part and value part in brackets - this will make them 'capture groups' - chunks of text we can use in the substitution. Here's how capture groups work:

```
$ sed -E -n 's/(^[^: "]+:)( +[^"]+$)/Key is "\1"/p' ~/effective-shell/docs/chapter12.md
Key is "slug:"
Key is "weight:"
```

We are now not just searching for a pattern, we're using the `s` (_substitute_) function to replace all of the matched text with `Key is "\1"`. The `\1` just means 'what you found in the first capture group".

We could just as easily show the value:

```
$ sed -E -n 's/(^[^: "]+:)( +[^"]+$)/Value is "\2"/p' ~/effective-shell/docs/chapter12.md
Value is " advanced-text-manipulation"
Value is " 14"
```

Here we're printing the second capture group. Now you might have noticed that in the key, we're including the colon, and in the value, we're including the space (or spaces). This isn't strictly right - they're the separators. So let's capture them separately:

```
$ sed -E -n 's/(^[^: "]+)(: +)([^"]+$)/Key "\1", Value "\3", Separator "\2"/p' ~/effective-shell/docs/chapter12.md
Key "slug", Value "advanced-text-manipulation", Separator ": "
Key "weight", Value "14", Separator ": "
```

I think this is really starting to show just how powerful `sed` and regular expressions are.

Let's finally tie it together - add quotes around unquoted values:

```
$ sed -E -n 's/(^[^: "]+)(: +)([^"]+$)/\1\2"\3"/p' ~/effective-shell/docs/chapter12.md
slug: "advanced-text-manipulation"
weight: "14"
```

Awesome!

If we wanted to actually change the file, we could remove the `-n` flag, so that we write out everything. This makes the `p` option at the end of the substitution superfluous:

```
$ sed -E 's/(^[^: "]+)(: +)([^"]+$)/\1\2"\3"/' ~/effective-shell/docs/chapter12.md > updated.md
```

Let's peep at the top of the file we created to see if it looks right:

```
$ head -n 10 updated.md
---
title: "Advanced Text Manipulation"
slug: "advanced-text-manipulation"
weight: "15"
---

# Chapter 15 - Advanced Text Manipulation

In [Chapter 14]({{< relref "/docs/part-6-manipulating-text/slice-and-dice-text" >}}) we introduced some simple commands to work with text - specifically `head`, `tail`, `tr` and `cut`. Now we are going to take a look at how we can perform more sophisticated tasks with text.
```

Impressive - we've found a very specific pattern in a large file, substituted to match what we need and then saved the results.

This is just scratching the surface - but even with these basic tools, there is an incredible amount you can do. For example, what about if we didn't want to quote values which are just numbers? We'd just change the pattern from:

```
$ sed -E -n '/(^[^: "]+:)( +[^"0-9]+$)/p' ~/effective-shell/docs/chapter12.md
slug: advanced-text-manipulation
```

All we've done is changed the value pattern from `[^"]` (anything except quotes) to `[^0-9]` (anything except quotes and digits).

## Advanced - Template Files

Here's another example which I have found useful again and again. We can use `sed`'s text replacement capabilities to create a basic templating system.

For example, let's say we have the file below:

```
apiVersion: v1
kind: Secret
metadata:
  name: database-credentials
  namespace: dev
stringData:
  username: admin
  password: ThisIsVerySensitive!
```

This the definition of a 'secret' for Kubernetes. It doesn't really matter how the file is structured because what we'll do in this example could work for any file.

Let's say we want to be able to _not_ have the username and password stored in the file itself, because they are sensitive. We also want to make the 'namespace' value configurable.

We can do this by putting some easy to find patterns as placeholders in the file, then replacing them at runtime when we need them with `sed`.

First, let's create the 'template' version of this file:

```
$ cat << EOF > secret.template.yaml
apiVersion: v1
kind: Secret
metadata:
  name: database-credentials
  namespace: %NAMESPACE%
stringData:
  username: %DB_USERNAME%
  password: %DB_PASSWORD%
EOF
```

The first line is using a 'heredoc' to write multiple lines of text to a file. We see heredocs in detail in a later chapter. The file is also in the samples at `effective-shell/templates/secret.template.yaml`.

Now let's apply our substitution:

```
$ sed -e 's/%NAMESPACE%/staging/' \
    -e 's/%DB_USERNAME%/admin/'          \
    -e 's/%DB_PASSWORD%/secret/'     \
    ~/effective-shell/templates/secret.template.yaml
apiVersion: v1
kind: Secret
metadata:
  name: database-credentials
  namespace: staging
stringData:
  username: admin
  password: secret
```

I've used the `\` backslash character to split up the command into multiple lines. This command is really quite straightforward - we search for the very obvious to find patterns and replace them with values.

What if we wanted this to be dynamic, and instead of using hard-coded values get the values from environment variables? This is very straightforward:

```
$ export NAMESPACE=production
$ export DB_USERNAME=prod-admin
$ export DB_PASSWORD=Dhhs22kfid9c
$ sed -e "s/%NAMESPACE%/${NAMESPACE}/" \
    -e "s/%DB_USERNAME%/${DB_USERNAME}/"    \
    -e "s/%DB_PASSWORD%/${DB_PASSWORD}/"  \
    ~/effective-shell/templates/secret.template.yaml
apiVersion: v1
kind: Secret
metadata:
  name: database-credentials
  namespace: production
stringData:
  username: prod-admin
  password: Dhhs22kfid9c
```

In fact, we could even take this a step further and simply replace _every_ environment variable!

```
file_path="~/effective-shell/templates/secret.template.yaml"
env_var_names=$(env | sed -E -n 's/^([^=]+)(=.*)/\1/p')

for env_var_name in ${env_var_names}; do
    echo "Checking for '${env_var_name}'..."

    if grep -q "%${env_var_name}%" "${file_path}"; then
        echo "-> Found '${env_var_name}', expanding now..."

        env_var_value="${!env_var_name}"
        escaped_env_var_value=$(echo ${env_var_value} | sed -e 's/[\/&]/\\&/g')

        sed -e "s/%${env_var_name}%/${escaped_env_var_value}/" \
            "${file_path}" > "${file_path}.tmp"
        mv "${file_path}.tmp" "${file_path}"
    fi
done
```

Now this might look like a lot at first, and to be fair it is! But almost everything here is actually using commands and concepts we've already seen.

Here's what's going on blow-by-blow:

1. `file_path` - we're just creating a variable to hold the name of the file, this makes it easier to apply the command to other files
2. `env_var_names=...` - we use `sed` to get the name of each environment variable. This comes from everything before the `=` sign in the output of the `env` command.
3. `for ...` - this lets us 'loop' through each environment variable name found - we'll see more about this in the sections on scripting.
4. `if grep -q` - check to see if the environment variable name is used in the file...
5. ...and if it is, get the value of it with `${!env_var_name}` - the `!` exclamation mark is _variable indirection_ and is Bash specific. It allows us to get the value of a variable which has a variable name
6. `escaped_env_var_value` we need to replace some of the special characters which might be in the environment variable so that they don't confuse `sed`
7. `sed -e` run the replacement, putting the results in a temporary file...
8. ...replace the source file with the temporary one

Many of these concepts, like `for` loops and variable indirection we will see in more detail later. But this little snippet really shows the power of Linux, the GNU tools and the shell - we can create sophisticated operations by composing together small and simple commands.

{{< hint info >}}
**A Note on Security**
It is very important to be careful when running commands like this or writing scripts which use this kind of pattern.

Allowing the contents of your environment variables to be put into files, or even the shell's history can be a serious security concern.

As an example - note what would happen if we replaced `${DB_USERNAME}` with `${USERNAME}` in the script above? In _Z Shell_ rather than the value we provided being put in the file, the _actual username of the user running the script_ would be written (which in my case would be `dwmkerr`).

Be very careful when working with environment variables to make sure you avoid exposing private information. Even more sensitive variables might be things like `${AWS_SECRET_ACCESS_KEY}` - exposing variables like this could allow attackers to start accessing resources on your cloud environments.
{{< /hint >}}

## What About 'In Place' Editing?

You might be aware that there is an 'in-place' feature in `sed` which allows you to change the file you pass it directly. This allows you to do something like the below:

```
$ sed -i '.bak' 's/staging/production/' test.txt
```

This would perform the substitutions and then put them in a file with `.bak` appended. To just overwrite the existing file, you could use:

```
$ sed -i '' 's/staging/production/' test.txt
```

In this case we don't append anything to the name of the overwritten file, so we end up replacing the original file itself.

How the `-i` flag works can vary on some systems so I generally prefer to simply output the result of `sed` to a new file and then replace the old one. However, it is useful to know what this flag is and how it is used, as you will often see it in examples.

# What about Awk?

There is another very powerful text manipulation tool - `awk`. Often if you trying to find out how to perform more complex text based operations, you'll see `awk` in the mix as a potential solution.

Awk is very sophisticated and has its own language to support complex transformations and operations. My advice is to first master `sed` and then consider learning `awk` if you regularly find yourself limited by `sed`.

# When to Program

Personally, if I have tasks which are too complex for me to solve with the fairly basic knowledge of `sed` that I have, I will generally write a small program in Python, Node or another high-level and expressive language to do the work, and call that instead.

This will often be easier to maintain and understand than an extremely complex `sed` expression. But when you decide to move from a shell command to a programming language will be a decision which you will have to make on a case by case basis.

In a later chapter, we'll look at how to write well-behaved command line programs which we can compose together using familiar mechanisms like pipelines to build more tools for our toolkit.

# Summary

In this chapter we:

- Introduced `sed`, the stream editor command
- Saw that when we need to transform or manipulate text, `sed` is often a great tool for the job
- Learnt how to perform simple substitutions with `sed`, using commands such as `sed 's/old-text/new-text/'`
- Saw the components which make up a `sed` expression - the function, the expression and when needed, the line pattern
- Saw how to use `-e` to apply multiple patterns
- Went deeper into _extended regular expressions_
- Saw an example of how to strip comments from a file with `sed`
- Saw how to remove empty lines with `sed`
- Looked into _line patterns_ in more detail, showing how we can choose what lines `sed` operates on
- Saw how to append text to lines with `sed`
- Saw how to use patterns and capture groups to extract information from lines with `sed`
- Saw more advanced examples of capture groups, allowing us to capture different parts of a match and manipulate them individually, or recompose them
- Saw how `sed` can be used to implement a simple 'template' mechanism for files
- Saw how the `-i` (_in place_) parameter works for `sed`
- Briefly described `awk` as a potential alternative tool to learn about for more sophisticated text manipulation
- Suggested that if something is too complex to write easily in `sed`, it may be faster to implement it with a programming language

---

**Footnotes**

[^1]: Note that if we used `rm -r` instead of `rmdir`, which is very common, we run the risk of making a big mistake - passing the source directory for the `cp` command as the first parameter to remove. This would mean we run `rm -r` on the source files for the backup and the backup folder itself, deleting both! This is one place where using `rmdir` makes a bit more sense - it won't delete the source files if we make a mistake!
[^2]: You can use any character to delimit expressions - sometimes people will use `#` or `|` rather than a forward slash, typically because they want to use the forward slash as part of a pattern.
