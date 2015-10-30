var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10);

var UserSchema = new Schema ({
	email: String,
	passwordDigest: String
});

// create a new user with secure (hashed) password
UserSchema.statics.createSecure = function (email, password, callback) {
// `this` references our User model
// store it in variable `UserModel` because `this` changes context in nested callbacks

var user = this;

// hash password user enters at sign up
  bcrypt.genSalt(function (err, salt) {
    console.log('salt: ', salt);  // changes every time
    bcrypt.hash(password, salt, function (err, hash) {
		console.log(hash);

      // create the new user (save to db) with hashed password
      user.create({
        email: email,
        passwordDigest: hash
      }, callback);
    });
  });
};

// authenticate user (when user logs in)
UserSchema.statics.authenticate = function (email, password, callback) {
 // find user by email entered at log in
 this.findOne({email: email}, function (err, user) {
   console.log(user);

   // throw error if can't find user
   if (!user) {
     callback('No user with email ' + email, null);  // better error structures are available, but a string is good enough for now
   // if we found a user, check if password is correct
   alert("incorrect username or password!");
   } else if (user.checkPassword(password)) {
     callback(null, user);
   } else {
     callback("Error: incorrect password", null);
   }
 });
};

// compare password user enters with hashed password (`passwordDigest`)
UserSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password user enters in order to compare with `passwordDigest`
  return bcrypt.compareSync(password, this.passwordDigest);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;