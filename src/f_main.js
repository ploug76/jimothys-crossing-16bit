// ---------- screens
function button(label,x,y,w,h,col,fn){x=Math.round(x);y=Math.round(y);w=Math.round(w);h=Math.round(h);const dn=downBtn&&downBtn.x==x&&downBtn.y==y;
 g.fillStyle='rgba(0,0,0,.45)';g.fillRect(x+1,y+2,w,h);g.fillStyle=OL;g.fillRect(x,y,w,h);g.fillStyle=dn?'#9aa4b8':'#eef2fa';g.fillRect(x+1,y+1,w-2,h-2);g.fillStyle=dn?shade(col,-.2):col;g.fillRect(x+2,y+2,w-4,h-4);
 g.fillStyle=shade(col,.3);g.fillRect(x+2,y+2,w-4,2);g.fillStyle=shade(col,-.3);g.fillRect(x+2,y+h-4,w-4,2);
 const sc=fitSc(label,txtW(label,2)<=w-12&&h>=26?2:1,w-8);txt(label,x+w/2,y+h/2+(dn?1:0),'#ffffff',{sc,sh:OL,reg:false});menuBtns.push({x,y,w,h,fn});UI.push({x,y,w,h,k:'btn',s:label})}
function wrapTxt(s,maxW){const out=[];let line='';for(const wd of s.split(' ')){const t=line?line+' '+wd:wd;if(txtW(t)>maxW&&line){out.push(line);line=wd}else line=t}if(line)out.push(line);return out}
function dimBoard(a){g.fillStyle=`rgba(5,10,30,${a})`;g.fillRect(BX,BYp,BW,BHP)}
function logo(cx,y,maxW){const s1=fitSc("JIMOTHY'S",2,maxW),s2=fitSc('CROSSING',3,maxW);txt("JIMOTHY'S",cx,y+s1*4.5,'#ffd23f',{sc:s1,ol:OL,sh:'#c04a1a'});y+=s1*9+2;txt('CROSSING',cx,y+s2*4.5,'#ffffff',{sc:s2,ol:OL,sh:'#2b6cb0'});y+=s2*9+3;
 const bw=txtW('16-BIT')+10;g.fillStyle=OL;g.fillRect(Math.round(cx-bw/2),y,bw,11);g.fillStyle='#e0303a';g.fillRect(Math.round(cx-bw/2)+1,y+1,bw-2,9);g.fillStyle='#ff7a80';g.fillRect(Math.round(cx-bw/2)+1,y+1,bw-2,1);txt('16-BIT',cx,y+6,'#ffffff',{sh:'#7a0a10'});return y+13}
function portrait(cx,cy,maxH,mood='happy'){const fr=SP.front[mood],k=mood=='sad'?(Math.sin(gt*1.7)>.96?1:0):(Math.sin(gt*1.7)>.96?2:Math.floor(gt*2.5)%2);const cv=fr[Math.min(k,fr.length-1)];const sc=maxH>=cv.height*2+4?2:1;
 const b=Math.round(Math.sin(gt*5));g.drawImage(cv,Math.round(cx-cv.width*sc/2),Math.round(cy-cv.height*sc/2+b),cv.width*sc,cv.height*sc);return cv.height*sc}
