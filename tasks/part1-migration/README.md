# Part 1 Migration: Remove Redundant Chapters

## Overview

Part 1 "Transitioning to the Shell" chapters 01-05 have been consolidated into **Appendix B: Shell Basics**. These redundant chapters need to be removed, but we must preserve external URLs via redirects.

## Task Checklist

### Phase 1: Set Up Redirects
- [x] Install `@docusaurus/plugin-client-redirects` (PR #408)
- [x] Configure redirects in `docusaurus.config.js` (PR #408)

**Redirects needed:**

| Old URL | New URL |
|---------|---------|
| `/part-1-transitioning-to-the-shell/getting-started/` | `/appendices/shell-basics/` |
| `/part-1-transitioning-to-the-shell/navigating-your-system/` | `/appendices/shell-basics/` |
| `/part-1-transitioning-to-the-shell/managing-your-files/` | `/appendices/shell-basics/` |
| `/part-1-transitioning-to-the-shell/become-a-clipboard-gymnast/` | `/appendices/shell-basics/` |
| `/part-1-transitioning-to-the-shell/getting-help/` | `/appendices/shell-basics/` |

### Phase 2: Remove Redundant Chapters
- [ ] Delete `docs/01-transitioning-to-the-shell/01-getting-started/`
- [ ] Delete `docs/01-transitioning-to-the-shell/02-navigating-your-system/`
- [ ] Delete `docs/01-transitioning-to-the-shell/03-managing-your-files/`
- [ ] Delete `docs/01-transitioning-to-the-shell/04-clipboard-gymnastics/`
- [ ] Delete `docs/01-transitioning-to-the-shell/05-getting-help/`

**Keep:** `06-the-renaissance-of-the-shell/` (website-only content)

### Phase 3: Update Internal Links
These files link to removed chapters—update to point to Appendix B:

| File | Links To Update |
|------|-----------------|
| `docs/02-core-skills/07-thinking-in-pipelines/index.mdx` | 02, 04 (x2), 05 |
| `docs/02-core-skills/09-job-control/index.mdx` | 04 |
| `docs/02-core-skills/10-understanding-commands/index.mdx` | 05 |
| `docs/02-core-skills/12-what-is-a-shell/index.mdx` | 02 |
| `docs/03-manipulating-text/14-get-to-grips-with-grep/index.mdx` | 05 |
| `docs/03-manipulating-text/15-slice-and-dice-text/index.mdx` | (one link) |
| `docs/04-shell-scripting/19-variables-reading-input-and-mathematics/index.mdx` | 05 |

### Phase 4: Update Sidebar
- [ ] Update `sidebars.js` to remove deleted chapters from Part 1
- [ ] Decide fate of Part 1 section (keep with just Renaissance chapter, or remove entirely)

### Phase 5: Update Part 1 Introduction
- [ ] Update or remove `docs/01-transitioning-to-the-shell/00-index.mdx`
- [ ] Point users to Appendix B for shell basics

### Phase 6: Verify
- [ ] Run `npm run build` to ensure no broken links
- [ ] Test redirects work locally
- [ ] Verify sidebar structure is correct

## Decision

**Option A selected:** Remove Part 1 entirely, move "Renaissance of the Shell" to Part VI (Additional Topics).

The print book structure is:
- Part I: Core Skills (website Part 2)
- Part II: Manipulating Text (website Part 3)
- etc.

Website Part 1 "Transitioning to Shell" doesn't exist in the book—that content is in Appendix B.

## Notes

- Appendix B slug: `/appendices/shell-basics/`
- Content mapping: See `tasks/migration/README.md` for full book-to-website mapping
