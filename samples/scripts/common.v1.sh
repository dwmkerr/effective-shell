# Inform the user of the output they can expect.
echo "common commands:"

# Show the most commonly used commands.
tail -n 1000 ~/.bash_history | sort | uniq -c | sed 's/^ *//' | sort -n -r | head -n 10
