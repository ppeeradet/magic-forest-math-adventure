const world9PlayBase=play;
play=id=>{
  world9PlayBase(id);
  const level=LEVELS[id-1];
  if(level?.type==='current-fish-relay'){
  let swimmers=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),sequence=[];
  p.innerHTML=`<div class="current-relay" id="currentRelay"><div class="stream-stage" aria-hidden="true"><span id="fishRelay">🧶</span><i id="currentRoute"></i></div><div class="relay-total" aria-live="polite"><small>ระยะทางขบวนปลา</small><strong id="relayTotal">0</strong><b id="relayEquation">0 × 9 = 0</b></div><div class="relay-fish" role="group" aria-label="ปล่อยปลาเข้าขบวนทีละตัว">${Array.from({length:level.groups},(_,index)=>`<button data-relay-fish="${index}" ${index?'disabled':''}><span>🐟</span><b>ตัวที่ ${index+1}</b><small>+9 กม.</small></button>`).join('')}</div><div class="relay-history" id="relayHistory" aria-live="polite">รอปล่อยปลาตัวแรก · เป้าหมาย 54 กิโลเมตร</div></div><div class="garden-actions"><button class="secondary" id="resetFishRelay">รวมขบวนใหม่ ↻</button><button class="primary" id="crossSpeedStream" disabled>ข้ามลำธารด้วย 54 กม.</button></div>`;
  const buttons=[...p.querySelectorAll('[data-relay-fish]')],total=p.querySelector('#relayTotal'),equation=p.querySelector('#relayEquation'),history=p.querySelector('#relayHistory'),stage=p.querySelector('#currentRelay'),fish=p.querySelector('#fishRelay'),route=p.querySelector('#currentRoute'),cross=p.querySelector('#crossSpeedStream');
  const render=()=>{const distance=swimmers*level.each;total.textContent=distance;equation.textContent=`${swimmers} × ${level.each} = ${distance}`;buttons.forEach((button,index)=>{button.disabled=index!==swimmers;button.classList.toggle('swimming',index<swimmers);button.querySelector('span').textContent=index<swimmers?'🐠':'🐟'});history.textContent=sequence.length?`${sequence.join(' → ')}${swimmers===level.groups?' · ขบวนครบ 54 กิโลเมตร!':''}`:'รอปล่อยปลาตัวแรก · เป้าหมาย 54 กิโลเมตร';stage.style.setProperty('--relay-distance',String(swimmers/level.groups));fish.textContent='🧶'+'🐠'.repeat(swimmers);route.style.width=`${swimmers/level.groups*100}%`;cross.disabled=swimmers!==level.groups};
  const reset=()=>{swimmers=0;sequence.splice(0);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==swimmers)return;swimmers++;sequence.push(swimmers*level.each);render();tone(470+swimmers*55,.21);fb.innerHTML=`<div class="star-chance">ปลา ${swimmers} ตัว × ${level.each} กม. = ${swimmers*level.each}${swimmers===level.groups?' — ธงด้ายฝันผ่านน้ำวนแล้ว!':''}</div>`});
  p.querySelector('#resetFishRelay').onclick=()=>{reset();tone(330)};
  cross.onclick=()=>finish(level,1);
  render();
  return;
  }
  if(level?.type==='sun-prism-merger'){
  let step=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),values=[level.start];
  p.innerHTML=`<div class="sun-prism" id="sunPrism"><div class="prism-stage" aria-hidden="true"><span id="sunBeam">💛</span><b>🔺</b><i id="sunDoor">🌑</i></div><div class="sun-total" aria-live="polite"><small>ผลึกแสงที่รวมแล้ว</small><strong id="sunTotal">168</strong><b id="sunEquation">168 + 295 = ?</b></div><div class="sun-parts" role="group" aria-label="ส่งผลึกสีส้มผ่านปริซึมทีละส่วน">${level.parts.map((part,index)=>`<button data-sun-part="${index}" ${index?'disabled':''}><span>${index===0?'ลำแสงใหญ่':index===1?'ลำแสงกลาง':'ประกายสุดท้าย'}</span><b>+${part}</b><small>${index===0?'2 ร้อย':index===1?'9 สิบ':'5 หน่วย'}</small></button>`).join('')}</div><div class="sun-history" id="sunHistory" aria-live="polite">168 · รอรวมผลึกสีส้ม 295 ชิ้น</div></div><div class="garden-actions"><button class="secondary" id="resetSunPrism">จัดปริซึมใหม่ ↻</button><button class="primary" id="openSunDoor" disabled>เปิดประตูด้วยแสง 463 ชิ้น</button></div>`;
  const buttons=[...p.querySelectorAll('[data-sun-part]')],total=p.querySelector('#sunTotal'),equation=p.querySelector('#sunEquation'),history=p.querySelector('#sunHistory'),stage=p.querySelector('#sunPrism'),beam=p.querySelector('#sunBeam'),door=p.querySelector('#sunDoor'),open=p.querySelector('#openSunDoor');
  const render=()=>{const current=values.at(-1),added=level.parts.slice(0,step).reduce((a,b)=>a+b,0);total.textContent=current;equation.textContent=step?`${level.start} + ${added} = ${current}`:'168 + 295 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('merged',index<step)});history.textContent=values.join(' → ')+(step===level.parts.length?' · แสงสุริยะครบ 463 ชิ้น!':'');stage.style.setProperty('--sun-merged',String(step/level.parts.length));beam.textContent='💛'+'🧡'.repeat(step);door.textContent=step===level.parts.length?'☀️':'🌑';open.disabled=step!==level.parts.length};
  const reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)+level.parts[index]);step++;render();tone(520+step*75,.23);fb.innerHTML=`<div class="star-chance">${values.at(-2)} + ${level.parts[index]} = ${values.at(-1)}${step===level.parts.length?' — ประตูสุริยะสว่างแล้ว!':''}</div>`});
  p.querySelector('#resetSunPrism').onclick=()=>{reset();tone(330)};
  open.onclick=()=>finish(level,1);
  render();
  return;
  }
  if(level?.type==='stone-tear-channels'){
  let step=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),values=[level.start];
  p.innerHTML=`<div class="tear-channels" id="tearChannels"><div class="stone-stage" aria-hidden="true"><span id="stoneFaces">🗿🗿🗿</span><i id="tearStream"></i></div><div class="tear-total" aria-live="polite"><small>น้ำตาบริสุทธิ์ที่เหลือ</small><strong id="tearTotal">830</strong><b id="tearEquation">830 − 475 = ?</b></div><div class="tear-parts" role="group" aria-label="แยกน้ำตาที่ถูกเก็บไปทีละส่วน">${level.parts.map((part,index)=>`<button data-tear-part="${index}" ${index?'disabled':''}><span>${index===0?'อ่างใหญ่':index===1?'ร่องกลาง':'หยดสุดท้าย'}</span><b>−${part}</b><small>${index===0?'4 ร้อย':index===1?'7 สิบ':'5 หน่วย'}</small></button>`).join('')}</div><div class="tear-history" id="tearHistory" aria-live="polite">830 · รอแยกน้ำตาที่ถูกเก็บ 475 หยด</div></div><div class="garden-actions"><button class="secondary" id="resetTearChannels">เปิดร่องน้ำใหม่ ↻</button><button class="primary" id="comfortStoneGuardians" disabled>คืนรอยยิ้มด้วย 355 หยด</button></div>`;
  const buttons=[...p.querySelectorAll('[data-tear-part]')],total=p.querySelector('#tearTotal'),equation=p.querySelector('#tearEquation'),history=p.querySelector('#tearHistory'),stage=p.querySelector('#tearChannels'),faces=p.querySelector('#stoneFaces'),stream=p.querySelector('#tearStream'),comfort=p.querySelector('#comfortStoneGuardians');
  const render=()=>{const current=values.at(-1),removed=level.parts.slice(0,step).reduce((a,b)=>a+b,0);total.textContent=current;equation.textContent=step?`${level.start} − ${removed} = ${current}`:'830 − 475 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('flowing',index<step)});history.textContent=values.join(' → ')+(step===level.parts.length?' · เหลือน้ำตาบริสุทธิ์ 355 หยด!':'');stage.style.setProperty('--tears-restored',String(step/level.parts.length));faces.textContent='🗿'.repeat(3-step)+'🙂'.repeat(step);stream.style.width=`${step/level.parts.length*100}%`;comfort.disabled=step!==level.parts.length};
  const reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)-level.parts[index]);step++;render();tone(600-step*70,.23);fb.innerHTML=`<div class="star-chance">${values.at(-2)} − ${level.parts[index]} = ${values.at(-1)}${step===level.parts.length?' — ร่องน้ำตาไหลครบแล้ว!':''}</div>`});
  p.querySelector('#resetTearChannels').onclick=()=>{reset();tone(330)};
  comfort.onclick=()=>finish(level,1);
  render();
  return;
  }
  if(level?.type!=='seven-star-bridge')return;
  let stars=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),sequence=[];
  p.innerHTML=`<div class="star-bridge" id="starBridge"><div class="star-lake" aria-hidden="true"><span id="starSky">🌑</span><i id="starPath"></i></div><div class="star-total" aria-live="polite"><small>แสงดาวสะสม</small><strong id="starTotal">0</strong><b id="starEquation">0 × 5 = 0</b></div><div class="star-buttons" role="group" aria-label="จุดดาวทีละดวง">${Array.from({length:level.groups},(_,index)=>`<button data-star="${index}" ${index?'disabled':''}><span>☆</span><b>ดวงที่ ${index+1}</b><small>+5 แฉก</small></button>`).join('')}</div><div class="star-history" id="starHistory" aria-live="polite">รอจุดดาวดวงแรก · เป้าหมาย 35 แฉก</div></div><div class="garden-actions"><button class="secondary" id="resetStarBridge">ดับดาวแล้วเริ่มใหม่ ↻</button><button class="primary" id="crossStarLake" disabled>ข้ามด้วยแสง 35 แฉก</button></div>`;
  const buttons=[...p.querySelectorAll('[data-star]')],total=p.querySelector('#starTotal'),equation=p.querySelector('#starEquation'),history=p.querySelector('#starHistory'),stage=p.querySelector('#starBridge'),sky=p.querySelector('#starSky'),path=p.querySelector('#starPath'),cross=p.querySelector('#crossStarLake');
  const render=()=>{const light=stars*level.each;total.textContent=light;equation.textContent=`${stars} × ${level.each} = ${light}`;buttons.forEach((button,index)=>{button.disabled=index!==stars;button.classList.toggle('lit',index<stars);button.querySelector('span').textContent=index<stars?'⭐':'☆'});history.textContent=sequence.length?`${sequence.join(' → ')}${stars===level.groups?' · สะพานครบ 35 แฉก!':''}`:'รอจุดดาวดวงแรก · เป้าหมาย 35 แฉก';stage.style.setProperty('--stars-lit',String(stars/level.groups));sky.textContent='⭐'.repeat(stars)||'🌑';path.style.width=`${stars/level.groups*100}%`;cross.disabled=stars!==level.groups};
  const reset=()=>{stars=0;sequence.splice(0);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==stars)return;stars++;sequence.push(stars*level.each);render();tone(500+stars*48,.21);fb.innerHTML=`<div class="star-chance">ดาว ${stars} ดวง × ${level.each} แฉก = ${stars*level.each}${stars===level.groups?' — สะพานกลุ่มดาวสมบูรณ์แล้ว!':''}</div>`});
  p.querySelector('#resetStarBridge').onclick=()=>{reset();tone(330)};
  cross.onclick=()=>finish(level,1);
  render();
};

