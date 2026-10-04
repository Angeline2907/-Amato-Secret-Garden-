/* =========================================================
   AMATO'S NAPOLITAN HAVEN
   INTERACCIONES
   ========================================================= */

const state = {
  emeralds: Number(localStorage.getItem("amato_emeralds") || 0),
  achievements: Number(localStorage.getItem("amato_achievements") || 0),
  visits: Number(localStorage.getItem("amato_visits") || 0),
  shamatoEnergy: Number(localStorage.getItem("amato_shamato") || 0),
  love: Number(localStorage.getItem("amato_love") || 0),
  diaryPage: Number(localStorage.getItem("amato_diary") || 0),
  interactions: Number(localStorage.getItem("amato_interactions") || 0)
};

state.visits++;

localStorage.setItem(
  "amato_visits",
  state.visits
);


/* =========================================================
   NAVEGACIÓN
   ========================================================= */

function showSection(id){

  document
    .querySelectorAll(".section")
    .forEach(section => {
      section.classList.remove("active");
    });

  const target =
    document.getElementById(id);

  if(target){
    target.classList.add("active");
  }

  document
    .querySelectorAll(".nav button")
    .forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.section === id
      );
    });

  updateProgress();

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
}


document
  .querySelectorAll(".nav button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => showSection(button.dataset.section)
    );

  });


/* =========================================================
   TOAST
   ========================================================= */

function toast(message){

  const element =
    document.getElementById("toast");

  if(!element) return;

  element.textContent = message;
  element.style.display = "block";

  clearTimeout(window.toastTimer);

  window.toastTimer =
    setTimeout(() => {
      element.style.display = "none";
    },3000);
}


/* =========================================================
   PROGRESO
   ========================================================= */

function updateProgress(){

  const sections =
    document.querySelectorAll(".section");

  const visited =
    document.querySelectorAll(
      ".section.active"
    ).length;

  const percentage =
    Math.min(
      100,
      Math.round(
        (
          (state.achievements + state.emeralds + state.interactions)
          /
          20
        ) * 100
      )
    );

  const progress =
    document.getElementById("progress");

  if(progress){
    progress.textContent =
      `${percentage}% explorado`;
  }

  const homeEmeralds =
    document.getElementById("homeEmeralds");

  if(homeEmeralds){
    homeEmeralds.textContent =
      `${state.emeralds}/7`;
  }

  const homeAchievements =
    document.getElementById("homeAchievements");

  if(homeAchievements){
    homeAchievements.textContent =
      state.achievements;
  }
}


/* =========================================================
   MODOS
   ========================================================= */

function nightMode(){

  document.body.classList.toggle("night");

  localStorage.setItem(
    "amato_night",
    document.body.classList.contains("night")
  );

  toast(
    document.body.classList.contains("night")
      ? "Modo noche activado ✦"
      : "Modo noche desactivado ♡"
  );
}


function amatoMode(){

  document.body.classList.remove("night");
  document.body.classList.remove("shamato-mode");

  document.body.classList.toggle("amato-mode");

  toast("AMATO MODE ♡");
}


function shamatoMode(){

  document.body.classList.remove("night");
  document.body.classList.remove("amato-mode");

  document.body.classList.toggle("shamato-mode");

  toast("SHAMATO MODE 🖤♡");
}


/* =========================================================
   CHAOS EMERALDS
   ========================================================= */

function searchEmerald(){

  if(state.emeralds >= 7){

    toast(
      "Ya encontraste las 7 Chaos Emeralds 💎"
    );

    return;
  }

  const found =
    Math.random() < 0.72;

  if(found){

    state.emeralds++;

    localStorage.setItem(
      "amato_emeralds",
      state.emeralds
    );

    toast(
      `¡Encontraste una Chaos Emerald! 💎 ${state.emeralds}/7`
    );

    if(state.emeralds === 7){

      unlockAchievement(
        "Las siete Chaos Emeralds"
      );

      toast(
        "LAS ENCONTRASTE TODAS. Amato probablemente está llorando. 💎"
      );
    }

  }else{

    toast(
      "Nada... solo encontraste una nota de Tails que dice: «NO TOQUES ESO»."
    );

  }

  updateProgress();
}


function updateEmeraldCount(){

  const count =
    document.getElementById("emeraldCount");

  if(count){
    count.textContent =
      `${state.emeralds}/7`;
  }

}


/* =========================================================
   LABORATORIO
   ========================================================= */

