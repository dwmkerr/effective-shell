#!/usr/bin/env bash

# Make sure you have a backup directory.
mkdir ~/backup

# Copy over alicloud, aws, azure, gcp, and ssh config and credentials.
cp ~/.aliyun/config.json ~/backup/settings/aliyun/
cp ~/.aws/config ~/backup/settings/aws/
cp ~/.aws/credentials ~/backup/settings/aws/
cp ~/.azure/config ~/backup/settings/azure/
cp ~/.config/gcloud/credentials.db ~/backup/settings/gcloud/
cp ~/.ssh/config ~/backup/settings/ssh/
cp ~/.ssh/id_rsa ~/backup/settings/ssh/ # Is this safe?
cp ~/.ssh/id_rsa.pub ~/backup/settings/ssh/
