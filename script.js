// ===================================================
// BASE DE DATOS DE LOS PERSONAJES
// ===================================================
const charactersData = {
  sonic: {
    emoji: "💙",
    name: "Sonic the Hedgehog",
    rel: "Mejores Amigos / Companeros de Aventura",
    thought: "Amato admira muchísimo a Sonic. Su velocidad y confianza le enseñaron a Amato que podía volver a divertirse sin culpa.",
    quote: "“¡Sonic es increíble! Es rápido, divertido y nunca abandona a sus amigos. ¡Es imposible aburrirse a su lado!”"
  },
  tails: {
    emoji: "🧡",
    name: "Miles 'Tails' Prower",
    rel: "Amigos Cercanos / Compañeros de Investigación",
    thought: "Conectan por su gran curiosidad intelectual. Pasan horas conversando sobre cómo funcionan la ciencia y las Chaos Emeralds.",
    quote: "“¡Tails es súper inteligente! Si alguien puede entender la energía Chaos desde la ciencia, es él.”"
  },
  amy: {
    emoji: "🌸",
    name: "Amy Rose",
    rel: "Amigas Cercanas / Apoyo Emocional",
    thought: "Amy es de las pocas personas que nota inmediatamente cuando Amato está sonriendo por compromiso o para ocultar su tristeza.",
    quote: "“Amy tiene un sexto sentido para saber cuándo alguien necesita un abrazo sincero.”"
  },
  knuckles: {
    emoji: "🔥",
    name: "Knuckles the Echidna",
    rel: "Rivalidad Amistosa",
    thought: "Amato adora molestarlo por lo fácil que se enoja, pero confían ciegamente el uno en el otro a la hora de protegerse.",
    quote: "“Knuckles se enoja rápido... pero protegería a sus amigos sin dudarlo ni un segundo.”"
  },
  cream: {
    emoji: "🩷",
    name: "Cream the Rabbit",
    rel: "Vínculo Protector / Amistad Tierna",
    thought: "Amato la trata con muchísimo cariño y la protege. Estar con Cream le permite disfrutar de una inocencia que sintió perdida.",
    quote: "“Cream es demasiado adorable. ¡Si alguien le hace daño, se las verá conmigo!”"
  },
  shadow: {
    emoji: "🖤",
    name: "Shadow the Hedgehog",
    rel: "Compañeros → Enamorados (Shamato ❤️)",
    thought: "Comenzó como fascinación por su dominio del Chaos Control. Descubrieron que ambos comprenden el dolor de perder a alguien importante.",
    quote: "“Shadow parece alguien que no necesita a nadie... pero creo que solo necesita que alguien decida quedarse.”"
  },
  eggman: {
    emoji: "🥚",
    name: "Dr. Eggman",
    rel: "Rival / Enemigo",
    thought: "Amato no tolera que intente utilizar las Chaos Emeralds para fines malvados o para lastimar a los demás.",
    quote: "“Es inteligente, sí. ¿Eso significa que tenga que soportarlo? No.”"
  },
  maria: {
    emoji: "🌹",
    name: "Maria Robotnik",
    rel: "Respeto a través de los recuerdos de Shadow",
    thought: "Amato nunca la conoció, pero respeta enormemente su memoria porque entiende lo crucial que fue para Shadow.",
    quote: "“Nunca pude conocerla... pero entiendo por qué Shadow la quería tanto.”"
  }
};

// ===================================================
// SISTEMA DE SONIDOS KAWAII (Web Audio API)
// ===================================================
function playKawaiiSound(freq = 587.33) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  } catch (e) {
    console.log("Audio not allowed yet.");
  }
}

// ===================================================
// NAVEGACIÓN ENTRE PESTAÑAS
// ===================================================
document.querySelectorAll('.nav-tab').forEach(button => {
  button.addEventListener('click', () => {
    playKawaiiSound(659.25);
    
    // Remover clase activa de todos los botones y secciones
    document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    // Activar botón y pestaña seleccionada
    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// ===================================================
// POP-UP INTERACTIVO DE PERSONAJES
// ===================================================
const modal = document.getElementById('charModal');
const closeModalBtn = document.getElementById('closeModalBtn');

document.querySelectorAll('.char-card').forEach(card => {
  card.addEventListener('click', () => {
    playKawaiiSound(880);
    const charKey = card.getAttribute('data-char');
    const data = charactersData[charKey];

    if (data) {
      document.getElementById('modalEmoji').innerText = data.emoji;
      document.getElementById('modalName').innerText = data.name;
      document.getElementById('modalRel').innerText = data.rel;
      document.getElementById('modalThought').innerText = data.thought;
      document.getElementById('modalQuote').innerText = data.quote;

      modal.style.display = 'flex';
    }
  });
});

closeModalBtn.addEventListener('click', () => {
  playKawaiiSound(440);
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Botón de música
document.getElementById('musicToggleBtn').addEventListener('click', () => {
  playKawaiiSound(523.25);
  alert("🎶 Playing: Risk It All - Bruno Mars (Shamato Theme)");
});
