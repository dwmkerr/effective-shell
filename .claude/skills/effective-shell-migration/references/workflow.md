# Migration Workflow

## Before Starting

1. Load the migration skill: `/skill effective-shell-migration`
2. Check migration status in `tasks/migration/README.md`
3. Identify the next chapter to migrate

## Per-Chapter Process

### Step 1: Read Source

Read the book chapter from:
```
~/repos/github/dwmkerr/effective-shell-book/migration/chapters/
```

### Step 2: Compare with Website

Check if website version exists. If so, diff against book content to identify changes.

### Step 3: Apply Conversions

Work through the content applying these conversions:

- [ ] Em-dashes: `---` → `—`
- [ ] Notes: `**Note**` → `:::note`
- [ ] Warnings: `**warning**` → `:::warning`
- [ ] Keyboard: `[key]{.smallcaps}` → `<kbd>Key</kbd>`
- [ ] Code blocks: Add language specifiers
- [ ] Menus: `**A**4**B**` → `**A > B**`
- [ ] Page refs: Remove or convert to links
- [ ] URLs: Remove italics from URLs

### Step 4: Preserve Website Components

Keep existing website-specific elements:
- `<AsciinemaPlayer>` components
- Custom React components
- Existing images and diagrams

### Step 5: Update Sidebar

If adding a new page, update `sidebars.js`:

```javascript
{
  type: 'category',
  label: 'Appendices',
  items: [
    'xx-appendices/setup/index',
    'xx-appendices/shell-basics/index',  // Add new entries
  ]
}
```

### Step 6: Validate

```bash
# Build to check for errors
npm run build

# Serve locally to verify rendering
make serve
# View at http://localhost:3745
```

### Step 7: Commit

One commit per chapter:
```bash
git commit -m "docs: migrate ch01 from book"
```

## Validation Checklist

Before committing, verify:

```
- [ ] No triple-hyphen em-dashes (---)
- [ ] No curly quotes (" " ' ')
- [ ] All notes use :::note format
- [ ] All warnings use :::warning format
- [ ] Keyboard keys use <kbd> tags
- [ ] Code blocks have language specifiers
- [ ] No page number references
- [ ] Build passes
- [ ] Page renders correctly
- [ ] Sidebar updated (if new page)
```

## Tracking Issues

When you encounter book features we can't yet support, update the corresponding GitHub issue with the affected page:

| Feature | Issue |
|---------|-------|
| Bold user input in code blocks | [#403](https://github.com/dwmkerr/effective-shell/issues/403) |
| Reference numbers in code blocks (①②③) | [#404](https://github.com/dwmkerr/effective-shell/issues/404) |

Add an entry to the issue's **Affected Pages** task list:
`- [ ] [Page Title - Section](https://effective.sh/path/#anchor)`

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| `---` for em-dash | Use `—` character |
| Missing language in code block | Add ` ```bash ` |
| Forgot sidebar entry | Page won't appear in nav |
| Changed book content | Revert—only convert formatting |
