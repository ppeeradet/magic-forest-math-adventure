const world4PlayBase=play;
play=id=>{
  world4PlayBase(id);
  const level=LEVELS[id-1];
  if(level?.type!=='silent-wall')return;
  let stones=500,step=0;
  const parts=[200,70,3],p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback');
  p.innerHTML=`<div class="stone-wall-meter" aria-live="polite"><small>ศิลาที่ยังอยู่บนกำแพง</small><strong id="stoneCount">500</strong><b id="stoneEquation">500 − 273 = ?</b><div><i id="stoneBar"></i></div></div><div class="stone-history" id="stoneHistory" aria-live="polite">แยกศิลาที่ถูกนำไป: 273 = 200 + 70 + 3</div><div class="stone-parts" role="group" aria-label="ส่วนของศิลา 273 ก้อน">${parts.map((value,index)=>`<button data-stone-part="${index}" ${index?'disabled':''}><span aria-hidden="true">${index===0?'🪨':'✦'}</span><b>−${value}</b><small>${['2 ร้อย','7 สิบ','3 หน่วย'][index]}</small></button>`).join('')}</div><div class="stone-actions"><button class="secondary" id="resetStoneWall">ก่อกำแพงใหม่ ↻</button><button class="primary" id="openSkyGate" disabled>เปิดทางด้วยศิลา 227 ก้อน ✦</button></div>`;
  const buttons=[...p.querySelectorAll('[data-stone-part]')],render=()=>{stoneCount.textContent=stones;stoneEquation.textContent=step?`500 − ${parts.slice(0,step).reduce((sum,value)=>sum+value,0)} = ${stones}`:'500 − 273 = ?';stoneBar.style.width=`${step/3*100}%`;buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('removed',index<step)});openSkyGate.disabled=step!==3},reset=()=>{stones=500;step=0;stoneHistory.textContent='แยกศิลาที่ถูกนำไป: 273 = 200 + 70 + 3';render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;const before=stones;stones-=parts[index];step++;stoneHistory.textContent=`${before} − ${parts[index]} = ${stones}`;render();tone(440+step*100,.2);if(step===3)fb.innerHTML='<div class="star-chance">500 − 200 − 70 − 3 = 227 — ช่องลมเปิดแล้ว! ✦</div>'});
  resetStoneWall.onclick=()=>{reset();tone(330)};
  openSkyGate.onclick=()=>finish(level,1);
  render();
};

const world4BeginBase=beginLevel;
beginLevel=id=>id===16&&!save.stars[16]?story([...window.WORLD_FOUR_INTRO,...LEVELS[15].dialogue],()=>explore(16)):world4BeginBase(id);

const world4MapBase=map;
map=()=>{
  world4MapBase();
  const wrap=document.querySelector('.map-wrap');
  if(!wrap||wrap.querySelector('.world-map-4'))return;
  const next=nextAdventure();
  wrap.insertAdjacentHTML('beforeend',worldMap(4,'World 4 · นครลอยฟ้าและบทเพลงแห่งเมฆ','ผลึกหัวใจชิ้นที่ 4',next?.id));
  wrap.querySelectorAll('.world-map-4 [data-level]').forEach(button=>button.onclick=()=>beginLevel(+button.dataset.level));
};

const world4InventoryBase=showInventory;
showInventory=()=>{world4InventoryBase();const panel=document.querySelector('.collection-panel');if(panel&&!panel.querySelector('.collection-world-4'))panel.insertAdjacentHTML('beforeend',collectionWorld(4,'World 4 · นครลอยฟ้า'))};

if(PLAYTEST_MODE)save.unlocked=Math.max(save.unlocked,16);
else if(save.stars[15]&&save.unlocked<16){save.unlocked=16;persist()}
if(save.player)home();
