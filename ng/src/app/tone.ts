
import { AudioContext, OscillatorNode } from './webaudio';

import { ToneState } from './tone.state';

export class Tone {
  private audioContext: AudioContext;
  private oscillator: OscillatorNode;
  private toneState: ToneState;
  private frequency: number;
  constructor(frequency: number) {
    const AudioContext = window.AudioContext;
    this.audioContext = new AudioContext();
    this.frequency = frequency;
    this.createOscillator();
  }
  private createOscillator() {  // Because there's no "resume()".
    this.oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    gain.gain.value = 0.3;
    this.oscillator.connect(gain);
    gain.connect(this.audioContext.destination);
    this.oscillator.frequency.value = this.frequency;
    this.toneState = ToneState.PAUSE;
  }
  play(): number {
    if (this.toneState == ToneState.PAUSE) {
      this.createOscillator();
      this.oscillator.start();
      this.toneState = ToneState.PLAY;
    }
    return this.frequency;
  }
  stop() {
    if (this.toneState == ToneState.PLAY) {
      this.oscillator.stop();
      this.toneState = ToneState.PAUSE;
    }
  }
  private semiTone() {  // XXX Get this from Tuning
    return Math.pow(2, 1/12);
  }
  up(): number {
    this.stop();
    this.frequency *= this.semiTone();
    this.play();
    return this.frequency;
  }
  down(): number {
    this.stop();
    this.frequency /= this.semiTone();
    this.play();
    return this.frequency;
  }
  setFrequency(newFrequency: number) {
    this.frequency = newFrequency;
    if (this.toneState == ToneState.PLAY) {
      this.stop();
      this.play();
    }
  }
  getFrequency(): number {
    return this.frequency;
  }
}
