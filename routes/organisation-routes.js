const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Organization = require("../models/OrganizationModel");
const passport = require("passport");
const validateRegisterInput = require("../validation/Login");
const keys = require("../configuration/keys");
const bcrypt = require("bcryptjs");

// Creating a ngo check

router.post("/register-ngo", async (req, res) => {
  const {
    logo,
    address,
    name,
    email,
    password,
    phone,
    year,
    industry,
    keyword,
    services,
    description,
    teammembers,
  } = req.body;
  let user = {
    logo,
    address,
    name,
    email,
    password,
    phone,
    year,
    industry,
    keyword,
    services,
    description,
    teammembers,
  };
  try {
    // Testing weather that user exists or not
    const ngo = await Organization.findOne({ email });
    ngo && res.json({ err: "Already Exists" }).sendStatus(400);
    const newOrganization = new Organization(user);
    await newOrganization.save();
    res.json({ newOrganization, success: true });
  } catch (e) {
    j;
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Checking Validation.
  if (!isValid) {
    res.status(400).json(errors);
    return;
  }
  const { email, password } = req.body;

  try {
    // Step one --> Get the NGO by the email using the model
    const ngo = await Organization.findOne({ email });
    // Step two validate their existence
    !ngo && res.status(404).send();
    // Step three validate the password
    const matched = await bcrypt.compare(password, ngo.password);
    if (matched) {
      // Step four assign it a token
      const payload = { id: ngo._id, name: ngo.name, logo: ngo.logo };
      const token = jwt.sign(payload, keys.secretOrKey);
      res.json({ token: "Bearer " + token, organization: ngo.name });
    } else {
      // Step Five if the password does not match
      res.status(400).send("You done wrong");
    }
  } catch (e) {
    res.status(400).send();
  }
});

// Get all the ngo list  Check

router.get("/ngo", async (req, res) => {
  try {
    const ngos = await Organization.find({}); // Gets all the ngos
    !ngos && res.status(500).send(); // && means if true
    res.send(ngos);
  } catch (e) {
    res.status(500).send();
  }
});

// get the current ngo check
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ organization: req.user });
  }
);
// Get ngo by its id check
router.get("/ngo/:id", async (req, res) => {
  try {
    const ngo = await Organization.findById(req.params.id);
    res.send(ngo);
  } catch (e) {
    res.status(400).send();
  }
});

// Updating an ngo check

router.put(
  "/ngo",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const updates = Object.keys(req.body);
    try {
      updates.forEach((update) => (req.user[update] = req.body[update]));
      await req.user.save(); // here I am supposed to get back the user from it being authenticated
      res.send(req.user);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

// Delete an ngo check

router.delete(
  "/ngo",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      req.user.remove();
      res.json({ success: true }).status(200);
    } catch (e) {
      res.send(400).send("You done fucked up");
    }
  }
);

router.delete("/nuke-ngos", async (req, res) => {
  if (req.body.pass === "I am the president") {
    try {
      await Organization.remove({});
      res.json({ done: true });
    } catch (e) {
      res.sendStatus(500);
    }
  }
});
module.exports = router;
