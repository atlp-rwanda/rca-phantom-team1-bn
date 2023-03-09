import express from 'express'
import 'dotenv/config'
import { PORT } from './config/dotenv'
const app = express()
const port = PORT

const normalResponse = {
    msg: 'Welcome to Phantom API'
}
const exceptionalResponse= {
    msg: 'Wow! you\'re a deep digger'
}
app.use('/', (req, res) => {
    res.json(normalResponse)
})

app.use('*', (req, res) => {
    
    res.json(exceptionalResponse)
})

app.listen(port, () => {
    console.info('API server is 🏃🏃 on'+port)
})