/**
 * This file defines functions and implements the behaviors for pop-up modals
 * and other Modals for the main page.
 */

// Get the modal
const modal = document.getElementById('add-task-modal');
const playModal = document.getElementById('play-modal');
// eslint-disable-next-line no-unused-vars
const taskContent = document.getElementById('task-name');

// Get the button that opens the modal
const btns = document.getElementsByClassName('add-task-btn');
const cancelBtns = document.getElementsByClassName('cancel-btn');

// Get the <span> element that closes the modal
const spanClose = document.getElementsByClassName('close');

//set counters for timer page
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

/**
 * Close the Modal with X button or cancel button
 */
function closeModal() {
  modal.style.display = 'none';
  playModal.style.display = 'none';
}

/**
 * Close the modal
 * @param {event} event: Javascript events
 */
function showModalTask(element) {
  // get the closest task-item from where we click and get the p tag in its children
  const targetTask = element.getRootNode().host;
  // make the task name appear in the timer modal
  document.getElementById('timer-name').innerText = targetTask.taskName;
  // get the element Index in the object list
  const taskStorageIndex = allTasks.findIndex(elem => elem.id === targetTask.id);
  // make the note from storage appear in the timer modal
  document.getElementById('timer-note').innerText = allTasks[taskStorageIndex].note;
}


// When the user clicks on <span> (x), close the modal
function closeModal() {
  modal.style.display = "none";
  playModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function closeModal2(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};