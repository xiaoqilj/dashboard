#!/usr/bin/env python3
"""Add list view to GBA research graph page. Keep everything else unchanged."""
import json

with open('gba-research.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add CSS for list view inside the <style> block
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
            font-size: 0.8em; color: #888;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .list-view td {
            padding: 8px 12px; font-size: 0.85em;
            border-bottom: 1px solid rgba(255,255,255,0.05); vertical-align: top;
        }
        .list-view .inst-section {
            background: rgba(255,255,255,0.05);
            border-radius: 12px; margin-bottom: 16px; overflow: hidden;
        }
        .list-view .inst-header {
            background: linear-gradient(90deg, rgba(0,212,255,0.15), rgba(123,44,191,0.15));
            padding: 12px 16px; font-size: 1.05em; font-weight: bold;
            border-left: 4px solid #00d4ff; cursor: pointer;
        }
        .list-view .inst-header .arrow { float: right; }
        .list-view .no-data { text-align: center; color: #666; padding: 20px; }
        .btn-switch {
            padding: 8px 24px; border: 1px solid rgba(255,255,255,0.2);
            background: rgba(255,255,255,0.08); color: #e0e0e0;
            border-radius: 8px; cursor: pointer; font-size: 0.9em;
        }
        .btn-switch.active {
            background: linear-gradient(90deg, #00d4ff, #7b2cbf);
            border-color: transparent; color: #fff;
        }
'''
html = html[:style_end] + list_css + html[style_end:]

# 2. Add toggle button + list view container before </body>
body_close = html.index('</body>')
toggle_and_list = '''
        <div class="view-toggle">
            <button class="btn-switch active" onclick="switchView('graph')">📊 图谱视图</button>
            <button class="btn-switch" onclick="switchView('list')">📋 列表视图</button>
        </div>
        <div id="list-view" class="list-view">
            <div id="list-content">
                <div class="no-data">点击"列表视图"查看</div>
            </div>
        </div>
'''
html = html[:body_close] + toggle_and_list + html[body_close:]

# 3. Add JS functions before window.onload = initGraph;
onload_pos = html.index('window.onload = initGraph;')
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

        function renderList() {
            const container = document.getElementById('list-content');
            const sortedInsts = DATA.institutions.slice().sort((a, b) => (b.tek || 0) - (a.tek || 0));
            let html = '';
            sortedInsts.forEach(inst => {
                const researchers = DATA.researchers.filter(r => r.inst === inst.id);
                const tek = String.fromCharCode(0xD83D, 0xDD34).repeat(inst.tek || 0);
                html += '<div class="inst-section">' +
                    '<div class="inst-header" onclick="var a=this.querySelector(\\\'.arrow\\\\\');this.classList.toggle(\\\'collapsed\\\\\');a.textContent=a.textContent===\\\\'▼\\\\\'?\\\'▶\\\\\':\\\'▼\\\\\';">' +
                    '<span>' + inst.name + ' ' + (inst.type !== '高校' ? '(' + inst.type + ')' : '') +
                    ' <span style="color:#ff4444;font-size:0.9em;">' + tek + '</span></span>' +
                    '<span class="arrow">▼</span></div><div>' +
                    (researchers.length > 0 ?
                    '<table><tr><th style="width:22%">研究者</th><th style="width:38%">研究方向</th><th style="width:40%">所属方向</th></tr>' +
                    researchers.map(r =>
                        '<tr><td>' + r.name + '</td><td>' + (r.research || []).join('、') + '</td><td>' +
                        (r.directions || []).map(function(d) {
                            return '<span class="tag" style="background:rgba(206,147,216,0.15);color:#ce93d8;">' + d + '</span>';
                        }).join(' ') + '</td></tr>'
                    ).join('') + '</table>' :
                    '<div style="padding:12px;color:#666;text-align:center;">暂无研究者</div>') +
                    '</div></div>';
            });
            container.innerHTML = html;
        }
'''
html = html[:onload_pos] + new_fns + '\n        ' + html[onload_pos:]

# 4. Update window.onload to set button IDs
new_onload = '''window.onload = function() {
            document.querySelectorAll('.btn-switch')[0].id = 'btn-graph';
            document.querySelectorAll('.btn-switch')[1].id = 'btn-list';
            initGraph();
        };'''
html = html.replace('window.onload = initGraph;', new_onload, 1)

# Write
with open('gba-research.html', 'w', encoding='utf-8') as f:
    f.write(html)
print(f"Written: {len(html)} bytes ✅")
print(f"list-view: {html.count('list-view')} references")
print(f"switchView: {html.count('switchView')} references")
