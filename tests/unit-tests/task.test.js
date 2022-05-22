require('../../source/components/task-item/task-item');
require('../../source/components/task-list/task-list');

describe('Test task-list that is initially null', () => {
  beforeEach(() => {
    // Set up the inner HTML so that functions inside of Task can find elements
    //  in the document they are looking for.
    document.body.innerHTML = '<body><body>';
  });

  test('Creating a task list where allTasks is null', () => {
    // Test list to make sure that it starts with no task items
    const taskList = document.createElement('task-list');
    document.querySelector('body').appendChild(taskList);
    expect(taskList.shadowRoot.querySelectorAll('task-item').length).toBe(0);
  });

  test('Creating a task list where allTasks is null and adding via form', () => {
    // Create a task item inside the task list.
    const taskList = document.createElement('task-list');
    document.querySelector('body').appendChild(taskList);
    taskList.shadowRoot.querySelector('input[content="title"]').value =
      'testName';
    taskList.shadowRoot.querySelector('input[content="count"]').value = 1;
    taskList.shadowRoot.querySelector('form').submit();

    // Expect there to be one task item
    expect(taskList.shadowRoot.querySelectorAll('task-item').length).toBe(1);

    // Test name
    expect(
      taskList.shadowRoot.querySelectorAll('task-item')[0].getAttribute('name')
    ).toBe('testName');

    // Test num
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[0]
        .getAttribute('number')
    ).toBe('1');

    // Test current
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[0]
        .getAttribute('current')
    ).toBe('0');

    // Test completed
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[0]
        .getAttribute('completed')
    ).toBe('false');

    // Test the allTasks values for the task item
    expect(taskList.allTasks[0].name).toBe('testName');
    expect(taskList.allTasks[0].number).toBe('1');
    expect(taskList.allTasks[0].note).toBe('');
  });
});

describe('Test task-list that has pre-existing tasks', () => {
  beforeEach(() => {
    // Set up the inner HTML so that functions inside of Task can find elements
    //  in the document they are looking for.
    document.body.innerHTML = '<body><body>';

    const allTasks = [];

    // Set up first task item to me inserted into the mock memory
    const inputTask1 = {
      id: '1',
      completed: false,
      name: 'name1',
      number: 1,
      current: 0,
      note: 'note1',
    };
    allTasks.push(inputTask1);

    // Set up second task item to me inserted into the mock memory
    const inputTask2 = {
      id: '2',
      completed: true,
      name: 'name2',
      number: 2,
      current: 1,
      note: 'note2',
    };
    allTasks.push(inputTask2);

    // Mock storage
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(allTasks));
  });

  test('Creating a task list with a task inside', () => {
    // Create and set task list element in document
    const taskList = document.createElement('task-list');
    document.querySelector('body').appendChild(taskList);
    // Expect there to be two task items
    expect(taskList.shadowRoot.querySelectorAll('task-item').length).toBe(2);

    // First Child Testing
    // Test id
    expect(
      taskList.shadowRoot.querySelectorAll('task-item')[1].getAttribute('id')
    ).toBe('1');

    // Test name
    expect(
      taskList.shadowRoot.querySelectorAll('task-item')[1].getAttribute('name')
    ).toBe('name1');

    // Test numumber
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[1]
        .getAttribute('number')
    ).toBe('1');

    // Test current
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[1]
        .getAttribute('current')
    ).toBe('0');

    // Test completed
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[1]
        .getAttribute('completed')
    ).toBe('false');

    // Test the allTasks values for the task item
    expect(taskList.allTasks[0].name).toBe('name1');
    expect(taskList.allTasks[0].number).toBe(1);
    expect(taskList.allTasks[0].note).toBe('note1');

    // Second Child Testing
    // Test id
    expect(
      taskList.shadowRoot.querySelectorAll('task-item')[0].getAttribute('id')
    ).toBe('2');

    // Test name
    expect(
      taskList.shadowRoot.querySelectorAll('task-item')[0].getAttribute('name')
    ).toBe('name2');

    // Test number
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[0]
        .getAttribute('number')
    ).toBe('2');

    // Test current
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[0]
        .getAttribute('current')
    ).toBe('1');

    // Test completed
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[0]
        .getAttribute('completed')
    ).toBe('true');

    // Test the allTasks values for the task item
    expect(taskList.allTasks[1].name).toBe('name2');
    expect(taskList.allTasks[1].number).toBe(2);
    expect(taskList.allTasks[1].note).toBe('note2');
  });

  test('Adding a task-item to a task list with a task inside', () => {
    const taskList = document.createElement('task-list');
    document.querySelector('body').appendChild(taskList);
    taskList.shadowRoot.querySelector('input[content="title"]').value = 'name3';
    taskList.shadowRoot.querySelector('input[content="count"]').value = 3;
    taskList.shadowRoot.querySelector('form').submit();
    expect(taskList.shadowRoot.querySelectorAll('task-item').length).toBe(3);

    // First Child Testing
    // Test id
    expect(
      taskList.shadowRoot.querySelectorAll('task-item')[2].getAttribute('id')
    ).toBe('1');

    // Test name
    expect(
      taskList.shadowRoot.querySelectorAll('task-item')[2].getAttribute('name')
    ).toBe('name1');

    // Test numumber
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[2]
        .getAttribute('number')
    ).toBe('1');

    // Test current
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[2]
        .getAttribute('current')
    ).toBe('0');

    // Test completed
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[2]
        .getAttribute('completed')
    ).toBe('false');

    // Test the allTasks values for the task item
    expect(taskList.allTasks[0].name).toBe('name1');
    expect(taskList.allTasks[0].number).toBe(1);
    expect(taskList.allTasks[0].note).toBe('note1');

    // Second Child Testing
    // Test id
    expect(
      taskList.shadowRoot.querySelectorAll('task-item')[1].getAttribute('id')
    ).toBe('2');

    // Test name
    expect(
      taskList.shadowRoot.querySelectorAll('task-item')[1].getAttribute('name')
    ).toBe('name2');

    // Test number
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[1]
        .getAttribute('number')
    ).toBe('2');

    // Test current
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[1]
        .getAttribute('current')
    ).toBe('1');

    // Test completed
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[1]
        .getAttribute('completed')
    ).toBe('true');

    // Test the allTasks values for the task item
    expect(taskList.allTasks[1].name).toBe('name2');
    expect(taskList.allTasks[1].number).toBe(2);
    expect(taskList.allTasks[1].note).toBe('note2');

    // Third Child Testing
    // Test name
    expect(
      taskList.shadowRoot.querySelectorAll('task-item')[0].getAttribute('name')
    ).toBe('name3');

    // Test numumber
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[0]
        .getAttribute('number')
    ).toBe('3');

    // Test current
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[0]
        .getAttribute('current')
    ).toBe('0');

    // Test completed
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[0]
        .getAttribute('completed')
    ).toBe('false');

    // Test the allTasks values for the task item
    expect(taskList.allTasks[2].name).toBe('name3');
    expect(taskList.allTasks[2].number).toBe('3');
    expect(taskList.allTasks[2].note).toBe('');
  });
});

