

//hymn model
const Song = require('../models/song');
const express = require('express');
const router = express.Router();

router.get('', (req, res, next) => {
    console.log('search route hit')
});

router.post('', (req,res,next) => {
    var zong;
    console.log(req.body);
    Song.find(
        { $text: { $search: req.body.word } },
        { score: { $meta: "textScore" } }
    )
    .sort( { score: { $meta: "textScore" } } )
    .limit(6)
    .then((songs) => {
        //no song(s) found
        if(!songs) {
            console.log('no songs found!');
            return res.status(401).json({
                message: "no song found"
            });
        }
        let x = [];
        x.push(songs);
        res.status(201).json({
            message: songs
        })
        console.log('result from finding song '+songs)
    }). catch ( (err) => {
        console.log('error in finding song' + err);
        res.status(500).json({
            message : `Error occured`
         })
    });
});

module.exports = router;