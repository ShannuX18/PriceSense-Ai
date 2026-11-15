const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const inr=v=>v==null?'TBA':'₹'+Number(v).toLocaleString('en-IN'),P=[
      {name:"iPhone 18 Pro Max",brand:"Apple",ramGb:12,battery:5567,pc:48,fc:18,price:179900,cfg:"12 GB + 256 GB"},
      {name:"Samsung Galaxy Z Fold 8",brand:"Samsung",ramGb:12,battery:4800,pc:50,fc:12,price:179999,cfg:"12 GB + 256 GB"},
      {name:"OPPO Find X9 Ultra",brand:"OPPO",ramGb:12,battery:7050,pc:200,fc:50,price:169999,cfg:"12 GB + 512 GB"},
      {name:"iPhone 18 Pro",brand:"Apple",ramGb:12,battery:4288,pc:48,fc:18,price:164900,cfg:"12 GB + 256 GB"},
      {name:"Vivo X300 Ultra",brand:"Vivo",ramGb:16,battery:6600,pc:200,fc:50,price:159999,cfg:"16 GB + 512 GB"},
      {name:"Samsung Galaxy S26 Ultra",brand:"Samsung",ramGb:12,battery:5000,pc:200,fc:12,price:139999,cfg:"12 GB + 256 GB"},
      {name:"iPhone 17 Pro",brand:"Apple",ramGb:12,battery:3988,pc:48,fc:18,price:134900,cfg:"12 GB + 256 GB"},
      {name:"Samsung Galaxy Z Flip 8",brand:"Samsung",ramGb:12,battery:4200,pc:50,fc:12,price:124999,cfg:"12 GB + 256 GB"},
      {name:"iPhone Air",brand:"Apple",ramGb:12,battery:3149,pc:48,fc:18,price:119900,cfg:"12 GB + 256 GB"},
      {name:"Xiaomi 18 Pro",brand:"Xiaomi",ramGb:16,battery:5500,pc:50,fc:32,price:null,note:"Global launch 17 Nov 2026 · India price TBA"},
      {name:"iPhone 17",brand:"Apple",ramGb:8,battery:3692,pc:48,fc:18,price:82900,cfg:"8 GB + 256 GB"},
      {name:"Samsung Galaxy S26",brand:"Samsung",ramGb:12,battery:4300,pc:50,fc:12,price:87999,cfg:"12 GB + 256 GB"},
      {name:"iQOO 15",brand:"iQOO",ramGb:12,battery:7000,pc:50,fc:32,price:72999,cfg:"12 GB + 256 GB"},
      {name:"Vivo X300",brand:"Vivo",ramGb:12,battery:6040,pc:200,fc:50,price:75999,cfg:"12 GB + 256 GB"},
      {name:"Xiaomi 17",brand:"Xiaomi",ramGb:12,battery:6330,pc:50,fc:50,price:89999,cfg:"12 GB + 256 GB"},
      {name:"OPPO Reno 16 5G",brand:"OPPO",ramGb:12,battery:5800,pc:50,fc:50,price:66999,unv:1},
      {name:"OPPO Find X10 e",brand:"OPPO",ramGb:12,battery:7000,pc:50,fc:32,price:null,note:"China launch 22 Sep 2026 · not on sale in India"},
      {name:"iQOO 15R",brand:"iQOO",ramGb:8,battery:7600,pc:50,fc:32,price:44999,cfg:"8 GB + 256 GB"},
      {name:"Vivo V80",brand:"Vivo",ramGb:12,battery:5500,pc:50,fc:50,price:42999,unv:1},
      {name:"OPPO K13 Turbo",brand:"OPPO",ramGb:8,battery:7000,pc:50,fc:16,price:27999,cfg:"8 GB + 128 GB"},
      {name:"iQOO Z11",brand:"iQOO",ramGb:8,battery:6000,pc:50,fc:16,price:21999,unv:1}
    ];
const TN=['Budget','Mid-Range','Premium','Ultra Flagship'],TC=['#1f6bff','#00a86b','#8a3ffc','#ff9a00'],tn=p=>+p.tier.match(/\d/)[0];
/* Tier follows the price bands shown in the predictor (₹25k / ₹50k / ₹1.1L). A phone with no India price yet falls back to the hardware-score quantiles. */
const SCORE=p=>p.ramGb*1024*.55+p.battery*.25+p.pc*25+p.fc*30;
P.forEach(p=>{p.score=+SCORE(p).toFixed(1);const t=p.price==null?(p.score>=11567?3:p.score>=9285?2:p.score>=7010?1:0):(p.price>=110000?3:p.price>=50000?2:p.price>=25000?1:0);p.tier='Tier '+t+' ('+TN[t]+')'});
const pnote=p=>p.price==null?p.note+' · tier estimated from specs':p.unv?'Price not re-verified':'India launch price · '+p.cfg;
const BI={Apple:'fa-brands fa-apple',Samsung:'fa-solid fa-gem',Xiaomi:'fa-solid fa-bolt',Vivo:'fa-solid fa-v',OPPO:'fa-solid fa-circle-notch',iQOO:'fa-solid fa-rocket'},bi=b=>BI[b]||'fa-solid fa-mobile';
const TABS=[['overview','Overview','fa-house'],['tiers','Price Tiers','fa-layer-group'],['models','Models','fa-brain'],['features','Features','fa-chart-pie'],['lab','3D Lab','fa-cube'],['predict','Predictor','fa-sliders'],['phones','Phones','fa-mobile-screen-button'],['code','Code','fa-code'],['slides','Slides','fa-file-powerpoint'],['last','One Last Thing…','fa-hand-sparkles']];
/* ---------- cursor, particles, sparks ---------- */
const dot=$('#dot'),ring=$('#ring');let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
if(matchMedia('(pointer:fine)').matches)document.body.classList.add('fx');
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px)`;
 ring.classList.toggle('big',!!e.target.closest('a,button,input,select,.it,.stage'));
 const c=e.target.closest('.card');if(c){const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%');if(!('nt' in c.dataset)&&!c.classList.contains('tier')&&!RM){c.style.setProperty('--tx',(.5-y)*8+'deg');c.style.setProperty('--ty',(x-.5)*8+'deg')}}});
addEventListener('pointerout',e=>{const c=e.target.closest&&e.target.closest('.card');if(c&&!c.contains(e.relatedTarget)){c.style.setProperty('--tx','0deg');c.style.setProperty('--ty','0deg')}});
addEventListener('pointerdown',e=>{const r=document.createElement('i');r.className='rip';r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';document.body.appendChild(r);setTimeout(()=>r.remove(),700)});
(function loop(){requestAnimationFrame(loop);if(document.hidden||!document.body.classList.contains('fx'))return;rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.transform=`translate3d(${rx}px,${ry}px,0)`})();
$$('[data-mag]').forEach(b=>{b.onpointermove=e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.22}px,${(e.clientY-r.top-r.height/2)*.3}px)`};b.onpointerleave=()=>b.style.transform=''});
/* ---------- 3D helpers ---------- */
const box=(w,h,d,bg,lab)=>{const b=document.createElement('div');b.className='box';b.style.cssText=`width:${w}px;height:${h}px;--bc:${bg}`;
 [[w,h,`translateZ(${d/2}px)`],[w,h,`rotateY(180deg) translateZ(${d/2}px)`],[d,h,`rotateY(-90deg) translateZ(${w/2}px)`],[d,h,`rotateY(90deg) translateZ(${w/2}px)`],[w,d,`rotateX(90deg) translateZ(${h/2}px)`],[w,d,`rotateX(-90deg) translateZ(${h/2}px)`]].forEach(([fw,fh,t],i)=>{const f=document.createElement('div');f.style.cssText=`width:${fw}px;height:${fh}px;margin:${-fh/2}px 0 0 ${-fw/2}px;transform:${t}`;if(lab&&i<2)f.innerHTML=lab;b.appendChild(f)});return b};
function spin(stage,rig,s){let d=0,lx,ly,tm;
 s.go=(x,y)=>{s.auto=0;s.ry=((s.ry%360)+540)%360-180;s.t=[x,y]};
 stage.onpointerdown=e=>{d=1;s.t=null;s.auto=0;clearTimeout(tm);lx=e.clientX;ly=e.clientY;stage.setPointerCapture(e.pointerId)};
 stage.onpointermove=e=>{if(!d)return;s.ry+=(e.clientX-lx)*.45;s.rx=Math.max(-80,Math.min(80,s.rx-(e.clientY-ly)*.45));lx=e.clientX;ly=e.clientY};
 stage.onpointerup=stage.onpointercancel=()=>{d=0;tm=setTimeout(()=>s.auto=s.a0,2800)};
 stage.onwheel=e=>{e.preventDefault();s.z=Math.max(.5,Math.min(1.7,s.z-e.deltaY*.001))};
 (function f(){if(!stage.offsetParent||document.hidden){requestAnimationFrame(f);return}if(s.t){s.rx+=(s.t[0]-s.rx)*.1;s.ry+=(s.t[1]-s.ry)*.1;if(Math.abs(s.t[0]-s.rx)+Math.abs(s.t[1]-s.ry)<.4)s.t=null}else if(s.auto&&!d)s.ry+=.4;
  rig.style.transform=`scale(${s.z}) rotateX(${s.rx}deg) rotateY(${s.ry}deg)`;rig.style.setProperty('--ry',s.ry.toFixed(1));rig.style.setProperty('--rx',s.rx.toFixed(1));requestAnimationFrame(f)})()}
const FIN={Apple:['#3a3330','#d9c3a5'],Samsung:['#121a2b','#a9bde8'],Vivo:['#3a1d5e','#6a74ff'],OPPO:['#0f2d2a','#00a86b'],Xiaomi:['#2a1a18','#ff9a00'],iQOO:['#16161f','#1f6bff']};
const CAMS={tri:{w:104,h:108,r:30,x:18,y:20,L:[[10,8,40],[54,8,40],[10,58,40]],U:[[10,8,40],[54,8,40],[10,58,40],[54,58,40]],F:[70,70]},duo:{w:60,h:104,r:30,x:18,y:20,L:[[10,8,40],[10,54,40]]},bar:{w:196,h:62,r:30,x:18,y:18,L:[[14,11,40]],F:[160,24]},col:{nb:1,w:40,h:180,r:0,x:16,y:20,L:[[2,0,36],[2,46,36],[2,92,36]],U:[[2,0,36],[2,46,36],[2,92,36],[2,138,36]],F:[44,4]},cir:{w:116,h:116,r:58,x:16,y:18,L:[[11,11,38],[61,11,38],[36,62,38]],U:[[11,11,38],[61,11,38],[11,61,38],[61,61,38]]},sq:{w:110,h:110,r:28,x:16,y:18,L:[[10,10,40],[58,10,40],[10,58,40]],F:[64,66]},big:{w:134,h:134,r:32,x:16,y:18,L:[[12,12,64],[84,14,38],[84,60,38]],F:[30,94]},rect:{w:122,h:90,r:20,x:16,y:18,L:[[8,10,32],[44,10,32],[80,10,32]],F:[20,56]},fold:{w:96,h:110,r:24,x:18,y:20,L:[[8,8,38],[50,8,38],[8,56,38]],F:[58,70]},flip:{w:130,h:84,r:22,x:18,y:18,L:[[12,18,40],[66,18,40]],F:[112,10]}};
function prof(p){const n=p.name,b=p.brand,u=/Ultra|Pro Max/.test(n),d={W:u?242:230,H:u?500:474,D:24,R:36,cam:'tri',fold:0,flip:0,fin:FIN[b]||FIN.Apple};
 if(b==='Apple'){d.R=44;if(/Air/.test(n)){d.cam='bar';d.D=13;d.H=486}else if(!/Pro/.test(n)){d.cam='duo';d.W=226;d.H=468}}
 else if(b==='Samsung'){d.R=/Ultra/.test(n)?22:34;if(/Fold/.test(n)){Object.assign(d,{fold:1,W:330,H:440,D:16,cam:'fold'})}else if(/Flip/.test(n)){Object.assign(d,{flip:1,H:410,cam:'flip'})}else d.cam='col'}
 else d.cam={Vivo:'cir',OPPO:'sq',Xiaomi:'big',iQOO:'rect'}[b]||'tri';return d}
