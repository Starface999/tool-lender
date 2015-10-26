var mongoose = require('mongoose');

var LibrarySchema = mongoose.Schema({
	//this is where form names will be:
	itemName : String,
	imgUrl : String,
	dateRange : [{from: String, to: String}],
	locationRoom : String,
	locationDescription : String,
	useInstructions : String
});

var Library = mongoose.model('Library', LibrarySchema);

module.exports = Library;