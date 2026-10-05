// Podstrona Projekty: tłumaczenia PL/EN, filtry kategorii, animacja kart
const T = {
  pl: {
    'nav-home':'Home','nav-work':'Work','nav-about':'About','nav-contact':'Contact',
    'pg-eyebrow':'Portfolio','pg-title':'Projekty',
    'pg-lead':'Wybór prac z zakresu UI/UX, brandingu i web designu.',
    'f-all':'Wszystkie','f-ui':'UI / UX','f-branding':'Branding','f-web':'Web',
    'p-view':'Zobacz projekt →',
    'p1-name':'Projekt Główny','p1-desc':'Interfejs aplikacji mobilnej — od wireframe\'ów po gotowy prototyp.',
    'p2-name':'Projekt Drugi','p2-desc':'Identyfikacja wizualna: logo, paleta kolorów i typografia.',
    'p3-name':'Projekt Trzeci','p3-desc':'Biblioteka komponentów w Figmie dla zespołu produktowego.',
    'p4-name':'Projekt Czwarty','p4-desc':'Responsywna strona internetowa w HTML, CSS i JavaScript.',
    'p5-name':'Projekt Piąty','p5-desc':'Materiały graficzne i kampania w mediach społecznościowych.',
    'p6-name':'Projekt Szósty','p6-desc':'Landing page z animacjami i formularzem kontaktowym.',
    'footer-copy':'© 2025 — Portfolio'
  },
  en: {
    'nav-home':'Home','nav-work':'Work','nav-about':'About','nav-contact':'Contact',
    'pg-eyebrow':'Portfolio','pg-title':'Projects',
    'pg-lead':'A selection of work in UI/UX, branding and web design.',
    'f-all':'All','f-ui':'UI / UX','f-branding':'Branding','f-web':'Web',
    'p-view':'View project →',
    'p1-name':'Main Project','p1-desc':'Mobile app interface — from wireframes to a finished prototype.',
    'p2-name':'Second Project','p2-desc':'Visual identity: logo, colour palette and typography.',
    'p3-name':'Third Project','p3-desc':'A component library in Figma for a product team.',
    'p4-name':'Fourth Project','p4-desc':'Responsive website built with HTML, CSS and JavaScript.',
    'p5-name':'Fifth Project','p5-desc':'Graphic assets and a social media campaign.',
    'p6-name':'Sixth Project','p6-desc':'Landing page with animations and a contact form.',
    'footer-copy':'© 2025 — Portfolio'
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
  document.title = (lang === 'pl' ? 'Projekty' : 'Projects') + ' — Portfolio';
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
