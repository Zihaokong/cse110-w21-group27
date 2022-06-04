// How tests should go:
// Create Task, edit task, delete task, create twenty tasks, scroll to bottom,
// use top bottom, check top task, uncheck, run seccesion on first task, run 2
// seccesions on each task, reload page, read FAQ, read stats, read stats FAQ
describe('Overall testing', () => {
  const firstName = 'testname1';
  const firstNum = 1;
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/tasks-page/tasks.html');
  });

  it('Check that the stats card statistics start at 0', () => {
    cy.get('header-comp').shadow().find('button[title="Go to Stats"]').click();
    cy.get('stats-card[stat-type="completed"][stat-length="1"]')
      .shadow()
      .find('#stat')
      .should('have.text', '0');
    cy.get('stats-card[stat-type="distractions"][stat-length="1"]')
      .shadow()
      .find('#stat')
      .should('have.text', '0');
    cy.get('stats-card[stat-type="success"][stat-length="1"]')
      .shadow()
      .find('#stat')
      .should('have.text', '0%');
    cy.get('stats-card[stat-type="completed"][stat-length="7"]')
      .shadow()
      .find('#stat')
      .should('have.text', '0');
    cy.get('stats-card[stat-type="distractions"][stat-length="7"]')
      .shadow()
      .find('#stat')
      .should('have.text', '0');
    cy.get('stats-card[stat-type="success"][stat-length="7"]')
      .shadow()
      .find('#stat')
      .should('have.text', '0%');
    cy.get('stats-card[stat-type="completed"][stat-length="30"]')
      .shadow()
      .find('#stat')
      .should('have.text', '0');
    cy.get('stats-card[stat-type="distractions"][stat-length="30"]')
      .shadow()
      .find('#stat')
      .should('have.text', '0');
    cy.get('stats-card[stat-type="success"][stat-length="30"]')
      .shadow()
      .find('#stat')
      .should('have.text', '0%');
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

  it('Add one task', () => {
    cy.get('task-list').shadow().find('input[content="title"]').type(firstName);

    cy.get('task-list').shadow().find('input[content="count"]').type(firstNum);

    cy.get('task-list').shadow().find('button[type="submit"]').click();

    cy.get('task-list')
      .shadow()
      .find('task-item[name="testname1"]')
      .shadow()
      .find('h1')
      .should('have.text', firstName);

    cy.get('task-list')
      .shadow()
      .find('task-item[name="testname1"]')
      .shadow()
      .find('progress-bar')
      .should('have.text', `0/${firstNum}`);

    cy.get('task-list')
      .shadow()
      .find('task-item[name="testname1"]')
      .shadow()
      .find('progress-bar')
      .should('have.text', `0/${firstNum}`);

    cy.get('task-list')
      .shadow()
      .find('task-item[name="testname1"]')
      .shadow()
      .find('button[job="play"]')
      .should('not.be.disabled');

    cy.get('task-list')
      .shadow()
      .find('task-item[name="testname1"]')
      .shadow()
      .find('button[job="play"]')
      .should('not.be.disabled');

    cy.get('task-list')
      .shadow()
      .find('task-item[name="testname1"]')
      .shadow()
      .find('button[job="edit"]')
      .should('not.be.disabled');

    cy.get('task-list')
      .shadow()
      .find('task-item[name="testname1"]')
      .shadow()
      .find('button[job="delete"]')
      .should('not.be.disabled');
  });

  it(
    'Create a test where a user enters the timer page, starts, and does not ' +
      'create a task. Ensure that the create task dialog pops up, and ensure ' +
      'that the timer runs for 30 minutes (25 work + 5 break). Ensure that ' +
      'after the break, that there is no task-item created in the task page. ' +
      'Ensure that the stats timer page has the correct info',
    () => {}
  );

  it(
    'Create a test where a user enters the timer page, starts, and does ' +
      'create a task. Ensure that the create task dialog pops up, and ensure ' +
      'that the timer runs for 30 minutes (25 work + 5 break). Ensure that ' +
      'after the break, that there is a task-item created in the task page ' +
      ' with the correct title and the correct ratio. Ensure that the stats ' +
      'timer page has the correct info.',
    () => {}
  );

  it(
    ' Create a test where a user enters the timer page, goes to the stats ' +
      'page, creates a task, and then goes to the timer page through the ' +
      'header (not by playing the task). Ensure that it goes through the ' +
      'same process as the first process.',
    () => {}
  );

  it(
    'Create a test where a user enters the timer page, goes to the stats ' +
      'page, creates a task, and then goes to the timer page through the ' +
      'task item (not through the header). Click the start and ensure that ' +
      'the create task does not show up. After the session, go to the task ' +
      'page and ensure that the task chosen updates its ratio and that the ' +
      'stats page is updated.',
    () => {}
  );

  it(
    ' Create a test where the user edits the work, short and long break ' +
      'and then starts a test. Make sure that the work, short, and long ' +
      'sessions are the correct amount of time.',
    () => {}
  );

  it(
    'Enable auto timer and run through 4 work sessions, ensuring that ' +
      'that the system runs through them automatically and that no ' +
      'interaction needs to happen.',
    () => {}
  );
});
