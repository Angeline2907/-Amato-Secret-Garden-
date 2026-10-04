const navItems=[
  ['perfil','🍨 Perfil'],
  ['lore','🌙 Lore'],
  ['personajes','👥 Personajes'],
  ['shamato','🖤 Shamato'],
  ['scrapbook','📓 Scrapbook'],
  ['cartas','💌 Cartas'],
  ['galeria','🖼️ Galería'],
  ['random','📖 Random'],
  ['energia','💗 Energía'],
  ['emerald','⭐ Emerald'],
  ['personalidad','🧠 Personalidad'],
  ['paleta','🍨 Paleta'],
  ['simulador','🎲 Simulador'],
  ['laboratorio','🔬 Laboratorio'],
  ['diario','📓 Diario'],
  ['habitacion','🏠 Habitación'],
  ['clasificado','🔒 Classified'],
  ['estrellas','☆ Deseos'],
  ['shamatoenergy','♡ Counter'],
  ['logros','🏆 Logros'],
  ['final','✦ Final'],
  ['extras','✦ Extras']
];

const nav=document.getElementById('nav');

navItems.forEach(([id,name])=>{
  const b=document.createElement('button');
  b.className='navbtn';
  b.textContent=name;
  b.onclick=()=>{
    document.getElementById(id).scrollIntoView({behavior:'smooth'});
  };
  nav.appendChild(b);
});

const save=(k,v)=>localStorage.setItem('amato_'+k,JSON.stringify(v));

const load=(k,d)=>{
  try{
    const v=JSON.parse(localStorage.getItem('amato_'+k));
    return v===null?d:v;
  }catch{
    return d;
  }
};

let energy=load('energy',0);
let shamato=load('shamato',0);
let emerald=load('emerald',0);

function toast(t){
  const el=document.getElementById('toast');
  el.textContent=t;
  el.classList.add('show');

  clearTimeout(window.__toast);
  window.__toast=setTimeout(()=>{
    el.classList.remove('show');
  },2200);
}

function renderEnergy(){
  document.getElementById('energy').textContent=energy;

  const hearts=document.getElementById('hearts');
  hearts.innerHTML='';

  for(let i=0;i<Math.min(energy,100);i++){
    const b=document.createElement('button');
    b.className='heart';
    b.textContent='♥';
    b.onclick=()=>{
      b.classList.remove('pop');
      void b.offsetWidth;
      b.classList.add('pop');
      addShamato(1);
    };
    hearts.appendChild(b);
  }
}

function addShamato(n=1){
  shamato=Math.min(100,shamato+n);
  energy=shamato;

  save('shamato',shamato);
  save('energy',energy);

  document.getElementById('shamatoEnergy').textContent=shamato;

  renderEnergy();

  let text='Esto empieza normal.';

  if(shamato>=25)text='Hmm... esto ya empieza a parecer sospechoso.';
  if(shamato>=50)text='Definitivamente hay algo entre ellos.';
  if(shamato>=75)text='Shadow ya ni siquiera intenta ocultarlo.';
  if(shamato>=100){
    text='SHAMATO ENERGY COMPLETA. Nadie puede negar nada.';
    achieve('shamato');
  }

  document.getElementById('shamatoEnergyText').textContent=text;
}

renderEnergy();

const quotes={
  amato:[
    "¿Qué podría salir mal?",
    "Tengo una idea.",
    "Solo quiero entenderlo.",
    "¿Puedo tocarlo?",
    "Prometo que esta vez no hice nada.",
    "Espera, ¿eso es una Chaos Emerald?",
    "Las estrellas son bonitas.",
    "Estoy bien.",
    "Necesito saber la respuesta.",
    "No puedo dejarlo así."
  ],

  shadow:[
    "No estoy preocupado.",
    "No tienes que hacer esto solo.",
    "Quédate cerca.",
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
  ],

  shamato:[
    "Si tú te quedas, yo también.",
    "No quiero perderte.",
    "Quédate.",
    "Estoy aquí.",
    "No tienes que fingir conmigo.",
    "No te vayas todavía.",
    "No necesito que digas nada.",
    "Te encontré.",
    "No voy a dejarte solo.",
    "¿Puedo quedarme contigo?"
  ]
};

