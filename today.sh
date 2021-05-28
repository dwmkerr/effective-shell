#!/usr/bin/env sh

set -e

# Get today's date in the format YYYY-MM-DD.
today=$(date +"%Y-%m-%d")

# Create the path to today's temp folder and then make sure the folder exists.
temp_path="/tmp/${today}"
mkdir -p "${temp_path}"

# Now that we've created the folder, make a symlink to it in our homedir.
ln -sf "${temp_path}" "${HOME}/today" 

# Write out the path we created.
echo "${temp_path}"

