import firebase from "@utils/firebase";
import { objectToArray } from "@helpers/object";

const questionsModel = firebase.database().ref("/questions");

export function getQuestions() {
  return questionsModel
    .once("value")
    .then((snapshot) => objectToArray(snapshot.val()))
    .catch((err) => console.log(err));
}

export function getQuestionById(_id) {
  return questionsModel
    .child(_id)
    .once("value")
    .then((snapshot) => (snapshot.val() ? { ...snapshot.val(), _id } : null))
    .catch((err) => console.log(err));
}

export function createQuestion(question) {
  return questionsModel
    .push({ ...question })
    .then((snapshot) => getQuestionById(snapshot.key))
    .catch((err) => console.log(err));
}

export function updateQuestionById(_id, quiz) {
  return getQuestionById(_id)
    .then(async (snapshot) => {
      const newQuiz = { ...snapshot, ...quiz };
      await questionsModel.child(_id).set(newQuiz);
      return newQuiz;
    })
    .catch((err) => console.log(err));
}

export function deleteQuestionById(_id) {
  return getQuestionById(_id)
    .then(async (snapshot) => {
      await questionsModel.child(_id).remove();
      return snapshot;
    })
    .catch((err) => console.log(err));
}
