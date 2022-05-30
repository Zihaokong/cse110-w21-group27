class TimerButtons extends HTMLElement {
  constructor() {
    super();

    this.startTimer = () => null;
    this.createTask = () => null;
    this.chooseTask = () => null;
    this.continueTask = () => null;
    this.failSession = () => null;
    this.changeTask = () => null;
    this.startBreak = () => null;
    this.getTask = () => null;
    this.getTasks = () => null;

    this.attachShadow({
      mode: 'open',
    });
  }

  connectedCallback() {
    // Set up the style sheets
    const styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = '/components/timer-buttons/timer-buttons.css';

    const breakModal = this.createBreakEndDialog();

    const failModal = this.createFailDialog();

    const buttonContainer = this.createButtons();

    this.shadowRoot.appendChild(buttonContainer);
    this.shadowRoot.appendChild(breakModal);
    this.shadowRoot.appendChild(failModal);
    this.shadowRoot.appendChild(styleSheet);
  }

  createButtons() {
    const buttonContainer = document.createElement('section');

    const startButton = TimerButtons.createButton(
      'class',
      'start-button',
      'Start'
    );
    startButton.addEventListener('click', () => this.openTaskForm());

    const distractionLabel = TimerButtons.createElementWithAttributes(
      'label',
      ['id'],
      ['distraction-set'],
      ''
    );
    distractionLabel.style.display = 'none';
    const distractionSpan = document.createElement('span');
    distractionSpan.textContent = 'Distraction Level: ';

    const distractionInput = TimerButtons.createElementWithAttributes(
      'input',
      ['id', 'type', 'src', 'alt'],
      ['distraction-btn', 'image', '/assets/images/tomo-excited.png', 'None'],
      ''
    );
    distractionInput.addEventListener('click', this.countDistraction);

    distractionLabel.appendChild(distractionSpan);
    distractionLabel.appendChild(distractionInput);

    const failButton = TimerButtons.createButton(
      'class',
      'fail-button',
      'Fail'
    );
    failButton.style.display = 'none';
    failButton.addEventListener('click', () => this.openFailDialog());

    const startBreakButton = TimerButtons.createButton(
      'id',
      'break-button',
      'Start Break'
    );
    startBreakButton.style.display = 'none';
    startBreakButton.addEventListener('click', () => this.startBreak());

    const taskForm = this.buildCreateTaskForm();

    buttonContainer.appendChild(startButton);
    buttonContainer.appendChild(taskForm);
    buttonContainer.appendChild(distractionLabel);
    buttonContainer.appendChild(failButton);
    buttonContainer.appendChild(startBreakButton);

    return buttonContainer;
  }

  static createButton(attributeName, value, content) {
    const createdButton = document.createElement('button');
    createdButton.setAttribute(attributeName, value);
    createdButton.textContent = content;

    return createdButton;
  }

  static createElementWithAttributes(tagName, attributes, attrValues, content) {
    const element = document.createElement(tagName);
    if (Array.isArray(attributes) && Array.isArray(attrValues)) {
      for (let i = 0; i < attributes.length; i++) {
        const attrTag = attributes[i];
        const attrVal = attrValues[i];
        element.setAttribute(attrTag, attrVal);
      }
    } else {
      element.setAttribute(attributes, attrValues);
    }

    element.textContent = content;

    return element;
  }

  buildCreateTaskForm() {
    // Set up the create task form
    const createTaskForm = document.createElement('form');
    createTaskForm.setAttribute('id', 'create-task');
    createTaskForm.style.display = 'none';

    createTaskForm.addEventListener('submit', () => {
      const chosenId = document.getElementById('choose-task').value;
      const taskName = document.getElementById('task-name').value;
      const pomoCount = document.getElementById('pomo-count').value;
      this.createTask(chosenId, taskName, pomoCount);
    });

    // Set up the label for the choose task section.
    const chooseTaskLabel = document.createElement('label');
    chooseTaskLabel.setAttribute('for', 'choose-task');
    chooseTaskLabel.setAttribute('class', 'label-heading');
    chooseTaskLabel.textContent = 'Choose a task to start';

    // Set up the choose task selection section.
    const chooseTaskSelect = document.createElement('select');
    chooseTaskSelect.setAttribute('id', 'choose-task');
    chooseTaskSelect.addEventListener('input', () => {
      this.chooseTask(document.getElementById('choose-task').value);
    });

    // Seet up the the default task option for the selection
    const defaultTaskOption = document.createElement('option');
    defaultTaskOption.setAttribute('value', '');
    defaultTaskOption.textContent = '-';

    // Append the option to the selection
    chooseTaskSelect.appendChild(defaultTaskOption);

    // Set up the label of the create task form
    const createTaskLabel = document.createElement('label');
    createTaskLabel.setAttribute('for', 'task-name pomo-count');
    createTaskLabel.setAttribute('class', 'label-heading');
    createTaskLabel.textContent = 'Or create a new one!';

    // Set up the label of the task name input
    const taskNameLabel = document.createElement('label');
    taskNameLabel.setAttribute('for', 'task-name');

    // Set up the task name input
    const taskNameInput = document.createElement('input');
    taskNameInput.setAttribute('type', 'text');
    taskNameInput.setAttribute('id', 'task-name');

    // Set up the label for the pomo count
    const pomoCountLabel = document.createElement('label');
    pomoCountLabel.setAttribute('for', 'pomo-count');

    // Set up the input
    const pomoCountInput = document.createElement('input');
    pomoCountInput.setAttribute('type', 'number');
    pomoCountInput.setAttribute('id', 'pomo-count');
    pomoCountInput.setAttribute('min', '1');
    pomoCountInput.setAttribute('max', '10');

    const createTaskButtonsContainer = document.createElement('div');
    createTaskButtonsContainer.setAttribute(
      'id',
      'create-task-buttons-container'
    );

    const createSkipButton = TimerButtons.createButton(
      'id',
      'create-skip',
      'Skip'
    );
    createSkipButton.type = 'button';
    createSkipButton.addEventListener('click', () => {
      this.startSession();
    });

    const createStartButton = TimerButtons.createButton(
      'id',
      'create-start',
      'Start'
    );

    createTaskButtonsContainer.appendChild(createSkipButton);
    createTaskButtonsContainer.appendChild(createStartButton);

    // Set up the don't show option in the form
    const dontShowContainer = document.createElement('div');
    dontShowContainer.setAttribute('id', 'dont-show-container');

    const dontShowLabel = document.createElement('label');
    dontShowLabel.setAttribute('for', 'dont-show');
    dontShowLabel.textContent = "Don't show again";

    const dontShowCheckBox = document.createElement('input');
    dontShowCheckBox.setAttribute('type', 'checkbox');
    dontShowCheckBox.setAttribute('id', 'dont-show');
    dontShowCheckBox.addEventListener('input', () => this.dontShow());

    dontShowContainer.appendChild(dontShowLabel);
    dontShowContainer.appendChild(dontShowCheckBox);

    createTaskForm.appendChild(chooseTaskLabel);
    createTaskForm.appendChild(chooseTaskSelect);
    createTaskForm.appendChild(createTaskLabel);
    createTaskForm.appendChild(taskNameLabel);
    createTaskForm.appendChild(taskNameInput);
    createTaskForm.appendChild(pomoCountLabel);
    createTaskForm.appendChild(pomoCountInput);
    createTaskForm.appendChild(createTaskButtonsContainer);
    createTaskForm.appendChild(dontShowContainer);

    return createTaskForm;
  }

  createBreakEndDialog() {
    const breakCompleteModal = TimerButtons.createElementWithAttributes(
      'div',
      ['id', 'class'],
      ['breakCompleteModal', 'modal-break']
    );
    const modalContentShortBreak = TimerButtons.createElementWithAttributes(
      'div',
      'class',
      'modal-content-short_break'
    );
    const modalText = TimerButtons.createElementWithAttributes(
      'div',
      'class',
      'modal-text'
    );
    const breakCompleteHeading = TimerButtons.createElementWithAttributes(
      'div',
      'id',
      'heading-break-complete',
      'Break Complete'
    );
    const hr = document.createElement('hr');
    hr.style = 'border-width: 3px; color: #c4c4c4';
    const buttonTaskContainer = TimerButtons.createElementWithAttributes(
      'div',
      'id',
      'button-task-container'
    );
    const continueTaskPosition = TimerButtons.createElementWithAttributes(
      'div',
      'class',
      'button-task-position'
    );
    const continueTaskButton = TimerButtons.createElementWithAttributes(
      'button',
      ['id', 'class'],
      ['continue-btn', 'button-task'],
      'Continue Task'
    );
    const autoContinue = TimerButtons.createElementWithAttributes(
      'svg',
      ['id', 'height', 'display'],
      ['auto-continue', '30', 'none']
    );
    const autoContinueProgress = TimerButtons.createElementWithAttributes(
      'rect',
      'id',
      'auto-continue-progress'
    );
    const changeTaskPosition = TimerButtons.createElementWithAttributes(
      'div',
      'class',
      'button-task-position'
    );
    const changeTaskButton = TimerButtons.createElementWithAttributes(
      'button',
      ['id', 'class'],
      ['change-btn', 'button-task'],
      'Change Task'
    );
    breakCompleteModal.appendChild(modalContentShortBreak);
    modalContentShortBreak.appendChild(modalText);
    modalText.appendChild(breakCompleteHeading);
    modalText.appendChild(hr);
    modalText.appendChild(buttonTaskContainer);
    buttonTaskContainer.appendChild(continueTaskPosition);
    buttonTaskContainer.appendChild(changeTaskPosition);
    changeTaskPosition.appendChild(changeTaskButton);
    continueTaskPosition.appendChild(continueTaskButton);
    continueTaskPosition.appendChild(autoContinue);
    autoContinue.appendChild(autoContinueProgress);
    continueTaskButton.addEventListener('click', () => {
      breakCompleteModal.style.display = 'none';
      this.hideButtons();
      this.shadowRoot.querySelector('.start-button').style.display = '';
      this.continueTask();
    });
    changeTaskButton.addEventListener('click', () => this.changeTask());
    return breakCompleteModal;
  }

  createFailDialog() {
    const failModal = TimerButtons.createElementWithAttributes(
      'div',
      ['id', 'class'],
      ['failModal', 'modal-break']
    );
    const modalContentShortBreak = TimerButtons.createElementWithAttributes(
      'div',
      'class',
      'modal-content-short_break'
    );
    const modalText = TimerButtons.createElementWithAttributes(
      'div',
      'class',
      'modal-text'
    );
    const failHeading = TimerButtons.createElementWithAttributes(
      'div',
      'class',
      'heading-fail',
      'Are you sure you want to fail this pomo session?'
    );
    const sadFaceContainer = TimerButtons.createElementWithAttributes(
      'div',
      'class',
      'sad-face-container'
    );
    const sadFaceImg = TimerButtons.createElementWithAttributes(
      'img',
      ['id', 'src', 'alt'],
      ['sad-face', '../assets/images/sad-face.png', 'sad-face']
    );
    const failButtonContainer = TimerButtons.createElementWithAttributes(
      'div',
      'id',
      'fail-button-container'
    );
    const failButton = TimerButtons.createElementWithAttributes(
      'button',
      ['id', 'class'],
      ['fail-button', 'fail-buttons'],
      'Fail'
    );
    const cancelButton = TimerButtons.createElementWithAttributes(
      'button',
      ['id', 'class'],
      ['fail-button', 'Cancel-buttons'],
      'Cancel'
    );
    failModal.appendChild(modalContentShortBreak);
    modalContentShortBreak.appendChild(modalText);
    modalText.appendChild(failHeading);
    modalText.appendChild(sadFaceContainer);
    sadFaceContainer.appendChild(sadFaceImg);
    modalText.appendChild(failButtonContainer);
    failButtonContainer.appendChild(failButton);
    failButtonContainer.appendChild(cancelButton);
    cancelButton.addEventListener('click', () => this.hideFailDialog());
    failButton.addEventListener('click', () => this.failSession());
    return failModal;
  }

  /**
   * Toggles the task creation menu based on the checkmark.
   * This is done via the localStorage variable disable-create-menu.
   */
  setDisableTaskForm() {
    localStorage.setItem(
      'disable-create-menu',
      this.shadowRoot.getElementById('dont-show').checked
    );
  }

  /**
   * Display modal for fail.
   */
  openFailDialog() {
    this.shadowRoot.getElementById('failModal').style.display = 'block';
  }

  /**
   * Open the create-task form or start the pomodoro timer
   * depending on whether a task is already selected
   */
  openTaskForm() {
    // If a task is already selected or the create-menu is disabled
    if (this.getTask()) {
      this.startSession();
    } else {
      // Open the create-task form
      this.hideButtons();
      this.shadowRoot.getElementById('create-task').style.display = '';
      this.shadowRoot
        .getElementById('create-task')
        .scrollIntoView({ behavior: 'smooth' });
    }
  }

  startSession() {
    this.shadowRoot.querySelector('#distraction-btn').src =
      '/assets/images/tomo-excited.png';
    this.hideButtons();
    this.shadowRoot.querySelector('#distraction-set').style.display = '';
    this.shadowRoot.querySelector('.fail-button').style.display = '';
    this.startTimer();
  }

  /**
   * Hide all the different button elements below the timer
   */
  hideButtons() {
    // TODO FIX THIS LINTING ISSUE!
    // eslint-disable-next-line no-restricted-syntax
    for (const el of this.shadowRoot.querySelector('section').children) {
      el.style.display = 'none';
    }
  }

  /**
   * Used to initialize the task selection dropdown in the create-task form.
   * Fills the dropdown with the different tasks from the tasks page.
   */
  createTaskSelect() {
    const dropdown = this.shadowRoot.getElementById('choose-task');
    if (this.allTasks)
      this.allTasks.forEach((task) => {
        dropdown.innerHTML += `<option value="${task.id}">${task.name}</option>`;
      });
  }

  /**
   * Display break page, play sound and change appearance of website.
   */
  setupBreak() {
    this.hideButtons();
    this.shadowRoot.querySelector('#break-button').style.display = '';
  }

  /**
   * Display break complete modal, and sound.
   */
  displayBreakComplete() {
    this.shadowRoot.getElementById('breakCompleteModal').style.display =
      'block';
  }

  /**
   * do not fail current task.
   */
  hideFailDialog() {
    // keep session status active if they decide not to fail
    // add confirmation functionality to back button again
    window.history.pushState(null, document.title, window.location.href);
    this.shadowRoot.getElementById('failModal').style.display = 'none';
  }

  /**
   * Used to increment distraction count.
   */
  countDistraction() {
    let distractCounter = localStorage.getItem('distractCounter');

    if (!distractCounter) distractCounter = 0;

    distractCounter++;

    let source;

    switch (distractCounter) {
      case 0:
        source = '/assets/images/tomo-excited.png';
        break;
      case 1:
        source = '/assets/images/tomo-happy.png';
        break;
      case 2:
        source = '/assets/images/tomo-neutral.png';
        break;
      case 3:
        source = '/assets/images/tomo-meh.png';
        break;
      default:
        source = '/assets/images/tomo-bleh.png';
        break;
    }

    this.src = source;

    localStorage.setItem('distractCounter', distractCounter);
  }

  setFunctions(
    changeTask,
    chooseTask,
    continueTask,
    createTask,
    failSession,
    getTask,
    getTasks,
    startBreak,
    startTimer
  ) {
    this.startTimer = startTimer;
    this.createTask = createTask;
    this.continueTask = continueTask;
    this.chooseTask = chooseTask;
    this.failSession = failSession;
    this.getTask = getTask;
    this.getTasks = getTasks;
    this.changeTask = changeTask;
    this.startBreak = startBreak;
  }
}

customElements.define('timer-buttons', TimerButtons);

if (typeof exports !== 'undefined') {
  module.exports = {
    TimerButtons,
  };
}
