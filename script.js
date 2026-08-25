let currentScale = 1.0;
const synth = window.speechSynthesis;
let voices = [];

// Carrega as vozes de sintetizador instaladas no navegador do usuário
function loadVoices() {
  voices = synth.getVoices();
}

loadVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadVoices;
}

// Controle de zoom no tamanho da fonte
function changeFontSize(delta) {
  currentScale = Math.max(0.8, Math.min(1.5, currentScale + delta));
  document.documentElement.style.setProperty('--font-scale', `${currentScale}rem`);
}

// Função de leitura em voz alta otimizada para sotaque de Português do Brasil (pt-BR)
function readContent() {
  stopReading(); // Garante a interrupção de qualquer leitura em andamento

  const content = document.getElementById('main-content').innerText;
  const utterance = new SpeechSynthesisUtterance(content);

  // Procura por uma voz nativa em pt-BR disponível no dispositivo/sistema
  const ptBrVoice = voices.find(voice => voice.lang === 'pt-BR' || voice.lang === 'pt_BR');

  if (ptBrVoice) {
    utterance.voice = ptBrVoice;
  }
  
  utterance.lang = 'pt-BR';
  utterance.rate = 0.95; // Ajuste na velocidade para maior clareza pedagógica

  synth.speak(utterance);
}

function stopReading() {
  if (synth.speaking || synth.pending) {
    synth.cancel();
  }
}