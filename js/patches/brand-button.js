(function(){const b=document.querySelector('header .brand');if(!b)return;
 b.setAttribute('role','button');b.setAttribute('tabindex','0');b.setAttribute('aria-label','PriceSense AI: replay intro');b.title='Replay intro';
 const go=()=>{try{history.replaceState(0,0,location.pathname+location.search)}catch(e){}scrollTo(0,0);location.reload()};
 b.addEventListener('click',go);b.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}});
})();
