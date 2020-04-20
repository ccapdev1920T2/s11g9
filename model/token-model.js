const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const tokenSchema = new mongoose.Schema({
    _userId: { type: String, required: true, sparse: true},
    username:{type: String, sparse: true},
    token: { type: String, required: true},
    createdAt: { type: Date, required: true, default: Date.now }
});

tokenSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Token', tokenSchema);