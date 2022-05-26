/**
 * This file implements function that start the timer and allow for transitions between work and break sessions
 * It defines functions to update the progress ring and hold the distraction button count
 * The file also contains functions that deal with edge cases and display pop-ups in between transitions
 */
// number of distraction tracked
let distractCounter = 0;

let isFailed = false;
// distinguish refresh or back button
let currentTaskIndex = -1;
let allTasks;

let circle;
let radius;
let circumference;

// The interval function used for timer logic
let secondsInterval;

// Call the initializer function when the window is loaded.
window.onload = timerPageInit;

/**
 * Initialize the timer page. Render required HTML elements.
 */
function timerPageInit() {
  timerLengthInit();
  circle = document.getElementById('progress-ring-circle');
  const r = circle.getAttribute('r');
  radius = parseInt(r, 10);
  circumference = radius * 2 * Math.PI;

  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = 0;

  // Deselect task button (X) next to the task heading
  document
    .getElementById('deselect-task')
    .addEventListener('click', deselectTask);

  // Add event listeners for buttons on timer page
  // The Start button for starting a pomo session
  document.getElementById('start-btn').addEventListener('click', startButton);

  // The create-task form elements
  document.getElementById('create-skip').addEventListener('click', startTimer);
  document.getElementById('create-start').addEventListener('click', createTask);

  // The don't show again option
  document.getElementById('dont-show').addEventListener('input', dontShow);

  // The selection dropdown of the create-menu
  document.getElementById('choose-task').addEventListener('input', chooseTask);

  // The distraction button and fail button present when a pomo session is in progress
  document
    .getElementById('distraction-btn')
    .addEventListener('click', distractionCount);
  document
    .getElementById('fail-btn')
    .addEventListener('click', displayFailModal);

  // The Start Break button present after a pomo session is completed
  document
    .getElementById('start-break-btn')
    .addEventListener('click', startBreak);

  // Modal buttons
  document
    .getElementById('continue-btn')
    .addEventListener('click', continueTask);
  document.getElementById('change-btn').addEventListener('click', changeTask);
  document.getElementById('fail-button').addEventListener('click', failSession);
  document
    .getElementById('cancel-button')
    .addEventListener('click', quitFailModal);

  // set variable denote current timer mode
  localStorage.setItem('isPomo', 'false');

  // render current task name to timer page
  const id = JSON.parse(localStorage.getItem('currentTask') || 'null');
  allTasks = JSON.parse(localStorage.getItem('allTasks') || '[]');

  // Checks to see i the task id still exists. If it no longer exists, remove
  // the current task and hide the deelct task tick
  let taskStillExists = false;
  if (allTasks && id !== '') {
    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i].id === id) {
        currentTaskIndex = i;
        document.getElementById('currTask').innerHTML = allTasks[i].name;
        document.getElementById('deselect-task').style.display = '';
        taskStillExists = true;
      }
    }
  }
  if (!taskStillExists) {
    document.getElementById('deselect-task').style.display = 'none';
    localStorage.removeItem('currentTask');
  }

  // Now that allTasks is defined we can fill in the create-task dropdown
  taskSelectInit();

  resetProgressRing();
  if (localStorage.getItem('shortBreak') === 'true') {
    displayBreak();
  } else if (localStorage.getItem('longBreak') === 'true') {
    displayBreak();
  } else {
    localStorage.setItem('isPomo', 'false');
    document.getElementById(
      'distraction-btn'
    ).innerHTML = `Distraction : ${distractCounter}`;

    renderTimer(localStorage.getItem('timerMinutes'), 0);
  }
  // render starting value of timer

  /* Show fail on back */
  window.history.pushState(null, document.title, window.location.href);
  window.addEventListener('popstate', () => {
    if (isFailed) {
      displayFailModal();
    } else {
      window.history.back();
    }
  });
  if (!localStorage.getItem('volumePercentage'))
    localStorage.setItem('volumePercentage', 50);
}

/**
 * Initialize the timer's length. Initialize them to default value if not previously set.
 */
function timerLengthInit() {
  localStorage.setItem(
    'timerMinutes',
    localStorage.getItem('timerMinutes') || 25
  );
  localStorage.setItem(
    'shortBreakMinutes',
    localStorage.getItem('shortBreakMinutes') || 5
  );
  localStorage.setItem(
    'longBreakMinutes',
    localStorage.getItem('longBreakMinutes') || 15
  );

  // Default autoContinue
  localStorage.setItem(
    'autoContinue',
    localStorage.getItem('autoContinue') || 'false'
  );
}

