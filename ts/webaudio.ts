// This declares only the interfaces used in this app.
export interface AudioContext extends BaseAudioContext {
  destination: AudioDestinationNode;
}

export interface AudioDestinationNode extends AudioNode {
}

export interface AudioParam {
  value: number;
}

export interface AudioNode {
  connect(audioNode: AudioNode) : AudioNode
}

export interface BaseAudioContext {
  createOscillator(): OscillatorNode;
  createGain(): GainNode;
}

export interface GainNode extends AudioNode {
  gain: AudioParam;
}

export interface OscillatorNode extends AudioNode {
  frequency: AudioParam;
  stop();
  start();
}

