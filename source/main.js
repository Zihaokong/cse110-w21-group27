/**
 * This file defines functions and implements the behaviors for pop-up modals
 * and other Modals for the main page.
 */

// Get the modal
const modal = document.getElementById('add-task-modal');
const playModal = document.getElementById('play-modal');
const editModal = document.getElementById('edit-modal');
const deleteModal = document.getElementById('delete-modal');

// Get the button that opens the modal
const btns = document.getElementsByClassName('add-task-btn');
const cancelBtns = document.getElementsByClassName('cancel-btn');

// Get the <span> element that closes the modal
const spanClose = document.getElementsByClassName('close');

// add event listeners
for (let i = 0; i < spanClose.length; ++i) {
  spanClose[i].addEventListener('click', closeModal);
  cancelBtns[i].addEventListener('click', closeModal);
}
// Listener for add task modal
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
  playModal.style.display = 'none';
  editModal.style.display = 'none';
  deleteModal.style.display = 'none';
}

/**
 * Close the modal
 * @param {event} event: Javascript events
 */
window.onclick = function closeModal2(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
    deleteModal.style.display = 'none';
  }
};

let statsList;
const retrievedStats = localStorage.getItem('statsList');
if (!retrievedStats || retrievedStats === 'undefined') {
  statsList = [];
} else {
  statsList = JSON.parse(retrievedStats);
}

/// / Code for testing ////

// statsList = [{
//     day: "3/10/2021",
//     pomoCount: 6,
//     distractions: 5,
//     completedPomos: 2,
//   },
//   {
//     day: "3/9/2021",
//     pomoCount: 7,
//     distractions: 5,
//     completedPomos: 2,
//   },
//   {
//     day: "3/8/2021",
//     pomoCount: 8,
//     distractions: 5,
//     completedPomos: 2,
//   }, // longer than 7 days
//   {
//     day: "2/27/2021",
//     pomoCount: 5,
//     distractions: 5,
//     completedPomos: 5,
//   },
//   {
//     day: "2/26/2021",
//     pomoCount: 5,
//     distractions: 5,
//     completedPomos: 5,
//   },
//   {
//     day: "2/25/2021",
//     pomoCount: 5,
//     distractions: 5,
//     completedPomos: 5,
//   },
//   {
//     day: "2/24/2021",
//     pomoCount: 5,
//     distractions: 5,
//     completedPomos: 5,
//   },
//   {
//     day: "2/23/2021",
//     pomoCount: 5,
//     distractions: 5,
//     completedPomos: 5,
//   },
//   {
//     day: "2/22/2021",
//     pomoCount: 5,
//     distractions: 5,
//     completedPomos: 5,
//   },
//   {
//     day: "2/20/2021",
//     pomoCount: 5,
//     distractions: 5,
//     completedPomos: 5,
//   },
//   // more than 31 day
//   {
//     day: "1/11/2021",
//     pomoCount: 99,
//     distractions: 50,
//     completedPomos: 20,
//   },
// ];
// localStorage.setItem('statsList', JSON.stringify(statsList));
// const testDate = new Date('3/11/2021')
// localStorage.setItem('lastVisit', JSON.stringify(testDate.toLocaleDateString('en-US')));
// localStorage.setItem('todayPomo', 5);
// localStorage.setItem('distractCounter', 5);
// localStorage.setItem('sessionCounter', 5);

/**
 * Handle if the user log-on differnet date
 */
const lastVisit = new Date(JSON.parse(localStorage.getItem('lastVisit')));
const current = new Date();
const diffDays = Math.floor(
  Math.abs(current - lastVisit) / (1000 * 60 * 60 * 24)
);
// not the same day
if (diffDays !== 0) {
  const todayPomos = Number(localStorage.getItem('todayPomo'));
  const todayDistractions = Number(localStorage.getItem('distractCounter'));
  const todayCompletedPomos = Number(localStorage.getItem('sessionCounter'));
  const newStats = {
    day: lastVisit.toLocaleDateString('en-US'),
    pomoCount: todayPomos,
    distractions: todayDistractions,
    completedPomos: todayCompletedPomos,
  };
  statsList.unshift(newStats);
  localStorage.setItem('todayPomo', 0);
  localStorage.setItem('distractCounter', 0);
  localStorage.setItem('sessionCounter', 0);
  localStorage.setItem('statsList', JSON.stringify(statsList));
}

/**
 * Closing page will remove the TaskList object and log the current time
 */
window.onbeforeunload = function removeTaskList() {
  localStorage.setItem(
    'lastVisit',
    JSON.stringify(current.toLocaleDateString('en-US'))
  );
  document.getElementById('main-container').remove();
};
