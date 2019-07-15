#!/bin/bash

shopt -s extglob
rm -r ./public/!(.git)

hugo


