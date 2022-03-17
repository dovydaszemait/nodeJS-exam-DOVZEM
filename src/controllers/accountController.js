const { successResponse, failResponse } = require('../helpers/dbHelper');
const { insertAccount, listGroupsByUserId } = require('../models/accountModel');

async function listGroups(req, res) {
  const { userId } = req;
  const foundGroups = await listGroupsByUserId(userId);

  return foundGroups === false
    ? failResponse(res)
    : successResponse(res, foundGroups);
}
async function joinToGroup(req, res) {
  const { userId } = req;
  const { groupId } = req.body;

  const insertResult = await insertAccount(groupId, userId);
  return insertResult === false
    ? failResponse(res)
    : successResponse(res, 'user joined to group');
}

module.exports = {
  listGroups,
  joinToGroup,
};