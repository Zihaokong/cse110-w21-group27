/**
 * This file defines the <header-comp> web components and its functions,
 * also implements the behaviors of header.
 */

/**
 * HeaderComp is the web component of custom header;
 * this represents the current date and completed cycles count
 */
class HeaderComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
  }

  get completedCycles() {
    return this.completed;
  }

  get cycleCount() {
    return this.count;
  }

  // the browser calls this method when aheader-comp element is added to the document
  connectedCallback() {
    this.completed = localStorage.getItem('sessionCounter');
    this.count = 4 - (this.completed % 4);
    const nav = document.createElement('nav');
    nav.setAttribute('class', 'top-nav');
    const date = document.createElement('h2');
    date.setAttribute('id', 'date');
    date.innerText = HeaderComp.createDate()
      ? HeaderComp.createDate()
      : `Today's date`;
    const section = document.createElement('section');
    section.setAttribute('id', 'cycle-count');
    section.innerHTML = `      
    <span>
      <h2 id="completed-cycle" style="display: inline; color: #c4c4c4">
        | Not yet completed
      </h2>
    </span>`;
    nav.appendChild(date);
    nav.appendChild(section);
    this.shadowRoot.innerHTML = HeaderComp.headerStyle();
    this.shadowRoot.appendChild(nav);
    this.renderCounter();
    this.renderCompletedCount();
    this.renderText();
  }

  /**
   * create unfilled circle for cycles
   */
  renderCounter() {
    const shadow = this.shadowRoot;
    if (this.completedCycles === '0') {
      for (let i = 0; i < 4; i++) {
        const newCycle = document.createElement('span');
        newCycle.setAttribute('class', 'dot');
        shadow.getElementById('cycle-count').prepend(newCycle);
      }
    } else if (this.completedCycles % 4 !== 0) {
      for (let i = 0; i < this.cycleCount; i++) {
        const newCycle = document.createElement('span');
        newCycle.setAttribute('class', 'dot');
        shadow.getElementById('cycle-count').prepend(newCycle);
      }
    }
  }

  /**
   * create filled circle for completed cycles
   */
  renderCompletedCount() {
    if (this.completedCycles % 4 === 0 && this.completedCycles !== '0') {
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
   * Render the text shown on header
   */
  renderText() {
    const cycleText = this.shadowRoot.getElementById('completed-cycle');
    cycleText.innerText = `| Completed Cycles: ${this.completedCycles}`;
  }

  /**
   * Method for creating styles for this component
   * @return the styles tag with css embedded code
   */
  static headerStyle() {
    return `<style>
      .dot {
        height: 10px;
        width: 10px;
        padding: 10px;
        margin-right: 5px;
        background-color: #e5e5e5;
        border-radius: 77%;
        border: 2px solid #ef7869;
        display: inline-block;
      }
      
      .filled-dot {
        height: 10px;
        width: 10px;
        padding: 10px;
        margin-right: 5px;
        background-color: #f2998e;
        border-radius: 77%;
        border: 2px solid #ef7869;
        display: inline-block;
      }
      
      .top-nav {
        background: #2e4756;
        margin: 0;
        padding-top: 1%;
        padding-left: 50px;
        padding-bottom: 5px;
        width: 100%;
        color: #e5e5e5;
        font-size: 24px;
      }
      
      h2 {
        margin-top: 0;
        display: inline; 
        color:#C4C4C4;
        font-size: 1.5em;
        text-align: left;
        font-weight: bold;
        font-family: "Poppins", sans-serif;
      }
      
      </style>`;
  }

  /**
   * Method for creating Date object and get the local current Date
   * @return today's date
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
}

customElements.define('header-comp', HeaderComp);

if (typeof exports !== 'undefined') {
  module.exports = {
    HeaderComp,
  };
}
