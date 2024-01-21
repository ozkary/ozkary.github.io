#!/bin/bash

# Directory containing Markdown files
directory="./chapters"

# Iterate through files in the directory
for file in "$directory"/*.md; do

  # Create a temporary backup of the file
  # cp "$file" "$file.bak"

  # Use sed to perform the text replacement
  sed -i 's/!\([^(]*)\([^)]*\)(\([^)]*\))/!\[\3](\2 "\1")/g' "$file"

done
