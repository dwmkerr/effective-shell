# Write the title of our command.
echo "common commands:"

# The following variables control how the command runs.
history_lines=1000 # The number of lines of history to search through
command_count=10   # The number of common commands to show.

# Show the most commonly used commands.
tail ~/.bash_history -n ${history_lines} \
    | sort \
    | uniq -c \
    | sed 's/^ *//' \
    | sort -n -r \
    | head -n ${command_count}
