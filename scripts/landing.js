
const nameInput = document.getElementsByClassName("userName")[0];
const emailInput = document.getElementsByClassName("userEmail")[0];
const passwordInput = document.getElementsByClassName("userPassword")[0];
const submitButton = document.getElementsByClassName("submit")[0];

//let fields = [nameInput, emailInput, passwordInput];
nameInput.onchange = e =>  {
    updateButton();
}

emailInput.onchange = e =>  {
    updateButton();
}

passwordInput.onchange = e =>  {
    updateButton();
}

function updateButton() {
    if (allFilled()) {
        console.log("can click ------------");
        submitButton.style.backgroundColor = "#296868";
        submitButton.disabled = false;
    } else {
        console.log("can't click ------------");
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
    // submit to backend
}