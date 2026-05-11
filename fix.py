with open('gba-research.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find the exact text to replace
old = '''                    ${r.paper ? `<div class='info-row'><span class='info-label'>代表性论文</span><span class='info-value'>${r.paper}</span></div>` : ''}
                `;'''

new = '''                    ${(r.directions||[]).length ? `<div class='info-row'><span class='info-label'>所属方向</span><span class='info-value'>${r.directions.join('、')}</span></div>` : ''}
                    ${r.paper ? `<div class='info-row'><span class='info-label'>代表性论文</span><span class='info-value'>${r.paper}</span></div>` : ''}
                `;'''

if old in html:
    html = html.replace(old, new, 1)
    print("✅ Replaced successfully")
else:
    print("❌ Text not found exactly")
    # Debug: find the '代表性论文' line in context
    idx = html.find('r.paper ?')
    if idx > 0:
        print("Found at", idx, ":", html[idx:idx+200])

with open('gba-research.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Written:", len(html), "bytes")
