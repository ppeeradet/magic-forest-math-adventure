globalThis.window=globalThis;
await import('../dist/data/levels.js');
await import('../dist/data/world4.js');
import {readFileSync} from 'node:fs';

const level=globalThis.MAGIC_FOREST_LEVELS.find(item=>item.id===16);
const arena=globalThis.MAGIC_FOREST_LEVELS.find(item=>item.id===17);
const river=globalThis.MAGIC_FOREST_LEVELS.find(item=>item.id===18);
const maze=globalThis.MAGIC_FOREST_LEVELS.find(item=>item.id===19);
const lake=globalThis.MAGIC_FOREST_LEVELS.find(item=>item.id===20);
const runtime=readFileSync(new URL('../dist/world4.js',import.meta.url),'utf8');
const fail=message=>{throw new Error(message)};

if(!level||level.world!==4)fail('ไม่พบด่าน 16 ใน World 4');
if(level.answer!==500-273)fail('คำตอบด่าน 16 ไม่เท่ากับ 227');
if(level.type!=='silent-wall')fail('ด่าน 16 ใช้กลไกไม่ถูกต้อง');
if(!runtime.includes('const parts=[200,70,3]'))fail('ขั้นถอนศิลาไม่ครบ 200, 70, 3');
if(!runtime.includes("resetStoneWall.onclick"))fail('ด่าน 16 ไม่มีปุ่มเริ่มใหม่');
if(!runtime.includes("openSkyGate.onclick=()=>finish(level,1)"))fail('ด่าน 16 ไม่เชื่อมหน้ารางวัล');
if(!globalThis.WORLD_FOUR_INTRO.some(line=>line.text.includes('นครลอยฟ้า')))fail('บทเปิดไม่เชื่อมสู่นครลอยฟ้า');
if(!arena||arena.answer!==5*9||arena.type!=='spell-arena')fail('ด่าน 17 หรือคำตอบ 45 ไม่ถูกต้อง');
if(!runtime.includes("level?.type==='spell-arena'")||!runtime.includes('waves*9'))fail('กลไกคาถาห้าระลอกไม่ครบ');
if(!runtime.includes("resetSpellArena').onclick")||!runtime.includes("reflectSpell').onclick=()=>finish(level,1)"))fail('ด่าน 17 ไม่มี reset หรือรางวัล');
if(!river||river.answer!==472+389||river.type!=='music-river')fail('ด่าน 18 หรือคำตอบ 861 ไม่ถูกต้อง');
if(!runtime.includes('const parts=[300,80,9]')||!runtime.includes('notes+=parts[index]'))fail('กลไกรวมโน้ต 300, 80, 9 ไม่ครบ');
if(!runtime.includes("resetMusicRiver').onclick")||!runtime.includes('cross.onclick=()=>finish(level,1)'))fail('ด่าน 18 ไม่มี reset หรือรางวัล');
if(!maze||maze.answer!==721-456||maze.type!=='mirror-maze')fail('ด่าน 19 หรือคำตอบ 265 ไม่ถูกต้อง');
if(!runtime.includes('const parts=[400,50,6]')||!runtime.includes('mirrors-=parts[index]'))fail('กลไกถอดภาพลวง 400, 50, 6 ไม่ครบ');
if(!runtime.includes("resetMirrorMaze').onclick")||!runtime.includes('follow.onclick=()=>finish(level,1)'))fail('ด่าน 19 ไม่มี reset หรือรางวัล');
if(!lake||lake.answer!==8*3||lake.type!=='light-shields')fail('ด่าน 20 หรือคำตอบ 24 ไม่ถูกต้อง');
if(!runtime.includes('drops=rescued*3')||!runtime.includes("['🦊','🦌','🐿️','🐇','🦉','🦔','🐼','🦄']"))fail('กลไกเกราะแสง 8 ตัว ตัวละ 3 หยดไม่ครบ');
if(!runtime.includes("resetLightShields').onclick")||!runtime.includes('cleanse.onclick=()=>finish(level,1)'))fail('ด่าน 20 ไม่มี reset หรือรางวัล');
if(!globalThis.WORLD_FOUR_ENDING?.some(line=>line.text.includes('ป่าแห่งความทรงจำ')))fail('ฉากจบ World 4 ไม่เชื่อมไป World 5');
if(!runtime.includes("level.id!==20")||!runtime.includes('WORLD_FOUR_ENDING,map'))fail('หน้ารางวัลด่าน 20 ไม่เชื่อมฉากจบ World 4');

console.log('✓ Playtest World 4 ตอนที่ 16–20 ผ่าน: 227, 45, 861, 265, 24 · reset · keyboard · reward · ending 4/10');
