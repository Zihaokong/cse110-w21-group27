const { TaskItem } = require('../source/task-item');

describe('Task Item Test Constructor', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div id = "test"> ' +
      '</div>' +
      '<button id="button" />' +
      '<input type="text" id="task-name">' +
      '<input type="text" id="task-num">' +
      '<input type="text" id="task-note">';
  });

  test('Test that connected callback calls all the functions it should', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };
    // Create element
    const taskItemElement = document.createElement('task-item');

    // Create Spies for functions called in connectedCallback
    const createDragSpy = jest.spyOn(TaskItem, 'createDrag');
    const createCheckmarkSpy = jest.spyOn(taskItemElement, 'createCheckmark');
    const createTaskSpy = jest.spyOn(TaskItem, 'createTitle');
    const createProgressBarSpy = jest.spyOn(
      taskItemElement,
      'createProgressBar'
    );
    const createPlayButtonSpy = jest.spyOn(taskItemElement, 'createPlayButton');
    const createEditButtonSpy = jest.spyOn(taskItemElement, 'createEditButton');
    const createDeleteButtonSpy = jest.spyOn(TaskItem, 'createDeleteButton');
    const styleSheetsSpy = jest.spyOn(TaskItem, 'styleSheets');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;

    // Expect all helper functions to be called after task-item is appended.
    expect(createDragSpy).toHaveBeenCalled();
    expect(createCheckmarkSpy).toHaveBeenCalled();
    expect(createTaskSpy).toHaveBeenCalled();
    expect(createProgressBarSpy).toHaveBeenCalled();
    expect(createPlayButtonSpy).toHaveBeenCalled();
    expect(createEditButtonSpy).toHaveBeenCalled();
    expect(createDeleteButtonSpy).toHaveBeenCalled();
    expect(styleSheetsSpy).toHaveBeenCalled();

    // Expect taskName, number, current, and name to be correct
    expect(taskItemElement.taskName).toBe(inputTask.name);
    expect(taskItemElement.name).toBe(inputTask.name);
    expect(taskItemElement.number).toBe(`${inputTask.number}`);
    expect(taskItemElement.current).toBe(`${inputTask.current}`);
  });
});

