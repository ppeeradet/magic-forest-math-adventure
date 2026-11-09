import {readFileSync} from 'node:fs';

const spec=readFileSync(new URL('../planning/WORLD9.md',import.meta.url),'utf8');
const bank=JSON.parse(readFileSync(new URL('../dist/data/question-bank.json',import.meta.url),'utf8')).slice(40,46);
const errors=[];
const check=(ok,message)=>{if(!ok)errors.push(message)};
const expected=[
  [41,'ลำธารแห่งความเร็ว',6*9,'current-fish-relay'],
  [42,'ถ้ำแห่งแสงอาทิตย์ลับ',168+295,'sun-prism-merger'],
  [43,'ป่าหินร้องไห้',830-475,'stone-tear-channels'],
  [44,'ทะเลสาบแห่งดวงดาว',7*5,'seven-star-bridge'],
  [45,'ป่าแห่งความงดงาม',654+178,'beauty-bloom-garden']
];

expected.forEach(([id,title,answer,type],index)=>{
  const source=bank[index];
  check(source?.id===id&&source.title===title,`ตอน ${id} ต้องตรง Question Bank`);
  check(source?.answer===answer,`คำตอบตอน ${id} ไม่ถูกต้อง`);
  check(spec.includes(title)&&spec.includes(String(answer))&&spec.includes(type),`spec ตอน ${id} ขาดชื่อ คำตอบ หรือกลไก`);
});
check(spec.includes('9, 18, 27, 36, 45, 54'),'ลำดับตอน 41 ไม่ครบ');
check(spec.includes('168 → 368 → 458 → 463'),'ลำดับตอน 42 ไม่ครบ');
check(spec.includes('830 → 430 → 360 → 355'),'ลำดับตอน 43 ไม่ครบ');
check(spec.includes('5, 10, 15, 20, 25, 30, 35'),'ลำดับตอน 44 ไม่ครบ');
check(spec.includes('654 → 754 → 824 → 832'),'ลำดับตอน 45 ไม่ครบ');
check(spec.includes('8/10')&&spec.includes('9/10')&&spec.includes('เหลืออีก 1 ชิ้น'),'เส้นเรื่องผลึก 8/10 → 9/10 ไม่ครบ');
check(bank[5]?.title==='ทางเดินแห่งเขาวงกต'&&spec.includes('ตอนที่ 46 “ทางเดินแห่งเขาวงกต”'),'ทางเชื่อมตอน 46 ไม่ตรงต้นฉบับ');
check(spec.includes('390×844')&&spec.includes('820×1180')&&spec.includes('44px')&&spec.includes('reduced motion'),'responsive contract ไม่ครบ');

if(errors.length){console.error(errors.map(error=>`✗ ${error}`).join('\n'));process.exit(1)}
console.log('✓ World 9 specification ผ่าน: ตอน 41–45 · คำตอบ 54, 463, 355, 35, 832 · 5 กลไก non-quiz · ผลึก 8/10 → 9/10 · เชื่อมตอน 46');
