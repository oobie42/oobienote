// In the equal temperament tuning system one step (semi-tone) is:
//   f * 2^(1/stepsPerOctave) where stepsPerOctave is 12.
export class Tuning {
  private stepsPerOctave: number;
  constructor(stepsPerOctave: number) {
    this.stepsPerOctave = stepsPerOctave;
  }
  semiToneSteps(frequencyRatio: number): number {
    return (Math.log(frequencyRatio) / Math.log(2)) * this.stepsPerOctave;
  }
  semiTone(steps: number): number {
    return Math.pow(2, steps/this.stepsPerOctave);
  }
  third(frequency: number): number {  // Equal temperament system.
    return frequency * this.semiTone(4);
  }
  fifth(frequency: number): number {  // Equal temperament system.
    return frequency * this.semiTone(7);
  }
}
