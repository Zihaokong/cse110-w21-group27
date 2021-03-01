const TaskItem = require('../source/task-item');

describe('Pass in to constructor test', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div id = "test"> <button id="button" />' +
      ' <input type="text" id="task-name">' +
      ' <input type="text" id="task-num">' +
      ' <input type="text" id="task-note">' +
      '</div>';
  });

  test('New instance has the correct id and classes', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };
    const taskItemElement = document.createElement('task-item');
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;
  });

  test('100% Instance is created', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 4,
      note: 'ThisIsNotes',
    };
    const taskItemElement = document.createElement('task-item');
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;
  });

  test(' > 100% Instance is created', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 5,
      note: 'ThisIsNotes',
    };
    const taskItemElement = document.createElement('task-item');
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;
  });

  test('getters are correct', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 5,
      note: 'ThisIsNotes',
    };
    const taskItemElement = document.createElement('task-item');
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;
  });

  test('Create task-item in document', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };
    const taskItemElement = document.createElement('task-item');
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;
  });

  test('Create & delete task-item in document', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };
    const taskItemElement = document.createElement('task-item');
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;
  });

  test('Create task using createElement function', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };
    const taskItemElement = document.createElement('task-item');
    taskItemElement.setAttribute('id', inputTask.id);
    taskItemElement.completed = inputTask.completed;
    taskItemElement.name = inputTask.name;
    taskItemElement.number = inputTask.number;
    taskItemElement.current = inputTask.current;
    taskItemElement.note = inputTask.note;
    document.getElementById('test').appendChild(taskItemElement);
    taskItemElement.checkmark.checked = inputTask.completed;
    expect(taskItemElement.taskName).toMatch(inputTask.name);
  });
});
