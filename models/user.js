
/*
    # user model
    # use to create new user in db
*/


const mongoose = require('mongoose');
const uniqueVal = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  
phone : {type:String, required: true, unique: true},
password : {type:String, required: true}

});

userSchema.plugin(uniqueVal);

module.exports = mongoose.model('User', userSchema);