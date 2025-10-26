// datiMusicali.js

// Contiene tutti i dati statici (database, nomi, note) usati dall'applicazione.

// =================================================================
// NOTE
// =================================================================
const chiavi_IT = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si']; // <<< CONTROLLA QUESTA RIGA
const chiavi_EN = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']; // <<< CONTROLLA QUESTA RIGA

// =================================================================
// MAPPA ENARMONICA
// =================================================================
// (Input utente -> Valore usato nel DB)
const mappaEnarmonica = {
    'Reb': 'Do#', 'Mib': 'Re#', 'Solb': 'Fa#', 'Lab': 'Sol#', 'Sib': 'La#',
    'Db': 'C#',  'Eb': 'D#',  'Gb': 'F#',  'Ab': 'G#',  'Bb': 'A#'
};

// =================================================================
// DATI INTERVALLI
// =================================================================

// --- Nomi e Tipi ---
const nomiIntervalli = {
    '2m': 'Seconda Minore',
    '2M': 'Seconda Maggiore',
    '3m': 'Terza Minore',
    '3M': 'Terza Maggiore',
    '4P': 'Quarta Giusta',
    'tritono': 'Tritono', // Intervallo di 4 Eccedente o 5 Diminuita
    '5P': 'Quinta Giusta',
    '6m': 'Sesta Minore',
    '6M': 'Sesta Maggiore',
    '7m': 'Settima Minore',
    '7M': 'Settima Maggiore'
};
const tipiIntervallo = Object.keys(nomiIntervalli);

// --- Database Italiano ---
const databaseIntervalli_IT = {
    'Do':  { 'unisono': 'Do', '2m': 'Do#', '2M': 'Re', '3m': 'Re#', '3M': 'Mi', '4P': 'Fa', 'tritono': 'Fa#', '5P': 'Sol', '6m': 'Sol#', '6M': 'La', '7m': 'La#', '7M': 'Si' },
    'Do#': { 'unisono': 'Do#','2m': 'Re', '2M': 'Re#', '3m': 'Mi', '3M': 'Fa', '4P': 'Fa#', 'tritono': 'Sol', '5P': 'Sol#', '6m': 'La', '6M': 'La#', '7m': 'Si', '7M': 'Do' },
    'Re':  { 'unisono': 'Re', '2m': 'Re#', '2M': 'Mi', '3m': 'Fa', '3M': 'Fa#', '4P': 'Sol', 'tritono': 'Sol#', '5P': 'La', '6m': 'La#', '7m': 'Si', '7M': 'Do#' },
    'Re#': { 'unisono': 'Re#','2m': 'Mi', '2M': 'Fa', '3m': 'Fa#', '3M': 'Sol', '4P': 'Sol#', 'tritono': 'La', '5P': 'La#', '6m': 'Si', '6M': 'Do', '7m': 'Do#', '7M': 'Re' },
    'Mi':  { 'unisono': 'Mi', '2m': 'Fa', '2M': 'Fa#', '3m': 'Sol', '3M': 'Sol#', '4P': 'La', 'tritono': 'La#', '5P': 'Si', '6m': 'Do', '6M': 'Do#', '7m': 'Re', '7M': 'Re#' },
    'Fa':  { 'unisono': 'Fa', '2m': 'Fa#', '2M': 'Sol', '3m': 'Sol#', '3M': 'La', '4P': 'La#', 'tritono': 'Si', '5P': 'Do', '6m': 'Do#', '6M': 'Re', '7m': 'Re#', '7M': 'Mi' },
    'Fa#': { 'unisono': 'Fa#','2m': 'Sol', '2M': 'Sol#', '3m': 'La', '3M': 'La#', '4P': 'Si', 'tritono': 'Do', '5P': 'Do#', '6m': 'Re', '6M': 'Re#', '7m': 'Mi', '7M': 'Fa' },
    'Sol': { 'unisono': 'Sol','2m': 'Sol#','2M': 'La', '3m': 'La#', '3M': 'Si', '4P': 'Do', 'tritono': 'Do#', '5P': 'Re', '6m': 'Re#', '6M': 'Mi', '7m': 'Fa', '7M': 'Fa#' },
    'Sol#':{ 'unisono': 'Sol#','2m': 'La', '2M': 'La#', '3m': 'Si', '3M': 'Do', '4P': 'Do#', 'tritono': 'Re', '5P': 'Re#', '6m': 'Mi', '6M': 'Fa', '7m': 'Fa#', '7M': 'Sol' },
    'La':  { 'unisono': 'La', '2m': 'La#', '2M': 'Si', '3m': 'Do', '3M': 'Do#', '4P': 'Re', 'tritono': 'Re#', '5P': 'Mi', '6m': 'Fa', '6M': 'Fa#', '7m': 'Sol', '7M': 'Sol#' },
    'La#': { 'unisono': 'La#','2m': 'Si', '2M': 'Do', '3m': 'Do#', '3M': 'Re', '4P': 'Re#', 'tritono': 'Mi', '5P': 'Fa', '6m': 'Fa#', '6M': 'Sol', '7m': 'Sol#', '7M': 'La' },
    'Si':  { 'unisono': 'Si', '2m': 'Do', '2M': 'Do#', '3m': 'Re', '3M': 'Re#', '4P': 'Mi', 'tritono': 'Fa', '5P': 'Fa#', '6m': 'Sol', '6M': 'Sol#', '7m': 'La', '7M': 'La#' }
};

