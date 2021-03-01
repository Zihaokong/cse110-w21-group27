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
    taskItem.setAttribute('name', `${newTask.name}`);
    taskItem.setAttribute('current', `${newTask.current}`);
    taskItem.setAttribute('number', `${newTask.number}`);

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
  // variable for the position of selected node
  let selectedNodePos = 0;

  dropzone.addEventListener(
    'dragstart',
    (event) => {
      selectedNode = event.target;
    },
    false
  );

  // Listener for the dragover event
  dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
    whereAmI(event.clientY);
  });

  // Listener for the drop event
  dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropzone.insertBefore(selectedNode, dropzone.children[selectedNodePos]);
    // re-ordering item in localStorage
    const newArray = [];
    for (let i = 0; i < nodes.length; i++) {
      const targetID = nodes[i].id;
      const taskInArray = allTasks.find((elem) => elem.id === targetID);
      newArray.push(taskInArray);
    }
    allTasks = newArray;
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
      nodes[i].yPos = yTop + (yBottom - yTop) / 2;
    }
  }

  /**
   * For deciding which position the selected element goes to as measuring which
   * is the closest parent and closet children
   * this function will call establishNodePositions() for selected node position.
   * @param {event.clickY} currentYPos the y-axis value of the current click on window
   */
  function whereAmI(currentYPos) {
    establishNodePositions();
    let nodeAbove;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].yPos < currentYPos) {
        nodeAbove = nodes[i];
        selectedNodePos = i + 1;
      }
    }
    // for the top of the list
    if (typeof nodeAbove === 'undefined') {
      selectedNodePos = 0;
    }
  }
};

if (typeof exports !== 'undefined') {
  module.exports = {
    TaskList,
  };
}
