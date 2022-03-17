const express = require('express');
const accountController = require('../controllers/accountController');
const { validateToken } = require('../middleware');

const accountRoute = express.Router();

accountRoute.get('/', validateToken, accountController.listGroups);
accountRoute.post('/', validateToken, accountController.joinToGroup);

module.exports = accountRoute;