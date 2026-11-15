(function(){
/* The WebGL phone is an upgrade. If three.js can't load, WebGL is unavailable, the context is lost or the canvas
   renders blank, the CSS 3D phone (which always works) is switched back on so the phone is never invisible. */
const css={set:lab.set,fin:lab.fin,ex:lab.ex,hl:lab.hl};let dead=0;
function fail(why){if(dead)return;dead=1;try{console.warn('3D lab: using the CSS phone –',why)}catch(e){}
 const r=document.getElementById('labPhone');r.classList.remove('gl');r.querySelectorAll('canvas').forEach(c=>c.remove());
 lab.set=css.set;lab.fin=css.fin;lab.ex=css.ex;lab.hl=css.hl;
 try{lab.set(P[typeof sel0==='number'?sel0:0]);}catch(e){}}
function boot(){if(!window.THREE){return}try{start()}catch(e){fail(e)}}
if(window.THREE)boot();else{const q=document.createElement('script');q.src='https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js';q.onload=boot;q.onerror=()=>{};document.head.appendChild(q)}
function start(){
const T=THREE,root=$('#labPhone'),rigEl=lab.rig,S=lab.s,R2D=Math.PI/180,PI=Math.PI;
const ren=new T.WebGLRenderer({antialias:true,alpha:true});
root.classList.add('gl');
ren.setPixelRatio(Math.min(devicePixelRatio||1,2));ren.outputEncoding=T.sRGBEncoding;ren.toneMapping=T.ACESFilmicToneMapping;ren.toneMappingExposure=1.12;ren.setClearColor(0,0);
const cv=ren.domElement;root.appendChild(cv);cv.addEventListener('webglcontextlost',e=>{e.preventDefault();fail('context lost')});let fr=0;
const scene=new T.Scene(),cam=new T.PerspectiveCamera(28,1,.1,60),rig=new T.Group();scene.add(rig);
/* ---- HDR studio: softboxes baked into a PMREM so glass, metal and lenses reflect real light ---- */
const E=new T.Scene();E.background=new T.Color(0x16141d);
const sb=(w,h,x,y,z,i,c)=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color(c||0xffffff).multiplyScalar(i),side:T.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);E.add(m)};
sb(18,6,0,10,3,8);sb(3,15,-10,1,3,5);sb(3,15,10,0,-1,3.5,0xffe6cc);sb(12,3,0,-8,5,1.8);sb(10,10,0,2,-12,3.5,0xcfe0ff);sb(6,6,6,5,9,5);sb(14,2,0,0,10,2);
scene.environment=new T.PMREMGenerator(ren).fromScene(E,.015).texture;
scene.add(Object.assign(new T.DirectionalLight(0xffffff,.5),{position:new T.Vector3(2,4,6)}));
const sc=document.createElement('canvas');sc.width=sc.height=128;{const x=sc.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(0,0,0,.6)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,128,128)}
const shadow=new T.Mesh(new T.PlaneGeometry(1,1),new T.MeshBasicMaterial({map:new T.CanvasTexture(sc),transparent:true,depthWrite:false}));shadow.rotation.x=-PI/2;scene.add(shadow);
/* ---- helpers ---- */
const ct=(w,h,fn)=>{const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;t.anisotropy=8;return t};
const crr=(x,X,Y,w,h,r)=>{x.beginPath();x.moveTo(X+r,Y);x.arcTo(X+w,Y,X+w,Y+h,r);x.arcTo(X+w,Y+h,X,Y+h,r);x.arcTo(X,Y+h,X,Y,r);x.arcTo(X,Y,X+w,Y,r);x.closePath()};
const rr=(w,h,r)=>{const s=new T.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.absarc(x+w-r,y+r,r,-PI/2,0,false);s.lineTo(x+w,y+h-r);s.absarc(x+w-r,y+h-r,r,0,PI/2,false);s.lineTo(x+r,y+h);s.absarc(x+r,y+h-r,r,PI/2,PI,false);s.lineTo(x,y+r);s.absarc(x+r,y+r,r,PI,PI*1.5,false);return s};
const ext=(s,d,b,bs,cs)=>{const g=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelThickness:b,bevelSize:b,bevelSegments:bs||4,curveSegments:cs||32});g.translate(0,0,-d/2);return g};
const mesh=(g,m,x,y,z)=>{const o=new T.Mesh(g,m);o.position.set(x||0,y||0,z||0);return o};
const lensTex=ct(256,256,x=>{x.fillStyle='#030305';x.fillRect(0,0,256,256);[[120,'#0b1020'],[104,'#1a1240'],[84,'#07142e'],[66,'#2b1050'],[48,'#05060c'],[30,'#0e2a55'],[16,'#020204']].forEach(([r,c])=>{x.beginPath();x.arc(128,128,r,0,7);x.fillStyle=c;x.fill()});
 let g=x.createLinearGradient(40,40,170,170);g.addColorStop(0,'rgba(255,255,255,.6)');g.addColorStop(.4,'rgba(255,255,255,0)');x.fillStyle=g;x.beginPath();x.arc(128,128,112,0,7);x.fill();x.fillStyle='rgba(130,170,255,.55)';x.beginPath();x.arc(96,92,7,0,7);x.fill();x.beginPath();x.arc(160,168,4,0,7);x.fill()});
