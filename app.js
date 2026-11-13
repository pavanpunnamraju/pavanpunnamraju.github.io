import {projects,memories,danceVideo} from './content.js';
import {createFlightRoute,pathData,distanceAtScroll} from './flight-path.js';
import {openingFrame,openingShape,openingColor} from './opening-fold.js';
import {detailFrame} from './detail-fold.js';
const $=s=>document.querySelector(s), reduced=matchMedia('(prefers-reduced-motion: reduce)');
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n;};
function setCutoutTitle(node,text){
 node.textContent='';
 text.split(' ').forEach((word,i)=>{if(i)node.append(' ');node.append(el('span','',word));});
}
const dialog=$('dialog'),plane=$('.paper');
let opener,lockedY=0,closing=false,detailProgress=0,detailSource,detailRAF=0,bodyStyles;
const detailSheet=$('.detail-sheet'),detailCopy=$('.detail-paper');
function readPlanePose(){
 const matrix=new DOMMatrix(getComputedStyle(plane).transform);
 return {x:matrix.m41,y:matrix.m42,width:plane.offsetWidth,height:plane.offsetHeight,angle:Math.atan2(matrix.b,matrix.a)*180/Math.PI};
}
function renderDetail(progress){
 detailProgress=progress;
 const state=detailFrame(progress,detailSource,{width:innerWidth,height:innerHeight});
 detailSheet.style.width=state.width+'px';detailSheet.style.height=state.height+'px';
 detailSheet.style.transform=`translate3d(${state.x}px,${state.y}px,0) rotate(${state.angle}deg)`;
 for(const name of ['base','top','bottom']){
   const polygon=detailSheet.querySelector('.detail-'+name);
   polygon.setAttribute('points',state.shape[name==='base'?'outline':name].map(p=>p.join(',')).join(' '));
   polygon.setAttribute('fill',state[name]);polygon.setAttribute('stroke',state.stroke);polygon.setAttribute('stroke-width',state.strokeWidth);
 }
 detailCopy.style.opacity=state.contentOpacity;
 dialog.classList.toggle('settled',progress===1);
}
function finishDetailClose(){
 cancelAnimationFrame(detailRAF);dialog.close();
 document.body.style.overflow=bodyStyles.overflow;document.body.style.paddingRight=bodyStyles.paddingRight;
 plane.style.visibility='';window.scrollTo(0,lockedY);measure();
 opener?.focus({preventScroll:true});closing=false;
}
function animateDetail(target){
 cancelAnimationFrame(detailRAF);
 if(reduced.matches){renderDetail(target);if(target===0)finishDetailClose();return;}
 const from=detailProgress,duration=(target===1?1100:950)*Math.abs(target-from),started=performance.now();
 if(duration<1){renderDetail(target);if(target===0)finishDetailClose();return;}
 const tick=now=>{
   const t=Math.min(1,(now-started)/duration);
   renderDetail(from+(target-from)*t);
   if(t<1)detailRAF=requestAnimationFrame(tick);
   else if(target===0)finishDetailClose();
 };
 detailRAF=requestAnimationFrame(tick);
}
function populateProjectDetails(project){
 setCutoutTitle($('#detail-title'),project.details?.title||project.title);
 $('#detail-summary').textContent=project.details?.subtitle||project.summary;
 const sections=$('#detail-sections');sections.replaceChildren();
 $('.detail-placeholder').hidden=Boolean(project.details);
 for(const entry of project.details?.sections||[]){
   const section=el('section','detail-section');
   const heading=el('h3','cutout small-title');setCutoutTitle(heading,entry.heading);
   const body=el('div','detail-section-body');
   if(entry.text)body.append(el('p','',entry.text));
   for(const paragraph of entry.paragraphs||[])body.append(el('p','',paragraph));
   if(entry.items){const list=el('ul');entry.items.forEach(item=>list.append(el('li','',item)));body.append(list);}
   if(entry.link){const link=el('a','detail-repo',entry.link.label);link.href=entry.link.url;body.append(link);}
   section.append(heading,body);sections.append(section);
 }
}
function openProject(project,trigger){
 if(dialog.open)return;
 opener=trigger;lockedY=scrollY;closing=false;detailSource=readPlanePose();
 populateProjectDetails(project);
 bodyStyles={overflow:document.body.style.overflow,paddingRight:document.body.style.paddingRight};
 const scrollbar=innerWidth-document.documentElement.clientWidth;
 document.body.style.paddingRight=(parseFloat(getComputedStyle(document.body).paddingRight)+scrollbar)+'px';
 document.body.style.overflow='hidden';
 renderDetail(reduced.matches?1:0);dialog.showModal();dialog.scrollTop=0;
 plane.style.visibility='hidden';$('.close').focus({preventScroll:true});animateDetail(1);
}
function closeProject(){
 if(closing||!dialog.open)return;
 closing=true;dialog.scrollTop=0;detailSource=readPlanePose();animateDetail(0);
}
$('.close').addEventListener('click',closeProject);
dialog.addEventListener('cancel',e=>{e.preventDefault();closeProject();});
// Native modal dialog makes the page inert. Keep focus within the visible controls.
dialog.addEventListener('keydown',e=>{
 if(e.key!=='Tab')return;
 const controls=[...dialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),[tabindex="0"]')];
 const first=controls[0],last=controls.at(-1);
 if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
 else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
});
addEventListener('resize',()=>{if(dialog.open){requestAnimationFrame(()=>{detailSource=readPlanePose();renderDetail(detailProgress);});}});
reduced.addEventListener('change',()=>{if(dialog.open){cancelAnimationFrame(detailRAF);if(closing)finishDetailClose();else renderDetail(1);}});
function attachProjectVideo(container,project){
 const clip=el('video','project-video');
 clip.muted=true;clip.defaultMuted=true;clip.loop=true;clip.playsInline=true;clip.controls=false;clip.preload='none';clip.disablePictureInPicture=true;clip.disableRemotePlayback=true;clip.tabIndex=-1;
 clip.setAttribute('muted','');clip.setAttribute('playsinline','');
 clip.width=1280;clip.height=720;clip.poster=project.poster;
 clip.setAttribute('aria-label',`${project.title} demo`);
 const status=el('p','project-video-status');status.hidden=true;status.setAttribute('role','status');
 const toggle=el('button','project-video-toggle','Play demo');toggle.type='button';toggle.setAttribute('aria-label',`Play ${project.title} demo`);
 const updateToggle=()=>{toggle.textContent=clip.paused?'Play demo':'Pause demo';toggle.setAttribute('aria-label',`${clip.paused?'Play':'Pause'} ${project.title} demo`);};
 container.append(clip,status);
 let visible=false,manuallyPaused=false,automaticPause=false;
 const canPlay=()=>visible&&!document.hidden&&!dialog.open;
 const pause=()=>{if(!clip.paused){automaticPause=true;clip.pause();}};
 const sync=()=>{
   if(!canPlay()){pause();return;}
   if(!clip.getAttribute('src'))clip.src=project.video;
   if(!reduced.matches&&!manuallyPaused)clip.play().then(()=>{if(!canPlay())pause();}).catch(updateToggle);
 };
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.3}).observe(clip);
 clip.addEventListener('pause',()=>{if(!automaticPause&&canPlay())manuallyPaused=true;automaticPause=false;updateToggle();});
 clip.addEventListener('play',()=>{manuallyPaused=false;updateToggle();if(!canPlay())pause();});
 toggle.addEventListener('click',()=>{
   if(!clip.getAttribute('src'))clip.src=project.video;
   if(clip.paused){manuallyPaused=false;clip.play().catch(()=>{status.hidden=false;status.textContent='Playback could not start. Please try again.';updateToggle();});}
   else {manuallyPaused=true;clip.pause();}
 });
 clip.addEventListener('error',()=>{status.hidden=false;status.textContent='The demo could not load. Please refresh to try again.';});
 clip.addEventListener('loadeddata',()=>{status.hidden=true;});
 reduced.addEventListener('change',()=>{if(reduced.matches)pause();else sync();});
 document.addEventListener('visibilitychange',sync);
 new MutationObserver(sync).observe(dialog,{attributes:true,attributeFilter:['open']});
 return toggle;
}
projects.forEach((p,i)=>{const section=el('section','project stop');section.id=`project-${i+1}`;section.append(el('p','eyebrow number',`0${i+1} / ${i<3?'PROJECTS':'WORK'}`));const media=el(p.video?'div':'button','open-media');if(!p.video){media.setAttribute('aria-label',`Open ${p.title} details`);media.setAttribute('aria-haspopup','dialog');}const picture=el('div','project-media');let playbackToggle;if(p.video){picture.classList.add('has-video');playbackToggle=attachProjectVideo(picture,p);}else if(p.image){const img=el('img');img.src=p.image;img.alt=p.imageAlt||`${p.title} project`;img.loading='lazy';if(p.imageFit)img.style.objectFit=p.imageFit;picture.append(img);}else picture.textContent=`${p.title} · image placeholder`;media.append(picture);if(p.imageCaption)media.append(el('span','media-caption',p.imageCaption));if(playbackToggle)media.append(playbackToggle);const row=el('div','title-row'),h=el('h2','cutout section-title'),title=el('button');setCutoutTitle(title,p.title);title.setAttribute('aria-haspopup','dialog');h.append(title);row.append(h);if(p.url){const a=el('a','',`${p.label} ↗`);a.href=p.url;row.append(a);}const more=el('button','detail-link','Explore project ↗');more.setAttribute('aria-label',`Explore ${p.title}`);more.setAttribute('aria-haspopup','dialog');[...(p.video?[]:[media]),title,more].forEach(b=>b.onclick=()=>openProject(p,b));section.append(media,row,el('p','summary',p.summary),more);$('#projects').append(section);});
memories.forEach(m=>{const f=el('figure','memory stop');if(m.asset){const img=el('img');img.src=m.asset;img.alt=m.alt;img.loading='lazy';img.decoding='async';if(m.width&&m.height){img.width=m.width;img.height=m.height;}f.append(img);}else{const box=el('div','photo-placeholder',m.alt);box.append(el('small','','PHOTO PLACEHOLDER'));f.append(box);}f.append(el('figcaption','',m.caption));$('#memories').append(f);});
const route=$('#route'),path=$('#route path'),journey=$('#journey');let length=0,segments=[],sheetHeight=0;
const opening=$('.opening'),paperCopy=$('.paper-copy');
function placeSheet(){
  if(reduced.matches){opening.append(plane);plane.classList.remove('flying');opening.style.height='';plane.removeAttribute('style');paperCopy.removeAttribute('style');$('.scroll-note').removeAttribute('tabindex');$('.scroll-note').style.removeProperty('pointer-events');}
  else {sheetHeight=Math.max(innerHeight,paperCopy.scrollHeight);opening.style.height=sheetHeight+'px';plane.classList.add('flying');}
}
placeSheet();
function measure(){
  if(!reduced.matches){paperCopy.style.width=innerWidth+'px';paperCopy.style.height='auto';sheetHeight=Math.max(innerHeight,paperCopy.scrollHeight);paperCopy.style.height=sheetHeight+'px';opening.style.height=sheetHeight+'px';}
  const rect=journey.getBoundingClientRect();
  const bounds=element=>{const r=element.getBoundingClientRect();return {left:r.left-rect.left,right:r.right-rect.left,top:r.top-rect.top,bottom:r.bottom-rect.top};};
  const stops=[...document.querySelectorAll('.stop:not(#contact)')].map(element=>({...bounds(element),kind:element.classList.contains('video-stop')?'video':'content'}));
  const contact=bounds($('#contact'));
  const geometry=createFlightRoute({width:journey.clientWidth,stops,contactTop:contact.top,contactBottom:contact.bottom});
  route.setAttribute('height',journey.offsetHeight);
  route.setAttribute('viewBox',`0 0 ${journey.clientWidth} ${journey.offsetHeight}`);
  // Measure milestone lengths once on layout changes, never during scrolling.
  segments=geometry.anchors.map(anchor=>{
    path.setAttribute('d',pathData(geometry.commands.slice(0,anchor.command+1)));
    return {y:anchor.y,l:anchor.command===0?0:path.getTotalLength()};
  });
  path.setAttribute('d',pathData(geometry.commands));
  length=path.getTotalLength();
  update();
}
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
function update(){
 if(reduced.matches)return;
 const journeyTop=journey.getBoundingClientRect().top+scrollY;
 const size=innerWidth<=650?26:44,start=path.getPointAtLength(0),startNext=path.getPointAtLength(2);
 const initialAngle=Math.atan2(startNext.y-start.y,startNext.x-start.x)*180/Math.PI;
 const fold=openingFrame({scroll:scrollY,width:innerWidth,height:innerHeight,sheetHeight,journeyTop,startX:start.x,startY:start.y,angle:initialAngle,size});
 const shape=openingShape(fold.progress),points=p=>p.map(v=>v.join(',')).join(' ');
 $('.sheet-base').setAttribute('points',points(shape.outline));
 $('#sheet-outline polygon').setAttribute('points',points(shape.outline));
 $('.sheet-top').setAttribute('points',points(shape.top));
 $('.sheet-bottom').setAttribute('points',points(shape.bottom));
 const colorProgress=clamp((fold.progress-.12)/.88);
 $('.sheet-base').setAttribute('fill',openingColor('f8f6ef','123D58',colorProgress));
 $('.sheet-top').setAttribute('fill',openingColor('f8f6ef','A9D8E9',colorProgress));
 $('.sheet-bottom').setAttribute('fill',openingColor('f8f6ef','8ACBE3',colorProgress));
 for(const panel of [$('.sheet-top'),$('.sheet-bottom')]){panel.setAttribute('stroke',openingColor('f8f6ef','123D58',colorProgress));panel.setAttribute('stroke-width',String(fold.progress*.8));}
 $('.sheet-lines').style.opacity=String(1-fold.progress);
 $('#paper-rules').setAttribute('height',41*64/sheetHeight);
 let {x,y,width,height,angle}=fold;
 if(fold.progress===1){
   const distance=distanceAtScroll(scrollY+innerHeight*.48-journeyTop,segments);
   const p=path.getPointAtLength(Math.min(distance,length)),next=path.getPointAtLength(Math.min(distance+2,length)),before=path.getPointAtLength(Math.max(0,distance-2));
   x=p.x-size/2;y=journeyTop-scrollY+p.y-size/2;
   angle=Math.atan2(next.y-before.y,next.x-before.x)*180/Math.PI;
 }
 plane.style.width=width+'px';plane.style.height=height+'px';
 plane.style.clipPath=`polygon(${shape.outline.map(([px,py])=>`${px/64*100}% ${py/64*100}%`).join(',')})`;
 plane.style.transform=`translate3d(${x}px,${y}px,0) rotate(${angle}deg)`;
 paperCopy.style.transform=`scale(${width/innerWidth},${height/sheetHeight})`;
 paperCopy.style.opacity=String(fold.textOpacity);
 $('.scroll-note').tabIndex=fold.progress>.05?-1:0;
 $('.scroll-note').style.pointerEvents=fold.progress>.05?'none':'auto';
}
let frame;addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update);},{passive:true});new ResizeObserver(measure).observe(journey);addEventListener('resize',measure);reduced.addEventListener('change',()=>{placeSheet();measure();if(reduced.matches)$('#dance').pause();});measure();
const video=$('#dance'),play=$('#play-video');let inView=false,userPaused=false,autoPause=false;
if(danceVideo){$('#video-status').hidden=true;video.classList.add('ready');play.hidden=false;new IntersectionObserver(entries=>{for(const e of entries){inView=e.isIntersecting;video.classList.toggle('visible',inView);if(inView){if(!video.src)video.src=danceVideo;if(!reduced.matches&&!userPaused)video.play().catch(()=>{play.hidden=false;});}else{autoPause=true;video.pause();}}},{threshold:.3}).observe(video);play.onclick=()=>{userPaused=false;video.play().catch(()=>{$('#video-status').hidden=false;$('#video-status').textContent='Playback unavailable. Please try the video controls.';});};video.addEventListener('pause',()=>{if(inView&&!autoPause)userPaused=true;autoPause=false;play.hidden=false;play.textContent='Play dance video';});video.addEventListener('play',()=>{play.hidden=true;});video.addEventListener('error',()=>{$('#video-status').hidden=false;$('#video-status').textContent='Video could not load. Please try again later.';});}
