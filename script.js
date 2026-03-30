const dayElem = document.getElementById('day');
const dateElem = document.getElementById('date');
const monthElem = document.getElementById('month');

function updateDate() {
    const now = new Date();
    
    const days = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
    dayElem.textContent = days[now.getDay()];

    dateElem.textContent = now.getDate();

    const months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
    monthElem.textContent = months[now.getMonth()];
}

updateDate();


const addBtn = document.querySelector('.input-container button');
const taskInput = document.getElementById('taskInput');
const tasksContainer = document.querySelector('.task-container');
const progressBar = document.querySelector('.progress-bar');

let tasks = [];

function updateProgress() {
    if (tasks.length === 0) {
        progressBar.style.width = '0%';
        progressBar.style.backgroundColor = '#667538';
        return;
    }
    const completed = tasks.filter(t => t.completed).length;
    const percent = (completed / tasks.length) * 100;
    progressBar.style.width = percent + '%';

    progressBar.style.backgroundColor = percent === 100 ? 'green' : '#667538';
}

function addTask(text) {
    if (!text.trim()) return;

    const task = { text, completed: false };
    tasks.push(task);

    const taskElem = document.createElement('div');
    taskElem.classList.add('task-item');

    const icon = document.createElement('span');
    icon.classList.add('icon');

    const taskText = document.createElement('span');
    taskText.textContent = text;
    taskText.classList.add('task-text');
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        tasksContainer.removeChild(taskElem);
        tasks = tasks.filter(t => t !== task);
        updateProgress();
    });

    taskElem.appendChild(icon);
    taskElem.appendChild(taskText);
    taskElem.appendChild(deleteBtn);

    taskElem.addEventListener('click', () => {
        task.completed = !task.completed;
        taskElem.classList.toggle('completed');
        updateProgress();
    });

    tasksContainer.appendChild(taskElem);
    taskInput.value = '';
    updateProgress();
}

addBtn.addEventListener('click', () => addTask(taskInput.value));

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask(taskInput.value);
});