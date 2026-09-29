function scene3d(id,build,z){const c=document.getElementById(id),r=new THREE.WebGLRenderer({canvas:c,alpha:true,antialias:true}),s=new THREE.Scene(),cam=new THREE.PerspectiveCamera(45,1,.1,100);
cam.position.set(0,3,z||10);cam.lookAt(0,0,0);s.add(new THREE.AmbientLight(0xffffff,.7));const l=new THREE.PointLight(0x4fd1ff,1.5);l.position.set(6,8,8);s.add(l);
const g=new THREE.Group();s.add(g);const tick=build(g)||(()=>{});let my=0,vis=true;
c.addEventListener('pointermove',e=>{const b=c.getBoundingClientRect();my=(e.clientY-b.top)/b.height-.5});
new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(c);
const rs=()=>{r.setPixelRatio(Math.min(devicePixelRatio,2));r.setSize(c.clientWidth,c.clientHeight,false);cam.aspect=c.clientWidth/c.clientHeight;cam.updateProjectionMatrix()};addEventListener('resize',rs);rs();
(function loop(t){requestAnimationFrame(loop);if(!vis)return;g.rotation.y+=.005;g.rotation.x+=(my*.7-g.rotation.x)*.05;tick(t/1000,g);r.render(s,cam)})(0)}
const M=(c,o)=>new THREE.MeshStandardMaterial(Object.assign({color:c,metalness:.4,roughness:.35},o||{}));
const box=(w,h,d,m,x,y,z)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.position.set(x||0,y||0,z||0);return b};
function label(txt,col){const cv=document.createElement('canvas');cv.width=512;cv.height=96;const x=cv.getContext('2d');x.font='bold 44px sans-serif';x.fillStyle=col||'#fff';x.textBaseline='middle';x.fillText(txt,8,48);
const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(cv),transparent:true}));sp.scale.set(5.3,1,1);return sp}
scene3d('c-hero',g=>{g.add(box(4,.5,4,M(0x101a30)));g.add(box(2.2,.3,2.2,M(0x4fd1ff,{emissive:0x1a6f8f}),0,.4,0));g.add(box(1.2,.2,1.2,M(0x9b7bff,{emissive:0x4a2fb0}),0,.65,0));
for(let i=0;i<9;i++)for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]]){g.add(a?box(.5,.06,.16,M(0xd0d8ec),a*2.25,0,-1.6+i*.4):box(.16,.06,.5,M(0xd0d8ec),-1.6+i*.4,0,b*2.25))}
const w=new THREE.Mesh(new THREE.TorusGeometry(3.6,.03,8,80),M(0x4fd1ff,{emissive:0x4fd1ff}));w.rotation.x=Math.PI/2;g.add(w);
const cubes=[];for(let i=0;i<6;i++){const c=box(.5,.5,.5,M(i%2?0x9b7bff:0x4fd1ff,{emissive:0x113355}));g.add(c);cubes.push(c)}
return t=>{cubes.forEach((c,i)=>{const a=t+i*1.047;c.position.set(Math.cos(a)*3.6,Math.sin(t*2+i)*.4,Math.sin(a)*3.6);c.rotation.y=t})}},13);
scene3d('c-layers',g=>{const L=[['Aplicaciones',0x9b7bff],['Sistema operativo (kernel)',0x4fd1ff],['Firmware / Drivers',0x3ddc97],['Hardware: CPU · RAM · E/S',0xff6b81]],ms=[];
L.forEach((l,i)=>{const m=box(4.4,.6,3,M(l[1],{transparent:true,opacity:.9}),0,1.8-i*1.2,0);g.add(m);ms.push(m);const s=label(l[0]);s.position.set(4.4,1.8-i*1.2,0);g.add(s)});
return t=>ms.forEach((m,i)=>m.position.y=1.8-i*1.2+Math.sin(t*1.5+i)*.12)},12);
scene3d('c-virt',g=>{g.add(box(9,.4,3.6,M(0x101a30),0,-2,0));g.add(box(4,.3,3,M(0x4fd1ff,{emissive:0x0e4f66}),-2.4,-1.5,0));
for(let i=0;i<3;i++){g.add(box(1.1,2.2,2.6,M(0x9b7bff,{transparent:true,opacity:.55}),-3.6+i*1.2,-.2,0));g.add(box(.8,.5,2,M(0xffffff),-3.6+i*1.2,-.8,0));g.add(box(.8,.5,2,M(0xff6b81),-3.6+i*1.2,.1,0))}
g.add(box(4,.3,3,M(0x3ddc97,{emissive:0x0f5533}),2.4,-1.5,0));const cs=[];
for(let i=0;i<6;i++){const c=box(.9,.9,.9,M(0xffd166,{emissive:0x553d00}),1.2+(i%3)*1.2,-.7+Math.floor(i/3)*1.05,0);g.add(c);cs.push(c)}
const a=label('VM','#4fd1ff'),b=label('Contenedores','#3ddc97');a.position.set(-2.4,2,0);b.position.set(2.4,2.4,0);a.scale.set(3,.6,1);b.scale.set(5,.9,1);g.add(a,b);
return t=>cs.forEach((c,i)=>c.rotation.y=t+i)},16);
document.getElementById('m-go').onclick=()=>{const R=document.getElementById('m-ref').value.split(/[,\s]+/).filter(Boolean).map(Number),F=+document.getElementById('m-fr').value,A=document.getElementById('m-alg').value;
if(!R.length||R.some(isNaN)||F<1)return alert('Revisa los datos');let fr=[],cols=[],faults=0,last={};
R.forEach((p,i)=>{let hit=fr.includes(p);if(!hit){faults++;if(fr.length<F)fr.push(p);else{let v=0;
if(A=='LRU'){fr.forEach((q,k)=>{if(last[q]<last[fr[v]])v=k})}
else if(A!='FIFO'){let far=-1;fr.forEach((q,k)=>{let n=R.indexOf(q,i+1);if(n<0)n=1e9;if(n>far){far=n;v=k}})}
if(A=='FIFO'){fr.shift();fr.push(p)}else fr[v]=p}}
last[p]=i;cols.push({p,hit,fr:[...fr]})});
let h='<table><tr><th>Ref</th>'+cols.map(c=>`<th>${c.p}</th>`).join('')+'</tr>';
for(let k=0;k<F;k++)h+=`<tr><th>Marco ${k+1}</th>`+cols.map(c=>`<td>${c.fr[k]??''}</td>`).join('')+'</tr>';
h+='<tr><th>Estado</th>'+cols.map(c=>`<td class="${c.hit?'h':'f'}">${c.hit?'Acierto':'Fallo'}</td>`).join('')+'</tr></table>';
h+=`<p class="res"><b>${faults}</b> fallos de página de ${R.length} referencias (tasa de fallos ${(faults/R.length*100).toFixed(1)} %).</p>`;
document.getElementById('m-out').innerHTML=h};
const pick=(q,f)=>{let m=0;q.forEach((p,i)=>{if(f(p)<f(q[m]))m=i});return q.splice(m,1)[0]};
document.getElementById('s-go').onclick=()=>{const alg=document.getElementById('s-alg').value,Q=+document.getElementById('s-q').value||1;
const ps=document.getElementById('s-in').value.split(',').map(x=>x.trim().split(':')).filter(x=>x.length==3).map(x=>({n:x[0],a:+x[1],b:+x[2],rem:+x[2],fin:0}));
if(!ps.length||ps.some(p=>isNaN(p.a)||!(p.b>0)))return alert('Formato: P1:0:5, P2:1:3');
let t=0,cur=null,qc=0,done=0,q=[],seen=new Set(),g=[];
while(done<ps.length){ps.forEach(p=>{if(p.a<=t&&!seen.has(p.n)){seen.add(p.n);q.push(p)}});
if(alg=='RR'&&cur&&qc>=Q){q.push(cur);cur=null}
if(alg=='SRTF'&&cur){q.push(cur);cur=null}
if(!cur&&q.length){cur=alg=='FCFS'||alg=='RR'?q.shift():pick(q,p=>alg=='SJF'?p.b:p.rem);qc=0}
if(cur){g.push(cur.n);cur.rem--;qc++;if(!cur.rem){cur.fin=t+1;done++;cur=null}}else g.push('-');t++}
const col={};ps.forEach((p,i)=>col[p.n]=['#4fd1ff','#9b7bff','#3ddc97','#ffd166','#ff6b81','#ff9f43'][i%6]);col['-']='#3a4560';
let bl=[];g.forEach(n=>{if(bl.length&&bl[bl.length-1][0]==n)bl[bl.length-1][1]++;else bl.push([n,1])});
let h='<div class="gantt">'+bl.map(b=>`<div style="flex:${b[1]};background:${col[b[0]]}">${b[0]=='-'?'':b[0]}</div>`).join('')+'</div>';
h+='<div class="sc"><table><tr><th>Proceso</th><th>Llegada</th><th>Ráfaga</th><th>Fin</th><th>Retorno</th><th>Espera</th></tr>';
let tw=0,tt=0;ps.forEach(p=>{const r=p.fin-p.a,w=r-p.b;tw+=w;tt+=r;h+=`<tr><td>${p.n}</td><td>${p.a}</td><td>${p.b}</td><td>${p.fin}</td><td>${r}</td><td>${w}</td></tr>`});
h+=`</table></div><p class="res">Espera promedio: <b>${(tw/ps.length).toFixed(2)}</b> · Retorno promedio: <b>${(tt/ps.length).toFixed(2)}</b> · Tiempo total: ${t}</p>`;
document.getElementById('s-out').innerHTML=h};
document.getElementById('m-go').click();document.getElementById('s-go').click();
