import {readFileSync} from 'node:fs';
const spec=readFileSync(new URL('../planning/WORLD10.md',import.meta.url),'utf8');
const bank=JSON.parse(readFileSync(new URL('../dist/data/question-bank.json',import.meta.url),'utf8')).slice(45,51);
const errors=[],check=(ok,message)=>{if(!ok)errors.push(message)};
const expected=[
  [46,'ทางเดินแห่งเขาวงกต',700-289,'truth-maze-routes'],
  [47,'หุบเขาแห่งความเงียบสงัด',9*4,'silent-dragonfly-signal'],
  [48,'คุกใต้ดินแห่งความมืด',378+155,'dungeon-allies-unite'],
  [49,'ป่าแห่งเสียงดนตรี',920-473,'joy-note-restorer'],
  [50,'ทะเลสาบแห่งการสะท้อน',6*8,'six-mirror-heartlight']
];
expected.forEach(([id,title,answer,type],index)=>{const source=bank[index];check(source?.id===id&&source.title===title,`ตอน ${id} ต้องตรง Question Bank`);check(source?.answer===answer,`คำตอบตอน ${id} ไม่ถูกต้อง`);check(spec.includes(title)&&spec.includes(String(answer))&&spec.includes(type),`spec ตอน ${id} ขาดชื่อ คำตอบ หรือกลไก`)});
check(spec.includes('700 → 500 → 420 → 411'),'ลำดับตอน 46 ไม่ครบ');
check(spec.includes('4, 8, 12, 16, 20, 24, 28, 32, 36'),'ลำดับตอน 47 ไม่ครบ');
check(spec.includes('378 → 478 → 528 → 533'),'ลำดับตอน 48 ไม่ครบ');
check(spec.includes('920 → 520 → 450 → 447'),'ลำดับตอน 49 ไม่ครบ');
check(spec.includes('8, 16, 24, 32, 40, 48'),'ลำดับตอน 50 ไม่ครบ');
check(spec.includes('9/10')&&spec.includes('10/10')&&spec.includes('ครบทั้ง 10 ชิ้น'),'เส้นเรื่องผลึก 9/10 → 10/10 ไม่ครบ');
check(bank[5]?.title==='ดินแดนแห่งเมฆหมอก'&&spec.includes('ตอนที่ 51 “ดินแดนแห่งเมฆหมอก”'),'ทางเชื่อมตอน 51 ไม่ตรงต้นฉบับ');
check(spec.includes('390×844')&&spec.includes('820×1180')&&spec.includes('44px')&&spec.includes('reduced motion'),'responsive contract ไม่ครบ');
if(errors.length){console.error(errors.map(error=>`✗ ${error}`).join('\n'));process.exit(1)}
console.log('✓ World 10 specification ผ่าน: ตอน 46–50 · คำตอบ 411, 36, 533, 447, 48 · 5 กลไก non-quiz · ผลึก 9/10 → 10/10 · เชื่อมตอน 51');
