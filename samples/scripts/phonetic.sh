#!/usr/bin/env sh

# phonetic.sh - takes input and writes it out in phonetic:
# https://en.wikipedia.org/wiki/NATO_phonetic_alphabet

alphabet_words=('alfa' 'bravo' 'charlie' 'delta' 'echo' 'foxtrot' 'golf' 'hotel' 'india' 'juliett' 'kilo' 'lima' 'mike' 'november' 'oscar' 'papa' 'quebec' 'romeo' 'sierra' 'tango' 'uniform' 'victor' 'whiskey' 'x-ray' 'yankee' 'zulu')

# Bail on errors.
set -e

# Read the input for the program.
read input

function capitalise() {
    printf "$(echo "${1:0:1}" | tr '[:lower:]' '[:upper:]')${1:1}"
}

function write_phonetic() {
    # Make the input lowercase.
    character="$1"
    lowercase_input=$(echo ${character} | tr '[:upper:]' '[:lower]')
    # echo "Input: $1"
    # echo "Lowercase Input: ${lowercase_input}"

    # If it's not a letter, return the original value.
    if ! [[ $lowercase_input =~ ^[a-z]$ ]]; then
        printf "${lowercase_input}"
        return 0
    fi

    # See if the input is in our alphabet words.
    pattern="^${lowercase_input}.*" 
    for word in ${alphabet_words[*]}; do
        if [[ $word =~ $pattern ]]; then
            printf "$(capitalise ${word})"
            return 0
        fi
    done

    echo "NULL"
}

echo "Note: Capitalised input is currently broken"

# Loop through each letter.
for (( i=0; i<${#input}; i++ )); do
    letter=${input:$i:1}
    result=$(write_phonetic $letter)
    printf "${result} "
done
printf '\n'
