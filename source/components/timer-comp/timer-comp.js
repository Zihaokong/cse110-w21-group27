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
    if (name === 'data-minutes-left') {
      if (newValue < 10) {
        this.shadowRoot.getElementById('minutes').innerHTML = `0${newValue}`;
      } else {
        this.shadowRoot.getElementById('minutes').innerHTML = `${newValue}`;
      }
    } else if (newValue < 10) {
      document.getElementById('seconds').innerHTML = `0${newValue}`;
    } else {
      document.getElementById('seconds').innerHTML = `${newValue}`;
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
    progressRing.setAttribute('height', '27.5rem');
    progressRing.setAttribute('width', '27.5rem');

    const progressRingCircle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    progressRingCircle.setAttribute('id', 'progress-ring-circle');
    progressRingCircle.setAttribute('stroke-width', '40');
    progressRingCircle.setAttribute('fill', 'transparent');
    progressRingCircle.setAttribute('r', '200');
    progressRingCircle.setAttribute('cx', '13.75rem');
    progressRingCircle.setAttribute('cy', '13.75rem');
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

    this.resetProgressRing();
  }
}

customElements.define('timer-comp', TimerComp);

if (typeof exports !== 'undefined') {
  module.exports = {
    TimerComp,
  };
}
