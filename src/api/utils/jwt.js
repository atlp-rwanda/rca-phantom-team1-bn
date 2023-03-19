import { sign, verify } from "jsonwebtoken";

export const signJwtToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  const token = sign(payload, secret, { expiresIn });
  return token;
};

export const decodeJwtToken = (token) => {
  const secret = process.env.JWT_SECRET;
  const decoded = verify(token, secret);
  return decoded;
};
