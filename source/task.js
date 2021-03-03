/**
 * This file defines functions and implements the behaviors of task list.
 */
// Section for ESLint
/* global closeModal */
let allTasks;
let dropzone;

/**
 * Class constructor for <task-list>
 */
class TaskList extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: 'open',
    });

    shadow.innerHTML = `<link rel="stylesheet" href="task.css"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"/>`;
  }

  connectedCallback() {
    const list = document.createElement('ul');
    list.setAttribute('id', 'main-list');
    list.setAttribute('class', 'task-container d-flex');
    this.shadowRoot.append(list);
    const retrievedObject = localStorage.getItem('allTasks');
    if (!retrievedObject || retrievedObject === 'undefined') {
      allTasks = [];
    } else {
      allTasks = JSON.parse(retrievedObject);
      if (allTasks.length !== 0) {
        document.getElementById('welcome-message').remove();
      }
      for (let i = 0; i < allTasks.length; i++) {
        this.renderTask(allTasks[i]);
      }
    }
    dropzone = this.shadowRoot.querySelector('ul');
  }

  renderTask(newTask) {
    const taskItem = document.createElement('task-item');
    taskItem.setAttribute('id', newTask.id);
    taskItem.name = newTask.name;
    taskItem.current = newTask.current;
    taskItem.number = newTask.number;
    taskItem.setFunctions(showModalTask, editTask, deleteTask, setCheck);
    // append the newly created <task-item> to ul
    this.shadowRoot.querySelector('ul').appendChild(taskItem);
    // render the checkbox status
    this.shadowRoot.getElementById(newTask.id).checkmark.checked =
      newTask.completed;
  }

  addTask(event) {
    event.preventDefault();
    // create struct and append to global list
    const newTask = {
      id: Math.random().toString(16).slice(2),
      completed: false,
      name: document.getElementById('task-name').value,
      number: document.getElementById('task-num').value,
      current: 0,
      note: document.getElementById('task-note').value,
    };
    allTasks.push(newTask);

    // render HTML on page.
    this.renderTask(newTask);
    // everything else.
    document.getElementById('taskform').reset();
    const welcome = document.getElementById('welcome-message');
    if (welcome) {
      welcome.remove();
    }
    closeModal();
  }
}
customElements.define('task-list', TaskList);

/**
 * Closing page will save current task and update local storage
 */
window.onbeforeunload = function storeTask() {
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
};

window.onload = () => {
  document
    .getElementById('taskform')
    .addEventListener('submit', (e) =>
      document.getElementById('main-container').addTask(e)
    );
  /// ////// SECTION for Drag and Drop ////////
  // getter for the list items
  const nodes = dropzone.getElementsByClassName('taskNode');
  // variable for the selected node to be dragged or moved
  let selectedNode;
  let preNodePos = 0;
  // variable for the position of selected node
  let selectedNodePos = 0;
  let checked = false;
  dropzone.addEventListener(
    'dragstart',
    (event) => {
      preNodePos = setNodePos(event.clientY, preNodePos);
      selectedNode = event.target;
      checked = selectedNode.checkmark.checked;
    },
    false
  );

  // Listener for the dragover event
  dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
    selectedNodePos = setNodePos(event.clientY, selectedNodePos);
    if (preNodePos < selectedNodePos) {
      preNodePos = setNodePos(event.clientY, preNodePos);
      dropzone.insertBefore(
        selectedNode,
        dropzone.children[selectedNodePos + 1]
      );
      selectedNode.checkmark.checked = checked;
    } else if (preNodePos > selectedNodePos) {
      preNodePos = setNodePos(event.clientY, preNodePos);
      dropzone.insertBefore(selectedNode, dropzone.children[selectedNodePos]);
      selectedNode.checkmark.checked = checked;
    }

    // re-ordering item in localStorage
    const newArray = [];
    for (let i = 0; i < nodes.length; i++) {
      const targetID = nodes[i].id;
      const taskInArray = allTasks.find((elem) => elem.id === targetID);
      newArray.push(taskInArray);
    }
    allTasks = newArray;
  });

  // Listener for the drop event
  dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
  });

  /**
   * For measuring the selected node position from the list.
   */
  function establishNodePositions() {
    for (let i = 0; i < nodes.length; i++) {
      const position = nodes[i].getBoundingClientRect(); // info of the element position on the frame
      const yTop = position.top;
      const yBottom = position.bottom;
      // yCenter
      // nodes[i].yPos = yTop + (yBottom - yTop) / 2;
      nodes[i].yTop = yTop;
      nodes[i].yBottom = yBottom;
    }
  }

  /**
   * For deciding which position the selected element goes to as measuring which
   * is the closest parent and closet children
   * this function will call establishNodePositions() for selected node position.
   * @param {event.clickY} currentYPos the y-axis value of the current click on window
   */
  function setNodePos(currentYPos, nodePos) {
    establishNodePositions();
    let nodeAbove;
    let currentNodePos = nodePos;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].yTop < currentYPos && nodes[i].yBottom < currentYPos) {
        nodeAbove = nodes[i];
        currentNodePos = i + 1;
      }
    }
    // for the top of the list
    if (typeof nodeAbove === 'undefined') {
      currentNodePos = 0;
    }

    return currentNodePos;
  }
};

