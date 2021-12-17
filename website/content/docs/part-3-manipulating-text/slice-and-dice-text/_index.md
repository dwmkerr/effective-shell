---
title: "Slice and Dice Text"
slug: "slice-and-dice-text"
weight: 15
---

# Chapter 15 - Slice and Dice Text

In [Chapter 14]({{< relref "/docs/part-3-manipulating-text/get-to-grips-with-grep" >}}) we looked at how to use the `grep` command to search through text and filter text. In this chapter we're going to look at some of the basic commands which we can use to _manipulate_ text. There are a whole raft of commands and options available.

We'll start with the basics and move onto some of the more sophisticated commands in the next chapter.

# Heads and Tails

The commands `head` and `tail` are very simple but incredibly useful.

`head` is used to extract part of the _top_ of a file and `tail` is used to extract part of the _end_ of a file. Once you starting using these commands you'll find yourself using them regularly.

Let's start with `head`. Imagine we have a data file which has been sent to us, we don't know exactly what is in it, but we know it is large. How can we take a quick look?

```
$ head ~/effective-shell/data/top100.csv

"Rank","Rating","Title","Reviews"
"1","97","Black Panther (2018)","515"
"2","94","Avengers: Endgame (2019)","531"
"3","93","Us (2019)","536"
"4","97","Toy Story 4 (2019)","445"
"5","99","Lady Bird (2017)","393"
"6","100","Citizen Kane (1941)","94"
"7","97","Mission: Impossible - Fallout (2018)","430"
"8","98","The Wizard of Oz (1939)","120"
"9","96","The Irishman (2019)","441"
```

The `head` command just shows the first ten lines of a file. Here we can see that this is a _comma separated values_ file which seems to be a list of movies. This file is actually a list of the top 100 films on 'Rotten Tomatoes' at the time of writing, with the score, tomato meter, name and number of votes. We'll use it a lot in this chapter to demonstrate text manipulation.

You can use the `-n` flag to specify the number of lines you want to see, for example:

```
$ head -n 3 ~/effective-shell/data/top100.csv

"Rank","Rating","Title","Reviews"
"1","97","Black Panther (2018)","515"
"2","94","Avengers: Endgame (2019)","531"
```


The `tail` command works in the same way - but looks at the _end_ of a file. This is more useful when you are looking content which changes over time, like log files. In this case you probably want to see only the most _recent_ entries.

Here's how we can see the ten most recent commands we entered in our shell:

```
$ tail $HISTFILE

: 1606818280:0;ls
: 1606818300:0;ln -s $(pwd) ~/effective-shell
: 1606818308:0;cat ~/effective-shell/data/top100.csv
: 1606818342:0;head -n 3 ~/effective-shell/data/top100.csv
: 1606819062:0;head ~/effective-shell/data/top100.csv
: 1606819647:0;gcd
: 1606819649:0;git stash
: 1606819650:0;gcd
: 1606819662:0;git stash pop
: 1606819803:0;tail $HISTFILE
```

{{< hint info >}}
**What is $HISTFILE?**  

Most Bash-like shells keep a file called the _history_ file. This is essentially a record of all of the commands which have been written in the shell. The `history` command can be used to show the contents of this file. But if we want to work with the file directly, we can find its location with the special variable called `$HISTFILE`. 

Enter `help history` for more information on the shell history.
{{< /hint >}}

We can be more specific, just like with `head`, by specifying the number of lines to show:

```
$ tail -n 3 $HISTFILE

: 1606819650:0;gcd
: 1606819662:0;git stash pop
: 1606819803:0;tail $HISTFILE
```

`tail` can also be used to show the _changes_ to a file in real time. Add the `-f` flag to _follow_ the contents of the file - this means the `tail` command show each new line as it gets added to the file.

To try it out, run the following command in one shell:

```
$ tail -f $HISTFILE
```

In another terminal window, start entering commands. You'll see that the `tail` command in the first window is writing the updates to the terminal as they are entered in the file. Press `Ctrl+C` to close the `tail` program.

Another trick I use a lot with `tail` is to use `-n +2`. This shows everything _from the second line_ - the `+` symbol indicates we show everything from the given line onwards. This makes it easy to strip the header, or first line, from content. Here's how you might use it:

