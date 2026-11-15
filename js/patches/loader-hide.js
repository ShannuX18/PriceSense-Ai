(function(){
 var RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
 var ld=document.getElementById('ld');
 function hide(){ld&&ld.classList.add('x');setTimeout(function(){ld&&ld.remove()},700)}
 if(document.readyState==='complete')hide();else addEventListener('load',hide);setTimeout(hide,2500);
 /* split plain-text headings into words, re-run on tab change so they animate each time */
 function split(root){
  if(RM)return;
  root.querySelectorAll('h1,h2,h3.sora,.sub').forEach(function(h){
   if(h.dataset.sp||h.children.length||!h.textContent.trim())return;
   h.dataset.sp=1;var k=0;
   h.innerHTML=h.textContent.trim().split(/\s+/).map(function(t){return '<span class="w" style="--k:'+(k++)+'">'+t+'</span>'}).join(' ');
  });
 }
 function replay(){var t=document.querySelector('.tab.on');if(!t)return;split(t);
  t.querySelectorAll('.w').forEach(function(w){w.style.animation='none';void w.offsetWidth;w.style.animation=''})}
 split(document);
 document.addEventListener('click',function(e){if(e.target.closest('nav button'))setTimeout(replay,70)},true);
 /* parallax glow follows cursor on the whole page (single rAF, transform-free) */
 var mx=innerWidth/2,my=innerHeight/2,q=false;
 addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;if(!q){q=true;requestAnimationFrame(function(){q=false;
  document.documentElement.style.setProperty('--px',(mx/innerWidth-.5).toFixed(3));document.documentElement.style.setProperty('--py',(my/innerHeight-.5).toFixed(3))})}},{passive:true});
})();
