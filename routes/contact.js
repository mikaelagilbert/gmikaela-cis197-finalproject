var express = require('express');
var router = express.Router();
var usersDb = require('../db/user');

//view all contacts
router.get('/contacts', function (req, res, next) {
  usersDb.find({ username: req.params.username}, function (e, user) {
    if (e) throw e;
    res.render('allContacts', { contacts: user.contacts });
  });
});

//add a contact
router.get('/contacts/new', function (req, res, next) {
  res.render('newContact');
})

module.exports = router;
