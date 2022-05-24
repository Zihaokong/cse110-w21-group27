/**
 * This file defines the <header-comp> web components and its functions,
 * also implements the behaviors of header.
 */

/**
 * Shows the current date and the current amount of cycles completed.
 * Gets completed cycle count from local storage, if it exists. Increments and
 * saves cycle count to local storage after every completed session.
 */
class HeaderComp extends HTMLElement {
  static get observedAttributes() {
    return ['completedcycles', 'isnewcycle', 'page'];
  }

  /**
   * Constructor which attaches a shadow root to this element in open mode
   */
  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });

    // Check if user is a noob (for use with tutorials)
    if (!localStorage.getItem('isNoob')) {
      localStorage.setItem('isNoob', true);
    }
    this.isNoob = localStorage.getItem('isNoob');
  }

  /**
   * sets the amount of completed cycles
   */
  set completedCycles(newValue) {
    this.setAttribute('completedcycles', newValue);
  }

  /**
   * Set isnewcycle
   */
  set isNewCycle(newValue) {
    this.setAttribute('isnewcycle', newValue);
  }

  /**
   * Set page
   */
  set page(newValue) {
    this.setAttribute('page', newValue);
  }

  /**
   * Gets the amount of completed cycles.
   */
  get completedCycles() {
    return this.getAttribute('completedcycles');
  }

  /**
   * Gets whether it is newcycle.
   */
  get isNewCycle() {
    return this.getAttribute('isnewcycle');
  }

  /**
   * Gets whether it is newcycle.
   */
  get page() {
    return this.getAttribute('page');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'completedcycles' || name === 'isnewcycle') {
      const circleSection = this.shadowRoot.querySelector('div');

      // check if section is loaded
      if (circleSection) {
        circleSection.innerHTML = '';
        this.renderCounter();
        this.renderCompletedCount();
      }
    }
  }

  /**
   * Called when the header is applied to the DOM; Sets up the header.
   */
  connectedCallback() {
    // Get the session counter from storage.
    this.completedCycles =
      localStorage.getItem('sessionCounter') === null
        ? 0
        : localStorage.getItem('sessionCounter');
    this.isNewCycle = this.completedCycles % 4 === 0 ? 'true' : 'false';

    // Creates the nav element which houses the info of the header
    const section = document.createElement('section');

    // Create the date text.
    const date = document.createElement('h1');
    date.innerText = HeaderComp.createDate()
      ? HeaderComp.createDate()
      : `Today's date`;

    // Section of the header which shows dots and filled dots to represent
    // progress to a long break.
    const count = document.createElement('div');
    count.setAttribute('id', 'cycle-count');

    const navBar = document.createElement('nav');

    const taskLink = document.createElement('button');
    taskLink.textContent = 'list';
    taskLink.setAttribute('onClick', 'location.href="/tasks-page/tasks.html"');

    const statLink = document.createElement('button');
    statLink.textContent = 'bar_chart';
    statLink.setAttribute('onClick', 'location.href="/stats-page/stats.html"');

    const timerLink = document.createElement('button');
    timerLink.textContent = 'alarm';
    timerLink.setAttribute('onClick', 'location.href="/timer-page/timer.html"');

    switch (this.page) {
      case 'tasks':
        taskLink.disabled = true;
        break;
      case 'stats':
        statLink.disabled = true;
        break;
      case 'timer':
        timerLink.disabled = true;
        break;
      default:
        break;
    }
    navBar.appendChild(timerLink);
    navBar.appendChild(taskLink);
    navBar.appendChild(statLink);

    // Append the date and section to the nav element
    section.appendChild(date);
    section.appendChild(count);
    section.appendChild(navBar);

    // Appened the nav and styling to the shadow root.
    const styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = '/components/header-comp/header-comp.css';

    this.shadowRoot.appendChild(styleSheet);
    this.shadowRoot.appendChild(section);

    // Setup and render the circles in the cycle counter as well as the date.
    this.renderCounter();
    this.renderCompletedCount();
  }

  /**
   * Creates the text for the date element. Uses the JS Date object to generate
   * the date.
   * @returns {string} today's date
   */
  static createDate() {
    const todayDate = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return todayDate.toLocaleDateString('en-us', options);
  }

  /**
   * Creates and renders the filled dots using the new cycle and completed
   * cycles properties.
   */
  renderCompletedCount() {
    if (
      this.completedCycles % 4 === 0 &&
      this.completedCycles !== '0' &&
      this.isNewCycle === 'false'
    ) {
      for (let i = 0; i < 4; i++) {
        const newCycle = document.createElement('span');
        newCycle.setAttribute('class', 'filled-dot');
        this.shadowRoot.getElementById('cycle-count').prepend(newCycle);
      }
    } else {
      for (let i = 0; i < this.completedCycles % 4; i++) {
        const newCycle = document.createElement('span');
        newCycle.setAttribute('class', 'filled-dot');
        this.shadowRoot.getElementById('cycle-count').prepend(newCycle);
      }
    }
  }

  /**
   * Creates and renders the unfilled dots using the new cycle and completed
   * cycles properties.
   */
  renderCounter() {
    if (this.completedCycles === '0' || this.isNewCycle === 'true') {
      for (let i = 0; i < 4; i++) {
        const newCycle = document.createElement('span');
        newCycle.setAttribute('class', 'dot');
        this.shadowRoot.querySelector('#cycle-count').prepend(newCycle);
      }
    } else if (this.completedCycles % 4 !== 0) {
      for (let i = 0; i < 4 - (this.completedCycles % 4); i++) {
        const newCycle = document.createElement('span');
        newCycle.setAttribute('class', 'dot');
        this.shadowRoot.querySelector('#cycle-count').prepend(newCycle);
      }
    }
  }
}

customElements.define('header-comp', HeaderComp);

if (typeof exports !== 'undefined') {
  module.exports = {
    HeaderComp,
  };
}
