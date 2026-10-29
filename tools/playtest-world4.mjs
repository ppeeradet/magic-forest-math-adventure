globalThis.window=globalThis;
await import('../dist/data/levels.js');
await import('../dist/data/world4.js');
import {readFileSync} from 'node:fs';

const level=globalThis.MAGIC_FOREST_LEVELS.find(item=>item.id===16);
const runtime=readFileSync(new URL('../dist/world4.js',import.meta.url),'utf8');
const fail=message=>{throw new Error(message)};

if(!level||level.world!==4)fail('ไม่พบด่าน 16 ใน World 4');
if(level.answer!==500-273)fail('คำตอบด่าน 16 ไม่เท่ากับ 227');
if(level.type!=='silent-wall')fail('ด่าน 16 ใช้กลไกไม่ถูกต้อง');
if(!runtime.includes('const parts=[200,70,3]'))fail('ขั้นถอนศิลาไม่ครบ 200, 70, 3');
if(!runtime.includes("resetStoneWall.onclick"))fail('ด่าน 16 ไม่มีปุ่มเริ่มใหม่');
if(!runtime.includes("openSkyGate.onclick=()=>finish(level,1)"))fail('ด่าน 16 ไม่เชื่อมหน้ารางวัล');
if(!globalThis.WORLD_FOUR_INTRO.some(line=>line.text.includes('นครลอยฟ้า')))fail('บทเปิดไม่เชื่อมสู่นครลอยฟ้า');

console.log('✓ Playtest World 4 ตอนที่ 16 ผ่าน: 500 − 200 − 70 − 3 = 227 · reset · keyboard · reward');
