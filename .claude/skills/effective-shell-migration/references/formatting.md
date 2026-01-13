# Formatting Guide

## Admonitions

Convert book note/warning blocks to Docusaurus admonitions.

### Notes

**Book format:**
```
**Note** You can also use the `-p` flag...
```

**Website format:**
```markdown
:::note

You can also use the `-p` flag...

:::
```

### Warnings

**Book format:**
```
**warning** Be very careful with the *rm* command...
```

**Website format:**
```markdown
:::warning

Be very careful with the `rm` command...

:::
```

### Tips

**Book format:**
```
**Tip** Use tab completion to save time.
```

**Website format:**
```markdown
:::tip

Use tab completion to save time.

:::
```

## Keyboard Shortcuts

Convert smallcaps keyboard references to `<kbd>` tags.

**Book format:**
```
Press [enter]{.smallcaps} to continue.
Use [ctrl]{.smallcaps}-C to cancel.
```

**Website format:**
```markdown
Press <kbd>Enter</kbd> to continue.
Use <kbd>Ctrl</kbd>+<kbd>C</kbd> to cancel.
```

### Keyboard Key Capitalization

| Key | Format |
|-----|--------|
| Enter/Return | `<kbd>Enter</kbd>` |
| Control | `<kbd>Ctrl</kbd>` |
| Shift | `<kbd>Shift</kbd>` |
| Alt/Option | `<kbd>Alt</kbd>` |
| Command (Mac) | `<kbd>Cmd</kbd>` |
| Tab | `<kbd>Tab</kbd>` |
| Escape | `<kbd>Esc</kbd>` |

## Code Blocks

### Command Examples

**Book format:**
```
\$ **pwd**
/home/dwmkerr
```

**Website format:**
```markdown
```bash
$ pwd
/home/dwmkerr
```
```

### Multi-line with Output

Always include language specifier. Use `bash` for shell examples:

```markdown
```bash
$ ls -la
total 40
drwxr-xr-x 2 dwmkerr dwmkerr 4096 Apr 2 19:18 Desktop
drwxr-xr-x 2 dwmkerr dwmkerr 4096 Apr 2 19:18 Documents
```
```

### Inline Code

Use backticks for commands, filenames, and options:

```markdown
Use the `ls` command with the `-l` option.
Edit the `~/.bashrc` file.
```

## Menu Navigation

**Book format:**
```
Go to **Properties**4**Options**
```

**Website format:**
```markdown
Go to **Properties > Options**
```

## Page References

Remove or convert to section links.

**Book format:**
```
See "Navigating with the Dot and Double-Dot Folders" on page 397.
```

**Website format:**
```markdown
See the "Navigating with the Dot and Double-Dot Folders" section below.
```

Or use anchor links if in different page:
```markdown
See [Navigating with Dot Folders](/appendices/shell-basics#navigating-with-the-dot-and-double-dot-folders).
```

## Images

Book images are in:
```
~/repos/github/dwmkerr/effective-shell-book/from-rachel/images/for-prod/
```

Named by chapter: `ch01-figure-1-1.png`, `appendix-b-figure-1.png`, etc.

### Adding Images

1. Copy image to the same folder as the page
2. Use relative markdown syntax

**Book format:**
```
Take a look at Figure B-1, which illustrates the directory stack.

Figure B-1: The *pushd* and *popd* directory stack
```

**Website format:**
```markdown
The diagram below illustrates the directory stack.

![The pushd and popd directory stack](./appendix-b-figure-1.png)
```

### Finding Images

Check which images exist for a chapter:
```bash
ls ~/repos/github/dwmkerr/effective-shell-book/from-rachel/images/for-prod/ch01*
ls ~/repos/github/dwmkerr/effective-shell-book/from-rachel/images/for-prod/appendix-b*
```

Search for figure references in book source:
```bash
grep -n "Figure" ~/repos/github/dwmkerr/effective-shell-book/migration/chapters/ch01*.md
```

## URLs

Convert italic URLs to plain links.

**Book format:**
```
Visit *https://effective-shell.com* for more.
```

**Website format:**
```markdown
Visit https://effective-shell.com for more.
```
