const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const textScor = document.getElementById("scor");
const btnRestart = document.getElementById("btn-restart");

// Butoanele pentru mâncare
const btnPlus = document.getElementById("btn-plus");
const btnMinus = document.getElementById("btn-minus");
const textCantitateMancare = document.getElementById("text-mancare");

const dimensiuneBucata = 20;
let scor = 0;
let dx = dimensiuneBucata; 
let dy = 0;                
let timeoutJoc;

// NOU: Coada pentru a memora tastele apăsate super rapid
let coadaTaste = []; 

let sarpe = [
    {x: 200, y: 200},
    {x: 180, y: 200},
    {x: 160, y: 200},
    {x: 140, y: 200}
];

let numarMaximMere = 1;
let listaMere = [];

// --------- BUTOANE PLUS ȘI MINUS --------- //
btnPlus.addEventListener("click", () => {
    numarMaximMere++;
    textCantitateMancare.textContent = `Mere pe ecran: ${numarMaximMere}`;
    listaMere.push(genereazaUnMar()); 
});

btnMinus.addEventListener("click", () => {
    if (numarMaximMere > 1) { 
        numarMaximMere--;
        textCantitateMancare.textContent = `Mere pe ecran: ${numarMaximMere}`;
        listaMere.pop(); 
    }
});


// Începem jocul
function startJoc() {
    listaMere = [];
    for(let i = 0; i < numarMaximMere; i++) {
        listaMere.push(genereazaUnMar());
    }
    
    // Înregistrăm tastele apăsate
    document.addEventListener("keydown", inregistreazaTasta);
    buclaJoc();
}

function buclaJoc() {
    if (jocTerminat()) {
        btnRestart.style.display = "inline-block";
        return;
    }
    
    timeoutJoc = setTimeout(function onTick() {
        curataTabla();
        deseneazaMancarea();
        
        // NOU: Executăm comanda din memorie abia acum, exact când se mișcă șarpele
        proceseazaDirectia();
        
        miscaSarpele();
        deseneazaSarpele();
        
        buclaJoc(); 
    }, 100);
}

function curataTabla() {
    ctx.fillStyle = "#eefbff";
    ctx.strokeStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ---------------- DESENARE ---------------- //
function deseneazaSarpele() {
    sarpe.forEach(deseneazaBucataSarpe);
}

function deseneazaBucataSarpe(bucata, index) {
    ctx.fillStyle = index === 0 ? "#218838" : "#28a745";
    ctx.strokeStyle = "#1e7e34";
    ctx.fillRect(bucata.x, bucata.y, dimensiuneBucata, dimensiuneBucata);
    ctx.strokeRect(bucata.x, bucata.y, dimensiuneBucata, dimensiuneBucata);
}

function deseneazaMancarea() {
    ctx.fillStyle = "#dc3545"; 
    ctx.strokeStyle = "#c82333";
    listaMere.forEach(mar => {
        ctx.fillRect(mar.x, mar.y, dimensiuneBucata, dimensiuneBucata);
        ctx.strokeRect(mar.x, mar.y, dimensiuneBucata, dimensiuneBucata);
    });
}

// ---------------- LOGICĂ MIȘCARE ȘI INPUT ---------------- //
function inregistreazaTasta(event) {
    const tasteValide = [37, 38, 39, 40, 87, 65, 83, 68];
    // Dacă apăsăm o săgeată sau WASD, o punem în lista de așteptare
    if (tasteValide.includes(event.keyCode)) {
        event.preventDefault(); // Oprește pagina din a da scroll
        coadaTaste.push(event.keyCode);
    }
}

function proceseazaDirectia() {
    // Dacă nu am apăsat nimic recent, ieșim
    if (coadaTaste.length === 0) return;

    // Scoatem prima tastă pe care am apăsat-o (metoda FIFO - First In First Out)
    const tastaApasata = coadaTaste.shift(); 

    const mergeSus = dy === -dimensiuneBucata;
    const mergeJos = dy === dimensiuneBucata;
    const mergeDreapta = dx === dimensiuneBucata;
    const mergeStanga = dx === -dimensiuneBucata;

    // Săgeata Stânga sau A
    if ((tastaApasata === 37 || tastaApasata === 65) && !mergeDreapta) { dx = -dimensiuneBucata; dy = 0; }
    // Săgeata Sus sau W
    else if ((tastaApasata === 38 || tastaApasata === 87) && !mergeJos) { dx = 0; dy = -dimensiuneBucata; }
    // Săgeata Dreapta sau D
    else if ((tastaApasata === 39 || tastaApasata === 68) && !mergeStanga) { dx = dimensiuneBucata; dy = 0; }
    // Săgeata Jos sau S
    else if ((tastaApasata === 40 || tastaApasata === 83) && !mergeSus) { dx = 0; dy = dimensiuneBucata; }
}

function miscaSarpele() {
    const capNou = {x: sarpe[0].x + dx, y: sarpe[0].y + dy};
    sarpe.unshift(capNou); 

    let indexMarMancat = -1;
    for (let i = 0; i < listaMere.length; i++) {
        if (sarpe[0].x === listaMere[i].x && sarpe[0].y === listaMere[i].y) {
            indexMarMancat = i;
            break; 
        }
    }

    if (indexMarMancat !== -1) {
        scor += 10;
        textScor.textContent = scor;
        listaMere[indexMarMancat] = genereazaUnMar();
    } else {
        sarpe.pop();
    }
}

// ---------------- FINAL JOC ---------------- //
function jocTerminat() {
    for (let i = 4; i < sarpe.length; i++) {
        if (sarpe[i].x === sarpe[0].x && sarpe[i].y === sarpe[0].y) return true;
    }
    const lovitPereteStanga = sarpe[0].x < 0;
    const lovitPereteDreapta = sarpe[0].x >= canvas.width;
    const lovitPereteSus = sarpe[0].y < 0;
    const lovitPereteJos = sarpe[0].y >= canvas.height;

    return lovitPereteStanga || lovitPereteDreapta || lovitPereteSus || lovitPereteJos;
}

// ---------------- GENERARE MÂNCARE ---------------- //
function randomZece(min, max) {
    return Math.round((Math.random() * (max - min) + min) / dimensiuneBucata) * dimensiuneBucata;
}

function genereazaUnMar() {
    let xNou = randomZece(0, canvas.width - dimensiuneBucata);
    let yNou = randomZece(0, canvas.height - dimensiuneBucata);
    return {x: xNou, y: yNou};
}

// Resetare joc din buton
btnRestart.addEventListener("click", function() {
    sarpe = [ {x: 200, y: 200}, {x: 180, y: 200}, {x: 160, y: 200}, {x: 140, y: 200} ];
    scor = 0;
    dx = dimensiuneBucata;
    dy = 0;
    coadaTaste = []; // Goliți memoria de comenzi vechi la restart
    textScor.textContent = scor;
    btnRestart.style.display = "none";
    startJoc();
});

// Pornim la început
startJoc();