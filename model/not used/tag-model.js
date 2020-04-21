const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const tagSchema = new Schema({
    tagID:{
        type: Schema.Types.ObjectId,
        unique: true,
        required: [true,'Required']
    },
    tag:{
        type: String,
        required: [true,'Required']
    }
  });

tagSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Tag',tagSchema);