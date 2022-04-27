
import React, { useEffect, useState } from 'react';

function semiTone(steps) {
  return Math.pow(2, steps/12);
}

function startOscillator(frequency) {
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

function useOscillator(play, frequency) {
  const [oscillator, setOscillator] = useState(undefined);

  // Here we reflect the UI state into the Web Audio API.  If the UI changes
  // either the frequency or play state change then run this effect.  As such
  // "play" is essentially a command from the point of view of this effect.
  useEffect(() => {
    // The existence of an oscillator also means the oscillator is playing.
    if (oscillator) {
      oscillator.stop();
    }
    if (play) {
      setOscillator(startOscillator(frequency));
    }
  }, [play, frequency]);
}

function Note(props) {
  const [play, setPlay] = useState(false);
  const [frequency, setFrequency] = useState(props.frequency);
  useOscillator(play, frequency);

  function onPlayStop() {
    setPlay(play ? false : true);
  }

  function onHigher() {
    setFrequency(frequency * semiTone(1));
    setPlay(true);
  }

  function onLower() {
    setFrequency(frequency / semiTone(1));
    setPlay(true);
  }

  return (
   <>
    <button onClick={onPlayStop}>{play ? 'Stop' : 'Play'}</button>
    <button onClick={onHigher}>Higher</button>
    <button onClick={onLower}>Lower</button>
    {Number.parseFloat(frequency).toFixed(2)}
   </>
  );
}

function Chord() {
  return (
   <>
    <Note frequency="440"/>
    <br></br>
    <Note frequency={440 * semiTone(4)}/>
    <br></br>
    <Note frequency={440 * semiTone(7)}/>
   </>
  );
}

function App() {
  return (<Chord/>);
}

export default App;
