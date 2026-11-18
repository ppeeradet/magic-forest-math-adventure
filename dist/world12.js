const world12PlayBase=play;
play=id=>{
  world12PlayBase(id);
  const level=LEVELS[id-1];
  if(level?.type==='moon-moth-antenna-lights'){
  let moths=0;
  const sequence=[],p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback');
  p.innerHTML=`<div class="moon-moth-lights" id="moonMothLights"><div class="moon-moth-stage" aria-hidden="true"><span id="moonMoths">🌙 · · · · · · ·</span><i id="moonBridge"></i><b id="fluffyReflection">🐇</b></div><div class="moon-moth-total" aria-live="polite"><small>หนวดที่สว่างแล้ว</small><strong id="antennaTotal">0</strong><b id="antennaEquation">0 × 2 = 0</b></div><div class="moon-moth-buttons" role="group" aria-label="ผีเสื้อกลางคืน 7 ตัว">${Array.from({length:level.groups},(_,index)=>`<button data-moon-moth="${index}" ${index?'disabled':''} aria-pressed="false"><span>🦋</span><b>ตัวที่ ${index+1}</b><small>+${level.each} เส้น</small></button>`).join('')}</div><div class="moon-moth-history" id="moonMothHistory" aria-live="polite">รอจุดผีเสื้อตัวแรก · เป้าหมาย 14 เส้น</div></div><div class="garden-actions"><button class="secondary" id="resetMoonMoths">ดับแสงและเริ่มใหม่ ↻</button><button class="primary" id="crossMoonBridge" disabled>ข้ามสะพานแสง 14 เส้น</button></div>`;
  const buttons=[...p.querySelectorAll('[data-moon-moth]')],total=p.querySelector('#antennaTotal'),equation=p.querySelector('#antennaEquation'),history=p.querySelector('#moonMothHistory'),stage=p.querySelector('#moonMothLights'),mothLine=p.querySelector('#moonMoths'),bridge=p.querySelector('#moonBridge'),fluffy=p.querySelector('#fluffyReflection'),cross=p.querySelector('#crossMoonBridge');
  const render=()=>{const lights=moths*level.each;total.textContent=lights;equation.textContent=`${moths} × ${level.each} = ${lights}`;buttons.forEach((button,index)=>{button.disabled=index!==moths;button.classList.toggle('lit',index<moths);button.setAttribute('aria-pressed',String(index<moths))});history.textContent=sequence.length?sequence.join(' → ')+(moths===level.groups?' · หนวดสว่างครบ 14 เส้น!':''):'รอจุดผีเสื้อตัวแรก · เป้าหมาย 14 เส้น';stage.style.setProperty('--moths-lit',String(moths/level.groups));mothLine.textContent='🌙 '+Array.from({length:level.groups},(_,index)=>index<moths?'🦋':'·').join(' ');bridge.style.width=`${moths/level.groups*100}%`;fluffy.style.left=`${8+moths*11}%`;cross.disabled=moths!==level.groups};
  const reset=()=>{moths=0;sequence.splice(0);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==moths)return;moths++;sequence.push(moths*level.each);render();tone(460+moths*52,.18);fb.innerHTML=`<div class="star-chance">ผีเสื้อ ${moths} ตัว × ${level.each} เส้น = ${moths*level.each}${moths===level.groups?' — สะพานแสงพร้อมแล้ว!':''}</div>`});
  p.querySelector('#resetMoonMoths').onclick=()=>{reset();tone(330)};
  cross.onclick=()=>finish(level,1);
  render();
  return;
  }
  if(level?.type==='peace-energy-canopy'){
  let step=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),values=[level.start];
  p.innerHTML=`<div class="peace-canopy" id="peaceCanopy"><div class="peace-stage" aria-hidden="true"><span id="canopyLayers">🌳🌳🌳</span><i id="peaceLight"></i><b id="fluffyListener">🐇</b></div><div class="peace-total" aria-live="polite"><small>พลังใจบนเรือนยอด</small><strong id="peaceTotal">468</strong><b id="peaceEquation">468 + 275 = ?</b></div><div class="peace-parts" role="group" aria-label="รวมพลังแห่งความสุขทีละส่วน">${level.parts.map((part,index)=>`<button data-peace-part="${index}" ${index?'disabled':''}><span>${index===0?'แสงสุขก้อนใหญ่':index===1?'สายลมอุ่น':'ประกายสุดท้าย'}</span><b>+${part}</b><small>${index===0?'2 ร้อย':index===1?'7 สิบ':'5 หน่วย'}</small></button>`).join('')}</div><div class="peace-history" id="peaceHistory" aria-live="polite">468 · รอรวมพลังแห่งความสุข 275 หน่วย</div></div><div class="garden-actions"><button class="secondary" id="resetPeaceCanopy">รวมพลังใหม่ ↻</button><button class="primary" id="openPeaceForest" disabled>เปิดเรือนยอดด้วย 743 หน่วย</button></div>`;
  const buttons=[...p.querySelectorAll('[data-peace-part]')],total=p.querySelector('#peaceTotal'),equation=p.querySelector('#peaceEquation'),history=p.querySelector('#peaceHistory'),stage=p.querySelector('#peaceCanopy'),layers=p.querySelector('#canopyLayers'),light=p.querySelector('#peaceLight'),fluffy=p.querySelector('#fluffyListener'),open=p.querySelector('#openPeaceForest');
  const render=()=>{const current=values.at(-1),joined=level.parts.slice(0,step).reduce((sum,value)=>sum+value,0);total.textContent=current;equation.textContent=step?`${level.start} + ${joined} = ${current}`:'468 + 275 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('joined',index<step)});history.textContent=values.join(' → ')+(step===level.parts.length?' · พลังใจรวมครบ 743 หน่วย!':'');stage.style.setProperty('--peace-joined',String(step/level.parts.length));layers.textContent='🌳'.repeat(3-step)+'🌿'.repeat(step);light.style.width=`${step/level.parts.length*100}%`;fluffy.style.opacity=String(.35+step*.21);open.disabled=step!==level.parts.length};
  const reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)+level.parts[index]);step++;render();tone(430+step*90,.22);fb.innerHTML=`<div class="star-chance">${values.at(-2)} + ${level.parts[index]} = ${values.at(-1)}${step===level.parts.length?' — ได้ยินเสียงใบไม้เปิดทางแล้ว!':''}</div>`});
  p.querySelector('#resetPeaceCanopy').onclick=()=>{reset();tone(330)};
  open.onclick=()=>finish(level,1);
  render();
  return;
  }
  if(level?.type!=='courage-shadow-release')return;
  let step=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),values=[level.start];
  p.innerHTML=`<div class="courage-release" id="courageRelease"><div class="courage-stage" aria-hidden="true"><span id="shadowLayers">🌑🌑🌑</span><i id="courageGlow"></i><b id="valleyStone">🪨</b></div><div class="courage-total" aria-live="polite"><small>ความกล้าจริงที่เหลือ</small><strong id="courageTotal">900</strong><b id="courageEquation">900 − 387 = ?</b></div><div class="courage-parts" role="group" aria-label="ปลดเงาทีละส่วน">${level.parts.map((part,index)=>`<button data-courage-part="${index}" ${index?'disabled':''}><span>${index===0?'เงาชั้นใหญ่':index===1?'เงาชั้นกลาง':'เงาจุดสุดท้าย'}</span><b>−${part}</b><small>${index===0?'3 ร้อย':index===1?'8 สิบ':'7 หน่วย'}</small></button>`).join('')}</div><div class="courage-history" id="courageHistory" aria-live="polite">900 · รอปลดเงา 387 หน่วย</div></div><div class="garden-actions"><button class="secondary" id="resetCourage">คืนเงาและเริ่มใหม่ ↻</button><button class="primary" id="liftValleyStone" disabled>ยกก้อนหินด้วย 513 หน่วย</button></div>`;
  const buttons=[...p.querySelectorAll('[data-courage-part]')],total=p.querySelector('#courageTotal'),equation=p.querySelector('#courageEquation'),history=p.querySelector('#courageHistory'),stage=p.querySelector('#courageRelease'),shadows=p.querySelector('#shadowLayers'),glow=p.querySelector('#courageGlow'),stone=p.querySelector('#valleyStone'),lift=p.querySelector('#liftValleyStone');
  const render=()=>{const current=values.at(-1),removed=level.parts.slice(0,step).reduce((sum,value)=>sum+value,0);total.textContent=current;equation.textContent=step?`${level.start} − ${removed} = ${current}`:'900 − 387 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('released',index<step)});history.textContent=values.join(' → ')+(step===level.parts.length?' · ความกล้าจริงเหลือ 513 หน่วย!':'');stage.style.setProperty('--shadows-released',String(step/level.parts.length));shadows.textContent='🌑'.repeat(3-step)+'💛'.repeat(step);glow.style.width=`${step/level.parts.length*100}%`;stone.style.transform=`translateY(${-step*5}px)`;lift.disabled=step!==level.parts.length};
  const reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)-level.parts[index]);step++;render();tone(570-step*55,.22);fb.innerHTML=`<div class="star-chance">${values.at(-2)} − ${level.parts[index]} = ${values.at(-1)}${step===level.parts.length?' — ทุกคนช่วยกันยกก้อนหินแล้ว!':''}</div>`});
  p.querySelector('#resetCourage').onclick=()=>{reset();tone(330)};
  lift.onclick=()=>finish(level,1);
  render();
};

