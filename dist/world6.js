const world6PlayBase=play;
play=id=>{
  world6PlayBase(id);
  const level=LEVELS[id-1];
  if(level?.type!=='spell-rings')return;
  let sealed=0;
  const total=6,power=9,p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback');
  p.innerHTML=`<div class="spell-chamber" id="spellChamber"><div class="spell-orbit" role="group" aria-label="วงแหวนคาถา 6 ชั้น">${Array.from({length:total},(_,index)=>`<button data-spell-ring="${index}" ${index?'disabled':''} aria-label="ปิดผนึกคาถาบทที่ ${index+1}"><span>${index+1}</span><b>✦</b><small>+9</small></button>`).join('')}</div><div class="spell-core" aria-live="polite"><small>พลังคาถาที่ปิดผนึก</small><strong id="spellPower">0</strong><b id="spellEquation">6 × 9 = ?</b></div><div class="owl-stair" id="owlStair" aria-hidden="true">🦉</div></div><div class="spell-sequence" id="spellSequence" aria-live="polite">ปิดทีละบท · เพิ่มครั้งละ 9 หน่วย</div><div class="spell-actions"><button class="secondary" id="resetSpellRings">เริ่มทำนองใหม่ ↻</button><button class="primary" id="openOwlStair" disabled>เปิดบันไดด้วยพลัง 54 ✦</button></div>`;
  const buttons=[...p.querySelectorAll('[data-spell-ring]')],count=p.querySelector('#spellPower'),equation=p.querySelector('#spellEquation'),sequence=p.querySelector('#spellSequence'),owl=p.querySelector('#owlStair'),stage=p.querySelector('#spellChamber'),open=p.querySelector('#openOwlStair'),render=()=>{const sum=sealed*power;count.textContent=sum;equation.textContent=sealed?`${sealed} × ${power} = ${sum}`:'6 × 9 = ?';buttons.forEach((button,index)=>{button.disabled=index!==sealed;button.classList.toggle('sealed',index<sealed)});stage.style.setProperty('--spell-light',String(sealed/total));owl.classList.toggle('revealed',sealed===total);open.disabled=sealed!==total},reset=()=>{sealed=0;sequence.textContent='ปิดทีละบท · เพิ่มครั้งละ 9 หน่วย';render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
  buttons.forEach((button,index)=>button.onclick=()=>{if(index!==sealed)return;sealed++;const sum=sealed*power;sequence.textContent=Array.from({length:sealed},(_,i)=>(i+1)*power).join(' · ');render();tone(380+sealed*65,.2);fb.innerHTML=`<div class="star-chance">${sealed} × 9 = ${sum}${sealed===total?' — วงแหวนทั้งหกสงบแล้ว! ✦':''}</div>`});
  p.querySelector('#resetSpellRings').onclick=()=>{reset();tone(330)};
  open.onclick=()=>finish(level,1);
  render();
};

const world6BeginBase=beginLevel;
beginLevel=id=>id===26&&!save.stars[26]?story([...window.WORLD_SIX_INTRO,...LEVELS[25].dialogue],()=>explore(26)):world6BeginBase(id);

const world6MapBase=map;
map=()=>{
  world6MapBase();
  const wrap=document.querySelector('.map-wrap');
  if(!wrap||wrap.querySelector('.world-map-6'))return;
  const next=nextAdventure();
  wrap.insertAdjacentHTML('beforeend',worldMap(6,'World 6 · หอคอยแห่งการคูณและห้องสมุดโบราณ','ผลึกหัวใจชิ้นที่ 6',next?.id));
  wrap.querySelectorAll('.world-map-6 [data-level]').forEach(button=>button.onclick=()=>beginLevel(+button.dataset.level));
};

const world6InventoryBase=showInventory;
showInventory=()=>{world6InventoryBase();const panel=document.querySelector('.collection-panel');if(panel&&!panel.querySelector('.collection-world-6'))panel.insertAdjacentHTML('beforeend',collectionWorld(6,'World 6 · หอคอยแห่งการคูณ'))};

if(PLAYTEST_MODE)save.unlocked=Math.max(save.unlocked,26);
else if(save.stars[25]&&save.unlocked<26){save.unlocked=26;persist()}
if(save.player)home();
