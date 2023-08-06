const JWT = require('jsonwebtoken');
const {
  USER_REFRESH_TOKEN_EXPIRES,
  USER_TOKEN_ALGORITHM,
  USER_TOKEN_EXPIRES,
} = require('../constants/appSetting');

const generateToken = (user, secret) => {
  const expiresIn = USER_TOKEN_EXPIRES;
  const algorithm = USER_TOKEN_ALGORITHM;

  return JWT.sign(
    {
      iat: Math.floor(Date.now() / 1000),
      ...user,
      algorithm,
    },
    secret,
    {
      expiresIn,
    })
};

const generateRefreshToken = (id, secret) => {
  const expiresIn = USER_REFRESH_TOKEN_EXPIRES;

  return JWT.sign({ id }, secret, { expiresIn })
};

module.exports = {
  generateToken,
  generateRefreshToken,
};