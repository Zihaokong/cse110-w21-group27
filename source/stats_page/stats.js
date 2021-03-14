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
const todayCompletedPomos = localStorage.getItem('sessionCounter');
const todayDistractions = localStorage.getItem('distractCounter');

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
  localStorage.setItem('statsList', JSON.stringify(statsList));
};
