import express from 'express'
import * as swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import path from 'path'
// import usersRouter from './routes/users.route'

const app = express()
const port = process.env.PORT || 3003

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Phantom API',
            version: '1.0.0',
            description: 'Phantom Swagger API documentation.'
        },
        basePath: '/',
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    in: 'header',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/routes/*.js'],
    // Updated path for swagger.json
    swaggerFile: path.join(__dirname, './src/config/swagger.json')
}

const specs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.get('/', (req, res) => res.status(200).send('Welcome to Phantom'))

// app.use('/users', usersRouter)

app.listen(port, () => {
    console.info(`Server running on port ${port}`)
})