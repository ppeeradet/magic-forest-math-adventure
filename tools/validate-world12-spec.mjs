import {readFileSync} from 'node:fs';
const spec=readFileSync(new URL('../planning/WORLD12.md',import.meta.url),'utf8');
const all=JSON.parse(readFileSync(new URL('../dist/data/question-bank.json',import.meta.url),'utf8'));
const bank=all.filter(item=>item.id>=56&&item.id<=60);
const errors=[],check=(ok,message)=>{if(!ok)errors.push(message)};
const expected=[
  [56,'ทะเลสาบแห่งแสงจันทร์',7*2,'moon-moth-antenna-lights'],
  [57,'ป่าแห่งความสงบ',468+275,'peace-energy-canopy'],
  [58,'หุบเขาแห่งความกล้าหาญ',900-387,'courage-shadow-release'],
  [59,'ลำธารแห่งความบริสุทธิ์',9*3,'healing-droplet-chain'],
  [60,'ถ้ำแห่งอัญมณี',149+285,'gem-wall-mosaic']
];
expected.forEach(([id,title,answer,type],index)=>{
  const source=bank[index];
  check(source?.id===id&&source.title===title,`ตอน ${id} ต้องตรง Question Bank`);
  check(source?.answer===answer,`คำตอบตอน ${id} ไม่ถูกต้อง`);
  check(spec.includes(title)&&spec.includes(String(answer))&&spec.includes(type),`spec ตอน ${id} ขาดชื่อ คำตอบ หรือกลไก`);
});
check(spec.includes('2, 4, 6, 8, 10, 12, 14'),'ลำดับตอน 56 ไม่ครบ');
check(spec.includes('468 → 668 → 738 → 743'),'ลำดับตอน 57 ไม่ครบ');
check(spec.includes('900 → 600 → 520 → 513'),'ลำดับตอน 58 ไม่ครบ');
check(spec.includes('3, 6, 9, 12, 15, 18, 21, 24, 27'),'ลำดับตอน 59 ไม่ครบ');
check(spec.includes('149 → 349 → 429 → 434'),'ลำดับตอน 60 ไม่ครบ');
check(spec.includes('10/10')&&spec.includes('ไม่เพิ่มผลึกหัวใจชิ้นใหม่'),'ความต่อเนื่องหลังผลึกครบ 10/10 ไม่ชัดเจน');
check(all.find(item=>item.id===61)?.title==='ป่าแห่งความเก่าแก่'&&spec.includes('ตอนที่ 61 “ป่าแห่งความเก่าแก่”'),'ทางเชื่อมตอน 61 ไม่ตรงต้นฉบับ');
check(spec.includes('390×844')&&spec.includes('820×1180')&&spec.includes('44px')&&spec.includes('reduced motion'),'responsive contract ไม่ครบ');
check(spec.includes('native `button`')&&spec.includes('aria-live')&&spec.includes('ปุ่มเริ่มใหม่'),'interaction/accessibility contract ไม่ครบ');
if(errors.length){console.error(errors.map(error=>`✗ ${error}`).join('\n'));process.exit(1)}
console.log('✓ World 12 specification ผ่าน: ตอน 56–60 · คำตอบ 14, 743, 513, 27, 434 · 5 กลไก non-quiz · ผลึกคงที่ 10/10 · เชื่อมตอน 61');
