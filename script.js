let currentScale = 1.0;
const synth = window.speechSynthesis;
let voices = [];

// Carrega as vozes disponíveis no navegador do usuário
function loadVoices() {
  voices = synth.getVoices();
}

// Inicializa a lista de vozes (alguns navegadores carregam de forma assíncrona)
loadVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadVoices;
}

// Aumentar / Diminuir Fonte
function changeFontSize(delta) {
  currentScale = Math.max(0.8, Math.min(1.5, currentScale + delta));
  document.documentElement.style.setProperty('--font-scale', `${currentScale}rem`);
}

// Leitura em Voz Alta
function readContent() {
  stopReading(); // Cancela leituras ativas antes de iniciar

  const content = document.getElementById('main-content').innerText;
  const utterance = new SpeechSynthesisUtterance(content);

  // Busca uma voz com sotaque de Português do Brasil no sistema
  const ptBrVoice = voices.find(voice => voice.lang === 'pt-BR' || voice.lang === 'pt_BR');

  if (ptBrVoice) {
    utterance.voice = ptBrVoice;
  }
  
  utterance.lang = 'pt-BR';
  utterance.rate = 0.95; // Velocidade ligeiramente reduzida para melhor articulação

  synth.speak(utterance);
}

function stopReading() {
  if (synth.speaking || synth.pending) {
    synth.cancel();
  }
}