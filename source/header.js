/**
 * This file defines functions and implements the behaviors of todo list.
 */

//////// States ////////
let breakState = false;
let completedCycles = 2;
let cycleCount = 4 - completedCycles;

//////// Section for header nav ////////
const todayDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const date = todayDate.toLocaleDateString('en-us', options);
document.getElementById("date").innerHTML = date;

//////// Section for Cycle count ////////

// create unfilled circle for incomplete cycle
for (var i = 0; i < cycleCount; i++) {
    let newCyble = document.createElement('span');
    newCyble.innerHTML = ' <span class="dot"></span>';
    document.getElementById("cycle-count").prepend(newCyble);
}

// create filled circle for completed cycle
for (var i = 0; i < completedCycles; i++) {
    let newCyble = document.createElement('span');
    newCyble.innerHTML = ' <span class="filled-dot"></span>';
    document.getElementById("cycle-count").prepend(newCyble);
}

const cycleText = document.getElementById("completed-cycle");
cycleText.innerText = "| Completed Cycles: " + completedCycles;
