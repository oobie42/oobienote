<template>
  <div>
    <button v-on:click="onPlayStop">
      {{ this.isPlaying ? "Stop" : "Play"}}
    </button>
    <button v-on:click="onHigher">Higher</button>
    <button v-on:click="onLower">Lower</button>
    <button v-on:click="onReset">Reset</button>
    <div>{{ this.frequency }}</div>
  </div>
</template>

<script>
export default {
  name: 'Note',
  props: [
     'initialFrequency'
  ],
  data() {
    return {
      isPlaying: false,
      frequency: this.initialFrequency,
    }
  },
  methods: {
    initOscillator(frequency) {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      gain.gain.value = 0.3;
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.frequency.value = frequency;
      return oscillator;
    },
    onPlayStop() {
      if (this.isPlaying) {
        this.oscillator.stop();
        this.isPlaying = false;
      } else {
        this.oscillator = this.initOscillator(this.frequency);
        this.oscillator.start();
        this.isPlaying = true;
      }
    },
    oneSemiTone() {
      return Math.pow(2, 1/12);
    },
    startNewFrequency(newFrequency) {
      this.frequency = newFrequency;
      if (this.isPlaying) {
        this.oscillator.stop();
      }
      this.oscillator = this.initOscillator(newFrequency);
      this.oscillator.start();
      this.isPlaying = true;
    },
    onHigher() {
      this.startNewFrequency(this.frequency * this.oneSemiTone());
    },
    onLower() {
      this.startNewFrequency(this.frequency / this.oneSemiTone());
    },
    onReset() {
      this.startNewFrequency(this.initialFrequency);
    }
  }
}
</script>
