#!/usr/bin/env python3
"""
ESL Question Generator

This script processes image files from an AWS S3 bucket or local directory, analyzes their filenames,
and generates appropriate ESL questions with answer prompts.

Usage:
  # Process images from S3 bucket
  python s3_question_generator.py --bucket visualenglishmaterial --folder book3/unit2
  
  # Process images from S3 with explicit AWS credentials
  python s3_question_generator.py --bucket visualenglishmaterial --folder book3/unit2 --access-key YOUR_KEY --secret-key YOUR_SECRET
  
  # Process images from local directory
  python s3_question_generator.py --local-dir ./images
  
  # Output to JSON file with pretty formatting
  python s3_question_generator.py --bucket visualenglishmaterial --folder book3/unit2 --output questions.json --pretty
  
AWS Authentication:
  This script supports three ways to authenticate with AWS:
  1. Environment variables: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
  2. Command line arguments: --access-key and --secret-key
  3. AWS credential file (~/.aws/credentials) and config file (~/.aws/config)
  
  For S3 access, we recommend using the Stockholm region (eu-north-1) where the Visual English materials are stored.
"""

import os
import re
import json
import argparse
import logging
from typing import List, Dict, Optional, Tuple, Any
import mimetypes
from pathlib import Path

import boto3
from botocore.exceptions import ClientError

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("esl-question-generator")