const world12BeginBase=beginLevel;
beginLevel=id=>id===56&&!save.stars[56]?story([...window.WORLD_TWELVE_INTRO,...LEVELS[55].dialogue],()=>explore(56)):world12BeginBase(id);

const world12MapBase=map;
map=()=>{world12MapBase();const wrap=document.querySelector('.map-wrap');if(!wrap||wrap.querySelector('.world-map-12'))return;const next=nextAdventure();wrap.insertAdjacentHTML('beforeend',worldMap(12,'World 12 · แสงจันทร์ ความกล้าหาญ และอัญมณี','ฟื้นฟูดินแดนรอบนอก · ผลึกคงที่ 10/10',next?.id));wrap.querySelectorAll('.world-map-12 [data-level]').forEach(button=>button.onclick=()=>beginLevel(+button.dataset.level));if(save.stars[58]){const nextLock=wrap.querySelector('.next-world-lock'),journeyTitle=wrap.querySelector('.journey-complete h2'),journeyCopy=wrap.querySelector('.journey-complete p');if(nextLock)nextLock.innerHTML='<span>💧</span><div><small>World 12 ดำเนินต่อ</small><strong>ตอนที่ 59 · ลำธารแห่งความบริสุทธิ์</strong><p>หยดน้ำรักษากำลังรอเชื่อมเป็นสายพลัง</p></div>';if(journeyTitle)journeyTitle.textContent='พิชิตครบ 58 ตอน!';if(journeyCopy){const totalStars=LEVELS.reduce((sum,l)=>sum+(save.stars[l.id]||0),0);journeyCopy.textContent=`ของวิเศษ ${save.items.length}/58 · ผลึกหัวใจ 10/10 · ดาว ${totalStars}/174`}}};

const world12InventoryBase=showInventory;
showInventory=()=>{world12InventoryBase();const panel=document.querySelector('.collection-panel');if(panel&&!panel.querySelector('.collection-world-12'))panel.insertAdjacentHTML('beforeend',collectionWorld(12,'World 12 · แสงจันทร์และอัญมณี'))};

if(PLAYTEST_TARGET==='world12'){save.unlocked=Math.max(save.unlocked,58);for(let id=1;id<=55;id++)save.stars[id]??=3}
else if(save.stars[55]&&save.unlocked<56){save.unlocked=56;persist()}
if(!PLAYTEST_MODE&&save.stars[56]&&save.unlocked<57){save.unlocked=57;persist()}
if(!PLAYTEST_MODE&&save.stars[57]&&save.unlocked<58){save.unlocked=58;persist()}
if(save.player)home();
