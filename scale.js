// scale.js

// Le costanti sono caricate da datiMusicali.js
// Le variabili globali e le funzioni helper sono in comune.js

// -----------------------------------------------------------------
// STATO QUIZ SCALE
// -----------------------------------------------------------------
let databaseScaleAttivo = databaseScale_IT;
let scaleSelezionate = [];
let noteSelezionateScale = [];
let rispostaCorrettaScale;
let quizAttivoScale = false;
let tipoDomandaScale = 'grado';
let modalitaRispostaScale = 'click';

// -----------------------------------------------------------------
// ELEMENTI DOM QUIZ SCALE
// -----------------------------------------------------------------
let domandaEl_S, feedbackEl_S, prossimoBtn_S, scaleContainer_S, toggleTutteBtn_S, radioTipoDomanda_S;
let noteScaleContainer_S, toggleTutteNoteBtn_S;
let fieldsetModalita_S;
let radioModalita_S;
let rispostaGradoContainer_S, pulsantiRispostaEl_S, inputRispostaContainer_S, inputRispostaEl_S, controllaBtn_S;
let rispostaInteraContainer_S, inputRispostaInteraEl_S, controllaBtnIntera_S;

function initScale() {
    domandaEl_S = document.getElementById('domanda-scale'); feedbackEl_S = document.getElementById('feedback-scale'); prossimoBtn_S = document.getElementById('prossimo-btn-scale'); scaleContainer_S = document.getElementById('selezione-scale-container'); toggleTutteBtn_S = document.getElementById('toggle-tutte-scale'); noteScaleContainer_S = document.getElementById('selezione-note-scale-container'); toggleTutteNoteBtn_S = document.getElementById('toggle-tutte-note-scale'); radioTipoDomanda_S = document.querySelectorAll('input[name="tipo-domanda-scale"]'); fieldsetModalita_S = document.getElementById('fieldset-modalita-scale'); radioModalita_S = document.querySelectorAll('input[name="modalita-scale"]'); rispostaGradoContainer_S = document.getElementById('risposta-grado-scale-container'); pulsantiRispostaEl_S = document.getElementById('pulsanti-risposta-scale'); inputRispostaContainer_S = document.getElementById('input-risposta-container-scale'); inputRispostaEl_S = document.getElementById('input-risposta-scale'); controllaBtn_S = document.getElementById('controlla-btn-scale'); rispostaInteraContainer_S = document.getElementById('risposta-intera-scale-container'); inputRispostaInteraEl_S = document.getElementById('input-risposta-intera-scale'); controllaBtnIntera_S = document.getElementById('controlla-btn-intera-scale');

    scaleContainer_S.innerHTML = '';
    tipiScala.forEach(key => { const div = document.createElement('div'); div.className = 'checkbox-container'; const input = document.createElement('input'); input.type = 'checkbox'; input.id = `check-s-${key}`; input.value = key; input.checked = true; input.className = 'checkbox-scala'; const label = document.createElement('label'); label.htmlFor = `check-s-${key}`; label.textContent = nomiScale[key]; div.appendChild(input); div.appendChild(label); scaleContainer_S.appendChild(div); });

    creaCheckboxNoteScale();

    prossimoBtn_S.addEventListener('click', generaNuovaDomandaScale);
    toggleTutteBtn_S.addEventListener('click', toggleTutteLeScale);
    toggleTutteNoteBtn_S.addEventListener('click', toggleTutteLeNoteScale);
    radioTipoDomanda_S.forEach(radio => radio.addEventListener('change', () => { tipoDomandaScale = document.querySelector('input[name="tipo-domanda-scale"]:checked').value; if (tipoDomandaScale === 'intera') { fieldsetModalita_S.classList.add('nascondi'); } else { fieldsetModalita_S.classList.remove('nascondi'); } generaNuovaDomandaScale(); }));
    radioModalita_S.forEach(radio => radio.addEventListener('change', () => { modalitaRispostaScale = document.querySelector('input[name="modalita-scale"]:checked').value; generaNuovaDomandaScale(); }));
    controllaBtn_S.addEventListener('click', controllaRispostaDigitataGrado);

    // Evento Invio (Grado - Solo Controllo)
    inputRispostaEl_S.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); if (quizAttivoScale) { controllaRispostaDigitataGrado(); } }
    });

    controllaBtnIntera_S.addEventListener('click', controllaRispostaInteraScale);

    // Evento Invio (Intera - Solo Controllo)
    inputRispostaInteraEl_S.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); if (quizAttivoScale) { controllaRispostaInteraScale(); } }
    });

    scaleContainer_S.addEventListener('change', (event) => { if (event.target.classList.contains('checkbox-scala')) { generaNuovaDomandaScale(); } });
    noteScaleContainer_S.addEventListener('change', (event) => { if (event.target.classList.contains('checkbox-nota-scala')) { generaNuovaDomandaScale(); } });

    tipoDomandaScale = document.querySelector('input[name="tipo-domanda-scale"]:checked').value;
    modalitaRispostaScale = document.querySelector('input[name="modalita-scale"]:checked').value;
    if (tipoDomandaScale === 'intera') fieldsetModalita_S.classList.add('nascondi');
    aggiornaUIModeScale();
    generaNuovaDomandaScale();
}

