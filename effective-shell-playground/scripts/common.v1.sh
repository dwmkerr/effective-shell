# Write the title of our command.
echo "common commands:"

# Show the most commonly used commands.
tail ~/.bash_history -n 1000 | sort | uniq -c | sed 's/^ *//' | sort -n -r | head -n 10