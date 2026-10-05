// Podstrona pojedynczego projektu: project.html?id=1
// Dane projektów edytujesz w obiekcie PROJECTS poniżej.
// Zdjęcia: assets/img/projekt-N/cover.jpg oraz 1.jpg, 2.jpg, 3.jpg, 4.jpg
// (brakujące zdjęcia zastępuje automatycznie szary placeholder).

const UI = {
  pl: {
    'nav-home':'Home','nav-work':'Work','nav-about':'About','nav-contact':'Contact',
    back:'← Wszystkie projekty',
    year:'Rok', role:'Rola', tools:'Narzędzia', duration:'Czas',
    goal:'Cel', process:'Proces', result:'Rezultat', gallery:'Galeria',
    next:'Następny projekt →', prev:'← Poprzedni projekt',
    cta:'Podoba Ci się ten projekt?', ctaBtn:'Napisz do mnie →',
    footer:'© 2025 — Portfolio', title:'Projekt'
  },
  en: {
    'nav-home':'Home','nav-work':'Work','nav-about':'About','nav-contact':'Contact',
    back:'← All projects',
    year:'Year', role:'Role', tools:'Tools', duration:'Duration',
    goal:'Goal', process:'Process', result:'Result', gallery:'Gallery',
    next:'Next project →', prev:'← Previous project',
    cta:'Like what you see?', ctaBtn:'Get in touch →',
    footer:'© 2025 — Portfolio', title:'Project'
  }
};

const COVER_1 = 'https://www.dropbox.com/scl/fi/1aq1jeug0zdje451ik7kb/pgreen.png?rlkey=48xfrs8msuxe9roqoqp4ajo38&dl=1';

