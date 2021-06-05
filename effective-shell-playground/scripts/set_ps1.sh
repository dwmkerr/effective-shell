# Note: this script should be sourced into your shell. For this reason it does
# not specify a shebang.
# 
# set-ps1: set the command prompt (PS1) variable to a named 'theme'.
# 
# example:
#
#   set-ps1 simple
#
# If no 'theme' is provided, a simple PS1 based on Debian's default will be used.

set_ps1() {
    # Get the escape characters the the basic set of colours that should be
    # available in most shells, as well as some terminal info.

    # Foreground colours.
    local fg_black=$(tput setaf 0)
    local fg_red=$(tput setaf 1)
    local fg_green=$(tput setaf 2)
    local fg_yellow=$(tput setaf 3)
    local fg_blue=$(tput setaf 4)
    local fg_magenta=$(tput setaf 5)
    local fg_cyan=$(tput setaf 6)
    local fg_white=$(tput setaf 7)

    # Background colours.
    local bg_black=$(tput setab 0)
    local bg_red=$(tput setab 1)
    local bg_green=$(tput setab 2)
    local bg_yellow=$(tput setab 3)
    local bg_blue=$(tput setab 4)
    local bg_magenta=$(tput setab 5)
    local bg_cyan=$(tput setab 6)
    local bg_white=$(tput setab 7)

    # Text styles and reset.
    local bold=$(tput bold)
    local dim=$(tput dim)
    local start_underline=$(tput smul)
    local stop_underline=$(tput smul)
    local reset=$(tput sgr0)
    local colors=$(tput colors)

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
        debian)
            # Debian/Ubuntu style:
            #   \u@\h - username@host (bold/green)
            #   \w - working directory (bold/blue)
            #   \$ - prompt (# if root, otherwise $) (bold/white)
            PS1="\[${bold}${fg_green}\]\u@\h:\[${fg_blue}\]\w\[${fg_white}\]\\$\[${reset}\] "
        ;;
    esac
}

set_ps1 debian
