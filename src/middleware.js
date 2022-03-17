const Joi = require('joi');
const { failResponse } = require('./dbHelper');
const { verifyJwtToken } = require('./helper');

async function validateUser(req, res, next) {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('validateUser error ===', error);
    const formatedError = error.details.map((detail) => ({
      message: detail.message,
      field: detail.context.key,
    }));
    failResponse(res, formatedError);
  }
}


async function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const tokenGotFromUser = authHeader && authHeader.split(' ')[1];
  if (!tokenGotFromUser) return failResponse(res, 'no token', 401);
  const verifyResult = verifyJwtToken(tokenGotFromUser);

  if (verifyResult === false) return failResponse(res, 'invalid token', 403);
  next();
}

module.exports = {
  validateUser,
  validateToken,
};
