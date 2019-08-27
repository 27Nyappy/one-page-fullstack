import Component from '../Component.js';

class NewComponent extends Component {

    onRender(dom) {
        const todo = this.props.todo;
        const onUpdate = this.props.onUpdate;
        
        const statsButton = dom.querySelector('.status-button');
        statsButton.addEventListener('click', () => {
            todo.completed = !todo.completed;
            onUpdate(todo);
        });
    }
    
    renderHTML() {
        const todo = this.props.todo;

        return /*html*/`
            <li class="to-do">
                <span class="${todo.completed ? 'incomplete' : ''}">${todo.task}</span>
                <div>
                    <button class="status-button">Mark as ${todo.completed ? 'Complete' : 'Incomplete'}</button>
                </div>
            </li>
        `;
    }
}

export default NewComponent;