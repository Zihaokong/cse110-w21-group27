describe('Empty Test (Meant to be filled with main E2E tests for website)', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/source/index.html');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });
});
