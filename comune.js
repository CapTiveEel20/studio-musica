// comune.js

// Le costanti note_..., mappaEnarmonica sono caricate da datiMusicali.js

// -----------------------------------------------------------------
// STATO GLOBALE DELLE IMPOSTAZIONI
// -----------------------------------------------------------------
let noteAttive = chiavi_IT;
let notazioneAttuale = 'it';

let intervalliIniziato = false;
let scaleIniziate = false;
let studioIniziato = false;

// -----------------------------------------------------------------
// ELEMENTI DOM COMUNI
// -----------------------------------------------------------------
const radioNotazione = document.querySelectorAll('input[name="notazione"]');
let btnMenuIntervalli, btnMenuScale, btnMenuStudio;
let sezioneIntervalli, sezioneScale, sezioneStudio;

// -----------------------------------------------------------------
// FUNZIONI DI UTILITÀ COMUNI
// -----------------------------------------------------------------

/**
 * Normalizza case (es. "db" -> "Db", "c#" -> "C#")
 */
function normalizzaInputNota(input) {
    let norm = input.trim();
    if (norm.length === 0) return "";
    if (norm.length === 1) return norm.toUpperCase();
    let primaLettera = norm.charAt(0).toUpperCase();
    let resto = norm.slice(1).toLowerCase();
    if (resto.endsWith('#')) resto = resto.slice(0, -1) + '#';
    else if (resto.endsWith('b')) resto = resto.slice(0, -1) + 'b';
    return primaLettera + resto;
}

/**
 * NUOVA FUNZIONE: Converte una nota alla sua forma standard (# o naturale)
 * usata come chiave nei database, gestendo l'enarmonia.
 * Esempio: "Db" -> "C#", "E#" -> "F", "F" -> "F"
 */
function standardizzaNota(nota) {
    const notaNormalizzata = normalizzaInputNota(nota);
    // Cerca nella mappa enarmonica per convertire b -> # o E#/B# -> F/C
    // Se non trova corrispondenza, restituisce la nota normalizzata così com'è.
    return mappaEnarmonica[notaNormalizzata] || notaNormalizzata;
}


/**
 * AGGIORNATA: Controlla se una risposta digitata (singola nota) è enarmonicamente corretta.
 * Confronta le forme standardizzate.
 */
function controllaRispostaEnarmonica(inputUtente, rispostaCorretta) {
    const standardInput = standardizzaNota(inputUtente);
    const standardCorretta = standardizzaNota(rispostaCorretta);
    console.log(`[DEBUG] Controllo Enarmonico: Input "${inputUtente}" -> Standard "${standardInput}", Corretta "${rispostaCorretta}" -> Standard "${standardCorretta}"`);
    return standardInput === standardCorretta;
}


// -----------------------------------------------------------------
// FUNZIONI DI GESTIONE IMPOSTAZIONI
// -----------------------------------------------------------------

function impostaSistemaNotazione() {
    notazioneAttuale = document.querySelector('input[name="notazione"]:checked').value;
    noteAttive = (notazioneAttuale === 'it') ? chiavi_IT : chiavi_EN; // Usa costanti globali

    if(intervalliIniziato && window.generaNuovaDomandaIntervalli) generaNuovaDomandaIntervalli();
    if(scaleIniziate) {
        if (window.ricreaCheckboxNoteScale) ricreaCheckboxNoteScale();
        if (window.generaNuovaDomandaScale) generaNuovaDomandaScale();
    }
    if(studioIniziato && window.aggiornaStudioNotazione) aggiornaStudioNotazione();
}

// -----------------------------------------------------------------
// FUNZIONI DI GESTIONE MENU
// -----------------------------------------------------------------
function mostraQuizIntervalli() {
    sezioneIntervalli.classList.remove('nascondi');
    sezioneScale.classList.add('nascondi');
    sezioneStudio.classList.add('nascondi');
    if (!intervalliIniziato) { if (window.initIntervalli) initIntervalli(); intervalliIniziato = true; }
}
function mostraQuizScale() {
    sezioneScale.classList.remove('nascondi');
    sezioneIntervalli.classList.add('nascondi');
    sezioneStudio.classList.add('nascondi');
    if (!scaleIniziate) { if (window.initScale) initScale(); scaleIniziate = true; }
}
function mostraSezioneStudio() {
    sezioneStudio.classList.remove('nascondi');
    sezioneIntervalli.classList.add('nascondi');
    sezioneScale.classList.add('nascondi');
    if (!studioIniziato) { if (window.initStudio) initStudio(); studioIniziato = true; }
}

// -----------------------------------------------------------------
// INIT GLOBALE
// -----------------------------------------------------------------
function initGlobale() {
    radioNotazione.forEach(radio => radio.addEventListener('change', impostaSistemaNotazione));
    btnMenuIntervalli = document.getElementById('btn-menu-intervalli');
    btnMenuScale = document.getElementById('btn-menu-scale');
    btnMenuStudio = document.getElementById('btn-menu-studio');
    sezioneIntervalli = document.getElementById('sezione-quiz-intervalli');
    sezioneScale = document.getElementById('sezione-quiz-scale');
    sezioneStudio = document.getElementById('sezione-studio');
    btnMenuIntervalli.addEventListener('click', mostraQuizIntervalli);
    btnMenuScale.addEventListener('click', mostraQuizScale);
    btnMenuStudio.addEventListener('click', mostraSezioneStudio);
    impostaSistemaNotazione();
}
document.addEventListener('DOMContentLoaded', initGlobale);