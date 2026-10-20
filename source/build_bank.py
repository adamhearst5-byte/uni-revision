"""Convert the shared question bank (study-content/topics/*.json) into bank.js for the site."""
import json
import re
import sys
from pathlib import Path

src = Path(sys.argv[1])
out = Path(sys.argv[2])

MAP = {
    'com106-w1-database-basics': 'db1',
    'com106-w2-relational-model-keys': 'db2',
    'com106-w2-er-modelling-intro': 'db3',
    'com106-w3-er-modelling-2': 'db3',
    'com106-w3-mapping-relational': 'db4',
    'com106-w4-normalisation': 'db5',
    'com106-w5-intro-sql': 'db6',
    'com161-w1-how-programs-work': 'py1',
    'com161-w2-input-output': 'py2',
    'com161-w3-decisions': 'py3',
    'com161-w4-loops': 'py4',
    'com161-w5-functions': 'py5',
    'com161-ai-prompting': 'py6',
}


def fence(code):
    return '\n~~~\n' + code.rstrip('\n') + '\n~~~'


bank = {}
for f in sorted((src / 'topics').glob('*.json')):
    d = json.loads(f.read_text())
    key = MAP.get(d['id'])
    if not key:
        print('unmapped topic', d['id'], file=sys.stderr)
        continue
    b = bank.setdefault(key, {'cards': [], 'mcq': [], 'blanks': []})
    for c in d.get('flashcards', []):
        b['cards'].append({'id': c['id'], 'q': c['front'], 'a': c['back']})
    for m in d.get('multipleChoice', []):
        q = m['question'] + (fence(m['code']) if m.get('code') else '')
        b['mcq'].append({'id': m['id'], 'q': q, 'o': m['options'], 'a': m['answerIndex'], 'e': m.get('explanation', '')})
    for x in d.get('fillInTheBlank', []):
        parts = x['text'].split('___')
        if len(parts) - 1 != len(x['answers']):
            print('gap mismatch', x['id'], file=sys.stderr)
            continue
        text = parts[0]
        for ans, rest in zip(x['answers'], parts[1:]):
            text += '{{' + '|'.join(a.replace('|', '/') for a in ans) + '}}' + rest
        b['blanks'].append({'id': x['id'], 't': text, 'e': x.get('explanation', '')})

out.write_text('window.BANK = ' + json.dumps(bank, ensure_ascii=False) + ';\n')
print({k: {kk: len(vv) for kk, vv in v.items()} for k, v in bank.items()})
