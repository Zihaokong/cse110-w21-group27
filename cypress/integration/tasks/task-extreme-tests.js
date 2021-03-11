describe('Exteme task tests (WARNING! This is very long, like 10 mins long; only PSYCHOS use this', () => {
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

  it('Add task with kinda long name (50)', () => {
    cy.get('#add-task-btn').click();
    cy.get('#task-name').clear();
    cy.get('#task-name').type(
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    );
    cy.get('#task-num').clear();
    cy.get('#task-num').type(1);
    cy.get('#task-note').clear();
    cy.get('#task-note').type(`note`);
    cy.get('#save-btn').click();
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(
        '[name="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]'
      )
      .should('exist');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(
        '[name="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]'
      )
      .then(($el) => {
        expect($el).to.have.attr('number', 1);
        expect($el).to.have.attr('current', 0);
      });
  });

  it('Add task with obnoxiosuly long note', () => {
    cy.get('#add-task-btn').click();
    cy.get('#task-name').clear();
    cy.get('#task-name').type('test');
    cy.get('#task-num').clear();
    cy.get('#task-num').type(1);
    cy.get('#task-note').clear();
    cy.get('#task-note').type(
      `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
    );
    cy.get('#save-btn').click();
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find('[name="test"]')
      .should('exist');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find('[name="test"]')
      .then(($el) => {
        expect($el).to.have.attr('number', 1);
        expect($el).to.have.attr('current', 0);
      });
  });

  it('Add task with very long name', () => {
    cy.get('#add-task-btn').click();
    cy.get('#task-name').clear();
    cy.get('#task-name').type(
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    );
    cy.get('#task-num').clear();
    cy.get('#task-num').type(1);
    cy.get('#task-note').clear();
    cy.get('#task-note').type(`note`);
    cy.get('#save-btn').click();
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(
        '[name="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]'
      )
      .should('exist');
    cy.get('#main-container')
      .shadow()
      .find('#main-list')
      .find(
        '[name="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]'
      )
      .then(($el) => {
        expect($el).to.have.attr('number', 1);
        expect($el).to.have.attr('current', 0);
      });
  });

  it('Add 100 tasks', () => {
    for (let i = 0; i < 100; i++) {
      cy.get('#add-task-btn').click();
      cy.get('#task-name').clear();
      cy.get('#task-name').type(`name${i}`);
      cy.get('#task-num').clear();
      cy.get('#task-num').type(1);
      cy.get('#task-note').clear();
      cy.get('#task-note').type(`note${i}`);
      cy.get('#save-btn').click();
      cy.get('#main-container')
        .shadow()
        .find('#main-list')
        .find(`[name="name${i}"]`)
        .should('exist');
      cy.get('#main-container')
        .shadow()
        .find('#main-list')
        .find(`[name="name${i}"]`)
        .then(($el) => {
          expect($el).to.have.attr('number', 1);
          expect($el).to.have.attr('current', 0);
        });
    }
  });

  it('Check to make sure the 100 tasks reload', () => {
    cy.reload();
    for (let i = 0; i < 100; i++) {
      cy.get('#main-container')
        .shadow()
        .find('#main-list')
        .find(`[name="name${i}"]`)
        .should('exist');
      cy.get('#main-container')
        .shadow()
        .find('#main-list')
        .find(`[name="name${i}"]`)
        .then(($el) => {
          expect($el).to.have.attr('number', 1);
          expect($el).to.have.attr('current', 0);
        });
    }
  });

  it('Add 100 tasks with increasing name size', () => {
    let name = 'e';
    for (let i = 0; i < 100; i++) {
      name += 'e';
      cy.get('#add-task-btn').click();
      cy.get('#task-name').clear();
      cy.get('#task-name').type(name);
      cy.get('#task-num').clear();
      cy.get('#task-num').type(1);
      cy.get('#task-note').clear();
      cy.get('#task-note').type(i);
      cy.get('#save-btn').click();
      cy.get('#main-container')
        .shadow()
        .find('#main-list')
        .find(`[name="${name}"]`)
        .should('exist');
      cy.get('#main-container')
        .shadow()
        .find('#main-list')
        .find(`[name="${name}"]`)
        .then(($el) => {
          expect($el).to.have.attr('number', 1);
          expect($el).to.have.attr('current', 0);
        });
    }
  });
});
