const express = require("express");
const app = express();

// PORT
app.listen(process.env.PORT || 4000, () => {
  console.log("Connected to port ");
});
