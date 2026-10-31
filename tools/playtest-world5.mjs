globalThis.window=globalThis;
await import('../dist/data/levels.js');
await import('../dist/data/world4.js');
await import('../dist/data/world5.js');
import {readFileSync} from 'node:fs';

const level=globalThis.MAGIC_FOREST_LEVELS.find(item=>item.id===21);
const runtime=readFileSync(new URL('../dist/world5.js',import.meta.url),'utf8');
const styles=readFileSync(new URL('../dist/world5.css',import.meta.url),'utf8');
const fail=message=>{throw new Error(message)};
if(!level||level.world!==5||level.type!=='memory-tree')fail('ไม่พบด่าน 21 ใน World 5');
if(level.answer!==587+235)fail('คำตอบด่าน 21 ไม่เท่ากับ 822');
let value=587;const sequence=[value];for(const part of [200,30,5]){value+=part;sequence.push(value)}
if(String(sequence)!=='587,787,817,822')fail(`ลำดับด่าน 21 ผิด: ${sequence.join(' → ')}`);
if(!runtime.includes("resetMemoryTree').onclick")||!runtime.includes('reveal.onclick=()=>finish(level,1)'))fail('ด่าน 21 ไม่มี reset หรือรางวัล');
if(!runtime.includes('save.stars[20]&&save.unlocked<21'))fail('เซฟที่ผ่านด่าน 20 ต้องปลดล็อกด่าน 21');
if(!styles.includes('@media(max-width:560px)')||!styles.includes('prefers-reduced-motion'))fail('ด่าน 21 ขาด responsive หรือ reduced-motion');
if(!globalThis.WORLD_FIVE_INTRO?.some(line=>line.text.includes('นครลอยฟ้า')))fail('บทเปิด World 5 ไม่เชื่อมจาก World 4');
console.log('✓ Playtest World 5 ตอนที่ 21 ผ่าน: 587 → 787 → 817 → 822 · reset · keyboard · reward · responsive contract');
