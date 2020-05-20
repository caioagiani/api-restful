const { sign } = require('jsonwebtoken');

/**
 * Generate token with timestamp +30minutes
 *
 * @param {*} [params={}]
 * @returns JWT
 */
const createToken = (params = {}) => {
  let expiresSet = new Date(Date.now());
  expiresSet.setMinutes(expiresSet.getMinutes() + 30);

  return sign(
    { ...params, expiresIn: parseInt(expiresSet.getTime()) },
    process.env.SECRET_JWT
  );
};

module.exports = { createToken };
