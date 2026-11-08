const world8PlayBase=play;
play=id=>{
  world8PlayBase(id);
  const level=LEVELS[id-1];
  if(level?.type==='invisible-fish-ripples'){
  let step=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),values=[level.start];
  p.innerHTML=`<div class="invisible-lake" id="invisibleLake"><div class="ripple-bridge" aria-hidden="true"><div id="fishSchool">🐟</div><span>◯</span><span>◯</span><span>◯</span><span>◯</span></div><div class="fish-total" aria-live="polite"><small>ปลาล่องหนที่เผยแล้ว</small><strong id="fishTotal">398</strong><b id="fishEquation">398 + 427 = ?</b></div><div class="hidden-schools" role="group" aria-label="เผยปลาเงินทีละกลุ่ม">${level.parts.map((part,index)=>`<button data-fish-school="${index}" ${index?'disabled':''}><span>${index===0?'ฝูงใหญ่':index===1?'ฝูงกลาง':'ฝูงสุดท้าย'}</span><b>+${part}</b><small>${index===0?'4 ร้อย':index===1?'2 สิบ':'7 หน่วย'}</small></button>`).join('')}</div><div class="fish-history" id="fishHistory" aria-live="polite">398 · รอเผยปลาเงิน 427 ตัว</div></div><div class="garden-actions"><button class="secondary" id="resetInvisibleFish">ฉายทรายใหม่ ↻</button><button class="primary" id="crossRippleBridge" disabled>ข้ามด้วยปลา 825 ตัว</button></div>`;
  const buttons=[...p.querySelectorAll('[data-fish-school]')],total=p.querySelector('#fishTotal'),equation=p.querySelector('#fishEquation'),history=p.querySelector('#fishHistory'),stage=p.querySelector('#invisibleLake'),school=p.querySelector('#fishSchool'),cross=p.querySelector('#crossRippleBridge');
  const render=()=>{const current=values.at(-1),added=level.parts.slice(0,step).reduce((a,b)=>a+b,0);total.textContent=current;equation.textContent=step?`${level.start} + ${added} = ${current}`:'398 + 427 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('revealed',index<step)});history.textContent=values.join(' → ')+(step===level.parts.length?' · ฝูงปลา 825 ตัวสร้างสะพานแล้ว!':'');stage.style.setProperty('--fish-revealed',String(step/level.parts.length));school.textContent='🐟'+'🐠'.repeat(step);cross.disabled=step!==level.parts.length};
  const reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)+level.parts[index]);step++;render();tone(540+step*75,.22);fb.innerHTML=`<div class="star-chance">${values.at(-2)} + ${level.parts[index]} = ${values.at(-1)}${step===level.parts.length?' — วงคลื่นเชื่อมถึงอีกฝั่งแล้ว!':''}</div>`});
  p.querySelector('#resetInvisibleFish').onclick=()=>{reset();tone(330)};
  cross.onclick=()=>finish(level,1);
  render();
  return;
  }
  if(level?.type!=='moon-web-cutter')return;
  let step=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),values=[level.start];
  p.innerHTML=`<div class="web-cavern" id="webCavern"><div class="web-stage" aria-hidden="true"><span id="webLayers">🕸️🕸️🕸️</span><b id="spiderFriends">🕷️</b></div><div class="web-total" aria-live="polite"><small>ใยเวทมนตร์ที่เหลือ</small><strong id="webTotal">910</strong><b id="webEquation">910 − 386 = ?</b></div><div class="shadow-web-parts" role="group" aria-label="ตัดใยเงาทีละส่วน">${level.parts.map((part,index)=>`<button data-web-part="${index}" ${index?'disabled':''}><span>${index===0?'ใยชั้นใหญ่':index===1?'ใยชั้นกลาง':'ปมสุดท้าย'}</span><b>−${part}</b><small>${index===0?'3 ร้อย':index===1?'8 สิบ':'6 หน่วย'}</small></button>`).join('')}</div><div class="web-history" id="webHistory" aria-live="polite">910 · รอตัดใยเงา 386 เมตร</div></div><div class="garden-actions"><button class="secondary" id="resetMoonWeb">เริ่มตัดใหม่ ↻</button><button class="primary" id="openSpiderCave" disabled>เปิดทางด้วยใย 524 เมตร</button></div>`;
  const buttons=[...p.querySelectorAll('[data-web-part]')],total=p.querySelector('#webTotal'),equation=p.querySelector('#webEquation'),history=p.querySelector('#webHistory'),stage=p.querySelector('#webCavern'),layers=p.querySelector('#webLayers'),friends=p.querySelector('#spiderFriends'),open=p.querySelector('#openSpiderCave');
  const render=()=>{const current=values.at(-1),removed=level.parts.slice(0,step).reduce((a,b)=>a+b,0);total.textContent=current;equation.textContent=step?`${level.start} − ${removed} = ${current}`:'910 − 386 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('cut',index<step)});history.textContent=values.join(' → ')+(step===level.parts.length?' · เหลือใยบริสุทธิ์ 524 เมตร!':'');stage.style.setProperty('--web-cleared',String(step/level.parts.length));layers.textContent='🕸️'.repeat(Math.max(0,3-step));friends.textContent='🕷️'.repeat(step+1);open.disabled=step!==level.parts.length};
  const reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)-level.parts[index]);step++;render();tone(500+step*70,.22);fb.innerHTML=`<div class="star-chance">${values.at(-2)} − ${level.parts[index]} = ${values.at(-1)}${step===level.parts.length?' — ลูกแมงมุมเป็นอิสระแล้ว!':''}</div>`});
  p.querySelector('#resetMoonWeb').onclick=()=>{reset();tone(330)};
  open.onclick=()=>finish(level,1);
  render();
};

const world8BeginBase=beginLevel;
beginLevel=id=>id===36&&!save.stars[36]?story([...window.WORLD_EIGHT_INTRO,...LEVELS[35].dialogue],()=>explore(36)):world8BeginBase(id);

const world8MapBase=map;
map=()=>{world8MapBase();const wrap=document.querySelector('.map-wrap');if(!wrap||wrap.querySelector('.world-map-8'))return;const next=nextAdventure();wrap.insertAdjacentHTML('beforeend',worldMap(8,'World 8 · ม่านล่องหนและหุบเขาแห่งความฝัน','ผลึกหัวใจชิ้นที่ 8',next?.id));wrap.querySelectorAll('.world-map-8 [data-level]').forEach(button=>button.onclick=()=>beginLevel(+button.dataset.level))};

const world8InventoryBase=showInventory;
showInventory=()=>{world8InventoryBase();const panel=document.querySelector('.collection-panel');if(panel&&!panel.querySelector('.collection-world-8'))panel.insertAdjacentHTML('beforeend',collectionWorld(8,'World 8 · ม่านล่องหน'))};

if(PLAYTEST_MODE)save.unlocked=Math.max(save.unlocked,37);
else if(save.stars[35]&&save.unlocked<36){save.unlocked=36;persist()}
if(!PLAYTEST_MODE&&save.stars[36]&&save.unlocked<37){save.unlocked=37;persist()}
if(save.player)home();
