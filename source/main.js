/**
 * This file defines functions and implements the behaviors for pop-up modals
 * and other Modals for the main page.
 */



function minus(op1, op2) {
  return op1 - op2;
}

module.exports = {minus};


/// ////// SECTION for Modals////////
// Get the modal
const modal = document.getElementById('add-task-modal');

// Get the button that opens the modal
const btns = document.getElementsByClassName('add-task-btn');

// Get the <span> element that closes the modal
const spanClose = document.getElementsByClassName('close')[0];

// add event listeners
spanClose.addEventListener('click', closeModal);

for (let i = 0; i < btns.length; ++i) {
  btns[i].addEventListener('click', displayModal);
}

/**
 * When the user clicks the button, open the modal
 */
function displayModal() {
  modal.style.display = 'block';
}

/**
 * Close the Modal
 */
function closeModal() {
  modal.style.display = 'none';
}

/**
 * Close the mocal
 * @param {event} event: Javascript event
 */
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};


