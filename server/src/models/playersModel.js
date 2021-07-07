const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayersSchema = new Schema(
  {
    player_socket: { type: String, required: true },
    player_username: { type: String, required: true },
    player_online: { type: Boolean, default: true },
    player_scores: { type: Number, default: 0 },
    player_quiz: { type: String },
  },
  {
    collection: "Players",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const PlayersModel = mongoose.model("Players", PlayersSchema);
module.exports = PlayersModel;
