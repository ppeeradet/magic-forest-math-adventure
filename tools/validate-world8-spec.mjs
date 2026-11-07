import {readFileSync} from 'node:fs';

const spec=readFileSync(new URL('../planning/WORLD8.md',import.meta.url),'utf8');
const bank=JSON.parse(readFileSync(new URL('../dist/data/question-bank.json',import.meta.url),'utf8')).filter(item=>item.id>=36&&item.id<=41);
const errors=[];
const check=(ok,message)=>{if(!ok)errors.push(message)};
const expected=[
  [36,'ทะเลสาบล่องหน',398+427,'invisible-fish-ripples'],
  [37,'ถ้ำแมงมุมยักษ์',910-386,'moon-web-cutter'],
  [38,'ทุ่งหญ้าคริสตัล',8*6,'crystal-orchard'],
  [39,'ป่าแห่งความฝัน',547+198,'dream-loom'],
  [40,'หุบเขาแห่งเสียงสะท้อน',700-256,'echo-restorer']
];

expected.forEach(([id,title,answer,type],index)=>{
  const source=bank[index];
  check(source?.id===id&&source.title===title,`ตอน ${id} ต้องตรง Question Bank`);
  check(source?.answer===answer,`คำตอบตอน ${id} ไม่ถูกต้อง`);
  check(spec.includes(title)&&spec.includes(String(answer))&&spec.includes(type),`spec ตอน ${id} ขาดชื่อ คำตอบ หรือกลไก`);
});
check(spec.includes('398 → 798 → 818 → 825'),'ลำดับตอน 36 ไม่ครบ');
check(spec.includes('910 → 610 → 530 → 524'),'ลำดับตอน 37 ไม่ครบ');
check(spec.includes('6, 12, 18, 24, 30, 36, 42, 48'),'ลำดับตอน 38 ไม่ครบ');
check(spec.includes('547 → 647 → 737 → 745'),'ลำดับตอน 39 ไม่ครบ');
check(spec.includes('700 → 500 → 450 → 444'),'ลำดับตอน 40 ไม่ครบ');
check(spec.includes('7/10')&&spec.includes('8/10')&&spec.includes('เหลืออีก 2 ชิ้น'),'เส้นเรื่องผลึก 7/10 → 8/10 ไม่ครบ');
check(bank[5]?.title==='ลำธารแห่งความเร็ว'&&spec.includes('ตอนที่ 41 “ลำธารแห่งความเร็ว”'),'ทางเชื่อมตอน 41 ไม่ตรงต้นฉบับ');
check(spec.includes('390×844')&&spec.includes('820×1180')&&spec.includes('reduced motion'),'responsive contract ไม่ครบ');

if(errors.length){console.error(errors.map(error=>`✗ ${error}`).join('\n'));process.exit(1)}
console.log('✓ World 8 specification ผ่าน: ตอน 36–40 · คำตอบ 825, 524, 48, 745, 444 · 5 กลไก non-quiz · ผลึก 7/10 → 8/10 · เชื่อมตอน 41');
