/**
 * This file defines functions and implements the behaviors of task list.
 */
// Section for ESLint
/* global TaskItem closeModal */
let allTasks;
let dropzone;

// HTML welcome message
const welcome = document.getElementById('welcome-message');

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
      <link rel="stylesheet" href="main.css"/>
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
        welcome.remove();
      }
      for (let i = 0; i < allTasks.length; i++) {
        this.renderTask(allTasks[i]);
      }
    }
    dropzone = this.shadowRoot.querySelector('ul');
  }

  renderTask(newTask) {
    this.shadowRoot.querySelector('ul').appendChild(new TaskItem(newTask));
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
    taskForm.reset();
    welcome.remove();
    closeModal();
  }
}
customElements.define('task-list', TaskList);

// HTML Task form for collecting data
const taskForm = document.getElementById('taskform');
const taskList = document.getElementById('main-container');

/**
 * When loading page, retrive previously stored task from
 * local storage, and render it, delete welcome message
 */
// window.onload = function () {

//   let taskList = document.getElementById("main-container");
//     // let taskList = document.getElementById("main-container");
//     // if (!retrievedObject || retrievedObject === "undefined") {
//     //     allTasks = [];
//     // } else {
//     //     allTasks = JSON.parse(retrievedObject);
//     //     if (allTasks.length != 0) {
//     //         welcome.remove();
//     //     }

//     //     for (let i = 0; i < allTasks.length; i++) {
//     //         taskList.renderTask(allTasks[i]);
//     //     }
//     // }

//     taskForm.addEventListener("submit", e => taskList.addTask(e) );

// }

/**
 * Closing page will save current task and update local storage
 */
window.onbeforeunload = function storeTask() {
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
};

/**
 * Add a task to the page and to the global list.
 * @param {event} event Javascript events
 */
// function addTask(event) {
//     event.preventDefault();

//     //create struct and append to global list
//     const newTask = {
//         id: Math.random().toString(16).slice(2),
//         completed: false,
//         name: document.getElementById("task-name").value,
//         number: document.getElementById("task-num").value,
//         current: 0,
//         note: document.getElementById("task-note").value
//     }
//     allTasks.push(newTask);

//     //render HTML on page.
//     renderTask(newTask);

//     //everything else.
//     taskForm.reset();
//     welcome.remove();
//     closeModal();
// }

/**
 * render a task struct on page, display name and current progress
 * @param {object} newTask the task struct to render
 */
// function renderTask(newTask) {
//     document.querySelector(".task-container").appendChild(new TaskItem(newTask))
//     renderCheckmark(newTask);
// }

/**
 * render the checkbox status according to localStorage
 * @param {object} newTask the new object created from addTask()
 */
// function renderCheckmark(newTask) {
//     //setting checkmark
//     document.getElementById(newTask.id).checkmark.checked = newTask.completed;
// }

/**
 * Retrieving the task name and notes that are stored in allTasks array
 * and show on the Modal before starting the timer.
 * @param {Element} element: the task-item that is being clicked
 */
function showModalTask(element) {
  // get the closest task-item from where we click and get the p tag in its children
  const targetTask = element.getRootNode().host;
  // make the task name appear in the timer modal
  document.getElementById('timer-name').innerText = targetTask.taskName;
  // get the element Index in the object list
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
 * Retrieving the note in Storage by getting its id
 * and update the checkmark status on the array
 * @param element the element that is being click which is passing from handleEdit()
 */
function setCheck(element) {
  const targetID = element.getRootNode().host.id;
  // get the element Index in the object list
  const taskIndex = allTasks.findIndex((elem) => elem.id === targetID);
  allTasks[taskIndex].completed = !allTasks[taskIndex].completed;
}

/**
 * Click more button, giving user edit and delete options
 * @param {event} event the element that is being clicked
 */
function handleEdit(event) {
  // getting which is being clicked
  const element = event.target;
  let eleJob; // variable for handling the functions of different button

  // Handling the case of job may be undefined
  if (event.target.attributes.job) {
    eleJob = event.target.attributes.job.value;
  }

  if (eleJob === 'delete') {
    deleteTask(element);
  } else if (eleJob === 'edit') {
    document.getElementById('add-task-modal').style.display = 'block';
  } else if (eleJob === 'play') {
    document.getElementById('play-modal').style.display = 'block';
    showModalTask(element);
  } else if (eleJob === 'check') {
    setCheck(element);
  }
}

/**
 * Delete task from allTasks array and the task-list
 * @param {Element} element the element that is being clicked
 */
function deleteTask(element) {
  // Delete item in allTasks array
  const itemToDelete = element.closest('task-item');
  const name = itemToDelete.taskName;
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].name === name) {
      allTasks.splice(i, 1);
      break;
    }
  }
  // Delete item in the DOM
  itemToDelete.remove();
}

/// ////// SECTION for Drag and Drop ////////

// getter for the list

// getter for the list items
const nodes = document.getElementsByClassName('taskNode');
// variable for the selected node to be dragged or moved
let selectedNode;
// variable for the position of selected node
let selectedNodePos = 0;

/**
 * For measuring the selected node position from the list.
 */
function establishNodePositions() {
  for (let i = 0; i < nodes.length; i++) {
    const element = document.getElementById(nodes[i].id);
    const position = element.getBoundingClientRect(); // info of the element position on the frame
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
      nodeAbove = document.getElementById(nodes[i].id);
      selectedNodePos = i + 1;
    }
  }
  // for the top of the list
  if (typeof nodeAbove === 'undefined') {
    selectedNodePos = 0;
  }
  // for the top of the list
  if (typeof nodeAbove === 'undefined') {
    selectedNodePos = 0;
  }
}

window.onload = () => {
  taskForm.addEventListener('submit', (e) => taskList.addTask(e));
  // Listener for the dragstart event
  // console.log(dropzone);
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
    const taskNodes = document.querySelectorAll('task-item');
    const newArray = [];
    for (let i = 0; i < taskNodes.length; i++) {
      const targetID = taskNodes[i].id;
      const taskInArray = allTasks.find((elem) => elem.id === targetID);
      newArray.push(taskInArray);
    }
    allTasks = newArray;
  });
};

customElements.define('task-list', TaskList);
if (typeof exports !== 'undefined') {
  module.exports = {
    TaskList,
  };
}
