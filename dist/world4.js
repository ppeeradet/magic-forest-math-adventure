const world4PlayBase=play;
play=id=>{
  world4PlayBase(id);
  const level=LEVELS[id-1];
  if(level?.type==='mirror-maze'){
    let mirrors=721,step=0;
    const parts=[400,50,6],p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback');
    p.innerHTML=`<div class="mirror-maze-stage" id="mirrorMazeStage"><div class="mirror-counter" aria-live="polite"><small>กระจกที่ยังสะท้อนอยู่</small><strong id="mirrorCount">721</strong><b id="mirrorEquation">721 − 456 = ?</b></div><div class="mirror-corridor" aria-hidden="true">${Array.from({length:9},(_,index)=>`<i style="--mirror-index:${index}">✦</i>`).join('')}<span id="truePath">ทางจริง 🌟</span></div></div><div class="illusion-history" id="illusionHistory" aria-live="polite">แยกภาพลวง: 456 = 400 + 50 + 6</div><div class="mirror-parts" role="group" aria-label="กระจกเงา 456 ชิ้น">${parts.map((value,index)=>`<button data-mirror-part="${index}" ${index?'disabled':''}><span aria-hidden="true">${['🌫️','🪞','✨'][index]}</span><b>−${value}</b><small>${['4 ร้อย','5 สิบ','6 หน่วย'][index]}</small></button>`).join('')}</div><div class="mirror-actions"><button class="secondary" id="resetMirrorMaze">คืนภาพลวง ↻</button><button class="primary" id="followTruePath" disabled>ตามกระจกจริง 265 ชิ้น ✦</button></div>`;
    const buttons=[...p.querySelectorAll('[data-mirror-part]')],count=p.querySelector('#mirrorCount'),equation=p.querySelector('#mirrorEquation'),history=p.querySelector('#illusionHistory'),path=p.querySelector('#truePath'),follow=p.querySelector('#followTruePath'),stage=p.querySelector('#mirrorMazeStage'),render=()=>{count.textContent=mirrors;equation.textContent=step?`721 − ${parts.slice(0,step).reduce((sum,value)=>sum+value,0)} = ${mirrors}`:'721 − 456 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('cleared',index<step)});stage.style.setProperty('--illusion-level',String(1-step/3));path.classList.toggle('revealed',step===3);follow.disabled=step!==3},reset=()=>{mirrors=721;step=0;history.textContent='แยกภาพลวง: 456 = 400 + 50 + 6';render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
    buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;const before=mirrors;mirrors-=parts[index];step++;history.textContent=`${before} − ${parts[index]} = ${mirrors}`;render();tone(600-step*85,.22);fb.innerHTML=`<div class="star-chance">${before} − ${parts[index]} = ${mirrors}${step===3?' — ทางจริงสว่างขึ้นแล้ว! ✦':''}</div>`});
    p.querySelector('#resetMirrorMaze').onclick=()=>{reset();tone(330)};
    follow.onclick=()=>finish(level,1);
    render();
    return;
  }
  if(level?.type==='music-river'){
    let notes=472,step=0;
    const parts=[300,80,9],p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback');
    p.innerHTML=`<div class="music-river-stage" id="musicRiverStage"><div class="river-bank"><span aria-hidden="true">🎼</span><small>โน้ตบนฝั่ง</small><strong id="musicNoteCount">472</strong></div><div class="music-bridge" id="musicBridge" aria-live="polite">${parts.map((_,index)=>`<i data-bridge-part="${index}">♫</i>`).join('')}</div><div class="river-bank happy"><span aria-hidden="true">😊</span><small>โน้ตที่จะรวม</small><strong>389</strong></div></div><div class="music-equation" id="musicEquation" aria-live="polite">472 + 389 = ?</div><div class="music-parts" role="group" aria-label="โน้ตแห่งความสุข 389 ตัว">${parts.map((value,index)=>`<button data-music-part="${index}" ${index?'disabled':''}><span aria-hidden="true">${['🎶','🎵','♪'][index]}</span><b>+${value}</b><small>${['3 ร้อย','8 สิบ','9 หน่วย'][index]}</small></button>`).join('')}</div><div class="music-actions"><button class="secondary" id="resetMusicRiver">เรียบเรียงใหม่ ↻</button><button class="primary" id="crossMusicBridge" disabled>ข้ามสะพาน 861 โน้ต ✦</button></div>`;
    const buttons=[...p.querySelectorAll('[data-music-part]')],bridge=[...p.querySelectorAll('[data-bridge-part]')],count=p.querySelector('#musicNoteCount'),equation=p.querySelector('#musicEquation'),cross=p.querySelector('#crossMusicBridge'),render=()=>{count.textContent=notes;equation.textContent=step?`472 + ${parts.slice(0,step).reduce((sum,value)=>sum+value,0)} = ${notes}`:'472 + 389 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('played',index<step)});bridge.forEach((piece,index)=>piece.classList.toggle('built',index<step));cross.disabled=step!==3;p.querySelector('#musicRiverStage').style.setProperty('--bridge-progress',String(step/3))},reset=()=>{notes=472;step=0;render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
    buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;const before=notes;notes+=parts[index];step++;render();tone(520+step*110,.22);fb.innerHTML=`<div class="star-chance">${before} + ${parts[index]} = ${notes}${step===3?' — สะพานเสียงสมบูรณ์! ✦':''}</div>`});
    p.querySelector('#resetMusicRiver').onclick=()=>{reset();tone(330)};
    cross.onclick=()=>finish(level,1);
    render();
    return;
  }
  if(level?.type==='spell-arena'){
    let waves=0,power=0;
    const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback');
    p.innerHTML=`<div class="spell-arena-stage" id="spellArenaStage"><div class="spell-crystal" aria-hidden="true">🔮</div><div class="shield-power" aria-live="polite"><small>พลังที่โล่สะสม</small><strong id="shieldPower">0</strong><b id="shieldEquation">0 × 9 = 0 หน่วย</b><div><i id="shieldBar"></i></div></div><div class="cloud-shield" aria-hidden="true">🛡️</div></div><div class="spell-sequence" id="spellSequence" aria-live="polite">เตรียมรับคาถาระลอกแรก…</div><div class="spell-waves" role="group" aria-label="คาถา 5 ระลอก">${Array.from({length:5},(_,index)=>`<button data-spell-wave="${index}" ${index?'disabled':''}><span aria-hidden="true">✦</span><b>ระลอก ${index+1}</b><small>+9 หน่วย</small></button>`).join('')}</div><div class="spell-actions"><button class="secondary" id="resetSpellArena">ตั้งโล่ใหม่ ↻</button><button class="primary" id="reflectSpell" disabled>สะท้อนแสง 45 หน่วย ✦</button></div>`;
    const buttons=[...p.querySelectorAll('[data-spell-wave]')],render=()=>{p.querySelector('#shieldPower').textContent=power;p.querySelector('#shieldEquation').textContent=`${waves} × 9 = ${power} หน่วย`;p.querySelector('#shieldBar').style.width=`${waves/5*100}%`;p.querySelector('#spellArenaStage').style.setProperty('--shield-charge',String(waves/5));buttons.forEach((button,index)=>{button.disabled=index!==waves;button.classList.toggle('blocked',index<waves)});p.querySelector('#reflectSpell').disabled=waves!==5},reset=()=>{waves=0;power=0;p.querySelector('#spellSequence').textContent='เตรียมรับคาถาระลอกแรก…';render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
    buttons.forEach((button,index)=>button.onclick=()=>{if(index!==waves)return;waves++;power=waves*9;p.querySelector('#spellSequence').textContent=Array.from({length:waves},(_,i)=>(i+1)*9).join(' · ')+(waves===5?' — โล่พร้อมสะท้อนแสง!':'');render();tone(470+waves*75,.2);if(waves===5)fb.innerHTML='<div class="star-chance">9 · 18 · 27 · 36 · 45 — รับคาถาครบแล้ว! ✦</div>'});
    p.querySelector('#resetSpellArena').onclick=()=>{reset();tone(330)};
    p.querySelector('#reflectSpell').onclick=()=>finish(level,1);
    render();
    return;
  }
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

if(PLAYTEST_MODE)save.unlocked=Math.max(save.unlocked,19);
else if(save.stars[18]&&save.unlocked<19){save.unlocked=19;persist()}
else if(save.stars[17]&&save.unlocked<18){save.unlocked=18;persist()}
else if(save.stars[16]&&save.unlocked<17){save.unlocked=17;persist()}
else if(save.stars[15]&&save.unlocked<16){save.unlocked=16;persist()}
if(save.player)home();
