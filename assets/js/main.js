// ─── CURSOR ───────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
cursor.style.opacity='0'; ring.style.opacity='0';
document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  cursor.style.left=mx+'px'; cursor.style.top=my+'px';
});
(function animRing(){
  rx+=(mx-rx)*0.1; ry+=(my-ry)*0.1;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
})();
const heroEl = document.getElementById('hero');
heroEl.addEventListener('mouseenter',()=>{ cursor.style.opacity='1'; ring.style.opacity='1'; });
heroEl.addEventListener('mouseleave',()=>{ cursor.style.opacity='0'; ring.style.opacity='0'; });
document.querySelectorAll('a,.project-card,.service,.contact-btn').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cursor.style.width='20px';cursor.style.height='20px';ring.style.width='56px';ring.style.height='56px'});
  el.addEventListener('mouseleave',()=>{cursor.style.width='10px';cursor.style.height='10px';ring.style.width='34px';ring.style.height='34px'});
});

// ─── PIXEL HERO ───────────────────────────────────────────
const canvas = document.getElementById('pixel-canvas');
const ctx    = canvas.getContext('2d');

// Colors for the pixel field (dark green palette on beige bg)
// Each particle has a resting position and flies away from cursor
const BG        = '#EBE7E1';
const DARK      = '#023020';
const MID       = '#034a30';
const LIGHT     = '#c8d4c0';

let W, H;
let particles   = [];
let mouse       = { x: -9999, y: -9999, active: false };

const PIXEL_W   = 5;   // pixel square size
const PIXEL_H   = 5;
const COL_GAP   = 14;  // spacing between columns
const ROW_GAP   = 14;  // spacing between rows
const REPEL_R   = 140; // repulsion radius
const REPEL_F   = 5.5; // repulsion force
const FRICTION  = 0.80;
const SPRING    = 0.055;
const TRAIL     = 0.18; // how much extra speed a displaced pixel gains (random wobble)

function makeParticles(){
  particles = [];
  const cols = Math.ceil(W / COL_GAP) + 1;
  const rows = Math.ceil(H / ROW_GAP) + 1;

  for(let r = 0; r <= rows; r++){
    for(let c = 0; c <= cols; c++){
      const ox = c * COL_GAP;
      const oy = r * ROW_GAP;

      // assign colour & opacity based on random roll
      let roll = Math.random();
      let color, baseAlpha, sz;

      if(roll < 0.025){
        color = DARK; baseAlpha = 0.90; sz = PIXEL_W * 1.4;   // accent squares
      } else if(roll < 0.08){
        color = MID;  baseAlpha = 0.55; sz = PIXEL_W;
      } else if(roll < 0.22){
        color = LIGHT; baseAlpha = 0.35; sz = PIXEL_W * 0.8;
      } else {
        color = DARK; baseAlpha = 0.08 + Math.random()*0.07; sz = PIXEL_W * 0.6;
      }

      particles.push({
        ox, oy,       // origin / rest position
        x: ox, y: oy, // current position
        vx: 0, vy: 0,
        color, baseAlpha, sz,
        // random phase offset so each pixel wiggles slightly differently
        phase: Math.random() * Math.PI * 2
      });
    }
  }
}

function resize(){
  W = canvas.width  = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
  makeParticles();
}

// mouse tracking relative to canvas
const hero = document.getElementById('hero');
hero.addEventListener('mousemove', e => {
  const r = canvas.getBoundingClientRect();
  mouse.x = e.clientX - r.left;
  mouse.y = e.clientY - r.top;
  mouse.active = true;
});
hero.addEventListener('mouseleave', () => { mouse.active = false; mouse.x = -9999; mouse.y = -9999; });

