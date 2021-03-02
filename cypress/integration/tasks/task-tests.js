// This test should go through the following general features:
// Add task -> edit task -> move task -> complete task -> delete task
describe('Tasks tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/source/index.html');
  });

  it('Add task modal appears when add task-btn is clicked', () => {
    cy.get('#add-task-modal').should('have.css', 'display', 'none');
    cy.get('#add-task-btn').click();
    cy.get('#add-task-modal').should('have.css', 'display', 'block');
  });

  it('Add task modal appears when add-task-btn-bot is clicked', () => {
    cy.get('#add-task-modal').should('have.css', 'display', 'none');
    cy.get('#add-task-btn').click();
    cy.get('#add-task-modal').should('have.css', 'display', 'block');
  });

  it('Add two tasks, edit them, complete them, and then delete them', () => {
    cy.get('#add-task-btn').click();
    cy.get('#task-name').clear().type('testname1');
    cy.get('#task-num').clear().type('1');
    cy.get('#task-note').clear().type('Notes for testname1');
    cy.get('#save-btn').click();
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find('[name="testname1"]')
      .should('exist');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find('[name="testname1"]')
      .then(($el) => {
        expect($el).to.have.attr('number', 1);
        expect($el).to.have.attr('current', 0);
      });
    cy.get('#add-task-btn').click();
    cy.get('#task-name').clear().type('testname2');
    cy.get('#task-num').clear().type('2');
    cy.get('#task-note').clear().type('Notes for testname2');
    cy.get('#save-btn').click();
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find('[name="testname2"]')
      .should('exist');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find('[name="testname2"]')
      .then(($el) => {
        expect($el).to.have.attr('number', 2);
        expect($el).to.have.attr('current', 0);
      });
  });
});
