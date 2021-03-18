const {
  openInfoModal,
  closeInfoModal,
  scrollFunc,
  resetStats,
  loadHandler,
  unloadHandler,
} = require('../source/stats_page/stats');

const ONE_DAY = 1000 * 60 * 60 * 24;

const todaysDate = new Date();

const dates = [];

for (let i = 0; i < 100; i++) {
  const date = new Date(todaysDate - ONE_DAY * i).toLocaleDateString('en-US');
  dates.push(JSON.stringify(date));
  //console.log(date);
}

// Stat list used to mock previous sessions

const statsListArray = [
  {
    day: dates[1],
    pomoCount: 2,
    distractions: 5,
    completedPomos: 2,
  },
  {
    day: dates[2],
    pomoCount: 2,
    distractions: 5,
    completedPomos: 2,
  },
  {
    day: dates[3],
    pomoCount: 2,
    distractions: 5,
    completedPomos: 2,
  }, // longer than 7 days
  {
    day: dates[10],
    pomoCount: 2,
    distractions: 5,
    completedPomos: 2,
  },
  {
    day: dates[11],
    pomoCount: 2,
    distractions: 5,
    completedPomos: 2,
  },
  {
    day: dates[12],
    pomoCount: 2,
    distractions: 5,
    completedPomos: 2,
  },
  {
    day: dates[13],
    pomoCount: 2,
    distractions: 5,
    completedPomos: 2,
  },
  {
    day: dates[14],
    pomoCount: 2,
    distractions: 5,
    completedPomos: 2,
  },
  {
    day: dates[15],
    pomoCount: 2,
    distractions: 5,
    completedPomos: 2,
  },
  {
    day: dates[16],
    pomoCount: 2,
    distractions: 5,
    completedPomos: 2,
  },
  // more than 31 day
  {
    day: dates[99],
    pomoCount: 2,
    distractions: 50,
    completedPomos: 2,
  },
];

// Variables used in the mock.
const statsList = JSON.stringify(statsListArray);
const currentDate = new Date();
const lastVisit = JSON.stringify(currentDate.toLocaleDateString('en-US'));
const todayPomo = '2';
const distractCount = '2';
const sessionCount = '2';

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

    expect(document.getElementById('todayPomos').innerText).toBe(2);
    expect(document.getElementById('todayAvgDistractions').innerText).toBe(
      '1.0'
    );
    expect(document.getElementById('todaySuccess').innerText).toBe('100.00%');
    expect(document.getElementById('weekPomos').innerText).toBe(8);
    expect(document.getElementById('weekAvgDistractions').innerText).toBe(
      '2.1'
    );
    // expect(document.getElementById('weekSuccess').innerText).toBe('0%');
    expect(document.getElementById('monthPomos').innerText).toBe(22);
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
