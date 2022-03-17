const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

const tableName = 'accounts';

async function insertAccount(groupId, userId) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
      INSERT INTO ${tableName} (group_id, user_id)
      VALUES (?, ?)
      `;
    const [insertResult] = await conn.execute(sql, [groupId, userId]);
    await conn.close();
    return insertResult;
  } catch (error) {
    return false;
  }
}

async function listGroupsByUserId(userId) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT groups.id AS "id", groups.name AS "groupName"
    FROM groups
    LEFT JOIN accounts ON (accounts.group_id = groups.id)
    where accounts.user_id = ?
      `;
    const [userGroupResult] = await conn.execute(sql, [userId]);
    await conn.close();
    return userGroupResult;
  } catch (error) {
    return false;
  }
}
module.exports = {
  insertAccount,
  listGroupsByUserId,
};