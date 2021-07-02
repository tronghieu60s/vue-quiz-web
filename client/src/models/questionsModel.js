import createQuestion from "@graphql/createQuestion.gql";
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

export function createQuestionQuery(args) {
  const { quiz_id, question_content, question_answers } = args;
  return executeMutation(createQuestion, {
    quiz_id,
    question_content,
    question_answers,
  }).then((res) => res.createQuestion);
}
