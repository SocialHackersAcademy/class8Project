const express = require("express");
const router = express.Router();

// Creating a ngo
router.post("/ngo", async (req, res) => {
  const {
    logo,
    name,
    email,
    password,
    phone,
    year,
    industry,
    keyword,
    services,
    description,
    teammember
  } = req.body;
  let user = {
    logo,
    name,
    email,
    password,
    phone,
    year,
    industry,
    keyword,
    services,
    description,
    teammember
  };
  try {
    const newUser = new User(user);
    const hash = await bcrypt.hash(newUser.password, 8);
    newUser.password = hash;
    await newUser.save();
    res.json({ newUser });
  } catch (e) {
    res.status(400).send();
  }
});

// Get all the ngo list
router.get(
  "/user/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.send(req.user);
  }
);
// get the current ngo
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ organization: req.user });
  }
);

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
