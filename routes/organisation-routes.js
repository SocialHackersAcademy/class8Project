const express = require("express");
const router = express.Router();

// Updating an ngo
router.put(
  "/ngo",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const updates = Object.keys(req.body);
    try {
      updates.forEach(update => (req.user[update] = req.body[update]));
      await req.user.save(); // here I am supposed to get back the user from it being authenticated
    } catch (e) {
      res.status(400).send(e);
    }
  }
);
// Delete an ngo

router.delete(
  "/ngo",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    req.user = [];
    await req.user.save();
    res.json({ success: true }).status(200);
  }
);

module.exports = router;
