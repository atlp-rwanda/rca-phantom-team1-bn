const en = require("./en");
const rw = require("./rw");

const translates = {
  en,
  rw,
};

const locales = (key, locale = "rw") => {
  if (!translates[locale]) {
    throw new Error("Locale doesn't exist");
  }

  if (!translates[locale][key]) {
    throw new Error(`Translation for ${key} doesn't exist`);
  }

  return translates[locale][key];
};

module.exports = locales;
