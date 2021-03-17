// number of distraction tracked
let distractCounter = 0;

let isFailed = false;
let isInSession = false;
let isReload = true; // distinguish refresh or back button
let currentTaskId;
let allTasks;

const circle = document.querySelector('.progress-ring-circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = 0;


// progress bar functions
function setProgress(percent) {
  const offset = (percent / 100) * circumference;
  circle.style.strokeDashoffset = -offset;
}

function resetProgressRing() {
  circle.style.strokeDashoffset = 0;
}

// break functions
function displayBreakComplete() {
  const audio = new Audio('../media/break-tune.mp3');
  audio.play();
  document.getElementById('breakCompleteModal').style.display = 'block';
}

function continueTask() {
  document.getElementById('breakCompleteModal').style.display = 'none';
  document.body.style.backgroundImage =
    'linear-gradient(to right,#E0EAFC,#CFDEF3)';
  document.getElementById('currTask').innerHTML = 'Task';
  document.getElementById('button-container').style.display = 'flex';
  document.getElementById('start-btn').style.display = 'block';
  document.getElementById('button-container').style.paddingLeft = '0px';
  resetProgressRing();
  document.getElementById(
    'distraction-btn'
  ).innerHTML = `Distraction : ${distractCounter}`;
  document.getElementById('title_timer').innerHTML = '01:00 - Time To Work!';
  document.getElementById('minutes').innerHTML = '01';
  document.getElementById('seconds').innerHTML = '00';
  document.getElementById('currTask').innerHTML = allTasks[currentTaskId].name;
  // start(0, 3);
  // window.location.reload();
}

function changeTask() {
  document.getElementById('breakCompleteModal').style.display = 'none';
  window.location.href = '../index.html';
}

function displayShortBreak() {
  const audio1 = new Audio('../media/work-tune.mp3');
  audio1.play();
  setTimeout(() => {
    resetProgressRing();
    document.body.style.backgroundImage =
      'linear-gradient(to right,#74EBD5,#ACB6E5)';
    document.getElementById('minutes').innerHTML = '01';
    document.getElementById('seconds').innerHTML = '00';
    document.getElementById('currTask').innerHTML = 'Short Break';
    document.getElementById('button-container').style.display = 'none';
    document.getElementById('container-short').style.display = 'block';
    // window.location.reload();
  }, 2000);
}

function startShortBreak() {
  document.getElementById('container-short').style.display = 'none';
  start(0, 3);
}

function displayLongBreak() {
  const audio2 = new Audio('../media/work-tune.mp3');
  audio2.play();
  setTimeout(() => {
    resetProgressRing();
    document.body.style.backgroundImage =
      'linear-gradient(to right,#ACB6E5,#74EBD5)';
    document.getElementById('minutes').innerHTML = '01';
    document.getElementById('seconds').innerHTML = '00';
    document.getElementById('currTask').innerHTML = 'Long Break';
    document.getElementById('button-container').style.display = 'none';
    document.getElementById('container-long').style.display = 'block';
    // window.location.reload();
  }, 2000);
}

function startLongBreak() {
  document.getElementById('container-long').style.display = 'none';
  start(0, 5);
}

function startTimer() {
  // enable distraction button during session
  document.getElementById('distraction-btn').disabled = false;
  isFailed = true;
  document.getElementById('start-btn').style.display = 'none';
  document.getElementById('button-container').style.paddingLeft = '150px';
  start(0, 3);
}

// handle timing
window.onload = function template() {
  // add event listeners for buttons on timer page
  document.getElementById('start-btn').addEventListener('click', startTimer);
  document
    .getElementById('distraction-btn')
    .addEventListener('click', distractionCount);
  document
    .getElementById('fail-btn')
    .addEventListener('click', displayFailModal);
  document
    .getElementById('start-short-btn')
    .addEventListener('click', startShortBreak);
  document
    .getElementById('start-long-btn')
    .addEventListener('click', startLongBreak);
  document
    .getElementById('continue-btn')
    .addEventListener('click', continueTask);
  document.getElementById('change-btn').addEventListener('click', changeTask);
  document.getElementById('fail-button').addEventListener('click', failSession);
  document
    .getElementById('cancel-button')
    .addEventListener('click', quitFailModal);
  // set variable denote current timer mode
  // localStorage.setItem('isPomo', 'false');
  // render current task name to timer page
  const id = JSON.parse(localStorage.getItem('currentTask'));
  allTasks = JSON.parse(localStorage.getItem('allTasks'));
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].id === id) {
      currentTaskId = i;
      document.getElementById('currTask').innerHTML =
        allTasks[currentTaskId].name;
    }
  }
  resetProgressRing();
  if (localStorage.getItem('ShortBreak') === 'true') {
    document.body.style.backgroundImage =
      'linear-gradient(to right,#74EBD5,#ACB6E5)';
    document.getElementById('minutes').innerHTML = '01';
    document.getElementById('seconds').innerHTML = '00';
    document.getElementById('currTask').innerHTML = 'Short Break';
    document.getElementById('button-container').style.display = 'none';
    document.getElementById('container-short').style.display = 'block';
  } else if (localStorage.getItem('LongBreak') === 'true') {
    document.body.style.backgroundImage =
      'linear-gradient(to right,#ACB6E5,#74EBD5)';
    document.getElementById('minutes').innerHTML = '01';
    document.getElementById('seconds').innerHTML = '00';
    document.getElementById('currTask').innerHTML = 'Long Break';
    document.getElementById('button-container').style.display = 'none';
    document.getElementById('container-long').style.display = 'block';
  } else {
    localStorage.setItem('isPomo', 'false');
    document.getElementById('minutes').innerHTML = '01';
    document.getElementById('seconds').innerHTML = '00';
    document.getElementById(
      'distraction-btn'
    ).innerHTML = `Distraction : ${distractCounter}`;
    document.getElementById('title_timer').innerHTML = '01:00 - Time To Work!';
    document.getElementById('start-btn').style.display = 'block';
    document.getElementById('button-container').style.paddingLeft = '0px';
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
};

