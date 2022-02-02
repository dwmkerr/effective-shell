| Command                         | Description                                                                                 |
|---------------------------------|---------------------------------------------------------------------------------------------|
| `cd`                            |                                                                                             |
| `ls`                            |                                                                                             |
| `pwd`                           |                                                                                             |
| `mkdir`                         |                                                                                             |
| `rm`                            |                                                                                             |
| `rmdir`                         |                                                                                             |
| `cd`                            |                                                                                             |
| `cd`                            |                                                                                             |
| `pstree -p $$`                  | Show the process tree for the current shell process.                                        |
| **Shell Configuration**         |                                                                                             |
| `shopt`                         | Set or unset a shell option.                                                                |
| `chsh`                          | Change the shell for a user.                                                                |
| **User Management**             |                                                                                             |
| `useradd -m name`               | Add user with the name `name`. `-m` creates a home directory `name`.                        |
| `passwd name`                   | Set the password for user `name`.                                                           |
| `userdel name`                  | Remove user with the name `name`.                                                           |
| `usermod -aG sudo name`         | Make `name` a sudoer.                                                                       |
|---------------------------------|---------------------------------------------------------------------------------------------|
| **Git**                         |                                                                                             |
| `git init`                      | Initialise a new Git Repository.                                                            |
| `git status`                    | Show the status of the working tree and index.                                              |
| `git add <files>`               | Stage `files` - you can use patterns and wildcards.                                         |
| `git reset <files>`             | Unstage `files` - you can use patterns and wildcards.                                       |
| `git rm --cached <files>`       | Unstage `files` - you can use patterns and wildcards.                                       |
| `git commit`                    | Create a commit from the current index - the shell editor will open for the commit message. |
| `git commit -m 'message'`       | Create a commit with message `message`.                                                     |
| `git commit -a`                 | Stage and commit all changes in the working tree.                                           |
| `git checkout <branch>`         | Checkout a branch called `branch`.                                                          |
| `git checkout -b branch`        | Create and checkout a new branch called `branch`.                                           |
| `git branch <name>`             | Create a branch called `name` but do not check it out.                                      |
| `git branch -m <new_name>`      | Change the current branch name to `new_name`.                                               |
| `git merge <branch>`            | Merge the branch named `branch` into the current branch.                                    |
| `git log`                       | Show the log of commits.                                                                    |
| `git log --oneline --branch`    | Show the log of commits, one line per commit, with the branch graph.                        |
| `git rm <files>`                | Stage the removal of `files` from the repostiry - you can use patterns and wildcards.       |
| `git mv <source> <destination>` | Stage the movement of `source` to `destination`.                                            |
| `git checkout 8342bec`          | Checkout a commit with SHA `834bec`.                                                        |
| `git checkout HEAD~1`           | Move the current HEAD back one commit.                                                      |
| `git checkout <branch>~3`       | Checkout `branch`, move back three commits from the tip.                                    |

- grep
- mkdir
- rm
- rmdir
- touch
- cat
- watch
- tail
- head
- less
- more
- most
- echo
- timeout
- until
- pwd -P (physical, shows symlinks)
