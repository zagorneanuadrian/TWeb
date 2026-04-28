const zarJucator = document.getElementById("zar-jucator");
const zarCalculator = document.getElementById("zar-calculator");
const mesajRezultat = document.getElementById("mesaj-rezultat");
const btnArunca = document.getElementById("btn-arunca");
const textScorJucator = document.getElementById("scor-jucator");
const textScorCalculator = document.getElementById("scor-calculator");

// Fețele zarurilor în coduri Unicode (de la 1 la 6)
const feteZar = ["&#x2680;", "&#x2681;", "&#x2682;", "&#x2683;", "&#x2684;", "&#x2685;"];

let scorJucator = 0;
let scorCalculator = 0;

btnArunca.addEventListener("click", () => {
    // 1. Blocăm butonul și schimbăm textul cât timp se aruncă zarurile
    btnArunca.disabled = true;
    mesajRezultat.textContent = "Zarurile se rostogolesc...";
    mesajRezultat.style.color = "#555";

    // 2. Adăugăm clasa de animație "shake" pe zaruri
    zarJucator.classList.add("shake");
    zarCalculator.classList.add("shake");

    // 3. Așteptăm fix 1 secundă (1000 milisecunde)
    setTimeout(() => {
        // Scoatem animația de tremurat
        zarJucator.classList.remove("shake");
        zarCalculator.classList.remove("shake");

        // Generăm 2 numere aleatorii între 0 și 5 (pentru că avem 6 fețe în listă)
        const randomJucator = Math.floor(Math.random() * 6);
        const randomCalculator = Math.floor(Math.random() * 6);

        // Schimbăm imaginea zarului folosind numerele extrase
        zarJucator.innerHTML = feteZar[randomJucator];
        zarCalculator.innerHTML = feteZar[randomCalculator];

        // Verificăm cine a dat numărul mai mare (adăugăm +1 pentru că logica matematică începe de la 0, iar zarul de la 1)
        if (randomJucator > randomCalculator) {
            mesajRezultat.textContent = `Ai câștigat cu ${randomJucator + 1}! 🎉`;
            mesajRezultat.style.color = "#28a745";
            scorJucator++;
            textScorJucator.textContent = scorJucator;
        } else if (randomCalculator > randomJucator) {
            mesajRezultat.textContent = `Calculatorul a câștigat cu ${randomCalculator + 1}! 😢`;
            mesajRezultat.style.color = "#dc3545";
            scorCalculator++;
            textScorCalculator.textContent = scorCalculator;
        } else {
            mesajRezultat.textContent = "Egalitate! 😑";
            mesajRezultat.style.color = "#007bff";
        }

        // Deblocăm butonul pentru următoarea rundă
        btnArunca.disabled = false;
    }, 1000); // Sfârșitul pauzei de 1 secundă
});