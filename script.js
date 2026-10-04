/* =========================================
   AMATO ARCHIVE
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   STATE / LOCAL STORAGE
========================================= */

const state = {

    emeralds:
        Number(localStorage.getItem("amato_emeralds")) || 0,

    shamatoEnergy:
        Number(localStorage.getItem("shamato_energy")) || 0,

    amatoClicks:
        Number(localStorage.getItem("amato_clicks")) || 0,

    shadowClicks:
        Number(localStorage.getItem("shadow_clicks")) || 0,

    loveCount:
        Number(localStorage.getItem("love_count")) || 0,

    diaryPage:
        Number(localStorage.getItem("diary_page")) || 1,

    visits:
        Number(localStorage.getItem("amato_visits")) || 0

};


/* =========================================
   PAGE LOADING
========================================= */

let loadingProgress = 0;

const loadingInterval = setInterval(() => {

    loadingProgress += Math.floor(Math.random() * 12) + 5;

    if (loadingProgress >= 100) {

        loadingProgress = 100;

        clearInterval(loadingInterval);

        setTimeout(() => {

            document
                .getElementById("loading-screen")
                .classList
                .add("hidden");

        }, 400);

    }

    const progress =
        document.getElementById("loading-progress");

    if (progress) {
        progress.style.width =
            loadingProgress + "%";
    }

}, 100);


/* =========================================
   VISITS
========================================= */

state.visits++;

localStorage.setItem(
    "amato_visits",
    state.visits
);


/* =========================================
   NAVIGATION
========================================= */

function showSection(id) {

    const sections =
        document.querySelectorAll(".page-section");

    sections.forEach(section => {

        section.classList.remove("active");

    });


    const target =
        document.getElementById(id);

    if (target) {

        target.classList.add("active");

    }


    document
        .querySelectorAll("#main-nav button")
        .forEach(button => {

            button.classList.remove("active");

            if (
                button.dataset.section === id
            ) {

                button.classList.add("active");

            }

        });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* NAV BUTTONS */

document
    .querySelectorAll("#main-nav button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showSection(
                    button.dataset.section
                );

            }
        );

    });


/* =========================================
   TOAST
========================================= */

let toastTimer;

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================
   SHAMATO ENERGY
========================================= */

function increaseShamatoEnergy(amount) {

    state.shamatoEnergy += amount;

    if (state.shamatoEnergy > 100) {

        state.shamatoEnergy = 100;

    }

    localStorage.setItem(
        "shamato_energy",
        state.shamatoEnergy
    );

    updateShamatoEnergy();

    if (state.shamatoEnergy >= 100) {

        unlockAchievement(3);

        showToast(
            "SHAMATO ENERGY 100/100 ♡"
        );

    } else {

        showToast(
            `Shamato Energy +${amount}`
        );

    }

}


function updateShamatoEnergy() {

    const number =
        document.getElementById(
            "shamato-energy"
        );

    const fill =
        document.getElementById(
            "energy-fill"
        );

    if (number) {

        number.textContent =
            state.shamatoEnergy;

    }

    if (fill) {

        fill.style.width =
            state.shamatoEnergy + "%";

    }

}

updateShamatoEnergy();


/* =========================================
   EMERALDS
========================================= */

function collectEmerald() {

    if (state.emeralds >= 7) {

        showToast(
            "Ya encontraste las 7 Chaos Emeralds."
        );

        return;

    }

    state.emeralds++;

    localStorage.setItem(
        "amato_emeralds",
        state.emeralds
    );

    updateEmeraldCounter();

    showToast(
        `Chaos Emerald encontrada! ${state.emeralds}/7`
    );

    if (state.emeralds >= 1) {

        unlockAchievement(0);

    }

    if (state.emeralds >= 7) {

        showToast(
            "★ TODAS LAS CHAOS EMERALDS ★"
        );

    }

}


function updateEmeraldCounter() {

    const counter =
        document.getElementById(
            "emerald-count"
        );

    if (counter) {

        counter.textContent =
            state.emeralds;

    }

}

updateEmeraldCounter();


