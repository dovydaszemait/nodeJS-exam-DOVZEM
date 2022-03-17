const { insertUser, findUserByEmail } = require('../models/authModel');
const { successResponce, failResponce } = require('../helpers/dbHelper');
const { hashPass, verifyHash, generateJwtToken } = require('../helpers/helper');

async function register(req, res) {
  const { full_name, email, password } = req.body;
  const hashedPassword = hashPass(password);
  const insertResult = await insertUser(full_name, email, hashedPassword);

  return insertResult === false
    ? failResponce(res)
    : successResponce(res, 'user created');
}
async function login(req, res) {
  const { email, password } = req.body;

  const findResults = await findUserByEmail(email);
  if (findResults === false) return failResponce(res);
  if (!findResults.length)
    return failResponce(res, 'email or pass not match 1');

  const foundUserObj = findResults[0];

  if (!verifyHash(password, foundUserObj)) {
    return failResponce(res, 'email or pass not match 2');
  }

  const token = generateJwtToken(foundUserObj);
  successResponce(res, token);
}

module.exports = {
  register,
  login,
};