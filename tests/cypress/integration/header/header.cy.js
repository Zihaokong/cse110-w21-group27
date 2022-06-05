/* eslint-disable cypress/no-unnecessary-waiting */
describe('Header Tests', () => {
  const firstName = 'testname1';
  const firstNum = 1;

  beforeEach(() => {
    cy.clock(new Date());
    cy.visit('http://127.0.0.1:5501/tasks-page/tasks.html');
  });

  it('Check for correct header after entering website', () => {
    cy.get('header-comp')
      .shadow()
      .find('#cycle-count')
      .children('.dot')
      .should('have.length', 4);
    cy.get('header-comp')
      .shadow()
      .find('#cycle-count')
      .children('.filled-dot')
      .should('have.length', 0);
  });

  it('Test header after 4 cycles', () => {
    cy.get('task-list').shadow().find('input[content="title"]').type(firstName);
    cy.get('task-list').shadow().find('input[content="count"]').type(firstNum);
    cy.get('task-list').shadow().find('button[type="submit"]').click();
    for (let i = 0; i < 4; i++) {
      cy.get('header-comp')
        .shadow()
        .find('#cycle-count')
        .children('.dot')
        .should('have.length', 4 - i);
      cy.get('header-comp')
        .shadow()
        .find('#cycle-count')
        .children('.filled-dot')
        .should('have.length', i);
      cy.get('task-list')
        .shadow()
        .find('task-item')
        .shadow()
        .find('button[job="play"]')
        .click();
      cy.get('timer-buttons').shadow().find('.start-button').click();
      cy.tick(1600000);
      cy.wait(2000);
      cy.get('timer-buttons').shadow().find('#break-button').click();

      cy.tick(900000);
      cy.get('timer-buttons').shadow().find('#change-btn').click();
      if (i !== 3) {
        cy.get('header-comp')
          .shadow()
          .find('#cycle-count')
          .children('.dot')
          .should('have.length', 3 - i);
        cy.get('header-comp')
          .shadow()
          .find('#cycle-count')
          .children('.filled-dot')
          .should('have.length', i + 1);
      } else {
        cy.get('header-comp')
          .shadow()
          .find('#cycle-count')
          .children('.dot')
          .should('have.length', 4);
        cy.get('header-comp')
          .shadow()
          .find('#cycle-count')
          .children('.filled-dot')
          .should('have.length', 0);
      }
    }
  });
});
