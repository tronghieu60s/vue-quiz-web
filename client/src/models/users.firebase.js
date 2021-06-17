import firebase from "@utils/firebase";
import { objectToArray } from "@helpers/object";

const usersModel = firebase.database().ref("/users");

export function getUsers() {
  return usersModel
    .once("value")
    .then((snapshot) => objectToArray(snapshot.val()))
    .catch((err) => console.log(err));
}

export function getUserById(_id) {
  return usersModel
    .child(_id)
    .once("value")
    .then((snapshot) => (snapshot.val() ? { ...snapshot.val(), _id } : null))
    .catch((err) => console.log(err));
}

export async function getUserByUsername(username) {
  return usersModel
    .orderByChild("user_username")
    .equalTo(username)
    .once("value")
    .then((snapshot) =>
      snapshot.val() ? objectToArray(snapshot.val())[0] : null
    )
    .catch((err) => console.log(err));
}

export function createUser(user) {
  return usersModel
    .push({ ...user })
    .then((response) => getUserById(response.key))
    .catch((err) => console.log(err));
}

export function updateUserById(_id, user) {
  return getUserById(_id)
    .then(async (snapshot) => {
      const newUser = { ...snapshot, ...user };
      await usersModel.child(_id).set({ ...newUser, _id: null });
      return newUser;
    })
    .catch((err) => console.log(err));
}