// --- Database Inglese ---
const databaseIntervalli_EN = {
    'C':  { 'unisono': 'C', '2m': 'C#', '2M': 'D', '3m': 'D#', '3M': 'E', '4P': 'F', 'tritono': 'F#', '5P': 'G', '6m': 'G#', '6M': 'A', '7m': 'A#', '7M': 'B' },
    'C#': { 'unisono': 'C#','2m': 'D', '2M': 'D#', '3m': 'E', '3M': 'F', '4P': 'F#', 'tritono': 'G', '5P': 'G#', '6m': 'A', '6M': 'A#', '7m': 'B', '7M': 'C' },
    'D':  { 'unisono': 'D', '2m': 'D#', '2M': 'E', '3m': 'F', '3M': 'F#', '4P': 'G', 'tritono': 'G#', '5P': 'A', '6m': 'A#', '7m': 'B', '7M': 'C#' },
    'D#': { 'unisono': 'D#','2m': 'E', '2M': 'F', '3m': 'F#', '3M': 'G', '4P': 'G#', 'tritono': 'A', '5P': 'A#', '6m': 'B', '6M': 'C', '7m': 'C#', '7M': 'D' },
    'E':  { 'unisono': 'E', '2m': 'F', '2M': 'F#', '3m': 'G', '3M': 'G#', '4P': 'A', 'tritono': 'A#', '5P': 'B', '6m': 'C', '6M': 'C#', '7m': 'D', '7M': 'D#' },
    'F':  { 'unisono': 'F', '2m': 'F#', '2M': 'G', '3m': 'G#', '3M': 'A', '4P': 'A#', 'tritono': 'B', '5P': 'C', '6m': 'C#', '6M': 'D', '7m': 'D#', '7M': 'E' },
    'F#': { 'unisono': 'F#','2m': 'G', '2M': 'G#', '3m': 'A', '3M': 'A#', '4P': 'B', 'tritono': 'C', '5P': 'C#', '6m': 'D', '6M': 'D#', '7m': 'E', '7M': 'F' },
    'G':  { 'unisono': 'G', '2m': 'G#', '2M': 'A', '3m': 'A#', '3M': 'B', '4P': 'C', 'tritono': 'C#', '5P': 'D', '6m': 'D#', '6M': 'E', '7m': 'F', '7M': 'F#' },
    'G#': { 'unisono': 'G#','2m': 'A', '2M': 'A#', '3m': 'B', '3M': 'C', '4P': 'C#', 'tritono': 'D', '5P': 'D#', '6m': 'E', '6M': 'F', '7m': 'F#', '7M': 'G' },
    'A':  { 'unisono': 'A', '2m': 'A#', '2M': 'B', '3m': 'C', '3M': 'C#', '4P': 'D', 'tritono': 'D#', '5P': 'E', '6m': 'F', '6M': 'F#', '7m': 'G', '7M': 'G#' },
    'A#': { 'unisono': 'A#','2m': 'B', '2M': 'C', '3m': 'C#', '3M': 'D', '4P': 'D#', 'tritono': 'E', '5P': 'F', '6m': 'F#', '6M': 'G', '7m': 'G#', '7M': 'A' },
    'B':  { 'unisono': 'B', '2m': 'C', '2M': 'C#', '3m': 'D', '3M': 'D#', '4P': 'E', 'tritono': 'F', '5P': 'F#', '6m': 'G', '6M': 'G#', '7m': 'A', '7M': 'A#' }
};

