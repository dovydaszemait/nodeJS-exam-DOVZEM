const { getGroups, insertGroup } = require('../models/groupModel');
const { failResponse, successResponse } = require('../helpers/dbHelper');

async function getDBGroups(req, res) {
  const foundGroups = await getGroups();
  return foundGroups === false
    ? failResponse(res)
    : successResponse(res, foundGroups);
}

async function createGroup(req, res) {
  const newGroupData = req.body;
  const { name } = newGroupData;
  const postAddingResult = await insertGroup(newGroupData);
  if (postAddingResult === false) {
    res.status(500);
    return;
  }
  res.json(postAddingResult);
}

module.exports = {
  getDBGroups,
  createGroup,
};