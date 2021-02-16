const loginSubmit = document.getElementById('login');
const signupSubmit = document.getElementById('signup');
const switcher = document.getElementById('btn');

const signupButton = document.getElementById('signup-btn');
const loginButton = document.getElementById('login-btn');

// TODO: additional logic: switch either to 'Login' or to 'Sign Up'
loginButton.style.color = 'white';


signupButton.addEventListener('click', function signup() {
    loginSubmit.style.left = '-400px';
    signupSubmit.style.left = '50px';
    switcher.style.left = '120px';

    signupButton.style.color = 'white';
    loginButton.style.color = 'black';
});

loginButton.addEventListener('click', function login() {
    loginSubmit.style.left = '50px';
    signupSubmit.style.left = '450px';
    switcher.style.left = '0px';

    signupButton.style.color = 'black';
    loginButton.style.color = 'white';
});
