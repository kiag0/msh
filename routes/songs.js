
/*
  # all routes for song manipulation
*/


const express = require('express');
const router = express.Router();
//hymn model
const Song = require('../models/song'); 
// middleware to check authentication
const CheckAuth = require('../middleware/check-auth');


// add song to db
router.post("",CheckAuth, (req, res, next) => {
    console.log(req.body);
    const song = new Song({
      title: req.body.title,
      category: req.body.category,
      stanzas:req.body.stanzas,
      chorus:req.body.chorus,
      author:req.body.author,
      creator: req.userData.userId
  
    });
    song.save().then(createdSong => {
      res.status(201).json({
        message: "song added successfully",
        songId: createdSong._id
      });
    });
  });
  
  // load songs to ui
  router.get("", (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    let fetchedSongs;
    const songQuery = Song.find();
  
    if(pageSize && currentPage) {
      songQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize);
    }
  
    songQuery.find().then(documents => {
      fetchedSongs = documents;
      return Song.count()
    })
      .then(count => {
        res.status(200).json({
          message: "songs fetched successfully!",
          songs: fetchedSongs,
          maxSongs: count
        });
      });
  });
  
  //edit song
  router.put('/:id', CheckAuth,(req, res, next) => {
    
    const song = req.body;
    console.log (" => " + JSON.stringify(req.body));
    song._id = req.params.id;
    Song.updateOne({_id: req.params.id}, song)
    .then(result => {
       console.log(result);
       if(result.nModified > 0){
        res.status(201).json({
          message: "Edit Successful",
          status: true
        });
       }

       res.status(200).json({
         message: "Edit Not Successful. Try again later",
         status: false
       })
       
    })
    .catch(err => {
      console.log(err);
    })
  });
  
  //delete given song
  router.delete("/:id",CheckAuth, (req, res, next) => {
    Song.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
      if (result.n > 0 ){
        res.status(201).json({ message: "Hymn deleted!" });
      } else {
        res.status(401).json({ message: "You can not delete this hymn" });
      }
     
    });
  });

  // get songs on given category


module.exports = router;