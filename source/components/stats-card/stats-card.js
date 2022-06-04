/**
 * \<stats-card\>
 *
 * A webcomponent used to display statistic information on the stats page.
 *
 * The StatsCard represents a single statistic, and contains an image, a number,
 * as well as an overall title describing what the stat represents.
 */
class StatsCard extends HTMLElement {
  /**
   * Attaches a shadow DOM to the webcomponent, as well as adds the link to the
   * stylesheet.
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = '/components/stats-card/stats-card.css';

    this.shadowRoot.appendChild(styleSheet);
  }

  /**
   * Called when the webcomponent is applied to the DOM; Sets up the webcomponent.
   */
  connectedCallback() {
    const { srcUrl, altText, imgWidth, imgHeight, stat, cardTitle } =
      this.getContent();

    const template = document.createElement('template');
    template.innerHTML = `
            <article class="block-contents">
                <img src="${srcUrl}" alt="${altText}" width="${imgWidth}" height="${imgHeight}" />
                <p id="stat">${stat}</p>
                <h3>${cardTitle}</h3>
            </article>
        `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * @typedef {object} StatContent
   * @property {string} srcUrl The path to the image used for the card.
   * @property {string} altText The alt text for the image.
   * @property {string} imgWidth The width of the image.
   * @property {string} imgHeight The height of the image.
   * @property {string} cardTitle The title describing the stat.
   * @property {number|string} stat The number showing the value of the stat.
   */

  /**
   * Gets what the contents of this card should be based off of its attributes.
   *
   * @returns {StatContent}
   */
  getContent() {
    const statType = this.getAttribute('stat-type');
    let srcUrl = '';
    let altText = '';
    let imgWidth = '';
    let imgHeight = '';
    let cardTitle = '';
    let stat = '';

    switch (statType) {
      case 'completed':
        srcUrl = '/assets/images/check.png';
        altText = 'checkmark symbol indicating completed pomos';
        imgWidth = '40';
        imgHeight = '39';
        cardTitle = 'completed pomos';
        stat = this.calculateStat().completedPomos;
        break;
      case 'distractions':
        srcUrl = '/assets/images/warning.png';
        altText = 'warning symbol indicating average distractions per pomo';
        imgWidth = '39';
        imgHeight = '38';
        cardTitle = 'average distractions per pomo';
        stat = this.calculateStat().avgDistractions;
        break;
      case 'success':
        srcUrl = '/assets/images/star.png';
        altText = 'star symbol indicating pomo success rate';
        imgWidth = '39';
        imgHeight = '39';
        cardTitle = 'pomo success rate';
        stat = this.calculateStat().successRate;
        break;
      default:
        break;
    }

    return { srcUrl, altText, imgWidth, imgHeight, stat, cardTitle };
  }

  /**
   * @typedef {object} StatValues
   * @property {number} completedPomos How many pomos have been completed.
   * @property {string} avgDistractions How many distractions have occurred.
   * @property {string} successRate A string representation of the percent of pomos completed.
   */

  /**
   * Goes through the statsList in localStorage and calculates all the
   * relevant data for the stats being tracked in the given time period.
   *
   * The time period is established via the stat-length attribute.
   *
   * @returns {StatValues}
   */
  calculateStat() {
    const statLength = this.getAttribute('stat-length');
    const statsList = JSON.parse(localStorage.getItem('statsList')) ?? [];
    const today = new Date();
    let numPomos = Number(localStorage.getItem('todayPomo'));
    let completedPomos = Number(localStorage.getItem('sessionCounter'));
    let distractions = Number(localStorage.getItem('distractCounter'));

    // eslint-disable-next-line no-restricted-syntax
    for (const statsItem of statsList) {
      const daysPassed = Math.floor(
        Math.abs(today - new Date(statsItem.day)) / (1000 * 60 * 60 * 24)
      );
      if (daysPassed > 30) {
        // Remove all items starting from the item that passes 30 days
        statsList.splice(statsList.indexOf(statsItem));
      }

      if (daysPassed < statLength) {
        numPomos += statsItem.pomoCount;
        distractions += statsItem.distractions;
        completedPomos += statsItem.completedPomos;
      }
    }

    let avgDistractions = '';
    let successRate = '';
    if (completedPomos === 0) {
      avgDistractions = '0';
      successRate = '0%';
    } else {
      avgDistractions = (distractions / numPomos).toFixed(1);
      successRate = `${((completedPomos / numPomos) * 100).toFixed(2)}%`;
    }

    return { completedPomos, avgDistractions, successRate };
  }

  /**
   * Recalculates the stat value for this card.
   *
   * Called by the stats-page after the Reset stats button is pressed.
   */
  reset() {
    const { stat } = this.getContent();

    const value = this.shadowRoot.getElementById('stat');
    value.textContent = stat;
  }
}

window.customElements.define('stats-card', StatsCard);
