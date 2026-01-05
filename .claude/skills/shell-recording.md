---
name: shell-recording
description: Create shell recordings using Shellwright MCP server
---

# Shell Recording Skill

Create terminal GIF recordings using the Shellwright MCP server.

## Prerequisites

- Shellwright MCP server running (configured in Claude Code settings)
- `set_ps1` function available (from dwmkerr dotfiles)

## Recording Workflow

### 1. Start Shell Session

```
shell_start with:
- command: "bash"
- args: ["--login", "-i"]
- cols: 80
- rows: 16-20 (smaller = cleaner recording)
```

### 2. Set Clean Prompt (Before Recording)

Use the simplified PS1 for demos:

```bash
set_ps1 dwmkerr_simple && cd /path/to/demo/folder && clear
```

This shows only:
- Folder path (max 3 levels)
- `$` prompt

The `dwmkerr_simple` theme is defined in `~/repos/github/dwmkerr/dotfiles/shell.functions.d/set_ps1.sh`.

### 3. Start Recording

```
shell_record_start with:
- fps: 10 (good balance of quality/size)
```

### 4. Send Commands

For typewriter effect (characters appear one at a time):
```
shell_send with:
- input: "your command"
- slowly: true
- delay_ms: 500
```

Then send Enter separately:
```
shell_send with:
- input: "\r"
- delay_ms: 2000  (pause before next command)
```

### 5. Stop and Save

```
shell_record_stop with:
- name: "recording-name"
```

Download the GIF:
```bash
curl -o output.gif <download_url>
```

## Tips

- **2 second delays** between commands for readability
- **Typewriter effect** makes commands easier to follow
- **Smaller terminal** (16-20 rows) produces cleaner recordings
- **Clear screen** before recording starts
- **Set PS1 before recording** so setup commands aren't captured

## Snippet Folder Structure

For snippets with recordings:

```
snippets/snippets/<name>/
├── .env              # Demo files
├── .env.prod
├── project/          # Demo folder structure
│   ├── .env
│   └── .env.prod
├── <name>.gif        # Recording
├── <name>.cast       # Optional asciinema cast
└── init.sh           # Optional setup script
```

## Example: sourceenv Recording

### Folder Structure

```
snippets/snippets/sourceenv/
├── project/
│   ├── .env          # 4 vars: APP_URL, DATABASE_URL, LOG_LEVEL, API_TIMEOUT
│   └── .env.prod     # 6 vars: 2 changed + 2 new
└── sourceenv.gif     # Shows sourceenv then sourceenv .env.prod
```

### Example Prompt

Use a prompt like this to request a shell recording:

```
Create a shell recording using shellwright:

1. Scaffold folder: snippets/snippets/sourceenv/project/
   - .env with 4 vars (APP_URL, DATABASE_URL, LOG_LEVEL, API_TIMEOUT)
   - .env.prod with 6 vars (2 changed, 2 new: AWS_REGION, AUTH0_DOMAIN)

2. Recording settings:
   - Start shell in the project folder
   - Use simple PS1 (set_ps1 dwmkerr_simple)
   - Wait 2 seconds between commands
   - Use typewriter-style keystroke entry

3. Commands to record:
   - sourceenv (shows 4 vars set)
   - sourceenv .env.prod (shows 2 updated, 2 new)

4. Save recording to snippets/snippets/sourceenv/sourceenv.gif
```