describe('Task Item Test Functions', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div id = "test"> ' +
      '</div>' +
      '<button id="button" />' +
      '<input type="text" id="task-name">' +
      '<input type="text" id="task-num">' +
      '<input type="text" id="task-note">';
  });

  test('Test createProgressBar @ < 100% && completed = false', () => {
    const current = 0;
    const number = 2;
    const completed = false;
    let percent;
    percent = (current / number) * 100;
    percent = `${percent.toFixed(2)}%`;
    const taskItemElement = document.createElement('task-item');
    taskItemElement.completed = completed;
    taskItemElement.number = number;
    taskItemElement.current = current;
    const progressBar = taskItemElement.createProgressBar();
    expect(progressBar.getAttribute('class')).toBe('flex-column progress');
    expect(progressBar.firstChild.getAttribute('class')).toBe(
      'progress-bar progress-bar'
    );
    expect(progressBar.firstChild.getAttribute('role')).toBe('progressbar');
    expect(progressBar.firstChild.getAttribute('style')).toBe(
      `width: ${percent};`
    );
    expect(progressBar.firstChild.getAttribute('aria-valuenow')).toBe(
      `${current}`
    );
    expect(progressBar.firstChild.getAttribute('aria-valuemin')).toBe(
      `${number}`
    );
    expect(progressBar.firstChild.innerHTML).toBe(`${percent}`);
  });

  test('Test createProgressBar @ 100% && completed = false', () => {
    const current = 2;
    const number = 2;
    const completed = false;
    const percent = '100%';
    const taskItemElement = document.createElement('task-item');
    taskItemElement.completed = completed;
    taskItemElement.number = number;
    taskItemElement.current = current;
    const progressBar = taskItemElement.createProgressBar();
    expect(progressBar.getAttribute('class')).toBe('flex-column progress');
    expect(progressBar.firstChild.getAttribute('class')).toBe(
      'progress-bar progress-bar'
    );
    expect(progressBar.firstChild.getAttribute('role')).toBe('progressbar');
    expect(progressBar.firstChild.getAttribute('style')).toBe(
      `width: ${percent};`
    );
    expect(progressBar.firstChild.getAttribute('aria-valuenow')).toBe(
      `${current}`
    );
    expect(progressBar.firstChild.getAttribute('aria-valuemin')).toBe(
      `${number}`
    );
    expect(progressBar.firstChild.innerHTML).toBe(`${percent}`);
  });

  test('Test createProgressBar @ > 100% && completed = false', () => {
    const current = 3;
    const number = 2;
    const completed = false;
    const percent = '100%';
    const taskItemElement = document.createElement('task-item');
    taskItemElement.completed = completed;
    taskItemElement.number = number;
    taskItemElement.current = current;
    const progressBar = taskItemElement.createProgressBar();
    expect(progressBar.getAttribute('class')).toBe('flex-column progress');
    expect(progressBar.firstChild.getAttribute('class')).toBe(
      'progress-bar progress-bar bg-danger'
    );
    expect(progressBar.firstChild.getAttribute('role')).toBe('progressbar');
    expect(progressBar.firstChild.getAttribute('style')).toBe(
      `width: ${percent};`
    );
    expect(progressBar.firstChild.getAttribute('aria-valuenow')).toBe(
      `${current}`
    );
    expect(progressBar.firstChild.getAttribute('aria-valuemin')).toBe(
      `${number}`
    );
    expect(progressBar.firstChild.innerHTML).toBe(`${percent}`);
  });

  test('Test createProgressBar @ < 100% && completed = true', () => {
    const current = 0;
    const number = 2;
    const completed = true;
    const percent = '100%';
    const taskItemElement = document.createElement('task-item');
    taskItemElement.completed = completed;
    taskItemElement.number = number;
    taskItemElement.current = current;
    const progressBar = taskItemElement.createProgressBar();
    expect(progressBar.getAttribute('class')).toBe('flex-column progress');
    expect(progressBar.firstChild.getAttribute('class')).toBe(
      'progress-bar progress-bar'
    );
    expect(progressBar.firstChild.getAttribute('role')).toBe('progressbar');
    expect(progressBar.firstChild.getAttribute('style')).toBe(
      `width: ${percent};`
    );
    expect(progressBar.firstChild.getAttribute('aria-valuenow')).toBe(
      `${current}`
    );
    expect(progressBar.firstChild.getAttribute('aria-valuemin')).toBe(
      `${number}`
    );
    expect(progressBar.firstChild.innerHTML).toBe(`${percent}`);
  });

  test('Test createProgressBar @ 100% && completed = true', () => {
    const current = 2;
    const number = 2;
    const completed = true;
    const percent = '100%';
    const taskItemElement = document.createElement('task-item');
    taskItemElement.completed = completed;
    taskItemElement.number = number;
    taskItemElement.current = current;
    const progressBar = taskItemElement.createProgressBar();
    expect(progressBar.getAttribute('class')).toBe('flex-column progress');
    expect(progressBar.firstChild.getAttribute('class')).toBe(
      'progress-bar progress-bar'
    );
    expect(progressBar.firstChild.getAttribute('role')).toBe('progressbar');
    expect(progressBar.firstChild.getAttribute('style')).toBe(
      `width: ${percent};`
    );
    expect(progressBar.firstChild.getAttribute('aria-valuenow')).toBe(
      `${current}`
    );
    expect(progressBar.firstChild.getAttribute('aria-valuemin')).toBe(
      `${number}`
    );
    expect(progressBar.firstChild.innerHTML).toBe(`${percent}`);
  });

  test('Test createProgressBar @ > 100% && completed = true', () => {
    const current = 3;
    const number = 2;
    const completed = true;
    const percent = '100%';
    const taskItemElement = document.createElement('task-item');
    taskItemElement.completed = completed;
    taskItemElement.number = number;
    taskItemElement.current = current;
    const progressBar = taskItemElement.createProgressBar();
    expect(progressBar.getAttribute('class')).toBe('flex-column progress');
    expect(progressBar.firstChild.getAttribute('class')).toBe(
      'progress-bar progress-bar bg-danger'
    );
    expect(progressBar.firstChild.getAttribute('role')).toBe('progressbar');
    expect(progressBar.firstChild.getAttribute('style')).toBe(
      `width: ${percent};`
    );
    expect(progressBar.firstChild.getAttribute('aria-valuenow')).toBe(
      `${current}`
    );
    expect(progressBar.firstChild.getAttribute('aria-valuemin')).toBe(
      `${number}`
    );
    expect(progressBar.firstChild.innerHTML).toBe(`${percent}`);
  });

  test('Test createTask', () => {
    const name = 'testname';
    const task = TaskItem.createTask(name);
    expect(task.getAttribute('class')).toBe(
      'p-2 flex-md-fill text-nowrap task-item'
    );
    expect(task.innerHTML).toBe(name);
  });

  test('Test createDrag', () => {
    const dragIcon = TaskItem.createDrag();
    expect(dragIcon.getAttribute('class')).toBe(
      'p-2 inline material-icons drag-btn hide'
    );
    expect(dragIcon.getAttribute('id')).toBe('drag');
    expect(dragIcon.innerHTML).toBe('drag_indicator');
  });

  test('Test createCheckmark', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };
    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;

    const checkmark = taskItemElement.createCheckmark();
    expect(checkmark.getAttribute('class')).toBe(
      'p-2 form-check form-check-inline'
    );
    expect(checkmark.getAttribute('id')).toBe('checkmark');
    expect(checkmark.childElementCount).toBe(2);
    expect(checkmark.firstChild.getAttribute('class')).toBe(
      'form-check-input input-mysize large'
    );
    expect(checkmark.firstChild.getAttribute('type')).toBe('checkbox');
    expect(checkmark.firstChild.getAttribute('job')).toBe('check');
    expect(checkmark.lastChild.getAttribute('for')).toBe('checkbox');
  });

  test('Test createPlayButton when completed = false', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };
    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;

    const playButton = taskItemElement.createPlayButton();
    expect(playButton.getAttribute('class')).toBe(
      'p-2 bd-highlight btn  play-btn flex-right hide'
    );
    expect(playButton.getAttribute('id')).toBe('play-btn');
    expect(playButton.getAttribute('type')).toBe('button');
    expect(playButton.childElementCount).toBe(1);
    expect(playButton.firstElementChild.getAttribute('class')).toBe(
      'material-icons play-btn hide'
    );
    expect(playButton.firstElementChild.getAttribute('job')).toBe('play');
    expect(playButton.firstElementChild.innerHTML).toBe('play_circle');
    expect(playButton.hasAttribute('disabled')).toBe(false);
  });

  test('Test createPlayButton when completed = true', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: true,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };

    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;

    const playButton = taskItemElement.createPlayButton();
    expect(playButton.getAttribute('class')).toBe(
      'p-2 bd-highlight btn  play-btn flex-right hide'
    );
    expect(playButton.getAttribute('id')).toBe('play-btn');
    expect(playButton.getAttribute('type')).toBe('button');
    expect(playButton.childElementCount).toBe(1);
    expect(playButton.firstElementChild.getAttribute('class')).toBe(
      'material-icons play-btn hide'
    );
    expect(playButton.firstElementChild.getAttribute('job')).toBe('play');
    expect(playButton.firstElementChild.innerHTML).toBe('play_circle');
    expect(playButton.hasAttribute('disabled')).toBe(true);
  });

  test('Test createEditButton when completed = false && not started', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };
    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;

    const editButton = taskItemElement.createEditButton();
    expect(editButton.getAttribute('class')).toBe(
      'p-2 bd-highlight btn  edit-btn flex-right hide'
    );
    expect(editButton.getAttribute('id')).toBe('edit-btn');
    expect(editButton.getAttribute('type')).toBe('button');
    expect(editButton.childElementCount).toBe(1);
    expect(editButton.firstElementChild.getAttribute('class')).toBe(
      'material-icons edit-btn hide'
    );
    expect(editButton.firstElementChild.getAttribute('job')).toBe('edit');
    expect(editButton.firstElementChild.innerHTML).toBe('mode_edit');
    expect(editButton.hasAttribute('disabled')).toBe(false);
  });

  test('Test createEditButton when completed = true && not started', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: true,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };
    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;

    const editButton = taskItemElement.createEditButton();
    expect(editButton.getAttribute('class')).toBe(
      'p-2 bd-highlight btn  edit-btn flex-right hide'
    );
    expect(editButton.getAttribute('id')).toBe('edit-btn');
    expect(editButton.getAttribute('type')).toBe('button');
    expect(editButton.childElementCount).toBe(1);
    expect(editButton.firstElementChild.getAttribute('class')).toBe(
      'material-icons edit-btn hide'
    );
    expect(editButton.firstElementChild.getAttribute('job')).toBe('edit');
    expect(editButton.firstElementChild.innerHTML).toBe('mode_edit');
    expect(editButton.hasAttribute('disabled')).toBe(true);
  });

  test('Test createEditButton when completed = false && started', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 1,
      note: 'ThisIsNotes',
    };
    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;

    const editButton = taskItemElement.createEditButton();
    expect(editButton.getAttribute('class')).toBe(
      'p-2 bd-highlight btn  edit-btn flex-right hide'
    );
    expect(editButton.getAttribute('id')).toBe('edit-btn');
    expect(editButton.getAttribute('type')).toBe('button');
    expect(editButton.childElementCount).toBe(1);
    expect(editButton.firstElementChild.getAttribute('class')).toBe(
      'material-icons edit-btn hide'
    );
    expect(editButton.firstElementChild.getAttribute('job')).toBe('edit');
    expect(editButton.firstElementChild.innerHTML).toBe('mode_edit');
    expect(editButton.hasAttribute('disabled')).toBe(true);
  });

  test('Test createEditButton when completed = true && started', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: true,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 1,
      note: 'ThisIsNotes',
    };
    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;

    const editButton = taskItemElement.createEditButton();
    expect(editButton.getAttribute('class')).toBe(
      'p-2 bd-highlight btn  edit-btn flex-right hide'
    );
    expect(editButton.getAttribute('id')).toBe('edit-btn');
    expect(editButton.getAttribute('type')).toBe('button');
    expect(editButton.childElementCount).toBe(1);
    expect(editButton.firstElementChild.getAttribute('class')).toBe(
      'material-icons edit-btn hide'
    );
    expect(editButton.firstElementChild.getAttribute('job')).toBe('edit');
    expect(editButton.firstElementChild.innerHTML).toBe('mode_edit');
    expect(editButton.hasAttribute('disabled')).toBe(true);
  });

  test('Test createDeleteButton', () => {
    const deleteButton = TaskItem.createDeleteButton();
    expect(deleteButton.getAttribute('class')).toBe(
      'p-2 bd-highlight btn  delete-btn flex-right hide'
    );
    expect(deleteButton.getAttribute('id')).toBe('delete-btn');
    expect(deleteButton.getAttribute('type')).toBe('button');
    expect(deleteButton.childElementCount).toBe(1);
    expect(deleteButton.firstElementChild.getAttribute('class')).toBe(
      'material-icons delete-btn hide'
    );
    expect(deleteButton.firstElementChild.getAttribute('job')).toBe('delete');
    expect(deleteButton.firstElementChild.innerHTML).toBe('delete');
  });
});

