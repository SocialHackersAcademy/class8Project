const express = require("express");
const router = express.Router();
const Organization = require("../models/OrganizationModel");

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
    const newOrganization = new Organization(user);
    const hash = await bcrypt.hash(newOrganization.password, 8);
    newOrganization.password = hash;
    await newOrganization.save();
    res.json({ newOrganization });
  } catch (e) {
    res.status(400).send();
  }
});

// Get all the ngo list

router.get("/ngo", async (req, res) => {
  try {
    const ngos = await Organization.find({}); // Gets all the ngos
    !ngos && res.status(500).send(); // && means if true
    res.send(ngos);
  } catch (e) {
    res.status(500).send();
  }
});

// get the current ngo
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ organization: req.user });
  }
);
// Get ngo by its id
router.get("/ngo/:id", async (req, res) => {
  try {
    const ngo = await Organization.findById(req.params.id);
    res.send(ngo);
  } catch (e) {
    res.status(400).send();
  }
});

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