function spawnEmerald() {

    const symbols = [
        "◆",
        "★",
        "✦",
        "◇"
    ];

    const emerald =
        document.createElement("button");

    emerald.textContent =
        symbols[
            Math.floor(
                Math.random() * symbols.length
            )
        ];

    emerald.style.position = "fixed";

    emerald.style.left =
        Math.random() * 85 + 5 + "%";

    emerald.style.top =
        Math.random() * 70 + 15 + "%";

    emerald.style.zIndex = "9000";

    emerald.style.background =
        "transparent";

    emerald.style.border = "none";

    emerald.style.color =
        "#65e5ff";

    emerald.style.fontSize =
        "35px";

    emerald.style.cursor =
        "pointer";

    emerald.style.filter =
        "drop-shadow(0 0 10px #65e5ff)";

    emerald.onclick = () => {

        collectEmerald();

        emerald.remove();

    };

    document.body.appendChild(
        emerald
    );

    setTimeout(() => {

        if (emerald.isConnected) {

            emerald.remove();

        }

    }, 7000);

}


/* =========================================
   CHAOS LAB
========================================= */

function labComputer() {

    setLabScreen(
        "COMPUTER",
        "Tails dejó abierta una investigación sobre la relación entre Chaos Energy y deseos emocionales."
    );

}


function labMonitor() {

    setLabScreen(
        "MONITOR",
        "Lectura detectada: energía caótica estable... excepto cuando Amato toca algo que no debería."
    );

}


function labTube() {

    setLabScreen(
        "SAMPLE",
        "Muestra desconocida. Etiqueta escrita por Tails: “NO BEBER.”"
    );

}


function labDocuments() {

    setLabScreen(
        "DOCUMENTS",
        "Hay páginas y páginas sobre las Chaos Emeralds. Algunas tienen dibujos de Amato en los márgenes."
    );

}


function labRedButton() {

    setLabScreen(
        "ERROR",
        "ERROR: ¿POR QUÉ PRESIONASTE EL BOTÓN ROJO?"
    );

    showToast(
        "Tails probablemente te está buscando."
    );

}


function setLabScreen(title, text) {

    const screen =
        document.getElementById(
            "lab-screen"
        );

    screen.innerHTML = `
        <h2>${title}</h2>
        <p>${text}</p>
    `;

}


/* =========================================
   ROOM
========================================= */

function roomMessage(message) {

    const output =
        document.getElementById(
            "room-message"
        );

    output.textContent =
        message;

}


/* =========================================
   DIARY
========================================= */

