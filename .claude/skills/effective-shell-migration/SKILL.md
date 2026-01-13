---
name: effective-shell-migration
description: This skill should be used when migrating book content to website, converting chapter formatting, or making any changes to migrated content. Use when the user mentions "migration", "book content", "chapter", or edits files in docs/ that correspond to book chapters.
---

# Effective Shell Migration

Converts published book content to website format while preserving the author's intent.

## Core Principle

**Never change book content.** The published text is authoritative. Only convert formatting—never edit substance.

## Quick Reference

### Typography

| Character | Correct | Incorrect |
|-----------|---------|-----------|
| Em-dash | `—` (U+2014) | `---` or `--` |
| En-dash | `–` (U+2013) | `--` |
| Quotes | `"straight"` | `"curly"` |

### Format Conversions

| Book Format | Website Format |
|-------------|----------------|
| `**Note**` blocks | `:::note` admonition |
| `[key]{.smallcaps}` | `<kbd>Key</kbd>` |
| `**Menu**4**Item**` | `**Menu > Item**` |
| Page references | Section links or remove |
| `Figure X-Y: Caption` | `![Caption](./image.png)` |

### Code Blocks

```markdown
# Book format (with \$ prompt marker)
\$ **command here**
output

# Website format
```bash
$ command here
output
```
```

## Detailed References

- [Typography Rules](./references/typography.md) - Em-dashes, quotes, special characters
- [Formatting Guide](./references/formatting.md) - Admonitions, keyboard shortcuts, code blocks
- [Workflow Checklist](./references/workflow.md) - Step-by-step migration process

## Validation Checklist

Before committing migrated content:

- [ ] No `---` used as em-dashes (use `—`)
- [ ] No curly quotes (use straight quotes)
- [ ] `:::note` admonitions for note blocks
- [ ] `<kbd>` tags for keyboard keys
- [ ] Code blocks have language specifier
- [ ] Page references removed or converted to links
- [ ] All figures copied and referenced
- [ ] Build passes (`npm run build`)

## Samples Installation Command

The canonical command to install samples is:

```bash
curl -fsSL effective.sh | bash
```

Always use this form (not `curl effective.sh | sh`).

## Source Files

Book chapters: `~/repos/github/dwmkerr/effective-shell-book/migration/chapters/`
Book images: `~/repos/github/dwmkerr/effective-shell-book/from-rachel/images/for-prod/`
Final manuscript: `~/repos/github/dwmkerr/effective-shell-book/zz-manuscript/EffectiveShell_txt_FIN.docx`
