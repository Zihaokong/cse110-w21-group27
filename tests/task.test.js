const TaskList = require('../source/task');

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

describe('Testing creation of TaskList object with empty allTasks', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<p id="welcome-message"> </p>' +
      '<div id = "test"> <button id="button" />' +
      ' <input type="text" id="task-name">' +
      ' <input type="text" id="task-num">' +
      ' <input type="text" id="task-note">' +
      '</div>';
    const welcome = document.getElementById('welcome-message');
    global.localStorage = new LocalStorageMock();
  });

  test('Creating a task list where allTasks is null', () => {
    const taskList = new TaskList.TaskList();
    document.getElementById('test').appendChild(taskList);
  });

  test('Creating a task list where allTasks is empty', () => {
    global.localStorage.setItem('allTasks', '{ }');
    const taskList = new TaskList.TaskList();
    document.getElementById('test').appendChild(taskList);
  });

  test('Creating a task list and adding a new task', () => {
    global.localStorage.setItem('allTasks', '{ }');
    const taskList = new TaskList.TaskList();
    const newButton = document.getElementById('button');
    document.getElementById('task-name').value = 'name';
    document.getElementById('task-num').value = 1;
    document.getElementById('task-note').value = 'note';
    newButton.addEventListener('click', (e) => taskList.addTask(e));
    document.getElementById('test').appendChild(taskList);
    newButton.click();
  });
});
