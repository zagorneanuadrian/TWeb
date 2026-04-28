const zonaClick = document.getElementById("zona-click");
const mesajStare = document.getElementById("mesaj-stare");
const afisajRezultat = document.getElementById("rezultat");

// Jocul poate avea 3 stări: "start", "asteptare", "verde"
let stareCurenta = "start"; 
let timpStart;
let timeoutVerde;

// Ascultăm când dă utilizatorul click pe caseta colorată
zonaClick.addEventListener("click", function() {
    if (stareCurenta === "start") {
        incepeJocul();
    } else if (stareCurenta === "asteptare") {
        clickPreaDevreme();
    } else if (stareCurenta === "verde") {
        calculeazaReactia();
    }
});

function incepeJocul() {
    stareCurenta = "asteptare";
    zonaClick.className = "stare-asteptare"; // Se face Roșu
    mesajStare.textContent = "Așteaptă culoarea verde...";
    afisajRezultat.textContent = "Timpul tău: - ms";

    // Generăm un timp aleatoriu între 2 și 6 secunde (în milisecunde)
    const timpAsteptare = Math.floor(Math.random() * 4000) + 2000;

    // Folosim setTimeout pentru a declanșa culoarea verde după acel timp
    timeoutVerde = setTimeout(faEcranulVerde, timpAsteptare);
}

function faEcranulVerde() {
    stareCurenta = "verde";
    zonaClick.className = "stare-verde"; // Se face Verde
    mesajStare.textContent = "CLICK ACUM!!!";
    
    // Salvăm momentul exact (ora:minutul:secunda:milisecunda) în care s-a făcut verde
    timpStart = Date.now(); 
}

function clickPreaDevreme() {
    clearTimeout(timeoutVerde); // Anulăm timpul ca să nu se mai facă verde!
    stareCurenta = "start";
    zonaClick.className = "stare-start"; // Revine la Albastru
    mesajStare.textContent = "Prea devreme! Click pentru a încerca din nou.";
    afisajRezultat.textContent = "Ai apăsat pe roșu!";
}

function calculeazaReactia() {
    // Cât timp a trecut din momentul în care s-a făcut verde până la click?
    const timpReactie = Date.now() - timpStart;
    
    stareCurenta = "start";
    zonaClick.className = "stare-start"; // Revine la Albastru
    mesajStare.textContent = "Click aici pentru a încerca din nou";
    
    // Afișăm scorul
    afisajRezultat.innerHTML = `Timpul tău: <strong style="color: #28a745;">${timpReactie} ms</strong>`;
}