const diaryEntries = [

    {
        title: "estrellas",
        text:
            "A veces miro las estrellas. No sé exactamente por qué."
    },

    {
        title: "Chaos Emeralds",
        text:
            "Encontré otra cosa rara sobre las Chaos Emeralds. Tails dice que debería dejar de tocar cosas desconocidas. No pienso hacerlo."
    },

    {
        title: "Sonic",
        text:
            "Sonic es demasiado rápido. Un día voy a ganarle una carrera. Probablemente."
    },

    {
        title: "Tails",
        text:
            "Tails sabe muchísimo. Me gusta preguntarle cosas aunque probablemente ya sepa que voy a preguntarle otras veinte."
    },

    {
        title: "Amy",
        text:
            "Amy entiende cuando estoy siendo dramático. Creo que eso es importante."
    },

    {
        title: "Knuckles",
        text:
            "Knuckles me dijo que no tocara una reliquia. Toqué la reliquia."
    },

    {
        title: "Cream",
        text:
            "Cream siempre pregunta si estoy bien. A veces digo que sí incluso cuando no."
    },

    {
        title: "Shadow",
        text:
            "Shadow no habla demasiado. Creo que eso está bien. A veces no hace falta hablar."
    },

    {
        title: "Shadow II",
        text:
            "Hoy se quedó conmigo aunque no le pedí que lo hiciera."
    },

    {
        title: "familia",
        text:
            "Nunca pensé que terminaría teniendo tantas personas a mi alrededor."
    },

    {
        title: "culpa",
        text:
            "Hay cosas que todavía no puedo decir en voz alta."
    },

    {
        title: "mi madre",
        text:
            "A veces intento recordar solo las cosas buenas. Otras veces recuerdo todo."
    },

    {
        title: "la noche",
        text:
            "Todavía pienso en aquella noche."
    },

    {
        title: "deseos",
        text:
            "Los deseos pueden ser peligrosos cuando realmente quieres que algo cambie."
    },

    {
        title: "Shadow III",
        text:
            "Me dijo que no tenía que estar solo."
    },

    {
        title: "no sé qué decir",
        text:
            "No sé cómo responder cuando alguien me dice cosas así."
    },

    {
        title: "pero...",
        text:
            "Creo que quiero creerle."
    },

    {
        title: "estrellas II",
        text:
            "Las estrellas se ven diferentes últimamente."
    },

    {
        title: "hogar",
        text:
            "Tal vez hogar no sea un lugar."
    },

    {
        title: "Sonic",
        text:
            "Sonic dice que somos una familia. Me hice el que no escuché."
    },

    {
        title: "Tails",
        text:
            "Tails encontró esta libreta. Le dije que no la leyera."
    },

    {
        title: "Amy",
        text:
            "Amy probablemente ya sabe todo."
    },

    {
        title: "Knuckles",
        text:
            "Knuckles no sabe guardar secretos."
    },

    {
        title: "Cream",
        text:
            "Cream me regaló algo hoy. Lo voy a guardar."
    },

    {
        title: "Shadow IV",
        text:
            "No dijo nada. Solo se sentó a mi lado."
    },

    {
        title: "miedo",
        text:
            "A veces tengo miedo de perderlos."
    },

    {
        title: "pérdida",
        text:
            "Ya perdí personas antes."
    },

    {
        title: "pero ahora",
        text:
            "Ahora hay personas que se quedan."
    },

    {
        title: "Chaos",
        text:
            "Quizá nunca encuentre una respuesta perfecta."
    },

    {
        title: "familia II",
        text:
            "Quizá no necesito una respuesta para todo."
    },

    {
        title: "última página",
        text:
            "Miré las estrellas otra vez."
    },

    {
        title: "final",
        text:
            "Encontré una familia... Esta vez no estoy solo."
    }

];


function updateDiary() {

    const entry =
        diaryEntries[
            state.diaryPage - 1
        ];

    if (!entry) return;

    document.getElementById(
        "diary-number"
    ).textContent =
        state.diaryPage;

    document.getElementById(
        "diary-title"
    ).textContent =
        entry.title;

    document.getElementById(
        "diary-text"
    ).textContent =
        entry.text;

    localStorage.setItem(
        "diary_page",
        state.diaryPage
    );

}


function nextDiaryPage() {

    if (
        state.diaryPage <
        diaryEntries.length
    ) {

        state.diaryPage++;

        updateDiary();

    }

    if (
        state.diaryPage >=
        diaryEntries.length
    ) {

        unlockAchievement(4);

    }

}


function previousDiaryPage() {

    if (state.diaryPage > 1) {

        state.diaryPage--;

        updateDiary();

    }

}


updateDiary();


/* =========================================
   GALLERY FILTER
========================================= */

function filterGallery(category) {

    document
        .querySelectorAll(".gallery-card")
        .forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display =
                    "block";

            } else {

                card.style.display =
                    "none";

            }

        });

}


/* =========================================
   ARCHIVE
========================================= */

const archiveData = {

    amato: `
        <h2>FILE 001 — AMATO</h2>
        <p>
            Sujeto: Amato.
            Erizo de aproximadamente 17 años.
            Extremadamente curioso respecto a las Chaos Emeralds.
        </p>
        <p>
            Nota: no dejarlo solo cerca de objetos misteriosos.
        </p>
    `,

    shadow: `
        <h2>FILE 002 — SHADOW</h2>
        <p>
            Reservado. Serio. Orgulloso.
            Extremadamente protector.
        </p>
        <p>
            Nivel de negación emocional: preocupante.
        </p>
    `,

    maria: `
        <h2>FILE 003 — MARIA</h2>
        <p>
            ARCHIVO BLOQUEADO.
        </p>
        <p>
            Amato no conoció a Maria.
            Solo conoce su historia a través de Shadow.
        </p>
    `,

    shamato: `
        <h2>FILE 004 — SHAMATO</h2>
        <p>
            Desconocidos → compañeros → amigos →
            mejores amigos → amantes.
        </p>
        <p>
            Probabilidad de slow burn:
            extremadamente alta.
        </p>
    `,

    chaos: `
        <h2>FILE 005 — CHAOS ENERGY</h2>
        <p>
            La relación de Amato con las Chaos Emeralds
            empezó como curiosidad y terminó siendo una
            búsqueda mucho más personal.
        </p>
    `

};


