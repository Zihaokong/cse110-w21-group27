class TaskItem extends HTMLElement {
    constructor(newTask) {
        super();
        var shadow = this.attachShadow({
            mode: 'open'
        });
        // component 'task-item' attributes
        this.id = newTask.id;
        this.className = "taskNode d-flex flex-row bd-highlight";
        this.draggable = 'true';

        // Creating the drag icon
        const dragIcon = document.createElement('span');
        dragIcon.setAttribute('class', "p-2 inline material-icons drag-btn hide");
        // dragIcon.setAttribute('draggable', "true");
        dragIcon.textContent = 'drag_indicator';

        // Creating the checkmark
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

        // Creating p tag for task name
        const todoTask = document.createElement('p');
        todoTask.setAttribute('class', 'p-2 flex-md-fill text-nowrap task-item');
        todoTask.innerHTML = newTask.name;

        // Creating the progress-bar
        const progressBar = document.createElement('div');
        progressBar.setAttribute('class', 'flex-column progress');
        const progress = document.createElement('div');
        Object.assign(progress, {
            className: "p-2 flex-column progress-bar",
            role: "progressbar",
            style: "width: 0%",
        })
        progress.setAttribute('aria-valuenow', '0');
        progress.setAttribute('aria-valuemin', '0');
        progress.setAttribute('aria-valuemin', '100');
        progressBar.appendChild(progress);

        // Creating the play-button
        const playButton = document.createElement('button');
        playButton.setAttribute('class', "p-2 bd-highlight btn  play-btn flex-right hide");
        playButton.setAttribute('type', "button");
        const playIcon = document.createElement('span');
        playIcon.setAttribute('class', "material-icons play-btn");
        playIcon.setAttribute('job', "play")
        playIcon.textContent = 'play_circle';
        playButton.appendChild(playIcon);

        // Creating the edit-button
        const editDiv = document.createElement('slot');
        editDiv.setAttribute('name', "dropdown");

        shadow.innerHTML = `
        <link rel="stylesheet" href="task.css"/>
        <link rel="stylesheet" href="main.css"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"/>`;

        shadow.appendChild(dragIcon);
        shadow.appendChild(checkmark);
        shadow.appendChild(todoTask);
        shadow.appendChild(progressBar);
        shadow.appendChild(playButton);
        shadow.appendChild(editDiv);

        function getRootID() {
            return newTask.id;
        }
    };

    // Helper method for retrieving the <input> for checkmark
    get checkmark() {
        return this.shadowRoot.childNodes[9].childNodes[0];
    }

    // Helper method for retrieving the <p>'s content
    get taskName() {
        return this.shadowRoot.childNodes[10].textContent;
    }

    // invoked each time the custom element is appended into a document-connected element
    connectedCallback() {
        const {
            shadowRoot
        } = this;

        // Creating the dropdown in runtime
        this.innerHTML = `
           <section slot="dropdown">   
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
            </section>`
        shadowRoot.querySelector('.play-btn').addEventListener('click', handleEdit);
        shadowRoot.querySelector('.form-check-input').addEventListener('click', handleEdit);
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('.play-btn').removeEventListener('click', handleEdit);
        this.shadowRoot.querySelector('.form-check-input').addEventListener('click', handleEdit);
    }
}

customElements.define('task-item', TaskItem);