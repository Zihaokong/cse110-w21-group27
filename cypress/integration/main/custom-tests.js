describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/source/index.html');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });
});
