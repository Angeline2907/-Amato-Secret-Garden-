const $ = selector =>
  document.querySelector(selector);

const $$ = selector =>
  [...document.querySelectorAll(selector)];


/* ================= STATE ================= */

let state =
  JSON.parse(
    localStorage.getItem("amatoArchive") || "null"
  ) ||
  {
    emeralds: [],
    achievements: [],
    visits: 0,
    energy: 0,
    amatoClicks: 0,
    shadowClicks: 0,
    letters: 0,
    rel: 0,
    secret: [],
    night: false,

    stats: {
      felicidad: 60,
      energia: 75,
      curiosidad: 100,
      paciencia: 31,
      caos: 97,
      sueño: 55
    }
  };


state.visits++;

localStorage.setItem(
  "amatoArchive",
  JSON.stringify(state)
);


let diaryPage = 0;


/* ================= DIARY ================= */

const diary = [

  "Encontré algo.",

  "Era una Chaos Emerald.",

  "Reaccionó cuando la toqué.",

  "No sé por qué.",

  "Quiero entenderlo.",

  "Papá decía que las estrellas parecían luces lejanas.",

  "Hoy pensé en pedir un deseo.",

  "Desearía que todo terminara.",

  "No sabía qué significaba realmente.",

  "Mamá murió.",

  "Yo pedí que todo terminara.",

  "¿Fue mi culpa?",

  "No creo que tenga sentido.",

  "Pero no puedo dejar de pensarlo.",

  "Encontré otra cosa sobre las Chaos Emeralds.",

  "Quizá pueden conceder deseos.",

  "Tengo que descubrirlo.",

  "Conocí a Sonic.",

  "Es imposible quedarse quieto cerca de él.",

  "Tails sabe muchísimo.",

  "Amy abraza demasiado.",

  "Knuckles me dijo que no tocara algo.",

  "Lo toqué.",

  "Shadow.",

  "No sé qué pensar de él.",

  "Quiero aprender Chaos Control.",

  "Shadow dijo que no.",

  "Le pregunté otra vez.",

  "Dijo que no otra vez.",

  "Creo que empieza a conocerme demasiado bien.",

  "A veces siento que tengo que estar bien porque los demás cuentan conmigo.",

  "No encontré la respuesta que buscaba.",

  "Encontré una familia.",

  "Amigos.",

  "Y alguien que decidió quedarse.",

  "Esta vez no estoy solo."

];


/* ================= PHRASES ================= */

const phrases = {

  amato: [

    "¡Espera, espera! ¡Tengo una pregunta!",

    "¡Eso fue increíble!",

    "¿Crees que una Chaos Emerald podría hacer eso?",

    "No estoy haciendo nada peligroso.",

    "¡Confía en mí!",

    "¡Mira esto!",

    "Estoy bien.",

    "Tengo una idea.",

    "No creo que sea tan mala.",

    "No prometí eso.",

    "¿Qué podría salir mal?",

    "Bueno...",

    "Escucha.",

    "Esto es importante.",

    "Creo que encontré algo.",

    "Shadow.",

    "Shadow.",

    "Shadow.",

    "¿Qué?",

    "¡Nada!"

  ],


  shadow: [

    "No es asunto tuyo.",

    "Quédate detrás de mí.",

    "No necesito ayuda.",

    "Estoy bien.",

    "Deja de preguntar.",

    "No estoy preocupado.",

    "Ven conmigo.",

    "Quédate cerca.",

    "Yo me encargo.",

    "No tienes que hacerlo solo.",

    "Descansa.",

    "No quiero perderte.",

    "Quédate.",

    "No.",

    "...",

    "Amato."

  ],


  shamato: [

    "No tienes que estar solo.",

    "Entonces quédate.",

    "No pienso irme.",

    "Te encontré.",

    "No tienes que fingir conmigo.",

    "No necesito que me salves.",

    "Lo sé.",

    "Solo quiero quedarme contigo.",

    "Si tú te quedas, yo también.",

    "No me vas a perder.",

    "Estoy aquí.",

    "Puedes descansar."

  ]

};


