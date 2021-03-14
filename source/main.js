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

// set counters for timer page
let sessionCounter = Number(localStorage.getItem('sessionCounter'));
if (sessionCounter == null) {
  sessionCounter = 0;
}
localStorage.setItem('sessionCounter', sessionCounter);

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
// statsList = [{
//     day: '2021-03-12T00:00:00.000Z',
//     pomoCount: 3,
//     distractions: 5,
//     completedPomos: 2,
//   },
//   {
//     day: '2021-03-11T00:00:00.000Z',
//     pomoCount: 4,
//     distractions: 5,
//     completedPomos: 2,
//   },
//   {
//     day: '2021-03-10T00:00:00.000Z',
//     pomoCount: 5,
//     distractions: 5,
//     completedPomos: 2,
//   },
//   {
//     day: '2021-03-09T00:00:00.000Z',
//     pomoCount: 6,
//     distractions: 5,
//     completedPomos: 2,
//   },
//   {
//     day: '2021-03-08T00:00:00.000Z',
//     pomoCount: 7,
//     distractions: 5,
//     completedPomos: 2,
//   },
//   {
//     day: '2021-03-07T00:00:00.000Z',
//     pomoCount: 8,
//     distractions: 5,
//     completedPomos: 2,
//   }, // longer than 7 days
//   {
//     day: '2021-03-06T00:00:00.000Z',
//     pomoCount: 5,
//     distractions: 5,
//     completedPomos: 5,
//   },
//   {
//     day: '2021-03-05T00:00:00.000Z',
//     pomoCount: 5,
//     distractions: 5,
//     completedPomos: 5,
//   },
//   {
//     day: '2021-03-04T00:00:00.000Z',
//     pomoCount: 5,
//     distractions: 5,
//     completedPomos: 5,
//   },
//   {
//     day: '2021-03-03T00:00:00.000Z',
//     pomoCount: 5,
//     distractions: 5,
//     completedPomos: 5,
//   },
//   // more than 31 day
//   {
//     day: '2021-01-07T00:00:00.000Z',
//     pomoCount: 99,
//     distractions: 50,
//     completedPomos: 20,
//   },
// ];
// localStorage.setItem('statsList', JSON.stringify(statsList));

/**
 * Handle if the user logon differnet date
 */
const lastVisit = new Date('3/13/2021');
// const lastVisit = localStorage.getItem('lastVisit');
const today = new Date();
const diffTime = Math.abs(today - lastVisit);
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
console.log(diffDays);
if (diffDays !== 0) {
  const todayPomos = Number(localStorage.getItem('todayPomo'));
  const todayCompletedPomos = localStorage.getItem('sessionCounter');
  const todayDistractions = localStorage.getItem('distractCounter');
  const newStats = {
    day: lastVisit.toString(),
    pomoCount: todayPomos,
    distractions: todayCompletedPomos,
    completedPomos: todayDistractions,
  };
  statsList.unshift(newStats);
  localStorage.setItem('todayPomo', 0);
  localStorage.setItem('distractCounter', 0);
  localStorage.setItem('sessionCounter', 0);
  localStorage.setItem('statsList', JSON.stringify(statsList));
}
