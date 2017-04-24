var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cis197hw6', function (err) {
  if (err && err.message.includes('ECONNREFUSED')) {
    console.log('Error connecting to mongodb database: %s.\nIs "mongod" running?', err.message);
    process.exit(0);
  } else if (err) {
    throw err;
  } else {
    console.log('DB successfully connected. Adding seed data...');
  }
});
var bcrypt = require('bcrypt');

var db = mongoose.connection;

var userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: String,
  job_title: String,
  contacts: Array,
  created_at: Date,
  updated_at: Date
});

userSchema.pre('save', function(next) {
  var user = this;

  //if (!user.isModified('password')) return next(); //do i have an isModified function?

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});
//what methods do I need for a user?

var User = mongoose.model('User', userSchema);

module.exports = {
  User: User,
  mongoose: mongoose,
  db: db.collection('Users')
};
