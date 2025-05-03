#!/usr/bin/env python3
"""
DOCX Resource Parser for Visual English

This script extracts structured data from Visual English DOCX files stored in S3.
It identifies unit headers, video links, game links, and other resources,
and outputs them in a structured JSON format.

Usage:
    python parse_docx_resources_fixed.py --access-key YOUR_KEY --secret-key YOUR_SECRET
    
    This will process all DOCX files in the 'teacher resources' folder of the
    visualenglishmaterial S3 bucket and generate resource files in client/src/data/generated
"""

import re
import os
import json
import argparse
from typing import Dict, List, Optional, Tuple, Any
from urllib.parse import urlparse, parse_qs
from io import BytesIO

try:
    import boto3
    import docx
except ImportError:
    print("Installing required packages: boto3, python-docx")
    import subprocess
    subprocess.check_call(["pip", "install", "boto3", "python-docx"])
    import boto3
    import docx

# Type definitions
ResourceDict = Dict[str, Any]
UnitDict = Dict[str, Any]
BookDict = Dict[str, List[UnitDict]]

# Constants
YOUTUBE_EMBED_PATTERN = r'src="https://www.youtube.com/embed/([^"?]+)'
WORDWALL_EMBED_PATTERN = r'src="https://wordwall.net/embed/([^"?\s]+)'
UNIT_HEADER_PATTERN = r'VISUAL\s+(\d+[A-Za-z]*)\s*-\s*UNIT\s+(\d+)\s*-\s*(.+?)(?:\n|$)'

# S3 paths for all resource documents
RESOURCE_PATHS = [
    'teacher resources/VISUAL 0A - VIDEO FILMS GAMES.docx',
    'teacher resources/VISUAL 0B - VIDEO FILMS GAMES.docx',
    'teacher resources/VISUAL 0C - VIDEO FILMS GAMES.docx',
    'teacher resources/VISUAL 1 - VIDEO FILMS GAMES.docx',
    'teacher resources/VISUAL 2 - VIDEO FILMS GAMES.docx',
    'teacher resources/VISUAL 3 - VIDEO FILMS GAMES.docx',
    'teacher resources/VISUAL 4 - VIDEO FILMS GAMES.docx',
    'teacher resources/VISUAL 5 - VIDEO FILMS GAMES.docx',
    'teacher resources/VISUAL 6 - VIDEO FILMS GAMES.docx',
    'teacher resources/VISUAL 7 - VIDEO FILMS GAMES.docx',
]

def setup_aws_client(aws_access_key: Optional[str] = None, 
                    aws_secret_key: Optional[str] = None, 
                    region: str = 'eu-north-1') -> boto3.client:
    """Set up and return an S3 client."""
    if aws_access_key and aws_secret_key:
        return boto3.client(
            's3',
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
            region_name=region
        )
    else:
        # Use environment variables or IAM role
        return boto3.client('s3', region_name=region)

def download_docx_from_s3(s3_client: boto3.client, bucket: str, key: str) -> BytesIO:
    """Download a DOCX file from S3 and return it as a BytesIO object."""
    try:
        response = s3_client.get_object(Bucket=bucket, Key=key)
        return BytesIO(response['Body'].read())
    except Exception as e:
        print(f"Error downloading {key}: {e}")
        raise

def extract_youtube_id(embed_url: str) -> Optional[str]:
    """Extract the YouTube video ID from an embed URL."""
    match = re.search(YOUTUBE_EMBED_PATTERN, embed_url)
    if match:
        return match.group(1)
    
    # Try parse from query string if it's a different format
    parsed_url = urlparse(embed_url)
    if 'youtube.com' in parsed_url.netloc:
        query_params = parse_qs(parsed_url.query)
        if 'v' in query_params:
            return query_params['v'][0]
    
    return None

