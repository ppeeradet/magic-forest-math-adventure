const world12PlayBase=play;
play=id=>{
  world12PlayBase(id);
  const level=LEVELS[id-1];
  if(level?.type!=='moon-moth-antenna-lights')return;
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
};

const world12BeginBase=beginLevel;
beginLevel=id=>id===56&&!save.stars[56]?story([...window.WORLD_TWELVE_INTRO,...LEVELS[55].dialogue],()=>explore(56)):world12BeginBase(id);

const world12MapBase=map;
map=()=>{world12MapBase();const wrap=document.querySelector('.map-wrap');if(!wrap||wrap.querySelector('.world-map-12'))return;const next=nextAdventure();wrap.insertAdjacentHTML('beforeend',worldMap(12,'World 12 · แสงจันทร์ ความกล้าหาญ และอัญมณี','ฟื้นฟูดินแดนรอบนอก · ผลึกคงที่ 10/10',next?.id));wrap.querySelectorAll('.world-map-12 [data-level]').forEach(button=>button.onclick=()=>beginLevel(+button.dataset.level));if(save.stars[56]){const nextLock=wrap.querySelector('.next-world-lock'),journeyTitle=wrap.querySelector('.journey-complete h2'),journeyCopy=wrap.querySelector('.journey-complete p');if(nextLock)nextLock.innerHTML='<span>🌳</span><div><small>World 12 ดำเนินต่อ</small><strong>ตอนที่ 57 · ป่าแห่งความสงบ</strong><p>กำแพงต้นไม้สูงใหญ่กำลังรอพลังใจสองชนิด</p></div>';if(journeyTitle)journeyTitle.textContent='พิชิตครบ 56 ตอน!';if(journeyCopy){const totalStars=LEVELS.reduce((sum,l)=>sum+(save.stars[l.id]||0),0);journeyCopy.textContent=`ของวิเศษ ${save.items.length}/56 · ผลึกหัวใจ 10/10 · ดาว ${totalStars}/168`}}};

const world12InventoryBase=showInventory;
showInventory=()=>{world12InventoryBase();const panel=document.querySelector('.collection-panel');if(panel&&!panel.querySelector('.collection-world-12'))panel.insertAdjacentHTML('beforeend',collectionWorld(12,'World 12 · แสงจันทร์และอัญมณี'))};

if(PLAYTEST_TARGET==='world12'){save.unlocked=Math.max(save.unlocked,56);for(let id=1;id<=55;id++)save.stars[id]??=3}
else if(save.stars[55]&&save.unlocked<56){save.unlocked=56;persist()}
if(save.player)home();
