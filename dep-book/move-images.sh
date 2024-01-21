#!/bin/bash

source_dir="../assets/2023"  # Replace with the actual source directory
destination_dir="./images"  # Replace with the actual destination directory

# Ensure destination directory exists
mkdir -p "$destination_dir"

# Find files matching the pattern, sort them by date, and assign a sequential number
for file in $(find "$source_dir" -name "ozkary-data-engineering-*.png" | sort); do
    base_filename=$(basename "$file")  # Extract only the filename without path
    
    # Remove the first 10 characters (the date portion)
    new_filename="${base_filename}"
   
    new_file_path="$destination_dir/$new_filename"
    # echo "$file" "$new_file_path"
    cp "$file" "$new_file_path"    
done