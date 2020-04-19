
import { Component, Input } from '@angular/core';

import { ToneState } from './tone.state';

import { Tuning } from './tuning';

@Component({
  selector: 'app-chord',
  templateUrl: 'chord.component.html'
})
export class ChordComponent {
  private tuning: Tuning;
  // XXX use an array of some interface
  toneFrequency1: number;
  toneState1: ToneState;
  toneFrequency2: number;
  toneState2: ToneState;
  toneFrequency3: number;
  toneState3: ToneState;
  @Input() set chordTuningSteps(chordTuningSteps: number) {
    this.stop();
    this.tuning = new Tuning(chordTuningSteps);
    this.initFrequencies();
  }
  initFrequencies() {
    this.toneFrequency1 = 440;
    this.toneFrequency2 = this.tuning.third(440);
    this.toneFrequency3 = this.tuning.fifth(440);
  }
  play() {
    this.toneState1 = ToneState.PLAY;
    this.toneState2 = ToneState.PLAY;
    this.toneState3 = ToneState.PLAY;
  }
  stop() {
    this.toneState1 = ToneState.PAUSE;
    this.toneState2 = ToneState.PAUSE;
    this.toneState3 = ToneState.PAUSE;
  }
  reset() {  // XXX state/frequency not triggered in ToneComponent
    this.stop();
    this.initFrequencies();
  }
}
