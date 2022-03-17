const BASE_URL = 'http://localhost:3000';
const formEl = document.forms.login;
const errorsContainerEl = document.querySelector('.errors');

function handleErrors(erorrArray) {
  errorsContainerEl.innerHTML = '';
  console.log('erorrArray ===', erorrArray);

  erorrArray.forEach((err) => {
    errorsContainerEl.innerHTML += `<p>${err}</p>`;
  });
}

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

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const loginUserData = {
    email: formEl.elements.email.value,
    password: formEl.elements.password.value,
  };
  loginUser(loginUserData);
});
