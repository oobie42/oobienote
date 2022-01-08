<script>
import Note from './Note.svelte';

function semiToneSteps(steps) {
  return Math.pow(2, steps/12);
}
</script>

<Note initialFrequency={440}/>
<br/>
<Note initialFrequency={440 * semiToneSteps(4)}/>
<br/>
<Note initialFrequency={440 * semiToneSteps(7)}/>
