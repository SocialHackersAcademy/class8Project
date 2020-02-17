const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Healwejfoiawejf");
});
module.exports = router;
