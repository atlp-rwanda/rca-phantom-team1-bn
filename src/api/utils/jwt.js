const jwt = require("jsonwebtoken");

const signJwtToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

const decodeJwtToken = (token) => {
  const secret = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, secret);
  return decoded;
};

module.exports = { signJwtToken, decodeJwtToken };
