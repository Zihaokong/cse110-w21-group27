class TaskItem extends HTMLElement {
    constructor(newTask) {
        super();
        //attaching html to shadow not parent
        var shadow = this.attachShadow({
            mode: 'open'
        });
        const item = document.createElement('li');
        Object.assign(item, {
            id: newTask.id,
            className: "taskNode d-flex flex-row bd-highlight",
            draggable: true
        })

        const dragButton = document.createElement('span');
        dragButton.setAttribute('class', "p-2 inline material-icons drag-btn");
        dragButton.textContent = 'drag_indicator';


        const checkmark = document.createElement('span');
        checkmark.setAttribute('class', "p-2 form-check form-check-inline");
        const checkmarkInput = document.createElement('input');
        Object.assign(checkmarkInput, {
            className: "form-check-input input-mysize large",
            type: "checkbox",
            job: "check"
        })
        const checkmarkLabel = document.createElement('label');
        checkmarkLabel.setAttribute('for', 'checkbox');
        checkmark.appendChild(checkmarkInput);
        checkmark.appendChild(checkmarkLabel);

        const todoTask = document.createElement('p');
        todoTask.setAttribute('class', 'p-2 flex-md-fill text-nowrap task-item');
        todoTask.innerHTML = newTask.name;

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

        const playButton = document.createElement('button');
        playButton.setAttribute('class', "p-2 bd-highlight btn  play-btn flex-right");
        playButton.setAttribute('type', "button");

        const playIcon = document.createElement('span');
        playIcon.setAttribute('class', "material-icons play-btn");
        playIcon.setAttribute('job', "play")
        playIcon.textContent = 'play_circle';
        playButton.appendChild(playIcon);


        //edit div hierarchy: div:{ button:{span} , dropdowndiv{editA, divider, deleteA}}
        // const editDiv = document.createElement('div');
        // editDiv.setAttribute('class', 'p-2 bd-highlight btn-group dropright flex-right');
        // editDiv.innerHTML = `<slot name=dropdown></slot>`
        const editDiv = document.createElement('slot');
        editDiv.setAttribute('name', 'dropdown');
        // const editButton = document.createElement('button');
        // Object.assign(editButton, {
        //     className: "btn btn-secondary dropdown-toggle",
        //     type: "button",
        //     id: "dropdownMenuButton",
        // })
        // editButton.setAttribute('data-toggle', "dropdown");
        // editButton.setAttribute('aria-haspopup', true);
        // editButton.setAttribute('aria-expanded', false);
        // const editIcon = document.createElement('span');
        // editIcon.setAttribute('class', "material-icons edit-btn");
        // editIcon.textContent = 'more_horiz';
        // editButton.appendChild(editIcon);

        // //Element for Dropdown menu
        // const editDropdown = document.createElement('div');
        // editDropdown.setAttribute('class', "dropdown-menu dropdown-menu-right");
        // editDropdown.setAttribute('aria-labelledby', "dropdownMenuButton");

        // const editAnchor = document.createElement('a');
        // editAnchor.setAttribute('class', 'dropdown-item')
        // editAnchor.setAttribute('job', 'edit')
        // editAnchor.textContent = 'Edit';

        // const editDivider = document.createElement('div');
        // editDivider.setAttribute('class', 'dropdown-divider')

        // const deleteAnchor = document.createElement('a');
        // deleteAnchor.setAttribute('class', 'dropdown-item')
        // deleteAnchor.setAttribute('job', 'delete')
        // deleteAnchor.textContent = 'Delete';

        // editDropdown.appendChild(editAnchor)
        // editDropdown.appendChild(editDivider)
        // editDropdown.appendChild(deleteAnchor)

        // editDiv.appendChild(editButton)
        // editDiv.appendChild(editDropdown)


        item.appendChild(dragButton);
        item.appendChild(checkmark);
        item.appendChild(todoTask);
        item.appendChild(progressBar);
        item.appendChild(playButton);
        item.appendChild(editDiv);

        shadow.innerHTML = `
        <link rel="stylesheet" href="task.css"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"/>
     `;
        shadow.appendChild(item);

        var scriptJQ = document.createElement('script')
        scriptJQ.setAttribute('src', "https://code.jquery.com/jquery-3.3.1.slim.min.js");
        scriptJQ.setAttribute('integrity', "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo");
        scriptJQ.setAttribute('crossorigin', "anonymous");

        var scriptPopper = document.createElement('script')
        scriptPopper.setAttribute('src', "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js");
        scriptPopper.setAttribute('integrity', "sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1");
        scriptPopper.setAttribute('crossorigin', "anonymous");

        var scriptBootstrap = document.createElement('script')
        scriptBootstrap.setAttribute('src', "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js");
        scriptBootstrap.setAttribute('integrity', "sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM");
        scriptBootstrap.setAttribute('crossorigin', "anonymous");


        shadow.appendChild(scriptJQ);
        shadow.appendChild(scriptPopper);
        shadow.appendChild(scriptBootstrap);
        // <script src="task.js"></script>
        // <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        // <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"> </script>
        // <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"> </script>
    };
    connectedCallback() {
        const {
            shadowRoot
        } = this;
        openDropdown(this)
        shadowRoot.querySelector('.play-btn').addEventListener('click', handleEdit);
        // shadowRoot.querySelector('.dropdown-toggle').addEventListener('click', openDropdown);

        // shadowRoot.querySelector('.edit-btn').addEventListener('click', handleEdit);


    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('.play-btn').removeEventListener('click', handleEdit);
        // this.shadowRoot.querySelector('.edit-btn').removeEventListener('click', handleEdit);
    }

}

customElements.define('task-item', TaskItem);

function openDropdown(elem) {
    var shadow = elem.shadowRoot;
    var childNodes = shadow.childNodes;
    console.log(childNodes);
    console.log(childNodes[7].lastChild);
    var editDiv = childNodes[7].lastChild;
    editDiv.innerHTML = `
    <section slot="dropdown">   
        <div class="p-2 bd-highlight btn-group dropright flex-right hide">     
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="material-icons edit-btn">more_horiz</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" job="edit">Edit</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" job="delete">Delete</a>
            </div>
        </div>
    </section>`

}