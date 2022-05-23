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
  /**
   * Constructor which attaches a shadow root to this element in open mode
   */
  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
  }

  static get observedAttributes() {
    return ['completedcycles', 'isnewcycle', 'page'];
  }

  /**
   * Gets the amount of completed cycles.
   */
  get completedCycles() {
    return this.getAttribute('completedcycles');
  }

  /**
   * sets the amount of completed cycles
   */
  set completedCycles(newValue) {
    this.setAttribute('completedcycles', newValue);
  }

  /**
   * Gets whether it is newcycle.
   */
  get isNewCycle() {
    return this.getAttribute('isnewcycle');
  }

  /**
   * Set isnewcycle
   */
  set isNewCycle(newValue) {
    this.setAttribute('isnewcycle', newValue);
  }

  /**
   * Gets whether it is newcycle.
   */
  get page() {
    return this.getAttribute('page');
  }

  /**
   * Set isnewcycle
   */
  set page(newValue) {
    this.setAttribute('page', newValue);
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
    taskLink.setAttribute('onClick', 'location.href="/"');

    const statLink = document.createElement('button');
    statLink.textContent = 'bar_chart';
    statLink.setAttribute('onClick', 'location.href="/stats-page/stats.html"');

    const settingButton = document.createElement('button');
    settingButton.textContent = 'settings';
    settingButton.setAttribute('id', 'settingButton');
    
    const timerLink = document.createElement('button');
    timerLink.textContent = 'timer';
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
    navBar.appendChild(settingButton);

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
    this.shadowRoot
      .getElementById('settingButton')
      .addEventListener('click', settingPopUpControl);

    // Setup and render the circles in the cycle counter as well as the date.
    this.renderCounter();
    this.renderCompletedCount();
    this.renderSettingPopUp();
    document
      .getElementById('saveSettingButton')
      .addEventListener('click', updateAll);
  }

  attributeChangedCallback(name) {
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
   * Create and renders the settings pop up page
   */
  renderSettingPopUp() {
    const settingsPopUp = document.createElement('dialog');
    settingsPopUp.style.display = 'none';
    settingsPopUp.setAttribute('id', 'settingsPopup');
    /* Get the values from local storage */
    const timerMinutes = localStorage.getItem('timerMinutes') || 25;
    const shortBreakMinutes = localStorage.getItem('shortBreakMinutes') || 5;
    const longBreakMinutes = localStorage.getItem('longBreakMinutes') || 15;
    const volumePercentage = localStorage.getItem('volumePercentage') || 100;
    const timerContinuance =
      localStorage.getItem('timerContinuance') === 'true'
        ? 'checked= "true"'
        : '';
    settingsPopUp.innerHTML =
      '<p id="settingsHeader">Settings</p>\n' +
      '  <div id="settingsContent">\n' +
      '    <div id="customTimeGroup">\n' +
      '      <div id="timerMinutesSelector">\n' +
      '        <label>\n' +
      '          Work Session length:<br>\n' +
      `          <input id="timerMinutes" type="number" min="1" max="99" step="1" value="${timerMinutes}">\n` +
      '        </label>\n' +
      '      </div>\n' +
      '      <div id="shortBreakMinutesSelector">\n' +
      '        <label>\n' +
      '          Short Break length:<br>\n' +
      `          <input id="shortBreakMinutes" type="number" min="1" max="99" step="1" value="${shortBreakMinutes}">\n` +
      '        </label>\n' +
      '      </div>\n' +
      '      <div id="longBreakMinutesSelector">\n' +
      '        <label>\n' +
      '          Long Break length:<br>\n' +
      `          <input id="longBreakMinutes" type="number" min="1" max="99" step="1" value="${longBreakMinutes}">\n` +
      '        </label>\n' +
      '      </div>\n' +
      '    </div>\n' +
      '    <div id="volumeSelector">\n' +
      '      <label>Control the volumes</label>\n' +
      `      <input id="volumePercentage" type="range" min="0" max="100" value="${volumePercentage}">\n` +
      '    </div>\n' +
      '    <div>\n' +
      '      <div id="timerContinuanceSelector">\n' +
      '        <label for="timer continuance">Auto transit into break after work done:</label><br>\n' +
      '        <label name="timer continuance" className="switch">\n' +
      `          <input type="checkbox" id="timerContinuance" ${timerContinuance}>\n` +
      '            <span className="slider round"></span>\n' +
      '        </label>\n' +
      '      </div>\n' +
      '    </div>\n' +
      '    <button id="saveSettingButton">save</button>\n' +
      '  </div>';
    this.document.body.appendChild(settingsPopUp);
  }
}

/**
 * Used to control the pop-up of the setting page. If the setting icon is clicked, the setting menu will transit between being displayed and not being diplayed.
 */
function settingPopUpControl() {
  document.getElementById('settingsPopup').style.display =
    document.getElementById('settingsPopup').style.display === 'none'
      ? 'block'
      : 'none';
}

/**
 * A helper function used to update local storage variables
 * @param dataName the name of the local storage variable,
 * currently the HTML element's ID should be the same as the name for the local storage.
 */
function updateLocalStorage(dataName) {
  if (dataName === 'timerContinuance') {
    localStorage.setItem(dataName, document.getElementById(dataName).checked);
  } else {
    localStorage.setItem(dataName, document.getElementById(dataName).value);
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

/**
 * Update all the local storage variables.
 */
function updateAll() {
  [
    'timerMinutes',
    'shortBreakMinutes',
    'timerContinuance',
    'volumePercentage',
  ].forEach((data) => updateLocalStorage(data));
}

customElements.define('header-comp', HeaderComp);

if (typeof exports !== 'undefined') {
  module.exports = {
    HeaderComp,
  };
}
