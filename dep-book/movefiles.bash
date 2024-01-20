#!/bin/bash

source_dir="../_posts/2023"  # Replace with the actual source directory
destination_dir="./chapters"  # Replace with the actual destination directory

# Ensure destination directory exists
mkdir -p "$destination_dir"

# Find files matching the pattern, sort them by date, and assign a sequential number
counter=5
for file in $(find "$source_dir" -name "*-data-engineering-process-fundamentals-*.md" | sort); do
    base_filename=$(basename "$file")  # Extract only the filename without path
    
    # Remove the first 10 characters (the date portion)
    new_filename="${base_filename:10}"

    # Replace prefix and add sequence number
     # Conditional prefixing based on counter value
    if [[ $counter -lt 10 ]]; then
        new_filename=$(echo "$new_filename" | sed "s/-data-/0$counter-data-/")
    else
        new_filename=$(echo "$new_filename" | sed "s/-data-/$counter-data-/")
    fi
    # new_filename=$(echo "$new_filename" | sed "s/-data-/0$counter-data-/")

    new_file_path="$destination_dir/$new_filename"
    # echo "$file" "$new_file_path"
    cp "$file" "$new_file_path"
    counter=$((counter + 1))
done