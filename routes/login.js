var express = require('express');
var router = express.Router();
var usersDb = require('../db/user');

// Provided - do not modify
var credentialsAreValid = function (username, password) {
  usersDb.find({ username: username}, function(e, user) {
    if (e) throw e; //do i need this??
    return user.password === password;
  });
};

//The login routes
router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res) {
  username = req.body.username;
  password = req.body.password;
  
  usersDb.findOne({ username: username }, function (err, user) {
    user.checkPassword(password, function(err, isRight) {
      if (isRight) {
        req.session.username = username;
        req.session.isAuthenticated = true;
        res.redirect('/');
      } else {
        res.redirect('/login');
      }
    });
  });
});


//The signup routes
router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.post('/signup', function (req, res) {
  userData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    name: req.body.name
  };

  usersDb.createUser(userData, function (err) {
    if (err) {
      redirect('/signup');
    } else {
      redirect('/users/' + userData.username);
    }
  });

});

module.exports = router;