/* ---- on-screen UI (drawn into the display texture) ---- */
function scr(p,cw,ch){const t=tn(p);return ct(cw,ch,x=>{
 let ac='#2f3cff';try{x.fillStyle=TC[t];ac=x.fillStyle}catch(e){}
 let g=x.createLinearGradient(0,0,cw,ch);g.addColorStop(0,'#1d1850');g.addColorStop(.5,'#0c0c1e');g.addColorStop(1,'#020208');x.fillStyle=g;x.fillRect(0,0,cw,ch);
 g=x.createRadialGradient(cw*.75,ch*.2,0,cw*.75,ch*.2,cw*.85);g.addColorStop(0,ac);g.addColorStop(1,'rgba(0,0,0,0)');x.globalAlpha=.45;x.fillStyle=g;x.fillRect(0,0,cw,ch);x.globalAlpha=1;
 const u=Math.min(cw/640,ch/1325),F="'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif";
 x.save();x.translate((cw-640*u)/2,(ch-1325*u)/2);x.scale(u,u);x.fillStyle='#fff';
 x.font='600 26px '+F;x.textAlign='left';x.fillText('9:41',52,78);x.textAlign='right';x.fillText('5G  86%',588,78);
 x.textAlign='center';x.font="700 150px 'Syne',"+F;x.fillText('9:41',320,330);x.font='500 28px '+F;x.globalAlpha=.7;x.fillText('Sunday, 15 November',320,382);x.globalAlpha=1;
 crr(x,36,450,568,660,40);x.fillStyle='rgba(255,255,255,.08)';x.fill();x.strokeStyle='rgba(255,255,255,.2)';x.lineWidth=2;x.stroke();
 x.textAlign='left';x.fillStyle='#fff';x.font='800 40px '+F;x.fillText(p.name.length>20?p.name.slice(0,19)+'…':p.name,72,525);
 x.fillStyle=ac;x.font='700 22px '+F;x.fillText((p.tier||'').toUpperCase()+'  ·  T-'+t,72,566);
 x.fillStyle='#7dffc4';x.font="700 56px 'Chakra Petch',ui-monospace,monospace";x.fillText(inr(p.price),72,640);
 [['RAM',p.ramGb+' GB'],['BATTERY',p.battery.toLocaleString()+' mAh'],['REAR CAM',p.pc+' MP'],['FRONT CAM',p.fc+' MP']].forEach((v,i)=>{const X=68+(i%2)*258,Y=676+(i>>1)*128;crr(x,X,Y,242,112,22);x.fillStyle='rgba(255,255,255,.08)';x.fill();
  x.fillStyle='rgba(255,255,255,.6)';x.font='600 19px '+F;x.fillText(v[0],X+20,Y+38);x.fillStyle='#fff';x.font='800 33px '+F;x.fillText(v[1],X+20,Y+86)});
 crr(x,68,944,504,100,22);x.fillStyle=ac;x.globalAlpha=.3;x.fill();x.globalAlpha=1;x.fillStyle='#fff';x.font='600 22px '+F;x.fillText('ML SCORE',92,1002);x.textAlign='right';x.font="700 36px 'Chakra Petch',monospace";x.fillText(p.score.toFixed(1)+' pts',548,1004);
 crr(x,230,1272,180,8,4);x.fillStyle='rgba(255,255,255,.75)';x.fill();x.restore();
 x.fillStyle='#000';if(p.brand==='Apple'){crr(x,cw*.5-cw*.14,cw*.03,cw*.28,cw*.08,cw*.04);x.fill()}else{x.beginPath();x.arc(cw/2,cw*.055,cw*.024,0,7);x.fill()}})}