/* ================= RANDOM CONTENT ================= */

const facts = [

  "Amato es ambidiestro.",

  "Su diseño está inspirado en el helado napolitano.",

  "Está obsesionado con las Chaos Emeralds.",

  "Habla mucho cuando está nervioso.",

  "Quiere aprender Chaos Control.",

  "Encontró una Chaos Emerald de niño.",

  "Le gustan las estrellas.",

  "Le gustan sus amigos.",

  "Convierte investigaciones serias en problemas.",

  "Sonic lo apoya.",

  "Tails intenta mantenerlo lejos de cosas peligrosas.",

  "Knuckles está cansado de decirle que no toque cosas.",

  "Amy lo abraza.",

  "Cream le da dulces.",

  "Amato hace felices a los demás incluso cuando él no está feliz.",

  "No siempre dice cuando está herido.",

  "Es impulsivo.",

  "Es protector.",

  "Tiene más preguntas que respuestas.",

  "Shadow finge que Amato no le parece adorable.",

  "Nadie le cree."

];


const scenePlaces = [

  "Emerald Hill",

  "un campo",

  "la playa",

  "un tejado",

  "el laboratorio de Tails",

  "un bosque",

  "una ciudad de noche",

  "una zona abandonada",

  "una montaña",

  "un lugar después de una batalla",

  "bajo las estrellas",

  "un lugar desconocido"

];


const sceneSituations = [

  "descansando",

  "entrenando Chaos Control",

  "Shadow entrenando",

  "Amato encuentra una Emerald",

  "Shadow está herido",

  "Amato está herido",

  "Amato está triste",

  "Shadow está preocupado",

  "mirando las estrellas",

  "discutiendo",

  "caminando",

  "Sonic los dejó solos",

  "Tails les pidió trabajar juntos",

  "Amy los invitó a salir",

  "Amato se quedó dormido",

  "Shadow encontró a Amato dormido",

  "cocinando",

  "teniendo una confesión incómoda"

];


const sceneEnds = [

  "se sientan juntos",

  "se toman de la mano",

  "Amato apoya la cabeza en Shadow",

  "se abrazan",

  "miran las estrellas",

  "alguien dice «quédate»",

  "Shadow protege a Amato",

  "Amato protege a Shadow",

  "ambos se ríen",

  "hay un silencio cómodo",

  "Shadow le da un beso en la frente",

  "se quedan dormidos",

  "Shadow admite que estaba preocupado",

  "Amato admite que tenía miedo",

  "prometen regresar juntos"

];


/* ================= SAVE ================= */

function persist(){

  localStorage.setItem(
    "amatoArchive",
    JSON.stringify(state)
  );

}


/* ================= TOAST ================= */

function toast(text){

  const t = $("#toast");

  if(!t) return;

  t.textContent = text;

  t.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(
    () => t.classList.remove("show"),
    2200
  );

}


/* ================= NAVIGATION ================= */

function go(id){

  $$(".page").forEach(
    page => page.classList.remove("active")
  );


  const target = $("#" + id);

  if(target){
    target.classList.add("active");
  }


  $$("#nav button").forEach(
    button => button.classList.remove("active")
  );


  const button =
    $(`#nav button[onclick="go('${id}')"]`);

  if(button){
    button.classList.add("active");
  }


  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

}


/* ================= NIGHT MODE ================= */

function toggleNight(){

  state.night = !state.night;

  document.body.classList.toggle(
    "night",
    state.night
  );

  persist();

  toast(
    state.night
      ? "Night mode."
      : "Day mode."
  );

}


/* ================= RANDOM PHRASES ================= */

function phrase(type){

  const array = phrases[type];

  const element =
    $("#" + type + "Phrase");

  if(!element) return;

  element.textContent =
    array[
      Math.floor(
        Math.random() * array.length
      )
    ];

}


/* ================= SCENE ================= */

