import Component from '../Component.js';

class NewComponent extends Component {

    onRender(dom) {
        const todo = this.props.todo;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;
        
        const statsButton = dom.querySelector('.status-button');
        statsButton.addEventListener('click', () => {
            todo.completed = !todo.completed;
            onUpdate(todo);
        });

        const deleteButton = dom.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            if(confirm(`Are you sure you want to delete "${todo.task}"?`)) {
                onRemove(todo);
            }
        });
    }
    
    renderHTML() {
        const todo = this.props.todo;

        return /*html*/`
            <li class="to-do">
                <div class="li-div">
                    <span class="${todo.completed ? 'complete' : ''}">${todo.task}</span>
                </div>
                
                <div class="li-div">
                    <button class="status-button">Mark as ${todo.completed ? 'Incomplete' : 'Complete'}</button>
                    <button class="delete-button">Delete Task</button>
                </div>
            </li>
        `;
    }
}

export default NewComponent;