const lens=p=>{const c=CAMS[prof(p).cam];return p.pc>=200&&c.U?c.U:c.L};
const FF=p=>{const d=prof(p);return d.fold?'Foldable, shown closed with its real back panel.':d.flip?'Clamshell flip, shown closed with its cover screen.':d.D<15?'Ultra-thin body with a camera bar.':`${TN[tn(p)]} slab with ${lens(p).length} rear lenses.`};
const COMP=[['Display','fa-mobile-screen'],['Camera module','fa-camera'],['Mainboard · SoC + RAM','fa-microchip'],['Battery cell','fa-car-battery'],['Back glass','fa-gem']];
function phone(root,z,a){
 root.innerHTML=`<div class="stage"><div class="rig ph"><div class="fr"><div class="scr"><i class="nt"></i><div class="row"><span>5G SA</span><b data-k="price"></b></div><div><div class="ic"><i data-k="ic"></i><em data-k="tb"></em></div><h4 data-k="name"></h4><small data-k="tier"></small></div><div class="sg"><p><i class="fa-solid fa-memory"></i>RAM<b data-k="ram"></b></p><p><i class="fa-solid fa-bolt"></i>Battery<b data-k="bat"></b></p><p><i class="fa-solid fa-camera"></i>Rear<b data-k="pc"></b></p><p><i class="fa-solid fa-user"></i>Front<b data-k="fc"></b></p></div><div class="sc2"><span>ML score</span><b data-k="score"></b></div></div><i class="crs"></i><i class="hng"></i></div>
 <div class="ly" style="--z:95px"><i class="fa-solid fa-camera"></i><span data-k="l0"></span></div><div class="ly" style="--z:35px"><i class="fa-solid fa-microchip"></i><span data-k="l1"></span></div><div class="ly" style="--z:-25px"><i class="fa-solid fa-car-battery"></i><span data-k="l2"></span></div>
 <div class="bk"><div class="isl" data-k="isl"></div><i class="stp"></i><i class="hng"></i><strong data-k="logo"></strong></div><div class="s sl"></div><div class="s sr"></div><div class="s st"></div><div class="s sb"></div></div></div>`;
 const rig=$('.rig',root),s={rx:-6,ry:-28,z,auto:a&&!RM,a0:a&&!RM},k=n=>$(`[data-k=${n}]`,root),parts=$$('.fr,.ly,.bk',rig);spin($('.stage',root),rig,s);
 return{s,rig,set(p){const t=tn(p),d=prof(p),c=CAMS[d.cam],L=lens(p);
  if(this.n)$('.stage',root).animate([{opacity:0,transform:'scale(.9)'},{opacity:1,transform:'none'}],{duration:500,easing:'ease-out'});this.n=1;
  ['W','H','D','R'].forEach(x=>rig.style.setProperty('--'+x,d[x]+'px'));rig.dataset.b=p.brand;rig.dataset.t=d.fold?'fold':d.flip?'flip':'';this.fin(d.fin[0],d.fin[1]);
  const i=k('isl');i.className='isl'+(c.nb?' nb':'');i.style.cssText=`left:${c.x}px;top:${c.y}px;width:${c.w}px;height:${c.h}px;border-radius:${c.r}px`;
  i.innerHTML=L.map(l=>`<u style="left:${l[0]}px;top:${l[1]}px;width:${l[2]}px;height:${l[2]}px"></u>`).join('')+((L===c.U||!c.F)?'':`<s style="left:${c.F[0]}px;top:${c.F[1]}px"></s>`);
  k('logo').innerHTML=p.brand==='Apple'?'<i class="fa-brands fa-apple"></i>':p.brand;
  k('l0').innerHTML=`<b>${p.pc} MP main</b><br>${p.fc} MP front<br>${L.length} rear lenses${p.pc>=100?' + periscope':''}`;
  k('l1').innerHTML=`<b>${p.ramGb} GB RAM</b><br>Neural SoC<span class="mc">${'<b></b>'.repeat(Math.max(1,p.ramGb/4))}</span>`;
  k('l2').innerHTML=`<b>${p.battery.toLocaleString()} mAh</b><br>Si-C cell<span class="bt"><b style="width:${Math.round((p.battery-2000)/50)}%"></b></span>`;
  k('name').textContent=p.name;k('price').textContent=inr(p.price);k('tier').textContent=p.tier;k('tier').style.color=TC[t];k('ic').className=bi(p.brand);k('tb').textContent='T-'+t;k('ram').textContent=p.ramGb+' GB';k('bat').textContent=p.battery.toLocaleString()+' mAh';k('pc').textContent=p.pc+' MP';k('fc').textContent=p.fc+' MP';k('score').textContent=p.score.toFixed(1)+' pts'},
  ex(on){rig.classList.toggle('ex',on);if(!on)this.hl(-1)},hl(i){parts.forEach((e,j)=>e.classList.toggle('hl',j===i));rig.classList.toggle('dim',i>=0)},
  fin(b,e){rig.style.setProperty('--body',b);rig.style.setProperty('--edge',e)}}}
/* ---------- brand title intros (one per tab) ---------- */
const TI_B={overview:['apple','Apple','fa-brands fa-apple','Think different'],tiers:['samsung','Samsung Galaxy','','Do what you can’t'],models:['xiaomi','Xiaomi','','Innovation for everyone'],features:['oppo','OPPO','','Inspiration ahead'],lab:['vivo','vivo','','Capture the moment'],predict:['oneplus','OnePlus','','Never settle'],phones:['pixel','Google Pixel','fa-brands fa-google','Helpfully yours'],code:['nothing','Nothing','','Designed to be different'],slides:['realme','realme','','Dare to leap']};
let tiT=0,tiForce=null;
function tiEnd(now){clearTimeout(tiT);document.body.classList.remove('tiw');const e=$('#ti');if(!e)return;if(now){e.remove();return}e.classList.add('out');setTimeout(()=>e.classList.contains('out')&&e.remove(),240)}
const tl=(t,fn)=>{let n=0;return t.split(' ').filter(Boolean).map(w=>`<span class="ti-w">${[...w].map(c=>`<span style="--i:${n++}${fn?fn(n-1):''}">${c.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</span>`).join('')}</span>`).join(' ')};
function tiPlay(id,o={}){
 if(!o.b&&tiForce)o.b=tiForce;tiForce=null;
 const c=o.b?Object.values(TI_B).find(v=>v[0]===o.b):TI_B[id];if(!c)return;tiEnd(true);
 const hd=$(id==='overview'?'#overview h1':'#'+id+' .hd'),txt=(hd?hd.textContent:id).trim().replace(/\s+/g,' '),len=txt.replace(/ /g,'').length,[b,label,icon,tag]=c,COL=['#4285f4','#ea4335','#fbbc05','#34a853'];
 const k=`<div class="ti-k">${b==='nothing'?'<span class="nt-d"></span>':icon?`<i class="${icon}"></i>`:''}${label}</div>`,h=`<div class="ti-h">${tl(txt,b==='pixel'?n=>`;--c:${COL[n%4]}`:0)}</div>`,s=`<div class="ti-s">${tag}</div>`;
 const M={
  apple:`<div class="ti-in"><i class="${icon} lg"></i>${h}<i class="ln"></i>${s}</div>`,
  samsung:`<div class="ti-fx"><i class="sg-o"></i><i class="sg-o b"></i></div><div class="ti-in">${k}${h}${s}</div>`,
  xiaomi:`<div class="ti-fx"><i class="xm-q" style="left:8%;top:14%;width:70px;height:70px"></i><i class="xm-q" style="right:10%;top:20%;width:46px;height:46px;animation-delay:-1.5s"></i><i class="xm-q" style="left:16%;bottom:12%;width:38px;height:38px;animation-delay:-3s"></i><i class="xm-q" style="right:14%;bottom:10%;width:84px;height:84px;animation-delay:-2s"></i></div><div class="ti-in"><div class="xm-l">mi</div>${h}${s}</div>`,
  oppo:`<div class="ti-fx"><i class="pp-r"></i><i class="pp-r" style="animation-delay:.85s"></i><i class="pp-r" style="animation-delay:1.7s"></i></div><div class="ti-in">${k}${h}${s}</div>`,
  vivo:`<div class="ti-in"><div class="vv-lens"></div>${k}${h}${s}</div>`,
  oneplus:`<div class="ti-fx"><i class="ol-b a"></i><i class="ol-b b"></i><i class="ol-b c"></i></div><div class="ti-in">${k}${h}${s}</div>`,
  pixel:`<div class="ti-fx"><i class="gp-bl" style="left:-8%;top:-12%;background:#4285f4"></i><i class="gp-bl" style="right:-8%;top:-10%;background:#ea4335"></i><i class="gp-bl" style="left:-6%;bottom:-14%;background:#fbbc05"></i><i class="gp-bl" style="right:-6%;bottom:-12%;background:#34a853"></i></div><div class="ti-in"><div class="gp-row">${COL.map((x,i)=>`<i style="background:${x};--d:${i*.09}s"></i>`).join('')}</div>${k}${h}${s}</div>`,
  nothing:`<div class="ti-in">${k}${h}${s}</div>`,
  realme:`<div class="ti-fx" style="z-index:3"><i class="rm-c l"></i><i class="rm-c r"></i></div><div class="ti-in">${k}${h}${s}</div>`
 };
 const e=document.createElement('div');e.id='ti';e.className='ti-'+b;e.setAttribute('aria-hidden','true');
 e.style.setProperty('--s',Math.min(45,Math.round(800/len))+'ms');e.style.setProperty('--hh',(o.full?0:HDR.offsetHeight)+'px');if(o.full)e.style.zIndex=50;e.innerHTML=M[b];
 e.onclick=()=>tiEnd();(o.full?$('#ss'):document.body).appendChild(e);document.body.classList.add('tiw');
 const TIX=2.3;void e.offsetHeight;try{e.getAnimations({subtree:true}).forEach(a=>{a.playbackRate=TIX})}catch(_){}
 tiT=setTimeout(()=>tiEnd(),RM?600:Math.round(2500/TIX)+120);
}
addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#ti'))tiEnd()});
function presentPPT(){openSS();tiPlay('slides',{b:'nothing',full:1})}
/* ---------- tabs ---------- */
const nav=$('#nav'),pill=$('#pill');let cur='overview';
TABS.forEach(([id,l,ic])=>{const b=document.createElement('button');b.dataset.t=id;b.innerHTML=`<i class="fa-solid ${ic}"></i>${l}`;b.onclick=()=>show(id);nav.appendChild(b)});
const place=()=>{const b=$(`nav button[data-t=${cur}]`);pill.style.left=b.offsetLeft+'px';pill.style.width=b.offsetWidth+'px'};
function count(e){const to=+e.dataset.n,d=+(e.dataset.d||0),t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/600),v=to*(1-Math.pow(1-k,3));e.textContent=(e.dataset.p||'')+v.toLocaleString('en-IN',{minimumFractionDigits:d,maximumFractionDigits:d})+(e.dataset.s||'');if(k<1)requestAnimationFrame(f)})(t0)}
document.documentElement.classList.add('js');
let SH=0;
const IO=new IntersectionObserver(es=>{let k=0;es.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top||a.boundingClientRect.left-b.boundingClientRect.left).forEach(en=>{const e=en.target;IO.unobserve(e);e.style.transitionDelay=(k++*40)+'ms';e.classList.add('vis');fire(e);setTimeout(()=>{e.style.transitionDelay='';e.classList.add('done')},800)})},{threshold:.1,rootMargin:'0px 0px -5% 0px'});
function fire(e){$$('[data-n]',e).concat(e.matches('[data-n]')?[e]:[]).forEach(count);$$('.fill',e).forEach(f=>{f.style.width='0';setTimeout(()=>f.style.width=f.dataset.w+'%',120)});$$('.rg',e).forEach(r=>{r.style.strokeDashoffset=276.5;setTimeout(()=>r.style.strokeDashoffset=276.5*(1-r.dataset.v/100),120)})}
function reveal(t){$$('.rv',t).forEach(e=>{e.style.transitionDelay='';IO.observe(e)})}
const HDR=$('header');addEventListener('scroll',()=>HDR.classList.toggle('sc',scrollY>8),{passive:true});
const BG=$('#burger'),menu=o=>{document.body.classList.toggle('menu',o);BG.setAttribute('aria-expanded',o)};
BG.onclick=()=>menu(!document.body.classList.contains('menu'));
document.addEventListener('click',e=>{if(document.body.classList.contains('menu')&&!e.target.closest('nav,.burger'))menu(false)});
addEventListener('resize',()=>{if(innerWidth>1100)menu(false)});
function show(id){if(!TABS.some(t=>t[0]===id))id='overview';menu(false);if(SH&&id===cur){scrollTo({top:0,behavior:'smooth'});return}
  $$('.tab.on .rv').forEach(e=>{IO.unobserve(e);e.classList.remove('vis','done');e.style.transitionDelay=''});scrollTo({top:0,behavior:'instant'});
  const first=!SH;cur=id;const t=$('#'+id);SH=1;
 $$('.tab').forEach(e=>e.classList.toggle('on',e===t));$$('nav button').forEach(b=>b.classList.toggle('on',b.dataset.t===id));place();
 nav.scrollTo({left:$(`nav button[data-t=${id}]`).offsetLeft-60,behavior:'smooth'});history.replaceState(0,0,'#'+id);
 reveal(t);if(!first)tiPlay(id);
  if(id==='slides')paint();if(id==='predict')predict()}
