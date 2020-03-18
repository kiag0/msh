
// middleware to check authentication
const CheckAuth = require('../middleware/check-auth');
//prog model
const Program = require('../models/program');
const Song = require('../models/song');
const express = require('express');
const router = express.Router();


router.get('', (req, res, next) => {
    let fetchedProgs;
    Program.find()
    .then(documents => {
        res.status(200).json({
            programs: documents
        })
    })
    .catch( err => {
        res.status(401).json({
            programs: documents,
            message: 'We experienced an error'
        }) 
    })
}); 


  // add prog to db
  router.post("",CheckAuth, (req, res, next) => {
    const prog = new Program({
      title: req.body.title,
      songs: req.body.songs,
      creator: req.userData.userId
    });
    prog.save().then(createdProg => {
      res.status(201).json({
        message: "song added successfully",
        progId: createdProg._id
      });
    });
  });
  
  //edit program
  router.put("/:id",CheckAuth, (req, res, next) => {
    const newProgram = req.body;
    // Program.findOne({ _id: "5da98d6757b9fa16ac937415"})
    // Song.findOne({_id: req.params.id})

    // .then(result => {
    //    console.log(result);
    // })
    // .catch(err => {
    //   console.log(err);
    // });
    
    Program.updateOne({_id: req.params.id, creator: req.userData.userId  }, newProgram)
    .then(result => {
       console.log(result);
       res.status(200).json({message: "true"});
    })
    .catch(err => {
      res.status(502).json({message: "Server Error"});
    });

  });
  
  //delete given song
  router.delete("/:id",CheckAuth, (req, res, next) => {
    Program.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
      console.log(result);   

        if (result.n > 0 ){
        res.status(200).json({ message: "Program deleted!", status: true });
      	} else {
        res.status(401).json({ message: "You do not have permission to delete this Program", status: false });
      }
    });
  });

module.exports = router;

