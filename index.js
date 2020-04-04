const express=require('express')
const hbs = require("hbs")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const app = express()
const port = 3000

mongoose.Promise = global.Promise;

//Models
let Post = require('./model/post-model');
let Comment = require('./model/comment-model');
let User = require('./model/user-model');


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
          return done(null, user);
        });
    }
));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
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
    console.log('click');
    console.log(req.body.username);
    console.log(req.body.password);
    passport.authenticate('local')(req, res, function () {
        res.redirect('/?' + req.user.username);
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
    console.log(req.body.email);
    // if (user) {
    //     return res.status(400).send('That user already exists!');
    // } else {
        // Insert the new user if they do not exist yet
        user = new User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            userType: 'Regular'
        });
        user.save();
        console.log(user);

    // }

})

app.get('/create_post', function(req,res){
    res.render('createpost',{})
})

app.post('/create_post', function(req,res){
    //add post to db
})

app.get('/viewall_post', function(req,res){
    Post.find({}, function(err, posts){
        if(err){
            console.log(err);
        } else{
            res.render('viewallpost',{
                posts: posts
            })
        }
    });
})

app.get('/post/:id', function(req,res){

    Post.findOne({postNumber: req.params.id })
    .populate('username')
    .exec(function(err,posts){
        if(err){
            console.log(err);
        } else{
            console.log(posts.comments);
            res.render('post',{
                forumtitle: posts.title,
                forumdate: posts.postDate,
                forumauthor: posts.username.username,
                forumpost: posts.postText,
                forumreact: posts.like,
                commentcount: 2,
                comments: posts.comments
            });
        }
    })
})

app.get('/editprofile', function(req,res){
    res.render('editprofile',{})
})

app.listen(port, function(){
    console.log('App listening at port ' + port)
})