function labComputer(){

  const output =
    document.getElementById("labOutput");

  const messages = [

    "Tails: ¿Amato? ¿Qué estás haciendo aquí?",

    "SISTEMA: energía Chaos detectada.",

    "SISTEMA: sujeto AMATO presenta actividad anormal.",

    "Tails: por favor no pulses el botón rojo.",

    "Amato: ...¿qué botón rojo?",

    "SISTEMA: búsqueda de Chaos Emerald iniciada."

  ];

  output.textContent =
    messages[
      Math.floor(
        Math.random() * messages.length
      )
    ];

  interaction();
}


function labDocument(){

  const output =
    document.getElementById("labDocument");

  const messages = [

    "ARCHIVO: AMATO / NIVEL 03",

    "Nota de Tails: «Su reacción con la energía Chaos todavía no tiene explicación.»",

    "Nota adicional: «No dejar que Amato haga experimentos solo.»",

    "Documento parcialmente destruido.",

    "Registro: la energía parece responder a deseos."

  ];

  output.textContent =
    messages[
      Math.floor(
        Math.random() * messages.length
      )
    ];

  interaction();
}


function redButton(){

  toast(
    "PULSASTE EL BOTÓN ROJO. Tails acaba de perder 3 años de vida."
  );

  unlockAchievement(
    "Yo sí toqué el botón rojo"
  );
}


/* =========================================================
   SHAMATO
   ========================================================= */

function addShamatoEnergy(amount){

  state.shamatoEnergy =
    Math.min(
      100,
      state.shamatoEnergy + amount
    );

  localStorage.setItem(
    "amato_shamato",
    state.shamatoEnergy
  );

  updateShamato();

  if(state.shamatoEnergy >= 100){

    unlockAchievement(
      "Shamato Energy 100%"
    );

    toast(
      "100/100. Shadow está intentando actuar como si nada hubiera pasado."
    );
  }

}


function updateShamato(){

  const bar =
    document.getElementById("shamatoBar");

  const number =
    document.getElementById("shamatoEnergy");

  if(bar){
    bar.style.width =
      `${state.shamatoEnergy}%`;
  }

  if(number){
    number.textContent =
      state.shamatoEnergy;
  }

}


/* =========================================================
   HABITACIÓN
   ========================================================= */

function roomAction(type){

  const output =
    document.getElementById("roomOutput");

  const messages = {

    bed:
      "La cama está desordenada. Amato asegura que es parte de la decoración.",

    plush:
      "El peluche tiene una pequeña cinta rosa. No preguntes de dónde salió.",

    books:
      "Libros sobre Chaos Energy, astronomía y cosas que probablemente Tails le prestó.",

    diary:
      "Hay una página marcada con una estrella.",

    window:
      "Desde aquí se ven las estrellas.",

    headphones:
      "Hay música sonando. Amato probablemente lleva horas escuchando la misma canción.",

    photos:
      "Fotos de Sonic, Tails, Amy, Knuckles, Cream y... Shadow.",

    sweets:
      "Hay fresas, chocolate y un poco de helado napolitano.",

    backpack:
      "Dentro hay una libreta, lápices, dulces y una Chaos Emerald falsa.",

    emerald:
      "Amato: «¡NO LA TOQUES!»"

  };

  output.textContent =
    messages[type] ||
    "No encontraste nada.";

  interaction();
}


/* =========================================================
   DIARIO
   ========================================================= */

const diaryEntries = [

  "Querido diario. Hoy encontré otra cosa relacionada con Chaos.",

  "Tails dice que debería tener cuidado. Probablemente tiene razón.",

  "Sonic dijo que no tengo que entender todo inmediatamente.",

  "Amy me preguntó si estaba bien. Dije que sí.",

  "No estaba bien.",

  "Las estrellas se ven bonitas esta noche.",

  "A veces pienso demasiado.",

  "Encontré una nota de Shadow.",

  "Solo decía «Quédate».",

  "No sé por qué eso me hizo sentir tan tranquilo.",

  "Hoy todos comimos juntos.",

  "Me gusta cuando estamos todos juntos.",

  "Tengo miedo de perderlos.",

  "No quiero volver a estar solo.",

  "Shadow no habla mucho.",

  "Pero cuando estoy triste se queda cerca.",

  "Creo que eso significa algo.",

  "No quiero preguntar.",

  "Bueno. Sí quiero preguntar.",

  "Pero probablemente me voy a arrepentir.",

  "Las Chaos Emeralds siguen sin responder mi pregunta.",

  "Quizá la pregunta estaba equivocada.",

  "Quizá no necesitaba una respuesta.",

  "Quizá necesitaba personas.",

  "Hoy me reí muchísimo.",

  "No tuve que fingir.",

  "Eso se sintió extraño.",

  "Pero bonito.",

  "Miré las estrellas otra vez.",

  "No pedí que todo terminara.",

  "Solo me quedé mirando.",

  "Encontré una familia... Esta vez no estoy solo."

];


