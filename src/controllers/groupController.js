const { getGroupsDb, insertGroupToDb } = require('../models/groupModel');
const { failResponce, successResponce } = require('../helpers/dbHelper');

async function getGroups(req, res) {
  const foundGroups = await getGroupsDb();
  return foundGroups === false
    ? failResponce(res)
    : successResponce(res, foundGroups);
}

async function createGroup(req, res) {
  const newGroupData = req.body;
  const { name } = newGroupData;
  const postAddingResult = await insertGroupToDb(newGroupData);
  if (postAddingResult === false) {
    res.status(500);
    return;
  }
  res.json(postAddingResult);
}

module.exports = {
  getGroups,
  createGroup,
};