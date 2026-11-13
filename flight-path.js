// Geometry is kept separate from rendering so clearance can be checked without a browser.
export function createFlightRoute({width, stops, contactTop, contactBottom}) {
  const mobile = width <= 650;
  const planeRadius = mobile ? 13 : 22;
  const margin = mobile ? 18 : 32;
  const commands = [];
  const anchors = [];
  const pacingRanges = [];
  let cursor;
  const move = (x, y) => { cursor = {x, y}; commands.push({type:'M', end:cursor}); };
  const curve = (c1, c2, end, scrollY = end.y) => {
    commands.push({type:'C', start:cursor, c1, c2, end});
    cursor = end;
    anchors.push({command:commands.length - 1, y:scrollY});
  };
  // Select the empty side from the measured (including rotated) content bounds.
  const lanes = stops.map(stop => {
    if (mobile) return {x:18, direction:1, radius:10};
    const right = width - stop.right >= stop.left;
    const freeStart = right ? stop.right + planeRadius + 18 : margin;
    const freeEnd = right ? width - margin : stop.left - planeRadius - 18;
    const radius = Math.max(0, Math.min(100, (freeEnd - freeStart) * .55));
    return {x:right ? freeStart + (freeEnd-freeStart)*.3 : freeEnd - (freeEnd-freeStart)*.3,
      direction:right ? 1 : -1, radius};
  });
  // One broad bend when consecutive stops share the same empty side.
  const drift = (x, y, bow) => {
    const start=cursor, midY=(start.y+y)/2, midX=(start.x+x)/2+bow;
    curve({x:start.x,y:start.y+(midY-start.y)*.5},{x:midX,y:midY-(midY-start.y)*.5},{x:midX,y:midY});
    curve({x:midX,y:midY+(y-midY)*.5},{x,y:y-(y-midY)*.5},{x,y});
  };
  const sweep = (x, y, crossY, bow) => {
    const start=cursor, dx=x-start.x, dy=y-start.y;
    if(Math.abs(dx)<45){drift(x,y,bow);return;}
    const turn=Math.sign(dx)*Math.min(100,Math.abs(dx)*.25);
    // Turn while still beside the image, cross horizontally in the clear gap,
    // then round down beside the next image. Both joins have horizontal tangents.
    curve({x:start.x,y:crossY},{x:start.x+turn*.45,y:crossY},{x:start.x+turn,y:crossY},start.y+dy*.35);
    const to=x-turn,from=start.x+turn;
    curve({x:from+(to-from)/3,y:crossY},{x:from+(to-from)*2/3,y:crossY},{x:to,y:crossY},start.y+dy*.65);
    curve({x:x-turn*.45,y:crossY},{x,y:crossY},{x,y},y);
  };
  move(lanes[0]?.x ?? width-margin, 0);
  anchors.push({command:0,y:0});
  stops.forEach((stop, i) => {
    if(stop.kind==='video') {
      const paceFrom=anchors.length-1;
      // The wide centered video gets a dedicated right-side bypass, not a loop.
      const x=mobile?width-22:stop.right+(width-stop.right)*.5;
      const crossY=i?(stops[i-1].bottom+stop.top)/2:stop.top*.5;
      const clearance=mobile?22:34;
      if(i){
        const departureY=stops[i-1].bottom+clearance;
        curve({x:cursor.x,y:cursor.y+(departureY-cursor.y)*.45},
          {x:cursor.x,y:departureY-12},{x:cursor.x,y:departureY});
      }
      sweep(x,stop.top-clearance,crossY,0);
      const bow=mobile?3:Math.min(24,(width-x-32)*.5);
      drift(x,stop.bottom+(mobile?20:36),bow);
      pacingRanges.push({from:paceFrom,to:anchors.length-1});
      return;
    }
    const {x,direction,radius} = lanes[i];
    const cy = stop.top + (stop.bottom-stop.top)*.45;
    const halfHeight = mobile ? 27 : 78;
    const startY = cy-halfHeight;
    const crossY = i ? (stops[i-1].bottom+stop.top)/2 : startY*.5;
    // One large rounded crossing leads directly into the loop. There are no
    // separate approach/departure wiggles alongside each image.
    sweep(x,startY,crossY,direction*(mobile?4:radius*.5));
    // A tilted teardrop with a natural entry, crossing, and separate exit.
    const tipX = x+direction*radius;
    curve({x,y:cy-halfHeight*.15},{x:tipX,y:cy+halfHeight*.8},{x:tipX,y:cy},cy);
    curve({x:tipX,y:cy-halfHeight*.8},{x,y:cy-halfHeight*.8},{x,y:cy+halfHeight},cy+halfHeight);
  });
  // Finish in clear space above Contact, without crossing its heading or email.
  const endY = mobile ? contactTop+24 : Math.min(contactTop-34, contactBottom-34);
  const endX = mobile ? 22 : width-margin-16;
  const crossY = ((stops.at(-1).kind==='video'?cursor.y:stops.at(-1).bottom)+endY)/2;
  sweep(endX,endY,crossY,stops.at(-1).kind==='video'?0:(mobile?3:18));
  return {commands,anchors,pacingRanges,mobile,end:cursor};
}

export function pathData(commands) {
  return commands.map(c=>c.type==='M' ? `M ${c.end.x} ${c.end.y}` :
    `C ${c.c1.x} ${c.c1.y} ${c.c2.x} ${c.c2.y} ${c.end.x} ${c.end.y}`).join(' ');
}

export function distanceAtScroll(y, segments) {
  if(y<=segments[0].y)return segments[0].l;
  for(let i=1;i<segments.length;i++) {
    if(y<=segments[i].y) {
      const a=segments[i-1],b=segments[i];
      return a.l+(b.l-a.l)*Math.max(0,Math.min(1,(y-a.y)/(b.y-a.y)));
    }
  }
  return segments.at(-1).l;
}

// Spread the video approach over its whole scroll interval, rather than racing
// across the horizontal gap in just a handful of scroll pixels.
export function paceFlightSegments(segments,ranges){
 const paced=segments.map(segment=>({...segment}));
 for(const {from,to} of ranges){
   const start=segments[from],end=segments[to],length=end.l-start.l;
   if(length<=0)continue;
   for(let i=from+1;i<to;i++)paced[i].y=start.y+(end.y-start.y)*(segments[i].l-start.l)/length;
 }
 return paced;
}
