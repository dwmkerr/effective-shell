# Exit if any command fails.
set -e

# Inform the user of the output they can expect.
echo "common commands:"

# The following variables control how the command runs.
shell_binary=""        # We will work out what shell we are in later.
history_file=""        # We will work out the history file later.
history_lines=1000     # The number of lines of history to search through
command_count=${1:-10} # The number of common commands to show

# Check to see if we can work out the name of the shell binary.
shell_regex="([^/]+$)"
if [[ $SHELL =~ $shell_regex ]]; then
    # Depending on the name of the shell binary, set the history file path.
    shell_binary=${BASH_REMATCH[1]}
    if [[ $shell_binary == "bash" ]]; then
        history_file=~/.bash_history
    elif [[ $shell_binary == "zsh" ]]; then
        history_file=~/.zsh_history
    fi
fi

# If we are searching through the bash history, we can look at the history file
# to get the most common commands.
if [[ $shell_binary == "bash" ]]; then
    # Store the most commonly used commands.
    commands=$(tail -n ${history_lines} "${history_file}" \
        | sort \
        | uniq -c \
        | sed 's/^ *//' \
        | sort -n -r \
        | head -n ${command_count})
elif [[ $shell_binary == "zsh" ]]; then
    # Each line in the has some extra information at the beginning, the command
    # text only appears after a semi-colon. So extract the text from after the
    # semi-colon and then process it just like in the bash example.
    commands=$(tail -n ${history_lines} "${history_file}" \
        | rev \
        | cut -d';' -f1 \
        | rev \
        | sort \
        | uniq -c \
        | sed 's/^ *//' \
        | sort -n -r \
        | head -n ${command_count})
else
    # Show a warning to the user that we don't know where the history file is
    # for their shell.
    echo "Sorry, I don't know where to find the history for '${SHELL}'"
fi

write_command_then_count() {
    # Get the command and count, this will be text that looks like:
    #   '43 git commit'
    # Then write the command and the count afterwards.
    local line="$1"
    local count=$(echo "${line}" | cut -d' ' -f1)
    local command=$(echo "${line}" | cut -d' ' -f2-)
    echo "${command} (${count})"
}

# Print each command, showing what its order is in the list.
# Commands are separated by newlines, so temporarily change IFS to loop over
# each line of the commands.
counter=1
old_ifs=$IFS
IFS=$'\n'
for command in $commands
do
    echo "$counter: $(write_command_then_count "$command")"
    counter=$((counter + 1))
done
IFS=$old_ifs