/**
 * Used to initialize the task selection dropdown in the create-task form.
 * Fills the dropdown with the different tasks from the tasks page.
 */
function taskSelectInit() {
  const dropdown = document.getElementById('choose-task');
  if (allTasks) {
    allTasks.forEach((task) => {
      dropdown.innerHTML += `<option value="${task.id}">${task.name}</option>`;
    });
  }
}

/**
 * Change the style of current timer circle.
 * @param {number} percent percentage of current progress bar.
 */
function setProgress(percent) {
  circle = document.getElementById('progress-ring-circle');
  const r = circle.getAttribute('r');
  const radiust = parseInt(r, 10);
  const circumferencet = radiust * 2 * Math.PI;

  const offset = (percent / 100) * circumferencet;
  document.getElementById(
    'progress-ring-circle'
  ).style.strokeDashoffset = -offset;
}

/**
 * Reset progress ring percentage to 0
 */
function resetProgressRing() {
  circle.style.strokeDashoffset = 0;
}

/**
 * Hide all the different button elements below the timer
 */
function hideButtons() {
  // TODO FIX THIS LINTING ISSUE!
  // eslint-disable-next-line no-restricted-syntax
  for (const el of document.querySelector('#button-container').children) {
    el.style.display = 'none';
  }
}

/**
 * Display break complete modal, and sound.
 */
function displayBreakComplete() {
  const audio = new Audio('/assets/audio/break-tune.mp3');
  audio.volume = localStorage.getItem('volumePercentage') / 100.0;
  audio.play();
  document.getElementById('breakCompleteModal').style.display = 'block';
}

/**
 * Automatically continue to next phase
 */
function autoContinue() {
  if (localStorage.getItem('shortBreak') === 'true') {
    setTimeout(() => {
      startBreak();
    }, 2000);
  } else if (localStorage.getItem('longBreak') === 'true') {
    setTimeout(() => {
      startBreak();
    }, 2000);
  } else {
    document.getElementById('auto-continue').style.display = 'inline-block';
    document.getElementById('continue-btn').style.display = 'none';
    setTimeout(() => {
      continueTask();
      startTimer();
    }, 5500);
  }
}

/**
 * Continue on current task, start another pomo.
 */
function continueTask() {
  document.getElementById('breakCompleteModal').style.display = 'none';
  document.body.style.backgroundImage =
    'linear-gradient(to right,#E0EAFC,#CFDEF3)';

  // Making the start button the only visible button
  hideButtons();
  document.getElementById('start-btn').style.display = '';

  resetProgressRing();
  document.getElementById(
    'distraction-btn'
  ).innerHTML = `Distraction : ${distractCounter}`;
  renderTimer(localStorage.getItem('timerMinutes'), 0);

  if (currentTaskIndex !== -1) {
    document.getElementById('currTask').innerHTML =
      allTasks[currentTaskIndex].name;
    document.getElementById('deselect-task').style.display = '';
  } else {
    document.getElementById('currTask').innerHTML = 'No Task Selected';
    document.getElementById('deselect-task').style.display = 'none';
  }

  localStorage.setItem(
    'todayPomo',
    Number(localStorage.getItem('todayPomo')) + 1
  );
}

/**
 * Change the current task, go back to task page.
 */
function changeTask() {
  document.getElementById('breakCompleteModal').style.display = 'none';
  window.location.href = '../tasks-page/tasks.html';
}

/**
 * Display break page, play sound and change appearance of website.
 */
function displayBreak() {
  const audio1 = new Audio('/assets/audio/work-tune.mp3');
  audio1.volume = localStorage.getItem('volumePercentage') / 100.0;
  audio1.play();
  setTimeout(() => {
    resetProgressRing();
    if (localStorage.getItem('shortBreak') === 'true') {
      document.body.style.backgroundImage =
        'linear-gradient(to right,#74EBD5,#ACB6E5)';
      document.getElementById('currTask').innerHTML = 'Short Break';
      document.getElementById('deselect-task').style.display = 'none';
      renderTimer(localStorage.getItem('shortBreakMinutes'), 0);
    } else {
      document.body.style.backgroundImage =
        'linear-gradient(to right,#ACB6E5,#74EBD5)';
      document.getElementById('currTask').innerHTML = 'Long Break';
      document.getElementById('deselect-task').style.display = 'none';
      renderTimer(localStorage.getItem('longBreakMinutes'), 0);
    }

    // Making the start break button the only one visible
    hideButtons();
    document.getElementById('start-break-btn').style.display = '';
    document.getElementById('start-break-btn').disabled = false;
    document.getElementById('start-break-btn').className = '';
  }, 2000);
}

