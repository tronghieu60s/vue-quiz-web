import createUserQuery from "@graphql/createUser.gql";
import getAllUsersQuery from "@graphql/getAllUsers.gql";
import getUserByIdQuery from "@graphql/getUserById.gql";
import getUserByUsernameQuery from "@graphql/getUserByUsername.gql";
import { executeMutation, executeQuery } from "@utils/graphql";

/* users = { 
  _id, 
  user_username, 
  user_password,
  created_at,
  updated_at
}
*/

export function getUsers() {
  return executeQuery(getAllUsersQuery).then((res) => res.allUsers);
}

export function getUserById(args) {
  return executeQuery(getUserByIdQuery, { value: args._id }).then(
    (res) => res.getUser
  );
}

export function getUserByUsername(args) {
  return executeQuery(getUserByUsernameQuery, {
    value: args.user_username,
  }).then((res) => res.getUser);
}

export function createUser(args) {
  const { user_username, user_password } = args;
  return executeMutation(createUserQuery, {
    user_username,
    user_password,
  }).then((res) => res.createUser);
}