// --- CHECKBOX NOTE ---
function creaCheckboxNoteScale() {
    noteScaleContainer_S.innerHTML = '';
    noteAttive.forEach(nota => { const div = document.createElement('div'); div.className = 'checkbox-container'; const input = document.createElement('input'); input.type = 'checkbox'; input.id = `check-n-${nota}`; input.value = nota; input.checked = true; input.className = 'checkbox-nota-scala'; const label = document.createElement('label'); label.htmlFor = `check-n-${nota}`; label.textContent = nota; div.appendChild(input); div.appendChild(label); noteScaleContainer_S.appendChild(div); });
    aggiornaNoteSelezionateScale();
}
function aggiornaNoteSelezionateScale() {
    noteSelezionateScale = [];
    document.querySelectorAll('.checkbox-nota-scala:checked').forEach(check => noteSelezionateScale.push(check.value));
    if (noteSelezionateScale.length === 0) { const chiaviNote = (notazioneAttuale === 'it') ? chiavi_IT : chiavi_EN; noteSelezionateScale = [...chiaviNote]; }
    else { noteSelezionateScale = noteSelezionateScale.map(n => standardizzaNota(n)); }
}
function toggleTutteLeNoteScale() {
    const checkboxes = document.querySelectorAll('.checkbox-nota-scala');
    const almenoUnoDeselezionato = Array.from(checkboxes).some(cb => !cb.checked);
    checkboxes.forEach(cb => cb.checked = almenoUnoDeselezionato);
    generaNuovaDomandaScale();
}
window.ricreaCheckboxNoteScale = creaCheckboxNoteScale;

// --- FUNZIONI QUIZ ---
function aggiornaUIModeScale() {
    if (tipoDomandaScale === 'grado') {
        if (modalitaRispostaScale === 'click') { pulsantiRispostaEl_S.classList.remove('nascondi'); inputRispostaContainer_S.classList.add('nascondi'); }
        else { pulsantiRispostaEl_S.classList.add('nascondi'); inputRispostaContainer_S.classList.remove('nascondi'); }
    }
}

