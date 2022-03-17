
const BASE_URL = 'http://localhost:3000';


const bills = await getBills();
if (!bills.success) {
    return;
  }

async function getBills() {
    const token = localStorage.getItem('token24');
    const resp = await fetch(`${BASE_URL}/bills/2`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const dataInJs = await resp.json();
    renderBills(dataInJs.data);
  }
  getBills();
  
