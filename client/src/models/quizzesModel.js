import createQuizQuery from "@graphql/createQuiz.gql";
import deleteQuizByIdQuery from "@graphql/deleteQuizById.gql";
import getAllQuizzesQuery from "@graphql/getAllQuizzes.gql";
import getQuizByIdQuery from "@graphql/getQuizById.gql";
import getQuizzesByUserIdQuery from "@graphql/getQuizzesByUserId.gql";
import updateQuizByIdQuery from "@graphql/updateQuizById.gql";
import { executeMutation, executeQuery } from "@utils/graphql";

/* quizzes = { 
  _id,
  quiz_title,
  quiz_desc,
  quiz_code,
  quiz_current,
  created_at,
  updated_at,
}
*/

export function getAllQuizzes() {
  return executeQuery(getAllQuizzesQuery).then((res) => res.getAllQuizzes);
}

export function getQuizzesByUserId(args) {
  return executeQuery(getQuizzesByUserIdQuery, { user_id: args.user_id }).then(
    (res) => res.getQuizzesByUserId
  );
}

export function getQuizById(args) {
  return executeQuery(getQuizByIdQuery, { value: args._id }).then(
    (res) => res.getQuiz
  );
}

export function createQuiz(args) {
  const { user_id, quiz_title, quiz_desc } = args;
  return executeMutation(createQuizQuery, {
    user_id,
    quiz_title,
    quiz_desc,
  }).then((res) => res.createQuiz);
}

export function updateQuizById(args) {
  const { _id, quiz_title, quiz_desc, quiz_code, quiz_current } = args;
  return executeMutation(updateQuizByIdQuery, {
    _id,
    quiz_title,
    quiz_desc,
    quiz_code,
    quiz_current,
  }).then((res) => res.updateQuizById);
}

export function deleteQuizById(args) {
  const { _id, user_id } = args;
  return executeMutation(deleteQuizByIdQuery, {
    _id,
    user_id,
  }).then((res) => res.deleteQuizById);
}
