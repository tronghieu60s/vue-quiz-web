const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizzesSchema = new Schema(
  {
    quiz_title: { type: String },
    quiz_desc: { type: String },
    quiz_code: { type: String },
    quiz_current: { type: Number, default: 0 },
    quiz_questions: [{ type: Schema.Types.ObjectId, ref: "Questions" }],
    quiz_players: [{ type: Schema.Types.ObjectId, ref: "Players" }],
  },
  {
    collection: "Quizzes",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const QuizzesModel = mongoose.model("Quizzes", QuizzesSchema);
module.exports = QuizzesModel;
