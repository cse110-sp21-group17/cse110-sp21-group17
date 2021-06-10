import { router } from '../router/router.js'; // Router imported so you can use it to manipulate your SPA app here

const setState = router.setState;
const nameInput = document.getElementsByClassName("userName")[0];
const submitButton = document.getElementsByClassName("submit")[0];

//let fields = [nameInput, emailInput, passwordInput];
nameInput.oninput = e =>  {
    updateButton();
}

nameInput.onclick = e => {
    console.log('click')
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
    return true;
}

submitButton.onclick = e => {
    let name = nameInput.value;
    // submit to backend --- once success - navigate to main page

    setState({ state: 'main', username: name });
}
