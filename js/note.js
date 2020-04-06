export {Note}

class Note {
  constructor(audioContext, tuning, id, frequency) {
    this.audioContext = audioContext;
    this.tuning = tuning;
    this.id = id;
    this.frequency = frequency;
    this.resetFrequency = frequency;
    this.oscillator = this.initOscillator(this.frequency);
    this.state = 'paused';
    this.showFrequency(this.id, this.frequency);
  }
  initOscillator(frequency) {
    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    gain.gain.value = 0.3;
    oscillator.connect(gain);
    gain.connect(this.audioContext.destination);
    oscillator.frequency.value = frequency;
    return oscillator;
  }
  showFrequency(id, frequency) {
    document.getElementById(id + "-frequency").innerHTML = frequency.toFixed(4);
  }
  getFrequency() {
    return this.frequency;
  }
  reset() {
    this.frequency = this.resetFrequency;
    this.showFrequency(this.id, this.frequency);
  }
  stop() {
    if (this.state == 'playing') {
      console.log('stop oscillator ' + this.id + ': ' + this.frequency);
      this.oscillator.stop();
    }
    this.state = 'paused';
  }
  start() {
    console.log('start oscillator ' + this.id + ':' + this.frequency);
    this.stop();
    this.oscillator = this.initOscillator(this.frequency);  // TODO: use resume
    this.oscillator.start();
    this.showFrequency(this.id, this.frequency);
    this.state = 'playing';
  }
  toggle() {
    if (this.state == 'paused') {
      this.start();
    } else {
      this.stop();
    }
  }
  higher() {
    this.frequency = this.frequency * this.tuning.semiTone(1);
    this.start();
  }
  lower() {
    this.frequency = this.frequency / this.tuning.semiTone(1);
    this.start();
  }
}
