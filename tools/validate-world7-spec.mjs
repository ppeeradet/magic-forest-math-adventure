import {readFileSync} from 'node:fs';

const questions=JSON.parse(readFileSync(new URL('../dist/data/question-bank.json',import.meta.url),'utf8')).slice(30,35);
const spec=readFileSync(new URL('../planning/WORLD7.md',import.meta.url),'utf8');
const fail=message=>{throw new Error(message)};
const answers=[436,40,633,563,63];
const operations=['subtraction','multiplication','addition','subtraction','multiplication'];
const mechanics=['life-garden','humming-nectar','ice-bridge','time-fountain','firefly-seals'];
const sequences=['621 → 521 → 441 → 436','5, 10, 15, 20, 25, 30, 35, 40','279 → 579 → 629 → 633','800 → 600 → 570 → 563','7, 14, 21, 28, 35, 42, 49, 56, 63'];

if(questions.length!==5||String(questions.map(item=>item.id))!=='31,32,33,34,35')fail('Question Bank ต้องมีตอน 31–35 ต่อเนื่อง');
questions.forEach((question,index)=>{
  if(question.answer!==answers[index])fail(`คำตอบตอน ${question.id} ไม่ตรงแผน World 7`);
  if(question.operation!==operations[index])fail(`ชนิดโจทย์ตอน ${question.id} ไม่ตรงแผน World 7`);
  if(!spec.includes(question.title)||!spec.includes(String(question.answer)))fail(`Specification ขาดชื่อหรือคำตอบตอน ${question.id}`);
  if(!spec.includes(mechanics[index]))fail(`Specification ขาดกลไก ${mechanics[index]}`);
  if(!spec.includes(sequences[index]))fail(`Specification ขาดลำดับการเล่นตอน ${question.id}`);
});
if(!spec.includes('ผลึกหัวใจ 6/10')||!spec.includes('ผลึก 7/10')||!spec.includes('เหลืออีก 3 ชิ้น'))fail('Specification ขาดความต่อเนื่องผลึก 6/10 → 7/10');
if(!spec.includes('ทะเลสาบล่องหน')||!spec.includes('ตอนที่ 36'))fail('Specification ขาดทางเชื่อมสู่ตอน 36');
if(!spec.includes('390×844')||!spec.includes('820×1180')||!spec.includes('prefers-reduced-motion'))fail('Specification ขาด responsive/reduced-motion contract');
if(!spec.includes('ไม่ใช้หน้าตัวเลือกเป็นแกนหลัก')||!spec.includes('ปุ่ม native'))fail('Specification ขาด non-quiz/accessibility contract');
console.log('✓ World 7 specification ผ่าน: ตอน 31–35 · คำตอบ 436, 40, 633, 563, 63 · 5 กลไกไม่ใช่ quiz · ผลึก 6/10 → 7/10 · เชื่อมตอน 36 · responsive contract');
