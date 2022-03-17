const { successResponse, failResponse } = require('../helpers/dbHelper');
const { insertGroup } = require('../models/groupModel');

async function createGroup(req, res) {
  const { userId } = req;
  const { groupName } = req.body;

  const insertResult = await insertGroup(groupName, userId);
  return insertResult === false
    ? failResponse(res)
    : successResponse(res, 'group created and added to user');
}

module.exports = {
  createGroup,
};