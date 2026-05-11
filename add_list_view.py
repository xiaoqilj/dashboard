#!/usr/bin/env python3
"""Add list view to GBA research graph page + fix directions SZU/SUSTech + detail panel"""
import re

with open('gba-research.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ====== 1. Fix directions: replace insts arrays with YAML-accurate data ======
import yaml as pyyaml
with open('/home/sandbox/.openclaw/workspace/knowledge/gba-research/01-relationship-graph.yaml', 'r') as f:
    yd = pyyaml.safe_load(f)

def esc(s):
    if not isinstance(s, str): return s
    return s.replace("'", "\\'")

# Find directions array
arr_start = html.index('[', html.index('directions: ['))
depth = 1
i = arr_start + 1
while depth > 0 and i < len(html):
    if html[i] == '[': depth += 1
    if html[i] == ']': depth -= 1
    i += 1
arr_close = i - 1

new_dirs = []
for d in yd['directions']:
    entry = f"        {{ id: '{d['id']}', name: '{esc(d['name'])}'"
    if d.get('institutions'):
        entry += f", insts: {json.dumps(d['institutions'])}"
    if d.get('test_needs'):
        entry += f", equip: '{esc(d['test_needs'])}'"
    if d.get('tek_opportunity'):
        entry += f", tek: {d['tek_opportunity']}"
    entry += " },"
    new_dirs.append(entry)

html = html[:arr_start] + "[\n" + "\n".join(new_dirs) + "\n        ]" + html[arr_close+1:]

# ====== 2. Add directions display to researcher detail panel ======
old_detail = "${r.paper ? `<div class=\\'info-row\\'><span class=\\'info-label\\'>代表性论文</span><span class=\\'info-value\\'>${r.paper}</span></div>` : ''}\n                `;"
new_detail = "${(r.directions||[]).length ? `<div class=\\'info-row\\'><span class=\\'info-label\\'>所属方向</span><span class=\\'info-value\\'>${r.directions.join('、')}</span></div>` : ''}\n                    ${r.paper ? `<div class=\\'info-row\\'><span class=\\'info-label\\'>代表性论文</span><span class=\\'info-value\\'>${r.paper}</span></div>` : ''}\n                `;"
if old_detail in html:
    html = html.replace(old_detail, new_detail, 1)
    print("✅ Added directions display")

# ====== 3. Add list view CSS inside <style> ======
style_end = html.index('</style>')
list_css = '''
        .view-toggle {
            display: flex; gap: 10px; justify-content: center; margin: 16px 0;
        }
        .list-view { display: none; }
        .list-view table {
            width: 100%; border-collapse: collapse; margin: 0;
        }
        .list-view th {
            background: rgba(0,0,0,0.2); padding: 8px 12px; text-align: left;
            font-size: 0.8em; color: #888; font-weight: normal;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .list-view td {
            padding: 8px 12px; font-size: 0.85em;
            border-bottom: 1px solid rgba(255,255,255,0.05); vertical-align: top;
        }
        .list-view .inst-section {
            background: rgba(255,255,255,0.05); border-radius: 12px; margin-bottom: 16px; overflow: hidden;
        }
        .list-view .inst-header {
            background: linear-gradient(90deg, rgba(0,212,255,0.15), rgba(123,44,191,0.15));
            padding: 12px 16px; font-size: 1.05em; font-weight: bold;
            border-left: 4px solid #00d4ff; cursor: pointer;
        }
        .list-view .inst-header .arrow {
            float: right; transition: transform 0.3s;
        }
        .list-view .inst-header.collapsed .arrow {
            transform: rotate(-90deg);
        }
        .list-view .no-data { text-align: center; color: #666; padding: 20px; }
        .btn-switch {
            padding: 8px 24px; border: 1px solid rgba(255,255,255,0.2);
            background: rgba(255,255,255,0.08); color: #e0e0e0;
            border-radius: 8px; cursor: pointer; font-size: 0.9em;
            transition: all 0.2s;
        }
        .btn-switch.active {
            background: linear-gradient(90deg, #00d4ff, #7b2cbf);
            border-color: transparent; color: #fff;
        }
        .tag {
            display: inline-block; padding: 1px 6px; border-radius: 3px;
            font-size: 0.75em; margin: 1px 2px;
        }
'''
html = html[:style_end] + list_css + html[style_end:]

# ====== 4. Add toggle button and list view container ======
body_close = html.index('</body>')
toggle_and_list = '''
        <div class='view-toggle'>
            <button class='btn-switch active' onclick='switchView("graph")'>📊 图谱视图</button>
            <button class='btn-switch' onclick='switchView("list")'>📋 列表视图</button>
        </div>
        <div id='list-view' class='list-view'>
            <div id='list-content'>
                <div class='no-data'>点击"列表视图"查看</div>
            </div>
        </div>
'''
html = html[:body_close] + toggle_and_list + html[body_close:]

# ====== 5. Add JS functions ======
script_close = html.rindex('</script>')
# Find the last occurrence of </script> - that's our main script end
# Add functions before window.onload
onload_pos = html.rindex('window.onload = initGraph;')

new_fns = '''
        // ==================== LIST VIEW ====================
        function switchView(view) {
            document.getElementById('btn-graph').className = view === 'graph' ? 'btn-switch active' : 'btn-switch';
            document.getElementById('btn-list').className = view === 'list' ? 'btn-switch active' : 'btn-switch';
            document.getElementById('graph-container').style.display = view === 'graph' ? 'block' : 'none';
            document.getElementById('detail-panel').style.display = view === 'graph' ? 'block' : 'none';
            document.getElementById('list-view').style.display = view === 'list' ? 'block' : 'none';
            if (view === 'list') renderList();
        }
        // Assign IDs
        window.onload = function() {
            const btnGraph = document.querySelector('.btn-switch');
            const btnList = document.querySelectorAll('.btn-switch')[1];
            btnGraph.id = 'btn-graph';
            btnList.id = 'btn-list';
            initGraph();
        };

        function renderList() {
            const container = document.getElementById('list-content');
            const sortedInsts = DATA.institutions.slice().sort((a, b) => (b.tek||0) - (a.tek||0));
            let html = '';
            sortedInsts.forEach(inst => {
                const researchers = DATA.researchers.filter(r => r.inst === inst.id);
                const tek = '🔴'.repeat(inst.tek||0);
                html += `<div class='inst-section'>
                    <div class='inst-header' onclick="this.classList.toggle('collapsed');var a=this.querySelector('.arrow');a.textContent=a.textContent==='▼'?'▶':'▼';">
                        <span>${inst.name} ${inst.type !== '高校' ? '(' + inst.type + ')' : ''} <span style='color:#ff4444;font-size:0.9em;'>${tek}</span></span>
                        <span class='arrow'>▼</span>
                    </div>
                    <div>` +
                    (researchers.length > 0 ? `<table><tr><th style='width:22%'>研究者</th><th style='width:38%'>研究方向</th><th style='width:40%'>所属方向</th></tr>` +
                    researchers.map(r => `<tr><td>${r.name}</td><td>${(r.research||[]).join('、')}</td><td>${(r.directions||[]).map(d => `<span class='tag' style='background:rgba(206,147,216,0.15);color:#ce93d8;'>${d}</span>`).join(' ')}</td></tr>`).join('') + `</table>` : `<div style='padding:12px;color:#666;text-align:center;'>暂无研究者</div>`) +
                    `</div></div>`;
            });
            container.innerHTML = html;
        }
'''
html = html[:onload_pos] + new_fns + '\n        ' + html[onload_pos:]

# ====== 6. Validate ======
import subprocess
with open('/tmp/test_list.html', 'w', encoding='utf-8') as f:
    f.write(html)

result = subprocess.run(['node', '-e', f'''
const fs=require("fs");
const h=fs.readFileSync("/tmp/test_list.html","utf8");
// Check script tags
const o=(h.match(/<script/g)||[]).length;
const c=(h.match(/<\\/script>/g)||[]).length;
console.log("Scripts:", o, "/", c, o===c?"OK":"FAIL");
// Check DATA parses
const ds=h.indexOf("const DATA = {{");
let depth=0,de=ds;
for(let i=ds;i<h.length;i++){{if(h[i]==="{{")depth++;if(h[i]==="}}"){{depth--;if(depth===0){{de=i+1;break;}}}}}}
try{{var DATA;eval(h.substring(ds,de));console.log("DATA OK - Inst:",DATA.institutions.length,"Res:",DATA.researchers.length,"SZU:",DATA.researchers.filter(r=>r.inst==="szu").length,"SUSTech:",DATA.researchers.filter(r=>r.inst==="sustech").length);}}catch(e){{console.log("DATA FAIL:",e.message);}}
'''], capture_output=True, text=True, timeout=15)
print(f"Validation: {result.stdout.strip()}")

with open('/home/sandbox/.openclaw/workspace/repos/dashboard/gba-research.html', 'w', encoding='utf-8') as f:
    f.write(html)
print(f"Written: {len(html)} bytes ✅")
