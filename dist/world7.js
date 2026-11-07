const world7PlayBase=play;
play=id=>{
  world7PlayBase(id);
  const level=LEVELS[id-1];
  if(level?.type==='life-garden'){
  let step=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),parts=level.parts,values=[level.start];
  p.innerHTML=`<div class="life-garden" id="lifeGarden"><div class="garden-plots" aria-hidden="true">${parts.map((_,index)=>`<span data-garden-plot="${index}">🥀</span>`).join('')}<b>💧</b></div><div class="garden-total" aria-live="polite"><small>ดอกไม้ที่ยังสด</small><strong id="gardenTotal">621</strong><b id="gardenEquation">621 − 185 = ?</b></div><div class="wilted-parts" role="group" aria-label="ถอนกลีบเงาทีละส่วน">${parts.map((part,index)=>`<button data-wilted-part="${index}" ${index?'disabled':''}><span>${index===0?'แปลงใหญ่':index===1?'แปลงกลาง':'แปลงสุดท้าย'}</span><b>−${part}</b><small>${index===0?'1 ร้อย':index===1?'8 สิบ':'5 หน่วย'}</small></button>`).join('')}</div><div class="garden-history" id="gardenHistory" aria-live="polite">621 · รอถอนกลีบเงา 185 ดอก</div></div><div class="garden-actions"><button class="secondary" id="resetLifeGarden">เริ่มรักษาสวนใหม่ ↻</button><button class="primary" id="awakenLifeGarden" disabled>ส่งน้ำให้ดอกสด 436 ดอก</button></div>`;
  const buttons=[...p.querySelectorAll('[data-wilted-part]')],plots=[...p.querySelectorAll('[data-garden-plot]')],total=p.querySelector('#gardenTotal'),equation=p.querySelector('#gardenEquation'),history=p.querySelector('#gardenHistory'),stage=p.querySelector('#lifeGarden'),water=p.querySelector('.garden-plots b'),awaken=p.querySelector('#awakenLifeGarden'),render=()=>{const current=values.at(-1),removed=parts.slice(0,step).reduce((a,b)=>a+b,0);total.textContent=current;equation.textContent=step?`${level.start} − ${removed} = ${current}`:'621 − 185 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('healed',index<step)});plots.forEach((plot,index)=>{plot.textContent=index<step?'🌻':'🥀';plot.classList.toggle('healed',index<step)});history.textContent=values.join(' → ')+(step===parts.length?' · เหลือดอกสด 436 ดอก!':'');stage.style.setProperty('--garden-life',String(step/parts.length));water.classList.toggle('flowing',step===parts.length);awaken.disabled=step!==parts.length},reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)-parts[index]);step++;render();tone(520+step*70,.22);fb.innerHTML=`<div class="star-chance">${values.at(-2)} − ${parts[index]} = ${values.at(-1)}${step===parts.length?' — รากน้ำไหลกลับมาแล้ว!':''}</div>`});
  p.querySelector('#resetLifeGarden').onclick=()=>{reset();tone(330)};
  awaken.onclick=()=>finish(level,1);
  render();
  return;
  }
  if(level?.type==='humming-nectar'){
  let birds=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback');
  p.innerHTML=`<div class="humming-grove" id="hummingGrove"><div class="sound-canopy" aria-hidden="true"><div class="sound-wave" id="soundWave"></div><span>🔔</span><span>🔔</span><span>🔔</span><span>🔔</span></div><div class="nectar-score" aria-live="polite"><small>จังหวะน้ำหวานสะสม</small><strong id="nectarTotal">0</strong><b id="nectarEquation">0 × 5 = 0</b></div><div class="humming-birds" role="group" aria-label="ปลุกนกฮัมมิ่งเบิร์ดทีละตัว">${Array.from({length:level.groups},(_,index)=>`<button data-humming-bird="${index}" ${index?'disabled':''}><span>🐦</span><b>ตัวที่ ${index+1}</b><small>+5 จังหวะ</small></button>`).join('')}</div><div class="nectar-history" id="nectarHistory" aria-live="polite">รอปลุกนกตัวแรก · เป้าหมาย 40 จังหวะ</div></div><div class="garden-actions"><button class="secondary" id="resetHumming">เริ่มวงเพลงใหม่ ↻</button><button class="primary" id="openIcePath" disabled>เปิดทางด้วย 40 จังหวะ</button></div>`;
  const buttons=[...p.querySelectorAll('[data-humming-bird]')],total=p.querySelector('#nectarTotal'),equation=p.querySelector('#nectarEquation'),history=p.querySelector('#nectarHistory'),stage=p.querySelector('#hummingGrove'),wave=p.querySelector('#soundWave'),open=p.querySelector('#openIcePath'),sequence=[];
  const render=()=>{const rhythm=birds*level.each;total.textContent=rhythm;equation.textContent=`${birds} × ${level.each} = ${rhythm}`;buttons.forEach((button,index)=>{button.disabled=index!==birds;button.classList.toggle('singing',index<birds);button.querySelector('span').textContent=index<birds?'🐦‍🔥':'🐦'});history.textContent=sequence.length?`${sequence.join(' · ')}${birds===level.groups?' · เสียงป่ากลับมาครบแล้ว!':''}`:'รอปลุกนกตัวแรก · เป้าหมาย 40 จังหวะ';stage.style.setProperty('--forest-song',String(birds/level.groups));wave.style.width=`${birds/level.groups*100}%`;open.disabled=birds!==level.groups};
  const reset=()=>{birds=0;sequence.splice(0);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==birds)return;birds++;sequence.push(birds*level.each);render();tone(500+birds*55,.2);fb.innerHTML=`<div class="star-chance">นก ${birds} ตัว × ${level.each} จังหวะ = ${birds*level.each}${birds===level.groups?' — ดอกระฆังร้องพร้อมกันแล้ว!':''}</div>`});
  p.querySelector('#resetHumming').onclick=()=>{reset();tone(330)};
  open.onclick=()=>finish(level,1);
  render();
  return;
  }
  if(level?.type==='ice-bridge'){
  let step=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),values=[level.start];
  p.innerHTML=`<div class="ice-forge" id="iceForge"><div class="ice-chasm" aria-hidden="true"><div class="ice-span" id="iceSpan">🧊</div><i>✦</i><i>✦</i><i>✦</i></div><div class="ice-total" aria-live="polite"><small>ก้อนน้ำแข็งในสะพาน</small><strong id="iceTotal">279</strong><b id="iceEquation">279 + 354 = ?</b></div><div class="ice-parts" role="group" aria-label="เชื่อมน้ำแข็งม่วงทีละส่วน">${level.parts.map((part,index)=>`<button data-ice-part="${index}" ${index?'disabled':''}><span>${index===0?'ช่วงใหญ่':index===1?'ช่วงกลาง':'ก้อนสุดท้าย'}</span><b>+${part}</b><small>${index===0?'3 ร้อย':index===1?'5 สิบ':'4 หน่วย'}</small></button>`).join('')}</div><div class="ice-history" id="iceHistory" aria-live="polite">279 · รอเชื่อมน้ำแข็งม่วง 354 ก้อน</div></div><div class="garden-actions"><button class="secondary" id="resetIceBridge">สร้างสะพานใหม่ ↻</button><button class="primary" id="crossIceBridge" disabled>ข้ามสะพาน 633 ก้อน</button></div>`;
  const buttons=[...p.querySelectorAll('[data-ice-part]')],total=p.querySelector('#iceTotal'),equation=p.querySelector('#iceEquation'),history=p.querySelector('#iceHistory'),stage=p.querySelector('#iceForge'),span=p.querySelector('#iceSpan'),cross=p.querySelector('#crossIceBridge');
  const render=()=>{const current=values.at(-1),added=level.parts.slice(0,step).reduce((a,b)=>a+b,0);total.textContent=current;equation.textContent=step?`${level.start} + ${added} = ${current}`:'279 + 354 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('joined',index<step)});history.textContent=values.join(' → ')+(step===level.parts.length?' · สะพาน 633 ก้อนพร้อมข้าม!':'');stage.style.setProperty('--ice-built',String(step/level.parts.length));span.textContent='🧊'.repeat(step+1);cross.disabled=step!==level.parts.length};
  const reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)+level.parts[index]);step++;render();tone(610+step*80,.22);fb.innerHTML=`<div class="star-chance">${values.at(-2)} + ${level.parts[index]} = ${values.at(-1)}${step===level.parts.length?' — สะพานเชื่อมถึงอีกฝั่งแล้ว!':''}</div>`});
  p.querySelector('#resetIceBridge').onclick=()=>{reset();tone(330)};
  cross.onclick=()=>finish(level,1);
  render();
  return;
  }
  if(level?.type!=='time-fountain')return;
  let step=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),values=[level.start];
  p.innerHTML=`<div class="time-sanctum" id="timeSanctum"><div class="time-wheel" aria-hidden="true"><span id="timeGear">⚙️</span><div id="fountainFlow">⛲</div><i>💧</i><i>💧</i><i>💧</i></div><div class="time-total" aria-live="polite"><small>ชิ้นส่วนสมบูรณ์</small><strong id="timeTotal">800</strong><b id="timeEquation">800 − 237 = ?</b></div><div class="broken-parts" role="group" aria-label="คัดชิ้นนาฬิกาที่แตกทีละส่วน">${level.parts.map((part,index)=>`<button data-time-part="${index}" ${index?'disabled':''}><span>${index===0?'เฟืองแตกชุดใหญ่':index===1?'เข็มแตกชุดกลาง':'ชิ้นสุดท้าย'}</span><b>−${part}</b><small>${index===0?'2 ร้อย':index===1?'3 สิบ':'7 หน่วย'}</small></button>`).join('')}</div><div class="time-history" id="timeHistory" aria-live="polite">800 · รอคัดชิ้นแตก 237 ชิ้น</div></div><div class="garden-actions"><button class="secondary" id="resetTimeFountain">ย้อนซ่อมใหม่ ↻</button><button class="primary" id="restartTime" disabled>เดินเวลาด้วย 563 ชิ้น</button></div>`;
  const buttons=[...p.querySelectorAll('[data-time-part]')],total=p.querySelector('#timeTotal'),equation=p.querySelector('#timeEquation'),history=p.querySelector('#timeHistory'),stage=p.querySelector('#timeSanctum'),gear=p.querySelector('#timeGear'),flow=p.querySelector('#fountainFlow'),restart=p.querySelector('#restartTime');
  const render=()=>{const current=values.at(-1),removed=level.parts.slice(0,step).reduce((a,b)=>a+b,0);total.textContent=current;equation.textContent=step?`${level.start} − ${removed} = ${current}`:'800 − 237 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('repaired',index<step)});history.textContent=values.join(' → ')+(step===level.parts.length?' · เหลือชิ้นสมบูรณ์ 563 ชิ้น!':'');stage.style.setProperty('--time-restored',String(step/level.parts.length));gear.style.transform=`rotate(${step*120}deg)`;flow.textContent=step===level.parts.length?'⛲✨':'⛲';restart.disabled=step!==level.parts.length};
  const reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)-level.parts[index]);step++;render();tone(460+step*90,.24);fb.innerHTML=`<div class="star-chance">${values.at(-2)} − ${level.parts[index]} = ${values.at(-1)}${step===level.parts.length?' — วงล้อเวลาเริ่มหมุนแล้ว!':''}</div>`});
  p.querySelector('#resetTimeFountain').onclick=()=>{reset();tone(330)};
  restart.onclick=()=>finish(level,1);
  render();
};

