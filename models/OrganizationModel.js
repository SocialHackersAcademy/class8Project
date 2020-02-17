const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  logo: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  year: {
    type: Date
  },
  industry: {
    type: String
  },
  keyword: {
    type: ["String"],
    required: true
  },
  services: {
    type: ["String"],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  teammembers: [
    {
      type: String,
      avatar: String,
      bio: String,
      title: String,
      required: true
    }
  ],
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "" // Here will go the Post Model Which isn't ready yet
  }
});

const Organization = mongoose.model("organization", OrganizationSchema);
module.exports = Organization;
