// A key is a thing that plays a note
import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

function startOscillator(frequency) {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  gain.gain.value = 0.3;
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.frequency.value = frequency;
  oscillator.start();
  return oscillator;
}

function oneSemiTone() {
  return Math.pow(2, 1/12);
}

@customElement('key-element')
export class KeyElement extends LitElement {
  // The frequency attribute is expected to be a number.
  @property ({type: Number }) frequency;
  // Forces the initial state of the Play/Stop button to Play.
  @state() private isPlaying: boolean = false;
  // Have to wait to do any Web Audio API stuff until there's interaction.
  private oscillator: OscillatorNode = <OscillatorNode>{};
  // A place to save off the initial frequency for use with reset().
  private resetFrequency: Number;

  // Seems a contorted way to preserve the original state of the frequency?
  connectedCallback() {
    super.connectedCallback();
    this.resetFrequency = this.frequency;
  }

  playPause() {
    if (this.isPlaying) {
      this.oscillator.stop();
      this.isPlaying = false;
    } else {
      this.oscillator = startOscillator(this.frequency);
      this.isPlaying = true;
    }
  }

  changeFrequency(newFrequency) {
    if (this.isPlaying) {
      this.oscillator.stop();
    }
    this.oscillator = startOscillator(newFrequency);
    this.frequency = newFrequency;
    this.isPlaying = true;
  }

  higher() {
    this.changeFrequency(this.frequency * oneSemiTone());
  }

  lower() {
    this.changeFrequency(this.frequency / oneSemiTone());
  }

  reset() {
    this.changeFrequency(this.resetFrequency);
  }

  render() {
    return html`
      <button @click=${this.playPause}>
        ${this.isPlaying ? 'Pause' : 'Play'}
      </button>
      <button @click=${this.higher}>Higher</button>
      <button @click=${this.lower}>Lower</button>
      <button @click=${this.reset}>Reset</button>
      ${this.frequency.toFixed(2)}`;
  }
}

