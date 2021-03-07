/**
 * This file defines functions and implements the behaviors of task list.
 */

/**
 * Class constructor for <task-list>
 */
class TaskList extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: 'open',
    });

    this.allTasks = null;
    // variables for drag and drop functions
    this.dropzone = null;
    this.checked = false;
    this.selectedNode = null;
    this.nodes = null;
    this.preNodePos = null;

    // set styles for shadow elements
    shadow.innerHTML = `<link rel="stylesheet" href="task.css"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"/>`;
  }

  connectedCallback() {
    document
      .getElementById('taskform')
      .addEventListener('submit', (e) => this.addTask(e));

    const list = document.createElement('ul');
    list.setAttribute('id', 'main-list');
    list.setAttribute('class', 'task-container d-flex');
    this.shadowRoot.append(list);
    const retrievedObject = localStorage.getItem('allTasks');
    if (!retrievedObject || retrievedObject === 'undefined') {
      console.log('HERE');
      this.allTasks = [];
    } else {
      console.log('ORHERE');
      this.allTasks = JSON.parse(retrievedObject);
      if (this.allTasks.length !== 0) {
        document.getElementById('welcome-message').remove();
      }
      for (let i = 0; i < this.allTasks.length; i++) {
        this.renderTask(this.allTasks[i]);
      }
    }
    /// ////// SECTION for Drag and Drop ////////
    this.dropzone = this.shadowRoot.querySelector('ul');
    // getter for the list items
    this.nodes = this.dropzone.getElementsByClassName('taskNode');
    // variable for the selected node to be dragged or moved
    this.selectedNode = null;
    this.preNodePos = 0;
    // variable for the position of selected node
    // let selectedNodePos = 0;
    this.checked = false;
    this.dropzone.addEventListener(
      'dragstart',
      (event) => this.handleDragStart(event),
      false
    );

    // Listener for the dragover event
    this.dropzone.addEventListener('dragover', (event) =>
      this.handleDragOver(event)
    );

    // Listener for the drop event
    this.dropzone.addEventListener('drop', (event) => {
      event.preventDefault();
    });
  }

  disconnectedCallback() {
    localStorage.setItem('allTasks', JSON.stringify(this.allTasks));
  }

  setCurrentTask(newTask) {
    this.currentTask = newTask;
  }

  renderTask(newTask) {
    const taskItem = document.createElement('task-item');
    taskItem.setAttribute('id', newTask.id);
    taskItem.name = newTask.name;
    taskItem.current = newTask.current;
    taskItem.number = newTask.number;
    taskItem.completed = newTask.completed;
    taskItem.setFunctions(
      this.showModalTask.bind(this),
      this.deleteTask.bind(this),
      this.editTask.bind(this),
      this.setCheck.bind(this)
    );
    // append the newly created <task-item> to ul
    this.shadowRoot.querySelector('ul').appendChild(taskItem);
    // // render the checkbox status
    // this.shadowRoot.getElementById(newTask.id).checkmark.checked =
    //   newTask.completed;
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
    this.allTasks.push(newTask);

    // render HTML on page.
    this.renderTask(newTask);
    // everything else.
    document.getElementById('taskform').reset();
    const welcome = document.getElementById('welcome-message');
    if (welcome) {
      welcome.remove();
    }
    document.getElementById('add-task-modal').style.display = 'none';
  }

  /**
   * Delete task from allTasks array and the task-list
   * @param {Element} element the element that is being clicked
   */
  deleteTask(event) {
    console.log(this.allTasks);
    document.getElementById('delete-modal').style.display = 'block';
    // Delete item in the DOM
    const element = event.target;
    const itemToDelete = element.getRootNode().host;
    console.log(itemToDelete.parentNode.allTasks);
    // Delete item in allTasks array
    const { name } = itemToDelete;
    document.getElementById('task-delete').innerText = `[${name}]`;
    document.getElementById('confirm-button').addEventListener('click', () => {
      for (let i = 0; i < this.allTasks.length; i++) {
        if (this.allTasks[i].name === name) {
          this.allTasks.splice(i, 1);
          break;
        }
      }
      // Delete item in the DOM
      itemToDelete.remove();
      document.getElementById('delete-modal').style.display = 'none';
    });
  }

  /**
   * Edit task for the allTask array and suppose to refresh after edit-save-btn is click
   * @param {Element} element the element that is being clicked
   */
  editTask(event) {
    const editedTask = event.target.getRootNode().host;
    const targetID = editedTask.id;
    const taskIndex = this.allTasks.findIndex((elem) => elem.id === targetID);
    document.getElementById('edit-note').value = this.allTasks[taskIndex].note;
    document.getElementById('edit-name').value = editedTask.name;
    document.getElementById('edit-num').value = editedTask.number;

    const editModal = document.getElementById('edit-modal');
    editModal.style.display = 'block';
    // get the element Index in the object list
    const oldElement = document.getElementById('editform');
    oldElement.addEventListener('submit', (e) => {
      e.preventDefault();
      const newElement = oldElement.cloneNode(true);
      const editTaskName = document.getElementById('edit-name').value;
      const editTaskNum = document.getElementById('edit-num').value;
      const editTaskNote = document.getElementsByClassName('edit-note').value;
      editedTask.name = editTaskName;
      editedTask.number = editTaskNum;
      this.allTasks[taskIndex].name = editTaskName;
      this.allTasks[taskIndex].number = editTaskNum;
      this.allTasks[taskIndex].note = editTaskNote;
      editModal.style.display = 'none';
      oldElement.parentNode.replaceChild(newElement, oldElement);
    });
  }

  /**
   * Retrieving the note in Storage by getting its id
   * and update the checkmark status on the array
   * @param element the element that is being click which is passing from handleEdit()
   */
  setCheck(event) {
    const editedTask = event.target.getRootNode().host;
    const targetID = editedTask.id;

    // change progress bar

    if (editedTask.completed === 'true') {
      editedTask.completed = 'false';
    } else {
      editedTask.completed = 'true';
    }
    // get the element Index in the object list
    const taskIndex = this.allTasks.findIndex((elem) => elem.id === targetID);
    this.allTasks[taskIndex].completed = !this.allTasks[taskIndex].completed;
  }

  /**
   * Retrieving the task name and notes that are stored in allTasks array
   * and show on the Modal before starting the timer.
   * @param {Element} element: the task-item that is being clicked
   */
  showModalTask(event) {
    document.getElementById('play-modal').style.display = 'block';
    const targetTask = event.target.getRootNode().host;
    document.getElementById('timer-name').innerText = targetTask.name;
    const taskStorageIndex = this.allTasks.findIndex(
      (elem) => elem.id === targetTask.id
    );
    // make the note from storage appear in the timer modal
    document.getElementById('timer-note').innerText = this.allTasks[
      taskStorageIndex
    ].note;
    // set the current task id to localStorage
    const currentTask = targetTask.id;
    localStorage.setItem('currentTask', JSON.stringify(currentTask));
  }

  handleDragStart(event) {
    this.preNodePos = this.setNodePos(event.clientY, this.preNodePos);
    this.selectedNode = event.target;
    this.checked = this.selectedNode.checkmark.checked;
  }

  handleDragOver(event) {
    event.preventDefault();
    const selectedNodePos = this.setNodePos(
      event.clientY,
      this.selectedNodePos
    );
    if (this.preNodePos !== selectedNodePos) {
      this.preNodePos = this.setNodePos(event.clientY, this.preNodePos);
      this.dropzone.insertBefore(
        this.selectedNode,
        this.dropzone.children[selectedNodePos]
      );
      this.selectedNode.checkmark.checked = this.checked;
    }

    // re-ordering item in localStorage
    const newArray = [];
    for (let i = 0; i < this.nodes.length; i++) {
      const targetID = this.nodes[i].id;
      const taskInArray = this.allTasks.find((elem) => elem.id === targetID);
      newArray.push(taskInArray);
    }
    this.allTasks = newArray;
  }

  /**
   * For measuring the selected node position from the list.
   */
  establishNodePositions() {
    for (let i = 0; i < this.nodes.length; i++) {
      const position = this.nodes[i].getBoundingClientRect(); // info of the element position on the frame
      const yTop = position.top;
      const yBottom = position.bottom;
      // yCenter
      this.nodes[i].yPos = yTop + (yBottom - yTop) / 2;
      // nodes[i].yTop = yTop + (yBottom - yTop) / 2;
      // nodes[i].yBottom = yBottom - (yBottom - yTop) / 2;
    }
  }

  /**
   * For deciding which position the selected element goes to as measuring which
   * is the closest parent and closet children
   * this function will call establishNodePositions() for selected node position.
   * @param {event.clickY} currentYPos the y-axis value of the current click on window
   */
  setNodePos(currentYPos, nodePos) {
    this.establishNodePositions();
    let nodeAbove;
    let currentNodePos = nodePos;
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].yPos < currentYPos) {
        nodeAbove = this.nodes[i];
        currentNodePos = i + 1;
      }
    }
    // for the top of the list
    if (typeof nodeAbove === 'undefined') {
      currentNodePos = 0;
    }

    return currentNodePos;
  }
}
customElements.define('task-list', TaskList);

/**
 * Closing page will save current task and update local storage
 */
window.onbeforeunload = function removeTaskList() {
  document.getElementById('main-container').remove();
};

window.onload = () => {
  // document
  //   .getElementById('taskform')
  //   .addEventListener('submit', (e) =>
  //     document.getElementById('main-container').addTask(e)
  //   );
};

if (typeof exports !== 'undefined') {
  module.exports = {
    TaskList,
  };
}