const PROJECTS = [
  { id:1, tag:'UI / Figma', year:'2024', duration:'8 tyg. / 8 wks', tools:'Figma, FigJam', cover:COVER_1,
    pl:{ name:'Projekt Główny', role:'UI/UX Designer',
      lead:'Interfejs aplikacji mobilnej — od wireframe\'ów po gotowy, klikalny prototyp.',
      goal:'Aplikacja miała ułatwić użytkownikom codzienne zadania i skrócić ścieżkę do najważniejszych funkcji. Zaczęliśmy od analizy potrzeb i przeglądu rozwiązań konkurencji.',
      process:'Powstały szkice, wireframe\'y niskiej i wysokiej szczegółowości, a następnie pełny design w Figmie z biblioteką komponentów. Prototyp przetestowałem z kilkoma osobami i na tej podstawie uprościłem nawigację.',
      result:'Spójny interfejs z jasną hierarchią i przejrzystym układem. Prototyp gotowy do przekazania deweloperom wraz z dokumentacją komponentów.' },
    en:{ name:'Main Project', role:'UI/UX Designer',
      lead:'Mobile app interface — from wireframes to a finished, clickable prototype.',
      goal:'The app was meant to simplify everyday tasks and shorten the path to the most important features. We started with a needs analysis and a review of competing solutions.',
      process:'I produced sketches, low- and high-fidelity wireframes, then the full design in Figma with a component library. The prototype was tested with a few people and the navigation was simplified based on their feedback.',
      result:'A consistent interface with clear hierarchy and a clean layout. The prototype was ready to hand over to developers together with component documentation.' } },
  { id:2, tag:'Branding', year:'2024', duration:'5 tyg. / 5 wks', tools:'Figma, Illustrator',
    pl:{ name:'Projekt Drugi', role:'Brand Designer',
      lead:'Identyfikacja wizualna: logo, paleta kolorów i typografia.',
      goal:'Stworzenie rozpoznawalnej marki, która wyróżni się na tle konkurencji i będzie działać zarówno online, jak i w druku.',
      process:'Zacząłem od warsztatu wartości marki, potem tablice inspiracji, szkice logo i kilka kierunków kolorystycznych. Wybrany kierunek rozwinąłem w pełny system znaków.',
      result:'Kompletny zestaw: logo w wariantach, paleta, typografia i przykładowe zastosowania. Całość zebrana w krótkiej księdze znaku.' },
    en:{ name:'Second Project', role:'Brand Designer',
      lead:'Visual identity: logo, colour palette and typography.',
      goal:'Creating a recognisable brand that stands out from the competition and works both online and in print.',
      process:'I started with a brand values workshop, then moodboards, logo sketches and several colour directions. The chosen direction was developed into a full identity system.',
      result:'A complete set: logo variants, palette, typography and sample applications, all gathered in a short brand guideline.' } },
  { id:3, tag:'Design System', year:'2023', duration:'10 tyg. / 10 wks', tools:'Figma',
    pl:{ name:'Projekt Trzeci', role:'UI Designer',
      lead:'Biblioteka komponentów w Figmie dla zespołu produktowego.',
      goal:'Ujednolicenie wyglądu produktu i przyspieszenie pracy zespołu dzięki wspólnym, gotowym do użycia elementom.',
      process:'Zrobiłem audyt istniejących ekranów, wyodrębniłem powtarzalne wzorce i zbudowałem tokeny, komponenty z wariantami oraz zasady ich użycia.',
      result:'Biblioteka kilkudziesięciu komponentów z dokumentacją. Projektowanie nowych ekranów stało się wyraźnie szybsze i bardziej spójne.' },
    en:{ name:'Third Project', role:'UI Designer',
      lead:'A component library in Figma for a product team.',
      goal:'Unifying the look of the product and speeding up the team\'s work with shared, ready-to-use elements.',
      process:'I audited the existing screens, extracted repeating patterns and built tokens, components with variants and usage guidelines.',
      result:'A library of dozens of documented components. Designing new screens became noticeably faster and more consistent.' } },
  { id:4, tag:'Web', year:'2024', duration:'6 tyg. / 6 wks', tools:'Figma, HTML, CSS, JS',
    pl:{ name:'Projekt Czwarty', role:'Web Designer & Developer',
      lead:'Responsywna strona internetowa w HTML, CSS i JavaScript.',
      goal:'Nowoczesna, szybka strona, która dobrze prezentuje ofertę i działa równie dobrze na telefonie i komputerze.',
      process:'Projekt w Figmie, a następnie ręczne wdrożenie w czystym HTML, CSS i JS, z naciskiem na dostępność i wydajność.',
      result:'Lekka, responsywna strona z płynnymi animacjami i czytelną strukturą. Gotowa do publikacji.' },
    en:{ name:'Fourth Project', role:'Web Designer & Developer',
      lead:'Responsive website built with HTML, CSS and JavaScript.',
      goal:'A modern, fast website that presents the offer well and works equally well on phone and desktop.',
      process:'Designed in Figma, then hand-coded in plain HTML, CSS and JS with a focus on accessibility and performance.',
      result:'A lightweight, responsive website with smooth animations and a clear structure, ready to publish.' } },
  { id:5, tag:'Branding', year:'2023', duration:'4 tyg. / 4 wks', tools:'Figma, Photoshop',
    pl:{ name:'Projekt Piąty', role:'Graphic Designer',
      lead:'Materiały graficzne i kampania w mediach społecznościowych.',
      goal:'Zwiększenie zasięgów i rozpoznawalności marki dzięki spójnej, atrakcyjnej oprawie graficznej.',
      process:'Opracowałem szablony postów, grafiki kampanijne i krótkie animacje, trzymając się jednego systemu wizualnego.',
      result:'Zestaw szablonów gotowy do samodzielnego użycia przez klienta oraz spójna kampania na kilku kanałach.' },
    en:{ name:'Fifth Project', role:'Graphic Designer',
      lead:'Graphic assets and a social media campaign.',
      goal:'Increasing reach and brand recognition through consistent, attractive visuals.',
      process:'I created post templates, campaign graphics and short animations, all within a single visual system.',
      result:'A set of templates the client can use independently, and a consistent campaign across several channels.' } },
  { id:6, tag:'Web', year:'2023', duration:'3 tyg. / 3 wks', tools:'Figma, HTML, CSS, JS',
    pl:{ name:'Projekt Szósty', role:'Web Designer & Developer',
      lead:'Landing page z animacjami i formularzem kontaktowym.',
      goal:'Jedna strona, której zadaniem jest przekonać odwiedzającego i skłonić go do kontaktu.',
      process:'Wireframe, projekt w Figmie, a potem wdrożenie z animacjami przy przewijaniu i działającym formularzem wysyłającym wiadomości na e-mail.',
      result:'Szybka strona typu landing page z jasnym wezwaniem do działania i prostym formularzem.' },
    en:{ name:'Sixth Project', role:'Web Designer & Developer',
      lead:'Landing page with animations and a contact form.',
      goal:'A single page whose job is to convince the visitor and prompt them to get in touch.',
      process:'Wireframe, Figma design, then implementation with scroll animations and a working form that sends messages by email.',
      result:'A fast landing page with a clear call to action and a simple contact form.' } }
];