/**
 * Set a timer that count down for 60 second.
 * @param {integer} mins minute of timer
 * @param {integer} secs second of timer
 */

function start(mins, secs) {
  let minutes = mins;
  let seconds = secs;
  isInSession = true;
  const startTime = +new Date();
  // display correct distraction counter
  distractCounter = 0;
  document.getElementById(
    'distraction-btn'
  ).innerHTML = `Distraction : ${distractCounter}`;

  const totalsecs = minutes * 60 + seconds;
  // var progress_ring_interval = setInterval(updateProgressRing, 10);
  if (minutes < 10) {
    document.getElementById('minutes').innerHTML = `0${minutes}`;
  } else {
    document.getElementById('minutes').innerHTML = minutes;
  }
  if (seconds < 10) {
    document.getElementById('seconds').innerHTML = `0${seconds}`;
    document.getElementById('title_timer').innerHTML = `${minutes}:0${seconds}`;
  } else {
    document.getElementById('seconds').innerHTML = seconds;
    document.getElementById('title_timer').innerHTML = `${minutes}:${seconds}`;
  }

  // var minutes_interval = setInterval(minutesTimer, 60000);
  const secondsInterval = setInterval(secondsTimer, 500);

  function secondsTimer() {
    document.getElementById('header').isNewCycle = 'false';
    const currTime = +new Date();
    const elapsed = Math.floor((currTime - startTime) / 1000);
    const timeLeft = totalsecs - elapsed;
    minutes = Math.floor(timeLeft / 60);
    seconds = timeLeft % 60;

    const perc = 100 - (timeLeft / totalsecs) * 100;
    setProgress(perc);
    if (minutes < 10) {
      document.getElementById('minutes').innerHTML = `0${minutes}`;
    } else {
      document.getElementById('minutes').innerHTML = minutes;
    }
    if (seconds < 10) {
      document.getElementById('seconds').innerHTML = `0${seconds}`;
      document.getElementById(
        'title_timer'
      ).innerHTML = `${minutes}:0${seconds}`;
      if (seconds === 0) {
        if (minutes <= 0) {
          // clearInterval(minutes_interval);
          clearInterval(secondsInterval);

          let counter = Number(localStorage.getItem('sessionCounter'));
          counter += 1;
          const pomo = localStorage.getItem('isPomo');
          isInSession = false;

          // disable distraction button
          document.getElementById('distraction-btn').disabled = true;
          if (pomo === 'true') {
            // we just finished a break session
            localStorage.setItem('isPomo', 'false');
            // clear all circles for work session following longbreak
            if (localStorage.getItem('LongBreak') === 'true') {
              document.getElementById('header').isNewCycle = 'true';
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
              document.getElementById('header').completedCycles = counter;
              localStorage.setItem('sessionCounter', counter);
              localStorage.setItem('LongBreak', 'true');
              localStorage.setItem('ShortBreak', 'false');
              displayLongBreak();
            } else {
              document.getElementById('header').completedCycles = counter;
              localStorage.setItem('sessionCounter', counter);
              localStorage.setItem('ShortBreak', 'true');
              localStorage.setItem('LongBreak', 'false');
              displayShortBreak();
            }

            // update progress for current task
            allTasks[currentTaskId].current += 1;
            localStorage.setItem('allTasks', JSON.stringify(allTasks));
          }
        }
      }
    } else {
      document.getElementById('seconds').innerHTML = seconds;
      document.getElementById(
        'title_timer'
      ).innerHTML = `${minutes}:${seconds}`;
    }
  }
}

function distractionCount() {
  distractCounter += 1;
  document.getElementById(
    'distraction-btn'
  ).innerHTML = `Distraction : ${distractCounter}`;
}

function displayFailModal() {
  isReload = false;
  document.getElementById('failModal').style.display = 'block';
}

function failSession() {
  document.getElementById('failModal').style.display = 'none';
  window.location.href = '../index.html';
}

function quitFailModal() {
  // keep session status active if they decide not to fail
  isReload = true;
  // add confirmation functionality to back button again
  window.history.pushState(null, document.title, window.location.href);
  document.getElementById('failModal').style.display = 'none';
}

// set the session state back to a work session
window.onbeforeunload = function WarnReload() {
  if (isInSession && isReload) {
    return 'Your timer progress will reset';
  }
};
