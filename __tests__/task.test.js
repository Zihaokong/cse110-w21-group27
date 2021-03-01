const TaskList = require('../source/task');

const TaskItem = require('../source/task-item');

describe('Test task-list that is initially null', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div id = "welcome-message"> </div>' +
      '<form id = "taskform"> </form>' +
      '<div id = "test"> <button id="button" />' +
      ' <input type="text" id="task-name">' +
      ' <input type="text" id="task-num">' +
      ' <input type="text" id="task-note">' +
      '</div>';
  });

  test('Creating a task list where allTasks is null', () => {
    const taskList = new TaskList.TaskList();
    document.getElementById('test').appendChild(taskList);
  });

  test('Creating a task list where allTasks is null and adding', () => {
    const taskList = document.createElement('task-list');
    document.getElementById('test').appendChild(taskList);
    const newButton = document.getElementById('button');
    document.getElementById('task-name').value = 'name';
    document.getElementById('task-num').value = 1;
    document.getElementById('task-note').value = 'note';
    newButton.addEventListener('click', (e) => taskList.addTask(e));
    newButton.click();
  });
});

describe('Test task-list that has pre-existing tasks', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div id = "welcome-message"> </div>' +
      '<form id = "taskform"> </form>' +
      '<div id = "test"> <button id="button" />' +
      ' <input type="text" id="task-name">' +
      ' <input type="text" id="task-num">' +
      ' <input type="text" id="task-note">' +
      '</div>';

    const allTasks = [];
    const inputTask1 = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };
    allTasks.push(inputTask1);
    const inputTask2 = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };
    allTasks.push(inputTask2);
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(allTasks));
  });

  test('Creating a task list with a task inside', () => {
    const taskList = new TaskList.TaskList();
    document.getElementById('test').appendChild(taskList);
  });

  test('Adding a task-item to a task list with a task inside', () => {
    const taskList = document.createElement('task-list');
    document.getElementById('test').appendChild(taskList);
    const newButton = document.getElementById('button');
    document.getElementById('task-name').value = 'name';
    document.getElementById('task-num').value = 1;
    document.getElementById('task-note').value = 'note';
    newButton.addEventListener('click', (e) => taskList.addTask(e));
    newButton.click();
  });
});