function titleButtons(){const maxL=ST.get('maxL',1);const bl=[['PLAY','#2e9e5b',()=>start(1)]];if(maxL>1)bl.push(['CONTINUE LV '+maxL,'#2b6cb0',()=>start(maxL)]);bl.push(['HOW TO PLAY','#8d5bd6',showHelp]);bl.push(['HIGH SCORES','#c0702a',showScores]);return bl}
function drawTitle(){const top=HUDY+4,bot=IH-Math.ceil(SI.b)-4,bl=titleButtons(),bh=Math.max(TB,22),gap=4;const two=IW>=IH*1.15;
 if(!two){const cx=Math.round(IW/2),W=Math.min(IW-8,190);const tbx=Math.min(...TBTN.filter(b=>b.k!='pause').map(b=>b.x));let y=logo(cx,top+(tbx<cx+W/2?TB:0),W);
  const tag=wrapTxt("SEATTLE'S FAMOUS RACCOON IS WADDLING HOME!",W);if(bot-y>bl.length*(bh+gap)+60)for(const l of tag){txt(l,cx,y+5,'#ffffff',{sh:OL});y+=10}
  const bestY=bot-5,btop=bestY-8-bl.length*(bh+gap);const bw=Math.min(W,170);const area=btop-y-4;if(area>=40)portrait(cx,y+area/2+2,area);
  bl.forEach((b,i)=>button(b[0],cx-bw/2,btop+i*(bh+gap),bw,bh,b[1],b[2]));txt('BEST '+String(ST.get('best',0)).padStart(6,'0'),cx,bestY,'#ffd23f',{sh:OL})}
 else{const lw=IW/2,cx=Math.round(SI.l+(lw-SI.l)/2),W=Math.min(lw-SI.l-8,200);let y=logo(cx,top,W);const area=bot-y-14;if(area>=40)portrait(cx,y+area/2,area);txt("SEATTLE'S FAMOUS RACCOON",cx,bot-10,'#ffffff',{sh:OL});txt('IS WADDLING HOME!',cx,bot-1,'#ffffff',{sh:OL});
  const rx=Math.round(lw+(IW-SI.r-lw)/2),bw=Math.min(IW-SI.r-lw-12,170),tot=bl.length*(bh+gap)+12,b0=Math.max(top+TB+4,Math.round((top+bot-tot)/2));bl.forEach((b,i)=>button(b[0],rx-bw/2,b0+i*(bh+gap),bw,bh,b[1],b[2]));txt('BEST '+String(ST.get('best',0)).padStart(6,'0'),rx,b0+bl.length*(bh+gap)+6,'#ffd23f',{sh:OL})}}
function drawPause(){dimBoard(.6);const cx=BX+BW/2,bh=Math.max(TB,22),bw=Math.min(150,BW-16);let y=BYp+14;txt('PAUSED',cx,y+10,'#ffd23f',{sc:3,ol:OL,sh:null});y+=30;
 [['RESUME','#2e9e5b',togglePause],['RESTART','#2b6cb0',()=>{paused=false;start(1)}],['MAIN MENU','#56616e',toTitle]].forEach((b,i)=>button(b[0],cx-bw/2,y+i*(bh+6),bw,bh,b[1],b[2]));y+=3*(bh+6)+8;
 for(const l of wrapTxt('THE GAME PAUSES BY ITSELF IF YOU SWITCH APPS.',BW-16)){txt(l,cx,y,'#cfe3ff',{sh:OL});y+=10}}
function drawOver(){const top=BYp,bot=IH-Math.ceil(SI.b)-3;g.fillStyle='rgba(5,10,30,.82)';g.fillRect(BX,top,BW,bot-top);const cx=BX+BW/2,bh=Math.max(TB,22);let y=top+6;
 const s=fitSc('GAME OVER',3,BW-8);txt('GAME OVER',cx,y+s*3.5,'#ff5a5a',{sc:s,ol:OL,sh:'#5a0a0a'});y+=s*7+8;
 txt('SCORE '+G.score.toLocaleString(),cx,y+4,'#ffffff',{sc:txtW('SCORE '+G.score.toLocaleString(),2)<=BW-8?2:1,ol:OL,sh:null});y+=18;
 if(G.newBest)txt('* NEW BEST SCORE! *',cx,y,'#ffd23f',{sh:OL});else if(G.rank>=0&&G.score>0)txt('#'+(G.rank+1)+' ON YOUR TOP 5',cx,y,'#7CFC9A',{sh:OL});else txt('BEST '+ST.get('best',0).toLocaleString(),cx,y,'#ffd23f',{sh:OL});y+=11;
 txt(`LV ${G.L}  DENS ${G.homesTotal}  TRASH ${G.trash}`,cx,y,'#cfe3ff',{sh:OL});y+=11;if(G.golds){txt('GOLDEN CANS '+G.golds,cx,y,'#ffd700',{sh:OL});y+=11}
 const nB=3,btnTop=bot-nB*(bh+4);const hs=ST.get('scores',[]);if(btnTop-y>=12+hs.length*10){y+=3;txt('TOP SCORES',cx,y,'#ffd23f',{sh:OL});y+=10;hs.forEach((e,i)=>{txt(`${i+1}. ${String(e.s).padStart(6,'0')} LV${e.l}`,cx,y,i==G.rank?'#7CFC9A':'#ffffff',{sh:OL});y+=10})}
 const gap=btnTop-y-4;if(gap>=60)portrait(cx,y+gap/2,gap,'sad');const bw=Math.min(150,BW-16);
 button('PLAY AGAIN',cx-bw/2,btnTop,bw,bh,'#2e9e5b',()=>{if(gt-overAt>.7)start(1)});button('HIGH SCORES',cx-bw/2,btnTop+bh+4,bw,bh,'#c0702a',()=>{if(gt-overAt>.7)showScores()});button('MAIN MENU',cx-bw/2,btnTop+2*(bh+4),bw,bh,'#56616e',()=>{if(gt-overAt>.7)toTitle()})}
