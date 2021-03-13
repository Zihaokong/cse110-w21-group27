const { HeaderComp } = require('../../../source/header-comp');

describe('Header Tests', () => {
  const firstName = 'testname1';
  const firstNum = 1;
  const firstNotes = 'Notes for testname1';

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/source/index.html');
  });

  it('Check for correct header after entering website', () => {
    cy.get('#header').shadow().find('#date').contains(HeaderComp.createDate());
    cy.get('#header')
      .shadow()
      .find('#completed-cycle')
      .contains('| Completed Cycles: 0');
    cy.get('#header')
      .shadow()
      .find('#cycle-count')
      .children('.dot')
      .should('have.length', 4);
    cy.get('#header')
      .shadow()
      .find('#cycle-count')
      .children('.filled-dot')
      .should('have.length', 0);
  });

  it('Test header after 4 cycles', () => {
    cy.clock();
    cy.get('#add-task-btn').click();
    cy.get('#task-name').clear().type(firstName);
    cy.get('#task-num').clear().type(firstNum);
    cy.get('#task-note').clear().type(firstNotes);
    cy.get('#save-btn').click();
    for (let i = 0; i < 4; i++) {
      cy.get('#header')
        .shadow()
        .find('#completed-cycle')
        .contains(`| Completed Cycles: ${i}`);
      cy.get('#header')
        .shadow()
        .find('#cycle-count')
        .children('.dot')
        .should('have.length', 4 - i);
      cy.get('#header')
        .shadow()
        .find('#cycle-count')
        .children('.filled-dot')
        .should('have.length', i);
      cy.get('#main-container')
        .shadow()
        .find('#main-list')
        .find(`[name="${firstName}"]`)
        .shadow()
        .find('#play-btn')
        .click({ force: true });
      cy.get('#start-btn').click();
      cy.tick(5000);
      if ((i + 1) % 4 === 0) {
        cy.get('#start-button-long').click();
      } else {
        cy.get('#start-button').click();
      }
      cy.get('#header')
        .shadow()
        .find('#completed-cycle')
        .contains(`| Completed Cycles: ${i + 1}`);
      if (i !== 3) {
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.dot')
          .should('have.length', 3 - i);
      } else {
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.dot')
          .should('not.exist');
      }
      cy.get('#header')
        .shadow()
        .find('#cycle-count')
        .children('.filled-dot')
        .should('have.length', i + 1);
      cy.tick(5000);
      cy.get('#change-btn').click();
      cy.get('#header')
        .shadow()
        .find('#cycle-count')
        .children('.dot')
        .should('have.length', 3 - i);
      cy.get('#header')
        .shadow()
        .find('#cycle-count')
        .children('.filled-dot')
        .should('have.length', i + 1);
    }
  });

  it('Test header after 100 cycles', () => {
    cy.clock();
    for (let session = 0; session < 100; session++) {
      cy.get('#header')
        .shadow()
        .find('#completed-cycle')
        .contains(`| Completed Cycles: ${session}`);
      if (session < 5) {
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.dot')
          .should('have.length', 4 - session);
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.filled-dot')
          .should('have.length', session);
      } else {
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.dot')
          .should('have.length', 3 - ((session - 1) % 4));
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.filled-dot')
          .should('have.length', ((session - 1) % 4) + 1);
      }
      cy.get('#main-container')
        .shadow()
        .find('#main-list')
        .find(`[name="${firstName}"]`)
        .shadow()
        .find('#play-btn')
        .click({ force: true });
      cy.get('#start-btn').click();
      cy.tick(5000);
      if ((session + 1) % 4 === 0) {
        cy.get('#start-button-long').click();
      } else {
        cy.get('#start-button').click();
      }
      cy.get('#header')
        .shadow()
        .find('#completed-cycle')
        .contains(`| Completed Cycles: ${session + 1}`);
      if (session < 4) {
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.dot')
          .should('have.length', 3 - session);
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.filled-dot')
          .should('have.length', session + 1);
      } else {
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.dot')
          .should('have.length', 3 - (session % 4));
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.filled-dot')
          .should('have.length', (session % 4) + 1);
      }
      cy.tick(5000);
      cy.get('#change-btn').click();
      if (session < 4) {
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.dot')
          .should('have.length', 3 - session);
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.filled-dot')
          .should('have.length', session + 1);
      } else {
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.dot')
          .should('have.length', 3 - (session % 4));
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.filled-dot')
          .should('have.length', (session % 4) + 1);
      }
    }
  });
});
