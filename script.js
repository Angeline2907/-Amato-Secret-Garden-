// ENTRADA AL SITIO
document.getElementById('enterSiteBtn').addEventListener('click', () => {
  document.getElementById('introScreen').style.display = 'none';
  document.getElementById('mainWindow').style.display = 'block';
});

// CAMBIO DE PESTAÑAS
document.querySelectorAll('.nav-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
    
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

// BOTONES POPUP (.pop-btn)
document.querySelectorAll('.pop-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    showModal(btn.getAttribute('data-title'), btn.getAttribute('data-text'), btn.getAttribute('data-emoji') || "💗");
  });
});

// PREGUNTA PROGRESIVA SHADOW
let shadowProgIndex = 0;
const shadowProgMsgs = [
  "Es complicado.",
  "Es una buena persona.",
  "Aunque no quiera admitirlo.",
  "Me gusta estar con él.",
  "... ¿Podemos hablar de otra cosa?"
];
document.getElementById('btnPreguntaShadowProg').addEventListener('click', () => {
  showModal("¿Qué opinas de Shadow?", shadowProgMsgs[shadowProgIndex], "🖤");
  shadowProgIndex = (shadowProgIndex + 1) % shadowProgMsgs.length;
});

// PREGUNTA PROGRESIVA ¿SHADOW TE GUSTA?
let shadowGustaIndex = 0;
const shadowGustaMsgs = ["Siguiente pregunta.", "No.", "...", "Sí."];
document.getElementById('btnShadowGustaProg').addEventListener('click', () => {
  showModal("¿Shadow te gusta?", shadowGustaMsgs[shadowGustaIndex], "🖤");
  shadowGustaIndex = (shadowGustaIndex + 1) % shadowGustaMsgs.length;
});

// TEST OPCIONES
document.querySelectorAll('.test-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    showModal("Resultado del Test", opt.getAttribute('data-res'), "📋");
  });
});

// SIMULADOR DE AMATO
let simFoodCount = 0, simHugCount = 0, simEmeraldCount = 0, simShadowCount = 0;
document.getElementById('simComidaBtn').addEventListener('click', () => {
  simFoodCount++;
  const msgs = ["«Gracias.»", "«¿Hay más?»", "«Esto es para mí, ¿verdad?»", "«Creo que estoy lleno.»", "«¿De dónde estás sacando tanta comida?»"];
  document.getElementById('simResultBox').innerText = msgs[Math.min(simFoodCount-1, 4)];
});

document.getElementById('simAbrazoBtn').addEventListener('click', () => {
  simHugCount++;
  const msgs = ["«¿Eh?»", "«...Gracias.»", "«¿Puedo quedarme así un poquito?»", "«No sabía que necesitaba esto.»"];
  document.getElementById('simResultBox').innerText = msgs[Math.min(simHugCount-1, 3)];
});

document.getElementById('simEmeraldBtn').addEventListener('click', () => {
  simEmeraldCount++;
  const msgs = ["«¿Dónde conseguiste eso?»", "«Espera, déjame verla.»", "«¿Puedo analizarla?»", "«Solo un poquito.»", "«Tails va a matarme.»"];
  document.getElementById('simResultBox').innerText = msgs[Math.min(simEmeraldCount-1, 4)];
});

document.getElementById('simShadowBtn').addEventListener('click', () => {
  simShadowCount++;
  const msgs = ["«¿Shadow?»", "«¿Dónde está?»", "«Ah.»", "«No estoy buscando a Shadow.»", "«...Bueno, sí.»"];
  document.getElementById('simResultBox').innerText = msgs[Math.min(simShadowCount-1, 4)];
});

// MENSAJES DE SHADOW
const shadowCommons = ["«No es asunto tuyo.»", "«Quédate detrás de mí.»", "«No necesito ayuda.»", "«Estoy bien.»", "«Deja de preguntar.»"];
const shadowHiddens = ["«Avísame cuando llegues.»", "«Yo te cubro.»", "«No tienes que hacerlo solo.»", "«Estoy aquí.»"];
const shadowRares = ["«Te ves bien hoy.»", "«No estaba mirándote.»", "«...No me molesta.»", "«Puedes quedarte.»"];

document.getElementById('genShadowCommon').addEventListener('click', () => {
  document.getElementById('shadowMsgBox').innerText = shadowCommons[Math.floor(Math.random()*shadowCommons.length)];
});
document.getElementById('genShadowHidden').addEventListener('click', () => {
  document.getElementById('shadowMsgBox').innerText = shadowHiddens[Math.floor(Math.random()*shadowHiddens.length)];
});
document.getElementById('genShadowRare').addEventListener('click', () => {
  document.getElementById('shadowMsgBox').innerText = shadowRares[Math.floor(Math.random()*shadowRares.length)];
});

