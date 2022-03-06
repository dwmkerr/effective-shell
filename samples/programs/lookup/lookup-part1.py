import sys

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

    # Add the word to our list of lookups, and strip any whitespace from the
    # beginning and end of it. For now, we don't have a defintition.
    word = word.strip()
    found = False
    definition = ''

    # Write the result.
    if found:
        print("{} - {}".format(word, definition))
    else:
        print("Failed to find a defintition for '{}'".format(word))

# Because we didn't actually define the words, exit with an error code.
sys.exit(1)
