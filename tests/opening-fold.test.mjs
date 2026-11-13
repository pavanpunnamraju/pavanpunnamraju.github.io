import test from 'node:test';
import assert from 'node:assert/strict';
import {openingFrame,openingShape,openingColor} from '../opening-fold.js';
import {readFile} from 'node:fs/promises';
import {Script} from 'node:vm';
for(const [width,height] of [[375,812],[1440,900],[768,600]])test(`sheet joins route exactly and reverses at ${width}px`,()=>{
 const args={width,height,sheetHeight:height,journeyTop:height,startX:width*.8,angle:90,size:width<=650?26:44};
 const initial=openingFrame({...args,scroll:0});assert.equal(initial.x,0);assert.equal(initial.y,0);assert.equal(initial.width,width);assert.equal(initial.height,height);assert.equal(initial.angle,0);assert.equal(initial.textOpacity,1);
 const end=initial.end,final=openingFrame({...args,scroll:end});
 assert.equal(final.progress,1);assert.equal(final.width,args.size);assert.equal(final.height,args.size);
 assert.equal(final.x+args.size/2,args.startX);assert.equal(final.y+args.size/2,args.journeyTop-end);assert.equal(final.angle,90);
 const before=openingFrame({...args,scroll:end-.001});assert.ok(Math.abs(before.x-final.x)<.01);assert.ok(Math.abs(before.y-final.y)<.01);
 const scrolls=Array.from({length:101},(_,i)=>end*i/100);
 assert.deepEqual(scrolls.map(scroll=>openingFrame({...args,scroll})),[...scrolls].reverse().map(scroll=>openingFrame({...args,scroll})).reverse());
});
test('fold panels remain continuous at stage boundaries and colors transition from paper to blue',()=>{
 for(const p of [.34,.7])for(const name of ['outline','top','bottom']){const a=openingShape(p-.000001)[name],b=openingShape(p+.000001)[name];a.forEach((pt,i)=>pt.forEach((v,j)=>assert.ok(Math.abs(v-b[i][j])<.001)));}
 assert.equal(openingColor('f8f6ef','123D58',0),'#f8f6ef');assert.equal(openingColor('f8f6ef','123D58',1),'#123d58');
 assert.deepEqual(openingShape(1).outline,[[3,6],[60,30],[60,30],[3,56],[16,32],[3,6]]);
});
test('bundled preview parses; one quote and no separate plane or repeated introduction',async()=>{
 const html=await readFile('preview.html','utf8');const code=html.match(/<script>([\s\S]*?)<\/script>/)[1];new Script(code);
 assert.equal((html.match(/Cancer runs on the same evolutionary rules/g)||[]).length,1);
 assert.ok(!html.includes('id="plane"'));assert.ok(!html.includes('Building things.'));
 assert.ok(html.includes('-Pavan Punnamraju, 2026'));
});