function renderDiary(){

  const content =
    document.getElementById("diaryContent");

  if(!content) return;

  const entry =
    diaryEntries[
      Math.max(
        0,
        Math.min(
          state.diaryPage,
          diaryEntries.length - 1
        )
      )
    ];

  content.innerHTML = `

    <div class="kicker">
      entrada ${state.diaryPage + 1} / ${diaryEntries.length}
    </div>

    <h3>
      Querido diario...
    </h3>

    <p class="quote">
      ${entry}
    </p>

  `;
}


function nextDiary(){

  if(
    state.diaryPage <
    diaryEntries.length - 1
  ){

    state.diaryPage++;

    localStorage.setItem(
      "amato_diary",
      state.diaryPage
    );

    renderDiary();

  }else{

    unlockAchievement(
      "Final del diario"
    );

    toast(
      "Llegaste al final del diario ♡"
    );

  }

}


function previousDiary(){

  if(state.diaryPage > 0){

    state.diaryPage--;

    localStorage.setItem(
      "amato_diary",
      state.diaryPage
    );

    renderDiary();

  }

}


/* =========================================================
   GALERÍA
   ========================================================= */

function filterGallery(type){

  document
    .querySelectorAll(".gallery-item")
    .forEach(item => {

      if(
        type === "all" ||
        item.dataset.type === type
      ){

        item.style.display = "";

      }else{

        item.style.display = "none";

      }

    });

}


/* =========================================================
   ESTADO DE AMATO
   ========================================================= */

const moods = [

  "Amato está feliz. Probablemente demasiado.",

  "Amato está curioso y quiere investigar una Chaos Emerald.",

  "Amato está cansado pero insiste en que está bien.",

  "Amato está pensando demasiado.",

  "Amato quiere un abrazo.",

  "Amato está mirando las estrellas.",

  "Amato está escondiendo algo.",

  "Amato está preparando una aventura.",

  "Amato está comiendo helado napolitano.",

  "Amato está feliz de que estés aquí."

];


function generateMood(){

  const result =
    moods[
      Math.floor(
        Math.random() * moods.length
      )
    ];

  const output =
    document.getElementById("moodOutput");

  const today =
    document.getElementById("todayText");

  if(output){
    output.textContent = result;
  }

  if(today){
    today.textContent = result;
  }

}


/* =========================================================
   FRASES
   ========================================================= */

const amatoQuotes = [

  "¡Espera! ¿Eso era una Chaos Emerald?",

  "Tengo una teoría.",

  "Bueno... técnicamente no explotó.",

  "¿Por qué Shadow está mirándome?",

  "¡Mira las estrellas!",

  "Estoy bien. De verdad.",

  "No estoy haciendo nada peligroso.",

  "Tails, solo necesito tocarlo un poquito.",

  "¿Podemos quedarnos aquí un rato?",

  "¡Tengo una idea!"

];


const shadowQuotes = [

  "Quédate.",

  "No tienes que estar solo.",

  "Estoy aquí.",

  "No pienso irme.",

  "Puedes descansar.",

  "No me vas a perder.",

  "Deja de preocuparte.",

  "Estoy escuchando.",

  "Ven aquí.",

  "...Tonto.",

  "Si tú te quedas, yo también."

];


const shamatoQuotes = [

  "Amato: ¿Eso fue una declaración de amor?\nShadow: No.",

  "Shadow se quedó. Eso era suficiente.",

  "Amato habló durante veinte minutos. Shadow escuchó los veinte.",

  "No eran iguales. Nunca necesitaron serlo.",

  "Dos personas que tenían miedo de perder a alguien aprendiendo a quedarse.",

  "Amato sonríe. Shadow finge que no le gusta verlo.",

  "Shadow: Quédate.\nAmato: Siempre.",

  "No fue instantáneo. Fue lento. Y por eso importó."

];


function randomFrom(array){

  return array[
    Math.floor(
      Math.random() * array.length
    )
  ];

}


function quoteAmato(){

  document.getElementById(
    "amatoQuote"
  ).textContent =
    randomFrom(amatoQuotes);

}


