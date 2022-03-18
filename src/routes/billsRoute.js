const express = require('express');
const billsController = require('../controllers/billsController');

const billsRoute = express.Router();

billsRoute.get('/:groupId', billsController.getBillsById);
billsRoute.post('/', billsController.createBill);

module.exports = {
  billsRoute,
};


// GET ALL BILLS
// router.get('/', AuthMiddleware.restricted, async (req, res) => {
//   Bills.find()
//     .then(bills => {
//       res.status(200).json({
//         bills: bills,
//         /* decodedToken: req.decodedToken, */
//       });
//     })
//     .catch(error =>
//       res.status(500).json({
//         error:
//           'An error occurred during fetching all bills. That one is on us!',
//       }),
//     );
// });