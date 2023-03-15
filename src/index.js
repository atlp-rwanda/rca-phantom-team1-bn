import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express'
import { PORT } from './config/dotenv'
import busesRouter from './api/routes/buses.routes'
import db from './db/models/index.js';

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Phantom API",
			version: "1.0.0",
			description: "Phantom API",
		},
		servers: [
			{
				url: "http://localhost:"+PORT,
			},
		],
	},
	apis: ["./src/api/routes/*.js"],
};

const specs = swaggerJSDoc(options)

const app = express()
app.get('/', (_,res) => res.json({message: 'Welcome to Phantom API'}))

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.db = db

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/buses', busesRouter)

app.listen(PORT ? PORT : 5000, () => console.log(`The server is running on port ${(PORT) ? PORT : 5000}`))