/*
describe('Test task-list dragging', () => {
  beforeEach(() => {
    // Set up the inner HTML so that functions inside of Task can find elements
    //  in the document they are looking for.
    document.body.innerHTML = '<body><body>';

    const allTasks = [];

    // Set up first task item to me inserted into the mock memory
    const inputTask1 = {
      id: '1',
      completed: false,
      name: 'name1',
      number: 1,
      current: 0,
      note: 'note1',
    };
    allTasks.push(inputTask1);

    // Set up second task item to me inserted into the mock memory
    const inputTask2 = {
      id: '2',
      completed: true,
      name: 'name2',
      number: 2,
      current: 1,
      note: 'note2',
    };
    allTasks.push(inputTask2);

    // Mock Storage
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(allTasks));
  });

  test('Test dragging', () => {
    // Create and set task list element in document
    const taskList = document.createElement('task-list');
    document.querySelector('body').appendChild(taskList);

    // Mock establishNodePositions function as this function is dependent on
    // the .getBoundingClientRect() function.
    taskList.establishNodePositions = jest.fn(() => {});

    // get the first task item (one at top)
    const draggedTask = taskList.shadowRoot.getElementById('1');

    // Get the dropzone which handles drag n' drop functionality
    const dropzone = taskList.shadowRoot.querySelector('section');

    // Create events to mimic dragging events that the user would trigger.
    const dragStartEvent = new Event('dragstart');
    const dragOverEvent = new Event('dragover');
    Object.defineProperty(dragStartEvent, 'target', {
      writable: false,
      value: draggedTask,
    });

    // Before drag event has occured, expect it to be the same element
    expect(taskList.allTasks[0].id).toBe('1');

    // Set up event.
    taskList.nodes[0].yPos = 1;
    taskList.nodes[1].yPos = 4;
    dragOverEvent.clientY = 5;
    expect(taskList.checked).toBe(false);
    expect(taskList.selectedNode).toBe(null);
    dropzone.dispatchEvent(dragStartEvent);
    expect(taskList.checked).toBe(false);
    expect(taskList.selectedNode).toBe(draggedTask);
    dropzone.dispatchEvent(dragOverEvent);

    // New First Child Testing
    // Test id
    expect(
      taskList.shadowRoot.querySelectorAll('task-item')[0].getAttribute('id')
    ).toBe('2');

    // Test name
    expect(
      taskList.shadowRoot.querySelectorAll('task-item')[0].getAttribute('name')
    ).toBe('name2');

    // Test number
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[0]
        .getAttribute('number')
    ).toBe('2');

    // Test current
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[0]
        .getAttribute('current')
    ).toBe('1');

    // Test completed
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[0]
        .getAttribute('completed')
    ).toBe('true');

    // Test the allTasks values for the task item
    expect(taskList.allTasks[0].name).toBe('name2');
    expect(taskList.allTasks[0].number).toBe(2);
    expect(taskList.allTasks[0].note).toBe('note2');

    // New Second Child Testing
    // Test id
    expect(
      taskList.shadowRoot.querySelectorAll('task-item')[1].getAttribute('id')
    ).toBe('1');

    // Test name
    expect(
      taskList.shadowRoot.querySelectorAll('task-item')[1].getAttribute('name')
    ).toBe('name1');

    // Test numumber
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[1]
        .getAttribute('number')
    ).toBe('1');

    // Test current
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[1]
        .getAttribute('current')
    ).toBe('0');

    // Test completed
    expect(
      taskList.shadowRoot
        .querySelectorAll('task-item')[1]
        .getAttribute('completed')
    ).toBe('false');

    // Test the allTasks values for the task item
    expect(taskList.allTasks[1].name).toBe('name1');
    expect(taskList.allTasks[1].number).toBe(1);
    expect(taskList.allTasks[1].note).toBe('note1');
  });

  test('Test establishNodePositions function', () => {
    // Create and set task list element in document
    const taskList = document.createElement('task-list');
    document.querySelector('body').appendChild(taskList);
    taskList.nodes[0].getBoundingClientRect = jest.fn(() => ({
      bottom: 2,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    }));
    taskList.nodes[1].getBoundingClientRect = jest.fn(() => ({
      bottom: 4,
      height: 0,
      left: 0,
      right: 0,
      top: 2,
      width: 0,
    }));
    taskList.establishNodePositions();
    expect(taskList.nodes[0].yPos).toBe(1);
    expect(taskList.nodes[1].yPos).toBe(3);
  });
});
*/
describe('Test other event functions', () => {
  beforeEach(() => {
    // Set up the inner HTML so that functions inside of Task can find elements
    //  in the document they are looking for.
    document.body.innerHTML = '<body><body>';

    const allTasks = [];

    // Set up first task item to me inserted into the mock memory
    const inputTask1 = {
      id: '1',
      completed: false,
      name: 'name1',
      number: 1,
      current: 0,
      note: 'note1',
    };
    allTasks.push(inputTask1);

    // Set up second task item to me inserted into the mock memory
    const inputTask2 = {
      id: '2',
      completed: true,
      name: 'name2',
      number: 2,
      current: 1,
      note: 'note2',
    };
    allTasks.push(inputTask2);

    // Mock Storage
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(allTasks));
  });
  /*
  test('Test editTask event', () => {
    // Create and set task list element in document
    const taskList = document.createElement('task-list');
    document.querySelector('body').appendChild(taskList);

    // Get task item 1's button
    const taskItem = taskList.shadowRoot.getElementById('1');
    const taskItemButton = taskItem.shadowRoot.querySelector(
      'button[job="edit"]'
    );

    // Get edit form
    const editForm = document.getElementById('editform');

    // Define edit event
    const editEvent = new Event('click');
    Object.defineProperty(editEvent, 'target', {
      writable: false,
      value: taskItemButton,
    });

    // Define submit event
    const submitEvent = new Event('submit');

    // Run editTask
    taskList.editTask(editEvent);

    // Prime edit inputs.
    document.getElementById('edit-name').value = 'testNameEdit';
    document.getElementById('edit-num').value = 2;
    document.getElementById('edit-note').value = 'note edit';

    // submit changes
    editForm.dispatchEvent(submitEvent);
    expect(taskItem.name).toBe('testNameEdit');
    expect(taskItem.number).toBe('2');
    expect(taskList.allTasks[0].name).toBe('testNameEdit');
    expect(taskList.allTasks[0].number).toBe('2');
    expect(taskList.allTasks[0].note).toBe('note edit');
  });

  test('Test deleteTask event', () => {
    // Create and set task list element in document
    const taskList = document.createElement('task-list');
    document.querySelector('body').appendChild(taskList);

    // Get task item 1's button
    const taskItem = taskList.shadowRoot.getElementById('1');
    const taskItemButton = taskItem.shadowRoot.querySelector(
      'button[job="delete"]'
    );

    // Define delete event
    const deleteEvent = new Event('click');
    Object.defineProperty(deleteEvent, 'target', {
      writable: false,
      value: taskItemButton,
    });

    // Define submit event
    const confirmEvent = new Event('click');

    // Run deleteTask
    taskList.deleteTask(deleteEvent);

    // comfirm changes
    document.getElementById('confirm-button').dispatchEvent(confirmEvent);
    expect(taskList.contains(taskItem)).toBe(false);
    expect(taskList.allTasks[0].id).toBe('2');
  });
*/
  test('Test setCheck event', () => {
    // Create and set task list element in document
    const taskList = document.createElement('task-list');
    document.querySelector('body').appendChild(taskList);

    // Get task item 1's button
    const taskItem = taskList.shadowRoot.getElementById('1');
    const taskItemCheck = taskItem.shadowRoot.querySelector('input');

    // Define check event
    const checkEvent = new Event('click');
    Object.defineProperty(checkEvent, 'target', {
      writable: false,
      value: taskItemCheck,
    });

    // Run setCheck
    taskList.setCheck(checkEvent);

    // comfirm changes
    expect(taskList.allTasks[0].completed).toBe(true);
    expect(taskItem.completed).toBe('true');

    // Run setCheck again
    taskList.setCheck(checkEvent);

    // comfirm changes
    expect(taskList.allTasks[0].completed).toBe(false);
    expect(taskItem.completed).toBe('false');
  });
  /*
  test('Test playTask even (aka play event)', () => {
    // Create and set task list element in document
    const taskList = document.createElement('task-list');
    document.querySelector('body').appendChild(taskList);

    // Get task item 1's button
    const taskItem = taskList.shadowRoot.getElementById('1');
    const taskItemPlayBtn = taskItem.shadowRoot.querySelector(
      'button[job="play"]'
    );

    // Define play event
    const playEvent = new Event('click');
    Object.defineProperty(playEvent, 'target', {
      writable: false,
      value: taskItemPlayBtn,
    });

    // Run playTask
    taskList.playTask(playEvent);

    // comfirm changes
    expect(document.getElementById('play-modal').style.display).toBe('block');
    expect(document.getElementById('timer-name').innerText).toBe('name1');
    expect(document.getElementById('timer-note').innerText).toBe('note1');
  });
  */
});
/*
describe('stress testing tasks', () => {
  beforeEach(() => {
    // Set up the inner HTML so that functions inside of Task can find elements
    //  in the document they are looking for.
    document.body.innerHTML = '<body><body>';
    Storage.prototype.getItem = jest.fn(() => {});
  });

  test('Test creating 1000 events', () => {
    const taskList = document.createElement('task-list');
    document.querySelector('body').appendChild(taskList);
    const newButton = document.getElementById('button');
    newButton.addEventListener('click', (e) => taskList.addTask(e));
    for (let i = 0; i < 1000; i++) {
      // Create and set task list element in document
      document.getElementById('task-name').value = `testName${i}`;
      document.getElementById('task-num').value = 1 + (i % 10);
      document.getElementById('task-note').value = `testNote${i}`;
      newButton.click();
    }
    for (let i = 0; i < 1000; i++) {
      // Test name
      expect(
        taskList.shadowRoot
          .querySelectorAll('task-item')
          [i].getAttribute(`name`)
      ).toBe(`testName${i}`);

      // Test numumber
      expect(
        taskList.shadowRoot
          .querySelectorAll('task-item')
          [i].getAttribute('number')
      ).toBe(`${1 + (i % 10)}`);

      // Test current
      expect(
        taskList.shadowRoot
          .querySelectorAll('task-item')
          [i].getAttribute('current')
      ).toBe('0');

      // Test completed
      expect(
        taskList.shadowRoot
          .querySelectorAll('task-item')
          [i].getAttribute('completed')
      ).toBe('false');

      // Test the allTasks values for the task item
      expect(taskList.allTasks[i].name).toBe(`testName${i}`);
      expect(taskList.allTasks[i].number).toBe(`${1 + (i % 10)}`);
      expect(taskList.allTasks[i].note).toBe(`testNote${i}`);
    }
  });
});
*/
