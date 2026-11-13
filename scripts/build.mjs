import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of ['index.html','style.css','app.js','content.js','flight-path.js','opening-fold.js','detail-fold.js'])await copyFile(file,`dist/${file}`);
await cp('assets','dist/assets',{recursive:true});
await copyFile('.nojekyll','dist/.nojekyll');
console.log('Built static site in dist/');
// A self-contained review copy also works via file:// without a local server.
const {readFile,writeFile}=await import('node:fs/promises');
let html=await readFile('index.html','utf8');
const css=await readFile('style.css','utf8');
const content=(await readFile('content.js','utf8')).replaceAll('export const','const');
const flight=(await readFile('flight-path.js','utf8')).replaceAll('export function','function');
const folding=(await readFile('opening-fold.js','utf8')).replaceAll('export function','function');
const detail=(await readFile('detail-fold.js','utf8')).replace(/^import .*?;\n/gm,'').replaceAll('export function','function');
const js=(await readFile('app.js','utf8')).replace(/^import .*?;\n/gm,'');
html=html.replace('<link rel="stylesheet" href="style.css">',`<style>${css}</style>`).replace('<script type="module" src="app.js"></script>','').replace('</body>',`<script>${content}\n${flight}\n${folding}\n${detail}\n${js}</script></body>`);
await writeFile('preview.html',html);
