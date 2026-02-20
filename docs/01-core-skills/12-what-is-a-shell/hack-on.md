### Hack On! See those system calls!

I mentioned earlier on that if you make a call like `fopen`, the Kernel is going to provide access to a file. It's quite easy to see this in action. Check the code below:

```c
#include <stdio.h>

void main()
{
    void* handle = fopen("/tmp/some-file");
    fwrite(handle, "some text");
    fclose(handle);
}
```

If you compile this program, then run XXX you will see the actual calls made to the Kernel. It can be _very_ useful to use this technique to see what is going on with programs under the hood, particularly when diagnosing issues.


### Hack On! Ahah! So that's TTY?

Consider a command like:

```
docker -it
```

Consider a command like:

```
ssh user@remote.com my-script
no tty
```

Once you understand the concept of shells and terminals in a bit more detail, more obscure messages like this start to make sense.

In the first instance, we are telling Docker we are *interactive* - i.e. we are going to use an interface to send commands. The second parameter, `-t` says use a TTY - which is short for teletype terminal, old fashioned lingo for the screen.

TODO TTY picture

## TODO

## Summary; technical

For technical readers, there's quite a lot of terms which get thrown about almost interchangeably; shell, command-line, terminal, tty, command-prompt, CLI and so on. But each of these have a very specific meaning. It's important to understand exactly what each of these terms really means, where they came from, and how these different types of system or concept relate to each other.

## Summary; non-tech

A computer in a nutshell.

---

-- Could link to other layers of abstractions - such as sandboxes in webpages?
-- Could link to other layers of abstraction, such as containers?
