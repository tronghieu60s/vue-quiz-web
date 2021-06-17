import firebase from "@utils/firebase";
import { objectToArray } from "@helpers/object";

const quizzesModel = firebase.database().ref("/quizzes");

export function getQuizzes() {
  return quizzesModel
    .once("value")
    .then((snapshot) => objectToArray(snapshot.val()))
    .catch((err) => console.log(err));
}

export async function getQuizzesByUserId(user_id) {
  return quizzesModel
    .orderByChild("user_id")
    .equalTo(user_id)
    .once("value")
    .then((snapshot) => objectToArray(snapshot.val()))
    .catch((err) => console.log(err));
}

export function getQuizById(_id) {
  return quizzesModel
    .child(_id)
    .once("value")
    .then((snapshot) => (snapshot.val() ? { ...snapshot.val(), _id } : null))
    .catch((err) => console.log(err));
}

export async function getQuizByQuizCode(quiz_code) {
  return quizzesModel
    .orderByChild("quiz_code")
    .equalTo(quiz_code)
    .once("value")
    .then((snapshot) =>
      snapshot.val() ? objectToArray(snapshot.val())[0] : null
    )
    .catch((err) => console.log(err));
}

export function createQuiz(quiz) {
  return quizzesModel
    .push({ ...quiz })
    .then((snapshot) => getQuizById(snapshot.key))
    .catch((err) => console.log(err));
}

export function deleteQuizById(_id) {
  return getQuizById(_id)
    .then(async (snapshot) => {
      await quizzesModel.child(_id).remove();
      return snapshot;
    })
    .catch((err) => console.log(err));
}

export function updateQuizById(_id, quiz) {
  return getQuizById(_id)
    .then(async (snapshot) => {
      const newQuiz = { ...snapshot, ...quiz };
      await quizzesModel.child(_id).set({ ...newQuiz, _id: null });
      return newQuiz;
    })
    .catch((err) => console.log(err));
}