// =================================================================
// DATI SCALE
// =================================================================

// --- Nomi e Tipi ---
const nomiScale = {
    'Maggiore': 'Maggiore (7 note)',
    'Minore Naturale': 'Minore Naturale (7 note)',
    'Pentatonica Maggiore': 'Pentatonica Maggiore (5 note)',
    'Pentatonica Minore': 'Pentatonica Minore (5 note)'
};
const tipiScala = Object.keys(nomiScale);

// --- Gradi ---
const gradiScala_7note = { 0: '1a (Tonica)', 1: '2a', 2: '3a', 3: '4a', 4: '5a', 5: '6a', 6: '7a' };
const gradiScala_5note = { 0: '1a (Tonica)', 1: '2a', 2: '3a', 3: '4a', 4: '5a' };

// --- Database Italiano ---
const databaseScale_IT = {
    'Do':   { 'Maggiore': ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'], 'Minore Naturale': ['Do', 'Re', 'Re#', 'Fa', 'Sol', 'Sol#', 'La#'], 'Pentatonica Maggiore': ['Do', 'Re', 'Mi', 'Sol', 'La'], 'Pentatonica Minore': ['Do', 'Re#', 'Fa', 'Sol', 'La#'] },
    'Do#':  { 'Maggiore': ['Do#', 'Re#', 'Fa', 'Fa#', 'Sol#', 'La#', 'Do'], 'Minore Naturale': ['Do#', 'Re#', 'Mi', 'Fa#', 'Sol#', 'La', 'Si'], 'Pentatonica Maggiore': ['Do#', 'Re#', 'Fa', 'Sol#', 'La#'], 'Pentatonica Minore': ['Do#', 'Mi', 'Fa#', 'Sol#', 'Si'] },
    'Re':   { 'Maggiore': ['Re', 'Mi', 'Fa#', 'Sol', 'La', 'Si', 'Do#'], 'Minore Naturale': ['Re', 'Mi', 'Fa', 'Sol', 'La', 'La#', 'Do'], 'Pentatonica Maggiore': ['Re', 'Mi', 'Fa#', 'La', 'Si'], 'Pentatonica Minore': ['Re', 'Fa', 'Sol', 'La', 'Do'] },
    'Re#':  { 'Maggiore': ['Re#', 'Fa', 'Sol', 'Sol#', 'La#', 'Do', 'Re'], 'Minore Naturale': ['Re#', 'Fa', 'Fa#', 'Sol#', 'La#', 'Si', 'Do#'], 'Pentatonica Maggiore': ['Re#', 'Fa', 'Sol', 'La#', 'Do'], 'Pentatonica Minore': ['Re#', 'Fa#', 'Sol#', 'La#', 'Do#'] },
    'Mi':   { 'Maggiore': ['Mi', 'Fa#', 'Sol#', 'La', 'Si', 'Do#', 'Re#'], 'Minore Naturale': ['Mi', 'Fa#', 'Sol', 'La', 'Si', 'Do', 'Re'], 'Pentatonica Maggiore': ['Mi', 'Fa#', 'Sol#', 'Si', 'Do#'], 'Pentatonica Minore': ['Mi', 'Sol', 'La', 'Si', 'Re'] },
    'Fa':   { 'Maggiore': ['Fa', 'Sol', 'La', 'La#', 'Do', 'Re', 'Mi'], 'Minore Naturale': ['Fa', 'Sol', 'Sol#', 'La#', 'Do', 'Do#', 'Re#'], 'Pentatonica Maggiore': ['Fa', 'Sol', 'La', 'Do', 'Re'], 'Pentatonica Minore': ['Fa', 'Sol#', 'La#', 'Do', 'Re#'] },
    'Fa#':  { 'Maggiore': ['Fa#', 'Sol#', 'La#', 'Si', 'Do#', 'Re#', 'Fa'], 'Minore Naturale': ['Fa#', 'Sol#', 'La', 'Si', 'Do#', 'Re', 'Mi'], 'Pentatonica Maggiore': ['Fa#', 'Sol#', 'La#', 'Do#', 'Re#'], 'Pentatonica Minore': ['Fa#', 'La', 'Si', 'Do#', 'Mi'] },
    'Sol':  { 'Maggiore': ['Sol', 'La', 'Si', 'Do', 'Re', 'Mi', 'Fa#'], 'Minore Naturale': ['Sol', 'La', 'La#', 'Do', 'Re', 'Re#', 'Fa'], 'Pentatonica Maggiore': ['Sol', 'La', 'Si', 'Re', 'Mi'], 'Pentatonica Minore': ['Sol', 'La#', 'Do', 'Re', 'Fa'] },
    'Sol#': { 'Maggiore': ['Sol#', 'La#', 'Do', 'Do#', 'Re#', 'Fa', 'Sol'], 'Minore Naturale': ['Sol#', 'La#', 'Si', 'Do#', 'Re#', 'Mi', 'Fa#'], 'Pentatonica Maggiore': ['Sol#', 'La#', 'Do', 'Re#', 'Fa'], 'Pentatonica Minore': ['Sol#', 'Si', 'Do#', 'Re#', 'Fa#'] },
    'La':   { 'Maggiore': ['La', 'Si', 'Do#', 'Re', 'Mi', 'Fa#', 'Sol#'], 'Minore Naturale': ['La', 'Si', 'Do', 'Re', 'Mi', 'Fa', 'Sol'], 'Pentatonica Maggiore': ['La', 'Si', 'Do#', 'Mi', 'Fa#'], 'Pentatonica Minore': ['La', 'Do', 'Re', 'Mi', 'Sol'] },
    'La#':  { 'Maggiore': ['La#', 'Do', 'Re', 'Re#', 'Fa', 'Sol', 'La'], 'Minore Naturale': ['La#', 'Do', 'Do#', 'Re#', 'Fa', 'Fa#', 'Sol#'], 'Pentatonica Maggiore': ['La#', 'Do', 'Re', 'Fa', 'Sol'], 'Pentatonica Minore': ['La#', 'Do#', 'Re#', 'Fa', 'Sol#'] },
    'Si':   { 'Maggiore': ['Si', 'Do#', 'Re#', 'Mi', 'Fa#', 'Sol#', 'La#'], 'Minore Naturale': ['Si', 'Do#', 'Re', 'Mi', 'Fa#', 'Sol', 'La'], 'Pentatonica Maggiore': ['Si', 'Do#', 'Re#', 'Fa#', 'Sol#'], 'Pentatonica Minore': ['Si', 'Re', 'Mi', 'Fa#', 'La'] }
};

// --- Database Inglese ---
const databaseScale_EN = {
    'C':   { 'Maggiore': ['C', 'D', 'E', 'F', 'G', 'A', 'B'], 'Minore Naturale': ['C', 'D', 'D#', 'F', 'G', 'G#', 'A#'], 'Pentatonica Maggiore': ['C', 'D', 'E', 'G', 'A'], 'Pentatonica Minore': ['C', 'D#', 'F', 'G', 'A#'] },
    'C#':  { 'Maggiore': ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C'], 'Minore Naturale': ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'], 'Pentatonica Maggiore': ['C#', 'D#', 'F', 'G#', 'A#'], 'Pentatonica Minore': ['C#', 'E', 'F#', 'G#', 'B'] },
    'D':   { 'Maggiore': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'], 'Minore Naturale': ['D', 'E', 'F', 'G', 'A', 'A#', 'C'], 'Pentatonica Maggiore': ['D', 'E', 'F#', 'A', 'B'], 'Pentatonica Minore': ['D', 'F', 'G', 'A', 'C'] },
    'D#':  { 'Maggiore': ['D#', 'F', 'G', 'G#', 'A#', 'C', 'D'], 'Minore Naturale': ['D#', 'F', 'F#', 'G#', 'A#', 'B', 'C#'], 'Pentatonica Maggiore': ['D#', 'F', 'G', 'A#', 'C'], 'Pentatonica Minore': ['D#', 'F#', 'G#', 'A#', 'C#'] },
    'E':   { 'Maggiore': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'], 'Minore Naturale': ['E', 'F#', 'G', 'A', 'B', 'C', 'D'], 'Pentatonica Maggiore': ['E', 'F#', 'G#', 'B', 'C#'], 'Pentatonica Minore': ['E', 'G', 'A', 'B', 'D'] },
    'F':   { 'Maggiore': ['F', 'G', 'A', 'A#', 'C', 'D', 'E'], 'Minore Naturale': ['F', 'G', 'G#', 'A#', 'C', 'C#', 'D#'], 'Pentatonica Maggiore': ['F', 'G', 'A', 'C', 'D'], 'Pentatonica Minore': ['F', 'G#', 'A#', 'C', 'D#'] },
    'F#':  { 'Maggiore': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F'], 'Minore Naturale': ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'], 'Pentatonica Maggiore': ['F#', 'G#', 'A#', 'C#', 'D#'], 'Pentatonica Minore': ['F#', 'A', 'B', 'C#', 'E'] },
    'G':   { 'Maggiore': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'], 'Minore Naturale': ['G', 'A', 'A#', 'C', 'D', 'D#', 'F'], 'Pentatonica Maggiore': ['G', 'A', 'B', 'D', 'E'], 'Pentatonica Minore': ['G', 'A#', 'C', 'D', 'F'] },
    'G#':  { 'Maggiore': ['G#', 'A#', 'C', 'C#', 'D#', 'F', 'G'], 'Minore Naturale': ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'], 'Pentatonica Maggiore': ['G#', 'A#', 'C', 'D#', 'F'], 'Pentatonica Minore': ['G#', 'B', 'C#', 'D#', 'F#'] },
    'A':   { 'Maggiore': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'], 'Minore Naturale': ['A', 'B', 'C', 'D', 'E', 'F', 'G'], 'Pentatonica Maggiore': ['A', 'B', 'C#', 'E', 'F#'], 'Pentatonica Minore': ['A', 'C', 'D', 'E', 'G'] },
    'A#':  { 'Maggiore': ['A#', 'C', 'D', 'D#', 'F', 'G', 'A'], 'Minore Naturale': ['A#', 'C', 'C#', 'D#', 'F', 'F#', 'G#'], 'Pentatonica Maggiore': ['A#', 'C', 'D', 'F', 'G'], 'Pentatonica Minore': ['A#', 'C#', 'D#', 'F', 'G#'] },
    'B':   { 'Maggiore': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'], 'Minore Naturale': ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'], 'Pentatonica Maggiore': ['B', 'C#', 'D#', 'F#', 'G#'], 'Pentatonica Minore': ['B', 'D', 'E', 'F#', 'A'] }
};


// =================================================================
// DATI STUDIO
// =================================================================
// (Contiene solo la struttura degli intervalli per ogni tipo di scala)
const databaseStudio = {
    'Maggiore': {
        nome: 'Scala Maggiore',
        intervalli: ['1 (Tonica)', '2M', '3M', '4P', '5P', '6M', '7M']
    },
    'Minore Naturale': {
        nome: 'Scala Minore Naturale',
        intervalli: ['1 (Tonica)', '2M', '3m', '4P', '5P', '6m', '7m']
    },
    'Pentatonica Maggiore': {
        nome: 'Scala Pentatonica Maggiore',
        intervalli: ['1 (Tonica)', '2M', '3M', '5P', '6M']
    },
    'Pentatonica Minore': {
        nome: 'Scala Pentatonica Minore',
        intervalli: ['1 (Tonica)', '3m', '4P', '5P', '7m']
    }
};