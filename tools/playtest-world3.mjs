globalThis.window=globalThis;
await import('../dist/data/levels.js');

const worldThree=globalThis.MAGIC_FOREST_LEVELS.filter(level=>level.world===3);
const ending=globalThis.WORLD_THREE_ENDING;
const failures=[];
const check=(condition,message)=>{if(!condition)failures.push(message)};

check(worldThree.length===5,'World 3 ต้องมี 5 ด่าน');
check(worldThree.map(level=>level.id).join(',')==='11,12,13,14,15','ลำดับ World 3 ต้องเป็นด่าน 11–15');
check(worldThree.map(level=>level.type).join(',')==='mushroom-lights,fog-lantern,flower-choir,lotus-boats,root-network','กลไก World 3 ไม่ครบตามเส้นทาง');

const runs=[
  {id:11,steps:[7,7,7,7,7,7],start:0,answer:42,mode:'add'},
  {id:12,steps:[300,40,8],start:295,answer:643,mode:'add'},
  {id:13,steps:[100,70,9],start:823,answer:644,mode:'subtract'},
  {id:14,steps:[6,6,6,6],start:0,answer:24,mode:'add'},
  {id:15,steps:[400,80,5],start:367,answer:852,mode:'add'}
];

runs.forEach(run=>{
  const level=worldThree.find(candidate=>candidate.id===run.id);
  const result=run.steps.reduce((value,step)=>run.mode==='subtract'?value-step:value+step,run.start);
  check(result===run.answer,`ด่าน ${run.id} จำลองกลไกแล้วได้ ${result} แทน ${run.answer}`);
  check(Number(level?.answer)===run.answer,`ด่าน ${run.id} คำตอบในข้อมูลไม่ตรงกับ playtest`);
  check(level?.dialogue.some(line=>line.who==='ชิป')&&level?.dialogue.some(line=>line.who==='ฟลัฟฟี่'),`ด่าน ${run.id} ขาดเพื่อนร่วมทาง`);
});

check(worldThree[0].exploreText.includes('ประตูเห็ดยักษ์'),'จุดเริ่ม World 3 ต้องต่อจากประตูเห็ดยักษ์');
check(worldThree.at(-1).success.includes('นครลอยฟ้า'),'ด่าน 15 ต้องพาเรื่องไปสู่นครลอยฟ้า');
check(ending.some(line=>line.text.includes('สามชิ้น')&&line.text.includes('เจ็ดชิ้น')),'ฉากจบต้องสรุปว่าได้ 3 จาก 10 และเหลือ 7 ชิ้น');
check(ending.some(line=>line.text.includes('นครลอยฟ้า')),'ฉากจบต้องชี้เป้า World 4');

if(failures.length){console.error(failures.map(message=>`✗ ${message}`).join('\n'));process.exit(1)}
console.log('✓ Playtest World 3 ผ่านครบ: ด่าน 11–15 · ผลลัพธ์ 42, 643, 644, 24, 852 · บทสรุป 3/10 ชิ้น · เส้นทางสู่นครลอยฟ้า');
