#!/usr/bin/env sh

# showpstree - Shows the process tree for the current process.

if [ "$(uname)" = "Darwin" ]; then
    # BSD pstree; show for process -p.
    pstree -p $$
else
    # GNU pstree; use the long form (-l) show the command line (-a) and the
    # details for a specific process (-s).
    pstree -a -s $$
fi
