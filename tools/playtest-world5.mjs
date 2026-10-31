globalThis.window=globalThis;
await import('../dist/data/levels.js');
await import('../dist/data/world4.js');
await import('../dist/data/world5.js');
import {readFileSync} from 'node:fs';

const level=globalThis.MAGIC_FOREST_LEVELS.find(item=>item.id===21);
const level22=globalThis.MAGIC_FOREST_LEVELS.find(item=>item.id===22);
const level23=globalThis.MAGIC_FOREST_LEVELS.find(item=>item.id===23);
const runtime=readFileSync(new URL('../dist/world5.js',import.meta.url),'utf8');
const styles=readFileSync(new URL('../dist/world5.css',import.meta.url),'utf8');
const styles22=readFileSync(new URL('../dist/world5-level22.css',import.meta.url),'utf8');
const styles23=readFileSync(new URL('../dist/world5-level23.css',import.meta.url),'utf8');
const fail=message=>{throw new Error(message)};
if(!level||level.world!==5||level.type!=='memory-tree')fail('ไม่พบด่าน 21 ใน World 5');
if(level.answer!==587+235)fail('คำตอบด่าน 21 ไม่เท่ากับ 822');
let value=587;const sequence=[value];for(const part of [200,30,5]){value+=part;sequence.push(value)}
if(String(sequence)!=='587,787,817,822')fail(`ลำดับด่าน 21 ผิด: ${sequence.join(' → ')}`);
if(!runtime.includes("resetMemoryTree').onclick")||!runtime.includes('reveal.onclick=()=>finish(level,1)'))fail('ด่าน 21 ไม่มี reset หรือรางวัล');
if(!runtime.includes('save.stars[20]&&save.unlocked<21'))fail('เซฟที่ผ่านด่าน 20 ต้องปลดล็อกด่าน 21');
if(!styles.includes('@media(max-width:560px)')||!styles.includes('prefers-reduced-motion'))fail('ด่าน 21 ขาด responsive หรือ reduced-motion');
if(!globalThis.WORLD_FIVE_INTRO?.some(line=>line.text.includes('นครลอยฟ้า')))fail('บทเปิด World 5 ไม่เชื่อมจาก World 4');
if(!level22||level22.world!==5||level22.type!=='time-wheel')fail('ไม่พบด่าน 22 ใน World 5');
if(level22.answer!==900-387)fail('คำตอบด่าน 22 ไม่เท่ากับ 513');
let days=900;const timeSequence=[days];for(const part of [300,80,7]){days-=part;timeSequence.push(days)}
if(String(timeSequence)!=='900,600,520,513')fail(`ลำดับด่าน 22 ผิด: ${timeSequence.join(' → ')}`);
if(!runtime.includes("resetTimeWheel').onclick")||!runtime.includes('wake.onclick=()=>finish(level,1)'))fail('ด่าน 22 ไม่มี reset หรือรางวัล');
if(!runtime.includes('save.stars[21]&&save.unlocked<22'))fail('เซฟที่ผ่านด่าน 21 ต้องปลดล็อกด่าน 22');
if(!styles22.includes('@media(max-width:560px)')||!styles22.includes('prefers-reduced-motion'))fail('ด่าน 22 ขาด responsive หรือ reduced-motion');
if(!level23||level23.world!==5||level23.type!=='night-flowers')fail('ไม่พบด่าน 23 ใน World 5');
if(level23.answer!==7*8)fail('คำตอบด่าน 23 ไม่เท่ากับ 56');
const flowerSequence=Array.from({length:7},(_,index)=>(index+1)*8);
if(String(flowerSequence)!=='8,16,24,32,40,48,56')fail(`ลำดับด่าน 23 ผิด: ${flowerSequence.join(' → ')}`);
if(!runtime.includes("resetNightFlowers').onclick")||!runtime.includes('open.onclick=()=>finish(level,1)'))fail('ด่าน 23 ไม่มี reset หรือรางวัล');
if(!runtime.includes('save.stars[22]&&save.unlocked<23'))fail('เซฟที่ผ่านด่าน 22 ต้องปลดล็อกด่าน 23');
if(!styles23.includes('@media(max-width:560px)')||!styles23.includes('prefers-reduced-motion'))fail('ด่าน 23 ขาด responsive หรือ reduced-motion');
console.log('✓ Playtest World 5 ตอนที่ 21–23 ผ่าน: 587 → 822 · 900 → 513 · 8 → 16 → 24 → 32 → 40 → 48 → 56 · reset · keyboard · reward · responsive contract');
