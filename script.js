const form = document.getElementById('form');
const passwordEl1 = document.getElementById('password1');
const passwordEl2 = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false;
let passwordsMatch = false;
let checkRegister = true;
let array = [];

function validateForm() {
  checkRegister = true;

  /* --- HTML constraint API to check form validity --- */
  isValid = form.checkValidity();
  /* --- If form is not valid --- */
  if (!isValid) {
    /* --- Style main message error --- */
    message.textContent = 'Please fill out all fields.';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    return;
  }

  /* --- Passwords match setup --- */
  if (passwordEl1.value === passwordEl2.value) {
    /* --- If passwords match --- */
    passwordsMatch = true;
    message.style.color = 'green';
    messageContainer.style.borderColor = 'green';
  } else {
    /* --- If password not match --- */
    passwordsMatch = false;
    message.textContent = 'Make sure passwords match.';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    passwordEl1.style.borderColor = 'red';
    passwordEl2.style.borderColor = 'red';
    return;
  }

  /* --- Already Registered setup ---*/
  array.push(form.mail.value);
  if (array.length > 1) {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] === form.mail.value) {
        checkRegister = false;
        if (array.includes(form.mail.value) && checkRegister === false) {
          array.pop(array.length - 1);
        }
        if (checkRegister === false) {
          break;
        }
      }
    }
  }

  /* --- If alreaady registered ---*/
  if (!checkRegister) {
    message.textContent = 'Already Registered.';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    return;
  }

  /* --- If form is valid, password match and not registered --- */
  if (isValid && passwordsMatch && checkRegister) {
    message.textContent = 'Registered Successfully!';
    message.style.color = 'green';
    messageContainer.style.borderColor = 'green';
    passwordEl1.style.borderColor = 'green';
    passwordEl2.style.borderColor = 'green';
  }
}
function storeData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    mail: form.mail.value,
    password: form.password2.value
  };
  if (isValid && passwordsMatch && checkRegister) {
    console.log(user);
  }
}

function processFormData(event) {
  event.preventDefault();
  /* --- Validate Form --- */
  validateForm();
  /* --- Storing the Data ---*/
  storeData();
}

form.addEventListener('submit', processFormData);
