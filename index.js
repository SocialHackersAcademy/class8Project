const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const cors  = require('cors');

app.use(cors());

// setting up the database

mongoose.connect(
  "mongodb://localhost/class_8_final",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log("Connected to mongo db")
);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Passport Middleware
app.use(passport.initialize());
require("./configuration/passport.js")(passport);

// Importing The Routes
app.use(require("./routes/post-routes"));
app.use(require("./routes/organisation-routes"));

// PORT
app.listen(process.env.PORT || 4000, () => {
  console.log("Connected to port ");
});
