import json
import subprocess
import sys
import urllib.parse

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
    print(stripped_word, "-", definition)