function randomQuote(w){
  const a=quotes[w];
  const q=a[Math.floor(Math.random()*a.length)];

  document.getElementById(
    w==='shamato'?'shamatoQuote':'randomOutput'
  ).textContent='“'+q+'”';
}

const facts=[
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
  "Es impulsivo.",
  "Es protector.",
  "Tiene más preguntas que respuestas.",
  "Shadow finge que Amato no le parece adorable.",
  "Nadie le cree."
];

function randomFact(){
  document.getElementById('randomOutput').textContent=
    '“'+facts[Math.floor(Math.random()*facts.length)]+'”';

  achieve('fact');
}

function personality(a,b){
  document.getElementById('personalityDetail').innerHTML=
    '<b>'+a+'</b><br>'+b;
}

function tapEmerald(){
  if(emerald>=7){
    toast('La Emerald ya está completa.');
    return;
  }

  emerald++;
  save('emerald',emerald);

  document.getElementById('emeraldCount').textContent=emerald;

  document.getElementById('emeraldBtn').animate(
    [
      {transform:'scale(1)'},
      {transform:'scale(1.25)'},
      {transform:'scale(1)'}
    ],
    {duration:350}
  );

  document.getElementById('emeraldText').textContent=
    emerald===7
      ?'¡LAS 7! Amato encontró respuestas... y una familia.'
      :'¡Una! '+emerald+'/7';

  achieve('emerald');
}

document.getElementById('emeraldCount').textContent=emerald;

const gallery=[
  ['amato','Amato — Napolitan core','🍨'],
  ['amato','Chaos Research','◆'],
  ['amato','Emerald Hill','✦'],
  ['shamato','Amato + Shadow','♡'],
  ['shamato','Bajo las estrellas','★'],
  ['shamato','Chaos Control','◈'],
  ['amato','Scrapbook','📓'],
  ['shamato','Quédate','♥']
];

function filterGallery(type,el){
  document
    .querySelectorAll('[data-filter]')
    .forEach(x=>x.classList.remove('active'));

  el.classList.add('active');

  const g=document.getElementById('gallery');
  g.innerHTML='';

  gallery
    .filter(x=>type==='all'||x[0]===type)
    .forEach((x,i)=>{
      const d=document.createElement('div');

      d.className='polaroid';
      d.style.setProperty(
        '--r',
        (i%2?'2':'-2')+'deg'
      );

      d.innerHTML=
        '<div class="fake-art">'+x[2]+'</div>'+
        '<small>'+x[1]+'</small>';

      g.appendChild(d);
    });
}

filterGallery(
  'all',
  document.querySelector('[data-filter="all"]')
);

function sendLetter(){
  const v=document.getElementById('letter').value.trim();

  if(!v){
    toast('La carta está vacía.');
    return;
  }

  save('letter',v);

  document.getElementById('letterReply').textContent=[
    "Gracias.",
    "De verdad necesitaba escuchar eso.",
    "No sé qué decir.",
    "Voy a guardar esta carta.",
    "¿Puedo leerla otra vez?",
    "Gracias por quedarte."
  ][Math.floor(Math.random()*6)];

  achieve('letter');
}

function makeWish(){
  const v=document.getElementById('wish').value.trim();

  if(!v){
    toast('Primero escribe un deseo.');
    return;
  }

  document.getElementById('wishOutput').textContent=
    '“Las estrellas escucharon.” Quizá no pueden cumplirlo exactamente como lo imaginaste. Pero lo dijiste en voz alta.';

  achieve('wish');
}

function sim(k){
  const o={
    comida:'Amato encontró comida. Amato está MUY feliz.',
    abrazo:'Amato se quedó quieto. “¿Puedo quedarme así?”',
    chaos:'“¡¿DÓNDE?! ¡Una Chaos Emerald!”',
    shadow:'Shadow está aquí. Amato está feliz. Shadow pretende que no se dio cuenta.'
  };

  document.getElementById('simOutput').textContent=o[k];

  achieve('sim');
}

