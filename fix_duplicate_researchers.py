import json
import re

with open('/home/sandbox/.openclaw/workspace/repos/dashboard/gba-research.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract DATA section
ds = html.index('const DATA = {')
de = html.index('};', ds) + 1
data_str = html[ds:de+1]

# We need to find and remove duplicate researchers for szu and sustech
# Strategy: find all researcher blocks, deduplicate by id, keep last occurrence

# Parse researchers section
res_start = data_str.index('researchers: [') + len('researchers: [')
res_end = data_str.index('],\n    projects:')
res_section = data_str[res_start:res_end]

# Find all researcher objects (they start with {)
import re
researcher_blocks = re.findall(r'\{[^}]+\}', res_section)

# Parse each researcher
parsed_res = []
for block in researcher_blocks:
    try:
        # Simple parsing
        m = re.search(r"id: '([^']+)'", block)
        inst_m = re.search(r"inst: '([^']+)'", block)
        name_m = re.search(r"name: '([^']+)'", block)
        if m and inst_m and name_m:
            parsed_res.append({
                'block': block,
                'id': m.group(1),
                'inst': inst_m.group(1),
                'name': name_m.group(1)
            })
    except:
        pass

# Count SZU and SUSTech researchers
szu_res = [r for r in parsed_res if r['inst'] == 'szu']
sustech_res = [r for r in parsed_res if r['inst'] == 'sustech']

print(f"Current SZU researchers: {len(szu_res)}")
for r in szu_res:
    print(f"  {r['id']}: {r['name']}")

print(f"\nCurrent SUSTech researchers: {len(sustech_res)}")
for r in sustech_res:
    print(f"  {r['id']}: {r['name']}")

# Find duplicates by id
szu_ids = [r['id'] for r in szu_res]
sustech_ids = [r['id'] for r in sustech_res]

from collections import Counter
dups_szu = [k for k, v in Counter(szu_ids).items() if v > 1]
dups_sustech = [k for k, v in Counter(sustech_ids).items() if v > 1]
print(f"\nDuplicate SZU IDs: {dups_szu}")
print(f"Duplicate SUSTech IDs: {dups_sustech}")
