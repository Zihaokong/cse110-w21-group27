const { HeaderComp } = require('../../../source/header-comp');
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
  const firstNotesEdited = 'Notes for testname1 edited';
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/source/index.html');
  });

  it('Check for correct header after entering website', () => {
    cy.get('#header').shadow().find('#date').contains(HeaderComp.createDate());
    cy.get('#header')
      .shadow()
      .find('#completed-cycle')
      .contains('| Completed Cycles: 0');
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
    cy.get('#task-delete').contains(`[${firstName}]`);
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
    for (let i = 0; i < 10; i++) {
      const currentTaskName = `name${i}`;
      const currentTaskNum = i + 1;
      const currentTaskNotes = `${i}`;
      for (let j = 0; j < 4; j++) {
        cy.get('#header')
          .shadow()
          .find('#completed-cycle')
          .contains(`| Completed Cycles: ${4 * i + j}`);
        if (i === 0) {
          cy.get('#header')
            .shadow()
            .find('#cycle-count')
            .children('.dot')
            .should('have.length', 4 - j);
          cy.get('#header')
            .shadow()
            .find('#cycle-count')
            .children('.filled-dot')
            .should('have.length', j);
        } else {
          switch (j) {
            case 0:
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
              break;
            case 1:
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.dot')
                .should('have.length', 3);
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.filled-dot')
                .should('have.length', 1);
              break;
            case 2:
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.dot')
                .should('have.length', 2);
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.filled-dot')
                .should('have.length', 2);
              break;
            case 3:
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.dot')
                .should('have.length', 1);
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.filled-dot')
                .should('have.length', 3);
              break;
            default:
              break;
          }
        }
        cy.get('#main-container')
          .shadow()
          .find('#main-list')
          .find(`[name="${currentTaskName}"]`)
          .shadow()
          .find('#play-btn')
          .click({ force: true });
        cy.get('#start-btn').click();
        cy.tick(5000);
        if (j === 3) {
          cy.get('#start-button-long').click();
        } else {
          cy.get('#start-button').click();
        }
        cy.get('#header')
          .shadow()
          .find('#completed-cycle')
          .contains(`| Completed Cycles: ${4 * i + j + 1}`);
        if (i === 0) {
          cy.get('#header')
            .shadow()
            .find('#cycle-count')
            .children('.dot')
            .should('have.length', 3 - j);
          cy.get('#header')
            .shadow()
            .find('#cycle-count')
            .children('.filled-dot')
            .should('have.length', j + 1);
        } else {
          switch (j) {
            case 0:
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.dot')
                .should('have.length', 3);
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.filled-dot')
                .should('have.length', 1);
              break;
            case 1:
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.dot')
                .should('have.length', 2);
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.filled-dot')
                .should('have.length', 2);
              break;
            case 2:
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.dot')
                .should('have.length', 1);
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.filled-dot')
                .should('have.length', 3);
              break;
            case 3:
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
              break;
            default:
              break;
          }
        }
        cy.tick(5000);
        cy.get('#change-btn').click();
        if (i === 0) {
          cy.get('#header')
            .shadow()
            .find('#cycle-count')
            .children('.dot')
            .should('have.length', 3 - j);
          cy.get('#header')
            .shadow()
            .find('#cycle-count')
            .children('.filled-dot')
            .should('have.length', j + 1);
        } else {
          switch (j) {
            case 0:
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.dot')
                .should('have.length', 3);
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.filled-dot')
                .should('have.length', 1);
              break;
            case 1:
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.dot')
                .should('have.length', 2);
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.filled-dot')
                .should('have.length', 2);
              break;
            case 2:
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.dot')
                .should('have.length', 1);
              cy.get('#header')
                .shadow()
                .find('#cycle-count')
                .children('.filled-dot')
                .should('have.length', 3);
              break;
            case 3:
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
              break;
            default:
              break;
          }
        }
      }
    }
  });
});
