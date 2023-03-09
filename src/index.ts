import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import low from 'lowdb'
import swaggerUI from 'swagger-ui-express'
// import busRouter from './api/routes/bus.routes'
import path from 'path'
import swaggerJsdoc from 'swagger-jsdoc'

const PORT = process.env.PORT || 4000

// import FileSync from 'lowdb/adapters/FileSync'

// const adapter = new FileSync('db.json')
// const db = low(adapter)
// db.defaults({ buses: [] }).write()

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
    swaggerFile: path.join(__dirname, './src/api/config/swagger.json')
}

const specs = swaggerJsdoc(swaggerOptions)


const app = express() 

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs)) 

// app.db = db 

app.use(cors()) 
app.use(express.json()) 
app.use(morgan('dev')) 

// app.use('busses', busRouter) 

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`)) 