function lab(k){
  const o={
    computer:'Acceso autorizado. Archivo: AMATO. ¿Por qué hay tantos archivos? ¿Por qué uno dice NO DEJAR A AMATO SOLO?',
    scanner:'Analizando energía... Frecuencia desconocida. Amato probablemente está emocionado.',
    emerald:'La Emerald brilla. Tails acaba de entrar.',
    red:'ERROR: AMATO TOCÓ ALGO QUE NO DEBÍA.'
  };

  document.getElementById('labOutput').textContent=o[k];

  achieve('lab');
}

function room(k){
  const o={
    peluche:'Este tiene nombre. No preguntes.',
    libros:'Chaos Energy. Chaos Control. Historia de las Emeralds. Otro libro. Otro. Amato necesita salir un poco más.',
    ventana:'Las estrellas. Amato suele quedarse mirando aquí.',
    diario:'Esto parece privado. ¿Quieres abrirlo?',
    dulces:'Chocolate, fresa, vainilla. Todo correcto.',
    emerald:'El escritorio está lleno de notas. Una dice: “Shadow.”'
  };

  document.getElementById('roomOutput').textContent=o[k];

  achieve('room');
}

const diary=[
  ["Página 1","Encontré algo."],
  ["Página 2","Era una Chaos Emerald."],
  ["Página 3","Reaccionó cuando la toqué."],
  ["Página 4","No sé por qué."],
  ["Página 5","Quiero entenderlo."],
  ["Página 6","Papá decía que las estrellas parecían luces lejanas."],
  ["Página 7","Hoy pensé en pedir un deseo."],
  ["Página 8","Desearía que todo terminara."],
  ["Página 9","No sabía qué significaba realmente."],
  ["Página 10","Mamá murió."],
  ["Página 11","Yo pedí que todo terminara."],
  ["Página 12","¿Fue mi culpa?"],
  ["Página 13","No creo que tenga sentido."],
  ["Página 14","Pero no puedo dejar de pensarlo."],
  ["Página 15","Encontré otra cosa sobre las Chaos Emeralds."],
  ["Página 16","Quizá pueden conceder deseos."],
  ["Página 17","Tengo que descubrirlo."],
  ["Página 18","Conocí a Sonic."],
  ["Página 19","Es imposible quedarse quieto cerca de él."],
  ["Página 20","Tails sabe muchísimo."],
  ["Página 21","Amy abraza demasiado."],
  ["Página 22","Knuckles me dijo que no tocara algo."],
  ["Página 23","Lo toqué."],
  ["Página 24","Shadow."],
  ["Página 25","No sé qué pensar de él."],
  ["Página 26","Quiero aprender Chaos Control."],
  ["Página 27","Shadow dijo que no."],
  ["Página 28","Le pregunté otra vez."],
  ["Página 29","Dijo que no otra vez."],
  ["Página 30","Creo que empieza a conocerme demasiado bien."],
  ["Página 31","A veces siento que tengo que estar bien porque los demás cuentan conmigo."],
  ["Página 32","No encontré la respuesta que buscaba."],
  ["Página final","Encontré una familia.\n\nAmigos.\n\nY alguien que decidió quedarse.\n\nEsta vez no estoy solo."]
];

let dp=load('diaryPage',0);

function renderDiary(){
  document.getElementById('diaryTitle').textContent=diary[dp][0];
  document.getElementById('diaryText').textContent=diary[dp][1];

  save('diaryPage',dp);
}

function diaryNext(){
  dp=Math.min(diary.length-1,dp+1);

  renderDiary();
  achieve('diary');
}

function diaryPrev(){
  dp=Math.max(0,dp-1);
  renderDiary();
}

renderDiary();

const achDefs=[
  ['first','Primer paso','Visitaste la página.'],
  ['emerald','Chaos Researcher','Encontraste una Emerald.'],
  ['heart','Corazón','Hiciste clic en un corazón.'],
  ['shamato','Shamato Enjoyer','Llegaste a 100 Shamato Energy.'],
  ['letter','Correspondencia','Enviaste una carta.'],
  ['wish','Wish','Pediste un deseo.'],
  ['fact','Detective','Descubriste un dato.'],
  ['sim','¿Qué está haciendo?','Probaste el simulador.'],
  ['lab','Cerebro de Tails','Entraste al laboratorio.'],
  ['room','Home','Exploraste la habitación.'],
  ['diary','Diario','Abriste el diario.'],
  ['secret','Detective Supremo','Encontraste un secreto.']
];

