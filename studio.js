// studio.js

// Le costanti (databaseStudio, databaseScale_IT, databaseScale_EN, noteAttive, etc.)
// sono caricate da datiMusicali.js e comune.js

// -----------------------------------------------------------------
// ELEMENTI DOM SEZIONE STUDIO
// -----------------------------------------------------------------
let selettoreScaleContainer, selettoreTonicaContainer, contenutoContainer;
let scalaAttivaStudio = null; // Tipo di scala selezionato (es. 'Maggiore')
let tonicaAttivaStudio = null; // Tonica selezionata (CHIAVE standard, es. 'Do#')
let tonicaDisplayStudio = null; // Tonica come selezionata dall'utente (es. 'Reb')

/**
 * Funzione di avvio per la sezione Studio
 */
function initStudio() {
    selettoreScaleContainer = document.getElementById('studio-selettore-scale');
    selettoreTonicaContainer = document.getElementById('studio-selettore-tonica');
    contenutoContainer = document.getElementById('studio-contenuto');

    // 1. Crea i pulsanti di selezione TIPO SCALA (usa databaseStudio globale)
    Object.keys(databaseStudio).forEach(key => {
        const btn = document.createElement('button');
        btn.id = `btn-studio-scala-${key}`;
        btn.className = 'studio-selettore-btn';
        btn.textContent = databaseStudio[key].nome;
        btn.addEventListener('click', () => {
            scalaAttivaStudio = key;
            aggiornaEvidenziazionePulsanti();
            mostraInfoScala();
        });
        selettoreScaleContainer.appendChild(btn);
    });

    // 2. Crea i pulsanti di selezione TONICA
    creaPulsantiTonica();

    // 3. Mostra il messaggio di default
    contenutoContainer.innerHTML = '<p>Seleziona un tipo di scala e una tonica per vedere i dettagli.</p>';
}

/**
 * Crea/Ricrea i 12 pulsanti per la selezione della tonica
 * (usa la variabile globale 'noteAttive' da comune.js, che include #/b)
 */
function creaPulsantiTonica() {
    selettoreTonicaContainer.innerHTML = ''; // Pulisci

    noteAttive.forEach(nota => { // Es. nota = "Reb"
        const btn = document.createElement('button');
        btn.id = `btn-studio-tonica-${nota}`; // Usa la nota visualizzata nell'ID
        btn.className = 'studio-tonica-btn';
        btn.textContent = nota; // Mostra "Reb"
        btn.addEventListener('click', () => {
            // Salva sia la nota visualizzata che la sua chiave standard
            tonicaDisplayStudio = nota; // "Reb"
            tonicaAttivaStudio = standardizzaNota(nota); // "Do#" (da comune.js)
            aggiornaEvidenziazionePulsanti();
            mostraInfoScala();
        });
        selettoreTonicaContainer.appendChild(btn);
    });
}

/**
 * Aggiorna l'evidenziazione per entrambi i set di pulsanti
 */
function aggiornaEvidenziazionePulsanti() {
    // 1. Pulsanti Tipo Scala
    document.querySelectorAll('.studio-selettore-btn').forEach(btn => {
        btn.classList.remove('attivo');
    });
    if (scalaAttivaStudio) {
        const btnScalaAttivo = document.getElementById(`btn-studio-scala-${scalaAttivaStudio}`);
        if(btnScalaAttivo) btnScalaAttivo.classList.add('attivo');
    }

    // 2. Pulsanti Tonica
    document.querySelectorAll('.studio-tonica-btn').forEach(btn => {
        btn.classList.remove('attivo');
    });
    // Evidenzia usando la nota visualizzata (tonicaDisplayStudio)
    if (tonicaDisplayStudio) {
        const btnTonicaAttivo = document.getElementById(`btn-studio-tonica-${tonicaDisplayStudio}`);
        if(btnTonicaAttivo) btnTonicaAttivo.classList.add('attivo');
    }
}


/**
 * Aggiorna le note mostrate in base alla notazione (chiamata da comune.js)
 */
function aggiornaStudioNotazione() {
    // Resetta le selezioni perché le note disponibili sono cambiate
    tonicaAttivaStudio = null;
    tonicaDisplayStudio = null;

    // Ricrea i pulsanti della tonica con la nuova notazione
    creaPulsantiTonica();

    // Aggiorna la vista (mostrerà il messaggio di default o ricaricherà se una scala era selezionata)
    mostraInfoScala();
}

/**
 * Mostra le informazioni per la scala e la tonica selezionate
 */
function mostraInfoScala() {
    // Mostra le info solo se entrambi i filtri sono stati selezionati
    if (!scalaAttivaStudio || !tonicaAttivaStudio || !tonicaDisplayStudio) {
        contenutoContainer.innerHTML = '<p>Seleziona un tipo di scala e una tonica per vedere i dettagli.</p>';
        return;
    }

    // Usa databaseStudio globale per ottenere info sulla struttura
    const datiStrutturaScala = databaseStudio[scalaAttivaStudio];
    if (!datiStrutturaScala) {
         console.error(`Struttura non trovata in studio.js per: ${scalaAttivaStudio}`);
         contenutoContainer.innerHTML = '<p>Errore: Struttura scala non definita.</p>';
         return;
    }


    // Usa databaseScale_IT / _EN globali per ottenere le note specifiche
    let dbQuiz = (notazioneAttuale === 'it') ? databaseScale_IT : databaseScale_EN;

    let noteDellaScala = [];
    // Cerca usando la CHIAVE standard (tonicaAttivaStudio, es. "Do#")
    if (dbQuiz && dbQuiz[tonicaAttivaStudio] && dbQuiz[tonicaAttivaStudio][scalaAttivaStudio]) {
        noteDellaScala = dbQuiz[tonicaAttivaStudio][scalaAttivaStudio]; // Ottiene l'array con grafia corretta
    } else {
        console.error(`Dati note non trovati in studio.js per: ${tonicaAttivaStudio} ${scalaAttivaStudio}`);
        contenutoContainer.innerHTML = '<p>Errore: Note non disponibili per questa combinazione nel database scale.</p>';
        return;
    }

    // Costruisci l'HTML
    // Usa la nota visualizzata (tonicaDisplayStudio, es. "Reb") nel titolo
    let html = `<h3>${tonicaDisplayStudio} ${datiStrutturaScala.nome}</h3>`;

    // Mostra note (con grafia corretta dall'array noteDellaScala)
    const noteString = noteDellaScala.join(' - ');
    html += `<h4>Note della scala</h4>`;
    html += `<div class="studio-note-container">`;
    html += `<p class="studio-stringa-note">${noteString}</p>`;
    html += `</div>`;

    // Mostra intervalli (dalla struttura in databaseStudio)
    const intervalliString = datiStrutturaScala.intervalli.join(' - ');
    html += `<h4>Intervalli (rispetto alla tonica)</h4>`;
    html += `<div class="studio-note-container">`;
    html += `<p class="studio-stringa-note">${intervalliString}</p>`;
    html += `</div>`;

    // Inserisci l'HTML nel contenitore
    contenutoContainer.innerHTML = html;
}

// Esponi la funzione per l'aggiornamento da comune.js
window.aggiornaStudioNotazione = aggiornaStudioNotazione;
// Esponi la funzione init per essere chiamata da comune.js
window.initStudio = initStudio;