function generaNuovaDomandaScale() {
    quizAttivoScale = true;
    databaseScaleAttivo = (notazioneAttuale === 'it') ? databaseScale_IT : databaseScale_EN;
    aggiornaScaleSelezionate(); aggiornaNoteSelezionateScale();
    feedbackEl_S.textContent = ''; feedbackEl_S.className = '';
    prossimoBtn_S.classList.add('nascondi');

    const notaRadiceCasuale = noteSelezionateScale[Math.floor(Math.random() * noteSelezionateScale.length)];
    const scalaCasuale = scaleSelezionate[Math.floor(Math.random() * scaleSelezionate.length)];

    if (!scalaCasuale || !notaRadiceCasuale || !databaseScaleAttivo[notaRadiceCasuale] || !databaseScaleAttivo[notaRadiceCasuale][scalaCasuale]) { domandaEl_S.innerHTML = "Seleziona opzioni valide."; console.warn("Opzioni non valide scale", { notaRadiceCasuale, scalaCasuale }); quizAttivoScale = false; return; }
    const noteDellaScala = databaseScaleAttivo[notaRadiceCasuale][scalaCasuale];

    if (tipoDomandaScale === 'grado') {
        rispostaGradoContainer_S.classList.remove('nascondi'); rispostaInteraContainer_S.classList.add('nascondi');
        let gradiDisponibili, nomiGradiDisponibili;
        if (noteDellaScala.length === 5) { gradiDisponibili = Object.keys(gradiScala_5note).map(Number); nomiGradiDisponibili = gradiScala_5note; }
        else { gradiDisponibili = Object.keys(gradiScala_7note).map(Number); nomiGradiDisponibili = gradiScala_7note; }
        const gradoCasuale = gradiDisponibili[Math.floor(Math.random() * gradiDisponibili.length)];
        rispostaCorrettaScale = noteDellaScala[gradoCasuale];
        domandaEl_S.innerHTML = `Qual è la <strong>${nomiGradiDisponibili[gradoCasuale]}</strong> della scala <strong>${notaRadiceCasuale} ${scalaCasuale}</strong>?`;
        aggiornaUIModeScale();
        if (modalitaRispostaScale === 'click') { creaPulsantiScale(); }
        else { inputRispostaEl_S.value = ''; inputRispostaEl_S.disabled = false; inputRispostaEl_S.className = ''; controllaBtn_S.classList.remove('nascondi'); inputRispostaEl_S.focus(); }
    } else { // 'intera'
        rispostaGradoContainer_S.classList.add('nascondi'); rispostaInteraContainer_S.classList.remove('nascondi');
        rispostaCorrettaScale = noteDellaScala;
        domandaEl_S.innerHTML = `Scrivi <strong>tutte le note</strong> della scala <strong>${notaRadiceCasuale} ${scalaCasuale}</strong>.`;
        inputRispostaInteraEl_S.value = ''; inputRispostaInteraEl_S.disabled = false; inputRispostaInteraEl_S.className = ''; controllaBtnIntera_S.classList.remove('nascondi'); inputRispostaInteraEl_S.focus();
    }
}

function creaPulsantiScale() {
    pulsantiRispostaEl_S.innerHTML = '';
    noteAttive.forEach(n => { const button = document.createElement('button'); button.textContent = n; button.classList.add('btn-risposta'); button.addEventListener('click', controllaRispostaClickGrado); pulsantiRispostaEl_S.appendChild(button); });
}
function aggiornaScaleSelezionate() {
    scaleSelezionate = []; document.querySelectorAll('.checkbox-scala:checked').forEach(check => scaleSelezionate.push(check.value)); if (scaleSelezionate.length === 0) { scaleSelezionate = tipiScala; }
}
function toggleTutteLeScale() {
    const checkboxes = document.querySelectorAll('.checkbox-scala'); const almenouno = Array.from(checkboxes).some(cb => !cb.checked); checkboxes.forEach(cb => cb.checked = almenouno); generaNuovaDomandaScale();
}

function controllaRispostaClickGrado(e) {
    if (!quizAttivoScale) return; quizAttivoScale = false;
    const sceltaUtente = e.target.textContent; const standardScelta = standardizzaNota(sceltaUtente); const standardCorretta = standardizzaNota(rispostaCorrettaScale); const isCorrect = standardScelta === standardCorretta;
    document.querySelectorAll('#pulsanti-risposta-scale .btn-risposta').forEach(btn => { btn.disabled = true; if (standardizzaNota(btn.textContent) === standardCorretta) btn.classList.add('corretto'); if (btn.textContent === sceltaUtente && !isCorrect) btn.classList.add('sbagliato'); });
    if (isCorrect) { feedbackEl_S.textContent = 'Corretto! 🎉'; feedbackEl_S.className = 'corretto'; } else { feedbackEl_S.textContent = `Sbagliato. La risposta era ${rispostaCorrettaScale}.`; feedbackEl_S.className = 'sbagliato'; }
    prossimoBtn_S.classList.remove('nascondi');
    prossimoBtn_S.focus(); // <<< AGGIUNTO FOCUS
}

