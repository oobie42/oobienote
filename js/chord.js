export {Chord}

class Chord {
  constructor(tuning, oscillatorOne, oscillatorTwo,
      oscillatorThree) {
    this.tuning = tuning;
    this.one = oscillatorOne;
    this.two = oscillatorTwo;
    this.three = oscillatorThree;
    this.showRatios();
  }
  toggleOne() {
    this.one.toggle();
  }
  toggleTwo() {
    this.two.toggle();
  }
  toggleThree() {
    this.three.toggle();
  }
  higherOne() {
    this.one.higher();
    this.two.higher();
    this.three.higher();
    this.showRatios();
  }
  higherTwo() {
    this.two.higher();
    this.showRatios();
  }
  higherThree() {
    this.three.higher();
    this.showRatios();
  }
  lowerOne() {
    this.one.lower();
    this.two.lower();
    this.three.lower();
    this.showRatios();
  }
  lowerTwo() {
    this.two.lower();
    this.showRatios();
  }
  lowerThree() {
    this.three.lower();
    this.showRatios();
  }
  showRatio(id, ratio) {
    document.getElementById(id + "-ratio").innerHTML = ratio.toFixed(2);
  }
  show4x(id, ratio) {
    document.getElementById(id + "-4x").innerHTML =
        (ratio*4).toFixed(1) + ":4";
  }
  showStepDifference(id, ratio) {
    document.getElementById(id + "-steps").innerHTML =
        this.tuning.semiToneSteps(ratio).toFixed(0);
  }
  showRatios() {
    var ratio = this.two.getFrequency()/this.one.getFrequency();
    this.showRatio("two", ratio);
    this.show4x("two", ratio);
    this.showStepDifference( "two", ratio);
    ratio = this.three.getFrequency()/this.one.getFrequency();
    this.showRatio("three", ratio);
    this.show4x("three", ratio);
    this.showStepDifference("three", ratio);
  }
  stop() {
    this.one.stop();
    this.two.stop();
    this.three.stop();
  }
  start() {
    this.one.start();
    this.two.start();
    this.three.start();
  }
  reset() {
    this.stop();
    this.one.reset();
    this.two.reset();
    this.three.reset();
    this.showRatios();
  }
}
