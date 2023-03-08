import express from 'express';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-express-middleware';
import Backend from 'i18next-node-fs-backend';

const app = express();
const port = process.env.PORT || 3003;

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

const normalResponse = {
  msg: 'App running.',
};
const exceptionalResponse = {
  msg: "Wow! you're a deep digger",
};

app.use('/', (req, res) => {
  res.json(normalResponse);
});

app.use('*', (req, res) => {
  res.json(exceptionalResponse);
});
app.use(i18nextMiddleware.handle(i18next));
app.listen(port, () => {
  console.info(port);
});