function openArchive(type) {

    const output =
        document.getElementById(
            "archive-content"
        );

    output.innerHTML =
        archiveData[type] ||
        "<p>Archivo no encontrado.</p>";

    if (type === "maria") {

        unlockAchievement(5);

    }

}


/* =========================================
   MOOD
========================================= */

function setMood(mood) {

    const messages = {

        feliz:
            "Amato está sonriendo demasiado. Probablemente está tramando algo.",

        cansado:
            "Amato necesita dormir. Dice que está bien. No está bien.",

        caótico:
            "Amato encontró algo brillante. Nadie sabe qué pasará ahora.",

        triste:
            "Amato está mirando las estrellas en silencio."

    };

    document.getElementById(
        "mood-result"
    ).textContent =
        messages[mood];

}


/* =========================================
   CLICK AMATO
========================================= */

function clickAmato() {

    state.amatoClicks++;

    localStorage.setItem(
        "amato_clicks",
        state.amatoClicks
    );

    document.getElementById(
        "amato-clicks"
    ).textContent =
        state.amatoClicks;

    const responses = [

        "♡ Amato te mira.",

        "“¿Qué?”",

        "Amato se ríe.",

        "“¿Necesitas algo?”",

        "Amato te abraza.",

        "“HOLA.”",

        "Amato está sospechosamente feliz.",

        "“Encontré una Chaos Emerald.”"

    ];

    showToast(
        responses[
            Math.floor(
                Math.random() *
                responses.length
            )
        ]
    );

    if (state.amatoClicks >= 10) {

        unlockAchievement(1);

    }

}


/* =========================================
   CLICK SHADOW
========================================= */

function clickShadow() {

    state.shadowClicks++;

    localStorage.setItem(
        "shadow_clicks",
        state.shadowClicks
    );

    document.getElementById(
        "shadow-clicks"
    ).textContent =
        state.shadowClicks;

    const responses = [

        "Shadow te mira.",

        "“...”",

        "“¿Qué quieres?”",

        "Shadow cruza los brazos.",

        "“Estoy aquí.”",

        "Shadow suspira.",

        "“No lo molestes.”",

        "“Quédate.”"

    ];

    showToast(
        responses[
            Math.floor(
                Math.random() *
                responses.length
            )
        ]
    );

    if (state.shadowClicks >= 10) {

        unlockAchievement(2);

    }

}


/* =========================================
   QUOTE GENERATOR
========================================= */

const quotes = [

    "“No soy feliz. Solo aprendí a hacer felices a los demás.”",

    "“Encontré una Chaos Emerald.”",

    "“¿Por qué Shadow está mirándome?”",

    "“No toqué nada.”",

    "“Bueno... quizá sí toqué algo.”",

    "“Estoy bien.”",

    "“No tienes que estar solo.”",

    "“Quédate.”",

    "“Estoy aquí.”",

    "“No pienso irme.”",

    "“Si tú te quedas, yo también.”",

    "“No me vas a perder.”",

    "“Puedes descansar.”"

];


function generateQuote() {

    document.getElementById(
        "quote-output"
    ).textContent =
        quotes[
            Math.floor(
                Math.random() *
                quotes.length
            )
        ];

}


/* =========================================
   SCENE GENERATOR
========================================= */

const locations = [

    "Emerald Hill",

    "el laboratorio de Tails",

    "la habitación de Amato",

    "una azotea de noche",

    "un camino perdido",

    "junto a las Chaos Emeralds",

    "una casa abandonada"

];


const situations = [

    "Amato encontró algo extraño.",

    "Shadow está preocupado.",

    "Amato no puede dormir.",

    "los dos están discutiendo.",

    "Sonic los dejó solos accidentalmente.",

    "Amato está mirando las estrellas.",

    "una Chaos Emerald reaccionó."

];