```
$ head ~/effective-shell/data/top100.csv | tail -n +2

"1","97","Black Panther (2018)","515"
"2","94","Avengers: Endgame (2019)","531"
"3","93","Us (2019)","536"
"4","97","Toy Story 4 (2019)","445"
"5","99","Lady Bird (2017)","393"
"6","100","Citizen Kane (1941)","94"
"7","97","Mission: Impossible - Fallout (2018)","430"
"8","98","The Wizard of Oz (1939)","120"
"9","96","The Irishman (2019)","441"
````

Here I've taken the `head` of the file (otherwise the output gets quite difficult to follow), then piped the results into `tail -n +2` to grab everything from the second line onwards - which removes the heading line. We see the films only, not the titles of each column.

We're going to use `head` and `tail` quite a lot when working with text. These are two crucial tools which can really speed up your work.

# Replacing Text 

The next tool we'll look at is `tr` (_translate characters_). This program is very simple. My most common use for `tr` is to perform a simple substitution of characters.

Let's create a list of each of the columns in the data file we saw before to show how the command works:

```
$ head -n 1 ~/effective-shell/data/top100.csv | tr ',' '\n'

"Rank"
"Rating"
"Title"
"Reviews"
```

What about if we wanted to remove the quotes?

```
$ head -n 1 ~/effective-shell/data/top100.csv | tr ',' '\n' | tr -d '"'

Rank
Rating
Title
Reviews
```

Here we've seen two variations on how we can run the command. The first form is used to _replace_ characters. Running:

```
tr ',' '\n'
```

Replaces the first specified character with the second. The `\n` character is the special _newline_ character, which is used to create a line break at the end of a file.

The second form uses the `-d` flag to specify a set of characters to delete:


```
tr -d '"'
```

In the form above we delete quote (`"`) characters.

When using `tr` remember that it works on _characters_. For example, the following might not work as you expect:

```
$ echo "Welcome to the shell" | tr 'shell' 'machine'

Wcicomc to tac macii
```

The reason the output is like this is that we're specifying _character_ replacements - so we're changing characters as shown below:

```
s -> m
h -> a
e -> c
l -> h
l -> i
```

There _are_ plenty of ways to replace entire words or perform more complex operations, but we'll use `sed` or `awk` for these operations - which we'll see in the following chapter.

There is one final thing it is worth mentioning about `tr`. It can be provided with _character classes_. This is easiest to explain with an example:

```
$ echo "Use your inside voice..." | tr '[[:lower:]]' '[[:upper:]]'

USE YOUR INSIDE VOICE...
```

In this case we are transforming characters in the `lower` class (lowercase characters) to the `upper` class (uppercase characters).

On Linux systems you can find more about character classes with `man 7 regex`. I am not going to go deeper into character classes at this stage. They provide a simple way to specify things like digits, alphabetic characters and so on, but there are other ways to do this (with _extended regexes_) which I think are likely to be more useful to learn about instead.

# How to Cut

The next command is one which I've used far more than I expected. The `cut` command _splits_ a line of text, using a given delimiter. Let's see some examples:

```
$ cut -d',' -f 3 ~/effective-shell/data/top100.csv | head

"Title"
"Black Panther (2018)"
"Avengers: Endgame (2019)"
"Us (2019)"
"Toy Story 4 (2019)"
"Lady Bird (2017)"
"Citizen Kane (1941)"
"Mission: Impossible - Fallout (2018)"
"The Wizard of Oz (1939)"
"The Irishman (2019)"
```

This is the first way to use `cut`. We specify the `-d` flag to choose a _delimiter_ which we will cut the text with, then `-f` to choose _which field_ we want to see. In this case we show split on the command character and show the third field - the _title_ of the film in the data file.

This can be extraordinarily useful. Let's see how to get the names of the Kubernetes pods I have running on a cluster. I can use the following command to get the pods:

