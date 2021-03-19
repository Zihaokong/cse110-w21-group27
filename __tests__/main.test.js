const {
  openModal,
  closeModal,
  eventCloseModal,
  openInfoModal,
  closeInfoModal,
  handleLoad,
  handleUnload,
  scrollFunc,
  determineSessionDate,
} = require('../source/main');

// Stat list used to mock previous sessions
const statsListArray = [
  {
    day: '3/10/2021',
    pomoCount: 6,
    distractions: 5,
    completedPomos: 2,
  },
  {
    day: '3/9/2021',
    pomoCount: 7,
    distractions: 5,
    completedPomos: 2,
  },
  {
    day: '3/8/2021',
    pomoCount: 8,
    distractions: 5,
    completedPomos: 2,
  }, // longer than 7 days
  {
    day: '2/27/2021',
    pomoCount: 5,
    distractions: 5,
    completedPomos: 5,
  },
  {
    day: '2/26/2021',
    pomoCount: 5,
    distractions: 5,
    completedPomos: 5,
  },
  {
    day: '2/25/2021',
    pomoCount: 5,
    distractions: 5,
    completedPomos: 5,
  },
  {
    day: '2/24/2021',
    pomoCount: 5,
    distractions: 5,
    completedPomos: 5,
  },
  {
    day: '2/23/2021',
    pomoCount: 5,
    distractions: 5,
    completedPomos: 5,
  },
  {
    day: '2/22/2021',
    pomoCount: 5,
    distractions: 5,
    completedPomos: 5,
  },
  {
    day: '2/20/2021',
    pomoCount: 5,
    distractions: 5,
    completedPomos: 5,
  },
  // more than 31 day
  {
    day: '1/11/2021',
    pomoCount: 99,
    distractions: 50,
    completedPomos: 20,
  },
];

// Variables used in the mock.
let statsList = JSON.stringify(statsListArray);
const currentDate = new Date('3/11/2021');
let lastVisit = JSON.stringify(currentDate.toLocaleDateString('en-US'));
const todayPomo = '5';
const distractCount = '5';
const sessionCount = '5';

// Mock local storage for main.
Storage.prototype.getItem = jest.fn((item) => {
  switch (item) {
    case 'statsList':
      return statsList;
    case 'lastVisit':
      return lastVisit;
    case 'todayPomo':
      return todayPomo;
    case 'distractCounter':
      return distractCount;
    case 'sessionCounter':
      return sessionCount;
    default:
      return null;
  }
});

describe('"handleLoad" Function Test', () => {
  test('Empty stats list test', () => {
    let newPomo = todayPomo;
    let newDistract = distractCount;
    let newSesion = sessionCount;
    Storage.prototype.setItem = jest.fn((item, value) => {
      switch (item) {
        case 'todayPomo':
          newPomo = value;
          break;
        case 'distractCounter':
          newDistract = value;
          break;
        case 'sessionCounter':
          newSesion = value;
          break;
        default:
          break;
      }
    });
    statsList = null;
    handleLoad();

    // If there was not a previous day's data stored, then determineSessionDate
    // does not run, which would mean the info is not reset.
    expect(newPomo).toBe('5');
    expect(newDistract).toBe('5');
    expect(newSesion).toBe('5');
  });

  test('Non-empty stats list test', () => {
    let newPomo = todayPomo;
    let newDistract = distractCount;
    let newSesion = sessionCount;
    Storage.prototype.setItem = jest.fn((item, value) => {
      switch (item) {
        case 'todayPomo':
          newPomo = value;
          break;
        case 'distractCounter':
          newDistract = value;
          break;
        case 'sessionCounter':
          newSesion = value;
          break;
        default:
          break;
      }
    });
    statsList = JSON.stringify(statsListArray);
    handleLoad();
    // If there was a previous day's data, then determineSessionDate runs, which
    // would reset the info
    expect(newPomo).toBe(0);
    expect(newDistract).toBe(0);
    expect(newSesion).toBe(0);
  });
});

describe('"openModal" Function Test', () => {
  document.body.innerHTML =
    '<div id="add-task-modal" class="modal">' +
    '  <button class="cancel-btn">Cancel</button>' +
    '  <button type="button" class="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>' +
    '</div>' +
    '<button id="add-task-btn" class="add-task-btn">+</button>' +
    '<div id="main-container"></div>' +
    '<div id="play-modal" class="modal"></div>' +
    '<div id="edit-modal" class="modal"></div>' +
    '<div id="delete-modal" class="modal"></div>';

  test('Test to see if the modal display is set to block after function', () => {
    const modal = document.getElementById('add-task-modal');
    modal.style.display = 'none';
    expect(modal.style.display).toBe('none');
    openModal();
    expect(modal.style.display).toBe('block');
  });
});

describe('"closeModal" Function Test', () => {
  test('Test play modal ', () => {
    const playModal = document.getElementById('play-modal');
    playModal.style.display = 'block';
    expect(playModal.style.display).toBe('block');
    closeModal();
    expect(playModal.style.display).toBe('none');
  });

  test('Test edit modal ', () => {
    const editModal = document.getElementById('edit-modal');
    editModal.style.display = 'block';
    expect(editModal.style.display).toBe('block');
    closeModal();
    expect(editModal.style.display).toBe('none');
  });

  test('Test delete modal ', () => {
    const deleteModal = document.getElementById('delete-modal');
    deleteModal.style.display = 'block';
    expect(deleteModal.style.display).toBe('block');
    closeModal();
    expect(deleteModal.style.display).toBe('none');
  });
});

