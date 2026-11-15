(function(){
 if(!matchMedia('(pointer:fine)').matches)return;
 var enc=function(b){return 'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">'+b+'</svg>')};
 var arrow=function(c){return '<path d="M5 3v21l5.5-5 3.5 8.5 3.2-1.4-3.5-8.3H22z" fill="'+c+'" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>'};
 var T=[
  {id:'classic',n:'Classic Glow (original)',b:'<circle cx="16" cy="16" r="3.5" fill="#2f3cff"/><circle cx="16" cy="16" r="10" fill="none" stroke="#2f3cff" stroke-width="1.6"/>'},
  {id:'neon',n:'Neon Blue',b:arrow('#2f3cff'),hx:5,hy:3},
  {id:'rose',n:'Rose Pink',b:arrow('#ff4d8d'),hx:5,hy:3},
  {id:'mint',n:'Mint Green',b:arrow('#19d3a2'),hx:5,hy:3},
  {id:'cross',n:'Crosshair',b:'<path d="M16 3v10M16 19v10M3 16h10M19 16h10" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M16 3v10M16 19v10M3 16h10M19 16h10" stroke="#2f3cff" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="16" r="2" fill="#ff4d8d"/>',hx:16,hy:16},
  {id:'ring',n:'Minimal Ring',b:'<circle cx="16" cy="16" r="9" fill="rgba(47,60,255,.12)" stroke="#fff" stroke-width="4"/><circle cx="16" cy="16" r="9" fill="none" stroke="#2f3cff" stroke-width="2"/>',hx:16,hy:16},
  {id:'sys',n:'System Default',b:arrow('#000')}
 ];
 var cm=document.getElementById('cm'),st=document.createElement('style'),cur='classic';
 document.head.appendChild(st);
 try{cur=localStorage.getItem('curTheme')||'classic'}catch(e){}
 function apply(id){
  cur=id;try{localStorage.setItem('curTheme',id)}catch(e){}
  var t=T.filter(function(x){return x.id===id})[0]||T[0],css='';
  document.body.classList.toggle('cur-x',id!=='classic');
  if(id==='sys')css='body.fx,body.fx *{cursor:auto!important}body.fx a,body.fx button,body.fx select,body.fx label{cursor:pointer!important}';
  else if(id!=='classic')css='body.fx.cur-x,body.fx.cur-x *{cursor:url("'+enc(t.b)+'") '+(t.hx||5)+' '+(t.hy||3)+',auto!important}';
  st.textContent=css;
  [].forEach.call(cm.querySelectorAll('button'),function(b){b.classList.toggle('sel',b.dataset.id===id)});
 }
 var h='<h6>Cursor theme</h6>';
 T.forEach(function(t){h+='<button role="menuitemradio" data-id="'+t.id+'"><span class="pv"><svg viewBox="0 0 32 32">'+t.b+'</svg></span>'+t.n+'</button>'});
 cm.innerHTML=h;
 function open(x,y){
  cm.classList.add('on');var w=cm.offsetWidth,hh=cm.offsetHeight,fx=x+w>innerWidth-8,fy=y+hh>innerHeight-8;
  cm.style.left=Math.max(8,fx?x-w:x)+'px';cm.style.top=Math.max(8,fy?y-hh:y)+'px';
  cm.style.setProperty('--ox',fx?'100%':'0');cm.style.setProperty('--oy',fy?'100%':'0');
  (cm.querySelector('.sel')||cm.querySelector('button')).focus({preventScroll:true});
 }
 function close(){cm.classList.remove('on')}
 document.addEventListener('contextmenu',function(e){
  if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||e.shiftKey)return;
  e.preventDefault();open(e.clientX,e.clientY)},true);
 cm.addEventListener('click',function(e){var b=e.target.closest('button');if(b){apply(b.dataset.id);setTimeout(close,180)}});
 document.addEventListener('pointerdown',function(e){if(!cm.contains(e.target))close()},true);
 addEventListener('blur',close);addEventListener('resize',close);document.addEventListener('scroll',close,true);
 addEventListener('keydown',function(e){
  if(!cm.classList.contains('on'))return;
  if(e.key==='Escape'){close();return}
  if(/^Arrow(Up|Down)$/.test(e.key)){e.preventDefault();var b=[].slice.call(cm.querySelectorAll('button')),i=b.indexOf(document.activeElement);
   b[(i+(e.key==='ArrowDown'?1:-1)+b.length)%b.length].focus()}});
 apply(cur);
})();
