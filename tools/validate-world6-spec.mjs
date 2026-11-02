import {readFileSync} from 'node:fs';

const questions=JSON.parse(readFileSync(new URL('../dist/data/question-bank.json',import.meta.url),'utf8')).slice(25,30);
const spec=readFileSync(new URL('../planning/WORLD6.md',import.meta.url),'utf8');
const fail=message=>{throw new Error(message)};
const answers=[54,561,355,56,733];
const operations=['multiplication','addition','subtraction','multiplication','addition'];
const mechanics=['spell-rings','owl-relay','stair-energy','levitation-potions','ancient-library'];

if(questions.length!==5||String(questions.map(item=>item.id))!=='26,27,28,29,30')fail('Question Bank ต้องมีตอน 26–30 ต่อเนื่อง');
questions.forEach((question,index)=>{
  if(question.answer!==answers[index])fail(`คำตอบตอน ${question.id} ไม่ตรงแผน World 6`);
  if(question.operation!==operations[index])fail(`ชนิดโจทย์ตอน ${question.id} ไม่ตรงแผน World 6`);
  if(!spec.includes(question.title)||!spec.includes(String(question.answer)))fail(`Specification ขาดชื่อหรือคำตอบตอน ${question.id}`);
  if(!spec.includes(mechanics[index]))fail(`Specification ขาดกลไก ${mechanics[index]}`);
});
if(questions.filter(item=>item.title==='บันไดสู่จุดสูงสุด').length!==3)fail('ต้องรักษาชื่อซ้ำตอน 27–29 ตามต้นฉบับ');
if(!spec.includes('chapterLabel')||!spec.includes('ผลึกหัวใจ 5/10')||!spec.includes('ผลึกหัวใจชิ้นที่ 6')||!spec.includes('เหลืออีก 4 ชิ้น'))fail('Specification ขาดกติกาชื่อฉากย่อยหรือความต่อเนื่องผลึก 5/10 → 6/10');
if(!spec.includes('390×844')||!spec.includes('820×1180')||!spec.includes('prefers-reduced-motion')&&!spec.includes('reduced motion'))fail('Specification ขาด responsive/reduced-motion contract');
console.log('✓ World 6 specification ผ่าน: ตอน 26–30 · คำตอบ 54, 561, 355, 56, 733 · ชื่อซ้ำตามต้นฉบับ · กลไกไม่ใช่ quiz · ผลึก 5/10 → 6/10 · responsive contract');