document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g)show(g.dataset.go)});addEventListener('resize',place);
/* ---------- tiers ---------- */
/* ---------- constellation shell (Price Tiers) : WebGL, one shared render loop ---------- */
const SHELL=(()=>{
 const R=2.5,N=230,LINK=1.0954*Math.sqrt(200/N)*1.05,FOCAL='1.303',DIST=4.9,TAU=Math.PI*2,SZ=160,BASE=.6,FADE=.72,HALF_PX=.45;
 const VS=`precision highp float;attribute vec3 a_p0;attribute vec3 a_p1;attribute vec2 a_corner;uniform mat3 uRot;uniform float uDist,uWidth;varying float v_depth;
void main(){vec3 r0=uRot*a_p0;vec3 r1=uRot*a_p1;float w0=max(uDist-r0.z,.05);float w1=max(uDist-r1.z,.05);
vec4 c0=vec4(${FOCAL}*r0.x,${FOCAL}*r0.y,0.,w0);vec4 c1=vec4(${FOCAL}*r1.x,${FOCAL}*r1.y,0.,w1);
vec2 d=normalize(c1.xy/c1.w-c0.xy/c0.w+vec2(1e-6));vec2 perp=vec2(-d.y,d.x);
vec4 sel=mix(c0,c1,a_corner.x);sel.xy+=perp*a_corner.y*uWidth*sel.w;sel.z=-mix(r0.z,r1.z,a_corner.x)*.36*sel.w;
v_depth=mix(r0.z,r1.z,a_corner.x)/${R.toFixed(2)};gl_Position=sel;}`;
 const FS=`precision mediump float;uniform vec3 uBase,uAccent;uniform float uFade;varying float v_depth;
void main(){float t=clamp(v_depth*.5+.5,0.,1.);vec3 c=mix(uBase,uAccent,t);float a=mix(1.-uFade,1.,t);gl_FragColor=vec4(c*a,a);}`;
 const VSS=`precision highp float;attribute vec3 a_pos;attribute vec3 a_n;attribute vec2 a_i;uniform mat3 uRot;uniform float uDist;uniform vec3 uAcc,uDeep;varying vec3 v_c;
void main(){vec3 r=uRot*a_pos;float w=max(uDist-r.z,.05);gl_Position=vec4(${FOCAL}*r.x,${FOCAL}*r.y,-r.z*.36*w,w);
vec3 n=normalize(uRot*a_n);float l=.42+.58*max(dot(n,normalize(vec3(.35,.5,.8))),0.);float k=a_i.x;vec3 c;
if(k<.5)c=vec3(.05,.05,.08);else if(k<1.5)c=uAcc;else if(k<2.5)c=uDeep*.9;else if(k<3.5)c=mix(uDeep*.55,uAcc*1.2,a_i.y);else if(k<4.5)c=vec3(.02,.03,.07);else c=vec3(.55,.75,1.);
v_c=c*l;}`;
 const FSS=`precision mediump float;varying vec3 v_c;void main(){gl_FragColor=vec4(v_c,1.);}`;
 const CORNERS=[[0,-1],[1,-1],[1,1],[0,-1],[1,1],[0,1]];
 const rng=s=>{let a=s>>>0;return()=>{a+=0x6d2b79f5;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}};
 const hex=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255);
 /* tier 0 = normal, then faster and faster. base = far side, accent = near side */
 const TIERS=[{base:'#0b2a8a',accent:'#1f6bff',db:'#2b52d6',da:'#7fb0ff',speed:1},{base:'#00553a',accent:'#00a86b',db:'#0d8f5f',da:'#5dffbd',speed:2.2},{base:'#45188f',accent:'#8a3ffc',db:'#6a35d6',da:'#d3a3ff',speed:4},{base:'#a14a00',accent:'#ff9a00',db:'#c97a00',da:'#ffd36b',speed:7}];
 let geo=null,dark=document.documentElement.dataset.theme==='dark';
 function paint(s){const g=s.gl,T=s.T,A=hex(dark?T.da:T.accent),B=hex(dark?T.db:T.base);g.useProgram(s.pg);g.uniform3fv(s.u.b,B);g.uniform3fv(s.u.a,A);g.useProgram(s.sp);g.uniform3fv(s.u.acc,A);g.uniform3fv(s.u.deep,B)}
 function expand(S){const E=S.length,p0=new Float32Array(E*18),p1=new Float32Array(E*18),cr=new Float32Array(E*12);
  for(let e=0;e<E;e++){const a=S[e][0],b=S[e][1];for(let c=0;c<6;c++){const k=e*6+c;p0.set(a,k*3);p1.set(b,k*3);cr[k*2]=CORNERS[c][0];cr[k*2+1]=CORNERS[c][1]}}
  return{p0,p1,cr,verts:E*6}}
 function phone(){const W=.58,H=1.15,D=.1,P=Math.PI/2,pos=[],nrm=[],inf=[];
  const V=(p,n,r,t)=>{pos.push(p[0],p[1],p[2]);nrm.push(n[0],n[1],n[2]);inf.push(r,t||0)};
  const rr=(hw,hh,r,z)=>{const o=[];[[hw-r,hh-r],[r-hw,hh-r],[r-hw,r-hh],[hw-r,r-hh]].forEach(([cx,cy],q)=>{for(let k=0;k<=5;k++){const a=(q+k/5)*P,c=Math.cos(a),s=Math.sin(a);o.push({p:[cx+r*c,cy+r*s,z],n:[c,s,0]})}});return o};
  const circ=(x,y,r,z)=>{const o=[];for(let k=0;k<16;k++){const a=k/16*TAU;o.push({p:[x+r*Math.cos(a),y+r*Math.sin(a),z]})}return o};
  const fan=(pts,cen,nz,role,tf)=>{for(let i=0;i<pts.length;i++){const a=pts[i].p,b=pts[(i+1)%pts.length].p;V(cen,[0,0,nz],role,tf&&tf(cen));V(a,[0,0,nz],role,tf&&tf(a));V(b,[0,0,nz],role,tf&&tf(b))}};
  const f=rr(W,H,.19,D),b=rr(W,H,.19,-D);
  for(let i=0;i<f.length;i++){const j=(i+1)%f.length;V(f[i].p,f[i].n,2);V(b[i].p,f[i].n,2);V(b[j].p,f[j].n,2);V(f[i].p,f[i].n,2);V(b[j].p,f[j].n,2);V(f[j].p,f[j].n,2)}
  fan(f,[0,0,D],1,0);fan(b,[0,0,-D],-1,1);
  const sh=H-.065;fan(rr(W-.055,sh,.14,D+.006),[0,0,D+.006],1,3,p=>Math.max(0,Math.min(1,(p[1]/sh+1)/2)));
  fan(circ(0,H-.17,.04,D+.012),[0,H-.17,D+.012],1,0);
  [[-.22,.88],[-.22,.6],[.02,.74]].forEach(([x,y])=>{fan(circ(x,y,.085,-D-.006),[x,y,-D-.006],-1,0);fan(circ(x,y,.05,-D-.012),[x,y,-D-.012],-1,4);fan(circ(x-.015,y+.015,.018,-D-.018),[x-.015,y+.015,-D-.018],-1,5)});
  return{pos:new Float32Array(pos),nrm:new Float32Array(nrm),inf:new Float32Array(inf),verts:pos.length/3}}
 function build(){const r=rng(1337),px=new Float32Array(N*3);
  for(let i=0;i<N;i++){const th=r()*TAU,ph=Math.acos(r()*2-1),s=Math.sin(ph);px[i*3]=R*s*Math.cos(th);px[i*3+1]=R*s*Math.sin(th);px[i*3+2]=R*Math.cos(ph)}
  const l2=LINK*LINK,ea=[],eb=[];
  for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){const dx=px[i*3]-px[j*3],dy=px[i*3+1]-px[j*3+1],dz=px[i*3+2]-px[j*3+2];if(dx*dx+dy*dy+dz*dz<l2){ea.push(i);eb.push(j)}}
  const E=ea.length,p0=new Float32Array(E*18),p1=new Float32Array(E*18),cr=new Float32Array(E*12);
  for(let e=0;e<E;e++){const i=ea[e],j=eb[e];for(let c=0;c<6;c++){const k=e*6+c;
   p0[k*3]=px[i*3];p0[k*3+1]=px[i*3+1];p0[k*3+2]=px[i*3+2];p1[k*3]=px[j*3];p1[k*3+1]=px[j*3+1];p1[k*3+2]=px[j*3+2];cr[k*2]=CORNERS[c][0];cr[k*2+1]=CORNERS[c][1]}}
  return{p0,p1,cr,verts:E*6,ph:phone()}}
 const items=[],map=new Map(),rot=new Float32Array(9);let raf=0,last=0;
 function sh(gl,t,src){const s=gl.createShader(t);gl.shaderSource(s,src);gl.compileShader(s);return gl.getShaderParameter(s,gl.COMPILE_STATUS)?s:null}
 function prog(gl,v,f,names){const vs=sh(gl,gl.VERTEX_SHADER,v),fs=sh(gl,gl.FRAGMENT_SHADER,f);if(!vs||!fs)return null;const p=gl.createProgram();gl.attachShader(p,vs);gl.attachShader(p,fs);names.forEach((n,i)=>gl.bindAttribLocation(p,i,n));gl.linkProgram(p);return gl.getProgramParameter(p,gl.LINK_STATUS)?p:null}
 function setup(s){const gl=s.gl,pg=prog(gl,VS,FS,['a_p0','a_p1','a_corner']),sp=prog(gl,VSS,FSS,['a_pos','a_n','a_i']);if(!pg||!sp)return false;geo=geo||build();
  [0,1,2].forEach(i=>gl.enableVertexAttribArray(i));
  const mk=d=>d.map(x=>{const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,x,gl.STATIC_DRAW);return b});
  s.pg=pg;s.sp=sp;s.bufs=[mk([geo.p0,geo.p1,geo.cr]),mk([geo.ph.pos,geo.ph.nrm,geo.ph.inf])];
  const L=(p,n)=>gl.getUniformLocation(p,n);
  s.u={fade:L(pg,'uFade'),rot:L(pg,'uRot'),w:L(pg,'uWidth'),d:L(pg,'uDist'),b:L(pg,'uBase'),a:L(pg,'uAccent'),rot2:L(sp,'uRot'),d2:L(sp,'uDist'),acc:L(sp,'uAcc'),deep:L(sp,'uDeep')};
  gl.useProgram(pg);gl.uniform1f(s.u.d,DIST);gl.uniform1f(s.u.fade,FADE);gl.useProgram(sp);gl.uniform1f(s.u.d2,DIST);
  gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);gl.clearColor(0,0,0,0);gl.depthFunc(gl.LEQUAL);s.dpr=0;paint(s);return true}
 function attach(canvas,tier){
  const gl=canvas.getContext('webgl',{alpha:true,antialias:true,depth:true,premultipliedAlpha:true});if(!gl)return false;
  const T=TIERS[tier]||TIERS[0],s={gl,canvas,T,w:0,speed:T.speed,ay:tier*1.3,dpr:0,vis:false,lost:false};
  if(!setup(s))return false;
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();s.lost=true});
  canvas.addEventListener('webglcontextrestored',()=>{s.lost=!setup(s);kick()});
  items.push(s);map.set(canvas,s);io.observe(canvas);return true}
 function size(s){const d=Math.min(window.devicePixelRatio||1,2);if(d===s.dpr)return;s.dpr=d;const px=Math.round(SZ*d);s.canvas.width=s.canvas.height=px;
  s.gl.viewport(0,0,px,px);s.w=HALF_PX*d/(px/2)}
 function bind(s,i,sz){const gl=s.gl;sz.forEach((z,k)=>{gl.bindBuffer(gl.ARRAY_BUFFER,s.bufs[i][k]);gl.vertexAttribPointer(k,z,gl.FLOAT,false,0,0)})}
 function draw(s,dt){if(s.lost)return;size(s);s.ay=(s.ay+dt*BASE*s.speed)%TAU;const ax=s.ay*.5,cy=Math.cos(s.ay),sy=Math.sin(s.ay),cx=Math.cos(ax),sx=Math.sin(ax);
  rot[0]=cy;rot[1]=0;rot[2]=-sy;rot[3]=sy*sx;rot[4]=cx;rot[5]=cy*sx;rot[6]=sy*cx;rot[7]=-sx;rot[8]=cy*cx;
  const gl=s.gl,u=s.u;gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  /* solid phone first (writes depth), then the translucent globe lines tested against it */
  gl.useProgram(s.sp);gl.uniformMatrix3fv(u.rot2,false,rot);gl.enable(gl.DEPTH_TEST);gl.depthMask(true);bind(s,1,[3,3,2]);gl.drawArrays(gl.TRIANGLES,0,geo.ph.verts);
  gl.useProgram(s.pg);gl.uniformMatrix3fv(u.rot,false,rot);gl.uniform1f(u.w,s.w);gl.depthMask(false);bind(s,0,[3,3,2]);gl.drawArrays(gl.TRIANGLES,0,geo.verts)}
 function frame(now){raf=0;if(document.hidden)return;const dt=last?Math.min(.05,(now-last)/1e3):0;last=now;let any=false;
  for(let i=0;i<items.length;i++){const s=items[i];if(s.vis){any=true;try{draw(s,dt)}catch(e){}}}
  if(any)raf=requestAnimationFrame(frame);else last=0}
 function kick(){if(!raf&&!document.hidden){last=0;raf=requestAnimationFrame(frame)}}
 const io=new IntersectionObserver(es=>{es.forEach(e=>{const s=map.get(e.target);if(s)s.vis=e.isIntersecting});kick()},{rootMargin:'120px'});
 document.addEventListener('visibilitychange',kick);['pointermove','scroll','click','focus'].forEach(e=>addEventListener(e,kick,{passive:true,capture:true}));
 return{attach,SZ,setTheme(d){dark=d;items.forEach(paint);kick()}}})();
