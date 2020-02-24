const express = require("express");
const router = express.Router();

// Updating a User
router.put(
  "/ngo",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const updates = Object.keys(req.body);
    try {
      updates.forEach(update => (req.user[update] = req.body[update]));
      await req.user.save();
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

module.exports = router;
