(function(){
 /* 1. Detect real display refresh rate (60/90/120/144/165Hz) and expose it */
 var bar=document.getElementById('spBar'),fb=document.getElementById('fpsB'),hz=60;
 var fr=0,t0=0,acc=0,show=false;
 function meter(t){
  if(t0){var d=t-t0;if(d>0){acc=acc?acc*.9+d*.1:d}}t0=t;fr++;
  if(fr%20===0&&acc){hz=Math.round(1000/acc);document.documentElement.style.setProperty('--hz',hz);if(show)fb.textContent=hz+' FPS · '+acc.toFixed(1)+' ms'}
  requestAnimationFrame(meter)}
 requestAnimationFrame(meter);
 /* press F (not in a field) to toggle the live FPS badge */
 addEventListener('keydown',function(e){if(e.key&&e.key.toLowerCase()==='f'&&!/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)&&!e.ctrlKey&&!e.metaKey){show=!show;fb.classList.toggle('on',show)}});
 /* 2. Scroll progress for the active tab, one rAF-batched passive listener */
 var pend=false;
 function upd(){pend=false;var t=document.querySelector('.tab.on');if(!t)return;var m=t.scrollHeight-t.clientHeight;bar.style.transform='scaleX('+(m>0?t.scrollTop/m:0)+')'}
 document.addEventListener('scroll',function(){if(!pend){pend=true;requestAnimationFrame(upd)}},{passive:true,capture:true});
 /* 3. Arrow-key tab navigation (accessibility + speed) */
 addEventListener('keydown',function(e){
  if(!/^Arrow(Left|Right)$/.test(e.key)||/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName))return;
  var b=[].slice.call(document.querySelectorAll('nav button')),i=b.findIndex(function(x){return x.classList.contains('on')});
  if(i<0)return;var n=b[(i+(e.key==='ArrowRight'?1:-1)+b.length)%b.length];n.click();n.scrollIntoView({inline:'center',block:'nearest'})});
 /* 4. Pause expensive work while tab is hidden; reset progress on tab change */
 document.addEventListener('click',function(e){if(e.target.closest('nav button'))setTimeout(upd,60)},true);
})();
