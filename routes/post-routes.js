const express = require("express");
const router = express.Router();
const Post = require("../models/PostModel");
const passport = require("passport");


// Get all the posts made by a specific user

router.get(
  "/posts/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const posts = await Post.find({ owner: req.user._id });
      res.send(posts);
    } catch (e) {
      res.status(500).send();
    }
  }
);

// Get all the posts made by a specific user

router.get(
  "/posts/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const posts = await Post.find({ owner: req.user._id });
      res.send(posts);
    } catch (e) {
      res.status(500).send();
    }
  }
);

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
