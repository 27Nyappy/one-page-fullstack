import ToDoApp from './components/app/ToDosApp.js';

const app = new ToDoApp();
document.body.prepend(app.renderDOM());