const logoTex=b=>ct(256,128,x=>{x.fillStyle='rgba(255,255,255,.82)';x.textAlign='center';
 if(b==='Apple'){x.translate(128,64);x.beginPath();x.arc(-13,8,26,0,7);x.arc(13,8,26,0,7);x.fill();x.fillRect(-20,-16,40,30);x.globalCompositeOperation='destination-out';x.beginPath();x.arc(38,-4,13,0,7);x.fill();x.globalCompositeOperation='source-over';x.save();x.rotate(-.6);x.beginPath();x.ellipse(6,-34,6,15,0,0,7);x.fillStyle='rgba(255,255,255,.82)';x.fill();x.restore()}
 else{x.font="800 46px 'Syne','Segoe UI',sans-serif";x.fillText(b.toUpperCase(),128,78)}});
/* ---- build one phone ---- */
let mt,parts=[],FR,HL=-1,exV=0,exT=0,born=0,spanW=1.6;
const OFF=[1.15,-1.3,.5,-.55,-.85],mm=g=>{const a=new Set();g.traverse(o=>o.isMesh&&[].concat(o.material).forEach(m=>a.add(m)));return a};
function clear(){while(rig.children.length){const o=rig.children[0];rig.remove(o);o.traverse(n=>{n.geometry&&n.geometry.dispose();n.material&&[].concat(n.material).forEach(m=>{m.map&&m.map!==lensTex&&m.map.dispose();m.dispose()})})}}
function build(p){
 clear();const d=prof(p),c=CAMS[d.cam],L=lens(p),H=3.2,k=H/d.H,w=d.W*k,h=H,dd=d.D*k,Rd=d.R*k,bev=Math.min(.03,dd*.13),wall=.012;spanW=w;
 const metal=()=>new T.MeshStandardMaterial({metalness:1,roughness:.24}),glass=r=>new T.MeshPhysicalMaterial({roughness:r,metalness:.05,clearcoat:1,clearcoatRoughness:.08});
 mt={back:glass(/Apple|Samsung/.test(p.brand)?.42:.18),frame:metal(),cm:metal(),isl:glass(.2),dark:p.brand!=='Apple'};
 const blk=new T.MeshPhysicalMaterial({color:0x040405,roughness:.12,metalness:.2,clearcoat:1,clearcoatRoughness:.05});
 /* hollow machined frame */
 const fs=rr(w-2*bev,h-2*bev,Rd-bev);fs.holes.push(rr(w-2*bev-2*wall,h-2*bev-2*wall,Math.max(.03,Rd-bev-wall)));
 const frameG=new T.Group();frameG.add(mesh(ext(fs,dd-2*bev,bev,6),mt.frame));FR=frameG;
 const bt=(sx,top,len)=>{const y=h/2-h*top-len/2;frameG.add(mesh(new T.BoxGeometry(.022,len,Math.min(.07,dd*.45)),mt.frame,sx*(w/2+.002),y,0))};
 if(p.brand==='Apple'){bt(-1,.17,.09);bt(-1,.26,.15);bt(-1,.38,.15);bt(1,.3,.26)}else{bt(1,.22,.24);bt(1,.4,.15)}
 const flat=(g,m,x,z)=>{const o=mesh(g,m,x,-h/2-.0015,z||0);o.rotation.x=PI/2;frameG.add(o)},ink=new T.MeshBasicMaterial({color:0x020203});
 flat(new T.PlaneGeometry(.17,Math.min(.05,dd*.4)),ink,0);[-1,1].forEach(s=>{for(let j=0;j<5;j++){const x=s*(.2+j*.055);if(Math.abs(x)<w/2-Rd)flat(new T.CircleGeometry(.011,12),ink,x)}});
 /* front glass + display */
 const gw=w-2*wall-.004,gh=h-2*wall-.004,gr=Math.max(.03,Rd-wall-.002),gz=dd/2-.016,slab=(m,z)=>mesh(ext(rr(gw-.012,gh-.012,gr-.006),.012,.004,3),m,0,0,z);
 const sw=gw-.05,sh=gh-.05,sg=new T.ShapeGeometry(rr(sw,sh,gr-.024),32),uv=sg.attributes.uv,ps=sg.attributes.position;for(let i=0;i<uv.count;i++)uv.setXY(i,ps.getX(i)/sw+.5,ps.getY(i)/sh+.5);
 const scrG=new T.Group();scrG.add(slab(blk,gz));
 scrG.add(mesh(sg,new T.MeshBasicMaterial({map:scr(p,640,Math.round(640*sh/sw)),toneMapped:false}),0,0,gz+.0105));
 scrG.add(mesh(sg.clone(),new T.MeshPhysicalMaterial({color:0,roughness:.03,clearcoat:1,clearcoatRoughness:0,transparent:true,blending:T.AdditiveBlending,depthWrite:false}),0,0,gz+.0113));
 /* back glass + logo + seam */
 const backG=new T.Group();backG.add(slab(mt.back,-gz));
 const lg=mesh(new T.PlaneGeometry(.46,.23),new T.MeshStandardMaterial({map:logoTex(p.brand),transparent:true,metalness:.7,roughness:.3,depthWrite:false}),0,h*.04,-(gz+.0104));lg.rotation.y=PI;backG.add(lg);
 if(d.fold||d.flip){const sm=mesh(new T.PlaneGeometry(d.fold?.006:gw*.96,d.fold?gh*.96:.006),ink,0,0,-(gz+.0104));sm.rotation.y=PI;backG.add(sm)}
 /* camera module: raised plateau, machined lens barrels, coated glass, flash */
 const camG=new T.Group();camG.rotation.y=PI;camG.position.z=-(gz+.01);
 const cx=u=>u*k-w/2,cy=v=>h/2-v*k;let base=0;
 if(!c.nb){camG.add(mesh(ext(rr(c.w*k-.008,c.h*k-.008,c.r*k-.004),.012,.005,4),mt.isl,cx(c.x+c.w/2),cy(c.y+c.h/2),0));base=.017}
 const zc=new T.CylinderGeometry(1,1.03,1,48).rotateX(PI/2);
 L.forEach(l=>{const r=l[2]/2*k,X=cx(c.x+l[0]+l[2]/2),Y=cy(c.y+l[1]+l[2]/2),ring=mesh(zc,mt.cm,X,Y,base+.011);ring.scale.set(r,r,.022);camG.add(ring);
  const well=mesh(zc,blk,X,Y,base+.0115);well.scale.set(r*.86,r*.86,.023);camG.add(well);
  camG.add(mesh(new T.CircleGeometry(r*.8,48),new T.MeshPhysicalMaterial({map:lensTex,roughness:.06,metalness:.35,clearcoat:1,clearcoatRoughness:0,envMapIntensity:1.7}),X,Y,base+.0238))});
 if(L!==c.U&&c.F){const fx=cx(c.x+c.F[0]+4),fy=cy(c.y+c.F[1]+4);camG.add(mesh(new T.CircleGeometry(.03,24),new T.MeshStandardMaterial({color:0xfff0c8,emissive:0xffe2a0,emissiveIntensity:.5,roughness:.3}),fx,fy,base+.002))}
 /* internals, visible when exploded */
 const boardG=new T.Group(),pcb=new T.MeshStandardMaterial({color:0x0f4a3c,roughness:.55,metalness:.2}),sil=new T.MeshStandardMaterial({color:0xb9bdc7,metalness:.9,roughness:.35}),chip=new T.MeshStandardMaterial({color:0x15161c,roughness:.4,metalness:.3}),gold=new T.MeshStandardMaterial({color:0xd4a64a,metalness:1,roughness:.3});
 boardG.add(mesh(new T.BoxGeometry(w*.72,h*.3,.014),pcb,0,h*.2,0),mesh(new T.BoxGeometry(.3,.3,.04),sil,-w*.13,h*.22,.025),mesh(new T.BoxGeometry(.24,.17,.028),chip,w*.16,h*.25,.02),mesh(new T.BoxGeometry(.2,.12,.02),chip,w*.16,h*.14,.017));
 for(let i=0;i<14;i++)boardG.add(mesh(new T.BoxGeometry(.03,.018,.012),gold,(i%7-3)*.17*w/1.6,h*.1+(i>6?.04:0),.012));
 const batG=new T.Group();batG.add(mesh(ext(rr(w*.74,h*.34,.06),.035,.008,3),new T.MeshStandardMaterial({color:0xb9bfcf,metalness:.45,roughness:.5}),0,-h*.2,0));
 batG.add(mesh(new T.PlaneGeometry(w*.6,h*.2),new T.MeshStandardMaterial({map:ct(512,256,x=>{x.fillStyle='#e8ebf2';x.fillRect(0,0,512,256);x.fillStyle='#14161f';x.textAlign='center';x.font='800 58px sans-serif';x.fillText(p.battery.toLocaleString()+' mAh',256,110);x.font='600 28px monospace';x.fillText('Li-ion · 3.88 V · Si-C anode',256,165);x.fillRect(40,200,432,6)}),roughness:.6}),0,-h*.2,.0235));
 parts=[scrG,camG,boardG,batG,backG];rig.add(frameG,...parts);born=performance.now();HL=-1;dimAll();lab.fin(d.fin[0],d.fin[1])}
