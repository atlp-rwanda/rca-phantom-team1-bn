import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: process.env.DB_TEST_USERNAME,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_TEST_HOST,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    }
  }
};
