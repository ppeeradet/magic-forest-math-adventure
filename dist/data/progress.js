(function(root){
  function starsForTries(tries){return tries===1?3:tries<=3?2:1}
  function completeLevel(currentSave,level,tries,totalLevels){
    const nextSave={...currentSave,stars:{...(currentSave.stars||{})},items:[...(currentSave.items||[])]};
    const runStars=starsForTries(tries),previousStars=nextSave.stars[level.id]||0,bestStars=Math.max(previousStars,runStars),savedItem=level.item+' '+level.reward,isNewItem=!nextSave.items.includes(savedItem);
    nextSave.stars[level.id]=bestStars;
    nextSave.unlocked=Math.min(totalLevels,Math.max(nextSave.unlocked||1,level.id+1));
    nextSave.crystals=nextSave.crystals||0;
    if(isNewItem){nextSave.items.push(savedItem);nextSave.crystals+=10}
    return {nextSave,runStars,previousStars,bestStars,savedItem,isNewItem,isRecord:runStars>previousStars};
  }
  root.MAGIC_FOREST_PROGRESS={starsForTries,completeLevel};
})(typeof window!=='undefined'?window:globalThis);
