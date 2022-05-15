const DB_URL = require("../config/db.config");
const mongoose = require("mongoose");
const db = {
  mongoose,
  url: DB_URL,
  Artist: require("./artist.model")(mongoose),
  Genre: require("./genre.model")(mongoose),
  User: require("./user.model")(mongoose),
  Movie: require("./movie.model")(mongoose),
};

module.exports = db;