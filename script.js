const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

let state={
shamato:+localStorage.getItem("amato_shamato")||0,
emeralds:+localStorage.getItem("amato_emeralds")||0,
love:+localStorage.getItem("amato_love")||0,
achievements:+localStorage.getItem("amato_achievements")||0,
diary:+localStorage.getItem("amato_diary")||0,
music:false
};


/* TOAST */

function toast(text){
let t=$("#toast");
t.textContent=text;
t.classList.add("show");
clearTimeout(window.toastTimer);
window.toastTimer=setTimeout(()=>t.classList.remove("show"),2500);
}


/* LOGROS */

function addAchievement(name){
state.achievements++;
localStorage.setItem("amato_achievements",state.achievements);
toast("🏆 LOGRO DESBLOQUEADO: "+name);
updateCounters();
}


/* CONTADORES */

function updateCounters(){

$("#shamatoEnergy").textContent=state.shamato+" / 100";
$("#shamatoBar").style.width=state.shamato+"%";

$("#emeraldCount").textContent=state.emeralds+"/7";
$("#loveCount").textContent=state.love;
$("#achievementCount").textContent=state.achievements;

}


/* ESTADO */

function setMood(title,text){
$("#moodTitle").textContent=title;
$("#moodText").textContent=text;
}


/* PERSONAJES */

const characters={

Sonic:"Sonic fue una de las primeras personas que consiguió que Amato sintiera que podía simplemente ser él mismo. Aventuras, carreras y muchísimo caos.",

Tails:"Tails es su compañero de investigaciones Chaos. Normalmente es quien intenta impedir que Amato toque cosas que dicen NO TOCAR.",

Amy:"Amy entiende muy bien el lado emocional de Amato. Es una de las personas con las que puede hablar sin sentirse juzgado.",

Knuckles:"Una amistad llena de discusiones, aventuras y situaciones absurdas. Knuckles ya aprendió que Amato hará preguntas sobre absolutamente todo.",

Cream:"Amato tiene muchísimo cariño por Cream y siempre intenta protegerla. Ella también consigue sacarle su lado más tranquilo.",

Shadow:"Shadow y Amato comenzaron como desconocidos. Después compañeros. Después amigos. Después mejores amigos. Y lentamente apareció algo más. Shadow demuestra cariño principalmente quedándose."

};

function characterInfo(name){

$("#characterOutput").innerHTML=
`<b>${name}</b><p>${characters[name]}</p>`;

}


/* TIMELINE */

const events=[

["12 años","Muere su padre."],

["12 años","Su relación con su madre se vuelve cada vez más complicada."],

["Una noche","Amato mira las estrellas y desea que todo termine."],

["Después","Muere su madre y Amato empieza a sentirse culpable."],

["Después","Aprende a esconder el dolor haciendo felices a los demás."],

["17 años","Comienza su investigación sobre las Chaos Emeralds."],

["Sonic Adventure 2","Conoce a Sonic, Tails, Amy, Knuckles, Cream y Shadow."],

["Después","Las amistades se convierten en una familia."],

["Shamato","Amato y Shadow comienzan lentamente a confiar el uno en el otro."],

["Ahora","Amato mira las estrellas sin pedir que todo termine."]

];

function renderTimeline(){

$("#timeline").innerHTML=events.map(x=>
`<div class="timeline-item"><b>${x[0]}</b>${x[1]}</div>`
).join("");

}


/* SHAMATO */

function addShamato(n){

state.shamato=Math.min(100,state.shamato+n);

localStorage.setItem(
"amato_shamato",
state.shamato
);

updateCounters();

if(state.shamato===100){

addAchievement("Shamato Energy 100%");

openModal(`
<div class="section-title">🖤♡ 100/100</div>
<p>Amato está feliz.</p>
<p>Shadow está fingiendo que esto no le afecta.</p>
<p><b>Shadow:</b> “Quédate.”</p>
`);

}

}


/* SHAMATO TIMELINE */

function renderShamatoTimeline(){

let x=[
"01 — Desconocidos",
"02 — Primeras misiones",
"03 — Compañeros",
"04 — Amigos",
"05 — Mejores amigos",
"06 — Confianza",
"07 — Miedo a perderse",
"08 — Aprender a quedarse",
"09 — Lovers ♡"
];

$("#shamatoTimeline").innerHTML=x.map(a=>
`<div class="ship-event"><b>${a}</b></div>`
).join("");

}


/* RANDOM */

