
/*
  # express app where all routes are defined 
  #
  #
*/

const express = require("express"); // unopinionated server creator
const bodyParser = require("body-parser"); // acces values from the body sent from the frontend and mobile app
const mongoose = require("mongoose"); // mongodb schema provider
const cors = require("cors"); // allows cross origin access

const forgotRoutes = require('./routes/forgot')
const songRoutes = require('./routes/songs');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/categories');
const programRoutes = require('./routes/programs');
const searchRoutes = require('./routes/search'); 



const app = express();

app.use(cors());
mongoose
  .connect(
    "mongodb+srv://agusto:agusto@valentine-bv3vp.mongodb.net/hymns?retryWrites=true&w=majority" // mongodb url
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE, OPTIONS"
  );
  next();
});

// use the songsRoutes
app.use('/api/songs',songRoutes);

// user routes
app.use('/api/user',userRoutes);
//category routes
app.use('/api/categories', categoryRoutes);

//program routes
app.use('/api/programs', programRoutes);

//search routes
app.use('/api/search', searchRoutes); 

app.use('/api/forgot', forgotRoutes);



module.exports = app;
