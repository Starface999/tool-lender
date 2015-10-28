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

app.post('/libraries', function (req, res) {
	console.log(req.body);
	db.Library.create(req.body, function (err, newItem) {
		if (err) {
			console.log(newItem);
			res.send(403, err);
		} else {
			console.log(newItem);
			res.send(201, { newItem : newItem });
		}

	});
});

app.delete('/libraries/:id', function (req, res) {
	db.Library.findById(req.params.id).exec(function (err, newItem) {
		newItem.remove();
		res.status(200).json({});
	});
});

app.put('/libraries/:id', function (req, res) {
	db.Library.findById(req.params.id).exec(function (err, newItem) {
		var varFrom = req.body.from;
		var varTo = req.body.to;
		newItem.update({ dateRange : [{ from : varFrom }, { to : varTo }] });
	});
});

app.listen(process.env.PORT || 3000, function (){
  console.log("listening on port 3000");
});