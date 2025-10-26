// intervalli.js

// Le costanti sono caricate da datiMusicali.js
// Le variabili globali e le funzioni helper sono in comune.js

// -----------------------------------------------------------------
// STATO QUIZ INTERVALLI
// -----------------------------------------------------------------
let databaseIntervalliAttivo = databaseIntervalli_IT;
let intervalliSelezionati = [];
let rispostaCorrettaIntervalli;
let quizAttivoIntervalli = false;
let modalitaQuizIntervalli = 'click';

// -----------------------------------------------------------------
// ELEMENTI DOM QUIZ INTERVALLI
// -----------------------------------------------------------------
let domandaEl_I, feedbackEl_I, prossimoBtn_I, pulsantiRispostaEl_I, inputRispostaContainer_I, inputRispostaEl_I, controllaBtn_I, intervalliContainer_I, toggleTuttiBtn_I;
let radioModalita_I;

function initIntervalli() {
    domandaEl_I = document.getElementById('domanda-intervalli'); feedbackEl_I = document.getElementById('feedback-intervalli'); prossimoBtn_I = document.getElementById('prossimo-btn-intervalli'); pulsantiRispostaEl_I = document.getElementById('pulsanti-risposta-intervalli'); inputRispostaContainer_I = document.getElementById('input-risposta-container-intervalli'); inputRispostaEl_I = document.getElementById('input-risposta-intervalli'); controllaBtn_I = document.getElementById('controlla-btn-intervalli'); intervalliContainer_I = document.getElementById('selezione-intervalli-container'); toggleTuttiBtn_I = document.getElementById('toggle-tutti-intervalli'); radioModalita_I = document.querySelectorAll('input[name="modalita-intervalli"]');

    intervalliContainer_I.innerHTML = '';
    tipiIntervallo.forEach(key => { if (!nomiIntervalli[key]) return; const div = document.createElement('div'); div.className = 'checkbox-container'; const input = document.createElement('input'); input.type = 'checkbox'; input.id = `check-i-${key}`; input.value = key; input.checked = true; input.className = 'checkbox-intervallo'; const label = document.createElement('label'); label.htmlFor = `check-i-${key}`; label.textContent = nomiIntervalli[key]; div.appendChild(input); div.appendChild(label); intervalliContainer_I.appendChild(div); });

    prossimoBtn_I.addEventListener('click', generaNuovaDomandaIntervalli);
    toggleTuttiBtn_I.addEventListener('click', toggleTuttiGliIntervalli);
    controllaBtn_I.addEventListener('click', controllaRispostaDigitataIntervalli);

    // L'evento keydown sull'input ora serve SOLO per controllare la risposta
    inputRispostaEl_I.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Chiama solo se il quiz è attivo (non ancora controllato)
            if (quizAttivoIntervalli) {
                controllaRispostaDigitataIntervalli();
            }
        }
    });

    intervalliContainer_I.addEventListener('change', (event) => { if (event.target.classList.contains('checkbox-intervallo')) { generaNuovaDomandaIntervalli(); } });
    radioModalita_I.forEach(radio => radio.addEventListener('change', () => { modalitaQuizIntervalli = document.querySelector('input[name="modalita-intervalli"]:checked').value; generaNuovaDomandaIntervalli(); }));

    modalitaQuizIntervalli = document.querySelector('input[name="modalita-intervalli"]:checked').value;
    aggiornaUIModeIntervalli();
    generaNuovaDomandaIntervalli();
}

function aggiornaUIModeIntervalli() {
    if (modalitaQuizIntervalli === 'click') { pulsantiRispostaEl_I.classList.remove('nascondi'); inputRispostaContainer_I.classList.add('nascondi'); }
    else { pulsantiRispostaEl_I.classList.add('nascondi'); inputRispostaContainer_I.classList.remove('nascondi'); }
}