let unlocked=load('achievements',{});

function achieve(k){
  if(!unlocked[k]){
    unlocked[k]=true;

    save('achievements',unlocked);

    renderAchievements();

    if(k!=='first'){
      toast(
        'Logro desbloqueado: '+
        (achDefs.find(x=>x[0]===k)?.[1]||k)
      );
    }
  }
}

function renderAchievements(){
  const box=document.getElementById('achievements');

  box.innerHTML='';

  achDefs.forEach(a=>{
    const d=document.createElement('div');

    d.className=
      'mini achievement '+
      (unlocked[a[0]]?'':'locked');

    d.innerHTML=
      '<div class="badge">'+
      (unlocked[a[0]]?'★':'?')+
      '</div>'+
      '<div><b>'+a[1]+'</b><br>'+
      '<small>'+a[2]+'</small></div>';

    box.appendChild(d);
  });
}

renderAchievements();
achieve('first');

function openModal(type){
  const title=document.getElementById('modalTitle');
  const body=document.getElementById('modalBody');

  const data={
    historyShadow:[
      'HISTORIAL DE BÚSQUEDA — SHADOW',
      [
        'Cómo saber si alguien está triste sin preguntarle.',
        'Cómo ayudar a alguien que no quiere ayuda.',
        'Chaos Control.',
        'Cómo cocinar.',
        'Qué hacer si Amato no deja de hablar.',
        'Cómo decirle a alguien que se quede.',
        'Cómo saber si estás enamorado.',
        '¿Por qué Amato me mira así?'
      ]
    ],

    historyAmato:[
      'HISTORIAL DE BÚSQUEDA — AMATO',
      [
        '¿Las Chaos Emeralds conceden deseos?',
        '¿Cómo funciona Chaos Control?',
        '¿Puede una Chaos Emerald sentir emociones?',
        '¿Qué significa cuando una Emerald brilla?',
        '¿Cómo saber si alguien está preocupado?',
        '¿Por qué Shadow siempre dice que no?',
        '¿Shadow me odia?',
        '¿Shadow me quiere?',
        '¿Cómo preguntarle?',
        '¿Las estrellas escuchan?'
      ]
    ],

    chat:[
      'SONIC TEAM',
      [
        'Sonic: ¿Dónde están?',
        'Tails: En el laboratorio.',
        'Knuckles: No.',
        'Amy: Amato está con Shadow.',
        'Sonic: Ah.',
        'Tails: ¿Otra vez?',
        'Knuckles: Probablemente.',
        'Amato: Estoy aquí.',
        'Shadow: ...',
        'Amato: Shadow también.',
        'Sonic: JA.',
        'Shadow: Sonic.'
      ]
    ],

    maria:[
      'ARCHIVO SECRETO — MARIA',
      [
        'Amato nunca la conoció.',
        'Pero sabe que fue importante para Shadow.',
        'Y entiende que algunas personas siguen viviendo en los recuerdos de quienes las amaron.'
      ]
    ]
  };

  let d=data[type];

  title.textContent=d[0];

  body.innerHTML=d[1]
    .map(x=>'<p>'+x+'</p>')
    .join('');

  document.getElementById('modal').classList.add('open');

  achieve('secret');
}

function closeModal(){
  document.getElementById('modal').classList.remove('open');
}

function toggleNight(){
  document.body.classList.toggle('night');

  save(
    'night',
    document.body.classList.contains('night')
  );

  toast(
    document.body.classList.contains('night')
      ?'Night Mode ON'
      :'Night Mode OFF'
  );
}

if(load('night',false)){
  document.body.classList.add('night');
}

function amatoMode(){
  toast(
    '¡Bienvenido a mi mundo! No toques nada. Bueno... puedes tocar una.'
  );

  achieve('secret');
}

function shamatoMode(){
  openModal('chat');
  toast('Shamato Mode activado.');
}

let keys=[];

document.addEventListener('keydown',e=>{
  keys.push(e.key);

  keys=keys.slice(-8);

  if(
    keys.join(',')===
    'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight'
  ){
    toast(
      '¿Encontraste esto? Amato estaría orgulloso. Shadow no.'
    );

    achieve('secret');
  }
});

window.addEventListener('beforeunload',e=>{});
