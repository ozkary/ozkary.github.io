#!/bin/bash

# copy the new file into blog.md without the file header. Start from overview
# REMOVE --- as that break the conversion

# Check if a filename was provided
if [ -z "$1" ]; then
    echo "Usage: ./publish.sh blog.md"
    exit 1
fi

# Extract the filename without the .md extension
INPUT_FILE=$1
BASENAME=$(basename "$INPUT_FILE" .md)
OUTPUT_FILE="${BASENAME}.html"

echo "Converting $INPUT_FILE to $OUTPUT_FILE..."

# Run Pandoc with specific flags for your architecture posts:
# 1. -f markdown-yaml_metadata_block: Prevents the horizontal rule error
# 2. --mathjax: Ensures 3-sigma symbols render correctly
# 3. --self-contained: Embeds any local images or styles
# 4. -t html: Target format
pandoc "$INPUT_FILE" \
    -f markdown-yaml_metadata_block \
    --mathjax \
    -t html \
    -o "$OUTPUT_FILE"

if [ $? -eq 0 ]; then
    echo "Success! You can now copy the content of $OUTPUT_FILE to Blogger."
else
    echo "Error: Conversion failed."
    exit 1
fi