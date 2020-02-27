const express = require("express");
const router = express.Router();
const Post = require("../models/PostModel");
const passport = require("passport");

router.get("/user", (req, res) => {
  res.send("Healwejfoiawejf");
});

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

<<<<<<< HEAD
=======
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

>>>>>>> 05e8329b0cd9bba2ba2b61b93aec3bdd32691cb5
module.exports = router;