const endings = [

    "Shadow termina quedándose.",

    "Amato se ríe.",

    "ninguno dice lo que realmente piensa.",

    "terminan sentados juntos en silencio.",

    "todo sale mal.",

    "alguien dice “quédate”.",

    "se dan cuenta de que ya no están solos."

];


function generateScene() {

    const location =
        locations[
            Math.floor(
                Math.random() *
                locations.length
            )
        ];

    const situation =
        situations[
            Math.floor(
                Math.random() *
                situations.length
            )
        ];

    const ending =
        endings[
            Math.floor(
                Math.random() *
                endings.length
            )
        ];

    document.getElementById(
        "scene-output"
    ).innerHTML = `
        <strong>${location}</strong><br><br>
        ${situation}<br><br>
        <em>${ending}</em>
    `;

}


/* =========================================
   RANDOM FACTS
========================================= */

const facts = [

    "Amato es ambidiestro.",

    "Tiene una obsesión con las Chaos Emeralds.",

    "Le encantan los dulces.",

    "Es extremadamente expresivo.",

    "Puede convertir una investigación seria en un desastre.",

    "Le cuesta hablar de lo que realmente siente.",

    "Mira las estrellas con frecuencia.",

    "Shadow suele notar cuando Amato no está realmente bien.",

    "Amato nunca conoció personalmente a Maria.",

    "Amato terminó encontrando una familia."

];


function randomFact() {

    document.getElementById(
        "fact-output"
    ).textContent =
        facts[
            Math.floor(
                Math.random() *
                facts.length
            )
        ];

}


/* =========================================
   HUG
========================================= */

function hugAmato() {

    const responses = [

        "Amato se queda congelado por un segundo... y luego te abraza.",

        "Amato: “...¿esto es un abrazo?” ♡",

        "Amato te abraza con demasiada fuerza.",

        "Amato sonríe.",

        "Amato no dice nada. Solo se queda ahí."

    ];

    document.getElementById(
        "hug-output"
    ).textContent =
        responses[
            Math.floor(
                Math.random() *
                responses.length
            )
        ];

}


/* =========================================
   LOVE COUNTER
========================================= */

function loveCounter() {

    state.loveCount++;

    localStorage.setItem(
        "love_count",
        state.loveCount
    );

    document.getElementById(
        "love-count"
    ).textContent =
        state.loveCount;

    if (
        state.loveCount % 10 === 0
    ) {

        showToast(
            "Amato recibió amor ♡"
        );

    }

}

document.getElementById(
    "love-count"
).textContent =
    state.loveCount;


/* =========================================
   WHAT IF
========================================= */

const whatIfs = [

    "¿Y si Amato nunca hubiera pedido aquel deseo?",

    "¿Y si Shadow hubiera conocido a Amato antes?",

    "¿Y si Amato hubiera encontrado una Chaos Emerald diferente?",

    "¿Y si Amato hubiera contado la verdad desde el principio?",

    "¿Y si Shadow hubiera dicho “quédate” primero?",

    "¿Y si Amato hubiera decidido no volver a mirar las estrellas?"

];


function whatIf() {

    const result =
        whatIfs[
            Math.floor(
                Math.random() *
                whatIfs.length
            )
        ];

    document.getElementById(
        "what-if-output"
    ).textContent =
        result;

}


/* =========================================
   LETTER
========================================= */

function sendLetter() {

    const input =
        document.getElementById(
            "letter-input"
        );

    const text =
        input.value.trim();

    const output =
        document.getElementById(
            "letter-response"
        );

    if (!text) {

        output.textContent =
            "Amato está esperando una carta...";

        return;

    }

    const responses = [

        "Amato leyó tu carta y sonrió.",

        "Amato guardó la carta.",

        "Amato respondió: “Gracias.”",

        "Amato no sabe qué decir, pero está feliz.",

        "Amato: “No sabía que alguien pensaba eso de mí...”"

    ];

    output.textContent =
        responses[
            Math.floor(
                Math.random() *
                responses.length
            )
        ];

    input.value = "";

}


/* =========================================
   WISH TO THE STARS
========================================= */

