#!/usr/bin/env bash
#
# wordcount
#
# Given a set of markdown files, counts the words, approximates
# the pages and summarises. Outputs in CSV.
#
# Example:
#   ./scripts/wordcount.sh ./website/content/docs/section*/**/_index.md > statistics.csv

# Write out the CSV column titles.
echo -e '"Path","Section","Title","Wordcount","Pagecount"'

# Go through each file we'll get statistics for.
for file in $@; do
    # Get the section from the folder structure - perhaps better to put it in
    # the frontmatter in the future?
    section=$(basename $(dirname $(dirname "$file")))

    # Rip out the title from the frontmatter.
    title=$(cat $file |\
        grep 'title: ' |\
        sed -E 's/.*title:[[:space:]]*["]?([^"]*)["]?$/\1/')

    # Get the wordcount.
    wc=$(wc -w < "$file" | tr -d ' ')

    # Get the pagecount.
    pc=$(( (wc/500) + 1 ))

    # Write the results as a line of CSV.
    echo -e "\"$file\",\"$section\",\"$title\",\"$wc\",\"$pc\""

done
