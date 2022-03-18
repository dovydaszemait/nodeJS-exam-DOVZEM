/// ;(
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

  async function addBill(billData) {
    if (token === null) throw new Error('token not found');
  
    const resp = await fetch(`${BASE_URL}/bills`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(billData),
    });
    const dataInJs = await resp.json();
    if (dataInJs.success === true) {
      await handleSuccess('Bill added');
    }
  
    return true;
  }
  
