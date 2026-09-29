(function(){
const tabs=[...document.querySelectorAll('section.tab')],links=[...document.querySelectorAll('nav a')];
const names={};links.forEach(a=>names[a.getAttribute('href').slice(1)]=a.textContent);
// botones Anterior / Siguiente al final de cada pestaña
tabs.forEach((s,i)=>{if(!i)return;const p=tabs[i-1],n=tabs[i+1],d=document.createElement('div');d.className='pn';
d.innerHTML=`<a class="btn o" href="#${p.id}">← ${names[p.id]||'Anterior'}</a>`+(n?`<a class="btn" href="#${n.id}">${names[n.id]||'Siguiente'} →</a>`:'');s.appendChild(d)});
function show(id,push){
  if(!tabs.some(t=>t.id==id))id='inicio';
  tabs.forEach(t=>t.classList.toggle('active',t.id==id));
  links.forEach(a=>{const on=a.getAttribute('href')=='#'+id;a.classList.toggle('on',on);if(on)a.scrollIntoView({block:'nearest',inline:'center'})});
  if(push)history.pushState(null,'','#'+id);
  scrollTo(0,0);
  // los canvas 3D necesitan recalcular su tamaño al volverse visibles
  requestAnimationFrame(()=>window.dispatchEvent(new Event('resize')));
}
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;e.preventDefault();show(a.getAttribute('href').slice(1),true)});
addEventListener('popstate',()=>show(location.hash.slice(1)));
show(location.hash.slice(1));
})();
