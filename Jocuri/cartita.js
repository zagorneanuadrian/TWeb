const gauri = document.querySelectorAll('.gaura');
const cartite = document.querySelectorAll('.cartita');
const textScor = document.getElementById('scor');
const textTimp = document.getElementById('timp');
const btnStart = document.getElementById('btn-start');
const selectDificultate = document.getElementById('select-dificultate');

let gauraAnterioara;
let timpExpirat = false;
let scor = 0;
let timpRamas = 30;
let timerInterval;

function timpAleatoriu(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function gauraAleatorie(gauri) {
    const index = Math.floor(Math.random() * gauri.length);
    const gaura = gauri[index];
    
    if (gaura === gauraAnterioara) {
        return gauraAleatorie(gauri);
    }
    
    gauraAnterioara = gaura;
    return gaura;
}

// Funcția care dictează regulile în funcție de dificultate
function arataCartita() {
    let timpMinim = 0;
    let timpMaxim = 0;
    
    // Citim ce nivel a fost ales
    const nivelAles = selectDificultate.value;

    if (nivelAles === 'easy') {
        timpMinim = 800;  // 0.8 secunde
        timpMaxim = 1500; // 1.5 secunde
    } else if (nivelAles === 'medium') {
        timpMinim = 500;
        timpMaxim = 1000;
    } else if (nivelAles === 'hard') {
        timpMinim = 300;
        timpMaxim = 650;
    } else if (nivelAles === 'extreme') {
        timpMinim = 150;  // Super rapid, aproape instant!
        timpMaxim = 350;
    }

    const timp = timpAleatoriu(timpMinim, timpMaxim);
    const gaura = gauraAleatorie(gauri);
    
    gaura.classList.add('sus');

    setTimeout(() => {
        gaura.classList.remove('sus');
        if (!timpExpirat) arataCartita(); 
    }, timp);
}

function pornesteCronometrul() {
    timpRamas = 30;
    textTimp.textContent = timpRamas;
    
    timerInterval = setInterval(() => {
        timpRamas--;
        textTimp.textContent = timpRamas;
        
        if (timpRamas === 0) {
            clearInterval(timerInterval);
            timpExpirat = true;
            btnStart.disabled = false;
            selectDificultate.disabled = false; // Deblocăm meniul la final
            btnStart.textContent = "Joacă din nou";
            
            // Un mesaj simpatic care include și dificultatea
            const nivelText = selectDificultate.options[selectDificultate.selectedIndex].text;
            alert(`Timpul a expirat!\nAi lovit ${scor} cârtițe pe dificultatea: ${nivelText}.`);
        }
    }, 1000);
}

function incepeJocul() {
    scor = 0;
    textScor.textContent = 0;
    timpExpirat = false;
    
    // Blocăm butoanele ca să nu trișezi în timpul jocului
    btnStart.disabled = true;
    selectDificultate.disabled = true; 
    
    arataCartita();
    pornesteCronometrul();
}

function lovesteCartita(event) {
    if (!event.isTrusted) return; 

    scor++;
    this.parentNode.classList.remove('sus'); 
    textScor.textContent = scor;
}

cartite.forEach(cartita => cartita.addEventListener('click', lovesteCartita));
btnStart.addEventListener('click', incepeJocul);