// GENERADOR DE ESCENAS SHAMATO
const places = ["Emerald Hill", "Un campo", "El laboratorio de Tails", "Bajo las estrellas"];
const situts = ["Están descansando después de una misión", "Amato intenta aprender Chaos Control", "Ambos están mirando las estrellas"];
const endings = ["Se quedan sentados juntos", "Shadow toma la mano de Amato", "Amato apoya la cabeza en Shadow"];

document.getElementById('genSceneBtn').addEventListener('click', () => {
  const p = places[Math.floor(Math.random()*places.length)];
  const s = situts[Math.floor(Math.random()*situts.length)];
  const e = endings[Math.floor(Math.random()*endings.length)];
  document.getElementById('sceneResultBox').innerHTML = `<strong>Lugar:</strong> ${p}<br><strong>Situación:</strong> ${s}<br><strong>Final:</strong> ${e}`;
});

// BUSCAR ESMERALDAS (COLECCIÓN)
let foundEmeralds = 0;
document.getElementById('findEmeraldBtn').addEventListener('click', () => {
  if(foundEmeralds < 7) {
    foundEmeralds++;
    document.getElementById('collectionProgress').innerText = `Encontradas: ${foundEmeralds} / 7`;
    document.getElementById('emeraldFindBox').innerText = `¡Encontraste la Esmeralda #${foundEmeralds}! "Una menos."`;
    if(foundEmeralds === 7) {
      document.getElementById('emeraldFindBox').innerText = "¡COLECCIÓN COMPLETA! Amato mira las 7 Emeralds. Encontró respuestas, amigos y una familia.";
    }
  }
});

// HABITACIÓN: PELUCHE Y DIARIO
let plushClicks = 0;
document.getElementById('roomPlushBtn').addEventListener('click', () => {
  plushClicks++;
  const msgs = ["«Este es importante.»", "«No preguntes.»", "«...Lo abrazo cuando nadie está mirando.»"];
  showModal("Peluche", msgs[Math.min(plushClicks-1, 2)], "🧸");
});

let diarioClicks = 0;
document.getElementById('roomDiarioBtn').addEventListener('click', () => {
  diarioClicks++;
  const msgs = ["«No deberías leer eso.»", "«En serio.»", "«Por favor.»", "«...Bueno: Hoy conocí a Shadow. No habla mucho. Quiero saber más sobre él. Volvió.»"];
  showModal("Diario Secreto", msgs[Math.min(diarioClicks-1, 3)], "📓");
});

// MINIJUEGO
let gameScore = 0;
document.getElementById('startMinigameBtn').addEventListener('click', () => {
  document.getElementById('gameTargetArea').style.display = 'block';
  gameScore = 0;
  document.getElementById('gameScoreBox').innerText = "Puntos: 0 / 7";
  moveEmerald();
});

const catchEmerald = document.getElementById('catchEmerald');
function moveEmerald() {
  catchEmerald.style.top = Math.floor(Math.random()*70) + 'px';
  catchEmerald.style.left = Math.floor(Math.random()*80) + '%';
}

catchEmerald.addEventListener('click', () => {
  gameScore++;
  document.getElementById('gameScoreBox').innerText = `Puntos: ${gameScore} / 7`;
  if(gameScore >= 7) {
    alert("¡LAS ENCONTRASTE TODAS! Amato: '¡Sabía que podías hacerlo!'");
    document.getElementById('gameTargetArea').style.display = 'none';
  } else {
    moveEmerald();
  }
});

// VISTE A AMATO
document.querySelectorAll('.outfit-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('outfitResultBox').innerText = `Amato ahora viste estilo: ${btn.getAttribute('data-theme')}! «Me gusta. Voy a salir así.»`;
  });
});
document.getElementById('randomOutfitBtn').addEventListener('click', () => {
  const themes = ["Casual 👟", "Aventura 🎒", "Coquette 🎀", "Gothic 🖤", "Napolitano 🍨"];
  const rand = themes[Math.floor(Math.random()*themes.length)];
  document.getElementById('outfitResultBox').innerText = `Outfit Aleatorio: ${rand}! «A ver qué sale...»`;
});

// ARCHIVO CLASIFICADO
document.getElementById('openClassifiedBtn').addEventListener('click', () => {
  document.getElementById('classifiedResult').style.display = 'block';
});

// ESTADO ACTUAL
const moods = [
  "Feliz: Hoy está bastante bien. Hablando demasiado.",
  "Triste: Está tranquilo. Demasiado tranquilo.",
  "Curioso: Encontró algo extraño. Ya está investigándolo.",
  "Día Shamato: Shadow está cerca. Amato parece bastante contento."
];
document.getElementById('checkMoodBtn').addEventListener('click', () => {
  document.getElementById('moodResultBox').innerText = moods[Math.floor(Math.random()*moods.length)];
});

