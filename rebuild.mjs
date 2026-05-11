import fs from 'fs';

let html = fs.readFileSync('gba-research.html', 'utf8');

// 1. Add SZTU and SZPU institutions
const instEnd = html.indexOf('],\n    researchers:');
const lastBraceAt = html.lastIndexOf('}', instEnd)
const newInsts = `,
        { id: 'sztu', name: '深圳技术大学', type: '高校', location: '深圳坪山区', tek: 4, desc: '2018年设立，应用型公办本科，对标德国FH模式。17个学院40个专业，在校本科生14500+人。2025年12月揭牌四大研究院。广东省重点学科：光学工程、物联网工程、集成电路科学与工程' },
        { id: 'szpu', name: '深圳职业技术大学', type: '高校', location: '深圳南山区西丽', tek: 3, desc: '1993年建校，2023年升格职业本科。19个教学单位，26个本科专业。2025年招生10568人。与华为共建人工智能根技术产业学院。国家自然科学基金11项' }`;
html = html.slice(0, lastBraceAt + 1) + newInsts + '\n        ' + html.slice(lastBraceAt + 1);

// 2. Add researchers
const resEnd = html.indexOf('],\n    departments:');
const lastResBrace = html.lastIndexOf('}', resEnd)
const newRes = `,
        { id: 'chen_qiuming', name: '陈秋明', inst: 'sztu', research: ['高校管理'], notes: '深圳技术大学党委书记', directions: ['高校管理'] },
        { id: 'fu_jiyang', name: '傅继阳', inst: 'sztu', research: ['高校管理'], notes: '深圳技术大学校长', directions: ['高校管理'] },
        { id: 'zhou_cangtao', name: '周沧涛', inst: 'sztu', research: ['超强激光','先进材料'], notes: '工程物理学院院长。牵头深圳市超强激光与先进材料重点实验室', directions: ['超强激光','先进材料'] },
        { id: 'xu_jianling', name: '许建领', inst: 'szpu', research: ['职业教育','教育管理'], notes: '深圳职业技术大学校长', directions: ['职业教育','教育管理'] }`;
html = html.slice(0, lastResBrace + 1) + newRes + '\n        ' + html.slice(lastResBrace + 1);

// 3. Add list view CSS
const styleEnd = html.indexOf('</style>');
const listCss = `
        .view-toggle { display: flex; gap: 100px; justify-content: center; margin: 16px 0; }
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
html = html.slice(0, styleEnd) + listCss + html.slice(styleEnd);

// 4. Add toggle buttons + list view container before </body>
const bodyEnd = html.indexOf('</body>');
const toggleHtml = `
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
html = html.slice(0, bodyEnd) + toggleHtml + html.slice(bodyEnd);

// 5. Add JS functions before window.onload
const onloadPos = html.indexOf('window.onload = initGraph;');
const jsFns = `
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

        function renderList() {
            var container = document.getElementById('list-content');
            var sortedInsts = DATA.institutions.slice().sort(function(a, b) { return (b.tek || 0) - (a.tek || 0); });
            var html = '';
            sortedInsts.forEach(function(inst) {
                var researchers = DATA.researchers.filter(function(r) { return r.inst === inst.id; });
                var arrowDown = '\\u25bc';
                var arrowRight = '\\u25b6';
                var instHtml = '<div class=\"inst-section\">' +
                    '<div class=\"inst-header\" onclick=\"toggleInst(this)\">' +
                    '<span>' + inst.name + '</span>' +
                    '<span class=\"arrow\">' + arrowDown + '</span></div><div>';
                if (researchers.length > 0) {
                    instHtml += '<table><tr><th style=\"width:22%\">研究者</th><th style=\"width:38%\">研究方向</th><th style=\"width:40%\">所属方向</th></tr>';
                    researchers.forEach(function(r) {
                        var dirStr = (r.directions || []).map(function(d) {
                            return '<span class=\"tag\" style=\"background:rgba(206,147,216,0.15);color:#ce93d8;\">' + d + '</span>';
                        }).join(' ');
                        instHtml += '<tr><td>' + r.name + '</td><td>' + (r.research || []).join('、') + '</td><td>' + dirStr + '</td></tr>';
                    });
                    instHtml += '</table>';
                } else {
                    instHtml += '<div style=\"padding:12px;color:#666;text-align:center;\">暂无研究者</div>';
                }
                instHtml += '</div></div>';
                html += instHtml;
            });
            container.innerHTML = html;
        }

        function toggleInst(el) {
            var a = el.querySelector('.arrow');
            var content = el.nextElementSibling;
            if (window.getComputedStyle(content).display === 'none') {
                content.style.display = 'block';
                a.textContent = '\\u25bc';
            } else {
                content.style.display = 'none';
                a.textContent = '\\u25b6';
            }
        }
`;
html = html.slice(0, onloadPos) + jsFns + '\n        ' + html.slice(onloadPos);

// Validate
const opens = (html.match(/<script[^>]*>/g) || []).length;
const closes = (html.match(/<\/script>/g) || []).length;
console.log(`Scripts: ${opens} open, ${closes} close - ${opens === closes ? 'OK' : 'ISSUE'}`);
console.log(`SZTU refs: ${(html.match(/sztu/g) || []).length}`);
console.log(`SZPU refs: ${(html.match(/szpu/g) || []).length}`);
console.log(`switchView: ${(html.match(/switchView/g) || []).length}`);
console.log(`renderList: ${(html.match(/renderList/g) || []).length}`);
console.log(`list-view class: ${(html.match(/list-view/g) || []).length}`);
console.log(`btn-switch: ${(html.match(/btn-switch/g) || []).length}`);
console.log(`Size: ${html.length} bytes`);

// Write
fs.writeFileSync('gba-research.html', html, 'utf8');
console.log('Written ✅');
