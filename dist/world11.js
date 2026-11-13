const world11PlayBase=play;
play=id=>{
  world11PlayBase(id);
  const level=LEVELS[id-1];
  if(level?.type==='cloud-flock-merger'){
  let step=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),values=[level.start];
  p.innerHTML=`<div class="cloud-bridge" id="cloudBridge"><div class="cloud-stage" aria-hidden="true"><span id="cloudPath">☁️ · · · 🌸</span><i id="cloudBeam"></i><b id="fluffyCloudTest">🐇</b></div><div class="cloud-total" aria-live="polite"><small>เมฆบนสะพาน</small><strong id="cloudTotal">286</strong><b id="cloudEquation">286 + 357 = ?</b></div><div class="cloud-parts" role="group" aria-label="รวมเมฆชมพูทีละส่วน">${level.parts.map((part,index)=>`<button data-cloud-part="${index}" ${index?'disabled':''}><span>${index===0?'ฝูงเมฆใหญ่':index===1?'กลุ่มเมฆกลาง':'ก้อนสุดท้าย'}</span><b>+${part}</b><small>${index===0?'3 ร้อย':index===1?'5 สิบ':'7 หน่วย'}</small></button>`).join('')}</div><div class="cloud-history" id="cloudHistory" aria-live="polite">286 · รอรวมเมฆชมพู 357 ก้อน</div></div><div class="garden-actions"><button class="secondary" id="resetCloudBridge">จัดเมฆใหม่ ↻</button><button class="primary" id="crossCloudBridge" disabled>ข้ามสะพานเมฆ 643 ก้อน</button></div>`;
  const buttons=[...p.querySelectorAll('[data-cloud-part]')],total=p.querySelector('#cloudTotal'),equation=p.querySelector('#cloudEquation'),history=p.querySelector('#cloudHistory'),stage=p.querySelector('#cloudBridge'),path=p.querySelector('#cloudPath'),beam=p.querySelector('#cloudBeam'),fluffy=p.querySelector('#fluffyCloudTest'),cross=p.querySelector('#crossCloudBridge');
  const render=()=>{const current=values.at(-1),joined=level.parts.slice(0,step).reduce((a,b)=>a+b,0);total.textContent=current;equation.textContent=step?`${level.start} + ${joined} = ${current}`:'286 + 357 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('joined',index<step)});history.textContent=values.join(' → ')+(step===level.parts.length?' · สะพานมั่นคง 643 ก้อน!':'');stage.style.setProperty('--cloud-joined',String(step/level.parts.length));path.textContent=step===3?'☁️☁️☁️☁️🌸':'☁️'+' ✦ '.repeat(step)+' · '.repeat(3-step)+'🌸';beam.style.width=`${step/level.parts.length*100}%`;fluffy.style.left=`${8+step*25}%`;cross.disabled=step!==level.parts.length};
  const reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)+level.parts[index]);step++;render();tone(450+step*95,.22);fb.innerHTML=`<div class="star-chance">${values.at(-2)} + ${level.parts[index]} = ${values.at(-1)}${step===level.parts.length?' — ฟลัฟฟี่ทดสอบแล้ว ปลอดภัย!':''}</div>`});
  p.querySelector('#resetCloudBridge').onclick=()=>{reset();tone(330)};
  cross.onclick=()=>finish(level,1);
  render();
  return;
  }
  if(level?.type!=='cyclone-power-release')return;
  let step=0;
  const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),values=[level.start];
  p.innerHTML=`<div class="cyclone-release" id="cycloneRelease"><div class="cyclone-stage" aria-hidden="true"><span id="cycloneWind">🌪️🌪️🌪️</span><i id="calmBeam"></i><b id="featherTest">🪶</b></div><div class="cyclone-total" aria-live="polite"><small>พลังลมที่เหลือ</small><strong id="cycloneTotal">700</strong><b id="cycloneEquation">700 − 284 = ?</b></div><div class="cyclone-parts" role="group" aria-label="ปล่อยพลังลมทีละส่วน">${level.parts.map((part,index)=>`<button data-cyclone-part="${index}" ${index?'disabled':''}><span>${index===0?'ช่องระบายใหญ่':index===1?'ช่องระบายกลาง':'ช่องปรับละเอียด'}</span><b>−${part}</b><small>${index===0?'2 ร้อย':index===1?'8 สิบ':'4 หน่วย'}</small></button>`).join('')}</div><div class="cyclone-history" id="cycloneHistory" aria-live="polite">700 · รอปล่อยพลังส่วนเกิน 284 หน่วย</div></div><div class="garden-actions"><button class="secondary" id="resetCyclone">ปิดช่องและเริ่มใหม่ ↻</button><button class="primary" id="crossCyclone" disabled>ผ่านม่านลม 416 หน่วย</button></div>`;
  const buttons=[...p.querySelectorAll('[data-cyclone-part]')],total=p.querySelector('#cycloneTotal'),equation=p.querySelector('#cycloneEquation'),history=p.querySelector('#cycloneHistory'),stage=p.querySelector('#cycloneRelease'),wind=p.querySelector('#cycloneWind'),beam=p.querySelector('#calmBeam'),feather=p.querySelector('#featherTest'),cross=p.querySelector('#crossCyclone');
  const render=()=>{const current=values.at(-1),released=level.parts.slice(0,step).reduce((a,b)=>a+b,0);total.textContent=current;equation.textContent=step?`${level.start} − ${released} = ${current}`:'700 − 284 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('released',index<step)});history.textContent=values.join(' → ')+(step===level.parts.length?' · ม่านลมสงบเหลือ 416 หน่วย!':'');stage.style.setProperty('--wind-released',String(step/level.parts.length));wind.textContent='🌪️'.repeat(Math.max(1,3-step))+'✨'.repeat(step);beam.style.width=`${step/level.parts.length*100}%`;feather.style.transform=`translateY(${8-step*4}px) rotate(${18-step*6}deg)`;cross.disabled=step!==level.parts.length};
  const reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)-level.parts[index]);step++;render();tone(620-step*85,.22);fb.innerHTML=`<div class="star-chance">${values.at(-2)} − ${level.parts[index]} = ${values.at(-1)}${step===level.parts.length?' — ขนนกลอยนิ่งแล้ว!':''}</div>`});
  p.querySelector('#resetCyclone').onclick=()=>{reset();tone(330)};
  cross.onclick=()=>finish(level,1);
  render();
};

