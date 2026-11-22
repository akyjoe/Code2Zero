const $ = id => document.getElementById(id);
let latest = null;
function estimateTokens(text){
  // Deliberately simple heuristic: roughly one token per four characters.
  // Not a tokenizer and not reliable for every language or model.
  return text.trim() ? Math.ceil(text.length / 4) : 0;
}
function fmt(n,digits=2){return Number(n).toLocaleString(undefined,{maximumFractionDigits:digits});}
function analyse(){
  const text=$('conversation').value;
  if(!text.trim()){
    ['tokens','energy','carbon','waterOut'].forEach(id=>$(id).textContent='—');
    $('splitStatus').textContent='Not analysed';$('download').disabled=true;latest=null;return;
  }
  const lines=text.split(/\r?\n/);let userText=[],assistantText=[],hasRoles=false,current=null,otherText=[];
  for(const line of lines){
    const match=line.match(/^\s*(user|you|human|assistant|claude|chatgpt|gemini|model)\s*:\s*(.*)$/i);
    if(match){hasRoles=true;current=['user','you','human'].includes(match[1].toLowerCase())?'user':'assistant';(current==='user'?userText:assistantText).push(match[2]);}
    else if(current==='user')userText.push(line);else if(current==='assistant')assistantText.push(line);else otherText.push(line);
  }
  let inputTokens,outputTokens,totalTokens;
  if(hasRoles){inputTokens=estimateTokens(userText.join('\n')+(otherText.length?'\n'+otherText.join('\n'):''));outputTokens=estimateTokens(assistantText.join('\n'));totalTokens=inputTokens+outputTokens;}
  else{totalTokens=estimateTokens(text);inputTokens=0;outputTokens=0;}
  const rate=Math.max(0,Number($('efficiency').value)||0),grid=Math.max(0,Number($('grid').value)||0),waterRate=Math.max(0,Number($('water').value)||0),pue=Math.max(1,Number($('pue').value)||1);
  const energy=totalTokens/1000*rate*pue,carbon=energy*grid/1000,water=energy*waterRate/1000;
  $('tokens').textContent=fmt(totalTokens,0);$('energy').textContent=fmt(energy,4);$('carbon').textContent=fmt(carbon,4);$('waterOut').textContent=fmt(water,4);
  $('splitStatus').textContent=hasRoles?`Input ${fmt(inputTokens,0)} · Output ${fmt(outputTokens,0)}`:'No role labels detected';
  latest={prototype:true,token_estimation:'characters / 4 heuristic',estimated_tokens:totalTokens,estimated_input_tokens:hasRoles?inputTokens:null,estimated_output_tokens:hasRoles?outputTokens:null,energy_wh:energy,emissions_g_co2e:carbon,water_ml:water,assumptions:{energy_wh_per_1000_tokens:rate,grid_intensity_g_co2e_per_kwh:grid,water_ml_per_kwh:waterRate,pue},limitations:'Scenario estimate only; not provider telemetry or audited measurement.'};$('download').disabled=false;
}
$('conversation').addEventListener('input',analyse);
['efficiency','grid','water','pue'].forEach(id=>$(id).addEventListener('input',analyse));
$('profile').addEventListener('change',e=>{$('efficiency').value=e.target.value;analyse();});
$('clear').addEventListener('click',()=>{$('conversation').value='';analyse();$('conversation').focus();});
$('settingsToggle').addEventListener('click',()=>{const panel=$('settingsPanel'),open=panel.hidden;panel.hidden=!open;$('settingsToggle').setAttribute('aria-expanded',String(open));$('settingsToggle').setAttribute('aria-label',open?'Close estimation settings':'Open estimation settings');});
document.addEventListener('click',e=>{if(!$('settingsPanel').hidden&&!$('settingsPanel').contains(e.target)&&!$('settingsToggle').contains(e.target)){$('settingsPanel').hidden=true;$('settingsToggle').setAttribute('aria-expanded','false');$('settingsToggle').setAttribute('aria-label','Open estimation settings');}});
$('download').addEventListener('click',()=>{if(!latest)return;const blob=new Blob([JSON.stringify(latest,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='thecreatology-ai-footprint-estimate.json';a.click();URL.revokeObjectURL(url);});

async function rotateFunFact(){
  try{
    const res=await fetch('carbon-facts.json',{cache:'no-cache'});
    const facts=await res.json();
    if(Array.isArray(facts)&&facts.length){
      const fact=facts[Math.floor(Math.random()*facts.length)];
      $('funFact').textContent=fact;
    }
  }catch(e){
    $('funFact').textContent='The internet’s carbon footprint is roughly on par with the global airline industry.';
  }
}
rotateFunFact();
