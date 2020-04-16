const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

  const commentSchema = new Schema({
    commentID:{
        type: Schema.Types.ObjectId,
        unique: true,
        required: [true,'Required']
    },
    postNumber:{
      type: Number,
      required: [true, 'Required']
    },
    username:{
        type: String,
        required: [true,'Required']
    },
    commentText: {
        type: String,
        required: [true,'Required']
    },
    reacts:{
        type: Number,
        default: 0,
        required: [true,'Required']
    }
  });

commentSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Comment',commentSchema);