function sceneGen(){

  $("#sceneGen").textContent =

    `En ${pick(scenePlaces)}, ` +

    `están ${pick(sceneSituations)}. ` +

    `Al final, ${pick(sceneEnds)}.`;

}


/* ================= PICK ================= */

function pick(array){

  return array[
    Math.floor(
      Math.random() * array.length
    )
  ];

}


/* ================= OUTFIT ================= */

function outfit(){

  $("#outfitOut").textContent =

    `Tema: ${pick([
      "casual",
      "adventure",
      "coquette",
      "gothic",
      "summer",
      "winter",
      "night",
      "Chaos",
      "Shadow",
      "Sonic",
      "napolitan"
    ])}. ` +

    `Cabello: ${pick([
      "suave",
      "despeinado",
      "clásico",
      "ligeramente rebelde"
    ])}. ` +

    `Chaqueta: ${pick([
      "ninguna",
      "corta",
      "oversized",
      "de aventura"
    ])}. ` +

    `Accesorio: ${pick([
      "mochila",
      "estrella",
      "pin Chaos",
      "pulsera"
    ])}.`;

}


/* ================= FACT ================= */

function randomFact(){

  $("#factOut").textContent =
    pick(facts);

}


/* ================= AMATO CLICK ================= */

function clickAmato(){

  state.amatoClicks++;

  persist();


  $("#amatoClicks").textContent =
    state.amatoClicks + " clics";


  const responses = [

    "¿Eh?",

    "¿Por qué me estás tocando?",

    "En serio...",

    "¡Oye!",

    "¿Qué quieres?",

    "...",

    "Está bien. Ganaste.",

    "¿Quieres un abrazo o algo?",

    "¿Sigues aquí?",

    "Gracias."

  ];


  const index =
    Math.min(
      Math.floor(
        state.amatoClicks / 2
      ),
      responses.length - 1
    );


  toast(responses[index]);


  if(state.amatoClicks >= 25){

    achievement(
      "Esto ya es sospechoso"
    );

  }

}


/* ================= SHADOW CLICK ================= */

function clickShadow(){

  state.shadowClicks++;

  persist();


  $("#shadowClicks").textContent =
    state.shadowClicks + " clics";


  const responses = [

    "...",

    "¿Qué?",

    "¿Por qué sigues haciendo eso?",

    "Deja de molestar.",

    "No voy a reaccionar.",

    "Amato.",

    "En serio.",

    "Te estoy mirando."

  ];


  const index =
    Math.min(
      Math.floor(
        state.shadowClicks / 3
      ),
      responses.length - 1
    );


  toast(responses[index]);


  if(state.shadowClicks >= 15){

    achievement(
      "Problema de Knuckles"
    );

  }

}


/* ================= SHAMATO ENERGY ================= */

function addEnergy(){

  state.energy =
    Math.min(
      100,
      state.energy + 1
    );


  state.rel =
    Math.min(
      100,
      state.rel + 1
    );


  persist();


  $("#energy").textContent =
    state.energy;


  updateRel();


  if(state.energy < 20){

    $("#energyMsg").textContent =
      "+1";

  }

  else if(state.energy < 60){

    $("#energyMsg").textContent =
      "Shadow lo notó.";

  }

  else if(state.energy < 100){

    $("#energyMsg").textContent =
      "Esto ya es sospechoso.";

  }

  else{

    $("#energyMsg").textContent =
      "Está bien. Están enamorados.";

  }

}


/* ================= RELATIONSHIP ================= */

function updateRel(){

  const percentage =
    state.rel;


  if($("#relBar")){

    $("#relBar").style.width =
      percentage + "%";

  }


  if($("#relPct")){

    $("#relPct").textContent =
      percentage + "%";

  }


  if($("#relLabel")){

    $("#relLabel").textContent =

      percentage < 20
        ? "Se conocen."

      : percentage < 40
        ? "Compañeros."

      : percentage < 60
        ? "Amigos."

      : percentage < 80
        ? "Mejores amigos."

      : percentage < 100
        ? "¿Van a decirlo o no?"

      : "Están enamorados.";

  }

}


