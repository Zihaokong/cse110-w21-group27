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

/**
 *  Function when the 'reset' button is clicked.
 *  It will set statsList to be empty list, and reset all the counters.
 */
function resetStats() {
  // reset stats record
  statsList = [];
  localStorage.setItem('statsList', JSON.stringify(statsList));
  localStorage.setItem('sessionCounter', 0);
  localStorage.setItem('todayPomo', 0);
  localStorage.setItem('distractCounter', 0);
  const cards = document.querySelectorAll('stats-card');
  for (let i = 0; i < cards.length; i++) {
    cards[i].reset();
  }
}

if (typeof exports !== 'undefined') {
  module.exports = {
    resetStats,
  };
}