function quoteShadow(){

  document.getElementById(
    "shadowQuote"
  ).textContent =
    randomFrom(shadowQuotes);

}


function quoteShamato(){

  document.getElementById(
    "shamatoQuote"
  ).textContent =
    randomFrom(shamatoQuotes);

}


/* =========================================================
   ESCENAS
   ========================================================= */

const locations = [

  "Emerald Hill",

  "el laboratorio de Tails",

  "la habitación de Amato",

  "una colina durante la noche",

  "la ciudad",

  "una cafetería",

  "un camino perdido",

  "el jardín",

  "la azotea",

  "una estación abandonada"

];


const situations = [

  "Amato encontró algo extraño.",

  "Shadow está intentando tener cinco minutos de paz.",

  "Amato está haciendo demasiadas preguntas.",

  "Los dos están mirando las estrellas.",

  "Tails necesita ayuda.",

  "Sonic organizó una salida.",

  "Amato está nervioso.",

  "Shadow está preocupado pero no quiere admitirlo.",

  "Algo relacionado con Chaos apareció.",

  "Los dos terminaron solos por accidente."

];


const endings = [

  "Terminan riéndose.",

  "Shadow simplemente se queda a su lado.",

  "Amato consigue un abrazo.",

  "Algo explota en el fondo.",

  "Tails aparece gritando.",

  "Nadie habla durante unos minutos.",

  "Amato decide guardar el recuerdo.",

  "Los dos miran las estrellas.",

  "Shadow dice: «Estoy aquí.»",

  "Todo termina con helado."

];


function generateScene(){

  const scene =

    `${randomFrom(locations)} — ` +
    `${randomFrom(situations)} ` +
    `${randomFrom(endings)}`;

  document.getElementById(
    "sceneOutput"
  ).textContent = scene;

}


/* =========================================================
   RANDOM FACTS
   ========================================================= */

const facts = [

  "Amato es ambidiestro.",

  "Mide aproximadamente 100 cm.",

  "Su diseño está inspirado en helado napolitano.",

  "Le fascinan las Chaos Emeralds.",

  "Habla muchísimo cuando está nervioso.",

  "Le gustan las estrellas.",

  "Tiene miedo de perder a las personas que quiere.",

  "Shadow suele demostrar cariño mediante acciones.",

  "Amato nunca conoció a Maria.",

  "Amato solo conoce la historia de Maria a través de Shadow.",

  "Su frase más importante es: «No soy feliz. Solo aprendí a hacer felices a los demás.»",

  "Le encanta hacer felices a los demás.",

  "Probablemente tocaría un botón que dice NO TOCAR.",

  "Sí, tocaría el botón.",

  "Definitivamente tocaría el botón."

];


function randomFact(){

  document.getElementById(
    "factOutput"
  ).textContent =
    randomFrom(facts);

}


/* =========================================================
   SIMULADORES
   ========================================================= */

const amatoResponses = [

  "¡Hola! ¿Quieres ver mi investigación?",

  "¿Sabías que las Chaos Emeralds pueden reaccionar de formas rarísimas?",

  "Tengo una pregunta.",

  "¿Quieres mirar las estrellas conmigo?",

  "¡Encontré algo interesante!",

  "Estoy bien ♡",

  "Bueno... quizá no estoy TAN bien.",

  "¿Podemos comer algo?",

  "¡Tengo una teoría enorme!",

  "No le digas a Tails que hice esto."

];


const shadowResponses = [

  "...Hola.",

  "¿Qué necesitas?",

  "No estoy ocupado.",

  "Puedes quedarte.",

  "Estoy escuchando.",

  "No tienes que explicar todo.",

  "Descansa.",

  "Estoy aquí.",

  "No te preocupes.",

  "...Tonto.",

  "Quédate."

];


function clickAmato(){

  state.interactions++;

  localStorage.setItem(
    "amato_interactions",
    state.interactions
  );

  document.getElementById(
    "amatoResponse"
  ).textContent =
    randomFrom(amatoResponses);

  updateProgress();

}


function clickShadow(){

  state.interactions++;

  localStorage.setItem(
    "amato_interactions",
    state.interactions
  );

  document.getElementById(
    "shadowResponse"
  ).textContent =
    randomFrom(shadowResponses);

  updateProgress();

}


/* =========================================================
   ABRAZO
   ========================================================= */

