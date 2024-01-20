#!/bin/bash

# Replace with the actual directory containing the files
directory="./chapters"

# Loop through files in the directory
for file in "$directory"/*; do
    # Check if it's a regular file
    if [[ -f "$file" ]]; then
        # Create a temporary backup file for safety
        cp "$file" "$file.bak"

        # Remove the content using sed
        sed -i '/# Next Step/,$d' "$file"

        # Check if the file was modified successfully
        if [[ $? -eq 0 ]]; then
            echo "Content removed from $file"
            rm "$file.bak"
        else
            echo "Failed to remove content from $file. Restoring backup..."
            mv "$file.bak" "$file"
        fi
    fi
done

#find ./chapters -name '*.bak' -type f -delete