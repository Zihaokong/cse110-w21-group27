/**
 * Sets up the functions that handle statistic tracking when loading and
 * unloading the page.
 */

// Array of stat info objects; these objects include the day, pomo count,
// # of distractions, and completed pomos.
let statsList;

// Set the onload function to be handleLoad.
addEventListener('onload', handleLoad);

/**
 * To determine the current date when the user accessing to the index.html.
 * Calculate the difference of days since the last visit. If it is not the same
 * work day, create the new object with the current number in counters and add
 * to the list. Reset the counters current work day.
 */
function determineSessionDate() {
  // get the last visit date from local Storage and pass as Date object
  const lastVisit = new Date(JSON.parse(localStorage.getItem('lastVisit')));

  // create current Date object
  const currentDate = new Date();

  // The difference in day
  const diffDays = Math.floor(
    Math.abs(currentDate - lastVisit) / (1000 * 60 * 60 * 24)
  );

  // if the last visit and current are not the same day
  if (diffDays !== 0) {
    const todayPomos = Number(localStorage.getItem('todayPomo'));
    const todayDistractions = Number(localStorage.getItem('distractCounter'));
    const todayCompletedPomos = Number(localStorage.getItem('sessionCounter'));

    // create the new object contains the elements of the current stats
    const newStats = {
      day: lastVisit.toLocaleDateString('en-US'),
      pomoCount: todayPomos,
      distractions: todayDistractions,
      completedPomos: todayCompletedPomos,
    };

    // adding the latest stat to the head of the list
    statsList.unshift(newStats);

    // reseting all the counters for current day
    localStorage.setItem('todayPomo', 0);
    localStorage.setItem('distractCounter', 0);
    localStorage.setItem('sessionCounter', 0);

    // adding the list with new stat to localStorage
    localStorage.setItem('statsList', JSON.stringify(statsList));
  }
}

/**
 * Called on window load, sets the stats list from local storage, finds elements
 * in the browser DOM to attach to the element variables, and attaches event
 * listeners to them which, based on their usage, will open or close the modal.
 */
 function handleLoad() {
  const retrievedStats = localStorage.getItem('statsList');
  if (!retrievedStats || retrievedStats === 'undefined') {
    statsList = [];
  } else {
    statsList = JSON.parse(retrievedStats);
    determineSessionDate();
  }

  addEventListener('onbeforeunload', handleUnload);
}

/**
 * Closing or leaving page will remove the TaskList object,
 * trigger determineSessionDate(), and log the currentDate time
 */
function handleUnload() {
  // call in case the date has changed before the next pomo
  determineSessionDate();

  // create current Date object
  const current = new Date();
  localStorage.setItem(
    'lastVisit',
    JSON.stringify(current.toLocaleDateString('en-US'))
  );
}

window.location.replace(`/timer-page/timer.html`);