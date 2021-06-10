# Note: this script should be sourced into your shell. For this reason it does
# not specify a shebang.
# 
# set-ps1: set the command prompt (PS1) variable to a named 'theme'.
# 
# example:
#
#   set-ps1 simple
#
# If no 'theme' is provided, the original PS1 value that was set in the shell
# startup files is used.

# Keep track of the original PS1 value.
_original_ps1="${PS1}"

set_ps1() {
    # Foreground colours.
    local fg_black=$(tput setaf 0)     # \033[30m
    local fg_red=$(tput setaf 1)       # \033[31m
    local fg_green=$(tput setaf 2)     # \033[32m
    local fg_yellow=$(tput setaf 3)    # \033[33m
    local fg_blue=$(tput setaf 4)      # \033[34m
    local fg_magenta=$(tput setaf 5)   # \033[35m
    local fg_cyan=$(tput setaf 6)      # \033[36m
    local fg_white=$(tput setaf 7)     # \033[37m

    # Background colours.
    local bg_black=$(tput setab 0)     # \033[40m
    local bg_red=$(tput setab 1)       # \033[41m
    local bg_green=$(tput setab 2)     # \033[42m
    local bg_yellow=$(tput setab 3)    # \033[43m
    local bg_blue=$(tput setab 4)      # \033[44m
    local bg_magenta=$(tput setab 5)   # \033[45m
    local bg_cyan=$(tput setab 6)      # \033[46m
    local bg_white=$(tput setab 7)     # \033[47m

    # Text styles and reset. Note that on some terminals 'bold' will produce
    # light colours for bright colours, on others it will actually show the text
    # in bold.
    local bold=$(tput bold)            # \033[1m
    local dim=$(tput dim)              # \033[2m
    local start_underline=$(tput smul) # \033[4m
    local stop_underline=$(tput rmul)  # \033[24m
    local reset=$(tput sgr0)           # \033[0m

    # If you need them, you can get other terminal capabilties such as the
    # number of colours, lines, columns, etc.
    local colors=$(tput colors)        # Number of colours, e.g. '8' or '256'
    local lines=$(tput lines)          # Number of lines in the terminal
    local cols=$(tput cols)            # Number of columns in the terminal

    # Special characters for PS1 strings:
    # \a     an ASCII bell character (07)
    # \d     the date in "Weekday Month Date" format (e.g., "Tue May 26")
    # \D{format}
    #        the format is passed to strftime(3) and the result is inserted into the prompt string; an empty format results in  a  locale-specific  time  representation.   The
    #        braces are required
    # \e     an ASCII escape character (033)
    # \h     the hostname up to the first `.'
    # \H     the hostname
    # \j     the number of jobs currently managed by the shell
    # \l     the basename of the shell's terminal device name
    # \n     newline
    # \r     carriage return
    # \s     the name of the shell, the basename of $0 (the portion following the final slash)
    # \t     the current time in 24-hour HH:MM:SS format
    # \T     the current time in 12-hour HH:MM:SS format
    # \@     the current time in 12-hour am/pm format
    # \A     the current time in 24-hour HH:MM format
    # \u     the username of the current user
    # \v     the version of bash (e.g., 2.00)
    # \V     the release of bash, version + patch level (e.g., 2.00.0)
    # \w     the current working directory, with $HOME abbreviated with a tilde (uses the value of the PROMPT_DIRTRIM variable)
    # \W     the basename of the current working directory, with $HOME abbreviated with a tilde
    # \!     the history number of this command
    # \#     the command number of this command
    # \$     if the effective UID is 0, a #, otherwise a $
    # \nnn   the character corresponding to the octal number nnn
    # \\     a backslash
    # \[     begin a sequence of non-printing characters, which could be used to embed a terminal control sequence into the prompt
    # \]     end a sequence of non-printing characters

    # Depending on the name of the theme provided, set the prompt.
    case $1 in
        basic)
            # Debian/Ubuntu style:
            #   \u@\h - username@host
            #   \w - working directory
            #   \$ - prompt
            PS1="\u@\h:\w\\$ "
        ;;

        debian)
            # Debian/Ubuntu style:
            #   \u@\h - username@host (bold/green)
            #   \w - working directory (bold/blue)
            #   \$ - prompt (# if root, otherwise $) (bold/white)
            PS1="\[${bold}${fg_green}\]\u@\h:\[${fg_blue}\]\w\[${fg_white}\]\\$\[${reset}\] "
        ;;

        datetime)
            # A style that shows the date and time:
            #   \D{%Y-%m-%d} - the year/month/date (in white)
            #   \@ - the time (in green)
            #   \$ - prompt (# if root, otherwise $) (bold/white)
            PS1="\[${fg_white}\]\D{%Y-%m-%d} \[${bold}${fg_green}\]\@\[${fg_white}\] \\$\[${reset}\] "
        ;;

        git)
            # A Debian style prompt with the git info above it.
            PS1="\$(_git_info)"$'\n'"\\[${bold}${fg_green}\]\u@\h:\[${fg_blue}\]\w\[${fg_white}\]\\$\[${reset}\] "
        ;;

        dwmkerr)
            # The current folder, up to 3 items shown, the git info, then the prompt.
            # Starts with a leading newline to space out commands.
            PS1=$'\n'"\[${bold}${fg_blue}\$(_pwd_max_folders 3)${reset}\] \$(_git_info)"$'\n'"\[${bold}${fg_white}\]\\$\[${reset}\] "
        ;;


        # Add your own themes here!

        *)
            # Restore PS1 to its original value.
            PS1="${_original_ps1}"
        ;; 

    esac

    # If we are in Z-Shell convert the PS1 to use Z-Shell format.
    [ -n "$ZSH_VERSION" ] && PS1=$(_to_zsh "$PS1")
}

