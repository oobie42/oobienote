// import requires this be type="module"
import {AudioContext} from "./webaudio"
// XXX the .js stuff seems like a hack. See:
//    https://github.com/microsoft/TypeScript/issues/16577
// There are seemingly two things going on here:
// 1) import the type _declaration_ during compilation,
// 2) load the type's _implementation_ at runtime
import {Chord} from "./chord.js";
import {Note} from "./note.js";
import {Tuning} from "./tuning.js";

// HTML buttons.
const onePlayButton = document.querySelector('.one-play-pause');
const twoPlayButton = document.querySelector('.two-play-pause');
const threePlayButton = document.querySelector('.three-play-pause');

const oneHigherButton = document.querySelector('.one-higher');
const twoHigherButton = document.querySelector('.two-higher');
const threeHigherButton = document.querySelector('.three-higher');

const oneLowerButton = document.querySelector('.one-lower');
const twoLowerButton = document.querySelector('.two-lower');
const threeLowerButton = document.querySelector('.three-lower');

const stopButton = document.querySelector('.stop');
const startButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');

const stepLowerButton = document.querySelector('.step-lower');
const stepHigherButton = document.querySelector('.step-higher');

// XXX this is a mess...
function removeEventListeners(chord) {
  onePlayButton.removeEventListener('click', chord.toggleOneEL);
  twoPlayButton.removeEventListener('click', chord.toggleTwoEL);
  threePlayButton.removeEventListener('click', chord.toggleThreeEL);

  oneHigherButton.removeEventListener('click', chord.higherOneEL);
  twoHigherButton.removeEventListener('click', chord.higherTwoEL);
  threeHigherButton.removeEventListener('click', chord.higherThreeEL);

  oneLowerButton.removeEventListener('click', chord.lowerOneEL);
  twoLowerButton.removeEventListener('click', chord.lowerTwoEL);
  threeLowerButton.removeEventListener('click', chord.lowerThreeEL);

  stopButton.removeEventListener('click', chord.stopEL);
  startButton.removeEventListener('click', chord.startEL);
  resetButton.removeEventListener('click', chord.resetEL);
}

function addEventListeners(chord) {
  // XXX This can't be the way to do it.  How to parameterize the callback?
  // XXX foreach something-play-pause addEventListener blah[something].toggle()?
  chord.toggleOneEL = function() { chord.toggleOne() };
  onePlayButton.addEventListener('click', chord.toggleOneEL);
  chord.toggleTwoEL = function() { chord.toggleTwo() };
  twoPlayButton.addEventListener('click', chord.toggleTwoEL);
  chord.toggleThreeEL = function() { chord.toggleThree() };
  threePlayButton.addEventListener('click', chord.toggleThreeEL);
  
  chord.higherOneEL = function() { chord.higherOne(); }
  oneHigherButton.addEventListener('click', chord.higherOneEL);
  chord.higherTwoEL = function() { chord.higherTwo(); }
  twoHigherButton.addEventListener('click', chord.higherTwoEL);
  chord.higherThreeEL = function() { chord.higherThree(); }
  threeHigherButton.addEventListener('click', chord.higherThreeEL);
  
  chord.lowerOneEL = function() { chord.lowerOne(); }
  oneLowerButton.addEventListener('click', chord.lowerOneEL);
  chord.lowerTwoEL = function() { chord.lowerTwo(); }
  twoLowerButton.addEventListener('click', chord.lowerTwoEL);
  chord.lowerThreeEL = function() { chord.lowerThree(); }
  threeLowerButton.addEventListener('click', chord.lowerThreeEL);
  
  chord.stopEL = function() { chord.stop(); }
  stopButton.addEventListener('click', chord.stopEL);
  chord.startEL = function() { chord.start(); }
  startButton.addEventListener('click', chord.startEL);
  chord.resetEL = function() { chord.reset(); }
  resetButton.addEventListener('click', chord.resetEL);
}

class App {
  audioContext: AudioContext;
  baseFrequency: number;
  chord: Chord;
  stepsPerOctave: number;
  constructor(audioContext: AudioContext, stepsPerOctave, baseFrequency) {
    this.audioContext = audioContext;
    this.stepsPerOctave = stepsPerOctave;
    this.baseFrequency = baseFrequency;
    this.init();
  }
  init() {
    let tuning = new Tuning(this.stepsPerOctave);
    let one = new Note(this.audioContext, tuning, "one", this.baseFrequency);
    let two = new Note(this.audioContext, tuning, "two",
        tuning.third(this.baseFrequency));
    let three = new Note(this.audioContext, tuning, "three",
        tuning.fifth(this.baseFrequency));
    this.chord = new Chord(tuning, one, two, three);
    addEventListeners(this.chord);
  }
  reset(stepsPerOctave: number) {
    this.chord.stop();
    removeEventListeners(this.chord);
    this.stepsPerOctave = stepsPerOctave;
    this.init();
  }
  fewerSteps() {
    this.reset(--this.stepsPerOctave);
  }
  moreSteps() {
    this.reset(++this.stepsPerOctave);
  }
}

// Firefox and Chrome have AudioContext.  Need webkitAudioContext for Safari.
//const AudioContext = window.AudioContext || window.webkitAudioContext;
const AudioContext = window.AudioContext;
const audioContext = new AudioContext();
const app = new App(audioContext, 12, 440);
stepLowerButton.addEventListener('click', function() {
  app.fewerSteps();
});
stepHigherButton.addEventListener('click', function() {
  app.moreSteps();
});
