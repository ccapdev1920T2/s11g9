const express=require('express')
const hbs = require("hbs")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const moment = require('moment')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const app = express()
const port = 3000

mongoose.Promise = global.Promise;

//Models
let Post = require('./model/post-model');
let Token = require('./model/token-model');
let User = require('./model/user-model');
let Count = require('./model/count-model');


app.set('view engine', 'hbs')

hbs.registerPartials(__dirname + '/views/partials');
//static
app.use(express.static(__dirname + '/public'));
//body parser
app.use(bodyParser.urlencoded({ extended: true }));
//use sessions for tracking logins
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//passport configuration
passport.use(new LocalStrategy(
    // User.authenticate()
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            console.log('Incorrect Username');
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            console.log('Incorrect Password');
            return done(null, false, { message: 'Incorrect password.' });
          }
          if(!user.isVerified){
            console.log('Not Verified')
            return done(null, false, {message: 'Not Verified.'});
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

mongoose.connect('mongodb://localhost/nodekb', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

//check connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});

//check for db errors
db.on('error', function(err){
    console.log(err);
})

hbs.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
});

app.get('/', function(req,res){
    Post.find({}, function(err, posts){
        if(err){
            console.log(err);
        } else{
            if(req.user){
                res.render('index',{
                    UserLogged: req.user,
                    username: req.user.username,
                    firstName: req.user.firstName,
                    lastName: req.user.lastName, 
                    userType: req.user.userType,
                    email: req.user.email,
                    posts: posts
                })
            }
            else{
                res.render('index',{
                    UserLogged: req.user,
                    posts: posts
                })
            }
        }
    }).sort( { _id : -1 } ).limit(3);
})

app.post('/', function(req,res){

    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
        console.log('login successful');
        console.log(req.session.passport.user);
    });
})

app.get('/signup', function(req,res){
    res.render('registration',{})
})

app.post('/signup', function(req,res){
    // First Validate The Request
 
    // Check if this user already exists
    let user = User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('That user already exists!');
    } else {

        user = new User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            userType: 'Regular'
        });
        user.save();

        // Create a verification token for this user
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        // Save the verification token
        token.save(function (err) {
            if (err) { console.log(err) }
 
            // Send the email
            var transporter = nodemailer.createTransport({ service:'Gmail', auth: { user: "bearapptester@gmail.com", pass: "STDA55_bear" } });
            var mailOptions = { from: 'bearapptester@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost:3000' + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { console.log(err) }
                else{
                    console.log('Email has been sent');
                }
            });
        });

        res.redirect('/');
    }

})

app.get('/create_post', function(req,res){
    res.render('createpost',{})
})

app.post('/create_post', function(req,res){

    Count.findOneAndUpdate({identity: "counter"},{$inc: {numberPost: 1}},function(err,number){
        let post = new Post({
            postNumber: number.numberPost+1,
            username: req.session.passport.user,
            title: req.body.dtitle,
            postText: req.body.darticle,
            postDate: Date.now(),
            commentNumber: 0,
            reacts: 0,
        });
        post.save();
        console.log('Post Added');
        res.redirect('/viewall_post/');
    })

    // Post.countDocuments({}, function(err,count){
    //     let post = new Post({
    //         postNumber: count+1,
    //         username: req.session.passport.user,
    //         title: req.body.dtitle,
    //         postText: req.body.darticle,
    //         postDate: Date.now(),
    //         commentNumber: 0,
    //         reacts: 0,
    //     });
    //     post.save();
    //     console.log('Post Added');
    //     console.log(count+1);
    //     let number = count+1;
    //     res.redirect('/viewall_post/');
    // })
})

app.get('/viewall_post', function(req,res){
    Post.find({}, function(err, posts){
        if(err){
            console.log(err);
        } else{
            if(req.user){
                res.render('viewallpost',{
                    posts: posts,
                    UserLogged: true
                })
            }
            else{
                res.render('viewallpost',{
                    posts: posts,
                    UserLogged: false
                })
            }
            
        }
    });
})

hbs.registerHelper('memoryDateFormat', function(date) {
    return moment(date).format("DD-MMM-YYYY");
});

