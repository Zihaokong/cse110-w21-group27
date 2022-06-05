// This test should go through the following general features:
// Add task -> edit task -> move task -> complete task -> delete task
describe('Tasks tests', () => {
  const firstName = 'testname1';
  const firstNum = 1;
  const firstNotes = 'Notes for testname1';
  const secondName = 'testname2';
  const secondNum = 2;
  const secondNotes = 'Notes for testname2';
  const firstNameEdited = 'testname1edit';
  const firstNumEdited = 3;

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/tasks-page/tasks.html');
  });

  it('Add a single task and check it was added', () => {
    // type task title
    cy.get('task-list').shadow().find('input[content="title"]').type('task1');
    // type task count
    cy.get('task-list')
      .shadow()
      .find('input[content="count"]')
      .click()
      .type('4');
    cy.get('task-list').shadow().find('form > button').click();
    // check added task is correct
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > h1')
      .contains('task1');
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > progress-container > progress-bar')
      .contains('4');
  });

  it('Add two tasks', () => {
    // // task 1
    // // type task1 title
    // cy.get('task-list').shadow().find('input[content="title"]').type('task1');
    // // type task1 count
    // cy.get('task-list')
    //   .shadow()
    //   .find('input[content="count"]')
    //   .click()
    //   .type('4');
    // cy.get('task-list').shadow().find('form > button').click();
    // // task 2
    // // type task1 title
    // cy.get('task-list').shadow().find('input[content="title"]').type('task2');
    // // type task1 count
    // cy.get('task-list')
    //   .shadow()
    //   .find('input[content="count"]')
    //   .click()
    //   .type('5');
    // cy.get('task-list').shadow().find('form > button').click();
    // // check added task is correct
    // cy.get('task-list')
    //   .shadow()
    //   .find('section > task-item')
    //   .shadow()
    //   .find('section > h1')
    //   .contains('task1');
    // cy.get('task-list')
    //   .shadow()
    //   .find('section > task-item')
    //   .shadow()
    //   .find('section > progress-container > progress-bar')
    //   .contains('6');
  });

  // it('Play modal displays correct info', () => {
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstName}"]`)
  //     .shadow()
  //     .find('#play-btn')
  //     .click({ force: true });
  //   cy.get('#timer-name').contains(firstName);
  //   cy.get('#timer-note').contains(firstName);
  // });

  // it('Delete modal displays correct info', () => {
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstName}"]`)
  //     .shadow()
  //     .find('#delete-btn')
  //     .click({ force: true });
  //   cy.get('#task-delete').contains(firstName);
  // });

  // it('Edit modal displays correct info', () => {
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstName}"]`)
  //     .shadow()
  //     .find('#edit-btn')
  //     .click({ force: true });
  //   cy.get('#edit-name').should('have.value', firstName);
  //   cy.get('#edit-num').should('have.value', firstNum);
  //   cy.get('#edit-note').should('have.value', firstNotes);
  // });

  // it('Checkmark disables play/edit button and fully completes task', () => {
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstName}"]`)
  //     .shadow()
  //     .find('#edit-btn')
  //     .should('not.be.disabled');
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstName}"]`)
  //     .shadow()
  //     .find('#play-btn')
  //     .should('not.be.disabled');
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstName}"]`)
  //     .shadow()
  //     .find('#delete-btn')
  //     .should('not.be.disabled');
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstName}"]`)
  //     .shadow()
  //     .find('#progress-bar')
  //     .should('have.attr', 'style', 'width: 0.00%;');
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstName}"]`)
  //     .shadow()
  //     .find('#checkmark')
  //     .find('#checkmark-input')
  //     .check();
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstName}"]`)
  //     .shadow()
  //     .find('#edit-btn')
  //     .should('be.disabled');
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstName}"]`)
  //     .shadow()
  //     .find('#play-btn')
  //     .should('be.disabled');
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstName}"]`)
  //     .shadow()
  //     .find('#delete-btn')
  //     .should('not.be.disabled');
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstName}"]`)
  //     .shadow()
  //     .find('#progress-bar')
  //     .should('have.attr', 'style', 'width: 100%;');
  // });

  // it('Should have tasks still on page after reload', () => {
  //   cy.reload();
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstName}"]`)
  //     .should('exist');
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstName}"]`)
  //     .then(($el) => {
  //       expect($el).to.have.attr('number', firstNum);
  //       expect($el).to.have.attr('current', 0);
  //     });
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${secondName}"]`)
  //     .should('exist');
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${secondName}"]`)
  //     .then(($el) => {
  //       expect($el).to.have.attr('number', secondNum);
  //       expect($el).to.have.attr('current', 0);
  //     });
  // });

  // it('Edit first task, and then delete it', () => {
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstName}"]`)
  //     .shadow()
  //     .find('#checkmark')
  //     .find('#checkmark-input')
  //     .click();
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstName}"]`)
  //     .shadow()
  //     .find('#edit-btn')
  //     .click({ force: true });
  //   cy.get('#edit-name').clear();
  //   cy.get('#edit-name').type(firstNameEdited);
  //   cy.get('#edit-num').clear();
  //   cy.get('#edit-num').type(firstNumEdited);
  //   cy.get('#edit-note').clear();
  //   cy.get('#edit-note').type('Notes for testname1 edited');
  //   cy.get('#edit-save-btn').click();
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstNameEdited}"]`)
  //     .should('exist');
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstNameEdited}"]`)
  //     .then(($el) => {
  //       expect($el).to.have.attr('number', firstNumEdited);
  //       expect($el).to.have.attr('current', 0);
  //     });
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstNameEdited}"]`)
  //     .shadow()
  //     .find('#delete-btn')
  //     .click({ force: true });
  //   cy.get('#confirm-button').click();
  //   cy.get('#main-container')
  //     .shadow()
  //     .find('#main-list')
  //     .find(`[name="${firstNameEdited}"]`)
  //     .should('not.exist');
  // });
});
