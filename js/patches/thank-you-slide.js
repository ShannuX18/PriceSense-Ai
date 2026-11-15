(function(){
 const H=$('#thH'),ST=$('#thStage');if(!H||!ST)return;
 const COL=['#4285f4','#ea4335','#fbbc05','#34a853'];
 H.innerHTML=tl('Thank You',n=>`;--c:${COL[n%4]}`);
 $$('.ti-w>span',H).forEach((e,i)=>e.classList.add('a'+(i%8)));
 let T=[];const clr=()=>{T.forEach(clearTimeout);T=[]};
 const seg=(b,c,k)=>{const[,label,icon,tag]=c,h=`<div class="ti-h">${tl(label,b==='pixel'?n=>`;--c:${COL[n%4]}`:0)}</div>`,s=`<div class="ti-s">${tag}</div>`;
  const M={apple:`<div class="ti-in"><i class="${icon} lg"></i>${h}<i class="ln"></i>${s}</div>`,
   samsung:`<div class="ti-fx"><i class="sg-o"></i><i class="sg-o b"></i></div><div class="ti-in">${h}${s}</div>`,
   xiaomi:`<div class="ti-fx"><i class="xm-q" style="left:8%;top:14%;width:70px;height:70px"></i><i class="xm-q" style="right:10%;bottom:10%;width:84px;height:84px;animation-delay:-2s"></i></div><div class="ti-in"><div class="xm-l">mi</div>${h}${s}</div>`,
   oppo:`<div class="ti-fx"><i class="pp-r"></i><i class="pp-r" style="animation-delay:.4s"></i></div><div class="ti-in">${h}${s}</div>`,
   vivo:`<div class="ti-in"><div class="vv-lens"></div>${h}${s}</div>`,
   oneplus:`<div class="ti-fx"><i class="ol-b a"></i><i class="ol-b b"></i><i class="ol-b c"></i></div><div class="ti-in">${h}${s}</div>`,
   pixel:`<div class="ti-fx"><i class="gp-bl" style="left:-8%;top:-12%;background:#4285f4"></i><i class="gp-bl" style="right:-8%;top:-10%;background:#ea4335"></i><i class="gp-bl" style="left:-6%;bottom:-14%;background:#fbbc05"></i><i class="gp-bl" style="right:-6%;bottom:-12%;background:#34a853"></i></div><div class="ti-in"><div class="gp-row">${COL.map((x,i)=>`<i style="background:${x};--d:${i*.06}s"></i>`).join('')}</div>${h}${s}</div>`,
   nothing:`<div class="ti-in">${h}${s}</div>`,
   realme:`<div class="ti-fx" style="z-index:3"><i class="rm-c l"></i><i class="rm-c r"></i></div><div class="ti-in">${h}${s}</div>`};
  const d=document.createElement('div');d.className=`seg s${k%4} ti-${b}`;d.style.setProperty('--s','30ms');
  if(b==='pixel')d.style.cssText+=';background:#fff;color:#202124';if(b==='realme')d.style.cssText+=';background:#ffc915;color:#111';
  d.innerHTML=M[b];return d};
 window.thClear=()=>{clr();const o=$('#ti');if(o&&o.classList.contains('ti-last'))o.remove();document.body.classList.remove('tiw')};
 window.lastPlay=function(){
  clr();tiEnd(true);ST.classList.remove('go');
  if(RM){ST.classList.add('go');return}
  const o=document.createElement('div');o.id='ti';o.className='ti-last';o.setAttribute('aria-hidden','true');o.style.setProperty('--hh',HDR.offsetHeight+'px');
  document.body.appendChild(o);document.body.classList.add('tiw');
  const fin=()=>{clr();if(!o.isConnected)return;o.classList.add('out');ST.classList.add('go');document.body.classList.remove('tiw');setTimeout(()=>o.remove(),260)};
  o.onclick=fin;
  const brands=Object.values(TI_B),gaps=[560,520,480,440,400,360,330,300,280];let t=0;
  brands.forEach((c,i)=>{T.push(setTimeout(()=>{if(!o.isConnected)return;const e=seg(c[0],c,i);o.appendChild(e);const ks=[...o.querySelectorAll('.seg')];if(ks.length>2)ks[0].remove()},t));t+=gaps[i]});
  T.push(setTimeout(fin,t+120));
 };
 const _tp=tiPlay;tiPlay=function(id,o){if(id==='last'){lastPlay();return}thClear();ST.classList.remove('go');return _tp.apply(this,arguments)};
})();
