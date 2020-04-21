// const db = require('../model/db.js');
const Bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
var crypto = require('crypto');

const User = require('../model/user-model.js');
const Token = require('../model/token-model');

const registerController = {

    getRegistration: function (req, res) {
        res.render('registration',{});
    },

    postRegistration: function (req, res) {

        // First Validate The Request
 
        // Check if this user already exists
        let user = User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send('That user already exists!');
        }

        let pass = Bcrypt.hashSync(req.body.password,10);

        user = new User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: pass,
            userType: 'Regular'
        });
        user.save();
        console.log(user);
            
        // Create a verification token for this user
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        // Save the verification token
        token.save(function (err) {
            if (err) { 
                console.log(err) 
            }
            // Send the email
            var transporter = nodemailer.createTransport({ service:'Gmail', auth: { user: "bearapptester@gmail.com", pass: "STDA55_bear" } });
                
            var mailOptions = { from: 'bearapptester@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost:3000' + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { 
                    console.log(err) 
                }
                else{
                    console.log('Email has been sent');
                }
            });
        });  
        res.redirect('/');
    },

    getConfirmation: function(req,res){
        // Find a matching token
        Token.findOne({ token: req.params.token }, function (err, token) {
            if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
    
            // If we found a token, find a matching user
            User.findOne({ _id: token._userId}, function (err, user) {
                if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
                if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
    
                // Verify and save the user
                user.isVerified = true;
                user.save(function (err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }
                    res.status(200).send("The account has been verified. Please log in.");
                });
            });
        });
    }
}

module.exports = registerController;