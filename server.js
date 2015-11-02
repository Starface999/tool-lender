// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser"),
    session = require('express-session');
var db = require("./models");
var User = require('./models/user.js');

// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use(express.static("public"));
// body parser config to accept our datatypes
app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: 'SuperSecretCookie',
	cookie: { maxAge : 600000 }
}));

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

app.post('/users', function (req, res) {
	var user = req.body;
	User.createSecure(user.email, user.password, function (err, user) {
		req.session.userId = user._id;
		req.session.user = user;
		res.json({ user : user, msg: "successfuly created user"});
	});
});

app.post('/login', function (req, res) {
	var user = req.body;
	User.authenticate(user.email, user.password, function (err, user) {
		if (err) { console.log("there was an error: ", err); }
		req.session.userId = user._id;
		req.session.user = user;
		res.json(user);
	});
});

app.get('/current-user', function (req, res) {
	res.json({ user : req.session.user });
});

app.get('/logout', function (req, res) {
	req.session.userId = null;
	req.session.user = null;

	res.json({ msg : 'user logged out' });
});

app.put('/libraries/:id', function (req, res) {
	var varFrom = req.body.from;
	var varTo = req.body.to;
	console.log(req.body);

	db.Library.findById(req.params.id).exec(function (err, newItem) {
		//use this code to clear dateRange:
		//newItem.dateRange = [];
		newItem.dateRange.push({ from : varFrom }, { to : varTo });
		newItem.save();
		console.log(newItem);
		res.send('updated!');
	});
});

app.listen(process.env.PORT || 3001, function (){
  console.log("listening on port 3001");
});