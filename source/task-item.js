/**
 * This file defines web component <task-item> and have helper methods
 * for each small node that to be appended to the <task-item>.
 * All the helper methods for childNodes are defined above line 152
 * The class TaskItem and construdtor defines at line 152.
 * There are getter as helper methods for retrieving childNodes from the shadow root
 * There is callback function as eventlistener for the <task-item> which
 *    is under the getter.
 */

/**
 * The component that represents an individual task. Houses the task's
 * information and contains event listeners for play, edit,  delete, and
 * complete, which it gets from the task list.
 */
class TaskItem extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'number', 'completed', 'current'];
  }

  /**
   * Constructor which attaches a shadow root to this element in open mode
   */
  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
  }

  /**
   * Name of the task item given by the user.
   */
  set name(newValue) {
    this.setAttribute('name', newValue);
  }

  /**
   * The current amount of completed pomos on the task.
   */
  set current(newValue) {
    this.setAttribute('current', newValue);
  }

  /**
   * The estimated amount of pomos on the task.
   */
  set number(newValue) {
    this.setAttribute('number', newValue);
  }

  /**
   * Wheter or not the task is completed.
   */
  set completed(newValue) {
    this.setAttribute('completed', newValue);
  }

  /**
   * Name of the task item given by the user.
   */
  get name() {
    return this.getAttribute('name');
  }

  /**
   * The current amount of completed pomos on the task.
   */
  get current() {
    return this.getAttribute('current');
  }

  /**
   * The estimated amount of pomos on the task.
   */
  get number() {
    return this.getAttribute('number');
  }

  /**
   * Wheter or not the task is completed.
   */
  get completed() {
    return this.getAttribute('completed');
  }

  /**
   * the <input> for checkmark from <task-item>
   */
  get checkmark() {
    return this.shadowRoot.querySelector('input');
  }

  /**
   * the <p>'s content from <task-item>
   */
  get taskName() {
    return this.shadowRoot.querySelector('p').textContent;
  }

  /**
   * Invoked each time the task-item is appended into a document-connected
   * element, usually the task-list; creates all of the items of the task in the
   * task's shadow DOM.
   */
  connectedCallback() {
    // Set attributes for bootstrap.
    this.setAttribute('draggable', 'true');

    const section = document.createElement('section');
    // Creating the drag icon
    const dragIcon = TaskItem.createDrag();
    // Creating the checkmark
    const checkmark = this.createCheckmark();
    checkmark.addEventListener('click', this.setCheck);
    // Creating p tag for task name
    const todoTask = TaskItem.createTask(this.name);
    // Creating the progress-bar
    const progressBar = this.createProgressBar();
    const progressText = TaskItem.createProgressText(this.current, this.number);
    // Creating the play-button
    const playButton = this.createPlayButton();
    playButton.addEventListener('click', this.playTask);
    // Creating the edit-button
    const editButton = this.createEditButton();
    editButton.addEventListener('click', this.editTask);
    // Creating the delete-button
    const deleteButton = TaskItem.createDeleteButton();
    deleteButton.addEventListener('click', this.deleteTask);

    // Append the elements created into the shadow DOM.
    this.shadowRoot.innerHTML = TaskItem.getStyleSheets();
    this.shadowRoot.appendChild(section);
    section.appendChild(dragIcon);
    section.appendChild(checkmark);
    section.appendChild(todoTask);
    section.appendChild(progressBar);
    section.appendChild(progressText);
    section.appendChild(playButton);
    section.appendChild(editButton);
    section.appendChild(deleteButton);
  }

  /**
   * Sets all of the functions of this task item associated with systems outside
   * of the task object (modals, allTasks array in task list)
   * @param {function} playTask function associated with showing the "play" modal.
   * @param {function} deleteTask function associated with showing the "delete" modal.
   * @param {function} editTask function associated with showing the "edit" modal.
   * @param {function} setCheck function associated with completeing the task.
   */
  setFunctions(playTask, deleteTask, editTask, setCheck) {
    this.playTask = playTask;
    this.deleteTask = deleteTask;
    this.editTask = editTask;
    this.setCheck = setCheck;
  }

  /**
   * Change one of the attributes of the task. The following are valid
   * attributes: {string}'name', {number}'number', {string}'completed',
   *             {number}'current'
   * @param {string} name name of the attribute being changed
   * @param {*} oldValue NOT USED
   * @param {string|number} newValue new value of the attribute
   */
  attributeChangedCallback(name, oldValue, newValue) {
    // When changing the name, change the text content to the newvalue.
    if (name === 'name') {
      if (this.shadowRoot.querySelector('p')) {
        this.shadowRoot.querySelector('p').textContent = newValue;
      }
    }

    // When changing the number, change the ratio of the task's pomos
    if (name === 'number') {
      if (this.shadowRoot.querySelector('p1')) {
        this.shadowRoot.querySelector(
          'p1'
        ).innerHTML = `${this.current}/${newValue}`;
      }
    }

    // When changing the completed, fill out the progress bar and disable the
    // edit/play buttons.
    if (name === 'completed') {
      if (this.shadowRoot.childNodes[8]) {
        // change the progress bar
        const newProgressBar = this.createProgressBar();
        this.shadowRoot.replaceChild(
          newProgressBar,
          this.shadowRoot.childNodes[8]
        );

        const playButton = this.shadowRoot.querySelector('.play-btn');
        const editButton = this.shadowRoot.querySelector('.edit-btn');
        if (newValue === 'true') {
          playButton.disabled = true;
          playButton.firstChild.style.color = '#c4c4c4';
          editButton.disabled = true;
          editButton.firstChild.style.color = '#c4c4c4';
        } else {
          playButton.disabled = false;
          playButton.firstChild.style.color = '#2e4756';

          // re-enable edit only if no pomos are completed
          if (this.current === '0') {
            editButton.disabled = false;
            editButton.firstChild.style.color = '#2e4756';
          }
        }
      }
    }

    // When changing the current pomo value (thereby increasing it), disable the
    // edit button.
    if (name === 'current') {
      const editButton = this.shadowRoot.querySelector('.edit-btn');
      if (editButton && newValue > 0) {
        editButton.disabled = true;
        editButton.firstChild.style.color = '#c4c4c4';
      }
    }
  }

  /**
   * Method for creating progress bar for the task-item. The progress bar
   * element shows the progress of the current task; changes based on the
   * current and number attributes.
   * @returns {HTMLDivElement} The progress bar element.
   */
  createProgressBar() {
    let percent;
    const isCompleted = this.completed === 'true';
    // If the task is completed, force the percent to be 100%, else, get the
    // percentage of the completed pomos by the total amount of estimated pomos.
    if (isCompleted) {
      percent = '100%';
    } else {
      percent = (this.current / this.number) * 100;
      if (percent >= 100) {
        percent = '100%';
      } else {
        percent = `${percent.toFixed(2)}%`;
      }
    }

    // the div for the progress itserlf and uses the attribute from the newTask object
    const progress = document.createElement('progress-bar');

    // Modify the progress bar to reflect the percentage.
    progress.innerHTML = `${percent}`;

    return progress;
  }

  /**
   * Static method for creating the progress text. The progress text is an
   * element which shows the ratio of current/number of the task.
   * @param {string} current String of the number of current pomos this task
   *                         completed.
   * @param {string} number String of the number of estimated pomos this task has.
   * @return {HTMLElement} the text element as described as p1 tag
   */
  static createProgressText(current, number) {
    const progressT = `${current}/${number}`;
    const progressText = document.createElement('p1');
    progressText.setAttribute('class', 'progress-text');
    progressText.innerHTML = `${progressT}`;
    return progressText;
  }

  /**
   * Method for creating the task name element. The task name element shows the
   * name of the task; changes based on name attribute.
   * @param {string} name the name of the task.
   * @returns {HTMLParagraphElement} The elemet containing the task's name.
   */
  static createTask(name) {
    const todoTask = document.createElement('p');
    todoTask.innerHTML = name;
    return todoTask;
  }

  /**
   * Method for creating drag icon for the task-item. The drag icon element acts
   * as a visual indicator that the task can be dragged.
   * @returns {HTMLSpanElement} The drag element of the task
   */
  static createDrag() {
    const dragIcon = document.createElement('drag-ind');
    dragIcon.setAttribute('class', 'material-icons');
    dragIcon.textContent = 'drag_indicator';
    return dragIcon;
  }

  /**
   * Method for creating checkbox icon for the task-item. The checkmark element
   * shows if the task is completed; user can check/uncheck it, which triggers a
   * completion event.
   * @returns {HTMLSpanElement} The checkmark element inside the task.
   */
  createCheckmark() {
    // Create the checkmark
    const checkmarkInput = document.createElement('input');
    checkmarkInput.setAttribute('type', 'checkbox');
    checkmarkInput.setAttribute('job', 'check');
    checkmarkInput.setAttribute('id', 'checkmark-input');
    const isCompleted = this.completed === 'true';
    checkmarkInput.checked = isCompleted;
    return checkmarkInput;
  }

  /**
   * Method for creating the play-button. The play button element handles user
   * interaction and triggers a play event on click.
   * @return the button element with the play-icon
   */
  createPlayButton() {
    // Create play button element
    const playButton = document.createElement('button');
    playButton.setAttribute('class', 'material-icons ');
    playButton.setAttribute('job', 'play');
    playButton.textContent = 'play_circle';
    playButton.disabled = this.completed === 'true';
    return playButton;
  }

  /**
   * Method for creating edit button for the task-item. The edit button element
   * handles user interaction and triggers an edit event on click.
   * @returns {HTMLButtonElement} The edit button on the task-item
   */
  createEditButton() {
    // Create the edit button element
    const editButton = document.createElement('button');
    editButton.setAttribute('class', 'material-icons');
    editButton.setAttribute('job', 'edit');
    editButton.name = 'edit';
    editButton.textContent = 'mode_edit';
    editButton.disabled =
      this.completed === 'true' || parseInt(this.current, 10) > 0;
    return editButton;
  }

  /**
   * Method for creating delete button for the task-item. The delete button
   * element handles user interaction and triggers a delete event on click.
   * @returns {HTMLButtonElement} The delete button show on the task-item
   */
  static createDeleteButton() {
    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute(
      'class',
      'p-2 bd-highlight btn  delete-btn flex-right hide'
    );
    deleteButton.setAttribute('id', `delete-btn`);
    deleteButton.setAttribute('type', 'button');

    // Create the delete icon
    const deleteIcon = document.createElement('span');
    deleteIcon.setAttribute('class', 'material-icons delete-btn hide');
    deleteIcon.setAttribute('job', 'delete');
    deleteIcon.textContent = 'delete';
    deleteButton.appendChild(deleteIcon);
    return deleteButton;
  }

  /**
   * Method for the styles sheets
   * @returns {string} The style sheet for the task item's shadow DOM.
   */
  static getStyleSheets() {
    return `<link rel="stylesheet" href="task-item.css"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>`;
  }
}
customElements.define('task-item', TaskItem);

// Output module for testing
if (typeof exports !== 'undefined') {
  module.exports = {
    TaskItem,
  };
}
