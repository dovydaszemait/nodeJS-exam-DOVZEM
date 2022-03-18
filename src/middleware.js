const Joi = require('joi');
const { failResponse } = require('./helpers/dbHelper');
const { verifyJwtToken } = require('./helpers/helper');

async function validateUser(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const formatedError = error.details.map((detail) => ({
      message: detail.message,
      field: detail.context.key,
    }));
    failResponse(res, formatedError);
  }
}
async function validateUserWithName(req, res, next) {
  const schema = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const formatedError = error.details.map((detail) => ({
      message: detail.message,
      field: detail.context.key,
    }));
    failResponse(res, formatedError);
  }
}
async function validateToken(req, res, next) {
  const authHeaders = req.headers.authorization;
  const tokenGotFromUser = authHeaders && authHeaders.split(' ')[1];
  if (!tokenGotFromUser) return failResponse(res, 'no token', 401);
  const verifyResult = verifyJwtToken(tokenGotFromUser);
  if (verifyResult === false) return failResponse(res, 'invalid token', 403);
  req.userId = verifyResult.id;
  next();
}

module.exports = {
  validateUser,
  validateToken,
  validateUserWithName,
};