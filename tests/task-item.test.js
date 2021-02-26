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
    const item = new TaskItem.TaskItem(inputTask);
    expect(item.id).toBe('05023c2908555');
    expect(item.className).toMatch('taskNode d-flex flex-row bd-highlight');
    expect(item.draggable).toBe(true);
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

    const item = new TaskItem.TaskItem(inputTask);
    document.getElementById('test').appendChild(item);
  });
});