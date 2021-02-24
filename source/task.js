/**
 * This file defines functions and implements the behaviors of todo list.
 */

/**
 * Class constructor for <task-list>
 */

 var allTasks;

 //Storing all tasks on current page.
class TaskList extends HTMLElement {
    
    constructor() {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        this.list = document.createElement('ul');
        shadow.append(this.list);
    }

    renderTask(newTask) {
        console.log("HEREDOE")
        console.log(this.list);

        console.log(this.shadowRoot.children[0]);
        this.shadowRoot.children[0].appendChild(new TaskItem(newTask));
    }

    addTask(event){
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

        console.log(this);
        //render HTML on page.
        this.renderTask(newTask);
        console.log(this);

        //everything else.
        taskForm.reset();
        welcome.remove();
        closeModal();
    }
    


}
customElements.define('task-list', TaskList);

//HTML Task form for collecting data
const taskForm = document.getElementById("taskform");


//HTML welcome message
const welcome = document.getElementById("welcome-message");




/** 
 * When loading page, retrive previously stored task from 
 * local storage, and render it, delete welcome message
 */
window.onload = function () {
    var retrievedObject = localStorage.getItem("allTasks");
    let taskList = document.getElementById("main-container");
    if (!retrievedObject || retrievedObject === "undefined") {
        allTasks = [];
    } else {
        allTasks = JSON.parse(retrievedObject);
        if (allTasks.length != 0) {
            welcome.remove();
        }

        for (let i = 0; i < allTasks.length; i++) {
            //taskList.renderTask(allTasks[i]);
        }
    }
    
    taskForm.addEventListener("submit", e => taskList.addTask(e) );

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
// function addTask(event) {
//     event.preventDefault();

//     //create struct and append to global list
//     const newTask = {
//         id: Math.random().toString(16).slice(2),
//         completed: false,
//         name: document.getElementById("task-name").value,
//         number: document.getElementById("task-num").value,
//         current: 0,
//         note: document.getElementById("task-note").value
//     }
//     allTasks.push(newTask);

//     //render HTML on page.
//     renderTask(newTask);

//     //everything else.
//     taskForm.reset();
//     welcome.remove();
//     closeModal();
// }

/**
 * render a task struct on page, display name and current progress
 * @param {*} newTask: the task struct to render 
 */
// function renderTask(newTask) {
//     document.querySelector(".task-container").appendChild(new TaskItem(newTask))
//     renderCheckmark(newTask);
// }

/**
 * render the checkbox status according to localStorage
 * @param {*} newTask the new object created from addTask()
 */
// function renderCheckmark(newTask) {
//     //setting checkmark
//     document.getElementById(newTask.id).checkmark.checked = newTask.completed;
// }

/**
 * Retrieving the note in Storage by getting its id
 * and update the checkmark status on the array 
 * @param {*} event 
 */
function setCheck(element) {
    let targetID = element.getRootNode().host.id;
    // get the element Index in the object list
    const taskIndex = allTasks.findIndex(elem => elem.id === targetID);
    allTasks[taskIndex].completed = !allTasks[taskIndex].completed;
}

/**
 * Click more button, giving user edit and delete options
 * @param {*} event 
 */
function handleEdit(event) {
    //getting which is being clicked
    let element = event.target;
    let eleJob;

    //job may be undefined
    if (event.target.attributes.job) {
        eleJob = event.target.attributes.job.value;
    }

    if (eleJob == "delete") {
        deleteTask(element);
    } else if (eleJob == "edit") {
        displayAddModal();
    } else if (eleJob == "play") {
        displayPlayModal();
        showModalTask(element);
    } else if (eleJob == "check") {
        setCheck(element);
    }
}

/**
 * Delete task
 * @param {*} element 
 */
function deleteTask(element) {
    // Delete item in allTasks array
    let itemToDelete = element.closest("task-item");
    let name = itemToDelete.taskName;
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].name === name) {
            allTasks.splice(i, 1);
            break;
        }
    }
    // Delete item in the DOM
    itemToDelete.remove();

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