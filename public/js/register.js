const errorShow = document.querySelector('.errors');
const register = document.getElementById('formReg');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const error = document.getElementById('error');

register.addEventListener('submit', (e) => {
  e.preventDefault();
  error.textContent = '';
  const allFieldsFilledIn = checkForEmptyFields([
    fullName.value,
    email.value,
    password.value,
    password2.value,
  ]);
  const passwordsMatch = checkPasswordMatch(password, password2);
  console.log(allFieldsFilledIn);
  console.log(passwordsMatch);
  if (!allFieldsFilledIn || !passwordsMatch) {
    return;
  }
  const newUserObj = {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
  };
  registerUser(newUserObj);
});



function handleErrors(erorrArray) {
  errorShow.innerHTML = '';
  erorrArray.forEach((err) => {
    errorShow.innerHTML += `<p>${err}</p>`;
  });
}

function passwordMatch(pass, passRepeat) {
  return pass === passRepeat;
}

const BASE_URL = 'http://localhost:3000';

async function registerUser(loginUserData) {
  const resp = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginUserData),
  });

  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);
  if (dataInJs.success === false) {
    handleErrors(dataInJs.error);
  }
  if (dataInJs.success === true) {
    window.location.replace('login.html');
  }
}
