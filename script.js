// ENTRADA AL SITIO
document.getElementById('enterSiteBtn').addEventListener('click', () => {
  document.getElementById('introScreen').style.display = 'none';
  document.getElementById('mainWindow').style.display = 'block';
});

// CAMBIO DE PESTAÑAS
document.querySelectorAll('.nav-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-chip').forEach(el => el.classList.remove('active'));
    
    const tabId = btn.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
  });
});

// MODAL POPUP
const modal = document.getElementById('generalModal');
function showModal(title, text, emoji = "💗") {
  document.getElementById('modalEmoji').innerText = emoji;
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalText').innerHTML = text;
  modal.style.display = 'flex';
}
document.getElementById('modalCloseBtn').addEventListener('click', () => { modal.style.display = 'none'; });

document.querySelectorAll('.pop-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    showModal(btn.getAttribute('data-title'), btn.getAttribute('data-text'), btn.getAttribute('data-emoji') || "💗");
  });
});

// SHADOW PROGRESIVO
let shadowProgIndex = 0;
const shadowProgMsgs = ["Es complicado.", "Es una buena persona.", "Aunque no quiera admitirlo.", "Me gusta estar con él.", "... ¿Podemos hablar de otra cosa?"];
document.getElementById('btnPreguntaShadowProg').addEventListener('click', () => {
  showModal("¿Qué opinas de Shadow?", shadowProgMsgs[shadowProgIndex], "🖤");
  shadowProgIndex = (shadowProgIndex + 1) % shadowProgMsgs.length;
});

let shadowGustaIndex = 0;
const shadowGustaMsgs = ["Siguiente pregunta.", "No.", "...", "Sí."];
document.getElementById('btnShadowGustaProg').addEventListener('click', () => {
  showModal("¿Shadow te gusta?", shadowGustaMsgs[shadowGustaIndex], "🖤");
  shadowGustaIndex = (shadowGustaIndex + 1) % shadowGustaMsgs.length;
});

// DIARIO DE 35 PÁGINAS
let diarioPgIndex = 0;
const diarioPages = [
  "Pag 1: Hoy encontré algo extraño.",
  "Pag 2: Una Chaos Emerald.",
  "Pag 3: Reaccionó conmigo.",
  "Pag 4: ¿Por qué?",
  "Pag 5: Quiero entenderlo.",
  "Pag 6: Quizá los deseos realmente existen.",
  "Pag 7: No quiero volver a perder a alguien.",
  "Pag 8: A veces todavía pienso en aquella noche.",
  "Pag 9: No sé si fue mi culpa.",
  "Pag 10: Probablemente sí.",
  "Pag 18: Hoy conocí a Shadow. Es extraño, no habla mucho.",
  "Pag 22: Shadow me enseñó Chaos Control.",
  "Pag 28: Pero Shadow volvió. Volvió.",
  "Pag 35: No encontré la respuesta que buscaba, pero encontré algo que no estaba buscando: Una familia."
];
document.getElementById('readDiarioPageBtn').addEventListener('click', () => {
  document.getElementById('diarioPageBox').innerText = diarioPages[diarioPgIndex];
  diarioPgIndex = (diarioPgIndex + 1) % diarioPages.length;
});

// TEST OPCIONES
document.querySelectorAll('.test-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    showModal("Resultado del Test", opt.getAttribute('data-res'), "📋");
  });
});

// SIMULADOR
let simFoodCount = 0;
document.getElementById('simComidaBtn').addEventListener('click', () => {
  simFoodCount++;
  const msgs = ["«Gracias.»", "«¿Hay más?»", "«Esto es para mí, ¿verdad?»", "«Creo que estoy lleno.»"];
  document.getElementById('simResultBox').innerText = msgs[Math.min(simFoodCount-1, 3)];
});

// MENSAJES DE SHADOW
const shadowCommons = ["«No es asunto tuyo.»", "«Quédate detrás de mí.»", "«No necesito ayuda.»"];
document.getElementById('genShadowCommon').addEventListener('click', () => {
  document.getElementById('shadowMsgBox').innerText = shadowCommons[Math.floor(Math.random()*shadowCommons.length)];
});

// ESCENAS SHAMATO
document.getElementById('genSceneBtn').addEventListener('click', () => {
  document.getElementById('sceneResultBox').innerHTML = "<strong>Lugar:</strong> Emerald Hill<br><strong>Situación:</strong> Mirando las estrellas<br><strong>Final:</strong> Shadow toma la mano de Amato.";
});

// BUSCAR ESMERALDAS
let foundEmeralds = 0;
document.getElementById('findEmeraldBtn').addEventListener('click', () => {
  if(foundEmeralds < 7) {
    foundEmeralds++;
    document.getElementById('collectionProgress').innerText = `Encontradas: ${foundEmeralds} / 7`;
    document.getElementById('emeraldFindBox').innerText = `¡Encontraste la Esmeralda #${foundEmeralds}! "Una menos."`;
  }
});

// MINIJUEGO
let gameScore = 0;
document.getElementById('startMinigameBtn').addEventListener('click', () => {
  document.getElementById('gameTargetArea').style.display = 'block';
});
document.getElementById('catchEmerald').addEventListener('click', () => {
  gameScore++;
  document.getElementById('gameScoreBox').innerText = `Puntos: ${gameScore} / 7`;
  if(gameScore >= 7) {
    alert("¡LAS ENCONTRASTE TODAS!");
    document.getElementById('gameTargetArea').style.display = 'none';
  }
});

// OUTFITS
document.querySelectorAll('.outfit-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('outfitResultBox').innerText = `Amato viste estilo: ${btn.getAttribute('data-theme')}`;
  });
});

// ARCHIVO CLASIFICADO
document.getElementById('openClassifiedBtn').addEventListener('click', () => {
  document.getElementById('classifiedResult').style.display = 'block';
});

// ENERGÍA SHAMATO
let shamatoLvl = 0;
document.getElementById('btnPlusOneShamato').addEventListener('click', () => {
  shamatoLvl += 10;
  if(shamatoLvl > 100) shamatoLvl = 100;
  document.getElementById('shamatoLvlText').innerText = `Nivel actual: ${shamatoLvl} / 100`;
});

// FINAL SECRETO
document.getElementById('triggerSecretEndingBtn').addEventListener('click', () => {
  const overlay = document.getElementById('secretEndingOverlay');
  overlay.style.display = 'flex';
  document.getElementById('endingTextBox').innerHTML = `<p>Amato: "Ahora simplemente las miro... porque ya no estoy solo."</p><br><small>(Clic para salir)</small>`;
  overlay.onclick = () => { overlay.style.display = 'none'; };
});

// MODOS
document.getElementById('nightModeBtn').addEventListener('click', () => { document.body.className = 'night-mode'; });
document.getElementById('amatoModeBtn').addEventListener('click', () => { document.body.className = 'amato-mode'; });
document.getElementById('shamatoModeBtn').addEventListener('click', () => { document.body.className = 'shamato-mode'; });

// BGM
const bgmAudio = document.getElementById('bgmAudio');
const bgmBtn = document.getElementById('bgmToggleBtn');
let isBgm = false;
bgmBtn.addEventListener('click', () => {
  if(isBgm) { bgmAudio.pause(); bgmBtn.innerText = "🎵 Música: OFF"; }
  else { bgmAudio.play(); bgmBtn.innerText = "🎵 Música: ON 🎶"; }
  isBgm = !isBgm;
});
