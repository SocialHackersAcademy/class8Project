const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    subject: {
      type: String
    },
    img: { 
      type:String
     },  // what you did would be good if we wanted uploading images
    contact: {
      type: String
    },
    text_post: {
      type: String,
      required:true // the ! was supposed to symbolize required
    },
    comments: [
      {
        name: {
          type: String
        },
        feedback: {
          type: String
        }
      }
    ],
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'organization'
    }
  },
  {
    timestamps:true
  }
);
const Post = mongoose.model("Post", postSchema)

module.exports = Post;