function render(){UI=[];menuBtns=[];g.setTransform(1,0,0,1,0,0);g.imageSmoothingEnabled=false;const w=G&&state!='title'?G.w:'day';
 if(state=='title'){drawCity(0,0,IW,IH,'day',gt*2.5,Math.round(IH*.6));drawTB();drawTitle()}
 else{drawCity(0,0,IW,IH,w,gt,Math.round(EXTRA>40?BARY+BARP+Math.min(EXTRA*.45,56):IH*.55));g.fillStyle=OL;g.fillRect(BX-1,BYp,1,BHP);g.fillRect(BX+BW,BYp,1,BHP);drawWorld();drawHUD();drawBar();if(state=='play'){drawControls();drawTB();if(paused)drawPause();else drawPops()}else if(state=='over'){drawTB();drawOver()}}
 lastUI=UI}
// ---------- flow
let overAt=-9;
function toTitle(){state='title';paused=false;G=null;pops=[];pickups=[];buildLevel(1);lt=0;chrome();playSong('title')}
const _go=gameOver;gameOver=function(){_go();overAt=gt};
function togglePause(){if(state!='play')return;paused=!paused;holdDir=null;swipe=null;dpadPtr=null;if(!paused)queue=[];chrome()}
function toggleDpad(){}
function chrome(){}
function showScores(){try{if(window.PALB)PALB.show()}catch(e){}}
function showHelp(){if(state=='play'&&!paused)togglePause();panelOpen=true;$('ptext').innerHTML=`<h2>Jimothy's Crossing 16-Bit</h2>
<p>Jimothy, Seattle's famous chunky raccoon, is waddling home! Hop him across busy streets and the Sound and tuck him into all <b>5 trash-can dens</b> at the top.</p>
<h3>Controls</h3><ul><li><b>Swipe</b> up / down / left / right to hop one space.</li><li><b>Tap</b> anywhere to hop forward.</li><li>On a computer, use the arrow keys or WASD.</li><li>Quick taps are remembered, so you can chain hops.</li><li>P = pause, M = sound, H = help.</li></ul>
<h3>Watch out</h3><ul><li>Cars, Metro buses, trucks, bikes and scooters.</li><li>Light rail: when the lights flash and the bell rings, a train is coming!</li><li>Jimothy can't swim. Ride logs, ferries and crates. Crates that wobble are about to sink!</li><li>Don't get carried off the edge of the screen.</li><li>Level 3+: a seagull on the promenade and crows that sit in the dens.</li><li>Level 4+: orcas. Ride the back, never the mouth!</li></ul>
<h3>Points</h3><table><tr><td>Each new row forward</td><td>10</td></tr><tr><td>Reaching a den</td><td>50 + time bonus</td></tr><tr><td>Soda can / Pizza box / Trash can</td><td>20 / 50 / 100</td></tr><tr><td>Grab trash quickly in a row</td><td>combo up to x4</td></tr><tr><td>Golden can (rare)</td><td>500 + full timer</td></tr><tr><td>June bug in a den</td><td>200</td></tr><tr><td>Bring the baby raccoon home</td><td>200</td></tr><tr><td>All 5 dens filled</td><td>1000</td></tr></table>
<p>Extra life every 10,000 points. Each level gets faster and busier, with sunsets, Seattle rain and night shifts. The whole game is free.</p>`;$('panel').style.display='flex'}
$('pclose').onclick=e=>{e.stopPropagation();$('panel').style.display='none';panelOpen=false};
['pointerdown','touchstart','mousedown'].forEach(ev=>$('panel').addEventListener(ev,e=>e.stopPropagation()));
function tbAction(k){A();if(k=='pause')togglePause();else if(k=='mute'){setMute(!muted);if(!muted&&!musicOn)playSong(state=='title'?'title':songName||'day')}else showHelp()}
// ---------- input: swipe anywhere, tap = hop up, D-pad with hold-repeat, keyboard
let swipe=null,dpadPtr=null,downBtn=null;
const inR=(b,x,y,p=0)=>x>=b.x-p&&x<=b.x+b.w+p&&y>=b.y-p&&y<=b.y+b.h+p;
c.addEventListener('pointerdown',e=>{e.preventDefault();A();if(!musicOn)playSong(state=='play'&&G?(G.w=='day'||G.w=='dusk'?'day':'night'):'title');const [x,y]=toI(e.clientX,e.clientY);
 const tb=TBTN.find(b=>(b.k!='pause'||state=='play')&&inR(b,x,y,1));if(tb){SFX.click();tbAction(tb.k);return}
 if(state!='play'||paused){downBtn=menuBtns.find(b=>inR(b,x,y,2))||null;return}
 if(DPAD){const b=DPAD.btns.find(b=>inR(b,x,y,4));if(b){dpadPtr=e.pointerId;holdDir=b.d;holdT=gt+.24;tryMove(b.d);return}}
 swipe={id:e.pointerId,x:e.clientX,y:e.clientY,t0:performance.now(),fired:false}},{passive:false});
