#!/bin/bash

# Directory containing Markdown files
directory="./chapters"

# Iterate through files in the directory
for file in "$directory"/*.md; do

  # Create a temporary backup of the file
  # cp "$file" "$file.bak"
   
  # Use sed to perform the text replacement (adjusted regular expression)
  # Use sed to perform the text replacement (refined regular expression)
  sed -i 's/!\[ozkary-data-engineering-\([^)]*\)]\([^)]*\)(\([^)]*\))/!\[\2](\1 "\3")/g' "$file"

  break

done
