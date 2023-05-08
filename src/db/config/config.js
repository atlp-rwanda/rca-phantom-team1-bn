/* eslint-disable prettier/prettier */
import dotenv from "dotenv";

dotenv.config();

module.exports = {
  production: {
    url: process.env.PROD_DB_URL,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  development: {
    url: process.env.DB_URL,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    url: process.env.DB_TEST_URL,
    username: process.env.DB_TEST_USERNAME,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_TEST_HOST || "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
