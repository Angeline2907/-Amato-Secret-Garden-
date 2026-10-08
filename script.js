let state = {
  emeralds: [false, false, false, false, false, false, false],
  shamatoPower: 0,
  hugCount: 0,
  visits: 0,
  achievements: {
    visited: true,
    firstEmerald: false,
    allEmeralds: false,
    shamatoFan: false,
    diarioOpen: false,
    labDestroyed: false
  }
};

function loadState() {
  const saved = localStorage.getItem('amato_archive_state');
  if (saved) {
    try {
      state = Object.assign(state, JSON.parse(saved));
    } catch(e) { console.error(e); }
  }
  state.visits = (state.visits || 0) + 1;
  saveState();
  updateUI();
}

function saveState() {
  localStorage.setItem('amato_archive_state', JSON.stringify(state));
}

function updateUI() {
  const visitElem = document.getElementById('visit-counter');
  if (visitElem) visitElem.innerText = String(state.visits).padStart(6, '0');

  const emeraldCount = state.emeralds.filter(Boolean).length;
  const emElem = document.getElementById('emerald-count');
  if (emElem) emElem.innerText = emeraldCount;

  const shElem = document.getElementById('shamato-power');
  if (shElem) shElem.innerText = state.shamatoPower;

  const shVal = document.getElementById('shamato-counter-val');
  if (shVal) shVal.innerText = state.shamatoPower;

  const hugElem = document.getElementById('hug-count-display');
  if (hugElem) hugElem.innerText = state.hugCount;

  renderAchievements();
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.innerText = msg;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
  }
}

// CORRECCIÓN TOTAL DE PESTAÑAS E INTERACCIÓN
function switchTab(tabId, evt) {
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
  document.querySelectorAll('.menu-btn').forEach(btn => btn.classList.remove('active'));

  const target = document.getElementById(tabId);
  if (target) {
    target.classList.add('active');
  }

  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add('active');
  }

  if (tabId === 'tab-diario') {
    unlockAchievement('diarioOpen', '☆ Consulta del Diario');
  }
}

function triggerSecretEmerald(num) {
  const idx = num - 1;
  if (!state.emeralds[idx]) {
    state.emeralds[idx] = true;
    saveState();
    updateUI();
    showToast(`¡Obtuviste la Chaos Emerald #${num}! ✨`);
    unlockAchievement('firstEmerald', '💎 Coleccionista de Esferas');

    if (state.emeralds.filter(Boolean).length === 7) {
      unlockAchievement('allEmeralds', '🌟 El Poder de las 7 Emeralds');
      alert("¡Has reunido las 7 Chaos Emeralds!");
    }
  } else {
    showToast(`La Chaos Emerald #${num} ya está registrada.`);
  }
}

// PERSONALIDAD Y DATOS
function showTagInfo(trait) {
  const box = document.getElementById('tag-info-box');
  const infos = {
    'Curioso': 'Amato investiga la energía Chaos sin medir el peligro.',
    'Energético': 'Mantiene una actitud hiperactiva y motivada en todo momento.',
    'Cariñoso': 'Expresa de forma explícita su afecto hacia sus amigos.',
    'Impulsivo': 'Toma decisiones sin pensar completamente en las consecuencias.',
    'Leal': 'Jamás abandona a sus seres queridos sin importar el riesgo.',
    'Juguetón': 'Le fascina bromear y hacer sonreír a Shadow.'
  };
  box.innerText = infos[trait] || 'Característica de Amato.';
}

const facts = [
  "Amato maneja con soltura la escritura y dibujo con ambas manos.",
  "Sus colores distintivos están inspirados en la combinación napolitana.",
  "Demuestra un interés constante por comprender las técnicas Chaos.",
  "Suele hablar con rapidez cuando analiza temas de su interés.",
  "Acostumbra realizar recorridos continuos por Emerald Hill."
];

function generateRandomFact() {
  const random = facts[Math.floor(Math.random() * facts.length)];
  document.getElementById('random-fact-text').innerText = random;
}

function setMood(mood) {
  const moods = {
    feliz: "Estado: Amato se encuentra animado y recorriendo la zona.",
    triste: "Estado: Reflexivo y silencioso. El grupo permanece atento.",
    curioso: "Estado: Analizando un objeto en el laboratorio.",
    caotico: "Estado: Realizando pruebas de energía con alta intensidad.",
    shamato: "Estado: Entrenando maniobras defensivas junto a Shadow."
  };
  document.getElementById('mood-display').innerText = moods[mood] || "Estado no determinado.";
}

function clickAmato() {
  const msgs = ["¡Hola! ¿Necesitas revisar algún dato?", "Estoy revisando las mediciones del área.", "Todo en orden por aquí. 🍨"];
  showToast(msgs[Math.floor(Math.random() * msgs.length)]);
}

