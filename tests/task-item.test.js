const tastItem = require('../source/task-item');

describe('Pass in to constructor test', () => {
  test('New instance has the correct id and classes', () => {
    const inputTask = {
      id: '05023c2908555',
      completed: false,
      name: 'ThisIsATestingTask',
      number: 4,
      current: 0,
      note: 'ThisIsNotes',
    };
    const item = new tastItem.TaskItem(inputTask);
    expect(item.id).toBe('05023c2908555');
    expect(item.className).toMatch('taskNode d-flex flex-row bd-highlight');
    expect(item.draggable).toBe(true);
  });
});
