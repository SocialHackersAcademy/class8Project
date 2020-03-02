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
      await Posts.save();
      res.send(Posts);
    } catch (e) {
      res.status(400).send();
    }
  }
);

// Get a single post by its id01
router.get(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const _id = req.params.id;
    try {
      const post = await Posts.findOne({ owner: req.user._id, _id });
      !post && res.status(404).send();
    } catch (e) {
      res.status(400).send();
    }
  }
);

// Delete a post by its id
router.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const removedPosts = await Post.findOneAndRemove({
        owner: req.user._id,
        _id: req.params.id
      });
      !removedPosts && res.send(404).send();
      res.json({ success: true });
    } catch (e) {
      res.status(400).send();
    }
  }
);

// Update a post by its id

router.update(
  "posts/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const posts = await Post.findOneAndUpdate(
        {
          owner: req.user._id,
          _id: req.params.id
        },
        req.body
      );
      res.send(posts);
    } catch (e) {
      res.status(400).send();
    }
  }
);

module.exports = router;