/**
 * Start counter for break.
 */
function startBreak() {
  // Making the start break button the only one visible
  document.getElementById('start-break-btn').disabled = true;
  document.getElementById('start-break-btn').className = 'disable';

  if (localStorage.getItem('shortBreak') === 'true') {
    start(localStorage.getItem('shortBreakMinutes'), 0);
  } else {
    start(localStorage.getItem('longBreakMinutes'), 0);
  }
}

/**
 * Deselects the current task
 */
function deselectTask() {
  localStorage.setItem('currentTask', '""');
  currentTaskIndex = -1;
  document.getElementById('deselect-task').style.display = 'none';
  document.getElementById('currTask').textContent = 'No Task Selected';
}

/**
 * Open the create-task form or start the pomodoro timer
 * depending on whether a task is already selected
 */
function startButton() {
  // If a task is already selected or the create-menu is disabled
  if (
    currentTaskIndex !== -1 ||
    JSON.parse(localStorage.getItem('disable-create-menu'))
  ) {
    startTimer();
    document.getElementById('deselect-task').style.display = 'none';
  } else {
    // Open the create-task form
    hideButtons();
    document.getElementById('create-task').style.display = '';
    document
      .getElementById('create-task')
      .scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Toggles the task creation menu based on the checkmark.
 * This is done via the localStorage variable disable-create-menu.
 */
function dontShow() {
  localStorage.setItem(
    'disable-create-menu',
    document.getElementById('dont-show').checked
  );
}

/**
 * Disables the create a task options if a task was selected.
 */
function chooseTask() {
  // If a task was selected
  if (document.getElementById('choose-task').value) {
    document.getElementById('task-name').disabled = true;
    document.getElementById('pomo-count').disabled = true;
  } else {
    document.getElementById('task-name').disabled = false;
    document.getElementById('pomo-count').disabled = false;
  }
}

/**
 * Start the pomodoro timer for current task.
 */
function startTimer() {
  const todayPomos = Number(localStorage.getItem('todayPomo'));
  localStorage.setItem('todayPomo', todayPomos + 1);

  isFailed = true;

  hideButtons();
  document.getElementById('distraction-btn').style.display = '';
  document.getElementById('fail-btn').style.display = '';

  start(localStorage.getItem('timerMinutes'), 0);
}

/**
 * Set a timer that count down for 60 second.
 * @param {integer} mins minute of timer
 * @param {integer} secs second of timer
 */
function start(mins, secs) {
  // Hide nav buttons in header
  document.querySelector('header-comp').page = 'timerRunning';

  const startTime = new Date();
  // display correct distraction counter
  distractCounter = 0;
  document.getElementById(
    'distraction-btn'
  ).innerHTML = `Distraction : ${distractCounter}`;

  const totalSeconds = mins * 60 + secs;
  renderTimer(mins, secs);
  secondsInterval = setInterval(secondsTimer, 500, startTime, totalSeconds);
}

/**
 * The helper function used for setInterval() to achieve the dynamic timer functionality.
 * @param {number} startTime the start time for the timer
 * @param {number} totalSeconds the totally needed seconds for the timer to run
 */
function secondsTimer(startTime, totalSeconds) {
  document.getElementsByTagName('header-comp')[0].isNewCycle = 'false';
  const currTime = new Date();
  const elapsed = Math.floor((currTime - startTime) / 1000);
  const timeLeft = totalSeconds - elapsed;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const finishedPercent = 100 - (timeLeft / totalSeconds) * 100;
  setProgress(finishedPercent);
  renderTimer(minutes, seconds);
  if (seconds === 0 && minutes <= 0) {
    finishedTask();
  }
}

/**
 * Dynamically renders the HTML elements of the running timer.
 * @param  {number} minutes minutes of the timer
 * @param {number} seconds seconds of the timer
 */
function renderTimer(minutes, seconds) {
  if (minutes < 10) {
    document.getElementById('minutes').innerHTML = `0${minutes}`;
  } else {
    document.getElementById('minutes').innerHTML = `${minutes}`;
  }
  if (seconds < 10) {
    document.getElementById('seconds').innerHTML = `0${seconds}`;
    document.getElementById('title_timer').innerHTML = `${minutes}:0${seconds}`;
  } else {
    document.getElementById('seconds').innerHTML = `${seconds}`;
    document.getElementById('title_timer').innerHTML = `${minutes}:${seconds}`;
  }
}

// TODO: Maybe more detailed comments on this.
/**
 * The function to be called when a timer runs out, or in another word when the
 * task is finished. It should set the related HTML elements properly and stop the timer.
 */
function finishedTask() {
  // Set the header componenet's name back to timer to indicate the timer is no
  // longer running
  document.querySelector('header-comp').page = 'timer';
  // console.log('Finished Task');
  clearInterval(secondsInterval);
  let counter = Number(localStorage.getItem('sessionCounter'));
  counter += 1;
  let todayDistract = Number(localStorage.getItem('distractCounter'));
  todayDistract += distractCounter;
  const pomo = localStorage.getItem('isPomo');

  if (pomo === 'true') {
    // we just finished a break session
    localStorage.setItem('isPomo', 'false');
    // clear all circles for work session following longbreak
    if (localStorage.getItem('longBreak') === 'true') {
      document.getElementsByTagName('header-comp')[0].isNewCycle = 'true';
    }

    localStorage.setItem('shortBreak', 'false');
    localStorage.setItem('longBreak', 'false');
    displayBreakComplete();
  } else {
    // we just finished a work session
    localStorage.setItem('isPomo', 'true');
    // hide the fail modal if the timer runs out
    document.getElementById('failModal').style.display = 'none';
    isFailed = false;
    document.getElementsByTagName('header-comp')[0].completedCycles = counter;
    localStorage.setItem('sessionCounter', `${counter}`);
    localStorage.setItem('distractCounter', `${todayDistract}`);
    if (counter % 4 === 0) {
      localStorage.setItem('longBreak', 'true');
      localStorage.setItem('shortBreak', 'false');
    } else {
      localStorage.setItem('shortBreak', 'true');
      localStorage.setItem('longBreak', 'false');
    }
    displayBreak();

    // update progress for current task
    if (currentTaskIndex !== -1) {
      allTasks[currentTaskIndex].current += 1;
    }
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
  }

  if (localStorage.getItem('autoContinue') === 'true') {
    autoContinue();
  }
}

/**
 * Used by the create-task form to create a task
 * Called when the create-task Start button is called
 */
function createTask() {
  const chosenId = document.getElementById('choose-task').value;
  const taskName = document.getElementById('task-name').value;
  const pomoCount = document.getElementById('pomo-count').value;

  if (chosenId) {
    // If a task was selected from the dropdown, set it as the current
    //    task and start the timer
    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i].id === chosenId) {
        currentTaskIndex = i;
        document.getElementById('currTask').innerHTML =
          allTasks[currentTaskIndex].name;
      }
    }
    localStorage.setItem('currentTask', chosenId);

    startTimer();
  } else if (taskName && pomoCount) {
    // Creating the task and adding it to our task list
    const randomId = Math.random().toString(16).slice(2);

    currentTaskIndex = allTasks.length;
    allTasks.push({
      completed: false,
      current: 0,
      id: randomId,
      name: taskName,
      note: '',
      number: pomoCount,
    });
    localStorage.setItem('allTasks', JSON.stringify(allTasks));

    // Making it the current task and starting the timer
    localStorage.setItem('currentTask', randomId);
    document.getElementById('currTask').innerHTML =
      allTasks[currentTaskIndex].name;

    startTimer();
  } else {
    const headings = document.querySelectorAll('.label-heading');
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
 * Used to increment distraction count.
 */
function distractionCount() {
  distractCounter += 1;
  document.getElementById(
    'distraction-btn'
  ).innerHTML = `Distraction : ${distractCounter}`;
}

/**
 * Display modal for fail.
 */
function displayFailModal() {
  document.getElementById('failModal').style.display = 'block';
}

/**
 * go back to task page because session is failed.
 */
function failSession() {
  document.getElementById('failModal').style.display = 'none';
  window.location.href = '../tasks-page/tasks.html';
}

/**
 * do not fail current task.
 */
function quitFailModal() {
  // keep session status active if they decide not to fail
  // add confirmation functionality to back button again
  window.history.pushState(null, document.title, window.location.href);
  document.getElementById('failModal').style.display = 'none';
}

if (typeof exports !== 'undefined') {
  module.exports = {
    setProgress,
    resetProgressRing,
    hideButtons,
    displayBreakComplete,
    continueTask,
    changeTask,
    startBreak,
    deselectTask,
    startButton,
    dontShow,
    chooseTask,
    startTimer,
    start,
    createTask,
    distractionCount,
    displayFailModal,
    failSession,
    quitFailModal,
    displayBreak,
  };
}
