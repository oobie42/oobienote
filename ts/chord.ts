
import { Note } from "./note"
import { Tuning } from "./tuning"

export class Chord {
  private noteOne: Note;
  private noteTwo: Note;
  private noteThree: Note;
  private tuning: Tuning;
  constructor(tuning, noteOne, noteTwo, noteThree) {
    this.tuning = tuning;
    this.noteOne = noteOne;
    this.noteTwo = noteTwo;
    this.noteThree = noteThree;
    this.showRatios();
  }
  toggleOne() {
    this.noteOne.toggle();
  }
  toggleTwo() {
    this.noteTwo.toggle();
  }
  toggleThree() {
    this.noteThree.toggle();
  }
  higherOne() {
    this.noteOne.higher();
    this.noteTwo.higher();
    this.noteThree.higher();
    this.showRatios();
  }
  higherTwo() {
    this.noteTwo.higher();
    this.showRatios();
  }
  higherThree() {
    this.noteThree.higher();
    this.showRatios();
  }
  lowerOne() {
    this.noteOne.lower();
    this.noteTwo.lower();
    this.noteThree.lower();
    this.showRatios();
  }
  lowerTwo() {
    this.noteTwo.lower();
    this.showRatios();
  }
  lowerThree() {
    this.noteThree.lower();
    this.showRatios();
  }
  showRatio(id: string, ratio: number) {
    document.getElementById(id + "-ratio").innerHTML = ratio.toFixed(2);
  }
  show4x(id: string, ratio: number) {
    document.getElementById(id + "-4x").innerHTML =
        (ratio*4).toFixed(1) + ":4";
  }
  showStepDifference(id: string, ratio: number) {
    document.getElementById(id + "-steps").innerHTML =
        this.tuning.semiToneSteps(ratio).toFixed(0);
  }
  showRatios() {
    let ratio = this.noteTwo.getFrequency()/this.noteOne.getFrequency();
    this.showRatio("two", ratio);
    this.show4x("two", ratio);
    this.showStepDifference( "two", ratio);
    ratio = this.noteThree.getFrequency()/this.noteOne.getFrequency();
    this.showRatio("three", ratio);
    this.show4x("three", ratio);
    this.showStepDifference("three", ratio);
  }
  stop() {
    this.noteOne.stop();
    this.noteTwo.stop();
    this.noteThree.stop();
  }
  start() {
    this.noteOne.start();
    this.noteTwo.start();
    this.noteThree.start();
  }
  reset() {
    this.stop();
    this.noteOne.reset();
    this.noteTwo.reset();
    this.noteThree.reset();
    this.showRatios();
  }
}
