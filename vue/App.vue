<template>
  <Note initialFrequency="440"/>
  <!-- Tricky syntax... the leading colon indicates that the property value
       is a JavaScript expression -->
  <Note :initialFrequency="440 * semiTone(4)"/>
  <Note :initialFrequency="440 * semiTone(7)"/>
</template>

<script>
import Note from './Note.vue'

export default {
  name: 'App',
  components: {
    Note
  },
  methods: {
    semiTone(steps) {
      return Math.pow(2, steps/12);
    }
  }
}
</script>
