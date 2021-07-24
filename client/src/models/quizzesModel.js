import { executeMutation, executeQuery } from "@utils/graphql";
import gql from "graphql-tag";

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

const getQuizzesByUserIdQuery = gql`
  query getQuizzesByUserId($user_id: ID!) {
    getQuizzesByUserId(user_id: $user_id) {
      _id
      quiz_title
      quiz_desc
      quiz_code
      quiz_current
    }
  }
`;

const getQuizByIdQuery = gql`
  query getQuiz($value: String!) {
    getQuiz(key: "_id", value: $value) {
      _id
      quiz_title
      quiz_desc
      quiz_code
      quiz_current
    }
  }
`;

const getQuizByQuizCodeQuery = gql`
  query getQuiz($value: String!) {
    getQuiz(key: "quiz_code", value: $value) {
      _id
      quiz_title
      quiz_desc
      quiz_code
      quiz_current
    }
  }
`;

const createQuizQuery = gql`
  mutation createQuiz($user_id: ID!, $quiz_title: String!, $quiz_desc: String) {
    createQuiz(
      user_id: $user_id
      quiz_title: $quiz_title
      quiz_desc: $quiz_desc
    ) {
      _id
      quiz_title
      quiz_desc
      quiz_code
      quiz_current
    }
  }
`;

const updateQuizByIdQuery = gql`
  mutation updateQuizById(
    $_id: ID!
    $quiz_title: String
    $quiz_desc: String
    $quiz_code: String
    $quiz_current: Int
  ) {
    updateQuizById(
      _id: $_id
      quiz_title: $quiz_title
      quiz_desc: $quiz_desc
      quiz_code: $quiz_code
      quiz_current: $quiz_current
    ) {
      _id
      quiz_title
      quiz_desc
      quiz_code
      quiz_current
    }
  }
`;

const deleteQuizByIdQuery = gql`
  mutation deleteQuizById($_id: ID!, $user_id: ID!) {
    deleteQuizById(_id: $_id, user_id: $user_id) {
      _id
    }
  }
`;

export function getQuizzesByUserId(args) {
  return executeQuery(getQuizzesByUserIdQuery, {
    user_id: args.user_id,
  }).then((res) => (res ? res.getQuizzesByUserId : null));
}

export function getQuizById(args) {
  return executeQuery(getQuizByIdQuery, { value: args._id }).then((res) =>
    res ? res.getQuiz : null
  );
}

export function getQuizByQuizCode(args) {
  return executeQuery(getQuizByQuizCodeQuery, {
    value: args.quiz_code,
  }).then((res) => (res ? res.getQuiz : null));
}

export function createQuiz(args) {
  const { user_id, quiz_title, quiz_desc } = args;
  return executeMutation(createQuizQuery, {
    user_id,
    quiz_title,
    quiz_desc,
  }).then((res) => (res ? res.createQuiz : null));
}

export function updateQuizById(args) {
  const { _id, quiz_title, quiz_desc, quiz_code, quiz_current } = args;
  return executeMutation(updateQuizByIdQuery, {
    _id,
    quiz_title,
    quiz_desc,
    quiz_code,
    quiz_current,
  }).then((res) => (res ? res.updateQuizById : null));
}

export function deleteQuizById(args) {
  const { _id, user_id } = args;
  return executeMutation(deleteQuizByIdQuery, {
    _id,
    user_id,
  }).then((res) => (res ? res.deleteQuizById : null));
}
