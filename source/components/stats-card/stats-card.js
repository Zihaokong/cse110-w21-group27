class StatsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = './stats-card.css';

    this.shadowRoot.appendChild(styleSheet);
  }

  connectedCallback() {
    const { srcUrl, altText, imgWidth, imgHeight, stat, cardTitle } =
      this.getContent();

    const template = document.createElement('template');
    template.innerHTML = `
            <article class="block-contents">
                <img src="${srcUrl}" alt="${altText}" width="${imgWidth}" height="${imgHeight}" />
                <p id="todayPomos">${stat}</p>
                <h3>${cardTitle}</h3>
            </article>
        `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

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
        console.log('Bad attribute');
    }

    return { srcUrl, altText, imgWidth, imgHeight, stat, cardTitle };
  }

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

      if (daysPassed < 0 || daysPassed > statLength) {
        break;
      }

      numPomos += statsItem.pomoCount;
      distractions += statsItem.distractions;
      completedPomos += statsItem.completedPomos;
    }

    let avgDistractions = '';
    let successRate = '';
    if (completedPomos === 0) {
      avgDistractions = '0';
      successRate = '0%';
    } else {
      avgDistractions = (distractions / completedPomos).toFixed(1);
      successRate = `${((completedPomos / numPomos) * 100).toFixed(2)}%`;
    }

    return { completedPomos, avgDistractions, successRate };
  }
}

window.customElements.define('stats-card', StatsCard);
