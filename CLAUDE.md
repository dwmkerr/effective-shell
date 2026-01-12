# CLAUDE.md - Effective Shell

## Required Skills

**ALWAYS load the `effective-shell-development` skill at the start of any session.** This skill contains critical information about:
- Updating sidebars when adding/changing pages
- Development commands and port conventions
- File structure and doc ID format

Load it with: `/skill effective-shell-development`

## Development Workflow

### Before Making Changes

1. Run `make serve` to start the dev server (port 3745 = ESHL on dialpad)
2. Check the sidebar structure in `sidebars.js`

### After Adding/Changing Pages

1. **Update `sidebars.js`** - Pages won't appear without sidebar entries
2. Run `make build` to verify the build passes
3. Check the page renders at http://localhost:3745

### Git Workflow

- **Never commit directly to main** - Always use feature branches
- **Always ask before pushing** - Get explicit user confirmation
- Run build before commits to catch errors early

## Quick Reference

| Task | Command |
|------|---------|
| Install deps | `make setup` |
| Dev server | `make serve` |
| Build | `make build` |
| TypeScript check | `make typescript-check` |

## Migration Work

See `tasks/migration/README.md` for book-to-website migration status and workflow.
