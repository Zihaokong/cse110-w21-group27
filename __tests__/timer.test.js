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
} = require('../source/timer_page/timer');

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

    <!-- Bootstrap CSS -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    />

    <!-- Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

    <!-- Simple UI to change timer length-->
    <input type="text" id="TimerMinutes" onchange="updateTimerLength('TimerMinutes')">
    <input type="text" id="ShortBreakMinutes" onchange="updateTimerLength('ShortBreakMinutes')">
    <input type="text" id="LongBreakMinutes" onchange="updateTimerLength('LongBreakMinutes')">
    <!-- End of simple UI to change timer length-->
    
    <!--My CSS-->
    <link rel="stylesheet" href="./timer.css" />
    <link rel="stylesheet" href="./timer-modals.css" />

    <!--Font-->
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap"
      rel="stylesheet"
    />

    <title id="title_timer">Pomodoro Timer</title>
  </head>

  <body onload="timerPageInit()">
    <header-comp id="header"></header-comp>
    <div class="container">

      <!--Task Heading-->
      <h1 class="text-center my-5" id="currTask">Task</h1>

      <div class="container timer">
        <div class="row">
          <div class="col-5">
            <h4 id="minutes"></h4>
          </div>
          <div class="col-2">
            <h4>:</h4>
          </div>
          <div class="col-5">
            <h4 id="seconds"></h4>
          </div>
        </div>

        <svg class="progress-ring" height="27.5rem" width="27.5rem">
          <circle
            class="progress-ring-circle"
            id="progress-ring-circle"
            stroke-width="40"
            fill="transparent"
            r="200"
            cx="13.75rem"
            cy="13.75rem"
            stroke="#2E4756"
          />
        </svg>
      </div>

      <!--Buttons-->
      <div id="button-container">
        <div><button class="startButton" id="start-btn">Start</button></div>
        <button class="distraction" id="distraction-btn" disabled>
          Distraction : 5
        </button>
        <button class="fail" id="fail-btn">Fail</button>
      </div>

      <div id="container-short">
        <div>
          <button class="start-break-btn" id="start-short-btn">
            Start Break
          </button>
        </div>
      </div>

      <div id="container-long">
        <div>
          <button class="start-break-btn" id="start-long-btn">
            Start Break
          </button>
        </div>
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
            </div>
            <div class="button-task-position">
              <button class="button-task" id="change-btn">Change Task</button>
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
                    <img id="sad-face" src="../images/sad-face.png" alt="sad-face">
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
    <script src="../header-comp.js"></script>
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

  test('Set Progress function test', () => {
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
  });

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
  });

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