function dimAll(){const set=(g,on)=>mm(g).forEach(m=>{const u=m.userData;if(u.o===undefined){u.o=m.opacity;u.t=m.transparent;u.d=m.depthWrite}m.opacity=on?u.o:u.o*.1;m.transparent=on?u.t:true;m.depthWrite=on?u.d:false;m.needsUpdate=true});
 parts.forEach((g,i)=>set(g,HL<0||HL===i));if(FR)set(FR,HL<0)}
lab.fin=function(b,e){if(!mt)return;const B=new T.Color(b),E2=new T.Color(e),W=new T.Color(0xffffff);
 mt.back.color.copy(B).lerp(E2,.3);mt.frame.color.copy(B).lerp(E2,.55).lerp(W,.28);mt.cm.color.copy(mt.frame.color);mt.isl.color.copy(mt.dark?new T.Color(0x0b0b10):mt.back.color)};
lab.set=function(p){build(p)};
lab.ex=function(on){rigEl.classList.toggle('ex',on);exT=on?1:0;if(!on)this.hl(-1)};
lab.hl=function(i){HL=i;dimAll()};
/* ---- interaction + render loop ---- */
let drag=0,lx,ly,tm,lw=0,lh=0;
cv.onpointerdown=e=>{drag=1;S.t=null;S.auto=0;clearTimeout(tm);lx=e.clientX;ly=e.clientY;cv.setPointerCapture(e.pointerId)};
cv.onpointermove=e=>{if(!drag)return;S.ry+=(e.clientX-lx)*.45;S.rx=Math.max(-85,Math.min(85,S.rx-(e.clientY-ly)*.45));lx=e.clientX;ly=e.clientY};
cv.onpointerup=cv.onpointercancel=()=>{drag=0;tm=setTimeout(()=>S.auto=S.a0,2800)};
cv.onwheel=e=>{e.preventDefault();S.z=Math.max(.5,Math.min(2.4,S.z-e.deltaY*.001))};
(function loop(t){requestAnimationFrame(loop);if(dead||!root.offsetParent||document.hidden||!parts.length)return;
 const W=root.clientWidth,Hh=root.clientHeight;if(W!==lw||Hh!==lh){lw=W;lh=Hh;ren.setSize(W,Hh,false);cam.aspect=W/Hh;cam.updateProjectionMatrix()}
 if(S.t){S.rx+=(S.t[0]-S.rx)*.1;S.ry+=(S.t[1]-S.ry)*.1;if(Math.abs(S.t[0]-S.rx)+Math.abs(S.t[1]-S.ry)<.4)S.t=null}else if(S.auto&&!drag)S.ry+=.4;
 exV+=(exT-exV)*.09;parts.forEach((g,i)=>g.position.z=OFF[i]*exV);
 const tf=Math.tan(cam.fov*R2D/2),ex=1+.5*exV,dist=Math.max(3.2*1.34*ex/2/tf,spanW*1.5*ex/2/(tf*cam.aspect))/S.z;cam.position.set(0,0,dist);cam.lookAt(0,0,0);
 const a=Math.min(1,(performance.now()-born)/450),e=1-Math.pow(1-a,3);rig.scale.setScalar(.9+.1*e);rig.position.y=Math.sin(t*.0012)*.025;
 rig.rotation.set(-S.rx*R2D,S.ry*R2D,0);shadow.position.y=-1.95;shadow.scale.set(spanW*1.7,spanW*.9,1);shadow.material.opacity=.85*e*(1-exV*.4);
 ren.render(scene,cam);
 if(++fr===24){/* sanity check: is anything actually drawn? */const g=ren.getContext(),px=new Uint8Array(4);let lit=0;try{for(let i=1;i<8;i++)for(let j=1;j<8;j++){g.readPixels(Math.floor(cv.width*i/8),Math.floor(cv.height*j/8),1,1,g.RGBA,g.UNSIGNED_BYTE,px);if(px[3]>8)lit++}}catch(e){lit=1}if(!lit)fail('blank canvas')}})(0);
lab.set(P[sel0]);
}
})();
