const world9PlayBase=play;
play=id=>{
  world9PlayBase(id);
  const level=LEVELS[id-1];
  if(level?.type!=='current-fish-relay')return;
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
};

const world9BeginBase=beginLevel;
beginLevel=id=>id===41&&!save.stars[41]?story([...window.WORLD_NINE_INTRO,...LEVELS[40].dialogue],()=>explore(41)):world9BeginBase(id);

const world9MapBase=map;
map=()=>{world9MapBase();const wrap=document.querySelector('.map-wrap');if(!wrap||wrap.querySelector('.world-map-9'))return;const next=nextAdventure();wrap.insertAdjacentHTML('beforeend',worldMap(9,'World 9 · กระแสน้ำ แสงลับ และสวนดวงดาว','ผลึกหัวใจชิ้นที่ 9',next?.id));wrap.querySelectorAll('.world-map-9 [data-level]').forEach(button=>button.onclick=()=>beginLevel(+button.dataset.level))};

const world9InventoryBase=showInventory;
showInventory=()=>{world9InventoryBase();const panel=document.querySelector('.collection-panel');if(panel&&!panel.querySelector('.collection-world-9'))panel.insertAdjacentHTML('beforeend',collectionWorld(9,'World 9 · กระแสน้ำและดวงดาว'))};

if(PLAYTEST_MODE)save.unlocked=Math.max(save.unlocked,41);
else if(save.stars[40]&&save.unlocked<41){save.unlocked=41;persist()}
if(save.player)home();
