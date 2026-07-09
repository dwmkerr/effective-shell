#!/usr/bin/env python3
"""Audit: how close is each ONLINE chapter to its PRINT manuscript source?

High similarity  -> already backfilled with print text (done).
Low  similarity  -> still the old blog-era text (needs backfill).
No manuscript    -> website-only bonus chapter (Part VI).

Compares normalised plain-text prose (markup stripped) with difflib. Not exact,
but cleanly separates "already matches print" from "diverged / old".
"""
import re
import difflib
from pathlib import Path

BOOK = Path.home() / "repos/github/dwmkerr/effective-shell-book/migration/chapters"
DOCS = Path("/Users/Dave_Kerr/repos/github/dwmkerr/effective-shell/docs")

# manuscript file  ->  online index.mdx (matched by topic; dirs renumbered by #411)
PAIRS = {
    "ch01-flying-on-the-command-line.md": "01-core-skills/01-fly-on-the-command-line",
    "ch02-thinking-in-pipelines.md": "01-core-skills/07-thinking-in-pipelines",
    "ch03-finding-files-and-folders.md": "01-core-skills/11-finding-files",
    "ch04-regular-expression-essentials.md": "02-manipulating-text/13-regex-essentials",
    "ch05-getting-to-grips-with-grep.md": "02-manipulating-text/14-get-to-grips-with-grep",
    "ch06-slicing-and-dicing-text.md": "02-manipulating-text/15-slice-and-dice-text",
    "ch07-advanced-text-manipulation-with-sed.md": "02-manipulating-text/16-advanced-text-manipulation",
    "ch08-building-commands-on-the-fly.md": "02-manipulating-text/17-build-commands-on-the-fly",
    "ch09-shell-script-fundamentals.md": "03-shell-scripting/18-shell-script-essentials",
    "ch10-using-variables-to-store-read-and-manipulate-data.md": "03-shell-scripting/19-variables-reading-input-and-mathematics",
    "ch11-mastering-conditional-logic.md": "03-shell-scripting/20-mastering-conditional-logic",
    "ch12-using-loops-with-files-and-folders.md": "03-shell-scripting/21-loops-and-working-with-files-and-folders",
    "ch13-functions-parameters-and-error-handling.md": "03-shell-scripting/22-functions-parameters-and-error-handling",
    "ch14-useful-patterns-for-shell-scripts.md": "03-shell-scripting/23-useful-patterns-for-shell-scripts",
    "ch15-configuring-your-shell.md": "04-building-your-toolkit/24-configuring-the-shell",
    "ch16-customizing-your-command-prompt.md": "04-building-your-toolkit/25-customising-your-command-prompt",
    "ch17-managing-your-dot-files.md": "04-building-your-toolkit/26-managing-your-dotfiles",
    "ch18-controlling-changes-with-git.md": "04-building-your-toolkit/27-controlling-changes-with-git",
    "ch19-managing-remote-git-repositories.md": "04-building-your-toolkit/28-managing-remote-git-repositories",
    "ch20-shell-expansion.md": "05-advanced-techniques/29-understanding-shell-expansion",
    "ch21-alternatives-to-shell-scripting.md": "05-advanced-techniques/30-how-to-avoid-scripting",
    "ch22-the-secure-shell.md": "05-advanced-techniques/31-the-secure-shell",
    "ch23-the-power-of-terminal-editors.md": "05-advanced-techniques/32-a-vim-crash-course",
    "ch24-mastering-the-multiplexer.md": "05-advanced-techniques/33-master-the-multiplexer",
}

# online dirs with no print counterpart -> bonus (Part VI)
BONUS = ["01-core-skills/09-job-control", "01-core-skills/10-understanding-commands",
         "01-core-skills/12-what-is-a-shell"]


def norm(text):
    text = re.sub(r"^---.*?---", "", text, flags=re.S)          # frontmatter
    text = re.sub(r"^import .*$", "", text, flags=re.M)          # mdx imports
    text = re.sub(r"<[^>]+>", " ", text)                        # jsx/html tags
    text = re.sub(r"```.*?```", " ", text, flags=re.S)          # code blocks
    text = re.sub(r"[\{\}\[\]\(\)#*`_>|\\$\"'″′]", " ", text)  # markup+smart quotes
    text = re.sub(r"\{\.smallcaps\}", " ", text)
    words = re.findall(r"[a-z0-9]+", text.lower())
    return " ".join(words)


def wordset_overlap(a, b):
    sa, sb = set(a.split()), set(b.split())
    return len(sa & sb) / max(len(sa | sb), 1)


def classify(ratio):
    if ratio >= 0.75:
        return "ALREADY-PRINT"
    if ratio >= 0.55:
        return "PARTIAL/CHECK"
    return "OLD-BACKFILL"


print(f"{'CHAPTER':<45} {'ONLINE WORDS':>12} {'PRINT WORDS':>11} {'SIM':>6}  VERDICT")
print("-" * 92)
rows = []
for man, online in PAIRS.items():
    mp = BOOK / man
    op = DOCS / online / "index.mdx"
    if not mp.exists() or not op.exists():
        print(f"{man[:44]:<45} {'--':>12} {'--':>11} {'--':>6}  MISSING FILE")
        continue
    mn, on = norm(mp.read_text()), norm(op.read_text())
    ratio = difflib.SequenceMatcher(None, on, mn).quick_ratio()
    overlap = wordset_overlap(on, mn)
    sim = round((ratio + overlap) / 2, 2)
    rows.append((sim, man, online))
    print(f"{man[:44]:<45} {len(on.split()):>12} {len(mn.split()):>11} {sim:>6}  {classify(sim)}")

print("\nBONUS (website-only, no print source -> Part VI):")
for b in BONUS:
    p = DOCS / b / "index.mdx"
    n = len(norm(p.read_text()).split()) if p.exists() else 0
    print(f"  {b:<45} {n:>6} words")

print("\nBackfill priority (lowest similarity first):")
for sim, man, _ in sorted(rows):
    if sim < 0.75:
        print(f"  {sim:>5}  {man}")