```
$ kubectl get pods

NAME                                  READY   STATUS    RESTARTS   AGE
elastic-operator-0                    1/1     Running   0          35d
elk-apm-server-65b698fb8c-rzncz       1/1     Running   0          13d
elk-es-default-0                      1/1     Running   0          35d
elk-kb-6f8bb6457b-bbbnn               1/1     Running   0          35d
filebeat-beat-filebeat-ccgl7          1/1     Running   1          13d
filebeat-beat-filebeat-dvf2l          1/1     Running   2          13d
filebeat-beat-filebeat-mnpms          1/1     Running   329        13d
kube-state-metrics-5cb57bdc45-mqv9d   1/1     Running   0          35d
metricbeat-beat-metricbeat-2xm7t      1/1     Running   6103       35d
metricbeat-beat-metricbeat-96dkt      1/1     Running   6097       35d
metricbeat-beat-metricbeat-n7kxm      1/1     Running   6109       35d
```

Now to get the name I can just `cut` the lines on the 'space' character and grab the first field:

```
$ kubectl get pods | cut -d' ' -f 1

NAME
elastic-operator-0
elk-apm-server-65b698fb8c-rzncz
elk-es-default-0
elk-kb-6f8bb6457b-bbbnn
filebeat-beat-filebeat-ccgl7
filebeat-beat-filebeat-dvf2l
filebeat-beat-filebeat-mnpms
kube-state-metrics-5cb57bdc45-mqv9d
metricbeat-beat-metricbeat-2xm7t
metricbeat-beat-metricbeat-96dkt
metricbeat-beat-metricbeat-n7kxm
```

And if we want to strip the first line? We can use the `tail -n +2` command to tail everything from the second line onwards:


```
$ kubectl get pods | cut -d' ' -f 1 | tail -n +2

elastic-operator-0
elk-apm-server-65b698fb8c-rzncz
elk-es-default-0
elk-kb-6f8bb6457b-bbbnn
filebeat-beat-filebeat-ccgl7
filebeat-beat-filebeat-dvf2l
filebeat-beat-filebeat-mnpms
kube-state-metrics-5cb57bdc45-mqv9d
metricbeat-beat-metricbeat-2xm7t
metricbeat-beat-metricbeat-96dkt
metricbeat-beat-metricbeat-n7kxm
```

Bingo - we've removed the heading line. If you remember `grep` from the previous chapter, you might have spotted that we could also just filter the content:

```
$ kubectl get pods | cut -d' ' -f 1 | grep -v NAME

elastic-operator-0
elk-apm-server-65b698fb8c-rzncz
elk-es-default-0
elk-kb-6f8bb6457b-bbbnn
filebeat-beat-filebeat-ccgl7
filebeat-beat-filebeat-dvf2l
filebeat-beat-filebeat-mnpms
kube-state-metrics-5cb57bdc45-mqv9d
metricbeat-beat-metricbeat-2xm7t
metricbeat-beat-metricbeat-96dkt
metricbeat-beat-metricbeat-n7kxm
```

With even just a few simple shell commands there are often many ways to accomplish the same goal!

There is another way we can `cut` text. We can `cut` by slicing a number of characters from each line.

Let's take a look at our web logs file:

```
$ tail ~/effective-shell/logs/web-server-logs.txt

2020-11-29T12:50:52.721Z: info - Request: GET /en.search.min.1f83b222e24a227c0f5763727cb9e4f3b435f08b936f6ce529c9c9359f6b61a8.js
2020-11-29T12:50:52.722Z: info - Serving file '../../../website/public/en.search.min.1f83b222e24a227c0f5763727cb9e4f3b435f08b936f6ce529c9c9359f6b61a8.js'...
2020-11-29T12:50:52.762Z: info - Request: GET /svg/menu.svg
2020-11-29T12:50:52.763Z: info - Serving file '../../../website/public/svg/menu.svg'...
2020-11-29T12:50:52.763Z: info - Request: GET /svg/calendar.svg
2020-11-29T12:50:52.764Z: info - Serving file '../../../website/public/svg/calendar.svg'...
2020-11-29T12:50:52.765Z: info - Request: GET /svg/edit.svg
2020-11-29T12:50:52.766Z: info - Serving file '../../../website/public/svg/edit.svg'...
2020-11-29T12:50:52.784Z: info - Request: GET /fonts/roboto-v19-latin-300italic.woff2
2020-11-29T12:50:52.785Z: info - Serving file '../../../website/public/fonts/roboto-v19-latin-300italic.woff2'...
```

