<<<<<<< HEAD
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const busesRouter = require("./api/routes/buses.routes");
=======
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const low = require('lowdb')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const busesRouter = require('./api/routes/buses.routes')
const { PORT } = require('./config/dotenv')
>>>>>>> bd31f7dd1b5cc506ff7d8eccd7a550c74bf43701

const FileSync = require('lowdb/adapters/FileSync')

<<<<<<< HEAD
const db = require("./db/models/index.js");
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
=======
const adapter = new FileSync('src/config/db.json')
const db = low(adapter)

db.defaults({ buses: [] }).write()

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Phantom API',
            version: '1.0.0',
            description: 'Phantom API',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./src/api/routes/*.js'],
}
>>>>>>> bd31f7dd1b5cc506ff7d8eccd7a550c74bf43701

const specs = swaggerJsDoc(options)

const app = express()
app.get('/', (_,res) => res.json({message: 'Welcome to Phantom API'}))

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.db = db

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/buses', busesRouter)

app.listen(PORT, () => console.log(`The server is running on port ${(PORT) ? PORT : 5000}`))
