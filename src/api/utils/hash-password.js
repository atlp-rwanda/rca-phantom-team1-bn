import { hash, compare } from "bcrypt";

export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
};

export const verifyPassword = async (password, hashedPassword) => {
  const passwordMatch = await compare(password, hashedPassword);
  return passwordMatch;
};
