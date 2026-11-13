import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {projects,memories} from '../content.js';
test('approved project order, independent accessible links and missing media are explicit',()=>{assert.deepEqual(projects.map(p=>p.title),['Chemo Education','PDAC TME Navigator','PDAC RiskScope','Neuramod']);assert.equal(projects[2].url,null);assert.equal(memories.length,4);for(const p of projects)assert.ok(p.summary.length>80);});
test('production has its referenced local resources',async()=>{const html=await readFile('dist/index.html','utf8');for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(!m[1].includes(':'))await access(`dist/${m[1]}`);}assert.ok(html.includes('Graduation: June, 2028'));assert.ok(!html.includes('READY TO BE AMAZED'));});
const rgb=h=>h.match(/\w\w/g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);const lum=h=>rgb(h).reduce((s,c,i)=>s+c*[.2126,.7152,.0722][i],0);
test('palette text exceeds WCAG AA normal text contrast on both blue surfaces',()=>{for(const bg of ['8ACBE3','A9D8E9'])for(const fg of ['101D2B','20384A','123D58','703B36'])assert.ok((lum(bg)+.05)/(lum(fg)+.05)>=4.5,`${fg} on ${bg}`);});
