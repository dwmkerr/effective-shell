import sys

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

    # Add the word to our list of lookups, and strip any whitespace from the
    # beginning and end of it. For now, we don't have a definition.
    stripped_word = word.strip()
    definition = ""

    # Write the result.
    print(stripped_word, " - ", definition)
