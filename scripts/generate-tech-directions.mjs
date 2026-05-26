#!/usr/bin/env node
/**
 * generate-tech-directions.mjs
 * Updates tech-directions-data.json with latest timestamps and visit counts.
 * Called by the daily refresh-dashboard cron.
 */
import fs from 'fs';
import path from 'path';

const DIR = path.dirname(new URL(import.meta.url).pathname);
const DASHBOARD_DIR = path.resolve(DIR, '..');
const DATA_FILE = path.join(DASHBOARD_DIR, 'tech-directions-data.json');
const VISITS_FILE = path.join(DASHBOARD_DIR, 'visits.html');
const MEMORY_FILE = path.resolve(DASHBOARD_DIR, '../../MEMORY.md');

// Direction → client names for counting visits
// Each direction lists exact client names; counted once per matching line in visits table
const DIRECTION_CLIENTS = {
  'high-speed-digital': ['德明利', '皇虎科技', '皇虎', '微步科技', '微步', '西部数据', 'WD', '紫光同创', '联想'],
  'automotive-electronic': ['秋田微', '中兴微电子', '中兴微', '海尔', '中汽芯', '首传微', '许继', 'CVTE', '视源股份', 'SAE'],
  'power-semiconductor': ['安世半导体', '安世', '先科半导体', '先科'],
  'servo-motor': ['松下电机', '松下', '固胜'],
  'ai-data-center': ['英特尔', 'Intel', '海信', '长城电源', '锐凌无线', '全志科技', '光模块', 'CPO', 'NPO', 'LPO'],
  'general-tech-support': ['爱立信', '瑟为思', '港科大', '通瑞微', '信必通', 'DesignCon']
};

// Exclusions — these clients belong to a specific direction even if their name is generic
const CLIENT_TO_DIR = {
  '联想': 'high-speed-digital',
  '西部数据': 'high-speed-digital',
  '紫光同创': 'high-speed-digital',
  '皇虎': 'high-speed-digital',
  '微步': 'high-speed-digital',
  '德明利': 'high-speed-digital',
  '中兴微': 'automotive-electronic',
  '中兴微电子': 'automotive-electronic',
  '秋田微': 'automotive-electronic',
  '海尔': 'automotive-electronic',
  '首传微': 'automotive-electronic',
  '中汽芯': 'automotive-electronic',
  '许继': 'automotive-electronic',
  '安世半导体': 'power-semiconductor',
  '安世': 'power-semiconductor',
  '先科': 'power-semiconductor',
  '松下': 'servo-motor',
  '松下电机': 'servo-motor',
  '固胜': 'servo-motor',
  '英特尔': 'ai-data-center',
  '海信': 'ai-data-center',
  '长城电源': 'ai-data-center',
  '锐凌无线': 'ai-data-center',
  '全志科技': 'ai-data-center',
  '通瑞微': 'general-tech-support',
  '爱立信': 'general-tech-support'
};

function loadJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch { return null; }
}

function countVisitsByDirection(visitsHtml, memoryMd) {
  const text = (visitsHtml || '') + '\n' + (memoryMd || '');
  
  // Split into lines/entries (one visit per table row or per memory line)
  const lines = text.split('\n');
  
  const counts = {};
  for (const dirId of Object.keys(DIRECTION_CLIENTS)) {
    counts[dirId] = 0;
  }
  
  const visited = new Set(); // track visited lines to avoid double count
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Look for visit indicators
    if (!line.includes('拜访') && !line.includes('visit') && !line.includes('Visit') &&
        !line.includes('到货培训') && !line.includes('技术支持') && !line.includes('方案交流') &&
        !line.includes('技术答疑')) continue;
    if (visited.has(i)) continue;
    
    // Check which client this visit is about
    for (const [clientName, dirId] of Object.entries(CLIENT_TO_DIR)) {
      if (line.includes(clientName)) {
        counts[dirId] = (counts[dirId] || 0) + 1;
        visited.add(i);
        break;
      }
    }
  }
  
  return counts;
}

function main() {
  let data = loadJSON(DATA_FILE);
  if (!data) {
    console.error('No existing data file found at', DATA_FILE);
    process.exit(1);
  }

  // Read visits.html and MEMORY.md for visit counting
  let visitsHtml = '';
  let memoryMd = '';
  try { visitsHtml = fs.readFileSync(VISITS_FILE, 'utf-8'); } catch {}
  try { memoryMd = fs.readFileSync(MEMORY_FILE, 'utf-8'); } catch {}

  const visitCounts = countVisitsByDirection(visitsHtml, memoryMd);
  console.log('Visit counts:', visitCounts);

  // Update each direction
  for (const dir of data.directions) {
    const counted = visitCounts[dir.id];
    if (counted !== undefined) {
      dir.visitCount = counted;
    }
  }

  // Update meta
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  data.meta.lastUpdated = dateStr;

  // Recalculate totals
  const totalClients = new Set();
  const totalNeeds = new Set();
  let activeCount = 0;
  for (const dir of data.directions) {
    for (const c of dir.clients) totalClients.add(c);
    for (const n of dir.needs) totalNeeds.add(n);
    if (dir.status === 'active') activeCount++;
  }
  data.meta.totalClients = totalClients.size;
  data.meta.totalNeeds = totalNeeds.size;
  data.meta.activeFollowups = Math.max(activeCount, data.meta.activeFollowups);

  // Write
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log('✅ tech-directions-data.json updated:', dateStr);
}

main();