describe('Task Item Test Attributes', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div id = "test"> ' +
      '</div>' +
      '<button id="button" />' +
      '<input type="text" id="task-name">' +
      '<input type="text" id="task-num">' +
      '<input type="text" id="task-note">';
  });

  test('Testing name attribute', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: true,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 1,
      note: 'ThisIsNotes',
    };
    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;
    expect(taskItemElement.shadowRoot.querySelector('p').textContent).toBe(
      inputTask.name
    );
    taskItemElement.setAttribute('name', 'newTestName');
    expect(taskItemElement.shadowRoot.querySelector('p').textContent).toBe(
      'newTestName'
    );
  });

  test('Testing number attribute', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: true,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 1,
      note: 'ThisIsNotes',
    };
    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;
    expect(taskItemElement.shadowRoot.querySelector('p1').innerHTML).toBe(
      `${inputTask.current}/${inputTask.number}`
    );
    taskItemElement.setAttribute('number', 5);
    expect(taskItemElement.shadowRoot.querySelector('p1').innerHTML).toBe(
      `${inputTask.current}/5`
    );
  });

  test('Testing completed attribute false -> true (current == 0)', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };

    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;
    const playButton = taskItemElement.shadowRoot.querySelector('.play-btn');
    const editButton = taskItemElement.shadowRoot.querySelector('.edit-btn');
    expect(playButton.hasAttribute('disabled')).toBe(false);
    expect(editButton.hasAttribute('disabled')).toBe(false);
    expect(playButton.firstChild.style.color).toBe('rgb(46, 71, 86)');
    expect(editButton.firstChild.style.color).toBe('rgb(46, 71, 86)');
    taskItemElement.setAttribute('completed', 'true');
    expect(playButton.hasAttribute('disabled')).toBe(true);
    expect(editButton.hasAttribute('disabled')).toBe(true);
    expect(playButton.firstChild.style.color).toBe('rgb(196, 196, 196)');
    expect(editButton.firstChild.style.color).toBe('rgb(196, 196, 196)');
  });

  test('Testing completed attribute true -> false (current == 0)', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: true,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };

    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;
    const playButton = taskItemElement.shadowRoot.querySelector('.play-btn');
    const editButton = taskItemElement.shadowRoot.querySelector('.edit-btn');
    expect(playButton.hasAttribute('disabled')).toBe(true);
    expect(editButton.hasAttribute('disabled')).toBe(true);
    expect(playButton.firstChild.style.color).toBe('rgb(196, 196, 196)');
    expect(editButton.firstChild.style.color).toBe('rgb(196, 196, 196)');
    taskItemElement.setAttribute('completed', 'false');
    expect(playButton.hasAttribute('disabled')).toBe(false);
    expect(editButton.hasAttribute('disabled')).toBe(false);
    expect(playButton.firstChild.style.color).toBe('rgb(46, 71, 86)');
    expect(editButton.firstChild.style.color).toBe('rgb(46, 71, 86)');
  });

  test('Testing completed attribute false -> true (current == 1)', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 1,
      note: 'ThisIsNotes',
    };

    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;
    const playButton = taskItemElement.shadowRoot.querySelector('.play-btn');
    const editButton = taskItemElement.shadowRoot.querySelector('.edit-btn');
    expect(playButton.hasAttribute('disabled')).toBe(false);
    expect(editButton.hasAttribute('disabled')).toBe(true);
    expect(playButton.firstChild.style.color).toBe('rgb(46, 71, 86)');
    expect(editButton.firstChild.style.color).toBe('rgb(196, 196, 196)');
    taskItemElement.setAttribute('completed', 'true');
    expect(playButton.hasAttribute('disabled')).toBe(true);
    expect(editButton.hasAttribute('disabled')).toBe(true);
    expect(playButton.firstChild.style.color).toBe('rgb(196, 196, 196)');
    expect(editButton.firstChild.style.color).toBe('rgb(196, 196, 196)');
  });

  test('Testing completed attribute true -> false (current == 1)', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: true,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 1,
      note: 'ThisIsNotes',
    };

    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;
    const playButton = taskItemElement.shadowRoot.querySelector('.play-btn');
    const editButton = taskItemElement.shadowRoot.querySelector('.edit-btn');
    expect(playButton.hasAttribute('disabled')).toBe(true);
    expect(editButton.hasAttribute('disabled')).toBe(true);
    expect(playButton.firstChild.style.color).toBe('rgb(196, 196, 196)');
    expect(editButton.firstChild.style.color).toBe('rgb(196, 196, 196)');
    taskItemElement.setAttribute('completed', 'false');
    expect(playButton.hasAttribute('disabled')).toBe(false);
    expect(editButton.hasAttribute('disabled')).toBe(true);
    expect(playButton.firstChild.style.color).toBe('rgb(46, 71, 86)');
    expect(editButton.firstChild.style.color).toBe('rgb(196, 196, 196)');
  });

  test('Testing current attribute current 0 -> 1', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };
    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;

    const editButton = taskItemElement.shadowRoot.querySelector('.edit-btn');

    expect(editButton.hasAttribute('disabled')).toBe(false);
    expect(editButton.firstChild.style.color).toBe('rgb(46, 71, 86)');
    taskItemElement.setAttribute('current', 1);
    expect(editButton.hasAttribute('disabled')).toBe(true);
    expect(editButton.firstChild.style.color).toBe('rgb(196, 196, 196)');
  });

  test('Testing current attribute current 0 -> 0', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };
    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;

    const editButton = taskItemElement.shadowRoot.querySelector('.edit-btn');

    expect(editButton.hasAttribute('disabled')).toBe(false);
    expect(editButton.firstChild.style.color).toBe('rgb(46, 71, 86)');
    taskItemElement.setAttribute('current', 0);
    expect(editButton.hasAttribute('disabled')).toBe(false);
    expect(editButton.firstChild.style.color).toBe('rgb(46, 71, 86)');
  });

  test('Testing current attribute current 1 -> 1', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 1,
      note: 'ThisIsNotes',
    };
    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;

    const editButton = taskItemElement.shadowRoot.querySelector('.edit-btn');

    expect(editButton.hasAttribute('disabled')).toBe(true);
    expect(editButton.firstChild.style.color).toBe('rgb(196, 196, 196)');
    taskItemElement.setAttribute('current', 1);
    expect(editButton.hasAttribute('disabled')).toBe(true);
    expect(editButton.firstChild.style.color).toBe('rgb(196, 196, 196)');
  });

  test('Testing current attribute current 1 -> 0', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 1,
      note: 'ThisIsNotes',
    };
    // Create element
    const taskItemElement = document.createElement('task-item');

    // Setup taskItemElement
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;

    const editButton = taskItemElement.shadowRoot.querySelector('.edit-btn');

    expect(editButton.hasAttribute('disabled')).toBe(true);
    expect(editButton.firstChild.style.color).toBe('rgb(196, 196, 196)');
    taskItemElement.setAttribute('current', 0);
    expect(editButton.hasAttribute('disabled')).toBe(true);
    expect(editButton.firstChild.style.color).toBe('rgb(196, 196, 196)');
  });
});
