const grid = document.getElementById('grid-2048');
const scorDisplay = document.getElementById('scor');
const mesajGameOver = document.getElementById('mesaj-game-over');

let scor = 0;
let patratele = new Array(16).fill(0);
let jocTerminat = false;
let istoricMutari = []; // Stiva pentru Undo

function startJoc() {
    grid.innerHTML = '';
    patratele = new Array(16).fill(0);
    istoricMutari = [];
    scor = 0;
    scorDisplay.innerHTML = scor;
    jocTerminat = false;
    mesajGameOver.style.display = 'none';

    for (let i = 0; i < 16; i++) {
        let celula = document.createElement('div');
        celula.classList.add('celula-2048');
        grid.appendChild(celula);
    }

    genereazaNumar(true);
    genereazaNumar(true);
    actualizeazaEcran();
}

function salveazaIstoric() {
    istoricMutari.push({
        tabla: [...patratele],
        scorCurent: scor
    });
    if (istoricMutari.length > 20) istoricMutari.shift();
}

function undo() {
    if (istoricMutari.length > 0) {
        const ultimaStare = istoricMutari.pop();
        patratele = ultimaStare.tabla;
        scor = ultimaStare.scorCurent;
        scorDisplay.innerHTML = scor;
        jocTerminat = false;
        mesajGameOver.style.display = 'none';
        actualizeazaEcran();
        console.log("Secret Undo activat! 🤫");
    }
}

function genereazaNumar(isNew = false) {
    let pozitiiGoale = [];
    for(let i = 0; i < 16; i++) {
        if(patratele[i] === 0) pozitiiGoale.push(i);
    }
    
    if(pozitiiGoale.length > 0) {
        let randomPozitie = pozitiiGoale[Math.floor(Math.random() * pozitiiGoale.length)];
        patratele[randomPozitie] = Math.random() > 0.1 ? 2 : 4;
        
        // Delay pentru a permite animatiei de glisare sa se termine
        setTimeout(() => {
            let celule = document.querySelectorAll('.celula-2048');
            if (celule[randomPozitie]) {
                celule[randomPozitie].classList.add('tile-new');
                actualizeazaEcran();
            }
        }, 150);
    }
}

function actualizeazaEcran() {
    let celule = document.querySelectorAll('.celula-2048');
    for(let i = 0; i < 16; i++) {
        let valoareVeche = celule[i].innerHTML;
        celule[i].innerHTML = patratele[i] === 0 ? '' : patratele[i];
        celule[i].className = 'celula-2048'; 
        
        if(patratele[i] !== 0) {
            celule[i].classList.add('val-' + patratele[i]); 
            if (valoareVeche != '' && valoareVeche != patratele[i]) {
                celule[i].classList.add('tile-merged');
            }
        }
    }
}

function gliseaza(rand) {
    let randFiltrat = rand.filter(val => val !== 0); 
    for(let i = 0; i < randFiltrat.length - 1; i++) {
        if(randFiltrat[i] !== 0 && randFiltrat[i] === randFiltrat[i+1]) {
            randFiltrat[i] *= 2; 
            scor += randFiltrat[i];
            randFiltrat[i+1] = 0; 
        }
    }
    randFiltrat = randFiltrat.filter(val => val !== 0); 
    while(randFiltrat.length < 4) randFiltrat.push(0);
    return randFiltrat;
}

function misca(directie) {
    if (jocTerminat) return;
    let miscareEfectuata = false;

    if (directie === 'stanga' || directie === 'dreapta') {
        for (let i = 0; i < 16; i += 4) {
            let rand = [patratele[i], patratele[i+1], patratele[i+2], patratele[i+3]];
            if (directie === 'dreapta') rand.reverse();
            let randNou = gliseaza(rand);
            if (directie === 'dreapta') randNou.reverse();
            for (let j = 0; j < 4; j++) {
                if (patratele[i+j] !== randNou[j]) miscareEfectuata = true;
                patratele[i+j] = randNou[j];
            }
        }
    } else {
        for (let i = 0; i < 4; i++) {
            let col = [patratele[i], patratele[i+4], patratele[i+8], patratele[i+12]];
            if (directie === 'jos') col.reverse();
            let colNoua = gliseaza(col);
            if (directie === 'jos') colNoua.reverse();
            for (let j = 0; j < 4; j++) {
                if (patratele[i+j*4] !== colNoua[j]) miscareEfectuata = true;
                patratele[i+j*4] = colNoua[j];
            }
        }
    }

    if (miscareEfectuata) {
        salveazaIstoric();
        actualizeazaEcran();
        scorDisplay.innerHTML = scor;
        
        setTimeout(() => {
            genereazaNumar();
            verificaInfrangere();
        }, 100); 
    }
}

function controaleTastatura(e) {
    if(jocTerminat) return;
    
    // Tasta U pentru Undo (Secret)
    if (e.keyCode === 85) {
        undo();
        return;
    }

    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) e.preventDefault();

    if(e.keyCode === 39 || e.keyCode === 68) misca('dreapta');
    else if(e.keyCode === 37 || e.keyCode === 65) misca('stanga');
    else if(e.keyCode === 38 || e.keyCode === 87) misca('sus');
    else if(e.keyCode === 40 || e.keyCode === 83) misca('jos');
}

function verificaInfrangere() {
    if (patratele.includes(0)) return;
    for(let i = 0; i < 16; i++) {
        if(i % 4 !== 3 && patratele[i] === patratele[i+1]) return; 
        if(i < 12 && patratele[i] === patratele[i+4]) return; 
    }
    jocTerminat = true;
    mesajGameOver.style.display = 'block';
}

document.addEventListener('keydown', controaleTastatura);
document.getElementById('btn-restart').addEventListener('click', startJoc);

startJoc();