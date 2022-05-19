const { HeaderComp } = require('../../../../source/header-comp');
// How tests should go:
// Create Task, edit task, delete task, create twenty tasks, scroll to bottom,
// use top bottom, check top task, uncheck, run seccesion on first task, run 2
// seccesions on each task, reload page, read FAQ, read stats, read stats FAQ
describe('Overall testing', () => {
  const firstName = 'testname1';
  const firstNum = 1;
  const firstNotes = 'Notes for testname1';
  const firstNameEdited = 'testname1edit';
  const firstNumEdited = 3;
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/source/index.html');
  });

  it('Check that info modal appears', () => {
    cy.get('#info').click();
    cy.get('#info-modal').then(($el) => {
      expect($el).to.have.attr('style', 'display: block;');
    });
  });

  it('Check the stats info modal', () => {
    cy.get('#stats-btn').click();
    cy.get('#info').click();
    cy.get('#info-modal').then(($el) => {
      expect($el).to.have.attr('style', 'display: block;');
    });
  });

  it("Check that today's stats start at all 0", () => {
    cy.get('#stats-btn').click();
    cy.get('#todayPomos').contains('0');
    cy.get('#todayAvgDistractions').contains('0');
    cy.get('#weekSuccess').contains('0%');
  });

  it("Check that last 7 days' stats start at all 0", () => {
    cy.get('#stats-btn').click();
    cy.get('#weekPomos').contains('0');
    cy.get('#weekAvgDistractions').contains('0');
    cy.get('#weekSuccess').contains('0%');
  });

  it("Check that last 30 days' stats start at all 0", () => {
    cy.get('#stats-btn').click();
    cy.get('#monthPomos').contains('0');
    cy.get('#monthAvgDistractions').contains('0');
    cy.get('#monthSuccess').contains('0%');
  });

  it('Check for correct header after entering website', () => {
    cy.get('#header').shadow().find('#date').contains(HeaderComp.createDate());
    cy.get('#header')
      .shadow()
      .find('#cycle-count')
      .children('.dot')
      .should('have.length', 4);
    cy.get('#header')
      .shadow()
      .find('#cycle-count')
      .children('.filled-dot')
      .should('have.length', 0);
  });

  it('Add task modal appears when add task-btn is clicked', () => {
    cy.get('#add-task-modal').should('have.css', 'display', 'none');
    cy.get('#add-task-btn').click();
    cy.get('#add-task-modal').should('have.css', 'display', 'block');
  });

  it('Add task modal appears when add-task-btn-bot is clicked', () => {
    cy.get('#add-task-modal').should('have.css', 'display', 'none');
    cy.get('#add-task-btn-bottom').click();
    cy.get('#add-task-modal').should('have.css', 'display', 'block');
  });

  it('Add one task', () => {
    cy.get('#add-task-btn').click();
    cy.get('#task-name').clear();
    cy.get('#task-name').type(firstName);
    cy.get('#task-num').clear();
    cy.get('#task-num').type(firstNum);
    cy.get('#task-note').clear();
    cy.get('#task-note').type(firstNotes);
    cy.get('#save-btn').click();
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .should('exist');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .then(($el) => {
        expect($el).to.have.attr('number', firstNum);
        expect($el).to.have.attr('current', 0);
      });
  });

  it('Play modal displays correct info', () => {
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#play-btn')
      .click({ force: true });
    cy.get('#timer-name').contains(firstName);
    cy.get('#timer-note').contains(firstName);
  });

  it('Delete modal displays correct info', () => {
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#delete-btn')
      .click({ force: true });
    cy.get('#task-delete').contains(firstName);
  });

  it('Edit modal displays correct info', () => {
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#edit-btn')
      .click({ force: true });
    cy.get('#edit-name').should('have.value', firstName);
    cy.get('#edit-num').should('have.value', firstNum);
    cy.get('#edit-note').should('have.value', firstNotes);
  });

  it('Checkmark disables play/edit button and fully completes task', () => {
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#edit-btn')
      .should('not.be.disabled');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#play-btn')
      .should('not.be.disabled');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#delete-btn')
      .should('not.be.disabled');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#progress-bar')
      .should('have.attr', 'style', 'width: 0.00%;');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#checkmark')
      .find('#checkmark-input')
      .check();
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#edit-btn')
      .should('be.disabled');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#play-btn')
      .should('be.disabled');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#delete-btn')
      .should('not.be.disabled');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#progress-bar')
      .should('have.attr', 'style', 'width: 100%;');
  });

  it('Unchecking enables play/edit button and reverts progress', () => {
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#checkmark')
      .find('#checkmark-input')
      .click();
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#edit-btn')
      .should('not.be.disabled');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#play-btn')
      .should('not.be.disabled');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#delete-btn')
      .should('not.be.disabled');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#progress-bar')
      .should('have.attr', 'style', 'width: 0.00%;');
  });

  it('Should have task on page after reload', () => {
    cy.reload();
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .should('exist');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .then(($el) => {
        expect($el).to.have.attr('number', firstNum);
        expect($el).to.have.attr('current', 0);
      });
  });

  it('Edit one task', () => {
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstName}"]`)
      .shadow()
      .find('#edit-btn')
      .click({ force: true });
    cy.get('#edit-name').clear();
    cy.get('#edit-name').type(firstNameEdited);
    cy.get('#edit-num').clear();
    cy.get('#edit-num').type(firstNumEdited);
    cy.get('#edit-note').clear();
    cy.get('#edit-note').type('Notes for testname1 edited');
    cy.get('#edit-save-btn').click();
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstNameEdited}"]`)
      .should('exist');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstNameEdited}"]`)
      .then(($el) => {
        expect($el).to.have.attr('number', firstNumEdited);
        expect($el).to.have.attr('current', 0);
      });
  });

  it('Delete one task', () => {
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstNameEdited}"]`)
      .should('exist');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstNameEdited}"]`)
      .then(($el) => {
        expect($el).to.have.attr('number', firstNumEdited);
        expect($el).to.have.attr('current', 0);
      });
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstNameEdited}"]`)
      .shadow()
      .find('#delete-btn')
      .click({ force: true });
    cy.get('#confirm-button').click();
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstNameEdited}"]`)
      .should('not.exist');
  });

  it('Should not have task on page after reload', () => {
    cy.reload();
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${firstNameEdited}"]`)
      .should('not.exist');
  });

  for (let taskIndex = 0; taskIndex < 10; taskIndex++) {
    it(`Create task ${taskIndex + 1} of 10`, () => {
      cy.get('#add-task-btn').click();
      cy.get('#task-name').clear();
      cy.get('#task-name').type(`name${taskIndex}`);
      cy.get('#task-num').clear();
      cy.get('#task-num').type(taskIndex + 1);
      cy.get('#task-note').clear();
      cy.get('#task-note').type(`${taskIndex}`);
      cy.get('#save-btn').click();
      cy.get('#main-container')
        .shadow()
        .find('#main-list')
        .find(`[name="name${taskIndex}"]`)
        .should('exist');
      cy.get('#main-container')
        .shadow()
        .find('#main-list')
        .find(`[name="name${taskIndex}"]`)
        .then(($el) => {
          expect($el).to.have.attr('number', taskIndex + 1);
          expect($el).to.have.attr('current', 0);
        });
    });
  }

  it('For each task, run it 4 times', () => {
    cy.clock();
    for (let taskIndex = 0; taskIndex < 10; taskIndex++) {
      const currentTaskName = `name${taskIndex}`;
      const currentTaskNum = taskIndex + 1;
      for (let taskSessionIndex = 0; taskSessionIndex < 4; taskSessionIndex++) {
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.dot')
          .should('have.length', 4 - (taskSessionIndex % 4));
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.filled-dot')
          .should('have.length', taskSessionIndex % 4);
        cy.get('#main-container')
          .shadow()
          .find('#main-list')
          .find(`[name="${currentTaskName}"]`)
          .shadow()
          .find('#play-btn')
          .click({ force: true });
        cy.get('#start-btn').click();
        cy.get('#start-btn').click();
        cy.tick(1000);
        cy.get('#distraction-btn').click();
        cy.tick(1500000 + 2000);
        if ((taskSessionIndex + 1) % 4 === 0) {
          cy.get('#start-long-btn').click();
        } else {
          cy.get('#start-short-btn').click();
        }
        if ((taskSessionIndex + 1) % 4 === 0) {
          cy.get('#header')
            .shadow()
            .find('#cycle-count')
            .children('.dot')
            .should('have.length', 0);
          cy.get('#header')
            .shadow()
            .find('#cycle-count')
            .children('.filled-dot')
            .should('have.length', 4);
        } else {
          cy.get('#header')
            .shadow()
            .find('#cycle-count')
            .children('.dot')
            .should('have.length', 4 - ((taskSessionIndex + 1) % 4));
          cy.get('#header')
            .shadow()
            .find('#cycle-count')
            .children('.filled-dot')
            .should('have.length', (taskSessionIndex + 1) % 4);
        }
        cy.tick(1500000 + 2000);
        cy.get('#change-btn').click();

        // Check to make sure stats are changed correctly
        cy.get('#stats-btn').click();
        cy.get('#todayPomos').contains(
          `${4 * taskIndex + taskSessionIndex + 1}`
        );
        cy.get('#todayAvgDistractions').contains('1.0');
        cy.get('#weekSuccess').contains('100.00%');
        cy.get('#weekPomos').contains(
          `${4 * taskIndex + taskSessionIndex + 1}`
        );
        cy.get('#weekAvgDistractions').contains('1.0');
        cy.get('#weekSuccess').contains('100.00%');
        cy.get('#monthPomos').contains(
          `${4 * taskIndex + taskSessionIndex + 1}`
        );
        cy.get('#monthAvgDistractions').contains('1.0');
        cy.get('#monthSuccess').contains('100.00%');
        cy.get('#stats-btn').click();
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.dot')
          .should('have.length', 4 - ((taskSessionIndex + 1) % 4));
        cy.get('#header')
          .shadow()
          .find('#cycle-count')
          .children('.filled-dot')
          .should('have.length', (taskSessionIndex + 1) % 4);
        cy.get('#main-container')
          .shadow()
          .find('#main-list')
          .find(`[name="${currentTaskName}"]`)
          .then(($el) => {
            expect($el).to.have.attr('number', currentTaskNum);
            expect($el).to.have.attr('current', taskSessionIndex + 1);
          });

        // Check that the current task's progress bar is correct
        let classname;
        let width;
        const widthPercentage = ((taskSessionIndex + 1) / currentTaskNum) * 100;
        if (widthPercentage > 100) {
          classname = 'progress-bar progress-bar bg-danger';
        } else {
          classname = 'progress-bar progress-bar';
        }
        if (widthPercentage >= 100) {
          width = '100%';
        } else {
          width = `${widthPercentage.toFixed(2)}%`;
        }

        cy.get('#main-container')
          .shadow()
          .find('#main-list')
          .find(`[name="${currentTaskName}"]`)
          .shadow()
          .find('#progress-bar')
          .then(($el) => {
            expect($el).to.have.attr('class', classname);
            expect($el).to.have.attr('style', `width: ${width};`);
          });

        // Check that the current task's progress text is correct
        cy.get('#main-container')
          .shadow()
          .find('#main-list')
          .find(`[name="${currentTaskName}"]`)
          .shadow()
          .find('.progress-text')
          .contains(`${taskSessionIndex + 1}/${currentTaskNum}`);
      }

      // Check to make sure that all tasks that are not current task are
      // Unaffected and that the current task remains the same.
      for (let checkTaskIndex = 0; checkTaskIndex < 10; checkTaskIndex++) {
        let currentAmount = 0;

        if (checkTaskIndex <= taskIndex) {
          currentAmount = 4;
        }

        cy.get('#main-container')
          .shadow()
          .find('#main-list')
          .find(`[name="name${checkTaskIndex}"]`)
          .then(($el) => {
            expect($el).to.have.attr('number', checkTaskIndex + 1);
            expect($el).to.have.attr('current', currentAmount);
          });
      }
    }
  });
});
