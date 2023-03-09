import path from 'path'
import dotenv from 'dotenv'

const env: string = process.env.NODE_ENV || 'development'
const envPath = path.join(__dirname, `../../.${'env.'+env}`)
dotenv.config({path: envPath})

export const {
    PORT
} = process.env
