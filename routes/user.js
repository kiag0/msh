

/*
    routes for creation and logging in users
*/


const express = require("express");
const router = express.Router();
const cryptor = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/signup", (req,res,next) =>{
    //create hash from user password
    cryptor.hash(req.body.password,3)
    .then(hash => {

        generateCode = function(){
            let theCode;
            var fullNumber = [];
            var digit1 = Math.floor(Math.random() * 9) + 1;
            var digit2 = Math.floor(Math.random() * 9) + 1;
            var digit3 = Math.floor(Math.random() * 9) + 1;
            var digit4 = Math.floor(Math.random() * 9) + 1;
            fullNumber.push(digit1, digit2, digit3, digit4);
            return fullNumber.join("") ;
          }
          let otp = generateCode();
        const user = new User({
            phone: req.body.phone,
            password: hash,
            OTP: otp
        });
        //save user in db
        user.save()
        .then(finish =>{
            res.status(201).json({
                message: "account created",
                result: finish
            });
        }) .catch(err=>{
                res.status(500).json({
                    message : `Failed to register. Try again.`
            })
        });
    })


});


router.post("/login",(req,res,next) => {
    var uzer; 
    // check if user exixts
    User.findOne({phone: req.body.phone}).then(user=>{
        if(!user){
            return res.status(401).json({
                message: "Incorrect credentials!"
            });
        } 
        uzer = user;
        //compare password to hash using bcrypt
        return cryptor.compare(req.body.password, user.password);
    })
    .then(result=>{
        //no user
        if(!result){
            return res.status(401).json({
                message: "Incorrect credentials!"
            });
        }
        
        //by here, the user exists
        //create json web token
        const token = jwt.sign({phone: uzer.phone, userId : uzer._id},
            "vale", //secret that is checked by the SPA (angular app and mobile app to verify request authorization & validity)
            {expiresIn: "100000h"} // duration till expiration
            );
            res.status(200).json({
                message:"Login successful",
                token:token,
                expiresIn:3600000,
                userId: uzer._id
            });

    })
    .catch(err=>{
        console.log("this is err" + err);
        return res.status(401).json({ 
            message : `login failed. `
        });
    });
});


  

module.exports = router;