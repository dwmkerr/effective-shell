Scripts we need to show how to avoid:

```
# Save the current value of IFS - so we can restore it later. Split on newlines.
old_ifs=$IFS
IFS=$'\n'

# Find all symlinks and print each one.
links=$(find ~ -type l)
for link in $links
do
    echo "Found Link: $link"
done

# Restore the original value of IFS.
IFS=$old_ifs
```

The while loop over file contents:

```
while IFS="" read -r line || [ -n "$line" ]; do
    echo "Read: $line"
done < ~/effective-shell/data/top100.csv
```
