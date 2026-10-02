// ===================================================
// EFECTO DE SONIDO KAWAII INTERACTIVO (Web Audio API)
// ===================================================
function playClickSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch(e) {
    console.log("Audio API ready");
  }
}

// ===================================================
// NAVEGACIÓN ENTRE PESTAÑAS
// ===================================================
document.querySelectorAll('.nav-tab').forEach(button => {
  button.addEventListener('click', (e) => {
    playClickSound();
    
    document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// ===================================================
// BASE DE DATOS DE PERSONAJES (POP-UP)
// ===================================================
const charData = {
  sonic: { emoji: "💙", name: "Sonic the Hedgehog", rel: "Mejores Amigos", thought: "Amato admira su libertad y optimismo. Le enseñó a volver a divertirse.", quote: "“¡Sonic es increíble! Nunca te aburres a su lado.”" },
  tails: { emoji: "🧡", name: "Miles 'Tails' Prower", rel: "Compañeros de Ciencia", thought: "Conversan por horas sobre el funcionamiento de las Chaos Emeralds.", quote: "“Tails entiende la ciencia detrás de la energía.”" },
  amy: { emoji: "🌸", name: "Amy Rose", rel: "Apoyo Emocional", thought: "Amy siempre nota cuando Amato finge estar bien detrás de su sonrisa.", quote: "“Amy siempre tiene el mejor abrazo listo.”" },
  knuckles: { emoji: "🔥", name: "Knuckles the Echidna", rel: "Rivalidad Amistosa", thought: "Amato adora molestarlo por lo fácil que se enoja.", quote: "“Se enoja rápido pero daría la vida por sus amigos.”" },
  cream: { emoji: "🩷", name: "Cream the Rabbit", rel: "Vínculo Protector", thought: "Amato la cuida como a una hermanita menor.", quote: "“Cream es demasiado tierna, la protegeré siempre.”" },
  shadow: { emoji: "🖤", name: "Shadow the Hedgehog", rel: "Enamorados (Shamato ❤️)", thought: "Se entienden profundamente a través del dolor y la soledad que ambos vivieron.", quote: "“Shadow solo necesita a alguien que decida quedarse.”" },
  eggman: { emoji: "🥚", name: "Dr. Eggman", rel: "Rival / Enemigo", thought: "No soporta que use las Chaos Emeralds para lastimar a los demás.", quote: "“Es listo, pero no tengo por qué soportarlo.”" },
  maria: { emoji: "🌹", name: "Maria Robotnik", rel: "Respeto Profundo", thought: "La respeta por lo extremadamente importante que fue para Shadow.", quote: "“Entiendo perfectamente por qué Shadow la quería tanto.”" }
};

const modal = document.getElementById('charModal');
const closeModalBtn = document.getElementById('closeModalBtn');

document.querySelectorAll('.char-card').forEach(card => {
  card.addEventListener('click', () => {
    playClickSound();
    const key = card.getAttribute('data-char');
    const data = charData[key];

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
  playClickSound();
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// ===================================================
// BASE DE DATOS DE PLAYLISTS / JUKEBOX
// ===================================================
const songData = {
  amato: [
    { name: "I'm Not a Good Person", artist: "The Reasons", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { name: "Sweet But Psycho", artist: "Ava Max", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
  ],
  shamato: [
    { name: "Risk It All", artist: "Bruno Mars", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
  ],
  friends: [
    { name: "Live & Learn", artist: "Crush 40", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
  ]
};

function loadPlaylist(key) {
  const list = songData[key];
  const container = document.getElementById('songList');
  container.innerHTML = "";
  
  list.forEach(song => {
    const li = document.createElement('li');
    li.className = 'song-item';
    li.innerHTML = `<span>🎵 ${song.name}</span> <small>${song.artist}</small>`;
    
    li.onclick = () => {
      playClickSound();
      document.getElementById('songTitle').innerText = song.name;
      document.getElementById('songArtist').innerText = song.artist;
      const player = document.getElementById('audioPlayer');
      player.src = song.url;
      player.play();
    };
    
    container.appendChild(li);
  });
}

document.querySelectorAll('.playlist-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    playClickSound();
    document.querySelectorAll('.playlist-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const vibe = btn.getAttribute('data-vibe');
    loadPlaylist(vibe);
  });
});

// Cargar la primera playlist por defecto
loadPlaylist('amato');
