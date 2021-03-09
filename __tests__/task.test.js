const { TaskList } = require('../source/task');

require('../source/task-item');

describe('Test task-list that is initially null', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div id = "welcome-message"> </div>' +
      '<div id = "add-task-modal"> </div>' +
      '<div id = "edit-model"> </div>' +
      '<div id = "delete-modal"> </div>' +
      '<form id = "taskform"> </form>' +
      '<div id = "test"> <button id="button" />' +
      ' <input type="text" id="task-name">' +
      ' <input type="text" id="task-num">' +
      ' <input type="text" id="task-note">' +
      ' <input type="text" id="edit-name">' +
      ' <input type="text" id="edit-num">' +
      ' <input type="text" id="edit-note">' +
      '</div>';
  });

  test('Creating a task list where allTasks is null', () => {
    const taskList = document.createElement('task-list');
    document.getElementById('test').appendChild(taskList);
    expect(
      taskList.shadowRoot
        .getElementById('main-list')
        .querySelectorAll('task-item').length
    ).toBe(0);
  });

  test('Creating a task list where allTasks is null and adding via form', () => {
    const taskList = document.createElement('task-list');
    document.getElementById('test').appendChild(taskList);
    document.getElementById('task-name').value = 'name';
    document.getElementById('task-num').value = 1;
    document.getElementById('task-note').value = 'note';
    document.getElementById('taskform').submit();
    expect(
      taskList.shadowRoot.getElementById('main-list').children.length
    ).toBe(1);
  });
});

describe('Test task-list that has pre-existing tasks', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div id = "welcome-message"> </div>' +
      '<div id = "add-task-modal"> </div>' +
      '<div id = "edit-model"> </div>' +
      '<div id = "delete-modal"> </div>' +
      '<form id = "taskform"> </form>' +
      '<div id = "test"> <button id="button" />' +
      ' <input type="text" id="task-name">' +
      ' <input type="text" id="task-num">' +
      ' <input type="text" id="task-note">' +
      ' <input type="text" id="edit-name">' +
      ' <input type="text" id="edit-num">' +
      ' <input type="text" id="edit-note">' +
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
    const taskList = document.createElement('task-list');
    document.getElementById('test').appendChild(taskList);
    expect(
      taskList.shadowRoot
        .getElementById('main-list')
        .querySelectorAll('task-item').length
    ).toBe(2);
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
    expect(
      taskList.shadowRoot
        .getElementById('main-list')
        .querySelectorAll('task-item').length
    ).toBe(3);
  });
});
describe('Test task-list dragging', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div id = "welcome-message"> </div>' +
      '<div id = "add-task-modal"> </div>' +
      '<div id = "edit-model"> </div>' +
      '<div id = "delete-modal"> </div>' +
      '<form id = "taskform"> </form>' +
      '<div id = "test"> <button id="button" />' +
      ' <input type="text" id="task-name">' +
      ' <input type="text" id="task-num">' +
      ' <input type="text" id="task-note">' +
      ' <input type="text" id="edit-name">' +
      ' <input type="text" id="edit-num">' +
      ' <input type="text" id="edit-note">' +
      '</div>';

    const allTasks = [];
    const inputTask1 = {
      id: '05023c2908555',
      completed: true,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };
    allTasks.push(inputTask1);
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(allTasks));
  });

  test('', () => {
    const taskList = document.createElement('task-list');
    document.getElementById('test').appendChild(taskList);
    const taskItem = taskList.shadowRoot.getElementById('05023c2908555');
    const dropzone = taskList.shadowRoot.querySelector('ul');
    const event = new Event('dragstart');
    Object.defineProperty(event, 'target', {
      writable: false,
      value: taskItem,
    });
    expect(taskList.checked).toBe(false);
    expect(taskList.selectedNode).toBe(null);
    dropzone.dispatchEvent(event);
    expect(taskList.checked).toBe(true);
    expect(taskList.selectedNode).toBe(taskItem);
  });
});
