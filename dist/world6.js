const world6PlayBase=play;
play=id=>{
  world6PlayBase(id);
  const level=LEVELS[id-1];
  if(level?.type==='ancient-library'){
    let step=0;
    const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),parts=level.parts,values=[level.start];
    p.innerHTML=`<div class="ancient-library" id="ancientLibrary"><div class="library-shelves" aria-hidden="true"><span>📚<b>436</b></span><i>❤️</i><span>📜<b>297</b></span></div><div class="library-total" aria-live="polite"><small>หนังสือที่เชื่อมแล้ว</small><strong id="libraryTotal">436</strong><b id="libraryEquation">436 + 297 = ?</b></div><div class="book-sections" role="group" aria-label="ต่อหนังสือประวัติศาสตร์ทีละส่วน">${parts.map((part,index)=>`<button data-book-part="${index}" ${index?'disabled':''}><span>${index===0?'ชั้นใหญ่':index===1?'ชั้นกลาง':'ชั้นสุดท้าย'}</span><b>+${part}</b><small>${index===0?'2 ร้อย':index===1?'9 สิบ':'7 หน่วย'}</small></button>`).join('')}</div><div class="library-history" id="libraryHistory" aria-live="polite">436 · รอเชื่อมหนังสืออีก 297 เล่ม</div></div><div class="library-actions"><button class="secondary" id="resetAncientLibrary">จัดชั้นใหม่ ↻</button><button class="primary" id="restoreSixthCrystal" disabled>เปิดแท่นด้วยหนังสือ 733 เล่ม</button></div>`;
    const buttons=[...p.querySelectorAll('[data-book-part]')],total=p.querySelector('#libraryTotal'),equation=p.querySelector('#libraryEquation'),history=p.querySelector('#libraryHistory'),stage=p.querySelector('#ancientLibrary'),heart=p.querySelector('.library-shelves i'),restore=p.querySelector('#restoreSixthCrystal'),render=()=>{const sum=values.at(-1),added=parts.slice(0,step).reduce((a,b)=>a+b,0);total.textContent=sum;equation.textContent=step?`${level.start} + ${added} = ${sum}`:'436 + 297 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('shelved',index<step)});history.textContent=values.join(' → ')+(step===parts.length?' · คลังความรู้ครบ 733 เล่ม!':'');stage.style.setProperty('--library-light',String(step/parts.length));heart.classList.toggle('revealed',step===parts.length);restore.disabled=step!==parts.length},reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
    buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)+parts[index]);step++;render();tone(430+step*100,.24);fb.innerHTML=`<div class="star-chance">${values.at(-2)} + ${parts[index]} = ${values.at(-1)}${step===parts.length?' — ผลึกหัวใจกำลังส่องแสง!':''}</div>`});
    p.querySelector('#resetAncientLibrary').onclick=()=>{reset();tone(330)};
    restore.onclick=()=>finish(level,1);
    render();return;
  }
  if(level?.type==='levitation-potions'){
    let poured=0;
    const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),total=level.bottles,power=level.power;
    p.innerHTML=`<div class="levitation-lab" id="levitationLab"><div class="cloud-cauldron" aria-hidden="true"><span class="potion-bubbles" id="potionBubbles">🫧</span><b>⚗️</b><i>🪜</i></div><div class="levitation-core" aria-live="polite"><small>พลังลอยสะสม</small><strong id="levitationPower">0</strong><b id="levitationEquation">7 × 8 = ?</b></div><div class="potion-bottles" role="group" aria-label="เติมน้ำยาลอยตัว 7 ขวด">${Array.from({length:total},(_,index)=>`<button data-potion="${index}" ${index?'disabled':''} aria-label="เติมน้ำยาขวดที่ ${index+1}"><span>${index+1}</span><b>🧪</b><small>+8</small></button>`).join('')}</div><div class="potion-sequence" id="potionSequence" aria-live="polite">เติมทีละขวด · เพิ่มครั้งละ 8 พลัง</div></div><div class="potion-actions"><button class="secondary" id="resetLevitationPotions">เทหม้อแล้วเริ่มใหม่ ↻</button><button class="primary" id="raiseLibraryStair" disabled>ยกบันไดด้วยพลัง 56 ✨</button></div>`;
    const buttons=[...p.querySelectorAll('[data-potion]')],count=p.querySelector('#levitationPower'),equation=p.querySelector('#levitationEquation'),sequence=p.querySelector('#potionSequence'),bubbles=p.querySelector('#potionBubbles'),stage=p.querySelector('#levitationLab'),raise=p.querySelector('#raiseLibraryStair'),render=()=>{const sum=poured*power;count.textContent=sum;equation.textContent=poured?`${poured} × ${power} = ${sum}`:'7 × 8 = ?';buttons.forEach((button,index)=>{button.disabled=index!==poured;button.classList.toggle('poured',index<poured)});sequence.textContent=poured?Array.from({length:poured},(_,i)=>(i+1)*power).join(' → '):'เติมทีละขวด · เพิ่มครั้งละ 8 พลัง';bubbles.textContent='🫧'.repeat(Math.max(1,Math.ceil(poured/2)));stage.style.setProperty('--levitation',String(poured/total));raise.disabled=poured!==total},reset=()=>{poured=0;render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
    buttons.forEach((button,index)=>button.onclick=()=>{if(index!==poured)return;poured++;const sum=poured*power;render();tone(390+poured*55,.2);fb.innerHTML=`<div class="star-chance">${poured} × 8 = ${sum}${poured===total?' — แรงลอยครบ 56 เท่า!':''}</div>`});
    p.querySelector('#resetLevitationPotions').onclick=()=>{reset();tone(330)};
    raise.onclick=()=>finish(level,1);
    render();return;
  }
  if(level?.type==='stair-energy'){
    let step=0;
    const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),parts=level.parts,values=[level.start];
    p.innerHTML=`<div class="stair-energy" id="stairEnergy"><div class="energy-stair" aria-hidden="true">${parts.map((_,index)=>`<span data-stair-crack="${index}">🕸️</span>`).join('')}<b>🪜</b><i>🚪</i></div><div class="energy-core" aria-live="polite"><small>พลังที่ยังเหลือ</small><strong id="energyTotal">850</strong><b id="energyEquation">850 − 495 = ?</b></div><div class="shadow-layers" role="group" aria-label="ถอนพลังเงาทีละชั้น">${parts.map((part,index)=>`<button data-shadow-part="${index}" ${index?'disabled':''}><span>เงาชั้นที่ ${index+1}</span><b>−${part}</b><small>${index===0?'หลักร้อย':index===1?'หลักสิบ':'หลักหน่วย'}</small></button>`).join('')}</div><div class="energy-history" id="energyHistory" aria-live="polite">850 · รอถอนพลังเงา 495 หน่วย</div></div><div class="energy-actions"><button class="secondary" id="resetStairEnergy">คืนพลังตั้งต้น ↻</button><button class="primary" id="openPotionRoom" disabled>ส่งพลัง 355 เปิดประตู</button></div>`;
    const buttons=[...p.querySelectorAll('[data-shadow-part]')],cracks=[...p.querySelectorAll('[data-stair-crack]')],total=p.querySelector('#energyTotal'),equation=p.querySelector('#energyEquation'),history=p.querySelector('#energyHistory'),stage=p.querySelector('#stairEnergy'),open=p.querySelector('#openPotionRoom'),render=()=>{const current=values.at(-1),removed=parts.slice(0,step).reduce((a,b)=>a+b,0);total.textContent=current;equation.textContent=step?`${level.start} − ${removed} = ${current}`:'850 − 495 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('cleared',index<step)});cracks.forEach((crack,index)=>crack.classList.toggle('cleared',index<step));history.textContent=values.join(' → ')+(step===parts.length?' · เหลือพลังดี 355 หน่วย!':'');stage.style.setProperty('--energy-safe',String(step/parts.length));open.disabled=step!==parts.length},reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
    buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)-parts[index]);step++;render();tone(620-step*80,.2);fb.innerHTML=`<div class="star-chance">${values.at(-2)} − ${parts[index]} = ${values.at(-1)}${step===parts.length?' — บันไดมั่นคงแล้ว!':''}</div>`});
    p.querySelector('#resetStairEnergy').onclick=()=>{reset();tone(330)};
    open.onclick=()=>finish(level,1);
    render();return;
  }
  if(level?.type==='owl-relay'){
    let step=0;
    const p=document.querySelector('#puzzle'),fb=document.querySelector('#feedback'),parts=level.parts;
    p.innerHTML=`<div class="owl-relay" id="owlRelay"><div class="owl-sky" aria-hidden="true"><span class="owl-flock resident">🦉<b>312</b></span><span class="owl-wind">〰️</span><span class="owl-stair-piece">🪜</span></div><div class="owl-total" aria-live="polite"><small>นกฮูกที่ชานพัก</small><strong id="owlTotal">312</strong><b id="owlEquation">312 + 249 = ?</b></div><div class="owl-groups" role="group" aria-label="เรียกนกฮูกเพิ่มทีละฝูง">${parts.map((part,index)=>`<button data-owl-part="${index}" ${index?'disabled':''}><span>${index===0?'ฝูงใหญ่':index===1?'ฝูงกลาง':'ฝูงเล็ก'}</span><b>+${part}</b><small>${'🦉'.repeat(3-index)}</small></button>`).join('')}</div><div class="owl-history" id="owlHistory" aria-live="polite">312 · รอรับเพื่อนอีก 249 ตัว</div></div><div class="owl-actions"><button class="secondary" id="resetOwlRelay">เรียกฝูงใหม่ ↻</button><button class="primary" id="liftOwlStair" disabled>ยกบันไดด้วยพลัง 561 ปีก</button></div>`;
    const buttons=[...p.querySelectorAll('[data-owl-part]')],total=p.querySelector('#owlTotal'),equation=p.querySelector('#owlEquation'),history=p.querySelector('#owlHistory'),stage=p.querySelector('#owlRelay'),lift=p.querySelector('#liftOwlStair'),values=[level.start],render=()=>{const sum=values.at(-1);total.textContent=sum;equation.textContent=step?`${level.start} + ${parts.slice(0,step).reduce((a,b)=>a+b,0)} = ${sum}`:'312 + 249 = ?';buttons.forEach((button,index)=>{button.disabled=index!==step;button.classList.toggle('arrived',index<step)});history.textContent=values.join(' → ')+(step===parts.length?' · ครบ 561 ตัว!':'');stage.style.setProperty('--owl-progress',String(step/parts.length));lift.disabled=step!==parts.length},reset=()=>{step=0;values.splice(1);render();fb.innerHTML=`<div class="star-chance">โอกาสรอบนี้ ${starRating(3)}</div>`};
    buttons.forEach((button,index)=>button.onclick=()=>{if(index!==step)return;values.push(values.at(-1)+parts[index]);step++;render();tone(420+step*80,.2);fb.innerHTML=`<div class="star-chance">${values.at(-2)} + ${parts[index]} = ${values.at(-1)}${step===parts.length?' — ฝูงนกฮูกพร้อมยกบันไดแล้ว!':''}</div>`});
    p.querySelector('#resetOwlRelay').onclick=()=>{reset();tone(330)};
    lift.onclick=()=>finish(level,1);
    render();return;
  }
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
  if(save.stars[30]){
    const eyebrow=wrap.querySelector('.map-head .eyebrow'),summary=wrap.querySelector('.map-head p'),endingButton=wrap.querySelector('#endingBtn'),journeyTitle=wrap.querySelector('.journey-complete h2'),journeyCopy=wrap.querySelector('.journey-complete p'),nextLock=wrap.querySelector('.next-world-lock');
    if(eyebrow)eyebrow.textContent='ภารกิจหกโลกสำเร็จแล้ว';
    if(summary)summary.textContent='ผลึกหัวใจหกชิ้นกลับคืนมาแล้ว รอยหมึกนำไปสู่สวนพฤกษาแห่งชีวิต';
    if(endingButton){endingButton.textContent='ดูฉากจบ World 6 อีกครั้ง ✦';endingButton.onclick=()=>story(window.WORLD_SIX_ENDING,map)}
    if(journeyTitle)journeyTitle.textContent='พิชิตครบ 30 ตอน!';
    if(journeyCopy){const totalStars=LEVELS.reduce((sum,l)=>sum+(save.stars[l.id]||0),0);journeyCopy.textContent=`ของวิเศษ ${save.items.length}/30 · ผลึก ${save.crystals} เม็ด · ดาว ${totalStars}/90`}
    if(nextLock)nextLock.innerHTML='<span>🔒</span><div><small>บทถัดไป</small><strong>World 7 · สวนพฤกษาแห่งชีวิต</strong><p>รอยหมึกเงากำลังทำให้ดอกไม้เหี่ยวเฉา</p></div>';
  }
};

const world6FinishBase=finish;
finish=(level,tries)=>{
  world6FinishBase(level,tries);
  if(level.id!==30)return;
  const next=document.querySelector('#next');
  if(next){next.textContent='ดูตอนจบ World 6';next.onclick=()=>story(window.WORLD_SIX_ENDING,map)}
};

const world6InventoryBase=showInventory;
showInventory=()=>{world6InventoryBase();const panel=document.querySelector('.collection-panel');if(panel&&!panel.querySelector('.collection-world-6'))panel.insertAdjacentHTML('beforeend',collectionWorld(6,'World 6 · หอคอยแห่งการคูณ'))};

if(PLAYTEST_MODE)save.unlocked=Math.max(save.unlocked,30);
else if(save.stars[25]&&save.unlocked<26){save.unlocked=26;persist()}
else if(save.stars[26]&&save.unlocked<27){save.unlocked=27;persist()}
else if(save.stars[27]&&save.unlocked<28){save.unlocked=28;persist()}
else if(save.stars[28]&&save.unlocked<29){save.unlocked=29;persist()}
else if(save.stars[29]&&save.unlocked<30){save.unlocked=30;persist()}
if(save.player)home();
