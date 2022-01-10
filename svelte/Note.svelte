<script>
export let initialFrequency;  // Prop
const audioContext = new AudioContext();
let frequency = initialFrequency;
let oscillator = initOscillator(frequency);  // Just gets tossed...
let isPlaying = false;

function initOscillator(frequency) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  gain.gain.value = 0.3;
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.frequency.value = frequency;
  return oscillator;
}

function onPlayStop(event) {
  if (isPlaying) {
    oscillator.stop();
    isPlaying = false;
  } else {
    oscillator = initOscillator(frequency);
    oscillator.start();
    isPlaying = true;
  }
}

function startNewFrequency(newFrequency) {
  frequency = newFrequency;
  if (isPlaying) {
    oscillator.stop();
  }
  oscillator = initOscillator(frequency);
  oscillator.start();
  isPlaying = true;
}

function oneSemiTone() {
  return Math.pow(2, 1/12);
}

function onHigher(event) {
  startNewFrequency(frequency * oneSemiTone());
}

function onLower(event) {
  startNewFrequency(frequency / oneSemiTone());
}

function onReset(event) {
  startNewFrequency(initialFrequency);
}

</script>

<button on:click={onPlayStop}>
  { isPlaying ? 'Stop' : 'Play' }
</button>
<button on:click={onHigher}>Higher</button>
<button on:click={onLower}>Lower</button>
<button on:click={onReset}>Reset</button>
{frequency.toFixed(2)}

