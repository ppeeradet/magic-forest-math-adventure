const world10PlayBase=play;
play=id=>{
  world10PlayBase(id);
  const level=LEVELS[id-1];
  if(level?.type==='truth-maze-routes'){
  let step=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),values=[level.start];
  p.innerHTML=`<div class="truth-maze" id="truthMaze"><div class="maze-stage" aria-hidden="true"><span id="mazeWalls">🌀🌀🌀</span><i id="truthRoute"></i></div><div class="maze-total" aria-live="polite"><small>ทางที่ยังใช้ได้</small><strong id="mazeTotal">700</strong><b id="mazeEquation">700 − 289 = ?</b></div><div class="maze-parts" role="group" aria-label="ปิดทางลวงทีละส่วน">${level.parts.map((part,index)=>`<button data-maze-part="${index}" ${index?'disabled':''}><span>${index===0?'เขตทางใหญ่':index===1?'เขตทางกลาง':'ทางลวงสุดท้าย'}</span><b>−${part}</b><small>${index===0?'2 ร้อย':index===1?'8 สิบ':'9 หน่วย'}</small></button>`).join('')}</div><div class="maze-history" id="mazeHistory" aria-live="polite">700 · รอปิดทางลวง 289 เส้น</div></div><div class="garden-actions"><button class="secondary" id="resetTruthMaze">จัดเข็มทิศใหม่ ↻</button><button class="primary" id="exitTruthMaze" disabled>ออกด้วยทางจริง 411 เส้น</button></div>`;
  const buttons=[...p.querySelectorAll('[data-maze-part]')],total=p.querySelector('#mazeTotal'),equation=p.querySelector('#mazeEquation'),history=p.querySelector('#mazeHistory'),stage=p.querySelector('#truthMaze'),walls=p.querySelector('#mazeWalls'),route=p.querySelector('#truthRoute'),exit=p.querySelector('#exitTruthMaze');
  const render=()=>{const current=values.at(-1),removed=level.parts.slice(0,step).reduce((a,b)=>a+b,0);total.textContent=current;equation.textContent=step?`${level.start} − ${removed} = ${current}`:'700 − 289 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('cleared',index<step)});history.textContent=values.join(' → ')+(step===level.parts.length?' · ทางจริงเหลือ 411 เส้น!':'');stage.style.setProperty('--maze-cleared',String(step/level.parts.length));walls.textContent='🌀'.repeat(3-step)+'✨'.repeat(step);route.style.width=`${step/level.parts.length*100}%`;exit.disabled=step!==level.parts.length};
  const reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)-level.parts[index]);step++;render();tone(600-step*70,.23);fb.innerHTML=`<div class="star-chance">${values.at(-2)} − ${level.parts[index]} = ${values.at(-1)}${step===level.parts.length?' — ประตูทางจริงเปิดแล้ว!':''}</div>`});
  p.querySelector('#resetTruthMaze').onclick=()=>{reset();tone(330)};
  exit.onclick=()=>finish(level,1);
  render();
  return;
  }
  if(level?.type==='silent-dragonfly-signal'){
  let dragonflies=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),sequence=[];
  p.innerHTML=`<div class="dragonfly-signal" id="dragonflySignal"><div class="silent-stage" aria-hidden="true"><span id="dragonflyLights">🤫</span><i id="wingSignal"></i></div><div class="wing-total" aria-live="polite"><small>คู่ปีกที่ส่งสัญญาณ</small><strong id="wingTotal">0</strong><b id="wingEquation">0 × 4 = 0</b></div><div class="dragonfly-buttons" role="group" aria-label="ปลุกแมลงปอทีละตัว">${Array.from({length:level.groups},(_,index)=>`<button data-dragonfly="${index}" ${index?'disabled':''}><span>🦋</span><b>ตัวที่ ${index+1}</b><small>+4 คู่</small></button>`).join('')}</div><div class="wing-history" id="wingHistory" aria-live="polite">รอปลุกตัวแรก · เป้าหมาย 36 คู่ปีก</div></div><div class="garden-actions"><button class="secondary" id="resetDragonflies">เริ่มสัญญาณใหม่ ↻</button><button class="primary" id="openDungeonGate" disabled>เปิดประตูด้วย 36 คู่</button></div>`;
  const buttons=[...p.querySelectorAll('[data-dragonfly]')],total=p.querySelector('#wingTotal'),equation=p.querySelector('#wingEquation'),history=p.querySelector('#wingHistory'),stage=p.querySelector('#dragonflySignal'),lights=p.querySelector('#dragonflyLights'),signal=p.querySelector('#wingSignal'),open=p.querySelector('#openDungeonGate');
  const render=()=>{const wings=dragonflies*level.each;total.textContent=wings;equation.textContent=`${dragonflies} × ${level.each} = ${wings}`;buttons.forEach((button,index)=>{button.disabled=index!==dragonflies;button.classList.toggle('awake',index<dragonflies)});history.textContent=sequence.length?`${sequence.join(' → ')}${dragonflies===level.groups?' · รหัสครบ 36 คู่!':''}`:'รอปลุกตัวแรก · เป้าหมาย 36 คู่ปีก';stage.style.setProperty('--wings-awake',String(dragonflies/level.groups));lights.textContent='🦋'.repeat(Math.min(dragonflies,5))||'🤫';signal.style.width=`${dragonflies/level.groups*100}%`;open.disabled=dragonflies!==level.groups};
  const reset=()=>{dragonflies=0;sequence.splice(0);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==dragonflies)return;dragonflies++;sequence.push(dragonflies*level.each);render();tone(480+dragonflies*38,.18);fb.innerHTML=`<div class="star-chance">แมลงปอ ${dragonflies} ตัว × ${level.each} คู่ = ${dragonflies*level.each}${dragonflies===level.groups?' — ประตูอ่านรหัสครบแล้ว!':''}</div>`});
  p.querySelector('#resetDragonflies').onclick=()=>{reset();tone(330)};
  open.onclick=()=>finish(level,1);
  render();
  return;
  }
  if(level?.type==='dungeon-allies-unite'){
  let step=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),values=[level.start];
  p.innerHTML=`<div class="dungeon-allies" id="dungeonAllies"><div class="dungeon-stage" aria-hidden="true"><span id="dungeonFriends">🦇 ⛓️ 🐍</span><i id="dungeonForce"></i></div><div class="allies-total" aria-live="polite"><small>ผู้ช่วยที่รวมพลังแล้ว</small><strong id="alliesTotal">378</strong><b id="alliesEquation">378 + 155 = ?</b></div><div class="allies-parts" role="group" aria-label="รวมสัตว์ทีละส่วน">${level.parts.map((part,index)=>`<button data-ally-part="${index}" ${index?'disabled':''}><span>${index===0?'ฝูงใหญ่':index===1?'ฝูงกลาง':'กลุ่มสุดท้าย'}</span><b>+${part}</b><small>${index===0?'1 ร้อย':index===1?'5 สิบ':'5 หน่วย'}</small></button>`).join('')}</div><div class="allies-history" id="alliesHistory" aria-live="polite">378 · รอรวมงูยักษ์ 155 ตัว</div></div><div class="garden-actions"><button class="secondary" id="resetDungeonAllies">รวมฝูงใหม่ ↻</button><button class="primary" id="openMusicForest" disabled>เปิดประตูด้วยผู้ช่วย 533 ตัว</button></div>`;
  const buttons=[...p.querySelectorAll('[data-ally-part]')],total=p.querySelector('#alliesTotal'),equation=p.querySelector('#alliesEquation'),history=p.querySelector('#alliesHistory'),stage=p.querySelector('#dungeonAllies'),friends=p.querySelector('#dungeonFriends'),force=p.querySelector('#dungeonForce'),open=p.querySelector('#openMusicForest');
  const render=()=>{const current=values.at(-1),joined=level.parts.slice(0,step).reduce((a,b)=>a+b,0);total.textContent=current;equation.textContent=step?`${level.start} + ${joined} = ${current}`:'378 + 155 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('united',index<step)});history.textContent=values.join(' → ')+(step===level.parts.length?' · ผู้ช่วยครบ 533 ตัว!':'');stage.style.setProperty('--allies-united',String(step/level.parts.length));friends.textContent=step===3?'🦇 🤝 🐍':'🦇 '+'⛓️'.repeat(3-step)+' 🐍';force.style.width=`${step/level.parts.length*100}%`;open.disabled=step!==level.parts.length};
  const reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)+level.parts[index]);step++;render();tone(420+step*70,.22);fb.innerHTML=`<div class="star-chance">${values.at(-2)} + ${level.parts[index]} = ${values.at(-1)}${step===level.parts.length?' — โซ่เงาหลุดครบแล้ว!':''}</div>`});
  p.querySelector('#resetDungeonAllies').onclick=()=>{reset();tone(330)};
  open.onclick=()=>finish(level,1);
  render();
  return;
  }
  if(level?.type!=='joy-note-restorer')return;
  let step=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),values=[level.start];
  p.innerHTML=`<div class="joy-notes" id="joyNotes"><div class="music-stage" aria-hidden="true"><span id="forestMusic">🌳 〰️ 🌳</span><i id="musicGlow"></i></div><div class="notes-total" aria-live="polite"><small>โน้ตที่ยังบรรเลงได้</small><strong id="notesTotal">920</strong><b id="notesEquation">920 − 473 = ?</b></div><div class="note-parts" role="group" aria-label="คืนทำนองทีละส่วน">${level.parts.map((part,index)=>`<button data-note-part="${index}" ${index?'disabled':''}><span>${index===0?'แนวเสียงหลัก':index===1?'แนวประสาน':'จังหวะสุดท้าย'}</span><b>−${part}</b><small>${index===0?'4 ร้อย':index===1?'7 สิบ':'3 หน่วย'}</small></button>`).join('')}</div><div class="note-history" id="noteHistory" aria-live="polite">920 · รอแยกช่องเสียง 473 ตัว</div></div><div class="garden-actions"><button class="secondary" id="resetJoyNotes">เรียบเรียงใหม่ ↻</button><button class="primary" id="openMirrorLake" disabled>เปิดทางด้วย 447 โน้ต</button></div>`;
  const buttons=[...p.querySelectorAll('[data-note-part]')],total=p.querySelector('#notesTotal'),equation=p.querySelector('#notesEquation'),history=p.querySelector('#noteHistory'),stage=p.querySelector('#joyNotes'),music=p.querySelector('#forestMusic'),glow=p.querySelector('#musicGlow'),open=p.querySelector('#openMirrorLake');
  const render=()=>{const current=values.at(-1),removed=level.parts.slice(0,step).reduce((a,b)=>a+b,0);total.textContent=current;equation.textContent=step?`${level.start} − ${removed} = ${current}`:'920 − 473 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('restored',index<step)});history.textContent=values.join(' → ')+(step===level.parts.length?' · ทำนองครบ 447 โน้ต!':'');stage.style.setProperty('--notes-restored',String(step/level.parts.length));music.textContent=step===3?'🌳 🎵🎶 🌳':'🌳 '+'〰️'.repeat(3-step)+' 🌳';glow.style.width=`${step/level.parts.length*100}%`;open.disabled=step!==level.parts.length};
  const reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)-level.parts[index]);step++;render();tone(440+step*110,.24);fb.innerHTML=`<div class="star-chance">${values.at(-2)} − ${level.parts[index]} = ${values.at(-1)}${step===level.parts.length?' — ป่าบรรเลงเพลงแล้ว!':''}</div>`});
  p.querySelector('#resetJoyNotes').onclick=()=>{reset();tone(330)};
  open.onclick=()=>finish(level,1);
  render();
};

