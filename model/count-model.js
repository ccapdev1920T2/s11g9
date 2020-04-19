const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

  const countSchema = new Schema({
    identity:{
      type: String
    },
    numberPost:{
        type: Number,
        required: [true, 'Required']
    },
  });

  countSchema.plugin(passportLocalMongoose);
  module.exports = mongoose.model('Count', countSchema);
