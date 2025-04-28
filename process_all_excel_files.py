#!/usr/bin/env python3

import os
import subprocess
import sys

def process_all_books():
    """Process all Visual English books Excel files."""
    # Define the path to the Excel files
    excel_dir = "attached_assets"
    
    # Define the mapping of Excel files to book IDs
    excel_map = {
        "VISUAL 1 QUESTIONS.xlsx": "book1",
        "VISUAL 2 QUESTIONS.xlsx": "book2",
        "VISUAL 3 QUESTIONS.xlsx": "book3",
        "VISUAL 4 QUESTIONS.xlsx": "book4",
        "VISUAL 5 QUESTIONS.xlsx": "book5",
        "VISUAL 6 QUESTIONS.xlsx": "book6", 
        "VISUAL 7 QUESTIONS.xlsx": "book7"
    }
    
    # Path to the converter script
    converter_script = "excel_to_json_converter.py"
    
    # Output directory for JSON files
    output_dir = "client/src/data"
    
    # Create the output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Process each Excel file
    for excel_file, book_id in excel_map.items():
        excel_path = os.path.join(excel_dir, excel_file)
        output_path = os.path.join(output_dir, f"qa-mapping-{book_id}.json")
        
        print(f"\n{'='*80}")
        print(f"Processing {excel_file} for {book_id}")
        print(f"{'='*80}")
        
        if not os.path.exists(excel_path):
            print(f"Warning: Excel file {excel_path} not found, skipping")
            continue
        
        try:
            # Run the converter script
            cmd = [sys.executable, converter_script, excel_path, book_id, output_path]
            print(f"Running: {' '.join(cmd)}")
            
            # Execute the command
            subprocess.run(cmd, check=True)
            
            print(f"Successfully processed {excel_file} -> {output_path}")
        except subprocess.CalledProcessError as e:
            print(f"Error processing {excel_file}: {e}")
        except Exception as e:
            print(f"Unexpected error processing {excel_file}: {e}")
    
    print("\nAll Excel files processed!")

if __name__ == "__main__":
    process_all_books()