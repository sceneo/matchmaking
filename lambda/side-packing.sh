#!/bin/bash
name=$(basename -s .git `git config --get remote.origin.url`)

#if [ -d "deploy" ]; then rm -Rf deploy; fi
mkdir deploy

pip3 install -r requirements.txt -t deploy/requirements-lambda/

cd deploy/requirements-lambda
rm -r PIL
rm -r Pillow*

zip -9 -r ../$name-requirements.zip .

cd ..
rm -r requirements-lambda