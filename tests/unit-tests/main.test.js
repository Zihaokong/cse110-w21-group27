const {
  handleLoad,
  handleUnload,
  determineSessionDate,
} = require('../../source/main');

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
const distractCount = '6';
const sessionCount = '7';

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
    expect(newDistract).toBe('6');
    expect(newSesion).toBe('7');
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
    expect(newDistract).toBe('6');
    expect(newSesion).toBe('7');
  });
});
