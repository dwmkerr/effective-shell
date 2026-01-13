---
name: effective-shell-development
description: Development workflow for the Effective Shell website
---

# Effective Shell Development

Guidelines for developing the Effective Shell website (Docusaurus-based).

## Samples Installation Command

The canonical command to install samples is:

```bash
curl -fsSL effective.sh | bash
```

Always use this form (not `curl effective.sh | sh`).

## Adding or Changing Pages

When you add, remove, or rename pages, you MUST update the sidebar:

1. **Sidebar file**: `sidebars.js`
2. **Structure**: Pages use doc IDs (folder path without `docs/` prefix and number prefixes)

### Sidebar ID Format

```
docs/01-transitioning-to-the-shell/02-navigating-your-system/index.mdx
                    ↓
'transitioning-to-the-shell/navigating-your-system/index'
```

The numeric prefixes (01-, 02-) are stripped from doc IDs.

### Adding a New Page

1. Create the page in `docs/<section>/<page>/index.mdx`
2. Add the doc ID to the appropriate category in `sidebars.js`
3. Run `make serve` to verify it appears correctly

### Example: Adding an Appendix

```javascript
// In sidebars.js, find the Appendices category:
{
  type: 'category',
  label: 'Appendices',
  items: [
    'xx-appendices/setup/index',
    'xx-appendices/shell-basics/index',  // Add new page here
  ]
}
```

## Development Commands

| Command | Description |
|---------|-------------|
| `make setup` | Install dependencies |
| `make serve` | Start dev server (port 3745 = ESHL) |
| `make build` | Build for production |
| `npm run build` | Build without samples |

## Port Convention

Dev server runs on port **3745** ("ESHL" on phone dialpad).

## Page Frontmatter

Required frontmatter for pages:

```yaml
---
title: 'Page Title'
slug: '/section/page-slug/'
---
```

## File Structure

```
docs/
├── 00-index.mdx                    # Homepage
├── 01-transitioning-to-the-shell/  # Part 1
├── 02-core-skills/                 # Part 2
├── ...
└── xx-appendices/                  # Appendices
    ├── setup/
    │   └── index.md
    └── shell-basics/
        └── index.md
```

## Common Mistakes

1. **Forgetting sidebar** - Page won't appear in navigation
2. **Wrong doc ID** - Strip `docs/` and numeric prefixes
3. **Missing index** - Folders need an `index.mdx` or `index.md`