function makeWish() {

    const input =
        document.getElementById(
            "wish-input"
        );

    const wish =
        input.value.trim();

    const output =
        document.getElementById(
            "wish-response"
        );

    if (!wish) {

        output.textContent =
            "Las estrellas esperan un deseo.";

        return;

    }

    output.innerHTML = `
        ☆ Tu deseo fue escuchado.
        <br>
        <em>“${escapeHTML(wish)}”</em>
    `;

    input.value = "";

}


/* =========================================
   GIFT BOX
========================================= */

const gifts = [

    "♡ una carta de Amato",

    "☆ una Chaos Emerald falsa",

    "☾ una nota de Shadow",

    "★ un dulce napolitano",

    "✦ una foto vieja",

    "♡ un abrazo",

    "◆ un documento clasificado"

];


function openGift() {

    const gift =
        gifts[
            Math.floor(
                Math.random() *
                gifts.length
            )
        ];

    document.getElementById(
        "gift-output"
    ).textContent =
        `Has recibido: ${gift}`;

}


/* =========================================
   ACHIEVEMENTS
========================================= */

let achievements =
    JSON.parse(
        localStorage.getItem(
            "amato_achievements"
        ) || "[]"
    );


function unlockAchievement(index) {

    if (
        achievements.includes(index)
    ) {

        return;

    }

    achievements.push(index);

    localStorage.setItem(
        "amato_achievements",
        JSON.stringify(achievements)
    );

    updateAchievements();

    showToast(
        "★ Achievement desbloqueado!"
    );

}


function updateAchievements() {

    const list =
        document.querySelectorAll(
            ".achievement"
        );

    list.forEach(
        (achievement, index) => {

            if (
                achievements.includes(index)
            ) {

                achievement.classList.remove(
                    "locked"
                );

                achievement.classList.add(
                    "unlocked"
                );

                achievement.textContent =
                    "★ " +
                    achievement.textContent
                        .replace(/^☆\s*/, "")
                        .replace(/^★\s*/, "");

            }

        }
    );

}


updateAchievements();


/* =========================================
   KONAMI CODE
========================================= */

const konamiCode = [

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

        if (
            event.key ===
            konamiCode[konamiIndex]
        ) {

            konamiIndex++;

            if (
                konamiIndex ===
                konamiCode.length
            ) {

                konamiIndex = 0;

                const output =
                    document.getElementById(
                        "konami-result"
                    );

                output.textContent =
                    "★ SECRETO DESBLOQUEADO: SHAMATO ★";

                showToast(
                    "Encontraste una ruta secreta."
                );

                unlockAchievement(6);

            }

        } else {

            konamiIndex = 0;

        }

    }
);


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================
   EASTER EGG
========================================= */

let bodyClicks = 0;

document.body.addEventListener(
    "click",
    event => {

        if (
            event.target.closest("button") ||
            event.target.closest("textarea") ||
            event.target.closest("input")
        ) {

            return;

        }

        bodyClicks++;

        if (
            bodyClicks === 20
        ) {

            showToast(
                "Psst... Amato sabe que estás haciendo click."
            );

        }

        if (
            bodyClicks === 50
        ) {

            showToast(
                "Encontraste un pequeño secreto."
            );

        }

    }
);


/* =========================================
   MIDNIGHT MESSAGE
========================================= */

function checkTime() {

    const hour =
        new Date().getHours();

    if (
        hour >= 23 ||
        hour < 5
    ) {

        document.body.classList.add(
            "night-time"
        );

    }

}

checkTime();


/* =========================================
   INITIAL ACTIVE NAV
========================================= */

document
    .querySelector(
        '#main-nav button[data-section="home"]'
    )
    ?.classList
    .add("active");


/* =========================================
   SAVE BEFORE LEAVING
========================================= */

window.addEventListener(
    "beforeunload",
    () => {

        localStorage.setItem(
            "amato_emeralds",
            state.emeralds
        );

        localStorage.setItem(
            "shamato_energy",
            state.shamatoEnergy
        );

        localStorage.setItem(
            "amato_clicks",
            state.amatoClicks
        );

        localStorage.setItem(
            "shadow_clicks",
            state.shadowClicks
        );

        localStorage.setItem(
            "love_count",
            state.loveCount
        );

    }
);
