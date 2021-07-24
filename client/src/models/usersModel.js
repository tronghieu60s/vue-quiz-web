import { executeMutation, executeQuery } from "@utils/graphql";
import gql from "graphql-tag";

/* users = { 
  _id, 
  user_username,
  user_password,
  created_at,
  updated_at
}
*/

const getUserByIdQuery = gql`
  query getUser($value: String!) {
    getUser(key: "_id", value: $value) {
      _id
      user_username
      user_password
    }
  }
`;

const getUserByUsernameQuery = gql`
  query getUser($value: String!) {
    getUser(key: "user_username", value: $value) {
      _id
      user_username
      user_password
    }
  }
`;

const createUserQuery = gql`
  mutation createUser($user_username: String!, $user_password: String!) {
    createUser(user_username: $user_username, user_password: $user_password) {
      _id
      user_username
      user_password
    }
  }
`;

const updateUserByIdQuery = gql`
  mutation updateUserById(
    $_id: ID!
    $user_username: String
    $user_password: String
  ) {
    updateUserById(
      _id: $_id
      user_username: $user_username
      user_password: $user_password
    ) {
      _id
      user_username
      user_password
    }
  }
`;

export function getUserById(args) {
  return executeQuery(getUserByIdQuery, { value: args._id }).then((res) =>
    res ? res.getUser : null
  );
}

export function getUserByUsername(args) {
  return executeQuery(getUserByUsernameQuery, {
    value: args.user_username,
  }).then((res) => (res ? res.getUser : null));
}

export function createUser(args) {
  const { user_username, user_password } = args;
  return executeMutation(createUserQuery, {
    user_username,
    user_password,
  }).then((res) => (res ? res.createUser : null));
}

export function updateUserById(args) {
  const { _id, user_username, user_password } = args;
  return executeMutation(updateUserByIdQuery, {
    _id,
    user_username,
    user_password,
  }).then((res) => (res ? res.updateUserById : null));
}