def extract_wordwall_id(embed_url: str) -> Optional[str]:
    """Extract the Wordwall game ID from an embed URL."""
    match = re.search(WORDWALL_EMBED_PATTERN, embed_url)
    if match:
        return match.group(1)
    return None

def extract_title_from_text(text: str) -> str:
    """Extract a descriptive title from the text."""
    # Remove common prefixes like 'VIDEO', 'ONLINE GAME', etc.
    cleaned_text = re.sub(r'^\d+[a-zA-Z]?\s+(?:VIDEO|ONLINE GAME|SONG|FILM)\s+', '', text)
    # Remove any iframe content
    cleaned_text = re.sub(r'<iframe[^>]*>.*?</iframe>', '', cleaned_text, flags=re.DOTALL)
    # Clean up excess whitespace
    cleaned_text = re.sub(r'\s+', ' ', cleaned_text).strip()
    return cleaned_text if cleaned_text else "Unknown resource"

def parse_docx_content(docx_file: BytesIO) -> Dict[str, UnitDict]:
    """Parse the content of a DOCX file and extract structured data."""
    doc = docx.Document(docx_file)
    full_text = "\n".join([para.text for para in doc.paragraphs])
    
    # Extract unit sections
    units_data = {}
    
    # Split the document into unit sections
    unit_sections = re.split(UNIT_HEADER_PATTERN, full_text)
    
    i = 1  # Skip the first element which is text before the first unit header
    while i < len(unit_sections):
        if i + 2 < len(unit_sections):
            book_id = unit_sections[i]
            unit_id = unit_sections[i+1]
            unit_title = unit_sections[i+2].strip()
            unit_content = unit_sections[i+3] if i+3 < len(unit_sections) else ""
            
            # Process the unit content
            resources = []
            
            # Extract YouTube videos
            youtube_matches = re.finditer(r'<iframe[^>]*src="https://www.youtube.com/embed/([^"?]+)[^>]*>[^<]*</iframe>', unit_content)
            for match in youtube_matches:
                full_iframe = match.group(0)
                youtube_id = match.group(1)
                preceding_text = unit_content[:match.start()].split('\n')[-1].strip()
                title = extract_title_from_text(preceding_text)
                
                resources.append({
                    'type': 'video',
                    'provider': 'YouTube',
                    'id': youtube_id,
                    'title': title,
                    'embed_code': full_iframe,
                    'url': f'https://www.youtube.com/watch?v={youtube_id}'
                })
            
            # Extract Wordwall games
            wordwall_matches = re.finditer(r'<iframe[^>]*src="https://wordwall.net/embed/([^"?\s]+)[^>]*>[^<]*</iframe>', unit_content)
            for match in wordwall_matches:
                full_iframe = match.group(0)
                wordwall_id = match.group(1)
                preceding_text = unit_content[:match.start()].split('\n')[-1].strip()
                title = extract_title_from_text(preceding_text)
                
                resources.append({
                    'type': 'game',
                    'provider': 'Wordwall',
                    'id': wordwall_id,
                    'title': title,
                    'embed_code': full_iframe,
                    'url': f'https://wordwall.net/resource/{wordwall_id}'
                })
            
            # Store the unit data
            unit_key = f"book{book_id}_unit{unit_id}"
            units_data[unit_key] = {
                'book_id': book_id,
                'unit_id': unit_id,
                'title': unit_title,
                'resources': resources
            }
            
            i += 3  # Move to the next unit header
        else:
            break
    
    return units_data

