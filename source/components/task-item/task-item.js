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
 * \<task-item\>
 *
 * The web component that represents an individual task. Houses the task's
 * information and contains event listeners for play, edit,  delete, and
 * complete, which it gets from the task list.
 */
class TaskItem extends HTMLElement {
  /**
   * Returns a list of the attributes this component interacts with.
   * @type {string[]}
   */
  static get observedAttributes() {
    return ['name', 'number', 'completed', 'current'];
  }

  /**
   * Constructor which attaches a shadow root to this element in open mode.
   */
  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
  }

  /**
   * Sets the name of the task item given by the user.
   * @type {string}
   */
  set name(newValue) {
    this.setAttribute('name', newValue);
  }

  /**
   * Gets the name of the task item given by the user.
   * @type {string}
   */
  get name() {
    return this.getAttribute('name');
  }

  /**
   * Sets the current amount of completed pomos on the task.
   * @type {string|number}
   */
  set current(newValue) {
    this.setAttribute('current', newValue);
  }

  /**
   * Gets the current amount of completed pomos on the task.
   * @type {string}
   */
  get current() {
    return this.getAttribute('current');
  }

  /**
   * Sets the estimated amount of pomos on the task.
   * @type {string|number}
   */
  set number(newValue) {
    this.setAttribute('number', newValue);
  }

  /**
   * Gets the estimated amount of pomos on the task.
   * @type {string}
   */
  get number() {
    return this.getAttribute('number');
  }

  /**
   * Sets whether or not the task is completed.
   * @type {string|boolean}
   */
  set completed(newValue) {
    this.setAttribute('completed', newValue);
  }

  /**
   * Gets whether or not the task is completed.
   * @type {string}
   */
  get completed() {
    return this.getAttribute('completed');
  }

  /**
   * Gets the input-element (the checkmark) from this task-item
   * @type {HTMLInputElement}
   */
  get checkmark() {
    return this.shadowRoot.querySelector('input');
  }

  /**
   * Gets the p-element's content from this task-item
   * @type {string}
   */
  get taskName() {
    return this.shadowRoot.querySelector('h1').textContent;
  }

  /**
   * Change one of the attributes of the task. The following are valid
   * attributes: {string}'name', {number}'number', {string}'completed',
   *             {number}'current'
   * @param {string} name name of the attribute being changed
   * @param {*} _ Value is not used, only exists to fit function template
   * @param {string|number} newValue new value of the attribute
   */
  attributeChangedCallback(name, _, newValue) {
    // When changing the name, change the text content to the newvalue.
    if (name === 'name') {
      if (this.shadowRoot.querySelector('h1')) {
        this.shadowRoot.querySelector('h1').textContent = newValue;
      }
    }

    // When changing the completed or number, fill out the progress bar and disable the
    // edit/play buttons.
    if (name === 'completed' || name === 'number') {
      // change the progress bar

      if (this.shadowRoot.querySelector('progress-container'))
        this.updateProgressBar();

      const playButton = this.shadowRoot.querySelector('button[job="play"]');
      const editButton = this.shadowRoot.querySelector('button[job="edit"]');
      if (playButton && editButton) {
        if (newValue === 'true') {
          playButton.disabled = true;
          editButton.disabled = true;
        } else {
          playButton.disabled = false;
          // re-enable edit only if no pomos are completed
          if (this.current === '0') {
            editButton.disabled = false;
          }
        }
      }
    }

    // When changing the current pomo value (thereby increasing it), disable the
    // edit button.
    if (name === 'current') {
      const editButton = this.shadowRoot.querySelector('button[job="edit"]');
      if (editButton && newValue > 0) {
        editButton.disabled = true;
      }
    }
  }

  /**
   * Invoked each time the task-item is appended into a document-connected
   * element, usually the task-list; creates all of the items of the task in the
   * task's shadow DOM.
   */
  connectedCallback() {
    if (this.shadowRoot.childNodes.length === 0) this.constructShadowDOM();
  }

  /**
   * Constructs the shadow DOM of the task item. Should only be called once
   * during the initial connected callback.
   */
  constructShadowDOM() {
    this.draggable = true;

    // Set the draggable attribute for task-item mobility
    const section = document.createElement('section');

    // Creating the drag icon
    const dragIcon = TaskItem.createDrag();

    // Creating the checkmark
    const checkmark = this.createCheckmark();
    checkmark.addEventListener('click', this.setCheck);

    // Creating title for task
    const title = this.createTitle();

    // Creating the progress-bar
    const progressBar = this.createProgressBar();

    // Creating the play-button
    const playButton = this.createPlayButton();
    playButton.addEventListener('click', this.playTask);

    // Creating the edit-button
    const editButton = this.createEditButton();
    editButton.addEventListener('click', () => {
      this.setUpEdit();
    });

    // Creating the delete-button
    const deleteButton = TaskItem.createDeleteButton();

    deleteButton.addEventListener('click', (e) => {
      if ('ontouchstart' in window) {
        this.deleteTask(e);
      } else {
        deleteButton.textContent = 'check_circle';
        deleteButton.addEventListener('click', this.deleteTask, {
          once: 'true',
        });

        deleteButton.addEventListener(
          'mouseout',
          () => {
            deleteButton.textContent = 'delete';
            deleteButton.removeEventListener('click', this.deleteTask);
          },
          { once: 'true' }
        );
      }
    });

    // Create the style
    const styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = '/components/task-item/task-item.css';

    // Create the edit form
    const editForm = document.createElement('form');
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.name = nameInput.value;
      this.number = countInput.value;
      this.editTask(this.id, nameInput.value, countInput.value);
      editForm.setAttribute('permit', 'false');
      this.draggable = true;
    });
    editForm.setAttribute('permit', 'false');

    // (EDIT) Create the name input
    const nameInput = document.createElement('input');
    nameInput.placeholder = 'Title';
    nameInput.maxLength = 26;
    nameInput.required = true;
    nameInput.type = 'text';
    nameInput.setAttribute('content', 'title');

    // (EDIT) Create the count input
    const countInput = document.createElement('input');
    countInput.placeholder = 'Pomo Count';
    countInput.type = 'number';
    countInput.min = 1;
    countInput.max = 10;
    countInput.required = true;
    countInput.setAttribute('content', 'count');

    // (EDIT) Create the submit button
    const submitButton = document.createElement('button');
    submitButton.className = 'icon';
    submitButton.textContent = 'check_circle';
    submitButton.type = 'submit';

    // (EDIT) Create the cancel button
    const cancelButton = document.createElement('button');
    cancelButton.className = 'icon';
    cancelButton.textContent = 'cancel';
    cancelButton.type = 'cancel';
    cancelButton.addEventListener('click', (e) => {
      e.preventDefault();
      editForm.setAttribute('permit', 'false');
      this.draggable = true;
    });

    editForm.append(nameInput);
    editForm.append(countInput);
    editForm.append(submitButton);
    editForm.append(cancelButton);

    // Append the items to the shadowRoot
    this.shadowRoot.appendChild(styleSheet);
    this.shadowRoot.appendChild(section);
    section.appendChild(dragIcon);
    section.appendChild(checkmark);
    section.appendChild(title);
    section.appendChild(progressBar);
    section.appendChild(playButton);
    section.appendChild(editButton);
    section.appendChild(deleteButton);
    section.appendChild(editForm);
  }

  /**
   * Method for creating checkbox icon for the task-item. The checkmark element
   * shows if the task is completed; user can check/uncheck it, which triggers a
   * completion event.
   * @returns {HTMLInputElement} The checkmark element inside the task.
   */
  createCheckmark() {
    // Create the checkmark
    const checkmarkInput = document.createElement('input');
    checkmarkInput.setAttribute('type', 'checkbox');
    checkmarkInput.title = 'Mark task as completed/uncompleted';
    const isCompleted = this.completed === 'true';
    checkmarkInput.checked = isCompleted;
    return checkmarkInput;
  }

  /**
   * Method for creating delete button for the task-item. The delete button
   * element handles user interaction and triggers a delete event on click.
   * @returns {HTMLButtonElement} The delete button show on the task-item
   */
  static createDeleteButton() {
    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'icon';
    deleteButton.setAttribute('job', 'delete');
    deleteButton.textContent = 'delete';
    deleteButton.title = `Delete Task`;
    return deleteButton;
  }

  /**
   * Method for creating drag icon for the task-item. The drag icon element acts
   * as a visual indicator that the task can be dragged.
   * @returns {HTMLElement} The drag element of the task
   */
  static createDrag() {
    const dragIcon = document.createElement('drag-ind');
    dragIcon.className = 'icon';
    dragIcon.textContent = 'drag_indicator';
    return dragIcon;
  }

  /**
   * Method for creating edit button for the task-item. The edit button element
   * handles user interaction and triggers an edit event on click.
   * @returns {HTMLButtonElement} The edit button on the task-item
   */
  createEditButton() {
    // Create the edit button element
    const editButton = document.createElement('button');
    editButton.className = 'icon';
    editButton.setAttribute('job', 'edit');
    editButton.textContent = 'mode_edit';
    editButton.title = 'Edit Task';
    editButton.disabled =
      this.completed === 'true' || parseInt(this.current, 10) > 0;
    return editButton;
  }

  /**
   * Method for creating the play-button. The play button element handles user
   * interaction and triggers a play event on click.
   * @return {HTMLButtonElement} The button element with the play-icon
   */
  createPlayButton() {
    // Create play button element
    const playButton = document.createElement('button');
    playButton.className = 'icon';
    playButton.setAttribute('job', 'play');
    playButton.textContent = 'play_circle';
    playButton.title = 'Start task';
    playButton.disabled = this.completed === 'true';
    return playButton;
  }

  /**
   * Method for creating progress bar for the task-item. The progress bar
   * element shows the progress of the current task; changes based on the
   * current and number attributes.
   * @returns {HTMLElement} The progress bar element.
   */
  createProgressBar() {
    let percent = '0%';
    // If the task is completed, force the percent to be 100%, else, get the
    // percentage of the completed pomos by the total amount of estimated pomos.
    if (this.completed === 'true') {
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
    const progressContainter = document.createElement('progress-container');
    const progress = document.createElement('progress-bar');
    progress.style.width = percent;
    progress.textContent = `${this.current}/${this.number}`;

    progressContainter.appendChild(progress);

    return progressContainter;
  }

  /**
   * Method for creating the task name element. The task name element shows the
   * name of the task; changes based on name attribute.
   * @param {string} name the name of the task.
   * @returns {HTMLHeadingElement} The elemet containing the task's name.
   */
  createTitle() {
    const title = document.createElement('h1');
    title.textContent = this.name;
    return title;
  }

  /**
   * Sets the functions called by this element when different buttons are pressed.
   * @param {function} playTask function associated with the "play" button.
   * @param {function} deleteTask function associated with the "delete" button.
   * @param {function} editTask function associated with the "edit" button.
   * @param {function} setCheck function associated with the checkmark button.
   */
  setFunctions(playTask, deleteTask, editTask, setCheck) {
    this.playTask = playTask;
    this.deleteTask = deleteTask;
    this.editTask = editTask;
    this.setCheck = setCheck;
  }

  /**
   * This function handles opening and closing the edit form via the permit attribute
   * of the form element. The CSS will choose the height of the form element based off
   * of the permit attribute (0 when false, based on screen size when true).
   *
   * This function will also make the task-item undraggable while being edited.
   *
   * Calling this function will toggle the permit attribute.
   */
  setUpEdit() {
    // Open Edit Form;
    const form = this.shadowRoot.querySelector('form');
    if (form.getAttribute('permit') === 'true') {
      form.setAttribute('permit', 'false');
      this.draggable = true;
    } else {
      form.setAttribute('permit', 'true');
      this.draggable = false;
      form.querySelector('input[content="title"]').value = this.name;
      form.querySelector('input[content="count"]').value = this.number;
    }
  }

  /**
   * Method for updating the progress bar for the task-item. The progress bar
   * element shows the progress of the current task; changes based on the
   * current and number attributes.
   */
  updateProgressBar() {
    let percent = '0%';
    // If the task is completed, force the percent to be 100%, else, get the
    // percentage of the completed pomos by the total amount of estimated pomos.
    if (this.completed === 'true') {
      percent = '100%';
    } else {
      percent = (this.current / this.number) * 100;
      if (percent >= 100) {
        percent = '100%';
      } else {
        percent = `${percent.toFixed(2)}%`;
      }
    }

    // the div for the progress itself and uses the attribute from the newTask object
    const progress = this.shadowRoot.querySelector('progress-bar');
    progress.style.width = percent;
    progress.textContent = `${this.current}/${this.number}`;
  }
}

customElements.define('task-item', TaskItem);

// Output module for testing
if (typeof exports !== 'undefined') {
  module.exports = {
    TaskItem,
  };
}
