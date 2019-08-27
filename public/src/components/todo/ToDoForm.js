import Component from '../Component.js';

class ToDoForm extends Component {

    onRender(form) {
        const onAdd = this.props.onAdd;
        const error = form.querySelector('p.error');

        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
            const toDo = {
                task: formData.get('task')
            };

            error.textContent = '';

            onAdd(toDo)
                .then(() => {
                    form.reset();
                })
                .catch(err => {
                    error.textContent = err;
                });
        });
    }

    renderHTML() {
        return /*html*/`
            <form>
                <fieldset class="form-field">
                    <input name="task" required>
                    <button>Add</button>
                </fieldset>
                <p class="error"></p>
            </form>
        `;
    }
}

export default ToDoForm;