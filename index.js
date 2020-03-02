
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const passport = require('passport')

// Middleware

app.use(require("./routes/post-routes"));

// setting up the database

mongoose.connect(
  "mongodb://localhost/class_8_final",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log("Connected to mongo db")
);
//Passport Middleware
app.use(passport.initialize())
//Passport Config
require('./configuration/passport.js')


// PORT
app.listen(process.env.PORT || 4000, () => {
  console.log("Connected to port ");
});

// What is the meaning of life ????????