We can use the `-c` (_characters_) flag to specify the characters in the line we want to see. Let's extract the timestamp only:

```
$ tail -n 3 ~/effective-shell/logs/web-server-logs.txt | cut -c 12-19

12:50:52
12:50:52
12:50:52
```

We can also use the character option to extract everything from a specific point onwards:


```
$ tail -n 3 ~/effective-shell/logs/web-server-logs.txt | cut -c 27-

info - Serving file '../../../website/public/svg/edit.svg'...
info - Request: GET /fonts/roboto-v19-latin-300italic.woff2
info - Serving file '../../../website/public/fonts/roboto-v19-latin-300italic.woff2'...
```

By cutting from the 27th character onwards (`-c 27-`) we remove the timestamp and just get the log message.

As a nice trick you can use the same syntax when splitting by fields:

```
$ tail -n 3 ~/effective-shell/data/top100.csv | cut -d',' -f 3-

"Pinocchio (1940)","55"
"Chinatown (1974)","75"
"The Dark Knight (2008)","342"
```

This is field three onwards. If we just want fields two and three, we use:

```
$ tail -n 3 ~/effective-shell/data/top100.csv | cut -d',' -f 2,3

"100","Pinocchio (1940)"
"99","Chinatown (1974)"
"94","The Dark Knight (2008)"
```

There's a surprising amount you can do with the `cut` tool. As we introduce more complex tools later on, like `sed` and `awk`, we'll see other ways to accomplish the same goals, but I often find that by filtering down the content with `grep` first I can `cut` my way to what I need without having to use more complex tools.

# A Trick with Rev

There is a very simple command called `rev` which reverses the given input. For example:

```
$ echo "A nut for a jar of tuna" | rev

anut fo raj a rof tun A
```

At first glance this doesn't seem very useful - but there's a nice trick we can do with this:

```
$ pwd | rev | cut -d\ -f 1 | rev

effective-shell
```

Here we take the current working directory, reverse it, cut the first field, then reverse it again. Here's what's happening at each stage:

```
pwd              /Users/dwmkerr/effective-shell
rev              llehs-evitceffe/rrekmwd/sresU/
cut -d'/' -f 1   llehs-evitceffe
rev              effective-shell
```

This is a neat trick to rip all of the text from the _final_ occurrence of a character. You might not use it very often but it's an interesting reminder that you can often do more than you think by chaining together simple commands into a pipeline!

# Sort and Unique

Two other commands which can be really helpful are `sort` and `uniq`. Let's see `sort` first:

```
$ cut -d',' -f 3 ~/effective-shell/data/top100.csv | sort | head

"12 Years a Slave (2013)"
"A Hard Day's Night (1964)"
"A Night at the Opera (1935)"
"A Quiet Place (2018)"
"A Star Is Born (2018)"
"Alien (1979)"
"All About Eve (1950)"
"Argo (2012)"
"Arrival (2016)"
"Avengers: Endgame (2019)"
```

Here we've grabbed the third field in our data file (the name of the film), sorted, then shown the first ten values.

You can _reverse_ the direction of `sort` with the `-r` flag:

```
$ cut -d',' -f 3 ~/effective-shell/data/top100.csv | sort -r | head

"Zootopia (2016)"
"Wonder Woman (2017)"
"Won't You Be My Neighbor? (2018)"
"Widows (2018)"
"War for the Planet of the Apes (2017)"
"Us (2019)"
"Up (2009)"
"Toy Story 4 (2019)"
"Toy Story 3 (2010)"
"Toy Story 2 (1999)"
```

There are actually quite a few other options for sort, you can see them with `man sort`. However, most of them perform functionality which you can get from other tools (such as making the lines unique, which we can do with `uniq`). You might find some of them useful so don't be shy to explore some of the other options.

The `uniq` command removes duplicate lines from a stream of text. Note that this _only_ removes duplicate lines when they are _next to each other_. This means that you will often have to `sort` first.

Here's an example of where I might use `uniq` - getting all unique error messages in a log file:

