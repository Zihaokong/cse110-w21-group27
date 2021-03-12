/**
 * This file defines functions and implements the behaviors for pop-up modals
 * and other Modals for the main page.
 */
let statsList;
const retrievedStats = localStorage.getItem('statsList');
if (!retrievedStats || retrievedStats === 'undefined') {
  statsList = [];
} else {
  statsList = JSON.parse(retrievedStats);
  // testList();
  determineSessionDate();
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
// Get the add-task-modal
const modal = document.getElementById('add-task-modal');
// Get the button that opens the modal
const btns = document.getElementsByClassName('add-task-btn');
// Get the cancel button that close the modal
const cancelBtns = document.getElementsByClassName('cancel-btn');
// Get the <span> element that closes the modal
const spanClose = document.getElementsByClassName('close');

// add event listeners for closing Modal
for (let i = 0; i < spanClose.length; ++i) {
  spanClose[i].addEventListener('click', closeModal);
  cancelBtns[i].addEventListener('click', closeModal);
}
// Listener for displaying add task modal
for (let i = 0; i < btns.length; ++i) {
  btns[i].addEventListener('click', () => {
    modal.style.display = 'block';
  });
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
 * Close the modal
 * @param {event} event: Javascript events
 */
window.onclick = function closeModal2(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
    document.getElementById('delete-modal').style.display = 'none';
  }
};

/**
 * Closing or leaving page will remove the TaskList object,
 * trigger determineSessionDate(), and log the currentDate time
 */
window.onbeforeunload = function handleUnload() {
  // call in case the date has changed before the next pomo
  determineSessionDate();
  // create current Date object
  const current = new Date();
  localStorage.setItem(
    'lastVisit',
    JSON.stringify(current.toLocaleDateString('en-US'))
  );
  document.getElementById('main-container').remove();
};

/**
 * Use for testing in development, need to set the date of local machine
 * as the same aslastVisit
 */
function testList() {
  /// / Code for testing ////
  statsList = [
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

  localStorage.setItem('statsList', JSON.stringify(statsList));
  const testDate = new Date('3/11/2021');
  localStorage.setItem(
    'lastVisit',
    JSON.stringify(testDate.toLocaleDateString('en-US'))
  );
  localStorage.setItem('todayPomo', 5);
  localStorage.setItem('distractCounter', 5);
  localStorage.setItem('sessionCounter', 5);
}
