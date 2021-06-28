const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayersSchema = new Schema(
  {
    player_name: { type: String, default: "Unknown" },
    player_username: { type: String },
    player_scores: { type: Number },
    player_online: { type: Boolean },
  },
  {
    collection: "Players",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const PlayersModel = mongoose.model("Players", PlayersSchema);
module.exports = PlayersModel;
