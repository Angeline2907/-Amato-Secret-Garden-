/* ==========================================================================
   ESTADO GLOBAL Y ALMACENAMIENTO
   ========================================================================== */
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
    } catch(e) {
      console.error("Error al cargar el estado guardado", e);
    }
  }
  state.visits = (state.visits || 0) + 1;
  saveState();
  updateUI();
}

function saveState() {
  localStorage.setItem('amato_archive_state', JSON.stringify(state));
}

function updateUI() {
  document.getElementById('visit-counter').innerText = String(state.visits).padStart(6, '0');
  const emeraldCount = state.emeralds.filter(Boolean).length;
  document.getElementById('emerald-count').innerText = emeraldCount;
  document.getElementById('shamato-power').innerText = state.shamatoPower;
  document.getElementById('shamato-counter-val').innerText = state.shamatoPower;
  document.getElementById('hug-count-display').innerText = state.hugCount;

  renderAchievements();
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

/* ==========================================================================
   SISTEMA DE NAVEGACIÓN
   ========================================================================== */
function switchTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  
  const targetPanel = document.getElementById(tabId);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }

  const tabs = ['tab-main', 'tab-lore', 'tab-shamato', 'tab-lab', 'tab-interact', 'tab-diario', 'tab-extras'];
  const idx = tabs.indexOf(tabId);
  const btns = document.querySelectorAll('.nav-btn');
  if (idx !== -1 && btns[idx]) {
    btns[idx].classList.add('active');
  }

  if (tabId === 'tab-diario') {
    unlockAchievement('diarioOpen', '☆ Consulta del Diario');
  }
}

/* ==========================================================================
   SISTEMA DE CHAOS EMERALDS
   ========================================================================== */
