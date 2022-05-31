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

    this.attachShadow({
      mode: 'open',
    });

    this.allTasks = [];

    // variables for drag and drop functions
    this.dropzone = null;
    this.checked = false;
    this.selectedNode = null;
    this.nodes = null;
    this.preNodePos = null;

    // set styles for shadow elements
    const styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = '/components/task-list/task-list.css';

    this.shadowRoot.appendChild(styleSheet);
  }

  /**
   * Function which is triggered by the event of the user submitting a new task
   * from add task modal; Creates a new task item, adds it to the list, and
   * saves its properties to All tasks array.
   * @param {Event} event Event which triggered this function.
   */
  addTask(
    givenId,
    isCompleted,
    givenName,
    totalCount,
    currentCount,
    givenNote
  ) {
    // create struct and append to global list
    const newTask = {
      id: givenId,
      completed: isCompleted,
      name: givenName,
      number: totalCount,
      current: currentCount,
      note: givenNote,
    };

    // Push the new task into allTasks and set the local storage item
    this.allTasks.push(newTask);
    localStorage.setItem('allTasks', JSON.stringify(this.allTasks));

    // Remove the welcome message
    if (this.shadowRoot.querySelector('aside'))
      this.shadowRoot.querySelector('aside').remove();

    // render HTML on page.
    this.renderTask(newTask);
  }

  /**
   * Invoked each time the task-list is appeneded into a document-connected
   * element; sets up the list and reads localstorage to set up saved
   * task-items.
   */
  connectedCallback() {
    // Create the melcome message
    const welcomeMessage = document.createElement('aside');
    welcomeMessage.textContent =
      'Welcome! Add a task to get started on your journey';

    // Create a list container to house task-items
    const list = document.createElement('section');

    // (CREATE) Create a form for creation
    const form = document.createElement('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTask(
        Math.random().toString(16).slice(2),
        false,
        nameInput.value,
        countInput.value,
        0,
        ''
      );
      nameInput.value = '';
      countInput.value = '';
    });

    // (CREATE) Create the name input
    const nameInput = document.createElement('input');
    nameInput.placeholder = 'My new task...';
    nameInput.title = 'Give your task a title';
    nameInput.maxLength = 26;
    nameInput.required = true;
    nameInput.setAttribute('content', 'title');

    // (CREATE) Create the count input
    const countInput = document.createElement('input');
    countInput.placeholder = '# of work sessions...';
    countInput.title =
      'Estimate how many pomodoro sessions you will need for this task';
    countInput.type = 'number';
    countInput.min = 1;
    countInput.max = 10;
    countInput.required = true;
    countInput.setAttribute('content', 'count');

    // (CREATE) Create the submit button
    const submitButton = document.createElement('button');
    submitButton.className = 'icon';
    submitButton.textContent = 'add_circle';
    submitButton.title = 'Add Task';
    submitButton.type = 'submit';

    // (CREATE) Append the form info to the form
    form.append(nameInput);
    form.append(countInput);
    form.append(submitButton);

    // (DEL) Create the delete dialog
    const deleteDialog = document.createElement('dialog');

    const deleteMessage = document.createElement('p');
    deleteMessage.textContent = 'Delete Task?';

    // (DEL) Create the No button
    const cancelButton = document.createElement('button');
    cancelButton.className = 'icon';
    cancelButton.textContent = 'cancel';
    cancelButton.type = 'cancel';
    cancelButton.addEventListener('click', () => {
      deleteDialog.close();
    });

    // (DEL) Create the Yes button
    const confirmButton = document.createElement('button');
    confirmButton.className = 'icon';
    confirmButton.textContent = 'check_circle';
    confirmButton.type = 'confirm';

    deleteDialog.append(deleteMessage);
    deleteDialog.append(cancelButton);
    deleteDialog.append(confirmButton);

    // Apepend the new elements to the shadow root
    this.shadowRoot.append(form);
    this.shadowRoot.append(welcomeMessage);
    this.shadowRoot.append(list);
    this.shadowRoot.append(deleteDialog);

    // Get tasks from localStorage and, if they exist, create and append them
    // to the task-list.
    const retrievedObject = localStorage.getItem('allTasks');
    if (!retrievedObject || retrievedObject === 'undefined') {
      this.allTasks = [];
    } else {
      this.allTasks = JSON.parse(retrievedObject);
      if (this.allTasks) {
        if (this.allTasks.length > 0) welcomeMessage.remove();
        for (let i = 0; i < this.allTasks.length; i++) {
          this.renderTask(this.allTasks[i]);
        }
      } else {
        this.allTasks = [];
      }
    }

    // Drag and drop functionality
    this.dropzone = this.shadowRoot.querySelector('section');

    // getter for the list items
    this.nodes = this.dropzone.getElementsByTagName('task-item');

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
   * Function which is triggered by a delete button event in a task item;
   * displays the delete modal and then creates an event listener on the delete
   * modal which, on submission, deletes the task item from the list element and
   * all tasks array.
   * @param {Event} event the event which triggered this function; it's target
   *                      should be the button of the task to be deleted.
   */
  deleteTask(event) {
    // Get the item to delete in the DOM
    const itemToDelete = event.target.getRootNode().host;
    const { name, id } = itemToDelete;
    if ('ontouchstart' in window) {
      const deleteDialog = this.shadowRoot.querySelector('dialog');
      deleteDialog.querySelector('p').textContent = `Delete Task "${name}"?`;
      const confirmButton = deleteDialog.querySelector(
        'button[type="confirm"]'
      );
      confirmButton.addEventListener(
        'click',
        () => {
          for (let i = 0; i < this.allTasks.length; i++) {
            if (this.allTasks[i].id === id) {
              this.allTasks.splice(i, 1);
              break;
            }
          }
          localStorage.setItem('allTasks', JSON.stringify(this.allTasks));
          itemToDelete.remove();
          deleteDialog.close();
        },
        { once: true }
      );
      deleteDialog.showModal();
    } else {
      for (let i = 0; i < this.allTasks.length; i++) {
        if (this.allTasks[i].id === id) {
          this.allTasks.splice(i, 1);
          break;
        }
      }
      localStorage.setItem('allTasks', JSON.stringify(this.allTasks));
      itemToDelete.remove();
    }
  }

  /**
   * A function which is triggered by an edit button event in a task item;
   * displays the event modal and then creates an event listener on the edit
   * modal which, on submission, edits an existing task and saves its changes to
   * allTasks.
   * @param {Event} event the event which triggered this function; it's target
   *                      should be the button of the task to be edited.
   */
  editTask(id, title, count) {
    const taskIndex = this.allTasks.findIndex((elem) => elem.id === id);

    this.allTasks[taskIndex].name = title;
    this.allTasks[taskIndex].number = count;
    localStorage.setItem('allTasks', JSON.stringify(this.allTasks));
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
      // re-ordering item in localStorage
      const newArray = [];
      for (let i = 0; i < this.nodes.length; i++) {
        const targetID = this.nodes[i].id;
        const taskInArray = this.allTasks.find((elem) => elem.id === targetID);
        newArray.unshift(taskInArray);
      }
      this.allTasks = newArray;
      localStorage.setItem('allTasks', JSON.stringify(this.allTasks));
    }
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
   * A function which is triggered by a play button event in a task item; on
   * call, it opens the play modal and sets the current task
   * @param {Event} event the event which triggered this function; it's target
   *                      should be the button of the task to be played.
   */
  static playTask(event) {
    localStorage.setItem('currentTask', event.target.getRootNode().host.id);
    window.location = '/timer-page/timer.html';
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
    taskItem.id = taskInfo.id;
    taskItem.name = taskInfo.name;
    taskItem.current = taskInfo.current;
    taskItem.number = taskInfo.number;
    taskItem.completed = taskInfo.completed;
    taskItem.setFunctions(
      TaskList.playTask.bind(this),
      this.deleteTask.bind(this),
      this.editTask.bind(this),
      this.setCheck.bind(this)
    );
    // append the newly created <task-item> to section
    const taskList = this.shadowRoot.querySelector('section');
    taskList.insertBefore(taskItem, taskList.firstChild);
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
    localStorage.setItem('allTasks', JSON.stringify(this.allTasks));
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