const TI=[['Low cost / essential entry','₹10K – ₹25K','< 7,010 pts','iQOO Z11 (₹21,999)','fa-wallet','Reliable daily drivers: 4–8 GB RAM, 16 MP cameras, up to 5,000 mAh.'],['Value performance & gaming','₹25K – ₹50K','7,010 – 9,285 pts','OPPO K13 (₹24,999)','fa-shield-halved','High refresh screens, fast charging, 50 MP cameras and 8–12 GB memory.'],['Pro grade & flagship killers','₹50K – ₹1.10L','9,285 – 11,567 pts','iPhone 18 Pro (₹1.64L)','fa-gem','Flagship silicon, 12 GB RAM, OIS camera arrays, premium alloy builds.'],['Pinnacle innovation & foldables','₹1.10L – ₹1.80L+','> 11,567 pts','Z Fold 8 (₹1.79L)','fa-crown','Folding displays, 16 GB+ RAM, 200 MP periscope zoom, 6,000+ mAh Si-C.']];
TI.forEach((t,i)=>{const c=document.createElement('div');c.className='card tier rv';c.dataset.neon=TC[i];c.innerHTML=`<div class="cs"><canvas class="cshell" aria-hidden="true"></canvas></div><small style="color:${TC[i]}">TIER ${i}</small><h3>${TN[i]}</h3><small class="mut">${t[0]}</small><div class="pr" style="color:${TC[i]}">${t[1]}</div><p>${t[5]}</p><dl><div>Score range <dd>${t[2]}</dd></div><div>Example <dd style="color:${TC[i]}">${t[3]}</dd></div></dl>`;$('#tierGrid').appendChild(c);if(!SHELL.attach($('.cshell',c),i)){const cs=$('.cs',c);cs.innerHTML='<div class="cu" style="animation-duration:'+[10,5,3,1.8][i]+'s"></div>';$('.cu',cs).appendChild(box(64,64,64,TC[i]+'cc',`<i class="fa-solid ${t[4]}"></i>`))}});
/* ---------- animated project title ---------- */
(()=>{const split=(el,fn)=>{if(!el)return;const node=[...el.childNodes].find(n=>n.nodeType===3);if(!node)return;const words=node.textContent.trim().split(/\s+/),f=document.createDocumentFragment();let k=0;
  words.forEach((w,wi)=>{const ws=document.createElement('span');ws.className='wd';ws.setAttribute('aria-hidden','true');[...w].forEach((c,ci)=>{const l=document.createElement('span');l.className=fn(wi,ci);l.textContent=c;l.style.setProperty('--k',k++);ws.appendChild(l)});f.appendChild(ws);if(wi<words.length-1)f.appendChild(document.createTextNode(' '))});
  el.replaceChild(f,node);el.setAttribute('aria-label',words.join(' '))};
 split($('#heroT'),(wi,ci)=>ci?'lt1':'lt1 fk fk'+wi);split($('#brandT'),()=>'bl')})();
