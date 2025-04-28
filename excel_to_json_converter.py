
import pandas as pd
import json
import sys
import os
import re

def extract_unit_id(sheet_name):
    """Extract unit ID from sheet name."""
    match = re.search(r'UNIT\s+(\d+)', sheet_name, re.IGNORECASE)
    if match:
        return f"unit{match.group(1)}"
    return None

def process_excel(excel_file, book_id):
    """Process Excel file and generate JSON mapping with proper structure."""
    print(f"Processing Excel file: {excel_file}")
    
    try:
        # Load Excel file with more robust error handling for binary files
        excel = pd.ExcelFile(excel_file, engine='openpyxl')
        
        # Dictionary to store all Q&A mappings
        mapping = {}
        
        # Track total processed entries
        total_entries = 0
        
        # Iterate through each sheet (unit)
        for sheet_name in excel.sheet_names:
            try:
                unit_id = extract_unit_id(sheet_name)
                if not unit_id:
                    print(f"Warning: Could not extract unit ID from sheet {sheet_name}")
                    # If we can't extract unit ID from sheet name, try to extract from numbers in the name
                    number_match = re.search(r'(\d+)', sheet_name)
                    if number_match:
                        unit_id = f"unit{number_match.group(1)}"
                        print(f"Extracted fallback unit ID: {unit_id}")
                    else:
                        continue
                        
                print(f"Processing sheet: {sheet_name} (Unit ID: {unit_id})")
                
                # Read the sheet data with more robust error handling
                try:
                    df = pd.read_excel(excel, sheet_name=sheet_name, engine='openpyxl')
                except Exception as e:
                    print(f"Error reading sheet {sheet_name}: {e}")
                    continue
                
                # Skip processing if DataFrame is empty
                if df.empty:
                    print(f"Warning: Empty sheet {sheet_name}")
                    continue
                
                # Handle different possible column structures
                
                # First approach: Use column indices rather than names to be more robust
                # Even if columns are unnamed or have inconsistent names, we can access by position
                
                if len(df.columns) >= 3:
                    # Process each row using direct column indices
                    valid_count = 0
                    
                    for _, row in df.iterrows():
                        try:
                            # Access data by position rather than column name
                            filename = row.iloc[0] if not pd.isna(row.iloc[0]) else None
                            question = row.iloc[1] if not pd.isna(row.iloc[1]) else None
                            answer = row.iloc[2] if not pd.isna(row.iloc[2]) else None
                            
                            # Skip if any required field is missing
                            if not filename or not question or not answer:
                                continue
                                
                            # Convert to string and clean
                            filename = str(filename).strip()
                            question = str(question).strip()
                            answer = str(answer).strip()
                            
                            # Extract code pattern from filename
                            code_pattern = extract_code_pattern(filename)
                            
                            # Generate entry in the mapping
                            mapping[filename] = {
                                'filename': filename,
                                'codePattern': code_pattern,
                                'question': question,
                                'answer': answer,
                                'unitId': unit_id,
                                'bookId': book_id
                            }
                            
                            # Also add mapping with filename without extension for easier matching
                            filename_no_ext = re.sub(r'\.(png|jpg|jpeg|gif|webp|mp4)$', '', filename, flags=re.IGNORECASE)
                            if filename_no_ext != filename:
                                mapping[filename_no_ext] = mapping[filename].copy()
                                
                            # For flexibility, also add entries with normalized code patterns
                            if code_pattern:
                                # Add variations of the code pattern for better matching
                                pattern_variations = generate_pattern_variations(code_pattern)
                                for variation in pattern_variations:
                                    if variation not in mapping:
                                        # Create a copy of the mapping entry with the variation as the key
                                        mapping[variation] = mapping[filename].copy()
                                        mapping[variation]['codePattern'] = variation
                            
                            valid_count += 1
                        except Exception as row_error:
                            print(f"Error processing row in sheet {sheet_name}: {row_error}")
                            continue
                    
                    total_entries += valid_count
                    print(f"Processed {valid_count} valid entries from sheet {sheet_name}")
                else:
                    print(f"Warning: Sheet {sheet_name} has fewer than 3 columns")
            
            except Exception as sheet_error:
                print(f"Error processing sheet {sheet_name}: {sheet_error}")
                continue
        
        print(f"Total entries processed: {total_entries}")
        return mapping
    
    except Exception as e:
        print(f"Error processing Excel file {excel_file}: {e}")
        raise

def extract_code_pattern(filename):
    """Extract code pattern from filename (like '01 I A')."""
    # Look for patterns like "01 I A", "01-I-A", "01IA", etc.
    patterns = [
        r'(\d{2})\s*([A-Za-z])\s*([A-Za-z])',  # 01 I A
        r'(\d{2})-([A-Za-z])-([A-Za-z])',      # 01-I-A
        r'(\d{2})([A-Za-z])([A-Za-z])'         # 01IA
    ]
    
    for pattern in patterns:
        match = re.search(pattern, filename)
        if match:
            return f"{match.group(1)} {match.group(2).upper()} {match.group(3).upper()}"
    
    # Try a more general pattern for section numbers like "01 I" or "02 A"
    section_match = re.search(r'(\d{2})\s*([A-Za-z])', filename)
    if section_match:
        return f"{section_match.group(1)} {section_match.group(2).upper()}"
    
    return None

def generate_pattern_variations(pattern):
    """Generate variations of a code pattern for better matching."""
    variations = set()
    
    # Add the original pattern
    variations.add(pattern)
    
    # Handle patterns like "01 I A"
    parts = pattern.split()
    if len(parts) == 3:
        num, letter1, letter2 = parts
        
        # Add format "01IA"
        variations.add(f"{num}{letter1}{letter2}")
        
        # Add format "01-I-A"
        variations.add(f"{num}-{letter1}-{letter2}")
        
        # Add lowercase variations
        variations.add(f"{num} {letter1.lower()} {letter2.lower()}")
        variations.add(f"{num}{letter1.lower()}{letter2.lower()}")
        variations.add(f"{num}-{letter1.lower()}-{letter2.lower()}")
    
    # Handle patterns like "01 I"
    elif len(parts) == 2:
        num, letter = parts
        
        # Add format "01I"
        variations.add(f"{num}{letter}")
        
        # Add format "01-I"
        variations.add(f"{num}-{letter}")
        
        # Add lowercase variations
        variations.add(f"{num} {letter.lower()}")
        variations.add(f"{num}{letter.lower()}")
        variations.add(f"{num}-{letter.lower()}")
    
    return list(variations)

def main():
    if len(sys.argv) < 3:
        print("Usage: python excel_to_json_converter.py <excel_file> <book_id> [output_file]")
        sys.exit(1)
    
    excel_file = sys.argv[1]
    book_id = sys.argv[2]
    output_file = sys.argv[3] if len(sys.argv) > 3 else f"qa-mapping-{book_id}.json"
    
    if not os.path.exists(excel_file):
        print(f"Error: Excel file {excel_file} not found")
        sys.exit(1)
    
    try:
        mapping = process_excel(excel_file, book_id)
        
        # Save to JSON file
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(mapping, f, ensure_ascii=False, indent=2)
        
        print(f"Successfully processed {len(mapping)} Q&A entries")
        print(f"Output saved to {output_file}")
        
    except Exception as e:
        print(f"Error processing Excel file: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
