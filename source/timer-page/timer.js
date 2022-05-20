/**
 * This file implements function that start the timer and allow for transitions between work and break sessions
 * It defines functions to update the progress ring and hold the distraction button count
 * The file also contains functions that deal with edge cases and display pop-ups in between transitions
 */
// number of distraction tracked
let distractCounter = 0;

let isFailed = false;
let isInSession = false;
let isReload = true;
// distinguish refresh or back button
let currenTaskIndex;
let allTasks;

let circle;
let radius;
let circumference;

// The interval function used for timer logic
let secondsInterval;

// Call the initializer function when the window is loaded.
window.onload = timerPageInit;

// TODO: More detailed comments may be required.
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

  //// Add event listeners for buttons on timer page
  // The Start button for starting a pomo session
  document.getElementById('start-btn').addEventListener('click', startButton);

  // The create-task form elements
  document.getElementById('create-skip').addEventListener('click', startTimer);
  document.getElementById('create-start').addEventListener('click', createTask);

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
  const id = JSON.parse(localStorage.getItem('currentTask'));
  allTasks = JSON.parse(localStorage.getItem('allTasks'));
  if (allTasks && id) {
    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i].id === id) {
        currenTaskIndex = i;
        document.getElementById('currTask').innerHTML =
          allTasks[currenTaskIndex].name;
      }
    }
  }

  // Now that allTasks is defined we can fill in the create-task dropdown
  taskSelectInit();

  resetProgressRing();
  if (localStorage.getItem('ShortBreak') === 'true') {
    displayBreak();
  } else if (localStorage.getItem('LongBreak') === 'true') {
    displayBreak();
  } else {
    localStorage.setItem('isPomo', 'false');
    document.getElementById(
      'distraction-btn'
    ).innerHTML = `Distraction : ${distractCounter}`;

    renderTimer(localStorage.getItem('TimerMinutes'), 0);
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
}

/**
 * Initialize the timer's length. Initialize them to default value if not previously set.
 */
function timerLengthInit() {
  localStorage.setItem(
    'TimerMinutes',
    localStorage.getItem('TimerMinutes') || 25
  );
  localStorage.setItem(
    'ShortBreakMinutes',
    localStorage.getItem('ShortBreakMinutes') || 5
  );
  localStorage.setItem(
    'LongBreakMinutes',
    localStorage.getItem('LongBreakMinutes') || 15
  );

  // render the change input's value
  document.getElementById('TimerMinutes').value = localStorage.getItem(
    'TimerMinutes'
  );
  document.getElementById('ShortBreakMinutes').value = localStorage.getItem(
    'ShortBreakMinutes'
  );
  document.getElementById('LongBreakMinutes').value = localStorage.getItem(
    'LongBreakMinutes'
  );
}

/**
 * Used to initialize the task selection dropdown in the create-task form.
 * Fills the dropdown with the different tasks from the tasks page.
 */
function taskSelectInit() {
  const dropdown = document.getElementById('choose-task');
  for(let task of allTasks) {
    dropdown.innerHTML += `<option value="${task.id}">${task.name}</option>`
  }
}

/**
 * Currently, the HTML element's ID should be the same as the name for the local storage.
 * @param {string} lengthType the identifier for which timer's length.
 */
function updateTimerLength(lengthType) {
  localStorage.setItem(lengthType, document.getElementById(lengthType).value);
  if (
    !isInSession &&
    ((lengthType === 'TimerMinutes' &&
      localStorage.getItem('isPomo') === 'false') ||
      (lengthType === 'ShortBreakMinutes' &&
        localStorage.getItem('ShortBreak') === 'true') ||
      (lengthType === 'LongBreakMinutes' &&
        localStorage.getItem('LongBreak') === 'true'))
  )
    renderTimer(localStorage.getItem(lengthType), 0);
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
  for(let el of document.querySelector('#button-container').children) {
    el.style.display = 'none';
  }
}

/**
 * Display break complete modal, and sound.
 */
