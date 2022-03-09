import sys
import urllib.request
import urllib.parse
import json

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
            return ''
        raise
        
    # Now try and parse the data.
    data = json.loads(raw_json_data)
    first_definition = data[0]['meanings'][0]['definitions'][0]['definition']

    # Return the result.
    return first_definition

# Read standard input until there is nothing left to read.
while True:
    # Read a line of input.
    word = sys.stdin.readline()

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
    print("{} - {}".format(word, definition))
