#!/bin/bash

source_dir="../_posts/2023"  # Replace with the actual source directory
destination_dir="./chapters"  # Replace with the actual destination directory

# Ensure destination directory exists
mkdir -p "$destination_dir"

# Find files matching the pattern, sort them by date, and assign a sequential number
counter=5
for file in $(find "$source_dir" -name "*-data-engineering-process-fundamentals-*.md" | sort); do
    new_filename=$(echo "$file" | sed "s/-data-/0$counter-data-/")  # Replace prefix and add sequence number
    new_file_path="$destination_dir/$new_filename"
    cp "$file" "$new_file_path"
    counter=$((counter + 1))  # Increment counter for the next file
done
