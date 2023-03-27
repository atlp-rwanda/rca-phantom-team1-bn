import "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import db from "./db/models/index.js";
import locales from "./config/languages";
import appRouter from "./api/routes/index.js";

const PORT = process.env.PORT || 5000;

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log(`Failed to sync db: ${err.message}`);
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
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/api/routes/*.js"],
  security: [{ bearerAuth: [] }],
};

const specs = swaggerJSDoc(options);

const app = express();
app.get("/", (_, res) => res.json({ message: "Welcome to Phantom API" }));

//testing multiple language support
app.get("/welcome", (_, res) =>
  res.send({ english: locales("home", "en"), kinyarwanda: locales("home") })
);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.db = db;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(appRouter);

// handling non existing routes
app.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
}

export default app;
