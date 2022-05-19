const { TaskItem } = require('../../source/task-item');

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

    // Setup taskItemElement
    taskItemElement.id = inputTask.id;
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
    expect(progressBar.firstChild).not.toBe(null);
    expect(progressBar.firstChild.style.width).toBe(percent);
    expect(progressBar.firstChild.innerHTML).toBe(`${current}/${number}`);
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
    expect(progressBar.firstChild).not.toBe(null);
    expect(progressBar.firstChild.style.width).toBe(percent);
    expect(progressBar.firstChild.innerHTML).toBe(`${current}/${number}`);
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
    expect(progressBar.firstChild).not.toBe(null);
    expect(progressBar.firstChild.style.width).toBe(percent);
    expect(progressBar.firstChild.innerHTML).toBe(`${current}/${number}`);
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
    expect(progressBar.firstChild).not.toBe(null);
    expect(progressBar.firstChild.style.width).toBe(percent);
    expect(progressBar.firstChild.innerHTML).toBe(`${current}/${number}`);
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
    expect(progressBar.firstChild).not.toBe(null);
    expect(progressBar.firstChild.style.width).toBe(percent);
    expect(progressBar.firstChild.innerHTML).toBe(`${current}/${number}`);
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
    expect(progressBar.firstChild).not.toBe(null);
    expect(progressBar.firstChild.style.width).toBe(percent);
    expect(progressBar.firstChild.innerHTML).toBe(`${current}/${number}`);
  });

  test('Test createTitle', () => {
    const name = 'testname';
    const title = TaskItem.createTitle(name);
    expect(title.getAttribute('class')).toBe(null);
    expect(title.tagName).toBe('H1');
    expect(title.innerHTML).toBe(name);
  });

  test('Test createDrag', () => {
    const dragIcon = TaskItem.createDrag();
    expect(dragIcon.getAttribute('class')).toBe('icon');
    expect(dragIcon.tagName).toBe('DRAG-IND');
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
    taskItemElement.id = inputTask.id;
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;

    const checkmark = taskItemElement.createCheckmark();

    expect(checkmark.tagName).toBe('INPUT');
    expect(checkmark.getAttribute('type')).toBe('checkbox');
    expect(checkmark.checked).toBe(false);
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
    expect(playButton.tagName).toBe('BUTTON');
    expect(playButton.getAttribute('class')).toBe('icon');
    expect(playButton.getAttribute('job')).toBe('play');
    expect(playButton.textContent).toBe('play_circle');
    expect(playButton.disabled).toBe(false);
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
    expect(playButton.tagName).toBe('BUTTON');
    expect(playButton.getAttribute('class')).toBe('icon');
    expect(playButton.getAttribute('job')).toBe('play');
    expect(playButton.textContent).toBe('play_circle');
    expect(playButton.disabled).toBe(true);
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
    expect(editButton.tagName).toBe('BUTTON');
    expect(editButton.getAttribute('class')).toBe('icon');
    expect(editButton.getAttribute('job')).toBe('edit');
    expect(editButton.textContent).toBe('mode_edit');
    expect(editButton.disabled).toBe(false);
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
    expect(editButton.tagName).toBe('BUTTON');
    expect(editButton.getAttribute('class')).toBe('icon');
    expect(editButton.getAttribute('job')).toBe('edit');
    expect(editButton.textContent).toBe('mode_edit');
    expect(editButton.disabled).toBe(true);
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
    expect(editButton.tagName).toBe('BUTTON');
    expect(editButton.getAttribute('class')).toBe('icon');
    expect(editButton.getAttribute('job')).toBe('edit');
    expect(editButton.textContent).toBe('mode_edit');
    expect(editButton.disabled).toBe(true);
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
    expect(editButton.tagName).toBe('BUTTON');
    expect(editButton.getAttribute('class')).toBe('icon');
    expect(editButton.getAttribute('job')).toBe('edit');
    expect(editButton.textContent).toBe('mode_edit');
    expect(editButton.disabled).toBe(true);
  });

  test('Test createDeleteButton', () => {
    const deleteButton = TaskItem.createDeleteButton();
    expect(deleteButton.tagName).toBe('BUTTON');
    expect(deleteButton.getAttribute('class')).toBe('icon');
    expect(deleteButton.getAttribute('job')).toBe('delete');
    expect(deleteButton.textContent).toBe('delete');
    expect(deleteButton.disabled).toBe(false);
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
    expect(taskItemElement.shadowRoot.querySelector('h1').textContent).toBe(
      inputTask.name
    );
    taskItemElement.setAttribute('name', 'newTestName');
    expect(taskItemElement.shadowRoot.querySelector('h1').textContent).toBe(
      'newTestName'
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
    const playButton = taskItemElement.shadowRoot.querySelector(
      'button[job="play"]'
    );
    const editButton = taskItemElement.shadowRoot.querySelector(
      'button[job="edit"]'
    );
    expect(playButton.disabled).toBe(false);
    expect(editButton.disabled).toBe(false);
    taskItemElement.setAttribute('completed', 'true');
    expect(playButton.disabled).toBe(true);
    expect(editButton.disabled).toBe(true);
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
    const playButton = taskItemElement.shadowRoot.querySelector(
      'button[job="play"]'
    );
    const editButton = taskItemElement.shadowRoot.querySelector(
      'button[job="edit"]'
    );
    expect(playButton.hasAttribute('disabled')).toBe(true);
    expect(editButton.hasAttribute('disabled')).toBe(true);
    taskItemElement.setAttribute('completed', 'false');
    expect(playButton.hasAttribute('disabled')).toBe(false);
    expect(editButton.hasAttribute('disabled')).toBe(false);
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
    const playButton = taskItemElement.shadowRoot.querySelector(
      'button[job="play"]'
    );
    const editButton = taskItemElement.shadowRoot.querySelector(
      'button[job="edit"]'
    );
    expect(playButton.hasAttribute('disabled')).toBe(false);
    expect(editButton.hasAttribute('disabled')).toBe(true);
    taskItemElement.setAttribute('completed', 'true');
    expect(playButton.hasAttribute('disabled')).toBe(true);
    expect(editButton.hasAttribute('disabled')).toBe(true);
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
    const playButton = taskItemElement.shadowRoot.querySelector(
      'button[job="play"]'
    );
    const editButton = taskItemElement.shadowRoot.querySelector(
      'button[job="edit"]'
    );
    expect(playButton.hasAttribute('disabled')).toBe(true);
    expect(editButton.hasAttribute('disabled')).toBe(true);
    taskItemElement.setAttribute('completed', 'false');
    expect(playButton.hasAttribute('disabled')).toBe(false);
    expect(editButton.hasAttribute('disabled')).toBe(true);
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

    const editButton = taskItemElement.shadowRoot.querySelector(
      'button[job="edit"]'
    );

    expect(editButton.hasAttribute('disabled')).toBe(false);
    taskItemElement.setAttribute('current', 1);
    expect(editButton.hasAttribute('disabled')).toBe(true);
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

    const editButton = taskItemElement.shadowRoot.querySelector(
      'button[job="edit"]'
    );

    expect(editButton.hasAttribute('disabled')).toBe(false);
    taskItemElement.setAttribute('current', 0);
    expect(editButton.hasAttribute('disabled')).toBe(false);
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

    const editButton = taskItemElement.shadowRoot.querySelector(
      'button[job="edit"]'
    );

    expect(editButton.hasAttribute('disabled')).toBe(true);
    taskItemElement.setAttribute('current', 1);
    expect(editButton.hasAttribute('disabled')).toBe(true);
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

    const editButton = taskItemElement.shadowRoot.querySelector(
      'button[job="edit"]'
    );

    expect(editButton.hasAttribute('disabled')).toBe(true);
    taskItemElement.setAttribute('current', 0);
    expect(editButton.hasAttribute('disabled')).toBe(true);
  });
});