# Build a string that shows:
# - The branch (underlined if 'main') in green
# - A red exclamation if there are any local changes not committed
# - An indicator of the number of stashed items, if any.
_git_info() {
    # Don't write anything if we're not in a folder tracked by git.
    if ! [ "$(git rev-parse --is-inside-work-tree 2>/dev/null)" == "true" ]
    then
        return
    fi

    # Local copies of the colours for this function.
    local fg_red=$(tput setaf 1)
    local fg_green=$(tput setaf 2)
    local fg_yellow=$(tput setaf 3)
    local start_underline=$(tput smul)
    local stop_underline=$(tput rmul)
    local reset=$(tput sgr0)
    # Git details.
    local git_branch_name="$(git branch --show-current)"
    local git_any_local_changes="$(git status --porcelain=v1 2>/dev/null)"
    local git_stash_count="$(git rev-list --walk-reflogs --count \
        refs/stash -- 2>/dev/null)" # Ignore error when no stashes
    local git_info=""
    if [ "${git_branch_name}" = "main" ]; then
        git_info="${fg_green}${start_underline}${git_branch_name}${reset}"
    else
        git_info="${fg_green}${git_branch_name}${reset}"
    fi
    if ! [ -z "${git_any_local_changes}" ]; then
        # Note that we have to be careful to put the exclamation mark
        # in single quotes so that it is not expanded to the last command!
        git_info="${git_info} ${fg_red}"'!'"${reset}"
    fi
    if [ "${git_stash_count:-0}" -gt 0 ]; then
        git_info="${git_info} ${fg_yellow}${git_stash_count} in stash${reset}"
    fi
    printf "${git_info}"
}

# Show the pwd, limited to a certain number of folders.
_pwd_max_folders() {
    local max_folders="$1"
    # Write the PWD, replace the home path with a tilde, then cut out the last
    # of the directories, up to the max folders value.
    echo "${PWD/#$HOME/'~'}" | rev | cut -d'/' -f1-${max_folders} | rev
}

# Convert a Bash PS1 string to a ZSH PS1 string.
_to_zsh() {
    # Note that the following sequences are not supported as they don't have
    # an Z-Shell equivalent. Mappings have been worked out from this document:
    #   https://zsh.sourceforge.io/Doc/Release/Prompt-Expansion.html#Prompt-Expansion
    #
    # \l     the basename of the shell's terminal device name
    # \s     the name of the shell, the basename of $0 (the portion following the final slash)
    # \T     the current time in 12-hour HH:MM:SS format
    # \v     the version of bash (e.g., 2.00)
    # \V     the release of bash, version + patch level (e.g., 2.00.0)
    # \W     the basename of the current working directory, with $HOME abbreviated with a tilde
    # \#     the command number of this command

    # Then replace Bash special characters with Z-Shell special characters.
    # Before we echo out the PS1 value, we need to replace '\u' with '%n'. If we
    # don't do this here with shell parameter expansion, then 'echo' thinks '\u'
    # is the beginning of a unicode character. This took quite a while to work
    # out. I have left the replacement of '\u' to '%n' in the 'sed' call below
    # but it not needed as the shell expansion below handles it.
    # Note that before we replace '\$' with '%#', we replace '\$(' temporarily
    # to SHELL_EXPAND, otherwise things like '\$(_my_func)' would be transformed
    # to '%#(_my_func)', i.e. we need to replace the prompt special character
    # but not escaped shell functions.
    local zsh_ps1="$(echo ${1/\\u/%n} | sed \
        -e 's/\\\[/%{/g' \
        -e 's/\\\]/%}/g' \
        -e 's/\\\d/%w/g' \
        -e 's/\\\D/%D/g' \
        -e 's/\\\u/%n/g' \
        -e 's/\\\h/%m/g' \
        -e 's/\\\H/%M/g' \
        -e 's/\\\j/%j/g' \
        -e 's/\\\t/%*/g' \
        -e 's/\\\A/%T/g' \
        -e 's/\\\@/%@/g' \
        -e 's/\\\w/%~/g' \
        -e 's/\\\!/%!/g' \
        -e 's/\\\$(/SHELL_EXPAND/g' \
        -e 's/\\\$/%#/g' \
        -e 's/SHELL_EXPAND/\\\$(/g' \
        )"

    # Print the sequence. Note that we need to escape the % symbol.
    local zsh_ps1_escaped=$(echo "${zsh_ps1}" | sed 's/%/%%/g')
    printf "${zsh_ps1_escaped}"
}
