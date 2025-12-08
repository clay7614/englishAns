import csv
import os

def normalize_text(text):
    if not text:
        return ""
    return text.strip()

def process_file(filename, data_map):
    """
    filename: '901~1050.csv'
    data_map: {
        'Question Text': {
            'anum': 1, # or 0 for descriptive
            'answer': 'Descriptive Answer', # only for anum=0
            'q_ja': 'Japanese Question',
            'a_ja': ['Opt1_JA', 'Opt2_JA', 'Opt3_JA', 'Opt4_JA'] # or single string for descriptive
        }
    }
    """
    filepath = os.path.join(os.getcwd(), filename)
    ja_filepath = os.path.join(os.getcwd(), filename.replace('.csv', '_ja.csv'))
    
    rows = []
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.reader(f)
        header = next(reader)
        rows.append(header)
        for row in reader:
            rows.append(row)

    updated_rows = [header]
    ja_rows = [header]

    # Create a normalized map for easier lookup (ignoring minor whitespace/punctuation diffs if needed)
    # For now, strict matching on stripped string
    lookup_map = {normalize_text(k): v for k, v in data_map.items()}

    for i in range(1, len(rows)):
        row = rows[i]
        # Row structure: Q, A1, A2, A3, A4, Anum
        # Note: Some files might have different structure, but based on context they seem consistent.
        # glammer-2A might be different? Let's assume standard 6 columns.
        
        if len(row) < 6:
            # Pad if necessary
            row += [''] * (6 - len(row))
            
        q_text = normalize_text(row[0])
        
        if q_text in lookup_map:
            info = lookup_map[q_text]
            
            # Update Original Row
            anum = info.get('anum')
            if anum == 0:
                # Descriptive
                row[5] = '0'
                if 'answer' in info:
                    row[1] = info['answer'] # Set A1
            else:
                # Multiple Choice
                row[5] = str(anum)
            
            updated_rows.append(row)
            
            # Create Translation Row
            ja_row = [''] * 6
            ja_row[0] = info.get('q_ja', '')
            
            a_ja = info.get('a_ja', [])
            if isinstance(a_ja, list):
                for idx, txt in enumerate(a_ja):
                    if idx < 4:
                        ja_row[idx+1] = txt
            else:
                # Descriptive answer translation
                ja_row[1] = str(a_ja)
                
            ja_row[5] = row[5] # Copy Anum
            ja_rows.append(ja_row)
        else:
            # If not found, keep original and empty translation (or copy original?)
            # User wants us to fill it. If missing, we just keep as is.
            updated_rows.append(row)
            ja_rows.append(['(Translation Missing)'] + [''] * 5)
            print(f"Missing data for: {q_text[:30]}...")

    # Write updated original
    with open(filepath, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(updated_rows)
        
    # Write translation file
    with open(ja_filepath, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(ja_rows)

    print(f"Processed {filename}")
