const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
      name: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      },
      bio: {
        type: String
      },
      title: {
        type: String,
        required: true
      }
    }
  ],
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post" // Added the post model right here
  }
});

OrganizationSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});


const Organization = mongoose.model("organization", OrganizationSchema);
module.exports = Organization;
