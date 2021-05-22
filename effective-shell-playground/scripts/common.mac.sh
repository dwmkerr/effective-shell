echo "common commands:"
gtail ~/.zsh_history -n 100000 | rev | cut -d';' -f1 | rev | sort | guniq -c | gsed 's/^ *//' | sort -n | gtail -n 15
pstree -p $$
