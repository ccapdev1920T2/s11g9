// const db = require('../model/db.js');

const Post = require('../model/post-model.js');
const Count = require('../model/count-model');

const postController ={
    
    getCreatePost : function(req,res){
        res.render('createpost',{});
    },

    postCreatePost : function(req,res){
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
    },
    viewAllPost : function(req,res){
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
    },

    viewPost : function(req,res){

        Post.findOne({postNumber: req.params.id })
        .populate('username')
        .exec(function(err,posts){
            if(err){
                return res.render('error');
                // console.log(err);
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
                        commentcount: posts.commentNumber,
                        id: posts._id,
                        UserLogged: false,
                        comments: posts.comments
                    });
                }
            }
        })
    },

    search : function(req,res){
        var allposts = Post.find({}, function(err,docs){
            if(err){
                return res.render('error');
                // console.log(err);
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
    },

    postComment: function(req,res){

        console.log(req.session.passport.user);
    
        var objComment = {
            postNumber: req.params.id,
            username: req.user.username,
            commentText: req.body.newcom
        };
    
        Post.findOneAndUpdate({postNumber: req.params.id}, {$inc: {commentNumber: 1}} ,function(err,doc){
            if(err){
                return res.render('error');
                // console.log(err);
            }
            
            doc.comments.push(objComment);
            console.log('Comment Posted');
            doc.save();
            res.redirect('/post/'+req.params.id);
        });
    
    },

    getEditPost: function(req,res){
        Post.findOne({_id:req.params.id}, function(err,doc){
            res.render('editpost',{
                title: doc.title,
                postText: doc.postText,
                id: req.params.id
            });
        })
    },

    postEditPost: function(req,res){
        Post.findOneAndUpdate({ _id: req.params.id}, {
            title: req.body.dtitle,
            postText: req.body.darticle,
        }, function(err,found){
            if(err){
                return res.render('error');
                // console.log(err);
            }
            else{
                console.log('Post Updated');
                res.redirect('/viewall_post');
            }
        })
    },

    getDeletePost: function(req,res){
        Post.findOneAndDelete({postNumber: req.params.id}, function(err){
            if(err){
                return res.render('error');
                // console.log(err);
            }
            else{
                console.log("Post Deleted");
                res.redirect('/viewall_post');
            }
        })
    },

    getDeleteComment: function(req,res){
        Post.findOneAndUpdate({postNumber: req.params.id},{$inc: {commentNumber: -1}} ,function(err, doc){
            if(err){
                return res.render('error');
                // console.log(err)
            }
            doc.comments.pull({_id: req.params.text});
            console.log('Comment Deleted');
            doc.save();
            res.redirect('/post/'+req.params.id);
        })
    }
}

module.exports = postController;
