// ===================================================
// NAVEGACIÓN Y PESTAÑAS
// ===================================================
document.querySelectorAll('.nav-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
  });
});

// ===================================================
// MODAL GENERAL Y VISOR
// ===================================================
function showModal(title, text, emoji = "💗", sub = "Detalle") {
  document.getElementById('modalEmoji').innerText = emoji;
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalSub').innerText = sub;
  document.getElementById('modalBodyText').innerText = text;
  document.getElementById('modalQuoteText').innerText = `"${title}"`;
  document.getElementById('generalModal').style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// ===================================================
// LÍNEA TEMPORAL TOGGLE
// ===================================================
function toggleTl(el) {
  el.classList.toggle('open');
}

// ===================================================
// DATOS Y PERSONAJES
// ===================================================
const charactersData = {
  sonic: { emoji: "💙", title: "Sonic the Hedgehog", sub: "Mejores Amigos", text: "Amato admira su libertad. Sonic le enseñó a divertirse otra vez." },
  tails: { emoji: "🧡", title: "Miles 'Tails' Prower", sub: "Compañeros de Ciencia", text: "Conversan horas sobre el funcionamiento de las Chaos Emeralds." },
  amy: { emoji: "🌸", title: "Amy Rose", sub: "Apoyo Emocional", text: "Sabe cuándo Amato finge estar bien detrás de su sonrisa." },
  knuckles: { emoji: "🔥", title: "Knuckles", sub: "Rivalidad Amistosa", text: "Amato disfruta molestarlo por lo fácil que se enoja." },
  cream: { emoji: "🩷", title: "Cream", sub: "Vínculo Protector", text: "Amato la protege con mucho cariño." },
  shadow: { emoji: "🖤", title: "Shadow", sub: "Enamorados (Shamato ❤️)", text: "Comenzó con Chaos Control y terminó en una unión profunda." },
  eggman: { emoji: "🥚", title: "Dr. Eggman", sub: "Enemigo", text: "No tolera que use las esmeraldas para hacer daño." },
  maria: { emoji: "🌹", title: "Maria Robotnik", sub: "Respeto Profundo", text: "La respeta por lo mucho que significó para Shadow." }
};

document.querySelectorAll('.char-card').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.getAttribute('data-char');
    const d = charactersData[key];
    if(d) showModal(d.title, d.text, d.emoji, d.sub);
  });
});

// ===================================================
// PALETA Y COPIAR COLOR
// ===================================================
function copyColor(hex, desc) {
  navigator.clipboard.writeText(hex);
  const toast = document.getElementById('colorToast');
  toast.innerText = `¡Copiado ${hex}! ${desc}`;
}

// ===================================================
// PERSONALIDAD TAGS
// ===================================================
document.querySelectorAll('.p-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    showModal(tag.innerText, tag.getAttribute('data-desc'), '🧠', 'Personalidad');
  });
});

// ===================================================
// ENERGÍA SHAMATO
// ===================================================
let heartsCount = 10;
document.getElementById('shamatoEnergyBar').addEventListener('click', () => {
  heartsCount += 2;
  let str = "";
  for(let i=0; i<heartsCount; i++) str += "💖 ";
  document.getElementById('shamatoEnergyBar').innerText = str;
  document.getElementById('shamatoCounter').innerText = `Nivel de Amor: ${100 + (heartsCount-10)*10}%!`;
});

// ===================================================
// CARTAS SECRETAS
// ===================================================
function openLetter(from, text) {
  showModal(`Carta de ${from}`, text, "✉️", "Sobre Secreto");
}

// ===================================================
// GALERÍA Y FILTROS
// ===================================================
function filterGallery(cat) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.currentTarget.classList.add('active');

  document.querySelectorAll('.g-item').forEach(item => {
    if(cat === 'all' || item.classList.contains(cat)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function openViewer(title, desc) {
  document.getElementById('viewerTitle').innerText = title;
  document.getElementById('viewerDesc').innerText = desc;
  document.getElementById('viewerModal').style.display = 'flex';
}

let zoomLevel = 1;
function zoomViewer(factor) {
  zoomLevel *= factor;
  document.getElementById('viewerBox').style.transform = `scale(${zoomLevel})`;
}

// ===================================================
// GENERADOR DE FRASES Y DATOS RANDOM
// ===================================================
const quotes = {
  amato: ["¡Mira esta Chaos Emerald!", "Si consigo que sonrían, todo estará bien.", "¿Shadow, me enseñas Chaos Control?"],
  shadow: ["No te metas en problemas.", "...Está bien.", "Quédate detrás de mí."],
  shamato: ["Amato habla; Shadow protege.", "Dos personas que aprendieron a no cargar todo solas."]
};

function genQuote(type) {
  const arr = quotes[type];
  const rand = arr[Math.floor(Math.random() * arr.length)];
  document.getElementById('quoteResult').innerText = rand;
}

const facts = [
  "Amato es ambidiestro.",
  "Su diseño está inspirado en el helado napolitano.",
  "Está obsesionado con las Chaos Emeralds.",
  "Habla demasiado cuando está nervioso.",
  "Shadow finge que esto no le molesta."
];

function genFact() {
  const rand = facts[Math.floor(Math.random() * facts.length)];
  document.getElementById('factResult').innerText = rand;
}

// ===================================================
// EASTER EGGS (CHAOS EMERALD & REPETICIONES)
// ===================================================
let emeraldTouches = 0;
document.getElementById('chaosEmeraldBtn').addEventListener('click', () => {
  emeraldTouches++;
  document.getElementById('emeraldStatus').innerText = `Toques: ${emeraldTouches} / 7`;
  if(emeraldTouches >= 7) {
    alert("✨ ¡CHAOS CONTROL! ✨");
    document.body.style.background = "#503024";
    setTimeout(() => { document.body.style.background = ""; }, 3000);
    emeraldTouches = 0;
  }
});

let amatoTouches = 0;
document.getElementById('amatoAvatar').addEventListener('click', () => {
  amatoTouches++;
  if(amatoTouches === 2) alert("¿Por qué me estás tocando?");
  if(amatoTouches === 4) alert("En serio...");
  if(amatoTouches === 6) alert("¡Oye!");
  if(amatoTouches >= 8) { alert("Está bien, ganaste. 🍨"); amatoTouches = 0; }
});

let shadowTouches = 0;
document.getElementById('shadowAvatar').addEventListener('click', () => {
  shadowTouches++;
  if(shadowTouches === 2) alert("...");
  if(shadowTouches === 4) alert("...¿Qué?");
  if(shadowTouches === 6) alert("¿Por qué sigues haciendo eso?");
  if(shadowTouches >= 8) { alert("Deja de molestar. 🖤"); shadowTouches = 0; }
});

// BGM CONTROL
const bgmAudio = document.getElementById('bgmAudio');
const bgmBtn = document.getElementById('bgmToggleBtn');
let isBgm = false;
bgmBtn.addEventListener('click', () => {
  if(isBgm) { bgmAudio.pause(); bgmBtn.innerText = "🎵 Música: OFF"; }
  else { bgmAudio.play(); bgmBtn.innerText = "🎵 Música: ON 🎶"; }
  isBgm = !isBgm;
});
