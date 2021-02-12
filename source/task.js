/**
 * This file defines functions and implements the behaviors of todo list.
 */

// Selectors for Task
const taskInput = document.getElementById("task-name");
//const taskButton = document.querySelector(".todo-button");
const list = document.querySelector(".task-container");
const taskForm = document.getElementById("taskform");
const welcome = document.getElementById("welcome-message");

/// Event Listeners for Task
taskForm.addEventListener("submit", addTask);
list.addEventListener("click", handleEdit);



///////// SECTION for Task function ////////
function addTask (event) {
    event.preventDefault();
    // create id for element
    var uid = Math.random().toString(16).slice(2);

    let taskName = taskInput.value
    const position = "beforeend";
    if (taskName != "") {
        // <span class="material-icons edit-btn p-2 bd-highlight">more_horiz</span>

        const dragButton = `<span class="p-2 material-icons drag-btn">drag_indicator</span>`;
        const checkmark = `
            <span class="p-2 form-check form-check-inline">
                <input class="form-check-input input-mysize large" type="checkbox" value="false">
                <label for="checkbox"></label>
            </span>`;
        const todoTask = '<p class="p-2 flex-md-fill text-nowrap task-item dragzone ">' + taskName + '</p>';
        const progressbar = `
            <div class=" flex-column progress">
                <div class="p-2 flex-column progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
            </div>
            `;
        const playButton = '<a class="p-2" href="https://www.google.com/"><span class="material-icons play-btn">play_circle</span></a>';
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

        if(welcome){
            welcome.remove();
        }
        list.insertAdjacentHTML(position, '<li id=' + uid + ', class="taskNode d-flex flex-row bd-highlight" draggable = true>'
            + dragButton + checkmark + todoTask + progressbar + playButton + editButton);
        taskForm.reset();
        closeModal();
    }
    //handle delete



    //ADD TODO TO LOCALSTORAGE
    //   saveLocalTodos(taskInput.value);

    //clear ToDo input value
    taskInput.value = "";
}

function handleEdit (event) {
    let element = event.target; //getting which is being clicked
    let eleJob;

    //job may be undefined
    if(event.target.attributes.job){
        eleJob = event.target.attributes.job.value;
    }
    if(eleJob == "delete"){
        deleteTask(element);
    }
  

    // //Delete Todo
    // if (item.classList[0] === "edit-btn") {
    //     const todo = item.parentElement;
    //     //Animation
    //     todo.classList.add("fall");

    //     //TO DELETE ITEM IN LOCALSTORAGE
    //     //removeLocalTodos(todo);

    //     todo.addEventListener("transitionend", function (event) {
    //         event.preventDefault();
    //         todo.remove();
    //     });
    //}
}

function deleteTask(element){
    element.closest("ul").removeChild(element.closest("li"));
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

function establishNodePositions () {
    for (var i = 0; i < nodes.length; i++) {
        var element = document.getElementById(nodes[i]["id"]);
        var position = element.getBoundingClientRect(); //info of the element position on the frame
        var yTop = position.top;
        var yBottom = position.bottom;
        //yCenter
        nodes[i]["yPos"] = yTop + (yBottom - yTop) / 2;
    }
}

function whereAmI (currentYPos) {
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
