# Effective Shell: Book to Website Migration Guide

This guide maps the published book content to the website and tracks migration progress.

## Required Skill

**Always load the migration skill before making changes:**

```
/skill effective-shell-migration
```

The skill contains all technical details for:
- Typography rules (em-dashes, quotes, etc.)
- Format conversions (admonitions, keyboard shortcuts, code blocks)
- Step-by-step workflow and validation checklist

## Source Files

Book chapters (extracted from final manuscript):
```
~/repos/github/dwmkerr/effective-shell-book/migration/chapters/
```

Book images (production-ready):
```
~/repos/github/dwmkerr/effective-shell-book/from-rachel/images/for-prod/
```

## Book → Website Chapter Mapping

Source files are in: `~/repos/github/dwmkerr/effective-shell-book/migration/chapters/`

| Book Section | Source File | Website Section | Status |
|-------------|-------------|-----------------|--------|
| **Front Matter** | | | |
| Introduction | `introduction.md` | docs/00-index.mdx | ✅ Done |
| **Part I: Core Skills** | | | |
| Ch 1: Flying on the Command Line | `ch01-flying-on-the-command-line.md` | 02-core-skills/08-fly-on-the-command-line | ⬜ TODO |
| Ch 2: Thinking in Pipelines | `ch02-thinking-in-pipelines.md` | 02-core-skills/07-thinking-in-pipelines | ⬜ TODO |
| Ch 3: Finding Files and Folders | `ch03-finding-files-and-folders.md` | 02-core-skills/11-finding-files | ⬜ TODO |
| **Part II: Manipulating Text and Streams** | | | |
| Ch 4: Regular Expression Essentials | `ch04-regular-expression-essentials.md` | 03-manipulating-text/13-regex-essentials | ⬜ TODO |
| Ch 5: Getting to Grips with grep | `ch05-getting-to-grips-with-grep.md` | 03-manipulating-text/14-get-to-grips-with-grep | ⬜ TODO |
| Ch 6: Slicing and Dicing Text | `ch06-slicing-and-dicing-text.md` | 03-manipulating-text/15-slice-and-dice-text | ⬜ TODO |
| Ch 7: Advanced Text Manipulation with sed | `ch07-advanced-text-manipulation-with-sed.md` | 03-manipulating-text/16-advanced-text-manipulation | ⬜ TODO |
| Ch 8: Building Commands on the Fly | `ch08-building-commands-on-the-fly.md` | 03-manipulating-text/17-build-commands-on-the-fly | ⬜ TODO |
| **Part III: Shell Scripting** | | | |
| Ch 9: Shell Script Fundamentals | `ch09-shell-script-fundamentals.md` | 04-shell-scripting/18-shell-script-essentials | ⬜ TODO |
| Ch 10: Using Variables | `ch10-using-variables-to-store-read-and-manipulate-data.md` | 04-shell-scripting/19-variables-reading-input-and-mathematics | ⬜ TODO |
| Ch 11: Mastering Conditional Logic | `ch11-mastering-conditional-logic.md` | 04-shell-scripting/20-mastering-conditional-logic | ⬜ TODO |
| Ch 12: Using Loops with Files and Folders | `ch12-using-loops-with-files-and-folders.md` | 04-shell-scripting/21-loops-and-working-with-files-and-folders | ⬜ TODO |
| Ch 13: Functions, Parameters, and Error Handling | `ch13-functions-parameters-and-error-handling.md` | 04-shell-scripting/22-functions-parameters-and-error-handling | ⬜ TODO |
| Ch 14: Useful Patterns for Shell Scripts | `ch14-useful-patterns-for-shell-scripts.md` | 04-shell-scripting/23-useful-patterns-for-shell-scripts | ⬜ TODO |
| **Part IV: Building Your Toolkit** | | | |
| Ch 15: Configuring Your Shell | `ch15-configuring-your-shell.md` | 05-building-your-toolkit/24-configuring-the-shell | ⬜ TODO |
| Ch 16: Customizing Your Command Prompt | `ch16-customizing-your-command-prompt.md` | 05-building-your-toolkit/25-customising-your-command-prompt | ⬜ TODO |
| Ch 17: Managing Your Dot Files | `ch17-managing-your-dot-files.md` | 05-building-your-toolkit/26-managing-your-dotfiles | ⬜ TODO |
| Ch 18: Controlling Changes with Git | `ch18-controlling-changes-with-git.md` | 05-building-your-toolkit/27-controlling-changes-with-git | ⬜ TODO |
| Ch 19: Managing Remote Git Repositories | `ch19-managing-remote-git-repositories.md` | 05-building-your-toolkit/28-managing-remote-git-repositories | ⬜ TODO |
| **Part V: Advanced Techniques** | | | |
| Ch 20: Shell Expansion | `ch20-shell-expansion.md` | 06-advanced-techniques/29-understanding-shell-expansion | ⬜ TODO |
| Ch 21: Alternatives to Shell Scripting | `ch21-alternatives-to-shell-scripting.md` | 06-advanced-techniques/30-how-to-avoid-scripting | ⬜ TODO |
| Ch 22: The Secure Shell | `ch22-the-secure-shell.md` | 06-advanced-techniques/31-the-secure-shell | ⬜ TODO |
| Ch 23: The Power of Terminal Editors | `ch23-the-power-of-terminal-editors.md` | 06-advanced-techniques/32-a-vim-crash-course | ⬜ TODO |
| Ch 24: Mastering the Multiplexer | `ch24-mastering-the-multiplexer.md` | 06-advanced-techniques/33-master-the-multiplexer | ⬜ TODO |
| **Afterword** | | | |
| Afterword: Generative AI and the Shell | `afterword-generative-ai.md` | *NEW - needs website page* | ⬜ TODO |
| **Appendices** | | | |
| Appendix A: Setup | `appendix-a-setup.md` | xx-appendices/setup | ✅ Done |
| Appendix B: Shell Basics | `appendix-b-shell-basics.md` | xx-appendices/shell-basics | ✅ Done |

## Website Content NOT in Book → Part VI: Additional Topics

These website sections are not in the published book and should be reorganized:

| Current Location | Proposed Location | Notes |
|-----------------|-------------------|-------|
| 01-transitioning-to-the-shell/06-the-renaissance-of-the-shell | Part VI | Website-only content |
| 02-core-skills/09-job-control | Part VI | Website-only content |
| 02-core-skills/10-understanding-commands | Part VI | Website-only content |
| 02-core-skills/12-what-is-a-shell | Part VI | Website-only content |
| 07-shell-snippets/* | Part VI | Website-only content |
| xx-appendices/exercises.md | Part VI or remove | Website-only |
| xx-appendices/the-future.md | Part VI or remove | Website-only |
| xx-appendices/thanks.md | Keep as appendix | Acknowledgments |

## Progress Tracking

- [ ] Phase 1: Content audit complete
- [ ] Phase 2: Part I chapters migrated
- [ ] Phase 3: Part II chapters migrated
- [ ] Phase 4: Part III chapters migrated
- [ ] Phase 5: Part IV chapters migrated
- [ ] Phase 6: Part V chapters migrated
- [x] Phase 7: Appendices migrated
- [ ] Phase 8: Part VI (Additional Topics) reorganization
- [ ] Phase 9: Afterword added
