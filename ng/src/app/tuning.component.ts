import { Component } from '@angular/core';

@Component({
  selector: 'app-tuning',
  templateUrl: './tuning.component.html'
})
export class TuningComponent {
  tuningSteps: number;
  constructor() {
    this.tuningSteps = 12;
  }
  moreSteps() {
    this.tuningSteps++;
  }
  fewerSteps() {
    this.tuningSteps--;
  }
}
