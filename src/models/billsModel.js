const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function getBillsByIdDb(group_id) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM bills WHERE group_id = ?';
    const [rows] = await conn.execute(sql, [group_id]);
    await conn.close();
    return rows;
  } catch (error) {
    console.log('getBillsByIdDb ===', error);
    return false;
  }
}
async function insertBillsToDb(newBillData) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `
    INSERT INTO bills (group_id, amount, description) VALUES
    (?, ?, ?)
    `;
    const { group_id, amount, description } = newBillData;
    const [insertResult] = await connection.execute(sql, [
      group_id,
      amount,
      description,
    ]);
    await connection.close();
    return insertResult;
  } catch (error) {
    console.log('klaida įkeliant duomenis', error);
    res.status(500).send('klaida insertBillsToDb');
  }
}
module.exports = {
  getBillsByIdDb,
  insertBillsToDb,
};