def generate_common_resources_file(book_id: str, file_path: str) -> None:
    """Generate a common resources file for a book if it doesn't exist."""
    # Create unit titles for the book
    js_content = f'''
import {{ TeacherResource }} from '@/components/TeacherResources';

/**
 * This file contains common resources and helper functions for Book {book_id} that will be shared
 * across multiple units. It provides functions to generate standardized resources
 * for any unit in Book {book_id}.
 */

// Unit titles for reference in lesson plans and resources
export const BOOK{book_id}_UNIT_TITLES: Record<string, string> = {{
  // Add unit titles as they become available
  // Example: '1': 'Unit Title',
}};

/**
 * Helper function to create a Book {book_id} video resource with consistent formatting
 * @param unitNumber The unit number
 * @param index The index of the video within the unit
 * @param title The title of the video
 * @param youtubeId The YouTube video ID
 * @param description Optional description of the video
 * @returns A formatted TeacherResource object
 */
export function createBook{book_id}VideoResource(
  unitNumber: number,
  index: number,
  title: string,
  youtubeId: string,
  description?: string
): TeacherResource {{
  return {{
    id: `book{book_id}-unit${{unitNumber}}-video${{index}}`,
    bookId: '{book_id}',
    unitId: unitNumber.toString(),
    title,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: `https://www.youtube.com/embed/${{youtubeId}}`,
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/${{youtubeId}}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description
  }};
}}

/**
 * Helper function to create a Book {book_id} Wordwall game resource with consistent formatting
 * @param unitNumber The unit number
 * @param index The index of the game within the unit
 * @param title The title of the game
 * @param wordwallUrl The Wordwall embed URL
 * @param description Optional description of the game
 * @returns A formatted TeacherResource object
 */
export function createBook{book_id}GameResource(
  unitNumber: number,
  index: number,
  title: string,
  wordwallUrl: string,
  description?: string
): TeacherResource {{
  return {{
    id: `book{book_id}-unit${{unitNumber}}-game${{index}}`,
    bookId: '{book_id}',
    unitId: unitNumber.toString(),
    title,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: wordwallUrl,
    embedCode: `<iframe style="max-width:100%" src="${{wordwallUrl}}" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description
  }};
}}
'''
    with open(file_path, 'w') as f:
        f.write(js_content)
    
    print(f"Generated common resources file at {file_path}")

