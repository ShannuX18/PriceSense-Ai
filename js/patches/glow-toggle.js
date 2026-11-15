(function(){const r=document.documentElement,b=document.getElementById('glowBtn');if(!b)return;
 let on=true;try{on=localStorage.getItem('glow')!=='off'}catch(e){}
 const set=(v,save)=>{on=v;r.dataset.glow=v?'on':'off';b.setAttribute('aria-pressed',v);b.title='Glow effect: '+(v?'on':'off');if(save)try{localStorage.setItem('glow',v?'on':'off')}catch(e){}};
 set(on,false);b.addEventListener('click',()=>set(!on,true));
})();
