const LocalStrategy = require('passport-local').Strategy;
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const User = require('../model/user-model');

module.exports = function(passport){
    
    passport.use(
        new LocalStrategy(function(username, password, done) {
            User.findOne({ username: username }, function (err, user) {
              if (err) { 
                  return done(err); 
                }
              if (!user) {
                console.log('Incorrect Username');
                return done(null, false, { message: 'Incorrect username.' });
              }
              if (!user.validPassword(password)) {
                console.log('Incorrect Password');
                return done(null, false, { message: 'Incorrect password.' });
              }
              return done(null, user);
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}