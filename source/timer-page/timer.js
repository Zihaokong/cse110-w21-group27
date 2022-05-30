/**
 * This file implements function that start the timer and allow for transitions between work and break sessions
 * It defines functions to update the progress ring and hold the distraction button count
 * The file also contains functions that deal with edge cases and display pop-ups in between transitions
 */

// distinguish refresh or back button
let failOnExit = false;

let currentTaskIndex = -1;
let allTasks;

// Call the initializer function when the window is loaded.
window.onload = timerOnLoad;

/**
 * Initialize the timer page. Render required HTML elements.
 */
function timerOnLoad() {
  // Set up the time values (default to 25, 5, 15)
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

  // Default autoContinue to false
  localStorage.setItem(
    'autoContinue',
    localStorage.getItem('autoContinue') || 'false'
  );

  // Set up the timer button functions
  document
    .querySelector('timer-buttons')
    .setFunctions(
      changeTask,
      chooseTask,
      continueTask,
      createTask,
      failSession,
      getTask,
      getTasks,
      startBreak,
      startTimer
    );

  // Set up the event handler to deeselect task button (X) next to the task
  // heading when it is pressed.
  document
    .getElementById('deselect-task')
    .addEventListener('click', deselectTask);

  // Set up the time observer
  const timerComp = document.getElementsByTagName('timer-comp')[0];
  const observeConfig = { attributes: true, childList: false, subtree: false };
  const timerObserver = new MutationObserver(timerCompCallback);
  timerObserver.observe(timerComp, observeConfig);

  // set variable denote current timer mode
  localStorage.setItem('isPomo', 'false');

  // render current task name to timer page
  const id = localStorage.getItem('currentTask') || null;
  allTasks = JSON.parse(localStorage.getItem('allTasks') || '[]');

  // Checks to see i the task id still exists. If it no longer exists, remove
  // the current task and hide the deelct task tick
  let taskStillExists = false;
  if (allTasks && id) {
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

  localStorage.setItem('isPomo', 'false');

  timerComp.dataset.minutesLeft = localStorage.getItem('timerMinutes');
  timerComp.dataset.secondsLeft = 0;

  setTimer(localStorage.getItem('timerMinutes'), 0);

  // render starting value of timer

  /* Show fail on back */
  window.history.pushState(null, document.title, window.location.href);
  window.addEventListener('popstate', () => {
    if (failOnExit) {
      document.querySelector('timer-buttons').openFailDialog();
    } else {
      window.history.back();
    }
  });
  if (!localStorage.getItem('volumePercentage'))
    localStorage.setItem('volumePercentage', 50);
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

function getTask() {
  if (currentTaskIndex === -1) {
    return null;
  }
  return allTasks[currentTaskIndex];
}

function getTasks() {
  return allTasks;
}

/**
 * Automatically continue to next phase
 */
function autoContinue() {
  if (
    localStorage.getItem('shortBreak') === 'true' ||
    localStorage.getItem('longBreak') === 'true'
  ) {
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
  document.body.style.background =
    'linear-gradient(var(--gradient-light),var(--gradient-medium))';

  setTimer(localStorage.getItem('timerMinutes'), 0);

  if (currentTaskIndex !== -1) {
    document.getElementById('currTask').innerHTML =
      allTasks[currentTaskIndex].name;
    document.getElementById('deselect-task').style.display = '';
  } else {
    document.getElementById('currTask').innerHTML = 'No Task Selected';
    document.getElementById('deselect-task').style.display = 'none';
  }
}

/**
 * Change the current task, go back to task page.
 */
function changeTask() {
  window.location.href = '../tasks-page/tasks.html';
}

/**
 * Start counter for break.
 */
function startBreak() {
  document.getElementsByTagName('timer-comp')[0].dataset.running = 'true';
}

/**
 * Deselects the current task
 */
function deselectTask() {
  localStorage.removeItem('currentTask');
  currentTaskIndex = -1;
  document.getElementById('deselect-task').style.display = 'none';
  document.getElementById('currTask').textContent = 'No Task Selected';
}

/**
 * Start the pomodoro timer for current task.
 */
function startTimer() {
  localStorage.setItem(
    'todayPomo',
    Number(localStorage.getItem('todayPomo')) + 1
  );
  localStorage.setItem('distractCounter', 0);
  document.getElementById('deselect-task').style.display = 'none';
  failOnExit = true;
  document.getElementsByTagName('timer-comp')[0].dataset.running = 'true';
}

function setTimer(minutes, seconds) {
  const timerComp = document.getElementsByTagName('timer-comp')[0];
  timerComp.dataset.minutesLeft = minutes;
  timerComp.dataset.secondsLeft = seconds;
}

function timerCompCallback(mutations) {
  for (let i = 0; i < mutations.length; i++) {
    if (mutations[i].attributeName === 'data-running') {
      if (mutations[i].target.dataset.running === 'false') {
        finishedTask();
      }
    } else {
      renderTitle();
    }
  }
}

/**
 * Renders the timer in the title based on attributes of timer component
 */
function renderTitle() {
  const timer = document.getElementsByTagName('timer-comp')[0];
  const minutes = timer.dataset.minutesLeft;
  const seconds = timer.dataset.secondsLeft;

  if (seconds < 10) {
    document.getElementById('title_timer').innerHTML = `${minutes}:0${seconds}`;
  } else {
    document.getElementById('title_timer').innerHTML = `${minutes}:${seconds}`;
  }
}

/**
 * The function to be called when a timer runs out, or in another word when the
 * task is finished. It should set the related HTML elements properly and stop the timer.
 */
function finishedTask() {
  // Set the header componenet's name back to timer to indicate the timer is no
  // longer running
  document.querySelector('header-comp').page = 'timer';

  let counter = Number(localStorage.getItem('sessionCounter'));
  counter += 1;

  const pomo = localStorage.getItem('isPomo');

  document.getElementsByTagName('header-comp')[0].isNewCycle = 'false';

  if (pomo === 'true') {
    // we just finished a break session
    localStorage.setItem('isPomo', 'false');

    // clear all circles for work session following longbreak
    if (localStorage.getItem('longBreak') === 'true') {
      document.getElementsByTagName('header-comp')[0].isNewCycle = 'true';
    }

    // Set breaks to false
    localStorage.setItem('shortBreak', 'false');
    localStorage.setItem('longBreak', 'false');

    // Play audio
    const audio = new Audio('/assets/audio/break-tune.mp3');
    audio.volume = localStorage.getItem('volumePercentage') / 100.0;
    audio.play();

    // Show break complete.
    document.querySelector('timer-buttons').displayBreakComplete();
  } else {
    // we just finished a work session
    localStorage.setItem('isPomo', 'true');

    // hide the fail modal if the timer runs out
    document.querySelector('timer-buttons').hideFailDialog();

    // Will not fail if backing out.
    failOnExit = false;

    // Increment the pomo session count on the header
    document.getElementsByTagName('header-comp')[0].completedCycles = counter;

    // Increment the session count in local storage
    localStorage.setItem('sessionCounter', `${counter}`);

    // If the count is at an increment of 4, set the break to be long, else,
    // make it short.
    if (counter % 4 === 0) {
      localStorage.setItem('longBreak', 'true');
      localStorage.setItem('shortBreak', 'false');
    } else {
      localStorage.setItem('shortBreak', 'true');
      localStorage.setItem('longBreak', 'false');
    }

    const workEndAudio = new Audio('/assets/audio/work-tune.mp3');
    workEndAudio.volume = localStorage.getItem('volumePercentage') / 100.0;
    workEndAudio.play();
    setTimeout(() => {
      document.getElementById('deselect-task').style.display = 'none';

      if (localStorage.getItem('shortBreak') === 'true') {
        document.body.style.background =
          'linear-gradient(var(--spice-color),var(--gradient-medium))';

        document.getElementById('currTask').innerHTML = 'Short Break';

        setTimer(localStorage.getItem('shortBreakMinutes'), 0);
      } else {
        document.body.style.background =
          'linear-gradient(var(--gradient-medium),var(--spice-color))';

        document.getElementById('currTask').innerHTML = 'Long Break';

        setTimer(localStorage.getItem('longBreakMinutes'), 0);
      }

      document.querySelector('timer-buttons').setupBreak();
    }, 2000);

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
function createTask(chosenId, taskName, pomoCount) {
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
 * go back to task page because session is failed.
 */
function failSession() {
  window.location.href = '../tasks-page/tasks.html';
}

if (typeof exports !== 'undefined') {
  module.exports = {
    continueTask,
    changeTask,
    startBreak,
    deselectTask,
    startTimer,
    createTask,
    failSession,
  };
}
