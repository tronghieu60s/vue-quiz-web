const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answer_content: { type: String, default: "" },
  answer_isCorrect: { type: Boolean, default: false, required: true },
});

const QuestionsSchema = new Schema(
  {
    question_content: { type: String, required: true },
    question_answers: [{ type: AnswerSchema, required: true }],
    question_times: { type: Number, default: 20 },
  },
  {
    collection: "Questions",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const QuestionsModel = mongoose.model("Questions", QuestionsSchema);
module.exports = QuestionsModel;
