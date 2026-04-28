const gameBoard = document.getElementById('game-board');
const btnRestart = document.getElementById('btn-restart');
const mesajCastig = document.getElementById('mesaj-castig');

// Lista noastră de fructe (6 fructe = 12 cărți)
const fructe = ['🍎', '🍌', '🍇', '🍉', '🍓', '🥑'];

// Creăm o listă dublată (fiecare fruct de două ori)
let carti = [...fructe, ...fructe]; 

let primaCarte = null;
let aDouaCarte = null;
let blocheazaTabla = false; // Ne oprește să dăm click pe a 3-a carte cât timp se întorc primele două
let perechiGasite = 0;

// Funcție pentru a amesteca aleatoriu lista de cărți
function amestecaCartile() {
    carti.sort(() => Math.random() - 0.5);
}

// Funcția care desenează jocul la început
function genereazaTabla() {
    gameBoard.innerHTML = ''; // Curățăm tabla veche
    amestecaCartile();
    
    // Resetăm variabilele
    perechiGasite = 0;
    mesajCastig.style.display = 'none';
    blocheazaTabla = false;
    primaCarte = null;
    aDouaCarte = null;

    // Creăm fiecare element HTML pentru cărți
    carti.forEach(fruct => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.icon = fruct; // Salvăm ce fruct este în interior
        cardElement.innerHTML = fruct; // Punem emoji-ul
        
        // Adăugăm funcția de click
        cardElement.addEventListener('click', intoarceCarte);
        
        gameBoard.appendChild(cardElement);
    });
}

function intoarceCarte() {
    // Dacă tabla e blocată sau dai click pe aceeași carte de 2 ori, nu se întâmplă nimic
    if (blocheazaTabla) return;
    if (this === primaCarte) return; 

    // Întoarcem cartea
    this.classList.add('flipped');

    // Dacă e prima carte pe care am apăsat...
    if (!primaCarte) {
        primaCarte = this;
        return;
    }

    // Dacă ajungem aici, înseamnă că e a doua carte
    aDouaCarte = this;
    verificaPotrivire();
}

function verificaPotrivire() {
    // Verificăm dacă iconițele ascunse sunt la fel
    let sePotrivesc = primaCarte.dataset.icon === aDouaCarte.dataset.icon;

    if (sePotrivesc) {
        // Am ghicit!
        dezactiveazaCarti();
    } else {
        // N-am ghicit, le întoarcem înapoi
        ascundeCarti();
    }
}

function dezactiveazaCarti() {
    // Le lăsăm întoarse permanent
    primaCarte.removeEventListener('click', intoarceCarte);
    aDouaCarte.removeEventListener('click', intoarceCarte);
    
    // Le facem verzi (clasa matched din CSS)
    primaCarte.classList.add('matched');
    aDouaCarte.classList.add('matched');

    reseteazaTabla();
    perechiGasite++;

    // Dacă am găsit toate cele 6 perechi, afișăm mesajul de câștig
    if (perechiGasite === fructe.length) {
        setTimeout(() => {
            mesajCastig.style.display = 'block';
        }, 500);
    }
}

function ascundeCarti() {
    blocheazaTabla = true;

    // Așteptăm 1 secundă ca să aibă timp jucătorul să vadă ce a greșit
    setTimeout(() => {
        primaCarte.classList.remove('flipped');
        aDouaCarte.classList.remove('flipped');
        reseteazaTabla();
    }, 1000);
}

function reseteazaTabla() {
    primaCarte = null;
    aDouaCarte = null;
    blocheazaTabla = false;
}

// Butonul de restart
btnRestart.addEventListener('click', genereazaTabla);

// Pornim jocul pentru prima dată
genereazaTabla();