/**
 * Retrieving the task name and notes that are stored in allTasks array
 * and show on the Modal before starting the timer.
 * @param {Element} element: the task-item that is being clicked
 */
function showModalTask(event) {
  document.getElementById('play-modal').style.display = 'block';
  const targetTask = event.target.getRootNode().host;
  document.getElementById('timer-name').innerText = targetTask.taskName;
  const taskStorageIndex = allTasks.findIndex(
    (elem) => elem.id === targetTask.id
  );
  // make the note from storage appear in the timer modal
  document.getElementById('timer-note').innerText =
    allTasks[taskStorageIndex].note;
  // set the current task id to localStorage
  const currentTask = targetTask.id;
  localStorage.setItem('currentTask', JSON.stringify(currentTask));
}

/**
 * Edit task for the allTask array and suppose to refresh after edit-save-btn is click
 * @param {Element} element the element that is being clicked
 */
function editTask(event) {
  document.getElementById('edit-modal').style.display = 'block';
  const targetID = event.target.getRootNode().host.id;
  // get the element Index in the object list
  const taskIndex = allTasks.findIndex((elem) => elem.id === targetID);
  document.getElementById('edit-save-btn').addEventListener('click', () => {
    allTasks[taskIndex].name = document.getElementById('edit-name').value;
    allTasks[taskIndex].number = document.getElementById('edit-num').value;
    allTasks[taskIndex].note = document.getElementById('edit-note').value;
  });
}

/**
 * Delete task from allTasks array and the task-list
 * @param {Element} element the element that is being clicked
 */
function deleteTask(event) {
  document.getElementById('delete-modal').style.display = 'block';
  // Delete item in the DOM
  const element = event.target;
  const itemToDelete = element.getRootNode().host;
  // Delete item in allTasks array
  const name = itemToDelete.taskName;
  document.getElementById('task-delete').innerText = `[${name}]`;
  document.getElementById('confirm-button').addEventListener('click', () => {
    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i].name === name) {
        allTasks.splice(i, 1);
        break;
      }
    }
    // Delete item in the DOM
    itemToDelete.remove();
    document.getElementById('delete-modal').style.display = 'none';
  });
}

/**
 * Retrieving the note in Storage by getting its id
 * and update the checkmark status on the array
 * @param element the element that is being click which is passing from handleEdit()
 */
function setCheck(event) {
  const targetID = event.target.getRootNode().host.id;
  // get the element Index in the object list
  const taskIndex = allTasks.findIndex((elem) => elem.id === targetID);
  allTasks[taskIndex].completed = !allTasks[taskIndex].completed;
}

if (typeof exports !== 'undefined') {
  module.exports = {
    TaskList,
  };
}
