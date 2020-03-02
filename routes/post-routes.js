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

// Get all the posts from the Database
router.get("/posts", async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.send(allPosts);
  } catch (e) {
    res.status(500).send();
  }
});

// Create a new post

router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { subject, img, contact, text_post, comments } = req.body;
    const newPost = {
      subject,
      img,
      contact,
      text_post,
      comments,
      owner: req.user._id
    };
    try {
      const Posts = new Post(newPost);
      res.send(Posts);
    } catch (e) {
      res.status(400).send();
    }
  }
);

module.exports = router;
