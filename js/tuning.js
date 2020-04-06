export {Tuning}

// In the equal temperament tuning system one step (semi-tone) is:
//   f * 2^(1/stepsPerOctave) where stepsPerOctave is 12.
class Tuning {
  constructor(stepsPerOctave) {
    this.stepsPerOctave = stepsPerOctave;
    document.getElementById("steps-per-octave").innerHTML = stepsPerOctave;
  }
  semiToneSteps(frequencyRatio) {
    return (Math.log(frequencyRatio) / Math.log(2)) * this.stepsPerOctave;
  }
  semiTone(steps) {
    return Math.pow(2, steps/this.stepsPerOctave);
  }
  third(frequency) {  // At least in the equal temperament system...
    return frequency * this.semiTone(4);
  }
  fifth(frequency) {  // At least in the equal temperament system...
    return frequency * this.semiTone(7);
  }
}