class ESLQuestionGenerator:
    """Processes image files and generates ESL questions with answer prompts."""
    
    # Image file extensions to process
    IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'}
    
    # Question type patterns and their corresponding answer templates
    QUESTION_PATTERNS = {
        r'^do you': {
            'positive': "Yes, I do.",
            'negative': "No, I don't."
        },
        r'^does he': {
            'positive': "Yes, he does.",
            'negative': "No, he doesn't."
        },
        r'^does she': {
            'positive': "Yes, she does.",
            'negative': "No, she doesn't."
        },
        r'^can you': {
            'positive': "Yes, I can.",
            'negative': "No, I can't."
        },
        r'^can he': {
            'positive': "Yes, he can.",
            'negative': "No, he can't."
        },
        r'^can she': {
            'positive': "Yes, she can.",
            'negative': "No, she can't."
        },
        r'^is it': {
            'positive': "Yes, it is.",
            'negative': "No, it isn't."
        },
        r'^is he': {
            'positive': "Yes, he is.",
            'negative': "No, he isn't."
        },
        r'^is she': {
            'positive': "Yes, she is.",
            'negative': "No, she isn't."
        },
        r'^are you': {
            'positive': "Yes, I am.",
            'negative': "No, I'm not."
        },
        r'^are they': {
            'positive': "Yes, they are.",
            'negative': "No, they aren't."
        },
        r'^have you': {
            'positive': "Yes, I have.",
            'negative': "No, I haven't."
        },
        r'^has he': {
            'positive': "Yes, he has.",
            'negative': "No, he hasn't."
        },
        r'^has she': {
            'positive': "Yes, she has.",
            'negative': "No, she hasn't."
        },
        r'^did you': {
            'positive': "Yes, I did.",
            'negative': "No, I didn't."
        },
        r'^would you': {
            'positive': "Yes, I would.",
            'negative': "No, I wouldn't."
        },
        r'^could you': {
            'positive': "Yes, I could.",
            'negative': "No, I couldn't."
        },
        r'^should we': {
            'positive': "Yes, we should.",
            'negative': "No, we shouldn't."
        }
    }
    
    # Patterns for special question types that don't fit the yes/no format
    SPECIAL_QUESTION_PATTERNS = {
        r'^what': 'wh_question',
        r'^where': 'wh_question',
        r'^when': 'wh_question',
        r'^why': 'wh_question',
        r'^how': 'wh_question',
        r'^who': 'wh_question',
        r'^which': 'wh_question'
    }
    
    def __init__(self, s3_region: str = 'eu-north-1'):
        """Initialize the ESL Question Generator."""
        # Only create the S3 client if we're going to use it
        self.s3_client = None
        self.s3_region = s3_region
        
    def _ensure_s3_client(self):
        """Ensure S3 client is initialized when needed"""
        if self.s3_client is None:
            # Look for AWS credentials in environment variables
            access_key = os.environ.get('AWS_ACCESS_KEY_ID')
            secret_key = os.environ.get('AWS_SECRET_ACCESS_KEY')
            
            if access_key and secret_key:
                logger.info(f"Creating S3 client with credentials from environment variables")
                self.s3_client = boto3.client(
                    's3',
                    region_name=self.s3_region,
                    aws_access_key_id=access_key,
                    aws_secret_access_key=secret_key
                )
            else:
                logger.info(f"Creating S3 client using default credential provider chain")
                self.s3_client = boto3.client('s3', region_name=self.s3_region)
    
    def is_image_file(self, filename: str) -> bool:
        """Check if a file is an image based on its extension."""
        _, ext = os.path.splitext(filename.lower())
        return ext in self.IMAGE_EXTENSIONS
    
    def clean_filename(self, filename: str) -> str:
        """
        Clean the filename by removing extension and special characters.
        """
        # Remove extension
        filename = os.path.splitext(filename)[0]
        
        # Remove common prefixes, but be careful not to affect the question words
        
        # Pattern 1: "01 A" or "05 C B" - numeric followed by letters with spaces at the beginning
        if re.match(r'^\d{1,2}\s+[A-Za-z]+(\s+[A-Za-z]+)?\s+', filename):
            filename = re.sub(r'^\d{1,2}\s+[A-Za-z]+(\s+[A-Za-z]+)?\s+', '', filename)
        
        # Pattern 2: Only match exact patterns like "01_A_" or "14_D_" at the beginning
        # This pattern matches specific format of number_letter_ without affecting question words
        patterns = [
            r'^\d{1,2}_[A-Z]_',     # matches "01_A_"
            r'^\d{1,2}_[A-Z][A-Z]_', # matches "01_AB_"
        ]
        
        for pattern in patterns:
            if re.match(pattern, filename):
                filename = re.sub(pattern, '', filename)
                break
        
        # Replace underscores and hyphens with spaces
        filename = filename.replace('_', ' ').replace('-', ' ')
        
        # Remove extra spaces
        filename = ' '.join(filename.split())
        
        return filename
    
    def format_question(self, text: str) -> str:
        """Format text as a proper ESL question."""
        # If the text is empty, return empty string
        if not text:
            return ""
        
        # Make first letter uppercase
        text = text[0].upper() + text[1:]
        
        # Add question mark if not present
        if not text.endswith('?'):
            text += '?'
        
        return text
    
    def determine_question_type(self, question: str) -> Tuple[Optional[str], List[str]]:
        """
        Determine the question type and return appropriate answer prompts.
        Returns a tuple of (question_type, [positive_answer, negative_answer])
        """
        question_lower = question.lower().strip()
        
        # Check for yes/no question patterns
        for pattern, answers in self.QUESTION_PATTERNS.items():
            if re.match(pattern, question_lower):
                return ('yes_no', [answers['positive'], answers['negative']])
        
        # Check for special question patterns
        for pattern, q_type in self.SPECIAL_QUESTION_PATTERNS.items():
            if re.match(pattern, question_lower):
                # For WH-questions, we don't provide specific answer templates
                if q_type == 'wh_question':
                    # Return a descriptive prompt for the teacher
                    return ('wh_question', ["[Open response]", "[Provide answer]"])
        
        # Unknown question type
        return ('unknown_type', ["[Unknown question type]", "[Please provide appropriate responses]"])
    
    def process_s3_file(self, bucket: str, key: str) -> Optional[Dict[str, Any]]:
        """Process a single file from S3 bucket."""
        try:
            # Ensure S3 client is initialized
            self._ensure_s3_client()
            
            # Skip non-image files
            if not self.is_image_file(key):
                logger.debug(f"Skipping non-image file: {key}")
                return None
            
            # Extract filename without path
            filename = os.path.basename(key)
            
            # Clean the filename for question generation
            clean_name = self.clean_filename(filename)
            
            # Format as a question
            question = self.format_question(clean_name)
            
            # Determine question type and answer prompts
            question_type, answer_prompts = self.determine_question_type(question)
            
            # Generate presigned URL for the image
            s3_url = self.s3_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': bucket, 'Key': key},
                ExpiresIn=3600  # URL valid for 1 hour
            )
            
            # Create result object
            result = {
                'filename': filename,
                'question': question,
                'question_type': question_type,
                'answer_prompts': answer_prompts,
                's3_url': s3_url
            }
            
            return result
        
        except Exception as e:
            logger.error(f"Error processing file {key}: {str(e)}")
            return None
    
    def process_s3_bucket(self, bucket: str, folder: str) -> tuple[list[dict[str, Any]], list[str]]:
        """
        Process all image files in the specified S3 bucket folder.
        Returns a tuple of (processed_results, unprocessed_files)
        """
        results = []
        unprocessed_files = []
        
        try:
            # Ensure S3 client is initialized
            self._ensure_s3_client()
            
            # Ensure folder ends with / for proper prefix matching
            if folder and not folder.endswith('/'):
                folder = folder + '/'
            
            # List objects in the folder
            response = self.s3_client.list_objects_v2(Bucket=bucket, Prefix=folder)
            
            if 'Contents' not in response:
                logger.warning(f"No files found in s3://{bucket}/{folder}")
                return [], []
            
            logger.info(f"Found {len(response['Contents'])} objects in s3://{bucket}/{folder}")
            
            # Process each image file
            for obj in response['Contents']:
                key = obj['Key']
                
                # Skip the folder itself
                if key == folder:
                    continue
                
                # Skip non-image files
                if not self.is_image_file(key):
                    continue
                
                result = self.process_s3_file(bucket, key)
                if result:
                    results.append(result)
                else:
                    unprocessed_files.append(key)
            
            return results, unprocessed_files
        
        except ClientError as e:
            logger.error(f"AWS error: {str(e)}")
            return [], []
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return [], []
    
    def process_local_directory(self, directory: str) -> tuple[list[dict[str, Any]], list[str]]:
        """
        Process all image files in the specified local directory.
        Returns a tuple of (processed_results, unprocessed_files)
        """
        results = []
        unprocessed_files = []
        
        try:
            directory_path = Path(directory)
            if not directory_path.exists() or not directory_path.is_dir():
                logger.error(f"Directory {directory} does not exist or is not a directory")
                return [], []
            
            # Process each file in the directory
            for file_path in directory_path.iterdir():
                if not file_path.is_file():
                    continue
                
                # Skip non-image files
                if not self.is_image_file(file_path.name):
                    continue
                
                try:
                    # Clean the filename for question generation
                    filename = file_path.name
                    clean_name = self.clean_filename(filename)
                    
                    # Format as a question
                    question = self.format_question(clean_name)
                    
                    # Determine question type and answer prompts
                    question_type, answer_prompts = self.determine_question_type(question)
                    
                    # Create result object (no S3 URL for local files)
                    result = {
                        'filename': filename,
                        'question': question,
                        'question_type': question_type,
                        'answer_prompts': answer_prompts,
                        'local_path': str(file_path)
                    }
                    
                    results.append(result)
                except Exception as e:
                    logger.error(f"Error processing file {file_path}: {str(e)}")
                    unprocessed_files.append(str(file_path))
            
            return results, unprocessed_files
        
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return [], []