function hugAmato(){

  const responses = [

    "Amato se queda quieto durante dos segundos... y después abraza de vuelta.",

    "Amato: «¿Esto es para mí?» ♡",

    "Amato está oficialmente feliz.",

    "Abrazo aceptado.",

    "Amato no quiere soltarte todavía.",

    "Amato acaba de sonreír de verdad."

  ];

  document.getElementById(
    "hugOutput"
  ).textContent =
    randomFrom(responses);

  unlockAchievement(
    "Abracé a Amato"
  );

}


/* =========================================================
   CONTADOR TE QUIERO
   ========================================================= */

function loveCounter(){

  state.love++;

  localStorage.setItem(
    "amato_love",
    state.love
  );

  document.getElementById(
    "loveCount"
  ).textContent =
    state.love;

  if(state.love === 10){

    unlockAchievement(
      "10 veces te quiero"
    );

  }

  if(state.love === 50){

    unlockAchievement(
      "50 veces te quiero"
    );

  }

  if(state.love === 100){

    unlockAchievement(
      "100 veces te quiero"
    );

  }

}


/* =========================================================
   ¿Y SI...?
   ========================================================= */

function whatIf(number){

  const outputs = {

    1:
      "Amato probablemente habría seguido buscando respuestas, pero habría tardado mucho más en aprender que no tenía que hacerlo todo solo.",

    2:
      "Amato se quedaría mirando las siete Chaos Emeralds durante muchísimo tiempo. Después probablemente preguntaría: «¿Y ahora qué hago?»",

    3:
      "Amato tendría muchas cosas que decir. Algunas serían felices. Otras serían difíciles. Pero quizá por primera vez no intentaría fingir que todo estaba bien."

  };

  const element =
    document.getElementById(
      `whatIf${number}`
    );

  if(element){
    element.textContent =
      outputs[number];
  }

}


/* =========================================================
   CARTAS
   ========================================================= */

function sendLetter(){

  const input =
    document.getElementById(
      "letterInput"
    );

  const output =
    document.getElementById(
      "letterOutput"
    );

  if(!input.value.trim()){

    output.textContent =
      "Primero escribe algo ♡";

    return;
  }

  const responses = [

    "Amato leyó tu carta y sonrió.",

    "Amato guardó tu carta junto a las demás.",

    "Amato respondió: «Gracias. De verdad.»",

    "Amato se emocionó un poquito.",

    "Amato dijo que va a recordar tus palabras."

  ];

  output.textContent =
    randomFrom(responses);

  input.value = "";

  unlockAchievement(
    "Carta para Amato"
  );

}


/* =========================================================
   REGALOS
   ========================================================= */

function giftBox(){

  const gifts = [

    "🍓 Una caja de fresas.",

    "🍫 Chocolate.",

    "🍦 Helado napolitano.",

    "🎀 Una cinta rosa.",

    "⭐ Una pequeña estrella de papel.",

    "💎 Una Chaos Emerald falsa.",

    "🧸 Un peluche.",

    "💌 Una carta de Shadow.",

    "📓 Una página del diario."

  ];

  document.getElementById(
    "giftOutput"
  ).textContent =
    `Encontraste: ${randomFrom(gifts)}`;

}


/* =========================================================
   SECRETOS
   ========================================================= */

function secret(type){

  const output =
    document.getElementById(
      "secretOutput"
    );

  if(type === "star"){

    output.textContent =
      "Encontraste una estrella escondida. Amato también la estaba mirando. ☆";

    unlockAchievement(
      "Encontré una estrella"
    );

  }

  if(type === "maria"){

    output.textContent =
      "MARIA — Amato nunca la conoció. Solo conoce su historia a través de Shadow. Esta sección pertenece a la historia de Shadow, no a un encuentro entre ellos.";

    unlockAchievement(
      "Archivo Maria"
    );

  }

}


/* =========================================================
   ARCHIVOS
   ========================================================= */

function unlockFile(number){

  const messages = {

    1:
      "ARCHIVO DESBLOQUEADO: Amato empezó a investigar Chaos Energy buscando respuestas.",

    2:
      "ARCHIVO DESBLOQUEADO: Shadow comenzó a quedarse cerca de Amato mucho antes de admitir por qué.",

    3:
      "ARCHIVO DESBLOQUEADO: La familia que Amato encontró fue algo que nunca había pedido."

  };

  toast(
    messages[number] ||
    "Archivo desbloqueado."
  );

  unlockAchievement(
    `Archivo clasificado ${number}`
  );

}


/* =========================================================
   LOGROS
   ========================================================= */