/* ================= EMERALDS ================= */

function renderEmeralds(){

  const container =
    $("#emeralds");

  if(!container) return;


  container.innerHTML = "";


  for(let i=0;i<7;i++){

    const found =
      state.emeralds.includes(i);


    const button =
      document.createElement("button");


    button.className =
      "emerald " +
      (found ? "found" : "");


    button.textContent =
      found ? "✓" : i + 1;


    button.onclick =
      () => findEmerald(i);


    container.appendChild(button);

  }


  if($("#emeraldCount")){

    $("#emeraldCount").textContent =
      state.emeralds.length + "/7";

  }

}


/* ================= FIND EMERALD ================= */

function findEmerald(
  index = Math.floor(
    Math.random() * 7
  )
){

  if(state.emeralds.includes(index)){

    toast(
      "Ya encontraste esta Emerald."
    );

    return;

  }


  state.emeralds.push(index);

  persist();

  renderEmeralds();


  if(state.emeralds.length === 7){

    toast(
      "¡LAS CONSEGUISTE TODAS!"
    );

    achievement(
      "Chaos Control"
    );

  }

  else{

    toast(
      "¡Una Chaos Emerald!"
    );

  }

}


/* ================= LAB ================= */

function lab(type){

  const messages = {

    computer:
      "Acceso autorizado. Archivo: AMATO. ¿Por qué hay un archivo llamado NO DEJAR A AMATO SOLO?",

    emerald:
      "Una Chaos Emerald. Brilla un poquito. Amato está demasiado emocionado.",

    monitor:
      "Frecuencia Chaos estable. Probablemente.",

    tubes:
      "Tubes. No sabes qué hay dentro. Mejor no.",

    docs:
      "Documentos: Chaos Energy / Control / Deseos.",

    scanner:
      "Analizando energía... Frecuencia desconocida.",

    red:
      "ERROR: AMATO TOCÓ ALGO QUE NO DEBÍA.",

    amato:
      "AMATO: ¿Qué hace este botón? TAILS: AMATO NO."

  };


  $("#labOutput").innerHTML =
    messages[type];


  if(type === "emerald"){

    findEmerald();

  }

}


/* ================= DIARY ================= */

function renderDiary(){

  $("#diaryNum").textContent =
    `Página ${diaryPage + 1} / ${diary.length}`;


  $("#diaryText").textContent =
    diary[diaryPage];

}


function nextPage(){

  diaryPage =
    (diaryPage + 1) % diary.length;

  renderDiary();

}


function prevPage(){

  diaryPage =
    (
      diaryPage - 1 + diary.length
    ) % diary.length;

  renderDiary();

}


/* ================= ROOM ================= */

function room(type){

  const messages = {

    bed:
      "Amato debería dormir.",

    plush:
      "Este tiene nombre. No preguntes.",

    books:
      "Chaos Energy. Chaos Control. Historia de las Emeralds. Otro libro. Otro.",

    window:
      "Las estrellas. Amato suele quedarse mirando aquí.",

    diary:
      "Esto parece privado. ¿Quieres abrirlo?",

    photos:
      "Recuerdos. Algunos recientes. Algunos no tanto.",

    candy:
      "Chocolate. Siempre chocolate.",

    emerald:
      "No deberías tocar eso.",

    desk:
      "Papeles, notas y una cantidad preocupante de investigaciones."

  };


  $("#roomOut").textContent =
    messages[type];

}


/* ================= SIMULATOR ================= */

function sim(type){

  const messages = {

    food:
      "Amato encontró comida. Amato está MUY feliz.",

    hug:
      "Amato se quedó quieto. ¿Puedo quedarme así?",

    emerald:
      "¡¿DÓNDE?! ¡Una Chaos Emerald! Esto es importantísimo.",

    shadow:
      "Shadow está aquí. Amato está feliz. Shadow pretende que no se dio cuenta."

  };


  $("#simOut").textContent =
    messages[type];


  if(type === "food"){

    state.stats.felicidad =
      Math.min(
        100,
        state.stats.felicidad + 8
      );

  }


  state.stats.energia =
    Math.max(
      0,
      state.stats.energia - 2
    );


  persist();

  renderStats();

}


