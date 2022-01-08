
import React from 'react';

const audioContext = new AudioContext();

function semiTone(steps) {
  return Math.pow(2, steps/12);
}

function initOscillator(frequency) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  gain.gain.value = 0.3;
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.frequency.value = frequency;
  return oscillator;
}

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: this.props.initialFrequency,
      isPlaying: false
    };
  }

  onPlayStop() {
    if (this.state.isPlaying) {
      this.oscillator.stop();
      this.setState({isPlaying : false});
    } else {
      this.oscillator = initOscillator(this.state.frequency);
      this.oscillator.start();
      this.setState({isPlaying : true});
    }
  }

  startNewFrequency(newFrequency) {
    this.setState({frequency: newFrequency}, () => {
      if (this.state.isPlaying) {
        this.oscillator.stop();
      }
      // Here in the callback of setState the state has the new value.
      this.oscillator = initOscillator(this.state.frequency);
      this.oscillator.start();
      this.setState({isPlaying : true});
    });
  }

  onHigher() {
    this.startNewFrequency(this.state.frequency * semiTone(1));
  }

  onLower() {
    this.startNewFrequency(this.state.frequency / semiTone(1));
  }

  onReset() {
    this.startNewFrequency(this.props.frequency);
  }

  // Render called just once.
  render() {
    return (
      <div>
      <button onClick={() => this.onPlayStop()}>
        {this.state.isPlaying ? 'Stop' : 'Play'}
      </button>
      <button onClick={() => this.onHigher()}>
        Higher
      </button>
      <button onClick={() => this.onLower()}>
        Lower
      </button>
      <button onClick={() => this.onReset()}>
        Reset
      </button>
      {this.state.frequency}
      </div>
    );
  }
}

class Chord extends React.Component {
  constructor() {
    super();
    // This is a major A chord
    this.state = {
      root: 440,
      third: 440 * semiTone(4),
      fifth: 440 * semiTone(7)
    }
  }

  render() {
    return (
      <div className="Chord">
        <Note initialFrequency={this.state.root}/>
        <Note initialFrequency={this.state.third}/>
        <Note initialFrequency={this.state.fifth}/>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Chord />
    </div>
  );
}

export default App;
