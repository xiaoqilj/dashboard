#!/usr/bin/env python3
"""Append new researchers to the existing gba-research.html DATA section."""
import json
import re
import subprocess

# Read YAML to get new researchers
import yaml
with open('/home/sandbox/.openclaw/workspace/knowledge/gba-research/01-relationship-graph.yaml', 'r') as f:
    data = yaml.safe_load(f)

# Read clean base HTML
with open('/home/sandbox/.openclaw/workspace/repos/dashboard/gba-research.html', 'r') as f:
    html = f.read()

# Direction name mapping
def dir_name(d):
    m = {
        "microelectronics": "微电子/芯片", "rf-ic": "射频/微波", "ai": "人工智能",
        "optoelectronics": "光电", "communication": "通信", "cs": "计算机",
        "semiconductor-materials": "半导体材料", "civil-engineering": "土木工程",
        "new-materials": "新材料", "battery": "电池/储能", "biomedical": "生物医学",
        "optical-communication": "光通信", "integrated-photonics": "集成光子学",
        "6g": "6G通信", "computing-network": "算力网络", "medicine": "医学",
        "quantum": "量子科技", "superconductivity": "超导", "new-energy": "新能源",
        "physics": "物理", "materials": "材料", "electronics": "电子",
        "robotics": "机器人/伺服", "iot": "物联网", "low-altitude-economy": "低空经济",
        "power-semiconductor": "功率半导体", "big-data": "大数据",
        "bio-science": "生物科学", "advanced-manufacturing": "先进制造",
        "digital-tech": "数字技术", "network-security": "网络安全",
        "photonics": "光子学", "autonomous-driving": "自动驾驶", "car-tech": "汽车技术",
        "cloud": "云计算", "game": "游戏", "llm": "大语言模型", "uav": "无人机",
        "ai-chip": "AI芯片", "semiconductor": "半导体",
        "advanced-engineering": "先进工程", "finance": "金融", "it": "信息技术",
        "life-science": "生命科学", "material-science": "材料科学",
        "quantum-chip": "量子芯片", "quantum-computing": "量子计算",
        "quantum-material": "量子材料", "quantum-sensing": "量子传感",
        "neuroscience": "神经科学", "biomedicine": "生物医学",
        "energy-harvesting": "能量采集", "flexible-electronics": "柔性电子",
        "piezoelectric": "压电", "vibration": "振动", "automotive": "汽车",
        "ev": "电动车", "computer-vision": "计算机视觉", "database": "数据库",
        "optical": "光学", "os": "操作系统", "organic-solar-cell": "有机光伏"
    }
    return m.get(d, d)

def esc(s):
    if not isinstance(s, str):
        return s
    return s.replace("'", "\\'")

# Find existing researcher IDs in the HTML
rs_start = html.index("researchers: [")
rs_array_start = html.index("[", rs_start)

# Find matching close bracket
depth = 1
i = rs_array_start + 1
while depth > 0 and i < len(html):
    if html[i] == "[":
        depth += 1
    if html[i] == "]":
        depth -= 1
    i += 1
rs_close = i - 1

existing_section = html[rs_array_start:rs_close]
existing_ids = set(re.findall(r"id:\s+'([^']+)'", existing_section))
print(f"Existing researchers: {len(existing_ids)}")

# Find new ones
all_ids = [r["id"] for r in data["researchers"]]
new_ids = [i for i in all_ids if i not in existing_ids]
print(f"New researchers to add: {len(new_ids)}")
print(f"New IDs: {new_ids}")

# Generate new entries - ALL with trailing commas
new_entries = []
for r in data["researchers"]:
    if r["id"] not in new_ids:
        continue
    inst = r.get("institution", "")
    if not inst and r.get("affiliations"):
        inst = r["affiliations"][0]
    dirs = [dir_name(d) for d in r.get("directions", [])]
    
    entry = f"        {{ id: '{r['id']}', name: '{esc(r['name'])}', inst: '{inst}'"
    if r.get("research"):
        entry += f", research: ['{esc(x)}' for x in r['research']".replace('[\'', "['")
        research_str = "[" + ", ".join([f"'{esc(x)}'" for x in r["research"]]) + "]"
        entry = f"        {{ id: '{r['id']}', name: '{esc(r['name'])}', inst: '{inst}'"
        entry += f", research: {research_str}"
    if r.get("notes"):
        entry += f", notes: '{esc(r['notes'][:60])}'"
    if dirs:
        entry += f", directions: [{', '.join([f\"'{d}'\" for d in dirs])}]"
    entry += " },"
    new_entries.append(entry)

new_text = "\n".join(new_entries)

# Check: the last entry in existing section ends at rs_close - 1
# Existing last researcher has no comma. We need to add one.
# The ] is at rs_close. Before it is whitespace+newline.
# Strategy: add comma before whitespace that precedes ]
before_close = html[rs_close-20:rs_close]
print(f"\nBefore close bracket: {repr(before_close)}")

# Add comma after the last entry, then append new entries before ]
last_entry_end = rs_close
# Walk backwards to find the end of last entry
# Find last } before ]
last_brace = html.rindex("}", 0, rs_close)
# Insert comma after the last }, then new entries, then whitespace+]
after_last_brace = html[last_brace+1:rs_close]
print(f"After last brace: {repr(after_last_brace)}")

# Build: insert comma + new entries + restore close
comma_insert = ","  # add comma to close the last entry
new_html = html[:last_brace+1] + comma_insert + "\n" + new_text + "\n        " + html[last_brace+1:]

print(f"\nOriginal size: {len(html)}")
print(f"New size: {len(new_html)}")

# Validate with node
with open("/tmp/test_fix.html", "w") as f:
    f.write(new_html)

result = subprocess.run([
    "node", "-e",
    """
const fs=require("fs");
const h=fs.readFileSync("/tmp/test_fix.html","utf8");
const ds=h.indexOf("const DATA = {");
let depth=0,de=ds;
for(let i=ds;i<h.length;i++){if(h[i]==="{")depth++;if(h[i]==="}"){depth--;if(depth===0){de=i+1;break;}}}
const dataStr=h.substring(ds,de);
try{var DATA;eval(dataStr);console.log("OK, Inst:",DATA.institutions.length,"Res:",DATA.researchers.length);}catch(e){console.log("FAIL:",e.message);}
"""
], capture_output=True, text=True, timeout=30)
print(f"\nNode validation: {result.stdout.strip()}")
if result.returncode != 0:
    print(f"Error: {result.stderr.strip()}")
    exit(1)

# Write final
with open('/home/sandbox/.openclaw/workspace/repos/dashboard/gba-research.html', 'w') as f:
    f.write(new_html)
print("Written ✅")

# Count SZU/SUSTech
import subprocess2
# just do inline count
szu_count = new_html.count("'szu'")
sustech_count = new_html.count("'sustech'")
mao_count = new_html.count("毛军发")
xue_count = new_html.count("薛其坤")
print(f"SZU refs: {szu_count}, SUSTech refs: {sustech_count}")
print(f"毛军发: {mao_count}, 薛其琻: {xue_count}")
