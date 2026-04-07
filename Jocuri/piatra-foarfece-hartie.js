// 1. Definim variabilele: Luăm elementele din HTML ca să le putem modifica
let scorJucator = 0;
let scorCalculator = 0;

const textScorJucator = document.getElementById("scor-jucator");
const textScorCalculator = document.getElementById("scor-calculator");
const textMesaj = document.getElementById("mesaj-rezultat");
const textAlegeri = document.getElementById("alegeri-afisate");

// 2. Lista de opțiuni posibile
const optiuni = ["piatra", "hartie", "foarfece"];

// 3. Funcția pentru alegerea calculatorului (Creierul adversarului)
function alegeCalculatorul() {
    // Alege un număr random între 0 și 2
    const numarRandom = Math.floor(Math.random() * 3);
    return optiuni[numarRandom];
}

// 4. Funcția principală care se joacă o rundă
function joacaRunda(alegereJucator) {
    const alegereCalc = alegeCalculatorul();
    
    // Afișăm pe ecran ce a ales fiecare
    textAlegeri.textContent = `Tu: ${alegereJucator} | Calculator: ${alegereCalc}`;

    // Verificăm cine a câștigat folosind logica if / else if / else
    if (alegereJucator === alegereCalc) {
        // EGALITATE
        textMesaj.textContent = "Egalitate! 😑";
        textMesaj.style.color = "#555";
    } 
    else if (
        (alegereJucator === "piatra" && alegereCalc === "foarfece") ||
        (alegereJucator === "hartie" && alegereCalc === "piatra") ||
        (alegereJucator === "foarfece" && alegereCalc === "hartie")
    ) {
        // JUCĂTORUL CÂȘTIGĂ
        scorJucator++; // Creștem scorul jucătorului cu 1
        textScorJucator.textContent = scorJucator; // Actualizăm pe ecran
        textMesaj.textContent = "Ai Câștigat! 🎉";
        textMesaj.style.color = "#28a745"; // Verde
    } 
    else {
        // CALCULATORUL CÂȘTIGĂ
        scorCalculator++; // Creștem scorul calculatorului cu 1
        textScorCalculator.textContent = scorCalculator; // Actualizăm pe ecran
        textMesaj.textContent = "Ai Pierdut! 😢";
        textMesaj.style.color = "#dc3545"; // Roșu
    }
}

// 5. Adăugăm "ascultători" pe butoane. Când dai click, se declanșează funcția de mai sus.
document.getElementById("btn-piatra").addEventListener("click", function() {
    joacaRunda("piatra");
});

document.getElementById("btn-hartie").addEventListener("click", function() {
    joacaRunda("hartie");
});

document.getElementById("btn-foarfece").addEventListener("click", function() {
    joacaRunda("foarfece");
});