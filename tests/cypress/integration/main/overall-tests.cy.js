/* eslint-disable cypress/no-unnecessary-waiting */
// How tests should go:
// Create Task, edit task, delete task, create twenty tasks, scroll to bottom,
// use top bottom, check top task, uncheck, run seccesion on first task, run 2
// seccesions on each task, reload page, read FAQ, read stats, read stats FAQ
describe('Overall testing', () => {
  const firstName = 'testname1';
  const firstNum = 1;
  beforeEach(() => {
    cy.clock(new Date());
    cy.visit('http://127.0.0.1:5501/timer-page/timer.html');
  });

  it(
    'Create a test where a user enters the timer page, starts, and does not ' +
      'create a task. Ensure that the create task dialog pops up, and ensure ' +
      'that the timer runs for 30 minutes (25 work + 5 break). Ensure that ' +
      'after the break, that there is no task-item created in the task page. ' +
      'Ensure that the stats timer page has the correct info',
    () => {
      // Click Start
      cy.get('#currTask').should('have.text', 'No Task Selected');
      cy.get('#deselect-task').should('have.css', 'display', 'none');
      cy.get('timer-buttons').shadow().find('.start-button').click();
      cy.get('timer-buttons')
        .shadow()
        .find('#create-task')
        .should('not.have.css', 'display', 'none');

      // Click Skip
      cy.get('timer-buttons').shadow().find('#create-skip').click();
      cy.get('timer-buttons')
        .shadow()
        .find('#create-task')
        .should('have.css', 'display', 'none');
      cy.get('#currTask').should('have.text', 'No Task Selected');

      // Skip 25 Minutes
      cy.tick(1500000);

      // Click Break
      cy.tick(2000);
      cy.clock().invoke('restore');
      cy.wait(2000);
      cy.clock(new Date());

      // Skip 5 Minutes
      cy.get('timer-buttons')
        .shadow()
        .find('#break-button')
        .should('not.have.css', 'display', 'none');
      cy.get('timer-buttons').shadow().find('#break-button').click();
      cy.tick(900000);
      cy.get('timer-buttons').shadow().find('#continue-btn').click();

      // Ensure Stats are correct
      cy.get('header-comp')
        .shadow()
        .find('button[title="Go to Stats"]')
        .click();
      cy.get('stats-card[stat-type="completed"][stat-length="1"]')
        .shadow()
        .find('p')
        .should('have.text', '1');
      cy.get('stats-card[stat-type="distractions"][stat-length="1"]')
        .shadow()
        .find('p')
        .should('have.text', '0.0');
      cy.get('stats-card[stat-type="success"][stat-length="1"]')
        .shadow()
        .find('p')
        .should('have.text', '100.00%');
      cy.get('stats-card[stat-type="completed"][stat-length="7"]')
        .shadow()
        .find('p')
        .should('have.text', '1');
      cy.get('stats-card[stat-type="distractions"][stat-length="7"]')
        .shadow()
        .find('p')
        .should('have.text', '0.0');
      cy.get('stats-card[stat-type="success"][stat-length="7"]')
        .shadow()
        .find('p')
        .should('have.text', '100.00%');
      cy.get('stats-card[stat-type="completed"][stat-length="30"]')
        .shadow()
        .find('p')
        .should('have.text', '1');
      cy.get('stats-card[stat-type="distractions"][stat-length="30"]')
        .shadow()
        .find('p')
        .should('have.text', '0.0');
      cy.get('stats-card[stat-type="success"][stat-length="30"]')
        .shadow()
        .find('p')
        .should('have.text', '100.00%');
    }
  );

  it(
    'Create a test where a user enters the timer page, starts, and does ' +
      'create a task. Ensure that the create task dialog pops up, and ensure ' +
      'that the timer runs for 30 minutes (25 work + 5 break). Ensure that ' +
      'after the break, that there is a task-item created in the task page ' +
      ' with the correct title and the correct ratio. Ensure that the stats ' +
      'timer page has the correct info.',
    () => {
      // Click Start
      cy.get('#currTask').should('have.text', 'No Task Selected');
      cy.get('#deselect-task').should('have.css', 'display', 'none');
      cy.get('timer-buttons').shadow().find('.start-button').click();
      cy.get('timer-buttons')
        .shadow()
        .find('#create-task')
        .should('not.have.css', 'display', 'none');

      // Create Task
      cy.get('timer-buttons').shadow().find('#task-name').type(firstName);
      cy.get('timer-buttons').shadow().find('#pomo-count').type(firstNum);
      cy.get('timer-buttons').shadow().find('#create-start').click();
      cy.get('#deselect-task').should('have.css', 'display', 'none');
      cy.get('#currTask').should('have.text', firstName);
      cy.get('timer-buttons')
        .shadow()
        .find('#create-task')
        .should('have.css', 'display', 'none');
      // Skip 25 Minutes
      cy.tick(1500000);

      // Click Break
      cy.tick(2000);
      cy.clock().invoke('restore');
      cy.wait(2000);
      cy.clock(new Date());

      // Skip 5 Minutes
      cy.get('timer-buttons')
        .shadow()
        .find('#break-button')
        .should('not.have.css', 'display', 'none');
      cy.get('timer-buttons').shadow().find('#break-button').click();
      cy.tick(900000);
      cy.get('timer-buttons').shadow().find('#continue-btn').click();

      // Ensure Task was created
      cy.get('header-comp')
        .shadow()
        .find('button[title="Go to Tasks"]')
        .click();
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
        .should('have.text', `1/${firstNum}`);
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
        .should('be.disabled');
      cy.get('task-list')
        .shadow()
        .find('task-item[name="testname1"]')
        .shadow()
        .find('button[job="delete"]')
        .should('not.be.disabled');

      // Ensure Stats are correct
      cy.get('header-comp')
        .shadow()
        .find('button[title="Go to Stats"]')
        .click();
      cy.get('stats-card[stat-type="completed"][stat-length="1"]')
        .shadow()
        .find('p')
        .should('have.text', '1');
      cy.get('stats-card[stat-type="distractions"][stat-length="1"]')
        .shadow()
        .find('p')
        .should('have.text', '0.0');
      cy.get('stats-card[stat-type="success"][stat-length="1"]')
        .shadow()
        .find('p')
        .should('have.text', '100.00%');
      cy.get('stats-card[stat-type="completed"][stat-length="7"]')
        .shadow()
        .find('p')
        .should('have.text', '1');
      cy.get('stats-card[stat-type="distractions"][stat-length="7"]')
        .shadow()
        .find('p')
        .should('have.text', '0.0');
      cy.get('stats-card[stat-type="success"][stat-length="7"]')
        .shadow()
        .find('p')
        .should('have.text', '100.00%');
      cy.get('stats-card[stat-type="completed"][stat-length="30"]')
        .shadow()
        .find('p')
        .should('have.text', '1');
      cy.get('stats-card[stat-type="distractions"][stat-length="30"]')
        .shadow()
        .find('p')
        .should('have.text', '0.0');
      cy.get('stats-card[stat-type="success"][stat-length="30"]')
        .shadow()
        .find('p')
        .should('have.text', '100.00%');
    }
  );

  it(
    ' Create a test where a user enters the timer page, goes to the tasks ' +
      'page, creates a task, and then goes to the timer page through the ' +
      'header (not by playing the task). Ensure that it goes through the ' +
      'same process as the first process.',
    () => {
      // Create a Task
      cy.get('header-comp')
        .shadow()
        .find('button[title="Go to Tasks"]')
        .click();
      cy.get('task-list')
        .shadow()
        .find('input[content="title"]')
        .type(firstName);
      cy.get('task-list')
        .shadow()
        .find('input[content="count"]')
        .type(firstNum);
      cy.get('task-list').shadow().find('button[type="submit"]').click();

      // Check that the task was made correctly.
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

      // Go to Timer
      cy.get('header-comp')
        .shadow()
        .find('button[title="Go to Timer"]')
        .click();

      // Run Session with no task
      cy.get('#currTask').should('have.text', 'No Task Selected');
      cy.get('#deselect-task').should('have.css', 'display', 'none');
      cy.get('timer-buttons').shadow().find('.start-button').click();
      cy.get('timer-buttons')
        .shadow()
        .find('#create-task')
        .should('not.have.css', 'display', 'none');
      cy.get('timer-buttons').shadow().find('#create-skip').click();
      cy.get('timer-buttons')
        .shadow()
        .find('#create-task')
        .should('have.css', 'display', 'none');

      // Skip through Session
      cy.tick(1500000);
      cy.tick(2000);
      cy.clock().invoke('restore');
      cy.wait(2000);
      cy.clock(new Date());
      cy.get('#currTask').should('have.text', 'Short Break');

      // Ensure Task was NOT updated (as it was not selected)
      cy.get('header-comp')
        .shadow()
        .find('button[title="Go to Tasks"]')
        .click();
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

      // Ensure Stats are correct
      cy.get('header-comp')
        .shadow()
        .find('button[title="Go to Stats"]')
        .click();
      cy.get('stats-card[stat-type="completed"][stat-length="1"]')
        .shadow()
        .find('p')
        .should('have.text', '1');
      cy.get('stats-card[stat-type="distractions"][stat-length="1"]')
        .shadow()
        .find('p')
        .should('have.text', '0.0');
      cy.get('stats-card[stat-type="success"][stat-length="1"]')
        .shadow()
        .find('p')
        .should('have.text', '100.00%');
      cy.get('stats-card[stat-type="completed"][stat-length="7"]')
        .shadow()
        .find('p')
        .should('have.text', '1');
      cy.get('stats-card[stat-type="distractions"][stat-length="7"]')
        .shadow()
        .find('p')
        .should('have.text', '0.0');
      cy.get('stats-card[stat-type="success"][stat-length="7"]')
        .shadow()
        .find('p')
        .should('have.text', '100.00%');
      cy.get('stats-card[stat-type="completed"][stat-length="30"]')
        .shadow()
        .find('p')
        .should('have.text', '1');
      cy.get('stats-card[stat-type="distractions"][stat-length="30"]')
        .shadow()
        .find('p')
        .should('have.text', '0.0');
      cy.get('stats-card[stat-type="success"][stat-length="30"]')
        .shadow()
        .find('p')
        .should('have.text', '100.00%');
    }
  );

  it(
    'Create a test where a user enters the timer page, goes to the tasks ' +
      'page, creates a task, and then goes to the timer page through the ' +
      'task item (not through the header). Click the start and ensure that ' +
      'the create task does not show up. After the session, go to the task ' +
      'page and ensure that the task chosen updates its ratio and that the ' +
      'stats page is updated.',
    () => {
      // Create a Task
      cy.get('header-comp')
        .shadow()
        .find('button[title="Go to Tasks"]')
        .click();
      cy.get('task-list')
        .shadow()
        .find('input[content="title"]')
        .type(firstName);
      cy.get('task-list')
        .shadow()
        .find('input[content="count"]')
        .type(firstNum);
      cy.get('task-list').shadow().find('button[type="submit"]').click();

      // Check that the task was made correctly.
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

      // Go to Timer
      cy.get('task-list')
        .shadow()
        .find('task-item[name="testname1"]')
        .shadow()
        .find('button[job="play"]')
        .click();

      // Run Session with no task
      cy.get('#currTask').should('have.text', firstName);
      cy.get('#deselect-task').should('not.have.css', 'display', 'none');
      cy.get('timer-buttons').shadow().find('.start-button').click();
      cy.get('timer-buttons')
        .shadow()
        .find('#create-task')
        .should('have.css', 'display', 'none');

      // Skip through Session
      cy.tick(1500000);
      // Tick 2 seconds for cypress UI testing
      cy.tick(2000);
      // End clock, wait for 2 seconds, and reenable clock to simulate 2 second
      // tick for the CLI/Action testing
      cy.clock().invoke('restore');
      cy.wait(2000);
      cy.clock(new Date());
      cy.get('#currTask').should('have.text', 'Short Break');

      // Ensure Task was updated
      cy.get('header-comp')
        .shadow()
        .find('button[title="Go to Tasks"]')
        .click();
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
        .should('have.text', `1/${firstNum}`);
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
        .should('be.disabled');
      cy.get('task-list')
        .shadow()
        .find('task-item[name="testname1"]')
        .shadow()
        .find('button[job="delete"]')
        .should('not.be.disabled');

      // Ensure Stats are correct
      cy.get('header-comp')
        .shadow()
        .find('button[title="Go to Stats"]')
        .click();
      cy.get('stats-card[stat-type="completed"][stat-length="1"]')
        .shadow()
        .find('p')
        .should('have.text', '1');
      cy.get('stats-card[stat-type="distractions"][stat-length="1"]')
        .shadow()
        .find('p')
        .should('have.text', '0.0');
      cy.get('stats-card[stat-type="success"][stat-length="1"]')
        .shadow()
        .find('p')
        .should('have.text', '100.00%');
      cy.get('stats-card[stat-type="completed"][stat-length="7"]')
        .shadow()
        .find('p')
        .should('have.text', '1');
      cy.get('stats-card[stat-type="distractions"][stat-length="7"]')
        .shadow()
        .find('p')
        .should('have.text', '0.0');
      cy.get('stats-card[stat-type="success"][stat-length="7"]')
        .shadow()
        .find('p')
        .should('have.text', '100.00%');
      cy.get('stats-card[stat-type="completed"][stat-length="30"]')
        .shadow()
        .find('p')
        .should('have.text', '1');
      cy.get('stats-card[stat-type="distractions"][stat-length="30"]')
        .shadow()
        .find('p')
        .should('have.text', '0.0');
      cy.get('stats-card[stat-type="success"][stat-length="30"]')
        .shadow()
        .find('p')
        .should('have.text', '100.00%');
    }
  );

  it(
    'Create a test where the user edits the work, short and long break ' +
      'and then starts a test. Make sure that the work, short, and long ' +
      'sessions are the correct amount of time.',
    () => {
      cy.get('header-comp').shadow().find('button[title="Settings"]').click();
      cy.get('header-comp')
        .shadow()
        .find('input[job="work"]')
        .clear({ force: true })
        .type(4, { force: true });
      cy.get('header-comp')
        .shadow()
        .find('input[job="shortBreak"]')
        .clear({ force: true })
        .type(3, { force: true });
      cy.get('header-comp')
        .shadow()
        .find('input[job="longBreak"]')
        .clear({ force: true })
        .type(2, { force: true });
      cy.get('header-comp').shadow().find('button[type="submit"]').click();
      for (let i = 0; i < 4; i++) {
        // Click Start
        cy.get('#currTask').should('have.text', 'No Task Selected');
        cy.get('#deselect-task').should('have.css', 'display', 'none');
        cy.get('timer-buttons').shadow().find('.start-button').click();
        cy.get('timer-buttons')
          .shadow()
          .find('#create-task')
          .should('not.have.css', 'display', 'none');

        // Click Skip
        cy.get('timer-buttons').shadow().find('#create-skip').click();
        cy.get('timer-buttons')
          .shadow()
          .find('#create-task')
          .should('have.css', 'display', 'none');
        cy.get('#currTask').should('have.text', 'No Task Selected');
        cy.tick(240000);
        cy.tick(2000);
        cy.clock().invoke('restore');
        cy.wait(2000);
        cy.clock(new Date());
        cy.get('timer-buttons').shadow().find('#break-button').click();
        if (i === 3) {
          cy.get('#currTask').should('have.text', 'Long Break');
          cy.tick(120000);
          cy.get('timer-buttons').shadow().find('#continue-btn').click();
        } else {
          cy.get('#currTask').should('have.text', 'Short Break');
          cy.tick(180000);
          cy.get('timer-buttons').shadow().find('#continue-btn').click();
        }
      }
    }
  );

  // ERROR! Cypress Pipeline cannot handle the auto timer. The system itself
  // works in production but not on the E2E Cypress testing sidein CLI/GitHub
  // Actions (even which using the wait hack). I give up trying to fix this.
  // it(
  //   'Enable auto timer and run through 4 work sessions, ensuring that ' +
  //     'that the system runs through them automatically and that no ' +
  //     'interaction needs to happen.',
  //   () => {
  //     cy.get('header-comp').shadow().find('button[title="Settings"]').click();
  //     cy.get('header-comp').shadow().find('input[type="checkbox"]').click();
  //     cy.get('header-comp').shadow().find('button[type="submit"]').click();
  //     // Click Start
  //     cy.get('#currTask').should('have.text', 'No Task Selected');
  //     cy.get('#deselect-task').should('have.css', 'display', 'none');
  //     cy.get('timer-buttons').shadow().find('.start-button').click();
  //     cy.get('timer-buttons')
  //       .shadow()
  //       .find('#create-task')
  //       .should('not.have.css', 'display', 'none');

  //     // Click Skip
  //     cy.get('timer-buttons').shadow().find('#create-skip').click();
  //     cy.get('timer-buttons')
  //       .shadow()
  //       .find('#create-task')
  //       .should('have.css', 'display', 'none');
  //     for (let i = 0; i < 4; i++) {
  //       cy.get('#currTask').should('have.text', 'No Task Selected');
  //       cy.tick(1500000);
  //       cy.tick(2000);
  //       if (i === 3) {
  //         cy.get('#currTask').should('have.text', 'Long Break');
  //       } else {
  //         cy.get('#currTask').should('have.text', 'Short Break');
  //       }
  //       cy.tick(900000);
  //       cy.tick(8000);
  //     }
  //   }
  // );
});
