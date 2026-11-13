import test from 'node:test';
import assert from 'node:assert/strict';
import {createFlightRoute,distanceAtScroll,pathData,paceFlightSegments} from '../flight-path.js';
function point(c,t){const u=1-t;return {x:u**3*c.start.x+3*u*u*t*c.c1.x+3*u*t*t*c.c2.x+t**3*c.end.x,y:u**3*c.start.y+3*u*u*t*c.c1.y+3*u*t*t*c.c2.y+t**3*c.end.y};}
function fixture(width){const mobile=width<=650,left=mobile?48:Math.max(28,(width-1060)/2),available=width-left-(mobile?24:left);let top=380;
const stops=Array.from({length:10},(_,i)=>{const size=mobile?available:available*(i<5?.61:.43),x=mobile?left:i%2?width-left-size:left;const box={left:x,right:x+size,top,bottom:top+(i<5?420:580)};top=box.bottom+140;return box;});
return {width,stops,contactTop:top,contactBottom:top+450};}
for(const width of [320,375,650,651,768,1024,1440,1920])test(`continuous route and content clearance at ${width}px (synthetic layout)`,()=>{
const input=fixture(width),route=createFlightRoute(input),r=width<=650?18:31;
assert.ok(!pathData(route.commands).includes('NaN'));
for(let i=1;i<route.anchors.length;i++)assert.ok(route.anchors[i].y>route.anchors[i-1].y,'scroll milestones increase');
for(let i=1;i<route.commands.length;i++){
const c=route.commands[i];assert.deepEqual(c.start,route.commands[i-1].end);
if(i>1){const prev=route.commands[i-1],a={x:prev.end.x-prev.c2.x,y:prev.end.y-prev.c2.y},b={x:c.c1.x-c.start.x,y:c.c1.y-c.start.y};assert.ok(Math.abs(a.x*b.y-a.y*b.x)<1e-6,'matching tangent direction');assert.ok(a.x*b.x+a.y*b.y>=0,'no tangent reversal');}
for(let j=0;j<=100;j++){const p=point(c,j/100);assert.ok(p.x-r>=-1&&p.x+r<=width+1,'plane stays within viewport');for(const box of input.stops)assert.ok(!(p.x+r>box.left&&p.x-r<box.right&&p.y+r>box.top&&p.y-r<box.bottom),'plane clears content');if(width>650)assert.ok(p.y+r<input.contactTop+2,'route ends above contact copy');else assert.ok(p.x+r<48,'mobile route stays in reserved gutter');}
}
});
test('scroll positions retrace the same route and clamp at the landing point',()=>{const segments=[{y:0,l:0},{y:120,l:230},{y:160,l:370},{y:400,l:750}];const ys=Array.from({length:61},(_,i)=>i*10-50);const forward=ys.map(y=>distanceAtScroll(y,segments));const reverse=[...ys].reverse().map(y=>distanceAtScroll(y,segments)).reverse();assert.deepEqual(forward,reverse);for(let i=1;i<forward.length;i++)assert.ok(forward[i]>=forward[i-1]);assert.equal(forward[0],0);assert.equal(forward.at(-1),750);});
for(const width of [320,375,650,651,768,1024,1440,1920])test(`centered video right-side bypass and unchanged landing at ${width}px`,()=>{
const input=fixture(width),original=createFlightRoute(input),mobile=width<=650;
const last=input.stops.at(-1),size=mobile?width-96:Math.min((width-2*Math.max(28,(width-1060)/2))*.8,820);
Object.assign(last,{kind:'video',left:(width-size)/2,right:(width+size)/2});
const route=createFlightRoute(input),r=mobile?18:31;
assert.deepEqual(route.end,original.end,'landing position is preserved');
for(let i=1;i<route.anchors.length;i++)assert.ok(route.anchors[i].y>route.anchors[i-1].y);
for(const c of route.commands.filter(c=>c.type==='C'))for(let j=0;j<=100;j++){
 const p=point(c,j/100);
 assert.ok(p.x-r>=-1&&p.x+r<=width+1,'plane remains inside viewport');
 for(const box of input.stops)assert.ok(!(p.x+r>box.left&&p.x-r<box.right&&p.y+r>box.top&&p.y-r<box.bottom),'content clearance');
 if(p.y>last.top&&p.y<last.bottom)assert.ok(p.x-r>=last.right,'route stays right of video');
}
});

test('video approach redistributes travel evenly without moving its endpoints',()=>{
 const original=[{y:0,l:0},{y:400,l:220},{y:420,l:320},{y:430,l:650},{y:440,l:750},{y:900,l:1200},{y:1000,l:1300}];
 const paced=paceFlightSegments(original,[{from:1,to:5}]);
 assert.deepEqual(paced[0],original[0]);assert.deepEqual(paced[1],original[1]);assert.deepEqual(paced[5],original[5]);assert.deepEqual(paced[6],original[6]);
 const speed=(list,i)=>(list[i].l-list[i-1].l)/(list[i].y-list[i-1].y);
 for(let i=2;i<=5;i++)assert.ok(Math.abs(speed(paced,i)-1.96)<1e-9);
 assert.ok(speed(paced,3)<speed(original,3)/3,'the horizontal crossing is substantially slower');
 const positions=[400,450,500,600,700,850,900];
 assert.deepEqual(positions.map(y=>distanceAtScroll(y,paced)),[...positions].reverse().map(y=>distanceAtScroll(y,paced)).reverse());
});