// SHAMATO
function addShamatoEnergy() {
  if (state.shamatoPower < 100) {
    state.shamatoPower += 10;
    if (state.shamatoPower > 100) state.shamatoPower = 100;
    saveState();
    updateUI();
  }

  const container = document.getElementById('hearts-display');
  container.innerText += ' 💕';

  if (state.shamatoPower >= 100) {
    unlockAchievement('shamatoFan', '♡ Vínculo Sólido');
    const secretCard = document.getElementById('maria-secret-card');
    if (secretCard) secretCard.style.display = 'block';
  }
}

function getAmatoQuote() {
  const q = ["¡Un momento! Aún queda una prueba por realizar.", "Podemos intentar la maniobra una vez más."];
  document.getElementById('quote-output-box').innerText = "Amato: \"" + q[Math.floor(Math.random()*q.length)] + "\"";
}

function getShadowQuote() {
  const q = ["Mantén la concentración.", "Asegura tu posición antes de avanzar."];
  document.getElementById('quote-output-box').innerText = "Shadow: \"" + q[Math.floor(Math.random()*q.length)] + "\"";
}

function getShamatoQuote() {
  document.getElementById('quote-output-box').innerText = "Amato: '¿Está lista la ruta?'\nShadow: 'Está despejada. Avancemos.'";
}

function generateShamatoScene() {
  document.getElementById('scene-display').innerText = "[Registro]: Se encontraban en el mirador, revisando los sistemas. Finalmente, lograron sincronizar las lecturas de energía.";
}

// LAB DE TAILS
function interactLab(type) {
  const consoleBox = document.getElementById('lab-console');
  let text = "";
  if (type === 'computer') text = "> Registros: Todo funciona según los parámetros.";
  if (type === 'scanner') text = "> Escáner: Lectura Chaos estable.";
  if (type === 'red-button') {
    text = "> ALERTA: Prueba iniciada.";
    unlockAchievement('labDestroyed', '💥 Diagnóstico Lab');
  }
  if (type === 'emerald-test') text = "> Frecuencia Chaos óptima.";
  
  if (consoleBox) {
    consoleBox.innerHTML += `<br>${text}`;
    consoleBox.scrollTop = consoleBox.scrollHeight;
  }
}

// SIMULADOR
function simAction(act) {
  const out = document.getElementById('sim-output');
  if (act === 'comida') out.innerText = "Amato recibe la ración con agrado. 🍨";
  if (act === 'abrazo') out.innerText = "Amato responde cordialmente al saludo.";
  if (act === 'emerald') out.innerText = "Amato observa la esfera e inicia la lectura.";
  if (act === 'shadow') out.innerText = "Shadow hace presencia para supervisar.";
}

function giveHug() {
  state.hugCount++;
  saveState();
  updateUI();
  document.getElementById('hug-response').innerText = "Muestra de apoyo registrada correctamente.";
}

function generateOutfit() {
  const styles = [
    "Estilo Urbano: Chaqueta liviana y botas de ajuste.",
    "Estilo Clásico: Equipamiento deportivo de alta velocidad.",
    "Estilo Coquette: Lazos rosados con chaleco de bolsillos."
  ];
  document.getElementById('outfit-display').innerText = styles[Math.floor(Math.random()*styles.length)];
}

// DIARIO
const diaryPages = [
  "Página 1:\n\nInicio del cuaderno de notas. Registraré observaciones sobre los cristales de energía.",
  "Página 2:\n\nLos días de trabajo junto a Tails han servido para comprender mejor el taller.",
  "Página 3:\n\nEs importante mantener equilibrio entre las actividades y la supervisión.",
  "Página 4:\n\nSonic ofreció una sesión de entrenamiento esta tarde. La resistencia es clave.",
  "Página 5:\n\nKnuckles recordó las precauciones necesarias al aproximarse al altar.",
  "Página 6:\n\nShadow compartió detalles útiles sobre el control de aceleración.",
  "Página 7:\n\nLas lecturas nocturnas están estables. La tranquilidad del área permite trabajar.",
  "Página 8:\n\nRegistro final: Las metas trazadas se cumplen con el apoyo del equipo."
];

let currentDiaryPage = 0;

function changeDiaryPage(dir) {
  currentDiaryPage += dir;
  if (currentDiaryPage < 0) currentDiaryPage = 0;
  if (currentDiaryPage >= diaryPages.length) currentDiaryPage = diaryPages.length - 1;

  document.getElementById('diary-page-num').innerText = currentDiaryPage + 1;
  document.getElementById('diary-content').innerText = diaryPages[currentDiaryPage];
}

// EXTRAS
const letters = {
  sonic: "¡Hola Amato!\nSi vas a salir a correr por la zona este, avísame y vamos juntos.",
  tails: "Amato,\nRecuerda revisar el nivel de carga del escáner antes de salir.",
  amy: "¡Hola!\nOrganizamos una pequeña reunión en la tarde. Estás invitado. 🎀",