function generaNuovaDomandaIntervalli() {
    quizAttivoIntervalli = true;
    databaseIntervalliAttivo = (notazioneAttuale === 'it') ? databaseIntervalli_IT : databaseIntervalli_EN;
    aggiornaIntervalliSelezionati();
    feedbackEl_I.textContent = ''; feedbackEl_I.className = '';
    prossimoBtn_I.classList.add('nascondi');

    const chiaviNote = (notazioneAttuale === 'it') ? chiavi_IT : chiavi_EN;
    if (!chiaviNote || chiaviNote.length === 0) { domandaEl_I.innerHTML = "Errore: Dati note mancanti."; console.error("Errore: chiavi_IT/EN non definite"); quizAttivoIntervalli = false; return; }
    const notaRadiceCasuale = chiaviNote[Math.floor(Math.random() * chiaviNote.length)];
    const intervalloCasuale = intervalliSelezionati[Math.floor(Math.random() * intervalliSelezionati.length)];

    if (!intervalloCasuale || !databaseIntervalliAttivo[notaRadiceCasuale]) { domandaEl_I.innerHTML = "Seleziona intervalli validi."; console.warn("Opzioni non valide intervalli", { notaRadiceCasuale, intervalloCasuale }); quizAttivoIntervalli = false; return; }
    rispostaCorrettaIntervalli = databaseIntervalliAttivo[notaRadiceCasuale][intervalloCasuale];
    if (!rispostaCorrettaIntervalli) { console.error(`Risposta intervallo non trovata: ${notaRadiceCasuale} - ${intervalloCasuale}`); generaNuovaDomandaIntervalli(); return; }

    domandaEl_I.innerHTML = `Qual è la <strong>${nomiIntervalli[intervalloCasuale]}</strong> di <strong>${notaRadiceCasuale}</strong>?`;
    aggiornaUIModeIntervalli();
    if (modalitaQuizIntervalli === 'click') { creaPulsantiIntervalli(); }
    else { inputRispostaEl_I.value = ''; inputRispostaEl_I.disabled = false; inputRispostaEl_I.className = ''; controllaBtn_I.classList.remove('nascondi'); inputRispostaEl_I.focus(); }
}

function creaPulsantiIntervalli() {
    pulsantiRispostaEl_I.innerHTML = '';
    noteAttive.forEach(n => { const button = document.createElement('button'); button.textContent = n; button.classList.add('btn-risposta'); button.addEventListener('click', controllaRispostaClickIntervalli); pulsantiRispostaEl_I.appendChild(button); });
}

function aggiornaIntervalliSelezionati() {
    intervalliSelezionati = [];
    document.querySelectorAll('.checkbox-intervallo:checked').forEach(check => intervalliSelezionati.push(check.value));
    if (intervalliSelezionati.length === 0) { intervalliSelezionati = tipiIntervallo.filter(key => nomiIntervalli[key]); }
}

function toggleTuttiGliIntervalli() {
    const checkboxes = document.querySelectorAll('.checkbox-intervallo');
    const almenoUnoDeselezionato = Array.from(checkboxes).some(cb => !cb.checked);
    checkboxes.forEach(cb => cb.checked = almenoUnoDeselezionato);
    generaNuovaDomandaIntervalli();
}

function controllaRispostaClickIntervalli(e) {
    if (!quizAttivoIntervalli) return;
    quizAttivoIntervalli = false;
    const sceltaUtente = e.target.textContent;
    const standardScelta = standardizzaNota(sceltaUtente);
    const standardCorretta = standardizzaNota(rispostaCorrettaIntervalli);
    const isCorrect = standardScelta === standardCorretta;

    document.querySelectorAll('#pulsanti-risposta-intervalli .btn-risposta').forEach(btn => { btn.disabled = true; if (standardizzaNota(btn.textContent) === standardCorretta) btn.classList.add('corretto'); if (btn.textContent === sceltaUtente && !isCorrect) btn.classList.add('sbagliato'); });

    if (isCorrect) { feedbackEl_I.textContent = 'Corretto! 🎉'; feedbackEl_I.className = 'corretto'; }
    else { feedbackEl_I.textContent = `Sbagliato. La risposta era ${rispostaCorrettaIntervalli}.`; feedbackEl_I.className = 'sbagliato'; }
    prossimoBtn_I.classList.remove('nascondi');
    prossimoBtn_I.focus(); // <<< AGGIUNTO FOCUS
}

function controllaRispostaDigitataIntervalli() {
    if (!quizAttivoIntervalli) return;
    quizAttivoIntervalli = false;
    if (controllaRispostaEnarmonica(inputRispostaEl_I.value, rispostaCorrettaIntervalli)) {
        feedbackEl_I.textContent = 'Corretto! 🎉'; feedbackEl_I.className = 'corretto'; inputRispostaEl_I.classList.add('corretto');
    } else {
        feedbackEl_I.textContent = `Sbagliato. La risposta era ${rispostaCorrettaIntervalli}.`; feedbackEl_I.className = 'sbagliato'; inputRispostaEl_I.classList.add('sbagliato');
    }
    inputRispostaEl_I.disabled = true; controllaBtn_I.classList.add('nascondi');
    prossimoBtn_I.classList.remove('nascondi');
    prossimoBtn_I.focus(); // <<< AGGIUNTO FOCUS
}

window.initIntervalli = initIntervalli;
window.generaNuovaDomandaIntervalli = generaNuovaDomandaIntervalli;