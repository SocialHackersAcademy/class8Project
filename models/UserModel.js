const mongoose = require("mongoose");
const Schema = mongoose.Schema;
​
const userSchema = new Schema(
  {
    userEmail: {
      type: String
    },
    userComment: {
      type: String
    },
    timeCommented: {
      type: Date
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId
      ref: "Post"
    }
  }
);
​
const User = mongoose.model("User", userSchema)
module.exports = User;
