// method getting data for stats page content
let statsList;
const retrievedStats = localStorage.getItem('statsList');
if (!retrievedStats || retrievedStats === 'undefined') {
  statsList = [];
} else {
  statsList = JSON.parse(retrievedStats);
}

const today = new Date();
const todayPomos = Number(localStorage.getItem('todayPomo'));
const todayCompletedPomos = Number(localStorage.getItem('sessionCounter'));
const todayDistractions = Number(localStorage.getItem('distractCounter'));

let weekPomos = 0;
let weekCompletedPomos = 0;
let weekDistractions = 0;

let monthPomos = 0;
let monthCompletedPomos = 0;
let monthDistractions = 0;

for (let i = 0; i < statsList.length; i++) {
  const itemDay = new Date(statsList[i].day);
  const itemPomo = statsList[i].pomoCount;
  const itemDistract = statsList[i].distractions;
  const itemCompleted = statsList[i].completedPomos;

  const dayPassed = Math.floor(
    Math.abs(today - itemDay) / (1000 * 60 * 60 * 24)
  );

  // last 7 days section
  if (dayPassed > 0 && dayPassed <= 7) {
    console.log('YEs');
    weekPomos += itemPomo;
    weekDistractions += itemDistract;
    weekCompletedPomos += itemCompleted;
  }
  // last 30 days section
  if (dayPassed > 0 && dayPassed < 31) {
    console.log('Yes 31');
    monthPomos += itemPomo;
    monthDistractions += itemDistract;
    monthCompletedPomos += itemCompleted;
  }
  // remove item that 30 days old
  if (dayPassed > 30) {
    statsList.splice(i, 1);
  }
}

// Display stats for today
document.getElementById('todayPomos').innerText = todayCompletedPomos;
document.getElementById('todayAvgDistractions').innerText =
  todayCompletedPomos === 0
    ? '0'
    : (todayDistractions / todayCompletedPomos).toFixed(1);
document.getElementById('todaySuccess').innerText =
  todayCompletedPomos === 0
    ? '0%'
    : `${((100 * todayCompletedPomos) / todayPomos).toFixed(2)}%`;

// Display stats for week
document.getElementById('weekPomos').innerText = weekCompletedPomos;
document.getElementById('weekAvgDistractions').innerText =
  weekCompletedPomos === 0
    ? 0
    : (weekDistractions / weekCompletedPomos).toFixed(1);
document.getElementById('weekSuccess').innerText =
  weekCompletedPomos === 0
    ? '0%'
    : `${((100 * weekCompletedPomos) / weekPomos).toFixed(2)}%`;

// Display stats for month
document.getElementById('monthPomos').innerText = monthCompletedPomos;
document.getElementById('monthAvgDistractions').innerText =
  monthCompletedPomos === 0
    ? 0
    : (monthDistractions / monthCompletedPomos).toFixed(1);
document.getElementById('monthSuccess').innerText =
  monthCompletedPomos === 0
    ? '0%'
    : `${((100 * monthCompletedPomos) / monthPomos).toFixed(2)}%`;

// console.log(
//   `todayCompletedPomos ${todayCompletedPomos}, todayPomos ${todayPomos}, todayDistractions ${todayDistractions}`
// );
// console.log(
//   `weekCompletedPomos ${weekCompletedPomos}, weekPomos ${weekPomos}, weekDistractions ${weekDistractions}`
// );
// console.log(
//   `monthCompletedPomos ${monthCompletedPomos}, monthPomos ${monthPomos}, monthDistractions ${monthDistractions}`
// );
// console.log(statsList);

// Reset Statistic
document.getElementById('reset').onclick = () => {
  statsList = [];
  localStorage.setItem('statsList', JSON.stringify(statsList));
  localStorage.setItem('distractCounter', 0);
  localStorage.setItem('sessionCounter', 0);

  document.getElementById('todayPomos').innerText = 0;
  document.getElementById('todayAvgDistractions').innerText = 0;
  document.getElementById('todaySuccess').innerText = '0%';

  document.getElementById('weekPomos').innerText = 0;
  document.getElementById('weekAvgDistractions').innerText = 0;
  document.getElementById('weekSuccess').innerText = '0%';

  document.getElementById('monthPomos').innerText = 0;
  document.getElementById('monthAvgDistractions').innerText = 0;
  document.getElementById('monthSuccess').innerText = '0%';
};

const spanClose = document.getElementsByClassName('close');
// add event listeners
for (let i = 0; i < spanClose.length; ++i) {
  spanClose[i].addEventListener('click', () => {
    document.getElementById('infoModal').style.display = 'none';
  });
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
  localStorage.setItem('statsList', JSON.stringify(statsList));
};
