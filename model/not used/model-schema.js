const mongoose = require('mongoose');

var Schema = mongoose.Schema;
  const postSchema = new Schema({
    postNumber:{
        type: Number,
        unique: true,
        required: [true, 'Required']
    },
    username: {
        type : String,
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
        type : { type: Date, default: Date.now() }
    },
    likes:{
        type: Number
    },
    status:{
        type: String,
        enum: ['Pending','Approved']
    },
    photo:{
        type: String,
        required: [true, 'Required']
    }
  });
  
  var Post = module.exports = mongoose.model('Post',postSchema);