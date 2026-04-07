// 1. Inițializăm variabilele jocului
let numarSecret = genereazaNumar();
let incercari = 0;

const inputJucator = document.getElementById("input-numar");
const btnGhiceste = document.getElementById("btn-ghiceste");
const textMesaj = document.getElementById("mesaj-indiciu");
const textScor = document.getElementById("nr-incercari");
const btnRestart = document.getElementById("btn-restart");

// 2. Funcția de generare a numărului
function genereazaNumar() {
    return Math.floor(Math.random() * 100) + 1;
}

// 3. Logica principală
btnGhiceste.addEventListener("click", function() {
    const valoareIntrodusa = parseInt(inputJucator.value);

    // Validare: Verificăm dacă e un număr valid
    if (isNaN(valoareIntrodusa) || valoareIntrodusa < 1 || valoareIntrodusa > 100) {
        textMesaj.textContent = "Te rog introdu un număr valid între 1 și 100!";
        textMesaj.style.color = "red";
        return;
    }

    incercari++;
    textScor.textContent = incercari;

    if (valoareIntrodusa === numarSecret) {
        textMesaj.textContent = `Felicitări! Ai ghicit din ${incercari} încercări! 🎉`;
        textMesaj.style.color = "green";
        terminaJocul();
    } else if (valoareIntrodusa < numarSecret) {
        textMesaj.textContent = "Prea mic! Încearcă un număr mai mare. ⬆️";
        textMesaj.style.color = "#007bff";
    } else {
        textMesaj.textContent = "Prea mare! Încearcă un număr mai mic. ⬇️";
        textMesaj.style.color = "#007bff";
    }

    inputJucator.value = ""; // Curățăm câmpul după fiecare încercare
    inputJucator.focus(); // Repunem cursorul în căsuță
});

function terminaJocul() {
    btnGhiceste.disabled = true;
    inputJucator.disabled = true;
    btnRestart.style.display = "inline-block";
}

btnRestart.addEventListener("click", function() {
    numarSecret = genereazaNumar();
    incercari = 0;
    textScor.textContent = "0";
    textMesaj.textContent = "Succes! Începe prin a introduce un număr.";
    textMesaj.style.color = "#333";
    btnGhiceste.disabled = false;
    inputJucator.disabled = false;
    btnRestart.style.display = "none";
});