/* ---------- dark / light theme (Matrix Junction WebGL transition) ---------- */
const JX=(()=>{
 /* Light Cables (Originkit) as the theme-switch transition.
    To dark: red light on black. To light: blue light on white (printed as ink, since light cannot brighten white). */
 const VS='attribute vec2 a_pos;void main(){gl_Position=vec4(a_pos,0.0,1.0);}';
 const FS=`
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;uniform float uTime;uniform vec2 uMouse;uniform float uHover;
uniform vec3 uBg,uBase,uAccent,uHigh;
uniform float uCount,uBend,uSpread,uWStart,uWEnd,uAxis,uDir,uPosX,uPosY,uThick,uFlow,uPulses,uGrab,uGrain,uDualSides,uInv;
float sat(float x){return clamp(x,0.0,1.0);}
float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float vnoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
 float a=h21(i),b=h21(i+vec2(1.0,0.0)),c=h21(i+vec2(0.0,1.0)),d=h21(i+vec2(1.0,1.0));return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
float fbm3(vec2 p){float s=0.0,a=0.5;for(int i=0;i<3;i++){s+=a*vnoise(p);p=p*2.07+vec2(4.1,2.3);a*=0.5;}return s;}
void main(){
 float ar=uRes.x/max(uRes.y,1.0);vec2 uv=gl_FragCoord.xy/uRes;vec2 p=(uv-0.5)*vec2(ar,1.0);float t=uTime;
 vec2 pAdj=p-vec2(uPosX*ar,uPosY)*0.5;
 vec3 col=uBg;
 vec2 sm=p-vec2(-0.05,-0.28);
 col+=uBase*exp(-pow(length(sm*vec2(0.75,1.9))/0.42,1.7))*0.50*(0.6+0.6*fbm3(p*2.4+vec2(t*0.05,0.0)));
 float extent=mix(ar,1.0,uAxis);
 float along=mix(pAdj.x,pAdj.y,uAxis)*uDir;
 float across=mix(pAdj.y,pAdj.x,uAxis);
 vec2 ptrRaw=(uMouse-0.5)*vec2(ar,1.0);
 float ptrAlong=mix(ptrRaw.x,ptrRaw.y,uAxis)*uDir;
 float ptrAcross=mix(ptrRaw.y,ptrRaw.x,uAxis);
 vec3 acc=vec3(0.0);float surge=0.0;
 int maxCount=int(uCount);
 for(int i=0;i<48;i++){
  if(i>=maxCount)break;
  float isRight=0.0;int idx=i;int activeCount=maxCount;
  if(uDualSides>0.5){
   if(i>=maxCount/2){isRight=1.0;idx=i-maxCount/2;activeCount=maxCount-maxCount/2;}
   else{activeCount=maxCount/2;}
  }
  float fi=float(idx)/max(float(activeCount-1),1.0);
  float o=fi-0.5;
  float rnd=h21(vec2(float(i)*7.31,2.0+isRight*10.0));
  float sideAlong=(isRight>0.5)?-along:along;
  float sideDir=(isRight>0.5)?-uDir:uDir;
  float sideS01=sat((sideAlong+extent*0.5)/max(extent,0.001));
  float kAlong=-0.18;
  float kAcross=(isRight>0.5)?-0.10:0.10;
  float kAlongi=kAlong+o*0.10+(rnd-0.5)*0.03;
  float bi=uBend*(0.88+0.24*rnd);
  float spread=uSpread*mix(uWStart,uWEnd,sideS01)*(0.090+0.34*sat((sideAlong-kAlong)*0.85+0.25));
  float bendAlong=sqrt((sideAlong-kAlongi)*(sideAlong-kAlongi)+0.0035);
  float yy=kAcross+o*spread-bi*bendAlong+0.008*sin(sideAlong*3.0+float(i)*19.0);
  float gx=exp(-pow((sideAlong-ptrAlong*sideDir)/max(uGrab*0.30,0.02),2.0));
  yy=mix(yy,(ptrAcross*((isRight>0.5)?-1.0:1.0))+o*spread*0.55,gx*0.60*uHover);
  float dd=(across-yy)/(uThick*0.0038);
  float core=1.0/(1.0+dd*dd*9.0);
  float sheath=1.0/(1.0+dd*dd*0.6);
  float ph=sideS01*uPulses-t*uFlow*0.55-rnd*0.22;
  float f=fract(ph);
  float pulse=exp(-pow((f-0.55)/0.15,2.0));
  float w=(0.22+1.60*pulse)*(0.55+0.45*rnd);
  acc+=(uHigh*core*1.45+uAccent*sheath*0.20)*w;
  surge+=core*gx;
 }
 col+=acc*0.20;
 col+=uHigh*surge*0.05*uHover;
 col+=(h21(gl_FragCoord.xy+fract(uTime)*71.0)-0.5)*uGrain;
 vec3 add=col-uBg;
 vec3 o2=uInv>0.5?uBg-add:col;
 gl_FragColor=vec4(clamp(o2,0.0,1.0),1.0);
}`;
 /* dark: red on black. light: blue on white; colours given as 1-colour because they are subtracted from white. */
 const PAL={
  dark:{bg:[0,0,0],base:[0,0,0],acc:[255,0,0],high:[255,0,0],inv:0},
  light:{bg:[255,255,255],base:[255,255,255],acc:[255-47,255-60,0],high:[255-20,255-64,0],inv:1}};
 let cv=null,gl=null,U={},fail=false,busy=false;
 function init(){
  if(gl)return true;if(fail)return false;
  try{
   cv=document.createElement('canvas');cv.id='jx';cv.setAttribute('aria-hidden','true');document.body.appendChild(cv);
   gl=cv.getContext('webgl',{alpha:false,antialias:false,depth:false});if(!gl)throw 0;
   const mk=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(o));return o};
   const pr=gl.createProgram();gl.attachShader(pr,mk(gl.VERTEX_SHADER,VS));gl.attachShader(pr,mk(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);
   if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr));
   gl.useProgram(pr);
   const bf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,bf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
   const ap=gl.getAttribLocation(pr,'a_pos');gl.enableVertexAttribArray(ap);gl.vertexAttribPointer(ap,2,gl.FLOAT,false,0,0);
   ['uRes','uTime','uMouse','uHover','uBg','uBase','uAccent','uHigh','uCount','uBend','uSpread','uWStart','uWEnd','uAxis','uDir','uPosX','uPosY','uThick','uFlow','uPulses','uGrab','uGrain','uDualSides','uInv'].forEach(n=>U[n]=gl.getUniformLocation(pr,n));
   return true;
  }catch(e){console.error('LightCables:',e);fail=true;if(cv)cv.remove();cv=gl=null;return false}
 }
 const cl=(v,a,b)=>v<a?a:v>b?b:v,ez=t=>1-Math.pow(1-t,3),ei=t=>t*t*t;
 /* fast: cables sweep in left to right (the way the light flows) · theme swaps under cover · sweep out */
 const D_IN=.26,D_HOLD=.16,D_OUT=.30;
 function play(x,y,toDark,mid){
  return new Promise(done=>{
   const P=toDark?PAL.dark:PAL.light,Wd=innerWidth,Ht=innerHeight,dpr=Math.min(devicePixelRatio||1,1.25,Math.sqrt(1.1e6/(Wd*Ht)));
   const bw=Math.max(1,Math.round(Wd*dpr)),bh=Math.max(1,Math.round(Ht*dpr));cv.width=bw;cv.height=bh;gl.viewport(0,0,bw,bh);
   gl.uniform2f(U.uRes,bw,bh);
   gl.uniform3f(U.uBg,P.bg[0]/255,P.bg[1]/255,P.bg[2]/255);gl.uniform3f(U.uBase,P.base[0]/255,P.base[1]/255,P.base[2]/255);
   gl.uniform3f(U.uAccent,P.acc[0]/255,P.acc[1]/255,P.acc[2]/255);gl.uniform3f(U.uHigh,P.high[0]/255,P.high[1]/255,P.high[2]/255);
   gl.uniform1f(U.uCount,15);gl.uniform1f(U.uBend,0);gl.uniform1f(U.uSpread,1.95);gl.uniform1f(U.uWStart,3);gl.uniform1f(U.uWEnd,0);
   gl.uniform1f(U.uAxis,0);gl.uniform1f(U.uDir,1);gl.uniform1f(U.uPosX,0);gl.uniform1f(U.uPosY,0);gl.uniform1f(U.uThick,1.58);
   gl.uniform1f(U.uFlow,3);gl.uniform1f(U.uPulses,1);gl.uniform1f(U.uGrab,1.5);gl.uniform1f(U.uGrain,.012);gl.uniform1f(U.uDualSides,1);gl.uniform1f(U.uInv,P.inv);
   cv.style.display='block';cv.style.opacity='1';cv.style.clipPath='inset(0 100% 0 0)';
   const T=D_IN+D_HOLD+D_OUT,t0=performance.now();let swapped=false;
   (function frame(now){
    const t=(now-t0)/1000;
    if(t>=T){cv.style.display='none';cv.style.clipPath='';done();return}
    if(t<D_IN){cv.style.clipPath=`inset(0 ${(100-ez(t/D_IN)*100).toFixed(2)}% 0 0)`}
    else if(t<D_IN+D_HOLD){cv.style.clipPath='inset(0)'}
    else{cv.style.clipPath=`inset(0 0 0 ${(ei(cl((t-D_IN-D_HOLD)/D_OUT,0,1))*100).toFixed(2)}%)`}
    if(!swapped&&t>=D_IN){swapped=true;mid()}
    /* scripted pointer drags across the stream so the cables lift and brighten as it passes */
    const s=cl(t/T,0,1);
    gl.uniform2f(U.uMouse,.1+.8*s,.5+.08*Math.sin(t*14));
    gl.uniform1f(U.uHover,.93);
    gl.uniform1f(U.uTime,t*2.4+3.1); /* faster light travel than the live background */
    gl.drawArrays(gl.TRIANGLES,0,3);
    requestAnimationFrame(frame);
   })(t0);
  });
 }
 return{init,play,busy:()=>busy,setBusy:v=>busy=v};
})();
const THEME=(()=>{const root=document.documentElement,sty=$('#lightCss'),btn=$('#themeBtn'),meta=document.querySelector('meta[name=theme-color]');
 const isDark=()=>root.dataset.theme==='dark';
 function apply(d,keep){root.dataset.theme=d?'dark':'light';sty.media=d?'not all':'all';if(meta)meta.setAttribute('content',d?'#08070d':'#f2eee3');btn.setAttribute('aria-pressed',d);SHELL.setTheme(d);if(!keep)try{localStorage.setItem('theme',d?'dark':'light')}catch(e){}}
 function toggle(){
  if(JX.busy())return;
  const d=!isDark(),r=btn.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
  if(RM||!JX.init()){ // fallback: plain circular reveal
   if(!document.startViewTransition||RM){apply(d);return}
   const t=document.startViewTransition(()=>apply(d));
   t.ready.then(()=>{const R=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));root.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${R}px at ${x}px ${y}px)`]},{duration:350,easing:'cubic-bezier(.25,.9,.3,1)',pseudoElement:'::view-transition-new(root)'})}).catch(()=>{});
   return}
  JX.setBusy(true);
  JX.play(x,y,d,()=>apply(d)).finally(()=>JX.setBusy(false));
 }
 btn.addEventListener('click',toggle);apply(isDark(),true);return{toggle,apply}})();

/* ---------- Pulsating Border (shared WebGL renderer: one canvas draws every card's border, 3 travelling colour spots + bloom) ---------- */
const PBR=(()=>{
 const O={thickness:5,softness:75,intensity:30,bloom:50,spotSize:60,spread:31,speed:1};
 const cv=document.createElement('canvas');cv.setAttribute('aria-hidden','true');cv.style.cssText='position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:2';
 const gl=cv.getContext('webgl',{premultipliedAlpha:true,alpha:true,antialias:false,powerPreference:'high-performance'});
 if(!gl)return{add(){},color(){}};
 const VS='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
 const FS=`precision highp float;uniform vec2 uO,uF,uRg;uniform float uR,uTh,uSo,uIn,uBl,uSp,uT,uG,uD,uA;uniform vec3 c0,c1,c2;
 float wd(float a,float b){return mod(a-b+3.14159265,6.2831853)-3.14159265;}
 void main(){vec2 p=gl_FragCoord.xy/uD-uO;vec2 b=uF*.5;vec2 q=abs(p)-b+uR;float d=length(max(q,0.))+min(max(q.x,q.y),0.)-uR;
  float ang=atan(p.y/b.y,p.x/b.x),w=.22+uSp*.5;
  float s0=exp(-pow(wd(ang,uT*.55)/w,2.)),s1=exp(-pow(wd(ang,uT*.71+2.094)/w,2.)),s2=exp(-pow(wd(ang,-uT*.44+4.188)/w,2.));
  float sw=s0+s1+s2;vec3 base=(c0+c1+c2)/3.;vec3 col=(c0*s0+c1*s1+c2*s2+base*.25)/(sw+.25);
  float smoke=1.+.35*sin(ang*3.+uT*.9)*sin(ang*2.-uT*.6);
  float cl=.45+.85*clamp(sw,0.,1.2);
  float rw=max(uTh*.5*(1.+uSo*1.1),.9);float ring=exp(-pow((d+uTh*.5)/rw,2.));
  float gl=d>0.?exp(-d/uG):exp(max(d,-uG)/(uG*.45))*.7;
  float a=ring*cl*clamp(.6+uIn*2.,0.,1.5)+gl*uBl*(.3+.9*sw)*smoke*.62;
  vec2 e=uRg*.5-abs(p);a*=smoothstep(0.,30.,min(e.x,e.y))*uA;a=clamp(a,0.,1.);
  gl_FragColor=vec4(col*1.12*a,a);}`;
 const sh=(t,src)=>{const x=gl.createShader(t);gl.shaderSource(x,src);gl.compileShader(x);return x};
 const pg=gl.createProgram();gl.attachShader(pg,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pg,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pg);
 if(!gl.getProgramParameter(pg,gl.LINK_STATUS))return{add(){},color(){}};
 gl.useProgram(pg);const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
 const al=gl.getAttribLocation(pg,'a');gl.enableVertexAttribArray(al);gl.vertexAttribPointer(al,2,gl.FLOAT,false,0,0);
 const U=n=>gl.getUniformLocation(pg,n),u={O:U('uO'),F:U('uF'),Rg:U('uRg'),R:U('uR'),Th:U('uTh'),So:U('uSo'),In:U('uIn'),Bl:U('uBl'),Sp:U('uSp'),T:U('uT'),G:U('uG'),D:U('uD'),A:U('uA'),c:[U('c0'),U('c1'),U('c2')]};
 document.body.appendChild(cv);
 gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
 const rgb=h=>{const n=parseInt(h.slice(1),16);return[(n>>16)/255,(n>>8&255)/255,(n&255)/255]};
 /* colour trio: the box colour plus two hue-shifted neighbours, so the glow shimmers but stays in the same colour family */
 function trio(hex){const[r,g,b]=rgb(hex),mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;let h=0,s=0;
  if(d){s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?((g-b)/d+(g<b?6:0)):mx===g?(b-r)/d+2:(r-g)/d+4;h*=60}
  const hs=(hh,L)=>{hh=(hh%360+360)%360;const a=s*Math.min(L,1-L),f=n=>{const k=(n+hh/30)%12;return L-a*Math.max(-1,Math.min(k-3,9-k,1))};return[f(0),f(8),f(4)]};
  return[rgb(hex),hs(h+32,Math.min(.62,l+.08)),hs(h-32,Math.min(.66,l+.12))]}
 const list=new Map();let dpr=1,vw=0,vh=0,t=0,last=performance.now();
 const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
 var lastRT=0;let ox=0,oy=0;const size=()=>{const c=cv.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,1.5);vw=c.width||innerWidth;vh=c.height||innerHeight;ox=c.left;oy=c.top;const W=Math.round(vw*dpr),H=Math.round(vh*dpr);if(cv.width!==W)cv.width=W;if(cv.height!==H)cv.height=H};size();addEventListener('resize',size,{passive:true});if(window.visualViewport)visualViewport.addEventListener('resize',size,{passive:true});
 function frame(now){requestAnimationFrame(frame);render(now)}
 function render(now){const c0=cv.getBoundingClientRect();if(Math.abs(c0.width-vw)>.5||Math.abs(c0.height-vh)>.5||c0.left!==ox||c0.top!==oy)size();const dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;lastRT=performance.now();if(document.hidden)return;
  if(!rm)t+=dt*O.speed;const ka=1-Math.exp(-dt*6),kc=1-Math.exp(-dt*5);
  gl.disable(gl.SCISSOR_TEST);gl.viewport(0,0,cv.width,cv.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.enable(gl.SCISSOR_TEST);
  gl.uniform1f(u.D,dpr);let n=0;
  for(const[el,s]of list){
   let want=0,r=null;
   if(el.isConnected&&el.offsetParent!==null){const q=el.getBoundingClientRect();r={left:q.left-ox,top:q.top-oy,right:q.right-ox,bottom:q.bottom-oy,width:q.width,height:q.height};
    if(r.width>=120&&r.height>=48&&r.bottom>0&&r.top<vh&&r.right>0&&r.left<vw&&(!el.classList.contains('rv')||el.classList.contains('vis')))want=1}
   s.a+=(want-s.a)*ka;if(s.a<.01||!r)continue;if(++n>28)break;
   for(let i=0;i<3;i++)for(let j=0;j<3;j++)s.cur[i][j]+=(s.tgt[i][j]-s.cur[i][j])*kc;
   if(!s.rad)s.rad=parseFloat(getComputedStyle(el).borderTopLeftRadius)||22;
   const w=r.width,h=r.height,k0=Math.max(.45,Math.min(1,Math.min(w,h)/380)),sp=O.spread*k0,bleed=sp+Math.min(240,.45*Math.min(w,h)*k0)+20;
   const sx=Math.max(0,Math.floor((r.left-bleed)*dpr)),ex=Math.min(cv.width,Math.ceil((r.right+bleed)*dpr)),ey=Math.min(cv.height,Math.ceil((vh-r.top+bleed)*dpr)),sy=Math.max(0,Math.floor((vh-r.bottom-bleed)*dpr));
   if(ex<=sx||ey<=sy)continue;gl.scissor(sx,sy,ex-sx,ey-sy);
   gl.uniform2f(u.O,r.left+w/2,vh-(r.top+h/2));gl.uniform2f(u.F,w,h);gl.uniform2f(u.Rg,w+2*bleed,h+2*bleed);gl.uniform1f(u.R,s.rad);
   gl.uniform1f(u.Th,Math.max(2,O.thickness*.6));gl.uniform1f(u.So,O.softness/100);gl.uniform1f(u.In,O.intensity/100);gl.uniform1f(u.Bl,O.bloom/100*1.5*(.75+.25*k0));gl.uniform1f(u.Sp,O.spotSize/100);
   gl.uniform1f(u.T,t+s.ph);gl.uniform1f(u.G,14+sp*1.7);gl.uniform1f(u.A,s.a);
   for(let i=0;i<3;i++)gl.uniform3f(u.c[i],s.cur[i][0],s.cur[i][1],s.cur[i][2]);
   gl.drawArrays(gl.TRIANGLES,0,3)}}
 requestAnimationFrame(frame);
 addEventListener('scroll',()=>{const n=performance.now();if(n-lastRT>3)render(n)},{passive:true,capture:true});
 return{add(el,col){if(list.has(el))return;const c=trio(col);list.set(el,{cur:c.map(x=>x.slice()),tgt:c,a:0,ph:Math.random()*6.28,rad:0,col})},
  color(el,col){const s=list.get(el);if(s&&s.col!==col){s.col=col;s.tgt=trio(col)}}}})();
/* ---------- Neon Border (ported from the Originkit component) ---------- */
const NEON=(()=>{
 const SPEED=14,LEN=50,A=(c,a)=>{const n=parseInt(c.slice(1),16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`};
 const pp=(u,w,h)=>{const d=(((u%1)+1)%1)*2*(w+h);return d<w?[d,0]:d<w+h?[w,d-w]:d<w*2+h?[w-(d-w-h),h]:[0,h-(d-w*2-h)]};
 const lapAt=(k,w,h)=>{const p=2*(w+h),at=[0,w/p,(w+h)/p,(w*2+h)/p];return Math.floor(k/4)+at[((k%4)+4)%4]};
 const pang=(u,w,h)=>{const[x,y]=pp(u,w,h);return Math.atan2(x-w/2,h/2-y)*180/Math.PI};
 function arc(lap,w,h,col){const span=Math.max(.015,LEN/100*.5),st=[];let base=0,prev=0,acc=0;
  for(let i=0;i<=24;i++){const f=i/24,an=pang(lap+(f-.5)*span,w,h);if(!i)base=an;else{let d=an-prev;while(d>180)d-=360;while(d<-180)d+=360;acc+=d}prev=an;
   const t=Math.abs(f-.5)*2,sT=LEN/100,k=t<=sT?1:1-(t-sT)/(1-sT);st.push(`${A(col,k*k*(3-2*k))} ${acc.toFixed(1)}deg`)}
  return `conic-gradient(from ${base.toFixed(1)}deg at 50% 50%,${st.join(',')},${A(col,0)} ${acc.toFixed(1)}deg,${A(col,0)} 360deg)`}
 const ease=(()=>{const[x1,y1,x2,y2]=[.65,0,.35,1],bz=(a,b,t)=>{const u=1-t;return 3*u*u*t*a+3*u*t*t*b+t*t*t};return t=>{let s=t;for(let i=0;i<8;i++){const cx=bz(x1,x2,s)-t,u=1-s,dx=3*u*u*x1+6*u*s*(x2-x1)+3*s*s*(1-x2);if(Math.abs(dx)<1e-6)break;s=Math.max(0,Math.min(1,s-cx/dx))}return bz(y1,y2,s)}})();
 const live=new Set(),items=new Map(),beat=(30+(4-30)*(SPEED-1)/19)/4;
 const io=new IntersectionObserver(es=>es.forEach(e=>{const it=items.get(e.target);if(!it)return;e.isIntersecting?live.add(it):live.delete(it)}),{rootMargin:'80px'});
 const ro=new ResizeObserver(es=>es.forEach(e=>{const it=items.get(e.target);if(it){it.w=e.target.offsetWidth;it.h=e.target.offsetHeight;paint(it,it.lap)}}));
 function colorOf(c){if(c.dataset.neon)return c.dataset.neon;
  const m=c.innerHTML.replace(/#d6d0bf/gi,'').match(/(?:color|stroke|background|border)[^;"]*?:\s*(#[0-9a-f]{6})\b/i);return m?m[1]:'#2f3cff'}
 function paint(it,lap){if(it.w<2)return;it.a.style.setProperty('--arc',arc(lap,it.w,it.h,it.col));it.b.style.setProperty('--arc',arc(lap+.5,it.w,it.h,it.col))}
 window.__neonSet=(el,col)=>{el.style.setProperty('--nc',col);el.dataset.neon=col;PBR.color(el,col)};
 function attach(c){if(items.has(c)||c.closest('#overview'))return;const col=(c.id==='sl'&&window.__slCol)||colorOf(c);c.style.setProperty('--nc',col);items.set(c,{c,col});PBR.add(c,col)}
 let last=performance.now();
 (function frame(now){requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000);last=now;if(document.hidden||RM)return;
  live.forEach(it=>{it.t+=dt/beat;while(it.t>=1){it.t-=1;it.corner++}const f=lapAt(it.corner,it.w,it.h),t=lapAt(it.corner+1,it.w,it.h);it.lap=f+(t-f)*ease(it.t);paint(it,it.lap)})})(last);
 const scan=()=>document.querySelectorAll('main .card').forEach(attach);
 let q=0;new MutationObserver(()=>{if(!q)q=requestAnimationFrame(()=>{q=0;scan()})}).observe(document.querySelector('main'),{childList:true,subtree:true});
 scan();return{scan}})();
/* ---------- models / features ---------- */
[['Budget','0.99','0.98','0.98'],['Mid-Range','0.97','0.98','0.97'],['Premium','0.98','0.97','0.97'],['Ultra Flagship','1.00','0.99','0.99']].forEach((r,i)=>$('#rep').insertAdjacentHTML('beforeend',`<tr><td style="color:${TC[i]};font-weight:700">● ${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td style="color:var(--acc);font-weight:700">${r[3]}</td><td class="mut">125</td></tr>`));
const FE=[['RAM (MB)','fa-memory',58.42,'#2f3cff','Decisive for OS fluidness, on-device AI models and cache.'],['Primary camera (MP)','fa-camera',24.15,'#8a3ffc','200 MP sensors and periscope prisms raise the bill of materials.'],['Battery (mAh)','fa-battery-half',10.18,'#00a86b','Silicon-carbon density and high-wattage charging.'],['Front camera (MP)','fa-user',7.25,'#ff9a00','Selfie sensors, 4K autofocus, under-display optics.']];
FE.forEach(f=>$('#fb').insertAdjacentHTML('beforeend',`<div><div style="display:flex;justify-content:space-between;font:600 13px 'Chakra Petch',ui-monospace,Consolas,monospace"><span style="color:${f[3]}"><i class="fa-solid ${f[1]}"></i> ${f[0]}</span><b>${f[2]}%</b></div><div class="bar" style="margin:6px 0"><div class="fill" data-w="${f[2]}" style="background:${f[3]}"></div></div><small class="mut" style="font-size:11px">${f[4]}</small></div>`));
{const r=$('#chart3d');r.innerHTML='<div class="stage"><div class="rig"></div></div>';const rg=$('.rig',r),fl=document.createElement('div');fl.style.cssText='position:absolute;width:420px;height:200px;margin:-100px 0 0 -210px;transform:rotateX(90deg);background:linear-gradient(rgba(47,60,255,.16) 1px,transparent 1px) 0 0/30px 30px,linear-gradient(90deg,rgba(47,60,255,.16) 1px,transparent 1px) 0 0/30px 30px;border:1px solid rgba(47,60,255,.4)';rg.appendChild(fl);
 FE.forEach((f,i)=>{const h=f[2]*3.2+20,b=box(56,h,56,f[3]+'cc',`${f[2]}%`);b.style.cssText+=`;position:absolute;transform:translate(${(i-1.5)*92}px,${-h/2}px)`;rg.appendChild(b)});
 const s={rx:-24,ry:-30,z:1,auto:!RM,a0:!RM};rg.style.top='40px';spin($('.stage',r),rg,s);r.insertAdjacentHTML('beforeend','<p class="hint" style="bottom:10px"><i class="fa-solid fa-hand-pointer"></i> Drag to rotate the 3D chart</p>')}
/* ---------- 3D phones ---------- */
/* ---------- hero: wave fleet of 3D phones ---------- */
const hero={fin(){}};
const lab=phone($('#labPhone'),.95,1);let sel0=0,hlI=-1;
P.forEach((p,i)=>$('#pl').insertAdjacentHTML('beforeend',`<button class="it" data-i="${i}"><span><b>${p.name}</b><small>${p.ramGb}GB · ${p.battery}mAh · ${p.pc}MP</small></span><span style="text-align:right;color:#00a86b;font:700 11px 'Chakra Petch',ui-monospace,Consolas,monospace">${inr(p.price)}<small style="display:block;color:${TC[tn(p)]}">T${tn(p)}</small></span></button>`));
$('#pl').onclick=e=>{const b=e.target.closest('.it');if(b)pick(+b.dataset.i)};
COMP.forEach((c,i)=>$('#comps').insertAdjacentHTML('beforeend',`<button data-c="${i}"><i class="fa-solid ${c[1]}"></i> ${c[0]}</button>`));
function info(){const p=P[sel0];if(hlI<0){$('#info').innerHTML=`<small class="mut">SELECTED</small><h3 style="margin:4px 0">${p.name}</h3><p class="mut" style="font-size:12.5px">${FF(p)} Drag to rotate, scroll to zoom, then explode the hardware to inspect the share of each component in the ML score.</p>`;return}
 const d=[[`Tier ${tn(p)} · ${TN[tn(p)]}`,`Shown on screen at ${inr(p.price)}`],[`${p.pc} MP main · ${p.fc} MP front`,`Score contribution: ${(p.pc*25+p.fc*30).toLocaleString()} pts`],[`${p.ramGb} GB RAM (${(p.ramGb*1024).toLocaleString()} MB)`,`Score contribution: ${(p.ramGb*1024*.55).toFixed(1)} pts · weight 55%`],[`${p.battery.toLocaleString()} mAh`,`Score contribution: ${(p.battery*.25).toFixed(1)} pts · weight 25%`],[`${p.brand} finish`,`Total ML score: ${p.score.toFixed(1)} pts`]][hlI];
 $('#info').innerHTML=`<small style="color:var(--acc)"><i class="fa-solid ${COMP[hlI][1]}"></i> ${COMP[hlI][0].toUpperCase()}</small><h3 style="margin:6px 0;font-size:18px">${d[0]}</h3><p class="mut mono" style="font-size:12px">${d[1]}</p>`}
function pick(i){sel0=i;lab.set(P[i]);$$('.it').forEach(b=>b.classList.toggle('on',+b.dataset.i===i));info()}
$$('[data-v]').forEach(b=>b.onclick=()=>{const[x,y]=b.dataset.v.split(',').map(Number);lab.s.go(x,y)});
$('#bAuto').onclick=e=>{lab.s.a0=!lab.s.a0;lab.s.auto=lab.s.a0;e.target.classList.toggle('on',lab.s.a0)};
$('#bEx').onclick=()=>{const on=!lab.rig.classList.contains('ex');lab.ex(on);hlI=-1;$$('#comps button').forEach(b=>b.classList.remove('on'));$('#bEx').innerHTML=`<i class="fa-solid fa-layer-group"></i> ${on?'Reassemble':'Explode hardware'}`;if(on)lab.s.go(-14,-35);info()};
$('#comps').onclick=e=>{const b=e.target.closest('button');if(!b)return;const i=+b.dataset.c;if(!lab.rig.classList.contains('ex')){lab.ex(true);lab.s.go(-14,-35);$('#bEx').innerHTML='<i class="fa-solid fa-layer-group"></i> Reassemble'}hlI=hlI===i?-1:i;lab.hl(hlI);$$('#comps button').forEach(x=>x.classList.toggle('on',+x.dataset.c===hlI));info()};
$$('[data-f]').forEach(b=>b.onclick=()=>{const[x,y]=b.dataset.f.split(',');lab.fin(x,y);hero.fin(x,y)});
pick(0);
/* ---------- predictor ---------- */
[['iR','RAM (memory)','fa-memory','#2f3cff',512,16384,512,12288,v=>v.toLocaleString()+' MB ('+Math.round(v/1024)+' GB)'],['iB','Battery capacity','fa-battery-full','#00a86b',2000,7000,100,5500,v=>v.toLocaleString()+' mAh'],['iP','Primary rear camera','fa-camera','#8a3ffc',8,200,2,50,v=>v+' MP'],['iF','Front selfie camera','fa-user','#ff9a00',5,64,1,32,v=>v+' MP']].forEach(s=>$('#sl').insertAdjacentHTML('beforeend',`<div><div style="display:flex;justify-content:space-between;margin-bottom:8px"><b><i class="fa-solid ${s[2]}" style="color:${s[3]}"></i> ${s[1]}</b><span class="mono" style="color:${s[3]};font-size:13px" id="${s[0]}v"></span></div><input type="range" id="${s[0]}" min="${s[4]}" max="${s[5]}" step="${s[6]}" value="${s[7]}"><div class="mono mut" style="display:flex;justify-content:space-between;font-size:10.5px;margin-top:4px"><span>${s[4]}</span><span>${s[5]}</span></div></div>`));
const fm=[v=>v.toLocaleString()+' MB ('+Math.round(v/1024)+' GB)',v=>v.toLocaleString()+' mAh',v=>v+' MP',v=>v+' MP'];
$$('#sl input').forEach(i=>i.oninput=()=>predict());
const H2=h=>{const n=parseInt(h.slice(1),16);return[n>>16,n>>8&255,n&255]},FXRM=matchMedia('(prefers-reduced-motion:reduce)').matches;
let lastT=-1,FORCE=0,fxTok=0;
function tween(el,to,d,dl,fmt){const t0=performance.now()+dl;(function f(n){const k=Math.max(0,Math.min(1,(n-t0)/d)),v=to*(1-Math.pow(1-k,3));el.textContent=fmt(v);if(k<1)requestAnimationFrame(f)})(performance.now())}
function fx(t,sc,pc){
 if(FXRM)return;const card=$('#pCard'),L=$('#pfx'),nm=$('#pName');if(!card||!L||!card.offsetParent)return;
 const cr=card.getBoundingClientRect(),nr=nm.getBoundingClientRect(),cx=nr.left+nr.width/2-cr.left,cy=nr.top+nr.height/2-cr.top,R=Math.random,tok=++fxTok;
 L.innerHTML='';
 const far=(a,b)=>{const an=R()*6.283,d=a+R()*(b-a);return[Math.cos(an)*d,Math.sin(an)*d]};
 /* every block of the result flies in from a random spot, blurred and big, then lands with a small overshoot */
 [['#pTier',0],['#pBox',40],['#pRangeBox',230],['#pGauge',330]].forEach(([q,dl])=>{const e=$(q);if(!e)return;const[x,y]=far(380,720);
  e.animate([{transform:`translate(${x}px,${y}px) scale(${1.5+R()}) rotate(${(R()-.5)*60}deg)`,opacity:0,filter:'blur(18px)'},{transform:'translate(0,0) scale(1.05)',opacity:1,filter:'blur(0)',offset:.72},{transform:'none',opacity:1,filter:'blur(0)'}],{duration:1000,delay:dl,easing:'cubic-bezier(.16,.9,.25,1)',fill:'backwards'})});
 /* glowing particles converge on the result */
 for(let i=0;i<34;i++){const d=document.createElement('i');d.className='pd';d.style.left=cx+'px';d.style.top=cy+'px';L.appendChild(d);const[x,y]=far(260,640),dur=750+R()*650,dl=R()*260;
  d.animate([{transform:`translate(${x}px,${y}px) scale(${.6+R()*1.4})`,opacity:0},{opacity:1,offset:.25},{transform:'translate(0,0) scale(.15)',opacity:.95,offset:.92},{transform:'translate(0,0) scale(0)',opacity:0}],{duration:dur,delay:dl,easing:'cubic-bezier(.3,.1,.2,1)',fill:'backwards'})}
 /* impact: two shockwave rings + a colour flash across the card */
 [0,170].forEach(dl=>{const r=document.createElement('i');r.className='pr';r.style.left=cx+'px';r.style.top=cy+'px';L.appendChild(r);
  r.animate([{transform:'scale(.2)',opacity:0},{opacity:.95,offset:.12},{transform:'scale(11)',opacity:0}],{duration:1200,delay:760+dl,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'})});
 const f=document.createElement('i');f.className='pf';f.style.background=`radial-gradient(circle at ${cx}px ${cy}px,rgba(${H2(TC[t]).join(',')},.5),transparent 62%)`;L.appendChild(f);
 f.animate([{opacity:0},{opacity:1,offset:.25},{opacity:0}],{duration:1300,delay:740,easing:'ease-out',fill:'backwards'});
 card.animate([{boxShadow:`0 0 0 1px rgba(${H2(TC[t]).join(',')},.2),0 0 0 0 rgba(${H2(TC[t]).join(',')},0)`},{boxShadow:`0 0 0 1px rgba(${H2(TC[t]).join(',')},.5),0 0 90px 6px rgba(${H2(TC[t]).join(',')},.75)`,offset:.5},{}],{duration:1500,delay:700,easing:'ease-out'});
 /* numbers count up, gauge ring sweeps round */
 tween($('#gp'),pc,1100,500,v=>Math.round(v)+'%');
 const sS=$('#pScore');tween(sS,sc,1100,420,v=>'Calculated score: '+v.toFixed(1)+' pts');
 setTimeout(()=>{if(tok===fxTok)L.innerHTML=''},2600)}
function predict(){const v=['iR','iB','iP','iF'].map(i=>+$('#'+i).value);['iR','iB','iP','iF'].forEach((i,j)=>$('#'+i+'v').textContent=fm[j](v[j]));
 const sc=v[0]*.55+v[1]*.25+v[2]*25+v[3]*30,t=sc>=11567?3:sc>=9285?2:sc>=7010?1:0,R=['₹10,000 – ₹24,999','₹25,000 – ₹49,999','₹50,000 – ₹1,09,999','₹1,10,000 – ₹1,80,000+'],Q=['Q1 (bottom 25%)','Q2 (25–50%)','Q3 (50–75%)','Q4 (top 25%)'];
 const card=$('#pCard');if(card){card.style.setProperty('--tc',TC[t]);card.style.setProperty('--tr',H2(TC[t]).join(','));window.__neonSet&&__neonSet(card,TC[t])}
 window.__slCol=TC[t];window.PBR&&PBR.color($('#sl'),TC[t]);
 $('#pName').textContent=TN[t];$('#pName').style.color=TC[t];$('#pTier').textContent='TIER '+t;$('#pTier').style.color=TC[t];$('#pScore').textContent='Calculated score: '+sc.toFixed(1)+' pts';$('#pRange').textContent=R[t];$('#pQ').textContent=Q[t];
 const pc=Math.min(100,Math.max(5,Math.round((sc-1890)/(16450-1890)*100))),go=FORCE||t!==lastT,gg=$('#gg');$('#gp').textContent=pc+'%';
 if(go&&!FXRM){gg.style.transition='none';gg.style.strokeDashoffset=264;gg.getBoundingClientRect();gg.style.transition='stroke-dashoffset 1.2s cubic-bezier(.2,.8,.2,1) .5s,stroke .4s'}
 gg.style.strokeDashoffset=264*(1-pc/100);gg.style.stroke=TC[t];
 if(go&&lastT!==-1||FORCE)fx(t,sc,pc);lastT=t;FORCE=0}
function pre(a,b,c,d){['iR','iB','iP','iF'].forEach((i,j)=>$('#'+i).value=[a,b,c,d][j]);FORCE=1;predict()}

/* ---------- phone cards ---------- */
/* Phone photos: put the 21 image paths/URLs here in the same order as the phone list (index 0 = first phone). Empty = placeholder. */
/* PHONE_IMG lives in js/data/phone-images.js */
let br='ALL';['ALL','Apple','Samsung','Vivo','OPPO','Xiaomi','iQOO'].forEach(b=>$('#bf').insertAdjacentHTML('beforeend',`<button data-b="${b}" class="${b==='ALL'?'on':''}">${b==='ALL'?'All brands':b}</button>`));
$('#bf').onclick=e=>{const b=e.target.closest('button');if(!b)return;br=b.dataset.b;$$('#bf button').forEach(x=>x.classList.toggle('on',x===b));cards()};$('#q').oninput=$('#so').onchange=()=>cards();
function cards(){const q=$('#q').value.toLowerCase().trim(),so=$('#so').value;let l=P.filter(p=>(br==='ALL'||p.brand===br)&&(`${p.name} ${p.brand} ${p.tier} ${p.ramGb} ${p.battery} ${p.pc}`.toLowerCase().includes(q)));
 l.sort({'p-':(a,b)=>(b.price||0)-(a.price||0),'p+':(a,b)=>(a.price??1e9)-(b.price??1e9),r:(a,b)=>b.ramGb-a.ramGb,b:(a,b)=>b.battery-a.battery,c:(a,b)=>b.pc-a.pc}[so]);
 $('#pg').innerHTML=l.length?l.map(p=>{const t=tn(p),i=P.indexOf(p),src=PHONE_IMG[i];return`<div class="fc" data-i="${i}" tabindex="0" role="button" aria-label="Flip ${p.name}"><div class="fc-tilt"><div class="fc-rot"><div class="fc-f fc-front">${src?`<img src="${src}" alt="${p.name}" draggable="false">`:`<div class="fc-ph" style="--tc:${TC[t]}"><i class="${bi(p.brand)}"></i><b>${p.name}</b><small>photo ${String(i+1).padStart(2,'0')} · tap to flip</small></div>`}</div><div class="fc-f fc-back"><div style="display:flex;justify-content:space-between;font:11px 'Chakra Petch',ui-monospace,Consolas,monospace"><span style="color:${TC[t]};border:1px solid ${TC[t]}66;padding:2px 9px;border-radius:99px">${p.tier}</span><span class="mut"><i class="${bi(p.brand)}" style="color:var(--acc)"></i> ${p.brand}</span></div><h3 style="margin:10px 0 2px;font-size:18px">${p.name}</h3><b class="mono" style="font-size:22px;color:${p.price==null?'var(--mut)':'#00a86b'}">${inr(p.price)}</b><small class="mut" style="display:block;font-size:10px;line-height:1.35;margin-top:2px">${pnote(p)}</small><div class="sp"><div><small>MEMORY</small>${p.ramGb} GB</div><div><small>BATTERY</small>${p.battery.toLocaleString()} mAh</div><div><small>REAR</small>${p.pc} MP</div><div><small>FRONT</small>${p.fc} MP</div></div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto"><span class="mono" style="font-size:11.5px"><small class="mut" style="display:block;font-size:9px">ML SCORE</small><b style="color:var(--acc)">${p.score.toFixed(1)} pts</b></span><button class="btn" style="padding:7px 13px;font-size:12px" onclick="event.stopPropagation();insp(${i})"><i class="fa-solid fa-cube"></i> 3D inspect</button></div></div></div></div></div>`}).join(''):'<p class="mut" style="grid-column:1/-1;text-align:center;padding:50px">No smartphones match your filters.</p>'}
/* flip gallery behaviour (same mechanics as the supplied component: half-turn flip, perspective 900, repel tilt 15deg) */
(()=>{const g=$('#pg'),ang=new WeakMap();
 const flip=c=>{const r=c.querySelector('.fc-rot'),a=(ang.get(c)||0)+180;ang.set(c,a);r.style.transform=`rotateY(${a}deg)`};
 g.addEventListener('click',e=>{const c=e.target.closest('.fc');c&&flip(c)});
 g.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const c=e.target.closest('.fc');if(c){e.preventDefault();flip(c)}});
 g.addEventListener('mousemove',e=>{const c=e.target.closest('.fc');if(!c)return;const t=c.querySelector('.fc-tilt'),R=t.getBoundingClientRect(),L=15;
  t.style.transform=`rotateX(${-((e.clientY-R.top)/R.height-.5)*L*2}deg) rotateY(${((e.clientX-R.left)/R.width-.5)*L*2}deg) scale3d(1.06,1.06,1.06)`});
 g.addEventListener('mouseout',e=>{const c=e.target.closest('.fc');if(!c||c.contains(e.relatedTarget))return;c.querySelector('.fc-tilt').style.transform=''});
})();
function insp(i){pick(i);show('lab')}cards();
$('#cp').onclick=()=>navigator.clipboard&&navigator.clipboard.writeText($('#src').textContent).then(()=>$('#cp').innerHTML='<i class="fa-solid fa-check"></i> Copied');
/* ---------- slides (PDF embedded in this file) ---------- */
let pdf=null,pn=1,busy=0,pend=0;
async function getPdf(){if(pdf)return pdf;const b=atob($('#pdfdata').textContent.trim()),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';return pdf=await pdfjsLib.getDocument({data:u}).promise}
async function paint(){if(busy){pend=1;return}busy=1;try{do{pend=0;const d=await getPdf(),o=!$('#ss').hidden,c=$(o?'#sc2':'#sc1'),pg=await d.getPage(pn),b=pg.getViewport({scale:1}),mw=o?innerWidth-40:Math.min(innerWidth-190,1100),mh=o?innerHeight-150:innerHeight-250,s=Math.min(mw/b.width,mh/b.height,2.2),r=devicePixelRatio||1,v=pg.getViewport({scale:s*r});
 c.width=v.width;c.height=v.height;c.style.width=v.width/r+'px';c.style.height=v.height/r+'px';await pg.render({canvasContext:c.getContext('2d'),viewport:v}).promise;$('#sl2').hidden=1;$('#cnt').textContent=$('#cnt2').textContent=pn+' / '+d.numPages}while(pend)}catch(e){$('#sl2').textContent='Could not load slides. Check your internet connection (pdf.js) and try again.'}busy=0}
function sg(d){if(pdf&&(pn+d<1||pn+d>pdf.numPages))return;pn=Math.max(1,pn+d);paint()}
function openSS(){$('#ss').hidden=0;document.body.classList.remove('fx');paint();$('#ss').requestFullscreen&&$('#ss').requestFullscreen().catch(()=>{})}
function closeSS(){$('#ss').hidden=1;if(matchMedia('(pointer:fine)').matches)document.body.classList.add('fx');document.fullscreenElement&&document.exitFullscreen();paint()}
function fsr(){document.fullscreenElement?document.exitFullscreen():$('#ss').requestFullscreen()}
addEventListener('keydown',e=>{if(!$('#ss').hidden){if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();sg(1)}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();sg(-1)}if(e.key==='Escape')closeSS();return}
 if(/INPUT|SELECT/.test(e.target.tagName))return;const i=TABS.findIndex(t=>t[0]===cur);if(e.key==='ArrowRight')show(TABS[(i+1)%TABS.length][0]);if(e.key==='ArrowLeft')show(TABS[(i+TABS.length-1)%TABS.length][0])});
addEventListener('resize',()=>{if(cur==='slides'||!$('#ss').hidden)paint()});
addEventListener('load',()=>{show(location.hash.slice(1)||'overview');setTimeout(place,300)});
show(location.hash.slice(1)||'overview');

/* ---------- animated intro ---------- */
let iEnd=0;const MSG=['Loading Kaggle dataset…','Scoring 2,500 devices…','Training Random Forest…','Classifying price tiers…','Ready'];
function endIntro(go){const el=$('#intro');if(!el||iEnd)return;iEnd=1;el.classList.add('out');setTimeout(()=>{el.remove();document.body.classList.remove('lock');if(go==='ppt'){show('overview');presentPPT()}else{show('overview');tiPlay('overview',{b:'apple'})}},RM?0:850)}
addEventListener('keydown',e=>{if($('#intro')&&!iEnd){if(e.key==='Enter'||e.key==='Escape')endIntro('exp');e.stopImmediatePropagation()}},true);addEventListener('keydown',e=>{if(e.key==='Escape')menu(false)});
(function(){
  const tl=$('#itl'),bar=$('#ibf'),st=$('#ist'),sub=$('#intro .is2'),R=Math.random;
  const far=()=>{const a=R()*Math.PI*2,d=Math.max(innerWidth,innerHeight)*(.75+R()*.6);return[Math.cos(a)*d,Math.sin(a)*d]};
  /* title: every letter is thrown in from a random point beyond the screen edge */
  let ki=0;const spans=['Price','Sense AI'].flatMap(line=>{const row=document.createElement('div');row.className='il';tl.appendChild(row);return [...line.replace(/ /g,'\u00a0')].map(c=>{const e=document.createElement('span');e.textContent=c;e.style.setProperty('--k',ki++);row.appendChild(e);return e})});
  let last=0;
  spans.forEach(e=>{
    if(RM){e.style.opacity=1;return}
    const[x,y]=far(),rot=(R()-.5)*1260,s=.15+R()*3.2,dur=1000+R()*700,dl=250+R()*850;last=Math.max(last,dur+dl);
    const a=e.animate([
      {opacity:0,transform:`translate(${x}px,${y}px) rotate(${rot}deg) scale(${s})`,filter:'blur(18px)'},
      {opacity:1,transform:`translate(${-x*.035}px,${-y*.035}px) rotate(${-rot*.025}deg) scale(1.18)`,filter:'blur(0)',offset:.72},
      {opacity:1,transform:'none',filter:'blur(0)'}],
      {duration:dur,delay:dl,easing:'cubic-bezier(.16,.9,.25,1)',fill:'both'});
    a.onfinish=()=>{e.style.opacity=1;a.cancel()};
  });
  /* fit: shrink the title just enough that the widest line (plus its shadow) always sits inside the screen */
  const fitT=()=>{tl.style.fontSize='';const rows=[...tl.querySelectorAll('.il')];if(!rows.length)return;const avail=document.documentElement.clientWidth-44;
    const need=Math.max(...rows.map(r=>{const k=r.children,a=k[0],z=k[k.length-1];return z.offsetLeft+z.offsetWidth-a.offsetLeft}));
    if(need>avail){tl.style.fontSize=(parseFloat(getComputedStyle(tl).fontSize)*avail/need)+'px'}};
  fitT();addEventListener('resize',fitT,{passive:true});if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitT);
  /* subtitle: word by word, from random directions */
  const words=sub.textContent.split(' ');sub.textContent='';
  words.forEach((w,i)=>{const e=document.createElement('span');e.className='w';e.textContent=w;sub.appendChild(e);if(i<words.length-1)sub.appendChild(document.createTextNode(' '));
    if(RM){e.style.opacity=1;return}
    const[x,y]=far(),a=e.animate([{opacity:0,transform:`translate(${x*.6}px,${y*.6}px) rotate(${(R()-.5)*240}deg) scale(${.3+R()*1.6})`,filter:'blur(10px)'},{opacity:1,transform:'none',filter:'blur(0)'}],{duration:1000+R()*500,delay:1500+i*140+R()*200,easing:'cubic-bezier(.16,.9,.25,1)',fill:'both'});
    a.onfinish=()=>{e.style.opacity=1;a.cancel()}});
  /* floating spec chips and the orb fly in too */
  if(!RM){$$('#intro .fl').forEach((e,i)=>{const[x,y]=far();e.animate([{translate:`${x}px ${y}px`,opacity:0},{translate:'0 0',opacity:1}],{duration:1500,delay:600+i*250,easing:'cubic-bezier(.16,.9,.25,1)',fill:'backwards'})});
    const o=$('#intro .orb');if(o)o.animate([{transform:'scale(0) rotate(-270deg)',opacity:0},{transform:'none',opacity:1}],{duration:1300,delay:150,easing:'cubic-bezier(.2,1.2,.3,1)',fill:'backwards'})}
  /* impact: shake, flash, shockwaves, debris, then a letter wave */
  setTimeout(()=>{if(iEnd||RM)return;const it=$('#intro');if(!it)return;
    tl.classList.add('shake','land');it.classList.add('flash');
    ['','b2'].forEach(c=>{const b=document.createElement('i');b.className='boom '+c;tl.appendChild(b)});
    for(let i=0;i<30;i++){const d=document.createElement('i'),a=R()*6.283,r=140+R()*340;d.className='db';d.style.background=i%3?'var(--acc)':'var(--v)';tl.appendChild(d);
      d.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${Math.cos(a)*r}px,${Math.sin(a)*r}px) scale(0)`,opacity:0}],{duration:700+R()*700,easing:'cubic-bezier(.1,.7,.3,1)',fill:'forwards'}).onfinish=()=>d.remove()}
    setTimeout(()=>{tl.classList.remove('shake');$$('.boom',tl).forEach(b=>b.remove())},1300);
    setTimeout(()=>{if(!iEnd){tl.classList.remove('land');tl.classList.add('neon')}},1300+spans.length*60+900)},last+80);
  const t0=performance.now(),D=RM?500:3800;
  (function tk(n){const v=Math.min(1,(n-t0)/D);bar.style.width=v*100+'%';st.textContent=MSG[Math.min(4,Math.floor(v*5))]+'  '+Math.round(v*100)+'%';if(v<1)requestAnimationFrame(tk);else{} })(t0);
  /* guidance line: enters LAST, after every other piece of text, and highlights the name */
  const ig=$('#ig2'),gp=$$('.gp',ig),nm=$('#igName'),T=RM?0:3900;
  gp.forEach(e=>{e.style.opacity=0});nm.style.opacity=0;
  setTimeout(()=>{if(iEnd)return;
    gp.forEach((e,i)=>{e.style.opacity=1;if(!RM)e.animate([{opacity:0,transform:'translateY(16px)',filter:'blur(6px)'},{opacity:1,transform:'none',filter:'blur(0)'}],{duration:700,delay:i*150,easing:'cubic-bezier(.16,.9,.25,1)',fill:'backwards'})});
    nm.style.opacity=1;
    if(!RM){nm.animate([{opacity:0,transform:'scale(2.6) rotate(-4deg)',filter:'blur(16px) brightness(3)'},{opacity:1,transform:'scale(.94)',filter:'blur(0) brightness(1.6)',offset:.6},{opacity:1,transform:'none',filter:'brightness(1)'}],{duration:1100,delay:350,easing:'cubic-bezier(.16,.9,.25,1)',fill:'backwards'});
      setTimeout(()=>{if(!iEnd)nm.classList.add('go')},500)}else nm.classList.add('go');
    setTimeout(()=>{if(!iEnd)$('#intro .ia2').classList.add('on')},RM?0:1700)},T);
})();


/* ---------- overview gallery: 5 phones on top + 5 below (compositor-only animation) ---------- */
(()=>{const st=document.getElementById('rg'),ring=document.getElementById('rgRing');if(!st||!ring)return;
 const cs=[...ring.children],N=cs.length,rm=matchMedia('(prefers-reduced-motion:reduce)').matches,SPEED=rm?0:.065;
 const dat=cs.map((c,i)=>({c,r:+c.dataset.r,j:i%5,iw:+c.dataset.w,ih:+c.dataset.h,w:0,h:0}));
 let off=0,drag=0,lx=0,W=0,H=0,m=0,L=1,pitch=1,yT=0,yB=0,arc=0,vis=true,last=0;
 new IntersectionObserver(e=>{vis=e[0].isIntersecting}).observe(st);
 const lay=()=>{const w0=st.clientWidth,h0=st.clientHeight;if(!st.offsetParent||w0<50||h0<50)return;W=w0;H=h0;const sm=W<560,bh=sm?120:Math.min(W<900?170:225,H*.23),bw=bh*.75;
  m=bw;L=W+2*m;pitch=L/5;yT=H*.17;yB=H*.83;arc=H*(sm?.05:.07);
  dat.forEach(d=>{const k=Math.min(bw/d.iw,bh/d.ih);d.w=d.iw*k;d.h=d.ih*k;d.c.style.width=d.w+'px';d.c.style.height=d.h+'px'})};
 lay();let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(lay,80)},{passive:true});
 st.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;drag=1;lx=e.clientX;st.classList.add('drag')},{passive:true});
 addEventListener('pointerup',()=>{drag=0;st.classList.remove('drag')},{passive:true});
 addEventListener('pointermove',e=>{if(!drag)return;off-=e.clientX-lx;lx=e.clientX},{passive:true});
 const mod=(a,n)=>((a%n)+n)%n;
 function tick(now){requestAnimationFrame(tick);if(!last)last=now;const dt=Math.min(40,now-last);last=now;
  if(!vis||document.hidden||!st.offsetParent){return}
  if(!W||st.clientWidth!==W||st.clientHeight!==H){lay();if(!W)return}
  if(!drag)off+=SPEED*dt;
  for(let i=0;i<N;i++){const d=dat[i],dir=d.r?1:-1,cx=mod(d.j*pitch+dir*off,L)-m,u=cx/W*2-1,u2=u*u>1?1:u*u,
   y=d.r?yB-arc*u2:yT+arc*u2,s=1-.22*u2,e=Math.max(0,Math.min(1,Math.min(cx,W-cx)/(W*.16)));
   d.c.style.transform='translate3d('+(cx-d.w/2).toFixed(2)+'px,'+(y-d.h/2).toFixed(2)+'px,0) scale('+s.toFixed(3)+')';
   d.c.style.opacity=(e*(1-.25*u2)).toFixed(2)}}
 requestAnimationFrame(tick)})();
