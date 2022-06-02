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

    const failDialog = this.createFailDialog();

    const buttonContainer = this.createButtons();

    this.shadowRoot.appendChild(buttonContainer);
    this.shadowRoot.appendChild(breakModal);
    this.shadowRoot.appendChild(failDialog);
    this.shadowRoot.appendChild(styleSheet);
  }

  createButtons() {
    const buttonContainer = document.createElement('section');

    const startButton = TimerButtons.createButton(
      'class',
      'start-button',
      'Start'
    );
    startButton.title = 'Start Work Session';
    startButton.addEventListener('click', () => this.openTaskForm());

    const distractionInput = TimerButtons.createElementWithAttributes(
      'input',
      ['id', 'type', 'src', 'alt', 'title'],
      [
        'distraction-btn',
        'image',
        '/assets/images/tomo-excited.webp',
        'excited face',
        'Press If Distracted!',
      ],
      ''
    );
    distractionInput.style.display = 'none';
    distractionInput.addEventListener('click', this.countDistraction);

    const failButton = TimerButtons.createButton(
      'class',
      'fail-button',
      'Fail'
    );
    failButton.title = 'Fail Work Session';
    failButton.style.display = 'none';
    failButton.addEventListener('click', () => this.openFailDialog());

    const startBreakButton = TimerButtons.createButton(
      'id',
      'break-button',
      'Start Break'
    );
    startBreakButton.title = 'Start Break Session';
    startBreakButton.style.display = 'none';
    startBreakButton.addEventListener('click', () => {
      this.hideButtons();
      this.startBreak();
    });

    const taskForm = this.buildCreateTaskForm();

    buttonContainer.appendChild(startButton);
    buttonContainer.appendChild(taskForm);
    buttonContainer.appendChild(distractionInput);
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

    createTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const chosenId = this.shadowRoot.getElementById('choose-task').value;
      const taskName = this.shadowRoot.getElementById('task-name').value;
      const pomoCount = this.shadowRoot.getElementById('pomo-count').value;
      this.createTask(chosenId, taskName, pomoCount);
      this.startSession();
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
      if (this.shadowRoot.getElementById('choose-task').value) {
        this.shadowRoot.getElementById('task-name').disabled = true;
        this.shadowRoot.getElementById('pomo-count').disabled = true;
      } else {
        this.shadowRoot.getElementById('task-name').disabled = false;
        this.shadowRoot.getElementById('pomo-count').disabled = false;
      }
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
    createSkipButton.title = 'Skip Task and Start Work Session';
    createSkipButton.type = 'button';
    createSkipButton.addEventListener('click', () => {
      this.startSession();
    });

    const createStartButton = TimerButtons.createButton(
      'id',
      'create-start',
      'Start'
    );
    createTaskButtonsContainer.title = 'Start Work Session';
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
    dontShowCheckBox.addEventListener('input', () => {
      localStorage.setItem('autoContinue', dontShowCheckBox.checked);
    });

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
    const breakCompleteDialog = document.createElement('dialog');
    breakCompleteDialog.id = 'breakCompleteDialog';

    const header = document.createElement('h2');
    header.textContent = 'Break Complete';

    const happyFaceContainer = TimerButtons.createElementWithAttributes(
      'div',
      'id',
      'face-container'
    );
    const happyFaceImg = TimerButtons.createElementWithAttributes(
      'img',
      ['src', 'alt', 'width', 'height'],
      ['/assets/images/tomo-nice.webp', 'happy face', '121px', '100px']
    );

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
      'div',
      ['id'],
      ['auto-continue']
    );
    const autoContinueProgress = TimerButtons.createElementWithAttributes(
      'div',
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
    breakCompleteDialog.appendChild(header);
    breakCompleteDialog.appendChild(happyFaceContainer);
    happyFaceContainer.appendChild(happyFaceImg);
    breakCompleteDialog.appendChild(buttonTaskContainer);
    buttonTaskContainer.appendChild(continueTaskPosition);
    buttonTaskContainer.appendChild(changeTaskPosition);
    changeTaskPosition.appendChild(changeTaskButton);
    continueTaskPosition.appendChild(autoContinue);
    autoContinue.appendChild(autoContinueProgress);
    continueTaskPosition.appendChild(continueTaskButton);
    continueTaskButton.addEventListener('click', () => {
      breakCompleteDialog.close();
      this.hideButtons();
      this.shadowRoot.querySelector('.start-button').style.display = '';
      this.continueTask();
    });
    changeTaskButton.addEventListener('click', () => this.changeTask());
    return breakCompleteDialog;
  }

  createFailDialog() {
    const failDialog = document.createElement('dialog');

    failDialog.id = 'failDialog';

    const header = document.createElement('h2');
    header.textContent = 'Are You Sure?';

    const sadFaceContainer = TimerButtons.createElementWithAttributes(
      'div',
      'id',
      'face-container'
    );

    const sadFaceImg = TimerButtons.createElementWithAttributes(
      'img',
      ['src', 'alt', 'width', 'height'],
      ['/assets/images/tomo-sad.webp', 'sad face', '118px', '100px']
    );

    const failButtonContainer = TimerButtons.createElementWithAttributes(
      'div',
      'id',
      'fail-buttons'
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

    failDialog.appendChild(header);
    failDialog.appendChild(sadFaceContainer);
    sadFaceContainer.appendChild(sadFaceImg);
    failDialog.appendChild(failButtonContainer);
    failButtonContainer.appendChild(failButton);
    failButtonContainer.appendChild(cancelButton);
    cancelButton.addEventListener('click', () => this.hideFailDialog());
    failButton.addEventListener('click', () => this.failSession());
    return failDialog;
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
    this.shadowRoot.getElementById('failDialog').showModal();
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
      const allTasks = this.getTasks();
      if (allTasks) {
        allTasks.forEach((task) => {
          this.shadowRoot.getElementById(
            'choose-task'
          ).innerHTML += `<option value="${task.id}">${task.name}</option>`;
        });
      }
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
      '/assets/images/tomo-excited.webp';
    this.hideButtons();
    this.shadowRoot.querySelector('#distraction-btn').style.display = '';
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
  displayBreakComplete(isAuto) {
    if (isAuto) {
      this.shadowRoot.getElementById('auto-continue').style.display =
        'inline-block';
      this.shadowRoot
        .getElementById('auto-continue-progress')
        .setAttribute('running', 'true');
      this.shadowRoot.getElementById('continue-btn').style.display = 'none';
      setTimeout(() => {
        this.shadowRoot.getElementById('breakCompleteDialog').close();
        this.continueTask();
        this.startSession();
        this.shadowRoot
          .getElementById('auto-continue-progress')
          .setAttribute('running', 'false');
      }, 5500);
    } else {
      this.shadowRoot.getElementById('breakCompleteDialog').showModal();
      this.shadowRoot.getElementById('auto-continue').style.display = 'none';
      this.shadowRoot.getElementById('continue-btn').style.display =
        'inline-block';
    }
  }

  /**
   * do not fail current task.
   */
  hideFailDialog() {
    // keep session status active if they decide not to fail
    // add confirmation functionality to back button again
    window.history.pushState(null, document.title, window.location.href);
    this.shadowRoot.getElementById('failDialog').close();
  }

  /**
   * Used to increment distraction count.
   */
  countDistraction() {
    let distractCounter = localStorage.getItem('currentDistractCounter');

    if (!distractCounter) distractCounter = 0;

    distractCounter++;

    let source;

    switch (distractCounter) {
      case 0:
        source = '/assets/images/tomo-excited.webp';
        break;
      case 1:
        source = '/assets/images/tomo-happy.webp';
        this.alt = 'happy face';
        this.title = 'Distraction Level: A Little Bit';
        break;
      case 2:
        source = '/assets/images/tomo-neutral.webp';
        this.alt = 'neutral face';
        this.title = `Distraction Level: Somewhat`;
        break;
      case 3:
        source = '/assets/images/tomo-meh.webp';
        this.alt = 'meh face';
        this.title = `Distraction Level: Pretty High`;
        break;
      default:
        source = '/assets/images/tomo-bleh.webp';
        this.alt = 'bleh face';
        this.title = `Distraction Level: Out of It`;
        break;
    }

    this.src = source;

    localStorage.setItem('currentDistractCounter', distractCounter);
    localStorage.setItem(
      'distractCounter',
      Number(localStorage.getItem('distractCounter')) + 1
    );
  }

  setFunctions(
    changeTask,
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
