const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js');

const registerController = require('../controller/registerController.js');

const postController = require('../controller/postController.js');

const userController = require('../controller/userController.js');

// const passport = require('../helpers/passport.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);

// app.get('/', controller.getIndex);

app.get('/', userController.getUser);

app.post('/', userController.login);

app.get('/signup', registerController.getRegistration);

app.post('/signup', registerController.postRegistration);

app.get('/confirmation/:token', registerController.getConfirmation);

app.get('/logout', userController.logout);

app.get('/create_post', postController.getCreatePost);

app.get('/editprofile', userController.getEditProfile);

app.get('/adminpromotion', userController.getEditAdmin);

app.post('/adminpromotion', userController.postEditAdmin);

app.post('/resignadmin', userController.postResignAdmin);

app.post('/create_post', postController.postCreatePost);

app.get('/viewall_post', postController.viewAllPost);

app.post('/editprofile', userController.postEditProfile);

app.get('/post/:id', postController.viewPost);

app.post('/search',postController.search);

app.post('/comment/:id',postController.postComment);

app.get('/editpost/:id',postController.getEditPost);

app.post('/editpost/:id',postController.postEditPost);

app.get('/deletepost/:id',postController.getDeletePost);

app.get('/deletecomment/:id/:text', postController.getDeleteComment);

app.get('/getUsername', userController.getUsername);

module.exports = app;