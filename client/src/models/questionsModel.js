import createQuestionQuery from "@graphql/createQuestion.gql";
import deleteQuestionByIdQuery from "@graphql/deleteQuestionById.gql";
import getQuestionsByQuizIdQuery from "@graphql/getQuestionsByQuizId.gql";
import updateQuestionByIdQuery from "@graphql/updateQuestionById.gql";
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
  }).then((res) => (res ? res.getQuestionsByQuizId : null));
}

export function createQuestion(args) {
  const { quiz_id, question_content, question_answers } = args;
  return executeMutation(createQuestionQuery, {
    quiz_id,
    question_content,
    question_answers,
  }).then((res) => (res ? res.createQuestion : null));
}

export function updateQuestionById(args) {
  const { _id, question_content, question_answers } = args;
  return executeMutation(updateQuestionByIdQuery, {
    _id,
    question_content,
    question_answers,
  }).then((res) => (res ? res.updateQuestionById : null));
}

export function deleteQuestionById(args) {
  const { _id, quiz_id } = args;
  return executeMutation(deleteQuestionByIdQuery, {
    _id,
    quiz_id,
  }).then((res) => (res ? res.deleteQuestionById : null));
}
