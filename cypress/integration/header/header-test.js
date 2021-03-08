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

  it('Test header after 1 cycle', () => {
    cy.get('#add-task-btn').click();
    cy.get('#task-name').clear().type(firstName);
    cy.get('#task-num').clear().type(firstNum);
    cy.get('#task-note').clear().type(firstNotes);
    cy.get('#save-btn').click();
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#play-btn')
      .click({ force: true });
    cy.get('#start-btn').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000);
    cy.get('#start-button').click();
    cy.get('#header')
      .shadow()
      .find('#completed-cycle')
      .contains('| Completed Cycles: 1');
    cy.get('#header')
      .shadow()
      .find('#cycle-count')
      .children('.dot')
      .should('have.length', 3);
    cy.get('#header')
      .shadow()
      .find('#cycle-count')
      .children('.filled-dot')
      .should('have.length', 1);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000);
    cy.get('#change-btn').click();
    cy.get('#header')
      .shadow()
      .find('#cycle-count')
      .children('.dot')
      .should('have.length', 3);
    cy.get('#header')
      .shadow()
      .find('#cycle-count')
      .children('.filled-dot')
      .should('have.length', 1);
    for (let i = 1; i < 10; i++) {
      cy.get('#header')
        .shadow()
        .find('#completed-cycle')
        .contains(`| Completed Cycles: ${i}`);
      cy.get('#header')
        .shadow()
        .find('#cycle-count')
        .children('.dot')
        .should('have.length', 4 - (i % 4));
      cy.get('#header')
        .shadow()
        .find('#cycle-count')
        .children('.filled-dot')
        .should('have.length', i % 4);
      cy.get('#main-container')
        .shadow()
        .find('#main-list')
        .find(`[name="${firstName}"]`)
        .shadow()
        .find('#play-btn')
        .click({ force: true });
      cy.get('#start-btn').click();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(4000);
      cy.get('#start-button').click();
      cy.get('#header')
        .shadow()
        .find('#completed-cycle')
        .contains(`| Completed Cycles: ${i}`);
      cy.get('#header')
        .shadow()
        .find('#cycle-count')
        .children('.dot')
        .should('have.length', 3);
      cy.get('#header')
        .shadow()
        .find('#cycle-count')
        .children('.filled-dot')
        .should('have.length', 1);
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(4000);
      cy.get('#change-btn').click();
      cy.get('#header')
        .shadow()
        .find('#cycle-count')
        .children('.dot')
        .should('have.length', 3);
      cy.get('#header')
        .shadow()
        .find('#cycle-count')
        .children('.filled-dot')
        .should('have.length', 1);
    }
  });
});