```
$ cut -c 27- ~/effective-shell/logs/web-server-logs.txt | grep error | sort | uniq

error - Unhandled error EACCES trying to read '../../../website/public/docs/part-1-getting-started/5-getting-help/index.html', returning a 500
error - Unhandled error EACCES trying to read '../../../website/public/svg/calendar.svg', returning a 500
error - Unhandled error EACCES trying to read '../../../website/public/svg/edit.svg', returning a 500
info - Request: GET /docs/1-getting-started/images/ls-applications-windows-error.png
info - Request: GET /docs/part-1-getting-started/3-managing-your-files/images/rm-error-directory.png
info - Serving file '../../../website/public/docs/1-getting-started/images/ls-applications-windows-error.png'...
info - Serving file '../../../website/public/docs/part-1-getting-started/3-managing-your-files/images/rm-error-directory.png'...
```

Let's break this down:

- `cut -c 27- ~/effective-shell/logs/web-server-logs.txt` - extract log messages from a log file, skipping the timestamp
- `grep error` - filter down to lines which contain the text `error`
- `sort` - sort the output
- `uniq` - show only unique values

This is a powerful technique - if we had thousands of errors in the file, this would make sure we only see _distinct_ errors, rather than showing _every_ error.

# Don't Forget Your Pager!

In [Chapter 5 - Viewing a File]({{< relref "/docs/part-2-core-skills/viewing-a-file" >}}) we talked about the _pager_ - the program your shell uses to make it easier to look through larger text files, giving the option to move backwards and forwards a page at a time (or searching and so on). Don't forget to use your pager when you are working with text. When you are trying to build a pipeline and want to see intermediate results (perhaps _before_ you use `head` or `tail`) then you can use the pager to avoid filling your screen and terminal with too much text.

For example, when looking at the sorted list of films, I might run this:

<pre>
$ cut -d',' -f 3 ~/effective-shell/data/top100.csv | sort | less

"<strong>Jaws</strong> (1975)"
"King Kong (1933)"
"La Grande illusion (Grand Illusion) (1938)"
"La La Land (2016)"
"Lady Bird (2017)"
"Laura (1944)"

/<strong>Jaws</strong>
</pre>

I've made the output smaller so that it is easier to see what is happening. In this example I've cut out the film name from my data file, sorted it, then piped the result into `less` so that I can page through the data and ensure it is correct - I've also searched for the text `Jaws` to see where it is in the file.

# Summary

In this chapter we introduced a number of basic tools which let us work with text.

- `head` will show the first ten lines of a file.
- `head -n 30` will show the first thirty lines of a file, using the `-n` flag to specify the number of lines.
- `tail` will show the final ten lines of a file.
- `tail -n 3` uses the `-n` flag to specify three lines only.
- The `$HISTFILE` environment variable holds the path to the shell command history file.
- `tail -f $HISTFILE` uses the `-f` flag to _follow_ the file, printing output as it is written to the file.
- `tr 'a' 'b'` is the _translate text_ command, which turns one set of characters into another
- `tr -d '!'` shows how the `-d` or _delete_ flag can specify characters to delete.
- The `cut` command can be used to extract parts of a line of text.
- `cut -d',' -f 3` shows how the `-d` or _delimiter_ flag is used to specify the delimiter to cut on and how the `-f` or _field_ flag specifies which of the fields the text has been cut into is printed.
- `cut -c 2-4` uses the `-c` or _characters_ flag to specify that we are extracting a subset of characters in the line, in this case characters two to four.
- `cut -c 10-` cuts from character ten to the end of the line
- The `cut` command also allows for multiple fields to be specified when cutting by field, such as `-f 2,3` for the second and third field, or `-f 4-` for fields four onwards.
- `rev` reverses text - by reversing, cutting and then re-reversing you can quickly extract text from the _end_ of a line.
- `sort` sorts the incoming text alphabetically.
- The `-r` flag for `sort` reverses the sort order.
- The `uniq` command removes duplicate lines - but only when they are next to each other, so you'll often use it in combination with `sort`.
- Your pager, for example the `less` program can be useful when inspecting the output of your text transformation commands.

