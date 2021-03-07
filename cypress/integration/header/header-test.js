describe('Header Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/source/index.html');
  });
  it('Check for correct header after entering website', () => {
    cy.get(document.getElementByTagName('header-comp'));
  });
});
