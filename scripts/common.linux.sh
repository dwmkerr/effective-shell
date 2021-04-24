echo "common commands:"
tail ~/.bash_history -n 1000 | sort | uniq -c | sed 's/^ *//' | sort -n
pstree $$
