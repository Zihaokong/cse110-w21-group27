const TaskList = require('../source/task');

describe('Testing creation of TaskList object with empty allTasks', () => {
  test('Tasklist test', () => {
    document.body.innerHTML =
      '<div id = "test"> <button id="button" />' +
      ' <input type="text" id="task-name">' +
      ' <input type="text" id="task-num">' +
      ' <input type="text" id="task-note">' +
      '</div>';
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
