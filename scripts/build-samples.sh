#!/usr/bin/env sh

# build-samples.sh
#
# This file builds the 'samples' folder. Means it will:
# 
# 1. Copy all of the files from 'samples'
# 2. Clone the sample repositories, which are hosted at github.com/effective-shell
# 3. Create a zip archive and tar.gz archive
#
# The samples will be created in the './artifacts' folder.

# Fail on errors.
set -e

# Uncomment the line below to trace the script.
set -x

# First, trash the samples folder if it exists in the artifacts folder. Then
# create a new folder based on the current samples.
[ -d ./artifacts/effective-shell ] && rm -rf ./artifacts/effective-shell
mkdir -p ./artifacts
cp -r ./samples ./artifacts

# For the purposes of the downloadable samples, the folder is called
# 'effective shell' - just like what we'd create with the instal script.
mv ./artifacts/samples ./artifacts/effective-shell

# Copy over the version identifier.
cp package.json ./artifacts/effective-shell/.package.json

# Clone our sample repositories. If we have repositories that should not have
# remotes (i.e. for the chapter on getting started with git, where we work with
# a local repository only) we just remove the remote.
mkdir -p ./artifacts/effective-shell/repositories
(   cd ./artifacts/effective-shell/repositories \
    && git clone git://github.com/effective-shell/chapter-27-dotfiles \
    && cd chapter-27-dotfiles \
    && git remote remove origin \
    && rm -rf ./.git \
)
(   cd ./artifacts/effective-shell/repositories \
    && git clone git://github.com/effective-shell/chapter-28-dotfiles \
    && cd chapter-28-dotfiles \
    && git remote remove origin \
    && rm -rf ./.git \
)

# Zip up and tar up the samples
(cd ./artifacts && zip -r ./effective-shell.zip ./effective-shell)
tar czf ./artifacts/effective-shell.tar.gz -C ./artifacts/effective-shell .
