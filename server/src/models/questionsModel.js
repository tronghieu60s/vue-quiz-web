const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answer_content: { type: String, required: true },
  answer_isCorrect: { type: Boolean, required: true },
});

const QuestionsSchema = new Schema(
  {
    question_content: { type: String, required: true },
    question_answers: [{ type: AnswerSchema, required: true }],
  },
  {
    collection: "Questions",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const QuestionsModel = mongoose.model("Questions", QuestionsSchema);
module.exports = QuestionsModel;
