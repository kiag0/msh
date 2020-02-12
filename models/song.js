/*
    # song model
    # use to create new song in db
*/



const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    title: {type:String, required: true},
    category : {type:String},
    chorus : {},
    stanzas: {type: Array},
    staticUrl: {},
    author: {},
    creator: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Song', songSchema);