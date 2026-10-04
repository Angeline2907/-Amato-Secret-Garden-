let musicOn = false;
let heartCount = 100;
let emeraldTaps = 7;

function showSection(sectionId, btnElement) {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.remove('active-card'));

    btnElement.classList.add('active');
    const targetCard = document.getElementById(sectionId);
    if (targetCard) {
        targetCard.classList.add('active-card');
    }
}

function toggleMusic() {
    musicOn = !musicOn;
    const musicBtn = document.getElementById('musicBtn');
    if (musicOn) {
        musicBtn.innerText = "Música de Fondo: ON";
        musicBtn.style.background = "#4caf50";
        musicBtn.style.boxShadow = "0 3px 0px #2e7d32";
    } else {
        musicBtn.innerText = "Música de Fondo: OFF";
        musicBtn.style.background = "var(--active-pink)";
        musicBtn.style.boxShadow = "0 3px 0px #d90429";
    }
}

function setTrait(text) {
    document.getElementById('traitDisplay').innerText = text;
}

function addHeart() {
    heartCount += 5;
    document.getElementById('heartCounter').innerText = `Nivel de Amor: ${heartCount}%`;
}

function filterGallery(category, btn) {
    const filterBtns = btn.parentElement.querySelectorAll('.filter-btn');
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const box = document.getElementById('galleryBox');
    if (category === 'TODO') {
        box.innerHTML = "🖤 💕 🍓";
    } else if (category === 'AMATO') {
        box.innerHTML = "🍓 🦔 ✨";
    } else if (category === 'SHAMATO') {
        box.innerHTML = "🖤 💖 🦔";
    }
}

function setQuote(text) {
    document.getElementById('quoteBox').innerText = text;
}

function tapEmerald() {
    emeraldTaps++;
    document.getElementById('emeraldCounter').innerText = `Toques: ${emeraldTaps} / 7`;
}