let tick = 0;
function draw(){
  tick++;
  // clear with solid background colour
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  for(let p of particles){
    const dx   = p.x - mouse.x;
    const dy   = p.y - mouse.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    // ── repulsion ──
    if(mouse.active && dist < REPEL_R && dist > 0){
      const strength = (1 - dist / REPEL_R) * REPEL_F;
      // normalised direction away from cursor + slight random scatter
      const nx = dx / dist;
      const ny = dy / dist;
      const scatter = (Math.random() - 0.5) * TRAIL;
      p.vx += nx * strength + scatter;
      p.vy += ny * strength + scatter;
    }

    // ── spring back to origin ──
    p.vx += (p.ox - p.x) * SPRING;
    p.vy += (p.oy - p.y) * SPRING;

    // ── friction ──
    p.vx *= FRICTION;
    p.vy *= FRICTION;

    // ── integrate ──
    p.x += p.vx;
    p.y += p.vy;

    // ── alpha: brighter when displaced ──
    const disp = Math.sqrt((p.x-p.ox)**2 + (p.y-p.oy)**2);
    const a = Math.min(p.baseAlpha + disp * 0.018, 1);

    // parse hex color and set alpha
    ctx.globalAlpha = a;
    ctx.fillStyle   = p.color;
    const half = p.sz / 2;
    ctx.fillRect(p.x - half, p.y - half, p.sz, p.sz);
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
draw();

// ─── I18N ─────────────────────────────────────────────────
const translations = {
  pl: {
    'nav-work':        'Work',
    'nav-about':       'About',
    'nav-contact':     'Contact',
    'hero-eyebrow':    'Figma Designer &amp; UI/UX',
    'hero-sub':        'Projekty z pasją · Kraków, PL',
    'scroll':          'scroll',
    'about-label':     '[00] O mnie',
    'about-heading':   'Tworzę interfejsy, które <em>zostają w głowie</em>.',
    'about-body':      'Cześć — projektant UI/UX z Krakowa. Specjalizuję się w projektowaniu produktów cyfrowych w Figmie — od wireframe\'ów po gotowe design systemy. Każdy projekt to balans między estetyką a użytecznością.',
    'stat-exp':        'Lata exp.',
    'stat-proj':       'Projektów',
    'stat-clients':    'Klientów',
    'stat-coffee':     'Kawy',
    'work-title':      'Wybrane projekty',
    'proj-label':      'Projekt',
    'proj1-name':      'Projekt Główny',
    'proj2-name':      'Projekt Drugi',
    'proj3-name':      'Projekt Trzeci',
    'services-title':  'Co robię',
    's1-desc':         'Projektuję intuicyjne interfejsy — od research przez wireframy po pixel-perfect gotowe ekrany w Figmie.',
    's2-desc':         'Buduję skalowalne systemy komponentów, które trzymają spójność wizualną w całym produkcie.',
    's3-name':         'Identyfikacja wizualna',
    's3-desc':         'Logo, typografia, paleta — tworzę marki z charakterem, które wyróżniają się na rynku.',
    'contact-label':   'Masz projekt? Porozmawiajmy.',
    'contact-heading': 'ZACZNIJ<br>PROJEKT',
    'contact-btn':     'Napisz do mnie →',
    'footer-copy':     '© 2025 — Portfolio',
    'form-title':      'Napisz do mnie',
    'form-name':       'Imię i nazwisko',
    'form-email':      'Twój e-mail',
    'form-message':    'Co chcesz zrobić?',
    'form-send':       'Wyślij →',
    'form-sending':    'Wysyłanie…',
    'form-ok':         'Dzięki! Wiadomość wysłana, odezwę się wkrótce.',
    'form-err':        'Coś poszło nie tak. Spróbuj ponownie.',
    'form-invalid':    'Uzupełnij wszystkie pola poprawnie.',
  },
  en: {
    'nav-work':        'Work',
    'nav-about':       'About',
    'nav-contact':     'Contact',
    'hero-eyebrow':    'Figma Designer &amp; UI/UX',
    'hero-sub':        'Crafted with passion · Kraków, PL',
    'scroll':          'scroll',
    'about-label':     '[00] About me',
    'about-heading':   'I design interfaces that <em>stick in your mind</em>.',
    'about-body':      'Hey — I\'m a UI/UX designer from Kraków. I specialise in digital product design in Figma — from wireframes to complete design systems. Every project is a balance between aesthetics and usability.',
    'stat-exp':        'Years exp.',
    'stat-proj':       'Projects',
    'stat-clients':    'Clients',
    'stat-coffee':     'Coffees',
    'work-title':      'Selected work',
    'proj-label':      'Project',
    'proj1-name':      'Main Project',
    'proj2-name':      'Second Project',
    'proj3-name':      'Third Project',
    'services-title':  'What I do',
    's1-desc':         'I design intuitive interfaces — from research and wireframes to pixel-perfect, production-ready screens in Figma.',
    's2-desc':         'I build scalable component systems that maintain visual consistency across the entire product.',
    's3-name':         'Visual Identity',
    's3-desc':         'Logo, typography, colour palette — I craft brands with character that stand out in the market.',
    'contact-label':   'Got a project? Let\'s talk.',
    'contact-heading': 'START A<br>PROJECT',
    'contact-btn':     'Get in touch →',
    'footer-copy':     '© 2025 — Portfolio',
    'form-title':      'Get in touch',
    'form-name':       'Full name',
    'form-email':      'Your email',
    'form-message':    'What would you like to do?',
    'form-send':       'Send →',
    'form-sending':    'Sending…',
    'form-ok':         'Thanks! Message sent, I\'ll get back to you soon.',
    'form-err':        'Something went wrong. Please try again.',
    'form-invalid':    'Please fill in all fields correctly.',
  }
};

let currentLang = 'pl';

function applyLang(lang){
  const dict = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(dict[key] !== undefined) el.innerHTML = dict[key];
  });
  // footer copy (no data-i18n on footer-copy span yet — handled below)
  const fc = document.querySelector('.footer-copy');
  if(fc) fc.innerHTML = dict['footer-copy'];
  document.documentElement.lang = lang;
  document.getElementById('lang-label').textContent = lang === 'pl' ? 'EN' : 'PL';
  currentLang = lang;
}

