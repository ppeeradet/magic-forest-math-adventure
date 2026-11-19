import {readFileSync} from 'node:fs';
const spec=readFileSync(new URL('../planning/WORLD13.md',import.meta.url),'utf8');
const all=JSON.parse(readFileSync(new URL('../dist/data/question-bank.json',import.meta.url),'utf8'));
const bank=all.filter(item=>item.id>=61&&item.id<=65);
const errors=[],check=(ok,message)=>{if(!ok)errors.push(message)};
const expected=[
  [61,'ป่าแห่งความเก่าแก่',710-376,'ancient-root-rescue'],
  [62,'ทะเลสาบแห่งเสียงกระซิบ',8*6,'whisper-wave-tuner'],
  [63,'ทุ่งหญ้าแห่งความเร็ว',257+389,'swift-creature-gather'],
  [64,'อุโมงค์แห่งภาพลวงตา',900-457,'illusion-lantern-filter'],
  [65,'ป่าแห่งความโศกเศร้า',5*9,'sorrow-mist-lanterns']
];
expected.forEach(([id,title,answer,type],index)=>{
  const source=bank[index];
  check(source?.id===id&&source.title===title,`ตอน ${id} ต้องตรง Question Bank`);
  check(source?.answer===answer,`คำตอบตอน ${id} ไม่ถูกต้อง`);
  check(spec.includes(title)&&spec.includes(String(answer))&&spec.includes(type),`spec ตอน ${id} ขาดชื่อ คำตอบ หรือกลไก`);
});
check(spec.includes('710 → 410 → 340 → 334'),'ลำดับตอน 61 ไม่ครบ');
check(spec.includes('6, 12, 18, 24, 30, 36, 42, 48'),'ลำดับตอน 62 ไม่ครบ');
check(spec.includes('257 → 557 → 637 → 646'),'ลำดับตอน 63 ไม่ครบ');
check(spec.includes('900 → 500 → 450 → 443'),'ลำดับตอน 64 ไม่ครบ');
check(spec.includes('9, 18, 27, 36, 45'),'ลำดับตอน 65 ไม่ครบ');
check(spec.includes('10/10')&&spec.includes('ไม่เพิ่มผลึกหัวใจชิ้นใหม่'),'ความต่อเนื่องหลังผลึกครบ 10/10 ไม่ชัดเจน');
check(all.find(item=>item.id===66)?.title==='ทะเลสาบแห่งความเงียบ'&&spec.includes('ตอนที่ 66 “ทะเลสาบแห่งความเงียบ”'),'ทางเชื่อมตอน 66 ไม่ตรงต้นฉบับ');
check(spec.includes('390×844')&&spec.includes('820×1180')&&spec.includes('44px')&&spec.includes('reduced motion'),'responsive contract ไม่ครบ');
check(spec.includes('native `button`')&&spec.includes('aria-live')&&spec.includes('ปุ่มเริ่มใหม่'),'interaction/accessibility contract ไม่ครบ');
if(errors.length){console.error(errors.map(error=>`✗ ${error}`).join('\n'));process.exit(1)}
console.log('✓ World 13 specification ผ่าน: ตอน 61–65 · คำตอบ 334, 48, 646, 443, 45 · 5 กลไก non-quiz · ผลึกคงที่ 10/10 · เชื่อมตอน 66');