const aq=[
"¡Espera! ¿Eso era una Chaos Emerald?",
"Tengo una teoría.",
"¿Por qué Shadow está mirándome?",
"¡Mira las estrellas!",
"Estoy bien. De verdad.",
"No estoy haciendo nada peligroso.",
"¿Podemos comer algo?",
"¡Tengo una idea!"
];

const sq=[
"Quédate.",
"No tienes que estar solo.",
"Estoy aquí.",
"No pienso irme.",
"Puedes descansar.",
"No me vas a perder.",
"Deja de preocuparte.",
"...Tonto."
];

const facts=[
"Amato es ambidiestro.",
"Mide aproximadamente 100 cm.",
"Su diseño está inspirado en helado napolitano.",
"Le fascinan las Chaos Emeralds.",
"Habla muchísimo cuando está nervioso.",
"Le gustan las estrellas.",
"Tiene miedo de perder a las personas que quiere.",
"Shadow demuestra cariño principalmente con acciones.",
"Amato nunca conoció a Maria.",
"Conoce la historia de Maria a través de Shadow.",
"Probablemente tocaría un botón que dice NO TOCAR."
];

const pick=a=>a[Math.floor(Math.random()*a.length)];

function quote(type){

$("#randomOutput").innerHTML=
`<div class="dice">${type==="shadow"?"🖤":"💬"}</div>
<p>${pick(type==="shadow"?sq:aq)}</p>`;

}

function randomFact(){

$("#randomOutput").innerHTML=
`<div class="dice">🎲</div><p>${pick(facts)}</p>`;

}

function randomScene(){

let places=[
"Emerald Hill",
"el laboratorio de Tails",
"la habitación de Amato",
"una azotea de noche",
"una cafetería"
];

let situations=[
"Amato encontró algo extraño.",
"Shadow está intentando tener cinco minutos de paz.",
"Amato está haciendo demasiadas preguntas.",
"Los dos están mirando las estrellas.",
"Algo relacionado con Chaos apareció."
];

let endings=[
"Terminan riéndose.",
"Shadow se queda a su lado.",
"Tails aparece gritando.",
"Acaban comiendo helado.",
"Shadow dice: “Estoy aquí.”"
];

$("#randomOutput").innerHTML=
`<div class="dice">🍓</div>
<p>${pick(places)} — ${pick(situations)} ${pick(endings)}</p>`;

}


/* ABRAZO */

function hugAmato(){

$("#randomOutput").innerHTML=
`<div class="dice">♡</div>
<p>Amato se queda quieto dos segundos... y después abraza de vuelta.</p>`;

if(!localStorage.getItem("amato_hug")){

localStorage.setItem("amato_hug","1");
addAchievement("Abracé a Amato");

}

}


/* TE QUIERO */

function loveAmato(){

state.love++;

localStorage.setItem(
"amato_love",
state.love
);

updateCounters();

$("#randomOutput").innerHTML=
`<div class="dice">💗</div>
<p>Amato: “...¿eso era para mí?”</p>`;

if([10,50,100].includes(state.love))
addAchievement(state.love+" veces TE QUIERO");

}


/* REGALO */

function giftBox(){

let gifts=[
"🍓 una caja de fresas",
"🍫 chocolate",
"🍦 helado napolitano",
"🎀 una cinta rosa",
"⭐ una estrella de papel",
"🧸 un peluche",
"💌 una carta de Shadow",
"📓 una página del diario"
];

$("#randomOutput").innerHTML=
`<div class="dice">🎁</div>
<p>Encontraste: ${pick(gifts)}.</p>`;

}


/* EMERALDS */

function findEmerald(){

if(state.emeralds>=7){

toast("💎 Ya tienes las 7 Chaos Emeralds.");

return;

}

if(Math.random()<.75){

state.emeralds++;

localStorage.setItem(
"amato_emeralds",
state.emeralds
);

$("#randomOutput").innerHTML=
`<div class="dice">💎</div>
<p>¡Encontraste una Chaos Emerald! ${state.emeralds}/7</p>`;

if(state.emeralds===7){

addAchievement("Las 7 Chaos Emeralds");

openModal(`
<div class="section-title">💎 LAS ENCONTRASTE TODAS</div>
<p>Amato está probablemente emocionadísimo.</p>
<p>Tails probablemente está preocupado.</p>
`);

}

}else{

$("#randomOutput").innerHTML=
`<div class="dice">🔎</div>
<p>No encontraste ninguna. Solo una nota de Tails: “NO TOCAR”.</p>`;

}

updateCounters();

}


/* LAB */

