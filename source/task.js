/**
 * This file defines functions and implements the behaviors of todo list.
 */

//HTML List of all tasks on HTML page
const list = document.querySelector(".task-container");
list.addEventListener("click", handleEdit);

//HTML Task form for collecting data
const taskForm = document.getElementById("taskform");
taskForm.addEventListener("submit", addTask);

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
    if (retrievedObject !== undefined || retrievedObject !== []) {
        allTasks = JSON.parse(retrievedObject);
        if (allTasks.length != 0) {
            welcome.remove();
        }

        for (let i = 0; i < allTasks.length; i++) {
            renderTask(allTasks[i]);
        }

    } else {
        allTasks = [];
    }
}

/**
 * Closing page will save current task and update local storage
 */
window.onbeforeunload = function () {
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
}



/**
 * Add a task to the page and to the global list.
 * @param event 
 */
function addTask(event) {
    event.preventDefault();
    //acquire data from HTML form
    const taskInput = document.getElementById("task-name");
    const taskInputNum = document.getElementById("task-num");
    const taskInputNote = document.getElementById("task-note");

    //create struct and append to global list
    const newTask = {
        name: taskInput.value,
        number: taskInputNum.value,
        current: 0,
        note: taskInputNote.value
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
    /*
        To-do: add real time progress bar percentage display
    */
    var uid = Math.random().toString(16).slice(2);
    const position = "beforeend";

    const dragButton = `<span class="p-2 material-icons drag-btn">drag_indicator</span>`;
    const checkmark = `
        <span class="p-2 form-check form-check-inline">
            <input class="form-check-input input-mysize large" type="checkbox" value="false">
            <label for="checkbox"></label>
        </span>`;
    const todoTask = '<p class="p-2 flex-md-fill text-nowrap task-item dragzone ">' + newTask.name + '</p>';
    const progressbar = `
        <div class=" flex-column progress">
            <div class="p-2 flex-column progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="` + newTask.number + `">25%</div>
        </div>
        `;
    const playButton = '<a class="p-2" href="#"><span class="material-icons play-btn" job ="play">play_circle</span></a>';
    const editButton =
        `<div class="p-2 bd-highlight btn-group dropright flex-right">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="material-icons edit-btn">more_horiz</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right " aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" job="edit">Edit</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" job="delete">Delete</a>
            </div>
        </div>`;
    list.insertAdjacentHTML(position, '<li id=' + uid + ' class="taskNode d-flex flex-row bd-highlight" draggable = true>' +
        dragButton + checkmark + todoTask + progressbar + playButton + editButton);

}


/**
 * Click more button, giving user edit and delete options
 * @param {*} event 
 */
function handleEdit(event) {
    //getting which is being clicked
    let element = event.target;
    let eleJob;
    console.log(element);
    //job may be undefined
    if (event.target.attributes.job) {
        eleJob = event.target.attributes.job.value;
    }

    console.log(eleJob);


    if (eleJob == "delete") {
        deleteTask(element);
    } else if (eleJob == "edit") {
        displayAddModal();
    } else if (eleJob == "play") {
        displayPlayModal();
        showModalTask(element);
    }
}

/**
 * Delete task
 * @param {*} element 
 */
function deleteTask(element) {
    element.closest("ul").removeChild(element.closest("li"));
    let name = element.closest("li").children[2].innerHTML;
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].name == name) {
            allTasks.splice(i, 1);

            break;
        }
    }
}

///////// SECTION for Drag and Drop ////////
var dropzone = document.getElementById("main-container");
var nodes = document.getElementsByClassName("taskNode");
var selectedNode;
var selectedNodePos = 0;

dropzone.addEventListener(
    "dragstart",
    function (event) {
        selectedNode = event.target;
    },
    false
);

dropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
    whereAmI(event.clientY);
});

dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropzone.insertBefore(selectedNode, dropzone.children[selectedNodePos]);
});

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