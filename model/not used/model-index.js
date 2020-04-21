const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/s11g9db",{ useNewUrlParser: true, useUnifiedTopology: true },function(error){
    if (!error){
        console.log("Success in connecting");
    }
    else{
        console.log("Error Connecting.");
    }
});

const database = require("./model-schema");