import createQuestionQuery from "@graphql/createQuestion.gql";
import deleteQuestionByIdQuery from "@graphql/deleteQuestionById.gql";
import getQuestionsByQuizIdQuery from "@graphql/getQuestionsByQuizId.gql";
import { executeMutation, executeQuery } from "@utils/graphql";

/* questions = {
  _id
  question_content
  question_answers {
    answer_content
    answer_isCorrect
  }
  created_at
  updated_at
}
*/

export function getQuestionsByQuizId(args) {
  return executeQuery(getQuestionsByQuizIdQuery, {
    quiz_id: args.quiz_id,
  }).then((res) => res.getQuestionsByQuizId);
}

export function createQuestion(args) {
  const { quiz_id, question_content, question_answers } = args;
  return executeMutation(createQuestionQuery, {
    quiz_id,
    question_content,
    question_answers,
  }).then((res) => res.createQuestion);
}

export function deleteQuestionById(args) {
  const { _id, quiz_id } = args;
  return executeMutation(deleteQuestionByIdQuery, {
    _id,
    quiz_id,
  }).then((res) => res.deleteQuestionById);
}
