globalThis.window=globalThis;
await import('../dist/data/levels.js');
await import('../dist/data/world4.js');
await import('../dist/data/world5.js');
await import('../dist/data/world6.js');
await import('../dist/data/world7.js');
import {readFileSync} from 'node:fs';

const levels=globalThis.MAGIC_FOREST_LEVELS;
const level=levels[30],level32=levels[31],level33=levels[32];
const runtime=readFileSync(new URL('../dist/world7.js',import.meta.url),'utf8');
const styles=readFileSync(new URL('../dist/world7.css',import.meta.url),'utf8');
const errors=[];
const check=(ok,message)=>{if(!ok)errors.push(message)};

check(levels.length===33,'ต้องมีด่านเล่นได้รวม 33 ด่าน');
check(level?.id===31&&level.world===7&&level.title==='สวนพฤกษาแห่งชีวิต','ข้อมูลด่าน 31 หรือชื่อจากต้นฉบับไม่ถูกต้อง');
check(level.type==='life-garden'&&level.answer===436&&level.start===621,'โจทย์ 621 − 185 = 436 ไม่ถูกต้อง');
check(JSON.stringify(level.parts)==='[100,80,5]','ต้องแยก 185 เป็น 100, 80, 5');
const sequence=level.parts.reduce((values,part)=>[...values,values.at(-1)-part],[level.start]);
check(JSON.stringify(sequence)==='[621,521,441,436]'&&runtime.includes("values.push(values.at(-1)-parts[index])"),'กลไกต้องคำนวณลำดับ 621 → 521 → 441 → 436');
check(level.required>=3&&level.hotspots.length>=4&&level.dialogue.length>=4,'exploration หรือบทสนทนาด่าน 31 ไม่ครบ');
check(runtime.includes('[data-wilted-part]')&&runtime.includes('id="gardenHistory" aria-live="polite"'),'กลไกต้องใช้ปุ่ม native และประกาศผลให้ screen reader');
check(runtime.includes("p.querySelector('#resetLifeGarden').onclick")&&runtime.includes('finish(level,1)'),'ต้องมีปุ่มเริ่มใหม่และรับรางวัล');
check(runtime.includes('save.stars[30]&&save.unlocked<31')&&runtime.includes('Math.max(save.unlocked,33)'),'save migration และ playtest unlock ต้องรองรับด่าน 31');
check(runtime.includes("worldMap(7,'World 7")&&runtime.includes("collectionWorld(7,'World 7"),'แผนที่และคลังของสะสมต้องมี World 7');
check(globalThis.WORLD_SEVEN_INTRO?.length>=4&&globalThis.WORLD_SEVEN_INTRO.some(line=>line.text.includes('หกชิ้น')),'บทเปิดต้องเชื่อมจากผลึกหัวใจ 6 ชิ้น');
check(level.success.includes('ป่าแห่งเสียงกระซิบ'),'ตอนจบด่าน 31 ต้องเชื่อมไปด่าน 32');
check(level32?.id===32&&level32.world===7&&level32.title==='ป่าแห่งเสียงกระซิบ','ข้อมูลด่าน 32 หรือชื่อจากต้นฉบับไม่ถูกต้อง');
check(level32.type==='humming-nectar'&&level32.groups===8&&level32.each===5&&level32.answer===40,'โจทย์ 8 × 5 = 40 ไม่ถูกต้อง');
check(JSON.stringify(Array.from({length:level32.groups},(_,index)=>(index+1)*level32.each))==='[5,10,15,20,25,30,35,40]','ลำดับจังหวะน้ำหวาน 5–40 ไม่ถูกต้อง');
check(level32.required>=3&&level32.hotspots.length>=4&&level32.dialogue.length>=4,'exploration หรือบทสนทนาด่าน 32 ไม่ครบ');
check(runtime.includes('[data-humming-bird]')&&runtime.includes('id="nectarHistory" aria-live="polite"')&&runtime.includes("p.querySelector('#resetHumming').onclick"),'ด่าน 32 ต้องมี native controls, aria-live และ reset');
check(runtime.includes('save.stars[31]&&save.unlocked<32')&&runtime.includes('Math.max(save.unlocked,33)'),'save migration และ playtest unlock ต้องรองรับด่าน 32');
check(level32.success.includes('ถ้ำน้ำแข็งเรืองแสง'),'ตอนจบด่าน 32 ต้องเชื่อมไปด่าน 33');
check(level33?.id===33&&level33.title==='ถ้ำน้ำแข็งเรืองแสง'&&level33.type==='ice-bridge','ข้อมูลด่าน 33 ไม่ถูกต้อง');
check(level33.start===279&&level33.answer===633&&JSON.stringify(level33.parts)==='[300,50,4]','โจทย์ 279 + 354 = 633 ไม่ถูกต้อง');
check(JSON.stringify(level33.parts.reduce((v,p)=>[...v,v.at(-1)+p],[level33.start]))==='[279,579,629,633]','ลำดับสร้างสะพานไม่ถูกต้อง');
check(level33.required>=3&&level33.hotspots.length>=4&&level33.dialogue.length>=4,'exploration หรือบทสนทนาด่าน 33 ไม่ครบ');
check(runtime.includes('[data-ice-part]')&&runtime.includes('id="iceHistory" aria-live="polite"')&&runtime.includes("p.querySelector('#resetIceBridge').onclick"),'ด่าน 33 ต้องมี native controls, aria-live และ reset');
check(runtime.includes('save.stars[32]&&save.unlocked<33')&&runtime.includes('Math.max(save.unlocked,33)'),'save migration และ playtest unlock ต้องรองรับด่าน 33');
check(level33.success.includes('บ่อน้ำพุแห่งกาลเวลา'),'ตอนจบด่าน 33 ต้องเชื่อมไปด่าน 34');
check(styles.includes('@media(max-width:560px)')&&styles.includes('@media(prefers-reduced-motion:reduce)'),'CSS ต้องรองรับมือถือและ reduced motion');

if(errors.length){console.error(errors.map(error=>`✗ ${error}`).join('\n'));process.exit(1)}
console.log('✓ World 7 ด่าน 31–33 ผ่าน: 621 − 185 = 436 · 8 × 5 = 40 · 279 + 354 = 633 · exploration · native controls · save · responsive');
