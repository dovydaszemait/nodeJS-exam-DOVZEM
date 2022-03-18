const register = document.getElementById('register');
const email = document.getElementById('email');
const password = document.getElementById('password');
const error = document.getElementById('error');

register.addEventListener('submit', (e) => {
  e.preventDefault();
  error.textContent = '';
  const userObj = { email: email.value, password: password.value };
  if (!email.value || !password.value) {
    error.textContent = 'Some of the fields are empty!';
    return;
  }
  loginUserInfo(userObj);
});


function handleErrors(erorrArray) {
  error.innerHTML = '';

  erorrArray.forEach((err) => {
    error.innerHTML += `<p>${err}</p>`;
  });
}

const BASE_URL = 'http://localhost:3000';

async function loginUser(loginUserData) {
  const resp = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginUserData),
  });
  
  const dataInJs = await resp.json();
  await console.log(dataInJs);
  if (dataInJs.success === false) {
    handleErrors(dataInJs.error);
  }
  if (dataInJs.success === true) {
    localStorage.setItem('token24', dataInJs.data);
    window.location.replace('index.html');
  }
}

