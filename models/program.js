
const Song = require('../models/song');
const mongoose = require('mongoose');

const programSchema = mongoose.Schema({
    title: {type:String, required: true},
    songs : {type:Array},
    creator: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Program', programSchema);