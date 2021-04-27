import firebase from "@utils/firebase";
import { objectToArray } from "@helpers/object";

const quizzesModel = firebase.database().ref("/quizzes");

export function getQuizzes() {
  return quizzesModel
    .once("value")
    .then((snapshot) => objectToArray(snapshot.val()))
    .catch((err) => console.log(err));
}

export function getQuizById(_id) {
  return quizzesModel
    .child(_id)
    .once("value")
    .then((snapshot) => ({ ...snapshot.val(), _id }))
    .catch((err) => console.log(err));
}

export function createQuiz(quiz) {
  return quizzesModel
    .push({ ...quiz })
    .then((response) => getQuizById(response.key))
    .catch((err) => console.log(err));
}

export function updateQuiz(_id, update) {
  return getQuizById(_id)
    .then((quiz) => quizzesModel.child(_id).set({ ...quiz, ...update }))
    .then((err) => console.log(err));
}
