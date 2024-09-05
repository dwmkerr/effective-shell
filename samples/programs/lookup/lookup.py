#!/usr/bin/env python3

import sys
import argparse
import urllib.request
import urllib.parse
import json
import os

ERROR_INTERRUPT = 1
ERROR_HTTP = 2
ERROR_PARSE = 3

examples = '''example:

 lookup philosophy
 lookup --crop -- metonymy metaphor simile 
 cat list-of-words.txt | lookup > defintions.txt'''

# Create an argument parser and define the arguments for our program.
parser = argparse.ArgumentParser(
    prog="parser",
    description="lookup the defintion of words from dictionaryapi.dev",
    epilog=examples,
    formatter_class=argparse.RawDescriptionHelpFormatter
)
parser.add_argument(
    "words",
    help="optional list of words to define - if omitted stdin is used",
    type=str,
    nargs='*'
)
parser.add_argument(
    "-c", "--crop",
    help="crop the output line length",
    type=int,
    nargs="?",
    const=80,         # Default value if -c is supplied
    default=None      # Default value if -c is not supplied
)
args = parser.parse_args()

def search_for_word(word):
    # Encode the word for HTML.
    encoded_word = urllib.parse.quote(word.encode('utf8'))

    # Try and download the definition using the amazing dictionaryapi.dev site.
    try:
        url = "https://api.dictionaryapi.dev/api/v2/entries/en/{}".format(encoded_word)
        response = urllib.request.urlopen(url)
        if response.status == 404:
            print("NOT FOUND")
            sys.exit(1)
        with urllib.request.urlopen(url) as response:
            raw_json_data = response.read().decode('utf-8')
    # If the word is not found, return an empty definition.
    except urllib.error.HTTPError as http_error:
        if http_error.code == 404:
            return ""
        raise
    # If the user hits ctrl hit, exit without an error message.
    except KeyboardInterrupt:
        sys.exit(ERROR_INTERRUPT)
    except Exception as e:
        sys.stderr.write("An error occurred trying to download the definition of '{}'".format(word))
        sys.exit(ERROR_HTTP)
        
    # Now try and parse the data.
    try:
        data = json.loads(raw_json_data)
        first_definition = data[0]['meanings'][0]['definitions'][0]['definition']
    # If the user hits ctrl hit, exit without an error message.
    except KeyboardInterrupt:
        sys.exit(ERROR_INTERRUPT)
    except Exception as e:
        sys.stderr.write("An error occurred trying to parse the definition of '{}'".format(word))
        sys.exit(ERROR_PARSE)

    # Return the result.
    return first_definition

def write_definition(word, definition):
    # Check if stdout is a terminal - if it is we'll colour the output.
    is_terminal = sys.stdout.isatty()

    # We will separate the word and the definition with a colon and space.
    separator = ": "

    # If the 'crop' argument is set, use it.
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

# Get the next word to read - either from the arguments or stdin.
def read_words():
    if args.words:
        for word in args.words:
            yield word
    else:
        while True:
            try:
                yield sys.stdin.readline()
            # If the user hits ctrl hit, exit without an error message.
            except KeyboardInterrupt:
                sys.exit(ERROR_INTERRUPT)
        

# Process words until we run out of the provided list or end standard input.
for word in read_words():
    # If the user hits 'Ctrl+D' to end transmission, readline returns an
    # empty string and we can stop reading.
    if not word:
        break

    # If the input is an empty line or whitespace, skip it.
    if word.isspace():
        continue

    # Strip whitespace from the word and find the definition.
    word = word.strip()
    stripped_word = word.strip()
    definition = search_for_word(stripped_word)

    # Write the result.
    write_definition(word, definition)
