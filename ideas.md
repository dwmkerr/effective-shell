
# Ideas

Scattered Notes for chapters, things I'd like to cover, etc.

- Who am I, What am I running? uname, whoami, $SHELL etc
- Managing Performance: top, kill, signals and disk usage

- Testing: `-x`, `-f`, `-e`, etc `man test`
- Basic Maths: `$(( 1/3 ))`, etc
- Bash Regexes: `$x ~= /something/`, etc
- Splicing: `$var = ${x:1:3}`
- Length: `$len = $#`, `${var:#}`, etc
- Unit Testing with Tap
- When to *not* script: diving into C, Python, Ruby, Node
- How to write shell programs: Recognising `stdin` as input, silencing output, writing to stdout/stderr, modern syntax (`command verb` such as `k8s` and `s3`).
- Key files in the system `/etc/passwd`
- Workhorses: `fmt`, `awk`, `bc`, `sed`, `cut`, `grep`, `cron`, `make`
- The core parts of the linux filesystem (`/var/, /sbin/ etc`)
- Quick trick on cut: `rev | cut -d. -f 1 | rev` gets the file extension, `rev | cut -d. -f 2 | rev` gets the filename, source is 101 Wicked Shell Scripts).
- Being compliant: `brew install coreutils`: see also Wicked Shell Scripts #100
- Shebangs: How to use, when to use `env`, how shebangs work with multiple shells (e.g. if I source a bash shebang in a zsh, what will happen?)
- Aliases. When to use (and more importantly, when not to use).
- Dotfile management (profile, private, etc)
- Sourcing (bashrc, profile, interactive, noninteractive, etc)
- Understand logging (syslog, `logger` etc)
- Terminal Multiplexing: `screen` and `tmux`
- ANSI C Escaping (see https://www.dwmkerr.com/quick-tip-sending-newlines-with-curl/#comment-4375113010)
- Moving Files - `scp`, `aws s3`, `xcopy` etc
- Know Your Arrows! Pipe stdin <, >>, >, 2&>1 etc
- Understanding Commands (`command -v` to see functions, aliases, builtins etc)
- Customising the command prompt
- Basic Shell Scripting
- Internal Variables (https://www.tldp.org/LDP/abs/html/internalvariables.html#PROCCID)
- Heredocs
- ANSI C Escaping (see https://www.dwmkerr.com/quick-tip-sending-newlines-with-curl/#comment-4375113010)
- The history of shells, a shell family tree
- The rising popularity of commandline interfaces (Borland, VC++ vs Code, Vim etc)
- Globing (e.g. `cat file{1,2,3}`)
- Quick aliases (e.g. `D` for ISO8601 date)
- Watching (e.g. `watch k get pods`)
- Supercharging autocomplete

## Potential Future Chapters

The follow ideas might have potential as future chapters.

### Chapter - The Linux Filesystem, The Posix Standard and the GNU Project

If you are using different systems, one of the first things you might want to do as you build your toolkit is to make different tools on different platforms run in a consistent way. To help you understand how different systems will operate, in this chapter we'll take a look at the Linux Filesystem, the Posix standard and the GNU project. We'll also see some tricks on how to try and make tools from different platforms behave in a more consistent way.

