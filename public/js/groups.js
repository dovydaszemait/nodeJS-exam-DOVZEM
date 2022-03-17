
const BASE_URL = 'http://localhost:3000';


async function loginUser(loginUserData) {
    console.log('registerUser ===', loginUserData);
    const resp = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginUserData),
    });
    const dataInJs = await resp.json();
    if (dataInJs.success === false) {
      handleErrors(dataInJs.error);
    }
    if (dataInJs.success === true) {
      localStorage.setItem('token24', dataInJs.data);
      window.location.replace('groups.html');
    }
  }