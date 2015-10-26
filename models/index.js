var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tool-lender");

module.exports.Library = require("./library.js");