/* Particle Drift — WebGL full-page background (port of the Originkit component) */
(()=>{
const canvas=document.getElementById('pd');if(!canvas)return;
const MAX_DPR=2,MAX_LINES=8000,EDGE=20;
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* live-tweakable settings: PARTICLE_DRIFT.density = 250 etc. */
const CFG=window.PARTICLE_DRIFT=Object.assign({
 density:400,dotSize:6,speed:50,direction:0,hover:200,linkDistance:230,linkThickness:1,
 dark:{background:'#030509',base:'#FFFFFF',accent:'#FDFF00'},
 light:{background:'#f2eee3',base:'#0d0d12',accent:'#2f3cff'}
},window.PARTICLE_DRIFT||{});

const LINE_VERT=`
precision highp float;
attribute vec2 a_p0;attribute vec2 a_p1;attribute vec2 a_corner;attribute vec3 a_shade;
uniform vec2 uSize;
varying float v_alpha;varying float v_mix;varying float v_off;varying float v_half;
void main(){
  vec2 d=a_p1-a_p0;float len=max(length(d),1e-5);vec2 nrm=vec2(-d.y,d.x)/len;
  float half_=max(a_shade.z*0.5,0.35);float ext=half_+0.75;
  vec2 p=mix(a_p0,a_p1,a_corner.x);p+=nrm*a_corner.y*ext;
  v_alpha=a_shade.x;v_mix=a_shade.y;v_off=a_corner.y*ext;v_half=half_;
  gl_Position=vec4(p.x/uSize.x*2.0-1.0,1.0-p.y/uSize.y*2.0,0.0,1.0);
}`;
const LINE_FRAG=`
precision mediump float;
uniform vec3 uBase,uAccent;
varying float v_alpha;varying float v_mix;varying float v_off;varying float v_half;
void main(){
  float cov=clamp((v_half-abs(v_off))/0.75+0.5,0.0,1.0);
  float a=v_alpha*cov;vec3 col=mix(uBase,uAccent,v_mix);
  gl_FragColor=vec4(col*a,a);
}`;
const DOT_VERT=`
precision highp float;
attribute vec2 a_pos;attribute float a_lit;
uniform vec2 uSize;uniform float uDpr,uDot;
varying float v_lit;
void main(){
  gl_PointSize=max(1.0,uDot*uDpr);v_lit=a_lit;
  gl_Position=vec4(a_pos.x/uSize.x*2.0-1.0,1.0-a_pos.y/uSize.y*2.0,0.0,1.0);
}`;
const DOT_FRAG=`
precision mediump float;
uniform vec3 uBase,uAccent;uniform float uRestAlpha;
varying float v_lit;
void main(){
  float d=length(gl_PointCoord-0.5)*2.0;
  float disc=1.0-smoothstep(0.72,1.0,d);
  vec3 col=mix(uBase,uAccent,v_lit);
  float a=disc*mix(uRestAlpha,1.0,v_lit);
  if(a<=0.004)discard;
  gl_FragColor=vec4(col*a,a);
}`;

const clampN=(v,lo,hi)=>v<lo?lo:v>hi?hi:v;
const num=(v,fb)=>typeof v==='number'&&isFinite(v)?v:fb;
function rng(seed){let a=seed>>>0;return()=>{a+=0x6d2b79f5;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
function parseColor(str,fb){
 if(!str)return fb;str=String(str).trim();
 if(str[0]==='#'){let h=str.slice(1);if(h.length===3||h.length===4)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  if(h.length>=6){const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);if(!isNaN(r+g+b))return[r/255,g/255,b/255]}return fb}
 const m=str.match(/[\d.]+/g);if(m&&m.length>=3)return[Math.min(255,+m[0])/255,Math.min(255,+m[1])/255,Math.min(255,+m[2])/255];return fb}
const CORNERS=[[0,-1],[1,-1],[1,1],[0,-1],[1,1],[0,1]];

let gl,lineProg,dotProg,raf=0,dead=false;
const ptr={x:-10000,y:-10000};

function compile(type,src){const sh=gl.createShader(type);gl.shaderSource(sh,src);gl.compileShader(sh);
 if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS)){console.error('ParticleDrift shader:',gl.getShaderInfoLog(sh));return null}return sh}
function link(vs,fs){const a=compile(gl.VERTEX_SHADER,vs),b=compile(gl.FRAGMENT_SHADER,fs);if(!a||!b)return null;
 const p=gl.createProgram();gl.attachShader(p,a);gl.attachShader(p,b);gl.linkProgram(p);
 if(!gl.getProgramParameter(p,gl.LINK_STATUS)){console.error('ParticleDrift link:',gl.getProgramInfoLog(p));return null}return p}

function start(){
 gl=canvas.getContext('webgl',{alpha:true,antialias:false,depth:false,premultipliedAlpha:true});
 if(!gl){console.warn('ParticleDrift: WebGL unavailable');return}
 lineProg=link(LINE_VERT,LINE_FRAG);dotProg=link(DOT_VERT,DOT_FRAG);if(!lineProg||!dotProg)return;

 const U={L:{},D:{}},A={};
 ['uSize','uBase','uAccent'].forEach(n=>U.L[n]=gl.getUniformLocation(lineProg,n));
 ['uSize','uDpr','uDot','uRestAlpha','uBase','uAccent'].forEach(n=>U.D[n]=gl.getUniformLocation(dotProg,n));
 ['a_p0','a_p1','a_corner','a_shade'].forEach(n=>A[n]=gl.getAttribLocation(lineProg,n));
 A.pos=gl.getAttribLocation(dotProg,'a_pos');A.lit=gl.getAttribLocation(dotProg,'a_lit');

 const lP0=new Float32Array(MAX_LINES*12),lP1=new Float32Array(MAX_LINES*12),lCorner=new Float32Array(MAX_LINES*12),lShade=new Float32Array(MAX_LINES*18);
 for(let e=0;e<MAX_LINES;e++)for(let c=0;c<6;c++){const k=(e*6+c)*2;lCorner[k]=CORNERS[c][0];lCorner[k+1]=CORNERS[c][1]}
 const bP0=gl.createBuffer(),bP1=gl.createBuffer(),bCorner=gl.createBuffer(),bShade=gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER,bP0);gl.bufferData(gl.ARRAY_BUFFER,lP0.byteLength,gl.DYNAMIC_DRAW);
 gl.bindBuffer(gl.ARRAY_BUFFER,bP1);gl.bufferData(gl.ARRAY_BUFFER,lP1.byteLength,gl.DYNAMIC_DRAW);
 gl.bindBuffer(gl.ARRAY_BUFFER,bCorner);gl.bufferData(gl.ARRAY_BUFFER,lCorner,gl.STATIC_DRAW);
 gl.bindBuffer(gl.ARRAY_BUFFER,bShade);gl.bufferData(gl.ARRAY_BUFFER,lShade.byteLength,gl.DYNAMIC_DRAW);

 const R=rng(20260824);
 let nCount=0,nx,ny,nSpd,gPos,gLit;const bGPos=gl.createBuffer(),bGLit=gl.createBuffer();
 const build=(n,w,h)=>{nCount=n;nx=new Float32Array(n);ny=new Float32Array(n);nSpd=new Float32Array(n);gPos=new Float32Array(n*2);gLit=new Float32Array(n);
  for(let i=0;i<n;i++){nx[i]=R()*w;ny[i]=R()*h;nSpd[i]=(R()*0.4+0.1)*60}
  gl.bindBuffer(gl.ARRAY_BUFFER,bGPos);gl.bufferData(gl.ARRAY_BUFFER,gPos.byteLength,gl.DYNAMIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER,bGLit);gl.bufferData(gl.ARRAY_BUFFER,gLit.byteLength,gl.DYNAMIC_DRAW)};

 let last=performance.now(),builtN=-1,builtW=0,builtH=0;const colCache={};
 const col=(s,fb)=>colCache[s]||(colCache[s]=parseColor(s,fb));

 const render=now=>{
  raf=requestAnimationFrame(render);
  if(document.hidden){last=now;return}
  const dt=Math.min(0.05,(now-last)/1000);last=now;
  const dark=document.documentElement.dataset.theme==='dark',pal=dark?CFG.dark:CFG.light;
  const density=Math.round(clampN(num(CFG.density,400),10,400)),dotSize=clampN(num(CFG.dotSize,6),1,24),
   sp=RM?0:clampN(num(CFG.speed,50),0,100)/50,hv=clampN(num(CFG.hover,200),0,200)/100,
   LINKD=clampN(num(CFG.linkDistance,230),0,400),LINKW=clampN(num(CFG.linkThickness,1),0.5,8);

  const dpr=Math.min(window.devicePixelRatio||1,MAX_DPR),cw=canvas.clientWidth||innerWidth,ch=canvas.clientHeight||innerHeight;
  const bw=Math.max(1,Math.round(cw*dpr)),bh=Math.max(1,Math.round(ch*dpr));
  if(canvas.width!==bw||canvas.height!==bh){canvas.width=bw;canvas.height=bh}
  gl.viewport(0,0,bw,bh);

  if(density!==builtN){build(density,cw,ch);builtN=density}
  if(cw!==builtW||ch!==builtH){const sx=cw/Math.max(builtW||cw,1),sy=ch/Math.max(builtH||ch,1);
   for(let i=0;i<nCount;i++){nx[i]*=sx;ny[i]*=sy}builtW=cw;builtH=ch}

  const reach=180*(hv>0?1:0),th=(clampN(num(CFG.direction,0),0,360)*Math.PI)/180,dirX=Math.sin(th),dirY=Math.cos(th);
  let lines=0;
  const pushLine=(x0,y0,x1,y1,a0,a1,mix,wpx)=>{
   if(lines>=MAX_LINES)return;
   for(let c=0;c<6;c++){const k=(lines*6+c)*2,s3=(lines*6+c)*3;
    lP0[k]=x0;lP0[k+1]=y0;lP1[k]=x1;lP1[k+1]=y1;
    lShade[s3]=CORNERS[c][0]===0?a0:a1;lShade[s3+1]=mix;lShade[s3+2]=wpx}
   lines++};

  for(let i=0;i<nCount;i++){
   nx[i]+=nSpd[i]*dirX*dt*sp;ny[i]+=nSpd[i]*dirY*dt*sp;
   if(nx[i]<-EDGE){nx[i]=cw+EDGE;ny[i]=R()*ch}else if(nx[i]>cw+EDGE){nx[i]=-EDGE;ny[i]=R()*ch}
   if(ny[i]<-EDGE){ny[i]=ch+EDGE;nx[i]=R()*cw}else if(ny[i]>ch+EDGE){ny[i]=-EDGE;nx[i]=R()*cw}
   const dx=ptr.x-nx[i],dy=ptr.y-ny[i],d=Math.sqrt(dx*dx+dy*dy),lit=reach>0&&d<reach?1:0;
   if(lit===1){const a=0.5*(1-d/reach)*hv;pushLine(nx[i],ny[i],ptr.x,ptr.y,a,a,1,LINKW)}
   gPos[i*2]=nx[i];gPos[i*2+1]=ny[i];gLit[i]=lit}

  if(LINKD>0){const l2=LINKD*LINKD;
   for(let i=0;i<nCount&&lines<MAX_LINES;i++)for(let j=i+1;j<nCount&&lines<MAX_LINES;j++){
    const dx=nx[i]-nx[j],dy=ny[i]-ny[j],dd=dx*dx+dy*dy;if(dd>=l2)continue;
    const a=0.15*(1-Math.sqrt(dd)/LINKD);pushLine(nx[i],ny[i],nx[j],ny[j],a,a,0,LINKW)}}

  gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.disable(gl.DEPTH_TEST);gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
  const cb=col(pal.base,[1,1,1]),ca=col(pal.accent,[.376,.647,.98]);

  if(lines>0){gl.useProgram(lineProg);const v=lines*6;
   gl.bindBuffer(gl.ARRAY_BUFFER,bP0);gl.bufferSubData(gl.ARRAY_BUFFER,0,lP0.subarray(0,v*2));gl.enableVertexAttribArray(A.a_p0);gl.vertexAttribPointer(A.a_p0,2,gl.FLOAT,false,0,0);
   gl.bindBuffer(gl.ARRAY_BUFFER,bP1);gl.bufferSubData(gl.ARRAY_BUFFER,0,lP1.subarray(0,v*2));gl.enableVertexAttribArray(A.a_p1);gl.vertexAttribPointer(A.a_p1,2,gl.FLOAT,false,0,0);
   gl.bindBuffer(gl.ARRAY_BUFFER,bCorner);gl.enableVertexAttribArray(A.a_corner);gl.vertexAttribPointer(A.a_corner,2,gl.FLOAT,false,0,0);
   gl.bindBuffer(gl.ARRAY_BUFFER,bShade);gl.bufferSubData(gl.ARRAY_BUFFER,0,lShade.subarray(0,v*3));gl.enableVertexAttribArray(A.a_shade);gl.vertexAttribPointer(A.a_shade,3,gl.FLOAT,false,0,0);
   gl.uniform2f(U.L.uSize,cw,ch);gl.uniform3f(U.L.uBase,cb[0],cb[1],cb[2]);gl.uniform3f(U.L.uAccent,ca[0],ca[1],ca[2]);
   gl.drawArrays(gl.TRIANGLES,0,v);
   gl.disableVertexAttribArray(A.a_p0);gl.disableVertexAttribArray(A.a_p1);gl.disableVertexAttribArray(A.a_corner);gl.disableVertexAttribArray(A.a_shade)}

  if(nCount>0){gl.useProgram(dotProg);
   gl.bindBuffer(gl.ARRAY_BUFFER,bGPos);gl.bufferSubData(gl.ARRAY_BUFFER,0,gPos);gl.enableVertexAttribArray(A.pos);gl.vertexAttribPointer(A.pos,2,gl.FLOAT,false,0,0);
   gl.bindBuffer(gl.ARRAY_BUFFER,bGLit);gl.bufferSubData(gl.ARRAY_BUFFER,0,gLit);gl.enableVertexAttribArray(A.lit);gl.vertexAttribPointer(A.lit,1,gl.FLOAT,false,0,0);
   gl.uniform2f(U.D.uSize,cw,ch);gl.uniform1f(U.D.uDpr,dpr);gl.uniform1f(U.D.uDot,dotSize);gl.uniform1f(U.D.uRestAlpha,dark?0.4:0.5);
   gl.uniform3f(U.D.uBase,cb[0],cb[1],cb[2]);gl.uniform3f(U.D.uAccent,ca[0],ca[1],ca[2]);
   gl.drawArrays(gl.POINTS,0,nCount);gl.disableVertexAttribArray(A.pos);gl.disableVertexAttribArray(A.lit)}
 };
 raf=requestAnimationFrame(render);
}

/* The canvas sits behind the page and ignores the mouse, so the pointer is tracked on the window. */
addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();if(r.width<=0||r.height<=0)return;
 const cw=canvas.clientWidth||innerWidth,ch=canvas.clientHeight||innerHeight;
 ptr.x=((e.clientX-r.left)/r.width)*cw;ptr.y=((e.clientY-r.top)/r.height)*ch},{passive:true});
const off=()=>{ptr.x=-10000;ptr.y=-10000};
document.addEventListener('pointerleave',off);document.documentElement.addEventListener('mouseleave',off);addEventListener('blur',off);
addEventListener('pointerup',e=>{if(e.pointerType==='touch')off()});addEventListener('pointercancel',off);
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(raf)});
canvas.addEventListener('webglcontextrestored',start);
start();
})();
