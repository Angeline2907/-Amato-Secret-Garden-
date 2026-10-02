// === CAMBIO DE PESTAÑAS ===
document.querySelectorAll('.nav-tab').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
    
    const tabId = btn.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
  });
});

// === MODAL POPUP ===
const modal = document.getElementById('generalModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');

function showModal(title, text, emoji = "💗") {
  document.getElementById('modalEmoji').innerText = emoji;
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalText').innerHTML = text;
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

modalCloseBtn.addEventListener('click', closeModal);

// === ELEMENTOS CON POPUP (.pop-btn) ===
document.querySelectorAll('.pop-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const title = btn.getAttribute('data-title');
    const text = btn.getAttribute('data-text');
    const emoji = btn.getAttribute('data-emoji') || '💗';
    showModal(title, text, emoji);
  });
});

// === PERSONAJES POPUP ===
document.querySelectorAll('.char-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.getAttribute('data-title');
    const text = card.getAttribute('data-text');
    const emoji = card.getAttribute('data-emoji') || '💙';
    showModal(title, text, emoji);
  });
});

// === PALETA POPUP ===
document.querySelectorAll('.color-box').forEach(box => {
  box.addEventListener('click', () => {
    const title = box.getAttribute('data-title');
    const text = box.getAttribute('data-desc');
    const emoji = box.getAttribute('data-emoji') || '🍨';
    showModal(title, text, emoji);
  });
});

// === PERSONALIDAD TAGS POPUP ===
document.querySelectorAll('.p-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    const title = tag.innerText;
    const text = tag.getAttribute('data-desc');
    const emoji = tag.getAttribute('data-emoji') || '🧠';
    showModal(title, text, emoji);
  });
});

// === LÍNEA TEMPORAL DESPLEGABLE ===
document.querySelectorAll('.tl-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

// === ENERGÍA SHAMATO ===
let heartsCount = 10;
const shamatoEnergyBar = document.getElementById('shamatoEnergyBar');
const shamatoCounter = document.getElementById('shamatoCounter');

if (shamatoEnergyBar) {
  shamatoEnergyBar.addEventListener('click', () => {
    heartsCount += 2;
    let str = "";
    for(let i=0; i<heartsCount; i++) str += "💖 ";
    shamatoEnergyBar.innerText = str;
    shamatoCounter.innerText = `Nivel de Amor: ${100 + (heartsCount-10)*10}%!`;
  });
}

// === FILTROS GALERÍA ===
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.getAttribute('data-cat');
    document.querySelectorAll('.g-item').forEach(item => {
      if(cat === 'all' || item.classList.contains(cat)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// === FRASES Y DATOS RANDOM ===
const quotes = {
  amato: ["¡Mira esta Chaos Emerald!", "Si consigo que sonrían, todo estará bien.", "¿Shadow, me enseñas Chaos Control?"],
  shadow: ["No te metas en problemas.", "...Está bien.", "Quédate detrás de mí."]
};

const btnQuoteAmato = document.getElementById('btnQuoteAmato');
const btnQuoteShadow = document.getElementById('btnQuoteShadow');
const btnFact = document.getElementById('btnFact');
const funResult = document.getElementById('funResult');

if(btnQuoteAmato) {
  btnQuoteAmato.addEventListener('click', () => {
    const rand = quotes.amato[Math.floor(Math.random() * quotes.amato.length)];
    funResult.innerText = rand;
  });
}

if(btnQuoteShadow) {
  btnQuoteShadow.addEventListener('click', () => {
    const rand = quotes.shadow[Math.floor(Math.random() * quotes.shadow.length)];
    funResult.innerText = rand;
  });
}

const facts = [
  "Amato es ambidiestro.",
  "Su diseño está inspirado en el helado napolitano.",
  "Está obsesionado con las Chaos Emeralds.",
  "Habla demasiado cuando está nervioso.",
  "Shadow finge que esto no le molesta."
];

if(btnFact) {
  btnFact.addEventListener('click', () => {
    const rand = facts[Math.floor(Math.random() * facts.length)];
    funResult.innerText = rand;
  });
}

// === EASTER EGGS ===
let emeraldTouches = 0;
const chaosEmeraldBtn = document.getElementById('chaosEmeraldBtn');
const emeraldStatus = document.getElementById('emeraldStatus');

if(chaosEmeraldBtn) {
  chaosEmeraldBtn.addEventListener('click', () => {
    emeraldTouches++;
    emeraldStatus.innerText = `Toques: ${emeraldTouches} / 7`;
    if(emeraldTouches >= 7) {
      showModal("✨ ¡CHAOS CONTROL! ✨", "¡Poder Chaos activado por 3 segundos!", "⚡");
      document.body.style.background = "#503024";
      setTimeout(() => { document.body.style.background = ""; }, 3000);
      emeraldTouches = 0;
    }
  });
}

let amatoTouches = 0;
const amatoAvatar = document.getElementById('amatoAvatar');
if(amatoAvatar) {
  amatoAvatar.addEventListener('click', () => {
    amatoTouches++;
    if(amatoTouches === 2) showModal("Amato", "¿Por qué me estás tocando?", "🍨");
    if(amatoTouches === 4) showModal("Amato", "En serio...", "🍨");
    if(amatoTouches === 6) showModal("Amato", "¡Oye!", "🍨");
    if(amatoTouches >= 8) { showModal("Amato", "Está bien, ganaste. 🍨", "🍨"); amatoTouches = 0; }
  });
}

let shadowTouches = 0;
const shadowAvatar = document.getElementById('shadowAvatar');
if(shadowAvatar) {
  shadowAvatar.addEventListener('click', (e) => {
    e.stopPropagation();
    shadowTouches++;
    if(shadowTouches === 2) showModal("Shadow", "...", "🖤");
    if(shadowTouches === 4) showModal("Shadow", "...¿Qué?", "🖤");
    if(shadowTouches === 6) showModal("Shadow", "¿Por qué sigues haciendo eso?", "🖤");
    if(shadowTouches >= 8) { showModal("Shadow", "Deja de molestar. 🖤", "🖤"); shadowTouches = 0; }
  });
}

// === CONTROL DE MÚSICA DENTRO DEL MENÚ ===
const bgmAudio = document.getElementById('bgmAudio');
const bgmBtn = document.getElementById('bgmToggleBtn');
let isBgm = false;

if(bgmBtn && bgmAudio) {
  bgmBtn.addEventListener('click', () => {
    if(isBgm) {
      bgmAudio.pause();
      bgmBtn.innerText = "🎵 Música de Fondo: OFF";
    } else {
      bgmAudio.play();
      bgmBtn.innerText = "🎵 Música de Fondo: ON 🎶";
    }
    isBgm = !isBgm;
  });
}
