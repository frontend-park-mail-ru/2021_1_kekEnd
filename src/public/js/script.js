const loginSubmit = document.getElementById("login");
const signupSubmit = document.getElementById("signup");
const switcher = document.getElementById("btn");

document.getElementById("signup-btn").addEventListener("click", function signup() {
    loginSubmit.style.left = "-400px";
    signupSubmit.style.left = "50px";
    switcher.style.left = "120px";
});

document.getElementById("login-btn").addEventListener("click", function login() {
    loginSubmit.style.left = "50px";
    signupSubmit.style.left = "450px";
    switcher.style.left = "0px";
});
