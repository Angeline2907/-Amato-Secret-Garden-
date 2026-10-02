// ===================================================
// BASE DE DATOS DE CANCIONES / PLAYLISTS
// ===================================================
const playlists = {
  amato: {
    title: "🍨 Playlist: Amato Core Vibes",
    songs: [
      { name: "I'm Not a Good Person", artist: "The Reasons", file: "audio/amato-song.mp3" },
      { name: "Sweet But Psycho (Acoustic)", artist: "Ava Max", file: "audio/amato-sweet.mp3" },
      { name: "Emerald Hill Zone (Lofi Cover)", artist: "Sonic Beats", file: "audio/emerald-lofi.mp3" }
    ]
  },
  shamato: {
    title: "🖤🍓 Playlist: Shamato Romance",
    songs: [
      { name: "Risk It All", artist: "Bruno Mars", file: "audio/risk-it-all.mp3" },
      { name: "All of Me", artist: "John Legend", file: "audio/shamato-love.mp3" },
      { name: "Chaos Control Theme (Piano)", artist: "SA2 Tribute", file: "audio/chaos-piano.mp3" }
    ]
  },
  friends: {
    title: "🌸 Playlist: Friendship & Adventures",
    songs: [
      { name: "Live & Learn (Acoustic)", artist: "Crush 40", file: "audio/live-and-learn.mp3" },
      { name: "It Doesn't Matter", artist: "Sonic Team", file: "audio/sonic-friends.mp3" }
    ]
  }
};

// DATA DE PERSONAJES (MODAL)
const charactersData = {
  sonic: { emoji: "💙", name: "Sonic the Hedgehog", rel: "Mejores Amigos", thought: "Amato admira su libertad y energía.", quote: "“¡Sonic es increíble, nunca te aburres a su lado!”" },
  tails: { emoji: "🧡", name: "Miles 'Tails' Prower", rel: "Compañeros de Ciencia", thought: "Conversan por horas sobre las Chaos Emeralds.", quote: "“Tails entiende la ciencia detrás del poder.”" },
  amy: { emoji: "🌸", name: "Amy Rose", rel: "Apoyo Emocional", thought: "Sabe cuándo Amato finge estar bien.", quote: "“Amy siempre tiene el mejor abrazo listo.”" },
  knuckles: { emoji: "🔥", name: "Knuckles the Echidna", rel: "Rivalidad Amistosa", thought: "Amato ama molestarlo.", quote: "“Se enoja rápido pero da la vida por sus amigos.”" },
  cream: { emoji: "🩷", name: "Cream the Rabbit", rel: "Vínculo Protector", thought: "Amato la cuida como a una hermanita.", quote: "“Cream es demasiado tierna, la protegeré siempre.”" },
  shadow: { emoji: "🖤", name: "Shadow the Hedgehog", rel: "Enamorados (Shamato ❤️)", thought: "Se entienden a través del dolor y la soledad.", quote: "“Shadow solo necesita a alguien que decida quedarse.”" },
  eggman: { emoji: "🥚", name: "Dr. Eggman", rel: "Rival / Enemigo", thought: "No soporta que use las Emeralds para el mal.", quote: "“Es listo, pero no tengo por qué soportarlo.”" },
  maria: { emoji: "🌹", name: "Maria Robotnik", rel: "Respeto Profundo", thought: "La respeta por lo mucho que significó para Shadow.", quote: "“Entiendo perfectamente por qué Shadow la quería tanto.”" }
};

// ===================================================
// CONTROL DE MÚSICA DE FONDO (BGM)
// ===================================================
const bgmAudio = document.getElementById('bgmAudio');
const bgmBtn = document.getElementById('bgmToggleBtn');
const bgmStatus = document.getElementById('bgmStatus');
let isBgmPlaying = false;

bgmBtn.addEventListener('click', () => {
  if (isBgmPlaying) {
    bgmAudio.pause();
    bgmStatus.innerText = "Música: OFF";
    bgmBtn.style.background = "#ff758f";
  } else {
    bgmAudio.play();
    bgmStatus.innerText = "Música: ON 🎶";
    bgmBtn.style.background = "#ff4d6d";
  }
  isBgmPlaying = !isBgmPlaying;
});

// ===================================================
// SISTEMA DE PESTAÑAS
// ===================================================
document.querySelectorAll('.nav-tab').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// ===================================================
// SISTEMA DE PLAYLISTS / JUKEBOX
// ===================================================
const playlistAudio = document.getElementById('playlistAudio');
const playlistSource = document.getElementById('playlistSource');
const songTitleUI = document.getElementById('currentSongTitle');
const songArtistUI = document.getElementById('currentSongArtist');
const songListUI = document.getElementById('songListUI');
const playlistHeader = document.getElementById('playlistTitleHeader');

function loadPlaylistCategory(categoryKey) {
  const data = playlists[categoryKey];
  if (!data) return;

  playlistHeader.innerText = data.title;
  songListUI.innerHTML = "";

  data.songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.className = 'song-item';
    li.innerHTML = `<span>🎵 ${song.name}</span> <small>${song.artist}</small>`;
    
    li.addEventListener('click', () => {
      // Si la música de fondo suena, la pausamos para no solapar sonidos
      if (isBgmPlaying) bgmBtn.click();

      songTitleUI.innerText = song.name;
      songArtistUI.innerText = song.artist;
      playlistSource.src = song.file;
      playlistAudio.load();
      playlistAudio.play();
    });

    songListUI.appendChild(li);
  });
}

// Botones de filtro de Playlists
document.querySelectorAll('.playlist-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.playlist-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const vibe = btn.getAttribute('data-vibe');
    loadPlaylistCategory(vibe);
  });
});

// Cargar la primera playlist por defecto
loadPlaylistCategory('amato');

// ===================================================
// MODAL PERSONAJES
// ===================================================
const modal = document.getElementById('charModal');
document.querySelectorAll('.char-card').forEach(card => {
  card.addEventListener('click', () => {
    const data = charactersData[card.getAttribute('data-char')];
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

document.getElementById('closeModalBtn').addEventListener('click', () => modal.style.display = 'none');
