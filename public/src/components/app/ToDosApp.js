import Component from '../Component.js';
import Header from './Header.js';
import ToDoList from '../todo/ToDosList.js';
import ToDoForm from '../todo/ToDoForm.js';
import { getTodos, addTodo, updateTodo, removeTodo } from '../../services/todo-api.js';

class ToDoApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');

        const toDoForm = new ToDoForm({
            onAdd: todo => {
                return addTodo(todo)
                    .then(saved => {
                        const todos = this.state.todos;
                        todos.push(saved);
                        toDoList.update({ todos });
                    });
            }
        });
        main.appendChild(toDoForm.renderDOM());

        const toDoList = new ToDoList({
            todos: [],
            onUpdate: todo => {
                return updateTodo(todo)
                    .then(updated => {
                        const todos = this.state.todos;

                        const index = todos.indexOf(todo);
                        todos.splice(index, 1, updated);

                        toDoList.update({ todos });
                    });
            },
            onRemove: todo => {
                return removeTodo(todo.id)
                    .then(() => {
                        const todos = this.state.todos;

                        const index = todos.indexOf(todo);
                        todos.splice(index, 1);

                        toDoList.update({ todos });
                    });
            }
        });
        main.appendChild(toDoList.renderDOM());

        getTodos({ showAll: true })
            .then(todos => {
                this.state.todos = todos;
                toDoList.update({ todos });
            })
            .catch(err => {
                console.log(err);
            });
    }

    renderHTML() {
        return /*html*/`
            <div>

                <main>
                </main>
            </div>
        `;
    }
}

export default ToDoApp;