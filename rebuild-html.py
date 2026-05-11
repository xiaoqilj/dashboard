#!/usr/bin/env python3
"""Rebuild gba-research.html: remove inline DATA, add script src to data.js"""
import re

# Read base HTML (old version with inline DATA)
with open('gba-research.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find the script block
script_start = html.index('<script>')
script_end = html.index('</script>', script_start)
full_script = html[script_start+8:script_end]

# Within the script, DATA section starts at 'const DATA = {' and ends at '};'
data_start = full_script.index('const DATA = {')
data_end = full_script.index('};', data_start) + 2

print(f"DATA section: {data_start}-{data_end} ({data_end-data_start} bytes)")
print(f"Before DATA: {full_script[:data_start]}")
print(f"After DATA (first 100): {full_script[data_end:data_end+100]}")

# Build the two script blocks
before_data = full_script[:data_start]
after_data = full_script[data_end:]

# Reconstruct HTML
new_html = html[:script_start+8] + before_data + '\n' + \
    '<script src="gba-research-data.js"></script>\n<script>' + after_data + html[script_end:]

# Validate script tag balance
script_open = new_html.count('<script')
script_close = new_html.count('</script>')
print(f"\nScript tags: {script_open} open, {script_close} close - {'✅' if script_open == script_close else '❌'}")

# Write output
with open('gba-research.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print(f"Written: {len(new_html)} bytes")

# Verify no nested script tags
import re
nested = re.findall(r'<script[^>]*>.*?<script', new_html, re.DOTALL)
if nested:
    print(f"❌ Nested scripts detected!")
else:
    print("✅ No nested scripts")

# Verify data.js reference exists
if 'src="gba-research-data.js"' in new_html:
    print("✅ src reference found")
else:
    print("❌ src reference NOT found!")