const world7BeginBase=beginLevel;
beginLevel=id=>id===31&&!save.stars[31]?story([...window.WORLD_SEVEN_INTRO,...LEVELS[30].dialogue],()=>explore(31)):world7BeginBase(id);

const world7MapBase=map;
map=()=>{
  world7MapBase();
  const wrap=document.querySelector('.map-wrap');
  if(!wrap||wrap.querySelector('.world-map-7'))return;
  const next=nextAdventure();
  wrap.insertAdjacentHTML('beforeend',worldMap(7,'World 7 · สวนแห่งชีวิตและป่าต้องห้าม','ผลึกหัวใจชิ้นที่ 7',next?.id));
  wrap.querySelectorAll('.world-map-7 [data-level]').forEach(button=>button.onclick=()=>beginLevel(+button.dataset.level));
};

const world7InventoryBase=showInventory;
showInventory=()=>{world7InventoryBase();const panel=document.querySelector('.collection-panel');if(panel&&!panel.querySelector('.collection-world-7'))panel.insertAdjacentHTML('beforeend',collectionWorld(7,'World 7 · สวนแห่งชีวิต'))};

if(PLAYTEST_MODE)save.unlocked=Math.max(save.unlocked,34);
else if(save.stars[30]&&save.unlocked<31){save.unlocked=31;persist()}
if(!PLAYTEST_MODE&&save.stars[31]&&save.unlocked<32){save.unlocked=32;persist()}
if(!PLAYTEST_MODE&&save.stars[32]&&save.unlocked<33){save.unlocked=33;persist()}
if(!PLAYTEST_MODE&&save.stars[33]&&save.unlocked<34){save.unlocked=34;persist()}
if(save.player)home();