def parse_arguments():
    """Parse command-line arguments."""
    parser = argparse.ArgumentParser(description='ESL Question Generator from image filenames.')
    
    # Create a mutually exclusive group for S3 or local directory
    source_group = parser.add_mutually_exclusive_group(required=True)
    source_group.add_argument('--bucket', type=str, help='S3 bucket name')
    source_group.add_argument('--local-dir', type=str, help='Local directory path')
    
    # S3 specific options
    parser.add_argument('--folder', type=str, help='S3 folder/prefix to process')
    parser.add_argument('--region', type=str, default='eu-north-1', help='AWS region (default: eu-north-1)')
    parser.add_argument('--access-key', type=str, help='AWS access key ID (optional, can use AWS_ACCESS_KEY_ID env var)')
    parser.add_argument('--secret-key', type=str, help='AWS secret access key (optional, can use AWS_SECRET_ACCESS_KEY env var)')
    
    # Output options
    parser.add_argument('--output', type=str, help='Output JSON file path (default: stdout)')
    parser.add_argument('--pretty', action='store_true', help='Pretty-print JSON output')
    
    return parser.parse_args()


def main():
    """Main entry point of the script."""
    args = parse_arguments()
    
    # Set AWS credentials in environment variables if provided via command line
    if args.access_key:
        os.environ['AWS_ACCESS_KEY_ID'] = args.access_key
    if args.secret_key:
        os.environ['AWS_SECRET_ACCESS_KEY'] = args.secret_key
    
    # Initialize the question generator
    generator = ESLQuestionGenerator(s3_region=args.region)
    
    results = []
    unprocessed_files = []
    
    # Process either S3 bucket or local directory
    if args.bucket:
        logger.info(f"Processing S3 bucket: {args.bucket}, folder: {args.folder or ''}")
        results, unprocessed_files = generator.process_s3_bucket(args.bucket, args.folder or '')
    else:
        logger.info(f"Processing local directory: {args.local_dir}")
        results, unprocessed_files = generator.process_local_directory(args.local_dir)
    
    # Display results
    logger.info(f"Processed {len(results)} image files successfully")
    if unprocessed_files:
        logger.warning(f"Failed to process {len(unprocessed_files)} files:")
        for file in unprocessed_files[:10]:  # Show first 10 failures
            logger.warning(f"  - {file}")
        if len(unprocessed_files) > 10:
            logger.warning(f"  ... and {len(unprocessed_files) - 10} more")
    
    # Prepare output
    output_data = {
        'questions': results,
        'total_processed': len(results),
        'total_unprocessed': len(unprocessed_files),
        'unprocessed_files': unprocessed_files
    }
    
    # Format JSON output
    indent = 2 if args.pretty else None
    json_output = json.dumps(output_data, indent=indent)
    
    # Write to file or stdout
    if args.output:
        with open(args.output, 'w') as f:
            f.write(json_output)
        logger.info(f"Results written to {args.output}")
    else:
        print(json_output)


if __name__ == "__main__":
    main()