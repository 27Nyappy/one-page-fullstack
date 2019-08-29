import Component from '../Component.js';
import ToDo from './ToDo.js';

class ToDoList extends Component {

    onRender(list) {
        const todos = this.props.todos;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        todos.forEach(todo => {
            const dos = new ToDo({ todo, onUpdate, onRemove });
            list.appendChild(dos.renderDOM());
        });
    }

    renderHTML() {
        return /*html*/`
            <ul class="to-dos-list"></ul>
        `;
    }
}

export default ToDoList;