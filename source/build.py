"""Assemble the study site: dist/study.html (artifact fragment) and dist/index.html (standalone offline page)."""
from pathlib import Path

here = Path(__file__).parent
dist = here / 'dist'
dist.mkdir(exist_ok=True)

shell = (here / 'shell.html').read_text()
css = (here / 'app.css').read_text()
data = '\n'.join((here / f).read_text() for f in ['content-db.js', 'content-py.js', 'bank.js'])
app = (here / 'app.js').read_text()

for name, s in [('data', data), ('app', app)]:
    assert '</script' not in s.lower(), name + ' contains a closing script tag'

page = shell.replace('/*CSS*/', css).replace('/*DATA*/', data).replace('/*APP*/', app)
(dist / 'study.html').write_text(page)

standalone = ('<!doctype html>\n<html lang="en-GB">\n<head>\n<meta charset="utf-8">\n'
              '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
              + page.replace('<header class="top">', '</head>\n<body>\n<header class="top">', 1)
              + '\n</body>\n</html>\n')
(dist / 'index.html').write_text(standalone)
print('study.html', len(page), 'bytes; index.html', len(standalone), 'bytes')