def generate_lesson_plan_file(book_id: str, unit_id: str, unit_title: str, output_dir: str) -> None:
    """Generate a lesson plan implementation file for a unit."""
    file_path = os.path.join(output_dir, f"book{book_id}-unit{unit_id}-implementation.tsx")
    
    js_content = f'''
/**
 * Implementation file for Book {book_id} Unit {unit_id}: {unit_title}
 *
 * This unit focuses on teaching {unit_title.lower()} vocabulary and expressions
 */

import {{ LessonPlan, LessonStep }} from '@/components/LessonPlanTemplate';
import {{ TeacherResource }} from '@/components/TeacherResources';
import {{ book{book_id}Unit{unit_id}Resources }} from './book{book_id}-unit{unit_id}-resources';

// Export a function to get resources for this unit
export const getBook{book_id}Unit{unit_id}Resources = (): TeacherResource[] => {{
  return book{book_id}Unit{unit_id}Resources;
}};

// Export a function to get lesson plans for this unit
export const generateUnit{unit_id}LessonPlans = (): LessonPlan[] => {{
  return [
    // Lesson Plan 1 - Introduction to {unit_title} (45 minutes)
    {{
      id: 'book{book_id}-unit{unit_id}-lesson1',
      title: 'Introduction to {unit_title} - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn basic {unit_title.lower()} vocabulary',
        'Identify different {unit_title.lower()} items',
        'Use simple sentences with {unit_title.lower()} vocabulary'
      ],
      materials: [
        'Visual English Book {book_id} - Unit {unit_id} slides',
        '{unit_title} flashcards',
        '{unit_title} videos from resources section',
        'Drawing paper and colored pencils'
      ],
      steps: [
        {{
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the topic of {unit_title.lower()}. Show flashcards one by one and ask students to repeat the vocabulary.'
        }},
        {{
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the {unit_title} vocabulary video. Pause at different points to reinforce vocabulary. Introduce key expressions related to {unit_title.lower()}.'
        }},
        {{
          title: 'Practice',
          duration: '15 minutes',
          description: 'Pair activity: Students practice using the vocabulary in simple conversations. Teacher monitors and provides feedback.'
        }},
        {{
          title: 'Activity',
          duration: '10 minutes',
          description: 'Students complete a worksheet or game related to {unit_title.lower()} vocabulary.'
        }},
        {{
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review the vocabulary learned today. Play a quick game to reinforce learning. Assign simple homework related to the topic.'
        }}
      ],
      assessmentTips: 'Monitor students during pair work for proper use of vocabulary. Check worksheet completion for understanding.',
      homeworkIdeas: [
        'Complete a related worksheet',
        'Draw and label {unit_title.lower()} items learned in class'
      ],
      additionalResources: [
        {{
          title: '{unit_title} Resources',
          url: '#'
        }}
      ]
    }},
    
    // Lesson Plan 2 - {unit_title} In Practice (45 minutes)
    {{
      id: 'book{book_id}-unit{unit_id}-lesson2',
      title: '{unit_title} In Practice - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and expand {unit_title.lower()} vocabulary',
        'Practice using {unit_title.lower()} in dialogues',
        'Develop communication skills through themed activities'
      ],
      materials: [
        'Visual English Book {book_id} - Unit {unit_id} slides',
        'Interactive {unit_title.lower()} games',
        'Role-play cards',
        'Art supplies for craft activity'
      ],
      steps: [
        {{
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review {unit_title.lower()} vocabulary from previous lesson with a quick game.'
        }},
        {{
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Introduce new concepts related to {unit_title.lower()}. Show examples and model language patterns.'
        }},
        {{
          title: 'Practice',
          duration: '15 minutes',
          description: 'Group activity: Students work together on a task related to {unit_title.lower()}. Each group presents their work to the class.'
        }},
        {{
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall {unit_title.lower()} games for interactive practice. Students take turns playing while others help.'
        }},
        {{
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review all vocabulary and concepts learned. Students share one new thing they learned about {unit_title.lower()} today.'
        }}
      ],
      assessmentTips: 'Check student understanding through game participation. Monitor use of language during the group activity.',
      homeworkIdeas: [
        'Create a project related to {unit_title.lower()}',
        'Practice vocabulary with family members'
      ],
      additionalResources: [
        {{
          title: '{unit_title} Activity Ideas',
          url: '#'
        }}
      ]
    }}
  ];
}};
'''
    
    with open(file_path, 'w') as f:
        f.write(js_content)
    
    print(f"Generated lesson plan file at {file_path}")

def generate_resource_file(book_id: str, unit_id: str, unit_title: str, videos: List[Dict], games: List[Dict], output_dir: str) -> None:
    """Generate a resource file for a specific unit."""
    file_path = os.path.join(output_dir, f"book{book_id}-unit{unit_id}-resources.tsx")
    
    # Start with the imports and header
    js_content = f'''
import {{ TeacherResource }} from '@/components/TeacherResources';
import {{ createBook{book_id}VideoResource, createBook{book_id}GameResource }} from './book{book_id}-resources-common';

/**
 * Resources for Book {book_id} Unit {unit_id}: {unit_title}
 * 
 * This file contains video and game resources for teaching
 * {unit_title.lower()}
 */

export const book{book_id}Unit{unit_id}Resources: TeacherResource[] = [
  // Videos
'''
    
    # Add videos
    for i, video in enumerate(videos):
        video_title = video['title'].replace("'", "\\'") 
        js_content += f'''
  createBook{book_id}VideoResource(
    {unit_id}, {i+1},
    '{video_title}',
    '{video['id']}',
    'Educational video for {unit_title.lower()}'
  ),'''
    
    # Add games
    js_content += '''

  // Games
'''
    
    for i, game in enumerate(games):
        game_title = game['title'].replace("'", "\\'") 
        game_url = f"https://wordwall.net/embed/{game['id']}"
        js_content += f'''
  createBook{book_id}GameResource(
    {unit_id}, {i+1},
    '{game_title}',
    '{game_url}',
    'Interactive game for practicing {unit_title.lower()}'
  ),'''
    
    # Close the array
    js_content += '''
];
'''
    
    with open(file_path, 'w') as f:
        f.write(js_content)
    
    print(f"Generated resource file at {file_path}")

