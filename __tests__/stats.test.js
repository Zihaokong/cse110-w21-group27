const {
  openInfoModal,
  closeInfoModal,
  scrollFunc,
  resetStats,
  loadHandler,
  unloadHandler,
} = require('../source/stats_page/stats');

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

document.body.innerHTML =
  '<div id="infoModal" class="modal"></div>' +
  '<p id="todayPomos">0</p>' +
  '<p id="todayAvgDistractions">0</p>' +
  '<p id="todaySuccess">0%</p>' +
  '<p id="weekPomos">0</p>' +
  '<p id="weekAvgDistractions">0</p>' +
  '<p id="weekSuccess">0%</p>' +
  '<p id="monthPomos">0</p>' +
  '<p id="monthAvgDistractions">0</p>' +
  '<p id="monthSuccess">0%</p>';

describe('"openInfoModal" Function Test', () => {
  test('Test to see if the modal display is set to block after function', () => {
    const modal = document.getElementById('infoModal');
    modal.style.display = 'none';
    expect(modal.style.display).toBe('none');
    openInfoModal();
    expect(modal.style.display).toBe('block');
  });
});

describe('"closeInfoModal" Function Test', () => {
  test('Test to see if the modal display is set to block after function', () => {
    const modal = document.getElementById('infoModal');
    modal.style.display = 'block';
    expect(modal.style.display).toBe('block');
    closeInfoModal();
    expect(modal.style.display).toBe('none');
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

describe('"resetStats" Function Test', () => {
  test('Test to see if the stats are reset after function', () => {
    let newPomo = todayPomo;
    let newDistract = distractCount;
    let newSesion = sessionCount;
    let newStatsList = JSON.stringify(statsListArray);

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
          newStatsList = value;
          break;
        default:
          break;
      }
    });

    expect(newPomo).toBe(todayPomo);
    expect(newDistract).toBe(distractCount);
    expect(newSesion).toBe(sessionCount);
    expect(newStatsList).toBe(JSON.stringify(statsListArray));

    resetStats();

    expect(newPomo).toBe(0);
    expect(newDistract).toBe(0);
    expect(newSesion).toBe(0);
    expect(newStatsList).toBe('[]');

    expect(document.getElementById('todayAvgDistractions').innerText).toBe(0);
    expect(document.getElementById('todaySuccess').innerText).toBe('0%');
    expect(document.getElementById('weekPomos').innerText).toBe(0);
    expect(document.getElementById('weekAvgDistractions').innerText).toBe(0);
    expect(document.getElementById('weekSuccess').innerText).toBe('0%');
    expect(document.getElementById('monthPomos').innerText).toBe(0);
    expect(document.getElementById('monthAvgDistractions').innerText).toBe(0);
    expect(document.getElementById('monthSuccess').innerText).toBe('0%');
  });
});

describe('"loadHandler" Function Test', () => {
  test('Test to see if today pomo variables are set correctly', () => {
    expect(document.getElementById('todayPomos').innerText).toBe(0);
    expect(document.getElementById('todayAvgDistractions').innerText).toBe(0);
    expect(document.getElementById('todaySuccess').innerText).toBe('0%');
    expect(document.getElementById('weekPomos').innerText).toBe(0);
    expect(document.getElementById('weekAvgDistractions').innerText).toBe(0);
    expect(document.getElementById('weekSuccess').innerText).toBe('0%');
    expect(document.getElementById('monthPomos').innerText).toBe(0);
    expect(document.getElementById('monthAvgDistractions').innerText).toBe(0);
    expect(document.getElementById('monthSuccess').innerText).toBe('0%');

    loadHandler();

    expect(document.getElementById('todayPomos').innerText).toBe(5);
    expect(document.getElementById('todayAvgDistractions').innerText).toBe(
      '1.0'
    );
    expect(document.getElementById('todaySuccess').innerText).toBe('100.00%');
    expect(document.getElementById('weekPomos').innerText).toBe(9);
    expect(document.getElementById('weekAvgDistractions').innerText).toBe(
      '1.7'
    );
    // expect(document.getElementById('weekSuccess').innerText).toBe('0%');
    expect(document.getElementById('monthPomos').innerText).toBe(46);
    // expect(document.getElementById('monthAvgDistractions').innerText).toBe(0);
    // expect(document.getElementById('monthSuccess').innerText).toBe('0%');
  });
});

describe('"unloadHandler" Function Test', () => {
  test('Test to see if unloading works as intended', () => {
    let newStatsList = '[]';
    statsListArray.splice(10, 1); // remove item with day > 30

    Storage.prototype.setItem = jest.fn((item, value) => {
      switch (item) {
        case 'statsList':
          newStatsList = value;
          break;
        default:
          break;
      }
    });

    unloadHandler();

    expect(newStatsList).toBe(JSON.stringify(statsListArray));
  });
});
