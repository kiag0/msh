
/*
  # this middleware checks if an incoming request contains webtoken
  # placed in post, put and delete routes in songs.js (routes folder)
  # 
  #
  #
*/


const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // split from Bearer as popular convention demands
    const token = req.headers.authorization.split(" ")[1];
    console.log("token is sent to server "+ token );
    const userToken = jwt.verify(token, "vale");
    req.userData = {
      phone : userToken.phone,
      userId : userToken.userId,
    };
  
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed!" });
  }
};
 