#!/usr/bin/env sh

message="$1"
reset='\e[0m'
for ((colour=31; colour<=37; colour++))
do
    colour_code="\\e[0;${colour}m"
    if [ -t 1 ]; then
        echo -e "${colour} - ${colour_code}${message}${reset}"
    else
        echo "${colour} - ${message}"
    fi
done
