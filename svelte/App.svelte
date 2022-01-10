<script>
import Note from './Note.svelte';

function semiToneSteps(steps) {
  return Math.pow(2, steps/12);
}

const chord = [0, 4, 7];
</script>

{#each chord as key}
  <Note initialFrequency={440 * semiToneSteps(key)} />
{/each}
