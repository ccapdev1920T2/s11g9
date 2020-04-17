const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {
        type : String,
        required: [true, 'Required']
    },
    password: {
        type : String,
        required: [true, 'Required']
    },
    firstName: {
        type : String,
        required: [true, 'Required']
    },
    lastName: {
        type : String,
        required: [true, 'Required']
    },
    email: {
        type : String,
        unique: true,
        required: [true, 'Required']
    },
    userType: {
        type : String,
        enum: ['Regular', 'Admin'],
        default: 'Regular'
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    }
  });

userSchema.plugin(passportLocalMongoose);
userSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};


module.exports = mongoose.model('User', userSchema);
