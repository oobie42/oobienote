
import { AudioContext, OscillatorNode } from "./webaudio"

import { Tuning } from "./tuning"

enum NoteState {
  Paused,
  Playing
}

export class Note {
  private audioContext: AudioContext;
  private frequency: number;
  private id: string;
  private noteState: NoteState;
  private oscillator: OscillatorNode;
  private resetFrequency: number;
  private tuning: Tuning;
  constructor(audioContext: AudioContext, tuning: Tuning, id: string,
      frequency: number) {
    this.audioContext = audioContext;
    this.tuning = tuning;
    this.id = id;
    this.frequency = frequency;
    this.resetFrequency = frequency;
    this.oscillator = this.initOscillator(this.frequency);
    this.noteState = NoteState.Paused;
    this.showFrequency(this.id, this.frequency);
  }
  initOscillator(frequency: number): OscillatorNode {
    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    gain.gain.value = 0.3;
    oscillator.connect(gain);
    gain.connect(this.audioContext.destination);
    oscillator.frequency.value = frequency;
    return oscillator;
  }
  showFrequency(id: string, frequency: number) {
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
    if (this.noteState == NoteState.Playing) {
      console.log('stop oscillator ' + this.id + ': ' + this.frequency);
      this.oscillator.stop();
    }
    this.noteState = NoteState.Paused;
  }
  start() {
    console.log('start oscillator ' + this.id + ':' + this.frequency);
    this.stop();
    this.oscillator = this.initOscillator(this.frequency);  // TODO: use resume
    this.oscillator.start();
    this.showFrequency(this.id, this.frequency);
    this.noteState = NoteState.Playing;
  }
  toggle() {
    if (this.noteState == NoteState.Paused) {
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
