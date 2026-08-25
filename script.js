let currentScale = 1.0;
const synth = window.speechSynthesis;

// Aumentar / Diminuir Fonte
function changeFontSize(delta) {
  currentScale = Math.max(0.8, Math.min(1.5, currentScale + delta));
  document.documentElement.style.setProperty('--font-scale', `${currentScale}rem`);
}

// Leitura em Voz Alta (Speech Synthesis API)
function readContent() {
  stopReading(); // Cancela leituras anteriores ativas
  
  const content = document.getElementById('main-content').innerText;
  const utterance = new SpeechSynthesisUtterance(content);
  utterance.lang = 'pt-BR';
  utterance.rate = 1.0;

  synth.speak(utterance);
}

function stopReading() {
  if (synth.speaking) {
    synth.cancel();
  }
}