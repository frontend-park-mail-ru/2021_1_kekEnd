const loginSubmit = document.getElementById('login');
const signupSubmit = document.getElementById('signup');
const switcher = document.getElementById('current-button');

const signupButton = document.getElementById('signup-button');
const loginButton = document.getElementById('login-button');

// TODO: add additional logic: switch either to 'Login' or to 'Sign Up'
loginButton.classList.add('button-white-text');

const moveForms = () => {
    loginSubmit.classList.toggle('login-form-inactive');
    signupSubmit.classList.toggle('signup-form-active');
    switcher.classList.toggle('switcher-on-signup');
    signupButton.classList.toggle('button-white-text');
    loginButton.classList.toggle('button-white-text');
}

signupButton.addEventListener('click', moveForms);
loginButton.addEventListener('click', moveForms);