c.addEventListener('pointermove',e=>{if(dpadPtr===e.pointerId&&DPAD){const [x,y]=toI(e.clientX,e.clientY);const b=DPAD.btns.find(b=>inR(b,x,y,4));if(b&&b.d!=holdDir){holdDir=b.d;holdT=gt+.24;tryMove(b.d)}return}
 if(!swipe||swipe.id!==e.pointerId)return;const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y,th=Math.max(16,Math.min(26,innerWidth*.055));
 const d=Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up');
 if(Math.hypot(dx,dy)>=(swipe.last==d?th*3.2:th)){tryMove(d);swipe.x=e.clientX;swipe.y=e.clientY;swipe.fired=true;swipe.last=d}});
function ptrEnd(e){if(dpadPtr===e.pointerId){dpadPtr=null;holdDir=null}
 if(swipe&&swipe.id===e.pointerId){if(!swipe.fired&&performance.now()-swipe.t0<450)tryMove('up');swipe=null}
 if(downBtn&&e.type=='pointerup'){const [x,y]=toI(e.clientX,e.clientY);const b=menuBtns.find(b=>inR(b,x,y,4));if(b&&b.x==downBtn.x&&b.y==downBtn.y){SFX.click();b.fn()}}downBtn=null}
c.addEventListener('pointerup',ptrEnd);c.addEventListener('pointercancel',ptrEnd);
const KM={ArrowUp:'up',w:'up',W:'up',ArrowDown:'down',s:'down',S:'down',ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right'};
addEventListener('keydown',e=>{if(window.PALB&&PALB.isOpen&&PALB.isOpen())return;if(panelOpen){if(e.key=='Escape'||e.key=='Enter'){$('pclose').click();e.preventDefault()}return}const k=e.key;A();
 if(KM[k]){e.preventDefault();if(state=='play'&&!paused){if(e.repeat&&(J.hopping||queue.length))return;tryMove(KM[k])}return}
 if(k=='p'||k=='P'||k=='Escape'){togglePause();return}if(k=='m'||k=='M'){setMute(!muted);if(!muted&&!musicOn)playSong(state=='title'?'title':songName||'day');return}if(k=='h'||k=='H'){showHelp();return}
 if(k==' '||k=='Enter'){e.preventDefault();if(state=='title')start(1);else if(state=='over'&&gt-overAt>.8)start(1);else if(paused)togglePause();else if(state=='play')tryMove('up')}});
function bg(){if(state=='play'&&!paused)togglePause()}
document.addEventListener('visibilitychange',()=>{if(document.hidden)bg()});addEventListener('pagehide',bg);addEventListener('blur',bg);
;(function(){/*swup v1: check for updates on every open*/if(window.__swup)return;window.__swup=1;var S=navigator.serviceWorker;if(!S||!/^https?:$/.test(location.protocol))return;var ARC=0,BUSY=0,had=!!S.controller,inp=0,K='swup:'+location.pathname;['pointerdown','keydown','touchstart','wheel'].forEach(function(t){addEventListener(t,function(){inp=1},{capture:true,passive:true})});function chk(){try{S.getRegistration().then(function(r){if(r)r.update().catch(function(){})},function(){})}catch(e){}}addEventListener('load',function(){setTimeout(chk,800)});document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible'){if(ARC)inp=0;chk()}});addEventListener('pageshow',function(e){if(e.persisted){if(ARC)inp=0;chk()}});function pill(){if(document.getElementById('swupPill'))return;var b=document.createElement('button');b.id='swupPill';b.type='button';b.textContent='Update ready \u2013 tap to refresh';b.style.cssText='position:fixed;left:50%;top:calc(env(safe-area-inset-top,0px) + 8px);transform:translateX(-50%);z-index:2147483647;padding:8px 14px;border:0;border-radius:999px;background:#ffd23f;color:#111;font:600 14px system-ui,sans-serif;box-shadow:0 2px 10px rgba(0,0,0,.45);cursor:pointer';b.addEventListener('click',function(){location.reload()});(document.body||document.documentElement).appendChild(b)}S.addEventListener('controllerchange',function(){if(!had){had=true;return}var n=Date.now(),l=0,busy=false;try{l=+sessionStorage.getItem(K)||0}catch(e){}try{busy=!!(BUSY&&BUSY())}catch(e){}if(inp||busy||n-l<15000||document.visibilityState!=='visible'){pill();return}try{sessionStorage.setItem(K,String(n))}catch(e){}location.reload()})})();if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).catch(()=>{});
// ---------- main loop (all timers run on game time: frozen while paused / backgrounded)
let lastT=0;function frame(now){requestAnimationFrame(frame);const dt=Math.min(.05,(now-lastT)/1000||0);lastT=now;if(!window.__manual&&!paused&&!panelOpen&&!document.hidden)step(dt);render()}
buildSprites();onResize();buildLevel(1);setMute(muted);requestAnimationFrame(t=>{lastT=t;frame(t)});
// ---------- art export (icons / covers) + test hooks
function offscreen(w,h,fn){const cv=document.createElement('canvas');cv.width=w;cv.height=h;const o=[g,IW,IH,BX,BYp,HUDY,TBTN,SI,state];g=cv.getContext('2d');g.imageSmoothingEnabled=false;IW=w;IH=h;TBTN=[];SI={t:0,r:0,b:0,l:0};try{fn()}finally{[g,IW,IH,BX,BYp,HUDY,TBTN,SI,state]=o}return cv}
function upscale(cv,k){const b=document.createElement('canvas');b.width=cv.width*k;b.height=cv.height*k;const x=b.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(cv,0,0,b.width,b.height);return b.toDataURL('image/png')}
function makeIcon(px){const cv=offscreen(64,64,()=>{drawCity(0,0,64,64,'day',40,40);g.drawImage(SP.front.happy[0],8,5)});return upscale(cv,px/64)}
function makeCover(w,h,k){const cv=offscreen(w,h,()=>{drawCity(0,0,w,h,'day',30,Math.round(h*.62));const lw=Math.round(w*.58);logo(lw/2+4,Math.round(h*.16),lw-10);const fr=SP.front.happy[0],sc=h>=fr.height*2+10?2:1;g.drawImage(fr,Math.round(w*.79-fr.width*sc/2),Math.round(h/2-fr.height*sc/2),fr.width*sc,fr.height*sc);
 txt("SEATTLE'S FAMOUS RACCOON",lw/2+4,h-22,'#ffffff',{sh:OL});txt('IS WADDLING HOME!',lw/2+4,h-12,'#ffffff',{sh:OL})});return upscale(cv,k)}
window.__T={icon:makeIcon,cover:makeCover,get:()=>({state,paused,panelOpen,L:G&&G.L,score:G&&G.score,lives:G&&G.lives,row:J.row,rowF:J.rowF,x:J.x,dead:J.dead,hopping:J.hopping,queue:queue.length,homes:G&&G.homes.slice(),time:G&&G.time,w:G&&G.w,clearT:G&&G.clearT,trash:G&&G.trash,carry:J.carry,kit:!!(G&&G.kit),plat:!!J.plat,gt,lt}),
 start,toTitle,togglePause,update:step,hop:tryMove,render,safeAt,now:()=>lt,platAt2:(r,x,t)=>{const p=platAt(r,x,t);return p?{speed:p.l.dir*p.l.speed,orca:orcaHead(p,x)}:null},platAt:(r,x)=>{const p=platAt(r,x);return p?{speed:p.l.dir*p.l.speed,orca:orcaHead(p,x)}:null},
 layout:()=>({S,IW,IH,BX,BYp,EXTRA,SIDE,UI:lastUI.map(u=>({...u})),tb:TBTN,dpad:DPAD&&DPAD.btns,rect:c.getBoundingClientRect().toJSON()}),addPop,spawnPickup,god:v=>{god=v},
 fillHome:i=>{G.homes[i]=1},setWeather:w=>{G.w=w;initDrops()},level:L=>{G.L=L;startLevel(L)},die,dens:DENS,rail:()=>rail,gull:()=>G&&G.gull,crow:()=>G&&G.crow,setLives:n=>{G.lives=n},J:()=>({...J,plat:!!J.plat})};