function controllaRispostaDigitataGrado() {
    if (!quizAttivoScale) return; quizAttivoScale = false;
    if (controllaRispostaEnarmonica(inputRispostaEl_S.value, rispostaCorrettaScale)) { feedbackEl_S.textContent = 'Corretto! 🎉'; feedbackEl_S.className = 'corretto'; inputRispostaEl_S.classList.add('corretto'); }
    else { feedbackEl_S.textContent = `Sbagliato. La risposta era ${rispostaCorrettaScale}.`; feedbackEl_S.className = 'sbagliato'; inputRispostaEl_S.classList.add('sbagliato'); }
    inputRispostaEl_S.disabled = true; controllaBtn_S.classList.add('nascondi');
    prossimoBtn_S.classList.remove('nascondi');
    prossimoBtn_S.focus(); // <<< AGGIUNTO FOCUS
}

function controllaRispostaInteraScale() {
    if (!quizAttivoScale) return; quizAttivoScale = false;
    const arrayCorretto = rispostaCorrettaScale; const standardArrayCorretto = arrayCorretto.map(nota => standardizzaNota(nota)); let inputUtente = inputRispostaInteraEl_S.value; let noteTrovateNormalizzateStandardizzate = [];
    if (notazioneAttuale === 'it') { const regexNoteIT = /(Do|Re|Mi|Fa|Sol|La|Si)[#b]?/gi; const noteMatch = inputUtente.match(regexNoteIT) || []; noteTrovateNormalizzateStandardizzate = noteMatch.map(nota => standardizzaNota(nota)); }
    else { const inputPulitoEN = inputUtente.replace(/[^A-Za-z#b]/g, ''); let i = 0; let noteTrovateEN = []; while (i < inputPulitoEN.length) { let notaBase = inputPulitoEN[i]; if (/[A-Ga-g]/.test(notaBase)) { let notaCompleta = notaBase; i++; if (i < inputPulitoEN.length && (inputPulitoEN[i] === '#' || inputPulitoEN[i] === 'b')) { const nextChar = inputPulitoEN[i]; if (nextChar === '#' || nextChar === 'b') { notaCompleta += nextChar; i++; } } noteTrovateEN.push(notaCompleta); } else { i++; } } noteTrovateNormalizzateStandardizzate = noteTrovateEN.map(nota => standardizzaNota(nota)); }
    const standardArrayUtente = noteTrovateNormalizzateStandardizzate;
    let isCorrect = false; if (standardArrayUtente.length === standardArrayCorretto.length) { isCorrect = standardArrayUtente.every((nota, index) => nota === standardArrayCorretto[index]); }
    // console.log("[DEBUG] Input Utente:", inputUtente); console.log("[DEBUG] Array utente standard:", standardArrayUtente); console.log("[DEBUG] Array corretto standard:", standardArrayCorretto); console.log("[DEBUG] Array corretto originale:", arrayCorretto);
    if (isCorrect) { feedbackEl_S.textContent = 'Corretto! 🎉'; feedbackEl_S.className = 'corretto'; inputRispostaInteraEl_S.classList.add('corretto'); }
    else { const rispostaFormattata = arrayCorretto.join(' - '); feedbackEl_S.textContent = `Sbagliato. La scala era ${rispostaFormattata}.`; feedbackEl_S.className = 'sbagliato'; inputRispostaInteraEl_S.classList.add('sbagliato'); }
    inputRispostaInteraEl_S.disabled = true; controllaBtnIntera_S.classList.add('nascondi');
    prossimoBtn_S.classList.remove('nascondi');
    prossimoBtn_S.focus(); // <<< AGGIUNTO FOCUS
}

window.initScale = initScale;
window.generaNuovaDomandaScale = generaNuovaDomandaScale;
window.ricreaCheckboxNoteScale = ricreaCheckboxNoteScale;