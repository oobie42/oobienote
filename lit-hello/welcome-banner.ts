import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('welcome-banner')
class WelcomeBanner extends LitElement {
  @property({type: String})
  name = '';

  render() {
    return html`<h1>Hello, ${this.name}</h1>`
  }
}