let lang = 'pl';
try{ if(localStorage.getItem('lang')==='en') lang='en'; }catch(e){}

const params = new URLSearchParams(location.search);
let pid = parseInt(params.get('id'),10);
if(!PROJECTS.some(p=>p.id===pid)) pid = 1;
const idx = PROJECTS.findIndex(p=>p.id===pid);
const proj = PROJECTS[idx];
const prev = PROJECTS[(idx-1+PROJECTS.length)%PROJECTS.length];
const next = PROJECTS[(idx+1)%PROJECTS.length];

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function shot(src, num, cls){
  return `<figure class="shot ${cls||''}">
    <div class="shot-ph"><span>${num}</span></div>
    <img src="${src}" alt="" loading="lazy" onerror="this.remove()">
  </figure>`;
}

function render(){
  const u = UI[lang], t = proj[lang];
  const base = `assets/img/projekt-${proj.id}/`;
  const cover = proj.cover || base + 'cover.jpg';
  const num = String(proj.id).padStart(2,'0');
  const dur = proj.duration.split(' / ')[lang==='pl'?0:1];

  document.getElementById('project-page').innerHTML = `
    <a class="back-link" href="projects.html">${u.back}</a>

    <header class="proj-hero">
      <span class="project-tag proj-tag">${esc(proj.tag)} · ${proj.year}</span>
      <h1 class="proj-title">${esc(t.name)}</h1>
      <p class="proj-lead">${esc(t.lead)}</p>
    </header>

    <dl class="proj-meta">
      <div><dt>${u.year}</dt><dd>${proj.year}</dd></div>
      <div><dt>${u.role}</dt><dd>${esc(t.role)}</dd></div>
      <div><dt>${u.tools}</dt><dd>${esc(proj.tools)}</dd></div>
      <div><dt>${u.duration}</dt><dd>${esc(dur)}</dd></div>
    </dl>

    ${shot(cover, num, 'shot-cover')}

    <section class="proj-text">
      <div class="proj-block"><h2>${u.goal}</h2><p>${esc(t.goal)}</p></div>
      <div class="proj-block"><h2>${u.process}</h2><p>${esc(t.process)}</p></div>
    </section>

    <section class="proj-gallery" aria-label="${u.gallery}">
      ${shot(base+'1.jpg','01','shot-wide')}
      ${shot(base+'2.jpg','02')}
      ${shot(base+'3.jpg','03')}
      ${shot(base+'4.jpg','04','shot-wide')}
    </section>

    <section class="proj-text proj-result">
      <div class="proj-block"><h2>${u.result}</h2><p>${esc(t.result)}</p></div>
    </section>

    <nav class="proj-nav" aria-label="${u.gallery}">
      <a href="project.html?id=${prev.id}">${u.prev}</a>
      <a href="project.html?id=${next.id}">${u.next}</a>
    </nav>

    <section class="proj-cta">
      <p>${u.cta}</p>
      <a class="contact-btn" href="index.html#contact">${u.ctaBtn}</a>
    </section>`;

  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n');
    if(u[k] !== undefined) el.innerHTML = u[k];
  });
  const fc = document.querySelector('.footer-copy');
  if(fc) fc.innerHTML = u.footer;
  document.documentElement.lang = lang;
  document.getElementById('lang-label').textContent = lang==='pl' ? 'EN' : 'PL';
  document.title = t.name + ' — Portfolio';
}

document.getElementById('lang-switch').addEventListener('click',()=>{
  lang = lang==='pl' ? 'en' : 'pl';
  try{ localStorage.setItem('lang', lang); }catch(e){}
  render();
});
render();

// Lightbox: powiększanie zdjęć po kliknięciu (tylko gdy zdjęcie istnieje)
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
function closeLb(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
document.getElementById('project-page').addEventListener('click',e=>{
  const img = e.target.closest('.shot img');
  if(!img) return;
  lbImg.src = img.src;
  lb.classList.add('open'); lb.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
});
lb.addEventListener('click',closeLb);
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeLb(); });
