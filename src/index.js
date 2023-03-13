const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const FileSync = require("lowdb/adapters/FileSync");
const busesRouter = require("./api/routes/buses.routes");
const { PORT } = require("./config/dotenv");

const adapter = new FileSync("src/config/db.json");
const db = low(adapter);

db.defaults({ buses: [] }).write();

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
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/api/routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();
app.get("/", (_, res) => res.json({ message: "Welcome to Phantom API" }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.db = db;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/buses", busesRouter);

app.listen(PORT, () =>
  console.log(`The server is running on port ${PORT || 5000}`)
);
