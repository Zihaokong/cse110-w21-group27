// This test should go through the following general features:
// Add task -> edit task -> move task -> complete task -> delete task

function taskExists(task, count) {
  cy.get('task-list')
    .shadow()
    .find('section > task-item')
    .shadow()
    .find('section > h1')
    .contains(`${task}`);
  cy.get('task-list')
    .shadow()
    .find('section > task-item')
    .shadow()
    .find('section > progress-container > progress-bar')
    .contains(`${count}`);
}
function addTask(task, count) {
  // type task1 title
  cy.get('task-list').shadow().find('input[content="title"]').type(`${task}`);
  // type task1 count
  cy.get('task-list')
    .shadow()
    .find('input[content="count"]')
    .click()
    .type(`${count}`);
  cy.get('task-list').shadow().find('form > button').click();
}
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

  it('Add multiple tasks, edit, then remove', () => {
    // task 1
    addTask('task1', '4');
    // task 2
    // type task2 title
    cy.get('task-list').shadow().find('input[content="title"]').type('task2');
    // type task2 count
    cy.get('task-list')
      .shadow()
      .find('input[content="count"]')
      .click()
      .type('5');
    cy.get('task-list').shadow().find('form > button').click();
    // check 2 tasks exist
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > h1')
      .should('have.length', 2);
    // check added task1 is correct
    taskExists('task1', '4');
    // check task2 correct
    taskExists('task2', '5');
    // click on editing task2 then edit
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > button[title="Edit Task"]')
      .first()
      .click({ position: 'top' });
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > form > input[content="title"]')
      .first()
      .type('edited', { force: true });
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > form > input[content="count"]')
      .first()
      .clear()
      .type('6', { force: true });
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .first()
      .find('section > form > button[type="submit"]')
      .click();
    // assert task was edited
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > h1')
      .contains('task2edited');
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > progress-container > progress-bar')
      .contains('6');
    // now delete the edited task
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > button[title="Delete Task"]')
      .first()
      .click({ position: 'top' })
      .click({ position: 'top' });
    // check task deleted
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > h1')
      .should('have.length', 1);
    // check other task still there
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
  it('Checkmark disables play/edit button and fully completes task', () => {
    // cy.get('#main-container')
    //   .shadow()
    //   .find('#main-list')
    //   .find(`[name="${firstName}"]`)
    //   .shadow()
    //   .find('#edit-btn')
    //   .should('not.be.disabled');
    // cy.get('#main-container')
    //   .shadow()
    //   .find('#main-list')
    //   .find(`[name="${firstName}"]`)
    //   .shadow()
    //   .find('#play-btn')
    //   .should('not.be.disabled');
    // cy.get('#main-container')
    //   .shadow()
    //   .find('#main-list')
    //   .find(`[name="${firstName}"]`)
    //   .shadow()
    //   .find('#delete-btn')
    //   .should('not.be.disabled');
    // cy.get('#main-container')
    //   .shadow()
    //   .find('#main-list')
    //   .find(`[name="${firstName}"]`)
    //   .shadow()
    //   .find('#progress-bar')
    //   .should('have.attr', 'style', 'width: 0.00%;');
    // cy.get('#main-container')
    //   .shadow()
    //   .find('#main-list')
    //   .find(`[name="${firstName}"]`)
    //   .shadow()
    //   .find('#checkmark')
    //   .find('#checkmark-input')
    //   .check();
    // cy.get('#main-container')
    //   .shadow()
    //   .find('#main-list')
    //   .find(`[name="${firstName}"]`)
    //   .shadow()
    //   .find('#edit-btn')
    //   .should('be.disabled');
    // cy.get('#main-container')
    //   .shadow()
    //   .find('#main-list')
    //   .find(`[name="${firstName}"]`)
    //   .shadow()
    //   .find('#play-btn')
    //   .should('be.disabled');
    // cy.get('#main-container')
    //   .shadow()
    //   .find('#main-list')
    //   .find(`[name="${firstName}"]`)
    //   .shadow()
    //   .find('#delete-btn')
    //   .should('not.be.disabled');
    // cy.get('#main-container')
    //   .shadow()
    //   .find('#main-list')
    //   .find(`[name="${firstName}"]`)
    //   .shadow()
    //   .find('#progress-bar')
    //   .should('have.attr', 'style', 'width: 100%;');
  });

  it('Should have tasks still on page after reload', () => {
    // cy.reload();
    // cy.get('#main-container')
    //   .shadow()
    //   .find('#main-list')
    //   .find(`[name="${firstName}"]`)
    //   .should('exist');
    // cy.get('#main-container')
    //   .shadow()
    //   .find('#main-list')
    //   .find(`[name="${firstName}"]`)
    //   .then(($el) => {
    //     expect($el).to.have.attr('number', firstNum);
    //     expect($el).to.have.attr('current', 0);
    //   });
    // cy.get('#main-container')
    //   .shadow()
    //   .find('#main-list')
    //   .find(`[name="${secondName}"]`)
    //   .should('exist');
    // cy.get('#main-container')
    //   .shadow()
    //   .find('#main-list')
    //   .find(`[name="${secondName}"]`)
    //   .then(($el) => {
    //     expect($el).to.have.attr('number', secondNum);
    //     expect($el).to.have.attr('current', 0);
    //   });
  });
});