// FRASES 2
const quotesAmato = ["«¡Espera, espera! ¡Tengo una pregunta!»", "«¡Eso fue increíble!»", "«Prometo que no voy a tocarlo... No prometí eso.»"];
const quotesShadow = ["«No es asunto tuyo.»", "«Quédate detrás de mí.»", "«...Me alegra que estés bien.»"];
const quotesShamato = ["«No tienes que estar solo.»", "«Entonces quédate.»", "«No pienso irme.»"];

document.getElementById('btnQuoteAmato2').addEventListener('click', () => {
  document.getElementById('quoteResultBox2').innerText = quotesAmato[Math.floor(Math.random()*quotesAmato.length)];
});
document.getElementById('btnQuoteShadow2').addEventListener('click', () => {
  document.getElementById('quoteResultBox2').innerText = quotesShadow[Math.floor(Math.random()*quotesShadow.length)];
});
document.getElementById('btnQuoteShamato2').addEventListener('click', () => {
  document.getElementById('quoteResultBox2').innerText = quotesShamato[Math.floor(Math.random()*quotesShamato.length)];
});

// ENERGÍA SHAMATO
let shamatoLvl = 0;
document.getElementById('btnPlusOneShamato').addEventListener('click', () => {
  shamatoLvl += 10;
  if(shamatoLvl > 100) shamatoLvl = 100;
  document.getElementById('shamatoLvlText').innerText = `Nivel actual: ${shamatoLvl} / 100`;
  if(shamatoLvl >= 100) {
    document.getElementById('shamatoLvlMsg').innerText = "¡100/100! Están enamorados. Puedes parar. ❤️";
  } else {
    document.getElementById('shamatoLvlMsg').innerText = `Energía aumentando... (${shamatoLvl}%)`;
  }
});

// ESCRÍBELE A AMATO
document.getElementById('sendLetterBtn').addEventListener('click', () => {
  const txt = document.getElementById('userLetterText').value;
  if(txt) {
    document.getElementById('letterReplyBox').style.display = 'block';
    document.getElementById('letterReplyBox').innerHTML = "Amato: «Gracias. De verdad necesitaba escuchar eso. Voy a guardar esta carta.»";
  }
});

// DESEO
document.getElementById('sendWishBtn').addEventListener('click', () => {
  const txt = document.getElementById('userWishInput').value;
  if(txt) {
    document.getElementById('wishReplyBox').style.display = 'block';
    document.getElementById('wishReplyBox').innerHTML = "Las estrellas escucharon. Quizá algunos deseos cambian las cosas simplemente porque los dijimos en voz alta. ✨";
  }
});

// REGALOS
const gifts = ["Un dulce napolitano. Amato se lo quedó. 🍨", "Una foto vieja. 'No sabía que esta estaba aquí.' 📷", "¡Una Chaos Emerald! '¿QUÉ?' 💎", "Una foto de Amato y Shadow. 🖤🍓"];
document.getElementById('openGiftBtn').addEventListener('click', () => {
  document.getElementById('giftResultBox').innerText = gifts[Math.floor(Math.random()*gifts.length)];
});

// FINAL SECRETO
document.getElementById('triggerSecretEndingBtn').addEventListener('click', () => {
  const overlay = document.getElementById('secretEndingOverlay');
  const box = document.getElementById('endingTextBox');
  overlay.style.display = 'flex';
  
  box.innerHTML = `<p>Amato: "Hace mucho tiempo miré las estrellas y pedí que todo terminara..."</p><br><p>Shadow: "¿Y ahora?"</p><br><p>Amato: "Ahora simplemente las miro... porque ya no estoy solo."</p><br><br><small>(Haz clic para cerrar)</small>`;
  
  overlay.onclick = () => { overlay.style.display = 'none'; };
});

// MODOS ESPECIALES DE NAVEGADOR
document.getElementById('nightModeBtn').addEventListener('click', () => { document.body.className = 'night-mode'; });
document.getElementById('amatoModeBtn').addEventListener('click', () => { document.body.className = 'amato-mode'; });
document.getElementById('shamatoModeBtn').addEventListener('click', () => { document.body.className = 'shamato-mode'; });

// REPRODUCTOR BGM
const bgmAudio = document.getElementById('bgmAudio');
const bgmBtn = document.getElementById('bgmToggleBtn');
let isBgm = false;
bgmBtn.addEventListener('click', () => {
  if(isBgm) { bgmAudio.pause(); bgmBtn.innerText = "🎵 Música de Fondo: OFF"; }
  else { bgmAudio.play(); bgmBtn.innerText = "🎵 Música de Fondo: ON 🎶"; }
  isBgm = !isBgm;
});
