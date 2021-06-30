const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    user_username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    user_password: { type: String, required: true },
    user_quizzes: [{ type: Schema.Types.ObjectId, ref: "Quizzes" }],
  },
  {
    collection: "Users",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const UsersModel = mongoose.model("Users", UsersSchema);
module.exports = UsersModel;