function redButton(){

toast("🔴 Lo tocaste. Tails acaba de perder tres años de vida.");

addAchievement("Yo sí toqué el botón rojo");

$("#labOutput").textContent=
"ALARMA: ¿QUIÉN TOCÓ EL BOTÓN?";

}

function labComputer(){

$("#labOutput").textContent=
pick([
"SISTEMA: energía Chaos detectada.",
"Tails: ¿Amato? ¿Qué estás haciendo aquí?",
"SISTEMA: actividad extraña registrada.",
"Nota: no dejar a Amato solo con el laboratorio.",
"Amato: “¡Mira! ¡Encontré algo!”"
]);

}

function labDocument(){

openModal(`
<div class="section-title">📄 ARCHIVO CHAOS</div>
<p><b>SUJETO:</b> AMATO</p>
<p>Su sensibilidad a la energía Chaos sigue siendo anómala.</p>
<p>La respuesta parece intensificarse ante deseos,
vínculos emocionales y contacto con las Emeralds.</p>
<p>— Tails</p>
`);

}


/* HABITACIÓN */

function roomAction(type){

let messages={

bed:"La cama está desordenada. Amato dice que es parte de la decoración.",

plush:"El peluche tiene una pequeña cinta rosa.",

books:"Libros de Chaos Energy, astronomía y cosas prestadas por Tails.",

diary:"Hay una página marcada con una estrella.",

window:"Desde aquí se ven las estrellas.",

headphones:"Amato probablemente lleva horas escuchando la misma canción.",

photos:"Hay fotos de Sonic, Tails, Amy, Knuckles, Cream... y Shadow.",

sweets:"Fresas, chocolate y helado napolitano.",

backpack:"Una libreta, lápices, dulces y una Emerald falsa.",

emerald:"Amato: “¡NO LA TOQUES!”"

};

$("#roomOutput").textContent=
messages[type];

}


/* CARTAS */

const letters={

Sonic:"Hey, Amato. Deja de preocuparte tanto. Vamos a hacer algo divertido. — Sonic",

Tails:"Por favor, no toques ningún experimento sin avisarme. — Tails",

Amy:"Nunca olvides que puedes contar conmigo. — Amy",

Knuckles:"No sé qué estás planeando. Y probablemente prefiero no saberlo. — Knuckles",

Cream:"¡Espero que estés teniendo un buen día! — Cream",

Shadow:"No tienes que estar solo. — Shadow"

};

function openLetter(name){

openModal(`
<div class="section-title">💌 ${name}</div>
<p>${letters[name]}</p>
`);

}


/* CARTA PERSONAL */

function sendLetter(){

let input=$("#letterInput");

if(!input.value.trim()){

$("#letterResponse").textContent=
"Primero escribe algo ♡";

return;

}

$("#letterResponse").textContent=
pick([
"Amato leyó tu carta y sonrió.",
"Amato guardó la carta junto a las demás.",
"Amato respondió: “Gracias. De verdad.”",
"Amato se emocionó un poquito."
]);

input.value="";

if(!localStorage.getItem("amato_letter")){

localStorage.setItem("amato_letter","1");
addAchievement("Carta para Amato");

}

}


/* GALERÍA */

$$(".filter-bar button").forEach(button=>{

button.addEventListener("click",()=>{

$$(".filter-bar button")
.forEach(x=>x.classList.remove("active"));

button.classList.add("active");

let filter=button.dataset.filter;

$$(".polaroids article").forEach(card=>{

card.style.display=
filter==="all"||card.dataset.category===filter
?"":"none";

});

});

});


/* DIARIO */

const diaryEntries=[

"Hoy encontré otra cosa relacionada con Chaos. Tails dice que debería tener cuidado.",

"Sonic dijo que no tengo que entender todo inmediatamente.",

"Amy preguntó si estaba bien. Dije que sí. No estaba bien.",

"Las estrellas se ven bonitas esta noche.",

"A veces pienso demasiado.",

"Shadow dejó una nota. Solo decía: “Quédate.”",

"No sé por qué eso me hizo sentir tan tranquilo.",

"Hoy todos comimos juntos.",

"Me gusta cuando estamos todos juntos.",

"Tengo miedo de perderlos.",

"Shadow no habla mucho.",

"Pero cuando estoy triste se queda cerca.",

"Creo que eso significa algo.",

"No quiero preguntar.",

"Bueno. Sí quiero preguntar.",

"Las Emeralds siguen sin responder mi pregunta.",

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

"Me pregunto cuánto tiempo tardará todo esto en sentirse real.",

"No quiero volver a estar solo.",

"Creo que ya no lo estoy.",

"Tengo una familia.",

"Shadow sigue aquí.",

"Encontré una familia... Esta vez no estoy solo."

];