/* ================= STATS ================= */

function renderStats(){

  const container =
    $("#stats");

  if(!container) return;


  container.innerHTML =
    Object.entries(
      state.stats
    )
    .map(
      ([name,value]) =>

        `<div class="stat">
          <b>${value}</b>
          ${name}
        </div>`

    )
    .join("");

}


/* ================= WISH ================= */

function wishStar(){

  const text =
    $("#wish").value.trim();


  if(!text){

    $("#wishResult").textContent =
      "Primero escribe un deseo.";

    return;

  }


  $("#wishResult").textContent =
    pick([

      "Las estrellas escucharon.",

      "Quizá.",

      "No sabemos.",

      "Pero lo dijiste en voz alta.",

      "Y eso también significa algo."

    ]);

}


/* ================= LETTER ================= */

function sendLetter(){

  const text =
    $("#letter").value.trim();


  if(!text){

    toast(
      "Escribe algo primero."
    );

    return;

  }


  state.letters++;

  persist();


  $("#letter").value = "";


  $("#letterResult").textContent =
    pick([

      "Gracias.",

      "De verdad necesitaba escuchar eso.",

      "No sé qué decir.",

      "Voy a guardar esta carta.",

      "¿Puedo leerla otra vez?",

      "Gracias por quedarte."

    ]);

}


/* ================= SECRETS ================= */

function unlockSecret(type){

  const messages = {

    fear:
      "Perder a alguien otra vez.",

    insecurity:
      "Sentir que tiene que estar bien para los demás.",

    habit:
      "Sonreír cuando no sabe qué más hacer.",

    unspoken:
      "Que las personas que quiere desaparezcan.",

    want:
      "Quédate.",

    maria:
      "Amato nunca conoció a Maria personalmente. Pero sabe que Maria fue importante para Shadow y respeta profundamente su memoria."

  };


  $("#secretOutput").textContent =
    messages[type];


  if(type === "maria"){

    $("#maria").textContent =
      messages[type];

  }


  if(
    !state.secret.includes(type)
  ){

    state.secret.push(type);

    persist();

    achievement(
      "Detective"
    );

  }

}


/* ================= ACHIEVEMENTS ================= */

function achievement(name){

  if(
    state.achievements.includes(name)
  ){

    return;

  }


  state.achievements.push(name);

  persist();

  toast(
    "Logro desbloqueado: " + name
  );


  renderAchievements();

}


function renderAchievements(){

  const container =
    $("#achievements");

  if(!container) return;


  const achievements = [

    "Esto ya es sospechoso",

    "Problema de Knuckles",

    "Chaos Control",

    "Detective",

    "Shamato Enjoyer",

    "Familia encontrada",

    "Napolitano Supremo"

  ];


  container.innerHTML =
    achievements

      .map(
        name =>

        `<div class="achievement">
          ${
            state.achievements.includes(name)
              ? "✓"
              : "○"
          }
          ${name}
        </div>`

      )

      .join("");

}


/* ================= GALLERY ================= */

function filterGallery(category){

  $$(".polaroid").forEach(
    item => {

      if(
        category === "all" ||
        item.dataset.cat === category
      ){

        item.style.display =
          "block";

      }

      else{

        item.style.display =
          "none";

      }

    }
  );

}


/* ================= WHAT IF ================= */

