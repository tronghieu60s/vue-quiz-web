import { executeMutation, executeQuery } from "@utils/graphql";
import gql from "graphql-tag";

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

const getQuestionsByQuizIdQuery = gql`
  query getQuestionsByQuizId($quiz_id: ID!) {
    getQuestionsByQuizId(quiz_id: $quiz_id) {
      _id
      question_content
      question_answers {
        answer_content
        answer_isCorrect
      }
      question_scores
      question_times
    }
  }
`;

const createQuestionQuery = gql`
  mutation createQuestion(
    $quiz_id: ID!
    $question_content: String!
    $question_answers: [AnswersInput]!
    $question_scores: Int
    $question_times: Int
  ) {
    createQuestion(
      quiz_id: $quiz_id
      question_content: $question_content
      question_answers: $question_answers
      question_scores: $question_scores
      question_times: $question_times
    ) {
      _id
      question_content
      question_answers {
        answer_content
        answer_isCorrect
      }
      question_scores
      question_times
    }
  }
`;

const updateQuestionByIdQuery = gql`
  mutation updateQuestionById(
    $_id: ID!
    $question_content: String
    $question_answers: [AnswersInput]
    $question_scores: Int
    $question_times: Int
  ) {
    updateQuestionById(
      _id: $_id
      question_content: $question_content
      question_answers: $question_answers
      question_scores: $question_scores
      question_times: $question_times
    ) {
      _id
      question_content
      question_answers {
        answer_content
        answer_isCorrect
      }
      question_scores
      question_times
    }
  }
`;

const deleteQuestionByIdQuery = gql`
  mutation deleteQuestionById($_id: ID!, $quiz_id: ID!) {
    deleteQuestionById(_id: $_id, quiz_id: $quiz_id) {
      _id
    }
  }
`;

export function getQuestionsByQuizId(args) {
  return executeQuery(getQuestionsByQuizIdQuery, {
    quiz_id: args.quiz_id,
  }).then((res) => (res ? res.getQuestionsByQuizId : null));
}

export function createQuestion(args) {
  const {
    quiz_id,
    question_content,
    question_answers,
    question_scores,
    question_times,
  } = args;
  return executeMutation(createQuestionQuery, {
    quiz_id,
    question_content,
    question_answers,
    question_scores,
    question_times,
  }).then((res) => (res ? res.createQuestion : null));
}

export function updateQuestionById(args) {
  const {
    _id,
    question_content,
    question_answers,
    question_scores,
    question_times,
  } = args;
  return executeMutation(updateQuestionByIdQuery, {
    _id,
    question_content,
    question_answers,
    question_scores,
    question_times,
  }).then((res) => (res ? res.updateQuestionById : null));
}

export function deleteQuestionById(args) {
  const { _id, quiz_id } = args;
  return executeMutation(deleteQuestionByIdQuery, {
    _id,
    quiz_id,
  }).then((res) => (res ? res.deleteQuestionById : null));
}
