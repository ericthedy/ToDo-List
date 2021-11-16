//Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load Event Listeners
loadEventListeners();

function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear Tasks event
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks From LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        //Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fas fa-trash-alt"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    });
}

// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }

    //Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Sore in LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault();

}

// Store Tasks
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // Remove From LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove LS Items
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(tasks, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear From LS
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }

    });
}