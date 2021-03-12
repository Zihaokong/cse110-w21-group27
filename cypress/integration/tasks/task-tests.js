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
    cy.visit('http://127.0.0.1:5501/source/index.html');
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

  it('Add two tasks', () => {
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
    cy.get('#add-task-btn').click();
    cy.get('#task-name').clear();
    cy.get('#task-name').type(secondName);
    cy.get('#task-num').clear();
    cy.get('#task-num').type(secondNum);
    cy.get('#task-note').clear();
    cy.get('#task-note').type(secondNotes);
    cy.get('#save-btn').click();
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${secondName}"]`)
      .should('exist');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${secondName}"]`)
      .then(($el) => {
        expect($el).to.have.attr('number', secondNum);
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

  it('Should have tasks still on page after reload', () => {
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
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${secondName}"]`)
      .should('exist');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(`[name="${secondName}"]`)
      .then(($el) => {
        expect($el).to.have.attr('number', secondNum);
        expect($el).to.have.attr('current', 0);
      });
  });

  it('Edit first task, and then delete it', () => {
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
});