function triggerSecretEmerald(num) {
  const index = num - 1;
  if (!state.emeralds[index]) {
    state.emeralds[index] = true;
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

/* ==========================================================================
   DATOS Y ACCIONES INTERACTIVAS
   ========================================================================== */
const facts = [
  "Amato maneja con soltura la escritura y dibujo con ambas manos.",
  "Sus colores distintivos están inspirados en la combinación napolitana.",
  "Demuestra un interés constante por comprender las técnicas de control de energía.",
  "Suele hablar con rapidez cuando analiza temas de su interés.",
  "Acostumbra realizar recorridos continuos por Emerald Hill.",
  "Demuestra un fuerte compromiso con el cuidado de sus amigos."
];

function generateRandomFact() {
  const random = facts[Math.floor(Math.random() * facts.length)];
  document.getElementById('random-fact-text').innerText = random;
}

function setMood(mood) {
  const display = document.getElementById('mood-display');
  const moods = {
    feliz: "Estado: Amato se encuentra animado y recorriendo la zona.",
    triste: "Estado: Reflexivo y silencioso. El grupo permanece atento.",
    curioso: "Estado: Analizando un objeto en el laboratorio.",
    caotico: "Estado: Realizando pruebas de energía con alta intensidad.",
    shamato: "Estado: Entrenando maniobras defensivas junto a Shadow."
  };
  display.innerText = moods[mood] || "Estado no determinado.";
}

function clickAmato() {
  const msgs = [
    "¡Hola! ¿Necesitas revisar algún dato?",
    "Estoy revisando las mediciones del área.",
    "¿Quieres ver los avances en el mapa?",
    "Todo en orden por aquí."
  ];
  showToast(msgs[Math.floor(Math.random() * msgs.length)]);
}

/* ==========================================================================
   SECCIÓN SHAMATO
   ========================================================================== */
function addShamatoEnergy() {
  if (state.shamatoPower < 100) {
    state.shamatoPower += 10;
    if (state.shamatoPower > 100) state.shamatoPower = 100;
    saveState();
    updateUI();
  }
  
  const msgs = [
    "Shadow observa en silencio.",
    "Amato confirma el progreso del entrenamiento.",
    "Sincronización de energía mejorada.",
    "Coordinación de equipo incrementada."
  ];
  document.getElementById('shamato-msg').innerText = msgs[Math.floor(Math.random() * msgs.length)];

  if (state.shamatoPower >= 100) {
    unlockAchievement('shamatoFan', '♡ Vínculo Sólido');
    document.getElementById('maria-secret-card').style.display = 'block';
  }
}

function getAmatoQuote() {
  const q = [
    "¡Un momento! Aún queda una prueba por realizar.",
    "Asegurémonos de revisar el perímetro.",
    "Podemos intentar la maniobra una vez más."
  ];
  document.getElementById('quote-output-box').innerText = "Amato: \"" + q[Math.floor(Math.random()*q.length)] + "\"";
}

function getShadowQuote() {
  const q = [
    "Mantén la concentración.",
    "Asegura tu posición antes de avanzar.",
    "Avanzaremos según lo planeado."
  ];
  document.getElementById('quote-output-box').innerText = "Shadow: \"" + q[Math.floor(Math.random()*q.length)] + "\"";
}

function getShamatoQuote() {
  const dialogs = [
    "Amato: '¿Está lista la ruta?'\nShadow: 'Está despejada. Avancemos.'",
    "Amato: 'El sensor registra actividad.'\nShadow: 'Mantente alerta, yo cubro la retaguardia.'"
  ];
  document.getElementById('quote-output-box').innerText = dialogs[Math.floor(Math.random()*dialogs.length)];
}

function generateShamatoScene() {
  const places = ["en el mirador", "en la zona de pruebas", "en el taller", "cerca de la costa"];
  const actions = ["revisando los sistemas", "realizando ejercicios de velocidad", "evaluando mapas", "organizando el equipamiento"];
  const outcomes = ["completaron la tarea sin contratiempos.", "lograron sincronizar las lecturas de energía.", "acordaron una nueva sesión de entrenamiento."];

  const p = places[Math.floor(Math.random()*places.length)];
  const a = actions[Math.floor(Math.random()*actions.length)];
  const o = outcomes[Math.floor(Math.random()*outcomes.length)];

  document.getElementById('scene-display').innerText = `[Registro]: Se encontraban ${p}, ${a}. Finalmente, ${o}`;
}

/* ==========================================================================
   LABORATORIO
   ========================================================================== */
function interactLab(type) {
  const consoleBox = document.getElementById('lab-console');
  let text = "";
  if (type === 'computer') text = "> Registros del sistema: Todo funciona según los parámetros.";
  if (type === 'scanner') text = "> Escáner: Lectura de energía estable detectada.";
  if (type === 'red-button') {
    text = "> ALERTA: Prueba de diagnóstico iniciada.";
    unlockAchievement('labDestroyed', '💥 Diagnóstico de Laboratorio');
  }
  if (type === 'emerald-test') text = "> Frecuencia Chaos medida en niveles óptimos.";
  
  consoleBox.innerHTML += `<br>${text}`;
  consoleBox.scrollTop = consoleBox.scrollHeight;
}

/* ==========================================================================
   SIMULADOR Y ATUENDOS
   ========================================================================== */
function simAction(act) {
  const out = document.getElementById('sim-output');
  if (act === 'comida') out.innerText = "Amato recibe la ración con agrado.";
  if (act === 'abrazo') out.innerText = "Amato responde cordialmente al saludo.";
  if (act === 'emerald') out.innerText = "Amato observa la esfera e inicia la lectura de datos.";
  if (act === 'shadow') out.innerText = "Shadow hace presencia para supervisar la actividad.";
}

function giveHug() {
  state.hugCount++;
  saveState();
  updateUI();
  document.getElementById('hug-response').innerText = "Muestra de apoyo registrada correctamente.";
}

function generateOutfit() {
  const styles = [
    "Estilo Urbano: Chaqueta liviana, botas reforzadas y guantes de ajuste.",
    "Estilo Clásico: Equipamiento deportivo simplificado para alta velocidad.",
    "Estilo Explorador: Chaleco de bolsillos múltiples para instrumentos de laboratorio."
  ];
  document.getElementById('outfit-display').innerText = styles[Math.floor(Math.random()*styles.length)];
}

/* ==========================================================================
   SISTEMA DE DIARIO
   ========================================================================== */
const diaryPages = [
  "Página 1:\n\nInicio del cuaderno de notas. Registraré aquí las observaciones sobre los cristales de energía hallados en la zona.",
  "Página 2:\n\nLos días de trabajo junto a Tails han servido para comprender mejor el comportamiento de las herramientas del taller.",
  "Página 3:\n\nEs importante mantener un equilibrio entre las actividades diarias y los recorridos de supervisión.",
  "Página 4:\n\nSonic offered una sesión de entrenamiento esta tarde. La resistencia es clave.",
  "Página 5:\n\nKnuckles recordó las precauciones necesarias al aproximarse al altar. Mantendremos distancia respetuosa.",
  "Página 6:\n\nShadow compartió detalles útiles sobre el control de la aceleración. Sus explicaciones son precisas.",
  "Página 7:\n\nLas lecturas nocturnas están estables. La tranquilidad del área permite trabajar bien.",
  "Página 8:\n\nRegistro final: Las metas trazadas se van cumpliendo progresivamente con el apoyo del equipo."
];

let currentDiaryPage = 0;

function changeDiaryPage(dir) {
  currentDiaryPage += dir;
  if (currentDiaryPage < 0) currentDiaryPage = 0;
  if (currentDiaryPage >= diaryPages.length) currentDiaryPage = diaryPages.length - 1;
  
  document.getElementById('diary-page-num').innerText = currentDiaryPage + 1;
  document.getElementById('diary-content').innerText = diaryPages[currentDiaryPage];
}

/* ==========================================================================
   CARTAS Y EXTRAS
   ========================================================================== */
const letters = {
  sonic: "¡Hola Amato!\nSi vas a salir a correr por la zona este, avísame y recorremos el tramo juntos.",
  tails: "Amato,\nRecuerda revisar el nivel de carga de las baterías del escáner antes de la siguiente salida.",
  amy: "¡Hola!\nOrganizamos una reunión pequeña en la tarde. Estás cordialmente invitado.",
  knuckles: "Amato,\nLas zonas elevadas están seguras. Reporta cualquier anomalía que encuentres.",
  cream: "¡Hola Amato!\nCheese y yo dejamos unos bocadillos en la mesa principal. ¡Que tengas un buen día!",
  shadow: "Amato,\nMantén la disciplina durante los recorridos. Estaré supervisando la ruta sur.\n- Shadow"
};

function showLetter() {
  const val = document.getElementById('letter-select').value;
  document.getElementById('letter-content').innerText = letters[val] || "Mensaje no encontrado.";
}

function openGachaBox() {
  const items = [
    "📦 [Objeto] Ración de provisiones.",
    "🖼️ [Objeto] Plano topográfico de Emerald Hill.",
    "💎 [Objeto] Fragmento de cristal brillante.",
    "✨ [Objeto] Insignia conmemorativa."
  ];
  document.getElementById('gacha-result').innerText = items[Math.floor(Math.random()*items.length)];
}

function sendStarWish() {
  const val = document.getElementById('star-wish-input').value;
  if (!val.trim()) return;
  document.getElementById('star-wish-response').innerText = "Registro guardado: \"" + val + "\".";
  document.getElementById('star-wish-input').value = "";
}

/* ==========================================================================
   LOGROS Y MÓDULOS DE CONTROL
   ========================================================================== */
const achDefs = {
  visited: "♡ Primer Ingreso (Visita al archivo)",
  firstEmerald: "💎 Coleccionista de Esferas",
  allEmeralds: "🌟 El Poder de las 7 Emeralds",
  shamatoFan: "♡ Vínculo Sólido",
  diarioOpen: "☆ Consulta del Diario",
  labDestroyed: "💥 Diagnóstico de Laboratorio"
};

function renderAchievements() {
  const container = document.getElementById('achievements-list');
  container.innerHTML = "";
  for (let key in achDefs) {
    const isUnlocked = state.achievements[key];
    const badge = document.createElement('span');
    badge.className = `achievement-badge ${isUnlocked ? '' : 'locked'}`;
    badge.innerText = (isUnlocked ? "✓ " : "🔒 ") + achDefs[key];
    container.appendChild(badge);
  }
}

function unlockAchievement(key, name) {
  if (!state.achievements[key]) {
    state.achievements[key] = true;
    saveState();
    updateUI();
    showToast(`¡Logro Desbloqueado: ${name}! 🎉`);
  }
}

function toggleNightMode() {
  document.body.classList.toggle('night-mode');
  showToast("Modo de vista alternado ☆");
}

function toggleAmatoMode() {
  alert("AMATO MODE ACTIVADO:\nInterfaz ajustada para acceso rápido de parámetros.");
}

function toggleShamatoMode() {
  document.body.classList.toggle('shamato-mode');
  showToast("Vista de cooperación activada.");
}

// Carga inicial
window.onload = function() {
  loadState();
  changeDiaryPage(0);
  showLetter();
};
