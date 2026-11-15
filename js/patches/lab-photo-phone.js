(function(){
 const R=lab.rig,root=$('#labPhone'),stage=$('.stage',root),cache={};let tok=0;
 const gsh=document.createElement('div');gsh.className='gsh';stage.insertBefore(gsh,stage.firstChild);
 const load=i=>cache[i]||(cache[i]=new Promise(res=>{const src=PHONE_IMG[i];if(!src)return res(null);const im=new Image();im.onerror=()=>res(null);
  im.onload=()=>{try{const w=im.width,h=im.height,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(im,0,0);const a=x.getImageData(0,0,w,h).data;
   const al=(X,Y)=>X<0||Y<0||X>=w||Y>=h?0:a[(Y*w+X)*4+3];let x0=w,y0=h,x1=0,y1=0;
   for(let Y=0;Y<h;Y+=2)for(let X=0;X<w;X+=2)if(a[(Y*w+X)*4+3]>40){if(X<x0)x0=X;if(X>x1)x1=X;if(Y<y0)y0=Y;if(Y>y1)y1=Y}
   x1+=1;y1+=1;let rr=0,gg=0,bb=0,n=0;
   for(let Y=y0;Y<y1;Y+=3)for(let X=x0;X<x1;X+=3){if(al(X,Y)<200)continue;
    if(al(X-3,Y)>200&&al(X+3,Y)>200&&al(X,Y-3)>200&&al(X,Y+3)>200&&(al(X-10,Y)<40||al(X+10,Y)<40||al(X,Y-10)<40||al(X,Y+10)<40)){const k=(Y*w+X)*4;rr+=a[k];gg+=a[k+1];bb+=a[k+2];n++}}
   if(!n){rr=gg=bb=90;n=1}
   res({x0,y0,bw:x1-x0,bh:y1-y0,W:w,H:h,col:[rr/n,gg/n,bb/n]})}catch(e){res(null)}};im.src=src}));
 const sh=(c,k)=>`rgb(${c.map(v=>Math.max(0,Math.min(255,Math.round(v*k+(k>1?(k-1)*80:0))))).join(',')})`;
 /* rounded-rectangle outline, clockwise, N points per corner */
 const outline=(w,h,r,N)=>{const o=[],cs=[[w/2-r,-(h/2-r),-90],[w/2-r,h/2-r,0],[-(w/2-r),h/2-r,90],[-(w/2-r),-(h/2-r),180]];
  cs.forEach(([cx,cy,a0])=>{for(let k=0;k<=N;k++){const a=(a0+90*k/N)*Math.PI/180;o.push([cx+r*Math.cos(a),cy+r*Math.sin(a)])}});return o};
 const LX=-.45,LY=-.85;
 /* a ring of flat strips following the outline = the curved metal wall / bevel */
 function ring(pts,z,hh,tilt,m,front){let o='';
  pts.forEach((p,i)=>{const q=pts[(i+1)%pts.length],dx=q[0]-p[0],dy=q[1]-p[1],L=Math.hypot(dx,dy);if(L<.01)return;
   const mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2,ph=Math.atan2(dy,dx)*180/Math.PI,nl=(dy*LX-dx*LY)/L,k=.55+.55*(nl*.5+.5)*1.15,
   bright=front===0?1:front>0?1.12:.85;
   o+=`<i class="px s" style="width:${(L+1.2).toFixed(2)}px;height:${hh.toFixed(2)}px;margin:${(-hh/2).toFixed(2)}px 0 0 ${(-(L+1.2)/2).toFixed(2)}px;transform:translate3d(${mx.toFixed(2)}px,${my.toFixed(2)}px,${z.toFixed(2)}px) rotateZ(${ph.toFixed(2)}deg) rotateX(${90+tilt}deg);background:linear-gradient(180deg,${sh(m,k*.8*bright)},${sh(m,k*1.3*bright)} 50%,${sh(m,k*.78*bright)})"></i>`});return o}
 async function apply(p){
  const i=P.indexOf(p),t=++tok,inf=await load(i);if(t!==tok)return;
  $$('.px,.tex,.sbtn,.port,.spk',R).forEach(e=>e.remove());
  if(!inf){R.classList.remove('real');return}
  const d=prof(p),fold=d.fold,flip=d.flip,H=fold?462:flip?432:d.H,W=Math.round(H*inf.bw/inf.bh),D=fold?27:flip?26:Math.min(d.D,25);
  const Rr=Math.round(W*(p.brand==='Apple'?.19:.15)),b=Math.min(3.4,D*.17),set=(k,v)=>R.style.setProperty(k,v);
  set('--W',W+'px');set('--H',H+'px');set('--D',D+'px');set('--R',Rr+'px');set('--bv',b+'px');
  set('--tex',`url(${PHONE_IMG[i]})`);set('--ts',`${inf.W*W/inf.bw}px ${inf.H*H/inf.bh}px`);set('--tp',`${-inf.x0*W/inf.bw}px ${-inf.y0*H/inf.bh}px`);set('--fm',sh(inf.col,1.05));
  stage.style.setProperty('--H',H+'px');
  R.dataset.t='';R.classList.add('real');
  $('.bk',R).insertAdjacentHTML('afterbegin','<div class="tex"></div>');
  const m=inf.col,N=8;
  let h=ring(outline(W,H,Rr,N),0,D-2*b,0,m,0);
  [1,-1].forEach(sg=>{h+=ring(outline(W-b,H-b,Math.max(2,Rr-b/2),N),sg*(D/2-b/2),b*1.4142,sg*-45,m,sg)});
  /* real hardware on the straight parts of the sides */
  const btn=(side,top,hh)=>{const y=-H/2+H*top+hh/2,x=side*(W/2+.5);return `<i class="px s sbtn" style="width:${(D*.5).toFixed(1)}px;height:${hh}px;margin:${-hh/2}px 0 0 ${-D*.25}px;transform:translate3d(${x}px,${y}px,0) rotateY(${side*90}deg);background:linear-gradient(90deg,${sh(m,.7)},${sh(m,1.5)} 45%,${sh(m,.65)})"></i>`};
  h+=p.brand==='Apple'?btn(-1,.17,16)+btn(-1,.26,34)+btn(-1,.38,34)+btn(1,.3,58):btn(1,.22,56)+btn(1,.4,34);
  const sw=(W-2*Rr)/2-8;h+=`<i class="px s port" style="width:38px;height:${Math.min(8,D*.4)}px;margin:${-Math.min(8,D*.4)/2}px 0 0 -19px;transform:translate3d(0,${H/2+.4}px,0) rotateX(90deg)"></i>`;
  [-1,1].forEach(sg=>{for(let j=0;j<5;j++){const x=sg*(34+j*9);if(Math.abs(x)<sw)h+=`<i class="px s spk" style="width:4px;height:4px;margin:-2px 0 0 -2px;transform:translate3d(${x}px,${H/2+.4}px,0) rotateX(90deg)"></i>`}});
  R.insertAdjacentHTML('beforeend',h);
 }
 const _set=lab.set;lab.set=function(p){_set.call(this,p);R.classList.remove('real');apply(p)};
 lab.set(P[sel0]);
})();
