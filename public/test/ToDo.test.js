import ToDo from '../src/components/todo/ToDo.js';
const test = QUnit.test;

QUnit.module('To Do');

test('renders to do', assert => {
    const todo = {
        id: 1,
        task: 'Set up list',
        completed: false
    };

    const expected = /*html*/`
        <li class="to-do">
            <span class="${todo.completed ? 'complete' : ''}">${todo.task}</span>
            <div>
                <button class="status-button">Mark as ${todo.completed ? 'Incomplete' : 'Complete'}</button>
                <button class="delete-button">Delete Task</button>
            </div>
        </li>
    `;

    const toDo = new ToDo({ todo });
    const html = toDo.renderHTML();

    assert.htmlEqual(html, expected);
});