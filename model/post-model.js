const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

  const postSchema = new Schema({
    postNumber:{
        type: Number,
        unique: true,
        required: [true, 'Required']
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Required']
    },
    title: {
        type : String,
        required: [true, 'Required']
    },
    postText: {
        type: String,
        required: [true, 'Required']
    },
    postDate: {
        type : Date,
        required: [true, 'Required']
    },
    commentNumber:{
        type: Number,
        required: [true, 'Required'],
        default: 0
    },
    comments:[{ 
        postNumber: {type: Number, required: [true,'Required']},       
        username: {type: String, required: [true,'Required']},
        commentText: {type: String, required: [true,'Required']}    
    }]
  });

  postSchema.plugin(passportLocalMongoose);
  module.exports = mongoose.model('Post',postSchema);
