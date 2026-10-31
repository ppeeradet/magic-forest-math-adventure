const world5PlayBase=play;
play=id=>{
  world5PlayBase(id);
  const level=LEVELS[id-1];
  if(level?.type==='time-wheel'){
    let days=900,step=0;
    const parts=[300,80,7],p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback');
    p.innerHTML=`<div class="time-valley-stage" id="timeValleyStage"><div class="stone-animals" aria-hidden="true">${['🦊','🦌','🦉','🐇'].map((animal,index)=>`<i data-statue="${index}">${animal}</i>`).join('')}</div><div class="time-wheel" aria-live="polite"><small>เวลาที่ยังเหลือในผนึก</small><strong id="dayCount">900</strong><b id="dayEquation">900 − 387 = ?</b><div class="wheel-ring" id="wheelRing">⏳</div></div><div class="valley-moon" id="valleyMoon" aria-hidden="true">🌙</div></div><div class="time-history" id="timeHistory" aria-live="polite">แยกวันที่ผ่านไป: 387 = 300 + 80 + 7</div><div class="time-parts" role="group" aria-label="วันที่ผ่านไป 387 วัน">${parts.map((value,index)=>`<button data-time-part="${index}" ${index?'disabled':''}><span aria-hidden="true">${['📜','📆','✨'][index]}</span><b>−${value}</b><small>${['3 ร้อย','8 สิบ','7 หน่วย'][index]}</small></button>`).join('')}</div><div class="time-actions"><button class="secondary" id="resetTimeWheel">หมุนกลับจุดเริ่ม ↻</button><button class="primary" id="wakeStatues" disabled>ปลุกรูปปั้นที่ 513 วัน ✦</button></div>`;
    const buttons=[...p.querySelectorAll('[data-time-part]')],statues=[...p.querySelectorAll('[data-statue]')],count=p.querySelector('#dayCount'),equation=p.querySelector('#dayEquation'),history=p.querySelector('#timeHistory'),ring=p.querySelector('#wheelRing'),moon=p.querySelector('#valleyMoon'),wake=p.querySelector('#wakeStatues'),stage=p.querySelector('#timeValleyStage'),render=()=>{count.textContent=days;equation.textContent=step?`900 − ${parts.slice(0,step).reduce((sum,value)=>sum+value,0)} = ${days}`:'900 − 387 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('turned',index<step)});statues.forEach((statue,index)=>statue.classList.toggle('awake',index<step+1&&step>0));ring.style.setProperty('--wheel-turn',`${step*110}deg`);stage.style.setProperty('--hope-light',String(step/3));moon.classList.toggle('revealed',step===3);wake.disabled=step!==3},reset=()=>{days=900;step=0;history.textContent='แยกวันที่ผ่านไป: 387 = 300 + 80 + 7';render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
    buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;const before=days;days-=parts[index];step++;history.textContent=`${before} − ${parts[index]} = ${days}`;render();tone(520-step*60,.22);fb.innerHTML=`<div class="star-chance">${before} − ${parts[index]} = ${days}${step===3?' — รูปปั้นกำลังตื่น! ✦':''}</div>`});
    p.querySelector('#resetTimeWheel').onclick=()=>{reset();tone(330)};
    wake.onclick=()=>finish(level,1);
    render();
    return;
  }
  if(level?.type!=='memory-tree')return;
  let memories=587,step=0;
  const parts=[200,30,5],p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback');
  p.innerHTML=`<div class="memory-tree-stage" id="memoryTreeStage"><div class="memory-crown" aria-hidden="true">${Array.from({length:9},(_,index)=>`<i style="--memory-index:${index}">✦</i>`).join('')}</div><div class="memory-total" aria-live="polite"><small>ความทรงจำที่เชื่อมแล้ว</small><strong id="memoryCount">587</strong><b id="memoryEquation">587 + 235 = ?</b><div><i id="memoryBar"></i></div></div><div class="memory-map" id="memoryMap" aria-hidden="true">🗺️</div></div><div class="memory-history" id="memoryHistory" aria-live="polite">แยกภาพใหม่: 235 = 200 + 30 + 5</div><div class="memory-parts" role="group" aria-label="ความทรงจำใหม่ 235 ชิ้น">${parts.map((value,index)=>`<button data-memory-part="${index}" ${index?'disabled':''}><span aria-hidden="true">${['🌿','🍃','✨'][index]}</span><b>+${value}</b><small>${['2 ร้อย','3 สิบ','5 หน่วย'][index]}</small></button>`).join('')}</div><div class="memory-actions"><button class="secondary" id="resetMemoryTree">เรียงภาพใหม่ ↻</button><button class="primary" id="revealMemoryMap" disabled>เปิดแผนที่ 822 ภาพ ✦</button></div>`;
  const buttons=[...p.querySelectorAll('[data-memory-part]')],count=p.querySelector('#memoryCount'),equation=p.querySelector('#memoryEquation'),history=p.querySelector('#memoryHistory'),bar=p.querySelector('#memoryBar'),mapIcon=p.querySelector('#memoryMap'),reveal=p.querySelector('#revealMemoryMap'),stage=p.querySelector('#memoryTreeStage'),render=()=>{count.textContent=memories;equation.textContent=step?`587 + ${parts.slice(0,step).reduce((sum,value)=>sum+value,0)} = ${memories}`:'587 + 235 = ?';bar.style.width=`${step/3*100}%`;buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('joined',index<step)});stage.style.setProperty('--memory-light',String(step/3));mapIcon.classList.toggle('revealed',step===3);reveal.disabled=step!==3},reset=()=>{memories=587;step=0;history.textContent='แยกภาพใหม่: 235 = 200 + 30 + 5';render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;const before=memories;memories+=parts[index];step++;history.textContent=`${before} + ${parts[index]} = ${memories}`;render();tone(460+step*100,.22);fb.innerHTML=`<div class="star-chance">${before} + ${parts[index]} = ${memories}${step===3?' — ภาพทั้งหมดเชื่อมแล้ว! ✦':''}</div>`});
  p.querySelector('#resetMemoryTree').onclick=()=>{reset();tone(330)};
  reveal.onclick=()=>finish(level,1);
  render();
};

const world5BeginBase=beginLevel;
beginLevel=id=>id===21&&!save.stars[21]?story([...window.WORLD_FIVE_INTRO,...LEVELS[20].dialogue],()=>explore(21)):world5BeginBase(id);

const world5MapBase=map;
map=()=>{
  world5MapBase();
  const wrap=document.querySelector('.map-wrap');
  if(!wrap||wrap.querySelector('.world-map-5'))return;
  const next=nextAdventure();
  wrap.insertAdjacentHTML('beforeend',worldMap(5,'World 5 · ป่าแห่งความทรงจำและปราสาทเงา','ผลึกหัวใจชิ้นที่ 5',next?.id));
  wrap.querySelectorAll('.world-map-5 [data-level]').forEach(button=>button.onclick=()=>beginLevel(+button.dataset.level));
};

const world5InventoryBase=showInventory;
showInventory=()=>{world5InventoryBase();const panel=document.querySelector('.collection-panel');if(panel&&!panel.querySelector('.collection-world-5'))panel.insertAdjacentHTML('beforeend',collectionWorld(5,'World 5 · ป่าแห่งความทรงจำ'))};

if(PLAYTEST_MODE)save.unlocked=Math.max(save.unlocked,22);
else if(save.stars[21]&&save.unlocked<22){save.unlocked=22;persist()}
else if(save.stars[20]&&save.unlocked<21){save.unlocked=21;persist()}
if(save.player)home();
