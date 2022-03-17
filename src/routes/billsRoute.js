const express = require('express');
const billsController = require('../controllers/billsController');

const billsRoute = express.Router();

billsRoute.get('/bills/:id', billsController.getBillsById);
billsRoute.post('/bills', billsController.createBill);

module.exports = {
  billsRoute,
};
