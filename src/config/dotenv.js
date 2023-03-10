const dotenv = require('dotenv')
const path = require('path')

const env = process.env.NODE_ENV || 'development'
const envPath = path.join(__dirname, `../../.${(env === 'development') ? 'env' : 'env.'+env}`)
dotenv.config({path: envPath})

const { PORT } = process.env

module.exports = {PORT}
