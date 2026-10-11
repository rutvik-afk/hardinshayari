/* Merge newly exported competitor CSVs into the existing queue WITHOUT resetting
   `used` flags. Usage: node scripts/06-merge-new-csvs.mjs <csvPrefixDate e.g. 20261010> [maxKD] [minVol] */
import fs from 'node:fs';
import path from 'node:path';
import { CATEGORIES } from '../site.config.mjs';
const ROOT = path.resolve(import.meta.dirname, '..');
const RAW = path.join(ROOT, 'data/keywords-raw');
const QF = path.join(ROOT, 'data/keyword-queue.json');
const tag = process.argv[2] || '20261010';
const maxKD = +(process.argv[3] || 25), minVol = +(process.argv[4] || 100);

function parseCSV(t){const rows=[];let r=[],f='',q=false;for(let i=0;i<t.length;i++){const c=t[i];if(q){if(c==='"'){if(t[i+1]==='"'){f+='"';i++}else q=false}else f+=c}else if(c==='"')q=true;else if(c===','){r.push(f);f=''}else if(c==='\n'){r.push(f);rows.push(r);r=[];f=''}else if(c!=='\r')f+=c}if(f.length||r.length){r.push(f);rows.push(r)}return rows}

const RULES = [
  ['attitude-shayari', ['attitude','rangdari','badmash','badmashi','royal','nawabi','khiladi','dhasu','savage','swag']],
  ['sad-shayari', ['sad','dard','broken heart','breakup','tanhai','akela','alone','judai','bewafa','bewafai','udaas','udas','dhokha','dhoka']],
  ['love-shayari', ['love','ishq','pyar','pyaar','romantic','mohabbat','crush','propose','dil']],
  ['gulzar-shayari', ['gulzar','zakir khan','munawar','mohsin naqvi','jaun elia','ghalib','galib','rahat indori','faiz','wasim barelvi','bashir badr','nida fazli','parveen shakir','mirza','sahir']],
  ['english-shayari', ['english']],
];
const siteCats = new Set(CATEGORIES.map(c=>c.id));
const hasP=(k,p)=>new RegExp('\\b'+p.trim().replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i').test(k);
const classify=k=>{for(const [c,ps] of RULES) if(siteCats.has(c)&&ps.some(p=>hasP(k,p))) return c;return null};
const lang=k=>(/english/.test(k)&&!/hindi/.test(k))?'en':'hi';

const q = JSON.parse(fs.readFileSync(QF,'utf-8'));
const have = new Set(q.queue.map(x=>x.keyword.toLowerCase()));
const found = new Map();
for (const f of fs.readdirSync(RAW).filter(f=>f.includes(`Positions-in-${tag}`))) {
  const t = parseCSV(fs.readFileSync(path.join(RAW,f),'utf-8').replace(/^\uFEFF/,''));
  const ix = Object.fromEntries(t[0].map((h,i)=>[h.trim(),i]));
  for (const r of t.slice(1)) {
    if (r.length<5) continue;
    const keyword=(r[ix['Keyword']]||'').trim().toLowerCase();
    const volume=parseInt(r[ix['Search Volume']])||0, kd=parseInt(r[ix['Keyword Difficulty']]);
    if(!keyword||isNaN(kd)||volume<minVol||kd>maxKD||have.has(keyword)) continue;
    if(/[^\x00-\u024f\u0900-\u097f ]/.test(keyword)||/\.(com|in|net)\b|\b(xxx|sex|porn)\b/.test(keyword)) continue;
    if(!/shayari|shayri|sayari|status|quotes|sher|shayar|poetry|nazm|caption|lines/.test(keyword)) continue;
    const category=classify(keyword); if(!category) continue;
    const prev=found.get(keyword);
    if(!prev||volume>prev.volume) found.set(keyword,{keyword,volume,kd,category,lang:lang(keyword),score:volume/(kd+5),used:false,source:'competitor-csv-'+tag});
  }
}
const add=[...found.values()];
q.queue.push(...add);
fs.writeFileSync(QF,JSON.stringify(q,null,2)+'\n');
const by={};add.forEach(a=>by[a.category]=(by[a.category]||0)+1);
console.log('added',add.length,by);
