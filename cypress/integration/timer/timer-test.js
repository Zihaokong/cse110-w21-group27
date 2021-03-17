describe('Test timer.js and functions)', () => {

  beforeEach(() => {
    let allTasks = [];
    const newTask1 = {
      id: Math.random().toString(16).slice(2),
      completed: false,
      name: 'Task1',
      number: 5,
      current: 0,
      note: 'OK1',
    };
    const newTask2 = {
      id: Math.random().toString(16).slice(2),
      completed: false,
      name: 'Task2',
      number: 6,
      current: 1,
      note: 'OK2',
    };

    const newTask3 = {
      id: Math.random().toString(16).slice(2),
      completed: false,
      name: 'Task3',
      number: 7,
      current: 6,
      note: 'OK3',
    };

    allTasks.push(newTask1);
    allTasks.push(newTask2);
    allTasks.push(newTask3);
    const currentid = newTask1.id;
    localStorage.setItem('currentTask', JSON.stringify(currentid));
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    cy.visit('http://127.0.0.1:5501/source/timer_page/timer.html');
  });

  it('Timer page display current task name', () => {
    cy.get('#currTask').then(($el) => {
      expect($el).to.have.text('Task1');
    });
  });

  it('short and long break not rendering before task', () => {
      cy.get('#currTask').then(($el) => {
        expect($el).to.not.have.text('Short Break');
        expect($el).to.not.have.text('Long Break');
      });
  });

  it('count distraction + 2', () =>{
    cy.get('#start-btn').click();
    cy.get('#distraction-btn').click();
    cy.get('#distraction-btn').click();
    cy.get('#distraction-btn').then(($el) => {
      expect($el).to.have.text('Distraction : 2');
    });
  });

  it('click fail button and cancel', () => {
    cy.get('#fail-btn').click();
    cy.get('#failModal').should('have.css', 'display', 'block');
    cy.get('#cancel-button').click();
    cy.get('#failModal').should('have.css', 'display', 'none');
  });

  it('click fail button and fail', () => {
    cy.get('#fail-btn').click();
    cy.get('#failModal').should('have.css', 'display', 'block');
    cy.get('#fail-button').click();
  });

  it('placeholder test that fails despite being the exact same as the next test', () => {
    cy.clock();
    localStorage.setItem('sessionCounter', '11');
    cy.visit('http://127.0.0.1:5501/source/timer_page/timer.html');
    cy.get('#start-btn').click();
    cy.tick(3000 + 2000);
    cy.get('#currTask').then(($el) => {
      expect($el).to.have.text('Long Break');
    });
  });

  it('long break shows up after a multiple of 4 pomos', () => {
    cy.clock();
    localStorage.setItem('sessionCounter', '11');
    cy.visit('http://127.0.0.1:5501/source/timer_page/timer.html');
    cy.get('#start-btn').click();
    cy.tick(3000 + 2000);
    cy.get('#currTask').then(($el) => {
      expect($el).to.have.text('Long Break');
    });
  });

  it('short break shows up after a non-multiple of 4 pomos', () => {
    cy.clock();
    localStorage.setItem('sessionCounter', '10');
    cy.visit('http://127.0.0.1:5501/source/timer_page/timer.html');
    cy.get('#start-btn').click();
    cy.tick(3000 + 2000);
    cy.get('#currTask').then(($el) => {
      expect($el).to.have.text('Short Break');
    });
  });

  it('starting short break works properly', () => {
    cy.clock();
    localStorage.setItem('sessionCounter', '10');
    cy.visit('http://127.0.0.1:5501/source/timer_page/timer.html');
    cy.get('#start-btn').click();
    cy.tick(3000 + 2000);
    cy.get('#start-short-btn').click();
    cy.get('#container-short').should('have.css', 'display', 'none');
  });

  it('starting long break works properly', () => {
    cy.clock();
    localStorage.setItem('sessionCounter', '11');
    cy.visit('http://127.0.0.1:5501/source/timer_page/timer.html');
    cy.get('#start-btn').click();
    cy.tick(3000 + 2000);
    cy.get('#start-long-btn').click();
    cy.get('#container-long').should('have.css', 'display', 'none');
  });
});