const world10BeginBase=beginLevel;
beginLevel=id=>id===46&&!save.stars[46]?story([...window.WORLD_TEN_INTRO,...LEVELS[45].dialogue],()=>explore(46)):world10BeginBase(id);

const world10MapBase=map;
map=()=>{world10MapBase();const wrap=document.querySelector('.map-wrap');if(!wrap||wrap.querySelector('.world-map-10'))return;const next=nextAdventure();wrap.insertAdjacentHTML('beforeend',worldMap(10,'World 10 · เขาวงกตเงาและทะเลสาบกระจก','ผลึกหัวใจชิ้นที่ 10',next?.id));wrap.querySelectorAll('.world-map-10 [data-level]').forEach(button=>button.onclick=()=>beginLevel(+button.dataset.level))};

const world10InventoryBase=showInventory;
showInventory=()=>{world10InventoryBase();const panel=document.querySelector('.collection-panel');if(panel&&!panel.querySelector('.collection-world-10'))panel.insertAdjacentHTML('beforeend',collectionWorld(10,'World 10 · เขาวงกตเงา'))};

if(PLAYTEST_MODE)save.unlocked=Math.max(save.unlocked,49);
else if(save.stars[45]&&save.unlocked<46){save.unlocked=46;persist()}
if(!PLAYTEST_MODE&&save.stars[46]&&save.unlocked<47){save.unlocked=47;persist()}
if(!PLAYTEST_MODE&&save.stars[47]&&save.unlocked<48){save.unlocked=48;persist()}
if(!PLAYTEST_MODE&&save.stars[48]&&save.unlocked<49){save.unlocked=49;persist()}
if(save.player)home();
