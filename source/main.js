/**
 * This file defines functions and implements the behaviors for pop-up modals 
 * and other Modals for the main page.
 */

///////// SECTION for Modals////////
// Get the modal
let modal = document.getElementById("add-task-modal");

// Get the button that opens the modal
let btns = document.getElementsByClassName("add-task-btn");

// Get the <span> element that closes the modal
let spanClose = document.getElementsByClassName("close")[0];

//add event listeners
spanClose.addEventListener("click", closeModal);

for(let i = 0; i < btns.length; ++i){
  btns[i].addEventListener("click", displayModal);
}

// When the user clicks the button, open the modal 
function displayModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeModal(){
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
