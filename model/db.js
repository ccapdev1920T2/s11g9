const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/nodekb';

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const database = {
    connect: function () {
        mongoose.connect(url, options, function(error) {
            if(error) throw error;
            console.log('Connected to: ' + url);
        });
    }
}

module.exports = database;