function renderDiary(){

let p=Math.min(
state.diary,
diaryEntries.length-1
);

$("#diaryPage").textContent=
String(p+1).padStart(2,"0")+
" / "+
String(diaryEntries.length).padStart(2,"0");

$("#diaryText").innerHTML=
`<h3>Querido diario...</h3>
<p>${diaryEntries[p]}</p>`;

}

function nextDiary(){

if(state.diary<diaryEntries.length-1){

state.diary++;

localStorage.setItem(
"amato_diary",
state.diary
);

renderDiary();

}else{

addAchievement("Final del diario");

toast("♡ Llegaste al final.");

}

}

function prevDiary(){

if(state.diary>0){

state.diary--;

localStorage.setItem(
"amato_diary",
state.diary
);

renderDiary();

}

}


/* ARCHIVOS */

function unlockFile(id){

let files={

1:"Amato empezó a investigar Chaos Energy buscando respuestas.",

2:"Shadow comenzó a quedarse cerca de Amato mucho antes de explicar por qué.",

3:"La familia que Amato encontró fue algo que nunca había pedido."

};

$("#classifiedOutput").textContent=files[id];

addAchievement("Archivo #"+id+" leído");

}


/* MARIA */

function secretMaria(){

openModal(`
<div class="section-title">🖤 MARIA — ARCHIVO ESPECIAL</div>
<p>Amato nunca conoció a Maria.</p>
<p>Solo conoce su historia a través de Shadow.</p>
<p>Este archivo nunca debe convertirse en un encuentro que no ocurrió.</p>
`);

addAchievement("Archivo Maria");

}


/* DESEO */

function makeWish(){

let input=$("#wishInput");

if(!input.value.trim()){

$("#wishOutput").textContent=
"Escribe un deseo primero ☆";

return;

}

$("#wishOutput").textContent=
`Las estrellas guardaron tu deseo:
“${input.value}”`;

input.value="";

if(!localStorage.getItem("amato_wish")){

localStorage.setItem("amato_wish","1");
addAchievement("Deseo a las estrellas");

}

}


/* MODOS */

function nightMode(){

document.body.classList.toggle("night");

toast(
document.body.classList.contains("night")
?"🌙 Modo noche"
:"☀️ Modo normal"
);

}

function amatoMode(){

document.body.classList.remove("night");

document.body.classList.toggle("amato-mode");

toast("🍓 Modo Amato");

}

function shamatoMode(){

document.body.classList.remove("night");

document.body.classList.toggle("shamato-mode");

toast("🖤♡ Modo Shamato");

}


/* MODAL */

function openModal(content){

$("#modalContent").innerHTML=content;

$("#modal").hidden=false;

}

function closeModal(){

$("#modal").hidden=true;

}

$("#modal").addEventListener("click",e=>{

if(e.target.id==="modal")
closeModal();

});


/* FINAL */

function unlockEnding(){

$("#endingOutput").innerHTML=`
<div class="final-dialogue">
<div>Amato: “¿Te vas a quedar?”</div>
<div>Shadow: “Sí.”</div>
<div>Amato: “Entonces... está bien.”</div>
</div>
`;

addAchievement("Final secreto");

}


/* MÚSICA */

$("#musicToggle").addEventListener("click",()=>{

state.music=!state.music;

$("#musicToggle").textContent=
state.music
?"🎵 Música de Fondo: ON"
:"🎵 Música de Fondo: OFF";

toast(
state.music
?"🎵 Activada — agrega tu audio aquí."
:"🎵 Música OFF"
);

});


/* CÓDIGO SECRETO */

const secretCode=[
"ArrowUp",
"ArrowUp",
"ArrowDown",
"ArrowDown",
"ArrowLeft",
"ArrowRight",
"ArrowLeft",
"ArrowRight"
];

let codeIndex=0;

document.addEventListener("keydown",e=>{

if(e.key===secretCode[codeIndex]){

codeIndex++;

if(codeIndex===secretCode.length){

codeIndex=0;

openModal(`
<div class="section-title">✨ SECRET ROUTE ✨</div>
<p>Encontraste una ruta que probablemente no estaba destinada a ti.</p>
<p>Amato: “¿Cómo hiciste eso?”</p>
<p>Shadow: “No preguntes.”</p>
`);

addAchievement("Código secreto");

}

}else{

codeIndex=0;

}

});


/* INICIO */

window.addEventListener("load",()=>{

updateCounters();
renderTimeline();
renderShamatoTimeline();
renderDiary();

});
