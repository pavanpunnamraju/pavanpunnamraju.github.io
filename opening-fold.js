const foldClamp=n=>Math.max(0,Math.min(1,n));
const foldEase=n=>{n=foldClamp(n);return n*n*(3-2*n);};
const foldMix=(a,b,t)=>a+(b-a)*t;
const foldStages=[
 {at:0,outline:[[0,0],[64,0],[64,32],[64,64],[0,64],[0,32]],top:[[0,0],[64,0],[64,32],[0,32]],bottom:[[0,32],[64,32],[64,64],[0,64]]},
 {at:.34,outline:[[0,0],[32,0],[64,32],[32,64],[0,64],[0,32]],top:[[0,0],[32,0],[64,32],[0,32]],bottom:[[0,32],[64,32],[32,64],[0,64]]},
 {at:.7,outline:[[4,8],[34,18],[60,30],[34,46],[4,56],[16,32]],top:[[4,8],[34,18],[60,30],[16,32]],bottom:[[16,32],[60,30],[34,46],[4,56]]},
 {at:1,outline:[[3,6],[60,30],[60,30],[3,56],[16,32],[3,6]],top:[[3,6],[24,31],[60,30],[16,32]],bottom:[[16,32],[60,30],[30,35],[3,56]]}
];
export function openingShape(progress){
 const p=foldClamp(progress);let i=1;while(i<foldStages.length-1&&p>foldStages[i].at)i++;
 const a=foldStages[i-1],b=foldStages[i],t=foldEase((p-a.at)/(b.at-a.at));
 const result={};for(const name of ['outline','top','bottom'])result[name]=a[name].map((pt,j)=>pt.map((v,k)=>foldMix(v,b[name][j][k],t)));
 return result;
}
export function openingColor(from,to,progress){
 const t=foldEase(progress),rgb=h=>h.match(/\w\w/g).map(v=>parseInt(v,16));
 return '#'+rgb(from).map((v,i)=>Math.round(foldMix(v,rgb(to)[i],t)).toString(16).padStart(2,'0')).join('');
}
export function openingFrame({scroll,width,height,sheetHeight,journeyTop,startX,startY=0,angle,size}){
 const end=Math.max(1,journeyTop-height*.48),p=foldClamp(scroll/end);
 const shrink=foldEase(p),travel=foldEase(p);
 const w=foldMix(width,size,shrink),h=foldMix(sheetHeight,size,shrink);
 const cx=foldMix(width/2,startX,travel),cy=foldMix(sheetHeight/2-scroll,journeyTop+startY-scroll,travel);
 return {progress:p,end,width:w,height:h,x:cx-w/2,y:cy-h/2,angle:angle*foldEase((p-.3)/.7),textOpacity:1-foldEase(p/.38)};
}
