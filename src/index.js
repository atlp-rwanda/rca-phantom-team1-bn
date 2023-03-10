const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const low = require('lowdb');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const busesRouter = require('./api/routes/buses.routes');
const i18next = require('i18next');
const Backend = require('i18next-node-fs-backend');
const i18nextMiddleware = require('i18next-express-middleware');
const FileSync = require('lowdb/adapters/FileSync');

const PORT = process.env.PORT || 5000;

const adapter = new FileSync('src/config/db.json');
const db = low(adapter);

db.defaults({ buses: [] }).write();

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie'],
    },
    fallbackLng: 'en',
    preload: ['en', 'ru'],
  });

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
};

const specs = swaggerJsDoc(options);

const app = express();
app.get('/', (_, res) => res.json({ message: 'Welcome to Phantom API' }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.db = db;

app.use(cors());
app.use(express.json());
app.use(i18nextMiddleware.handle(i18next));
app.use(morgan('dev'));

app.use('/buses', busesRouter);

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
