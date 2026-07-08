const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
DB_URL = process.env.DB_URL;
const connection = mongoose.connect(DB_URL);

module.exports = connection;
