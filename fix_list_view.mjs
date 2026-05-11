import fs from 'fs';
import { execSync } from 'child_process';

const h = execSync('git show 6cd2b8a:gba-research.html', {encoding:'utf8'});

// 1. CSS
const styleAt = h.indexOf('</style>');
const css = `
        .view-toggle { display: flex; gap: 100px; justify-content: center; margin: 10px 0; }
        .list-view { display: block; }
        .list-view table { width: 100%; border-collapse: collapse; margin: 0; }
        .list-view th { background: rgba(0,0,0,0.2); padding: 6px 10px; text-align: left; font-size: 0.78em; color: #999; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .list-view td { padding: 6px 10px; font-size: 0.82em; border-bottom: 1px solid rgba(255,255,255,0.05); vertical-align: top; }
        .list-view .inst-section { background: rgba(255,255,255,0.05); border-radius: 12px; margin-bottom: 16px; overflow: hidden; }
        .list-view .inst-header { background: linear-gradient(90deg, rgba(0,212,255,0.15), rgba(123,44,191,0.15)); padding: 12px 16px; font-size: 1.05em; font-weight: bold; border-left: 4px solid #00d4ff; cursor: pointer; }
        .list-view .inst-header .arrow { float: right; }
        .list-view .no-data { text-align: center; color: #666; padding: 20px; }
        .btn-switch { padding: 8px 24px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.08); color: #e0e0e0; border-radius: 8px; cursor: pointer; font-size: 0.9em; }
        .btn-switch.active { background: linear-gradient(90deg, #00d4ff, #7b2cbf); border-color: transparent; color: #fff; }
`;
let out = h.slice(0, styleAt) + css + h.slice(styleAt);

// 2. Toggle buttons and list container before </body>
const bodyAt = out.indexOf('</body>');
const toggleSection = `
        <div class="view-toggle">
            <button class="btn-switch active" onclick="switchView('graph')">📊 图谱视图</button>
            <button class="btn-switch" onclick="switchView('list')">📋 列表视图</button>
        </div>
        <div id="list-view" class="list-view">
            <div id="list-content">
                <div class="no-data">点击"列表视图"查看</div>
            </div>
        </div>
`;
out = out.slice(0, bodyAt) + toggleSection + out.slice(bodyAt);

// 3. JS functions before window.onload
const onloadAt = out.indexOf('window.onload = initGraph;');
const ArrowDown = String.fromCharCode(9660);
const ArrowRight = String.fromCharCode(9654);
const functions = `
        function switchView(view) {
            if (view === 'graph') {
                document.querySelectorAll('.btn-switch')[0].classList.add('active');
                document.querySelectorAll('.btn-switch')[1].classList.remove('active');
                document.getElementById('graph-container').style.display = 'block';
                document.getElementById('detail-panel').style.display = 'block';
                document.getElementById('list-view').style.display = 'none';
            } else {
                document.querySelectorAll('.btn-switch')[0].classList.remove('active');
                document.querySelectorAll('.btn-switch')[1].classList.add('active');
                document.getElementById('graph-container').style.display = 'none';
                document.getElementById('detail-panel').style.display = 'none';
                document.getElementById('list-view').style.display = 'block';
                renderList();
            }
        }
        function toggleInst(el) {
            var a = el.querySelector('.arrow');
            var c = el.nextElementSibling;
            if (c.style.display === 'none') {
                c.style.display = 'block';
                a.textContent = '${ArrowDown}';
            } else {
                c.style.display = 'none';
                a.textContent = '${ArrowRight}';
            }
        }
        function renderList() {
            var con = document.getElementById('list-content');
            var sis = DATA.institutions.slice().sort(function(a,b){return (b.tek||0)-(a.tek||0);});
            var html = '';
            sis.forEach(function(inst) {
                var rs = DATA.researchers.filter(function(r){return r.inst===inst.id;});
                html += '<div class="inst-section"><div class="inst-header" onclick="toggleInst(this)"><span>' + inst.name + '</span><span class="arrow">${ArrowDown}</span></div><div>';
                if (rs.length > 0) {
                    html += '<table><tr><th style="width:22%">研究者</th><th style="width:38%">研究方向</th><th style="width:40%">所属方向</th></tr>';
                    rs.forEach(function(r) {
                        var dirs = (r.directions||[]).map(function(d){return '<span class="tag" style="background:rgba(206,147,216,0.15);color:#ce93d8;">'+d+'</span>';}).join(' ');
                        html += '<tr><td>' + r.name + '</td><td>' + (r.research||[]).join('、') + '</td><td>' + dirs + '</td></tr>';
                    });
                    html += '</table>';
                } else {
                    html += '<div style="padding:12px;color:#666;text-align:center;">暂无研究者</div>';
                }
                html += '</div></div>';
            });
            con.innerHTML = html;
        }
`;
out = out.slice(0, onloadAt) + functions + out.slice(onloadAt);

// Validate
const scriptOpen = (out.match(/<script[^>]*>/g)||[]).length;
const scriptClose = (out.match(/<\/script>/g)||[]).length;
console.log('Scripts:', scriptOpen, 'open,', scriptClose, 'close', scriptOpen===scriptClose?'OK':'ISSUE');
console.log('SZTU refs:', (out.match(/sztu/g)||[]).length);
console.log('SZPU refs:', (out.match(/szpu/g)||[]).length);
console.log('switchView:', (out.match(/switchView/g)||[]).length, 'renderList:', (out.match(/renderList/g)||[]).length);
console.log('toggleInst:', (out.match(/toggleInst/g)||[]).length);
console.log('Size:', out.length, 'bytes');

fs.writeFileSync('gba-research.html', out, 'utf8');

// Verify DATA parse
const ds = out.indexOf('const DATA = {');
const de = out.indexOf('};', ds) + 1;
let DATA;
eval(out.substring(ds, de+1));
console.log('DATA Insts:', DATA.institutions.length);
const sztu = DATA.institutions.find(i=>i.id==='sztu');
console.log('SZTU:', sztu?.name, 'tek:', sztu?.tek);
