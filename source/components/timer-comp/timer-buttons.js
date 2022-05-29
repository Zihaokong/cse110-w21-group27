class TimerButtons extends HTMLElement {
    constructor() {
        super();
        this.currentTaskIndex = -1;
        this.distractCounter = 0;
        this.isFailed = false;
        this.allTasks = localStorage.getItem('allTasks') ? JSON.parse(localStorage.getItem('allTasks')) : [];
        this.attachShadow({
            mode: 'open'
        });
    }

    connectedCallback() {

        this.renderButtons();
        this.shadowRoot.appendChild(this.buildBreakCompleteModal())
        this.shadowRoot.appendChild(this.buildFailModal())

        const styleSheet = document.createElement('link');
        styleSheet.rel = 'stylesheet';
        styleSheet.href = '/components/timer-comp/timer-buttons.css';
        this.shadowRoot.appendChild(styleSheet);
        this.taskSelectInit()


    }

    renderButtons() {

        const buttonContainer = document.createElement('section');
        buttonContainer.setAttribute('class', 'container');
        const startButton = this.createButton('class', 'startButton', 'Start');
        startButton.setAttribute('id', 'start-btn');


        const distractionButton = this.createButton('class', 'distraction');
        distractionButton.setAttribute('id', 'distraction-btn');
        distractionButton.style.display = 'none';


        const failButton = this.createButton('class', 'fail', 'Fail');
        failButton.setAttribute('id', 'fail-btn', 'Fail');
        failButton.style.display = 'none';

        const startBreakButton = this.createButton('id', 'start-break-btn', 'Start Break');
        startBreakButton.style.display = 'none';

        buttonContainer.appendChild(startButton);
        buttonContainer.appendChild(this.buildCreateTaskForm());
        buttonContainer.appendChild(distractionButton);
        buttonContainer.appendChild(failButton);
        buttonContainer.appendChild(startBreakButton);

        this.shadowRoot.appendChild(buttonContainer);

        // Add event listeners for buttons on timer page
        // The Start button for starting a pomo session
        startButton.addEventListener('click', () => this.startButtonEvent());
        distractionButton.addEventListener('click', () => this.distractionCount());
        failButton.addEventListener('click', () => this.displayFailModal());

        startBreakButton.addEventListener('click', () => this.startBreak());
    }

    createButton(attributeName, value, content) {
        const createdButton = document.createElement('button');
        createdButton.setAttribute(attributeName, value);
        createdButton.textContent = content;
        return createdButton;
    }

    createElementWithAttributes(tagName, attributes, attrValues, content) {
        const element = document.createElement(tagName)
        if (Array.isArray(attributes) && Array.isArray(attrValues)) {
            for (let i = 0; i < attributes.length; i++) {
                let attrTag = attributes[i]
                let attrVal = attrValues[i]
                element.setAttribute(attrTag, attrVal)
            }
        } else {
            element.setAttribute(attributes, attrValues);
        }


        element.textContent = content
        return element
    }

    buildCreateTaskForm() {
        const createTaskForm = document.createElement('form');

        createTaskForm.setAttribute('id', 'create-task');
        createTaskForm.style.display = 'none';

        const chooseTaskLabel = document.createElement('label');
        chooseTaskLabel.setAttribute('for', 'choose-task');
        chooseTaskLabel.setAttribute('class', 'label-heading');
        chooseTaskLabel.textContent = 'Choose a task to start';


        const chooseTaskSelect = document.createElement('select');
        chooseTaskSelect.setAttribute('id', 'choose-task');
        chooseTaskSelect.addEventListener('input', chooseTask);

        const defaultTaskOption = document.createElement('option');
        defaultTaskOption.setAttribute('value', '');
        defaultTaskOption.textContent = '-';


        const createTaskLabel = document.createElement('label');
        createTaskLabel.setAttribute('for', 'task-name pomo-count');
        createTaskLabel.setAttribute('class', 'label-heading');
        createTaskLabel.textContent = 'Or create a new one!';


        const taskNameLabel = document.createElement('label');
        taskNameLabel.setAttribute('for', 'task-name');
        const taskNameInput = document.createElement('input');
        taskNameInput.setAttribute('type', 'text');
        taskNameInput.setAttribute('id', 'task-name');
        const pomoCountLabel = document.createElement('label');
        pomoCountLabel.setAttribute('for', 'pomo-count');
        const pomoCountInput = document.createElement('input');
        pomoCountInput.setAttribute('type', 'number');
        pomoCountInput.setAttribute('id', 'pomo-count');
        pomoCountInput.setAttribute('min', '1');
        pomoCountInput.setAttribute('max', '10');


        const createTaskButtonsContainer = document.createElement('div');
        createTaskButtonsContainer.setAttribute('id', 'create-task-buttons-container');
        const createSkipButton = this.createButton('id', 'create-skip', 'Skip');
        const createStartButton = this.createButton('id', 'create-start', 'Start');


        const dontShowContainer = document.createElement('div');
        dontShowContainer.setAttribute('id', 'dont-show-container');
        const dontShowLabel = document.createElement('label');
        dontShowLabel.setAttribute('for', 'dont-show');
        dontShowLabel.textContent = 'Don\'t show again';
        const dontShowCheckBox = document.createElement('input');
        dontShowCheckBox.setAttribute('type', 'checkbox');
        dontShowCheckBox.setAttribute('id', 'dont-show');


        createTaskForm.appendChild(chooseTaskLabel);
        chooseTaskSelect.appendChild(defaultTaskOption);
        createTaskForm.appendChild(chooseTaskSelect);
        createTaskForm.appendChild(createTaskLabel);
        createTaskForm.appendChild(taskNameLabel);
        createTaskForm.appendChild(taskNameInput);
        createTaskForm.appendChild(pomoCountLabel);
        createTaskForm.appendChild(pomoCountInput);
        createTaskButtonsContainer.appendChild(createSkipButton);
        createTaskButtonsContainer.appendChild(createStartButton);
        createTaskForm.appendChild(createTaskButtonsContainer);
        dontShowContainer.appendChild(dontShowLabel);
        dontShowContainer.appendChild(dontShowCheckBox);
        createTaskForm.appendChild(dontShowContainer);


        createSkipButton.addEventListener('click', () => this.startTimer());
        createStartButton.addEventListener('click', () => this.createTask());
        dontShowCheckBox.addEventListener('input', () => this.dontShow());
        chooseTaskSelect.addEventListener('input', () => this.chooseTask());
        return createTaskForm;
    }

    buildBreakCompleteModal() {
        const breakCompleteModal = this.createElementWithAttributes('div', ['id', 'class'], ['breakCompleteModal', 'modal-break']);
        const modalContentShortBreak = this.createElementWithAttributes('div', 'class', 'modal-content-short_break')
        const modalText = this.createElementWithAttributes('div', 'class', 'modal-text')
        const breakCompleteHeading = this.createElementWithAttributes('div', 'id', 'heading-break-complete', 'Break Complete')
        const hr = document.createElement('hr')
        hr.style = 'border-width: 3px; color: #c4c4c4'
        const buttonTaskContainer = this.createElementWithAttributes('div', 'id', 'button-task-container')
        const continueTaskPosition = this.createElementWithAttributes('div', 'class', 'button-task-position')
        const continueTaskButton = this.createElementWithAttributes('button', ['id', 'class'], ['continue-btn', 'button-task'], 'Continue Task')
        const autoContinue = this.createElementWithAttributes('svg', ['id', 'height', 'display'], ['auto-continue', '30', 'none'])
        const autoContinueProgress = this.createElementWithAttributes('rect', 'id', 'auto-continue-progress')
        const changeTaskPosition = this.createElementWithAttributes('div', 'class', 'button-task-position')
        const changeTaskButton = this.createElementWithAttributes('button', ['id', 'class'], ['change-btn', 'button-task'], 'Change Task')
        breakCompleteModal.appendChild(modalContentShortBreak)
        modalContentShortBreak.appendChild(modalText)
        modalText.appendChild(breakCompleteHeading)
        modalText.appendChild(hr)
        modalText.appendChild(buttonTaskContainer)
        buttonTaskContainer.appendChild(continueTaskPosition)
        buttonTaskContainer.appendChild(changeTaskPosition)
        changeTaskPosition.appendChild(changeTaskButton)
        continueTaskPosition.appendChild(continueTaskButton)
        continueTaskPosition.appendChild(autoContinue)
        autoContinue.appendChild(autoContinueProgress)
        changeTaskButton.addEventListener('click', () => this.changeTask())
        return breakCompleteModal
    }

    buildFailModal() {
        const failModal = this.createElementWithAttributes('div', ['id', 'class'], ['failModal', 'modal-break']);
        const modalContentShortBreak = this.createElementWithAttributes('div', 'class', 'modal-content-short_break')
        const modalText = this.createElementWithAttributes('div', 'class', 'modal-text')
        const failHeading = this.createElementWithAttributes('div', 'class', 'heading-fail', 'Are you sure you want to fail this pomo session?')
        const sadFaceContainer = this.createElementWithAttributes('div', 'class', 'sad-face-container')
        const sadFaceImg = this.createElementWithAttributes('img', ['id', 'src', 'alt'], ['sad-face', '../assets/images/sad-face.png', 'sad-face'])
        const failButtonContainer = this.createElementWithAttributes('div', 'id', 'fail-button-container')
        const failButton = this.createElementWithAttributes('button', ['id', 'class'], ['fail-button', 'fail-buttons'], 'Fail')
        const cancelButton = this.createElementWithAttributes('button', ['id', 'class'], ['fail-button', 'Cancel-buttons'], 'Cancel')
        failModal.appendChild(modalContentShortBreak)
        modalContentShortBreak.appendChild(modalText)
        modalText.appendChild(failHeading)
        modalText.appendChild(sadFaceContainer)
        sadFaceContainer.appendChild(sadFaceImg)
        modalText.appendChild(failButtonContainer)
        failButtonContainer.appendChild(failButton)
        failButtonContainer.appendChild(cancelButton)
        cancelButton.addEventListener('click', () => this.quitFailModal());
        failButton.addEventListener('click', () => this.failSession());
        return failModal

    }

    /**
     * Start the pomodoro timer for current task.
     */
    startTimer() {
        const todayPomos = Number(localStorage.getItem('todayPomo'));
        localStorage.setItem('todayPomo', todayPomos + 1);

        this.isFailed = true;

        // hideButtons();
        this.shadowRoot.getElementById('start-btn').style.display = 'none';
        this.shadowRoot.getElementById('distraction-btn').style.display = '';
        this.shadowRoot.getElementById('fail-btn').style.display = '';

        // display correct distraction counter
        this.distractCounter = 0;
        this.shadowRoot.getElementById(
            'distraction-btn'
        ).innerHTML = `Distraction : ${this.distractCounter}`;

        start();
    }

    /**
     * Used by the create-task form to create a task
     * Called when the create-task Start button is called
     */
    createTask() {
        const chosenId = this.shadowRoot.getElementById('choose-task').value;
        const taskName = this.shadowRoot.getElementById('task-name').value;
        const pomoCount = this.shadowRoot.getElementById('pomo-count').value;

        if (chosenId) {
            // If a task was selected from the dropdown, set it as the current
            //    task and start the timer
            for (let i = 0; i < allTasks.length; i++) {
                if (allTasks[i].id === chosenId) {
                    this.currentTaskIndex = i;
                    this.shadowRoot.getElementById('currTask').innerHTML =
                        this.allTasks[this.currentTaskIndex].name;
                }
            }
            localStorage.setItem('currentTask', chosenId);

            this.startTimer();
        } else if (taskName && pomoCount) {
            // Creating the task and adding it to our task list
            const randomId = Math.random().toString(16).slice(2);

            this.currentTaskIndex = this.allTasks.length;
            const newTask = {
                completed: false,
                current: 0,
                id: randomId,
                name: taskName,
                note: '',
                number: pomoCount
            }
            this.allTasks.push(newTask);
            localStorage.setItem('allTasks', JSON.stringify(this.allTasks));

            // Making it the current task and starting the timer
            localStorage.setItem('currentTask', randomId);
            this.shadowRoot.getElementById('currTask').innerHTML =
                this.allTasks[this.currentTaskIndex].name;

            this.startTimer();
        } else {
            const headings = this.shadowRoot.querySelectorAll('.label-heading');
            for (let i = 0; i < headings.length; i++) {
                setTimeout(() => {
                    headings[i].style.boxShadow = '0 0 2px 3px var(--accent-dark)';
                }, i * 1000);

                setTimeout(() => {
                    headings[i].style.boxShadow = '';
                }, i * 1000 + 1000);
            }
        }
    }

    /**
     * Toggles the task creation menu based on the checkmark.
     * This is done via the localStorage variable disable-create-menu.
     */
    dontShow() {
        localStorage.setItem(
            'disable-create-menu',
            this.shadowRoot.getElementById('dont-show').checked
        );
    }

    /**
     * Disables the create a task options if a task was selected.
     */
    chooseTask() {
        // If a task was selected
        if (this.shadowRoot.getElementById('choose-task').value) {
            this.shadowRoot.getElementById('task-name').disabled = true;
            this.shadowRoot.getElementById('pomo-count').disabled = true;
        } else {
            this.shadowRoot.getElementById('task-name').disabled = false;
            this.shadowRoot.getElementById('pomo-count').disabled = false;
        }
    }


    /**
     * Used to increment distraction count.
     */
    distractionCount() {
        this.distractCounter += 1;
        this.shadowRoot.getElementById(
            'distraction-btn'
        ).innerHTML = `Distraction : ${this.distractCounter}`;
    }

    /**
     * Display modal for fail.
     */
    displayFailModal() {
        this.shadowRoot.getElementById('failModal').style.display = 'block';
    }

    /**
     * Start counter for break.
     */
    startBreak() {
        // Making the start break button the only one visible
        this.shadowRoot.getElementById('start-break-btn').disabled = true;
        this.shadowRoot.getElementById('start-break-btn').className = 'disable';

        if (localStorage.getItem('shortBreak') === 'true') {
            start();
        } else {
            start();
        }
    }

    // start() {
    //     // this.shadowRoot.getElementsByTagName('timer-comp')[0].dataset.running = 'true';
    // }


    /**
     * Open the create-task form or start the pomodoro timer
     * depending on whether a task is already selected
     */
    startButtonEvent() {
        // If a task is already selected or the create-menu is disabled
        if (
            this.currentTaskIndex !== -1 ||
            JSON.parse(localStorage.getItem('disable-create-menu'))
        ) {
            this.startTimer();
            document.getElementById('deselect-task').style.display = 'none';
        } else {
            // Open the create-task form
            // hideButtons();
            this.shadowRoot.getElementById('create-task').style.display = '';
            this.shadowRoot
                .getElementById('create-task')
                .scrollIntoView({behavior: 'smooth'});
        }
    }

    /**
     * Used to initialize the task selection dropdown in the create-task form.
     * Fills the dropdown with the different tasks from the tasks page.
     */
    taskSelectInit() {
        const dropdown = this.shadowRoot.getElementById('choose-task');
        if (this.allTasks)
            this.allTasks.forEach((task) => {
                dropdown.innerHTML += `<option value="${task.id}">${task.name}</option>`;
            });
    }

    /**
     * Change the current task, go back to task page.
     */
    changeTask() {
        this.shadowRoot.getElementById('breakCompleteModal').style.display = 'none';
        window.location.href = '../tasks-page/tasks.html';
    }

    /**
     * go back to task page because session is failed.
     */
    failSession() {
        this.shadowRoot.getElementById('failModal').style.display = 'none';
        window.location.href = '../tasks-page/tasks.html';
    }

    /**
     * do not fail current task.
     */
    quitFailModal() {
        // keep session status active if they decide not to fail
        // add confirmation functionality to back button again
        window.history.pushState(null, document.title, window.location.href);
        this.shadowRoot.getElementById('failModal').style.display = 'none';
    }

}


customElements.define('timer-buttons', TimerButtons);

if (typeof exports !== 'undefined') {
    module.exports = {
        TimerButtons
    };
}