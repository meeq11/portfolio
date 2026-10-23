// Podstrona pojedynczego projektu: project.html?id=1
// Dane projektów edytujesz w obiekcie PROJECTS poniżej.
// Zdjęcia: assets/img/projekt-N/cover.jpg oraz 1.jpg ... 4.jpg (galeria).
// gallery: ile zdjęć galerii ma projekt (0 = bez galerii, max 4). year jest opcjonalny.
// (brakujące zdjęcia zastępuje automatycznie szary placeholder).

const UI = {
  pl: {
    'nav-home':'Strona Główna','nav-work':'Projekty','nav-about':'O Mnie','nav-contact':'Kontakt',
    back:'← Wszystkie projekty',
    year:'Rok', role:'Rola', tools:'Narzędzia', duration:'Czas',
    goal:'Cel', process:'Proces', result:'Rezultat', gallery:'Galeria',
    next:'Następny projekt →', prev:'← Poprzedni projekt',
    cta:'Podoba Ci się ten projekt?', ctaBtn:'Napisz do mnie →',
    footer:'© 2026 — Max', title:'Projekt'
  },
  en: {
    'nav-home':'Home','nav-work':'Work','nav-about':'About','nav-contact':'Contact',
    back:'← All projects',
    year:'Year', role:'Role', tools:'Tools', duration:'Duration',
    goal:'Goal', process:'Process', result:'Result', gallery:'Gallery',
    next:'Next project →', prev:'← Previous project',
    cta:'Like what you see?', ctaBtn:'Get in touch →',
    footer:'© 2026 — Max', title:'Project'
  }
};

const PROJECTS = [
  { id:1, tag:{pl:'Web', en:'Web'}, year:'2026', tools:'Figma, HTML, CSS, JavaScript', gallery:4,
    pl:{ name:'Moje portfolio', role:'Projekt i kod',
      lead:'Strona portfolio zaprojektowana w Figmie i napisana od zera w HTML, CSS i JavaScript.',
      goal:'Stworzenie własnej strony, która pokaże moje projekty w jednym miejscu. Zależało mi na prostym, czytelnym układzie i wyrazistej typografii.',
      process:'Najpierw zaprojektowałem układ w Figmie, a potem napisałem stronę od zera: efekt pikseli w nagłówku, przełącznik języka PL/EN, listę projektów z filtrami, podstrony projektów i formularz kontaktowy.',
      result:'Responsywne portfolio w dwóch wersjach językowych, z podstronami projektów i formularzem, który wysyła wiadomości na e-mail.' },
    en:{ name:'My portfolio', role:'Design & code',
      lead:'A portfolio website designed in Figma and built from scratch with HTML, CSS and JavaScript.',
      goal:'Creating my own website that shows my projects in one place. I wanted a simple, readable layout and expressive typography.',
      process:'I designed the layout in Figma first, then built the site from scratch: a pixel effect in the header, a PL/EN language switch, a project list with filters, project pages and a contact form.',
      result:'A responsive portfolio in two languages, with project pages and a form that sends messages by email.' } },
  { id:2, tag:{pl:'UI / Figma', en:'UI / Figma'}, tools:'Figma', gallery:4,
    pl:{ name:'WESSA', role:'Projekt interfejsu',
      lead:'Projekt strony agencji handlowej z rowerami: strona główna, lista modeli, karta produktu, logowanie i koszyk.',
      goal:'Zaprojektowanie nowoczesnej strony, na której łatwo znaleźć model roweru, zobaczyć jego opis i dodać go do koszyka.',
      process:'W Figmie zrobiłem najważniejsze ekrany: stronę główną, listy rowerów, kartę produktu, logowanie i rejestrację, konto oraz koszyk. Menu, stopka i przyciski są komponentami, a kolory i style tekstu opierają się na zmiennych.',
      result:'Spójny zestaw ekranów desktopowych, gotowy do dalszej pracy. Kolejnym krokiem jest wersja mobilna.' },
    en:{ name:'WESSA', role:'Interface design',
      lead:'Website design for a bicycle trading agency: home page, model list, product page, login and cart.',
      goal:'Designing a modern website where it is easy to find a bike model, see its description and add it to the cart.',
      process:'In Figma I designed the key screens: home page, bike lists, product page, login and registration, account and cart. The menu, footer and buttons are components, and colours and text styles are based on variables.',
      result:'A consistent set of desktop screens, ready for further work. The next step is a mobile version.' } },
  { id:3, tag:{pl:'Grafika', en:'Graphics'}, tools:'Figma', gallery:4,
    pl:{ name:'Plakaty samochodowe', role:'Projekt graficzny',
      lead:'Seria plakatów i tapet o samochodach sportowych w formie technicznej karty modelu.',
      goal:'Projekt koncepcyjny wykonany dla własnej przyjemności: plakaty, które łączą duże zdjęcie auta z nazwą modelu, krótkim opisem i danymi technicznymi.',
      process:'Do każdego samochodu przygotowałem układ ze zdjęciem, nagłówkiem, opisem i drobnymi elementami graficznymi. Testowałem kilka wersji kolorystycznych tła: kremową, ciemnozieloną, czerwoną i szarą.',
      result:'Zestaw gotowych plakatów w kilku wariantach kolorystycznych, m.in. z Porsche 911 GT3 RS Manthey.' },
    en:{ name:'Car posters', role:'Graphic design',
      lead:'A series of posters and wallpapers about sports cars, styled as technical model cards.',
      goal:'A concept project made for fun: posters that combine a large photo of the car with the model name, a short description and technical data.',
      process:'For each car I prepared a layout with a photo, headline, description and small graphic elements. I tested several background colour versions: cream, dark green, red and grey.',
      result:'A set of finished posters in several colour variants, including the Porsche 911 GT3 RS Manthey.' } }
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
  
  const galleryItems = [['1.jpg','01','shot-wide'],['2.jpg','02',''],['3.jpg','03',''],['4.jpg','04','shot-wide']].slice(0, proj.gallery === undefined ? 4 : proj.gallery);
  const galleryHtml = galleryItems.length
    ? `<section class="proj-gallery" aria-label="${u.gallery}">${galleryItems.map(g => shot(base + g[0], g[1], g[2])).join('')}</section>`
    : '';

  document.getElementById('project-page').innerHTML = `
    <a class="back-link" href="projects.html">${u.back}</a>

    <header class="proj-hero">
      <span class="project-tag proj-tag">${esc(proj.tag[lang])}${proj.year ? ' · ' + proj.year : ''}</span>
      <h1 class="proj-title">${esc(t.name)}</h1>
      <p class="proj-lead">${esc(t.lead)}</p>
    </header>

    <dl class="proj-meta">
      ${[[u.year, proj.year], [u.role, t.role], [u.tools, proj.tools]].filter(x => x[1]).map(x => `<div><dt>${x[0]}</dt><dd>${esc(x[1])}</dd></div>`).join('')}
    </dl>

    ${shot(cover, num, 'shot-cover')}

    <section class="proj-text">
      <div class="proj-block"><h2>${u.goal}</h2><p>${esc(t.goal)}</p></div>
      <div class="proj-block"><h2>${u.process}</h2><p>${esc(t.process)}</p></div>
    </section>

    ${galleryHtml}

    <section class="proj-text proj-result">
      <div class="proj-block"><h2>${u.result}</h2><p>${esc(t.result)}</p></div>
    </section>

    <div class="proj-nav">
      <a href="project.html?id=${prev.id}">${u.prev}</a>
      <a href="project.html?id=${next.id}">${u.next}</a>
    </div>

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
  document.title = t.name + ' — Max';
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
