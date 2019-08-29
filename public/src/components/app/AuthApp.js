import Component from '../Component.js';
import Header from './Header.js';
import SignUp from '../auth/SignUp.js';
import SignIn from '../auth/SignIn.js';
import { signUp as userSignUp, signIn as userSignIn } from '../../services/todo-api.js';
import store from '../../services/store.js';

function success(user) {
    store.setToken(user.token);
    const searchParams = new URLSearchParams(location.search);
    location = searchParams.get('redirect') || './index.html';
}

class AuthApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const errors = dom.querySelector('.errors');
        const signUpContainer = dom.querySelector('#signup-cont');
        const signInContainer = dom.querySelector('#signin-cont');

        const signUp = new SignUp ({
            onSignUp: newUser => {
                errors.textContent = '';

                return userSignUp(newUser)
                    .then(user => {
                        success(user);
                    })
                    .catch(err => {
                        errors.textContent = err;
                    });
            }
        });
        signUpContainer.appendChild(signUp.renderDOM());

        const signIn = new SignIn({
            onSignIn: credentials => {
                errors.textContent = '';

                return userSignIn(credentials)
                    .then(user => {
                        success(user);
                    })
                    .catch(err => {
                        errors.textContent = err;
                    });
            }
        });
        signInContainer.appendChild(signIn.renderDOM());

        const switchToSignIn = dom.querySelector('#signup-button');
        switchToSignIn.addEventListener('click', ()=> {
            signInContainer.classList.remove('no-disp');
            signUpContainer.classList.add('no-disp');
        });

        const switchToSignUp = dom.querySelector('#signin-button');
        switchToSignUp.addEventListener('click', ()=> {
            signInContainer.classList.add('no-disp');
            signUpContainer.classList.remove('no-disp');
        });

    }

    renderHTML() {
        return /*html*/`
            <div class="auth-p-div">
                <main>
                    <p class="errors"></p>
                    <section id="signin-cont">
                        <p class="switch">
                            <button id="signin-button">New To Page?</button>
                        </p>
                    </section>
                    <section class="no-disp" id="signup-cont">
                        <p class="switch">
                            <button id="signup-button">Log Back In</button>
                        </p>
                    </section>
                </main>
            </div>
        `;
    }
}

export default AuthApp;