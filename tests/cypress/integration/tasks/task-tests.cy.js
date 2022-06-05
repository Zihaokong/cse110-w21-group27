// This test should go through the following general features:
// Add task -> edit task -> move task -> complete task -> delete task

/**
 * Check assert `num` tasks are in the task list
 * @param {number} num How many tasks should be in the task list
 */
function numTasks(num) {
  if (num == 0) {
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .should('not.exist');
  } else {
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > h1')
      .should('have.length', num);
  }
}

/**
 * Assert a task with the name `task` and count `count` exist in the task list
 * @param {String} task name of the task
 * @param {String} count pomo count of the task
 */
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

/**
 * Add a task with the name `task` and count `count` exist to the task list
 * @param {String} task name of the task
 * @param {String} count pomo count of the task
 */
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
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/tasks-page/tasks.html');
  });

  it('Add a single task and check it was added', () => {
    addTask('task1', '4');
    taskExists('task1', '4');
  });

  it('Add multiple tasks, edit, then remove', () => {
    addTask('task1', '4');
    addTask('task2', '5');
    taskExists('task1', '4');
    taskExists('task2', '5');
    numTasks(2);
    // edit top task (task 2)
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
    taskExists('task2edited', '6');
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
    numTasks(1);
    // check other task still there
    taskExists('task1', 4);
  });
  it('Checkmark disables play/edit button and fully completes task', () => {
    addTask('task1', '4');

    // check task as done
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > input[type="checkbox"]')
      .first()
      .click({ position: 'top' });
    // assert edit button is disabled
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > button[title="Edit Task"]')
      .first()
      .should('be.disabled');
    // assert play button is disabled
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > button[title="Start task"]')
      .first()
      .should('be.disabled');

    // assert delete button is NOT disabled
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > button[title="Delete Task"]')
      .first()
      .should('not.be.disabled');

    // assert progress bar is full
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > progress-container > progress-bar')
      .should('have.attr', 'style', 'width: 100%;');
    // uncheck task
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > input[type="checkbox"]')
      .first()
      .click({ position: 'top' });
    // assert edit button is not disabled
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > button[title="Edit Task"]')
      .first()
      .should('not.be.disabled');
    // assert play button is not disabled
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > button[title="Delete Task"]')
      .first()
      .should('not.be.disabled');

    // assert delete button is NOT disabled
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > button[title="Start task"]')
      .first()
      .should('not.be.disabled');

    // assert progress bar is empty
    cy.get('task-list')
      .shadow()
      .find('section > task-item')
      .shadow()
      .find('section > progress-container > progress-bar')
      .should('have.attr', 'style', 'width: 0%;');
  });

  it('Should have tasks still on page after reload', () => {
    addTask('task', 3);
    cy.reload();
    taskExists('task', 3);
  });

  it('Attempt to add a task that should not be allowed', () => {
    addTask(
      'a very long task name that should be past the character limit',
      '100'
    );
    numTasks(0);
  });

  it('Attempt to add a task with a name that is too long', () => {
    addTask(
      'a very long task name that should be past the character limit',
      '10'
    );
    numTasks(1);
    taskExists('a very long task name that', '10');
  });

  it('Create 50 tasks and verify they exist', () => {
    for (let i = 0; i < 50; i++) {
      addTask(`task ${i}`, (i % 9) + 1);
    }
    for (let i = 0; i < 50; i++) {
      taskExists(`task ${i}`, (i % 9) + 1);
    }
  });
});
