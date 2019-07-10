#!/bin/bash

hugo serve --bind 0.0.0.0 -b http://`ip route get 8.8.8.8 | awk '{print $7}'`

