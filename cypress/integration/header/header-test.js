const { HeaderComp } = require('../../../source/header-comp');

describe('Header Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/source/index.html');
  });
  it('Check for correct header after entering website', () => {
    cy.get('#header').shadow().find('#date').contains(HeaderComp.createDate());
    cy.get('#header')
      .shadow()
      .find('#completed-cycle')
      .contains('| Completed Cycles: 0');
  });
});
