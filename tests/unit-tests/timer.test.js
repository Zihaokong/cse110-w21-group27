const {
  setProgress,
  resetProgressRing,
  displayBreakComplete,
  changeTask,
  startBreak,
  startTimer,
  start,
  distractionCount,
  displayFailModal,
  failSession,
  quitFailModal,
} = require('../../source/timer-page/timer');

/**
 * Created a mock local storage object since local storage does not exist in the
 * jest enviornment.
 * Inspired By:
 * https://stackoverflow.com/questions/57092154/how-to-test-img-onload-using-jest
 */
class MockLocalStorage {
  cosntructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

// Set up the mock local storage as the global local storage
global.localStorage = new MockLocalStorage();

document.body.innerHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!--My CSS-->
    <link rel="stylesheet" href="./timer.css" />

    <title id="title_timer">Pomodoro Timer</title>
  </head>

  <body onload="timerPageInit()">
  
    <!--Javascript Not Enabled Contingency-->
    <noscript>
      <section style="width: 100vw; height: 100vh; background-color: black;">
        <h1 style="margin: 0; text-align: center; font-size: 3em; color: red;">
          WARNING! Javascript is disabled on your browser!
        </h1>
        <p style="text-align: center; font-size: 3em; color: red;">
          This website only works with browsers which support Javascript.
        </p>
      </section>
    </noscript>
    
    <!--CSS Not Enabled Contingency-->
    <section class="no-style" style="width: 100%; background-color: black;">
      <h1 style="text-align: center; font-size: 3em; color: red;">
        WARNING! CSS is not working!
      </h1>
    </section>
  
    <header-comp page="timer"></header-comp>

    <!--Task Heading-->
    <div class="container">
      <h1 id="currTask">No Task Selected</h1>
      <button id="deselect-task">cancel</button>
    </div>

    <!--Timer component-->
    <timer-comp data-running="false"></timer-comp>

    <!--Buttons-->
    <section id="button-container" class="container">
      <!-- The page opens with just the start button visible -->
      <button class="startButton" id="start-btn">Start</button>

      <!-- The create task form will become visible if start is pressed
            without a task selected -->
      <form id="create-task" style="display:none;">
        <label for="choose-task" class="label-heading">
          Choose a task to start
        </label>
        <select id="choose-task">
          <option value="">-</option>
          <!-- Tasks will be dynamically loaded here -->
        </select>

        <label for="task-name pomo-count" class="label-heading">
          Or create a new one!
        </label>
        
        <label for="task-name">Task Name</label>
        <input type="text" id="task-name">

        <label for="pomo-count">Pomo Count</label>
        <input type="number" id="pomo-count" min="1" max="10">

        <div>
          <button type="button" id="create-skip">Skip</button>
          <button type="button" id="create-start">Start</button>
        </div>

        <div id="dont-show-container">
          <input type="checkbox" id="dont-show">
          <label for="dont-show">Don't show again</label>
        </div>
      </form>

      <!-- The distraction and fail button will be available if a task
            is in progress -->
      <button class="distraction" id="distraction-btn"  style="display:none;">
        Distraction : 5
      </button>
      <button class="fail" id="fail-btn" style="display:none;">Fail</button>

      <!-- The start break button will become visible after a task is complete -->
      <button id="start-break-btn" style="display:none;">
        Start Break
      </button>
    </section>

    <!-- Nested divs are to prevent touching stuff below -->
    <div id="tutorialModal" class="modal-break">
      <div class="modal-content-short_break">
        <p>Placeholder Tutorial Text</p>
        <img alt="placeholder image">
      </div>
    </div>

    <div id="breakCompleteModal" class="modal-break">
      <div class="modal-content-short_break">
        <div class="modal-text">
          <div id="heading-break-complete">Break Complete</div>
          <hr style="border-width: 3px; color: #c4c4c4" />
          <div id="button-task-container">
            <div class="button-task-position">
              <button class="button-task" id="continue-btn">
                Continue Task
              </button>
              <svg id="auto-continue" height="30" display="none">
                <rect id="auto-continue-progress"></rect>
              </svg>
            </div>
            <div class="button-task-position">
              <button class="button-task" id="change-btn">
                Change Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="failModal" class="modal-break">
        <div class="modal-content-short_break">
            <div class="modal-text">
                <div class="heading-fail">
                    Are you sure you want to fail this pomo session?
                </div>
                <div id="sad-face-container">
                    <img id="sad-face" src="../assets/images/sad-face.png" alt="sad-face">
                </div>
                <div id="fail-button-container">
                    <button class="fail-buttons" id="fail-button">Fail</button>
                    <button class="fail-buttons" id="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
      </div>
    </div>

