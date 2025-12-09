import csv
import glob
import re
import os
from bs4 import BeautifulSoup

def has_japanese(text):
    # ひらがな、カタカナ、漢字が含まれているかチェック
    return bool(re.search(r'[ぁ-んァ-ン一-龥]', text))

def extract_questions(html_dir, output_eng, output_jp):
    html_files = glob.glob(os.path.join(html_dir, "*.html"))
    
    eng_rows = []
    jp_rows = []
    
    # Header
    header = ["Q", "A1", "A2", "A3", "A4", "Anum"]
    eng_rows.append(header)
    jp_rows.append(header)
    
    seen_questions = set()

    for file_path in html_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')
            
        questions = soup.find_all('div', class_='que')
        
        for q in questions:
            qtext_div = q.find('div', class_='qtext')
            if not qtext_div:
                continue
                
            # Get raw text with separator for processing
            # Replace <br> with newline to split easily
            for br in qtext_div.find_all("br"):
                br.replace_with("\n")
            
            full_text = qtext_div.get_text().replace('\xa0', ' ').strip()
            lines = full_text.split('\n')
            
            eng_q_lines = []
            jp_q_lines = []
            
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                if has_japanese(line):
                    jp_q_lines.append(line)
                else:
                    eng_q_lines.append(line)
            
            # Fallback: if no English lines found but Japanese exists, maybe it's all mixed?
            # Or if no Japanese lines found, maybe it's all English.
            
            eng_q_text = " ".join(eng_q_lines)
            jp_q_text = " ".join(jp_q_lines)
            
            # If separation failed (e.g. no Japanese chars found but it was intended for JP CSV?), 
            # or if English text is empty but it's a question, handle gracefully.
            if not eng_q_text and jp_q_text:
                 # If only Japanese text is found, it might be a translation question where the English part is implicit or missing?
                 # But usually there is English. Let's assume if empty, we use full text for English as fallback if it's not empty.
                 pass
            if not eng_q_text and not jp_q_text:
                eng_q_text = full_text

            # Determine type
            if 'multichoice' in q.get('class', []):
                # 4-choice question
                # English CSV: Q, A1-A4, Anum=""
                # Japanese CSV: All empty (based on user instruction "Japanese CSV is blank" for 4-choice? 
                # Wait, user said: "4-choice... Japanese CSV is blank fields")
                
                choices = []
                answers = q.find_all('div', class_='r0') + q.find_all('div', class_='r1')
                # The order in HTML might be mixed r0, r1, r0, r1... need to sort or just find all in order
                answer_div = q.find('div', class_='answer')
                if answer_div:
                    # Find all child divs that have r0 or r1 class
                    # Actually, just finding all inputs and getting their labels might be safer order-wise
                    # But structure seems to be div.r0, div.r1...
                    # Let's just find all divs with class r0 or r1 inside answer_div
                    choice_divs = answer_div.find_all('div', class_=re.compile(r'r[01]'))
                    
                    for c in choice_divs:
                        # Text is in div.flex-fill
                        text_div = c.find('div', class_='flex-fill')
                        if text_div:
                            choices.append(text_div.get_text().strip())
                
                # Pad choices to 4
                while len(choices) < 4:
                    choices.append("")
                
                # English Row
                # If separation logic put everything in JP because of some kanji in English sentence? Unlikely.
                # For multichoice, usually the question is English.
                # If eng_q_text is empty, use full_text
                final_eng_q = eng_q_text if eng_q_text else full_text
                
                if final_eng_q not in seen_questions:
                    seen_questions.add(final_eng_q)
                    eng_rows.append([final_eng_q, choices[0], choices[1], choices[2], choices[3], ""])
                    # Japanese Row: "Japanese CSV is blank" -> I assume this means empty row or empty fields?
                    # "Japanese CSV: All fields blank." -> implies an empty row or a row with empty strings?
                    # Usually for alignment, we might want a row with empty strings.
                    jp_rows.append(["", "", "", "", "", ""])

            elif 'shortanswer' in q.get('class', []):
                # Descriptive question
                # English CSV: Q=Question text (English part), Anum=0, A1-A4=Empty
                # Japanese CSV: Q=Japanese text, Anum=0, A1-A4=Empty
                
                # If separation resulted in empty English part (e.g. only Japanese text found), 
                # we might need to check if the question is purely translation.
                # But usually there is "( )" or English words.
                
                final_eng_q = eng_q_text
                final_jp_q = jp_q_text
                
                # If we couldn't separate (e.g. no Japanese), put full text in English and empty in JP?
                if not final_jp_q and not has_japanese(full_text):
                    final_eng_q = full_text
                    final_jp_q = "" # No Japanese part
                
                # If we have Japanese but no English (rare?), maybe put Japanese in JP and empty in Eng?
                
                if final_eng_q not in seen_questions:
                    seen_questions.add(final_eng_q)
                    eng_rows.append([final_eng_q, "", "", "", "", "0"])
                    jp_rows.append([final_jp_q, "", "", "", "", "0"])

    # Write CSVs
    with open(output_eng, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(eng_rows)
        
    with open(output_jp, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(jp_rows)

if __name__ == "__main__":
    extract_questions("glammer-2A", "glammer-2A.csv", "glammer_ja.csv")

