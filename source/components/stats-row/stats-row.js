const template = document.createElement('template');
template.innerHTML = `

`;

class StatsRow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = './stats-row.css';

    this.shadowRoot.appendChild(styleSheet);
  }

  // connectedCallback() {}
}

window.customElements.define('stats-row', StatsRow);
