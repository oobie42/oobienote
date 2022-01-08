import { render } from 'solid-js/web';
import { createSignal } from "solid-js";
import { Component } from "solid-js";

function semiToneSteps(steps): number {
  return Math.pow(2, steps/12);
}

function startOscillator(frequency): Oscillator {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  gain.gain.value = 0.3;
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.frequency.value = frequency;
  oscillator.start();
  return oscillator;
}

function Note(props) : Component {
  const [frequency, setFrequency]  = createSignal(props.frequency);
  const [isPlaying, setIsPlaying] = createSignal(false);
  let oscillator : Oscillator;
  const handlePlayStop: void = (event) => {
    if (isPlaying()) {
      oscillator.stop();
      setIsPlaying(false);
    } else {
      oscillator = startOscillator(frequency());
      setIsPlaying(true);
    }
  }
  const startNewFrequency: void = (newFrequency) => {
    if (isPlaying()) {
      oscillator.stop();
    }
    oscillator = startOscillator(newFrequency);
    setIsPlaying(true);
    setFrequency(newFrequency);
  }
  const handleHigher: void = (event) => {
    startNewFrequency(frequency() * semiToneSteps(1));
  }
  const handleLower: void = (event) => {
    startNewFrequency(frequency() / semiToneSteps(1));
  }
  const handleReset: void = (event) => {
    startNewFrequency(props.frequency);
  }
  return <>
    <button onClick={[handlePlayStop]}>{isPlaying() ? 'Stop' : 'Play'}</button>
    <button onClick={[handleHigher]}>Higher</button>
    <button onClick={[handleLower]}>Lower</button>
    <button onClick={[handleReset]}>Reset</button>
    {frequency().toFixed(2)}
  </>;
}

function Chord() : Component {
  return <>
    <Note frequency={440}/>
    <br/>
    <Note frequency={440 * semiToneSteps(4)}/>
    <br/>
    <Note frequency={440 * semiToneSteps(7)}/>
  </>;;
}

render(() => <Chord />, document.getElementById('root') as HTMLElement);
