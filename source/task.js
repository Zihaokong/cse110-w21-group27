/**
 * This file defines functions and implements the behaviors of todo list.
 */

//HTML List of all tasks on HTML page
const list = document.querySelector(".task-container");
list.addEventListener("click", handleEdit);

//HTML Task form for collecting data
const taskForm = document.getElementById("taskform").addEventListener("submit", addTask);

//HTML welcome message
const welcome = document.getElementById("welcome-message");

//Storing all tasks on current page.
var allTasks;


/** 
 * When loading page, retrive previously stored task from 
 * local storage, and render it, delete welcome message
 */
window.onload = function () {
    var retrievedObject = localStorage.getItem("allTasks");
    if (!retrievedObject || retrievedObject === "undefined") {
        allTasks = [];
    } else {
        allTasks = JSON.parse(retrievedObject);
        if (allTasks.length != 0) {
            welcome.remove();
        }

        for (let i = 0; i < allTasks.length; i++) {
            renderTask(allTasks[i]);
        }
    }
}

/**
 * Closing page will save current task and update local storage
 */
window.onbeforeunload = function () {
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
}


///////// SECTION FOR TASKLIST {CREATE, RENDER, DELETE} /////////
/**
 * Add a task to the page and to the global list.
 * @param event 
 */
function addTask(event) {
    event.preventDefault();

    //create struct and append to global list
    const newTask = {
        id: Math.random().toString(16).slice(2),
        completed: false,
        name: document.getElementById("task-name").value,
        number: document.getElementById("task-num").value,
        current: 0,
        note: document.getElementById("task-note").value
    }
    allTasks.push(newTask);

    //render HTML on page.
    renderTask(newTask);

    //everything else.
    taskForm.reset();
    welcome.remove();
    closeModal();
}

/**
 * render a task struct on page, display name and current progress
 * @param {*} newTask: the task struct to render 
 */
function renderTask(newTask) {
    list.appendChild(new TaskItem(newTask))
    renderCheckmark(newTask);
}

/**
 * render the checkbox status according to localStorage
 * @param {*} newTask the new object created from addTask()
 */
function renderCheckmark(newTask) {
    //setting checkmark
    document.getElementById(newTask.id).checkmark.checked = newTask.completed;
}

/**
 * Retrieving the note in Storage by getting its id
 * and update the checkmark status on the array 
 * @param {*} event 
 */
function handleCheck(element) {
    let targetID = element.parentNode.parentNode.host.id;
    // get the element Index in the object list
    const taskIdx = allTasks.findIndex(elem => elem.id === targetID);
    allTasks[taskIdx].completed = !allTasks[taskIdx].completed;
    // allTasks[taskIdx].completed = true;
}

/**
 * Click more button, giving user edit and delete options
 * @param {*} event 
 */
function handleEdit(event) {
    //getting which is being clicked
    let element = event.target;
    let eleJob;
    // console.log(element);
    //job may be undefined
    if (event.target.attributes.job) {
        eleJob = event.target.attributes.job.value;
    }

    // console.log(eleJob);
    if (eleJob == "delete") {
        deleteTask(element);
    } else if (eleJob == "edit") {
        displayAddModal();
    } else if (eleJob == "play") {
        displayPlayModal();
        showModalTask(element);
    } else if (eleJob == "check") {
        handleCheck(element);
    }
}

/**
 * Delete task
 * @param {*} element 
 */
function deleteTask(element) {
    // Delete item in the DOM
    element.closest("task-item").remove();
    // Delete item in allTasks array
    let name = element.closest("task-item").taskName;
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].name == name) {
            allTasks.splice(i, 1);
            break;
        }
    }
}

///////// SECTION for Drag and Drop ////////

// getter for the list
var dropzone = document.getElementById("main-container");
//getter for the list items
var nodes = document.getElementsByClassName("taskNode");
// variable for the selected node to be dragged or moved
var selectedNode;
// variable for the position of selected node
var selectedNodePos = 0;

// Listener for the dragstart event
dropzone.addEventListener(
    "dragstart",
    function (event) {
        selectedNode = event.target;
    },
    false
);

// Listener for the dragover event
dropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
    whereAmI(event.clientY);
});

// Listener for the drop event
dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropzone.insertBefore(selectedNode, dropzone.children[selectedNodePos]);
});

/**
 * For measuring the selected node position from the list.
 */
function establishNodePositions() {
    for (var i = 0; i < nodes.length; i++) {
        var element = document.getElementById(nodes[i]["id"]);
        var position = element.getBoundingClientRect(); //info of the element position on the frame
        var yTop = position.top;
        var yBottom = position.bottom;
        //yCenter
        nodes[i]["yPos"] = yTop + (yBottom - yTop) / 2;
    }
}

/**
 * For deciding which position the selected element goes to as measuring which 
 * is the closest parent and closet children
 * this function will call establishNodePositions() for selected node position. 
 * @param {*} currentYPos 
 */
function whereAmI(currentYPos) {
    establishNodePositions();
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i]["yPos"] < currentYPos) {
            var nodeAbove = document.getElementById(nodes[i]["id"]);
            selectedNodePos = i + 1;
        }
    }
    // for the top of the list
    if (typeof nodeAbove === "undefined") {
        selectedNodePos = 0;
    }
}