import Component from '../Component.js';

class SignUp extends Component {

    onRender(form) {
        const onSignUp = this.props.onSignUp;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);

            const user = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            onSignUp(user);
        });
    }

    renderHTML() {
        return /*html*/`
        <form class="auth-form">
        <fieldset class="auth-fieldsets">
            <legend>Sign In</legend>
            <p>
                <label>Name</label>
                <input id="name" name="name" required>
            </p>
            <p>
                <label>Email</label>
                <input id="email" type="email" name="email" required placeholder="user@outlook.com">
            </p>
            <p>
                <label>Password</label>
                <input id="password" type="password" name="password" required>
            </p>
            <p>
                <button>Sign Up</button>
            </p>
        <fieldset>
    </form>
        `;
    }
}

export default SignUp;