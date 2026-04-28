const celule = document.querySelectorAll(".celula");
const statusText = document.getElementById("status");
const btnRestart = document.getElementById("btn-restart");

// Array care memorează ce este în fiecare din cele 9 căsuțe
let optiuni = ["", "", "", "", "", "", "", "", ""];
let jucatorCurent = "X";
let jocActiv = true;

// Toate combinațiile posibile pentru a câștiga jocul
const conditiiCastig = [
    [0, 1, 2], // Linia 1
    [3, 4, 5], // Linia 2
    [6, 7, 8], // Linia 3
    [0, 3, 6], // Coloana 1
    [1, 4, 7], // Coloana 2
    [2, 5, 8], // Coloana 3
    [0, 4, 8], // Diagonala 1
    [2, 4, 6]  // Diagonala 2
];

// Porniți jocul
function initializareJoc() {
    celule.forEach(celula => celula.addEventListener("click", clickCelula));
    btnRestart.addEventListener("click", restartJoc);
    statusText.textContent = `Rândul lui ${jucatorCurent}`;
}

// Ce se întâmplă când dai click pe un pătrat
function clickCelula() {
    const indexCelula = this.getAttribute("data-index");

    // Dacă celula e deja plină sau jocul s-a terminat, nu facem nimic
    if (optiuni[indexCelula] !== "" || !jocActiv) {
        return;
    }

    actualizareCelula(this, indexCelula);
    verificareCastigator();
}

// Punem X sau 0 în celulă
function actualizareCelula(celula, index) {
    optiuni[index] = jucatorCurent;
    celula.textContent = jucatorCurent;
    // Adăugăm clasa pentru a-i da culoarea din CSS
    celula.classList.add(jucatorCurent.toLowerCase());
}

function schimbareJucator() {
    jucatorCurent = (jucatorCurent === "X") ? "0" : "X";
    statusText.textContent = `Rândul lui ${jucatorCurent}`;
}

// Verificăm dacă a câștigat cineva
function verificareCastigator() {
    let rundaCastigata = false;

    for (let i = 0; i < conditiiCastig.length; i++) {
        const conditie = conditiiCastig[i];
        const celulaA = optiuni[conditie[0]];
        const celulaB = optiuni[conditie[1]];
        const celulaC = optiuni[conditie[2]];

        if (celulaA === "" || celulaB === "" || celulaC === "") {
            continue;
        }
        if (celulaA === celulaB && celulaB === celulaC) {
            rundaCastigata = true;
            break;
        }
    }

    if (rundaCastigata) {
        statusText.textContent = `${jucatorCurent} a câștigat! 🎉`;
        jocActiv = false;
    } else if (!optiuni.includes("")) {
        statusText.textContent = "Egalitate! 😑";
        jocActiv = false;
    } else {
        schimbareJucator();
    }
}

// Resetarea jocului
function restartJoc() {
    jucatorCurent = "X";
    optiuni = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Rândul lui ${jucatorCurent}`;
    
    celule.forEach(celula => {
        celula.textContent = "";
        celula.classList.remove("x", "o");
    });
    
    jocActiv = true;
}

// Chemăm funcția de start
initializareJoc();