/* UI sounds, synthesised with Web Audio (no audio files):
   1. a short mechanical "deck" clack when the visitor switches to a different tab
   2. the full-screen brand transition: whoosh + impact + a signature sound per brand (9 brands = 9 tabs:
      Apple, Samsung, Xiaomi, OPPO, vivo, OnePlus, Pixel, Nothing, realme), and a closing whoosh as it leaves.
   3. the "One last thing…" tab flashes through all 9 brands, so it plays all 9 signature sounds in sequence.
   Nothing plays on page load or for other buttons (browsers need one click/touch first before they allow audio). */
(function(){
 var ctx=null,noise=null;
 function boot(){if(ctx)return;try{var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;ctx=new AC();
  var n=Math.floor(ctx.sampleRate*.05),b=ctx.createBuffer(1,n,ctx.sampleRate),d=b.getChannelData(0);for(var i=0;i<n;i++)d[i]=Math.random()*2-1;noise=b}catch(e){ctx=null}}
 /* browsers only allow audio after a gesture, so prepare it on the first touch/click/key */
 ['pointerdown','keydown','touchstart'].forEach(function(ev){addEventListener(ev,function(){boot();if(ctx&&ctx.state==='suspended')ctx.resume()},{passive:true})});
 function burst(t,freq,q,vol,len){var s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=noise;f.type='bandpass';f.frequency.value=freq;f.Q.value=q;
  g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+len);s.connect(f);f.connect(g);g.connect(ctx.destination);s.start(t);s.stop(t+len+.01)}
 function thunk(t,f0,f1,vol,len,type){var o=ctx.createOscillator(),g=ctx.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+len);
  g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+len*1.2);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+len*1.3)}
 function clack(){if(!ctx||ctx.state!=='running')return;var t=ctx.currentTime+.005;
  burst(t,2600,1.1,.34,.035);thunk(t,180,55,.5,.09);            /* press */
  burst(t+.06,1500,1.4,.22,.03);thunk(t+.06,340,130,.16,.05,'triangle') /* release */}

 /* ---- brand transition (the full-screen animation between tabs) ---- */
 function sweep(t,f0,f1,len,peak,q,att){var s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=loopNoise();s.loop=true;
  f.type='bandpass';f.Q.value=q||.9;f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(f1,t+len);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(peak,t+(att||len*.35));g.gain.exponentialRampToValueAtTime(.0001,t+len);
  s.connect(f);f.connect(g);g.connect(ctx.destination);s.start(t);s.stop(t+len+.02)}
 var ln=null;function loopNoise(){if(ln)return ln;var n=Math.floor(ctx.sampleRate*1),b=ctx.createBuffer(1,n,ctx.sampleRate),d=b.getChannelData(0);for(var i=0;i<n;i++)d[i]=Math.random()*2-1;return ln=b}
 function tone(t,f,len,vol,type){var o=ctx.createOscillator(),g=ctx.createGain();o.type=type||'sine';o.frequency.value=f;
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.04);g.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+len+.02)}

 /* ---- nine signature sounds, one per brand (original sketches, not real brand jingles) ---- */
 function note(t,f,len,vol,type,glideTo){var o=ctx.createOscillator(),g=ctx.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(glideTo)o.frequency.exponentialRampToValueAtTime(glideTo,t+len*.7);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+len+.02)}
 var SIG={
  apple:function(t){note(t,1046.5,.9,.14,'sine');note(t+.11,1568,1.1,.12,'sine');note(t+.11,3136,.6,.025,'sine')},                       /* soft two-note chime */
  samsung:function(t){[523.25,659.25,783.99,1046.5].forEach(function(f,i){note(t+i*.07,f,.5,.11,'sine');note(t+i*.07,f*2,.22,.03,'sine')});note(t+.32,500,.18,.07,'sine',1500)}, /* water-drop arpeggio */
  xiaomi:function(t){note(t,880,.09,.085,'square');note(t+.09,1320,.13,.085,'square');thunk(t+.2,260,90,.25,.1)},                       /* playful blips + pop */
  oppo:function(t){[523.25,659.25,783.99,987.77,1318.5].forEach(function(f,i){note(t+i*.06,f,.55,.09,'triangle')});burst(t+.3,5000,1,.04,.25)}, /* harp ripple */
  vivo:function(t){burst(t,3200,2,.3,.02);burst(t+.05,1800,2,.25,.03);note(t+.12,300,.3,.07,'sine',900)},                                 /* camera shutter + focus */
  oneplus:function(t){thunk(t,420,70,.45,.35,'sawtooth');burst(t,900,1,.22,.08);note(t+.18,110,.45,.18,'sine')},                          /* punchy bass hit */
  pixel:function(t){[392,493.9,587.3,783.99].forEach(function(f,i){note(t+i*.08,f,.38,.1,'triangle');note(t+i*.08,f*4,.1,.02,'sine')})},   /* colourful marimba */
  nothing:function(t){note(t,1500,.05,.06,'square');note(t+.1,1500,.05,.06,'square');note(t+.2,2200,.07,.06,'square');burst(t+.3,4000,2,.1,.02)}, /* dot-matrix beeps */
  realme:function(t){note(t,260,.26,.12,'triangle',880);note(t+.22,1760,.2,.05,'sine');note(t+.3,2349,.25,.035,'sine')}                    /* bouncy leap */
 };
 function sig(b,t){var f=SIG[b];if(f)f(t)}
 function transitionIn(b){if(!ctx||ctx.state!=='running')return;var t=ctx.currentTime+.01;
  sweep(t,220,4200,.5,.2,.8,.3);                 /* whoosh in */
  thunk(t+.16,130,42,.3,.4);                      /* soft impact as the title lands */
  sig(b,t+.16)}                                   /* the brand's own sound */
 function transitionOut(delay){if(!ctx||ctx.state!=='running')return;sweep(ctx.currentTime+Math.max(0,delay),3600,260,.42,.16,.9,.12)}
 /* "One last thing…": brands flash by at these gaps (ms) – play each brand's sound as its card appears, then a warm closing chord */
 var GAPS=[560,520,480,440,400,360,330,300,280],BR=['apple','samsung','xiaomi','oppo','vivo','oneplus','pixel','nothing','realme'];
 function lastSounds(){if(!ctx||ctx.state!=='running')return;var t=0,ok=function(){var e=document.getElementById('ti');return e&&e.classList.contains('ti-last')};
  BR.forEach(function(b,i){setTimeout(function(){if(ok()&&ctx.state==='running'){var n=ctx.currentTime+.01;sweep(n,300,2600,.22,.07,1,.12);sig(b,n+.02)}},t);t+=GAPS[i]});
  setTimeout(function(){if(ctx.state!=='running')return;var n=ctx.currentTime+.02;transitionOut(0);[523.25,659.25,783.99,1046.5].forEach(function(f,i){note(n+.12+i*.03,f,1.4,.05,'sine')})},t+100)}
 var _ti=window.tiPlay,TB=typeof TI_B!=='undefined'?TI_B:{};
 if(typeof _ti==='function')window.tiPlay=function(id,o){
  var b=(o&&o.b)||(typeof tiForce==='string'&&tiForce)||(TB[id]&&TB[id][0])||null,had=document.getElementById('ti'),r=_ti.apply(this,arguments),now=document.getElementById('ti');
  if(id==='last'){lastSounds();return r}
  if(now&&now!==had){transitionIn(b);var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,x=(typeof TIX==='number'&&TIX>0)?TIX:1,dur=rm?600:Math.round(2500/x)+120;transitionOut(dur/1000-.3)}return r};
 window.UI_SFX={play:function(b){boot();if(ctx&&ctx.state==='suspended')ctx.resume();if(ctx)sig(b,ctx.currentTime+.01)},brands:BR};
 function cur(){var e=document.querySelector('.tab.on');return e&&e.id}
 var _show=window.show;if(typeof _show!=='function')return;
 window.show=function(){var a=cur(),r=_show.apply(this,arguments),b=cur();if(a&&b&&a!==b)clack();return r};
})();
