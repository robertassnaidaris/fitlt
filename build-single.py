# -*- coding: utf-8 -*-
"""Supakuoja fitlt-pilna į vieną savarankišką HTML failą."""
import io, base64, json

s = io.open('index.html', encoding='utf-8').read()

def duri(path):
    return 'data:image/png;base64,' + base64.b64encode(io.open(path,'rb').read()).decode()
i192, i512 = duri('icon-192.png'), duri('icon-512.png')

m = json.load(io.open('manifest.json', encoding='utf-8'))
m['icons'] = [
    {"src": i192, "sizes": "192x192", "type": "image/png", "purpose": "any maskable"},
    {"src": i512, "sizes": "512x512", "type": "image/png", "purpose": "any maskable"},
]
m.pop('shortcuts', None)
m['start_url'] = '.'
man_uri = 'data:application/manifest+json;base64,' + base64.b64encode(
    json.dumps(m, ensure_ascii=False).encode('utf-8')).decode()

s = s.replace('<link rel="manifest" href="manifest.json">',
              '<link rel="manifest" href="%s">\n<link rel="apple-touch-icon" href="%s">' % (man_uri, i192))
s = s.replace("icon: 'icon-192.png'", "icon: '%s'" % i192)

i = s.index("// ═══ SERVICE WORKER + PUSH NOTIFICATIONS ════════════════")
j = s.index("async function askNotifications()")
s = s[:i] + """// ═══ PRANEŠIMAI ═════════════════════════════════════════
// Vieno failo versija: service worker neregistruojamas (iš failo neveikia),
// bet dienos priminimai per naršyklę veikia.
let swReg = null;
setTimeout(askNotifications, 30000);

""" + s[j:]

out = '/Users/robertas/Desktop/FitLT-pilna.html'
io.open(out,'w',encoding='utf-8').write(s)
print('sukurta:', out, '| baitų:', len(s.encode('utf-8')))