function renderWhatIf(){

  const scenarios = [

    [
      "¿Y SI AMATO NUNCA HUBIERA ENCONTRADO UNA CHAOS EMERALD?",
      "Quizá nunca habría comenzado su búsqueda. Quizá nunca habría conocido a ciertas personas."
    ],

    [
      "¿Y SI HUBIERA CONOCIDO A SHADOW ANTES?",
      "Habría hecho demasiadas preguntas. Shadow probablemente habría huido."
    ],

    [
      "¿Y SI SHADOW SE HUBIERA CONFESADO PRIMERO?",
      "Amato probablemente se quedaría en silencio. Después sonreiría."
    ],

    [
      "¿Y SI AMATO PUDIERA PEDIR UN DESEO?",
      "La pregunta importante sería si todavía querría pedirlo."
    ],

    [
      "¿Y SI NUNCA SE HUBIERAN CONOCIDO?",
      "Amato habría continuado buscando respuestas solo."
    ]

  ];


  $("#whatif").innerHTML =

    scenarios

      .map(
        scenario =>

        `<div class="faqItem">

          <b>${scenario[0]}</b>

          <p>
            ${scenario[1]}
          </p>

        </div>`

      )

      .join("");

}


/* ================= FAQ ================= */

function renderFAQ(){

  const faq = [

    [
      "¿Por qué se llama Napolitano?",
      "Porque su diseño está basado en helado napolitano."
    ],

    [
      "¿Puede usar Chaos Control?",
      "Está aprendiendo."
    ],

    [
      "¿Amato le tiene miedo a Shadow?",
      "No."
    ],

    [
      "¿Shadow le tiene paciencia?",
      "Depende del día."
    ],

    [
      "¿Amato deja de tocar cosas peligrosas?",
      "No."
    ],

    [
      "¿Knuckles sigue diciéndole que no toque cosas?",
      "Sí."
    ],

    [
      "¿Está enamorado de Shadow?",
      "Sí."
    ],

    [
      "¿Shadow está enamorado de Amato?",
      "Sí."
    ],

    [
      "¿Lo admiten?",
      "Eventualmente."
    ]

  ];


  $("#faq").innerHTML =

    faq

      .map(
        item =>

        `<div class="faqItem">

          <b>${item[0]}</b>

          <p>
            ${item[1]}
          </p>

        </div>`

      )

      .join("");

}


/* ================= KONAMI CODE ================= */

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


let sequence = [];


window.addEventListener(
  "keydown",
  event => {

    sequence.push(
      event.key
    );


    if(
      sequence.length >
      konami.length
    ){

      sequence.shift();

    }


    if(
      sequence.join("|") ===
      konami.join("|")
    ){

      $("#codeOutput").textContent =
        "¿Encontraste esto? Amato probablemente estaría orgulloso. Shadow no.";

      toast(
        "Secreto desbloqueado."
      );

      achievement(
        "Detective"
      );

    }

  }
);


/* ================= CLOCK ================= */

setInterval(

  () => {

    const clock =
      $("#clock");

    if(clock){

      clock.textContent =
        new Date().toLocaleTimeString(
          "es",
          {
            hour:"2-digit",
            minute:"2-digit"
          }
        );

    }

  },

  1000

);


/* ================= LOADING ================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    if(state.night){

      document.body.classList.add(
        "night"
      );

    }


    renderEmeralds();

    renderDiary();

    renderStats();

    renderAchievements();

    renderWhatIf();

    renderFAQ();

    updateRel();


    $("#energy").textContent =
      state.energy;


    $("#amatoClicks").textContent =
      state.amatoClicks +
      " clics";


    $("#shadowClicks").textContent =
      state.shadowClicks +
      " clics";


    const loadingMessages = [

      "Esperando a Amato...",

      "Amato tocó algo.",

      "Eso no debería estar pasando.",

      "Buscando respuestas...",

      "Encontrando problemas...",

      "Todo normal.",

      "Probablemente."

    ];


    let index = 0;


    const interval =
      setInterval(
        () => {

          $("#loadText").textContent =
            loadingMessages[
              index++
              %
              loadingMessages.length
            ];

        },
        230
      );


    setTimeout(
      () => {

        clearInterval(
          interval
        );

        $("#loading")
          .classList
          .add(
            "loading-hide"
          );

      },
      1750
    );

  }
);
