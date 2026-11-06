const world7PlayBase=play;
play=id=>{
  world7PlayBase(id);
  const level=LEVELS[id-1];
  if(level?.type!=='life-garden')return;
  let step=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),parts=level.parts,values=[level.start];
  p.innerHTML=`<div class="life-garden" id="lifeGarden"><div class="garden-plots" aria-hidden="true">${parts.map((_,index)=>`<span data-garden-plot="${index}">🥀</span>`).join('')}<b>💧</b></div><div class="garden-total" aria-live="polite"><small>ดอกไม้ที่ยังสด</small><strong id="gardenTotal">621</strong><b id="gardenEquation">621 − 185 = ?</b></div><div class="wilted-parts" role="group" aria-label="ถอนกลีบเงาทีละส่วน">${parts.map((part,index)=>`<button data-wilted-part="${index}" ${index?'disabled':''}><span>${index===0?'แปลงใหญ่':index===1?'แปลงกลาง':'แปลงสุดท้าย'}</span><b>−${part}</b><small>${index===0?'1 ร้อย':index===1?'8 สิบ':'5 หน่วย'}</small></button>`).join('')}</div><div class="garden-history" id="gardenHistory" aria-live="polite">621 · รอถอนกลีบเงา 185 ดอก</div></div><div class="garden-actions"><button class="secondary" id="resetLifeGarden">เริ่มรักษาสวนใหม่ ↻</button><button class="primary" id="awakenLifeGarden" disabled>ส่งน้ำให้ดอกสด 436 ดอก</button></div>`;
  const buttons=[...p.querySelectorAll('[data-wilted-part]')],plots=[...p.querySelectorAll('[data-garden-plot]')],total=p.querySelector('#gardenTotal'),equation=p.querySelector('#gardenEquation'),history=p.querySelector('#gardenHistory'),stage=p.querySelector('#lifeGarden'),water=p.querySelector('.garden-plots b'),awaken=p.querySelector('#awakenLifeGarden'),render=()=>{const current=values.at(-1),removed=parts.slice(0,step).reduce((a,b)=>a+b,0);total.textContent=current;equation.textContent=step?`${level.start} − ${removed} = ${current}`:'621 − 185 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('healed',index<step)});plots.forEach((plot,index)=>{plot.textContent=index<step?'🌻':'🥀';plot.classList.toggle('healed',index<step)});history.textContent=values.join(' → ')+(step===parts.length?' · เหลือดอกสด 436 ดอก!':'');stage.style.setProperty('--garden-life',String(step/parts.length));water.classList.toggle('flowing',step===parts.length);awaken.disabled=step!==parts.length},reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)-parts[index]);step++;render();tone(520+step*70,.22);fb.innerHTML=`<div class="star-chance">${values.at(-2)} − ${parts[index]} = ${values.at(-1)}${step===parts.length?' — รากน้ำไหลกลับมาแล้ว!':''}</div>`});
  p.querySelector('#resetLifeGarden').onclick=()=>{reset();tone(330)};
  awaken.onclick=()=>finish(level,1);
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

if(PLAYTEST_MODE)save.unlocked=Math.max(save.unlocked,31);
else if(save.stars[30]&&save.unlocked<31){save.unlocked=31;persist()}
if(save.player)home();
