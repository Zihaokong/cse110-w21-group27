// method getting data for stats page content
let statsList;
const retrievedObject = localStorage.getItem('statsList');
if (!retrievedObject || retrievedObject === 'undefined') {
  statsList = [];
} else {
  statsList = JSON.parse(retrievedObject);
}

// statsList = [{
//         day: '2021-03-01T00:00:00.000Z',
//         pomoCount: 2,
//         distractions: 5,
//         completedPomos: 5
//     },
//     {
//         day: '2021-03-12T00:00:00.000Z',
//         pomoCount: 3,
//         distractions: 5,
//         completedPomos: 5
//     },
//     {
//         day: '2021-03-10T00:00:00.000Z',
//         pomoCount: 5,
//         distractions: 5,
//         completedPomos: 2
//     },
//     {
//         day: '2021-01-25T00:00:00.000Z',
//         pomoCount: 6,
//         distractions: 5,
//         completedPomos: 3
//     },
//     {
//         day: '2021-02-10T00:00:00.000Z',
//         pomoCount: 4,
//         distractions: 5,
//         completedPomos: 7
//     },
//     {
//         day: '2021-02-15T00:00:00.000Z',
//         pomoCount: 15,
//         distractions: 5,
//         completedPomos: 2
//     }
// ]

// var lastVisit = localStorage.getItem('lastVisit');
const lastVisit = new Date('3/11/2021');
const today = new Date();
const diffTime = Math.abs(today - lastVisit);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

const todayPomos = Number(localStorage.getItem('todayPomo'));
const todayCompletedPomos = localStorage.getItem('sessionCounter');
const todayDistractions = localStorage.getItem('distractCounter');

const weekPomos = 0;
const weekCompletedPomos = 0;
const weekDistractions = 0;

const monthPomos = 0;
const monthCompletedPomos = 0;
const monthDistractions = 0;

// var Person = function(name) {
//     this.name = name;
//     this.canTalk = true;
//   };

// if (diffDays === 1) {
//     const work = {
//         day: lastVisit,
//         pomoCounts: 4,
//         distractions: 5,
//         completedPomos: 7
//     };
//     statsList.unshift(work);
// }

// statsList.forEach(function (item) {
//     let itemDay = item.day;
//     let itemPomo = item.pomoCounts;
//     let itemDistract = item.distractions;
//     let itemCompleted = item.completedPomos;

//     //today section
//     let dayPassed = Math.ceil((Math.abs(itemDay - diffDays) / (1000 * 60 * 60 * 24)));
//     if (diffDays - x === 0) {
//         todayPomos++;
//         if (z === 1) {
//             todayDistractions = todayDistractions + y;
//             todayCompletedPomos++;
//         }
//     }
//     //last 7 days section
//     if (diffDays - x <= 7) {
//         weekPomos++;
//         if (z === 1) {
//             weekDistractions = weekDistractions + y;
//             weekCompletedPomos++;
//         }
//     }

// });

document.getElementById('todayPomos').innerText = todayCompletedPomos;
document.getElementById('todayAvgDistractions').innerText =
  todayCompletedPomos === '0'
    ? '0'
    : (todayDistractions / todayCompletedPomos).toFixed(1);
document.getElementById('todaySuccess').innerText =
  todayCompletedPomos === '0'
    ? '0%'
    : `${((100 * todayCompletedPomos) / todayPomos).toFixed(2)}%`;

document.getElementById('weekPomos').innerText = weekPomos;
document.getElementById('weekAvgDistractions').innerText = (
  weekDistractions / weekCompletedPomos
).toFixed(1);
document.getElementById('weekSuccess').innerText = `${(
  (100 * weekCompletedPomos) /
  weekPomos
).toFixed(2)}%`;

document.getElementById('monthPomos').innerText = monthPomos;
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
