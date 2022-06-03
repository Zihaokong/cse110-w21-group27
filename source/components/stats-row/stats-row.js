/**
 * \<stats-row\>
 * 
 * A webcomponent used to group stat-card components.
 *
 * The StatsRow represents a the statistics for a single period of time 
 * (1 day, 7 days, 30 days).
 */
 class StatsRow extends HTMLElement {
  /**
   * Attaches a shadow DOM to the webcomponent, as well as adds the link to the
   * stylesheet.
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = '/components/stats-row/stats-row.css';

    this.shadowRoot.appendChild(styleSheet);
  }
  
  /**
   * Called when the webcomponent is applied to the DOM; Sets up the webcomponent.
   */
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
