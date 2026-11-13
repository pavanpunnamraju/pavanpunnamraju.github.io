import {openingShape,openingColor} from './opening-fold.js';
const detailClamp=n=>Math.max(0,Math.min(1,n));
const detailEase=n=>{n=detailClamp(n);return n*n*(3-2*n);};
const detailMix=(a,b,t)=>a+(b-a)*t;
// Hold each recognizable paper state long enough to read as a fold, not a zoom.
const detailStages=[{at:0,fold:1,spread:0},{at:.22,fold:.94,spread:.24},{at:.52,fold:.7,spread:.58},{at:.8,fold:.34,spread:.9},{at:1,fold:0,spread:1}];
export function detailFrame(progress,source,viewport){
 const p=detailClamp(progress);let i=1;while(i<detailStages.length-1&&p>detailStages[i].at)i++;
 const a=detailStages[i-1],b=detailStages[i],t=detailEase((p-a.at)/(b.at-a.at));
 const fold=detailMix(a.fold,b.fold,t),spread=detailMix(a.spread,b.spread,t);
 const width=detailMix(source.width,viewport.width,spread),height=detailMix(source.height,viewport.height,spread);
 const cx=detailMix(source.x+source.width/2,viewport.width/2,spread),cy=detailMix(source.y+source.height/2,viewport.height/2,spread);
 return {x:cx-width/2,y:cy-height/2,width,height,angle:source.angle*(1-detailEase(p/.65)),shape:openingShape(fold),
  base:openingColor('123D58','d9edf2',p),top:openingColor('A9D8E9','d9edf2',p),bottom:openingColor('8ACBE3','d9edf2',p),
  stroke:openingColor('123D58','d9edf2',p),strokeWidth:.8*(1-p),contentOpacity:detailEase((p-.72)/.28)};
}
