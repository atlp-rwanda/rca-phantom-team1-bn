import express from 'express'
const app = express()
const port = process.env.PORT || 3003

app.get('/', (req, res) => res.status(200).send( 'Welcome to Phantom' ));

app.listen(port, () => {
    console.info(`Server running on port ${port}`)
})