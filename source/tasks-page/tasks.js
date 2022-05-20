/**
 * This file defines functions and implements the behaviors for pop-up modals
 * and other Modals for the tasks page.
 */

// Variables for elements which are found in window load.
let modal;
let btns;
let cancelBtns;
let spanClose;

// Setting up the function to handle loading task items
addEventListener('load', handleLoad, {once: true});

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
 * Called on window load, finds elements in the browser DOM to attach to the 
 * element variables, and attaches event listeners to them which, based on 
 * their usage, will open or close the modal.
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

  addEventListener('beforeunload', handleUnload, {once: true});
}

/**
 * Closing or leaving page will remove the TaskList object,
 * trigger determineSessionDate(), and log the currentDate time
 */
function handleUnload() {
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
