const { getBillsByIdDb, insertBillsToDb } = require('../models/billsModel');
const { failResponse, successResponse } = require('../helpers/dbHelper');

async function getBillsById(req, res) {
  const group_id = req.params.id;
  const foundSingleUser = await getBillsByIdDb(group_id);
  return foundSingleUser === false
    ? failResponse(res)
    : successResponse(res, foundSingleUser);
}
async function createBill(req, res) {
  const newBillData = req.body;
  const { group_id, amount, description } = newBillData;
  const billAddingResult = await insertBillsToDb(newBillData);
  if (billAddingResult === false) {
    res.status(500);
    return;
  }
  res.json(billAddingResult);
}

module.exports = {
  getBillsById,
  createBill,
};