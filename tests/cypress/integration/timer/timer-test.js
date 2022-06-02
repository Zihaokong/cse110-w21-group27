/* eslint-disable no-undef */
describe('Test timer.js and functions)', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/timer-page/timer.html');
  });

  it('Timer page initially displays no task name', () => {
    cy.get('#currTask').then(($el) => {
      expect($el).to.have.text('No Task Selected');
    });
  });

  it('short and long break not rendering before task', () => {
    cy.get('#currTask').then(($el) => {
      expect($el).to.not.have.text('Short Break');
      expect($el).to.not.have.text('Long Break');
    });
  });

  it('count distraction + 2', () => {
    cy.get('timer-buttons').shadow().find('.start-button').click();
    cy.get('timer-buttons').shadow().find('#create-skip').click();
    cy.get('timer-buttons').shadow().find('#distraction-btn').click();
    cy.get('timer-buttons').shadow().find('#distraction-btn').click();
    cy.get('timer-buttons')
      .shadow()
      .find('#distraction-btn')
      .then(($el) => {
        expect($el).to.have.attr('src', '/assets/images/tomo-neutral.png');
      });
  });

  it('click fail button and cancel', () => {
    cy.get('timer-buttons').shadow().find('.start-button').click();
    cy.get('timer-buttons').shadow().find('#create-skip').click();
    cy.get('timer-buttons').shadow().find('.fail-button').click();
    cy.get('timer-buttons')
      .shadow()
      .find('#failDialog')
      .should('have.css', 'display', 'block');
    cy.get('timer-buttons').shadow().find('.Cancel-buttons').click();
    cy.get('timer-buttons')
      .shadow()
      .find('#failDialog')
      .should('have.css', 'display', 'none');
  });

  it('click fail button and fail', () => {
    cy.get('timer-buttons').shadow().find('.start-button').click();
    cy.get('timer-buttons').shadow().find('#create-skip').click();
    cy.get('timer-buttons').shadow().find('.fail-button').click();
    cy.get('timer-buttons')
      .shadow()
      .find('#failDialog')
      .should('have.css', 'display', 'block');
    cy.get('timer-buttons').shadow().find('.fail-buttons').click();
  });

  it('long break shows up after a multiple of 4 pomos', () => {
    cy.clock();
    localStorage.setItem('sessionCounter', '11');
    cy.get('timer-buttons').shadow().find('.start-button').click();
    cy.get('timer-buttons').shadow().find('#create-skip').click();
    cy.tick(1500000);
    cy.tick(2000);
    cy.get('#currTask').then(($el) => {
      expect($el).to.have.text('Long Break');
    });
  });

  it('short break shows up after a non-multiple of 4 pomos', () => {
    cy.clock();
    localStorage.setItem('sessionCounter', '10');
    cy.get('timer-buttons').shadow().find('.start-button').click();
    cy.get('timer-buttons').shadow().find('#create-skip').click();
    cy.tick(1500000);
    cy.tick(2000);
    cy.get('#currTask').then(($el) => {
      expect($el).to.have.text('Short Break');
    });
  });

  it('starting the short break works properly', () => {
    cy.clock();
    localStorage.setItem('sessionCounter', '10');
    cy.get('timer-buttons').shadow().find('.start-button').click();
    cy.get('timer-buttons').shadow().find('#create-skip').click();
    cy.tick(1500000);
    cy.tick(2000);
    cy.get('timer-buttons').shadow().find('#break-button').click();
    cy.get('timer-buttons')
      .shadow()
      .find('#break-button')
      .should('have.css', 'display', 'none');
  });

  it('starting the long break works properly', () => {
    cy.clock();
    localStorage.setItem('sessionCounter', '11');
    cy.get('timer-buttons').shadow().find('.start-button').click();
    cy.get('timer-buttons').shadow().find('#create-skip').click();
    cy.tick(1500000);
    cy.tick(2000);
    cy.get('timer-buttons').shadow().find('#break-button').click();
    cy.get('timer-buttons')
      .shadow()
      .find('#break-button')
      .should('have.css', 'display', 'none');
  });
});
