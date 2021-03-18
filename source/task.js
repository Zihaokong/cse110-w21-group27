/**
 * This file defines functions and implements the behaviors of task list.
 */

/**
 * The component which acts as the manager for tasks. It has the ability to
 * create tasks, change ordering of tasks in the list, and houses functionality
 * to play, edit, delete, and complete tasks, which the task item references in
 * their event listeners. Keeps track of task items and stores/loads their info
 * for local storage. Additionally, keeps track of the task item to be played
 * and stores it into local storage for the timer.
 */
class TaskList extends HTMLElement {
  /**
   * Constructor which attaches a shadow root to this element in open mode.
   * Additionally, initializes properties of the TaskList and sets up the inner
   * HTML (styling)
   */
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

  /**
   * Invoked each time the task-list is appeneded into a document-connected
   * element; sets up the list and reads localstorage to set up saved
   * task-items.
   */
  connectedCallback() {
    // set the timer state back to a work session
    localStorage.setItem('ShortBreak', 'false');
    localStorage.setItem('LongBreak', 'false');

    // Add an event listener to the taskform such that when the form is
    // submitted, it creates a task.
    document
      .getElementById('taskform')
      .addEventListener('submit', (e) => this.addTask(e));

    // Create and Appened a list container the task-list to house task-items
    const list = document.createElement('ul');
    list.setAttribute('id', 'main-list');
    list.setAttribute('class', 'task-container d-flex');
    this.shadowRoot.append(list);

    // Get tasks from localStorage and, if they exist, create and append them
    // to the task-list.
    const retrievedObject = localStorage.getItem('allTasks');
    if (!retrievedObject || retrievedObject === 'undefined') {
      this.allTasks = [];
    } else {
      this.allTasks = JSON.parse(retrievedObject);
      if (this.allTasks.length !== 0) {
        document.getElementById('welcome-message').remove();
      }
      for (let i = 0; i < this.allTasks.length; i++) {
        this.renderTask(this.allTasks[i]);
      }
    }

    // Drag and drop functionality
    this.dropzone = this.shadowRoot.querySelector('ul');

    // getter for the list items
    this.nodes = this.dropzone.getElementsByClassName('taskNode');

    // variable for the selected node to be dragged or moved
    this.selectedNode = null;
    this.preNodePos = 0;
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
  }

  /**
   * When the task-list is disconnected (basically before the page is exited),
   * save the tasks in the task-list to localStorage.
   */
  disconnectedCallback() {
    localStorage.setItem('allTasks', JSON.stringify(this.allTasks));
  }

  /**
   * Set up and render a task-item element and then append it to the task-list.
   * @param {Object} taskInfo Info about the task being created.
   * @param {string} taskInfo.id Randomly generated id of the pomo.
   * @param {string} taskInfo.name Name of the task.
   * @param {string} taskInfo.current Current number of completed pomo tasks.
   * @param {string} taskInfo.number Estimated number of pomos for the task.
   * @param {string} taskInfo.completed If the pomo completed.
   */
  renderTask(taskInfo) {
    const taskItem = document.createElement('task-item');
    taskItem.setAttribute('id', taskInfo.id);
    taskItem.name = taskInfo.name;
    taskItem.current = taskInfo.current;
    taskItem.number = taskInfo.number;
    taskItem.completed = taskInfo.completed;
    taskItem.setFunctions(
      this.playTask.bind(this),
      this.deleteTask.bind(this),
      this.editTask.bind(this),
      this.setCheck.bind(this)
    );
    // append the newly created <task-item> to ul
    this.shadowRoot.querySelector('ul').appendChild(taskItem);
  }