app.get('/post/:id', function(req,res){

    Post.findOne({postNumber: req.params.id })
    .populate('username')
    .exec(function(err,posts){
        if(err){
            console.log(err);
        } else{
            if(req.user){
                res.render('post',{
                    postNumber: posts.postNumber,
                    forumtitle: posts.title,
                    forumdate: posts.postDate,
                    forumauthor: posts.username.username,
                    forumpost: posts.postText,
                    forumreact: posts.reacts,
                    commentcount: posts.commentNumber,
                    username: req.user.username,
                    id: posts._id,
                    UserLogged: true,
                    comments: posts.comments
                });
            }
            else{
                res.render('post',{
                    forumtitle: posts.title,
                    forumdate: posts.postDate,
                    forumauthor: posts.username.username,
                    forumpost: posts.postText,
                    forumreact: posts.reacts,
                    commentcount: 2,
                    id: posts._id,
                    UserLogged: false,
                    comments: posts.comments
                });
            }
        }
    })
})

app.post('/search', function(req,res){
    var allposts = Post.find({}, function(err,docs){
        if(err){
            console.log(err);
        }
    })

    allposts.find({title: {$regex: req.body.search, $options: "i"}}, function(err,docs){
        if(req.user){
            res.render('viewallpost',{
                posts: docs,
                UserLogged: true
            })
        }
        else{
            res.render('viewallpost',{
                posts: docs,
                UserLogged: false
            })
        }
    })
})

app.post('/comment/:id', function(req,res){

    console.log(req.session.passport.user);

    var objComment = {
        postNumber: req.params.id,
        username: req.user.username,
        commentText: req.body.newcom,
        reacts: 0
    };

    Post.findOne({postNumber: req.params.id}, function(err,doc){
        if(err){
            console.log(err);
        }
        
        doc.comments.push(objComment);
        console.log('Comment Posted');
        doc.save();
        res.redirect('/post/'+req.params.id);
    });

})

app.get('/editpost/:id', function(req,res){
    Post.findOne({_id:req.params.id}, function(err,doc){
        res.render('editpost',{
            title: doc.title,
            postText: doc.postText,
            id: req.params.id
        });
    })
})

app.post('/editpost/:id', function(req,res){
    Post.findOneAndUpdate({ _id: req.params.id}, {
        title: req.body.dtitle,
        postText: req.body.darticle,
    }, function(err,found){
        if(err){
            console.log(err);
        }
        else{
            console.log('Post Updated');
            res.redirect('/viewall_post');
        }
    })
})

app.get('/deletepost/:id', function(req,res){
    Post.findOneAndDelete({postNumber: req.params.id}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Post Deleted");
            res.redirect('/viewall_post');
        }
    })
})

app.get('/deletecomment/:id/:text', function(req,res){
    Post.findOne({postNumber: req.params.id}, function(err, doc){
        if(err){
            console.log(err)
        }
        doc.comments.pull({_id: req.params.text});
        doc.save();
        res.redirect('/post/'+req.params.id);
    })
})

app.get('/editprofile', function(req,res){
    res.render('editprofile',{
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        password: req.user.password
    })
})

app.post('/editprofile', function(req,res){

        User.findOneAndUpdate({_id: req.session.passport.user},{
                _id: req.session.passport.user,
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                username: req.user.username,
                password: req.body.password,
                userType: req.user.userType,
        },{upsert:true, new:true}, function(err, found){
            if(err){
                console.log(err);
            }
            else{
                console.log('User Updated');
                res.redirect('/');
            }
        })
    //username update on all posts containing previous username
})

app.get('/adminpromotion', function(req,res){
    User.find({userType: "Regular"}, function(err, users){
        if(err){
            console.log(err);
        } else{
            res.render('adminpromotion',{
                users: users
            })
        }
    })
})

app.post('/adminpromotion', function(req,res){
    User.findOneAndUpdate({username: req.body.admin}, {
        userType: "Admin"
    }, function(err,found){
        if(err){
            console.log(err);
        }
        else{
            console.log('User is an Admin');
            res.redirect('/adminpromotion');
        }
    })
})

app.post('/resignadmin', function(req,res){
    User.findOneAndUpdate({_id: req.session.passport.user}, {
        userType: "Regular"
    }, function(err,found){
        if(err){
            console.log(err);
        }
        else{
            console.log('User is a Regular');
            res.redirect('/');
        }
    })
})

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.get('/confirmation/:token', function(req,res){
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
});

app.listen(port, function(){
    console.log('App listening at port ' + port)
})
