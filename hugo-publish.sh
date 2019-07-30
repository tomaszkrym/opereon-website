#!/bin/bash

shopt -s extglob
rm -r ./public/!(.git)

hugo

cd public
git add --all
git commit -m "publish"
git push -f
