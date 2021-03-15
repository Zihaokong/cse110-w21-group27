const {
  openModal,
  determineSessionDate,
  scrollFunc,
  closeModal,
  eventCloseModal,
  handleLoad,
  handleUnload,
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
const statsList = JSON.stringify(statsListArray);
const currentDate = new Date('3/11/2021');
const lastVisit = JSON.stringify(currentDate.toLocaleDateString('en-US'));
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
