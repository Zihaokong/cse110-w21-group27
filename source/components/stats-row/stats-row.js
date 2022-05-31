class StatsRow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = '/components/stats-row/stats-row.css';

    this.shadowRoot.appendChild(styleSheet);
  }

  connectedCallback() {
    const template = document.createElement('template');

    const statDays =
      this.querySelector('stats-card').getAttribute('stat-length');
    let title = '';

    if (statDays === '1') {
      title = 'Today';
    } else {
      title = `Last ${statDays} Days`;
    }

    template.innerHTML = `
        <section>
            <h2>${title}</h2>
            <div class="stats-container">
                <slot name="stats-card">
            </div>
        </section>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('stats-row', StatsRow);
