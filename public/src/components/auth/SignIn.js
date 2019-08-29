import Component from '../Component.js';

class SignIn extends Component {

    onRender(form) {
        const onSignIn = this.props.onSignIn;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);

            const credentials = {
                email: formData.get('email'),
                password: formData.get('password')
            };

            onSignIn(credentials);
        });
    }

    renderHTML() {
        return /*html*/`
            <form class="auth-form">
                <fieldset class="auth-fieldsets">
                    <legend>Sign In</legend>
                    <p>
                        <label>Email</label>
                        <input id="signin-email" type="email" name="email" required placeholder="user@outlook.com">
                    </p>
                    <p>
                        <label>Password</label>
                        <input id="signin-password" type="password" name="password" required>
                    </p>
                    <p>
                        <button>Sign In</button>
                    </p>
                <fieldset>
            </form>
        `;
    }
}

export default SignIn;