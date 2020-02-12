
const express = require('express');
const router = express.Router();
const Song = require('../models/song');

  // load songs to ui
  router.post("", (req, res, next) => {
    
    const cat = req.body.category;
    console.log(`this is cat`+ cat);
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    let fetchedSongs;
    const songQuery = Song.find({"category": cat});
    
  
    if(pageSize && currentPage) {
       songQuery
       .skip(pageSize*(currentPage-1))
       .limit(pageSize);
    }
  
    songQuery.find().then(documents => {
      console.log(documents);
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

module.exports = router;