import dotenv from "dotenv";

dotenv.config();

export default {
  development: {
    url: process.env.DB_URL,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
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
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
