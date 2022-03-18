const { insertUser, findUserByEmail } = require('../models/authModel');
const { successResponse, failResponse } = require('../helpers/dbHelper');
const { hashPass, verifyHash, generateJwtToken } = require('../helpers/helper');

async function register(req, res) {
  const { full_name, email, password } = req.body;
  const hashedPassword = hashPass(password);
  const insertResult = await insertUser(full_name, email, hashedPassword);

  return insertResult === false
    ? failResponse(res)
    : successResponse(res, 'User has been created');
}
async function login(req, res) {
  const { email, password } = req.body;

  const findResults = await findUserByEmail(email);
  if (findResults === false) return failResponse(res);
  if (!findResults.length)
    return failResponse(res);

  const foundUserObj = findResults[0];

  if (!verifyHash(password, foundUserObj)) {
    return failResponse(res);
  }

  const token = generateJwtToken(foundUserObj);
  successResponse(res, token);
}

module.exports = {
  register,
  login,
};