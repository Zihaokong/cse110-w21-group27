/**
 * This file defines functions and implements the behaviors of Stats page.
 * It will calculate the Statistics for the pomos, completed-pomo,
 * and distraction of the day. The statistics also hold up to the last 30 days.
 * The users can observate the statistics for today, last 7 days, and last 30 days.
 */

/**
 *  variable holds the List of Statistic for the last 30 days.
 */
let statsList;

window.onload = loadHandler;

/**
 * Change the display of the info-modal modal to open
 */
function openInfoModal() {
  document.getElementById('info-modal').style.display = 'block';
}

/**
 * Change the display of the info-modal modal to close
 */
function closeInfoModal() {
  document.getElementById('info-modal').style.display = 'none';
}

/**
 *  Function when the 'reset' button is clicked.
 *  It will set statsList to be empty list, and reset all the counters.
 */
function resetStats() {
  // reset stats record
  statsList = [];
  localStorage.setItem('statsList', JSON.stringify(statsList));
  // reset all the counters for today in localStorage
  localStorage.setItem('todayPomo', 0);
  localStorage.setItem('sessionCounter', 0);
  localStorage.setItem('distractCounter', 0);
  // reset the text in all cards
  document.getElementById('todayPomos').innerText = 0;
  document.getElementById('todayAvgDistractions').innerText = 0;
  document.getElementById('todaySuccess').innerText = '0%';

  document.getElementById('weekPomos').innerText = 0;
  document.getElementById('weekAvgDistractions').innerText = 0;
  document.getElementById('weekSuccess').innerText = '0%';

  document.getElementById('monthPomos').innerText = 0;
  document.getElementById('monthAvgDistractions').innerText = 0;
  document.getElementById('monthSuccess').innerText = '0%';
  // reset counts on header
  document.getElementById('header').completedCycles = 0;
}

/**
 * Function is called on window load. Calculates and displays statistics.
 */
function loadHandler() {
  const retrievedStats = localStorage.getItem('statsList');
  if (!retrievedStats || retrievedStats === 'undefined') {
    statsList = [];
  } else {
    statsList = JSON.parse(retrievedStats);
  }

  // Date object for the date of today
  const today = new Date();

  // today's pomo variables
  const todayPomos = Number(localStorage.getItem('todayPomo'));
  const todayCompletedPomos = Number(localStorage.getItem('sessionCounter'));
  const todayDistractions = Number(localStorage.getItem('distractCounter'));
  // last 7 days' pomo variables
  let weekPomos = Number(localStorage.getItem('todayPomo'));
  let weekCompletedPomos = Number(localStorage.getItem('sessionCounter'));
  let weekDistractions = Number(localStorage.getItem('distractCounter'));
  // last 30 days' pomo variables
  let monthPomos = Number(localStorage.getItem('todayPomo'));
  let monthCompletedPomos = Number(localStorage.getItem('sessionCounter'));
  let monthDistractions = Number(localStorage.getItem('distractCounter'));

  for (let i = 0; i < statsList.length; i++) {
    // properties of the statistic object in the statsList
    const itemDay = new Date(statsList[i].day);
    const itemPomo = statsList[i].pomoCount;
    const itemDistract = statsList[i].distractions;
    const itemCompleted = statsList[i].completedPomos;
    // determine how many day has passed
    const dayPassed = Math.floor(
      Math.abs(today - itemDay) / (1000 * 60 * 60 * 24)
    );

    // last 7 days section if the stats is within 7 days before
    if (dayPassed > 0 && dayPassed <= 7) {
      weekPomos += itemPomo;
      weekDistractions += itemDistract;
      weekCompletedPomos += itemCompleted;
    }
    // last 30 days section if the stats is within 30 days before
    if (dayPassed > 0 && dayPassed < 31) {
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

  // close the modal if click outside
  window.onclick = eventCloseStatsModal;
  window.onbeforeunload = unloadHandler;
}

/**
 * Close stats modal if click outside
 */
function eventCloseStatsModal(event) {
  if (event.target === document.getElementById('info-modal')) {
    document.getElementById('info-modal').style.display = 'none';
  }
}

/**
 * Closing or leaving the page will add the modified statsList into localStorage
 */
function unloadHandler() {
  localStorage.setItem('statsList', JSON.stringify(statsList));
}

if (typeof exports !== 'undefined') {
  module.exports = {
    openInfoModal,
    closeInfoModal,
    resetStats,
    loadHandler,
    unloadHandler,
  };
}
