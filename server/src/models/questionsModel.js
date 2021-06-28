const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answer_content: { type: String },
  answer_isCorrect: { type: Boolean },
});

const QuestionsSchema = new Schema(
  {
    question_content: { type: String },
    question_answers: [{ type: AnswerSchema }],
    question_quiz: { type: Schema.Types.ObjectId, ref: "Quizzes" },
  },
  {
    collection: "Questions",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const QuestionsModel = mongoose.model("Questions", QuestionsSchema);
module.exports = QuestionsModel;
