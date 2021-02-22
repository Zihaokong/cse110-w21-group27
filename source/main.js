/**
 * This file defines functions and implements the behaviors for pop-up modals
 * and other Modals for the main page.
 */


/// ////// SECTION for Modals////////
// Get the modal

let modal = document.getElementById("add-task-modal");
let playModal = document.getElementById("play-modal");
let taskContent = document.getElementById("task-name");

// Get the button that opens the modal
let btns = document.getElementsByClassName("add-task-btn");
let cancelBtns = document.getElementsByClassName("cancel-btn");


// Get the <span> element that closes the modal
let spanClose = document.getElementsByClassName("close");

//add event listeners
for (let i = 0; i < spanClose.length; ++i) {
  spanClose[i].addEventListener("click", closeModal);
  cancelBtns[i].addEventListener("click", closeModal);

}

// Listener for add task modal
for (let i = 0; i < btns.length; ++i) {
  btns[i].addEventListener("click", displayAddModal);
}


/**
 * For scroll to the top, used in Top button
 */
function scrollFunc() {
  window.scrollTo(0, 0);
}


/**
 * When the user clicks the button, open the modal 
 */
function displayAddModal() {
  modal.style.display = "block";
}

/**
 * Section for Play Modal
 */
function displayPlayModal() {
  playModal.style.display = 'block';
}


/**
 * For showing the taks name, content on the modal
 * @param {*} element The target element that the user wants to start with
 */
function showModalTask(element) {
  // get the closest li from where we click and get the p tag in its children
  const targetName = element.closest("li").getElementsByTagName('p');
  // make the task name appear in the timer modal
  document.getElementById('timer-name').innerText = targetName[0].innerHTML;
  // Retrieving the note in Storage by getting its id
  const targetID = element.closest("li").getAttribute("id");
  // get the element Index in the object list
  const taskStorageIndex = allTasks.findIndex(elem => elem.id === targetID);
  // make the note from storage appear in the timer modal
  document.getElementById('timer-note').innerText = allTasks[taskStorageIndex].note;
}




// When the user clicks on <span> (x), close the modal
function closeModal() {
  modal.style.display = "none";
  playModal.style.display = "none";
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


