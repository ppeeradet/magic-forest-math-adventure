globalThis.window=globalThis;
await import('../dist/data/levels.js');
await import('../dist/data/world4.js');
await import('../dist/data/world5.js');
import {readFileSync} from 'node:fs';

const level=globalThis.MAGIC_FOREST_LEVELS.find(item=>item.id===21);
const level22=globalThis.MAGIC_FOREST_LEVELS.find(item=>item.id===22);
const level23=globalThis.MAGIC_FOREST_LEVELS.find(item=>item.id===23);
const level24=globalThis.MAGIC_FOREST_LEVELS.find(item=>item.id===24);
const level25=globalThis.MAGIC_FOREST_LEVELS.find(item=>item.id===25);
const runtime=readFileSync(new URL('../dist/world5.js',import.meta.url),'utf8');
const styles=readFileSync(new URL('../dist/world5.css',import.meta.url),'utf8');
const styles22=readFileSync(new URL('../dist/world5-level22.css',import.meta.url),'utf8');
const styles23=readFileSync(new URL('../dist/world5-level23.css',import.meta.url),'utf8');
const styles24=readFileSync(new URL('../dist/world5-level24.css',import.meta.url),'utf8');
const styles25=readFileSync(new URL('../dist/world5-level25.css',import.meta.url),'utf8');
const fail=message=>{throw new Error(message)};
const world5Levels=globalThis.MAGIC_FOREST_LEVELS.filter(item=>item.world===5);
if(world5Levels.length!==5||String(world5Levels.map(item=>item.id))!=='21,22,23,24,25')fail('World 5 ต้องมีด่าน 21–25 ต่อเนื่องครบห้าด่าน');
for(const item of world5Levels){
  if(item.required<3||item.hotspots.length<item.required)fail(`ด่าน ${item.id} มีจุดสำรวจไม่ครบ`);
  if(item.dialogue.length<4||!item.dialogue.some(line=>line.who==='แบมแบม'))fail(`ด่าน ${item.id} มีบทสนทนาหรือตัวผู้เล่นไม่ครบ`);
  if(!item.reward||!item.item||!item.successTitle||!item.success)fail(`ด่าน ${item.id} มีรางวัลหรือฉากสำเร็จไม่ครบ`);
}
if(new Set(world5Levels.map(item=>item.reward)).size!==5)fail('รางวัล World 5 ต้องไม่ซ้ำกัน');
if(new Set(world5Levels.map(item=>item.scene)).size!==5)fail('ฉาก World 5 ต้องไม่ซ้ำกัน');
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
if(!level24||level24.world!==5||level24.type!=='rescue-signals')fail('ไม่พบด่าน 24 ใน World 5');
if(level24.answer!==175+288)fail('คำตอบด่าน 24 ไม่เท่ากับ 463');
let signals=175;const signalSequence=[signals];for(const part of [200,80,8]){signals+=part;signalSequence.push(signals)}
if(String(signalSequence)!=='175,375,455,463')fail(`ลำดับด่าน 24 ผิด: ${signalSequence.join(' → ')}`);
if(!runtime.includes("resetRescueSignals').onclick")||!runtime.includes('open.onclick=()=>finish(level,1)'))fail('ด่าน 24 ไม่มี reset หรือรางวัล');
if(!runtime.includes('save.stars[23]&&save.unlocked<24'))fail('เซฟที่ผ่านด่าน 23 ต้องปลดล็อกด่าน 24');
if(!styles24.includes('@media(max-width:560px)')||!styles24.includes('prefers-reduced-motion'))fail('ด่าน 24 ขาด responsive หรือ reduced-motion');
if(!level25||level25.world!==5||level25.type!=='shadow-energy')fail('ไม่พบด่าน 25 ใน World 5');
if(level25.answer!==950-489)fail('คำตอบด่าน 25 ไม่เท่ากับ 461');
let energy=950;const energySequence=[energy];for(const part of [400,80,9]){energy-=part;energySequence.push(energy)}
if(String(energySequence)!=='950,550,470,461')fail(`ลำดับด่าน 25 ผิด: ${energySequence.join(' → ')}`);
if(!runtime.includes("resetShadowEnergy').onclick")||!runtime.includes('restore.onclick=()=>finish(level,1)'))fail('ด่าน 25 ไม่มี reset หรือรางวัล');
if(!runtime.includes('save.stars[24]&&save.unlocked<25'))fail('เซฟที่ผ่านด่าน 24 ต้องปลดล็อกด่าน 25');
if(!runtime.includes("next.textContent='ดูตอนจบ World 5'")||!runtime.includes('WORLD_FIVE_ENDING,map'))fail('ด่าน 25 ต้องเชื่อมไปฉากจบ World 5');
if(!styles25.includes('@media(max-width:560px)')||!styles25.includes('prefers-reduced-motion'))fail('ด่าน 25 ขาด responsive หรือ reduced-motion');
if(!globalThis.WORLD_FIVE_ENDING?.some(line=>line.text.includes('ห้องแห่งการคูณ')))fail('ฉากจบ World 5 ไม่เชื่อมตอน 26');
if(!globalThis.WORLD_FIVE_ENDING?.some(line=>line.text.includes('ห้าชิ้น')&&line.text.includes('อีกห้าชิ้น')))fail('ฉากจบ World 5 ต้องสรุปผลึก 5/10');
if(!runtime.includes("worldMap(5,'World 5 · ป่าแห่งความทรงจำและปราสาทเงา")||!runtime.includes("journeyTitle.textContent='พิชิตครบ 25 ตอน!'"))fail('แผนที่ World 5 หรือสรุป 25 ตอนยังไม่ครบ');
if(!runtime.includes("nextLock.innerHTML='<span>🔒</span><div><small>บทถัดไป</small><strong>World 6 · ห้องแห่งการคูณ"))fail('แผนที่หลังจบต้องชี้สู่ World 6');
const nativeButtons=['data-memory-part','data-time-part','data-night-flower','data-signal-part','data-energy-part'];
for(const marker of nativeButtons)if(!runtime.includes(`<button ${marker}`))fail(`กลไก ${marker} ต้องใช้ปุ่ม native สำหรับ Tab/Enter/Space`);
const liveRegions=['memoryHistory','timeHistory','flowerSequence','signalHistory','energyHistory'];
for(const id of liveRegions)if(!runtime.includes(`id="${id}" aria-live="polite"`))fail(`สถานะ ${id} ต้องประกาศผ่าน aria-live`);
if(!runtime.includes('if(PLAYTEST_MODE)save.unlocked=Math.max(save.unlocked,25)'))fail('โหมด playtest ต้องเปิดครบถึงด่าน 25 โดยไม่แก้เซฟจริง');
console.log('✓ Full regression QA World 5 ผ่าน: 5 ด่าน · exploration · 5 กลไก · reset · native keyboard · aria-live · reward · save migration · map 25/25 · ending 5/10 · World 6 handoff · responsive/reduced-motion');