document.getElementById('lang-switch').addEventListener('click', ()=>{
  applyLang(currentLang === 'pl' ? 'en' : 'pl');
});

const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity='1';
      e.target.style.transform='translateY(0)';
    }
  });
},{threshold:0.1});

document.querySelectorAll('.service,.stat,.project-card,.about-text,.about-stats').forEach(el=>{
  el.style.opacity='0';
  el.style.transform='translateY(28px)';
  el.style.transition='opacity 0.7s ease,transform 0.7s ease';
  io.observe(el);
});

// ─── CONTACT MODAL + FORM ─────────────────────────────────
const modal    = document.getElementById('contact-modal');
const form     = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const sendBtn  = document.getElementById('submit-btn');

function openModal(){
  modal.classList.add('open');
  document.body.style.overflow='hidden';
  setTimeout(()=>document.getElementById('f-name').focus(),300);
}
function closeModal(){
  modal.classList.remove('open');
  document.body.style.overflow='';
}
document.getElementById('open-contact').addEventListener('click',e=>{e.preventDefault();openModal();});
document.getElementById('close-contact').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();});

function setStatus(key,cls){
  statusEl.textContent = translations[currentLang][key] || '';
  statusEl.className = 'form-status ' + (cls||'');
}

form.addEventListener('submit',async e=>{
  e.preventDefault();
  if(!form.checkValidity()){ setStatus('form-invalid','err'); form.reportValidity(); return; }
  sendBtn.disabled = true;
  setStatus('form-sending');
  try{
    const res = await fetch(form.action,{
      method:'POST',
      body:new FormData(form),
      headers:{'Accept':'application/json'}
    });
    if(res.ok){
      setStatus('form-ok','ok');
      form.reset();
      setTimeout(closeModal,2500);
    }else{
      setStatus('form-err','err');
    }
  }catch(err){
    setStatus('form-err','err');
  }
  sendBtn.disabled = false;
});
