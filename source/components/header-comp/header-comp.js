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

    // Create image
    const brand = document.createElement('div');
    brand.className = 'brand';
    const logo = document.createElement('img');
    logo.src = '/assets/images/logo-white.svg';
    logo.width = '68';
    logo.height = '68';
    const title = document.createElement('h1');
    title.textContent = 'Tomo';

    brand.appendChild(logo);
    brand.appendChild(title);

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

    const settingButton = document.createElement('button');
    settingButton.textContent = 'settings';
    settingButton.addEventListener('click', () => {
      settings.showModal();
    });
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
    navBar.appendChild(settingButton);

    // Append the date and section to the nav element
    section.appendChild(brand);
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
    const settings = this.renderSettings();
  }

  /**
   * Called when an attribute's value is changed. Specifically used to change
   * The completed cycles and to remove the nav section when the timer starts.
   * @param {String} name The name of the attribute being changed
   * @param {String} oldValue The old value of the given attribute
   * @param {String} newValue The new value of the given attribute
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'completedcycles' || name === 'isnewcycle') {
      const circleSection = this.shadowRoot.querySelector('#cycle-count');

      // check if section is loaded
      if (circleSection) {
        circleSection.innerHTML = '';
        this.renderCounter();
        this.renderCompletedCount();
      }
    }

    if (name === 'page' && this.shadowRoot.querySelector('nav')) {
      console.log(name);
      console.log(newValue);
      this.shadowRoot
        .querySelector('nav')
        .setAttribute('hidden', newValue === 'timerRunning');
    }
  }

  /**
   * Renders the pomo counter in the header (bottom left).
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
  renderSettings() {
    // Create the settings dialog
    const settings = document.createElement('dialog');

    // Create the settings header
    const header = document.createElement('h2');
    header.textContent = 'Settings';

    // Create the form
    const form = document.createElement('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      localStorage.setItem('timerMinutes', workSessionInput.value);
      localStorage.setItem('shortBreakMinutes', shortBreakSessionInput.value);
      localStorage.setItem('longBreakMinutes', longBreakSessionInput.value);
      localStorage.setItem('volumePercentage', VolumeInput.value);
      localStorage.setItem('autoContinue', AutoInput.checked);

      // If the page is on the timer, then set up the timer visuals to change.
      if (this.page === 'timer') {
        let timerMinutes = 0;

        // Get what the timer minute count should be from local storage.
        if (localStorage.getItem('shortBreak') === 'true') {
          timerMinutes = shortBreakSessionInput.value;
        } else if (localStorage.getItem('LongBreak') === 'true') {
          timerMinutes = longBreakSessionInput.value;
        } else {
          timerMinutes = workSessionInput.value;
        }

        const minuteElement = document.getElementById('minutes');
        const titleElement = document.getElementById('title_timer');

        // Set up the minutes and title_timer changes caused by the settings.
        if (minuteElement && titleElement) {
          if (timerMinutes < 10) {
            minuteElement.innerHTML = `0${timerMinutes}`;
          } else {
            minuteElement.innerHTML = `${timerMinutes}`;
          }
          titleElement.innerHTML = `${timerMinutes}:00`;
        }
      }

      settings.close();
    });

    // Work Session Option
    const workSessionLabel = document.createElement('label');
    workSessionLabel.textContent = 'Work Session Length: ';
    const workSessionInput = document.createElement('input');
    workSessionInput.type = 'number';
    workSessionInput.min = 1;
    workSessionInput.max = 99;
    workSessionInput.value = localStorage.getItem('timerMinutes') || 25;
    workSessionInput.setAttribute('job', 'work');
    workSessionLabel.appendChild(workSessionInput);

    // Short Break Option
    const shortBreakSessionLabel = document.createElement('label');
    shortBreakSessionLabel.textContent = 'Short Break Length: ';
    const shortBreakSessionInput = document.createElement('input');
    shortBreakSessionInput.type = 'number';
    shortBreakSessionInput.min = 1;
    shortBreakSessionInput.max = 99;
    shortBreakSessionInput.value =
      localStorage.getItem('shortBreakMinutes') || 5;
    shortBreakSessionInput.setAttribute('job', 'shortBreak');
    shortBreakSessionLabel.appendChild(shortBreakSessionInput);

    // Long Break Option
    const longBreakSessionLabel = document.createElement('label');
    longBreakSessionLabel.textContent = 'Long Break Length: ';
    const longBreakSessionInput = document.createElement('input');
    longBreakSessionInput.type = 'number';
    longBreakSessionInput.min = 1;
    longBreakSessionInput.max = 99;
    longBreakSessionInput.value =
      localStorage.getItem('longBreakMinutes') || 15;
    longBreakSessionInput.setAttribute('job', 'longBreak');
    longBreakSessionLabel.appendChild(longBreakSessionInput);

    // Volume Option

    const VolumeContainer = document.createElement('div');

    const VolumeLabel = document.createElement('label');
    VolumeLabel.textContent = 'Volume: ';
    const VolumeInput = document.createElement('input');
    VolumeInput.type = 'range';
    VolumeInput.min = 0;
    VolumeInput.max = 100;
    VolumeInput.value = localStorage.getItem('volumePercentage') || 100;
    VolumeInput.setAttribute('job', 'volume');

    const VolumeTest = document.createElement('button');
    VolumeTest.className = '.icon';
    VolumeTest.textContent = 'volume_up';
    VolumeTest.type = 'button';
    VolumeTest.addEventListener('click', () => {
      const audio = new Audio('/assets/audio/break-tune.mp3');
      audio.volume = VolumeInput.value / 100.0;
      audio.play();
    });
    VolumeLabel.appendChild(VolumeInput);
    VolumeContainer.appendChild(VolumeLabel);
    VolumeContainer.appendChild(VolumeTest);

    // Auto Increment Option
    const AutoLabel = document.createElement('label');
    AutoLabel.textContent = 'Auto Timer Enabled: ';
    const AutoInput = document.createElement('input');
    AutoInput.type = 'checkbox';
    AutoInput.checked = localStorage.getItem('autoContinue') === 'true';
    AutoInput.setAttribute('job', 'auto');
    AutoLabel.appendChild(AutoInput);

    const buttonContainer = document.createElement('div');

    const SubmitButton = document.createElement('button');
    SubmitButton.className = '.icon';
    SubmitButton.textContent = 'check_circle';
    SubmitButton.type = 'submit';

    const CancelButton = document.createElement('button');
    CancelButton.className = '.icon';
    CancelButton.textContent = 'cancel';
    CancelButton.type = 'button';
    CancelButton.addEventListener('click', () => {
      workSessionInput.value = localStorage.getItem('timerMinutes') || 25;
      shortBreakSessionInput.value =
        localStorage.getItem('shortBreakMinutes') || 5;
      longBreakSessionInput.value =
        localStorage.getItem('longBreakMinutes') || 15;
      VolumeInput.value = localStorage.getItem('volumePercentage') || 100;
      AutoInput.checked = localStorage.getItem('autoContinue') === 'true';
      settings.close();
    });

    buttonContainer.appendChild(SubmitButton);
    buttonContainer.appendChild(CancelButton);

    form.appendChild(workSessionLabel);
    form.appendChild(shortBreakSessionLabel);
    form.appendChild(longBreakSessionLabel);
    form.appendChild(VolumeContainer);
    form.appendChild(AutoLabel);
    form.appendChild(buttonContainer);

    settings.appendChild(header);
    settings.appendChild(form);

    this.shadowRoot.appendChild(settings);

    return settings;
  }
}

customElements.define('header-comp', HeaderComp);

if (typeof exports !== 'undefined') {
  module.exports = {
    HeaderComp,
  };
}
