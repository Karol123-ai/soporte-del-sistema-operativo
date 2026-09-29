const C=['#4fd1ff','#9b7bff','#3ddc97','#ffd166','#ff6b81'];
const svg=b=>`<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,Arial" font-size="13" text-anchor="middle"><defs><marker id="ar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0L8,4L0,8z" fill="#8fa0c4"/></marker></defs>${b}</svg>`;
const tx=(t,x,y,c)=>t.split('|').map((s,k,l)=>`<text x="${x}" y="${y+4+(k-(l.length-1)/2)*15}" fill="${c||'#e8eefc'}">${s}</text>`).join('');
const flow=a=>svg(a.map((t,i)=>{const w=(380-(a.length-1)*22)/a.length,x=10+i*(w+22);return `<rect x="${x}" y="80" width="${w}" height="60" rx="10" fill="${C[i%5]}22" stroke="${C[i%5]}"/>${tx(t,x+w/2,110)}${i?`<line x1="${x-20}" y1="110" x2="${x-3}" y2="110" stroke="#8fa0c4" stroke-width="2" marker-end="url(#ar)"/>`:''}`}).join(''));
const stack=a=>{const h=(200-(a.length-1)*8)/a.length;return svg(a.map((t,i)=>`<rect x="30" y="${10+i*(h+8)}" width="340" height="${h}" rx="10" fill="${C[i%5]}22" stroke="${C[i%5]}"/>${tx(t,200,10+i*(h+8)+h/2)}`).join(''))};
const bar=(a,tk)=>{const T=a.reduce((s,x)=>s+x[1],0),k=380/T;let x=10,t=0;return svg(a.map((p,i)=>{const w=p[1]*k,g=p[2]=='g',r=`<rect x="${x}" y="80" width="${w}" height="50" ${g?'fill="none" stroke="#8fa0c4" stroke-dasharray="4"':`fill="${C[i%5]}" opacity=".9"`}/>${tx(p[0],x+w/2,105,g?'#8fa0c4':'#04121c')}${tk?`<text x="${x}" y="150" fill="#8fa0c4" font-size="11">${t}</text>`:''}`;x+=w;t+=p[1];return r}).join('')+(tk?`<text x="${x}" y="150" fill="#8fa0c4" font-size="11" text-anchor="end">${t}</text>`:''))};
const chips=a=>svg(a.map((t,i)=>{const x=10+(i%2)*195,y=15+Math.floor(i/2)*48;return `<rect x="${x}" y="${y}" width="185" height="38" rx="19" fill="${C[i%5]}22" stroke="${C[i%5]}"/>${tx(t,x+92,y+19)}`}).join(''));
const VIS={
'asignacion':()=>bar([['SO',2],['Proc A',3],['Proc B',2],['Proc C',3],['Libre',2,'g']]),
'segmentacion':()=>bar([['Código',3],['Datos',2],['Funciones',4],['Pila',2]]),
'fragmentacion':()=>bar([['P1',2],['libre',1,'g'],['P2',3],['libre',1,'g'],['P3',2],['libre',1,'g']]),
'swapping':()=>flow(['RAM','Proceso|inactivo','Disco|(swap)']),
'proteccion':()=>flow(['Proceso A','SO|protección','Memoria|de B']),
'scheduling':()=>flow(['Procesos|listos','Scheduler','CPU']),
'fcfs':()=>bar([['P1',5],['P2',3],['P3',8]],1),
'sjf':()=>bar([['P2',3],['P3',5],['P1',8]],1),
'prioridades':()=>stack(['Prioridad 1 · P3','Prioridad 2 · P1','Prioridad 3 · P2']),
'cambio-contexto':()=>flow(['Proceso A','Guardar|estado','Cargar|estado','Proceso B']),
'capas':()=>stack(['Usuario','Aplicaciones','Sistema operativo','Drivers','Hardware']),
'drivers':()=>flow(['SO','Driver','Dispositivo']),
'interrupciones':()=>flow(['Teclado','Interrupción','CPU','SO']),
'system-calls':()=>flow(['Aplicación','System call','Kernel','Hardware']),
'virtualizacion':()=>stack(['VM 1  ·  VM 2  ·  VM 3','Hipervisor','Hardware físico']),
'hipervisor':()=>flow(['Hardware','Hipervisor','VM 1|VM 2']),
'ventajas-desventajas':()=>chips(['Aprovecha recursos','Aislamiento','Varios SO','Snapshots','Más consumo','Más complejidad','Sobrecarga','Depende del hardware']),
'docker':()=>flow(['Dockerfile','Imagen','Contenedor']),
'kubernetes':()=>flow(['Contenedores','Kubernetes','Escalado|Balanceo']),
'cloud-os':()=>stack(['Usuario · Internet','Servicios cloud','VMs / Contenedores','Servidores físicos']),
'iaas-paas-saas':()=>stack(['SaaS · Software','PaaS · Plataforma','IaaS · Infraestructura']),
'comparacion':()=>chips(['Virtualización|VM','Contenedores|Apps','Kubernetes|Orquesta','Cloud|Bajo demanda']),
'ejemplo-integrador':()=>stack(['Usuario · Internet','App web + Base de datos','Contenedores','Kernel / SO','CPU + RAM + SSD']),
'repaso-examen':()=>chips(['Memoria','Scheduling','Kernel','Driver','System call','Virtualización','Contenedor','Cloud'])};
