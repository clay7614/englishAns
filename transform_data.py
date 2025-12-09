
import re
import json

def main():
    with open('run_glammer_2A.py', 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract the dictionary part
    # Assuming data = { ... }
    # We can just exec the file content after removing the import and the function call
    
    content = re.sub(r'from process_csv import process_file', '', content)
    content = re.sub(r"process_file\('glammer-2A.csv', data\)", '', content)
    
    local_scope = {}
    exec(content, {}, local_scope)
    data = local_scope['data']
    
    # Update data
    for q, info in data.items():
        if info['anum'] > 0:
            if 'a_ja' in info:
                ans_idx = info['anum'] - 1
                if 0 <= ans_idx < len(info['a_ja']):
                    ans_ja = info['a_ja'][ans_idx]
                    # Simple replace
                    if ans_ja in info['q_ja']:
                        info['q_ja'] = info['q_ja'].replace(ans_ja, '----')
                    else:
                        # Try to handle cases where ans_ja might be slightly different
                        # e.g. "言う" vs "言うこと"
                        pass
        elif info['anum'] == 0:
            # Heuristic for anum 0?
            # Maybe I can't do it automatically.
            pass

    # Print the updated data dictionary in Python format
    print("data = {")
    for q, info in data.items():
        # Format the value as a dictionary
        # We need to ensure unicode characters are printed correctly, not escaped
        # json.dumps escapes non-ascii by default, ensure_ascii=False fixes that
        val_str = json.dumps(info, ensure_ascii=False)
        # json.dumps uses double quotes, which is fine for python dict keys/values usually
        # But we want to match the existing style if possible, but valid python is enough.
        print(f"    {json.dumps(q, ensure_ascii=False)}: {val_str},")
    print("}")

if __name__ == '__main__':
    main()
