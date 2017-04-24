var express = require('express');
var app = express();
var uuid = require('node-uuid');
var login = require('./routes/login');
var user = require('./routes/user');
var contact = require('./routes/contact');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var isAuthenticated = require('./middlewares/isAuthenticated');



// Serve static pages
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index');
});

// Generate a random cookie secret for this app
var generateCookieSecret = function () {
  return 'iamasecret' + uuid.v4();
};

app.use(cookieSession({
  name: 'session',
  secret: generateCookieSecret()
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use('/login', login);
app.use('/signup', login);
app.use('/user', isAuthenticated, user);
app.use('/contacts', isAuthenticated, contact);
module.exports = app;
