# sourceenv Snippet

Demonstrates the `sourceenv` bash function that sources environment variables from `.env` files.

## Recording

The `sourceenv.gif` recording shows:

1. `ls -al` - show the `.env` and `.env.prod` files
2. `cat .env` - display the contents of the default env file
3. `clear` - clean screen before demo
4. `sourceenv` - source the default `.env` (4 vars set)
5. `sourceenv .env.prod` - source prod env (2 updated, 2 new)

## Recreating the Recording

Use this prompt with Claude to recreate the recording using shellwright:

```
Create a shell recording using shellwright for the sourceenv snippet:

1. Setup (before recording starts):
   - Start shell in: snippets/snippets/sourceenv/project/
   - Set simple PS1: `set_ps1 dwmkerr_simple`
   - Clear the screen

2. Recording settings:
   - Terminal size: 80x20
   - FPS: 10
   - Use typewriter-style keystroke entry (slowly: true)
   - Wait 2 seconds between commands

3. Commands to record:
   - ls -al (show .env files)
   - cat .env (show contents)
   - clear (execute quickly, no typewriter)
   - sourceenv (shows 4 vars set)
   - sourceenv .env.prod (shows 2 updated, 2 new)

4. Save recording to: snippets/snippets/sourceenv/sourceenv.gif
```

## Demo Files

```
project/
├── .env          # Development environment
│   APP_URL=http://localhost:3000
│   DATABASE_URL=postgres://localhost:5432/myapp
│   LOG_LEVEL=debug
│   API_TIMEOUT=30
│
└── .env.prod     # Production environment (2 changed, 2 new)
    APP_URL=https://myapp.example.com
    DATABASE_URL=postgres://prod.rds.amazonaws.com/myapp
    LOG_LEVEL=debug
    API_TIMEOUT=30
    AWS_REGION=us-east-1
    AUTH0_DOMAIN=myapp.auth0.com
```
