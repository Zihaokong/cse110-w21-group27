/**
 * This file defines functions and implements the behaviors for pop-up modals
 * and other Modals for the main page.
 */

// Array of stat info objects; these objects include the day, pomo count,
// # of distractions, and completed pomos.
let statsList;

// Variables for elements which are found in window load.
let modal;
let btns;
let cancelBtns;
let spanClose;

// Set the onload function to be handleLoad.
window.onload = handleLoad;

/**
 * Function which sets the modal's display to be block
 */
function openModal() {
  modal.style.display = 'block';
}

/**
 * Function which sets the openInfoModal's display to be block
 */
function openInfoModal() {
  document.getElementById('info-modal').style.display = 'block';
}
function closeInfoModal() {
  document.getElementById('info-modal').style.display = 'none';
}

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

/*
 * For scroll to the top, used in Top button
 */
function scrollFunc() {
  window.scrollTo(0, 0);
}

/**
 * Close the Modal with X button or cancel button
 */
function closeModal() {
  modal.style.display = 'none';
  document.getElementById('play-modal').style.display = 'none';
  document.getElementById('edit-modal').style.display = 'none';
  document.getElementById('delete-modal').style.display = 'none';
}

/**
 * Close the modal via event
 * @param {event} event: Javascript events
 */
function eventCloseModal(event) {
  switch (event.target) {
    case modal:
      modal.style.display = 'none';
      break;
    case document.getElementById('delete-modal'):
      document.getElementById('delete-modal').style.display = 'none';
      break;
    case document.getElementById('edit-modal'):
      document.getElementById('edit-modal').style.display = 'none';
      break;
    case document.getElementById('info-modal'):
      document.getElementById('info-modal').style.display = 'none';
      break;
    case document.getElementById('play-modal'):
      document.getElementById('play-modal').style.display = 'none';
      break;
    default:
  }
}

/**
 * Called on window load, sets the stats list from local storage, finds elements
 * in the browser DOM to attach to the element variables, and attaches event
 * listeners to them which, based on their usage, will open or close the modal.
 */
function handleLoad() {
  // Get the add-task-modal
  modal = document.getElementById('add-task-modal');
  // Get the button that opens the modal
  btns = document.getElementsByClassName('add-task-btn');
  // Get the cancel button that close the modal
  cancelBtns = document.getElementsByClassName('cancel-btn');
  // Get the <span> element that closes the modal
  spanClose = document.getElementsByClassName('close');
  const retrievedStats = localStorage.getItem('statsList');
  if (!retrievedStats || retrievedStats === 'undefined') {
    statsList = [];
  } else {
    statsList = JSON.parse(retrievedStats);
    determineSessionDate();
  }

  // add event listeners for closing Modal
  for (let i = 0; i < spanClose.length; ++i) {
    spanClose[i].addEventListener('click', closeModal);
    cancelBtns[i].addEventListener('click', closeModal);
  }
  // Listener for displaying add task modal
  for (let i = 0; i < btns.length; ++i) {
    btns[i].addEventListener('click', openModal);
  }

  // close the modal when clicking outside
  window.onclick = eventCloseModal;

  window.onbeforeunload = handleUnload;
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
  if (document.getElementsByTagName('task-list')[0]) {
    document.getElementsByTagName('task-list')[0].remove();
  }
}

if (typeof exports !== 'undefined') {
  module.exports = {
    openModal,
    determineSessionDate,
    closeModal,
    eventCloseModal,
    openInfoModal,
    closeInfoModal,
    handleLoad,
    handleUnload,
    scrollFunc,
  };
}