    <script src="./timer.js"></script>
    <script src="./tutorial.js"></script>
    <script src="../components/header-comp/header-comp.js"></script>
    <script src="../components/timer-comp/timer-comp.js"></script>
  </body>
</html>

`;
const allTasks = [];
const newTask1 = {
  id: '123456',
  completed: false,
  name: 'Task1',
  number: 5,
  current: 0,
  note: 'OK1',
};
const newTask2 = {
  id: '333333',
  completed: false,
  name: 'Task2',
  number: 6,
  current: 1,
  note: 'OK2',
};

const newTask3 = {
  id: '555555',
  completed: false,
  name: 'Task3',
  number: 7,
  current: 6,
  note: 'OK3',
};

allTasks.push(newTask1);
allTasks.push(newTask2);
allTasks.push(newTask3);

describe('Test Timer functions', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('currentTask', '123456');
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
  });

  // Tests to be exported out to timer-component.test.js
  /* test('Set Progress function test', () => {
    setProgress(50);
    expect(
      document.getElementById('progress-ring-circle').style.strokeDashoffset
    ).toBe('-628.3185307179587');
  });

  test('reset Progress Ring function test', () => {
    resetProgressRing();
    expect(
      document.getElementById('progress-ring-circle').style.strokeDashoffset
    ).toBe('0');
  }); */

  test('display break complete function test', () => {
    window.HTMLMediaElement.prototype.play = () => {
      /* do nothing */
    };
    displayBreakComplete();
    expect(document.getElementById('breakCompleteModal').style.display).toBe(
      'block'
    );
  });

  test('change Task function test', () => {
    global.window = Object.create(window);
    const url = 'http://dummy.com';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
    });
    changeTask();
    expect(document.getElementById('breakCompleteModal').style.display).toBe(
      'none'
    );
    expect(window.location.href).toEqual('../index.html');
  });

  test('start short break function test', () => {
    localStorage.clear();
    localStorage.setItem('ShortBreak', 'true');
    startBreak();
    expect(document.getElementById('container-short').style.display).toBe(
      'none'
    );
  });

  test('start long break function test', () => {
    localStorage.clear();
    startBreak();
    expect(document.getElementById('container-long').style.display).toBe(
      'none'
    );
  });

  test('display short break function test', () => {
    startBreak();
  });

  test('startTimer function test', () => {
    startTimer();
    expect(document.getElementById('distraction-btn').disabled).toBe(false);
    expect(document.getElementById('start-btn').style.display).toBe('none');
    expect(document.getElementById('button-container').style.paddingLeft).toBe(
      '150px'
    );
  });

  // Tests that need to be rewritten/maybe exported to timer component tests
  /*
  test('start function test 1', () => {
    start(1, 9);
    expect(document.getElementById('minutes').innerHTML).toBe('01');
    expect(document.getElementById('seconds').innerHTML).toBe('09');
    expect(document.getElementById('title_timer').innerHTML).toBe('1:09');
  });

  test('start function test 2', () => {
    start(15, 30);
    expect(document.getElementById('minutes').innerHTML).toBe('15');
    expect(document.getElementById('seconds').innerHTML).toBe('30');
    expect(document.getElementById('title_timer').innerHTML).toBe('15:30');
  }); */

  test('distraction count', () => {
    distractionCount();
    expect(document.getElementById('distraction-btn').innerHTML).toBe(
      'Distraction : 1'
    );
  });

  test('display fail modal function test', () => {
    displayFailModal();
    expect(document.getElementById('failModal').style.display).toBe('block');
  });

  test('fail session function test', () => {
    global.window = Object.create(window);
    const url = 'http://dummy.com';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
    });
    failSession();
    expect(document.getElementById('failModal').style.display).toBe('none');
    expect(window.location.href).toEqual('../index.html');
  });
  test('quit Fail Modal function test', () => {
    quitFailModal();
    expect(document.getElementById('failModal').style.display).toBe('none');
  });
});
