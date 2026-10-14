globalThis.window=globalThis;
await import('../dist/data/levels.js');
import {readFileSync} from 'node:fs';

const levels=globalThis.MAGIC_FOREST_LEVELS;
const ending=globalThis.WORLD_ONE_ENDING;
const questionBank=JSON.parse(readFileSync(new URL('../dist/data/question-bank.json',import.meta.url),'utf8'));
const expectedAnswers=[345+218,876-324,457+186,732-289,9*2,569+374,915-458,8*7];
const errors=[];
const check=(ok,message)=>{if(!ok)errors.push(message)};

check(Array.isArray(levels)&&levels.length===8,'เกมต้องมี World 1 จำนวน 5 ด่าน และ World 2 จำนวน 3 ด่าน');
check(Array.isArray(questionBank)&&questionBank.length===100,'คลังโจทย์ต้นฉบับต้องมี 100 ด่าน');
questionBank.forEach((question,index)=>{
  check(question.id===index+1,`คลังโจทย์ลำดับ ${index+1} ไม่ต่อเนื่อง`);
  check(question.choices.length===4,`ด่าน ${question.id} ต้องมี 4 ตัวเลือก`);
  check(question.choices.includes(question.answer),`คำตอบด่าน ${question.id} ไม่อยู่ในตัวเลือก`);
  check(['addition','subtraction','multiplication','mixed'].includes(question.operation),`ชนิดโจทย์ด่าน ${question.id} ไม่รองรับ`);
});
levels.forEach((level,index)=>{
  check(level.id===index+1,`ลำดับด่าน ${index+1} ไม่ต่อเนื่อง`);
  check(String(level.answer)===String(expectedAnswers[index]),`คำตอบด่าน ${level.id} ไม่ตรงกับโจทย์คณิตศาสตร์`);
  check(level.required>0&&level.required<=level.hotspots.length,`จำนวนเบาะแสด่าน ${level.id} ไม่ถูกต้อง`);
  check(level.dialogue.length>=3,`บทสนทนาด่าน ${level.id} สั้นเกินไป`);
  check(level.dialogue.some(line=>line.who==='แบมแบม'||line.text.includes('แบมแบม')),`ด่าน ${level.id} ไม่มีตัวละครผู้เล่นในบทสนทนา`);
  check(level.reward&&level.item&&level.success,`รางวัลหรือฉากสำเร็จด่าน ${level.id} ไม่ครบ`);
  check(String(level.answer)===String(questionBank[index].answer),`คำตอบเกมด่าน ${level.id} ไม่ตรงกับคลังต้นฉบับ`);
});
check(new Set(levels.map(level=>level.reward)).size===levels.length,'รางวัลใน World 1 ต้องไม่ซ้ำกัน');
check(Array.isArray(ending)&&ending.length>=4,'ตอนจบ World 1 ไม่ครบ');
check(ending.some(line=>line.who==='แบมแบม')&&ending.some(line=>line.text.includes('แบมแบม')),'ตอนจบต้องรองรับการแทนชื่อผู้เล่น');
check(levels[5]?.world===2,'ด่าน 6 ต้องเปิด World 2');
check(levels[5]?.title===questionBank[5]?.title,'ชื่อด่าน 6 ต้องตรงกับต้นฉบับ');
check(levels[6]?.world===2&&levels[6]?.type==='repair','ด่าน 7 ต้องเป็นกลไกซ่อมคริสตัลใน World 2');
check(levels[6]?.title===questionBank[6]?.title,'ชื่อด่าน 7 ต้องตรงกับต้นฉบับ');
check(levels[7]?.world===2&&levels[7]?.type==='fish','ด่าน 8 ต้องเป็นกลไกปลุกปลาสายรุ้งใน World 2');
check(levels[7]?.title===questionBank[7]?.title,'ชื่อด่าน 8 ต้องตรงกับต้นฉบับ');

if(errors.length){console.error(errors.map(error=>`✗ ${error}`).join('\n'));process.exit(1)}
console.log(`✓ World 1 ผ่าน 5 ด่าน · World 2 ผ่าน 3 ด่าน · คลังต้นฉบับผ่าน ${questionBank.length} ด่าน`);
