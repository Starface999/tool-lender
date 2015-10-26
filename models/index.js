var mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/tool-lender' // plug in the db name you've been using
);

module.exports.Library = require("./library.js");