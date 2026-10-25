(function(root){
function disabled(){return {provider:'disabled',enabled:false,async load(){return null},async save(){return null}}}
function memory(seed=null){let value=seed,online=true;return {provider:'memory',enabled:true,setOnline(next){online=Boolean(next)},async load(){if(!online)throw new Error('offline');return value?JSON.parse(JSON.stringify(value)):null},async save(next){if(!online)throw new Error('offline');value=JSON.parse(JSON.stringify(next));return value}}}
async function synchronize(adapter,localValue,saveApi){const local=saveApi.normalize(localValue);if(!adapter?.enabled)return {status:'disabled',save:local,provider:adapter?.provider||'disabled'};try{const cloud=await adapter.load(),merged=cloud?saveApi.merge(local,cloud):local,saved=saveApi.stamp(merged);await adapter.save(saved);return {status:'synced',save:saved,provider:adapter.provider||'custom'}}catch(error){return {status:'offline',save:local,provider:adapter.provider||'custom',error:String(error?.message||error)}}}
root.MAGIC_FOREST_CLOUD_SAVE={disabled,memory,synchronize};
})(window);