const world9BeginBase=beginLevel;
beginLevel=id=>id===41&&!save.stars[41]?story([...window.WORLD_NINE_INTRO,...LEVELS[40].dialogue],()=>explore(41)):world9BeginBase(id);

const world9MapBase=map;
map=()=>{world9MapBase();const wrap=document.querySelector('.map-wrap');if(!wrap||wrap.querySelector('.world-map-9'))return;const next=nextAdventure();wrap.insertAdjacentHTML('beforeend',worldMap(9,'World 9 · กระแสน้ำ แสงลับ และสวนดวงดาว','ผลึกหัวใจชิ้นที่ 9',next?.id));wrap.querySelectorAll('.world-map-9 [data-level]').forEach(button=>button.onclick=()=>beginLevel(+button.dataset.level))};

const world9InventoryBase=showInventory;
showInventory=()=>{world9InventoryBase();const panel=document.querySelector('.collection-panel');if(panel&&!panel.querySelector('.collection-world-9'))panel.insertAdjacentHTML('beforeend',collectionWorld(9,'World 9 · กระแสน้ำและดวงดาว'))};

if(PLAYTEST_MODE)save.unlocked=Math.max(save.unlocked,44);
else if(save.stars[40]&&save.unlocked<41){save.unlocked=41;persist()}
if(!PLAYTEST_MODE&&save.stars[41]&&save.unlocked<42){save.unlocked=42;persist()}
if(!PLAYTEST_MODE&&save.stars[42]&&save.unlocked<43){save.unlocked=43;persist()}
if(!PLAYTEST_MODE&&save.stars[43]&&save.unlocked<44){save.unlocked=44;persist()}
if(save.player)home();
