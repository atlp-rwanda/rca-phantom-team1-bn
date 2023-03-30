/* eslint-disable prettier/prettier */
import { sign, verify } from "jsonwebtoken";

export const signJwtToken = (payload) => {
  const secret = process.env.JWT_SECRET || "1g0h9i8j7k6l5m4n3o2p1q0r9s8t7u6v5w4x3y2z1a0b9c8d7e6f5g4h3i2j1k0l9m8n7o6p5q4r3s2t1u0v9w8x7y";
  const expiresIn = process.env.JWT_EXPIRES_IN || "1d";

  const token = sign(payload, secret, { expiresIn });
  return token;
};

export const decodeJwtToken = (token) => {
  const secret = process.env.JWT_SECRET;
  const decoded = verify(token, secret);
  return decoded;
};
