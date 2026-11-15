/* 3D Lab: press and drag anywhere inside the viewer box to rotate the phone (mouse, pen or touch); wheel zooms */
(function(){const root=document.getElementById('labPhone');if(!root||typeof lab==='undefined')return;
 const card=root.parentElement,S=lab.s;let d=0,lx=0,ly=0,tm;
 const strip=()=>{const st=root.querySelector('.stage');if(st)st.onpointerdown=st.onpointermove=st.onpointerup=st.onpointercancel=st.onwheel=null;
  root.querySelectorAll('canvas').forEach(c=>{c.onpointerdown=c.onpointermove=c.onpointerup=c.onpointercancel=c.onwheel=null})};
 strip();new MutationObserver(strip).observe(root,{childList:true});
 card.style.touchAction='none';card.style.cursor='grab';card.style.userSelect='none';
 card.addEventListener('pointerdown',e=>{if(e.button>0)return;d=1;S.t=null;S.auto=0;clearTimeout(tm);lx=e.clientX;ly=e.clientY;try{card.setPointerCapture(e.pointerId)}catch(_){}card.style.cursor='grabbing'});
 card.addEventListener('pointermove',e=>{if(!d)return;S.ry+=(e.clientX-lx)*.45;S.rx=Math.max(-80,Math.min(80,S.rx-(e.clientY-ly)*.45));lx=e.clientX;ly=e.clientY});
 const up=()=>{if(!d)return;d=0;card.style.cursor='grab';tm=setTimeout(()=>S.auto=S.a0,2800)};
 card.addEventListener('pointerup',up);card.addEventListener('pointercancel',up);
 card.addEventListener('wheel',e=>{e.preventDefault();S.z=Math.max(.5,Math.min(root.classList.contains('gl')?2.4:1.7,S.z-e.deltaY*.001))},{passive:false});
})();
