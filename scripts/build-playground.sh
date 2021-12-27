#!/usr/bin/env sh

# build-playground.sh
#
# This file builds the 'playground' zip file. It will:
# 
# 1. Copy all of the files from 'samples'
# 2. Add the .version.txt file to the samples
# 3. Clone the sample repositories, which are hosted at github.com/effective-shell
# 4. Create a zip archive and tar.gz archive
#
# The samples will be created in the './artifacts' folder.

# Fail on errors.
set -e

# Uncomment the line below to trace the script.
set -x

# First, trash the samples folder if it exists in the artifacts folder. Then
# create a new folder based on the current samples.
[ -d ./artifacts/playground ] && rm -rf ./artifacts/playground
mkdir -p ./artifacts
cp -r ./playground ./artifacts

# Copy over the version identifier.
cp version.txt ./artifacts/playground/.version.txt

# Clone our sample repositories. If we have repositories that should not have
# remotes (i.e. for the chapter on getting started with git, where we work with
# a local repository only) we just remove the remote.
mkdir -p ./artifacts/playground/repositories
(   cd ./artifacts/playground/repositories \
    && git clone git://github.com/effective-shell/chapter-27-dotfiles \
    && cd chapter-27-dotfiles \
    && git remote remove origin \
)
(   cd ./artifacts/playground/repositories \
    && git clone git://github.com/effective-shell/chapter-28-dotfiles \
    && cd chapter-28-dotfiles \
    && git remote remove origin \
)

# Zip up the samples
cd artifacts && zip -r ./playground.zip ./playground
