const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    content: { type: String, required: true, minlength: 1, maxlength: 300 },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    likes: {type: Number, default: 0 }
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
