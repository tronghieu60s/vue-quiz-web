const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    user_username: { type: String },
    user_password: { type: String },
  },
  {
    collection: "Users",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const UsersModel = mongoose.model("Users", UsersSchema);
module.exports = UsersModel;
