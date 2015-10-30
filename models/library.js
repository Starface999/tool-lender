var mongoose = require('mongoose');

var LibrarySchema = mongoose.Schema({
	//this is where form names will be:
	itemName : String,
	imgUrl : String,
	dateRange : [],
	locationRoom : String,
	locationDescription : String,
	useInstructions : String,
	tags: []
});

var Library = mongoose.model('Library', LibrarySchema);

module.exports = Library;