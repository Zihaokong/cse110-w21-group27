/** 
 * Method for creating drag icon for the task-item
 */

const createDrag = () => {
    const dragIcon = document.createElement('span');
    dragIcon.setAttribute('class', "p-2 inline material-icons drag-btn hide");
    // dragIcon.setAttribute('draggable', "true");
    dragIcon.textContent = 'drag_indicator';
    return dragIcon;
};

/** 
 * Method for creating checkbox icon for the task-item
 */
const createCheckmark = () => {
    const checkmark = document.createElement('span');
    checkmark.setAttribute('class', "p-2 form-check form-check-inline");
    const checkmarkInput = document.createElement('input');
    checkmarkInput.setAttribute('class', "form-check-input input-mysize large");
    checkmarkInput.setAttribute('type', "checkbox");
    checkmarkInput.setAttribute('job', "check");
    const checkmarkLabel = document.createElement('label');
    checkmarkLabel.setAttribute('for', 'checkbox');
    checkmark.appendChild(checkmarkInput);
    checkmark.appendChild(checkmarkLabel);
    return checkmark;
};


/** 
 * Method for creating task with the input todo task for the task-item
 * @param {object} newTask the newly created task item from the task.js
 */
const createTask = (newTask) => {
    const todoTask = document.createElement('p');
    todoTask.setAttribute('class', 'p-2 flex-md-fill text-nowrap task-item');
    todoTask.innerHTML = newTask.name;
    return todoTask;
};

/** 
 * Method for creating progress bar for the task-item
 * @param {object} newTask the new task object created by task.js
 */
const createProgressBar = (newTask) => {
    // calculate the percentage of progress for the styles
    let percent = (newTask.current / newTask.number) * 100;
    if (percent >= 100) {
        percent = "100%";
    } else {
        percent = percent.toFixed(2) + "%";
    }
    // the outer div containng the progress-bar
    const progressBar = document.createElement('div');
    progressBar.setAttribute('class', 'flex-column progress');
    // the inner div for the progress itserlf and uses the attribute from the newTask object
    const progress = document.createElement('div');
    if (newTask.current > newTask.number) {
        progress.setAttribute('class', "progress-bar progress-bar-striped bg-danger");
    } else {
        progress.setAttribute('class', "progress-bar progress-bar-striped bg-success");
    }
    progress.setAttribute('role', "progressbar");
    progress.setAttribute('style', `width: ${percent};`);
    progress.setAttribute('aria-valuenow', `${newTask.current}`);
    progress.setAttribute('aria-valuemin', 0);
    progress.setAttribute('aria-valuemin', `${newTask.number}`);
    progress.innerHTML = `${percent}`;
    //append the inner div to outer div
    progressBar.appendChild(progress)
    return progressBar;
};

/** 
 * Method for creating text representing the finished pomo over the expect required pomo
 * @param {object} newTask the new task object created by task.js
 * @return the text element as described as p1 tag
 */
const createProgressText = (newTask) => {
    let progressT = newTask.current + "/" + newTask.number;
    const progressText = document.createElement('p1');
    progressText.setAttribute('class', 'progress-text')
    progressText.innerHTML = `${progressT}`;
    return progressText;
}

/** 
 * Method for creating the play-button to start the timer for the task-item
 * @return the button element with the play-icon
 */
const createPlayButton = () => {
    const playButton = document.createElement('button');
    playButton.setAttribute('class', "p-2 bd-highlight btn  play-btn flex-right hide");
    playButton.setAttribute('type', "button");
    const playIcon = document.createElement('span');
    playIcon.setAttribute('class', "material-icons play-btn");
    playIcon.setAttribute('job', "play")
    playIcon.textContent = 'play_circle';
    playButton.appendChild(playIcon);
    return playButton;
};

/** 
 * Method for section code of dropdown menu for the task-item, 
 * this will be used to create the section dropdown in the light dom
 * @return the section code as pre-defined dropdown element for creation in light dom
 */
const dropdownMenu = () => {
    return (
        `<section slot="dropdown">   
            <div class="p-2 bd-highlight btn-group dropright flex-right hide">     
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="material-icons edit-btn">more_horiz</span>
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#" job="edit" onclick='handleEdit(event)'>Edit</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" job="delete" onclick='handleEdit(event)'>Delete</a>
                </div>
            </div>
        </section>`);
}


/** 
 * Method for the styles sheets
 */
const styleSheets = () => {
    return (
        `<link rel="stylesheet" href="task.css"/>
        <link rel="stylesheet" href="main.css"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"/>`
    );
}

/** 
 * TaskItem class which is the task-item component that containing all the 
 * buttons and the to-do task on the listed item
 */
export class TaskItem extends HTMLElement {
    /** 
     * Constructor for the TaskItem 
     * @param newTask the new created object from task.js
     */
    constructor(newTask) {
        super();
        let shadow = this.attachShadow({
            mode: 'open'
        });
        // component 'task-item' attributes
        this.id = newTask.id;
        this.className = "taskNode d-flex flex-row bd-highlight";
        this.draggable = 'true';

        // Creating the drag icon
        const dragIcon = createDrag();

        // Creating the checkmark
        const checkmark = createCheckmark();

        // Creating p tag for task name
        const todoTask = createTask(newTask);

        // Creating the progress-bar
        const progressBar = createProgressBar(newTask);
        const progressText = createProgressText(newTask);

        // Creating the play-button
        const playButton = createPlayButton();

        // Creating the edit-button
        const editDiv = document.createElement('slot');
        editDiv.setAttribute('name', "dropdown");


        shadow.innerHTML = styleSheets();
        shadow.appendChild(dragIcon);
        shadow.appendChild(checkmark);
        shadow.appendChild(todoTask);
        shadow.appendChild(progressBar);
        shadow.appendChild(progressText);
        shadow.appendChild(playButton);
        shadow.appendChild(editDiv);
    };

    // Helper method for retrieving the <input> for checkmark from <task-item>
    get checkmark() {
        return this.shadowRoot.querySelector('input');
    }

    // Helper method for retrieving the <p>'s content from <task-item>
    get taskName() {
        return this.shadowRoot.querySelector('p').textContent;
    }

    // invoked each time the custom element is appended into a document-connected element
    connectedCallback() {
        // Creating the dropdown in runtime
        this.innerHTML = dropdownMenu();
        this.shadowRoot.querySelector('.play-btn').addEventListener('click', handleEdit);
        this.shadowRoot.querySelector('.form-check-input').addEventListener('click', handleEdit);
    }
    //Invoked when the custom element is disconnected from the document's DOM.
    disconnectedCallback() {
        this.shadowRoot.querySelector('.play-btn').removeEventListener('click', handleEdit);
        this.shadowRoot.querySelector('.form-check-input').addEventListener('click', handleEdit);
    }
}

customElements.define('task-item', TaskItem);