def generate_js_resources(units_data: Dict[str, UnitDict], output_dir: str) -> None:
    """Generate JavaScript resource files based on the parsed data."""
    os.makedirs(output_dir, exist_ok=True)
    
    # Group units by book
    books = {}
    for unit_key, unit_data in units_data.items():
        book_id = unit_data['book_id']
        if book_id not in books:
            books[book_id] = []
        books[book_id].append(unit_data)
    
    # Generate resource files for each unit
    for book_id, book_units in books.items():
        # Generate common resources file for each book if it doesn't exist
        common_file_path = os.path.join(output_dir, f"book{book_id}-resources-common.tsx")
        if not os.path.exists(common_file_path):
            generate_common_resources_file(book_id, common_file_path)
        
        for unit_data in book_units:
            unit_id = unit_data['unit_id']
            unit_title = unit_data['title']
            resources = unit_data['resources']
            
            # Create videos and games arrays
            videos = [r for r in resources if r['type'] == 'video']
            games = [r for r in resources if r['type'] == 'game']
            
            # Generate the resource file
            generate_resource_file(book_id, unit_id, unit_title, videos, games, output_dir)
            
            # For books 0a, 0b, 0c, also generate lesson plans
            if book_id.lower() in ['0a', '0b', '0c']:
                generate_lesson_plan_file(book_id, unit_id, unit_title, output_dir)
    
    # Generate a summary file
    summary_path = os.path.join(output_dir, "resources-summary.json")
    with open(summary_path, 'w') as f:
        json.dump(units_data, f, indent=2)
    
    print(f"Generated summary file at {summary_path}")

def process_specific_paths(s3_client, bucket: str, output_dir: str) -> None:
    """Process the specific resource paths from S3."""
    all_units_data = {}
    
    for key in RESOURCE_PATHS:
        print(f"Processing {key}...")
        try:
            docx_data = download_docx_from_s3(s3_client, bucket, key)
            units_data = parse_docx_content(docx_data)
            all_units_data.update(units_data)
        except Exception as e:
            print(f"Error processing {key}: {e}")
    
    # Generate resource files
    if all_units_data:
        print(f"Found data for {len(all_units_data)} units.")
        generate_js_resources(all_units_data, output_dir)
    else:
        print("No data extracted.")

def main():
    """Main entry point for the script."""
    parser = argparse.ArgumentParser(description='Parse DOCX files from S3 and extract structured data')
    parser.add_argument('--bucket', default='visualenglishmaterial', help='S3 bucket name')
    parser.add_argument('--access-key', help='AWS access key')
    parser.add_argument('--secret-key', help='AWS secret key')
    parser.add_argument('--output-dir', default='./client/src/data/generated', help='Output directory for generated files')
    parser.add_argument('--local-file', help='Process a local DOCX file instead of downloading from S3')
    
    args = parser.parse_args()
    
    # Process either local file or S3 files
    if args.local_file:
        # Process a local file
        print(f"Processing local file: {args.local_file}")
        with open(args.local_file, 'rb') as f:
            docx_data = BytesIO(f.read())
        units_data = parse_docx_content(docx_data)
        
        # Generate resource files
        if units_data:
            print(f"Found data for {len(units_data)} units.")
            generate_js_resources(units_data, args.output_dir)
        else:
            print("No data extracted.")
    else:
        # Set up S3 client
        s3_client = setup_aws_client(args.access_key, args.secret_key)
        process_specific_paths(s3_client, args.bucket, args.output_dir)

if __name__ == "__main__":
    main()
