// Podstrona Projekty: tłumaczenia PL/EN, filtry kategorii, animacja kart
const T = {
  pl: {
    'nav-home':'Strona Główna','nav-work':'Projekty','nav-about':'O Mnie','nav-contact':'Kontakt',
    'pg-eyebrow':'Portfolio','pg-title':'Projekty',
    'pg-lead':'Wybór prac z zakresu UI/UX, brandingu i web designu.',
    'f-all':'Wszystkie','f-ui':'UI / UX','f-graphics':'Grafika','f-web':'Web',
    'p-view':'Zobacz projekt →',
    'p1-name':'Moje portfolio','p1-desc':'Strona portfolio zaprojektowana w Figmie i napisana od zera w HTML, CSS i JavaScript.','p1-tag':'Web',
    'p2-name':'WESSA','p2-desc':'Projekt strony agencji handlowej z rowerami: strona główna, lista modeli, karta produktu, logowanie i koszyk.','p2-tag':'UI / Figma',
    'p3-name':'Plakaty samochodowe','p3-desc':'Seria plakatów i tapet o samochodach sportowych w formie technicznej karty modelu.','p3-tag':'Grafika',
    'footer-copy':'© 2026 — Max'
  },
  en: {
    'nav-home':'Home','nav-work':'Work','nav-about':'About','nav-contact':'Contact',
    'pg-eyebrow':'Portfolio','pg-title':'Projects',
    'pg-lead':'A selection of work in UI/UX, branding and web design.',
    'f-all':'All','f-ui':'UI / UX','f-graphics':'Graphics','f-web':'Web',
    'p-view':'View project →',
    'p1-name':'My portfolio','p1-desc':'A portfolio website designed in Figma and built from scratch with HTML, CSS and JavaScript.','p1-tag':'Web',
    'p2-name':'WESSA','p2-desc':'Website design for a bicycle trading agency: home page, model list, product page, login and cart.','p2-tag':'UI / Figma',
    'p3-name':'Car posters','p3-desc':'A series of posters and wallpapers about sports cars, styled as technical model cards.','p3-tag':'Graphics',
    'footer-copy':'© 2026 — Max'
  }
};

let currentLang = 'pl';
try{ if(localStorage.getItem('lang')==='en') currentLang='en'; }catch(e){}

function applyLang(lang){
  const dict = T[lang];
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n');
    if(dict[k] !== undefined) el.innerHTML = dict[k];
  });
  const fc = document.querySelector('.footer-copy');
  if(fc) fc.innerHTML = dict['footer-copy'];
  document.documentElement.lang = lang;
  document.getElementById('lang-label').textContent = lang === 'pl' ? 'EN' : 'PL';
  document.title = (lang === 'pl' ? 'Projekty' : 'Projects') + ' — Max';
  currentLang = lang;
  try{ localStorage.setItem('lang', lang); }catch(e){}
}
document.getElementById('lang-switch').addEventListener('click',()=>{
  applyLang(currentLang === 'pl' ? 'en' : 'pl');
});
applyLang(currentLang);

// Filtry
const filters = document.querySelectorAll('.filter');
const cards   = document.querySelectorAll('.pcard');
filters.forEach(btn=>{
  btn.addEventListener('click',()=>{
    filters.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(c=>{
      c.classList.toggle('hide', f !== 'all' && c.dataset.cat !== f);
    });
  });
});

// Pojawianie się kart przy przewijaniu
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity='1';
      e.target.style.transform='translateY(0)';
    }
  });
},{threshold:0.1});
cards.forEach(c=>{
  c.style.opacity='0';
  c.style.transform='translateY(28px)';
  c.style.transition='opacity 0.7s ease,transform 0.7s ease';
  io.observe(c);
});