function displayBreakComplete() {
  const audio = new Audio('/assets/audio/break-tune.mp3');
  audio.play();
  document.getElementById('breakCompleteModal').style.display = 'block';
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
  renderTimer(localStorage.getItem('TimerMinutes'), 0);

  if(currenTaskIndex) {
    document.getElementById('currTask').innerHTML = allTasks[currenTaskIndex].name;
  } else {
    document.getElementById('currTask').innerHTML = 'No Task Selected';
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
  audio1.play();
  setTimeout(() => {
    resetProgressRing();
    if (localStorage.getItem('ShortBreak') === 'true') {
      document.body.style.backgroundImage =
        'linear-gradient(to right,#74EBD5,#ACB6E5)';
      document.getElementById('currTask').innerHTML = 'Short Break';
      renderTimer(localStorage.getItem('ShortBreakMinutes'), 0);
    } else {
      document.body.style.backgroundImage =
        'linear-gradient(to right,#ACB6E5,#74EBD5)';
      document.getElementById('currTask').innerHTML = 'Long Break';
      renderTimer(localStorage.getItem('LongBreakMinutes'), 0);
    }

    // Making the start break button the only one visible
    hideButtons();
    document.getElementById('start-break-btn').style.display = '';
    document.getElementById('start-break-btn').disabled = false;

  }, 2000);
}

/**
 * Start counter for break.
 */
function startBreak() {
  // Making the start break button the only one visible
  document.getElementById('start-break-btn').disabled = true;

  if (localStorage.getItem('ShortBreak') === 'true') {
    start(localStorage.getItem('ShortBreakMinutes'), 0);
  } else {
    start(localStorage.getItem('LongBreakMinutes'), 0);
  }
}

/**
 * Open the create-task form or start the pomodoro timer
 * depending on whether a task is already selected
 */
function startButton() {
  if(currenTaskIndex) {
    startTimer();
  } else {
    // Open the craete-task form
    hideButtons();
    document.getElementById('create-task').style.display = '';
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

  start(localStorage.getItem('TimerMinutes'), 0);
}

/**
 * Set a timer that count down for 60 second.
 * @param {integer} mins minute of timer
 * @param {integer} secs second of timer
 */
function start(mins, secs) {
  isInSession = true;
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
  // console.log('Finished Task');
  clearInterval(secondsInterval);
  let counter = Number(localStorage.getItem('sessionCounter'));
  counter += 1;
  let todayDistract = Number(localStorage.getItem('distractCounter'));
  todayDistract += distractCounter;
  const pomo = localStorage.getItem('isPomo');
  isInSession = false;
  
  if (pomo === 'true') {
    // we just finished a break session
    localStorage.setItem('isPomo', 'false');
    // clear all circles for work session following longbreak
    if (localStorage.getItem('LongBreak') === 'true') {
      document.getElementsByTagName('header-comp')[0].isNewCycle = 'true';
    }

    localStorage.setItem('ShortBreak', 'false');
    localStorage.setItem('LongBreak', 'false');
    displayBreakComplete();
  } else {
    // we just finished a work session
    localStorage.setItem('isPomo', 'true');
    // hide the fail modal if the timer runs out
    document.getElementById('failModal').style.display = 'none';
    isFailed = false;
    if (counter % 4 === 0) {
      document.getElementsByTagName('header-comp')[0].completedCycles = counter;
      localStorage.setItem('sessionCounter', `${counter}`);
      localStorage.setItem('distractCounter', `${todayDistract}`);
      localStorage.setItem('LongBreak', 'true');
      localStorage.setItem('ShortBreak', 'false');
      displayBreak();
    } else {
      document.getElementsByTagName('header-comp')[0].completedCycles = counter;
      localStorage.setItem('sessionCounter', `${counter}`);
      localStorage.setItem('distractCounter', `${todayDistract}`);
      localStorage.setItem('ShortBreak', 'true');
      localStorage.setItem('LongBreak', 'false');
      displayBreak();
    }

    // update progress for current task
    if(currenTaskIndex) {
      allTasks[currenTaskIndex].current += 1;
    }
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
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

  if(chosenId) {
    // If a task was selected from the dropdown, set it as the current
    //    task and start the timer
    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i].id === chosenId) {
        currenTaskIndex = i;
        document.getElementById('currTask').innerHTML =
          allTasks[currenTaskIndex].name;
      }
    }
    localStorage.setItem('currentTask', chosenId);

    startTimer();

  } else if(taskName && pomoCount) {
    // Creating the task and adding it to our task list
    const randomId = Math.random().toString(16).slice(2);

    currenTaskIndex = allTasks.length;
    allTasks.push({
      completed: false,
      current: 0,
      id: randomId,
      name: taskName,
      note: "",
      number: pomoCount
    });
    localStorage.setItem('allTasks', JSON.stringify(allTasks));

    // Making it the current task and starting the timer
    localStorage.setItem('currentTask', randomId);
    document.getElementById('currTask').innerHTML = allTasks[currenTaskIndex].name;

    startTimer();
  } else {
    console.log('error here');
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
  isReload = false;
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
  isReload = true;
  // add confirmation functionality to back button again
  window.history.pushState(null, document.title, window.location.href);
  document.getElementById('failModal').style.display = 'none';
}

// set the session state back to a work session
window.onbeforeunload = function WarnReload() {
  localStorage.setItem('currentTask', '""');
  if (isInSession && isReload) {
    return 'Your timer progress will reset';
  }
};

if (typeof exports !== 'undefined') {
  module.exports = {
    setProgress,
    resetProgressRing,
    hideButtons,
    displayBreakComplete,
    continueTask,
    changeTask,
    startBreak,
    startButton,
    startTimer,
    start,
    createTask,
    distractionCount,
    displayFailModal,
    failSession,
    quitFailModal,
    displayBreak,
    updateTimerLength,
  };
}
