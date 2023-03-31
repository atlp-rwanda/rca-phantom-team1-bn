import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || "development";
const envPath = path.join(
  __dirname,
  `../../.${env === "development" ? "env" : `env.${env}`}`
);
dotenv.config({ path: envPath });

export const { PORT } = process.env || 5000;
