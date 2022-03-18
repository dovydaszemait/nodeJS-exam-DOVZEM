const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function getGroups() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM groups';
    const [rows] = await conn.execute(sql);
    await conn.close();
    return rows;
  } catch (error) {
    return false;
  }
}
async function insertGroup(newGroupData) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO groups (name) VALUES(?)`;
    const { name } = newGroupData;
    const [insertResult] = await connection.execute(sql, [name]);
    await connection.close();
    return insertResult;
  } catch (error) {
    res.status(500).send('error');
  }
}

module.exports = {
  getGroups,
  insertGroup,
};