/**
 * This file defines the <timer-comp> web components and its functions,
 * also implements the behaviors of timer.
 */

// const { startTimer } = require("../../timer-page/timer");

class TimerComp extends HTMLElement {
  static get observedAttributes() {
    return ['data-minutes-left', 'data-seconds-left', 'data-running'];
  }

  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
  }

  set dataMinutesLeft(newValue) {
    this.setAttribute('data-minutes-left', newValue);
  }

  set dataSecondsLeft(newValue) {
    this.setAttribute('data-seconds-left', newValue);
  }

  set dataRunning(newValue) {
    this.setAttribute('data-running', newValue);
  }

  get dataMinutesLeft() {
    return this.getAttribute('data-minutes-left');
  }

  get dataSecondsLeft() {
    return this.getAttribute('data-seconds-left');
  }

  get dataRunning() {
    return this.getAttribute('data-running');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-running') {
      if (newValue === 'true') {
        this.start();
      }
    } else if (name === 'data-minutes-left') {
      if (newValue < 10) {
        this.shadowRoot.getElementById('minutes').innerHTML = `0${newValue}`;
      } else {
        this.shadowRoot.getElementById('minutes').innerHTML = `${newValue}`;
      }
      this.resetProgressRing();
    } else if (name === 'data-seconds-left') {
      if (newValue < 10) {
        this.shadowRoot.getElementById('seconds').innerHTML = `0${newValue}`;
      } else {
        this.shadowRoot.getElementById('seconds').innerHTML = `${newValue}`;
      }
      this.resetProgressRing();
    }
  }

  connectedCallback() {
    const timerContainer = document.createElement('div');
    timerContainer.setAttribute('class', 'container timer');

    const numberDisplay = document.createElement('span');
    numberDisplay.setAttribute('class', 'container');

    const minutes = document.createElement('h4');
    minutes.setAttribute('id', 'minutes');

    const colon = document.createElement('h4');
    colon.textContent = ':';

    const seconds = document.createElement('h4');
    seconds.setAttribute('id', 'seconds');

    const progressRing = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    progressRing.setAttribute('class', 'progress-ring');
    progressRing.setAttribute('height', '27.5em');
    progressRing.setAttribute('width', '27.5em');

    const progressRingCircle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    progressRingCircle.setAttribute('id', 'progress-ring-circle');
    progressRingCircle.setAttribute('stroke-width', '40');
    progressRingCircle.setAttribute('fill', 'transparent');
    progressRingCircle.setAttribute('r', '200');
    progressRingCircle.setAttribute('cx', '13.75em');
    progressRingCircle.setAttribute('cy', '13.75em');
    progressRingCircle.setAttribute('stroke', '#2E4756');

    timerContainer.appendChild(numberDisplay);
    numberDisplay.appendChild(minutes);
    numberDisplay.appendChild(colon);
    numberDisplay.appendChild(seconds);

    timerContainer.appendChild(progressRing);
    progressRing.appendChild(progressRingCircle);

    const styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = '/components/timer-comp/timer-comp.css';

    this.shadowRoot.appendChild(styleSheet);
    this.shadowRoot.appendChild(timerContainer);

    /* Set progress of timer */
    const r = progressRingCircle.getAttribute('r');
    const radius = parseInt(r, 10);
    const circumference = radius * 2 * Math.PI;
    progressRingCircle.style.strokeDasharray = circumference;
    progressRingCircle.style.strokeDashoffset = 0;
  }

  /**
   * Reset progress ring percentage to 0
   */
  resetProgressRing() {
    this.shadowRoot.getElementById(
      'progress-ring-circle'
    ).style.strokeDashoffset = 0;
  }

  /**
   * Change the style of current timer circle.
   * @param {number} percent percentage of current progress bar.
   */
  setProgress(percent) {
    const circle = this.shadowRoot.getElementById('progress-ring-circle');
    const r = circle.getAttribute('r');
    const radiust = parseInt(r, 10);
    const circumferencet = radiust * 2 * Math.PI;

    const offset = (percent / 100) * circumferencet;
    circle.style.strokeDashoffset = -offset;
  }

  /**
   * Set a timer that count down for 60 second.
   */
  start() {
    const startTime = new Date();
    const totalSeconds =
      Number(this.dataset.minutesLeft) * 60 + Number(this.dataset.secondsLeft);
    this.secondsInterval = setInterval(
      this.secondsTimer.bind(this),
      500,
      startTime,
      totalSeconds
    );
  }

  /**
   * The helper function used for setInterval() to achieve the dynamic timer functionality.
   * @param {number} startTime the start time for the timer
   * @param {number} totalSeconds the totally needed seconds for the timer to run
   */
  secondsTimer(startTime, totalSeconds) {
    const currTime = new Date();
    const elapsed = Math.floor((currTime - startTime) / 1000);
    const timeLeft = totalSeconds - elapsed;

    this.dataset.minutesLeft = Math.floor(timeLeft / 60);
    this.dataset.secondsLeft = timeLeft % 60;

    const finishedPercent = 100 - (timeLeft / totalSeconds) * 100;
    this.setProgress(finishedPercent);
    if (
      Number(this.dataset.secondsLeft) === 0 &&
      Number(this.dataset.minutesLeft <= 0)
    ) {
      this.finishedTask();
    }
  }

  finishedTask() {
    this.dataset.running = 'false';
    clearInterval(this.secondsInterval);
  }
}

customElements.define('timer-comp', TimerComp);

if (typeof exports !== 'undefined') {
  module.exports = {
    TimerComp,
  };
}
