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
    const createCheckmarkSpy = jest.spyOn(TaskItem, 'createCheckmark');
    const createTaskSpy = jest.spyOn(TaskItem, 'createTask');
    const createProgressBarSpy = jest.spyOn(TaskItem, 'createProgressBar');
    const createProgressTextSpy = jest.spyOn(TaskItem, 'createProgressText');
    const createPlayButtonSpy = jest.spyOn(TaskItem, 'createPlayButton');
    const createEditButtonSpy = jest.spyOn(TaskItem, 'createEditButton');
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
    expect(createProgressTextSpy).toHaveBeenCalled();
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

describe('Task Item Test Static Functions', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div id = "test"> ' +
      '</div>' +
      '<button id="button" />' +
      '<input type="text" id="task-name">' +
      '<input type="text" id="task-num">' +
      '<input type="text" id="task-note">';
  });

  test('Test createProgressBar @ < 100%', () => {
    const current = 0;
    const number = 2;
    let percent;
    if (number !== 0) {
      percent = (current / number) * 100;
    } else {
      percent = undefined;
    }
    if (percent >= 100) {
      percent = '100%';
    } else {
      percent = `${percent.toFixed(2)}%`;
    }
    const progressBar = TaskItem.createProgressBar(current, number);
    expect(progressBar.getAttribute('class')).toBe('flex-column progress');
    expect(progressBar.firstChild.getAttribute('class')).toBe(
      'progress-bar progress-bar-striped bg-success'
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

  test('Test createProgressBar @ 100%', () => {
    const current = 2;
    const number = 2;
    let percent;
    if (number !== 0) {
      percent = (current / number) * 100;
    } else {
      percent = undefined;
    }
    if (percent >= 100) {
      percent = '100%';
    } else {
      percent = `${percent.toFixed(2)}%`;
    }
    const progressBar = TaskItem.createProgressBar(current, number);
    expect(progressBar.getAttribute('class')).toBe('flex-column progress');
    expect(progressBar.firstChild.getAttribute('class')).toBe(
      'progress-bar progress-bar-striped bg-success'
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

  test('Test createProgressBar @ > 100%', () => {
    const current = 3;
    const number = 2;
    let percent;
    if (number !== 0) {
      percent = (current / number) * 100;
    } else {
      percent = undefined;
    }
    if (percent >= 100) {
      percent = '100%';
    } else {
      percent = `${percent.toFixed(2)}%`;
    }
    const progressBar = TaskItem.createProgressBar(current, number);
    expect(progressBar.getAttribute('class')).toBe('flex-column progress');
    expect(progressBar.firstChild.getAttribute('class')).toBe(
      'progress-bar progress-bar-striped bg-danger'
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

  test('Test createProgressBar @ < 0%', () => {
    const current = 3;
    const number = 0;
    let percent;
    if (number !== 0) {
      percent = (current / number) * 100;
    } else {
      percent = undefined;
    }
    if (percent >= 100) {
      percent = '100%';
    } else if (percent !== undefined) {
      percent = `${percent.toFixed(2)}%`;
    } else {
      percent = `ERROR! Number of Pomos less than 1`;
    }
    const progressBar = TaskItem.createProgressBar(current, number);
    expect(progressBar.getAttribute('class')).toBe('flex-column progress');
    expect(progressBar.firstChild.getAttribute('class')).toBe(
      'progress-bar progress-bar-striped bg-danger'
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

  test('Test createProgressText', () => {
    const current = 0;
    const number = 2;
    const dragIcon = TaskItem.createProgressText(current, number);
    expect(dragIcon.getAttribute('class')).toBe('progress-text');
    expect(dragIcon.innerHTML).toBe(`${current}/${number}`);
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
    const checkmark = TaskItem.createCheckmark();
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

  test('Test createPlayButton', () => {
    const deleteButton = TaskItem.createPlayButton();
    expect(deleteButton.getAttribute('class')).toBe(
      'p-2 bd-highlight btn  play-btn flex-right hide'
    );
    expect(deleteButton.getAttribute('id')).toBe('play-btn');
    expect(deleteButton.getAttribute('type')).toBe('button');
    expect(deleteButton.childElementCount).toBe(1);
    expect(deleteButton.firstElementChild.getAttribute('class')).toBe(
      'material-icons play-btn hide'
    );
    expect(deleteButton.firstElementChild.getAttribute('job')).toBe('play');
    expect(deleteButton.firstElementChild.innerHTML).toBe('play_circle');
  });

  test('Test createEditButton', () => {
    const editButton = TaskItem.createEditButton();
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
