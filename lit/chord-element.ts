// A chord is a thing that plays some keys
import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

function semiTone(steps) {
  return Math.pow(2, steps/12);
}

@customElement('chord-element')
export class ChordElement extends LitElement {
  constructor() {
    super();
  }

  render() {
    const keyTemplates = [];
    for (const i of [0, 4, 7]) {
      keyTemplates.push(
        html`<key-element frequency=${440 * semiTone(i)}></key-element>`);
    }
    return html`<div>${keyTemplates}</div>`;
      
  }
}