describe('"eventCloseModal" Function Test', () => {
  test('Add Task modal closed by this function', () => {
    const addTaskModal = document.getElementById('add-task-modal');
    addTaskModal.style.display = 'block';

    // Event of clicking the outer modal area
    const clickAddTask = new Event('click');
    Object.defineProperty(clickAddTask, 'target', {
      writable: false,
      value: addTaskModal,
    });

    expect(addTaskModal.style.display).toBe('block');
    eventCloseModal(clickAddTask);
    expect(addTaskModal.style.display).toBe('none');
  });
});

describe('"handleUnload" Function Test', () => {
  test('Test to see if unloading works as intended', () => {
    const date = new Date();
    const stringDate = JSON.stringify(date.toLocaleDateString('en-US'));
    let lv;
    Storage.prototype.setItem = jest.fn((name, item) => {
      lv = item;
    });
    handleUnload();
    expect(lv).toBe(stringDate);
    expect(document.getElementById('main-container')).toBe(null);
  });
});

describe('"determineSessionDate" Function Test', () => {
  test('Test for when last visit is 3/11', () => {
    let newPomo = todayPomo;
    let newDistract = distractCount;
    let newSesion = sessionCount;
    let newStats = null;
    const lastDate = new Date(
      JSON.parse(localStorage.getItem('lastVisit'))
    ).toLocaleDateString('en-US');
    Storage.prototype.setItem = jest.fn((item, value) => {
      switch (item) {
        case 'todayPomo':
          newPomo = value;
          break;
        case 'distractCounter':
          newDistract = value;
          break;
        case 'sessionCounter':
          newSesion = value;
          break;
        case 'statsList':
          newStats = value;
          break;
        default:
          break;
      }
    });
    determineSessionDate();
    expect(newPomo).toBe(0);
    expect(newDistract).toBe(0);
    expect(newSesion).toBe(0);
    expect(JSON.parse(newStats)[0].day).toBe(lastDate);
    expect(JSON.parse(newStats)[0].pomoCount).toBe(parseInt(todayPomo, 10));
    expect(JSON.parse(newStats)[0].distractions).toBe(
      parseInt(distractCount, 10)
    );
    expect(JSON.parse(newStats)[0].completedPomos).toBe(
      parseInt(sessionCount, 10)
    );
  });

  test('Test for when last visit is 3/14', () => {
    const newDate = new Date();
    lastVisit = JSON.stringify(newDate.toLocaleDateString('en-US'));
    let newPomo = todayPomo;
    let newDistract = distractCount;
    let newSesion = sessionCount;
    Storage.prototype.setItem = jest.fn((item, value) => {
      switch (item) {
        case 'todayPomo':
          newPomo = value;
          break;
        case 'distractCounter':
          newDistract = value;
          break;
        case 'sessionCounter':
          newSesion = value;
          break;
        default:
          break;
      }
    });
    determineSessionDate();
    expect(newPomo).toBe('5');
    expect(newDistract).toBe('5');
    expect(newSesion).toBe('5');
  });
});

describe('"openInfoModal" Function Test', () => {
  document.body.innerHTML =
    '<div id="add-task-modal" class="modal">' +
    '  <button class="cancel-btn">Cancel</button>' +
    '  <button type="button" class="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>' +
    '</div>' +
    '<button id="add-task-btn" class="add-task-btn">+</button>' +
    '<div id="main-container"></div>' +
    '<div id="play-modal" class="modal"></div>' +
    '<div id="edit-modal" class="modal"></div>' +
    '<div id="delete-modal" class="modal"></div>' +
    '<div id="info-modal" class="modal"></div>';

  test('Open modal test', () => {
    document.getElementById('info-modal').style.display = 'none';
    openInfoModal();
    expect(document.getElementById('info-modal').style.display).toBe('block');
  });
});

describe('"closeInfoModal" Function Test', () => {
  document.body.innerHTML =
    '<div id="add-task-modal" class="modal">' +
    '  <button class="cancel-btn">Cancel</button>' +
    '  <button type="button" class="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>' +
    '</div>' +
    '<button id="add-task-btn" class="add-task-btn">+</button>' +
    '<div id="main-container"></div>' +
    '<div id="play-modal" class="modal"></div>' +
    '<div id="edit-modal" class="modal"></div>' +
    '<div id="delete-modal" class="modal"></div>' +
    '<div id="info-modal" class="modal"></div>';

  test('Close modal test', () => {
    document.getElementById('info-modal').style.display = 'block';
    closeInfoModal();
    expect(document.getElementById('info-modal').style.display).toBe('none');
  });
});

describe('"scrollFunc" Function Test', () => {
  test('Make sure scrollFunc does not break', () => {
    // Cant really test anything as window.scrollTo changes client info, which
    // we cant really confirm as changed. Just run it to make sure no errors
    // are thrown and that window.scrollTo is called.
    let scrollToHasRan = false;
    window.scrollTo = jest.fn(() => {
      scrollToHasRan = true;
    });
    scrollFunc();
    expect(scrollToHasRan).toBe(true);
  });
});
