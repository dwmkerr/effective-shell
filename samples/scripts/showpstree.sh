#!/usr/bin/env sh

# showpstree - Shows the process tree for the current process.

if [ "$(uname)" = "Darwin" ]; then
    # Check whether pstree is installed.
    if ! command -v pstree 2>&1 >/dev/null; then
        echo "error: pstree not installed, try:"
        echo "  brew install pstree"
        exit 1
    else
        # BSD pstree; show for process -p.
        pstree -p $$
    fi
else
    # Check whether pstree is installed.
    if ! command -v pstree 2>&1 >/dev/null; then
        echo "error: pstree not installed, try:"
        echo "  yum install psmisc"
        echo "or:"
        echo "  apt-get install psmisc"

        exit 1
    else
        # GNU pstree; the command line (-a) and the
        # details for a specific process (-s).
        pstree -a -s $$
    fi
fi
