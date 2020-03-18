const express = require("express");
const router = express.Router();
const cryptor = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const axios = require('axios');
const options = {
    apiKey: '69264f5935dcc796bdc06522cd577a7508bd537692b59a8c1713a43e5966b129',         // use your sandbox app API key for development in the test environment
    username: 'morningstarhymnal',      // use 'sandbox' for development in the test environment
};
const AfricasTalking = require('africastalking')(options);


router.post('/generateOTP',(req,res,next) => {
   
        //find user in db
        
            User.findOne({phone:req.body.phone})
            .then(response =>{
                console.log(response);
                if(response === null) {
                    res.status(200).json({
                        message:"User not found. Register New Account",
                        status: false,
                        userFound: false
                    })
                }
                //-------here user is found--------------
                //-------go ahead and send the otp-------
                    //format phone
                    let x,y;
                    x = response.phone.substring(1);
                    y = "+254"+x;
                    
                   

                     // Initialize a service e.g. SMS
                    //sms = africastalking.SMS
                    sms = AfricasTalking.SMS;

    
    
                    // Use the service
                    const options = {
                        to: [],
                        message: ""
                    }

                    options.to.push(y);
                    options.message = "Morning Star Hymnal One Time Code:" + response.OTP;
                    
                    
                   //Send message and capture the response or error
                    sms.send(options)
                        .then( response => {
                            console.log(response);
                        })
                        .catch( error => {
                            console.log(error);
                        });


                //----------------------------------------
                res.status(200).json({
                    message: "user found",
                    status: true,
                    userFound: true,
                    result: response,
                    otp:response.OTP
                });
            }) 
            .catch(err=>{
                    res.status(500).json({
                        message : `Server error occured. Try again later.`
                })
            });
} );

router.post('/resetpassword',(req,res, next)=> {
    
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
          
          User.updateOne({phone: req.body.phone}, {password:hash, OTP:otp})
          .then( resp => {
              console.log(resp);
             if (resp.nModified > 0) {
              res.status(201).json({
                  state: true,
                  message: "Password Successfully Changed!"
              })
            }
          })
          .catch( err => {
              console.log(err);
               res.status(500).json({
                message : `Failed to reset password. Try again later.`
        })
          })
    
    });

})



router.get('/generateotp',(req,res,next) => {

  
    
    // // Initialize a service e.g. SMS
    // //sms = africastalking.SMS
    // sms = AfricasTalking.SMS;

    
    
    // // Use the service
    // const options = {
    //     to: ['+254716207243', '+254770522394'],
    //     message: "I'm a lumberjack and its ok, I work all night and sleep all day"
    // }
    
    // // Send message and capture the response or error
    // sms.send(options)
    //     .then( response => {
    //         console.log(response);
    //     })
    //     .catch( error => {
    //         console.log(error);
    //     });


});

module.exports = router;