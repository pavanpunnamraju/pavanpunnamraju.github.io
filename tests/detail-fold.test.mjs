import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createContext,runInContext} from 'node:vm';
import {detailFrame} from '../detail-fold.js';
import {openingShape} from '../opening-fold.js';
const source={x:110,y:240,width:44,height:44,angle:90},viewport={width:1440,height:900};
test('detail sheet begins at the plane and finishes flat at viewport bounds',()=>{
 const first=detailFrame(0,source,viewport),last=detailFrame(1,source,viewport);
 for(const key of ['x','y','width','height','angle'])assert.equal(first[key],source[key]);
 assert.deepEqual(first.shape,openingShape(1));assert.equal(first.contentOpacity,0);
 assert.equal(last.x,0);assert.equal(last.y,0);assert.equal(last.width,1440);assert.equal(last.height,900);assert.equal(last.angle,0);assert.equal(last.contentOpacity,1);assert.deepEqual(last.shape,openingShape(0));
});
test('fold geometry is continuous and reverses exactly, including interrupted openings',()=>{
 for(const p of [.22,.52,.8]){const a=detailFrame(p-.000001,source,viewport),b=detailFrame(p+.000001,source,viewport);for(const key of ['x','y','width','height','angle'])assert.ok(Math.abs(a[key]-b[key])<.01);}
 for(const width of [375,768,1440]){const steps=Array.from({length:101},(_,i)=>i/100);const forward=steps.map(p=>detailFrame(p,source,{width,height:900}));assert.deepEqual(forward,[...steps].reverse().map(p=>detailFrame(p,source,{width,height:900})).reverse());}
});
async function harness(reduce=false){
 let now=0,next=1,frames=new Map();const listeners=new Map();
 const node=()=>({style:{},classList:{toggle(){}},setAttribute(){},append(){},replaceChildren(){},addEventListener(type,fn){this[type]=fn;}});
 const plane=node();Object.assign(plane,{offsetWidth:44,offsetHeight:44});
 const close=node(),copy=node(),sheet=node();sheet.querySelector=()=>node();
 const dialog=node();Object.assign(dialog,{open:false,showModal(){this.open=true;},close(){this.open=false;},querySelectorAll(){return [close];}});
 const nodes={'dialog':dialog,'.paper':plane,'.close':close,'.detail-sheet':sheet,'.detail-paper':copy,'#detail-title':node(),'#detail-summary':node(),'#detail-sections':node(),'.detail-placeholder':node()};
 const document={createElement:()=>node(),body:{style:{overflow:'',paddingRight:''}},documentElement:{clientWidth:1425},activeElement:null,querySelector:s=>nodes[s]};
 close.focus=()=>document.activeElement=close;
 const trigger={focus(){document.activeElement=trigger;}};
 const reduced={matches:reduce,addEventListener(){}};
 const context=createContext({document,matchMedia:()=>reduced,detailFrame,innerWidth:1440,innerHeight:900,scrollY:1250,
  getComputedStyle:()=>({transform:'matrix(0,1,-1,0,110,240)',paddingRight:'0'}),DOMMatrix:class {constructor(){Object.assign(this,{m41:110,m42:240,b:1,a:0});}},
  performance:{now:()=>now},requestAnimationFrame:fn=>{const id=next++;frames.set(id,fn);return id;},cancelAnimationFrame:id=>frames.delete(id),
  addEventListener:(name,fn)=>listeners.set(name,fn),measure:()=>{},window:{scrollTo:(x,y)=>context.scrollY=y}});
 const app=(await readFile('app.js','utf8')).replace(/^import .*?;\n/gm,'').split('projects.forEach')[0];runInContext(app,context);
 context.project={title:'Sample',summary:'Approved summary'};context.trigger=trigger;
 const call=code=>runInContext(code,context);
 const advance=ms=>{now+=ms;const pending=[...frames.values()];frames.clear();pending.forEach(fn=>fn(now));};
 return {call,advance,context,dialog,close,plane,document,trigger,frames};
}
test('controller restores scroll/focus across repeated cycles and Escape during opening (mock DOM)',async()=>{
 const h=await harness();
 for(let i=0;i<3;i++){
 h.call('openProject(project,trigger)');assert.equal(h.dialog.open,true);assert.equal(h.document.activeElement,h.close);
 h.advance(1100);assert.equal(h.call('detailProgress'),1);
 let prevented=false;h.dialog.keydown({key:'Tab',shiftKey:true,preventDefault(){prevented=true;}});assert.ok(prevented);assert.equal(h.document.activeElement,h.close);
 h.call('closeProject()');h.advance(950);assert.equal(h.dialog.open,false);assert.equal(h.context.scrollY,1250);assert.equal(h.document.activeElement,h.trigger);assert.equal(h.plane.style.visibility,'');assert.equal(h.document.body.style.overflow,'');assert.equal(h.document.body.style.paddingRight,'');assert.equal(h.frames.size,0);
 }
 h.call('openProject(project,trigger)');h.advance(400);assert.ok(h.call('detailProgress')>0&&h.call('detailProgress')<1);
 let prevented=false;h.dialog.cancel({preventDefault(){prevented=true;}});assert.ok(prevented);h.advance(950);assert.equal(h.dialog.open,false);assert.equal(h.frames.size,0);
});
test('reduced motion opens and closes immediately without animation frames (mock DOM)',async()=>{
 const h=await harness(true);h.call('openProject(project,trigger)');assert.equal(h.dialog.open,true);assert.equal(h.call('detailProgress'),1);assert.equal(h.frames.size,0);h.call('closeProject()');assert.equal(h.dialog.open,false);assert.equal(h.document.activeElement,h.trigger);assert.equal(h.context.scrollY,1250);
});
