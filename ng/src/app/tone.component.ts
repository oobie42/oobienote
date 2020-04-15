
import { Component, Input } from '@angular/core';

import { ToneState } from './tone.state';

import { Tone } from './tone';

@Component({
  selector: 'app-tone',
  templateUrl: 'tone.component.html'
})
export class ToneComponent {
  private tone: Tone;
  constructor() {
    this.tone = new Tone(440);
  }
  @Input()
  set toneFrequency(toneFrequency: number) {
    this.tone.setFrequency(toneFrequency);
  }
  get toneFrequency(): number {
    return this.tone.getFrequency();
  }
  @Input()
  set toneState(toneState: ToneState) {
    switch (toneState) {
    case ToneState.PLAY:
      this.tone.play();
      break;
    case ToneState.PAUSE:
      this.tone.stop();
      break;
    }
  }
  play() {
    this.toneFrequency = this.tone.play();
  }
  stop() {
    this.tone.stop();
  }
  up() {
    this.toneFrequency = this.tone.up();
  }
  down() {
    this.toneFrequency = this.tone.down();
  }
}
