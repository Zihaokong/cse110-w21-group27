/**
 * This file defines functions and implements the behaviors of todo list.
 */

// HTML List of all tasks on HTML page
const list = document.querySelector('.task-container');
list.addEventListener('click', handleEdit);

// HTML Task form for collecting data
const taskForm = document.getElementById('taskform');
taskForm.addEventListener('submit', addTask);

// HTML welcome message
const welcome = document.getElementById('welcome-message');

// Storing all tasks on current page.
let allTasks;

/**
 * When loading page, retrive previously stored task from
 * local storage, and render it, delete welcome message
 */
window.onload = function loadTask() {
  const retrievedObject = localStorage.getItem('allTasks');
  if (!retrievedObject || retrievedObject === 'undefined') {
    allTasks = [];
  } else {
    allTasks = JSON.parse(retrievedObject);
    if (allTasks.length !== 0) {
      welcome.remove();
    }

    for (let i = 0; i < allTasks.length; i++) {
      renderTask(allTasks[i]);
    }
  }
};

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
function addTask(event) {
  event.preventDefault();
  // acquire data from HTML form
  const taskInput = document.getElementById('task-name');
  const taskInputNum = document.getElementById('task-num');
  const taskInputNote = document.getElementById('task-note');
  const elementID = Math.random().toString(16).slice(2);
  // create struct and append to global list
  const newTask = {
    id: elementID,
    completed: false,
    name: taskInput.value,
    number: taskInputNum.value,
    current: 0,
    note: taskInputNote.value,
  };
  allTasks.push(newTask);
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
  // render HTML on page.
  renderTask(newTask);

  // everything else.
  taskForm.reset();
  welcome.remove();
  document.getElementById('add-task-modal').style.display = 'none';
}

/**
 * render a task struct on page, display name and current progress
 * @param {newTask} newTask the task struct to render
 */
function renderTask(newTask) {
  //  To-do: add real time progress bar percentage display
  const position = 'beforeend';
  const dragButton = `<span class="p-2 material-icons drag-btn">drag_indicator</span>`;
  const checkmark = `<span class="p-2 form-check form-check-inline">
            <input class="form-check-input input-mysize large" type="checkbox" job="check">
            <label for="checkbox"></label>
        </span>`;
  const todoTask = `<p class="p-2 flex-md-fill text-nowrap task-item">${newTask.name}</p>`;
  let percent = (newTask.current / newTask.number)*100;
  if(percent >= 100) {
    percent = "100%";
  }
  else {
    percent = percent.toFixed(2) + "%";
  }
  let progressT = newTask.current + "/" + newTask.number;

  let progressbar = `
        <div class=" flex-column progress">
            <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: ${percent};" aria-valuenow="${newTask.current}" aria-valuemin="0" aria-valuemax="${newTask.number}">${percent}</div>
        </div>`;
  if(newTask.current > newTask.number) {
    progressbar = `
        <div class=" flex-column progress">
            <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: ${percent};" aria-valuenow="${newTask.current}" aria-valuemin="0" aria-valuemax="${newTask.number}">${percent}</div>
        </div>`;
  }
  const progressText = `
        <p1 class="progress-text">${progressT}</p1>`
  const playButton = `<button class="p-2 bd-highlight btn  play-btn flex-right" type="button">
            <span class="material-icons play-btn" job ="play">play_circle</span>
        </button>`;
  const editButton = `<div class="p-2 bd-highlight btn-group dropright flex-right">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="material-icons edit-btn">more_horiz</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right " aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" job="edit">Edit</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" job="delete">Delete</a>
            </div>
        </div>`;
  list.insertAdjacentHTML(
    position,
    `<li id=${newTask.id} class="taskNode d-flex flex-row bd-highlight" draggable = true>${dragButton}${checkmark}${todoTask}${progressbar}${progressText}${playButton}${editButton}`
  );
  renderCheckmark(newTask);
}

/**
 * Update the checkmark status on the localStorage
 * @param {newTask} newTask the task node just built from renderTask()
 */
function renderCheckmark(newTask) {
  // setting checkmark
  const newNode = document.getElementById(newTask.id);
  // li: dragIcon -> span-checkmark; span: text -> actual checkbox
  const checkbox = newNode.childNodes[1].childNodes[1];
  checkbox.checked = newTask.completed;
}

/**
 * Update the checkmark status on the array for localStorage
 * @param {event.target} element Javascript event.target
 */
function handleCheck(element) {
  // Retrieving the note in Storage by getting its id
  const targetID = element.closest('li').getAttribute('id');
  // get the element Index in the object list
  const taskIndex = allTasks.findIndex((elem) => elem.id === targetID);
  allTasks[taskIndex].completed = !allTasks[taskIndex].completed;
}

/**
 * Click more button, giving user edit and delete options
 * @param {event} event Javascript events.
 */
function handleEdit(event) {
  // getting which is being clicked
  const element = event.target;
  let eleJob;
  // console.log(element);
  // job may be undefined
  if (event.target.attributes.job) {
    eleJob = event.target.attributes.job.value;
  }

  // console.log(eleJob);
  if (eleJob === 'delete') {
    deleteTask(element);
  } else if (eleJob === 'edit') {
    document.getElementById('add-task-modal').style.display = 'block';
  } else if (eleJob === 'play') {
    document.getElementById('play-modal').style.display = 'block';
    showModalTask(element);
  } else if (eleJob === 'check') {
    handleCheck(element);
  }
}

/**
 * Delete task
 * @param {event.target} element Javascript event.target
 */
function deleteTask(element) {
  element.closest('ul').removeChild(element.closest('li'));
  const name = element.closest('li').children[2].innerHTML;
  for (let i = 0; i < allTasks.length; i++) {
    // eslint-disable-next-line eqeqeq
    if (allTasks[i].name == name) {
      allTasks.splice(i, 1);
      localStorage.setItem('allTasks', JSON.stringify(allTasks));
      break;
    }
  }
}

/**
 * For showing the task name, content on the modal when going to timer page.
 * @param {event.target} element The target element that the user wants to start with
 */
function showModalTask(element) {
  // get the closest li from where we click and get the p tag in its children
  const targetName = element.closest('li').getElementsByTagName('p');
  // make the task name appear in the timer modal
  document.getElementById('timer-name').innerText = targetName[0].innerHTML;
  // Retrieving the note in Storage by getting its id
  const targetID = element.closest('li').getAttribute('id');
  // get the element Index in the object list
  const taskStorageIndex = allTasks.findIndex((elem) => elem.id === targetID);
  // make the note from storage appear in the timer modal
  document.getElementById('timer-note').innerText =
    allTasks[taskStorageIndex].note;

  const currentTask = element.closest('li').id;
  localStorage.setItem('currentTask', JSON.stringify(currentTask));
}

// getter for the list
const dropzone = document.getElementById('main-container');
// getter for the list items
const nodes = document.getElementsByClassName('taskNode');
// variable for the selected node to be dragged or moved
let selectedNode;
// variable for the position of selected node
let selectedNodePos = 0;

// Listener for the dragstart event
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
});

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
 * @param {event.clickY} currentYPos
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
