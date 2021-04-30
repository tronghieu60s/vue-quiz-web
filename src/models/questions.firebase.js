import firebase from "@utils/firebase";

const questionsModel = firebase.database().ref("/questions");

export function createQuestion(question) {
  return questionsModel
    .push({ ...question })
    .then((snapshot) => getQuestionById(snapshot.key))
    .catch((err) => console.log(err));
}

export function getQuestionById(_id) {
  return questionsModel
    .child(_id)
    .once("value")
    .then((snapshot) => (snapshot.val() ? { ...snapshot.val(), _id } : null))
    .catch((err) => console.log(err));
}
