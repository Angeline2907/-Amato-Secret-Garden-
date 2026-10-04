// Variables de estado
let musicOn = false;
let heartCount = 100;
let emeraldTaps = 7;

// Navegación por Secciones
function showSection(sectionId, btnElement) {
    // Desactivar todos los botones
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Ocultar todas las tarjetas de contenido
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.remove('active-card'));

    // Activar botón y tarjeta correspondientes
    btnElement.classList.add('active');
    const targetCard = document.getElementById(sectionId);
    if (targetCard) {
        targetCard.classList.add('active-card');
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Funcionalidad Botón de Música
function toggleMusic() {
    musicOn = !musicOn;
    const musicBtn = document.getElementById('musicBtn');
    if (musicOn) {
        musicBtn.innerText = "🎵 Música de Fondo: ON";
        musicBtn.style.background = "#4caf50";
    } else {
        musicBtn.innerText = "🎵 Música de Fondo: OFF";
        musicBtn.style.background = "var(--active-pink)";
    }
}

// Actualizar detalle de rasgos de personalidad
function setTrait(text) {
    document.getElementById('traitDisplay').innerText = text;
}

// Contador interactivo de Corazones
function addHeart() {
    heartCount += 5;
    document.getElementById('heartCounter').innerText = `Nivel de Amor: ${heartCount}%`;
}

// Filtros de Galería
function filterGallery(category, btn) {
    const filterBtns = btn.parentElement.querySelectorAll('.filter-btn');
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const box = document.getElementById('galleryBox');
    if (category === 'TODO') {
        box.innerHTML = "🖤 💕 🍓<br>Mostrando todas las ilustraciones del Hub.";
    } else if (category === 'AMATO') {
        box.innerHTML = "🍓 🦔 ✨<br>Mostrando ilustraciones individuales de Amato.";
    } else if (category === 'SHAMATO') {
        box.innerHTML = "🖤 💖 🦔<br>Mostrando momentos especiales de Amato & Shadow.";
    }
}

// Selector de Frases / Datos
function setQuote(text) {
    document.getElementById('quoteBox').innerText = text;
}

// Interacción con la Chaos Emerald
function tapEmerald() {
    emeraldTaps++;
    document.getElementById('emeraldCounter').innerText = `Toques: ${emeraldTaps} / 7`;
}
