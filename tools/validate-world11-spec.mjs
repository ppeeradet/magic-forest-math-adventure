import {readFileSync} from 'node:fs';
const spec=readFileSync(new URL('../planning/WORLD11.md',import.meta.url),'utf8');
const all=JSON.parse(readFileSync(new URL('../dist/data/question-bank.json',import.meta.url),'utf8'));
const bank=all.filter(item=>item.id>=51&&item.id<=55);
const errors=[],check=(ok,message)=>{if(!ok)errors.push(message)};
const expected=[
  [51,'ดินแดนแห่งเมฆหมอก',286+357,'cloud-flock-merger'],
  [52,'อุโมงค์แห่งลมกรด',700-284,'cyclone-power-release'],
  [53,'ทุ่งหญ้าดอกไม้ไฟ',7*9,'firework-flower-sparks'],
  [54,'ป่าแห่งความลับ',197+358,'secret-vine-unweaver'],
  [55,'ถ้ำแห่งเสียงกระซิบ',840-396,'whisper-cave-restorer']
];
expected.forEach(([id,title,answer,type],index)=>{
  const source=bank[index];
  check(source?.id===id&&source.title===title,`ตอน ${id} ต้องตรง Question Bank`);
  check(source?.answer===answer,`คำตอบตอน ${id} ไม่ถูกต้อง`);
  check(spec.includes(title)&&spec.includes(String(answer))&&spec.includes(type),`spec ตอน ${id} ขาดชื่อ คำตอบ หรือกลไก`);
});
check(spec.includes('286 → 586 → 636 → 643'),'ลำดับตอน 51 ไม่ครบ');
check(spec.includes('700 → 500 → 420 → 416'),'ลำดับตอน 52 ไม่ครบ');
check(spec.includes('9, 18, 27, 36, 45, 54, 63'),'ลำดับตอน 53 ไม่ครบ');
check(spec.includes('197 → 497 → 547 → 555'),'ลำดับตอน 54 ไม่ครบ');
check(spec.includes('840 → 540 → 450 → 444'),'ลำดับตอน 55 ไม่ครบ');
check(spec.includes('10/10')&&spec.includes('ไม่เพิ่มผลึกหัวใจชิ้นใหม่'),'ความต่อเนื่องหลังผลึกครบ 10/10 ไม่ชัดเจน');
check(all.find(item=>item.id===56)?.title==='ทะเลสาบแห่งแสงจันทร์'&&spec.includes('ตอนที่ 56 “ทะเลสาบแห่งแสงจันทร์”'),'ทางเชื่อมตอน 56 ไม่ตรงต้นฉบับ');
check(spec.includes('390×844')&&spec.includes('820×1180')&&spec.includes('44px')&&spec.includes('reduced motion'),'responsive contract ไม่ครบ');
check(spec.includes('native `button`')&&spec.includes('aria-live')&&spec.includes('ปุ่มเริ่มใหม่'),'interaction/accessibility contract ไม่ครบ');
if(errors.length){console.error(errors.map(error=>`✗ ${error}`).join('\n'));process.exit(1)}
console.log('✓ World 11 specification ผ่าน: ตอน 51–55 · คำตอบ 643, 416, 63, 555, 444 · 5 กลไก non-quiz · ผลึกคงที่ 10/10 · เชื่อมตอน 56');
