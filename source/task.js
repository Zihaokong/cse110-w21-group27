/**
 * This file defines functions and implements the behaviors of todo list.
 */

// Selectors for Task
const taskInput = document.querySelector(".todo-input");
const taskButton = document.querySelector(".todo-button");
const list = document.querySelector(".task-container");

/// Event Listeners for Task
taskButton.addEventListener("click", addTask);
list.addEventListener("click", deleteCheck);


///////// SECTION for Task function ////////
function addTask (event) {
    event.preventDefault();
    // create id for element
    var uid = Math.random().toString(16).slice(2);

    let taskName = taskInput.value
    const position = "beforeend";
    if (taskName != "'") {
        const dragButton = '<span class="material-icons drag-btn">drag_indicator</span>';
        const checkmark = '<span class="form-check  form-check-inline"><input class="form-check-input input-mysize large" type="checkbox" value="false"><label for="checkbox"></label></span>';
        const todoTask = '<p class="task-item dragzone">' + taskName + '</p>';
        const playButton = '<a href="https://www.google.com/"><span class="material-icons play-btn">play_circle</span></a>'
        const editButton = '<button><span class="material-icons edit-btn">more_horiz</span></button>';
        list.insertAdjacentHTML(position, '<li id=' + uid + ', class="taskNode" draggable = true>' + dragButton + checkmark + todoTask + playButton + editButton);
    }

    //ADD TODO TO LOCALSTORAGE
    //   saveLocalTodos(taskInput.value);

    //clear ToDo input value
    taskInput.value = "";
}

function deleteCheck (event) {
    const item = event.target; //getting which is being clicked

    //Delete Todo
    if (item.classList[0] === "edit-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");

        //TO DELETE ITEM IN LOCALSTORAGE
        //removeLocalTodos(todo);

        todo.addEventListener("transitionend", function (event) {
            event.preventDefault();
            todo.remove();
        });
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
