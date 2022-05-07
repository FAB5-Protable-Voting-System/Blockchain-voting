const mongoose = require("mongoose");
const url = require("./configs/db.config").localUrl;
mongoose.Promise = global.Promise;
const db = mongoose.createConnection(url);
module.exports = db;
