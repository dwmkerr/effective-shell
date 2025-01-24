#!/usr/bin/env sh

# Exit if any command fails.
set -e

# Helper function to show how the command should be invoked.
show_help() {
    echo "Usage: common [-h] [-c count]"
}

# Process the options.
while getopts ":hc:" option; do
    case ${option} in

        # Handle the 'help' option.
        h )
            show_help
            exit 0
            ;;

        # Handle the 'count' option.
        c )
            common_command_count=${OPTARG}
            ;;


        # If we have an invalid argument, warn and fail.
        \? )
            echo "The value '${OPTARG}' is not a valid option"
            exit 1
            ;;

        # If we are missing a required argument, warn and exit.
        : )
            echo "The option '${OPTARG}' requires an argument"
            ;;
    esac
done

# If we are on a Mac, we need to use the GNU tools.
if [ "$(uname)" == "Darwin" ]; then
    if ! command -v "gtail" > /dev/null 2>&1; then
        echo "error: GNU tools are required: brew install coretools"
        exit 1
    fi
    if ! command -v "gsed" > /dev/null 2>&1; then
        echo "error: GNU sed is required: brew install gnu-sed"
        exit 1
    fi
    alias tail=gtail
    alias uniq=guniq
    alias sed=gsed
fi

# Write the title of our command.
echo "common commands:"

# The following variables control how the command runs.
shell_binary=""        # We will work out what shell we are in later.
history_file=""        # We will work out the history file later.
history_lines=1000     # The number of lines of history to search through
command_count=${common_command_count:-10} # The number of common commands to show

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
    commands=$(tail -n ${history_lines}" ${history_file}" \
        | sort \
        | uniq -c \
        | sed 's/^ *//' \
        | sort -n -r \
        | head -n ${command_count})
elif [[ $shell_binary == "zsh" ]]; then
    # Each line in the has some extra information at the beginning, the command
    # text only appears after a semi-colon. So extract the text from after the
    # semi-colon and then process it just like in the bash example.
    commands=$(tail "${history_file}" -n ${history_lines} \
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

# Get our colour codes to colourise output. We only use colours if stdout
# is attached to a terminal.
if [ -t 1 ]; then
    output_green=$(tput setaf 2)
    output_reset=$(tput sgr0)
else
    output_green=""
    output_reset=""
fi

write_command_then_count() {
    # Get the command and count, this will be text that looks like:
    #   '43 git commit'
    # Then write the command and the count afterwards.
    local counter="$1"
    local line="$2"
    local count=$(echo "${line}" | cut -d' ' -f1)
    local command=$(echo "${line}" | cut -d' ' -f2-)

    # Write the command counter, command and number.
    printf "${counter} - ${output_green}${command}${output_reset} (${count})\n"
}

# Print each command, showing what its order is in the list.
# Commands are separated by newlines, so temporarily change IFS to loop over
# each line of the commands.
counter=1
old_ifs=$IFS
IFS=$'\n'
for command in $commands
do
    write_command_then_count $counter "$command"
    counter=$((counter + 1))
done
IFS=$old_ifs
