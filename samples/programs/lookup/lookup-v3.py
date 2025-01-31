import argparse
import json
import os
import subprocess
import sys
import urllib.parse

# Create an argument parser and define the arguments for our program.
parser = argparse.ArgumentParser()
parser.add_argument(
    "-c", "--crop",
    help="crop the output line length",
    type=int,
    nargs="?",
    const=80,         # Default value if -c is supplied
    default=None)     # Default value if -c is not supplied
args = parser.parse_args()

def search_for_word(word):
    # Encode the word for HTML.
    encoded_word = urllib.parse.quote(word.encode("utf8"))

    # Construct the URL required to load the definition.
    url = "https://api.dictionaryapi.dev/api/v2/entries/en/{}".format(encoded_word)
    command = ["curl", url]

    # Run the "curl" command to retrieve the definition.
    result = subprocess.run(command,
                            stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE,
                            text=True)

    # If there was an error, show it as the definition.
    if result.returncode != 0:
        return "error: " + result.stderr

    # Now try and parse the data.
    data = json.loads(result.stdout)

    # Grab the first "meaning" value. If it doesn't exist in the response then
    # the word was not found.
    try:
        return data[0]["meanings"][0]["definitions"][0]["definition"]
    except KeyError:
        return "definition not found!"

def write_definition(word, definition):
    # Check if stdout is a terminal - if it is we'll colour the output.
    is_terminal = sys.stdout.isatty()

    # We will separate the word and the definition with a colon and space.
    separator = ": "

    # If the "crop" argument is set, use it.
    if args.crop:
        output_length = len(word) + len(separator) + len(definition)
        if output_length > args.crop:
            # We need to chop some letters off the end of the definition, but
            # leave space for '...' to indicate the output is cropped.
            new_length = len(definition) - 3 - (output_length - args.crop)
            definition = definition[:new_length] + '...'

    # If we are in a terminal make the word green and the separator white.
    if is_terminal:
        word = "\033[92m" + word + "\033[0m"
        separator = "\033[37m" + separator  + "\033[0m"

    # Write out the word, separator and definition.
    print(word + separator + definition)

# Read standard input until nothing is left to read.
while True:
    # Read a line of input.
    word = sys.stdin.readline()

    # If the user presses Ctrl-D to end transmission, readline returns an
    # empty string and we can stop reading.
    if not word:
        break

    # If the input is an empty line or whitespace, skip it.
    if word.isspace():
        continue

    # Strip whitespace from the word and find the definition.
    stripped_word = word.strip()
    definition = search_for_word(stripped_word)

    # Write the result.
    write_definition(stripped_word, definition)
