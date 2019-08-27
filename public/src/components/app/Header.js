import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        return /*html*/`
        <header>
            <img class="logo" src="./assets/todo-cloud-hero.png" alt="Check List Logo">
            <h1>Tasks To Do</h1>
        </header>
        `;
    }
}

export default Header;