  /**
   * Function which is triggered by the event of the user submitting a new task
   * from add task modal; Creates a new task item, adds it to the list, and
   * saves its properties to All tasks array.
   * @param {Event} event Event which triggered this function.
   */
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
   * Function which is triggered by a delete button event in a task item;
   * displays the delete modal and then creates an event listener on the delete
   * modal which, on submission, deletes the task item from the list element and
   * all tasks array.
   * @param {Event} event the event which triggered this function; it's target
   *                      should be the button of the task to be deleted.
   */
  deleteTask(event) {
    document.getElementById('delete-modal').style.display = 'block';

    // Delete item in the DOM
    const element = event.target;
    const itemToDelete = element.getRootNode().host;

    // Delete item in allTasks array
    const { name } = itemToDelete;
    document.getElementById('task-delete').innerText = `${name}?`;
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
   * A function which is triggered by an edit button event in a task item;
   * displays the event modal and then creates an event listener on the edit
   * modal which, on submission, edits an existing task and saves its changes to
   * allTasks.
   * @param {Event} event the event which triggered this function; it's target
   *                      should be the button of the task to be edited.
   */
  editTask(event) {
    const editedTask = event.target.getRootNode().host;
    const targetID = editedTask.id;
    const taskIndex = this.allTasks.findIndex((elem) => elem.id === targetID);

    // Show the selected task's info in the modal.
    document.getElementById('edit-note').value = this.allTasks[taskIndex].note;
    document.getElementById('edit-name').value = editedTask.name;
    document.getElementById('edit-num').value = editedTask.number;

    // Display the Modal.
    const editModal = document.getElementById('edit-modal');
    editModal.style.display = 'block';

    // Create an event listener to the editform so that when it is submitted,
    // the changes are applied.
    document.getElementById('editform').addEventListener(
      'submit',
      // eslint-disable-next-line no-shadow
      (event) => {
        event.preventDefault();
        const editTaskName = document.getElementById('edit-name').value;
        const editTaskNum = document.getElementById('edit-num').value;
        const editTaskNote = document.getElementById('edit-note').value;
        editedTask.name = editTaskName;
        editedTask.number = editTaskNum;
        this.allTasks[taskIndex].name = editTaskName;
        this.allTasks[taskIndex].number = editTaskNum;
        this.allTasks[taskIndex].note = editTaskNote;
        editModal.style.display = 'none';
      },
      {
        once: true,
      }
    );
  }

  /**
   * A function which is triggered by an event in task item; on call, it inverts
   * the task item's completed property and changes the property of that task in
   * allTasks.
   * @param {Event} event the event which triggered this function; it's target
   *                      should be the checkmark of the task being set.
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
   * A function which is triggered by a play button event in a task item; on
   * call, it opens the play modal and sets the current task
   * @param {Event} event the event which triggered this function; it's target
   *                      should be the button of the task to be played.
   */
  playTask(event) {
    // Display the play modal for the task.
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
    localStorage.setItem(
      'todayPomo',
      Number(localStorage.getItem('todayPomo')) + 1
    );
  }

  /**
   * When a task is first dragged, this function is called with the given event.
   * Will set the current task node being dragged for future reference as well
   * as if it was checked.
   * @param {Event} event The event which triggered the task to be dragged;
   *                      it's targer should be the task-item that is going
   *                      to be dragged.
   */
  handleDragStart(event) {
    this.preNodePos = this.setNodePos(event.clientY);
    this.selectedNode = event.target;
    this.checked = this.selectedNode.checkmark.checked;
  }

  /**
   * While the task is being activly dragged, this function is called;
   * Notes the current position and swaps with another task when the client
   * moves the task over a certain threshhold.
   * @param {Event} event Event which triggers the dragging. Used to get the
   *                      client's current y position.
   */
  handleDragOver(event) {
    event.preventDefault();
    const currentNodePos = this.setNodePos(event.clientY);

    // If the currentNodePos changes from the previousNodePos, set the previous
    //  to the current and swap the selected task with the task associated with
    //  the currentPosition.
    if (this.preNodePos !== currentNodePos) {
      this.preNodePos = currentNodePos;
      this.dropzone.insertBefore(
        this.selectedNode,
        this.dropzone.children[currentNodePos]
      );
      this.selectedNode.checkmark.checked = this.checked;

      // re-ordering item in localStorage
      const newArray = [];
      for (let i = 0; i < this.nodes.length; i++) {
        const targetID = this.nodes[i].id;
        const taskInArray = this.allTasks.find((elem) => elem.id === targetID);
        newArray.push(taskInArray);
      }
      this.allTasks = newArray;
    }
  }

  /**
   * For measuring the selected node position from the list.
   */
  establishNodePositions() {
    for (let i = 0; i < this.nodes.length; i++) {
      // info of the element position on the frame
      const position = this.nodes[i].getBoundingClientRect();
      const yTop = position.top;
      const yBottom = position.bottom;
      this.nodes[i].yPos = yTop + (yBottom - yTop) / 2;
    }
  }

  /**
   * For deciding which position the selected element goes to as measuring which
   * is the closest parent and closet children
   * this function will call establishNodePositions() for selected node position.
   * @param {number} currentYPos the y-axis value of the current click on window
   * @returns {number} the node position which is associated with the given y
   *                   position.
   */
  setNodePos(currentYPos) {
    this.establishNodePositions();
    let currentNodePos = 0;
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].yPos < currentYPos) {
        currentNodePos = i + 1;
      }
    }

    return currentNodePos;
  }
}
customElements.define('task-list', TaskList);

if (typeof exports !== 'undefined') {
  module.exports = {
    TaskList,
  };
}