function unlockAchievement(name){

  state.achievements++;

  localStorage.setItem(
    "amato_achievements",
    state.achievements
  );

  toast(
    `♡ LOGRO DESBLOQUEADO ♡\n${name}`
  );

  updateProgress();

}


/* =========================================================
   INTERACCIÓN GENERAL
   ========================================================= */

function interaction(){

  state.interactions++;

  localStorage.setItem(
    "amato_interactions",
    state.interactions
  );

  updateProgress();

}


/* =========================================================
   KONAMI CODE
   ========================================================= */

const konami = [

  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight"
];

let konamiIndex = 0;

document.addEventListener(
  "keydown",
  event => {

    if(
      event.key ===
      konami[konamiIndex]
    ){

      konamiIndex++;

      if(
        konamiIndex ===
        konami.length
      ){

        konamiIndex = 0;

        toast(
          "SECRET ROUTE ACTIVATED ♡"
        );

        unlockAchievement(
          "Código secreto"
        );

        document.body.classList.add(
          "amato-mode"
        );

      }

    }else{

      konamiIndex = 0;

    }

  }
);


/* =========================================================
   VISITAS
   ========================================================= */

if(state.visits >= 5){

  unlockAchievement(
    "Visitante frecuente"
  );

}


/* =========================================================
   RESET
   ========================================================= */

function resetProgress(){

  const confirmation =
    confirm(
      "¿Seguro que quieres borrar el progreso?"
    );

  if(!confirmation) return;

  localStorage.removeItem(
    "amato_emeralds"
  );

  localStorage.removeItem(
    "amato_achievements"
  );

  localStorage.removeItem(
    "amato_shamato"
  );

  localStorage.removeItem(
    "amato_love"
  );

  localStorage.removeItem(
    "amato_diary"
  );

  localStorage.removeItem(
    "amato_interactions"
  );

  location.reload();

}


/* =========================================================
   TIMELINE
   ========================================================= */

const timelineEvents = [

  {
    date:"12 años",
    text:"Muere su padre."
  },

  {
    date:"12 años",
    text:"Su relación con su madre se vuelve cada vez más difícil."
  },

  {
    date:"Una noche",
    text:"Amato mira las estrellas y desea que todo termine."
  },

  {
    date:"Después",
    text:"Muere su madre."
  },

  {
    date:"Después",
    text:"Amato comienza a sentirse culpable por su deseo."
  },

  {
    date:"Más adelante",
    text:"Aprende a esconder su dolor haciendo felices a los demás."
  },

  {
    date:"17 años",
    text:"Comienza su investigación sobre las Chaos Emeralds."
  },

  {
    date:"Sonic Adventure 2",
    text:"Conoce a Sonic, Tails, Amy, Knuckles, Cream y Shadow."
  },

  {
    date:"Después",
    text:"Las amistades se convierten en una familia."
  },

  {
    date:"Shamato",
    text:"Amato y Shadow pasan lentamente de desconocidos a algo mucho más profundo."
  },

  {
    date:"Ahora",
    text:"Amato mira las estrellas sin pedir que todo termine."
  }

];


function renderTimeline(){

  const timeline =
    document.getElementById(
      "timeline"
    );

  if(!timeline) return;

  timeline.innerHTML =
    timelineEvents
      .map(event => `

        <div class="event">

          <strong>
            ${event.date}
          </strong>

          <p>
            ${event.text}
          </p>

        </div>

      `)
      .join("");

}


/* =========================================================
   SHAMATO TIMELINE
   ========================================================= */

function renderShamatoTimeline(){

  const element =
    document.getElementById(
      "shamatoTimeline"
    );

  if(!element) return;

  const events = [

    "Desconocidos",

    "Primeras misiones",

    "Compañeros",

    "Amigos",

    "Mejores amigos",

    "Confianza",

    "Miedo a perderse",

    "Aprender a quedarse",

    "Lovers ♡"

  ];

  element.innerHTML =
    events
      .map(
        (event,index) => `

          <div class="paper"
               style="margin:10px 0">

            <b>
              ${index + 1}.
              ${event}
            </b>

          </div>

        `
      )
      .join("");

}


/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

function init(){

  updateEmeraldCount();

  updateShamato();

  renderDiary();

  renderTimeline();

  renderShamatoTimeline();

  updateProgress();

  const love =
    document.getElementById(
      "loveCount"
    );

  if(love){
    love.textContent =
      state.love;
  }

  const nightSaved =
    localStorage.getItem(
      "amato_night"
    );

  if(nightSaved === "true"){

    document.body.classList.add(
      "night"
    );

  }

}


init();
