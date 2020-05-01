const express=require('express')
const hbs = require("hbs")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const moment = require('moment')
var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var crypto = require('crypto');
// var nodemailer = require('nodemailer');
// const Bcrypt = require("bcryptjs");

const routes = require('./routes/routes.js');

const db = require('./model/db.js');

const app = express()
// const port = 3000
const port = process.env.PORT || 3000;

// passport configuration
require('./helpers/passport')(passport);

mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true)

app.set('view engine', 'hbs')

hbs.registerPartials(__dirname + '/views/partials');

// use sessions for tracking logins
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

hbs.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
});

hbs.registerHelper('memoryDateFormat', function(date) {
    return moment(date).format("DD-MMM-YYYY");
});

//static
app.use(express.static(__dirname + '/public'));
//body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

db.connect();

app.listen(port, function(){
    console.log('App listening at port ' + port)
})
