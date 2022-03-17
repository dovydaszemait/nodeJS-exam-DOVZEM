const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

const tableNameGroup = 'groups';
const tableNameAccount = 'accounts';

async function insertGroup(name, userId) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
        INSERT INTO ${tableNameGroup} (name)
        VALUES (?)
        `;
    const [insertResult] = await conn.execute(sql, [name]);

    const groupId = insertResult.insertId;
    const sql2 = `
        INSERT INTO ${tableNameAccount} (group_id, user_id)
        VALUES (?, ?)
        `;
    const [insertResult2] = await conn.execute(sql2, [groupId, userId]);
    await conn.close();
    return { group: insertResult, account: insertResult2 };
  } catch (error) {
    return false;
  }
}

module.exports = {
  insertGroup,
};

