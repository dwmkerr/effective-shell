# CLAUDE.md - Effective Shell

## Required Skills

**ALWAYS load these skills at the start of any session:**

### For All Work
```
/skill effective-shell-development
```
Contains: sidebar updates, development commands, port conventions, file structure.

### For Migration Work
```
/skill effective-shell-migration
```
**MUST be loaded when:** editing docs/ files, migrating book content, or making any formatting changes to chapters.

Contains: typography rules, format conversions, validation checklist.

## Development Workflow

### Before Making Changes

1. Run `make serve` to start the dev server (port 3745 = ESHL on dialpad)
2. Load the appropriate skill(s)
3. Check the sidebar structure in `sidebars.js`

### After Adding/Changing Pages

1. **Update `sidebars.js`** - Pages won't appear without sidebar entries
2. Run `npm run build` to verify the build passes
3. Check the page renders at http://localhost:3745

### Git Workflow

- **Never commit directly to main** - Always use feature branches
- **Always ask before pushing** - Get explicit user confirmation
- Run build before commits to catch errors early

## Migration Work

When editing any file in `docs/`:

1. Load `/skill effective-shell-migration`
2. Follow typography rules (em-dashes `—` not `---`)
3. Use validation checklist before committing
4. Check for common mistakes:
   - Triple hyphens instead of em-dashes
   - Missing `:::note` admonitions
   - Code blocks without language specifiers

See `tasks/migration/README.md` for chapter mapping and progress.

## Quick Reference

| Task | Command |
|------|---------|
| Install deps | `make setup` |
| Dev server | `make serve` |
| Build | `make build` |
| TypeScript check | `make typescript-check` |
