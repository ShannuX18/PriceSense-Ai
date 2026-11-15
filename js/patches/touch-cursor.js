(function(){
 if(!('ontouchstart' in window))return;
 var tc=document.getElementById('tc');
 function mv(x,y){tc.style.transform='translate3d('+x+'px,'+y+'px,0)'}
 document.addEventListener('touchstart',function(e){var t=e.touches[0];mv(t.clientX,t.clientY);tc.classList.add('on');
  var r=document.createElement('i');r.className='tp';r.style.left=t.clientX+'px';r.style.top=t.clientY+'px';document.body.appendChild(r);setTimeout(function(){r.remove()},650)},{passive:true});
 document.addEventListener('touchmove',function(e){var t=e.touches[0];mv(t.clientX,t.clientY)},{passive:true});
 function end(){tc.classList.remove('on')}
 document.addEventListener('touchend',end,{passive:true});document.addEventListener('touchcancel',end,{passive:true});
})();
