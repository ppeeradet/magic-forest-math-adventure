globalThis.window=globalThis;
await import('../dist/data/levels.js');

const levels=globalThis.MAGIC_FOREST_LEVELS;
const ending=globalThis.WORLD_ONE_ENDING;
const expectedAnswers=[345+218,876-324,457+186,732-289,9*2];
const errors=[];
const check=(ok,message)=>{if(!ok)errors.push(message)};

check(Array.isArray(levels)&&levels.length===5,'World 1 ต้องมี 5 ด่าน');
levels.forEach((level,index)=>{
  check(level.id===index+1,`ลำดับด่าน ${index+1} ไม่ต่อเนื่อง`);
  check(String(level.answer)===String(expectedAnswers[index]),`คำตอบด่าน ${level.id} ไม่ตรงกับโจทย์คณิตศาสตร์`);
  check(level.required>0&&level.required<=level.hotspots.length,`จำนวนเบาะแสด่าน ${level.id} ไม่ถูกต้อง`);
  check(level.dialogue.length>=3,`บทสนทนาด่าน ${level.id} สั้นเกินไป`);
  check(level.dialogue.some(line=>line.who==='แบมแบม'||line.text.includes('แบมแบม')),`ด่าน ${level.id} ไม่มีตัวละครผู้เล่นในบทสนทนา`);
  check(level.reward&&level.item&&level.success,`รางวัลหรือฉากสำเร็จด่าน ${level.id} ไม่ครบ`);
});
check(new Set(levels.map(level=>level.reward)).size===levels.length,'รางวัลใน World 1 ต้องไม่ซ้ำกัน');
check(Array.isArray(ending)&&ending.length>=4,'ตอนจบ World 1 ไม่ครบ');
check(ending.some(line=>line.who==='แบมแบม')&&ending.some(line=>line.text.includes('แบมแบม')),'ตอนจบต้องรองรับการแทนชื่อผู้เล่น');

if(errors.length){console.error(errors.map(error=>`✗ ${error}`).join('\n'));process.exit(1)}
console.log(`✓ เนื้อเรื่องและคณิตศาสตร์ World 1 ผ่าน ${levels.length} ด่าน`);
