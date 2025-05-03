#!/bin/bash

# This script uses the AWS CLI to download DOCX files from the S3 bucket
# for teacher resources processing.

# Make sure AWS credentials are set as environment variables:
# AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

# Create temp directory if it doesn't exist
mkdir -p temp

# Base S3 path for teacher resources
S3_BASE="s3://visualenglishmaterial/teacher resources/"

# Books to download
BOOKS=(
  "VISUAL 0A - VIDEO FILMS GAMES.docx"
  "VISUAL 0B - VIDEO FILMS GAMES.docx"
  "VISUAL 0C - VIDEO FILMS GAMES.docx"
  "VISUAL 1 - VIDEO FILMS GAMES.docx"
  "VISUAL 2 - VIDEO FILMS GAMES.docx"
  "VISUAL 3 - VIDEO FILMS GAMES.docx"
  "VISUAL 4 - VIDEO FILMS GAMES.docx"
  "VISUAL 5 - VIDEO FILMS GAMES.docx"
  "VISUAL 6 - VIDEO FILMS GAMES.docx"
  "VISUAL 7 - VIDEO FILMS GAMES.docx"
)

# Download files
for book in "${BOOKS[@]}"; do
  echo "Downloading $book..."
  aws s3 cp "${S3_BASE}${book}" "./temp/${book}" --region eu-north-1
  if [ $? -eq 0 ]; then
    echo "✅ Downloaded $book successfully"
  else
    echo "❌ Failed to download $book"
  fi
done

echo "\nProcessing instructions:"
echo "1. Install the mammoth package if not already installed: npm install mammoth"
echo "2. Run the processing script for each book. Example:"
echo "   node scripts/all_units_process_docx.js --book=5 --docx=./temp/VISUAL\ 5\ -\ VIDEO\ FILMS\ GAMES.docx"
