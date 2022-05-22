describe('Exteme task tests (WARNING! This is very long, like 10 mins long; only PSYCHOS use this', () => {
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

  for (let taskIndex = 0; taskIndex < 100; taskIndex++) {
    it(`Add task ${taskIndex}`, () => {
      cy.get('#add-task-btn').click();
      cy.get('#task-name').clear();
      cy.get('#task-name').type(`name${taskIndex}`);
      cy.get('#task-num').clear();
      cy.get('#task-num').type(1);
      cy.get('#task-note').clear();
      cy.get('#task-note').type(`note${taskIndex}`);
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
          expect($el).to.have.attr('number', 1);
          expect($el).to.have.attr('current', 0);
        });
    });
  }

  for (let taskIndex = 0; taskIndex < 100; taskIndex++) {
    it(`Check to make sure task ${taskIndex} reload`, () => {
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
          expect($el).to.have.attr('number', 1);
          expect($el).to.have.attr('current', 0);
        });
    });
  }

  for (let taskIndex = 0; taskIndex < 100; taskIndex++) {
    let name = 'e';
    name += 'e';
    it(`Add new task with name size ${taskIndex}`, () => {
      cy.get('#add-task-btn').click();
      cy.get('#task-name').clear();
      cy.get('#task-name').type(name);
      cy.get('#task-num').clear();
      cy.get('#task-num').type(1);
      cy.get('#task-note').clear();
      cy.get('#task-note').type(taskIndex);
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
    });
  }
});
