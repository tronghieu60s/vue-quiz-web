import firebase from "@utils/firebase";
import { objectToArray } from "@helpers/object";

const questionsModel = firebase.database().ref("/questions");

export function getQuestions() {
  return questionsModel
    .once("value")
    .then((snapshot) => objectToArray(snapshot.val()))
    .catch((err) => console.log(err));
}

export function getQuestionsByQuizId(quiz_id) {
  return questionsModel
    .orderByChild("quiz_id")
    .equalTo(quiz_id)
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

export function updateQuestionById(_id, question) {
  return getQuestionById(_id)
    .then(async (snapshot) => {
      const newQuestion = { ...snapshot, ...question };
      await questionsModel.child(_id).set({ ...newQuestion, _id: null });
      return newQuestion;
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

export function deleteQuestionsByQuizId(quiz_id) {
  return questionsModel
    .orderByChild("quiz_id")
    .equalTo(quiz_id)
    .once("value")
    .then((snapshot) =>
      snapshot.forEach((child) => {
        child.ref.remove();
      })
    );
}
