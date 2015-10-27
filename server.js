// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser");
var db = require("./models");

// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use(express.static("public"));
// body parser config to accept our datatypes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// routes:

app.get('/', function (req, res) {
	db.Library.find().exec(function(err, libraries) {
		res.render("library", { items : libraries });
	});
});

// SET UP POSTS:
// app.post('/users', function (req, res) {
	
// })

app.get('/api/libraries/:_id', function (req, res) {

	db.Library.findById(req.params._id, function(err, library) {
		if (err) {
			res.json(err);
		}
		console.log(library);
		res.json(library);
	});

});

app.post('/', function (req, res) {
	var newItem = req.body;
	items.push(newItem);
	res.status(200).json(newItem);
});

app.post('/api/libraries', function (req, res) {
	//create libraries in the database
	// libraries scheme information and and callback
	db.Library.create(req.body, function(err, library) {
		//if there is an error, send it as json
		if (err) {
			res.json(err);
		} else {
			//what to do when library is made:
			console.log(library);
			res.json(library);
		}
	});
});

app.listen(process.env.PORT || 3000, function (){
  console.log("listening on port 3000");
});