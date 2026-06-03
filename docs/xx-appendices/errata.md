# Errata

Corrections and clarifications for the print and ebook editions of *Effective Shell* (No Starch Press). If you spot an issue, please [open an issue](https://github.com/dwmkerr/effective-shell/issues) or email dwmkerr@gmail.com.

The website is kept up to date as corrections are confirmed — entries here note the original printed text and the fix applied online.

## Chapter 2 — Flying on the Command Line

### Page 6–7, "Search Commands" — Ctrl-S and XOFF

`Ctrl+S` is described as forward history search. That is correct in Readline when terminal flow control is disabled (`stty -ixon`), but on many default terminals `Ctrl+S` triggers XOFF and freezes terminal output. The recovery shortcut is `Ctrl+Q` (XON). The interaction with the terminal line discipline is covered later in the book, but a reader trying `Ctrl+S` on a default terminal will hit a frozen prompt with no guidance. The website now includes a callout next to the `Ctrl+S` introduction noting the XOFF behaviour and `Ctrl+Q` as the recovery shortcut.

### Page 9, "Other Useful Shortcuts" — Ctrl-L

The text says `Ctrl+L` "clears the screen". More precisely, the Readline `clear-screen` function redraws the prompt at the top of the visible area; the scrollback buffer is not cleared. Sensitive output remains accessible via scroll-up. The `clear` command also does not wipe scrollback by default — use `clear -x`, or `printf '\033[3J'`, to clear the scrollback as well.

### Page 10, "Show All Shortcuts" — bindkey vs bind

The text presents `bind -p` as an "alternative form" of `bindkey`. They are not alternatives — `bindkey` is a Zsh builtin and `bind` is a Bash builtin. Neither has a man page (running `man bind` lands on the C socket function, not the shell builtin). The correct way to view the current keybindings is:

- Bash: `bind -p`, or `help bind` for documentation
- Zsh: `bindkey`, or `man zshzle` for documentation

A shell-agnostic alternative for inspecting terminal-level key bindings is `stty -a`.

## Chapter 3 — Thinking in Pipelines

### Page 19 — Ctrl-D

`Ctrl+D` is described as the "end of transmission" character. That is the ASCII name for the byte (0x04, EOT). In practice the terminal line discipline intercepts the byte in cooked mode and signals end-of-file (EOF) to the program reading from stdin — the raw 0x04 byte never reaches the process. Behaviour is configurable via `stty` and differs in raw mode. Most shell documentation refers to this as EOF; the website now uses "signals EOF to the program reading stdin" and notes the underlying byte.

### Page 19 — `wc` flag typo

One print run shows `wc -1` (digit one) instead of `wc -l` (lowercase L) for the line-count flag. Page 20 prints correctly. This is a print typo only; the website is correct.

## Chapter 7 — Get to Grips with `sed`

### Page 85 — `-e` flag

The text says the `-e` flag stands for *expression*. It is conventionally read as *execute* — in `sed -e 'foo' -e 'bar'`, each argument is a script (with at minimum a command, optionally an address or address range). Calling them "expressions" is imprecise because regular expressions are a distinct concept that appears *inside* the address or command portion of a script.

### Page 86 — sed script formatting

```bash
sed -e '/^cp/s/cp/rmdir/' backup-config.sh
```

A space between the address and the command makes scripts easier to read:

```bash
sed -e '/^cp/ s/cp/rmdir/' backup-config.sh
```

### Page 87 — "Using sed addresses" reference box

Addresses are shown without delimiting slashes for the regex patterns. The correct convention puts regex addresses between forward slashes (matching the convention used by `grep`, `awk`, `perl`, and others):

| Address     | Meaning                                                |
|-------------|--------------------------------------------------------|
| `/test/`    | lines matching the regex `test`                        |
| `/test/!`   | lines *not* matching `test`                            |
| `6`         | line 6                                                 |
| `1,10`      | lines 1 to 10                                          |
| `1,10!`     | lines outside the range 1 to 10                        |
| `/foo/,10`  | from the first line matching `foo` to line 10          |
| `3,/bar/`   | from line 3 to the first line matching `bar`           |

### Page 90 (Early Access PDF dated 2025-02-05) — Prepending Text

The command:

```bash
sed -E -e '/#/s/^/##/' backup-config.sh
```

should be:

```bash
sed -E -e '/^#/s/^/##/' backup-config.sh
```

Without the leading `^` in the address, the substitution matches any line that contains a `#` anywhere, not just lines that begin with `#`.

## Chapter 8 — `xargs`

### Page 105 — `mkdir -p ~/pics`

The surrounding text introduces the `-p` ("prompt") flag for `xargs`. Using `mkdir -p ~/pics` immediately afterwards is confusing because `-p` on `mkdir` means *parents*. The example reads more cleanly as `mkdir ~/pics`.

## Chapter 9 — Shell Script Fundamentals

### Page 112 — pipeline continuation style

The pipeline is shown with explicit backslash line continuations:

```bash
tail ~/.bash_history -n 1000 \
  | sort \
  | uniq -c \
  | sed 's/^ *//' \
  | sort -n -r \
  | head -n 10
```

In shell syntax, a line ending in a pipe (`|`), `||`, or `&&` implies continuation, so the backslashes can be dropped:

```bash
tail ~/.bash_history -n 1000 |
  sort |
  uniq -c |
  sed 's/^ *//' |
  sort -n -r |
  head -n 10
```

This is a style point rather than an error — both forms run identically. The website examples use the implicit form in long pipelines.

## Chapter 13 — Regular Expression Essentials

The chapter teaches regular expressions using [regex101.com](https://regex101.com) as the primary reference tool. regex101 defaults to a PCRE-compatible engine. Several subsequent chapters cover tools that use different regex flavours:

| Tool             | Flavour                              |
|------------------|--------------------------------------|
| `grep`           | Basic Regular Expressions (BRE)      |
| `grep -E`, `egrep` | Extended Regular Expressions (ERE) |
| `sed`            | BRE (ERE with `-E`)                  |
| `awk`            | ERE                                  |
| `perl`, `pcregrep` | PCRE                              |

Constructs such as `\d`, unescaped `+`, `?`, and `{n,m}` work in regex101 but behave differently in `grep` BRE. The chapter has a short note on tool differences toward the end, but readers building a mental model around regex101 will hit surprises the first time they use `grep` or `sed`. A flavour overview has been added near the start of the chapter to make this explicit.

---

*Thanks to Bruno "GNUser" Dantas and other readers for the careful catches.*
