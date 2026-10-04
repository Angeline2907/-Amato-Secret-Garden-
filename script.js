// Navegación mediante el slider horizontal
function showSection(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(sec => sec.classList.remove('active'));

  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(sectionId).classList.add('active');
  event.currentTarget.classList.add('active');
}

// Lógica de Sintonía / Corazón
let heartValue = 0;
function increaseHeart() {
  if (heartValue < 100) {
    heartValue += 10;
    document.getElementById('heart-count').innerText = heartValue;
    
    const statusText = document.getElementById('sintonia-status');
    if (heartValue >= 100) {
      statusText.innerText = "¡Sintonía Máxima Alcanzada! Armonía del Caos Total.";
      statusText.style.color = "#e05275";
      statusText.style.fontWeight = "bold";
    } else if (heartValue >= 50) {
      statusText.innerText = "Sintonía media: Sincronizando energías...";
    }
  }
}

// Desplegar Cartas Secretas
function openLetter(id) {
  const textElement = document.getElementById(id);
  if (textElement.style.display === "block") {
    textElement.style.display = "none";
  } else {
    textElement.style.display = "block";
  }
}

// Filtro de Galería
function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-item');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');

  items.forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Banco de Frases Extenso
const quotes = [
  '"¡Siempre hay tiempo para una pequeña aventura más!"',
  '"Un poco de caos hace que la vida sea más divertida y emocionante."',
  '"El chocolate y las fresas son la mejor combinación del universo."',
  '"No importa la distancia, la velocidad del corazón siempre nos conecta."',
  '"Mantén tu vista en la meta y no dejes que nada frene tu paso."'
];

function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById('quote-display').innerText = quotes[randomIndex];
}
