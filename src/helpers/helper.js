const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function hashPass(plainPassword) {
  return bcrypt.hashSync(plainPassword, 10);
}

function verifyHash(enteredPass, userObj) {
  return bcrypt.compareSync(enteredPass, userObj.password);
}

function generateJwtToken(userObj) {
  const jwtSecret = process.env.JWT_TOKEN_SECRET;
  return jwt.sign({ id: userObj.id }, jwtSecret, { expiresIn: '1h' });
}

function verifyJwtToken(token) {
  const jwtSecret = process.env.JWT_TOKEN_SECRET;

  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (error) {
    return false;
  }
}

module.exports = {
  hashPass,
  verifyHash,
  generateJwtToken,
  verifyJwtToken,
};
