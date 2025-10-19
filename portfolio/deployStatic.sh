#!/bin/bash

while getopts k:h: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" ]]; then
    echo "syntax: ./deployStatic.sh -k <pem key> -h <hostname>"
    exit 1
fi

printf "\n----> Deploying to remote ~/public_html\n"

# Clear out previous contents
ssh -i "$key" ubuntu@$hostname "rm -rf ~/public_html/*"

# Copy new files
scp -i "$key" index.html style.css ubuntu@$hostname:~/public_html/

printf "\n----> Static site deployed successfully\n"