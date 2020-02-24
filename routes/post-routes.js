const express = require("express");
const router = express.Router();
const Post = require("../models/PostModel");
router.get("/test", (req, res) => {
  res.send("This is a test");
});

// Get all the posts from the Database
router.get("/posts", async (req, res) => {
  try {
    const allPosts = await Post.find({});
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
