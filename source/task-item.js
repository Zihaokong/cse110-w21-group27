/**
 * This file defines web component <task-item> and have helper methods
 * for each small node that to be appended to the <task-item>.
 * All the helper methods for childNodes are defined above line 152
 * The class TaskItem and construdtor defines at line 152.
 * There are getter as helper methods for retrieving childNodes from the shadow root
 * There is callback function as eventlistener for the <task-item> which
 *    is under the getter.
 */

// Section for ESLint
/* global allTasks */

/**
 * TaskItem class which is the task-item component that containing all the
 * buttons and the to-do task on the listed item
 */
class TaskItem extends HTMLElement {
  /**
   * Constructor for the TaskItem
s   */
  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
  }

  // setter for name attribute
  set name(newValue) {
    this.setAttribute('name', newValue);
  }

  // setter for current attribute
  set current(newValue) {
    this.setAttribute('current', newValue);
  }

  // setter for number attribute
  set number(newValue) {
    this.setAttribute('number', newValue);
  }

  // getter for name attribute
  get name() {
    return this.getAttribute('name');
  }

  // getter for current attribute
  get current() {
    return this.getAttribute('current');
  }

  // getter for number attribute
  get number() {
    return this.getAttribute('number');
  }

  // Helper method for retrieving the <input> for checkmark from <task-item>
  get checkmark() {
    return this.shadowRoot.querySelector('input');
  }

  // Helper method for retrieving the <p>'s content from <task-item>
  get taskName() {
    return this.shadowRoot.querySelector('p').textContent;
  }

  // invoked each time the custom element is appended into a document-connected element
  connectedCallback() {
    const shadow = this.shadowRoot;
    this.setAttribute('class', 'taskNode d-flex flex-row bd-highlight');
    this.setAttribute('draggable', 'true');

    // this.name = this.name;
    // this.current = this.current;
    // this.number = this.number;

    // Creating the drag icon
    const dragIcon = TaskItem.createDrag();
    // Creating the checkmark
    const checkmark = TaskItem.createCheckmark();
    // Creating p tag for task name
    const todoTask = TaskItem.createTask(this.name);
    // Creating the progress-bar
    const progressBar = TaskItem.createProgressBar(this.current, this.number);
    const progressText = TaskItem.createProgressText(this.current, this.number);
    // Creating the play-button
    const playButton = TaskItem.createPlayButton();
    // Creating the edit-button
    const editButton = TaskItem.createEditButton();
    // Creating the edit-button
    const deleteButton = TaskItem.createDeleteButton();

    shadow.innerHTML = TaskItem.styleSheets();
    shadow.appendChild(dragIcon);
    shadow.appendChild(checkmark);
    shadow.appendChild(todoTask);
    shadow.appendChild(progressBar);
    shadow.appendChild(progressText);
    shadow.appendChild(playButton);
    shadow.appendChild(editButton);
    shadow.appendChild(deleteButton);

    this.shadowRoot
      .querySelector('.play-btn')
      .addEventListener('click', this.showModalTask);
    this.shadowRoot
      .querySelector('.edit-btn')
      .addEventListener('click', this.editTask);
    this.shadowRoot
      .querySelector('.delete-btn')
      .addEventListener('click', this.deleteTask);
    this.shadowRoot
      .querySelector('.form-check-input')
      .addEventListener('click', this.setCheck);
  }

  setFunctions(showModalTask, editTask, deleteTask, setCheck) {
    this.showModalTask = showModalTask;
    this.editTask = editTask;
    this.deleteTask = deleteTask;
    this.setCheck = setCheck;
  }

  // Invoked when the custom element is disconnected from the document's DOM.
  disconnectedCallback() {
    this.shadowRoot
      .querySelector('.play-btn')
      .removeEventListener('click', this.showModalTask);
    this.shadowRoot
      .querySelector('.edit-btn')
      .addEventListener('click', this.editTask);
    this.shadowRoot
      .querySelector('.delete-btn')
      .addEventListener('click', this.deleteTask);
    this.shadowRoot
      .querySelector('.form-check-input')
      .addEventListener('click', this.setCheck);
  }

  /**
   * Method for creating progress bar for the task-item
   * @param {object} newTask the new task object created by task.js
   */
  static createProgressBar(current, number) {
    // calculate the percentage of progress for the styles
    let percent;
    if (number !== 0) {
      percent = (current / number) * 100;
    } else {
      percent = undefined;
    }
    if (percent >= 100) {
      percent = '100%';
    } else if (percent !== undefined) {
      percent = `${percent.toFixed(2)}%`;
    } else {
      percent = `ERROR! Number of Pomos less than 1`;
    }
    // the outer div containng the progress-bar
    const progressBar = document.createElement('div');
    progressBar.setAttribute('class', 'flex-column progress');
    // the inner div for the progress itserlf and uses the attribute from the newTask object
    const progress = document.createElement('div');
    if (current > number) {
      progress.setAttribute(
        'class',
        'progress-bar progress-bar-striped bg-danger'
      );
    } else {
      progress.setAttribute(
        'class',
        'progress-bar progress-bar-striped bg-success'
      );
    }
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('style', `width: ${percent};`);
    progress.setAttribute('aria-valuenow', `${current}`);
    progress.setAttribute('aria-valuemin', 0);
    progress.setAttribute('aria-valuemin', `${number}`);
    progress.innerHTML = `${percent}`;
    // append the inner div to outer div
    progressBar.appendChild(progress);
    return progressBar;
  }

  /**
   * Method for creating text representing the finished pomo over the expect required pomo
   * @param {object} newTask the new task object created by task.js
   * @return the text element as described as p1 tag
   */
  static createProgressText(current, number) {
    const progressT = `${current}/${number}`;
    const progressText = document.createElement('p1');
    progressText.setAttribute('class', 'progress-text');
    progressText.innerHTML = `${progressT}`;
    return progressText;
  }

  /**
   * Method for creating task with the input todo task for the task-item
   * @param {object} newTask the newly created task item from the task.js
   */
  static createTask(name) {
    const todoTask = document.createElement('p');
    todoTask.setAttribute('class', 'p-2 flex-md-fill text-nowrap task-item');
    todoTask.innerHTML = name;
    return todoTask;
  }

  /**
   * Method for creating drag icon for the task-item
   */
  static createDrag() {
    const dragIcon = document.createElement('span');
    dragIcon.setAttribute('class', 'p-2 inline material-icons drag-btn hide');
    dragIcon.setAttribute('id', `drag`);
    // dragIcon.setAttribute('draggable', "true");
    dragIcon.textContent = 'drag_indicator';
    return dragIcon;
  }

  /**
   * Method for creating checkbox icon for the task-item
   */
  static createCheckmark() {
    const checkmark = document.createElement('span');
    checkmark.setAttribute('class', 'p-2 form-check form-check-inline');
    checkmark.setAttribute('id', `checkmark`);
    const checkmarkInput = document.createElement('input');
    checkmarkInput.setAttribute('class', 'form-check-input input-mysize large');
    checkmarkInput.setAttribute('type', 'checkbox');
    checkmarkInput.setAttribute('job', 'check');
    const checkmarkLabel = document.createElement('label');
    checkmarkLabel.setAttribute('for', 'checkbox');
    checkmark.appendChild(checkmarkInput);
    checkmark.appendChild(checkmarkLabel);
    return checkmark;
  }

  /**
   * Method for creating the play-button to start the timer for the task-item
   * @return the button element with the play-icon
   */
  static createPlayButton() {
    const playButton = document.createElement('button');
    playButton.setAttribute(
      'class',
      'p-2 bd-highlight btn  play-btn flex-right hide'
    );
    playButton.setAttribute('id', `play-btn`);
    playButton.setAttribute('type', 'button');
    const playIcon = document.createElement('span');
    playIcon.setAttribute('class', 'material-icons play-btn hide');
    playIcon.setAttribute('job', 'play');
    playIcon.textContent = 'play_circle';
    playButton.appendChild(playIcon);
    return playButton;
  }

  /**
   * Method for creating edit button for the task-item
   * @return The edit button show on the task-item
   */
  static createEditButton() {
    const editButton = document.createElement('button');
    editButton.setAttribute(
      'class',
      'p-2 bd-highlight btn  edit-btn flex-right hide'
    );
    editButton.setAttribute('id', `edit-btn`);
    editButton.setAttribute('type', 'button');
    const editIcon = document.createElement('span');
    editIcon.setAttribute('class', 'material-icons edit-btn hide');
    editIcon.setAttribute('job', 'edit');
    editIcon.textContent = 'mode_edit';
    editButton.appendChild(editIcon);
    return editButton;
  }

  /**
   * Method for creating delete button for the task-item
   * @return The delete button show on the task-item
   */
  static createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute(
      'class',
      'p-2 bd-highlight btn  delete-btn flex-right hide'
    );
    deleteButton.setAttribute('id', `delete-btn`);
    deleteButton.setAttribute('type', 'button');
    const deleteIcon = document.createElement('span');
    deleteIcon.setAttribute('class', 'material-icons delete-btn hide');
    deleteIcon.setAttribute('job', 'delete');
    deleteIcon.textContent = 'delete';
    deleteButton.appendChild(deleteIcon);
    return deleteButton;
  }

  /**
   * Method for the styles sheets
   */
  static styleSheets() {
    return `<link rel="stylesheet" href="task.css"/>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"/>`;
  }
}
customElements.define('task-item', TaskItem);

// Output module for testing
if (typeof exports !== 'undefined') {
  module.exports = {
    TaskItem,
  };
}