const world11BeginBase=beginLevel;
beginLevel=id=>id===51&&!save.stars[51]?story([...window.WORLD_ELEVEN_INTRO,...LEVELS[50].dialogue],()=>explore(51)):world11BeginBase(id);

const world11MapBase=map;
map=()=>{world11MapBase();const wrap=document.querySelector('.map-wrap');if(!wrap||wrap.querySelector('.world-map-11'))return;const next=nextAdventure();wrap.insertAdjacentHTML('beforeend',worldMap(11,'World 11 · เส้นทางฟื้นฟูเวทมนตร์','หัวใจป่าครบ 10/10 · ฟื้นฟูดินแดน',next?.id));wrap.querySelectorAll('.world-map-11 [data-level]').forEach(button=>button.onclick=()=>beginLevel(+button.dataset.level));if(save.stars[52]){const nextLock=wrap.querySelector('.next-world-lock'),journeyTitle=wrap.querySelector('.journey-complete h2'),journeyCopy=wrap.querySelector('.journey-complete p');if(nextLock)nextLock.innerHTML='<span>🎆</span><div><small>กำลังเตรียมด่านถัดไป</small><strong>ตอนที่ 53 · ทุ่งหญ้าดอกไม้ไฟ</strong><p>กำแพงดอกไม้ประกายยังขวางทางอยู่</p></div>';if(journeyTitle)journeyTitle.textContent='พิชิตครบ 52 ตอน!';if(journeyCopy){const totalStars=LEVELS.reduce((sum,l)=>sum+(save.stars[l.id]||0),0);journeyCopy.textContent=`ของวิเศษ ${save.items.length}/52 · ผลึกหัวใจ 10/10 · ดาว ${totalStars}/156`}}};

const world11InventoryBase=showInventory;
showInventory=()=>{world11InventoryBase();const panel=document.querySelector('.collection-panel');if(panel&&!panel.querySelector('.collection-world-11'))panel.insertAdjacentHTML('beforeend',collectionWorld(11,'World 11 · เส้นทางฟื้นฟู'))};

if(PLAYTEST_TARGET==='world11'){save.unlocked=Math.max(save.unlocked,52);for(let id=1;id<=50;id++)save.stars[id]??=3}
else if(save.stars[50]&&save.unlocked<51){save.unlocked=51;persist()}
if(!PLAYTEST_MODE&&save.stars[51]&&save.unlocked<52){save.unlocked=52;persist()}
if(save.player)home();
