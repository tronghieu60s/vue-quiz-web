import firebase from "@utils/firebase";
import { objectToArray } from "@helpers/object";

const usersModel = firebase.database().ref("/users");

export function getUsers() {
  return usersModel
    .once("value")
    .then((snapshot) => objectToArray(snapshot.val()))
    .catch((err) => console.log(err));
}

export async function getUserByUsername(username) {
  const users = await getUsers();
  const user = users.find((o) => o.user_username === username);
  return user;
}

export function getUserById(_id) {
  return usersModel
    .child(_id)
    .once("value")
    .then((snapshot) => (snapshot.val() ? { ...snapshot.val(), _id } : null))
    .catch((err) => console.log(err));
}

export function createUser(user) {
  return usersModel
    .push({ ...user })
    .then((response) => getUserById(response.key))
    .catch((err) => console.log(err));
}
