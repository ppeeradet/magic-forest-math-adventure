(function(root){
const VERSION=3;
const fresh=()=>({saveVersion:VERSION,unlocked:1,stars:{},items:[],crystals:0,sound:true,storySeen:false});
const safeInt=(value,min,max,fallback)=>Number.isInteger(Number(value))?Math.min(max,Math.max(min,Number(value))):fallback;
function normalize(raw){
 const source=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:{};
 const next=fresh();
 next.unlocked=safeInt(source.unlocked,1,100,1);
 next.stars=Object.fromEntries(Object.entries(source.stars&&typeof source.stars==='object'?source.stars:{}).filter(([id,stars])=>/^\d+$/.test(id)&&Number(id)>=1&&Number(id)<=100&&Number(stars)>=1&&Number(stars)<=3).map(([id,stars])=>[id,safeInt(stars,1,3,1)]));
 next.items=[...new Set(Array.isArray(source.items)?source.items.filter(item=>typeof item==='string'&&item.trim()).slice(0,100):[])];
 next.crystals=safeInt(source.crystals,0,999999,0);
 next.sound=source.sound!==false;
 next.storySeen=source.storySeen===true;
 if(source.player&&typeof source.player==='object'){const name=String(source.player.name||'').trim().replace(/[<>&"']/g,'').slice(0,12);if(name)next.player={name,gender:source.player.gender==='girl'?'girl':'boy'}}
 if(next.stars[5]&&next.unlocked<6)next.unlocked=6;
 if(next.stars[10]&&next.unlocked<11)next.unlocked=11;
 if(typeof source.updatedAt==='string')next.updatedAt=source.updatedAt;
 return next;
}
function load(storage,key){try{const next=normalize(JSON.parse(storage.getItem(key)||'null'));storage.setItem(key,JSON.stringify(next));return next}catch{const next=fresh();storage.setItem(key,JSON.stringify(next));return next}}
function stamp(value){return {...normalize(value),saveVersion:VERSION,updatedAt:new Date().toISOString()}}
function merge(localValue,cloudValue){
 const local=normalize(localValue),cloud=normalize(cloudValue);
 const localTime=Date.parse(local.updatedAt||'')||0,cloudTime=Date.parse(cloud.updatedAt||'')||0;
 const latest=cloudTime>localTime?cloud:local,other=latest===local?cloud:local;
 const starIds=new Set([...Object.keys(local.stars),...Object.keys(cloud.stars)]),stars={};
 starIds.forEach(id=>stars[id]=Math.max(local.stars[id]||0,cloud.stars[id]||0));
 return normalize({...latest,unlocked:Math.max(local.unlocked,cloud.unlocked),stars,items:[...new Set([...local.items,...cloud.items])].slice(0,100),crystals:Math.max(local.crystals,cloud.crystals),storySeen:local.storySeen||cloud.storySeen,player:latest.player||other.player,updatedAt:latest.updatedAt||other.updatedAt});
}
root.MAGIC_FOREST_SAVE={VERSION,fresh,normalize,load,stamp,merge};
})(window);
