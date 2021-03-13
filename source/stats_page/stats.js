// method getting data for stats page content
let statsList;
// const retrievedObject = localStorage.getItem('statsList');
// if (!retrievedObject || retrievedObject === 'undefined') {
//     statsList = [];
// } else {
//     statsList = JSON.parse(retrievedObject);
// }

statsList = [
  {
    day: '2021-03-12T00:00:00.000Z',
    pomoCount: 3,
    distractions: 5,
    completedPomos: 2,
  },
  {
    day: '2021-03-11T00:00:00.000Z',
    pomoCount: 4,
    distractions: 5,
    completedPomos: 2,
  },
  {
    day: '2021-03-10T00:00:00.000Z',
    pomoCount: 5,
    distractions: 5,
    completedPomos: 2,
  },
  {
    day: '2021-03-09T00:00:00.000Z',
    pomoCount: 6,
    distractions: 5,
    completedPomos: 2,
  },
  {
    day: '2021-03-08T00:00:00.000Z',
    pomoCount: 7,
    distractions: 5,
    completedPomos: 2,
  },
  {
    day: '2021-03-07T00:00:00.000Z',
    pomoCount: 8,
    distractions: 5,
    completedPomos: 2,
  }, // longer than 7 days
  {
    day: '2021-03-06T00:00:00.000Z',
    pomoCount: 5,
    distractions: 5,
    completedPomos: 5,
  },
  {
    day: '2021-03-05T00:00:00.000Z',
    pomoCount: 5,
    distractions: 5,
    completedPomos: 5,
  },
  {
    day: '2021-03-04T00:00:00.000Z',
    pomoCount: 5,
    distractions: 5,
    completedPomos: 5,
  },
  {
    day: '2021-03-03T00:00:00.000Z',
    pomoCount: 5,
    distractions: 5,
    completedPomos: 5,
  },
  // more than 31 day
  {
    day: '2021-01-07T00:00:00.000Z',
    pomoCount: 99,
    distractions: 50,
    completedPomos: 20,
  },
];

// var lastVisit = localStorage.getItem('lastVisit');
const lastVisit = new Date('3/11/2021');
const today = new Date();
const diffTime = Math.abs(today - lastVisit);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

const todayPomos = Number(localStorage.getItem('todayPomo'));
const todayCompletedPomos = localStorage.getItem('sessionCounter');
const todayDistractions = localStorage.getItem('distractCounter');

let weekPomos = 0;
let weekCompletedPomos = 0;
let weekDistractions = 0;

let monthPomos = 0;
let monthCompletedPomos = 0;
let monthDistractions = 0;

// if (diffDays === 1) {
//     const work = {
//         day: lastVisit,
//         pomoCounts: 4,
//         distractions: 5,
//         completedPomos: 7
//     };
//     statsList.unshift(work);
// }

for (let i = 0; i < statsList.length; i++) {
  const itemDay = new Date(statsList[i].day);
  const itemPomo = statsList[i].pomoCount;
  const itemDistract = statsList[i].distractions;
  const itemCompleted = statsList[i].completedPomos;

  const dayPassed = Math.floor(
    Math.abs(today - itemDay) / (1000 * 60 * 60 * 24)
  );
  console.log(dayPassed);
  // today section
  // if (diffDays - x === 0) {
  //     todayPomos++;
  //     if (z === 1) {
  //         todayDistractions = todayDistractions + y;
  //         todayCompletedPomos++;
  //     }
  // }

  // last 7 days section
  if (dayPassed > 0 && dayPassed <= 7) {
    weekPomos += itemPomo;
    weekDistractions += itemDistract;
    weekCompletedPomos += itemCompleted;
  }
  // last 30 days section
  if (dayPassed > 0 && dayPassed < 31) {
    monthPomos += itemPomo;
    monthCompletedPomos += itemDistract;
    monthDistractions += itemCompleted;
  }
  // remove item that 30 days old
  if (dayPassed > 30) {
    statsList.splice(i, 1);
  }
}

document.getElementById('todayPomos').innerText = todayCompletedPomos;
document.getElementById('todayAvgDistractions').innerText =
  todayCompletedPomos === '0'
    ? '0'
    : (todayDistractions / todayCompletedPomos).toFixed(1);
document.getElementById('todaySuccess').innerText =
  todayCompletedPomos === '0'
    ? '0%'
    : `${((100 * todayCompletedPomos) / todayPomos).toFixed(2)}%`;

document.getElementById('weekPomos').innerText = weekCompletedPomos;
document.getElementById('weekAvgDistractions').innerText = (
  weekDistractions / weekCompletedPomos
).toFixed(1);
document.getElementById('weekSuccess').innerText = `${(
  (100 * weekCompletedPomos) /
  weekPomos
).toFixed(2)}%`;

document.getElementById('monthPomos').innerText = monthCompletedPomos;
document.getElementById('monthAvgDistractions').innerText = (
  monthDistractions / monthCompletedPomos
).toFixed(1);
document.getElementById('monthSuccess').innerText = `${(
  (100 * monthCompletedPomos) /
  monthPomos
).toFixed(2)}%`;

document.getElementById('reset').onclick = () => {
  statsList = [];
  localStorage.setItem('statsList', JSON.stringify(statsList));
  localStorage.setItem('distractCounter', 0);
  localStorage.setItem('sessionCounter', 0);

  document.getElementById('todayPomos').innerText = 0;
  document.getElementById('todayAvgDistractions').innerText = '0';
  document.getElementById('todaySuccess').innerText = '0%';

  document.getElementById('weekPomos').innerText = 0;
  document.getElementById('weekAvgDistractions').innerText = 0;
  document.getElementById('weekSuccess').innerText = '0%';

  document.getElementById('monthPomos').innerText = 0;
  document.getElementById('monthAvgDistractions').innerText = 0;
  document.getElementById('monthSuccess').innerText = '0%';
};

function closeInfoModal() {
  document.getElementById('infoModal').style.display = 'none';
}

function openInfoModal() {
  document.getElementById('infoModal').style.display = 'block';
}

/*
 * For scroll to the top, used in Top button
 */
function scrollFunc() {
  window.scrollTo(0, 0);
}

window.onbeforeunload = () => {
  localStorage.setItem('lastVisit', JSON.stringify(today));
};
