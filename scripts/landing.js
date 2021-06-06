
const nameInput = document.getElementsByClassName("userName")[0];
const emailInput = document.getElementsByClassName("userEmail")[0];
const passwordInput = document.getElementsByClassName("userPassword")[0];
const submitButton = document.getElementsByClassName("submit")[0];
import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

//let fields = [nameInput, emailInput, passwordInput];
nameInput.oninput = e =>  {
    updateButton();
}

nameInput.onclick = e => {
    console.log('click')
}

emailInput.oninput = e =>  {
    updateButton();
}

passwordInput.oninput = e =>  {
    updateButton();
}

function updateButton() {
    if (allFilled()) {
        submitButton.style.backgroundColor = "#296868";
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
        submitButton.style.backgroundColor = "#696868";
    }
}

function allFilled() {
    if (nameInput.value == "") return false;
    if (emailInput.value == "") return false;
    if (passwordInput.value == "") return false;
    return true;
}

submitButton.onclick = e => {
    let name = nameInput.value;
    let email = emailInput.value;
    let password = passwordInput.value;
    // submit to backend --- once success - navigate to main page

    setState("mainPage");
}